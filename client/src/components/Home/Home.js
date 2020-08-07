import React, { useState } from 'react';

import CreateForm from "./CreateForm";
import JoinForm from "./JoinForm";

import "./Home.css";

const Home = () => {
    const [userAction, setUserAction] = useState("");
    const [username, setUserName] = useState("");
    const [room, setRoom] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="wrapper">
            <h1>Create or join a room</h1>

            {
                !userAction ? (
                    <React.Fragment>
                        <button onClick={() => setUserAction("create")}>Create a room</button>
                        <button onClick={() => setUserAction("join")}>Join a room</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        { (userAction === "create") ? 
                            <CreateForm handleSubmit={handleSubmit} />
                            : <JoinForm handleSubmit={handleSubmit} />
                        }
                        <button onClick={() => setUserAction("")}>Back</button>
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default Home;