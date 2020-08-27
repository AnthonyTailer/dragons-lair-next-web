-- Up
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT,
    createdAt TEXT
);

INSERT INTO user (name, email, password, createdAt) values('Daenerys Targaryen', 'daenerys@got.com', '$2y$12$MVkPbNbPznLHfeDDocfAS.BSyvGcGfvR7ZFOvY5.qTi7WVpZuqykO', datetime('now', 'localtime'));

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