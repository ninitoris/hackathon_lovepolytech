import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faEyeSlash = faEyeSlash;
  faEye = faEye;
  
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  passwordTextType: boolean;
    
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private ac: AppComponent
    ) { 
      this.reLogin()
    
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  toggleRepeatpassType(){
    this.passwordTextType = !this.passwordTextType;

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
    ).subscribe((res)=>{
      console.log(res)
      this.ac.getFavs()
    },err=>{
      console.log(err)
    })
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
      this.authService.setSession(res)
      this.router.navigateByUrl("/profile")
    },err=>{
      this.alertService.error(err.error.msg);
      this.loading = false;
    })
  }
}
