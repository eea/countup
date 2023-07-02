import Countup from '../components/Countup';
import { render, screen } from '@testing-library/react';
describe('Test Countup', () => {
  jest.useFakeTimers();

  render(
    <Countup end={15} duration={10} prefix="test" suffix="jest">
      {' '}
    </Countup>,
  );
  it('check end value', () => {
    setTimeout(() => {
      expect(screen.getByText('test15jest')).toBeInTheDocument();
    }, 15000);
  });
});
