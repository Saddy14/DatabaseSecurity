DROP TABLE [schema_name].[table_name];

create schema Application.Users


-- Create Users table under User schema
CREATE TABLE [User].[Users] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female')),
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    MyKad VARCHAR(14) NOT NULL, -- Format: YYMMDD-PB-####
    password VARCHAR(100) NOT NULL,
    Type VARCHAR(20) NOT NULL DEFAULT 'Tenant'
);


INSERT INTO Application.Users (name, gender, email, phone, MyKad, password, Type) VALUES
('Ali Bin Ahmad', 'Male', 'ali@example.com', '012-3456789', '900101-14-1234', 'passAli123', 'Tenant'),
('Siti Nurhaliza', 'Female', 'siti@example.com', '013-7654321', '880212-10-5678', 'sitiPass88', 'Tenant'),
('Lim Wei Jie', 'Male', 'lim@example.com', '017-1122334', '950305-08-9999', 'limSecure95', 'Tenant');