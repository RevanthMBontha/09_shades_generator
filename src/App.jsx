import React, { useState } from 'react';
import SingleColor from './SingleColor';

import Values from 'values.js';

const randomColors = [
  '#FF48C4',
  '#2BD1FC',
  '#F3EA5F',
  '#C04DF9',
  '#FF3F3F',
  '#27187E',
  '#FF8600',
  '#41E2BA',
  '#E86A92',
  '#EE6352',
  '#57A773',
];

function App() {
  const displayColor =
    randomColors[Math.floor(Math.random() * randomColors.length)];
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values(displayColor).all(10));

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

  return (
    <>
      <section className="container">
        <h2>shades generator</h2>
      </section>
      <section className="container">
        <form onSubmit={handleSubmit}>
          <input
            className={error ? 'error' : null}
            type="text"
            value={color}
            onChange={(evt) => setColor(evt.target.value)}
            placeholder={displayColor}
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
