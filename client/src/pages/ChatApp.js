// eslint-disable-next-line
import { useState } from 'react';
import './ChatApp.css';
import { io } from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect("http://localhost:5000");

function App() {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    }

    return (
        <div className="App">
            {!showChat ? <div className='joinChatContainer'>
                <h2>Join Chat</h2>
                <input type='text' value={username} placeholder='John...' onChange={(event) => { setUsername(event.target.value) }}></input>
                <input type='text' value={room} placeholder='Room ID...' onChange={(event) => { setRoom(event.target.value) }}></input>
                <button onClick={joinRoom}>Join a Room</button>
            </div> : <Chat socket={socket} username={username} room={room} />}
        </div>
    );
}

export default App;
