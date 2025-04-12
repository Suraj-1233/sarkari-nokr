import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Admin/login/login.component';
import { PostInputComponent } from './Admin/post-input/post-input.component';
import { UsersComponent } from './users/users/users.component';
import { JobsComponent } from './users/jobs/jobs.component';
import { TypeListComponent } from './users/type-list/type-list.component';
import { UpdatePostComponent } from './Admin/update-post/update-post.component';
import { CrudButtonsComponent } from './Admin/crud-buttons/crud-buttons.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: UsersComponent },
  { path: 'jobs/:id', component: JobsComponent },
  { path: 'type/:type', component: TypeListComponent },
  { path: 'admin/update/:id', component: UpdatePostComponent },
  { path: 'crud-buttons', component: CrudButtonsComponent ,   canActivate: [AuthGuard]},
  { path: 'update-post/:id', component: UpdatePostComponent,   canActivate: [AuthGuard]},
  { path: 'create-post', component: PostInputComponent,   canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
