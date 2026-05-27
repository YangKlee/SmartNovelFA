import { Routes } from '@angular/router';
import {UserLayout} from "./layout/user-layout/user-layout"
import {AuthLayout} from "./layout/auth-layout/auth-layout"
import path from 'node:path';
import { Login } from './component/auth/login/login';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { AboutUs } from './component/pages/about-us/about-us';
import { Careers } from './component/pages/careers/careers';
import { Terms } from './component/pages/terms/terms';
import { PressRoom } from './component/pages/press-room/press-room';
import { Privacy } from './component/pages/privacy/privacy';
import { HelpCenter } from './component/pages/help-center/help-center';
import { AuthorHub } from './component/pages/author-hub/author-hub';
import { SubmitNovel } from './component/pages/submit-novel/submit-novel';
import { Donate } from './component/pages/donate/donate';
import { Merch } from './component/pages/merch/merch';
export const routes: Routes = [
    // nhánh layout cho đọc giả, tác giả (trừ khi ở dashboard)
    {path:"", 
        component:UserLayout, 
        children:[
      { path: 'about-us', component: AboutUs },
      { path: 'careers', component: Careers },
      { path: 'terms-of-service', component: Terms },
      { path: 'press-room', component: PressRoom },
      { path: 'privacy-policy', component: Privacy },

      // --- Cột Support ---
      { path: 'help-center', component: HelpCenter },
      { path: 'author-hub', component: AuthorHub },
      { path: 'submit-novel', component: SubmitNovel },
      { path: 'donate', component: Donate },
      { path: 'merch', component: Merch },
    ]},
    {path:"auth", redirectTo:"auth/login", pathMatch:"full"},
    // nhánh layout login
    {path:"auth", component:AuthLayout, children:[
        {path:"login", component:Login}
    ]},
    // nhánh layout dashboard, sau này nhớ thêm chặn quyền truy cập ở đây
    {path:"dashboard", component:DashboardLayout, children:[
        
    ]},
];
