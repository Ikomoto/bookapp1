import { data, useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";


const searchPokemon = async (pokemonID) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    const data = await res.json();

    return data;
}

function PokemonDetail({pokemonInfo}) {
    const { id } = useParams();
    const [resultPokemon, setResultPokemon] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await searchPokemon(id);
            setResultPokemon(data);
            
        }; 
        fetchData();
    },[id]);
    
    if(!resultPokemon){
        return <p> 読み込み中...</p>
    }

    return (
    <div>
        <h2>{resultPokemon.name}</h2>

        <p>図鑑番号: {resultPokemon.id}</p>
        <img src={resultPokemon.sprites?.front_default} alt="resultPokemon.name" />
        {/* 画像やタイプなどがある場合はここに追加 */}
    </div>
    );
}

export default PokemonDetail;
