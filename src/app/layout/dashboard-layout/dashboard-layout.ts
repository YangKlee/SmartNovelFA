import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderDashboard } from '../shared/header-dashboard/header-dashboard';
import { MenuDashboard } from '../shared/menu-dashboard/menu-dashboard';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterModule, HeaderDashboard, MenuDashboard],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
}
