// src/api/api.ts
import * as interfaces from './interfaces';
import * as clients from './clients';

/**
 * Custom HTTP implementation that automatically adds authentication headers
 */
class AuthenticatedHttpClient {
    private getToken: () => string | null;
    private refreshToken: () => Promise<string | null>;
    private onTokenExpired: () => void;

    constructor(
        getToken: () => string | null,
        refreshToken: () => Promise<string | null>,
        onTokenExpired: () => void
    ) {
        this.getToken = getToken;
        this.refreshToken = refreshToken;
        this.onTokenExpired = onTokenExpired;
    }

    fetch = async (url: RequestInfo, init?: RequestInit): Promise<Response> => {
        // Get current token
        const token = this.getToken();
        
        // Prepare headers
        const headers = new Headers(init?.headers);
        
        // Add Authorization header if token exists
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        
        // Add default headers
        if (!headers.has('Content-Type') && init?.method !== 'GET') {
            headers.set('Content-Type', 'application/json');
        }

        // Make the request
        const response = await fetch(url, {
            ...init,
            headers
        });

        // Handle 401 Unauthorized - token might be expired
        if (response.status === 401 && token) {
            try {
                // Try to refresh the token
                const newToken = await this.refreshToken();
                
                if (newToken) {
                    // Retry the request with new token
                    headers.set('Authorization', `Bearer ${newToken}`);
                    return fetch(url, {
                        ...init,
                        headers
                    });
                } else {
                    // Refresh failed, trigger logout
                    this.onTokenExpired();
                    return response;
                }
            } catch (error) {
                console.error('Token refresh failed:', error);
                this.onTokenExpired();
                return response;
            }
        }

        return response;
    };
}

/**
 * API Client that provides centralized access to all service endpoints
 * Acts as a unit of work pattern for API operations
 */
export class ApiClient {
    private baseUrl: string;
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private authenticatedHttp!: AuthenticatedHttpClient;

    // Client instances
    private _alternativeTMs!: interfaces.IAlternativeTMsClient;
    private _auth!: interfaces.IAuthClient;
    private _blocks!: interfaces.IBlocksClient;
    private _buildings!: interfaces.IBuildingsClient;
    private _clients!: interfaces.IClientsClient;
    private _deployments!: interfaces.IDeploymentsClient;
    private _documentation!: interfaces.IDocumentationClient;
    private _executions!: interfaces.IExecutionsClient;
    private _files!: interfaces.IFilesClient;
    private _programs!: interfaces.IProgramsClient;
    private _regions!: interfaces.IRegionsClient;
    private _requests!: interfaces.IRequestsClient;
    private _tMs!: interfaces.ITMsClient;
    private _uiComponents!: interfaces.IUiComponentsClient;
    private _users!: interfaces.IUsersClient;
    private _versions!: interfaces.IVersionsClient;
    private _workflows!: interfaces.IWorkflowsClient;
    private _uiWorkflowClient!: interfaces.IUIWorkflowClient;
    private _remoteAppsClient!: interfaces.IRemoteAppsClient;
    private _iconsClient!: interfaces.IIconsClient;
    private _groupsClient!: interfaces.IGroupsClient;

    /**
     * Initialize API client with base URL and authentication handlers
     */
    constructor(
        baseUrl?: string,
        getToken?: () => string | null,
        refreshToken?: () => Promise<string | null>,
        onTokenExpired?: () => void
    ) {
        this.baseUrl = baseUrl ?? "";
        
        // Create authenticated HTTP client if auth handlers provided
        if (getToken && refreshToken && onTokenExpired) {
            this.authenticatedHttp = new AuthenticatedHttpClient(getToken, refreshToken, onTokenExpired);
            this.http = this.authenticatedHttp;
        } else {
            // Fallback to regular fetch
            this.http = window as any;
        }
        
        // Initialize all client instances
        this.initializeClients();
    }

    private initializeClients() {
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
        this._workflows = new clients.WorkflowsClient(this.baseUrl, this.http);
        this._uiWorkflowClient = new clients.UIWorkflowClient(this.baseUrl, this.http);
        this._remoteAppsClient = new clients.RemoteAppsClient(this.baseUrl, this.http);
        this._iconsClient = new clients.IconsClient(this.baseUrl, this.http);
        this._groupsClient = new clients.GroupsClient(this.baseUrl, this.http);
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
     * Workflows management operations
     */
    get workflows(): interfaces.IWorkflowsClient {
        return this._workflows;
    }

    /**
     * UI Workflow operations
     */
    get uiWorkflowClient(): interfaces.IUIWorkflowClient {
        return this._uiWorkflowClient;
    }

    /**
     * Remote Apps operations
     */
    get remoteAppsClient(): interfaces.IRemoteAppsClient {
        return this._remoteAppsClient;
    }

    /**
     * Icons management operations
     */
    get iconsClient(): interfaces.IIconsClient {
        return this._iconsClient;
    }

    /**
     * Groups management operations
     */
    get groupsClient(): interfaces.IGroupsClient {
        return this._groupsClient;
    }

    /**
     * Get current API base URL
     */
    get baseApiUrl(): string {
        return this.baseUrl;
    }

    /**
     * Update authentication configuration
     */
    updateAuth(
        getToken: () => string | null,
        refreshToken: () => Promise<string | null>,
        onTokenExpired: () => void
    ): void {
        this.authenticatedHttp = new AuthenticatedHttpClient(getToken, refreshToken, onTokenExpired);
        this.http = this.authenticatedHttp;
        
        // Reinitialize all clients with new HTTP instance
        this.initializeClients();
    }

    /**
     * Update base URL for all clients
     */
    updateBaseUrl(newBaseUrl: string): void {
        this.baseUrl = newBaseUrl;
        this.initializeClients();
    }

    /**
     * Get current base URL
     */
    getBaseUrl(): string {
        return this.baseUrl;
    }
}

// Export a factory function for creating API client instances
export function createApiClient(
    baseUrl?: string,
    getToken?: () => string | null,
    refreshToken?: () => Promise<string | null>,
    onTokenExpired?: () => void
): ApiClient {
    return new ApiClient(baseUrl, getToken, refreshToken, onTokenExpired);
}

function getDynamicApiBaseUrl(): string {
    const backendPort = 5090;
    // window.location.protocol will be "http:" or "https:"
    // window.location.hostname will be "localhost", "192.168.1.10", etc.
    return `${window.location.protocol}//${window.location.hostname}:${backendPort}`;
}

// Export default instance that will be configured later
// export const api = createApiClient(getDynamicApiBaseUrl());
export const api = createApiClient("http://144.122.103.206:5090");