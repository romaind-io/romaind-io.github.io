export const at = ({ x, y }) => (matrix) => matrix.at(y)?.at(x);

export const createEmptyMatrix = (height, width) => new Array(height).fill(new Array(width).fill(undefined));

export const getMatrixSize = (matrix) => ({ height: matrix.length, width: matrix.length === 0 ? 0 : matrix.at(0).length });

export const map = (f) => (matrix) => matrix.map((row, y) => row.map((cell, x) => f(cell, { x, y })));