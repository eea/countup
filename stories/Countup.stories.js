import Countup from '../src/components/Countup';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Example/Countup',
  component: Countup,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    end: 15,
    duration: 12,
    decimals: 1,
    prefix: '',
    suffix: 'EURO',
  },
};
