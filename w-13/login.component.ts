import { Component } from '@angular/core';
import{FormsModule} from "@angular/forms"
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Approuter } from '../../app.routes';

@Component({
  selector: 'app-login',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email=""
  password=""

  constructor(private authService:AuthService,private router:Router){}

  login(){
    if(this.authService.login(this.email,this.password)){
      this.router.navigate(['/profile'])
    }
    else{
      alert("Wrong user credentials")
    }
  }
}
