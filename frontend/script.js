const dDate = document.querySelector('.dDate')
const dParty = document.querySelector('.dParty')
const dVic = document.querySelector('.dVic')
const dDef = document.querySelector('.dDef')
const dWLR = document.querySelector('.dWLR')

async function showData(data) {
    dDate.innerHTML = await data.date
    dParty.innerHTML = await data.party
    dVic.innerHTML = await data.roundsWon
    dDef.innerHTML = await data.lostRounds

    // criar uma função pra aumentar o tamanho da tabela conforme tiver mais jogos com um limite de 10
}


async function getAPIContent() {
    try {
        const fetchResponse = await fetch('/viewMatches')
        const data = await fetchResponse.json()
        // data é pra ser um Array com no máximo 10 objetos
        console.log(data)
        
        return data[0]
    } catch(err) {
        throw err
    }
}

getAPIContent()
.then(data => {
    showData(data)
})
.catch(console.error)

// reaproveitar isto pra inserir corretamente a party
// inútil? Party -> Samzin, Drozer
// function addParty() {
//     let partyInputValue = document.querySelector('#inputParty').value
//     if (partyInputValue === "") {
//         return;
//     }

//     logic.addParty(partyInputValue)

//     let partyBaked = logic.party[0]
//     for (let i = 1; i < logic.party.length; i++) {
//         partyBaked += `, ${logic.party[i]}`
//     }

//     bParty.innerHTML = partyBaked
//     document.querySelector('#inputParty').value = ''
// }
