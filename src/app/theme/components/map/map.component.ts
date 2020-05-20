import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LoginService } from '../../services/login.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { NbDialogService } from '@nebular/theme';
import { LandmarkModel } from '../../models/Landmark.model';
import { LandmarkService } from '../../services/landmark.service';
import { ShowToastrService } from '../../services/show-toastr.service';

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit, OnChanges {
  @Input() coordinates: number[];
  @Input() currentLandmark: LandmarkModel;

  public color = '#3887be';
  public lngLat: mapboxgl.LngLat;
  public writeAccess: boolean;

  constructor(
    private loginService: LoginService,
    private dialogService: NbDialogService,
    private landmarkService: LandmarkService,
    private showToastrService: ShowToastrService
  ) {}

  ngOnInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
      'pk.eyJ1IjoiYWd0emRpbWkiLCJhIjoiY2pyaXc2OWN6MDV0cTQ0cXd1NHA0cHI1OSJ9.NQIQGDjleOWNi7bpSu_AGw'
    );
    this.writeAccess = this.loginService.getUserWriteAccess();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.lngLat = new mapboxgl.LngLat(this.coordinates[0], this.coordinates[1]);
  }

  onDragEnd(marker: mapboxgl.Marker): void {
    const movedCoord = marker.getLngLat().toArray();
    this.dialogService
      .open(DialogConfirmComponent)
      .onClose.subscribe((value) => {
        if (value) {
          this.coordinates = movedCoord;
          this.updateCoordinates();
        } else {
          this.lngLat = new mapboxgl.LngLat(
            this.coordinates[0],
            this.coordinates[1]
          );
        }
      });
  }

  /*
  Function to update the coordinates in the Database and print the result with a Nebular toastr
  */
  public updateCoordinates(): void {
    this.currentLandmark.location = this.coordinates;
    this.landmarkService.updateLandmark(this.currentLandmark).subscribe(
      (result) => {
        this.showToastrService.showToast(
          'top-right',
          'success',
          `Field update for ${this.currentLandmark.title} was successful`
        );
      },
      (error) => {
        this.showToastrService.showToast(
          'top-right',
          'warning',
          `Field update for ${this.currentLandmark.title} was unsuccessful`
        );
      }
    );
  }
}
