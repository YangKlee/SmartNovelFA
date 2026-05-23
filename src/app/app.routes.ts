import { Routes } from '@angular/router';
import {UserLayout} from "./layout/user-layout/user-layout"
import {AuthLayout} from "./layout/auth-layout/auth-layout"
import path from 'node:path';
import { Login } from './component/auth/login/login';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
export const routes: Routes = [
    // nhánh layout cho đọc giả, tác giả (trừ khi ở dashboard)
    {path:"", component:UserLayout, children:[
        
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
