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
  
  private revealed = false;
  private withBomb = false;

  constructor() {
  }

  ngOnInit() {
  }

  reveal() {
    if ( this.gameState != 'P' ) return false;

    this.revealed = true;
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

  reset() {
    this.withBomb = false;
    this.revealed = false;
  }

}
