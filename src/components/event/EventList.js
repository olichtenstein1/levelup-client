import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "./EventManager"
import "./EventList.css"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const history = useHistory()
    const { eventId } = useParams()

    const deleteThenUpdate = (eventId) => {
        deleteEvent(eventId)
            .then(() => getEvents())
            .then((data) => setEvents(data))
    }

    useEffect(() => {
        getEvents().then(data => {
            setEvents(data)
        })
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                
                events.map(event => {
                    
                    return <section key={`event--${event.id}`} className="event">
                        <section className="itemDetails">
                            <div className="buttonDetails">
                            {
                            event.joined ?
                            // TODO: create the Leave button
                            <button className="button"
                                onClick={() => {
                                    leaveEvent(event.id)
                                    .then(() => getEvents())
                                    .then((data) => setEvents(data))
                                }}

                            >Leave Event</button>
                            :
                            // TODO: create the Join button
                            <button className="button"
                                onClick={() => {
                                    joinEvent(event.id)
                                    .then(() => getEvents())
                                    .then((data) => setEvents(data))
                                }}

                            >Join Event</button>
                            }
                            </div>
                        <div className="eventDetails">
                        <div className="event__description">{event.description} on {event.date} {event.time}</div>
                        <div className="event__game"> The game will be {event.game.title} organized by {event.organizer.user.username}</div>
                        </div>
                        <div className="buttons">
                            <div className="editDeleteButtons">
                            <button className="button"
                                onClick={() => {
                                    history.push({ pathname: `/events/edit/${event.id}` })
                                }}
                            >Edit/Update Event</button>

                            <button className="button"
                                onClick={() => {
                                    deleteThenUpdate(event.id)
                                }}

                            >Delete Event</button>
                            </div>
                        </div>
                        </section>
                    </section>
                })
            }
        </article>
    )
}