const createTeam = (newTeam) => {

    return fetch(`https://courts.onrender.com/teams/new`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newTeam)
        }
    )

}
export default createTeam
