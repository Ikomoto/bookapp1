import React, { useState } from 'react';

const BookDetail = () => {

    const [count, setCount] = useState(0);
        const handleClick = () => {
        setCount(count + 1)
    }

    return (
        <div>
        <p>Count: {count}</p>
        <button onClick={handleClick}>カウントアップ</button>
        </div>
    )
};

export default BookDetail;
