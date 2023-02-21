import React, { useState, useEffect } from 'react';
import SingleColor from './SingleColor';

import Values from 'values.js';

const url =
  'https://api-for-basic-projects.netlify.app/shades-generator/shades_generator_data.json';

function App() {
  const [randomDisplayColor, setRandomDisplayColor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setList(colors);
      setColor('');
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const fetchRandomColors = async () => {
    const response = await fetch(url);
    const response_data = await response.json();
    const displayColor =
      response_data[Math.floor(Math.random() * response_data.length)];
    setList(new Values(displayColor).all(10));
    setRandomDisplayColor(displayColor);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRandomColors();
  }, []);

  if (isLoading) {
    return (
      <>
        <section className="container-vertical">
          <h2>shades generator</h2>
          <p>Click on color to copy the hex code!</p>
        </section>
        <section className="container">
          <form onSubmit={handleSubmit}>
            <input
              className={error ? 'error' : null}
              type="text"
              value={color}
              onChange={(evt) => setColor(evt.target.value)}
              placeholder="color"
            />
            <button className="btn" type="submit">
              generate
            </button>
          </form>
        </section>
        <footer className="footer"></footer>
      </>
    );
  }

  return (
    <>
      <section className="container-vertical">
        <h2>shades generator</h2>
        <p>Click on color to copy the hex code!</p>
      </section>
      <section className="container">
        <form onSubmit={handleSubmit}>
          <input
            className={error ? 'error' : null}
            type="text"
            value={color}
            onChange={(evt) => setColor(evt.target.value)}
            placeholder={randomDisplayColor}
          />
          <button className="btn" type="submit">
            generate
          </button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return <SingleColor key={index} {...color} index={index} />;
        })}
      </section>
      <footer className="footer"></footer>
    </>
  );
}

export default App;
