import { Component, EventEmitter, Input, Output } from '@angular/core';

import {  RowComponent,   ColComponent,         TextColorDirective,   CardComponent,       CardHeaderComponent,  CardBodyComponent, 
          TableDirective, TableColorDirective,  TableActiveDirective, BorderDirective,     AlignDirective,       ModalBodyComponent,
          ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ButtonModule,
          FormCheckComponent } 
from '@coreui/angular';




@Component({
  selector: 'upload-deployment-modal',
  standalone: true,
  imports: [RowComponent,   ColComponent,         TextColorDirective,   CardComponent,       CardHeaderComponent,  CardBodyComponent, 
            TableDirective, TableColorDirective,  TableActiveDirective, BorderDirective,     AlignDirective,       ModalBodyComponent,
            ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ButtonModule,
            FormCheckComponent],
  templateUrl: './upload-deployment-modal.component.html',
  styleUrl: './upload-deployment-modal.component.scss',
})
export class UploadDeploymentModalComponent {

  constructor() {}


  @Input()
  visible: boolean = false;

  @Output()
  onClose = new EventEmitter<any>();

  toggleLiveDemo() {
    this.onClose.emit({
      action: "close"
    });
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
}
