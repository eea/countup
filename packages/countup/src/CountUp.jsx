import { useCountUp } from '.';
import React from 'react';

export const CountUp = ({ children, as: Element = 'div', ...props }) => {
  const countUpProps = useCountUp(props);
  return (
    <Element ref={countUpProps.ref}>
      {typeof children === 'function'
        ? children(countUpProps)
        : countUpProps.value}
    </Element>
  );
};

CountUp.displayName = 'CountUp';
