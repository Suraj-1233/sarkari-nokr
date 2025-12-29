import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SectionComponent } from './users/section/section.component';
import { HeaderComponent } from './users/header/header.component';
import { HeaderLinksComponent } from './users/header-links/header-links.component';
import { DynamicContentComponent } from './users/dynamic-content/dynamic-content.component';
import { JobPageComponent } from './users/job-page/job-page.component';
import { TableDisplayComponent } from './users/table-display/table-display.component';
import { ListDisplayComponent } from './users/list-display/list-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostInputComponent } from './Admin/post-input/post-input.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { RecordService } from './services/record.service';
import { LoginComponent } from './Admin/login/login.component';
  
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users/users.component';
import { JobsComponent } from './users/jobs/jobs.component';
import { TypeListComponent } from './users/type-list/type-list.component';
import { UpdatePostComponent } from './Admin/update-post/update-post.component';
import { CrudButtonsComponent } from './Admin/crud-buttons/crud-buttons.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AlertDialogComponent } from './shared/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    HeaderComponent,
    HeaderLinksComponent,
    DynamicContentComponent,
    JobPageComponent,
    TableDisplayComponent,
    ListDisplayComponent,
    PostInputComponent,
    LoginComponent,
    UsersComponent,
    JobsComponent,
    TypeListComponent,
    UpdatePostComponent,
    CrudButtonsComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,
    DragDropModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
