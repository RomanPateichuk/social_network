import ReactDOM from 'react-dom';
import { SamuraiJSApp } from './App';

test('renders react component', () => {
  const block = document.createElement('div')
  ReactDOM.render(<SamuraiJSApp />, block)
  ReactDOM.unmountComponentAtNode(block)
});
