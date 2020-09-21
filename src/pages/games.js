import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../context/userContext"
import axios from 'axios'
import { Layout, Menu, Table, Input, InputNumber } from 'antd';
import { Link, Redirect } from 'react-router-dom'
import "./style.css"
const { TextArea } = Input;
const { Content, Sider } = Layout;

const Games = () => {

    const [user,] = useContext(UserContext)
    const [games, setGames] = useState(null)
    const [input, setInput] = useState({ name: "", platform: "", release: 2020, singlePlayer: 1, genre: "", multiplayer: 2, image_url: "", id: null })

    useEffect(() => {
        if (games === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game`)
                .then(res => {
                    setGames(res.data)
                    console.log(res.data);
                })
        }
    }, [games]
    )

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.title.length - b.title.length,
                multiple: 6,
            }
        },
        {
            title: 'Image',
            dataIndex: "image_url",
            render: image => <img style={{ width: 100, height: 150 }} src={image} />,
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            sorter: {
                compare: (a, b) => a.platform.length - b.platform.length,
                multiple: 5,
            },
        },
        {
            title: 'Release',
            dataIndex: 'release',
            sorter: {
                compare: (a, b) => a.release - b.release,
                multiple: 4,
            },
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            sorter: {
                compare: (a, b) => a.genre.length - b.genre.length,
                multiple: 2,
            },

        },
        {
            title: 'Single Player',
            dataIndex: 'singlePlayer',

            sorter: {
                compare: (a, b) => a.singlePlayer - b.singlePlayer,
                multiple: 3,
            },
        },

        {
            title: 'Multiplayer',
            dataIndex: 'multiplayer',
            sorter: {
                compare: (a, b) => a.multiplayer - b.multiplayer,
                multiple: 1,
            },
        },
        {
            title: 'Action',
            dataIndex: "id",
            key: 'action',
            render: (text, record) => (
                <>
                    <button value={record.id} onClick={handleEdit}>Edit</button>
                    <button value={record.id} onClick={handleDelete}>Delete</button>

                </>
            ),

        }
    ];

    const handleEdit = (e) => {
        e.preventDefault()
        let gameID = e.target.value;

        axios.get(`https://backendexample.sanbersy.com/api/data-game/${gameID}`)
            .then(res => {
                let singleGame = res.data;
                setInput({
                    id: singleGame.id,
                    name: singleGame.name,
                    platform: singleGame.platform,
                    release: singleGame.release,
                    singlePlayer: singleGame.singlePlayer,
                    genre: singleGame.genre,
                    multiplayer: singleGame.multiplayer,
                    image_url: singleGame.image_url
                })

            })
        let element = document.getElementById("form");
        element.classList.remove("hide-display");
        window.location = "#form"
    }

    const handleDelete = (e) => {
        e.preventDefault()
        let gameID = e.target.value;


        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${gameID}`, { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => {
                console.log(res)
                let newGames = games.filter(el => el.id !== gameID)

                alert("Success delete a game")
                setGames([...newGames])
                window.location = "/"

            })

            .catch((err) => {
                alert(err)
            })






    }


    const filterTitle = (e) => {
        let input = e.target.value
        console.log(input);
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                console.log(res.data);
                let resGames = res.data.map(el => {

                    return {
                        id: el.id,
                        name: el.name,
                        platform: el.platform,
                        release: el.release,
                        singlePlayer: el.singlePlayer,
                        genre: el.genre,
                        multiplayer: el.multiplayer,
                        image_url: el.image_url
                    }
                })

                let filteredGames = resGames.filter(x => x.name.toLowerCase().indexOf(input.toLowerCase()) !== -1)
                setGames([...filteredGames])
            })
    }

    const filterGenre = (e) => {
        let input = e.target.value
        console.log(input);
        console.log("hallo");
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                console.log(res.data);
                let resGames = res.data.map(el => {

                    return {
                        id: el.id,
                        name: el.name,
                        platform: el.platform,
                        release: el.release,
                        singlePlayer: el.singlePlayer,
                        genre: el.genre,
                        multiplayer: el.multiplayer,
                        image_url: el.image_url
                    }
                })

                let filteredGames = resGames.filter(x => x.genre.toLowerCase().indexOf(input.toLowerCase()) !== -1)
                setGames([...filteredGames])
            })
    }

    const filterPlatform = (e) => {
        let input = e.target.value
        console.log("hallo");
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                console.log(res.data);
                let resGames = res.data.map(el => {

                    return {
                        id: el.id,
                        name: el.name,
                        platform: el.platform,
                        release: el.release,
                        singlePlayer: el.singlePlayer,
                        genre: el.genre,
                        multiplayer: el.multiplayer,
                        image_url: el.image_url
                    }
                })

                let filteredGames = resGames.filter(x => x.platform.toLowerCase().indexOf(input.toLowerCase()) !== -1)
                setGames([...filteredGames])
            })
    }

    const filterRelease = (value) => {
        let input = value
        console.log(input);
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                console.log(res.data);
                let resGames = res.data.map(el => {

                    return {
                        id: el.id,
                        name: el.name,
                        platform: el.platform,
                        release: el.release,
                        singlePlayer: el.singlePlayer,
                        genre: el.genre,
                        multiplayer: el.multiplayer,
                        image_url: el.image_url
                    }
                })
                let filteredGames = resGames.filter(x => x.release == input)
                console.log(filteredGames);
                setGames([...filteredGames])
            })
    }

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

        axios.put(`https://www.backendexample.sanbersy.com/api/games/${input.id}`, {
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
                let singleGame = games.find(el => el.id === input.id)
                singleGame.name = input.name
                singleGame.platform = input.platform
                singleGame.release = input.release
                singleGame.singlePlayer = input.singlePlayer
                singleGame.genre = input.genre
                singleGame.multiplayer = input.multiplayer
                setGames([...games])
            })


        setInput({ name: "", platform: "", release: 2020, singlePlayer: 1, genre: "", multiplayer: 2, image_url: "", id: null })
        let element = document.getElementById("form");
        element.classList.add("hide-display");
        window.location = "#table"

    }

    return (
        <>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1"><Link to="/games">Table</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/addgames">Add Games</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>

                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <div id="table" style={{ padding: 50, backgroundColor: "#001529" }}>
                            <p style={{ color: "#fff", marginBottom: 5 }}>Filter</p>

                            <div style={{ marginBottom: 30 }}>
                                <Input onChange={filterTitle} style={{ width: 200, marginRight: 20 }} placeholder="Search for name" />
                                <Input onChange={filterGenre} style={{ width: 200, marginRight: 20 }} placeholder="Search for genre" />
                                <Input onChange={filterPlatform} style={{ width: 200, marginRight: 20 }} placeholder="Search for platform" />
                                <strong style={{ color: "#fff" }}>Release : </strong>
                                <InputNumber min={1970} max={2020} onChange={filterRelease} />
                            </div>

                            <h1 style={{ color: "#fff" }}>Games Table</h1>
                            <Table columns={columns} dataSource={games} />
                        </div>

                        {/* form ===== */}
                        <div id="form" className="hide-display" style={{ marginTop: 30, padding: 50, backgroundColor: '#001529' }}>
                            <h1 style={{ color: "#fff", marginBottom: 50 }}>Form Games</h1>
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
                    </Content>
                </Layout>
            </Layout>







        </>
    )

}


export default Games