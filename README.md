# EEA countup

This is a countup react library with the visibility observer already in it
Also it has support for Volto addons pipeline, it is basically as an empty addon with tests

## Installation

```
yarn add @eeacms/countup
```

## Props

The component and the hook accept the same props. They are fully interchangeable.

| Prop Name              | Type     | Default | Description                                                                                                                                                                              |
| ---------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **isCounting**         | boolean  | false   | Play and pause counting animation                                                                                                                                                        |
| **start**              | number   | 0       | Initial value                                                                                                                                                                            |
| **end**                | number   | -       | Target value                                                                                                                                                                             |
| **duration**           | number   | -       | Animation duration in seconds. Defaults to 2 seconds if `end` is set                                                                                                                     |
| **decimalPlaces**      | number   | -       | Number of decimal places after the decimal separator.                                                                                                                                    |
| **decimalSeparator**   | string   | -       | Decimal separator character                                                                                                                                                              |
| **thousandsSeparator** | string   | -       | Thousands separator character                                                                                                                                                            |
| **formatter**          | function | -       | _Type: (value: number) => number \| string \| node_ <br> A function that formats the output value. It has the highest priority so all other formatting options are ignored               |
| **updateInterval**     | number   | 0       | Update interval in seconds. Determines how often the animated value will change. When set to 0 the value will update on each key frame                                                   |
| **children**           | function | -       | _Type: ({ value: number, reset: () => void }) => number \| string \| node_ <br> CountUp component - children prop                                                                        |
| **onComplete**         | function | -       | _Type: () => void \| {shouldRepeat: boolean, delay: number}_ <br> On complete handler. Repeat animation by returning an object with `shouldRepeat` equals `true` and `delay` in seconds. |
| **onUpdate**           | function | -       | _Type: (currentValue: number \| string \| node) => void_ <br> On value update event handler                                                                                              |

## Return values

The hook returns the current count up value and reset method to reset the animation.

```jsx
import { useCountUp } from 'use-count-up';

const { value, reset } = useCountUp({ isCounting: true });
```
