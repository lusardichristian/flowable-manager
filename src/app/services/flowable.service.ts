// src/app/services/flowable.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataResponseDeploymentResponse } from '../models/deployment.model'; // Importa i modelli

@Injectable({
  providedIn: 'root'
})
export class FlowableService {
  
  // Definisci l'URL dell'endpoint REST
  private apiUrl = 'http://localhost:4200/flowable-rest/service/repository/deployments';

  // Crea le credenziali di autenticazione di base
  private username = 'rest-admin';
  private password = 'test';

  // Codifica le credenziali in Base64
  private authHeader = 'Basic ' + btoa(this.username + ':' + this.password);
  //private authHeader = 'Basic ' + this.username + ':' + this.password;

  constructor(private http: HttpClient) {}

  // Metodo per recuperare i dati dei deployments
  getDeployments(): Observable<DataResponseDeploymentResponse> {
    
    // Crea le intestazioni HTTP con l'intestazione di autenticazione
    const headers = new HttpHeaders({
      'Authorization': this.authHeader
    });

    return this.http.get<DataResponseDeploymentResponse>(this.apiUrl, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  uploadFile(deploymentKey: string, deploymentName: string, tenantId: string, file: File): Observable<DataResponseDeploymentResponse>  {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      // Crea le intestazioni HTTP con l'intestazione di autenticazione
      const headers = new HttpHeaders({
        'Authorization': this.authHeader
      });
  
      // Aggiungi i parametri della query
      const params = new HttpParams()
        .set('deploymentKey', deploymentKey)
        .set('deploymentName', deploymentName)
        .set('tenantId', tenantId);
  
      return this.http.post(this.apiUrl, formData, { params });
    }

  // Metodo per gestire eventuali errori HTTP
  private handleError(error: HttpErrorResponse) {
    console.error('Errore HTTP:', error);
    return throwError('Errore nel recupero dei dati; riprova più tardi.');
  }
}
