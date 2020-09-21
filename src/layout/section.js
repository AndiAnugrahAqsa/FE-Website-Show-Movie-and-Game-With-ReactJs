import React, { useContext } from "react"
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Register from "../pages/register"
import Home from "../pages/home"
import Login from "../pages/login"
import GameTemplate from "../pages/gameTemplate"
import MovieTemplate from "../pages/movieTemplate"
import Movies from "../pages/movies"
import FormMovies from "../pages/formMovies"
import Games from "../pages/games"
import FormGames from "../pages/formGames"
import ChangePassword from "../pages/changePassword"
import { UserContext } from "../context/userContext"



const Section = () => {

    const [user,] = useContext(UserContext);

    const PrivateRoute = ({ user, ...props }) => {
        console.log(user);
        if (user) {
            return <Route {...props} />;
        } else {
            return <Redirect to="/login" />;
        }
    };

    const LoginRoute = ({ user, ...props }) =>
        user ? <Redirect to="/" /> : <Route {...props} />;

    // const MoviesRoute = ()=>
    // <Redirect to="/movies"></Redirect>

    return (
        <section >
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <LoginRoute exact path="/login" user={user} component={Login} />
                <Route exact path="/gametemplate" component={GameTemplate} />
                <Route exact path="/movietemplate" component={MovieTemplate} />
                <PrivateRoute exact path="/movies" user={user} component={Movies} />
                <PrivateRoute exact path="/addmovies" user={user} component={FormMovies} />
                <PrivateRoute exact path="/games" user={user} component={Games} />
                <PrivateRoute exact path="/addgames" user={user} component={FormGames} />
                <PrivateRoute exact path="/changepassword" user={user} component={ChangePassword} />
            </Switch>
        </section>
    )
}

export default Section
