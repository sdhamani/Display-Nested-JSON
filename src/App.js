import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await fetch("https://api.npoint.io/93bed93a99df4c91044e")
      .then((response) => response.json())
      .then((response) => setData(response));
  }
  return <div className="App">{data.body ? null : <h3>Loading</h3>}</div>;
}

export default App;
