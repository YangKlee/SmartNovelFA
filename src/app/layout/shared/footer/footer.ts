import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import{MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, MatIconModule], // Bắt buộc phải có để dùng được routerLink trong HTML
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  
  currentYear: number = new Date().getFullYear(); 
}