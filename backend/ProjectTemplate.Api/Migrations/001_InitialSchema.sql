-- ApolloSpark Initial Schema Migration
-- Creates tables for Artists, Events, ContentBlocks, and ContactMessages

-- Artists table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Artists')
BEGIN
    CREATE TABLE Artists (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(200) NOT NULL,
        Instrument NVARCHAR(100) NOT NULL DEFAULT '',
        Country NVARCHAR(100) NOT NULL DEFAULT '',
        Bio NVARCHAR(MAX) NOT NULL DEFAULT '',
        ImageUrl NVARCHAR(500) NOT NULL DEFAULT '',
        Featured BIT NOT NULL DEFAULT 0,
        SortOrder INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 NULL
    );

    -- Seed sample artists
    INSERT INTO Artists (Name, Instrument, Country, Bio, ImageUrl, Featured, SortOrder) VALUES
        ('Wei Chen', 'Piano', 'China', 'A rising virtuoso from the Shanghai Conservatory of Music, Wei Chen has captivated audiences across Asia with his emotionally rich interpretations of both classical and contemporary works.', '', 1, 1),
        ('Sarah Mitchell', 'Violin', 'USA', 'First-chair violinist with the New York Youth Orchestra, Sarah brings a passionate and technically brilliant approach to every performance. Her dream is to bridge musical traditions across cultures.', '', 1, 2),
        ('Liu Mei', 'Erhu', 'China', 'A master of the traditional erhu, Liu Mei blends centuries-old Chinese musical traditions with modern compositions, creating a unique sound that resonates with audiences worldwide.', '', 1, 3),
        ('James Park', 'Cello', 'USA', 'Award-winning cellist James Park has performed at Carnegie Hall and the Kennedy Center. He is passionate about mentoring the next generation of musicians.', '', 1, 4),
        ('Yuki Tanaka', 'Guzheng', 'China', 'Yuki Tanaka is redefining the guzheng for modern audiences, collaborating with Western orchestras and jazz ensembles to create groundbreaking cross-cultural performances.', '', 0, 5),
        ('Emily Rodriguez', 'Flute', 'USA', 'Emmy Rodriguez is a versatile flutist who specializes in both Western classical and Chinese bamboo flute traditions, embodying the spirit of cultural exchange in every note.', '', 0, 6);
END

-- Events table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Events')
BEGIN
    CREATE TABLE Events (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Title NVARCHAR(300) NOT NULL,
        Description NVARCHAR(MAX) NOT NULL DEFAULT '',
        EventDate DATETIME2 NOT NULL,
        Location NVARCHAR(300) NOT NULL DEFAULT '',
        ImageUrl NVARCHAR(500) NOT NULL DEFAULT '',
        IsUpcoming BIT NOT NULL DEFAULT 1,
        SortOrder INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 NULL
    );

    -- Seed sample events
    INSERT INTO Events (Title, Description, EventDate, Location, ImageUrl, IsUpcoming, SortOrder) VALUES
        ('Harmony Across Borders — 2025 Gala Concert', 'An evening of breathtaking performances featuring rising talents from both the USA and China. Experience the beauty of cultural exchange through music.', '2025-09-15 19:00:00', 'Lincoln Center, New York, NY', '', 1, 1),
        ('Summer Masterclass Series', 'A week-long intensive masterclass led by world-renowned musicians from both countries. Open to selected young artists ages 14-25.', '2025-07-10 09:00:00', 'Shanghai Conservatory of Music, Shanghai', '', 1, 2),
        ('Young Artists Showcase', 'Our annual showcase highlighting the extraordinary talent of mentored young musicians. Free admission, all are welcome.', '2025-08-20 18:00:00', 'Kennedy Center, Washington, DC', '', 1, 3),
        ('Beijing-Boston Cultural Bridge Concert', 'A landmark joint performance bringing together youth orchestras from Beijing and Boston for an unforgettable evening of shared artistry.', '2025-03-12 19:30:00', 'Boston Symphony Hall, Boston, MA', '', 0, 4),
        ('Spring Recital — New Voices', 'Debut performances from our newest class of mentored musicians, performing a mix of traditional Chinese and Western classical pieces.', '2025-01-28 18:00:00', 'Merkin Hall, New York, NY', '', 0, 5);
