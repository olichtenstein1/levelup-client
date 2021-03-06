export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    const requestOptions = {
        method: 'POST' ,
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(game) 
    }

    return fetch ("http://localhost:8000/games", requestOptions)
    .then(response => response.json())
}

export const updateGame = (game, gameId) => {
    const requestOptions = {
        method: 'PUT' ,
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(game) 
    }

    return fetch (`http://localhost:8000/games/${gameId}`, requestOptions)
    // .then(response => response.json())
}

export const deleteGame = (gameId) => {
    return fetch (`http://localhost:8000/games/${gameId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }})
       

}

    
export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        headers:{ 
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }  
})
        .then((res) => res.json())
}