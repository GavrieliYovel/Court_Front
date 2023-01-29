const getGamesByPlayerId = async (playerId) => {
    let games;

    await fetch(`https://courts.onrender.com/games/${playerId}`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(response => response.json())
        .then(data => {

            games = data;
        }).catch(err => console.log(err));

    return games;
}

export default getGamesByPlayerId;
