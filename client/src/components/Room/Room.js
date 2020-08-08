import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import ScrollToBottom from 'react-scroll-to-bottom';

import "./Room.css";

let socket;
const Room = (props) => {
    const [username, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState([]);
    const [typedMessage, setTypedMessage] = useState("");

    let timeout = null;
    

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

    useEffect(() => {
        socket.on('notif-typed', message => {
            setTypedMessage(message);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('send-message', message);
        setMessage("");
    }

    const timeoutFunction = () => {
        setTypedMessage("");
        socket.emit('typing', false);
        timeout = null;
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
        if (timeout) clearTimeout(timeout);
        socket.emit('typing', true);
        timeout = setTimeout(timeoutFunction, 2000);
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

            
            <form className="input-message" onSubmit={handleSubmit}>
                { typedMessage &&
                    <p className="typed-message">... {typedMessage}</p>}

                <input
                    type="text"
                    value={message}
                    placeholder="Type a message"
                    onChange={handleChange}
                />
                <button type="submit" >Send</button>
            </form>
        </div>
    )
}

export default Room;
