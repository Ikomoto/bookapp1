import React, {useEffect, useState} from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./componets/BookList";
import BookDetail from "./componets/BookDetail";
import Home from "./componets/Home";
import Pokemon from "./componets/Pokemon";
import {getAllPokemon} from "./componets/Pokemon";

function App() {




  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/booklist" element={<BookList />}></Route>
          <Route path="/bookdetail" element={<BookDetail />}></Route>
          <Route path="/pokemon" element={<Pokemon />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
