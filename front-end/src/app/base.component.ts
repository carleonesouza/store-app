import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({ selector: 'app-base', template: '' })
export class BaseComponent implements OnInit {
    authenticated;
    constructor(private router: Router) { }

    ngOnInit() {
        if (this.authenticated) {
            this.router.navigate(['/dashboard']);
        } else {
            this.router.navigate(['/login']);
        }
    }
}
