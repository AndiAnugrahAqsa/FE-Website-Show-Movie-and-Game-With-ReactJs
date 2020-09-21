import React, { Component } from 'react'
import axios from 'axios'
import { Card, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom'

function minuteToHours(num) {
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return (rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
}






class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            games: [],
            visible: false,
            modalMovies: [],
            modalGames: []
        }
    }

    showModalMovies = (movieID) => {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                let movies = res.data
                console.log(movies[0].id);
                let filteredMovies = movies.filter(x => x.id === movieID)
                console.log(filteredMovies);
                this.setState({ modalMovies: [...filteredMovies], visible: true })

            })
        console.log(movieID);
    };
    showModalGames = (gameID) => {
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                let games = res.data
                console.log(games[0].id);
                let filteredGames = games.filter(x => x.id === gameID)
                console.log(filteredGames);
                this.setState({ modalGames: [...filteredGames], visible: true })

            })
    };





    componentDidMount = () => {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                let movies = res.data
                console.log(movies);
                this.setState({ movies: movies })

            })

        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                let games = res.data
                this.setState({ games: games })

            })

    }




    render() {
        return (
            <div style={{ marginBottom: 100 }}>
                <h1 style={{ marginLeft: 30, padding: 10 }}>Movies List</h1>
                <div className="site-card-wrapper">

                    <Row style={{ padding: 20, backgroundColor: "#f0f2f5" }} gutter={16}>
                        {this.state.movies.map(item => {

                            return (

                                <Col style={{ backgroundColor: "#f0f2f5", marginBottom: 40 }} span={6}>
                                    <Card style={{ backgroundColor: "#001529", borderRadius: 20 }} bordered={false}>
                                        <div style={{ display: "block" }}>
                                            <h3 style={{ color: "white" }}>{item.title}</h3>
                                            <div>
                                                <img style={{ width: "100%", height: "150px", objectFit: "cover" }} src={item.image_url} />
                                            </div>
                                            <div style={{ padding: "10px", top: 0, color: "white" }}>
                                                <strong>Rating: {item.rating}</strong><br />
                                                <strong>Durasi: {minuteToHours(item.duration)}</strong><br />
                                                <strong>Genre: {item.genre}</strong>
                                            </div>

                                            <Button type="primary">
                                                <Link
                                                    to={{
                                                        pathname: "movietemplate",
                                                        key: item.id,
                                                        state: { id: item.id }
                                                    }}
                                                > Show More...</Link>
                                            </Button>


                                        </div>
                                    </Card>
                                </Col>
                            )
                        })
                        }

                    </Row>
                </div>

                <h1 style={{ marginLeft: 30, padding: 10 }}>Games List</h1>
                <div className="site-card-wrapper">

                    <Row style={{ padding: 20, backgroundColor: "#f0f2f5" }} gutter={16}>
                        {this.state.games.map(item => {

                            return (

                                <Col style={{ backgroundColor: "#f0f2f5", marginBottom: 40 }} span={6}>
                                    <Card style={{ backgroundColor: "#001529", borderRadius: 20 }} bordered={false}>
                                        <div style={{ display: "block" }}>
                                            <h3 style={{ color: "white" }}>{item.name}</h3>
                                            <div>
                                                <img style={{ width: "100%", height: "150px", objectFit: "cover" }} src={item.image_url} />
                                            </div>
                                            <div style={{ padding: "10px", top: 0, color: "white" }}>
                                                <strong>Plaform: {item.platform}</strong><br />
                                                <strong>Release: {item.release}</strong><br />
                                                <strong>Genre: {item.genre}</strong>
                                            </div>

                                            <Button type="primary">
                                                <Link
                                                    to={{
                                                        pathname: "gametemplate",
                                                        key: item.id,
                                                        state: { id: item.id }
                                                    }}
                                                > Show More...</Link>
                                            </Button>

                                        </div>
                                    </Card>
                                </Col>
                            )
                        })
                        }

                    </Row>
                </div>



            </div >
        )
    }

}

export default Home