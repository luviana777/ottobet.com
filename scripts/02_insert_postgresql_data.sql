-- Inserir dados iniciais no PostgreSQL Otto Bet
-- Dados de exemplo para o cassino

-- Inserir administrador principal (senha: 23131504sv)
INSERT INTO admins (email, password_hash, role, permissions) VALUES 
('groupcephas@gmail.com', '$2b$10$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 'super_admin', 
'{"users": ["read", "write", "delete"], "games": ["read", "write", "delete"], "financial": ["read", "write"], "reports": ["read"], "system": ["read", "write"]}'::jsonb)
ON CONFLICT (email) DO NOTHING;

-- Inserir jogos populares
INSERT INTO games (name, provider, category, rtp, status, min_bet, max_bet) VALUES
('Gates of Olympus', 'Pragmatic Play', 'slots', 96.50, 'active', 0.20, 5000.00),
('Sweet Bonanza', 'Pragmatic Play', 'slots', 96.48, 'active', 0.20, 5000.00),
('Book of Dead', 'Play''n GO', 'slots', 94.25, 'active', 0.10, 2500.00),
('Starburst', 'NetEnt', 'slots', 96.09, 'active', 0.10, 1000.00),
('Mega Moolah', 'Microgaming', 'slots', 88.12, 'active', 0.25, 6.25),
('Gonzo''s Quest', 'NetEnt', 'slots', 95.97, 'active', 0.20, 2500.00),
('Blackjack Classic', 'Evolution Gaming', 'table', 99.28, 'active', 1.00, 10000.00),
('European Roulette', 'Evolution Gaming', 'table', 97.30, 'active', 0.50, 5000.00),
('Baccarat', 'Evolution Gaming', 'table', 98.76, 'active', 1.00, 15000.00),
('Crazy Time', 'Evolution Gaming', 'live', 96.08, 'active', 0.10, 2500.00),
('Lightning Roulette', 'Evolution Gaming', 'live', 97.30, 'active', 0.20, 5000.00),
('Dream Catcher', 'Evolution Gaming', 'live', 96.58, 'active', 0.10, 2500.00),
('Aviator', 'Spribe', 'crash', 97.00, 'active', 0.10, 10000.00),
('JetX', 'SmartSoft Gaming', 'crash', 97.00, 'active', 0.10, 10000.00),
('Mines', 'Spribe', 'instant', 97.00, 'active', 0.10, 1000.00)
ON CONFLICT DO NOTHING;

