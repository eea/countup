import React, { useState, useEffect } from "react";

function CountUp({ end, duration, decimals, prefix, suffix, children }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let start = 0;
    let increment = 1;
    if (decimals > 0) {
      increment /= Math.pow(10, decimals);
    }
    if (Math.abs(start - end) < increment) return;

    let totalMilSecDur = parseInt(duration);
    let incrementTime =
      (totalMilSecDur / Math.abs(end * Math.pow(10, decimals || 0))) * 1000;
    let timer = setInterval(() => {
      if (start < end) start += increment;
      else start -= increment;
      setCounter(start.toFixed(decimals));
      if (Math.abs(start - end) < increment) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [duration, end, decimals]);

  return (
    <div>
      {prefix}
      {counter}
      {suffix} {children}
    </div>
  );
}

export default CountUp;
