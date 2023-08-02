import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CodeErrorFirebaseService } from 'src/app/services/code-error-firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

loginForm:FormGroup;
loading:boolean = false;

  constructor(
    private loginService:LoginService, 
    private formBuilder:FormBuilder,
    private router:Router,
    private toastr:ToastrService,
    private codeError:CodeErrorFirebaseService){
      /* Init loginForm en constructo */
      this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
      })
    }
    
    loginUser(){
      const email =  this.loginForm.value.email;
      const password =  this.loginForm.value.password;
      console.log(this.loginForm.value);
      this.loading = true; 
      this.loginService.loginUser(this.loginForm.value)     
      .then((response)=>{
        console.log(response)
        if(response.user.emailVerified){
        this.loading = false;
        this.router.navigate(['/dashboard']);
        this.toastr.success('Logueo Exitoso!!!','Usuario: '+email)
        }else{
          this.loginService.verificarEmail(response.user)
          this.router.navigate(['/verificar-correo']);
        }        
      })
      .catch(error=>{
        this.loading = false;
        console.log(error)
        this.toastr.error(this.codeError.createUserError(error.code), 'Error',{positionClass:'toast-top-right'}); 
      });
    }

    logInGoogle(){
      this.loginService.logInGoogle()
      .then(response =>{
        this.toastr.success('Logueo Exitoso!!!','Login',{positionClass:'toast-top-right'})
        this.router.navigate(['/list-empleados']);
        console.log(response);
      })
      .catch(error =>{
        console.log(error);
      });
      console.log('GOOGLE');
    }

   /*  logOut(){
      this.loginService.logOutUser()
      .then(()=>{
        this.router.navigate(['/login']);
      })
      .catch(error=>{
        console.log(error);
      });
    } */

 /* auth/wrong-password */
}
