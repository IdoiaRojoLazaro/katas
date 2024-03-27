# Conway's Game of Life Kata (TypeScript)

## Description

This project is a TypeScript implementation of the "Conway's Game of Life", It includes `Cell.ts`, `GameOfLife.ts`, and test files to cover the implementation.

## Introduction

Conway's Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.

## Implementation Details

The implementation consists of the following files:

- `Cell.ts`: Contains the definition of the `Cell` class representing a single cell in the game.
- `GameOfLife.ts`: Contains the `GameOfLife` class which manages the game grid and the rules for updating the cells.
- Test files: Includes tests for `Cell.ts` and `GameOfLife.ts` to ensure proper functionality.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (included with Node.js)

### Installation

Clone this repository and run `npm install` to install the necessary dependencies.

```bash
git clone <repository-url>
cd <repository-name>
npm install
```

### Running Tests

To run the tests and ensure the code functions as expected, use:

```
npm test
```

### Usage

```
import { Cell } from './Cell';
import { GameOfLife } from './GameOfLife';

// Create a new instance of the GameOfLife class
const game = new GameOfLife();
```

### Contributions

Contributions are welcome! If you'd like to contribute to this project, please fork the repository, make your changes, and submit a pull request. Ensure that any changes are covered by tests and follow the existing code style.