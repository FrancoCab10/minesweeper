import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() cellId: number;
  @Output() revearResult = new EventEmitter();

  private revealed = false;
  private withBomb = false;

  constructor() { }

  ngOnInit() {
  }

  reveal() {
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

}
