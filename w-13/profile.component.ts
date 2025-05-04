import { Component, OnInit } from '@angular/core';
import{FormsModule} from "@angular/forms"
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
//import { Approuter } from '../../app.routes';
import { User } from '../../model/user';



@Component({
  selector: 'app-profile',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user :User|null = null

  constructor(private authService:AuthService,private router:Router){}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser()
    if(!this.user){
      this.router.navigate(["/"])
    }
  }

  logout(){
    this.authService.logout()
    this.router.navigate(["/"])
  }
}
