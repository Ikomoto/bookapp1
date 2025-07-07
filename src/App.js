import React, {useEffect, useState} from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./componets/BookList";
import BookDetail from "./componets/BookDetail";
import Home from "./componets/Home";
import Pokemon from "./componets/Pokemon";
import {getAllPokemon} from "./componets/Pokemon";
import PokemonDetail from "./componets/PokemonDetail";


const FetchJapaneseNames = async () => {
    const results =[];
    for(let id=1; id<= 151; id++){
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const data = await res.json();
        const jaNameData = data.names.find(n => n.language.name === "ja");
        const enNameData = data.names.find(n => n.language.name === "en");

        results.push({
            id: id,
            jaName: jaNameData?.name || "不明",
            enName: enNameData?.name|| "不明"
        });
    }
    //console.log(results);
    return results;
};


const GetPokemonList = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const data = await res.json();
    return data;
    //console.log(data.results);
};

const GetPokemonDetailList = async (urlList) => {
    let pokemonData = Promise.all(
        urlList.map((pokemon) => {
            let pokemonRecord = getPokemon(pokemon.url);
            return pokemonRecord;
        })
    );
    return pokemonData;
};

const getPokemon = async(url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                //console.log(data)
                resolve(data);
            });
    })
    
};

function App() {
    const [pokeName_ja_en, setPokeName_ja_en] = useState([]);
    //const [pokemonList, setPokemonList] = useState([]);
    const [pokemonDetail, setPokemonDetail] = useState([]);
    const [loading, setLoading] = useState(true );

    useEffect(() => {
        const GetData = async () => {
            const names = await FetchJapaneseNames();
            setPokeName_ja_en(names);
        }
        GetData();
    },[]);

    useEffect(() => {
        const GetPokemonListData = async () => {
            const data = await GetPokemonList();
            const detail = await GetPokemonDetailList(data.results); 
            //console.log(detail);
            setLoading(false);
            setPokemonDetail(detail);
        };
        GetPokemonListData();
    },[]);



    //console.log(pokemonDetail);

    return (
        <Router>
        <Routes>
            <Route path="/" element={<Pokemon pokemonList={pokemonDetail} loading={loading}/>}></Route>
            <Route path="/booklist" element={<BookList />}></Route>
            <Route path="/bookdetail" element={<BookDetail />}></Route>
            <Route path="/pokemon" element={<Pokemon />}></Route>
            <Route path="/pokemon/:id" element={<PokemonDetail pokemonInfo={pokeName_ja_en}/>}></Route>
        </Routes>
        </Router>
    );
}

export default App;
