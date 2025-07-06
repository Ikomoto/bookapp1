
import React, { useEffect, useState } from "react";

const PokemonURL = "https://pokeapi.co/api/v2/pokemon";




const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => resolve(data));
    });
};


const searchPokemon = (JaName, pokeData) => {
        const result =pokeData.find(p => p.ja == JaName);
        return result ? result.en : null;
};

const fetchJapaneseNames = async () => {
    const results =[];
    const [jaName, setJaName] = useState([])

    for(let id=1; id<= 151; id++){
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const data = await res.json();
        
        const jaNameData = data.names.find(n => n.language.name === "ja");
        //console.log(jaNameData);
        //const jaName = jaNameData.name;
        setJaName(jaNameData.name);
        //console.log(jaName);
    }
}

function Pokemon(){
    const initialURL = "https://pokeapi.co/api/v2/pokemon";
    const initialURL2 = "https://pokeapi.co/api/v2/pokemon-species/1"
    //const [pokeData, setNameList] = useState([]);
    const [jaName, setJaName] = useState([]);

    const fetchJapaneseNames = async () => {
        for(let id=1; id<= 151; id++){
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            const data = await res.json();
            
            const jaNameData = data.names.find(n => n.language.name === "ja");
            setJaName([jaNameData.name]);
        }
    };

    useEffect(() => {
        fetchJapaneseNames();
    }, []);

    /*
    useEffect(() => {
        const fetchPokemonData = async() => {
        //すべてのポケモンデータを取得
            let res = await getAllPokemon(initialURL2);
            console.log(res);
            setNameList(res.results.map((pokemon) => pokemon.name));
            console.log(pokeData);
        };
        fetchPokemonData();
    }, []);

    /*
    useEffect(() => {
        if(pokeData.length > 0){
            const pokemon1 = searchPokemon("バタフリー", pokeData);
            console.log(pokemon1);
        }
    }, [pokeData]);
    */

    return (
        <div>
            <h2>ポケモンの名前一覧</h2>
            <ul>
                {jaNames.map((name, index) => (
                    <li key={index}>{name} </li>
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