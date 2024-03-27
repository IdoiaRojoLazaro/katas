# Bowling Game Kata (TypeScript)

## Description

This project is a TypeScript implementation of the "Bowling Game Kata", demonstrating how to model and calculate scores in a standard game of bowling.

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
import { BowlingGame } from './BowlingGame';

const game = new BowlingGame();
// Example usage
game.roll(10); // strike
game.roll(4);
game.roll(3);
// Add more rolls as needed
console.log(`Score: ${game.score()}`);
```

### Contributions

If you find a bug or have a suggestion, please open an issue or submit a pull request.
