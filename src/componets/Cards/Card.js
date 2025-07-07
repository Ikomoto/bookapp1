import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({pokemon}) => {
    return (
        <Link to={`/pokemon/${pokemon.id}`} className="card-link">
            <div className="card">
                <div className="cardImg">
                    <img src={pokemon.imageUrl} alt="" />
                </div>
                <h3 className="cardName">{pokemon.jaName}</h3>
                <div className="cardTypes">
                </div>
                <div className="cardInfo">
                </div>
            </div>
        </Link>
    );
};

export default Card;