import {Component, signal, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedFileService } from 'src/app/services/selectedFile.service.js';
import { Observable, of } from 'rxjs';
import { FlowableService } from 'src/app/services/flowable.service';





@Component({
  selector: 'drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css'],
  standalone: true,  // Il componente è dichiarato come standalone,
  imports: [ CommonModule],
  providers: [SelectedFileService]
})
export class DragAndDropComponent {

  @Output() fileToShare: EventEmitter<File> = new EventEmitter<File>();


  placeholder = ""
  imageName = signal('');
  fileSize = signal(0);
  uploadProgress = signal(0);
  imagePreview = signal('');
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;

  constructor(private selectedFileService: SelectedFileService, private flowableService: FlowableService) {
  }

  @Output() dataEvent = new EventEmitter<Boolean>();



  // Handler for file input change
  onFileChange(event: any): void {
    const file = event.target.files[0] as File | null;
    console.log(event)
    this.uploadFile(file);
  }

  // Handler for file drop
  onFileDrop(event: DragEvent): void {
    event.preventDefault();  // Impedisce il comportamento predefinito
    const file = event.dataTransfer?.files[0] as File | null;  // Ottieni il file

    console.log(file)

    if (file) {
      this.placeholder = file.name;  // Aggiorna il placeholder con il nome del file
      this.uploadFile(file);  // Chiama la funzione per caricare il file
    } 

    if (event.dataTransfer && event.dataTransfer.files) {
      this.fileToShare.emit(event.dataTransfer.files[0]);
    }

  }

  // Prevent default dragover behavior
  onDragOver(event: DragEvent): void {
    //console.log(event)
    event.preventDefault();
  }

  // Method to handle file upload
  uploadFile(file: File | null): void {
    if (file && (file.type.startsWith('application/') || file.type.startsWith('text/xml'))) {
      this.selectedFile = file;
      this.fileSize.set(Math.round(file.size / 1024)); // Set file size in KB

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview.set(e.target?.result as string); // Set image preview URL
      };
      reader.readAsDataURL(file);

      this.uploadSuccess = true;
      this.uploadError = false;
      this.imageName.set(file.name); // Set image name

      if (this.selectedFile) {
        this.flowableService.uploadFile("", "", "", this.selectedFile).subscribe({
          next: (response) => {
            console.log('Upload successful!', response);

            //emit true e di la lo aggancio
            this.dataEvent.emit(true);
          },
          error: (error) => {
            console.error('Upload failed!', error);
          }
        });
      } else {
        console.log('No file selected.');
      }

      this.selectedFileService.setFile(file);


    } else {
      this.uploadSuccess = false;
      this.uploadError = true;
    }
  }

  // Method to remove the uploaded image
  removeImage(): void {
    this.selectedFile = null;
    this.imageName.set('');
    this.fileSize.set(0);
    this.imagePreview.set('');
    this.uploadSuccess = false;
    this.uploadError = false;
    this.uploadProgress.set(0);
  }


}