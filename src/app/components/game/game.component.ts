import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {

  @ViewChildren(CellComponent) cells: QueryList<CellComponent>;
  @ViewChild(TimerComponent, { static: false }) timer: TimerComponent;

   state = GameState.STAND_BY;
   grid: number[][] = [];
   revealedCells: number[] = [];
   maxBombs = 15;

  constructor() { }

  ngOnInit() {
    // Initializing grid
    let cellId = 1;
    for (let row = 0; row < 10; row++) {
      
      const aux = [];
      for (let col = 0; col < 10; col++) {
        aux[col] = cellId;
        cellId++;
      }
      
      this.grid[row] = aux;
    }
  }

  restartGame() {
    this.state = GameState.PLAYING;
    this.cells.forEach(cell => cell.reset());
    this.putBombs();
    this.timer.startTimer();
  }

  stopGame() {
    this.state = GameState.LOST;
    this.timer.stopTimer();
    console.log('LOST');
    return;
  }

  cellClick(result: string, cellId: number, rowPos: number, colPos: number) {
    
    if(result == 'L') {
      this.state = GameState.LOST;
      this.timer.stopTimer();
      console.log('LOST');      
      return;
    }
    
    this.revealedCells.push(cellId);
    
    if (this.revealedCells.length == 100 - this.maxBombs) {
      this.state = GameState.WON;
      this.timer.stopTimer();
      console.log('WON');      
      return;
    }

    const g = this.grid;

    const adjacentCells = [];

    // topLeft 
    if (rowPos > 0 && colPos > 0)
      adjacentCells.push(g[rowPos - 1][colPos - 1]);

    // topCenter
    if (rowPos > 0)
      adjacentCells.push(g[rowPos - 1][colPos]);

    // topRight 
    if (rowPos > 0 && colPos < 9)
      adjacentCells.push(g[rowPos - 1][colPos + 1]);

    // midLeft 
    if(colPos > 0)
      adjacentCells.push(g[rowPos][colPos - 1]);

    // midRight 
    if(colPos < 9)
      adjacentCells.push(g[rowPos][colPos + 1]);

    // bottomLeft 
    if (rowPos < 9 && colPos > 0)
      adjacentCells.push(g[rowPos + 1][colPos - 1]);

    // bottomCenter
    if (rowPos < 9)
      adjacentCells.push(g[rowPos + 1][colPos]);

    // bottomRight 
    if (rowPos < 9 && colPos < 9)
      adjacentCells.push(g[rowPos + 1][colPos + 1]);
    

    let adjacentBombs = 0;
    adjacentCells.forEach(adjacentCellId => {

      const cell = this.cells.find(item => item.cellId == adjacentCellId);
      if (cell.hasBomb()) {
        adjacentBombs++;
      }

    });

    const actualCell = this.cells.find(item => item.cellId == cellId);
    actualCell.setAdjacentBombs(adjacentBombs);

    adjacentCells.forEach(adjacentCellId => {

      if (!this.revealedCells.includes(adjacentCellId) && adjacentBombs == 0) {
        const cell = this.cells.find(item => item.cellId == adjacentCellId);
        cell.reveal();
      }

    });
  }

  putBombs() {

    let bomb = 0;
    while (bomb < this.maxBombs) {

      let cellId = Math.ceil(Math.random() * 100);
      if (cellId == 0) cellId = 1;

      const cell = this.cells.find(item => item.cellId == cellId);

      if(!cell.hasBomb()) {
        cell.setBomb();      
        bomb++;
      }

    }

  }

}

enum GameState {
  STAND_BY = 'S',
  PLAYING = 'P',
  WON = 'W',
  LOST = 'L'
}
