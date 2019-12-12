import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/models/user.model';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],

})
export class SignInComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  @Input() loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
              private auth: AuthService, private snackBar: MatSnackBar,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) { }



  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      accessToken: ['', [Validators.required, Validators.minLength(4)]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loading = true;
      this.auth.login(this.f.username.value, this.f.password.value, this.f.accessToken.value)
      .subscribe((user: User) => {
        console.log(user);
        localStorage.setItem('mSessionId', user.token.toString());
        this.goToApp();
      });
     }
    this.snackBar.open('Login Invalid, Please Check your Credentials !', '', { duration: 3000 } )
    .afterDismissed()
    .subscribe(
      () => {
        this.loading = false;
      }
    );

  }

  goToApp() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AppComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
}


}
