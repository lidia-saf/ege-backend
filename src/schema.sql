CREATE TABLE tests (
    ID SERIAL PRIMARY KEY, 
    title varchar(255) not null, 
    type varchar(255) NOT NULL
);

CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255),
    email_verified BOOLEAN,
    date_create DATE,
    last_login DATE
);

CREATE TABLE materials (
    pid SERIAL PRIMARY KEY,
    title VARCHAR(255),
    body VARCHAR,
    practice VARCHAR,
    tag VARCHAR
);