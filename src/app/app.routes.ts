import { Routes } from '@angular/router';
import { UserLayout } from "./layout/user-layout/user-layout"
import { AuthLayout } from "./layout/auth-layout/auth-layout"
import path from 'node:path';
import { Login } from './component/auth/login/login';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { Register } from './component/auth/register/register';
import { FogotPass } from './component/auth/fogot-pass/fogot-pass';
import { RecoveryPass } from './component/auth/recovery-pass/recovery-pass';
import { Account } from './component/common/account/account';
import { authGuard } from './guards/auth-guard';
import { ModifyInfo } from './component/common/modify-info/modify-info';
import { ChangePassword } from './component/common/change-password/change-password';
import { NovelManager } from './component/author/novel-manager/novel-manager';
import { CreateNovel } from './component/author/create-novel/create-novel';
import { ChapterManagerment } from './component/author/chapter-managerment/chapter-managerment';
import { CreateChapter } from './component/author/create-chapter/create-chapter';
import { ReadNovel } from './component/common/read-novel/read-novel';
import { NovelDetail } from './component/reading-system/novel-detail/novel-detail';
import { Home } from './component/HomePage/home/home';
export const routes: Routes = [
    // nhánh layout cho đọc giả, tác giả (trừ khi ở dashboard)
    {
        path: "", component: UserLayout, children: [
            { path: "", component: Home },
            {
                    {
                  path: "filter",
                  component: FilterPanelComponent
                  }
                path: "account", component: Account, canActivate: [authGuard],
                data: {
                    requiredRoles: ['admin', 'moderator', 'author', 'reader']
                }, children: [
                    { path: "update-info", component: ModifyInfo },
                    { path: "change-password", component: ChangePassword }
                ]

            },
            {
                path: "novel/:novelID",
                children: [
                    { path: "", component: NovelDetail },
                    { path: "chapter/:chapterID", component: ReadNovel }
                ]
            },


        ]
    },
    { path: "auth", redirectTo: "auth/login", pathMatch: "full" },
    // nhánh layout login
    {
        path: "auth", component: AuthLayout, children: [
            { path: "login", component: Login },
            { path: "register", component: Register },
            { path: "forgot-password", component: FogotPass },
            { path: "recovery-pass", component: RecoveryPass }
        ]
    },
    // nhánh layout dashboard, sau này nhớ thêm chặn quyền truy cập ở đây
    {
        path: "dashboard", component: DashboardLayout, children: [
            {
                path: "author", children: [
                    {
                        path: "novel-manager", component: NovelManager, children: [
                            { path: "create-novel", component: CreateNovel },
                            { path: "modify-novel/:idNovel", component: CreateNovel }
                        ]
                    },
                    {
                        path: "chapter-manager/:id", component: ChapterManagerment, children: [
                            { path: 'create-chapter', component: CreateChapter }
                        ]
                    }
                ], canActivate: [authGuard],
                data: {
                    requiredRoles: ['author']
                },
            }
        ]
    },
];
