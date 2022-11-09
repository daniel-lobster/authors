import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom'
import {Link} from "react-router-dom"



const Edit = () => {

    // GET PATH VARIABLE
    const { author_id } = useParams()

    const navigate = useNavigate()

    // STATE
    const [name, setName] = useState("")
    const [alive, setAlive] = useState(false)
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([]); 

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${author_id}`)
            .then(res => {
                console.log(res.data)
                setName(res.data.name)
                setAlive(res.data.alive)
                setDescription(res.data.description)
            })
            .catch(err => console.log(err))
    }, [])

    const updateAuthor = (e) => {
        e.preventDefault()
        // CREATE BODY TO SENT OVER TO API
        let updatedBody = {
            "name": name,
            "alive": alive,
            "description": description
        }
        // MAKE A AXIOS REQUEST TO MY API
        axios.put(`http://localhost:8000/api/authors/${author_id}`, updatedBody)
            .then(res => {
                navigate(`/`) // REDIRECT TO home
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    return (
        <fieldset>
            <legend>Edit.jsx</legend>
            <Link to={`/`}>Home</Link>
            <form onSubmit={updateAuthor}>
                <p>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </p>
                <p>
                    Alive?:
                    <input type="checkbox" checked={alive} onChange={(e) => setAlive(e.target.checked)} />
                </p>
                <p>
                    Description: 
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </p>
                <button disabled={name.length > 2 && description.length > 2 ?false:true}>Submit</button>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
            </form>
        </fieldset>
    )
}

export default Edit