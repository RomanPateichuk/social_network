import { render } from '@testing-library/react';
import { SamuraiJSApp } from './App';

test('renders react component', () => {
  const block = document.createElement('div')
  render(<SamuraiJSApp />, block)

});
