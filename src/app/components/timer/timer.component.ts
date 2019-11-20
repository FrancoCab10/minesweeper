import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

   mins = '00';
   secs = '00';
   minsTimer = null;
   secsTimer = null;

  constructor() { }

  ngOnInit() {


  }

  startTimer() {
    this.stopTimer();
    this.mins = '00';
    this.secs = '00';
    this.addSecs();
    this.addMins();
  }

  stopTimer() {
    if (this.secsTimer != null) {
      clearTimeout(this.secsTimer);
      clearTimeout(this.minsTimer);
      this.secsTimer = null;
      this.minsTimer = null;
    }
  }

  addSecs() {
    if(+this.secs == 59)
      this.secs = '00';
    else 
      this.secs = ('' + Math.round((+this.secs + 1))).padStart(2, '0');

    this.secsTimer = setTimeout(() => this.addSecs(), 1000);
  }

  addMins() {
    this.minsTimer = setTimeout(() => {
      if (+this.mins == 59)
        this.mins = '00';
      else
        this.mins = ('' + Math.round((+this.mins + 1))).padStart(2, '0');

      this.addMins();
    }, 60000);
  }

}
