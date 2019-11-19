import { Component, OnInit } from '@angular/core';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private grid: CellComponent[][] = [];

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

}
