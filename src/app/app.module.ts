import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './theme/components/header/header.component';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbIconModule,
  NbPopoverModule,
  NbDialogModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { UploadImageComponent } from './theme/components/upload-image/upload-image.component';
import { EditModeComponent } from './theme/components/edit-mode/edit-mode.component';
import { ViewModeComponent } from './theme/components/view-mode/view-mode.component';
import { LandmarkDetailsComponent } from './pages/landmark-details/landmark-details.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './theme/guards/auth-guard.service';
import { DialogImageFullComponent } from './theme/components/dialog-image-full/dialog-image-full.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    UploadImageComponent,
    EditModeComponent,
    ViewModeComponent,
    LandmarkDetailsComponent,
    DialogImageFullComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbIconModule,
    NbPopoverModule,
    FormsModule,
    RouterModule,
    NbDialogModule.forRoot(),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
