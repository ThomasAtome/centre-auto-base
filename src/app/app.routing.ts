import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {HomeViewComponent} from "./views/home-view/home-view.component";
import {SignBaseViewComponent} from "./views/sign-base-view/sign-base-view.component";
import {DashboardViewComponent} from "./views/dashboard-view/dashboard-view.component";
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {BrandsViewComponent} from "./views/brands-view/brands-view.component";
import {BrandCreatorViewComponent} from "./views/brand-creator-view/brand-creator-view.component";
import {BrandEditorViewComponent} from "./views/brand-editor-view/brand-editor-view.component";
import {ModelsViewComponent} from "./views/models-view/models-view.component";
import {ModelCreatorViewComponent} from "./views/model-creator-view/model-creator-view.component";
import {ModelEditorViewComponent} from "./views/model-editor-view/model-editor-view.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeViewComponent},
    {
        path: 'signup', component: SignBaseViewComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToDashboard}
    },
    {
        path: 'signin', component: SignBaseViewComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToDashboard}
    },
    {
        path: 'dashboard',
        component: DashboardViewComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'brands',
        component: BrandsViewComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'brand/new',
        component: BrandCreatorViewComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'brand/edit/:id',
        component: BrandEditorViewComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'models',
        component: ModelsViewComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'model/new',
        component: ModelCreatorViewComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'model/edit/:id',
        component: ModelEditorViewComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
