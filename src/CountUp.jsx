import { useCountUp } from '.';
import React from 'react';

export const CountUp = ({ children, ...props }) => {
  const countUpProps = useCountUp(props);
  return (
    <div ref={countUpProps.ref}>
      {typeof children === 'function'
        ? children(countUpProps)
        : countUpProps.value}
    </div>
  );
};

CountUp.displayName = 'CountUp';
