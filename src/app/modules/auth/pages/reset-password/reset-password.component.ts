import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRestablecerContrasenia } from '../../models';
import { AuthService } from '../../services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  public formularioIngreso!: FormGroup;
  usuario!: IRestablecerContrasenia;
  contraseña!: string;
  confirmcontraseña!: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioIngreso = this.fb.group({
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmcontraseña: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ChangePassword() {
    let token: any = localStorage.getItem('tokenpass');

    const clave = this.formularioIngreso.get('contraseña')?.value;
    const clave2 = this.formularioIngreso.get('confirmcontraseña')?.value;
    console.log(clave, clave2);

    if (clave != clave2) {
      console.log('la contraseña no coinciden');
      AlertError()
    } else {
      this.usuario = new IRestablecerContrasenia(
        token,
        this.formularioIngreso.get('contraseña')?.value
      );

      console.log(this.usuario);
      this.authService.restablecerContrasenia(this.usuario).subscribe(
        (data) => {
          AlertSuccess()
          console.log(data);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
        }
      );
    }


    function AlertError() {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: '#F25D5D',
        color: '#FFF',
        timerProgressBar: true,
      });
  
      Toast.fire({
        icon: 'warning',
        title: 'Las contraseñas no coinciden',
        iconColor: '#FFF',
      });
    }

    function AlertSuccess() {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: '#75CB8D',
        color: '#FFF',
      });
  
      Toast.fire({
        icon: 'success',
        title: `Contraseña cambiada correctamente`,
        iconColor: '#fff',
      });
    }
  }
}
