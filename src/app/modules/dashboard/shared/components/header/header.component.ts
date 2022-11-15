import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    console.log('hello world');
    this.toggleSideBarForMe.emit();
  }

  cerrarSesion(){
    localStorage.clear()
    this.router.navigate(['/auth'])
  }

}
