
const leaveTeam = (teamId,playersId) =>{
   return fetch(`https://courts.onrender.com/teams/players/${teamId}`,
        {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                players: playersId
            })
        })
}

export default leaveTeam;
