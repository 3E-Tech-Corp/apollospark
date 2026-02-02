-- Migration 002: Add Locale support to ContentBlocks, seed i18n content, update images

-- Step 1: Add Locale column to ContentBlocks
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('ContentBlocks') AND name = 'Locale')
BEGIN
    ALTER TABLE ContentBlocks ADD Locale NVARCHAR(5) NOT NULL CONSTRAINT DF_ContentBlocks_Locale DEFAULT 'en';

    -- Drop existing unique constraint on [Key]
    DECLARE @constraintName NVARCHAR(200);
    SELECT @constraintName = name FROM sys.key_constraints 
    WHERE parent_object_id = OBJECT_ID('ContentBlocks') AND type = 'UQ';
    IF @constraintName IS NOT NULL
        EXEC('ALTER TABLE ContentBlocks DROP CONSTRAINT [' + @constraintName + ']');

    -- Drop unique index on [Key] if exists
    DECLARE @indexName NVARCHAR(200);
    SELECT @indexName = i.name FROM sys.indexes i
    INNER JOIN sys.index_columns ic ON i.object_id = ic.object_id AND i.index_id = ic.index_id
    INNER JOIN sys.columns c ON ic.object_id = c.object_id AND ic.column_id = c.column_id
    WHERE i.object_id = OBJECT_ID('ContentBlocks') AND c.name = 'Key' AND i.is_unique = 1;
    IF @indexName IS NOT NULL
        EXEC('DROP INDEX [' + @indexName + '] ON ContentBlocks');

    -- Add composite unique constraint
    ALTER TABLE ContentBlocks ADD CONSTRAINT UQ_ContentBlocks_Key_Locale UNIQUE ([Key], Locale);
END

-- Step 2: Update existing EN content blocks with images
UPDATE ContentBlocks SET ImageUrl = 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&h=600&fit=crop' WHERE [Key] = 'founder_bio' AND Locale = 'en' AND ImageUrl = '';
UPDATE ContentBlocks SET ImageUrl = 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=600&fit=crop' WHERE [Key] = 'mission_statement' AND Locale = 'en' AND ImageUrl = '';
UPDATE ContentBlocks SET ImageUrl = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop' WHERE [Key] = 'about_history' AND Locale = 'en' AND ImageUrl = '';
UPDATE ContentBlocks SET ImageUrl = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop' WHERE [Key] = 'mentoring_program' AND Locale = 'en' AND ImageUrl = '';
UPDATE ContentBlocks SET ImageUrl = 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop' WHERE [Key] = 'touring_program' AND Locale = 'en' AND ImageUrl = '';
UPDATE ContentBlocks SET ImageUrl = 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&h=600&fit=crop' WHERE [Key] = 'masterclass_program' AND Locale = 'en' AND ImageUrl = '';

