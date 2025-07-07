
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";
import { Link } from "react-router-dom";
import Card from "./Cards/Card.js"
import './pokemon.css';

function Pokemon({pokemonList, loading}){

    return (
        <div className="App">
            {loading ? (
                <h1>ロード中・・・</h1>
        ) : (
            <>
                <h2>ポケモンの名前一覧</h2>
                
                <div className="pokemonCardContainer">
                    {pokemonList.map((pokemon, i) => {
                        return <Card key={i} pokemon={pokemon}/>;
                    })}
                </div>
                {/*
                <ul>
                    {pokemonList.map((pokemon) => (
                        <li key={pokemon.id}>
                            
                            <Link to={`/pokemon/${pokemon.id}`}>
                                {pokemon.id}: {pokemon.name}:
                                <img src={pokemon.sprites.front_default} alt=""/>
                            </Link>
                        </li>
                    ))}
                </ul>
                */}
            </>
            )}
        </div>
    );
};

export default Pokemon;





/*
function PokemonSearch(){
    const [keyword, setKeyword] = useState("")
    const [pokemon, setPokemon] = useState([])

    const searchPokemon = () => {
        
        fetch(`${PokemonURL}+${keyword}`)
            .then((res) => res.json())
            .then((data) => {
                
                const results = data.item

            });


        
    };

    return (
        <div>

        </div>
    );
}
*/