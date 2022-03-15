/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App, { SquareMatrix } from './App';

const demoSquares: SquareMatrix = [
  [null, null, null],
  [1, null, null],
  [null, 1, null],
];

render(
  () => <App squares={demoSquares} />,
  document.getElementById('root') as HTMLElement
);
