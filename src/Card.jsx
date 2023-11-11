import React from "react";
import "./Card.css"

function Card({ key, image }) {
    console.log(image);
    return <img className="Card" key={key} src={image} />
}

export default Card;