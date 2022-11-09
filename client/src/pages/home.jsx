import { useState , useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Link} from "react-router-dom"

const Home = () => {

    const navigate = useNavigate()

    // STATE
    const [allAuthors, setAllAuthors] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            .then(res => {
                res.data.sort((a, b) => {
                    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    // names must be equal
                    return 0;
                  });
                setAllAuthors(res.data)
                console.log(allAuthors)
            })
            .catch(errors => console.log(errors))
    }, [refresh])


    const deleteAuthor = (author_id) => {
        axios.delete(`http://localhost:8000/api/authors/${author_id}`)
            .then(res => {
                setRefresh(!refresh)
            })
            .catch(errors => console.log(errors))
    }

    return (
        <fieldset>
            <legend>display.jsx</legend>
            <Link to={`/new`}>Add an Author</Link>
                <h4>These are the authors in our database:</h4>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Alive?</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    <tbody>
                        {allAuthors.map( (author) =>
                            <tr>
                                <td>{author.name}</td>
                                <td>{author.alive? "Yes":"No"}</td>
                                <td>{author.description}</td>
                                <td><Link to={`/edit/${author._id}`}>Edit</Link><button onClick={() => deleteAuthor(author._id)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
        </fieldset>
    )
}

export default Home