CREATE TABLE Music (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,     
	singer TEXT,
    path TEXT,
    img TEXT);

INSERT INTO Music (name, singer, path, img) VALUES
    	('Thiêu thân', 'B Ray và Sofia', './music/Thieu Than - B Ray_ Sofia.mp3','https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/f/e/5/6/fe5659fe70dd215e616b784bd19751b5.jpg'),
		('Anh sẽ để em đi', 'Kidz', './music/Anh Se De Em Di - Kidz.mp3','https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_webp/cover/c/2/b/8/c2b84561d1a4ad568c9a3ed870d2049d.jpg'),
		('Ngôi sao cô đơn', 'Jack-j97', './music/NgoiSaoCoDon-JackJ97-7611601.mp3','https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/e/2/e/b/e2eb2e4c19e54ab61871ce9f04ac339f.jpg'),
		('Mặt mộc', 'Phạm Nguyên Ngọc,Vanh,Ân nhi,BMZ', './music/Mat-Moc-Phạm-Nguyen-Ngọc-x-VAnh-x-An-Nhi.mp3','https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/5/7/e/8/57e8551b2dae93bdcc8c8fcb1efa42d2.jpg'),
		('Hãy trao cho anh', 'Sơn Tùng', './music/hayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3','https://avatar-ex-swe.nixcdn.com/song/2019/07/03/7/5/b/e/1562137543919_500.jpg'),
		('Vẫn', '24k.Right, Hipz, Huỳnh Tú', './music/90i20wfcfl.mp3','https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/6/6/6/3/6663bf041344ba94d938ba52fc16043f.jpg');
