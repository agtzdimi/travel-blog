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
  NbToastrModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { UploadImageComponent } from './theme/components/upload-image/upload-image.component';
import { EditModeComponent } from './theme/components/edit-mode/edit-mode.component';
import { ViewModeComponent } from './theme/components/view-mode/view-mode.component';
import { LandmarkDetailsComponent } from './pages/landmark-details/landmark-details.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './theme/guards/auth-guard.service';
import { DialogImageFullComponent } from './theme/components/dialog-image-full/dialog-image-full.component';
import { MapComponent } from './theme/components/map/map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

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
    MapComponent,
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
    NbToastrModule.forRoot(),
    FormsModule,
    RouterModule,
    NbDialogModule.forRoot(),
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1IjoiYWd0emRpbWkiLCJhIjoiY2pyaXc2OWN6MDV0cTQ0cXd1NHA0cHI1OSJ9.NQIQGDjleOWNi7bpSu_AGw',
      geocoderAccessToken:
        'pk.eyJ1IjoiYWd0emRpbWkiLCJhIjoiY2pyaXc2OWN6MDV0cTQ0cXd1NHA0cHI1OSJ9.NQIQGDjleOWNi7bpSu_AGw',
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
