import React, { useState, useEffect } from 'react'
import axios from 'axios'

function User() {

    const url = "http://127.0.0.1:8000/users/1"

    const [user, setUser] = useState(null)
    let content = null

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setUser(response.data)
                console.log(response.data)
            })
        }, [url])
    
    
    if(user) {
        content =
        <div>
            <h1>{user.name}</h1>
            <h1>{user.surname}</h1>
            <h1>{user.username}</h1>
            <h1>{user.email}</h1>
        </div>
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default User