import React from "react";
import { useEffect, useState } from "react";

function BookSearch(){
    const [keyword, setkeyword] = useState("");
    const [books, setBooks] = useState([]);

    //APIを呼び出す関数
    const searchBooks = () => {
        if(!keyword) return; //キーワードが空なら何もしない

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)  
            .then((res) => res.json())
            .then((data) => {
                if(!data.items){
                    setBooks([]);
                    return;
                }

                const results = data.items.map(item => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors?.join(", "),
                    image: item.volumeInfo.imageLinks?.thumbnail,
                    description: item.volumeInfo.description,
                }));

                setBooks(results);
                console.log(results);
            });
    };
        

    return(
        <div className="serch-container">
            <input 
                className="Serch-input"
                type="text"
                value={keyword}
                onChange={(e) => setkeyword(e.target.value)}
                placeholder="本のタイトルを入力"
            />
            <button className="search-button" onClick={searchBooks}>
                検索
            </button>

            <div className="book-results">
                {books.map((book) => (
                    <div key={book.id} className="book-card">
                        {book.image && <img src={book.image} alt={book.title} />}
                        <h4>{book.title}</h4>
                        <p>{book.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookSearch;
