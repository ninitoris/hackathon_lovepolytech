import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css']
})
export class ProfileMainComponent implements OnInit {

  faEyeSlash = faEyeSlash;
  faEye = faEye;
  passwordTextType: boolean;
  repeatPasswordType: boolean;

  changePasswordForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    public authService : AuthService, 
    public router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
        password: ['', Validators.required],
        newpassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    },
    {
    validators: this.MustMatch('newpassword', 'confirmpassword')
    });
  }

  MustMatch(controlName: string, controlNameToMatch: string) {
    return(formGroup: FormGroup)=>{
      const control = formGroup.controls[controlName];
      const controlToMatch = formGroup.controls[controlNameToMatch];
      if(controlToMatch.errors && !controlToMatch.errors.MustMatch){
        return
      }
      if(control.value !== controlToMatch.value){
        controlToMatch.setErrors({MustMatch: true})
      }else{
        controlToMatch.setErrors(null) 
      }
    }
  }

  get f() { return this.changePasswordForm.controls; }

  password = '';
  newpassword = '';
  confirmpassword = '';
  
  onSubmit() {
    this.submitted = true;
  
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
        return;
    }

    this.loading = true;

    this.authService.getSession().subscribe((data)=>{
    })

    this.authService.changePassword(this.f.password.value, this.f.newpassword.value).subscribe((res)=>{
      this.alertService.success(res.msg);
      this.loading = false
      this.authService.logout();
      setTimeout(() => {
        this.router.navigateByUrl("/login")
      }, 1500);

    },err=>{
      this.alertService.error(err.error.msg);
      this.loading = false
    })
  }


  togglepasswordTextType(){
    this.passwordTextType = !this.passwordTextType;
  }

  get confPass() {
    return this.changePasswordForm.get('confirmpassword') as FormControl;
  }

  toggleRepeatpassType(){
    if(this.repeatPasswordType){
      this.confPass.enable();
    }else{
      this.confPass.disable();
    }
    this.repeatPasswordType = !this.repeatPasswordType;
  }
}
