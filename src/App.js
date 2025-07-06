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

function App() {
    const [pokeName_ja_en, setPokeName_ja_en] = useState([]);

    useEffect(() => {
        const GetData = async () => {
            const names = await FetchJapaneseNames();
            setPokeName_ja_en(names);
        }
        GetData();
    },[]);
    console.log(pokeName_ja_en);

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Pokemon pokemonInfo={pokeName_ja_en}/>}></Route>
          <Route path="/booklist" element={<BookList />}></Route>
          <Route path="/bookdetail" element={<BookDetail />}></Route>
          <Route path="/pokemon" element={<Pokemon />}></Route>
          <Route path="/pokemon/:id" element={<PokemonDetail pokemonInfo={pokeName_ja_en}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
