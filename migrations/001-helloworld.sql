-- Up
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT,
    createdAt TEXT
);

INSERT INTO user (name, email, password, createdAt) values('Daenerys Targaryen', 'daenerys@got.com', '$2b$12$g5bHQ/T8xSmk6JnJNTxH2.cc82rqxrd5W7MKl2exBx1U0BiNPw3Gi', datetime('now', 'localtime'));

CREATE TABLE dragon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    createdAt TEXT,
    ownerId INTEGER REFERENCES USER(id)
);

INSERT INTO dragon (name, type, createdAt, ownerId) values('Drogon', 'Magical', datetime('now', 'localtime'), 1);
INSERT INTO dragon (name, type, createdAt, ownerId) values('Rhaegal', 'Magical', datetime('now', 'localtime'), 1);
INSERT INTO dragon (name, type, createdAt, ownerId) values('Viserion', 'Magical', datetime('now', 'localtime'), 1);

-- Down
DROP TABLE user;
DROP TABLE dragon; 