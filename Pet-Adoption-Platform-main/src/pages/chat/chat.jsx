import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = ({ roomId, userName }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socketIo = io('http://localhost:3000');
    setSocket(socketIo);

    socketIo.emit('join-room', roomId);

    socketIo.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [roomId]);

  const handleSend = () => {
    if (socket && message) {
      socket.emit('chat message', { roomId, text: message, sender: userName });
      setMessage('');
    }
  };

  return (
    <div style={styles.chatBoxContainer}>
      <div style={styles.chatBox}>
        <h3>Chat with Owner</h3>
        <div style={styles.messageContainer}>
          {messages.map((msg, index) => (
            <div key={index} style={styles.message}>
              <strong>{msg.sender}: </strong>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  chatBoxContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  },
  chatBox: {
    width: '300px',
    height: '400px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  messageContainer: {
    flex: 1,
    overflowY: 'scroll',
    paddingBottom: '10px',
  },
  message: {
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    width: '100%',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Chat;
