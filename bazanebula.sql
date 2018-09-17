DROP SCHEMA IF EXISTS nebulatube;
CREATE SCHEMA nebulatube DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE nebulatube;

CREATE TABLE USERS (
	username VARCHAR(30) NOT NULL,
	password VARCHAR(30) NOT NULL,
	name VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	email VARCHAR(50) NOT NULL,
	description VARCHAR(500) NOT NULL,
	created DATE NOT NULL,
	user_role ENUM('USER', 'ADMINISTRATOR') NOT NULL DEFAULT 'USER',
	banned BIT NOT NULL,
	profile_picture_URL VARCHAR(100),
	deleted BIT NOT NULL,
	INDEX username(username ASC)

);

INSERT INTO USERS(username, password, name, lastname,email,description,created,user_role,banned,profile_picture_URL,deleted) VALUES('andrej','123','Andrej','Djapic', 'djapic97@outlook.com','BCharles','2018-01-01','ADMINISTRATOR',0,null,0);
INSERT INTO USERS(username, password, name, lastname,email,description,created,user_role,banned,profile_picture_URL,deleted) VALUES('tesla','123','Nikola','Tesla', 'tesla@gmail.com','biggest name in history','2018-01-01','ADMINISTRATOR',0,null,0);
INSERT INTO USERS(username, password, name, lastname,email,description,created,user_role,banned,profile_picture_URL,deleted) VALUES('markes','123','Gabrijel','Garsija', 'markes@gmail.com','100 godina samoce','2018-01-01','USER',0,null,0);
INSERT INTO USERS(username, password, name, lastname,email,description,created,user_role,banned,profile_picture_URL,deleted) VALUES('kepler','123','Johanes','Kepler', 'kepler@gmail.com','kepler kepler','2018-01-01','USER',0,null,0);
INSERT INTO USERS(username, password, name, lastname,email,description,created,user_role,banned,profile_picture_URL,deleted) VALUES('jony','123','Johny','Cash', 'cash@gmail.com','hurt ','2018-01-01','USER',0,null,0);
INSERT INTO USERS(username, password, name, lastname,email,description,created,user_role,banned,profile_picture_URL,deleted) VALUES('sigmun','123','Sigmund','Freud', 'sigmund@gmail.com','philosohper','2018-01-01','USER',0,null,0);
INSERT INTO USERS(username, password, name, lastname,email,description,created,user_role,banned,profile_picture_URL,deleted) VALUES('newt','123','Isaac','Newton', 'isac@gmail.com','newton apple','2018-01-01','USER',0,null,0);
INSERT INTO USERS(username, password, name, lastname,email,description,created,user_role,banned,profile_picture_URL,deleted) VALUES('darvin','123','Charles','Darvin', 'steva123@gmail.com','radnik','2018-01-01','USER',0,null,0);


CREATE TABLE FOLLOWING(
	followed_username VARCHAR(30) NOT NULL,
	following_username VARCHAR(30 )NOT NULL,
	FOREIGN KEY(followed_username) REFERENCES USERS(username),
	FOREIGN KEY(following_username) REFERENCES USERS(username),
	PRIMARY KEY(followed_username,following_username)
);

INSERT INTO FOLLOWING(followed_username, following_username) VALUES('andrej', 'tesla');
INSERT INTO FOLLOWING(followed_username, following_username) VALUES('andrej', 'markes');
INSERT INTO FOLLOWING(followed_username, following_username) VALUES('andrej', 'kepler');
INSERT INTO FOLLOWING(followed_username, following_username) VALUES('andrej', 'jony');
INSERT INTO FOLLOWING(followed_username, following_username) VALUES('tesla', 'sigmun');
INSERT INTO FOLLOWING(followed_username, following_username) VALUES('tesla', 'newt');
INSERT INTO FOLLOWING(followed_username, following_username) VALUES('sigmun', 'andrej');
INSERT INTO FOLLOWING(followed_username, following_username) VALUES('newt', 'andrej');
INSERT INTO FOLLOWING(followed_username, following_username) VALUES('darvin', 'andrej');


