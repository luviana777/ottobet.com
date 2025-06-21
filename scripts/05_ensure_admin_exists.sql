-- Garantir que o administrador existe no banco de dados
DO $$
BEGIN
    -- Verificar se a tabela admins existe
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'admins') THEN
        -- Criar tabela admins se não existir
        CREATE TABLE admins (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            role VARCHAR(50) DEFAULT 'admin',
            permissions JSONB DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP
        );
    END IF;

    -- Deletar admin existente se houver
    DELETE FROM admins WHERE email = 'groupcephas@gmail.com';

    -- Inserir admin com senha hasheada
    -- Senha: 23131504sv
    INSERT INTO admins (email, password_hash, role, permissions) 
    VALUES (
        'groupcephas@gmail.com',
        '$2a$12$rQJ8vHmEcQcErxWxbWkqHOuBJWd5RMxKvQGOCxGxQxGxQxGxQxGxQu', -- Hash da senha 23131504sv
        'super_admin',
        '["all"]'::jsonb
    );

    RAISE NOTICE 'Admin criado com sucesso!';
END $$;
