import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    private toggleButton: any;
    private sidebarVisible: boolean;

    tokenSub: Subscription;
    isAnonymous: boolean = true;

    constructor(private element: ElementRef, private authService: AuthService,
                private router: Router) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

        // Observe the token
        this.tokenSub = this.authService.getToken()
            .subscribe(
                (token) => this.isAnonymous = !token
            )
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];

        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];

        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    /**
     * Method called when the user click on the disconnect link
     */
    onClickLogout() {
        this.authService.logout()
            .then(() => this.router.navigate(['']))
    }

    ngOnDestroy() {
        this.tokenSub.unsubscribe();
    }

}
