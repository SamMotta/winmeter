const sqlite3 = require('sqlite3').verbose()
const sqlite = require('sqlite')
const moment = require('moment')

let db
sqlite.open({
    filename: "./src/matches.sqlite",
    driver: sqlite3.Database
})

    .then(async dbase => {
        db = dbase;

        try {
            // console.log(await db.all('SELECT * FROM matches'))
        } catch (err) {
            console.error(err)
        }
    });


/* db.serialize(() => {
    db.run(`create table matches(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date text NOT NULL,
            time text NOT NULL,
            isShort int NOT NULL,
            party text NOT NULL,
            roundsWon int NOT NULL,
            lostRounds int NOT NULL,
            isVictory int NOT NULL,
            map text NOT NULL
            )`)

    db.run('ALTER TABLE matches RENAME TO oldMatches')
    console.log('Alterando Tabela')
}) */


const self = {
    validateMatch: async (req) => {
        let { roundsWon, lostRounds } = req
        const { matchLength, map, party } = req

        // gerar o objeto bakedReq só depois das validações
        const bakedReq = {
            roundsWon,
            lostRounds,
            map,
            matchLength,
            party,
        }

        // validando o mapa
        const MAPS = ['mirage', 'dustii', 'inferno', 'overpass',
            'vertigo', 'train', 'cache', 'nuke']

        if (map.toLowerCase() === MAPS.find(e => e === map.toLowerCase())) {
        } else {
            // se o mapa não for válido, ele não cria
            return false;
        }

        // validando o tamanho da partida // partidas
        if (matchLength == 'long') {
            if (roundsWon > 16) return false;
            if (lostRounds > 16) return false;
            if (roundsWon >= 16 && lostRounds >= 16) return false;
        }

        if (matchLength == 'short') {
            if (roundsWon > 9) return false;
            if (lostRounds > 9) return false;
            if (roundsWon >= 9 && lostRounds >= 9) return false;
        }

        self.createMatch(bakedReq)
    },


    // createMatch vai ser chamado no validateMatch
    // transformar rWon e etc em um obj 
    createMatch: async (req) => {
        // adicionar uma caralhada de verificações  
        const date = moment().format('DD/MM/YYYY')
        const time = moment().format('HH:mm')

        let isShort = 1
        let isVictory = 1

        if (req.matchLength === "long") isShort = 0
        if (req.roundsWon < req.lostRounds) isVictory = 0
        if (req.roundsWon == req.lostRounds) isVictory = 2

        db.run(`INSERT INTO matches(date, time, isShort, party, roundsWon, lostRounds, isVictory, map) 
        VALUES(
            "${date}",
            "${time}",
            ${isShort},
            "${req.party}",
            ${req.roundsWon},
            ${req.lostRounds},
            ${isVictory},
            "${req.map}"
            )`)
    },

    showMatches: async () => {
        // Selecionar apenas as 10 últimas adições a DB [X]
        // Criar um date e time separados e juntar depois
        try {
            // console.log(await db.all(`SELECT * FROM matches WHERE date="${moment().format('DD/MM/YYYY')}"`))
            return await db.all('SELECT * FROM matches ORDER BY id DESC LIMIT 10')
        } catch (err) {
            throw err
        }
    }
}

module.exports = self