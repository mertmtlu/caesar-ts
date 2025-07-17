// --- START OF FILE DeploymentsClient.ts ---

import * as types from './types';
import * as interfaces from './interfaces';
import * as enums from './enums';
import { throwException } from './utils';

export class DeploymentsClient implements interfaces.IDeploymentsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * Deploy pre-built application (Angular, React, Vue dist folder)
     * @param body (optional) 
     * @return OK
     */
    deployments_DeployPreBuiltApp(programId: string, body: types.AppDeploymentRequestDto | undefined): Promise<types.ProgramDeploymentDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/prebuilt";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_DeployPreBuiltApp(_response);
        });
    }

    protected processDeployments_DeployPreBuiltApp(response: Response): Promise<types.ProgramDeploymentDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ProgramDeploymentDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ProgramDeploymentDtoApiResponse>(null as any);
    }

    /**
     * Deploy static site (HTML, CSS, JS files)
     * @param body (optional) 
     * @return OK
     */
    deployments_DeployStaticSite(programId: string, body: types.StaticSiteDeploymentRequestDto | undefined): Promise<types.ProgramDeploymentDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/static";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_DeployStaticSite(_response);
        });
    }

    protected processDeployments_DeployStaticSite(response: Response): Promise<types.ProgramDeploymentDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ProgramDeploymentDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ProgramDeploymentDtoApiResponse>(null as any);
    }

    /**
     * Deploy container application using Docker
     * @param body (optional) 
     * @return OK
     */
    deployments_DeployContainerApp(programId: string, body: types.ContainerDeploymentRequestDto | undefined): Promise<types.ProgramDeploymentDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/container";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_DeployContainerApp(_response);
        });
    }

    protected processDeployments_DeployContainerApp(response: Response): Promise<types.ProgramDeploymentDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ProgramDeploymentDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ProgramDeploymentDtoApiResponse>(null as any);
    }

    /**
     * Get deployment status for a program
     * @return OK
     */
    deployments_GetDeploymentStatus(programId: string): Promise<types.ProgramDeploymentStatusDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/status";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_GetDeploymentStatus(_response);
        });
    }

    protected processDeployments_GetDeploymentStatus(response: Response): Promise<types.ProgramDeploymentStatusDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ProgramDeploymentStatusDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ProgramDeploymentStatusDtoApiResponse>(null as any);
    }

    /**
     * Start a deployed application
     * @return OK
     */
    deployments_StartApplication(programId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/start";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_StartApplication(_response);
        });
    }

    protected processDeployments_StartApplication(response: Response): Promise<types.BooleanApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BooleanApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BooleanApiResponse>(null as any);
    }

    /**
     * Stop a deployed application
     * @return OK
     */
    deployments_StopApplication(programId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/stop";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_StopApplication(_response);
        });
    }

    protected processDeployments_StopApplication(response: Response): Promise<types.BooleanApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BooleanApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BooleanApiResponse>(null as any);
    }

    /**
     * Restart a deployed application
     * @return OK
     */
    deployments_RestartApplication(programId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/restart";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_RestartApplication(_response);
        });
    }

    protected processDeployments_RestartApplication(response: Response): Promise<types.BooleanApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BooleanApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BooleanApiResponse>(null as any);
    }

    /**
     * Get application logs
     * @param lines (optional) 
     * @return OK
     */
    deployments_GetApplicationLogs(programId: string, lines: number | undefined): Promise<types.StringListApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/logs?";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (lines === null)
            throw new Error("The parameter 'lines' cannot be null.");
        else if (lines !== undefined)
            url_ += "lines=" + encodeURIComponent("" + lines) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_GetApplicationLogs(_response);
        });
    }

    protected processDeployments_GetApplicationLogs(response: Response): Promise<types.StringListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.StringListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.StringListApiResponse>(null as any);
    }

    /**
     * Update deployment configuration
     * @param body (optional) 
     * @return OK
     */
    deployments_UpdateDeploymentConfig(programId: string, body: types.AppDeploymentConfigUpdateDto | undefined): Promise<types.ProgramDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/config";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_UpdateDeploymentConfig(_response);
        });
    }

    protected processDeployments_UpdateDeploymentConfig(response: Response): Promise<types.ProgramDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ProgramDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ProgramDtoApiResponse>(null as any);
    }

    /**
     * Get application health status
     * @return OK
     */
    deployments_GetApplicationHealth(programId: string): Promise<types.ApplicationHealthDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/health";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_GetApplicationHealth(_response);
        });
    }

    protected processDeployments_GetApplicationHealth(response: Response): Promise<types.ApplicationHealthDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ApplicationHealthDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ApplicationHealthDtoApiResponse>(null as any);
    }

    /**
     * Scale application instances (for container deployments)
     * @param body (optional) 
     * @return OK
     */
    deployments_ScaleApplication(programId: string, body: number | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/scale";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_ScaleApplication(_response);
        });
    }

    protected processDeployments_ScaleApplication(response: Response): Promise<types.BooleanApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BooleanApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BooleanApiResponse>(null as any);
    }

    /**
     * Get application metrics
     * @return OK
     */
    deployments_GetApplicationMetrics(programId: string): Promise<types.ApplicationMetricsDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/metrics";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_GetApplicationMetrics(_response);
        });
    }

    protected processDeployments_GetApplicationMetrics(response: Response): Promise<types.ApplicationMetricsDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ApplicationMetricsDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ApplicationMetricsDtoApiResponse>(null as any);
    }

    /**
     * Undeploy an application
     * @return OK
     */
    deployments_UndeployApplication(programId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/undeploy";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_UndeployApplication(_response);
        });
    }

    protected processDeployments_UndeployApplication(response: Response): Promise<types.BooleanApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BooleanApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BooleanApiResponse>(null as any);
    }

    /**
     * Validate deployment configuration
     * @param body (optional) 
     * @return OK
     */
    deployments_ValidateDeployment(programId: string, body: types.AppDeploymentRequestDto | undefined): Promise<types.DeploymentValidationResultApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/validate";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_ValidateDeployment(_response);
        });
    }

    protected processDeployments_ValidateDeployment(response: Response): Promise<types.DeploymentValidationResultApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.DeploymentValidationResultApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.DeploymentValidationResultApiResponse>(null as any);
    }

    /**
     * Get supported deployment options for a program
     * @return OK
     */
    deployments_GetSupportedDeploymentOptions(programId: string): Promise<types.SupportedDeploymentOptionDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/options";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_GetSupportedDeploymentOptions(_response);
        });
    }

    protected processDeployments_GetSupportedDeploymentOptions(response: Response): Promise<types.SupportedDeploymentOptionDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.SupportedDeploymentOptionDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.SupportedDeploymentOptionDtoListApiResponse>(null as any);
    }

    /**
     * Get deployment history for a program
     * @param limit (optional) 
     * @return OK
     */
    deployments_GetDeploymentHistory(programId: string, limit: number | undefined): Promise<types.DeploymentHistoryDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/history?";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (limit === null)
            throw new Error("The parameter 'limit' cannot be null.");
        else if (limit !== undefined)
            url_ += "limit=" + encodeURIComponent("" + limit) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_GetDeploymentHistory(_response);
        });
    }

    protected processDeployments_GetDeploymentHistory(response: Response): Promise<types.DeploymentHistoryDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.DeploymentHistoryDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.DeploymentHistoryDtoListApiResponse>(null as any);
    }

    /**
     * Get all active deployments
     * @return OK
     */
    deployments_GetActiveDeployments(): Promise<types.ActiveDeploymentDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/active";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_GetActiveDeployments(_response);
        });
    }

    protected processDeployments_GetActiveDeployments(response: Response): Promise<types.ActiveDeploymentDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ActiveDeploymentDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ActiveDeploymentDtoListApiResponse>(null as any);
    }

    /**
     * Get deployment statistics
     * @param fromDate (optional) 
     * @param toDate (optional) 
     * @return OK
     */
    deployments_GetDeploymentStatistics(fromDate: Date | undefined, toDate: Date | undefined): Promise<types.DeploymentStatisticsDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/statistics?";
        if (fromDate === null)
            throw new Error("The parameter 'fromDate' cannot be null.");
        else if (fromDate !== undefined)
            url_ += "fromDate=" + encodeURIComponent(fromDate ? "" + fromDate.toISOString() : "") + "&";
        if (toDate === null)
            throw new Error("The parameter 'toDate' cannot be null.");
        else if (toDate !== undefined)
            url_ += "toDate=" + encodeURIComponent(toDate ? "" + toDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_GetDeploymentStatistics(_response);
        });
    }

    protected processDeployments_GetDeploymentStatistics(response: Response): Promise<types.DeploymentStatisticsDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.DeploymentStatisticsDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.DeploymentStatisticsDtoApiResponse>(null as any);
    }

    /**
     * Rollback to previous deployment
     * @param body (optional) 
     * @return OK
     */
    deployments_RollbackDeployment(programId: string, body: types.RollbackRequestDto | undefined): Promise<types.ProgramDeploymentDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/rollback";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_RollbackDeployment(_response);
        });
    }

    protected processDeployments_RollbackDeployment(response: Response): Promise<types.ProgramDeploymentDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ProgramDeploymentDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ProgramDeploymentDtoApiResponse>(null as any);
    }

    /**
     * Get deployment environment variables
     * @return OK
     */
    deployments_GetDeploymentEnvironment(programId: string): Promise<types.StringStringDictionaryApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/environment";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_GetDeploymentEnvironment(_response);
        });
    }

    protected processDeployments_GetDeploymentEnvironment(response: Response): Promise<types.StringStringDictionaryApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.StringStringDictionaryApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.StringStringDictionaryApiResponse>(null as any);
    }

    /**
     * Update deployment environment variables
     * @param body (optional) 
     * @return OK
     */
    deployments_UpdateDeploymentEnvironment(programId: string, body: { [key: string]: string; } | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/environment";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_UpdateDeploymentEnvironment(_response);
        });
    }

    protected processDeployments_UpdateDeploymentEnvironment(response: Response): Promise<types.BooleanApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BooleanApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BooleanApiResponse>(null as any);
    }

    /**
     * Get deployment resource usage
     * @return OK
     */
    deployments_GetDeploymentResourceUsage(programId: string): Promise<types.DeploymentResourceUsageDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/resources";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_GetDeploymentResourceUsage(_response);
        });
    }

    protected processDeployments_GetDeploymentResourceUsage(response: Response): Promise<types.DeploymentResourceUsageDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.DeploymentResourceUsageDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.DeploymentResourceUsageDtoApiResponse>(null as any);
    }

    /**
     * Test deployment connection
     * @return OK
     */
    deployments_TestDeploymentConnection(programId: string): Promise<types.ConnectionTestResultApiResponse> {
        let url_ = this.baseUrl + "/api/Deployments/programs/{programId}/test-connection";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeployments_TestDeploymentConnection(_response);
        });
    }

    protected processDeployments_TestDeploymentConnection(response: Response): Promise<types.ConnectionTestResultApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ConnectionTestResultApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ConnectionTestResultApiResponse>(null as any);
    }
}
// --- END OF FILE DeploymentsClient.ts ---