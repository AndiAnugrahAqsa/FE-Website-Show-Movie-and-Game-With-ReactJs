import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'antd';

function minuteToHours(num) {
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return (rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
}


const MovieTemplate = () => {
    let location = useLocation()
    let movieID = location.state.id

    const [singleMovies, setSingleMovies] = useState(null)

    useEffect(() => {
        if (singleMovies === null) {
            axios
                .get(`https://backendexample.sanbersy.com/api/data-movie/${movieID}`)
                .then(res => {
                    let movies = res.data
                    setSingleMovies([movies])
                })

        }
    }, [singleMovies])

    return (
        <div style={{ margin: 60, padding: 90, backgroundColor: '#001529', color: "white" }}>
            {singleMovies !== null && singleMovies.map(item => {

                return (
                    <>
                        <h1 style={{ color: "white" }}>{item.title}</h1>
                        <div style={{ display: "flex" }}>
                            <img src={item.image_url} width="500" height="300" />
                            <div style={{ padding: "10px", top: 0 }}>
                                <strong>Rating {item.rating}</strong><br />
                                <strong>Durasi: {minuteToHours(item.duration)}</strong><br />
                                <strong>Genre: {item.genre}</strong><br />
                            </div>
                        </div><br />
                        <p><strong>Deskripsi</strong> : {item.description}</p>

                    </>
                )
            })}
            <Button style={{ marginTop: 20 }} type="primary"><Link to="/">Back</Link></Button>
        </div >
    )
}

export default MovieTemplate