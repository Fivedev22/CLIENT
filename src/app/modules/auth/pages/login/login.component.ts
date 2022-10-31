import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IIngresar } from '../../models';
import { AuthService, TokenService } from '../../services/index'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  public formularioIngreso!: FormGroup;

  constructor(
     private authService: AuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formularioIngreso = this.initForm();
  }


  onLogin(): void {
     const datosUsuario = new IIngresar(
       this.formularioIngreso.get('usuario')?.value,
       this.formularioIngreso.get('contrasenia')?.value
     );


     this.authService.ingresar(datosUsuario)
       .subscribe((data) => {

        console.log(data)

         if (!data) {

           alert('error....')
         }
         else {
            //opcional
           localStorage.setItem('name', this.formularioIngreso.get('usuario')?.value)

         /*   setTimeout(() => {
              this.tokenService.setToken(data);
             this.router.navigate(['/dashboard']);
           }, 1900)
 */

         }

       })
   }



   initForm(): FormGroup {
     return this.formBuilder.group(
       {
         usuario: [
           '',
           [
             Validators.required,
             Validators.minLength(10),
             Validators.maxLength(30)
           ]
         ],
         contrasenia: [
           '',
           [
             Validators.required,
             Validators.minLength(10),
             Validators.maxLength(100)
           ]
         ]
       }
     )
   }

}
