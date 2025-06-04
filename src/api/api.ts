import * as interfaces from './interfaces';
import * as clients from './clients';

/**
 * API Client that provides centralized access to all service endpoints
 * Acts as a unit of work pattern for API operations
 */
export class ApiClient {
    private baseUrl: string;
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };

    // Client instances
    private _alternativeTMs: interfaces.IAlternativeTMsClient;
    private _auth: interfaces.IAuthClient;
    private _blocks: interfaces.IBlocksClient;
    private _buildings: interfaces.IBuildingsClient;
    private _clients: interfaces.IClientsClient;
    private _deployments: interfaces.IDeploymentsClient;
    private _documentation: interfaces.IDocumentationClient;
    private _executions: interfaces.IExecutionsClient;
    private _files: interfaces.IFilesClient;
    private _programs: interfaces.IProgramsClient;
    private _regions: interfaces.IRegionsClient;
    private _requests: interfaces.IRequestsClient;
    private _tMs: interfaces.ITMsClient;
    private _uiComponents: interfaces.IUiComponentsClient;
    private _users: interfaces.IUsersClient;
    private _versions: interfaces.IVersionsClient;

    /**
     * Initialize API client with base URL and optional HTTP implementation
     * @param baseUrl Base URL for the API (defaults to empty string)
     * @param http HTTP implementation (defaults to window.fetch)
     */
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.baseUrl = baseUrl ?? "";
        this.http = http ?? window as any;
        
        // Initialize all client instances
        this._alternativeTMs = new clients.AlternativeTMsClient(this.baseUrl, this.http);
        this._auth = new clients.AuthClient(this.baseUrl, this.http);
        this._blocks = new clients.BlocksClient(this.baseUrl, this.http);
        this._buildings = new clients.BuildingsClient(this.baseUrl, this.http);
        this._clients = new clients.ClientsClient(this.baseUrl, this.http);
        this._deployments = new clients.DeploymentsClient(this.baseUrl, this.http);
        this._documentation = new clients.DocumentationClient(this.baseUrl, this.http);
        this._executions = new clients.ExecutionsClient(this.baseUrl, this.http);
        this._files = new clients.FilesClient(this.baseUrl, this.http);
        this._programs = new clients.ProgramsClient(this.baseUrl, this.http);
        this._regions = new clients.RegionsClient(this.baseUrl, this.http);
        this._requests = new clients.RequestsClient(this.baseUrl, this.http);
        this._tMs = new clients.TMsClient(this.baseUrl, this.http);
        this._uiComponents = new clients.UiComponentsClient(this.baseUrl, this.http);
        this._users = new clients.UsersClient(this.baseUrl, this.http);
        this._versions = new clients.VersionsClient(this.baseUrl, this.http);
    }

    /**
     * Alternative TMs management operations
     */
    get alternativeTMs(): interfaces.IAlternativeTMsClient {
        return this._alternativeTMs;
    }

    /**
     * Authentication and authorization operations
     */
    get auth(): interfaces.IAuthClient {
        return this._auth;
    }

    /**
     * Building blocks management operations
     */
    get blocks(): interfaces.IBlocksClient {
        return this._blocks;
    }

    /**
     * Buildings management operations
     */
    get buildings(): interfaces.IBuildingsClient {
        return this._buildings;
    }

    /**
     * Clients management operations
     */
    get clients(): interfaces.IClientsClient {
        return this._clients;
    }

    /**
     * Application deployment operations
     */
    get deployments(): interfaces.IDeploymentsClient {
        return this._deployments;
    }

    /**
     * API documentation operations
     */
    get documentation(): interfaces.IDocumentationClient {
        return this._documentation;
    }

    /**
     * Program execution operations
     */
    get executions(): interfaces.IExecutionsClient {
        return this._executions;
    }

    /**
     * File storage operations
     */
    get files(): interfaces.IFilesClient {
        return this._files;
    }

    /**
     * Program management operations
     */
    get programs(): interfaces.IProgramsClient {
        return this._programs;
    }

    /**
     * Regions management operations
     */
    get regions(): interfaces.IRegionsClient {
        return this._regions;
    }

    /**
     * Request management operations
     */
    get requests(): interfaces.IRequestsClient {
        return this._requests;
    }

    /**
     * TMs (Transformer) management operations
     */
    get tMs(): interfaces.ITMsClient {
        return this._tMs;
    }

    /**
     * UI Components management operations
     */
    get uiComponents(): interfaces.IUiComponentsClient {
        return this._uiComponents;
    }

    /**
     * User management operations
     */
    get users(): interfaces.IUsersClient {
        return this._users;
    }

    /**
     * Version control operations
     */
    get versions(): interfaces.IVersionsClient {
        return this._versions;
    }

    /**
     * Update base URL for all clients
     * @param newBaseUrl New base URL to use
     */
    updateBaseUrl(newBaseUrl: string): void {
        this.baseUrl = newBaseUrl;
        
        // Reinitialize all clients with new base URL
        this._alternativeTMs = new clients.AlternativeTMsClient(this.baseUrl, this.http);
        this._auth = new clients.AuthClient(this.baseUrl, this.http);
        this._blocks = new clients.BlocksClient(this.baseUrl, this.http);
        this._buildings = new clients.BuildingsClient(this.baseUrl, this.http);
        this._clients = new clients.ClientsClient(this.baseUrl, this.http);
        this._deployments = new clients.DeploymentsClient(this.baseUrl, this.http);
        this._documentation = new clients.DocumentationClient(this.baseUrl, this.http);
        this._executions = new clients.ExecutionsClient(this.baseUrl, this.http);
        this._files = new clients.FilesClient(this.baseUrl, this.http);
        this._programs = new clients.ProgramsClient(this.baseUrl, this.http);
        this._regions = new clients.RegionsClient(this.baseUrl, this.http);
        this._requests = new clients.RequestsClient(this.baseUrl, this.http);
        this._tMs = new clients.TMsClient(this.baseUrl, this.http);
        this._uiComponents = new clients.UiComponentsClient(this.baseUrl, this.http);
        this._users = new clients.UsersClient(this.baseUrl, this.http);
        this._versions = new clients.VersionsClient(this.baseUrl, this.http);
    }

    /**
     * Get current base URL
     */
    getBaseUrl(): string {
        return this.baseUrl;
    }
}

// Export a factory function for creating API client instances
export function createApiClient(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }): ApiClient {
    return new ApiClient(baseUrl, http);
}

// Export default instance that can be configured
export const api = createApiClient('https://localhost:7058');