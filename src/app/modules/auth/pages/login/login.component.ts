import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IIngresar } from '../../models';
import { AuthService, TokenService } from '../../services/index';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formularioIngreso!: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioIngreso = this.initForm();
    let token =  localStorage.getItem('token');

    token ?  this.router.navigate(['/dashboard'])  : null
  }

  onLogin(): void {
    const datosUsuario = new IIngresar(
      this.formularioIngreso.get('usuario')?.value,
      this.formularioIngreso.get('contrasenia')?.value
    );

    this.authService.ingresar(datosUsuario).subscribe(
      (data) => {
        if (!data) {
          this.Alert('Datos incorrectos', 'warning', '#F25D5D', '#fff' );
        } else {
          this.Alert('Autenticación correcta', 'success', '#75CB8D', '#fff' );
          localStorage.setItem(
            'name',
            this.formularioIngreso.get('usuario')?.value
          );

          setTimeout(() => {
            this.tokenService.setToken(data.mensaje);
            localStorage.setItem('token', data.mensaje);
            this.router.navigate(['/dashboard']);
          }, 1900);
        }
      },
      (error) => {
        this.Alert('Datos incorrectos', 'warning', '#F25D5D', '#fff' );
      }
    );
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      usuario: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      contrasenia: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ],
      ],
    });
  }

   Alert(msg: any, status: any, bgColor: any, color : any ) {
    const Toast = Swal.mixin({
      toast: true,
      width: "30%" ,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background:  bgColor,
      color: color,
    });

    Toast.fire({
      icon: status,
      title: msg,
      iconColor: '#fff',
    });
  }
}
