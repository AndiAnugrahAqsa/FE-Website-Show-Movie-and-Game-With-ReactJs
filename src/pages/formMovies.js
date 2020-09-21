import React, { useState, useContext } from 'react'
import { UserContext } from "../context/userContext"
import { Input } from 'antd';
import axios from 'axios'
const { TextArea } = Input;

const FormMovies = () => {
    const [user,] = useContext(UserContext)
    const [movies, setMovies] = useState(null)
    const [input, setInput] = useState({ title: "", description: "", year: 2020, duration: 120, genre: "", rating: 0, image_url: "", id: null })


    const editInput = (event) => {
        var name = event.target.name
        var value = event.target.value
        switch (name) {
            case "title": {
                setInput({ ...input, title: value })
                break;
            }
            case "description": {
                setInput({ ...input, description: value })
                break;
            }
            case "year": {
                setInput({ ...input, year: value })
                break;
            }
            case "duration": {
                setInput({ ...input, duration: value })
                break;
            }
            case "genre": {
                setInput({ ...input, genre: value })
                break;
            }
            case "rating": {
                setInput({ ...input, rating: value })
                break;
            }
            case "image_url": {
                setInput({ ...input, image_url: value })
                break;
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`https://backendexample.sanbersy.com/api/data-movie`, {
            title: input.title,
            description: input.description,
            year: input.year,
            duration: input.duration,
            genre: input.genre,
            rating: parseInt(input.rating),
            image_url: input.image_url,
        },
            { headers: { "Authorization": `Bearer ${user.token}` } }
        )
            .then(res => {
                console.log(res);
                alert("Success add a new movie")
                window.location = "/"
                setMovies([...movies, { id: res.data.id, ...input }])

            })
            .catch((err) => {
                console.log(err);
            })

    }


    return (
        <div style={{ margin: 50, padding: 50, backgroundColor: '#001529' }}>
            <h1 style={{ color: "#fff", marginBottom: 50 }}>Form Add Movies</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td>
                            <strong style={{ color: "#fff" }}>Title : </strong>
                        </td>
                        <td>
                            <Input style={{ width: 400 }} value={input.title} onChange={editInput} name="title" required /><br /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong style={{ color: "#fff" }}>Description :</strong>
                        </td>
                        <td>
                            <TextArea rows={4} style={{ width: 400 }} value={input.description} onChange={editInput} name="description" required /><br /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong style={{ color: "#fff" }}>Year : </strong>
                        </td>
                        <td>
                            <Input type="number" style={{ width: 100 }} min={1970} max={2020} value={input.year} onChange={editInput} name="year" required /><br /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong style={{ color: "#fff" }}>Duration : </strong>
                        </td>
                        <td>
                            <Input type="number" style={{ width: 100 }} min={0} value={input.duration} onChange={editInput} name="duration" required /><br /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong style={{ color: "#fff" }}>Genre : </strong>
                        </td>
                        <td>
                            <Input style={{ width: 400 }} value={input.genre} onChange={editInput} name="genre" required /><br /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong style={{ color: "#fff" }}>Rating : </strong>
                        </td>
                        <td>
                            <Input type="number" style={{ width: 100 }} min={1} max={10} value={input.rating} onChange={editInput} name="rating" required /><br /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong style={{ color: "#fff" }}>Image URL : </strong>
                        </td>
                        <td>
                            <TextArea rows={4} style={{ width: 400 }} value={input.image_url} onChange={editInput} name="image_url" required /><br /><br />
                        </td>
                    </tr>

                </table>
                <button style={{ marginLeft: 85 }}>Submit</button>
            </form >
        </div>
    );


}

export default FormMovies
