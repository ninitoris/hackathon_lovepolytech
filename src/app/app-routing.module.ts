import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { MainComponent } from './shared/components/main/main.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
{ path: '', component: MainComponent },
{ path: 'login', component: LoginComponent },
{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
{ path: 'register', component: RegisterComponent },
{ path: '**', redirectTo: '/', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
