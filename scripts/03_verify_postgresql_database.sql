-- Script de verificação da integridade do banco PostgreSQL Otto Bet

-- Verificar se todas as tabelas foram criadas
SELECT 'TABELAS CRIADAS:' as info;
SELECT 
    schemaname as "Schema",
    tablename as "Tabela",
    tableowner as "Proprietário"
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Verificar usuários cadastrados
SELECT 'ESTATÍSTICAS DE USUÁRIOS:' as info;
SELECT 
    COUNT(*) as "Total de Usuários",
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as "Usuários Ativos",
    SUM(CASE WHEN status = 'suspended' THEN 1 ELSE 0 END) as "Usuários Suspensos",
    SUM(CASE WHEN status = 'pending_kyc' THEN 1 ELSE 0 END) as "Pendente KYC"
FROM users;

-- Verificar administradores
SELECT 'ADMINISTRADORES:' as info;
SELECT 
    COUNT(*) as "Total de Admins",
    STRING_AGG(email, ', ') as "Emails dos Admins"
FROM admins;

-- Verificar jogos disponíveis
SELECT 'ESTATÍSTICAS DE JOGOS:' as info;
SELECT 
    COUNT(*) as "Total de Jogos",
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as "Jogos Ativos",
    SUM(CASE WHEN status = 'maintenance' THEN 1 ELSE 0 END) as "Em Manutenção",
    COUNT(DISTINCT provider) as "Provedores"
FROM games;

-- Verificar transações
SELECT 'ESTATÍSTICAS FINANCEIRAS:' as info;
SELECT 
    COUNT(*) as "Total de Transações",
    ROUND(SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END), 2) as "Total Depósitos",
    ROUND(SUM(CASE WHEN type = 'withdrawal' THEN ABS(amount) ELSE 0 END), 2) as "Total Saques",
    ROUND(SUM(CASE WHEN type = 'bet' THEN ABS(amount) ELSE 0 END), 2) as "Total Apostado",
    ROUND(SUM(CASE WHEN type = 'win' THEN amount ELSE 0 END), 2) as "Total Ganhos"
FROM transactions;

-- Verificar apostas
SELECT 'ESTATÍSTICAS DE APOSTAS:' as info;
SELECT 
    COUNT(*) as "Total de Apostas",
    SUM(CASE WHEN status = 'won' THEN 1 ELSE 0 END) as "Apostas Ganhas",
    SUM(CASE WHEN status = 'lost' THEN 1 ELSE 0 END) as "Apostas Perdidas",
    ROUND(AVG(bet_amount), 2) as "Aposta Média",
    ROUND(MAX(win_amount), 2) as "Maior Ganho"
FROM bets;

-- Verificar atividades suspeitas
SELECT 'ATIVIDADES SUSPEITAS:' as info;
SELECT 
    COUNT(*) as "Total de Atividades Suspeitas",
    SUM(CASE WHEN severity = 'low' THEN 1 ELSE 0 END) as "Baixa",
    SUM(CASE WHEN severity = 'medium' THEN 1 ELSE 0 END) as "Média",
    SUM(CASE WHEN severity = 'high' THEN 1 ELSE 0 END) as "Alta",
    SUM(CASE WHEN severity = 'critical' THEN 1 ELSE 0 END) as "Crítica"
FROM suspicious_activity;

-- Verificar KYC
SELECT 'VERIFICAÇÕES KYC:' as info;
SELECT 
    COUNT(*) as "Total de Verificações KYC",
    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as "Aprovadas",
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as "Pendentes",
    SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as "Rejeitadas"
FROM kyc_verifications;

-- Verificar promoções
SELECT 'PROMOÇÕES:' as info;
SELECT 
    COUNT(*) as "Total de Promoções",
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as "Ativas",
    SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as "Inativas"
FROM promotions;

-- Verificar bônus de usuários
SELECT 'BÔNUS DE USUÁRIOS:' as info;
SELECT 
    COUNT(*) as "Total de Bônus",
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as "Ativos",
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as "Completados",
    ROUND(SUM(bonus_amount), 2) as "Valor Total em Bônus"
FROM user_bonuses;

-- Verificar integridade das foreign keys
SELECT 'VERIFICAÇÃO DE INTEGRIDADE:' as info;
SELECT 
    'Transações sem usuário' as "Verificação",
    COUNT(*) as "Problemas"
