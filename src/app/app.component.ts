import { Component, Injectable } from '@angular/core';

interface SideNav {
  text: string;
  link: string;
  matIcon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  sideNavConfig: SideNav[] = [];
  constructor() {}

  ngOnInit() {
    this.sideNavConfig = [
      {
        text: 'Overview',
        link: 'overview',
        matIcon: '360',
      },
      {
        text: 'Income',
        link: 'income',
        matIcon: 'attach_money',
      },
      {
        text: 'Expenses',
        link: 'expenses',
        matIcon: 'shopping_cart',
      },
      {
        text: 'Investments',
        link: 'investments',
        matIcon: 'loyalty',
      },
      {
        text: 'Subscriptions',
        link: 'subscriptions',
        matIcon: 'subscriptions',
      },
    ];
  }
}
