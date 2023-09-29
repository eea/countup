# EEA countup

[![Releases](https://img.shields.io/github/v/release/eea/countup)](https://github.com/eea/countup/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fcountup%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/countup/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=countup-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=countup-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=countup-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=countup-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=countup-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=countup-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=countup-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=countup-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fcountup%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/countup/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=countup-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=countup-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=countup-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=countup-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=countup-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=countup-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=countup-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=countup-develop)

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

## Release

See [RELEASE.md](https://github.com/eea/countup/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/countup/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/countup/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
