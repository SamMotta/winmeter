const dynamicTable = document.querySelector('.dynamicTable')

async function showData(data) {
    let dynamicTableResult = `<tr>
    <th>Data e Hora</th>
    <th>Party</th>
    <th>R. ganhas</th>
    <th>R. perdidas</th>
    <th>KDR</th>
</tr>`

    for (const i of data) {
        dynamicTableResult += `<tr>
        <td>${i.date}</td>
        <td>${i.party}</td>
        <td>${i.roundsWon}</td>
        <td>${i.lostRounds}</td>
        <td>:P 0.00</td>
    </tr>`
    }

    dynamicTable.innerHTML = dynamicTableResult
}

async function getAPIContent() {
    try {
        const fetchResponse = await fetch('/viewMatches')
        const data = await fetchResponse.json()
        // data é pra ser um Array com no máximo 10 objetos
        console.log(data)
        
        return data
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
