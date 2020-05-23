import { Component, OnInit, OnDestroy,
   Input,
   ComponentFactoryResolver,
   ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StoreAppService } from '../services/store-app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../app/app.component';

import * as firebase from 'firebase/app';

@Component({
    selector: 'account-login',
    templateUrl: './login.component.html',
    styleUrls: ['./account.component.scss', './login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    loading = false;
    submitted = false;
    returnUrl: string;
    loggingIn = false;
    model: any = {};
    error = undefined;
     user: firebase.User;
   @Input() loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
                private auth: AuthService, private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef, private Store: StoreAppService) { }

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        accessToken: ['', [Validators.required, Validators.minLength(4)]],
      });
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
      if (this.auth.authenticated) {
        this.router.navigate(['/home']);
    }

      document.body.classList.add('in-login');

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
      if (this.loginForm.invalid) {
        return;
      } else {
        this.loading = true;

       }
    }

    goToApp() {
      const factory = this.componentFactoryResolver.resolveComponentFactory(AppComponent);
      const ref = this.viewContainerRef.createComponent(factory);
      ref.changeDetectorRef.detectChanges();
  }

      signInWithGoogle() {
          this.loggingIn = true;
          this.error = undefined;

          this.auth.afAuth.auth
              .signInWithPopup(new firebase.auth.GoogleAuthProvider())
              .then(res => {
                  this.user = res.user;
                  this.auth.user = res.user;
                  this.auth.uid = res.user.uid;
                  this.auth.avatar = res.user.photoURL.replace('s96-c', 's512-c');
                  this.auth.name = res.user.displayName;
                  this.auth.email = res.user.email;

                  res.user.getIdToken(false)
                      .then(idToken => {
                          this.auth.idToken = idToken;
                          this.Store.doLogin(this.user)
                              .subscribe(r => {
                                  localStorage.setItem('mSessionId', r.accessToken);
                                  this.auth.role = r.role;
                                  console.log(`Role: ${r.role}`);
                                  this.router.navigate(['/home']);
                              }, e => {
                                  this.loggingIn = false;
                                  this.error = e;
                              });
                      })
                      .catch(() => {
                          console.error('Failed to obtain user ID token!');
                          this.loggingIn = false;
                          this.error = 'There was an error while processing your request';
                      });
              })
              .catch((error) => {
                  console.log(error);
                  this.loggingIn = false;
                  this.error = 'There was an error while processing your request';
              });
      }

      ngOnDestroy() {
          document.body.classList.remove('in-login');
      }
}
