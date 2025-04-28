import { NgModule, isDevMode } from '@angular/core';
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
import { ServiceWorkerModule } from '@angular/service-worker';

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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule, MatDialogModule,
    HttpClientModule,
    AppRoutingModule,DragDropModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
