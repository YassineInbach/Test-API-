import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Users() {
    
    const [err , setErr] = useState('')
    const [users , setUsers] = useState([])
    const [user , setUser] = useState('')
    useEffect(() => {
        const fetchUsers = () => {
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);})
           .catch((erreur) => {
            console.error(erreur.message);
            setErr(erreur.message)
           });
        };
        fetchUsers()
    },[])

    const handleView  = (User) => {
        console.log(User)
        setUser(User)
    }
    const handleDelete = (userToDelete) => {
/*{        const updatedUsers = [...users];
        const indexToDelete = updatedUsers.indexOf(userToDelete);
                updatedUsers.splice(indexToDelete, 1);
            setUsers(updatedUsers);
            console.log(updatedUsers)}*/

            axios.delete(`https://jsonplaceholder.typicode.com/users/${userToDelete.id}`)
            .then((res) => {
                console.log("Suppression avec succés");
                const updatedUsers = [...users];
        const indexToDelete = updatedUsers.indexOf(userToDelete);
                updatedUsers.splice(indexToDelete, 1);
            setUsers(updatedUsers);
            console.log(updatedUsers)
            })
            .catch((error) => {
                console.error(error.message)
            })
        
    }
    return (
        <div>
            <h1>Test API</h1>
            <div style = {{display : 'flex' , justifyContent:'space-around'}}>
            <div>
                {users.map((user , index ) => (
                    <div style = {{display : "flex" , alignItems : "center" , columnGap : '12px'}} key = {index}>
                    <p>{user.name}</p>
                    <div style={{display : "inline-flex" , columnGap: '10px'}}>
                    <button onClick={() => handleView(user)}>view Detail</button>
                    <button onClick={() => handleDelete(user)}>Delete</button>
                    </div>
                </div>
                ))}
               
                  </div>
                  <div>
               <h2>View detail :</h2>
                {user &&  (
                    <div>
                    <p>{user.name}</p>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.website}</p>
                 </div>
                 )
                    }
               </div>
            </div>
              
             
                
        </div>
    )
}

export default Users
