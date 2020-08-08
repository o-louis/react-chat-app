import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import ScrollToBottom from 'react-scroll-to-bottom';

import "./Room.css";

let socket;
const Room = (props) => {
    const [username, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState([]);
    

    useEffect(() => {
        socket = io('https://112f55c80099.ngrok.io');
        const { name, room } = props.location.state;
        setUserName(name);
        socket.emit("new-user-connected", { name, room });
    }, [props.location.state])

    useEffect(() => {
        socket.on('message', message => {
            setConversation(conversation => [ ...conversation, message ]);
        })
    }, [])

    const handleClick = () => {
        socket.emit('send-message', message);
        setMessage("");
    }

    return (
        <div className="room-chat">
            <ScrollToBottom className="message-container">
                {conversation.map((item, index) => {
                    const classUser = (item.name && item.name) === username ? "user" : "other";
                    return (
                        <div key={index} className={classUser}>
                            <span className="author">{item.name}</span>
                            <span className="speech-bubble">{item.message}</span>
                        </div>
                    )
                })}
            </ScrollToBottom>

            <div className="input-message">
                <input
                    type="text"
                    value={message}
                    placeholder="Type a message"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleClick}>Send</button>
            </div>
        </div>
    )
}

export default Room;
