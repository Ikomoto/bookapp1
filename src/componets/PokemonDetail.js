import { data, useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import PokemonDetailCard from "./Cards/PokemonDetailCard";


const searchPokemon = async (pokemonID) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    const data = await res.json();

    return data;
}

function PokemonDetail({detailDataList, pokemonInfo}) {
    const { id } = useParams();
    const [resultPokemon, setResultPokemon] = useState([]);

    useEffect(() => {
        if(detailDataList.length > 0){
            const found = detailDataList.find((p) => p.id === Number(id));
            setResultPokemon(found);
        }
    }, [id, detailDataList]);


    /*
    useEffect(() => {
        const fetchData = async () => {
            const data = await searchPokemon(id);
            setResultPokemon(data);
            
        }; 
        fetchData();
    },[id]);
    */
    if(!resultPokemon){
        return <p> 読み込み中...</p>
    }

    return (
    <div>
        <PokemonDetailCard pokemon={resultPokemon} />
    </div>
    );
}

export default PokemonDetail;
