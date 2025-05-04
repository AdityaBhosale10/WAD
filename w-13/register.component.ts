import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms"
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService:AuthService,private router:Router){}
  user :User = {name:"",email:"",password:""}

  register(){
    this.authService.register(this.user)
    this.router.navigate(["/"])
  }
}
