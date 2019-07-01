BEGIN;
DROP TABLE IF EXISTS users, consultant,posts CASCADE;


CREATE TABLE users(
    id SERIAL  PRIMARY KEY  ,
    user_name VARCHAR(60) NOT NULL,
    password TEXT NOT NULL

);
CREATE TABLE consultant(
    id SERIAL  PRIMARY KEY  ,
    full_name VARCHAR(60) NOT NULL,
    user_name VARCHAR(60) NOT NULL,
    password TEXT NOT NULL
);
CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    content TEXT,
    user_id INTEGER REFERENCES users(id),
    consultant_id INTEGER REFERENCES consultant(id),
    answer TEXT
);
INSERT INTO consultant (user_name, full_name, password) VALUES 
('أيمن','أيمن القوقا', '$2b$10$.qwhTYf6cL.UZyqYRerjXu4PE2637sfAwhH/Vxz1thDBML.srvzRG'),
('ناريمان','ناريمان حلس', '$2b$10$.qwhTYf6cL.UZyqYRerjXu4PE2637sfAwhH/Vxz1thDBML.srvzRG'),
('دينا','دينا', '$2b$10$.qwhTYf6cL.UZyqYRerjXu4PE2637sfAwhH/Vxz1thDBML.srvzRG'),
('آلاء','آلاء بدرة', '$2b$10$.qwhTYf6cL.UZyqYRerjXu4PE2637sfAwhH/Vxz1thDBML.srvzRG');
INSERT INTO users (user_name, password) values 
('Ayman', '$2b$10$.qwhTYf6cL.UZyqYRerjXu4PE2637sfAwhH/Vxz1thDBML.srvzRG');

COMMIT;