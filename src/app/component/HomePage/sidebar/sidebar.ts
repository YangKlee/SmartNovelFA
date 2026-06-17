import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() items: any[] = [];
  @Input() type: 'author' | 'novel-update' | 'novel-recommend' = 'author';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  }
}
