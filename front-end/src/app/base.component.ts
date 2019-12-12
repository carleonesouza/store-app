import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({ selector: 'app-base', template: '' })
export class BaseComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {
        if (this.authService.authenticated) {
            this.router.navigate(['/dashboard/home']);
        }
        this.router.navigate(['/login']);
    }
}
