CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	status BOOLEAN DEFAULT false,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (name, email, password, status, created_at, updated_at)
VALUES
  ('Nguyễn Văn Anh', 'nguyenvananh@gmail.com', 'hashed_password_A', true, '2022-01-01 12:00:00', '2022-01-01 12:00:00'),
  ('Trần Thị Bình', 'tranthibinh@gmail.com', 'hashed_password_B', false, '2022-01-02 14:30:00', '2022-01-02 14:30:00'),
  ('Lê Văn Cường', 'levancuong@gmail.com', 'hashed_password_C', true, '2022-01-03 10:45:00', '2022-01-03 10:45:00'),
  ('Phạm Thị Dung', 'phamthidung@gmail.com', 'hashed_password_D', false, '2022-01-04 08:20:00', '2022-01-04 08:20:00'),
  ('Hoàng Văn Duy', 'hoangvanduy@gmail.com', 'hashed_password_E', true, '2022-01-05 17:15:00', '2022-01-05 17:15:00'),
  ('Nguyễn Thị Lan', 'nguyenthilan@gmail.com', 'hashed_password_F', false, '2022-01-06 09:30:00', '2022-01-06 09:30:00'),
  ('Trần Văn Giang', 'tranvangiang@gmail.com', 'hashed_password_G', true, '2022-01-07 16:40:00', '2022-01-07 16:40:00'),
  ('Lê Thị Hà', 'lethiha@gmail.com', 'hashed_password_H', false, '2022-01-08 11:55:00', '2022-01-08 11:55:00'),
  ('Phạm Văn Hải', 'phamvanhai@gmail.com', 'hashed_password_I', true, '2022-01-09 13:25:00', '2022-01-09 13:25:00'),
  ('Hoàng Thị Kim', 'hoangthikim@gmail.com', 'hashed_password_K', false, '2022-01-10 15:10:00', '2022-01-10 15:10:00');
