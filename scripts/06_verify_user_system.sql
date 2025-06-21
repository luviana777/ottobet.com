-- Verificar se o sistema de usuários está funcionando
SELECT 'Verificando tabela users...' as status;

-- Verificar estrutura da tabela users
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- Contar usuários existentes
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
    COUNT(CASE WHEN kyc_verified = true THEN 1 END) as verified_users
FROM users;

-- Mostrar alguns usuários de exemplo (sem senhas)
SELECT 
    id,
    name,
    email,
    balance,
    status,
    kyc_verified,
    created_at,
    last_login
FROM users 
ORDER BY created_at DESC 
LIMIT 5;

SELECT 'Sistema de usuários verificado!' as status;
