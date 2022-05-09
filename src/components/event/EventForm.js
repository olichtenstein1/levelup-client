import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { createEvent, getGames } from "./EventManager"





export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        game: 0
    })

    // TODO: Get the games, then set the state
    useEffect(() => { getGames()
        .then((games => {
            setGames(games)})) 
        

    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const newEvent = {...currentEvent}
        newEvent[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__description">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>


            <fieldset>
                    <div className="form-group">
                        <label htmlFor="game">Game :</label>
                        <select
                        name="game"
                        
                        onChange={changeEventState}                            
                            required autoFocus
                            className="form-control"
                            >

                             <option value="0" key={'game'}>Choose a Game Type </option>
                            {
                                games.map(
                                    (g) => {
                                        return <option value={g.id} keys={`game--${g.id}`}>
                                            {g.title}
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

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.game)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}