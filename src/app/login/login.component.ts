import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service'; // Import your auth service

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string  = "";
  token: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.errorMessage = "";
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          if (response.token) {
            this.token = response.token;
            console.log('Logged in successfully, token:', this.token);
            // Store the token in localStorage/sessionStorage for future requests
            localStorage.setItem('jwtToken', this.token);
            this.router.navigate(['/home']);
          }
        }, error => {
          this.errorMessage = "Invalid Username And Password";
          console.error('Login failed', error);
        });
    }
  }

}