FROM transactions t 
LEFT JOIN users u ON t.user_id = u.id 
WHERE u.id IS NULL

UNION ALL

SELECT 
    'Apostas sem usuário' as "Verificação",
    COUNT(*) as "Problemas"
FROM bets b 
LEFT JOIN users u ON b.user_id = u.id 
WHERE u.id IS NULL

UNION ALL

SELECT 
    'Apostas sem jogo' as "Verificação",
    COUNT(*) as "Problemas"
FROM bets b 
LEFT JOIN games g ON b.game_id = g.id 
WHERE g.id IS NULL

UNION ALL

SELECT 
    'KYC sem usuário' as "Verificação",
    COUNT(*) as "Problemas"
FROM kyc_verifications k 
LEFT JOIN users u ON k.user_id = u.id 
WHERE u.id IS NULL;

-- Verificar saldos dos usuários (top 5)
SELECT 'TOP 5 USUÁRIOS POR SALDO:' as info;
SELECT 
    u.name as "Usuário",
    ROUND(u.balance, 2) as "Saldo Atual",
    ROUND(COALESCE(SUM(CASE WHEN t.type = 'deposit' THEN t.amount ELSE 0 END), 0), 2) as "Total Depósitos",
    ROUND(COALESCE(SUM(CASE WHEN t.type = 'withdrawal' THEN ABS(t.amount) ELSE 0 END), 0), 2) as "Total Saques",
    ROUND(COALESCE(SUM(CASE WHEN t.type = 'win' THEN t.amount ELSE 0 END), 0), 2) as "Total Ganhos",
    ROUND(COALESCE(SUM(CASE WHEN t.type = 'bet' THEN ABS(t.amount) ELSE 0 END), 0), 2) as "Total Apostado"
FROM users u
LEFT JOIN transactions t ON u.id = t.user_id AND t.status = 'completed'
GROUP BY u.id, u.name, u.balance
ORDER BY u.balance DESC
LIMIT 5;

-- Verificar configurações do sistema
SELECT 'CONFIGURAÇÕES DO SISTEMA:' as info;
SELECT 
    setting_key as "Configuração",
    setting_value as "Valor",
    setting_type as "Tipo",
    description as "Descrição"
FROM system_settings
ORDER BY setting_key;

-- Verificar logs recentes do sistema
SELECT 'LOGS RECENTES DO SISTEMA:' as info;
SELECT 
    level as "Nível",
    message as "Mensagem",
    created_at as "Data/Hora"
FROM system_logs
ORDER BY created_at DESC
LIMIT 5;

-- Verificar jogos mais populares
SELECT 'JOGOS MAIS POPULARES:' as info;
SELECT 
    g.name as "Jogo",
    g.provider as "Provedor",
    COUNT(b.id) as "Total de Apostas",
    ROUND(SUM(b.bet_amount), 2) as "Volume Apostado",
    ROUND(AVG(b.multiplier), 2) as "Multiplicador Médio"
FROM games g
LEFT JOIN bets b ON g.id = b.game_id
GROUP BY g.id, g.name, g.provider
HAVING COUNT(b.id) > 0
ORDER BY COUNT(b.id) DESC
LIMIT 5;

-- Verificar informações da conexão
SELECT 'INFORMAÇÕES DA CONEXÃO:' as info;
SELECT 
    current_database() as "Banco de Dados",
    current_user as "Usuário Conectado",
    inet_server_addr() as "Endereço do Servidor",
    inet_server_port() as "Porta do Servidor",
    version() as "Versão PostgreSQL";

-- Status final
SELECT 
    '🎰 OTTO BET POSTGRESQL DATABASE' as "SISTEMA",
    '✅ CONECTADO E OPERACIONAL' as "STATUS",
    'Banco Neon PostgreSQL configurado com sucesso!' as "RESULTADO";

-- Resumo final
SELECT 'RESUMO DA VERIFICAÇÃO:' as info;
SELECT 
    'VERIFICAÇÃO POSTGRESQL CONCLUÍDA COM SUCESSO!' as "Status",
    NOW() as "Data/Hora da Verificação",
    current_database() as "Banco de Dados",
    current_user as "Usuário Conectado";
