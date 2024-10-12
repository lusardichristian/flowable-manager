import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDeploymentModalComponent } from './upload-deployment-modal.component';

describe('UploadDeploymentModalComponent', () => {
  let component: UploadDeploymentModalComponent;
  let fixture: ComponentFixture<UploadDeploymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadDeploymentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDeploymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