-- Step 3: Add new EN content blocks
IF NOT EXISTS (SELECT 1 FROM ContentBlocks WHERE [Key] = 'summer_intensive_program' AND Locale = 'en')
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale) VALUES
    ('summer_intensive_program', 'Summer Intensive', 'Our Summer Intensive is a transformative two-week program held annually at partnering conservatories in both the USA and China. Selected young musicians ages 14-25 immerse themselves in rigorous daily practice, ensemble rehearsals, and cultural workshops. Participants study with faculty from leading institutions like Juilliard, the Shanghai Conservatory, Curtis Institute, and the Central Conservatory of Music in Beijing. The program culminates in a public performance showcasing the collaborative works created during the intensive. Many past participants credit the Summer Intensive as a pivotal moment in their musical development.', 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=600&fit=crop', 7, 'en');

IF NOT EXISTS (SELECT 1 FROM ContentBlocks WHERE [Key] = 'concert_series_program' AND Locale = 'en')
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale) VALUES
    ('concert_series_program', 'Concert Series', 'The ApolloSpark Concert Series presents world-class performances featuring our talented young artists alongside established musicians from both the USA and China. Held at prestigious venues including Lincoln Center, the National Centre for the Performing Arts in Beijing, and the Shanghai Symphony Hall, our concerts celebrate the beauty of cross-cultural collaboration. Each concert weaves together Western classical repertoire with traditional Chinese compositions, creating a unique and unforgettable musical experience. Proceeds support our scholarship fund for aspiring young musicians.', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop', 8, 'en');

IF NOT EXISTS (SELECT 1 FROM ContentBlocks WHERE [Key] = 'about_vision' AND Locale = 'en')
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale) VALUES
    ('about_vision', 'Our Vision', 'We envision a world where music serves as a universal bridge between cultures, where young musicians from every background have the opportunity to learn from diverse traditions, and where artistic exchange strengthens the bonds between the people of the United States and China. By 2030, we aim to have supported over 500 young artists, established programs in 10 cities across both countries, and created a global alumni network that continues to foster cultural understanding through music for generations to come.', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop', 9, 'en');

-- Step 4: Insert Chinese (ZH) content blocks
IF NOT EXISTS (SELECT 1 FROM ContentBlocks WHERE [Key] = 'founder_bio' AND Locale = 'zh')
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale) VALUES
    ('founder_bio', N'创始人介绍', N'张海伦博士是一位杰出的音乐会钢琴家、教育家和文化大使，她的职业生涯致力于在中美两国的音乐传统之间架起桥梁。凭借超过25年的国际舞台表演经验和培养年轻人才的热忱，她创立了ApolloSpark，秉持着音乐超越国界、能够将不同文化的人们联结在一起的信念。她对指导下一代音乐家的热情推动了与两国顶尖音乐学院的合作伙伴关系。', 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&h=600&fit=crop', 1, 'zh');

IF NOT EXISTS (SELECT 1 FROM ContentBlocks WHERE [Key] = 'mission_statement' AND Locale = 'zh')
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale) VALUES
    ('mission_statement', N'我们的使命', N'ApolloSpark致力于促进中美两国在音乐艺术领域的文化交流。我们发掘、培养和提升年轻的新锐音乐人才，为他们提供世界一流的指导、演出机会以及在两国之间的巡演机会。通过音乐这一通用语言，我们搭建理解的桥梁，培育艺术卓越，并在两个伟大的音乐传统之间建立持久的联系。', 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=600&fit=crop', 2, 'zh');

IF NOT EXISTS (SELECT 1 FROM ContentBlocks WHERE [Key] = 'about_history' AND Locale = 'zh')
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale) VALUES
    ('about_history', N'我们的故事', N'ApolloSpark成立于2020年，源于一个简单而有力的理念：来自中美两国的年轻音乐家有很多可以互相学习的地方。从两所音乐学院之间的小型交流项目开始，如今已发展成为一个充满活力的非营利组织，每年为数十位才华横溢的年轻艺术家提供服务。我们的校友已在世界各地的知名场所登台演出，我们的项目也在不断扩展，触达更多社区，激励更多年轻音乐家探索跨文化合作的美好。', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop', 3, 'zh');

IF NOT EXISTS (SELECT 1 FROM ContentBlocks WHERE [Key] = 'mentoring_program' AND Locale = 'zh')
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale) VALUES
    ('mentoring_program', N'导师计划', N'我们的旗舰导师计划将崭露头角的年轻音乐家与来自中美两国的知名艺术家配对。在为期一年的项目中，学员将获得一对一的指导、演出辅导和职业发展支持。导师不仅分享技术专长，还传递文化视角，帮助年轻艺术家更深入地理解多元音乐传统。项目以一场展示演出为高潮，学员将首演受跨文化旅程启发而创作的新作品。', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop', 4, 'zh');

IF NOT EXISTS (SELECT 1 FROM ContentBlocks WHERE [Key] = 'touring_program' AND Locale = 'zh')
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale) VALUES
    ('touring_program', N'巡演机会', N'ApolloSpark每年组织巡演项目，带领年轻音乐家前往两国主要城市进行演出。我们的中美音乐巡演为入选艺术家提供在知名场所演出的机会，与当地音乐家交流互动，亲身感受两国丰富的文化遗产。过往巡演曾包括在纽约、上海、旧金山、北京等城市的演出。这些巡演是拓宽艺术视野、建立终生友谊的珍贵经历。', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop', 5, 'zh');

IF NOT EXISTS (SELECT 1 FROM ContentBlocks WHERE [Key] = 'masterclass_program' AND Locale = 'zh')
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale) VALUES
    ('masterclass_program', N'大师班', N'我们的大师班系列邀请世界顶级音乐家为年轻艺术家举办深度工作坊。这些为期多天的活动将技术指导与文化体验相结合，让参与者有机会向西方古典音乐和中国传统音乐的大师学习。课程涵盖演奏技巧、作品诠释以及两国音乐的历史与哲学。大师班在美国和中国的顶尖音乐学院和音乐厅举办。', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&h=600&fit=crop', 6, 'zh');

IF NOT EXISTS (SELECT 1 FROM ContentBlocks WHERE [Key] = 'summer_intensive_program' AND Locale = 'zh')
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale) VALUES
    ('summer_intensive_program', N'暑期密集课程', N'我们的暑期密集课程是每年在中美合作音乐学院举办的为期两周的变革性项目。入选的14-25岁年轻音乐家将沉浸在严格的日常练习、合奏排练和文化工作坊中。学员师从茱莉亚音乐学院、上海音乐学院、柯蒂斯音乐学院和中央音乐学院等顶尖学府的教师。项目以公开演出作为压轴，展示密集课程期间创作的合作作品。许多往届学员将暑期密集课程视为其音乐发展中的关键转折点。', 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=600&fit=crop', 7, 'zh');

IF NOT EXISTS (SELECT 1 FROM ContentBlocks WHERE [Key] = 'concert_series_program' AND Locale = 'zh')
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale) VALUES
    ('concert_series_program', N'音乐会系列', N'ApolloSpark音乐会系列呈现世界一流的演出，由我们才华横溢的年轻艺术家携手中美两国的知名音乐家共同登台。在林肯中心、北京国家大剧院和上海交响乐团音乐厅等著名场所举办的音乐会，颂扬跨文化合作之美。每场音乐会将西方古典曲目与中国传统作品巧妙交织，营造独特而难忘的音乐体验。演出收益将用于支持我们为有志年轻音乐家设立的奖学金基金。', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop', 8, 'zh');

IF NOT EXISTS (SELECT 1 FROM ContentBlocks WHERE [Key] = 'about_vision' AND Locale = 'zh')
    INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale) VALUES
    ('about_vision', N'我们的愿景', N'我们的愿景是创建一个音乐作为文化间通用桥梁的世界——让来自各种背景的年轻音乐家都有机会从多元传统中学习，让艺术交流加强中美两国人民之间的纽带。到2030年，我们的目标是支持超过500位年轻艺术家，在两国的10个城市建立项目，并创建一个全球校友网络，持续通过音乐促进文化理解，惠及子孙后代。', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop', 9, 'zh');

-- Step 5: Update existing Artists with image URLs and add new artists
UPDATE Artists SET ImageUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' WHERE Name = 'Wei Chen' AND ImageUrl = '';
UPDATE Artists SET ImageUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face' WHERE Name = 'Sarah Mitchell' AND ImageUrl = '';
UPDATE Artists SET ImageUrl = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face' WHERE Name = 'Liu Mei' AND ImageUrl = '';
UPDATE Artists SET ImageUrl = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face' WHERE Name = 'James Park' AND ImageUrl = '';
UPDATE Artists SET ImageUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face' WHERE Name = 'Yuki Tanaka' AND ImageUrl = '';
UPDATE Artists SET ImageUrl = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face' WHERE Name = 'Emily Rodriguez' AND ImageUrl = '';

IF NOT EXISTS (SELECT 1 FROM Artists WHERE Name = 'Zhang Hao')
    INSERT INTO Artists (Name, Instrument, Country, Bio, ImageUrl, Featured, SortOrder) VALUES
    ('Zhang Hao', 'Pipa', 'China', N'Zhang Hao is a virtuoso pipa player who has been praised for his ability to blend the ancient art of Chinese lute music with contemporary compositions. A graduate of the Central Conservatory of Music in Beijing, he has performed with orchestras across Asia and Europe. His innovative approach to the pipa has earned him recognition as one of the most exciting young traditional instrumentalists of his generation.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face', 1, 7);

IF NOT EXISTS (SELECT 1 FROM Artists WHERE Name = 'Sophia Williams')
    INSERT INTO Artists (Name, Instrument, Country, Bio, ImageUrl, Featured, SortOrder) VALUES
    ('Sophia Williams', 'Piano', 'USA', N'At just 19 years old, Sophia Williams has already won top prizes at the Van Cliburn Junior Competition and the International Chopin Competition for Young Pianists. A student at the Curtis Institute of Music, she is known for her mature interpretations and remarkable emotional depth. Her cross-cultural collaborations with Chinese musicians have been featured in documentaries about the future of classical music.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face', 1, 8);

-- Step 6: Update existing Events with image URLs and add new event
UPDATE Events SET ImageUrl = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=400&fit=crop' WHERE Title LIKE 'Harmony Across Borders%' AND ImageUrl = '';
UPDATE Events SET ImageUrl = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=400&fit=crop' WHERE Title LIKE 'Summer Masterclass%' AND ImageUrl = '';
UPDATE Events SET ImageUrl = 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=400&fit=crop' WHERE Title LIKE 'Young Artists Showcase%' AND ImageUrl = '';
UPDATE Events SET ImageUrl = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop' WHERE Title LIKE 'Beijing-Boston%' AND ImageUrl = '';
UPDATE Events SET ImageUrl = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=400&fit=crop' WHERE Title LIKE 'Spring Recital%' AND ImageUrl = '';

IF NOT EXISTS (SELECT 1 FROM Events WHERE Title LIKE 'Winter Gala%')
    INSERT INTO Events (Title, Description, EventDate, Location, ImageUrl, IsUpcoming, SortOrder) VALUES
    ('Winter Gala — Celebrating Five Years', N'Join us for a spectacular evening celebrating five years of ApolloSpark! Featuring performances by alumni, current mentees, and special guest artists from China and the USA. The gala includes a dinner, silent auction, and a grand finale concert showcasing the best of cross-cultural musical collaboration.', '2025-12-14 18:00:00', 'The Pierre Hotel, New York, NY', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop', 1, 6);
