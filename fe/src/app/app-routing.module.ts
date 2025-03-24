import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PostInputComponent } from './components/post-input/post-input.component';
import { UsersComponent } from './pages/users/users.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { TypeListComponent } from './pages/type-list/type-list.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { CrudButtonsComponent } from './crud-buttons/crud-buttons.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: PostInputComponent },
  { path: '', component: UsersComponent },
  { path: 'jobs/:id', component: JobsComponent },
  { path: 'type/:type', component: TypeListComponent },
  { path: 'admin/update/:id', component: UpdatePostComponent },
  { path: 'crud-buttons', component: CrudButtonsComponent },
  { path: 'update-post/:id', component: UpdatePostComponent }, 
  { path: 'create-post', component: PostInputComponent }, // Create page

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
