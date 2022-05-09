import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import {  getGameTypes, updateGame } from "./GameManager"

 

// // function for updating/editing a game instance
export const EditGame = () => {
    const [game, assignGame] = useState({})
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            return fetch(`http://localhost:8000/games/${gameId}`, {
                headers:{
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }}
            )
            .then(response => response.json())
            .then((data => {
                assignGame(data)
            }))
        },
        [ gameId ]
    )

    useEffect(() => { getGameTypes()
        .then((game_types => {
            setGameTypes(game_types)})) 
        

    }, [])

    // Should be filled with existing date for the specified instance
    

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const newGame = {...game}
        newGame[domEvent.target.name] = domEvent.target.value
        assignGame(newGame)
    }

    // const submitEdit = () => {
    //     // copy existing request 
    //     const submittedEdit = {
    //         skill_level: game.skill_level,
    //         number_of_players: game.number_of_players,
    //         title: game.title,
    //         maker: game.maker,
    //         game_type: parseInt(game.game_type),
    //     }

        
        
    //     // perform put operation and send the new copy as the body
        
    //     fetch(`http://localhost:8088/listingRequests/${listingRequestId}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(acceptedRequest)
    //     })


    // }

    

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Current Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={game.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={game.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={game.number_of_players}
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
                                        if (gt.id === game.game_type?.id) {
                                        
                                                return (
                                            <option selected keys={`gt--${gt.id}`} value={`${gt.id}`}>
                                                {`${gt.label}`}
                                            </option>
                                        )
                                        }
                                        else{
                                        return <option value={gt.id} keys={`game_type--${gt.id}`}>
                                            {gt.label}
                                        </option>
                                        }
                                    }
                                )
                            }
                                
                            </select>
                    </div>
                </fieldset>
               
                <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const newGame = {
                        maker: game.maker,
                        title: game.title,
                        number_of_players: parseInt(game.number_of_players),
                        skill_level: parseInt(game.skill_level),
                        game_type: parseInt(game.game_type)
                    }

                    // Send PUT request to your API
                    updateGame(newGame, gameId)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Update</button>

</form>
    )

}

