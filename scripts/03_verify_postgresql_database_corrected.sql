-- Script de verificação da integridade do banco PostgreSQL Otto Bet
-- Script corrigido para PostgreSQL

-- Verificar se todas as tabelas foram criadas
SELECT 'TABELAS CRIADAS:' as info;
SELECT 
    schemaname as "Schema",
    tablename as "Tabela",
    tableowner as "Proprietario"
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Verificar usuários cadastrados
SELECT 'ESTATISTICAS DE USUARIOS:' as info;
SELECT 
    COUNT(*) as "Total_de_Usuarios",
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as "Usuarios_Ativos",
    SUM(CASE WHEN status = 'suspended' THEN 1 ELSE 0 END) as "Usuarios_Suspensos",
    SUM(CASE WHEN status = 'pending_kyc' THEN 1 ELSE 0 END) as "Pendente_KYC"
FROM users;

-- Verificar administradores
SELECT 'ADMINISTRADORES:' as info;
SELECT 
    COUNT(*) as "Total_de_Admins",
    STRING_AGG(email, ', ') as "Emails_dos_Admins"
FROM admins;

-- Verificar jogos disponíveis
SELECT 'ESTATISTICAS DE JOGOS:' as info;
SELECT 
    COUNT(*) as "Total_de_Jogos",
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as "Jogos_Ativos",
    SUM(CASE WHEN status = 'maintenance' THEN 1 ELSE 0 END) as "Em_Manutencao",
    COUNT(DISTINCT provider) as "Provedores"
FROM games;

-- Verificar transações
SELECT 'ESTATISTICAS FINANCEIRAS:' as info;
SELECT 
    COUNT(*) as "Total_de_Transacoes",
    ROUND(SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END), 2) as "Total_Depositos",
    ROUND(SUM(CASE WHEN type = 'withdrawal' THEN ABS(amount) ELSE 0 END), 2) as "Total_Saques",
    ROUND(SUM(CASE WHEN type = 'bet' THEN ABS(amount) ELSE 0 END), 2) as "Total_Apostado",
    ROUND(SUM(CASE WHEN type = 'win' THEN amount ELSE 0 END), 2) as "Total_Ganhos"
FROM transactions;

-- Verificar apostas
SELECT 'ESTATISTICAS DE APOSTAS:' as info;
SELECT 
    COUNT(*) as "Total_de_Apostas",
    SUM(CASE WHEN status = 'won' THEN 1 ELSE 0 END) as "Apostas_Ganhas",
    SUM(CASE WHEN status = 'lost' THEN 1 ELSE 0 END) as "Apostas_Perdidas",
    ROUND(AVG(bet_amount), 2) as "Aposta_Media",
    ROUND(MAX(win_amount), 2) as "Maior_Ganho"
FROM bets;

-- Verificar atividades suspeitas
SELECT 'ATIVIDADES SUSPEITAS:' as info;
SELECT 
    COUNT(*) as "Total_de_Atividades_Suspeitas",
    SUM(CASE WHEN severity = 'low' THEN 1 ELSE 0 END) as "Baixa",
    SUM(CASE WHEN severity = 'medium' THEN 1 ELSE 0 END) as "Media",
    SUM(CASE WHEN severity = 'high' THEN 1 ELSE 0 END) as "Alta",
    SUM(CASE WHEN severity = 'critical' THEN 1 ELSE 0 END) as "Critica"
FROM suspicious_activity;

-- Verificar KYC
SELECT 'VERIFICACOES KYC:' as info;
SELECT 
    COUNT(*) as "Total_de_Verificacoes_KYC",
    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as "Aprovadas",
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as "Pendentes",
    SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as "Rejeitadas"
FROM kyc_verifications;

-- Verificar promoções
SELECT 'PROMOCOES:' as info;
SELECT 
    COUNT(*) as "Total_de_Promocoes",
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as "Ativas",
    SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as "Inativas"
FROM promotions;

-- Verificar bônus de usuários
SELECT 'BONUS DE USUARIOS:' as info;
SELECT 
    COUNT(*) as "Total_de_Bonus",
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as "Ativos",
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as "Completados",
    ROUND(SUM(bonus_amount), 2) as "Valor_Total_em_Bonus"
FROM user_bonuses;

