import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImageFullComponent } from './dialog-image-full.component';

describe('DialogImageFullComponent', () => {
  let component: DialogImageFullComponent;
  let fixture: ComponentFixture<DialogImageFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogImageFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImageFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
