import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';

import {CommonModule} from "@angular/common";
import {NouisliderModule} from "ng2-nouislider";
import {JwBootstrapSwitchNg2Module} from "jw-bootstrap-switch-ng2";
import {HomeViewComponent} from './views/home-view/home-view.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {SignBaseViewComponent} from './views/sign-base-view/sign-base-view.component';
import {SigninFormComponent} from './components/signin-form/signin-form.component';
import {SignupFormComponent} from './components/signup-form/signup-form.component';
import {AuthService} from "./services/auth/auth.service";
import * as firebase from "firebase";
import {DashboardViewComponent} from './views/dashboard-view/dashboard-view.component';
import {AngularFireAuthGuard} from "@angular/fire/auth-guard";

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        HomeViewComponent,
        SignBaseViewComponent,
        SigninFormComponent,
        SignupFormComponent,
        DashboardViewComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        AppRoutingModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule
    ],
    providers: [
        AuthService,
        AngularFireAuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
