import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { first } from 'rxjs/operators';

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
              private authService: AuthService) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

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
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value, this.f.accessToken.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }


}
