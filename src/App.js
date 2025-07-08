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
    const [loading, setLoading] = useState(true );

    const [detailDataList, setDetailDataList] = useState([]);

    const PokemonURL = "https://pokeapi.co/api/v2/pokemon/?limit=151";
    const SpeciesPokemonURL = "https://pokeapi.co/api/v2/pokemon-species/?limit=151";

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
                const weight = pokemonDetail.map(t => t.weight);






                //タイプ取得
                const typeList = pokemonDetail.map((pokemon) =>
                    pokemon.types.map((t) => t.type.url)
                );
                const structure = typeList.map(item => Array.isArray(item) ? item.length : 1);
                const flattened = typeList.flatMap(item =>
                    Array.isArray(item) ? item : [item]
                );
                const typeDataList = await GetPokemonSpeciesDetailList2(flattened);
                //console.log(typeDataList);
                //console.log(Array.isArray(typeDataList));
                const flattenedJaNames = typeDataList.map(typeData => {
                    const jaNameEntry = typeData.names.find(n => n.language.name === "ja");
                    return jaNameEntry ? jaNameEntry.name : "不明";
                });
                const groupedTypeJaNames = rebuild(flattenedJaNames, structure);
                //日本語のタイプOK
                
                
                //特性取得
                const abilityListUrl = pokemonDetail.map((pokemon) => 
                    pokemon.abilities.map((t) => t.ability.url)
                );
                //console.log(abilityListUrl);
                const abiStructure = abilityListUrl.map(item => Array.isArray(item) ? item.length : 1);
                const abiFlattened = abilityListUrl.flatMap(item =>
                    Array.isArray(item) ? item : [item]
                );
                //console.log(abiFlattened);
                const abilityList = await GetPokemonSpeciesDetailList2(abiFlattened);
                //console.log(abilityList);
                

                const flattenedAbiJaNames = abilityList.map(typeData => {
                    const jaAbiNameEntry = typeData.names.find(n => n.language.name === "ja");
                    return jaAbiNameEntry ? jaAbiNameEntry.name : "不明";
                });
                const groupedAbiJaNames = rebuild(flattenedAbiJaNames, abiStructure);
                //console.log(groupedAbiJaNames);

                //
                const flattenedAbiJaFlavor = abilityList.map(typeData => {
                    const jaAbiNameEntry = typeData.flavor_text_entries.find(n => n.language.name === "ja" && n.version_group.name === "x-y");
                    return jaAbiNameEntry ? jaAbiNameEntry.flavor_text : "不明";
                });
                const groupedAbiJaFlavor = rebuild(flattenedAbiJaFlavor, abiStructure);
                //console.log(groupedAbiJaFlavor);





                
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
                //console.log(mergedJaData);

                //分類を取得
                const genus = pokemonDetailJa.map((ja) => {
                    const genusEntry = ja.genera.find(n => n.language.name === "ja");
                    return genusEntry ? genusEntry.genus : "不明";
                });
                //console.log(genus);


                
                //ポケモンリストから種族値を取得
                const hp = pokemonDetail.map((pokemon) => {
                    const hpStat = pokemon.stats.find(n => n.stat.name === "hp");
                    return hpStat ? hpStat.base_stat : null;
                });
                //console.log(hp);

                //種族値を取り出すためのキー
                const desiredOrder = [
                        "hp",
                        "attack",
                        "defense",
                        "special-attack",
                        "special-defense",
                        "speed"
                    ];

                const statsList = pokemonDetail.map((pokemon) => {
                    const stats = {};
                    desiredOrder.forEach((statName) => {
                        const found = pokemon.stats.find(stat => stat.stat.name === statName);
                        stats[statName] = found ? found.base_stat : null;
                    });
                    return stats;
                });
                console.log(statsList)



                const pokemonDetailDataList = pokemonDetail.map((pokemon, index) => ({
                    id: pokemon.id,
                    genus: genus[index],
                    name: pokemonJaName[index],
                    image: pokemon.sprites.front_default,
                    types: groupedTypeJaNames[index] || ["不明"],
                    abilityName: groupedAbiJaNames[index],
                    abilityFlavor_text: groupedAbiJaFlavor[index],
                    height: pokemon.height,
                    weight: pokemon.weight,
                    flavor_text: flavor_text[index],
                    stats: statsList[index]
                }));
                setDetailDataList(pokemonDetailDataList);
                console.log(pokemonDetailDataList);
                
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
            <Route path="/pokemon/:id" element={<PokemonDetail detailDataList={detailDataList} pokemonInfo={pokeName_ja_en}/>}></Route>
        </Routes>
        </Router>
    );
}

export default App;
