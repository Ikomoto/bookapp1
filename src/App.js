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

const GetPokemonSpeciesDetailList2 = async (urlList) => {
    let pokemonJaData = await Promise.all(
        urlList.map((pokemon) => {
            let pokemonJaRecord = getPokemon(pokemon);
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

//フラットにしたtypeをもとに戻してあげる関数
const rebuild = (flatArray, structure) => {
    const result = [];
    let index = 0;

    for (let size of structure) {
        if (size === 1) {
            result.push(flatArray[index]);
        } else {
            result.push(flatArray.slice(index, index + size));
        }
        index += size;
    }

  return result;
};



function App() {

    //id,日本語,英語の情報を持つ、検索時に使う変換表
    const [pokeName_ja_en, setPokeName_ja_en] = useState([]);
    //const [pokemonList, setPokemonList] = useState([]);

    //https://pokeapi.co/api/v2/pokemon/1~151の情報を持つ
    const [pokemonDetail, setPokemonDetail] = useState([]);

    //https://pokeapi.co/api/v2/pokemon-species/の日本語のデータを持つ
    const [pokemonDetailJa, setPokemonDetailJa] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true );
    const flavor_text1 = [];

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
             console.log("pokemonDetail 実行された！");
        };
        GetPokemonListData();
    },[]);

    useEffect(() => {
        const GetPokemonListDataJa = async () => {
            const jaData = await GetPokemonSpeciesList(SpeciesPokemonURL);
            const jaDetail = await GetPokemonSpeciesDetailList(jaData.results);
            setPokemonDetailJa(jaDetail);
             console.log("pokemonDetailJa 実行された！");
        };
        GetPokemonListDataJa();
    },[]);

    //console.log(pokemonDetailJa);

    useEffect(() => {
        const fetchDataAsync = async () => {
            if(pokemonDetail.length > 0 && pokemonDetailJa.length >0){
                console.log("useEffect 実行された！");

                const height = pokemonDetail.map(t => t.height);
                //console.log(height); 高さOK

                const weight = pokemonDetail.map(t => t.weight);
                //console.log(weight); 重さOK

                //タイプ取得
                const typeList = pokemonDetail.map((pokemon) =>
                    pokemon.types.map((t) => t.type.url)
                );
                
                const structure = typeList.map(item => Array.isArray(item) ? item.length : 1);
                const flattened = typeList.flatMap(item =>
                    Array.isArray(item) ? item : [item]
                );
                //console.log(flattened);

                const typeDataList = await GetPokemonSpeciesDetailList2(flattened);
                //console.log(typeDataList);
                //console.log(Array.isArray(typeDataList));
                const flattenedJaNames = typeDataList.map(typeData => {
                    const jaNameEntry = typeData.names.find(n => n.language.name === "ja");
                    return jaNameEntry ? jaNameEntry.name : "不明";
                });

                const groupedJaNames = rebuild(flattenedJaNames, structure);
                //console.log(groupedJaNames);
                //日本語のタイプOK
               
                
                const pokemonJaName = pokemonDetailJa.map((ja) => {
                    const jaNameEntry = ja.names.find(n => n.language.name === "ja");
                    return jaNameEntry ? jaNameEntry.name : '不明';
                });
                //console.log(pokemonJaName);

                const flavor_text = pokemonDetailJa.map(typeData => {
                    const jaNameEntry = typeData.flavor_text_entries.find(n => n.language.name === "ja");
                    return jaNameEntry ? jaNameEntry.flavor_text : "不明";
                });
                //console.log(flavor_text);

                const mergedJaData = pokemonDetailJa.map((pokemon, index) => ({
                    id: pokemon.id,
                    name: pokemonJaName[index],
                    types: flavor_text[index] || ["不明"]
                }));
                console.log(mergedJaData);
                

                const mergedData = pokemonDetail.map((pokemon, index) => ({
                    id: pokemon.id,
                    name: pokemonJaName[index],
                    types: groupedJaNames[index] || ["不明"],
                    height: pokemon.height,
                    weight: pokemon.weight,
                    flavor_text: flavor_text[index]
                }));
                console.log(mergedData);
                 
            }
        };
        fetchDataAsync();
    },[pokemonDetail,pokemonDetailJa]);




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
