import React, { useState } from 'react';

import CreateForm from "./CreateForm";
import JoinForm from "./JoinForm";

import { Redirect } from 'react-router-dom';

import "./Home.css";

const Home = () => {
    const [userAction, setUserAction] = useState("");
    const [username, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !room) {
            setError("Please fill in all fields");
            return;
        }
        setSubmitted(true);
        console.log(room, username);
    };

    const handleClick = (event) => {
        setRoom("");
        setError("");
        setUserName("");
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
            <h1>React chat app</h1>

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
                        <button className="back" onClick={() => setUserAction("")}>Back </button>
                    </div>
                )
            }
        </div>
    )
}

export default Home;