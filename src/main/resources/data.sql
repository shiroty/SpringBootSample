INSERT INTO employee (id, name, age)
VALUES ('1', 'Tom', 30);

/* ユーザマスタ */
INSERT INTO m_user (
	user_id,
	password,
	user_name,
	birthday,
	age,
	gender,
	department_id,
	role
) VALUES ('system@co.jp', '$2a$10$6IbY83rk2P15ayg4LuFMD.GQ20kt.bmp9C2VQtFe/huiX8ULmSDXC', 'システム管理者', '2000-01-01', 21, 1, 1, 'ROLE_ADMIN')
,('user@co.jp', '$2a$10$6IbY83rk2P15ayg4LuFMD.GQ20kt.bmp9C2VQtFe/huiX8ULmSDXC', 'ユーザー1', '2000-01-01', 21, 2, 2, 'ROLE_GENERAL');

/* 部署マスタ */
INSERT INTO m_department(
	department_id,
	department_name
) values
(1, 'システム営業部')
,(2, '営業部');

/* 給料テーブル */
INSERT INTO t_salary(
	user_id,
	year_month,
	salary
) values
('user@co.jp', '2020/11', 280000)
,('user@co.jp', '2020/12', 280000)
,('user@co.jp', '2021/01', 280000)
;
