import { useState, useMemo, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MatchesTable } from "../components/MatchesTable";
import { useAuth } from "../hooks/useAuth";

import { database } from "../services/firebase";

import '../styles/create-match.scss'

export function CreateMatch() {

    const matchesRef = database.ref('matches')

    const navigate = useNavigate()
    const { user } = useAuth()


    // usar useState
    async function handleCreateMatch(ev: FormEvent) {
        ev.preventDefault()

        const form = ev.target as HTMLFormElement

        const map = form.map.value
        const matchLength = form.matchLength.value
        const roundsWon = form.roundsWon.value
        const lostRounds = form.lostRounds.value
        const squad = form.party.value

        await matchesRef.push({
            map,
            matchLength,
            roundsWon,
            lostRounds,
            squad,
            date: Date.now(),
            authorId: user?.id
        })

        navigate('/newMatch')
    }

    return (
        <div id="create-match">

            <aside>
                <header className="header">
                    <h1 className="title">WinMeter</h1>
                </header>

                <MatchesTable />

            </aside>

            <main>
                {/* retirar o método POST e refazer esse form */}
                <form onSubmit={handleCreateMatch}>
                    <h2>Formulário</h2>
                    {/* <p>Adicione partidas</p> */}<br />

                    <div className="map">
                        <label>Tamanho da partida: </label>

                        <select name="map" className="inputMarginLeft">
                            <option value="">-- Selecione um mapa --</option>
                            <option value="mirage">Mirage</option>
                            <option value="dustII">DustII</option>
                            <option value="inferno">Inferno</option>
                            <option value="overpass">Overpass</option>
                            <option value="vertigo">Vertigo</option>
                            <option value="train">Train</option>
                            <option value="cache">Cache</option>
                            <option value="nuke">Nuke</option>
                        </select>

                        <input type="radio" name="matchLength" value="long" className="inputMarginLeft inputMatchLength" /><label>Longa</label>
                        <input type="radio" name="matchLength" value="short" className="inputMatchLength" /><label>Curta</label>

                    </div>

                    <div>
                        <label>Rodadas Ganhas/Perdidas: </label>
                        <input type="number" name="roundsWon" className="roundsWon inputMarginLeft" min="0" max="16" />{/* <br /> */}
                        <label> / </label>
                        {/* <label>Rodadas perdidas: </label> */}
                        <input type="number" name="lostRounds" className="lostRounds" min="0" max="16" /><br />
                    </div>

                    <div>
                        <label>Esquadrão: </label>
                        <input type="text" name="party" className="inputMarginLeft" placeholder="Quem estava no squad" />
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </main>
        </div>
    );
}