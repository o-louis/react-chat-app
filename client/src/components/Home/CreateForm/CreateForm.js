import React, { useEffect } from 'react';

const min = 1000;
const max = 9999;

const generateRoomID = () => {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
};

const CreateForm = ({ room, error, setRoom, username, setUsername, handleSubmit }) => {
    useEffect(() => {
        setRoom(generateRoomID);
    }, [setRoom]);

    return (
        <React.Fragment>
            <div className="room-name">
                <p>Room ID: {room}</p>
            </div>
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    value={username}
                    placeholder="Enter an username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                {error && <span>{error}</span>}
                <button type="submit">Create</button>
            </form>
        </React.Fragment>
    )
}

export default CreateForm;
