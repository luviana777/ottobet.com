-- Script rápido para configurar o banco do zero
-- Execute este script se quiser recriar tudo rapidamente

-- 1. Remover todas as tabelas se existirem
DROP TABLE IF EXISTS system_logs CASCADE;
DROP TABLE IF EXISTS system_settings CASCADE;
DROP TABLE IF EXISTS user_bonuses CASCADE;
DROP TABLE IF EXISTS promotions CASCADE;
DROP TABLE IF EXISTS kyc_verifications CASCADE;
DROP TABLE IF EXISTS suspicious_activity CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS bets CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 2. Remover função se existir
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- 3. Criar estrutura básica
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    balance DECIMAL(12,2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'active',
    kyc_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    permissions JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    rtp DECIMAL(5,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    min_bet DECIMAL(10,2) DEFAULT 0.10,
    max_bet DECIMAL(10,2) DEFAULT 1000.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    type VARCHAR(20) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Inserir dados essenciais
INSERT INTO admins (email, password_hash, role, permissions) VALUES 
('groupcephas@gmail.com', '$2b$12$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 'super_admin', 
'{"users": ["read", "write", "delete"], "games": ["read", "write", "delete"]}'::jsonb);

INSERT INTO games (name, provider, category, rtp) VALUES
('Gates of Olympus', 'Pragmatic Play', 'slots', 96.50),
('Sweet Bonanza', 'Pragmatic Play', 'slots', 96.48),
('Aviator', 'Spribe', 'crash', 97.00);

INSERT INTO users (name, email, password_hash, balance) VALUES
('João Silva', 'joao@email.com', '$2b$12$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 1000.00),
('Maria Santos', 'maria@email.com', '$2b$12$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 500.00);

INSERT INTO transactions (user_id, type, amount, status, description) VALUES
(1, 'deposit', 500.00, 'completed', 'Depósito inicial'),
(2, 'deposit', 300.00, 'completed', 'Depósito inicial');

SELECT 'CONFIGURAÇÃO RÁPIDA CONCLUÍDA!' as status;
SELECT 'Admin: groupcephas@gmail.com / 23131504sv' as credenciais;
SELECT 'Users: joao@email.com, maria@email.com / password123' as usuarios_teste;
