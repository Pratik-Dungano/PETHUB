import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../components/providers/AuthProvider';
import { Link, useLoaderData } from 'react-router-dom';
import Navbar from '../../../shared/navbar/Navbar';
import Footer from '../../../shared/footer/Footer';
import Chat from '../../chat/chat';


const AdoptPet = () => {
  const details = useLoaderData();
  const { user } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [showChat, setShowChat] = useState(false);

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
                className="block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Send Request
              </button>
              <button
                onClick={() => setShowChat(!showChat)}
                className="block w-full select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                {showChat ? 'Hide Chat' : 'Chat with Owner'}
              </button>
              <dialog id="my_modal_4" className="modal -z-10">
                <div className="modal-box w-11/12 lg:w-3/12 max-w-5xl flex flex-col items-center mx-auto justify-center">
                  {/* Form fields here */}
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
        {showChat && <Chat roomId={_id} userName={user?.displayName} />}
      </div>
      <Footer />
    </div>
  );
};

export default AdoptPet;
