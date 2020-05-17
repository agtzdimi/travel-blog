import { Component, OnInit } from '@angular/core';
import { LandmarkModel } from 'src/app/theme/models/Landmark.model';
import { LandmarkService } from 'src/app/theme/services/landmark.service';
import { LoginService } from 'src/app/theme/services/login.service';
import { EditService } from 'src/app/theme/services/edit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landmark-details',
  templateUrl: './landmark-details.component.html',
  styleUrls: ['./landmark-details.component.scss'],
  providers: [LandmarkService],
})
export class LandmarkDetailsComponent implements OnInit {
  public landmarks: LandmarkModel[];
  public writeAccess = false;
  public editLandmarkShortInfo: string;
  public popOverOptions = { animation: { type: 'zoom' } };
  public showingLandmark: LandmarkModel;

  constructor(
    private landmarkService: LandmarkService,
    private loginService: LoginService,
    private editService: EditService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.writeAccess = this.loginService.getUserWriteAccess();
    this.getLandmark();
  }

  public getLandmark(): void {
    const landResAttrib = 'results';
    this.landmarkService.getLandmarks().subscribe(
      (landmarks) => {
        this.landmarks = landmarks[landResAttrib];
        this.showingLandmark = this.landmarks.filter((landmark) => {
          return (
            landmark['title'] === this.route.snapshot.queryParams['landmark']
          );
        })[0];
      },
      (error) => {}
    );
  }

  public selectOption(landmark: LandmarkModel): void {
    this.editService.editLandmarkTitle = landmark['title'];
    this.editService.editTitleFlag = false;
    this.editService.editShortInfoFlag = false;
    this.editService.editURLFlag = false;
    this.editService.editDescriptionFlag = false;
  }

  public editTitle(): void {
    this.editService.editTitleFlag = true;
  }

  public editShortInfo(): void {
    this.editService.editShortInfoFlag = true;
  }

  public editDescription(): void {
    this.editService.editDescriptionFlag = true;
  }

  public editURL(): void {
    this.editService.editURLFlag = true;
  }

  public getEditServiceInfo(attribute: string): any {
    return this.editService.getAttribute(attribute);
  }

  public resetToViewMode(): void {
    this.editService.editShortInfoFlag = false;
    this.editService.editTitleFlag = false;
  }

  public changesOccur(landmark: LandmarkModel): boolean {
    return (
      (this.getEditServiceInfo('shortInfoFlag') ||
        this.getEditServiceInfo('titleFlag')) &&
      landmark.title === this.getEditServiceInfo('landmarkTitle')
    );
  }
}
