import React, { useEffect, useState } from "react";
import "./App.css";
import {user} from './User'

function App() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState([]);
  const [err, setErr] = useState("");
  const [inputValue, setInputValue] = useState("spring");
  const [includeForks, setIncludeForks] = useState(false);

  useEffect(() => {
    // const url = `https://api.github.com/users/${inputValue}/repos`;
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((result) => setData(result))
    //   .catch((error) => setErr("Error fetching data"));
      //setData(user)
  }, [inputValue]);
  


  const filterData = username.filter(
    (item) => (includeForks ? true : !item.fork)
  );
  
  const sortData = filterData.sort((a, b) => b.size - a.size);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleCheckboxChange = (e) => {
    setIncludeForks(e.target.checked);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://api.github.com/users/${inputValue}/repos`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((error) => setErr("Error fetching data"));
    
  };
  useEffect(() => {
    if (data.length === 0) {
      setErr("Not Found");
    } else if (data[0]?.message) {
      setErr("No Repo Found");
    } else {
      if(inputValue>''){
        setUsername(
          data.map((item) => ({
            fname: item?.name,
            language: item?.language,
            description: item?.description,
            fork: item?.fork,
            size: item?.size
          }))
        )
      }
     
      }
  }, [data]);

  return (
    <div className="App">
      <div className="input">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Github username: </label>
          <input
            id="username"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <label htmlFor="fork">Include forks: </label>
          <input
            id="fork"
            type="checkbox"
            checked={includeForks}
            onChange={handleCheckboxChange}
          />
          <button type="submit" disabled={!inputValue} onSubmit={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
      <section>
        {sortData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th className="col">name</th>
                <th className="col">Language</th>
                <th className="col">Description</th>
                <th className="col">Size</th>
              </tr>
            </thead>
            <tbody>
              {sortData.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="col">{item.fname}</td>
                    <td className="col">{item.language}</td>
                    <td className="col">{item.description}</td>
                    <td className="col">{item.size}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>{err}</div>
        )}
      </section>
    </div>
  );
}

export default App;
