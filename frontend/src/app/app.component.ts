import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Structure', url: '/structure', icon: 'store-front' },
    { title: 'Exams', url: '/exams', icon: 'today' },
  ];
  constructor() {}
}
