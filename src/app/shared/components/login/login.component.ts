import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
    
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
    ) { 
      this.reLogin()
    
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  reLogin(){
    this.authService.getUser().subscribe((r) =>
    {
      console.log('got user ' + r.login)
      this.router.navigateByUrl("/profile")


    })
  }

  
  password = ''
  email = '';
  Login(){
    this.authService.login(
      this.email, this.password
    )
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
    .subscribe((res: any)=> {
      console.log('logged as '+ res.user)
      this.authService.setSession(res)
      this.router.navigateByUrl("/profile")
    },err=>{
      this.alertService.error(err.error.msg);
      this.loading = false;
    })
  }
}
