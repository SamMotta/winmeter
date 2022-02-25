import { Fragment } from "react";

import '../styles/create-match.scss'

export function CreateMatch() {
    return (
        <div id="create-match">
            <h1>Partidas do dia</h1>
            <table className="dynamicTable">
                <thead>
                    <tr>
                        <th>Data e Hora</th>
                        <th>Party</th>
                        <th>R. ganhas</th>
                        <th>R. perdidas</th>
                        <th>KDR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="dDate">12</td>
                        <td className="dParty"> -12 </td>
                        <td className="dVic">12</td>
                        <td className="dDef">12</td>
                        <td>0.00</td>
                    </tr>
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
                        <td className="dWLR">V/D: 0.00</td>
                        <td>V: 0</td>
                        <td>D: 0</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br />

            <h2>Formulário</h2>

            <form method="post">
                <label>Tamanho da partida</label><br />
                <input type="radio" name="matchLength" value="long" /* onchange="isShort(0)" */ /><label>Longa</label>
                <input type="radio" name="matchLength" value="short" /* onchange="isShort(1)" */ /><label>Curta</label><br />

                <label>Mapa jogado</label><br />
                <select name="map">
                    <option value=""> --Selecione um mapa -- </option>
                    <option value="mirage">Mirage</option>
                    <option value="dustII">DustII</option>
                    <option value="inferno">Inferno</option>
                    <option value="overpass">Overpass</option>
                    <option value="vertigo">Vertigo</option>
                    <option value="train">Train</option>
                    <option value="cache">Cache</option>
                    <option value="nuke">Nuke</option>
                </select><br /><br />

                <label>Rodadas ganhas | Rodadas perdidas</label><br />
                <input type="number" name="roundsWon" className="roundsWon" min="0" max="16" />
                <input type="number" name="lostRounds" className="lostRounds" min="0" max="16" /><br />

                <label>Digite os nomes das pessoas que estavam no squad</label>
                <input type="text" name="party" placeholder="Quem estava no squad" />

                <button type="submit" formAction="/createMatches">Enviar</button>
            </form>
        </div>
    );
}