import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    if (this.username && this.password) {
      this.http.post<any>('https://localhost:7214/api/account/login', { username: this.username, password: this.password })
        .subscribe(response => {
          if (response.token) {
            // Spara token och navigera till böcker
            localStorage.setItem('token', response.token);
            this.router.navigate(['/books']);
          } else {
            alert('Login failed: Invalid credentials');
          }
        }, error => {
          console.error('Login error:', error);
          alert('Login failed: Unable to connect');
        });
    } else {
      alert('Please enter username and password');
    }
  }
}
