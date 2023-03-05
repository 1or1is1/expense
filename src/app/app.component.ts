import { Component } from '@angular/core';

interface Navigation {
  text: string;
  link: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navConfig: Navigation[] = [];
  constructor() {}

  ngOnInit() {
    this.navConfig = [
      {
        text: 'Overview',
        link: 'overview',
      },
      {
        text: 'Income',
        link: 'income',
      },
      {
        text: 'Expenses',
        link: 'expenses',
      },
      {
        text: 'Investments',
        link: 'investments',
      },
      {
        text: 'Subscriptions',
        link: 'subscriptions',
      },
    ];
  }
}
