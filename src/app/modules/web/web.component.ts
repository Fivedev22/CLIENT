import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  navigateLogin(){
    this.router.navigate(['/auth']);
  }
}
