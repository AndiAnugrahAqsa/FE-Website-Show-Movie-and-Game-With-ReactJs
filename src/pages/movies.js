import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../context/userContext"
import axios from 'axios'
import { Layout, Menu, Table, Input, InputNumber } from 'antd';
import { Link } from 'react-router-dom'
import "./style.css"
const { TextArea } = Input;
const { Content, Sider } = Layout;

const Movies = () => {
    function minuteToHours(num) {
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return (rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
    }
    const [user,] = useContext(UserContext)
    const [movies, setMovies] = useState(null)
    const [input, setInput] = useState({ title: "", description: "", year: 2020, duration: 120, genre: "", rating: 0, image_url: "", id: null })

    useEffect(() => {
        if (movies === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
                .then(res => {
                    setMovies(res.data)
                    console.log(res.data);
                })
        }
    }, [movies]
    )

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: {
                compare: (a, b) => a.title.length - b.title.length,
                multiple: 6,
            }
        },
        {
            title: 'Image',
            dataIndex: "image_url",
            render: image => <img style={{ width: 100, height: 150 }} src={image} />

        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: {
                compare: (a, b) => a.rating - b.rating,
                multiple: 5,
            },
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            render: (text, record) => (
                <>
                    <p>{minuteToHours(record.id)}</p>


                </>
            ),
            sorter: {
                compare: (a, b) => a.duration - b.duration,
                multiple: 4,
            },
        },
        {
            title: 'Year',
            dataIndex: 'year',

            sorter: {
                compare: (a, b) => a.year - b.year,
                multiple: 3,
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
            title: 'Description',
            dataIndex: 'description',
            sorter: {
                compare: (a, b) => a.description.length - b.description.length,
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
        let movieID = e.target.value;
        console.log(movieID);
        console.log(movies);

        axios.get(`https://backendexample.sanbersy.com/api/data-movie/${movieID}`)
            .then(res => {
                let singleMovie = res.data;
                setInput({
                    id: singleMovie.id,
                    title: singleMovie.title,
                    description: singleMovie.description,
                    year: singleMovie.year,
                    duration: singleMovie.duration,
                    genre: singleMovie.genre,
                    rating: singleMovie.rating,
                    image_url: singleMovie.image_url
                })

            })
        let element = document.getElementById("form");
        element.classList.remove("hide-display");
        window.location = "#form"
    }




    const filterTitle = (e) => {
        let input = e.target.value
        console.log(input);
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                console.log(res.data);
                let resMovies = res.data.map(el => {

                    return {
                        id: el.id,
                        title: el.title,
                        description: el.description,
                        year: el.year,
                        duration: el.duration,
                        genre: el.genre,
                        rating: el.rating,
                        image_url: el.image_url
                    }
                })

                let filteredMovies = resMovies.filter(x => x.title.toLowerCase().indexOf(input.toLowerCase()) !== -1)
                setMovies([...filteredMovies])
            })
    }
    const filterGenre = (e) => {
        let input = e.target.value
        console.log(input);
        console.log("hallo");
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                console.log(res.data);
                let resMovies = res.data.map(el => {

                    return {
                        id: el.id,
                        title: el.title,
                        description: el.description,
                        year: el.year,
                        duration: el.duration,
                        genre: el.genre,
                        rating: el.rating,
                        image_url: el.image_url
                    }
                })

                let filteredMovies = resMovies.filter(x => x.genre.toLowerCase().indexOf(input.toLowerCase()) !== -1)
                setMovies([...filteredMovies])
            })
    }

    const filterRating = (value) => {
        let input = value
        console.log(input);
        console.log("hallo");
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                console.log(res.data);
                let resMovies = res.data.map(el => {

                    return {
                        id: el.id,
                        title: el.title,
                        description: el.description,
                        year: el.year,
                        duration: el.duration,
                        genre: el.genre,
                        rating: el.rating,
                        image_url: el.image_url
                    }
                })

                let filteredMovies = resMovies.filter(x => x.rating == input)
                setMovies([...filteredMovies])
            })
    }

    const filterYear = (value) => {
        let input = value
        console.log(input);
        console.log("hallo");
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                console.log(res.data);
                let resMovies = res.data.map(el => {

                    return {
                        id: el.id,
                        title: el.title,
                        description: el.description,
                        year: el.year,
                        duration: el.duration,
                        genre: el.genre,
                        rating: el.rating,
                        image_url: el.image_url
                    }
                })

                let filteredMovies = resMovies.filter(x => x.year == input)
                setMovies([...filteredMovies])
            })
    }

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

        axios.put(`https://www.backendexample.sanbersy.com/api/movies/${input.id}`, {
            title: input.title,
            description: input.description,
            year: input.year,
            duration: input.duration,
            genre: input.genre,
            rating: parseInt(input.rating),
            image_url: input.image_url
        },
            { headers: { "Authorization": `Bearer ${user.token}` } }
        )
            .then(res => {
                let singleMovie = movies.find(el => el.id === input.id)
                singleMovie.title = input.title
                singleMovie.description = input.description
                singleMovie.year = input.year
                singleMovie.duration = input.duration
                singleMovie.genre = input.genre
                singleMovie.rating = input.rating
                setMovies([...movies])
            })


        setInput({ title: "", description: "", year: 2020, duration: 120, genre: "", rating: 0, image_url: "", id: null })
        let element = document.getElementById("form");
        element.classList.add("hide-display");
        window.location = "#table"

    }


    const handleDelete = (e) => {
        e.preventDefault()
        let movieID = e.target.value;
        console.log(movieID);
        let newMovies = movies.filter(el => el.id !== movieID)

        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${movieID}`, { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => {
                console.log(res)
                alert("Success delete a movie")
                window.location = "/"
            })
            .catch((err) => {
                alert(err)
            })

        setMovies([...newMovies])



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
                        <Menu.Item key="1"><Link to="/movies">Table</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/addmovies">Add Movies</Link></Menu.Item>
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
                                <Input onChange={filterTitle} style={{ width: 200, marginRight: 20 }} placeholder="Search for title" />
                                <Input onChange={filterGenre} style={{ width: 200, marginRight: 20 }} placeholder="Search for genre" />
                                <strong style={{ color: "#fff" }}>Rating : </strong>
                                <InputNumber style={{ marginRight: 20 }} min={1} max={10} onChange={filterRating} />
                                <strong style={{ color: "#fff" }}>Year : </strong>
                                <InputNumber min={1970} max={2020} onChange={filterYear} />
                            </div>

                            <h1 style={{ color: "#fff" }}>Movies Table</h1>
                            <Table columns={columns} dataSource={movies} />
                        </div>

                        {/* form ===== */}
                        <div id="form" className="hide-display" style={{ marginTop: 30, padding: 50, backgroundColor: '#001529' }}>
                            <h1 style={{ color: "#fff", marginBottom: 50, fontSize: 20 }}>Form Edit Movies</h1>
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
                    </Content>
                </Layout>
            </Layout>







        </>
    )

}


export default Movies