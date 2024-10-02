/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { AuthContext } from "../../components/providers/AuthProvider";
import { useContext } from "react";

const PetListingCard = ({ card }) => {
  const { _id, image, name, age, location, category, addedDate, owner } = card;
  const { user } = useContext(AuthContext);

  return (
    <div className="mx-5">
      <div className="card h-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image} className="w-6/12" alt={name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Pet Name: {name}</h2>
          <p>Age: {age}</p>
          <p>Location: {location}</p>
          <p>{category}</p>
          <p>Added Time: {addedDate}</p>
          <p>Owner: {owner}</p>
          <div className="hidden md:flex">
            {user && <p className="lg:mx-4 mx-0">Current User: {user.displayName}</p>}
          </div>
          <div className="card-actions justify-end">
            <Link to={`../adoptpet/${_id}`}>
              <button className="btn btn-primary">View Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetListingCard;
