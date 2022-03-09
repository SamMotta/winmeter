import { useEffect, useState } from 'react';
import { database } from '../services/firebase'
import moment from 'moment';

type DatabaseDataType = {
    authorId: string;
    date: number | string;
    lostRounds: string;
    roundsWon: string;
    map: string;
    squad: string | string[];
}

export function MatchesTable() {
    const matchesRef = database.ref('matches')
    const [data, setData] = useState<Array<DatabaseDataType>>([{
        authorId: '',
        date: '',
        lostRounds: '',
        roundsWon: '',
        map: '',
        squad: ''
    }])

    useEffect(() => {
        matchesRef.on('value', snap => {

            let tableState: Array<DatabaseDataType> = []
            snap.forEach(data => {
                const dataValue = data.val()
                tableState.push(dataValue)
            })

            setData(tableState)
        })
    }, [])

    function parseDate(index: number = 0): string {
        const actualDate = data[index].date

        if (typeof actualDate === "string") {
            return ''
        }

        return `${moment(actualDate).format('DD/MM/YYYY, H:mm:ss')}`
    }

    return (
        <>
            <h2>Partidas Recentes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Data e Hora</th>
                        <th>Party</th>
                        <th>R. ganhas</th>
                        <th>R. perdidas</th>
                        <th>Mapa</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data: DatabaseDataType, index) => {

                        return (
                            <tr key={index.toString()}>
                                <td>
                                    {parseDate(index)}
                                </td>
                                <td>
                                    {data.squad}
                                </td>
                                <td>
                                    {data.roundsWon}
                                </td>
                                <td>
                                    {data.lostRounds}
                                </td>
                                <td>
                                    {data.map.charAt(0).toUpperCase() + data.map.slice(1)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <br />

            <h2>Status de hoje</h2>
            <table>
                <thead>
                    <tr>
                        <th>Taxa de V/D</th>
                        <th>Vitórias</th>
                        <th>Derrotas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/* Mostrar os status de hoje e no futuro, mostar status de dias anteriores(Seleção de dias) */}
                        <td>V/D: ## 0.00</td>
                        <td>V: ## 0</td>
                        <td>D: ## 0</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br />
        </>
    )
}