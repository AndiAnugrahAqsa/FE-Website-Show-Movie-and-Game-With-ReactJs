import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'antd';




const GameTemplate = () => {
    let location = useLocation()
    let gameID = location.state.id

    const [singleGames, setSingleGames] = useState(null)

    useEffect(() => {
        if (singleGames === null) {
            axios
                .get(`https://backendexample.sanbersy.com/api/data-game/${gameID}`)
                .then(res => {
                    let games = res.data
                    setSingleGames([games])
                })

        }
    }, [singleGames])

    return (
        <div style={{ margin: 60, padding: 90, backgroundColor: '#001529', color: "white" }}>
            {singleGames !== null && singleGames.map(item => {

                return (
                    <>
                        <h1 style={{ color: "white" }}>{item.name}</h1>
                        <div style={{ display: "flex" }}>


                            <img style={{ width: "500px", height: "300px" }} src={item.image_url} />
                            <div style={{ "font-size": "15px", padding: "10px", top: 0, display: "block" }}>
                                <strong>Plaform: {item.platform.toUpperCase()}</strong><br />
                                <strong>Release: {item.release}</strong><br />
                                <strong>Genre: {item.genre}</strong><br />
                                <strong>Single Player: {item.singlePlayer}</strong><br />
                                <strong>Multiplayer: {item.multiplayer}</strong>
                            </div>
                        </div>
                    </>
                )
            })}
            <Button style={{ marginTop: 20 }} type="primary"><Link to="/">Back</Link></Button>
        </div >
    )
}

export default GameTemplate