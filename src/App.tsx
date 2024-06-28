import {IBoard, ICells} from "./types/board.interface.ts";
import BoardCell from "./components/BoardCell.tsx";
import {useState} from "react";
import {TETROMINOES} from "./constants/Board.ts";

function App() {
  const defaultCell: ICells = {
    occupied: false,
    className: ""
  };
  let dropShape;
  // const rows = 20
  // const columns = 10
  const generateShape = (shape: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    return TETROMINOES[shape]
  }
  const buildBoard = ({ rows, columns }: {rows: number, columns: number}): IBoard => {
    const builtRows = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({ ...defaultCell }))
    );

    return {
      rows: builtRows,
      size: { rows, columns }
    };
  };

  const [board, setBoard] = useState<IBoard>(() => buildBoard({ rows: 20, columns: 10 }));

  const [currentTetromino, setCurrentTetromino] = useState({
    x: 3,
    y: 0,
    shapeType: "I",
    tetromino: {
      className: "",
      shape: []
    }
  });

  const start = () => {
    const tetromino = generateShape(currentTetromino.shapeType)
    setCurrentTetromino((prev) => {return {...prev, tetromino}})
    console.log(currentTetromino)
    setBoard(prevBoard => {
      const updatedRows = prevBoard.rows.map(row => row.map(cell => ({ ...cell })));
      for (let i = 0; i < currentTetromino.tetromino.shape.length; i++){
        for (let j = 0; j < currentTetromino.tetromino.shape[i].length; j++){
          if (currentTetromino.tetromino.shape[i][j]) {
            updatedRows[currentTetromino.y + i][currentTetromino.x + j].occupied = true;
            updatedRows[currentTetromino.y + i][currentTetromino.x + j].className = tetromino.className;
          }
        }
      }

      return {
        ...prevBoard,
        rows: updatedRows
      };
    });
    dropShape = setInterval(handleMove, 1000);
  }
  const handleMove = () => {
    if (currentTetromino.y + currentTetromino.tetromino.shape.length === board.size.rows) {
      clearInterval(dropShape);
      return;
    }
    setBoard(prevBoard => {
      const updatedRows = prevBoard.rows.map(row => row.map(cell => ({ ...cell })));
      for (let i = currentTetromino.tetromino.shape.length - 1; i >= 0; i--) {
        for (let j = currentTetromino.tetromino.shape[i].length - 1; j >= 0; j--) {
          if (currentTetromino.tetromino.shape[i][j]) {
            updatedRows[currentTetromino.y + i][currentTetromino.x + j].occupied = false;
            updatedRows[currentTetromino.y + i][currentTetromino.x + j].className = "";
            updatedRows[currentTetromino.y + i + 1][currentTetromino.x + j].occupied = true;
            updatedRows[currentTetromino.y + i + 1][currentTetromino.x + j].className = currentTetromino.tetromino.className;
          }
        }
      }

      return {
        ...prevBoard,
        rows: updatedRows
      };
    });

    setCurrentTetromino(prev => {return {...prev, y: prev.y + 1}})
  }

  return (
    <div>
      <div className="w-[30vw] h-[60vw] mx-auto bg-bgPrimary grid gap-0.5 grid-cols-10 grid-rows-20">
        {board.rows.map((row, rowIndex) => row.map((cell, cellIndex) => (
          <BoardCell key={`${rowIndex}-${cellIndex}`} cell={cell}/>)))}
      </div>
      <button onClick={start} className="p-5 rounded-2xl cursor-pointer bg-green-300">start</button>
      <button onClick={handleMove} className="p-5 rounded-2xl cursor-pointer bg-green-300">move</button>
    </div>

  )
}

export default App
