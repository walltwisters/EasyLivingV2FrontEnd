import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../_models';
import { UserService } from '../../_services';

@Component( {
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.css']
})
export class UserComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService : UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    };

    
    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

}