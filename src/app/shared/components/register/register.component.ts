import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
    
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { 
    this.authService.getUser().subscribe((r) =>
    {
      console.log('got user ' + r.login)
      this.router.navigateByUrl("/profile")


    })
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe((res)=>{
      this.alertService.success('Registration successful', true);
      this.router.navigate(['/login']);
    }, error =>{
      this.alertService.error(error.error.msg);
      console.log(error.error.msg)
      this.loading = false;
    })

  }

}
