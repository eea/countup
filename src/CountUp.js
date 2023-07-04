import { useCountUp } from '.';

export const CountUp = ({ children, ...props }) => {
  const countUpProps = useCountUp(props);

  return typeof children === 'function'
    ? children(countUpProps)
    : countUpProps.value;
};

CountUp.displayName = 'CountUp';
