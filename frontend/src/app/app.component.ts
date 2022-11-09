import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Structure', url: '/structure', icon: 'storefront' },
    { title: 'Exams', url: '/exams', icon: 'today' },
  ];
  constructor() {}
}
