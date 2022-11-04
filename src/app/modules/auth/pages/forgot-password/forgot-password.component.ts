import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISolicitarRestablecerContrasenia } from '../../models';
import { AuthService } from '../../services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public formularioIngreso!: FormGroup;
  usuario!: ISolicitarRestablecerContrasenia;

  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    // this.formularioIngreso = this.initForm();
    this.formularioIngreso = this.fb.group({
      correo: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
    });
  }

  sendEmail(){
    this.usuario = new ISolicitarRestablecerContrasenia(this.formularioIngreso.get('correo')?.value);

    console.log(this.usuario);
    let emailUser: any = this.usuario.correo
    console.log(emailUser);
   
 

  
  this.authService.solicitarRestablecerContrasenia(this.usuario).subscribe( 
    data => {
   
      if(!data){
        this.AlertError();
        alert('ups...')
      }else{
        this.AlertSuccess();
        console.log(data.msg);
        localStorage.setItem('tokenpass', data.msg)
      }
    
     
    },
    error => {
      this.AlertError();
     
    }
    
    )

  }

  AlertError() {
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
      title: 'Email incorrecto',
      iconColor: '#FFF',
    });
  }

  AlertSuccess() {
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
      title: `Te enviamos un correo`,
      iconColor: '#fff',
    });
  }
  // initForm(): FormGroup {
  //   return this.formBuilder.group(
  //     {
  //       correo: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.email,
  //           Validators.minLength(5),
  //           Validators.maxLength(30)
  //         ]
  //       ],
  //     }
  //   )
  // }

}
