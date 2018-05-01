import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-home',
  templateUrl: './adminhome.component.html'
})
export class AdminHomeComponent implements OnInit {
  title: string = 'Admin Section';
  email: string;
  // Use 'constructor's only for dependency injection
  constructor() { }

  // Here you want to handle anything with @Input()'s @Output()'s
  // Data retrieval / etc - this is when the Component is 'ready' and wired up
  ngOnInit() { }
}
