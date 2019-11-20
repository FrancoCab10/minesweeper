import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() cellId: number;
  @Input() gameState: string;
  
  @Output() revearResult = new EventEmitter();
  
   revealed = false;
   withBomb = false;
   adjacentBombs = 0;
   colorClass = '';
   mark = Marks.NONE;

  constructor() {
  }

  ngOnInit() {
  }

  reveal() {
    if ( this.gameState != 'P' ) return false;

    this.revealed = true;
    this.mark = Marks.NONE;

    if( this.withBomb ) {
      this.revearResult.emit('L');
    } else {
      this.revearResult.emit('C');
    }
  }

  hasBomb() {
    return this.withBomb;
  }

  setBomb() {
    return this.withBomb = true;
  }

  setMark(evt) {
    evt.preventDefault();

    if (this.gameState != 'P') return false;

    switch (this.mark) {
      case Marks.NONE:
        this.mark = Marks.FLAG;
        break;
      case Marks.FLAG:
        this.mark = Marks.QUESTION;
        break;
      case Marks.QUESTION:
        this.mark = Marks.NONE;
        break;
    }
  }

  setAdjacentBombs(adjacentBombs) {    
    this.adjacentBombs = adjacentBombs;
    if (adjacentBombs == 1) this.colorClass = 'green-text';
    else if (adjacentBombs == 2) this.colorClass = 'yellow-text';
    else if (adjacentBombs >= 3) this.colorClass = 'red-text';
  }

  reset() {
    this.withBomb = false;
    this.revealed = false;
    this.mark = Marks.NONE;
  }

}

enum Marks {
  NONE = 0,
  FLAG = 1,
  QUESTION = 2
}

