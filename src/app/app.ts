import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{ReactiveFormsModule,FormGroup,FormBuilder,Validators} from '@angular/forms';
import {UserManagerComponent} from './layout/admin/user-manager/user-manager';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, UserManagerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SmartNovelFA');
}
