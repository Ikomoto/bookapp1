
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";
import { Link } from "react-router-dom";
import Card from "./Cards/Card.js"
import './pokemon.css';

function Pokemon({pokemonList, pokemonJaList, loading}){
    const [pokemonCardInfo, setPokemonCardInfo] = useState([]);
    const pokemonJaDict = [];
    const flavor_text = [];


    //console.log(pokemonJaList);

    useEffect(() => {
        const CombineData = async () => {
            
            pokemonJaList.forEach((ja) => {
                const jaNameEntry = ja.names.find(n => n.language.name === "ja");
                pokemonJaDict[ja.id] = jaNameEntry ? jaNameEntry.name : '不明';
            });
            //console.log(pokemonJaDict);

            const CardInfo = pokemonList.map((pokemon) => {
                return{
                    id: pokemon.id,
                    imageUrl: pokemon.sprites.front_default,
                    jaName: pokemonJaDict[pokemon.id]
                }
            });
            //console.log(CardInfo);

            /*
            //フレーバーテキスト抽出
            pokemonJaList.forEach((entry) => {
                const flavorEntry = entry.flavor_text_entries.find(
                    (n) => 
                        n.language.name === "ja" &&
                        n.version.name === "x"
                );
                flavor_text[entry.id] = flavorEntry ? flavorEntry.flavor_text : "不明";
                //const genusEntry = entry.genera.find((n) => n.language.name === "ja")
                //console.log(flavorEntry);
            });
            console.log(flavor_text)
            */
            setPokemonCardInfo(CardInfo);
        }
        CombineData();
    },[pokemonJaList]);
    
    //console.log(pokemonCardInfo);

    return (
        <div className="App">
            {loading ? (
                <h1>ロード中・・・</h1>
        ) : (
            <>
                <h2>ポケモンの名前一覧</h2>
                
                <div className="pokemonCardContainer">
                    {pokemonCardInfo.map((pokemon, i) => {
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