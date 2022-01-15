import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./App.css";

function Home() {
  // TODO
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const onChange = (e) => {
    setTodo(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      return;
    }
    setTodos((currenArray) => [...currenArray, todo]);
    setTodo("");
  };
  // Coin
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  const getCoin = async () => {
    const resp = await fetch("https://api.coinpaprika.com/v1/tickers");
    const json = await resp.json();
    setCoins(json);
    setLoading(false);
  };
  useEffect(() => { getCoin() }, []);

  const [selectedCoinValue, setSelctedCoinValue] = useState('');
  const [selectedCoinPrice, setSelectedCoinValue] = useState('');
  const selectedCoin = (e) => {
    setSelctedCoinValue(e.target.value);
    setSelectedCoinValue(e.target.dataset.price);
  };

  return (
    <div className="App">
      <div className="TODO">
        <h1>My todos ({todos.length})</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="하고 싶은 일을 쓰세요..."
            value={todo}
            onChange={onChange}
          />
          <button>Todo Submit</button>
        </form>
        <hr />
        {todos.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </div>
      <div className="Coin">
        <h1>The Coins!</h1>
        <h2>
            { selectedCoinValue == undefined || selectedCoinValue == "" ?
        ("") : (
            <p>{selectedCoinValue} / {selectedCoinPrice} <Link to={`/coin/${selectedCoinValue}`}>이동</Link></p>
            ) }
        </h2>
        {loading ? (
          <strong>Loading....</strong>
        ) : (
          <div onClick={selectedCoin}>
            {coins.slice(0, 40).map((coin) => (
              <button value={coin.symbol} data-price={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol})
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
