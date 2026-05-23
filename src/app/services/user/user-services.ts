import { Injectable } from '@angular/core';
import { User } from '../../models/user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
    userLogined: User|null = null;

  getInfoUser(): Observable<any>
  {
    
  }  
  
}
