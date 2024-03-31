# Mars Rover Kata

This project implements the Mars Rover Kata, a classic problem used to practice algorithmic thinking and test-driven development (TDD) techniques. The solution is divided into three main artifacts:

## Rover

The Rover class represents the exploration vehicle on Mars. It is equipped with a navigation system (Navigator) that enables it to traverse the planet's surface, which is represented by the MartianGrid. The Rover can execute commands to move around the grid.

## Navigator

The Navigator class serves as the navigation system for the Rover. It maintains the position coordinates and orientation of the Rover as it moves across the Martian surface. The Navigator ensures that the Rover stays within the bounds of the grid and handles commands for movement.

## MartianGrid

The MartianGrid class defines the two-dimensional grid representing the Martian surface. It is characterized by latitude and longitude coordinates. The grid provides the spatial context for the Rover's movements and ensures that the Rover does not venture outside the boundaries of the planet.

## Design Approach

Each artifact is implemented as a separate class, following the Factory Pattern method. This design allows for modularity and separation of concerns, making the codebase easier to understand, maintain, and test. The solution has been developed using Test-Driven Development (TDD), ensuring that each component is thoroughly tested to meet the requirements of the Kata.

## Usage

To use the Mars Rover Kata solution, instantiate the Rover, Navigator, and MartianGrid classes as needed, providing the necessary parameters. Execute commands on the Rover to navigate it across the Martian surface, while the Navigator and MartianGrid handle the logic for movement and boundary constraints.

Feel free to explore the codebase, run the tests, and experiment with different scenarios to deepen your understanding of the Mars Rover problem and its solution. Happy exploring!

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Instructions

1. Explore the src directory to understand the structure of the project and the implementation of the Rover, Navigator, and MartianGrid classes (`/src/core`), types(`/src/types`) and tests(`/src/tests`).

2. Modify or extend the classes as needed to suit your requirements.

3. Run the tests to ensure that everything is functioning correctly: `npm test`
