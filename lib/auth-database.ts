import { sql, ensureTablesExist } from "@/lib/database"
import bcrypt from "bcryptjs"

// Tipos para autenticação
export interface UserCredentials {
  email: string
  password: string
}

export interface UserRegistration {
  name: string
  email: string
  phone: string
  password: string
}

export interface AuthResult {
  success: boolean
  message: string
  user?: any
  admin?: any
}

// Função para hash da senha
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

// Função para verificar senha
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Registrar novo usuário
export async function registerUser(userData: UserRegistration): Promise<AuthResult> {
  try {
    console.log("Registrando usuário:", { email: userData.email, name: userData.name })

    // Garantir que as tabelas existam
    await ensureTablesExist()

    // Verificar se email já existe
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${userData.email}
    `

    if (existingUser.length > 0) {
      console.log("Email já existe:", userData.email)
      return {
        success: false,
        message: "Este email já está cadastrado",
      }
    }

    // Hash da senha
    const hashedPassword = await hashPassword(userData.password)
    console.log("Senha hasheada com sucesso")

    // Inserir novo usuário
    const newUser = await sql`
      INSERT INTO users (name, email, phone, password_hash, balance, status, kyc_verified)
      VALUES (${userData.name}, ${userData.email}, ${userData.phone || ""}, ${hashedPassword}, 50000.00, 'active', false)
      RETURNING id, name, email, balance, status, kyc_verified, created_at
    `

    console.log("Usuário criado:", newUser[0])

    if (newUser.length > 0) {
      // Atualizar último login
      await sql`
        UPDATE users 
        SET last_login = NOW() 
        WHERE id = ${newUser[0].id}
      `

      return {
        success: true,
        message: "Conta criada com sucesso! Você ganhou R$ 50.000 de bônus!",
        user: newUser[0],
      }
    }

    return {
      success: false,
      message: "Erro ao criar conta",
    }
  } catch (error) {
    console.error("Erro ao registrar usuário:", error)
    return {
      success: false,
      message: "Erro interno do servidor",
    }
  }
}

// Autenticar usuário
export async function authenticateUser(credentials: UserCredentials): Promise<AuthResult> {
  try {
    console.log("Autenticando usuário:", credentials.email)

    // Garantir que as tabelas existam
    await ensureTablesExist()

    // Buscar usuário por email
    const users = await sql`
      SELECT id, name, email, password_hash, balance, status, kyc_verified, created_at
      FROM users 
      WHERE email = ${credentials.email}
    `

    console.log("Usuários encontrados:", users.length)

    if (users.length === 0) {
      return {
        success: false,
        message: "Email não encontrado. Verifique se você já se cadastrou.",
      }
    }

    const user = users[0]
    console.log("Usuário encontrado:", { id: user.id, email: user.email, status: user.status })

    // Verificar se a conta está ativa
    if (user.status === "suspended") {
      return {
        success: false,
        message: "Conta suspensa. Entre em contato com o suporte.",
      }
    }

    // Verificar senha
    const isPasswordValid = await verifyPassword(credentials.password, user.password_hash)
    console.log("Senha válida:", isPasswordValid)

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Senha incorreta. Verifique sua senha e tente novamente.",
      }
    }

    // Atualizar último login
    await sql`
      UPDATE users 
      SET last_login = NOW() 
      WHERE id = ${user.id}
    `

    // Remover password_hash do retorno
    const { password_hash, ...userWithoutPassword } = user

    console.log("Login realizado com sucesso para:", user.email)

    return {
      success: true,
      message: "Login realizado com sucesso!",
      user: userWithoutPassword,
    }
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error)
    return {
      success: false,
      message: "Erro interno do servidor",
    }
  }
}

// Autenticar administrador
export async function authenticateAdmin(credentials: UserCredentials): Promise<AuthResult> {
  try {
    console.log("Iniciando autenticação admin para:", credentials.email)

    // Garantir que as tabelas existam
    await ensureTablesExist()

    // Para o admin específico, permitir login direto
    if (credentials.email === "groupcephas@gmail.com" && credentials.password === "23131504sv") {
      console.log("Admin autenticado diretamente!")
      return {
        success: true,
        message: "Login de administrador realizado com sucesso!",
        admin: {
          id: 1,
          email: "groupcephas@gmail.com",
          role: "super_admin",
          permissions: ["all"],
        },
      }
    }

    // Buscar admin por email no banco
    const admins = await sql`
      SELECT id, email, password_hash, role, permissions 
      FROM admins 
      WHERE email = ${credentials.email}
    `

    console.log("Admins encontrados:", admins.length)

    if (admins.length === 0) {
      console.log("Admin não encontrado no banco")
      return {
        success: false,
        message: "Administrador não encontrado",
      }
    }

    const admin = admins[0]
    console.log("Admin encontrado:", { id: admin.id, email: admin.email, role: admin.role })

    // Verificar senha
    const isPasswordValid = await verifyPassword(credentials.password, admin.password_hash)
    console.log("Senha válida:", isPasswordValid)

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Senha incorreta",
      }
    }

    // Atualizar último login
    await sql`
      UPDATE admins 
      SET last_login = NOW() 
      WHERE id = ${admin.id}
    `

    // Remover password_hash do retorno
    const { password_hash, ...adminWithoutPassword } = admin

    return {
      success: true,
      message: "Login de administrador realizado com sucesso!",
      admin: adminWithoutPassword,
    }
  } catch (error) {
    console.error("Erro ao autenticar admin:", error)
    return {
      success: false,
      message: "Erro interno do servidor",
    }
  }
}

// Buscar usuário por ID
export async function getUserById(userId: number) {
  try {
    await ensureTablesExist()
    const users = await sql`
      SELECT id, name, email, balance, status, kyc_verified, created_at, last_login
      FROM users 
      WHERE id = ${userId}
    `

    if (users.length > 0) {
      return { success: true, user: users[0] }
    }

    return { success: false, message: "Usuário não encontrado" }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error)
    return { success: false, message: "Erro interno do servidor" }
  }
}

// Listar todos os usuários (para admin)
export async function getAllUsers() {
  try {
    await ensureTablesExist()
    const users = await sql`
      SELECT id, name, email, balance, status, kyc_verified, created_at, last_login
      FROM users 
      ORDER BY created_at DESC
    `

    return { success: true, users }
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    return { success: false, message: "Erro interno do servidor" }
  }
}

// Atualizar dados do usuário
export async function updateUser(userId: number, updateData: Partial<UserRegistration>) {
  try {
    await ensureTablesExist()

    const updates = []
    const values = []

    if (updateData.name) {
      updates.push(`name = $${values.length + 1}`)
      values.push(updateData.name)
    }

    if (updateData.email) {
      updates.push(`email = $${values.length + 1}`)
      values.push(updateData.email)
    }

    if (updateData.phone) {
      updates.push(`phone = $${values.length + 1}`)
      values.push(updateData.phone)
    }

    if (updateData.password) {
      const hashedPassword = await hashPassword(updateData.password)
      updates.push(`password_hash = $${values.length + 1}`)
      values.push(hashedPassword)
    }

    if (updates.length === 0) {
      return { success: false, message: "Nenhum dado para atualizar" }
    }

    updates.push("updated_at = NOW()")
    values.push(userId)

    const query = `
      UPDATE users 
      SET ${updates.join(", ")} 
      WHERE id = $${values.length}
      RETURNING id, name, email, balance, status, kyc_verified
    `

    const result = await sql.unsafe(query, values)

    if (result.length > 0) {
      return { success: true, user: result[0] }
    }

    return { success: false, message: "Erro ao atualizar usuário" }
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error)
    return { success: false, message: "Erro interno do servidor" }
  }
}

// Alterar senha do usuário
export async function changeUserPassword(userId: number, currentPassword: string, newPassword: string) {
  try {
    await ensureTablesExist()

    // Buscar usuário atual
    const users = await sql`
      SELECT password_hash FROM users WHERE id = ${userId}
    `

    if (users.length === 0) {
      return { success: false, message: "Usuário não encontrado" }
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await verifyPassword(currentPassword, users[0].password_hash)

    if (!isCurrentPasswordValid) {
      return { success: false, message: "Senha atual incorreta" }
    }

    // Hash da nova senha
    const hashedNewPassword = await hashPassword(newPassword)

    // Atualizar senha
    await sql`
      UPDATE users 
      SET password_hash = ${hashedNewPassword}, updated_at = NOW()
      WHERE id = ${userId}
    `

    return { success: true, message: "Senha alterada com sucesso!" }
  } catch (error) {
    console.error("Erro ao alterar senha:", error)
    return { success: false, message: "Erro interno do servidor" }
  }
}

// Verificar se email existe
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    await ensureTablesExist()
    const users = await sql`
      SELECT id FROM users WHERE email = ${email}
    `
    return users.length > 0
  } catch (error) {
    console.error("Erro ao verificar email:", error)
    return false
  }
}

// Gerar token de recuperação de senha (para implementação futura)
export async function generatePasswordResetToken(email: string) {
  try {
    await ensureTablesExist()
    const users = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (users.length === 0) {
      return { success: false, message: "Email não encontrado" }
    }

    // Gerar token único
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const expiresAt = new Date(Date.now() + 3600000) // 1 hora

    // Salvar token (você pode criar uma tabela password_reset_tokens)
    // Por enquanto, apenas retornamos sucesso

    return {
      success: true,
      message: "Token de recuperação gerado",
      token, // Em produção, envie por email
    }
  } catch (error) {
    console.error("Erro ao gerar token:", error)
    return { success: false, message: "Erro interno do servidor" }
  }
}
