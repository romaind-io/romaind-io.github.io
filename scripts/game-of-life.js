import * as Matrix from './matrix.js';

export const CellState = {
    Alive: 'alive',
    Dead: 'dead'
};

const createCellState = () => Math.random() < 0.1 ? CellState.Alive : CellState.Dead;

export const init = ({ height, width }) => Matrix.map(createCellState)(Matrix.createEmptyMatrix(height, width))

const getLowerNeighbors = ({ x, y }) => (matrix) => matrix.at(y + 1)?.slice(x - 1, x + 2) ?? [];

const getSideNeighbors = ({ x, y }) => (matrix) => [matrix.at(y)?.at(x - 1), matrix.at(y)?.at(x + 1)]

const getUpperNeighbors = ({ x, y }) => (matrix) => matrix.at(y - 1)?.slice(x - 1, x + 2) ?? [];

const getNeighbors = (coords) => (matrix) => [...getLowerNeighbors(coords)(matrix), ...getSideNeighbors(coords)(matrix), ...getUpperNeighbors(coords)(matrix)];

const getAliveNeighborsAt = (coords) => (matrix) => getNeighbors(coords)(matrix).reduce((acc, cell) => cell === CellState.Alive ? acc + 1 : acc, 0);

const nextCellStateAt = (coords) => (matrix) => {
    const alive = getAliveNeighborsAt(coords)(matrix);
    return alive === 2 ? Matrix.at(coords)(matrix) : alive === 3 ? CellState.Alive : CellState.Dead; 
}

export const nextState = (matrix) => Matrix.map((_, coords) => nextCellStateAt(coords)(matrix))(matrix);