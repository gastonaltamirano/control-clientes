import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password : string = '';

  // errorCodes : Object = {
  //   invalidemail :  'El email no corresponde a ningún usuario',
  //   userdisabled : 'El email de este usuario ha sido desactivado',
  //   usernotfound : 'El email no corresponde a ningún usuario',
  //   wrongpassword : 'La contraseña es incorrecta'
  // }

  constructor(
    private router : Router,
    private flashMessages : FlashMessagesService,
    private loginService : LoginService
  ) { };

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(['/'])
      }
    })
  };

  login () {
    this.loginService.login(this.email, this.password)
      .then(res => {
        this.router.navigate(['/']);
      }).catch(err => {
        this.flashMessages.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
  };

}
