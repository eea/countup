import Countup from '../components/Countup';
import { render } from '@testing-library/react';

describe('Test Countup', () => {
  const countup = render(
    <Countup end={15} duration={10} prefix="" suffix="">
      {' '}
    </Countup>,
  );

  setTimeout(() => {
    test('Countup end value', () => {
      expect(countup).toHaveTextContent(15);
    });
  }, 1500);
});
