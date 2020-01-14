import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  canActivate() {
    // return this.authService.user$.pipe(
    //   map((user)=> {
    //     this.userService.get(user.uid)
    //   })
    // )

    return true;
  }
}
