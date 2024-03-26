"use strict";
exports.__esModule = true;
exports.GameOfLife = void 0;
var cell_ido_1 = require("./cell-ido");
var GameOfLife = /** @class */ (function () {
    function GameOfLife(cellMatrix) {
        this.cellMatrix = cellMatrix;
    }
    GameOfLife.create = function (cellStatusMatrix) {
        var cellMatrix = cellStatusMatrix.map(function (row) {
            return row.map(function (cellStatus) { return cell_ido_1.Cell.create(cellStatus); });
        });
        return new GameOfLife(cellMatrix);
    };
    GameOfLife.prototype.countAliveNeighbors = function (x, y) {
        var aliveNeighbors = 0;
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0)
                    continue;
                aliveNeighbors += this.isCellAlive(x + dx, y + dy) ? 1 : 0;
            }
        }
        return aliveNeighbors;
    };
    GameOfLife.prototype.isCellAlive = function (x, y) {
        var finalIndexRow = this.cellMatrix.length - 1;
        var finalIndexCols = this.cellMatrix[0].length - 1;
        if (x < 0 || y < 0 || x > finalIndexRow || y > finalIndexCols)
            return false;
        return this.cellMatrix[x][y].isAlive();
    };
    GameOfLife.prototype.nextGeneration = function () {
        var _this = this;
        var newCellMatrix = this.cellMatrix.map(function (row, indexRow) {
            return row.map(function (cell, indexColumn) { return cell.regenerate(_this.countAliveNeighbors(indexRow, indexColumn)); });
        });
        return new GameOfLife(newCellMatrix);
    };
    return GameOfLife;
}());
exports.GameOfLife = GameOfLife;
