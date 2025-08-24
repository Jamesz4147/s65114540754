-- CREATE DATABASE IF NOT EXISTS iot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE iot;

-- CREATE TABLE IF NOT EXISTS users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   full_name VARCHAR(100),
--   birth_date DATE NOT NULL,
--   email VARCHAR(100) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
--   phone VARCHAR(30),
--   fcm_token TEXT,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- ) ENGINE=InnoDB;

-- CREATE TABLE IF NOT EXISTS hosts (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   host_name VARCHAR(150) NOT NULL,
--   owner_id INT NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
-- ) ENGINE=InnoDB;

-- CREATE TABLE IF NOT EXISTS host_members (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   host_id INT NOT NULL,
--   user_id INT NOT NULL,
--   UNIQUE KEY uniq_host_user (host_id, user_id),
--   FOREIGN KEY (host_id) REFERENCES hosts(id) ON DELETE CASCADE,
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- ) ENGINE=InnoDB;

-- -- เผื่อโค้ดส่วนที่ยังอ้าง host_users
-- CREATE TABLE IF NOT EXISTS host_users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   host_id INT NOT NULL,
--   user_id INT NOT NULL,
--   UNIQUE KEY uniq_host_user2 (host_id, user_id),
--   FOREIGN KEY (host_id) REFERENCES hosts(id) ON DELETE CASCADE,
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- ) ENGINE=InnoDB;

-- CREATE TABLE IF NOT EXISTS health_data (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   hr DECIMAL(5,2) NOT NULL,
--   spo2 DECIMAL(5,2) NOT NULL,
--   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- ) ENGINE=InnoDB;

-- So just create tables directly.

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100),
  birth_date DATE NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  fcm_token TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hosts (
  id SERIAL PRIMARY KEY,
  host_name VARCHAR(150) NOT NULL,
  owner_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_hosts_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS host_members (
  id SERIAL PRIMARY KEY,
  host_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT uniq_host_user UNIQUE (host_id, user_id),
  CONSTRAINT fk_host_members_host FOREIGN KEY (host_id) REFERENCES hosts(id) ON DELETE CASCADE,
  CONSTRAINT fk_host_members_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Legacy support for host_users
CREATE TABLE IF NOT EXISTS host_users (
  id SERIAL PRIMARY KEY,
  host_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT uniq_host_user2 UNIQUE (host_id, user_id),
  CONSTRAINT fk_host_users_host FOREIGN KEY (host_id) REFERENCES hosts(id) ON DELETE CASCADE,
  CONSTRAINT fk_host_users_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS health_data (
  id SERIAL PRIMARY KEY,
  hr DECIMAL(5,2) NOT NULL,
  spo2 DECIMAL(5,2) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);