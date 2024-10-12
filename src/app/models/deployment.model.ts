// Modello per rappresentare ogni deployment individuale
export interface DeploymentResponse {
    id?: string;
    name?: string;
    deploymentTime?: string;
    category?: string;
    parentDeploymentId?: string;
    url?: string;
    tenantId?: string;
  }
  
  // Modello per rappresentare la risposta complessiva dell'API
  export interface DataResponseDeploymentResponse {
    data?: DeploymentResponse[];
    total?: number;
    start?: number;
    sort?: string;
    order?: string;
    size?: number;
  }
  