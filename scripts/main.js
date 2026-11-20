import * as Matrix from './matrix.js';
import * as GameOfLife from './game-of-life.js';

const CellColor = {
    Alive: '#060606',
    Dead: '#f6f6f6'
};
const CELL_SIZE = 5;

let stage = 0;

const process = () => {
    const screen = document.getElementById('screen');
    handleUserEvent();
    const dpr = window.devicePixelRatio || 1;
    const rect = screen.getBoundingClientRect();
    screen.width = rect.width * dpr;
    screen.height = rect.height * dpr;
    const ctx = screen.getContext('2d');
    ctx.scale(dpr, dpr);
    screen.style.width = `${rect.width}px`;
    screen.style.height = `${rect.height}px`
    const height = Math.floor(rect.height / CELL_SIZE);
    const width = Math.floor(rect.width / CELL_SIZE);;
    render(ctx, { height, width });
}

const handleUserEvent = () => {
    document.getElementById('alive-color').oninput = (event) => CellColor.Alive = event.target.value;
    document.getElementById('dead-color').oninput = (event) => CellColor.Dead = event.target.value;
}

const createColorFromCellState = (state) => state === GameOfLife.CellState.Alive ? CellColor.Alive : CellColor.Dead;

const displayMatrix = (matrix, context) => Matrix.map((cell, { x, y }) => drawCellAt(context)(cell)({ x, y }))(matrix)

const drawCellAt = (context) => (cell) => ({ x, y }) => {
    context.lineWidth = 0.05;
    context.fillStyle = createColorFromCellState(cell);
    context.strokeStyle = createColorFromCellState(cell) === CellColor.Alive ? CellColor.Dead : CellColor.Alive;
    context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    context.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
}

const render = (context, size, matrix = GameOfLife.init(size)) => {
    displayMatrix(matrix, context);
    setTimeout(() => render(context, size, GameOfLife.nextState(matrix)), 50);
}

window.addEventListener('load', process)
