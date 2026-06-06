import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule], // Bắt buộc phải có để dùng được routerLink trong HTML
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  
  currentYear: number = new Date().getFullYear(); 
}