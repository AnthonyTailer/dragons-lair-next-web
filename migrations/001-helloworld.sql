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
    updatedAt TEXT,
    avatarUrl TEXT,
    description TEXT,
    ownerId INTEGER REFERENCES USER(id)
);

INSERT INTO dragon (name, type, avatarUrl, description, createdAt, ownerId)
  values(
    'Drogon',
    'Magical',
    'https://vignette.wikia.nocookie.net/gameofthrones/images/8/8f/DrogonWinterfell8x01.PNG/revision/latest?cb=20190515233534',
    'Drogon is one of the three dragons born in the wastelands beyond Lhazar, along with his brothers Rhaegal and Viserion.
     He is named after Daenerys late husband Khal Drogo. He can be distinguished by his black and red colored scales, and red-black wings.
     He was also Daenerys personal mount.',
    datetime('now', 'localtime'),
    1
  );
INSERT INTO dragon (name, type, avatarUrl, description, createdAt, ownerId)
values(
  'Rhaegal',
  'Magical',
  'https://awoiaf.westeros.org/images/0/0f/Rhaegal_a_hidden_agenda_by_christopherburdett.jpg',
  'Rhaegal is a green and bronze dragon: his scales and wings are jade-green, while his eyes are bronze.
   He has black claws and teeth like black needles.
   His flames have been described as being yellow, yellow and red and "orange-and-yellow fire shot through with veins of green"',
  datetime('now', 'localtime'),
  1
);
INSERT INTO dragon (name, type, avatarUrl, description, createdAt, ownerId)
values(
  'Viserion',
  'Magical',
  'https://pbs.twimg.com/media/DR5i5FUWkAAEESV.jpg',
  'Viserion is one of the dragons born in the Dothraki Sea, along with Drogon and Rhaegal.
  Commanded by Queen Daenerys Targaryen, he is named for her brother, Prince Viserys Targaryen.',
  datetime('now', 'localtime'),
  1
);

-- Down
DROP TABLE user;
DROP TABLE dragon; 