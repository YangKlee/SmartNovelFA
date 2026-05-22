import { Routes } from '@angular/router';
import {UserLayout} from "./layout/user-layout/user-layout"
export const routes: Routes = [
    // nhánh layout cho đọc giả, tác giả (trừ khi ở dashboard)
    {path:"", component:UserLayout, children:[
        
    ]}
];
