import React, { useState } from 'react';

import CreateForm from "./CreateForm/CreateForm";
import JoinForm from "./JoinForm/JoinForm";

import { AuthContext } from '../../context/auth';
import { Redirect } from 'react-router-dom';

import "./Home.css";

const Home = () => {
    const [userAction, setUserAction] = useState("");
    const [username, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const { setLoggedIn } = React.useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !room) {
            setError("Please fill in all fields");
            return;
        }
        setLoggedIn(true);
        setSubmitted(true);
    };

    const handleClick = (event) => {
        setRoom("");setError("");setUserName("");
        if (event === "create") {
            setUserAction("create");
        } else {
            setUserAction("join");
        }
    }

    if (submitted) {
        return (
            <Redirect to={{
                pathname: `/room/${room}`,
                state: { name: username, room }
            }}/>
        )
    }

    return (
        <div className="wrapper">
            <h1>Reachat</h1>

            {
                !userAction ? (
                    <div className="btns-container">
                        <button onClick={() => handleClick("create")}>Create a room</button>
                        <button onClick={() => handleClick("join")}>Join a room</button>
                    </div>
                ) : (
                    <div className="container">
                        { (userAction === "create") ? (
                            <CreateForm
                                room={room}
                                error={error}
                                setRoom={setRoom}
                                username={username}
                                setUsername={setUserName}
                                handleSubmit={handleSubmit}
                            />
                            ) : ( <JoinForm
                                    room={room}
                                    error={error}
                                    setRoom={setRoom}
                                    username={username}
                                    setUsername={setUserName}
                                    handleSubmit={handleSubmit}
                                />
                            )
                        }
                        <button className="back" onClick={() => setUserAction("")}>Back</button>
                    </div>
                )
            }
        </div>
    )
}

export default Home;