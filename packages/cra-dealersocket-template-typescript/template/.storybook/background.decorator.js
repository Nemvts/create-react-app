import { withBackgrounds } from '@storybook/addon-backgrounds';

const pattern = `
  repeating-linear-gradient(0deg, transparent, transparent 9px, #CCC 1px, transparent 10px, transparent 1px),
  repeating-linear-gradient(90deg, transparent, transparent 9px, #CCC 1px, transparent 10px),
  rgba(0, 0, 0, 0.05)
`;
export const backgroundDecorator = withBackgrounds([
  { name: 'pattern', value: pattern, default: true },
  { name: 'DS main grey', value: 'rgb(245, 245, 245)' },
  { name: 'white', value: '#FFF' },
  { name: 'dark', value: '#333' },
]);
