import { Component, createSignal, Index } from 'solid-js';

type SquareCell = number | null;
type SquareRow = [SquareCell, SquareCell, SquareCell];
export type SquareMatrix = [SquareRow, SquareRow, SquareRow];

type AppProps = {
  squares: SquareMatrix;
};

const App: Component<AppProps> = ({ squares }) => {
  const [squareData, setSquareData] = createSignal(squares);

  const handleOnChange = (
    e: Event & { currentTarget: HTMLFormElement; target: Element }
  ) => {
    e.preventDefault();
    const formValues = new Set(new FormData(e.currentTarget).entries());
    setSquareData(setToSquare(formValues));
  };

  return (
    <form onChange={handleOnChange}>
      <table>
        <Index each={squareData()}>
          {(row) => (
            <tr>
              <Index each={row()}>
                {(cell, i) => (
                  <td>
                    <input
                      name={String(i)}
                      value={cell() ?? ''}
                      type="number"
                    />
                  </td>
                )}
              </Index>
            </tr>
          )}
        </Index>
      </table>
    </form>
  );
};

function setToSquare(set: Set<[string, FormDataEntryValue]>): SquareMatrix {
  const square: SquareMatrix = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  let row = 0;
  const rowLength = 3;

  Array.from(set).forEach(([key, value], index) => {
    square[row][Number(key)] = value ? Number(value) : null;

    if ((index + 1) % rowLength === 0) {
      row++;
    }
  });

  return square;
}

export default App;
