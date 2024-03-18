import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState(0);
  const [cost, setCost] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setCost(67072.6635261777);
      });
  }, []);

  const inputHandler = (event) => setValue(event.target.value);
  const setChange = (event) => setCost(event.target.value);
  return(
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={setChange}>
          {coins.map((coin, index) => (
            <option key={index} value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
            </option>
          ))}
        </select>
      )}
      <br/>
      <p>I have <input dir="rtl" onChange={inputHandler}/>$</p>
      <h2>You can exchange {value == 0 ? "0": Math.floor(value/cost)} Coins!</h2>

    </div>
  );
  
}

export default App;
