import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import {  getGames, updateEvent } from "./EventManager"

// // function for updating/editing a game instance
export const EditEvent = () => {
    const [event, assignEvent] = useState({})
    const [games, setGames] = useState([])
    const { eventId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            return fetch(`http://localhost:8000/events/${eventId}`, {
                headers:{
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }}
            )
            .then(response => response.json())
            .then((data => {
                assignEvent(data)
            }))
        },
        [ eventId ]
    )

    useEffect(() => { getGames()
        .then((games => {
            setGames(games)})) 
        

    }, [])

    // Should be filled with existing date for the specified instance
    

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const newEvent = {...event}
        newEvent[domEvent.target.name] = domEvent.target.value
        assignEvent(newEvent)
    }


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Edit Current Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={event.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={event.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={event.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                    <div className="form-group">
                        <label htmlFor="game">Game:</label>
                        <select
                        name="game"
                        
                        onChange={changeEventState}                            
                            required autoFocus
                            className="form-control"
                            >

                             <option value="0" key={'game'}>Choose a Game </option>
                            {
                                games.map(
                                    (g) => {
                                        if (g.id === event.game?.id) {
                                        
                                                return (
                                            <option selected keys={`g--${g.id}`} value={`${g.id}`}>
                                                {`${g.title}`}
                                            </option>
                                        )
                                        }
                                        else{
                                        return <option value={g.id} keys={`game--${g.id}`}>
                                            {g.title}
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

                    const newEvent = {
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        game: parseInt(event.game)
                    }

                    // Send PUT request to your API
                    updateEvent(newEvent, eventId)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Update</button>

</form>
    )

}

