import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGames, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
    })

    // TODO: Get the game types, then set the state
    useEffect(() => { getGameTypes()
        .then((game_types => {
            setGameTypes(game_types)})) 
        

    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const newGame = {...currentGame}
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                    <div className="form-group">
                        <label htmlFor="game_type">Game Type:</label>
                        <select
                        name="game_type"
                        
                        onChange={changeGameState}                            
                            required autoFocus
                            className="form-control"
                            >

                             <option value="0" key={'game_type'}>Choose a Game Type </option>
                            {
                                gameTypes.map(
                                    (gt) => {
                                        return <option value={gt.id} keys={`game_type--${gt.id}`}>
                                            {gt.label}
                                        </option>
                                    }
                                )
                            }
                            </select>
                    </div>
                </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}