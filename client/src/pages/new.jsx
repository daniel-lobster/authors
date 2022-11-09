import { useState , useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Link} from "react-router-dom"

const New = () => {

    const navigate = useNavigate()

    // STATE
    const [name, setName] = useState("")
    const [alive, setAlive] = useState(0)
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([]); 
    const [submit, setSubmit] = useState(false); 

    const createAuthor = (e) => {
        e.preventDefault()
        // CREATE BODY TO SEND OVER TO API
        let body = {
            "name" : name,
            "alive" : alive,
            "description" : description
        }
        // MAKE A AXIOS POST TO MY API
        axios.post("http://localhost:8000/api/authors", body)
            .then(res => {
                console.log(res.data)
                navigate('/')
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
            <legend>new.jsx</legend>
            <Link to={`/`}>Home</Link>
            <form onSubmit={createAuthor}>
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

export default New