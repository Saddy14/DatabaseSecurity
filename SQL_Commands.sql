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



-- Create CreditCards table under Application schema
CREATE TABLE Application.CreditCards
(
CardID INT NOT NULL,
CardType NVARCHAR(50) NOT NULL,
CardNumber NVARCHAR(20) NOT NULL,
ExpMonth INT NOT NULL,
ExpYear INT NOT NULL,
UserID INT  NOT NULL
) ;

INSERT INTO Application.CreditCards
VALUES(1, 'SuperiorCard', '33332664695310', 10, 20, 991),
(2, 'Distinguish', '55552127249722', 11, 21, 156),
(3, 'ColonialVoice', '77778344838353', 10, 21, 1),
(4, 'ColonialVoice', '77774915718248', 12, 22, 920),
(5, 'Vista', '11114404600042', 12, 22, 949),
(6, 'Distinguish', '55557132036181', 12, 22, 912),
(7, 'Distinguish', '55553635401028', 10, 19, 65),
(8, 'SuperiorCard', '33336081193101', 10, 19, 69),
(9, 'Distinguish', '55553465625901', 12, 19, 846),
(10, 'SuperiorCard', '33332126386493', 12, 19, 495),
(11, 'SuperiorCard', '33335352517363', 11, 19, 6),
(12, 'SuperiorCard', '33334316194519', 11, 18, 79),
(13, 'Vista', '11119775847802', 10, 18, 60),
(14, 'Distinguish', '55553287727410', 12, 18, 60),
(15, 'SuperiorCard', '33336866065599', 11, 20, 817),
(16, 'Vista', '11111985451507', 10, 22, 22),
(17, 'ColonialVoice', '77771220960729', 12, 22, 929),
(18, 'ColonialVoice', '77773971683137', 10, 20, 473),
(19, 'ColonialVoice', '77779803886862', 20, 19, 505),
(20, 'SuperiorCard', '33332150058339', 10, 21, 436) ;