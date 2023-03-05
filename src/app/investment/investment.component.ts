import { Component } from '@angular/core';

@Component({
  selector: 'investment',
  templateUrl: './investment.component.html',
  styles: [``],
})
export class InvestmentComponent {
  constructor() {}

  saveFormToDb(formData: any) {
    console.log('THE FROM DATA : ', formData);
  }
}
