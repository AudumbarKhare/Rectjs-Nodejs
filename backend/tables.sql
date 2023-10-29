-- Role table

create table role(
id int primary key AUTO_INCREMENT,
role varchar(255),
role_code varchar(20),
status varchar(20)
);

INSERT INTO role(role,role_code,status) VALUES('Admin','AD','true');