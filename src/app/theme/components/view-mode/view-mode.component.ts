import { Component, OnInit, Input } from '@angular/core';
import { LandmarkModel } from '../../models/Landmark.model';
import { EditService } from '../../services/edit.service';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.scss'],
})
export class ViewModeComponent implements OnInit {
  @Input() currentLandmark: LandmarkModel;
  @Input() mode: string;

  constructor(private editService: EditService) {}

  ngOnInit(): void {}

  public getEditServiceInfo(attribute: string): any {
    return this.editService.getAttribute(attribute);
  }

  public showTitle(): boolean {
    return (
      !(
        this.getEditServiceInfo('titleFlag') &&
        this.currentLandmark.title === this.getEditServiceInfo('landmarkTitle')
      ) && this.mode === 'title'
    );
  }

  public showShortInfo(): boolean {
    return (
      !(
        this.getEditServiceInfo('shortInfoFlag') &&
        this.currentLandmark.title === this.getEditServiceInfo('landmarkTitle')
      ) && this.mode === 'title'
    );
  }

  public showDescription(): boolean {
    return (
      !this.getEditServiceInfo('DescriptionFlag') && this.mode === 'description'
    );
  }

  public showURL(): boolean {
    return !this.getEditServiceInfo('URLFlag') && this.mode === 'description';
  }
}
