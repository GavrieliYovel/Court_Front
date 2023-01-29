
const joinTeam = (teamId, playerId) => {

    let newTeam
    fetch(`https://courts.onrender.com/teams/player/${teamId}/${playerId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    ).then(response => console.log(response))


    return newTeam;
}
 export default joinTeam
