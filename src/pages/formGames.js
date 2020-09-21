import React, { useState, useContext } from 'react'

import { UserContext } from '../context/userContext'
import { Input } from 'antd';
import axios from 'axios'
const { TextArea } = Input;

const FormGames = () => {
    const [user,] = useContext(UserContext)
    const [games, setGames] = useState(null)
    const [input, setInput] = useState({ name: "", platform: "", release: 2020, singlePlayer: 1, genre: "", multiplayer: 2, image_url: "", id: null })


    const editInput = (event) => {
        var name = event.target.name
        var value = event.target.value
        switch (name) {
            case "name": {
                setInput({ ...input, name: value })
                break;
            }
            case "platform": {
                setInput({ ...input, platform: value })
                break;
            }
            case "release": {
                setInput({ ...input, release: value })
                break;
            }
            case "singlePlayer": {
                setInput({ ...input, singlePlayer: value })
                break;
            }
            case "genre": {
                setInput({ ...input, genre: value })
                break;
            }
            case "multiplayer": {
                setInput({ ...input, multiplayer: value })
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
        axios.post(`https://backendexample.sanbersy.com/api/data-game`, {
            name: input.name,
            platform: input.platform,
            release: input.release,
            singlePlayer: input.singlePlayer,
            genre: input.genre,
            multiplayer: parseInt(input.multiplayer),
            image_url: input.image_url
        },
            { headers: { "Authorization": `Bearer ${user.token}` } }
        )
            .then(res => {
                console.log(user.token);
                console.log(res);
                alert("Success add a new game")
                window.location = "/"
                setGames([...games, { id: res.data.id, ...input }])
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div style={{ margin: 50, padding: 50, backgroundColor: '#001529' }}>
            <h1 style={{ color: "#fff", marginBottom: 50 }}>Form Add Games</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td>
                            <strong style={{ color: "#fff" }}>Name : </strong>
                        </td>
                        <td>
                            <Input style={{ width: 400 }} value={input.name} onChange={editInput} name="name" required /><br /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong style={{ color: "#fff" }}>Platform :</strong>
                        </td>
                        <td>
                            <Input rows={4} style={{ width: 400 }} value={input.platform} onChange={editInput} name="platform" required /><br /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong style={{ color: "#fff" }}>Release : </strong>
                        </td>
                        <td>
                            <Input type="number" style={{ width: 100 }} min={1970} max={2020} value={input.release} onChange={editInput} name="release" required /><br /><br />
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
                            <strong style={{ color: "#fff" }}>Single Player : </strong>
                        </td>
                        <td>
                            <Input type="number" style={{ width: 100 }} min={0} max={1} value={input.singlePlayer} onChange={editInput} name="singlePlayer" required /><br /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong style={{ color: "#fff" }}>Multiplayer : </strong>
                        </td>
                        <td>
                            <Input type="number" style={{ width: 100 }} min={0} value={input.multiplayer} onChange={editInput} name="multiplayer" required /><br /><br />
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

export default FormGames
