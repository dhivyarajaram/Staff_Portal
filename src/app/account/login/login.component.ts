import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from './toast-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType = false;
  error = '';
  returnUrl: string = '/';
  userName: string | null = null; // Store the username for greeting
  year: number = new Date().getFullYear();

  private apiUrl = '/api/Staff/Login/';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient,
    private router: Router,
    public toastService: ToastService
  ) {
    // Redirect to home if already logged in
    if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      RememberMe: [false]
    });

    // Optionally, you can get the returnUrl from route parameters if required
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // Check if we need to show a success message
    const showToast = sessionStorage.getItem('showToast');
    if (showToast === 'true') {
      this.toastService.show('Successfully logged in!', { classname: 'bg-success text-white', delay: 5000 });
      sessionStorage.removeItem('showToast'); // Clear the flag
    }
  }

  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      const credentials = {
        UserName: this.f['UserName'].value,
        Password: this.f['Password'].value
      };

      // Set HTTP headers if necessary
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post<any>(this.apiUrl, credentials, { headers }).subscribe(
        (response) => {
          console.log('API Response:', response); // Log the entire response for debugging

          if (response && response.APIStatus === 'Success') {
            this.userName = response.Data[0].UserName;
            sessionStorage.setItem('currentUser', JSON.stringify(response.Data[0]));
            sessionStorage.setItem('showToast', 'true'); // Set the flag to show success toast

            // Redirect to the return URL or default to the home page
            this.router.navigate([this.returnUrl]);
          } else {
            // Show an error toast message
            this.toastService.show(response.Message || 'Login failed. Please check your credentials.', { classname: 'bg-danger text-white', delay: 15000 });
          }
        },
        (error) => this.handleError(error)
      );
    }
  }

  // Method to handle errors
  private handleError(error: any): void {
    console.error('HTTP Error Status:', error.status);
    console.error('HTTP Error Message:', error.message);
    console.error('HTTP Error Details:', error.error); // Detailed error information

    let errorMessage = 'An unexpected error occurred.';

    if (error.error && error.error.Message) {
      errorMessage = error.error.Message; // Use the message from the API if available
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Bad request. Please check the credentials format.';
          break;
        case 401:
          errorMessage = 'Unauthorized access. Please check your credentials.';
          break;
        case 403:
          errorMessage = 'Forbidden. You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'Resource not found. Please check the URL.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = 'An unexpected error occurred.';
      }
    }

    this.toastService.show(errorMessage, { classname: 'bg-danger text-white', delay: 15000 });
    this.error = errorMessage;
  }

  toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }
}
