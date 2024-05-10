


CREATE TABLE IF NOT EXISTS Especeoiseau (
    nomscientifique VARCHAR(255) PRIMARY KEY,
    nomcommun VARCHAR(255),
    statutspeces VARCHAR(255),
    nomscientifiquecomsommer VARCHAR(255), -- nom scientifique du prédateur de l'espèce courante
    FOREIGN KEY (nomscientifiquecomsommer) REFERENCES Especeoiseau(nomscientifique) ON DELETE CASCADE
);
