-- Script de verificação da integridade do banco de dados Otto Bet

-- Verificar se todas as tabelas foram criadas
SELECT 
    TABLE_NAME as 'Tabela',
    TABLE_ROWS as 'Registros',
    CREATE_TIME as 'Criada em'
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = DATABASE()
ORDER BY TABLE_NAME;

-- Verificar usuários cadastrados
SELECT 
    COUNT(*) as 'Total de Usuários',
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as 'Usuários Ativos',
    SUM(CASE WHEN status = 'suspended' THEN 1 ELSE 0 END) as 'Usuários Suspensos',
    SUM(CASE WHEN status = 'pending_kyc' THEN 1 ELSE 0 END) as 'Pendente KYC'
FROM users;

-- Verificar administradores
SELECT 
    COUNT(*) as 'Total de Admins',
    GROUP_CONCAT(email) as 'Emails dos Admins'
FROM admins;

-- Verificar jogos disponíveis
SELECT 
    COUNT(*) as 'Total de Jogos',
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as 'Jogos Ativos',
    SUM(CASE WHEN status = 'maintenance' THEN 1 ELSE 0 END) as 'Em Manutenção',
    COUNT(DISTINCT provider) as 'Provedores'
FROM games;

-- Verificar transações
SELECT 
    COUNT(*) as 'Total de Transações',
    SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) as 'Total Depósitos',
    SUM(CASE WHEN type = 'withdrawal' THEN ABS(amount) ELSE 0 END) as 'Total Saques',
    SUM(CASE WHEN type = 'bet' THEN ABS(amount) ELSE 0 END) as 'Total Apostado',
    SUM(CASE WHEN type = 'win' THEN amount ELSE 0 END) as 'Total Ganhos'
FROM transactions;

-- Verificar apostas
SELECT 
    COUNT(*) as 'Total de Apostas',
    SUM(CASE WHEN status = 'won' THEN 1 ELSE 0 END) as 'Apostas Ganhas',
    SUM(CASE WHEN status = 'lost' THEN 1 ELSE 0 END) as 'Apostas Perdidas',
    AVG(bet_amount) as 'Aposta Média',
    MAX(win_amount) as 'Maior Ganho'
FROM bets;

-- Verificar atividades suspeitas
SELECT 
    COUNT(*) as 'Total de Atividades Suspeitas',
    SUM(CASE WHEN severity = 'low' THEN 1 ELSE 0 END) as 'Baixa',
    SUM(CASE WHEN severity = 'medium' THEN 1 ELSE 0 END) as 'Média',
    SUM(CASE WHEN severity = 'high' THEN 1 ELSE 0 END) as 'Alta',
    SUM(CASE WHEN severity = 'critical' THEN 1 ELSE 0 END) as 'Crítica'
FROM suspicious_activity;

-- Verificar KYC
SELECT 
    COUNT(*) as 'Total de Verificações KYC',
    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as 'Aprovadas',
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as 'Pendentes',
    SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as 'Rejeitadas'
FROM kyc_verifications;

-- Verificar promoções
SELECT 
    COUNT(*) as 'Total de Promoções',
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as 'Ativas',
    SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as 'Inativas'
FROM promotions;

-- Verificar bônus de usuários
SELECT 
    COUNT(*) as 'Total de Bônus',
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as 'Ativos',
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as 'Completados',
    SUM(bonus_amount) as 'Valor Total em Bônus'
FROM user_bonuses;

-- Verificar integridade das foreign keys
SELECT 
    'Transações sem usuário' as 'Verificação',
    COUNT(*) as 'Problemas'
FROM transactions t 
LEFT JOIN users u ON t.user_id = u.id 
WHERE u.id IS NULL

UNION ALL

SELECT 
    'Apostas sem usuário' as 'Verificação',
    COUNT(*) as 'Problemas'
FROM bets b 
LEFT JOIN users u ON b.user_id = u.id 
WHERE u.id IS NULL

UNION ALL

SELECT 
    'Apostas sem jogo' as 'Verificação',
    COUNT(*) as 'Problemas'
FROM bets b 
LEFT JOIN games g ON b.game_id = g.id 
WHERE g.id IS NULL

UNION ALL

SELECT 
    'KYC sem usuário' as 'Verificação',
    COUNT(*) as 'Problemas'
FROM kyc_verifications k 
LEFT JOIN users u ON k.user_id = u.id 
WHERE u.id IS NULL;

-- Verificar saldos dos usuários
SELECT 
    u.name as 'Usuário',
    u.balance as 'Saldo Atual',
    COALESCE(SUM(CASE WHEN t.type = 'deposit' THEN t.amount ELSE 0 END), 0) as 'Total Depósitos',
    COALESCE(SUM(CASE WHEN t.type = 'withdrawal' THEN ABS(t.amount) ELSE 0 END), 0) as 'Total Saques',
    COALESCE(SUM(CASE WHEN t.type = 'win' THEN t.amount ELSE 0 END), 0) as 'Total Ganhos',
    COALESCE(SUM(CASE WHEN t.type = 'bet' THEN ABS(t.amount) ELSE 0 END), 0) as 'Total Apostado'
FROM users u
LEFT JOIN transactions t ON u.id = t.user_id AND t.status = 'completed'
GROUP BY u.id, u.name, u.balance
ORDER BY u.balance DESC;

-- Verificar configurações do sistema
SELECT 
    setting_key as 'Configuração',
    setting_value as 'Valor',
    setting_type as 'Tipo',
    description as 'Descrição'
FROM system_settings
ORDER BY setting_key;

-- Verificar logs recentes do sistema
SELECT 
    level as 'Nível',
    message as 'Mensagem',
    created_at as 'Data/Hora'
FROM system_logs
ORDER BY created_at DESC
LIMIT 10;

-- Resumo final
SELECT 
    'VERIFICAÇÃO CONCLUÍDA' as 'Status',
    NOW() as 'Data/Hora da Verificação',
    DATABASE() as 'Banco de Dados',
    USER() as 'Usuário Conectado';
