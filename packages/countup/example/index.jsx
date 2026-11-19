import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { CountUp } from '../src/index';

const Count = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div style={{ marginTop: '120vh' }}>
      <span>
        <CountUp
          end={12}
          isCounting
          duration={30}
          decimalPlaces={2}
          formatter={(value) => {
            let prefix = 'd';
            let suffix = 'd';
            return prefix + value.toFixed(2) + suffix;
          }}
          // updateInterval={1}
          // onUpdate={(value) => console.log(value)}
        >
          {({ value }) => value}
        </CountUp>
      </span>
      <br />
      <button onClick={() => setIsPlaying((prev) => !prev)}>
        Toggle Playing
      </button>
    </div>
  );
};

ReactDOM.render(<Count />, document.querySelector('#root'));
