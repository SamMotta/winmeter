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

// let db = new sqlite3.Database('./src/matches.sqlite', (err) => {
//     if (err) {
//         console.error(err.message)
//         throw err
//     }
// })

/* db.serialize(() => {
    db.run(`create table matches(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date text NOT NULL,
            isShort int NOT NULL,
            party text NOT NULL,
            roundsWon int NOT NULL,
            lostRounds int NOT NULL
            )`)

    db.run('DROP TABLE matches')
}) */

module.exports = {
    createMatch: async (req) => {
        const date = moment().format('DD/MM/YYYY HH:mm')

        let short
        if (req.matchLength === "long") {
            short = 0
        } else {
            short = 1
        }

        db.run(`INSERT INTO matches(date, isShort, party, roundsWon, lostRounds) 
        VALUES(
        "${date}",
        ${short},
        "${req.party}",
        ${req.roundsWon},
        ${req.lostRounds}
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