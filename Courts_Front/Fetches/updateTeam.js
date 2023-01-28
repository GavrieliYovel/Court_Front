import axios from 'axios';

const updateTeam = async (teamId, updatedTeamData) => {
    console.log(teamId, updatedTeamData);
    return await fetch('https://courts.onrender.com/teams/edit/', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            teamID: teamId,
            newTeamData: updatedTeamData
        })
    }).then(response => console.log(response)).catch(err => console.log(err));
}

//     return await axios.put('https://courts.onrender.com/teams/edit/',updatedTeamData)
// };
export default updateTeam;
