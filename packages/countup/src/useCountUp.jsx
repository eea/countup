import { useElapsedTime } from 'use-elapsed-time';

import React, { useEffect } from 'react';

const updateValue = (t, b, c, d) => {
  t /= d;
  t--;
  return c * (t * t * t + 1) + b;
};

const getDuration = (end, duration) => {
  if (typeof end !== 'number') {
    return undefined;
  }

  return typeof duration === 'number' ? duration : 2;
};

const addThousandsSeparator = (value, separator) =>
  value.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

const getDecimalPartLength = (num) =>
  (num.toString().split('.')[1] || '').length;

const getDefaultDecimalPlaces = (start, end) => {
  const startDecimals = getDecimalPartLength(start);
  const endDecimals = getDecimalPartLength(end || 1);

  return startDecimals >= endDecimals ? startDecimals : endDecimals;
};

export const useCountUp = ({
  isCounting = false,
  start = 0,
  end,
  duration,
  decimalPlaces = getDefaultDecimalPlaces(start, end),
  decimalSeparator = '.',
  thousandsSeparator = '',
  onComplete,
  formatter,
  updateInterval,
  useIntersection = true,
  onUpdate,
}) => {
  function useIsInViewport(ref) {
    const [intersected, setIntersected] = React.useState(false);
    const [rendered, setRendered] = React.useState(false);
    useEffect(() => {
      setRendered(true);
    }, []);

    React.useEffect(() => {
      if (intersected) return;
      if (!rendered) return;
      const observer = new IntersectionObserver(([entry]) => {
        setIntersected(intersected === false ? entry.isIntersecting : true);
      });
      let reference = ref.current;
      if (reference) {
        observer.observe(reference);
      }
      return () => {
        observer.disconnect();
      };
    }, [ref, intersected, rendered]);
    return intersected;
  }

  const durationValue = getDuration(end, duration);
  const ref = React.useRef(null);
  const isVisible = useIsInViewport(ref);
  const [started, setStarted] = React.useState(false);

  useEffect(() => {
    if (isVisible === true) setStarted(true);
  }, [isVisible]);

  const getValue = (elapsedTime) => {
    let rawValue;
    if (durationValue === 0 && typeof end === 'number') {
      rawValue = end;
    } else if (typeof end === 'number' && typeof durationValue === 'number') {
      // elapsedTime should always be less or equal to the durationValue
      const time = elapsedTime < durationValue ? elapsedTime : durationValue;
      rawValue = updateValue(time, start, end - start, durationValue);
    } else {
      rawValue = start + elapsedTime;
    }

    // Return value after formatting it
    if (typeof formatter === 'function') {
      return formatter(rawValue);
    }

    if (decimalPlaces === 0) {
      const valueStr = Math.round(rawValue).toString();
      return addThousandsSeparator(valueStr, thousandsSeparator);
    }

    const [int, decimals] = rawValue.toFixed(decimalPlaces).split('.');
    const intFormatted = addThousandsSeparator(int, thousandsSeparator);
    return `${intFormatted}${decimalSeparator}${decimals}`;
  };

  const { elapsedTime, reset } = useElapsedTime({
    isPlaying:
      started === false && useIntersection === true ? false : isCounting,
    duration: durationValue,
    onComplete,
    updateInterval,
    onUpdate:
      typeof onUpdate === 'function'
        ? (currentTime) => onUpdate(getValue(currentTime))
        : undefined,
  });

  return { value: getValue(elapsedTime), reset, ref };
};
