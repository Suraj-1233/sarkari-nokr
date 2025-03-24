import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SectionComponent } from './components/section/section.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderLinksComponent } from './components/header-links/header-links.component';
import { DynamicContentComponent } from './components/dynamic-content/dynamic-content.component';
import { JobPageComponent } from './job-page/job-page.component';
import { TableDisplayComponent } from './components/table-display/table-display.component';
import { ListDisplayComponent } from './components/list-display/list-display.component';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostInputComponent } from './components/post-input/post-input.component';
import { PopupModalComponent } from './components/popup-modal/popup-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { RecordService } from './services/record.service';
import { LoginComponent } from './pages/login/login.component';
  
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { TypeListComponent } from './pages/type-list/type-list.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { CrudButtonsComponent } from './crud-buttons/crud-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    HeaderComponent,
    FooterComponent,
    HeaderLinksComponent,
    DynamicContentComponent,
    JobPageComponent,
    TableDisplayComponent,
    ListDisplayComponent,
    DynamicFormBuilderComponent,
    PostInputComponent,
    PopupModalComponent,
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
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
