import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users:User[]=[]
  currUser:User|null=null

  register(user:User){
    this.users.push(user)
  }

  login(email:string,password:string){
    const user:User|undefined = this.users.find((user:User)=>{
      if(user.email==email && user.password==password){
        this.currUser=user
        return true
      }
      else{
        return false
      }
    })
    
    return !!user
  }

  getAllUsers(){
    return this.users
  }

  getCurrentUser(){
    return this.currUser
  }

  logout(){
    this.currUser=null
  }
  
}
