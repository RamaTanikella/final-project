import React from "react";
import defaultImg from "../images/room1.png";
import PropTypes from "prop-types";
import { memo } from "react";

const Room = memo(({ room }) => {
    console.log(JSON.stringify(room))
    const { name, description, images, price } = room;
    // console.log(name);
    return (
        <article className="room">
        <div className="img-container">
            <img src={images[0] || defaultImg} alt="single room" />
            <div className="price-top">
            <h6>${price}</h6>
            <p>per night</p>
            </div>
            <div>
                <p>{description}</p>
            </div>
        </div>
        <p className="room-info">{name}</p>
        </article>
    );
});

Room.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired
  })
};
export default Room;