import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISolicitarRestablecerContrasenia } from '../../models';
import { AuthService } from '../../services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  public formularioIngreso!: FormGroup;
  usuario!: ISolicitarRestablecerContrasenia;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.formularioIngreso = this.initForm();
    this.formularioIngreso = this.fb.group({
      correo: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
    });
  }

  sendEmail() {
    this.usuario = new ISolicitarRestablecerContrasenia(
      this.formularioIngreso.get('correo')?.value
    );

    console.log(this.usuario);
    let emailUser: any = this.usuario.email;
    console.log(emailUser);

    this.authService.solicitarRestablecerContrasenia(this.usuario).subscribe(
      (data) => {
        if (!data) {
          this.Alert('Correo incorrecto', 'warning', '#F25D5D', '#fff');
          alert('ups...');
        } else {
          this.Alert('Te enviamos un correo', 'success', '#75CB8D', '#fff');

          console.log(data.token);
          localStorage.setItem('tokenpass', data.token);
        }
      },
      (error) => {
        this.Alert('Correo incorrecto', 'warning', '#F25D5D', '#fff');
      }
    );
  }

  Alert(msg: any, status: any, bgColor: any, color: any) {
    const Toast = Swal.mixin({
      toast: true,
      width: '30%',
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: bgColor,
      color: color,
    });

    Toast.fire({
      icon: status,
      title: msg,
      iconColor: '#fff',
    });
  }
}
