import React, { useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../components/providers/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import Navbar from '../../../shared/navbar/Navbar';
import Footer from '../../../shared/footer/Footer';
import { JitsiMeeting } from '@jitsi/react-sdk';
import io from 'socket.io-client';

const AdoptPet = () => {
  const details = useLoaderData();
  const { user } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showVideoConference, setShowVideoConference] = useState(false);

  // Chat state
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const { _id, name, location, category, image, age, longdesp, shortdesp, userEmail } = details;

  // Initialize Socket.io for chat
  useEffect(() => {
    if (showChat) {
      const socketIo = io('http://localhost:5173/');
      setSocket(socketIo);

      socketIo.emit('join-room', _id);

      socketIo.on('chat message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      return () => {
        socketIo.disconnect();
      };
    }
  }, [showChat, _id]);

  const handleSend = () => {
    if (socket && message) {
      socket.emit('chat message', { roomId: _id, text: message, sender: user?.displayName });
      setMessage('');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const addtoadopt = {
      userEmail: user?.email,
      userName: user?.displayName,
      adoptDate: formattedDate,
      userAddress: userAddress,
      phone: phone,
      ownerEmail: userEmail,
      petId: _id,
      name,
      category,
      image,
      longdesp,
      shortdesp,
      adopt_Req: true,
    };

    document.getElementById('my_modal_4').close();

    fetch('https://htm-2024-server.vercel.app/addtoadopt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addtoadopt),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Adopt request sent successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      });
  };

  const handleVideoCall = () => {
    setShowVideoConference(true);
  };

  return (
    <div>
      <Navbar />
      <div className='mt-32'>
        <div className="card card-side bg-base-100 shadow-xl w-6/12 h-4/12 mx-auto my-20">
          <figure><img src={image} alt="Pet" className='w-12/12' /></figure>
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{shortdesp}</p>
            <p>{age}</p>
            <p>{location}</p>
            <p>{longdesp}</p>
            <div className="p-6 pt-0 flex gap-4">
              <button
                onClick={() => document.getElementById('my_modal_4').showModal()}
                className="block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105"
              >
                Send Request
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className="block w-full select-none rounded-lg bg-green-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105"
              >
                {showChat ? 'Hide Chat' : 'Chat with Owner'}
              </button>

              <button
                onClick={handleVideoCall}
                className="block w-full select-none rounded-lg bg-green-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105"
              >
                Request Video Call
              </button>

              <dialog id="my_modal_4" className="modal -z-10">
                <div className="modal-box w-11/12 lg:w-3/12 max-w-5xl flex flex-col items-center mx-auto">
                  <div className="lg:mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">User Name</label>
                    <input
                      type="text"
                      name="displayName"
                      defaultValue={user?.displayName}
                      placeholder="Name"
                      readOnly
                      className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium"
                    />
                  </div>

                  <div className="lg:mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">User Email</label>
                    <input
                      type="text"
                      name="email"
                      defaultValue={user?.email}
                      placeholder="Email"
                      readOnly
                      className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium"
                    />
                  </div>

                  <div className="lg:mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">User Phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter Your Phone Number"
                      className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium"
                    />
                  </div>

                  <div className="lg:mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">User Address</label>
                    <input
                      type="text"
                      name="address"
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                      placeholder="Enter Your Address"
                      className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium"
                    />
                  </div>

                  <div className="modal-action">
                    <button
                      className="btn bg-green-500"
                      type="submit"
                      onClick={(e) => handleAddToCart(e)}
                    >
                      Submit
                    </button>
                    <button className="btn bg-blue-400">Close</button>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        {showChat && (
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
        )}

        {/* Video Conference Section */}
        {showVideoConference && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-full w-full lg:w-3/4">
              <JitsiMeeting
                domain="meet.jit.si"
                roomName="AdoptionMeetingRoom"
                configOverwrite={{
                  startWithAudioMuted: true,
                  disableModeratorIndicator: true,
                  startScreenSharing: true,
                  enableEmailInStats: false,
                }}
                interfaceConfigOverwrite={{
                  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                }}
                userInfo={{
                  displayName: user?.displayName || 'Guest',
                }}
                getIFrameRef={(iframeRef) => {
                  iframeRef.style.height = '500px';
                }}
            />
            <button
              className="btn mt-4 bg-red-500"
              onClick={() => setShowVideoConference(false)}
            >
              Close Video Call
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer />
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

export default AdoptPet;
