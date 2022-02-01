// Gerar um objeto usando class contendo tudo da lista e depois exibir no site (Inútil :(? )
// Não necessário, já que o <form> já envia um objeto

const mesesExtenso = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

class Partida {
    constructor() {
        const date = new Date()

        this.roundsWon = 0
        this.roundsLost = 0
        // trocar victories e defeats por rodadas ganhas e perdidas?
        this.date = `${date.getDate()}/${mesesExtenso[date.getMonth()]}/${date.getFullYear()}`
        this.time = `${date.getHours()}:${date.getMinutes()}`
        // Data e hora tem que ser gerado no servidor na hora, para pegar a hora exata que foi enviada e
        // guardada na database (Sepá criar a data e a hora pelo próprio database)
        // cada partida com seu próprio UUID
        // Guardar cada partida dentro da database e gerar o WLR usando algum atributo
        this.party = []
    }

    // trocar essas funções por setter e pegar de um input[type="number"]
    addVictory() {
        this.roundsWon++
    }

    addDefeat() {
        this.roundsLost++
    }

    addParty(value = "") {
        let result = value.replaceAll(' ', "").split(',')
        for (const i of result) {
            this.party.push(i)
        }
    }

    // usar isso na database pro status de hoje
    showWLR() {
        if ((this.roundsWon/this.roundsLost) === Infinity)
            return (this.roundsWon).toFixed(2)
        return (this.roundsWon/this.roundsLost).toFixed(2)
    }
}

const logic = new Partida()

document.querySelector('.DATA').innerHTML = `${logic.date} <br> ${logic.time}`
const bVic = document.querySelector('.bVic')
const bDef = document.querySelector('.bDef')
const bWLR = document.querySelector('.bWLR')
const bParty = document.querySelector('.bParty')

bVic.innerHTML = `${logic.roundsWon}`
bDef.innerHTML = `${logic.roundsLost}`

// Refatorar quase tudo nessa desgraça
function addVictory_Defeat(value) {
    if (value === 1) {
        update(1)
    } else if (value === 0) {
        update(0)
    }
}

function update(value) {
    if (value === 1) {
        logic.addVictory()
        bVic.innerHTML = `${logic.roundsWon}`
    }

    if (value === 0) {
        logic.addDefeat()
        bDef.innerHTML = `${logic.roundsLost}`
    }

    bWLR.innerHTML = logic.showWLR()
}

function addParty() {
    let partyInputValue = document.querySelector('#inputParty').value
    if (partyInputValue === "") {
        return;
    }

    logic.addParty(partyInputValue)

    let partyBaked = logic.party[0]
    for (let i = 1; i < logic.party.length; i++) {
        partyBaked += `, ${logic.party[i]}`
    }

    bParty.innerHTML = partyBaked
    document.querySelector('#inputParty').value = ''
}

document.querySelector('#inputParty').addEventListener('keyup', function(e) {
    if (e.keyCode == 13 || e.which == 13) addParty();
})