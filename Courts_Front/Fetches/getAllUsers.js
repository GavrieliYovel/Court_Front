const getAllUsers = async () => {
    let users;

      await fetch('https://courts.onrender.com/users/', {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(response => response.json())
         .then(data => {

            users = data;
         }).catch(err => console.log(err));

     return users;
}

export default getAllUsers;
