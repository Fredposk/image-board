DROP TABLE IF EXISTS images;

CREATE TABLE images(
   id UUID DEFAULT uuid_generate_v4 (),
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/imageboard/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg',
    'funkychicken',
    'Welcome to Spiced and the Future!',
    'This photo brings back so many great memories.'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/imageboard/wg8d94G_HrWdq7bU_2wT6Y6F3zrX-kej.jpg',
    'discoduck',
    'Elvis',
    'We can''t go on together with suspicious minds.'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://kuckelhaus-imageboard.s3.amazonaws.com/zKdoAb6oRpGTz0WJU8mD2_l8GO7ECkWB.jpg',
    'derekThompson',
    'McWay Falls',
    'beach in Cali'
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    comments_id UUID DEFAULT uuid_generate_v4 (),
    comment VARCHAR NOT NULL CHECK (comment != ''),
    username VARCHAR NOT NULL CHECK (username != ''),
    commented_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    id UUID NOT NULL REFERENCES images(id),
    PRIMARY KEY (comments_id)
);
