import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemName = 'notes';

  constructor() {
    
  }

  changeItem(){
    this.itemName = 'Changes happend'
  }
}
