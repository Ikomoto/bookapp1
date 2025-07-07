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





const GetPokemonSpeciesList = async (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => resolve(data));
    });
};

const GetPokemonSpeciesDetailList = async (urlList) => {
    let pokemonJaData = Promise.all(
        urlList.map((pokemon) => {
            let pokemonJaRecord = getPokemon(pokemon.url);
            return pokemonJaRecord;
        })
    );
    return pokemonJaData;
};







const GetPokemonList = async (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => resolve(data));
    });
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




//DetailList()から呼び出される。
//results.urlからポケモンの情報を1つ呼び出す
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

    //id,日本語,英語の情報を持つ、検索時に使う変換表
    const [pokeName_ja_en, setPokeName_ja_en] = useState([]);
    //const [pokemonList, setPokemonList] = useState([]);

    //https://pokeapi.co/api/v2/pokemon/1~151の情報を持つ
    const [pokemonDetail, setPokemonDetail] = useState([]);

    //https://pokeapi.co/api/v2/pokemon-species/の日本語のデータを持つ
    const [pokemonDetailJa, setPokemonDetailJa] = useState([]);
    const [loading, setLoading] = useState(true );

    const PokemonURL = "https://pokeapi.co/api/v2/pokemon";
    const SpeciesPokemonURL = "https://pokeapi.co/api/v2/pokemon-species";

    useEffect(() => {
        const GetData = async () => {
            const names = await FetchJapaneseNames();
            setPokeName_ja_en(names);
        }
        GetData();
    },[]);

    useEffect(() => {
        const GetPokemonListData = async () => {
            const data = await GetPokemonList(PokemonURL);
            const detail = await GetPokemonDetailList(data.results); 
            //console.log(detail);
            setLoading(false);
            setPokemonDetail(detail);
        };
        GetPokemonListData();
    },[]);

    useEffect(() => {
        const GetPokemonListDataJa = async () => {
            const jaData = await GetPokemonSpeciesList(SpeciesPokemonURL);
            const jaDetail = await GetPokemonSpeciesDetailList(jaData.results);
            setPokemonDetailJa(jaDetail);
        };
        GetPokemonListDataJa();
    },[]);

    //console.log(pokemonDetailJa);

    return (
        <Router>
        <Routes>
            <Route path="/" element={<Pokemon pokemonList={pokemonDetail} pokemonJaList={pokemonDetailJa} loading={loading}/>}></Route>
            <Route path="/booklist" element={<BookList />}></Route>
            <Route path="/bookdetail" element={<BookDetail />}></Route>
            <Route path="/pokemon" element={<Pokemon />}></Route>
            <Route path="/pokemon/:id" element={<PokemonDetail pokemonInfo={pokeName_ja_en}/>}></Route>
        </Routes>
        </Router>
    );
}

export default App;
