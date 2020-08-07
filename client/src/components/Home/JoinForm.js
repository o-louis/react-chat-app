import React from 'react'

const JoinForm = ({ room, error, setRoom, username, setUsername, handleSubmit }) => (
    <form onSubmit={handleSubmit} >
        <input
            type="text"
            value={room}
            placeholder="Enter the room id"
            onChange={(e) => setRoom(e.target.value)}
        />
        <input
            type="text"
            value={username}
            placeholder="Enter an username"
            onChange={(e) => setUsername(e.target.value)}
        />
        {error && <span>{error}</span>}
        <button type="submit">Join</button>
    </form>
)

export default JoinForm;
