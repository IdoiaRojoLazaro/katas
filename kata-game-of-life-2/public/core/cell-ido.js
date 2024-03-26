"use strict";
exports.__esModule = true;
exports.Cell = void 0;
var types_1 = require("../types");
var Cell = /** @class */ (function () {
    function Cell(status) {
        this.status = status;
    }
    Cell.create = function (status) {
        return new Cell(status);
    };
    Cell.prototype.isAlive = function () {
        return this.status === types_1.CellStatus.Alive;
    };
    Cell.prototype.statusForDeadCell = function (numberOfNeighbors) {
        var isFertilePopulation = numberOfNeighbors === 3;
        return isFertilePopulation ? types_1.CellStatus.Alive : types_1.CellStatus.Dead;
    };
    Cell.prototype.statusForAliveCell = function (numberOfNeighbors) {
        var isStablePopulation = numberOfNeighbors === 2 || numberOfNeighbors === 3;
        return isStablePopulation ? types_1.CellStatus.Alive : types_1.CellStatus.Dead;
    };
    Cell.prototype.regenerate = function (numberOfNeighbors) {
        var nextStatus = this.status === types_1.CellStatus.Alive
            ? this.statusForAliveCell(numberOfNeighbors)
            : this.statusForDeadCell(numberOfNeighbors);
        return new Cell(nextStatus);
    };
    return Cell;
}());
exports.Cell = Cell;
