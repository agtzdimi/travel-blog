import { Component, OnInit } from '@angular/core';
import { LandmarkModel } from 'src/app/theme/models/Landmark.model';
import { LandmarkService } from 'src/app/theme/services/landmark.service';
import { LoginService } from 'src/app/theme/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LandmarkService],
})
export class HomeComponent implements OnInit {
  landmarks: LandmarkModel[];
  writeAccess = false;

  constructor(
    private landmarkService: LandmarkService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.writeAccess = this.loginService.getUserWriteAccess();
    console.log(this.writeAccess);
    this.getLandmarks();
  }

  public getLandmarks(): void {
    const landResAttrib = 'results';
    this.landmarkService.getLandmarks().subscribe(
      (landmarks) => {
        this.landmarks = landmarks[landResAttrib];
        console.log(this.landmarks);
      },
      (error) => {}
    );
  }

  public sortBy(field): LandmarkModel[] {
    return this.landmarks.sort((a, b) =>
      a[field] > b[field] ? 1 : a[field] === b[field] ? 0 : -1
    );
  }
}
