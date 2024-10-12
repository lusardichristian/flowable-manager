import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective } from '@coreui/angular';

import { FlowableService } from 'src/app/services/flowable.service';
import { DeploymentResponse, DataResponseDeploymentResponse } from 'src/app/models/deployment.model';

import { CommonModule } from '@angular/common'; // Importa CommonModule

import { DragAndDropComponent } from 'src/app/components/drag-and-drop/drag-and-drop.component';
import { UploadDeploymentModalComponent } from 'src/app/components/upload-deployment-modal/upload-deployment-modal.component'; 
import { ButtonModule } from '@coreui/angular';
import { SelectedFileService } from 'src/app/services/selectedFile.service.js';

import { Subscription } from 'rxjs';


@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    standalone: true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, CommonModule, ModalBodyComponent,
      ModalComponent,
      ModalFooterComponent,
      ModalHeaderComponent,
      ModalTitleDirective,
      ModalToggleDirective,
    DragAndDropComponent,
    UploadDeploymentModalComponent,
  ButtonModule],
  providers: [SelectedFileService]
})
export class TablesComponent {

  selectedFile: File | null = null;

  subscription: Subscription | undefined;

  public visible = false;



  deployments: DeploymentResponse[] = []; // Array per memorizzare i dati dei deployments
  total: number | undefined; // Totale dei deployments
  errorMessage: string | undefined; // Messaggio di errore

  constructor(private flowableService: FlowableService, private selectedFileService: SelectedFileService) {
    this.selectedFileService.getFile.subscribe(f => this.selectedFile = f);
  }

  public liveDemoVisible = false;

  

  handleLiveDemoChange(event: boolean) {
    this.liveDemoVisible = event;
  }

  ngOnInit(): void {

    this.selectedFile = this.selectedFileService.getData();

    // Chiama il servizio per recuperare i dati quando il componente viene inizializzato
    this.flowableService.getDeployments().subscribe(
      (response: DataResponseDeploymentResponse) => {
        this.deployments = response.data ?? []; // Popola l'array con i dati ricevuti
        this.total = response.total;
        console.log('Dati ricevuti:', this.deployments);
      },
      (error) => {
        this.errorMessage = 'Errore nel recupero dei dati';
        console.error('Errore:', error);
      }
    );

    

  }

  toggleLiveDemo() {
    console.log(this.visible)
    this.visible = !this.visible;
    console.log(this.visible)
  }


  uploadFile() {

    //this.selectedFile = this.selectedFileService.getData();


    console.log("upload file function")
    console.log(this.selectedFile)
    
    
  }

  onModalClose(event: any) {
    if (event.action == "close") {
        this.toggleLiveDemo()
    }
  }



  onDataEvent(event: Boolean) {
      if (event === true) {
        this.flowableService.getDeployments().subscribe(
          (response: DataResponseDeploymentResponse) => {
            this.deployments = response.data ?? []; // Popola l'array con i dati ricevuti
            this.total = response.total;
            console.log('Dati ricevuti:', this.deployments);
          },
          (error) => {
            this.errorMessage = 'Errore nel recupero dei dati';
            console.error('Errore:', error);
          }
        );
      }
  }


}
