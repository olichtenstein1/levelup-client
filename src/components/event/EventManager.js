export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (event) => {
    const requestOptions = {
        method: 'POST' ,
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event) 
    }

    return fetch ("http://localhost:8000/events", requestOptions)
    .then(response => response.json())
}
    
    
    
    

export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{ 
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }  
})
        .then((res) => res.json())
}

export const updateEvent = (event, eventId) => {
    const requestOptions = {
        method: 'PUT' ,
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event) 
    }

    return fetch (`http://localhost:8000/events/${eventId}`, requestOptions)
    // .then(response => response.json())
}

export const deleteEvent = (eventId) => {
    return fetch (`http://localhost:8000/events/${eventId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }})
       

}

export const leaveEvent = (eventId) => {
    // TODO: Write the DELETE fetch request to leave an event
    const requestOptions = {
        method: 'POST' ,
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }
            }
            return fetch (`http://localhost:8000/events/${eventId}/leave`, requestOptions)
    
  }
  
  export const joinEvent = (eventId) => {
      // TODO: Write the POST fetch request to join and event
      const requestOptions = {
        method: 'POST' ,
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }
            }
            return fetch (`http://localhost:8000/events/${eventId}/signup`, requestOptions)
      }
//   export const createEvent = (event) => {
//     const requestOptions = {
//         method: 'POST' ,
//         headers:{
//             "Content-Type": "application/json",
//             "Authorization": `Token ${localStorage.getItem("lu_token")}`
//         },
//         body: JSON.stringify(event) 
//     }

//     return fetch ("http://localhost:8000/events", requestOptions)
//     .then(response => response.json())
// }