-- Verificar integridade das foreign keys
SELECT 'VERIFICACAO DE INTEGRIDADE:' as info;
SELECT 
    'Transacoes sem usuario' as "Verificacao",
    COUNT(*) as "Problemas"
FROM transactions t 
LEFT JOIN users u ON t.user_id = u.id 
WHERE u.id IS NULL

UNION ALL

SELECT 
    'Apostas sem usuario' as "Verificacao",
    COUNT(*) as "Problemas"
FROM bets b 
LEFT JOIN users u ON b.user_id = u.id 
WHERE u.id IS NULL

UNION ALL

SELECT 
    'Apostas sem jogo' as "Verificacao",
    COUNT(*) as "Problemas"
FROM bets b 
LEFT JOIN games g ON b.game_id = g.id 
WHERE g.id IS NULL

UNION ALL

SELECT 
    'KYC sem usuario' as "Verificacao",
    COUNT(*) as "Problemas"
FROM kyc_verifications k 
LEFT JOIN users u ON k.user_id = u.id 
WHERE u.id IS NULL;

-- Verificar saldos dos usuários (top 5)
SELECT 'TOP 5 USUARIOS POR SALDO:' as info;
SELECT 
    u.name as "Usuario",
    ROUND(u.balance, 2) as "Saldo_Atual",
    ROUND(COALESCE(SUM(CASE WHEN t.type = 'deposit' THEN t.amount ELSE 0 END), 0), 2) as "Total_Depositos",
    ROUND(COALESCE(SUM(CASE WHEN t.type = 'withdrawal' THEN ABS(t.amount) ELSE 0 END), 0), 2) as "Total_Saques",
    ROUND(COALESCE(SUM(CASE WHEN t.type = 'win' THEN t.amount ELSE 0 END), 0), 2) as "Total_Ganhos",
    ROUND(COALESCE(SUM(CASE WHEN t.type = 'bet' THEN ABS(t.amount) ELSE 0 END), 0), 2) as "Total_Apostado"
FROM users u
LEFT JOIN transactions t ON u.id = t.user_id AND t.status = 'completed'
GROUP BY u.id, u.name, u.balance
ORDER BY u.balance DESC
LIMIT 5;

-- Verificar configurações do sistema
SELECT 'CONFIGURACOES DO SISTEMA:' as info;
SELECT 
    setting_key as "Configuracao",
    setting_value as "Valor",
    setting_type as "Tipo",
    description as "Descricao"
FROM system_settings
ORDER BY setting_key;

-- Verificar logs recentes do sistema
SELECT 'LOGS RECENTES DO SISTEMA:' as info;
SELECT 
    level as "Nivel",
    message as "Mensagem",
    created_at as "Data_Hora"
FROM system_logs
ORDER BY created_at DESC
LIMIT 5;

-- Verificar jogos mais populares
SELECT 'JOGOS MAIS POPULARES:' as info;
SELECT 
    g.name as "Jogo",
    g.provider as "Provedor",
    COUNT(b.id) as "Total_de_Apostas",
    ROUND(SUM(b.bet_amount), 2) as "Volume_Apostado",
    ROUND(AVG(b.multiplier), 2) as "Multiplicador_Medio"
FROM games g
LEFT JOIN bets b ON g.id = b.game_id
GROUP BY g.id, g.name, g.provider
HAVING COUNT(b.id) > 0
ORDER BY COUNT(b.id) DESC
LIMIT 5;

-- Verificar informações da conexão
SELECT 'INFORMACOES DA CONEXAO:' as info;
SELECT 
    current_database() as "Banco_de_Dados",
    current_user as "Usuario_Conectado",
    inet_server_addr() as "Endereco_do_Servidor",
    inet_server_port() as "Porta_do_Servidor",
    version() as "Versao_PostgreSQL";

-- Status final
SELECT 
    'OTTO BET POSTGRESQL DATABASE' as "SISTEMA",
    'CONECTADO E OPERACIONAL' as "STATUS",
    'Banco Neon PostgreSQL configurado com sucesso!' as "RESULTADO";

-- Resumo final
SELECT 'RESUMO DA VERIFICACAO:' as info;
SELECT 
    'VERIFICACAO POSTGRESQL CONCLUIDA COM SUCESSO!' as "Status",
    NOW() as "Data_Hora_da_Verificacao",
    current_database() as "Banco_de_Dados",
    current_user as "Usuario_Conectado";
