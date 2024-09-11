  import React, { useContext, useState } from 'react';
  import Swal from 'sweetalert2';
  import { AuthContext } from '../../../components/providers/AuthProvider';
  import { Link, useLoaderData } from 'react-router-dom';
  import Navbar from '../../../shared/navbar/Navbar';
  import Footer from '../../../shared/footer/Footer';
  import { JitsiMeeting } from '@jitsi/react-sdk';

  const AdoptPet = () => {
    const details = useLoaderData();
    const { user } = useContext(AuthContext);
    const [phone, setPhone] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [showVideoConference, setShowVideoConference] = useState(false);

    const { _id, name, location, category, image, age, longdesp, shortdesp, userEmail } = details;

    const handleAddToCart = (e) => {
      e.preventDefault();
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addtoadopt),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            Swal.fire({
              title: 'Success!',
              text: 'Adopt request sent successfully',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          }
        });
    };

    const handleVideoCall = () => {
      setShowVideoConference(true);
    };

    return (
      <div>
        <Navbar />
        <div className=' mt-32'>
          <div className="card card-side bg-base-100 shadow-xl w-6/12 h-4/12 mx-auto my-20">
            <figure><img src={image} alt="Pet" className='w-12/12 ' /></figure>
            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <p>{shortdesp}</p>
              <p>{age}</p>
              <p>{location}</p>
              <p>{longdesp}</p>
              <div className="p-6 pt-0 flex gap-4">
                <button
                  onClick={() => document.getElementById('my_modal_4').showModal()}
                  className="block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Send Request
                </button>

                {/* New Button for Video Call */}
                <button
                  onClick={handleVideoCall}
                  className="block w-full select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Request Video Call
                </button>

                <dialog id="my_modal_4" className="modal -z-10">
                  <div className="modal-box w-11/12 lg:w-3/12 max-w-5xl flex flex-col items-center mx-auto justify-center">
                    <div className="lg:mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        User Name
                      </label>
                      <input
                        type="text"
                        name="displayName"
                        id="displayName"
                        defaultValue={user?.displayName}
                        placeholder="Name"
                        readOnly
                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                    <div className="lg:mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        User Email
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={user?.email}
                        placeholder="Email"
                        readOnly
                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                    <div className="lg:mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        User Phone
                      </label>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter Your Phone Number"
                        min="0"
                        required
                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                    <div className="lg:mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        User Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                        placeholder="Enter Your Address"
                        min="0"
                        required
                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                    <div className="modal-action">
                      <form method="dialog">
                        <div className="flex flex-col lg:flex-row lg:gap-7">
                          <button
                            className="btn bg-green-500"
                            type="submit"
                            onClick={(e) => handleAddToCart(e)}
                          >
                            Submit
                          </button>
                          <button className="btn bg-blue-400">Close</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Jitsi Video Conference */}
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
                onApiReady={(externalApi) => {
                  // Attach custom event listeners here
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
        <Footer />
      </div>
    );
  };

  export default AdoptPet;
