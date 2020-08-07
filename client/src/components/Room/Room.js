import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;
const Room = (props) => {
    const [room, setRoom] = useState("");
    const [username, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState([]);
    

    useEffect(() => {
        socket = io('http://localhost:2000');
        const { name, room } = props.location.state;

        setRoom(room);
        setUserName(name);

        socket.emit("new-user-connected", { name, room });

    }, [props.location.state])

    useEffect(() => {
        socket.on('message', ({message}) => {
            setConversation(conversation => [ ...conversation, message ]);
        })
    }, [])

    const handleClick = () => {
        socket.emit('send-message',{room, message, username});
        setMessage("");
    }

    return (
        <div>
            {conversation.map((msg, index) => {
                return <p key={index}>{msg}</p>
            })}

            <div>
                <input type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button onClick={handleClick}>Send</button>
            </div>
        </div>
    )
}

export default Room;
