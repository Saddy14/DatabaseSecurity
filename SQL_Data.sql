DROP TABLE [schema_name].[table_name];

create schema Application.Users


-- Create Users table under User schema
CREATE TABLE Application.Users (
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

INSERT INTO Application.Users (name, gender, email, phone, MyKad, password, Type) VALUES
('Ali Bin Ahmad', 'Male', 'ali@example.com', '012-3456789', '900101-14-1234', 'passAli123', 'Tenant'),
('Siti Nurhaliza', 'Female', 'siti@example.com', '013-7654321', '880212-10-5678', 'sitiPass88', 'Tenant'),
('Lim Wei Jie', 'Male', 'lim@example.com', '017-1122334', '950305-08-9999', 'limSecure95', 'Tenant'),
('Ahmad Zaki', 'Male', 'ahmad@example.com', '014-1234567', '910102-04-1111', 'ahmadPass123', 'Tenant'),
('Maya Aishah', 'Female', 'maya@example.com', '019-8765432', '950509-12-2222', 'mayaPass55', 'Tenant'),
('John Tan', 'Male', 'john@example.com', '016-3456789', '890703-10-5555', 'johnSecure99', 'Tenant'),
('Nurul Iman', 'Female', 'nurul@example.com', '013-1239876', '890819-05-3434', 'nurulPass88', 'Tenant'),
('David Ong', 'Male', 'david@example.com', '017-9087654', '950104-03-2222', 'davidSecure77', 'Tenant'),
('Lina Muthu', 'Female', 'lina@example.com', '011-2233445', '920312-06-4321', 'linaPass99', 'Tenant'),
('Mohd Reza', 'Male', 'reza@example.com', '018-1122333', '930623-02-9876', 'rezaPass100', 'Tenant'),
('Fatin Zara', 'Female', 'fatin@example.com', '016-6677889', '910920-11-8765', 'fatinSecure66', 'Tenant'),
('Kumar Ramasamy', 'Male', 'kumar@example.com', '014-9988776', '911212-09-5432', 'kumarPass22', 'Tenant'),
('Emily Lee', 'Female', 'emily@example.com', '019-1234445', '950506-10-1111', 'emilyPass55', 'Tenant'),
('Azlan Hussin', 'Male', 'azlan@example.com', '011-3344556', '890802-01-3333', 'azlanPass44', 'Tenant'),
('Carla Gomez', 'Female', 'carla@example.com', '013-7755332', '910404-07-8888', 'carlaPass22', 'Tenant'),
('Khalid Ibrahim', 'Male', 'khalid@example.com', '018-1238899', '950215-11-6666', 'khalidSecure44', 'Tenant'),
('Siti Zulaikha', 'Female', 'zulaikha@example.com', '016-4433221', '890613-02-4444', 'zulaikhaPass33', 'Tenant'),
('Vincent Tan', 'Male', 'vincent@example.com', '014-5556677', '900505-10-2222', 'vincentPass101', 'Tenant'),
('Aisha Binti Zaki', 'Female', 'aisha@example.com', '013-8877665', '910701-12-9988', 'aishaPass123', 'Tenant'),
('Mohd Amirul', 'Male', 'amirul@example.com', '019-4455778', '920804-11-5555', 'amirulSecure88', 'Tenant');


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

-- Create Properties table under Application schema

CREATE TABLE Application.Property (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    bedroom INT NOT NULL,
    bathroom INT NOT NULL
);

INSERT INTO Application.Property (name, location, bedroom, bathroom) VALUES
('Sunny Meadows', 'Los Angeles, CA', 3, 2),
('Lakeside Villa', 'San Francisco, CA', 4, 3),
('Mountain Retreat', 'Denver, CO', 2, 1),
('City Center Loft', 'New York, NY', 1, 1),
('Beachfront Paradise', 'Miami, FL', 5, 4),
('Cozy Cottage', 'Austin, TX', 2, 1),
('Downtown Penthouse', 'Chicago, IL', 3, 2),
('Suburban Family Home', 'Dallas, TX', 4, 2),
('Luxury Condo', 'Seattle, WA', 3, 3),
('Countryside Manor', 'Nashville, TN', 6, 5);

-- optional for property
-- Step 1: Add column as nullable
ALTER TABLE Application.Property
ADD ownerID INT NULL;

-- Step 2: Update existing rows with valid User IDs
-- Example: Assign all to a default landlord (e.g., UserID = 1)
UPDATE Application.Property
SET ownerID = 1;

-- Step 3: Alter column to be NOT NULL
ALTER TABLE Application.Property
ALTER COLUMN ownerID INT NOT NULL;

-- Step 4: Add foreign key constraint
ALTER TABLE Application.Property
ADD CONSTRAINT FK_Property_User FOREIGN KEY (ownerID) REFERENCES Application.Users(id);