-- Inserir usuários de exemplo (senhas: password123)
INSERT INTO users (name, email, phone, password_hash, balance, status, kyc_verified, last_login) VALUES
('João Silva', 'joao@email.com', '11999999999', '$2b$10$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 1250.50, 'active', TRUE, '2024-01-15 14:30:00'),
('Maria Santos', 'maria@email.com', '11888888888', '$2b$10$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 850.00, 'suspended', TRUE, '2024-01-14 09:15:00'),
('Pedro Costa', 'pedro@email.com', '11777777777', '$2b$10$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 2100.75, 'active', TRUE, '2024-01-15 16:45:00'),
('Ana Oliveira', 'ana@email.com', '11666666666', '$2b$10$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 450.25, 'pending_kyc', FALSE, '2024-01-13 11:20:00'),
('Carlos Ferreira', 'carlos@email.com', '11555555555', '$2b$10$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 3200.00, 'active', TRUE, '2024-01-15 18:20:00'),
('Lucia Mendes', 'lucia@email.com', '11444444444', '$2b$10$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 750.00, 'active', TRUE, '2024-01-15 12:00:00'),
('Roberto Lima', 'roberto@email.com', '11333333333', '$2b$10$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 1500.25, 'active', TRUE, '2024-01-15 19:30:00'),
('Fernanda Souza', 'fernanda@email.com', '11222222222', '$2b$10$N9qo8uLOickgx2ZMRZoMye.Uo04/OZLnQpjjf4Cu.dDt7/C5.JRrq', 320.00, 'pending_kyc', FALSE, '2024-01-14 16:15:00')
ON CONFLICT (email) DO NOTHING;

-- Inserir transações de exemplo
INSERT INTO transactions (user_id, type, amount, status, payment_method, description, created_at) VALUES
(1, 'deposit', 500.00, 'completed', 'PIX', 'Depósito via PIX', '2024-01-15 10:30:00'),
(1, 'bet', -50.00, 'completed', NULL, 'Aposta em Gates of Olympus', '2024-01-15 11:00:00'),
(1, 'win', 150.00, 'completed', NULL, 'Ganho em Gates of Olympus', '2024-01-15 11:00:00'),
(1, 'bet', -25.00, 'completed', NULL, 'Aposta em Sweet Bonanza', '2024-01-15 12:00:00'),
(2, 'deposit', 200.00, 'completed', 'Credit Card', 'Depósito via cartão', '2024-01-14 08:00:00'),
(2, 'bet', -30.00, 'completed', NULL, 'Aposta em Gates of Olympus', '2024-01-14 10:00:00'),
(2, 'withdrawal', -100.00, 'pending', 'PIX', 'Saque via PIX', '2024-01-14 15:30:00'),
(3, 'deposit', 1000.00, 'completed', 'PIX', 'Depósito via PIX', '2024-01-15 12:00:00'),
(3, 'bet', -200.00, 'completed', NULL, 'Aposta em Blackjack', '2024-01-15 13:00:00'),
(3, 'win', 380.00, 'completed', NULL, 'Ganho em Blackjack', '2024-01-15 13:05:00'),
(3, 'bet', -100.00, 'completed', NULL, 'Aposta em European Roulette', '2024-01-15 14:00:00'),
(3, 'withdrawal', -500.00, 'flagged', 'PIX', 'Saque suspeito - valor alto', '2024-01-15 16:00:00'),
(4, 'deposit', 150.00, 'completed', 'PIX', 'Primeiro depósito', '2024-01-13 10:00:00'),
(4, 'bet', -10.00, 'completed', NULL, 'Aposta em Starburst', '2024-01-13 11:00:00'),
(4, 'win', 25.00, 'completed', NULL, 'Ganho em Starburst', '2024-01-13 11:00:45'),
(5, 'deposit', 2000.00, 'completed', 'Bank Transfer', 'Depósito via transferência', '2024-01-15 09:00:00'),
(5, 'bet', -500.00, 'completed', NULL, 'Aposta em Gates of Olympus', '2024-01-15 15:00:00'),
(6, 'deposit', 300.00, 'completed', 'PIX', 'Depósito via PIX', '2024-01-15 11:00:00'),
(6, 'bet', -50.00, 'completed', NULL, 'Aposta em Aviator', '2024-01-15 12:30:00'),
(6, 'win', 125.00, 'completed', NULL, 'Ganho em Aviator', '2024-01-15 12:30:30'),
(7, 'deposit', 800.00, 'completed', 'PIX', 'Depósito via PIX', '2024-01-15 18:00:00'),
(7, 'bet', -100.00, 'completed', NULL, 'Aposta em Lightning Roulette', '2024-01-15 19:00:00'),
(8, 'deposit', 100.00, 'completed', 'PIX', 'Primeiro depósito', '2024-01-14 15:00:00');

-- Inserir apostas de exemplo
INSERT INTO bets (user_id, game_id, bet_amount, win_amount, multiplier, status, created_at, completed_at) VALUES
(1, 1, 50.00, 150.00, 3.00, 'won', '2024-01-15 11:00:00', '2024-01-15 11:00:30'),
(1, 2, 25.00, 0.00, 0.00, 'lost', '2024-01-15 12:00:00', '2024-01-15 12:00:15'),
(2, 1, 30.00, 0.00, 0.00, 'lost', '2024-01-14 10:00:00', '2024-01-14 10:00:20'),
(3, 7, 200.00, 380.00, 1.90, 'won', '2024-01-15 13:00:00', '2024-01-15 13:05:00'),
(3, 8, 100.00, 0.00, 0.00, 'lost', '2024-01-15 14:00:00', '2024-01-15 14:02:00'),
(4, 4, 10.00, 25.00, 2.50, 'won', '2024-01-13 11:00:00', '2024-01-13 11:00:45'),
(5, 1, 500.00, 0.00, 0.00, 'lost', '2024-01-15 15:00:00', '2024-01-15 15:01:00'),
(6, 13, 50.00, 125.00, 2.50, 'won', '2024-01-15 12:30:00', '2024-01-15 12:30:30'),
(7, 11, 100.00, 0.00, 0.00, 'lost', '2024-01-15 19:00:00', '2024-01-15 19:02:00'),
(1, 13, 20.00, 60.00, 3.00, 'won', '2024-01-15 13:30:00', '2024-01-15 13:30:15'),
(3, 1, 75.00, 0.00, 0.00, 'lost', '2024-01-15 15:30:00', '2024-01-15 15:30:45'),
(6, 2, 30.00, 90.00, 3.00, 'won', '2024-01-15 14:00:00', '2024-01-15 14:00:30');

-- Inserir atividades suspeitas
INSERT INTO suspicious_activity (user_id, activity_type, description, severity, ip_address, created_at) VALUES
(3, 'large_withdrawal', 'Tentativa de saque de R$ 500 - valor acima do padrão do usuário', 'medium', '192.168.1.100'::inet, '2024-01-15 16:00:00'),
(2, 'multiple_failed_logins', 'Múltiplas tentativas de login falharam', 'low', '192.168.1.200'::inet, '2024-01-14 08:30:00'),
(NULL, 'unusual_betting_pattern', 'Padrão de apostas incomum detectado', 'high', '192.168.1.300'::inet, '2024-01-15 17:00:00'),
(5, 'high_frequency_betting', 'Apostas em alta frequência detectadas', 'medium', '192.168.1.150'::inet, '2024-01-15 15:30:00'),
(NULL, 'potential_bot_activity', 'Atividade suspeita de bot detectada', 'high', '192.168.1.400'::inet, '2024-01-15 20:00:00');

-- Inserir promoções
INSERT INTO promotions (name, description, type, bonus_amount, bonus_percentage, min_deposit, wagering_requirement, max_bonus, valid_from, valid_until, terms_conditions) VALUES
('Bônus de Boas-vindas', 'Ganhe 100% até R$ 50.000 no seu primeiro depósito', 'welcome_bonus', NULL, 100.00, 50.00, 35, 50000.00, '2024-01-01 00:00:00', '2024-12-31 23:59:59', 'Válido apenas para novos usuários. Rollover de 35x.'),
('Cashback Semanal', 'Receba 15% de volta nas suas perdas da semana', 'cashback', NULL, 15.00, 100.00, 1, 5000.00, '2024-01-01 00:00:00', '2024-12-31 23:59:59', 'Cashback calculado automaticamente toda segunda-feira.'),
('Torneio de Slots', 'Participe do torneio semanal de slots', 'tournament', 100000.00, NULL, NULL, 1, NULL, '2024-01-15 00:00:00', '2024-01-21 23:59:59', 'Prêmio total de R$ 100.000 distribuído entre os top 100.'),
('Giros Grátis Diários', 'Ganhe 50 giros grátis todos os dias', 'free_spins', 50.00, NULL, 20.00, 25, 500.00, '2024-01-01 00:00:00', '2024-12-31 23:59:59', 'Válido para jogos selecionados. Rollover de 25x.'),
('Bônus de Recarga', 'Ganhe 50% de bônus em recargas', 'deposit_bonus', NULL, 50.00, 100.00, 30, 10000.00, '2024-01-01 00:00:00', '2024-12-31 23:59:59', 'Válido para depósitos acima de R$ 100.');

-- Inserir verificações KYC
INSERT INTO kyc_verifications (user_id, document_type, document_number, status, created_at) VALUES
(1, 'CPF', '123.456.789-00', 'approved', '2024-01-10 10:00:00'),
(2, 'RG', '12.345.678-9', 'approved', '2024-01-08 14:00:00'),
(3, 'CNH', '12345678900', 'approved', '2024-01-12 16:00:00'),
(4, 'CPF', '987.654.321-00', 'pending', '2024-01-13 12:00:00'),
(5, 'CPF', '456.789.123-00', 'approved', '2024-01-11 09:00:00'),
(6, 'RG', '98.765.432-1', 'approved', '2024-01-14 11:00:00'),
(7, 'CNH', '98765432100', 'approved', '2024-01-13 15:00:00'),
(8, 'CPF', '321.654.987-00', 'pending', '2024-01-14 16:00:00');

-- Inserir bônus de usuários
INSERT INTO user_bonuses (user_id, promotion_id, bonus_amount, wagering_requirement, wagered_amount, status, expires_at, created_at) VALUES
(1, 1, 500.00, 17500.00, 5000.00, 'active', '2024-02-15 10:30:00', '2024-01-15 10:30:00'),
(4, 1, 150.00, 5250.00, 0.00, 'active', '2024-02-13 10:00:00', '2024-01-13 10:00:00'),
(5, 1, 2000.00, 70000.00, 15000.00, 'active', '2024-02-15 09:00:00', '2024-01-15 09:00:00'),
(6, 2, 75.00, 75.00, 75.00, 'completed', '2024-01-22 11:00:00', '2024-01-15 11:00:00'),
(8, 1, 100.00, 3500.00, 0.00, 'active', '2024-02-14 15:00:00', '2024-01-14 15:00:00');

-- Inserir configurações do sistema
INSERT INTO system_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'Otto Bet', 'string', 'Nome do site'),
('max_withdrawal_daily', '50000.00', 'number', 'Limite máximo de saque diário em R$'),
('min_deposit', '10.00', 'number', 'Valor mínimo de depósito em R$'),
('kyc_required_amount', '2000.00', 'number', 'Valor que requer verificação KYC em R$'),
('maintenance_mode', 'false', 'boolean', 'Modo de manutenção do site'),
('welcome_bonus_enabled', 'true', 'boolean', 'Bônus de boas-vindas ativo'),
('max_bet_multiplier', '1000', 'number', 'Multiplicador máximo permitido'),
('session_timeout', '3600', 'number', 'Timeout da sessão em segundos'),
('fraud_detection_enabled', 'true', 'boolean', 'Sistema de detecção de fraude ativo'),
('support_email', 'suporte@ottobet.com', 'string', 'Email de suporte')
ON CONFLICT (setting_key) DO NOTHING;

-- Inserir logs do sistema
INSERT INTO system_logs (level, message, context, user_id, admin_id, ip_address, created_at) VALUES
('info', 'Sistema iniciado com sucesso', '{"version": "1.0.0", "environment": "production"}'::jsonb, NULL, 1, '127.0.0.1'::inet, '2024-01-15 00:00:00'),
('info', 'Usuário realizou login', '{"login_method": "email"}'::jsonb, 1, NULL, '192.168.1.100'::inet, '2024-01-15 14:30:00'),
('warning', 'Tentativa de saque suspeita detectada', '{"amount": 500.00, "reason": "high_amount"}'::jsonb, 3, NULL, '192.168.1.100'::inet, '2024-01-15 16:00:00'),
('error', 'Falha na conexão com provedor de jogos', '{"provider": "Pragmatic Play", "error": "timeout"}'::jsonb, NULL, NULL, NULL, '2024-01-15 10:15:00'),
('info', 'Administrador acessou painel', '{"section": "user_management"}'::jsonb, NULL, 1, '192.168.1.50'::inet, '2024-01-15 09:00:00');

SELECT 'DADOS POSTGRESQL INSERIDOS COM SUCESSO!' as status;
