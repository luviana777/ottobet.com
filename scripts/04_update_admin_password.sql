-- Atualizar senha do administrador principal para usar hash bcrypt
-- Senha: 23131504sv

UPDATE admins 
SET password_hash = '$2b$12$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq'
WHERE email = 'groupcephas@gmail.com';

-- Verificar se a atualização foi bem-sucedida
SELECT 
    email, 
    role, 
    CASE 
        WHEN password_hash LIKE '$2b$%' THEN 'Hash bcrypt válido'
        ELSE 'Hash inválido'
    END as password_status,
    created_at,
    last_login
FROM admins 
WHERE email = 'groupcephas@gmail.com';

SELECT 'SENHA DO ADMIN ATUALIZADA COM SUCESSO!' as status;
