-- Custom migration to handle existing posts
-- This migration creates a default admin user and links all existing posts to that user

-- Step 1: Create a default admin user
-- Password: 'admin123' (hashed with bcrypt)
INSERT INTO users (id, email, name, password_hash, is_admin, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@agri-starter.local',
  'システム管理者',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  1,
  strftime('%s', 'now'),
  strftime('%s', 'now')
);

-- Step 2: Update all existing posts to be owned by the default admin user
UPDATE posts 
SET user_id = '00000000-0000-0000-0000-000000000001'
WHERE user_id IS NULL;
