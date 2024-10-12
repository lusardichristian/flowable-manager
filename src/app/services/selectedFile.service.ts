import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Questo assicura che il servizio sia registrato a livello di root, rendendolo un singleton.
})
export class SelectedFileService {
    private file: File | null = null;
    private fileBeahavior = new BehaviorSubject<File|null>(null);
    getFile = this.fileBeahavior.asObservable();

    constructor() {}

    setFile(file: File){
        this.fileBeahavior.next(file);
    }

    setData(newData: File): void {
      this.file = newData;
      console.log("service --> "+this.file)
    }
  
    getData(): File | null {
      console.log("getData --> "+this.file)
      return this.file;
    }
}
