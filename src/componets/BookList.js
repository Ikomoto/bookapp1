import React from "react";
import { Link } from "react-router-dom";
import "./BookList.css";

const books = [
    {
    id: 1,
    title: "三体",
    author: "劉慈欣",
    image: "/bookimage/book1.jpg",
    description: "SF小説",
    },
    {
    id: 2,
    title: "三体 黒暗森林",
    author: "劉慈欣",
    image: "/bookimage/book2.jpg",
    description: "SF小説 三体の2部作目",  
    },
]

function BookList(){
    return(
    <div className="book-list">
        {books.map((book) => (
            <div key={book.id} className="book-card">
                <img src={book.image} alt={book.title} />
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <p>{book.description}</p>
            </div>
        ))
        }
    </div>
    );
}

export default BookList;