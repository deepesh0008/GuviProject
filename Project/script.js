// script.js
// Initialize 9x9 grid with input elements
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("sudoku-grid");
    for (let i = 0; i < 81; i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      grid.appendChild(input);
    }
  });
  
  // Function to get the grid values as a 2D array
  function getGridValues() {
    const grid = Array.from(document.querySelectorAll("#sudoku-grid input"));
    const values = [];
    for (let i = 0; i < 9; i++) {
      values[i] = grid.slice(i * 9, i * 9 + 9).map(input => {
        const value = parseInt(input.value);
        return isNaN(value) ? 0 : value;
      });
    }
    return values;
  }
  
  // Function to set grid values from a 2D array
  function setGridValues(values) {
    const grid = Array.from(document.querySelectorAll("#sudoku-grid input"));
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        grid[i * 9 + j].value = values[i][j] !== 0 ? values[i][j] : "";
      }
    }
  }
  
  // Check if a number is valid in the given position
  function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + i % 3;
      if (board[boxRow][boxCol] === num) return false;
    }
    return true;
  }
  
  // Backtracking function to solve the Sudoku puzzle
  function solve(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  // Main function to trigger solving
  function solveSudoku() {
    const grid = getGridValues();
    if (solve(grid)) {
      setGridValues(grid);
      alert("Solved!");
    } else {
      alert("No solution exists for the given puzzle.");
    }
  }