END

-- ContentBlocks table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ContentBlocks')
BEGIN
    CREATE TABLE ContentBlocks (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        [Key] NVARCHAR(100) NOT NULL UNIQUE,
        Title NVARCHAR(300) NOT NULL DEFAULT '',
        Body NVARCHAR(MAX) NOT NULL DEFAULT '',
        ImageUrl NVARCHAR(500) NOT NULL DEFAULT '',
        SortOrder INT NOT NULL DEFAULT 0,
        UpdatedAt DATETIME2 NULL
    );

    -- Seed content blocks
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder) VALUES
        ('founder_bio', 'Our Founder', 'Dr. Helen Zhang is a concert pianist, educator, and cultural ambassador who has dedicated her career to building bridges between the musical traditions of the USA and China. With over 25 years of experience performing on international stages and nurturing young talent, she founded ApolloSpark with the vision that music transcends borders and has the power to unite people across cultures. Her passion for mentoring the next generation of musicians has led to partnerships with leading conservatories in both countries.', '', 1),
        ('mission_statement', 'Our Mission', 'ApolloSpark is dedicated to promoting cultural exchange in the musical arts between the United States and China. We discover, nurture, and elevate young rising talents — providing them with world-class mentoring, performance exposure, and touring opportunities in both countries. Through the universal language of music, we build bridges of understanding, foster artistic excellence, and create lasting connections between two great musical traditions.', '', 2),
        ('about_history', 'Our Story', 'Founded in 2020, ApolloSpark emerged from a simple but powerful idea: that young musicians from the USA and China have much to learn from each other. What began as a small exchange program between two conservatories has grown into a vibrant nonprofit organization serving dozens of talented young artists each year. Our alumni have gone on to perform at prestigious venues around the world, and our programs continue to expand, reaching more communities and inspiring more young musicians to explore the beauty of cross-cultural collaboration.', '', 3),
        ('mentoring_program', 'Mentoring Program', 'Our flagship mentoring program pairs rising young musicians with established artists from both the USA and China. Over the course of a year, mentees receive one-on-one guidance, performance coaching, and career development support. Mentors share not only technical expertise but also cultural perspectives, helping young artists develop a deeper understanding of diverse musical traditions. The program culminates in a showcase performance where mentees debut new works inspired by their cross-cultural journey.', '', 4),
        ('touring_program', 'Touring Opportunities', 'ApolloSpark organizes annual touring programs that bring young musicians to perform in major cities across both countries. Our USA-China Concert Tour gives selected artists the chance to perform at prestigious venues, connect with local musicians, and experience the rich cultural heritage of each country firsthand. Past tours have included performances in New York, Shanghai, San Francisco, Beijing, and more. These tours are transformative experiences that broaden artistic horizons and forge lifelong friendships.', '', 5),
        ('masterclass_program', 'Masterclasses', 'Our masterclass series brings world-class musicians to teach intensive workshops for young artists. These multi-day events combine technical instruction with cultural immersion, giving participants the opportunity to learn from masters of both Western classical and Chinese traditional music. Topics range from performance technique and interpretation to the history and philosophy of music in both cultures. Masterclasses are held at leading conservatories and concert halls in the USA and China.', '', 6);
END

-- ContactMessages table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ContactMessages')
BEGIN
    CREATE TABLE ContactMessages (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(200) NOT NULL,
        Email NVARCHAR(255) NOT NULL,
        Subject NVARCHAR(300) NOT NULL DEFAULT '',
        Message NVARCHAR(MAX) NOT NULL,
        IsRead BIT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );
END