CREATE TABLE VIDEOS(
	video_id BIGINT AUTO_INCREMENT,
	video_name VARCHAR(200) NOT NULL,
	video_embedURL VARCHAR(300) NOT NULL,
	imageURL VARCHAR(150) NOT NULL,
	description VARCHAR(500) NOT NULL,
	visibility ENUM('PUBLIC', 'UNLISTED', 'PRIVATE') NOT NULL DEFAULT 'PUBLIC',
	rating_visibility BIT NOT NULL,
    comments_allowed BIT NOT NULL,
	blocked BIT NOT NULL,
	views BIGINT NOT NULL,
	created DATE NOT NULL,
    owner_username VARCHAR(30),
    deleted BIT NOT NULL,
	FOREIGN KEY(owner_username) REFERENCES USERS(username),
	PRIMARY KEY(video_id)
);

INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('VSauce','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/IJhgZBn-LHg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/vsauce.jpg', 'vsauce', 'PUBLIC',1,1,0,15,'2018-01-01','jony',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Is Earth flat?','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/VNqNnUJVcVs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/vsauce.jpg', 'vsauce', 'PUBLIC',1,1,0,20,'2018-01-01','jony',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Is Anything real?','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/L45Q1_psDqk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/vsauce.jpg', 'vsauce', 'PUBLIC',1,1,0,25,'2018-01-01','kepler',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Banach Tarski Paradox','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/s86-Z-CbaHA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/vsauce.jpg', 'Sick suicide squad', 'PUBLIC',1,1,0,30,'2018-01-01','kepler',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Black Sabbath - Iron Man','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/8aQRq9hhekA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/blackSabbath.jpg', 'Black Sabbath', 'UNLISTED',1,1,0,35,'2018-01-01','andrej',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Iron Maiden - The Trooper','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/2G5rfPISIwo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/ironMaiden.jpg', 'Iron Maiden', 'PRIVATE',1,1,0,40,'2018-01-01','andrej',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Motorhead','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/hF9Gr5waAJg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/motorhead.jpg', 'Lemi Kilmister', 'PUBLIC',1,1,0,45,'2018-01-01','andrej',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Enter Sandman','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/hF9Gr5waAJg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/motorhead.jpg', 'Lemi Kilmister', 'PUBLIC',1,1,0,58,'2018-01-01','andrej',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Django Unchained','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/pBW--bgyezg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/django.jpg', 'Django', 'PUBLIC',1,1,0,60,'2018-01-01','tesla',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Django Soundtrack','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/UA_iIINZJ-U" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/django.jpg', 'Django', 'PUBLIC',1,1,0,65,'2018-01-01','tesla',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Iron Man - scene','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/DTqa-NEwUbs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/ironman.jpg', 'Ironman movie scene', 'PUBLIC',1,1,0,70,'2018-01-01','markes',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Hancock','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/njnyXv1BBU8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/hancock.jpg', 'hancock superhero movie', 'PUBLIC',1,1,0,75,'2018-01-01','markes',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Miladin Sobic - kad bi dosla Marija','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/lQ51vf3oJ0s" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/miladin.jpg', 'Crnogorski bob dilan', 'PUBLIC',1,1,0,80,'2018-01-01','sigmun',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Miladin Sobic - Prolazi Zivot','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/S7u6H_cJiF0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/miladin.jpg', 'Crnogorski bob dilan', 'PUBLIC',1,1,0,85,'2018-01-01','sigmun',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Smak - blues u parku','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/2k2vmwOU2HM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/smak.jpg', 'smak smak', 'PUBLIC',1,1,0,90,'2018-01-01','sigmun',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Smak - El dumo','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/Q6U8wRMrswY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/smak.jpg', 'smak ', 'PUBLIC',1,1,0,95,'2018-01-01','newt',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Smak - Satelit','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/3LCj4M_QDBE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/smak.jpg', 'smak smak', 'PUBLIC',1,1,0,100,'2018-01-01','newt',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Mighty Sam McClain - When The Hurt Is Over','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/J4YPMiFaPWo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/sammclain.jpg', 'blues music', 'PUBLIC',1,1,0,105,'2018-01-01','newt',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Jimi Hendrix - Mannish Boy','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/0t0Qp9K_y6M" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/jimmy.jpg', 'Hendriks', 'PUBLIC',1,1,0,110,'2018-01-01','darvin',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Jimi Hendrix - Hear My Train a Comin','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/myifiXG1WUA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/jimmy.jpg', 'Hendriks', 'PUBLIC',1,1,0,115,'2018-01-01','darvin',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Prele - Kada budem na nebu','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/UIlw2W-AO5A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/prele.jpg', 'prele car', 'PUBLIC',1,1,0,120,'2018-01-01','darvin',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Prele - Jutro ce promeniti sve','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/5P9Bk-xrWZI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/prele.jpg', 'jos jedna preletova', 'PUBLIC',1,1,0,125,'2018-01-01','tesla',0);
INSERT INTO VIDEOS(video_name,video_embedURL,imageURL,description,visibility,rating_visibility,comments_allowed,blocked,views,created,owner_username,deleted) VALUES('Prele - Dal postoji ona koju sanjam','<iframe width="100%" height="100%" src="https://www.youtube.com/embed/fCyd0Y46YPQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 'images/videoImages/prele.jpg', 'prele ', 'PUBLIC',1,1,0,130,'2018-01-01','kepler',0);


CREATE TABLE COMMENT(
	comment_id BIGINT AUTO_INCREMENT,
	content VARCHAR(1000) NOT NULL,
	created DATE NOT NULL,
	user_username VARCHAR(30) NOT NULL,
	video_id BIGINT NOT NULL,
	PRIMARY KEY(comment_id),
	FOREIGN KEY(video_id) REFERENCES VIDEOS(video_id)
);

INSERT INTO COMMENT(content, created, user_username, video_id) VALUES('Nice video', '2018-01-01', 'tesla', 1);
INSERT INTO COMMENT(content, created, user_username, video_id) VALUES('Yeah really', '2018-01-01', 'andrej', 1);
INSERT INTO COMMENT(content, created, user_username, video_id) VALUES('Can i reupload this?', '2018-01-01', 'sigmun', 1);
INSERT INTO COMMENT(content, created, user_username, video_id) VALUES('Nice video mate!', '2018-01-01', 'newt', 2);
INSERT INTO COMMENT(content, created, user_username, video_id) VALUES('Check videos on my channel', '2018-01-01', 'darvin', 2);
INSERT INTO COMMENT(content, created, user_username, video_id) VALUES('Hellooo everyone!', '2018-01-01', 'kepler', 3);
INSERT INTO COMMENT(content, created, user_username, video_id) VALUES('check out my songs', '2018-01-01', 'jony', 3);
INSERT INTO COMMENT(content, created, user_username, video_id) VALUES('Read books, dont watch this stupid videos!!', '2018-01-01', 'markes', 3);




CREATE TABLE LIKE_DISLIKE(
	like_dislike_id BIGINT AUTO_INCREMENT,
	is_like BIT NOT NULL,
	user_username VARCHAR(30) NOT NULL,
	created DATE NOT NULL,
	video_comment ENUM('VIDEO', 'COMMENT'),
	video_comment_id BIGINT NOT NULL,
	PRIMARY KEY(like_dislike_id),
	FOREIGN KEY (user_username) REFERENCES USERS(username)
);

INSERT INTO LIKE_DISLIKE(is_like,user_username,created,video_comment,video_comment_id) VALUES(1,'tesla', '2018-02-02', 'VIDEO', 1);
INSERT INTO LIKE_DISLIKE(is_like,user_username,created,video_comment,video_comment_id) VALUES(1,'newt', '2018-02-02', 'COMMENT', 1);
INSERT INTO LIKE_DISLIKE(is_like,user_username,created,video_comment,video_comment_id) VALUES(1,'darvin', '2018-02-02', 'COMMENT', 2);
INSERT INTO LIKE_DISLIKE(is_like,user_username,created,video_comment,video_comment_id) VALUES(1,'kepler', '2018-02-02', 'COMMENT', 2);
