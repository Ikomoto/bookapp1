
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";
import { Link } from "react-router-dom";

/*

const FetchJapaneseNames = async () => {
    const results =[];
    for(let id=1; id<= 151; id++){
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const data = await res.json();
        const jaNameData = data.names.find(n => n.language.name === "ja");
        const enNameData = data.names.find(n => n.language.name === "en");
        //const jaName = jaNameData.name;
        //console.log(enNameData);
        results.push({
            id: id,
            jaName: jaNameData?.name || "不明",
            enName: enNameData?.name|| "不明"
        });
    }
    console.log(results);
    return results;
};
*/

function Pokemon({pokemonInfo}){
    //const initialURL = "https://pokeapi.co/api/v2/pokemon";
    //const initialURL2 = "https://pokeapi.co/api/v2/pokemon-species"
    /*
    const [pokeName_ja_en, setPokeName_ja_en] = useState([]);

    useEffect(() => {
        const GetData = async () => {
            const names = await FetchJapaneseNames();
            setPokeName_ja_en(names);
        }
        GetData();
    },[]);

    //console.log(pokeName_ja_en);
    */

    return (
        <div>
            <h2>ポケモンの名前一覧2</h2>
            <ul>
                {pokemonInfo.map((pokemon) => (
                    <li key={pokemon.id}>
                        <Link to={`/pokemon/${pokemon.id}`}>
                            {pokemon.id}: {pokemon.jaName}: {pokemon.enName}
                        </Link>
                    </li>
                ))}
            </ul>
            <ul>
                {pokemonInfo.map((pokemon) => (
                    <li key={pokemon.id}>
                        {pokemon.id}: {pokemon.jaName}: {pokemon.enName}
                    </li>
                ))}
            </ul>
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