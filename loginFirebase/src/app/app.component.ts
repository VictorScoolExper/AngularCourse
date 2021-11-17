import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario={
    email: '',
    password: ''
  }

  constructor(private authService: AuthService){

  }

  Ingresar(){
    console.log(this.usuario);
    const {email, password} = this.usuario;
    this.authService.login(email, password)
    .then(res=> {
      console.log("ingreso con correo y pass: ", res)
    });
  }

  Registrar(){
    const {email, password} = this.usuario;
    this.authService.register(email, password)
    .then(res=> {
      console.log("ingreso con correo y pass: ", res)
    });
  }

  IngresarConGoogle(){
    this.authService.loginWithGoogle()
    .then(res=> {
      console.log("se registro: ", res)
    });
  }

  obtenerUsuarioLogeado(){
    this.authService.getUserLogged().subscribe(res=>{
      console.log(res?.email);
    })
  }

  logout(){
    this.authService.logout();
  }

}
