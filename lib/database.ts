import { neon } from "@neondatabase/serverless"

// String de conexão do Neon Database
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_L3v0MeiEXITO@ep-still-sun-a88abq5d-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"

// Criar cliente SQL
export const sql = neon(DATABASE_URL)

// Função para criar tabelas se não existirem
export async function ensureTablesExist() {
  try {
    // Verificar se a tabela users existe
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `

    if (!tableCheck[0].exists) {
      console.log("Criando tabelas do banco de dados...")
      await createTables()
    }

    return { success: true, message: "Tabelas verificadas/criadas com sucesso" }
  } catch (error) {
    console.error("Erro ao verificar/criar tabelas:", error)
    return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" }
  }
}

// Função para criar todas as tabelas
async function createTables() {
  // Criar tabela de usuários
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(20),
      password_hash VARCHAR(255) NOT NULL,
      balance DECIMAL(12,2) DEFAULT 0.00,
      status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending_kyc')),
      kyc_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP NULL
    )
  `

  // Criar índices para users
  await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`
  await sql`CREATE INDEX IF NOT EXISTS idx_users_status ON users(status)`

  // Criar tabela de administradores
  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'moderator')),
      permissions JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP NULL
    )
  `

  await sql`CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email)`

  // Criar tabela de jogos
  await sql`
    CREATE TABLE IF NOT EXISTS games (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      provider VARCHAR(100) NOT NULL,
      category VARCHAR(50) NOT NULL,
      rtp DECIMAL(5,2) NOT NULL CHECK (rtp >= 0 AND rtp <= 100),
      status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'disabled')),
      min_bet DECIMAL(10,2) DEFAULT 0.10 CHECK (min_bet > 0),
      max_bet DECIMAL(10,2) DEFAULT 1000.00 CHECK (max_bet > min_bet),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Criar tabela de transações
  await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      type VARCHAR(20) NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'bet', 'win', 'bonus', 'cashback')),
      amount DECIMAL(12,2) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled', 'flagged')),
      payment_method VARCHAR(50),
      transaction_hash VARCHAR(255),
      description TEXT,
      metadata JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `

  // Criar função para atualizar updated_at
  await sql`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ language 'plpgsql'
  `

  // Criar trigger para users
  await sql`
    DROP TRIGGER IF EXISTS update_users_updated_at ON users;
    CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
  `

  // Inserir admin padrão se não existir
  await sql`
    INSERT INTO admins (email, password_hash, role, permissions) 
    VALUES (
      'groupcephas@gmail.com', 
      '$2b$12$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 
      'super_admin', 
      '{"users": ["read", "write", "delete"], "games": ["read", "write", "delete"], "financial": ["read", "write"], "reports": ["read"], "system": ["read", "write"]}'::jsonb
    )
    ON CONFLICT (email) DO NOTHING
  `

  console.log("Tabelas criadas com sucesso!")
}

// Função para testar conexão
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time, current_database() as database_name`
    return {
      success: true,
      data: result[0],
      message: "Conexão com Neon Database estabelecida com sucesso!",
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
      message: "Falha ao conectar com o banco de dados",
    }
  }
}

// Funções para operações do cassino
export async function getUsers() {
  try {
    await ensureTablesExist()
    const users = await sql`
      SELECT id, name, email, balance, status, kyc_verified, created_at, last_login 
      FROM users 
      ORDER BY created_at DESC
    `
    return { success: true, data: users }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" }
  }
}

export async function getGames() {
  try {
    await ensureTablesExist()
    const games = await sql`
      SELECT id, name, provider, category, rtp, status, min_bet, max_bet 
      FROM games 
      WHERE status = 'active'
      ORDER BY name
    `
    return { success: true, data: games }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" }
  }
}

export async function getTransactions(limit = 50) {
  try {
    await ensureTablesExist()
    const transactions = await sql`
      SELECT t.*, u.name as user_name 
      FROM transactions t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC
      LIMIT ${limit}
    `
    return { success: true, data: transactions }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" }
  }
}

export async function getSuspiciousActivity() {
  try {
    await ensureTablesExist()
    const activities = await sql`
      SELECT sa.*, u.name as user_name 
      FROM suspicious_activity sa
      LEFT JOIN users u ON sa.user_id = u.id
      WHERE sa.status = 'open'
      ORDER BY sa.created_at DESC
    `
    return { success: true, data: activities }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" }
  }
}

export async function getSystemStats() {
  try {
    await ensureTablesExist()
    const stats = await sql`
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM users WHERE status = 'active') as active_users,
        (SELECT COUNT(*) FROM games WHERE status = 'active') as active_games,
        (SELECT COUNT(*) FROM transactions WHERE status = 'pending') as pending_transactions,
        (SELECT COUNT(*) FROM suspicious_activity WHERE status = 'open') as open_investigations,
        (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE type = 'deposit' AND status = 'completed') as total_deposits,
        (SELECT COALESCE(SUM(ABS(amount)), 0) FROM transactions WHERE type = 'withdrawal' AND status = 'completed') as total_withdrawals,
        (SELECT COALESCE(SUM(ABS(amount)), 0) FROM transactions WHERE type = 'bet' AND status = 'completed') as total_bets
    `
    return { success: true, data: stats[0] }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" }
  }
}

// Função para autenticar admin
export async function authenticateAdmin(email: string, password: string) {
  try {
    await ensureTablesExist()
    const admin = await sql`
      SELECT id, email, role, permissions 
      FROM admins 
      WHERE email = ${email}
    `

    if (admin.length === 0) {
      return { success: false, message: "Administrador não encontrado" }
    }

    // Em produção, você deve verificar o hash da senha
    // Por enquanto, vamos verificar se é o admin principal
    if (email === "groupcephas@gmail.com" && password === "23131504sv") {
      // Atualizar último login
      await sql`
        UPDATE admins 
        SET last_login = NOW() 
        WHERE email = ${email}
      `

      return {
        success: true,
        data: admin[0],
        message: "Login realizado com sucesso",
      }
    }

    return { success: false, message: "Credenciais inválidas" }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" }
  }
}

// Função para autenticar usuário
export async function authenticateUser(email: string, password: string) {
  try {
    await ensureTablesExist()
    const user = await sql`
      SELECT id, name, email, balance, status, kyc_verified 
      FROM users 
      WHERE email = ${email}
    `

    if (user.length === 0) {
      return { success: false, message: "Usuário não encontrado" }
    }

    // Em produção, você deve verificar o hash da senha
    // Por enquanto, vamos aceitar a senha padrão 'password123'
    if (password === "password123") {
      // Atualizar último login
      await sql`
        UPDATE users 
        SET last_login = NOW() 
        WHERE email = ${email}
      `

      return {
        success: true,
        data: user[0],
        message: "Login realizado com sucesso",
      }
    }

    return { success: false, message: "Credenciais inválidas" }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" }
  }
}
