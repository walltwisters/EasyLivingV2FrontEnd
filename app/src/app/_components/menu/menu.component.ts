import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, RouterEvent } from '@angular/router';

@Component({
    selector: 'easy-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['../../../css/app.css','menu.component.css']
})
export class MenuComponent implements OnInit {
    
    private dropdownOpen : boolean = false;
    private navbarOpen : boolean = false;

    constructor( private router: Router )
    {
        this.routerEvent(this.router);
    }

    ngOnInit() {
       
    }

    routerEvent(router : Router) {
        router.events.subscribe( e => {
            if( e instanceof NavigationStart) {
                console.log("navigation shifted");
                this.navbarOpen = false;
            }
        })
    }

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }

    toggleNav() {
        this.navbarOpen = !this.navbarOpen;
    }

    
}