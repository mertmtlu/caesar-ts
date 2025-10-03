// --- START OF FILE DemoShowcaseClient.ts ---

import * as types from './types';
import * as interfaces from './interfaces';
import * as enums from './enums';
import { throwException } from './utils';

export class DemoShowcaseClient implements interfaces.IDemoShowcaseClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * Get all demo showcases with nested 3-level grouping structure (Tab -> PrimaryGroup -> SecondaryGroup)
     * @return OK
     */
    demoShowcase_GetPublicShowcase(): Promise<types.PublicDemoShowcaseResponseApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_GetPublicShowcase(_response);
        });
    }

    protected processDemoShowcase_GetPublicShowcase(response: Response): Promise<types.PublicDemoShowcaseResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.PublicDemoShowcaseResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.PublicDemoShowcaseResponseApiResponse>(null as any);
    }

    /**
     * Create a new demo showcase entry
     * @param body (optional) 
     * @return OK
     */
    demoShowcase_Create(body: types.DemoShowcaseCreateDto | undefined): Promise<types.DemoShowcaseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase";
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
            return this.processDemoShowcase_Create(_response);
        });
    }

    protected processDemoShowcase_Create(response: Response): Promise<types.DemoShowcaseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.DemoShowcaseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.DemoShowcaseDtoApiResponse>(null as any);
    }

    /**
     * Get public UI component schema/configuration for a specific app
     * @return OK
     */
    demoShowcase_GetPublicUiComponent(appId: string): Promise<types.UiComponentResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/ui-component/{appId}";
        if (appId === undefined || appId === null)
            throw new Error("The parameter 'appId' must be defined.");
        url_ = url_.replace("{appId}", encodeURIComponent("" + appId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_GetPublicUiComponent(_response);
        });
    }

    protected processDemoShowcase_GetPublicUiComponent(response: Response): Promise<types.UiComponentResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status === 403) {
            return response.text().then((_responseText) => {
            let result403: any = null;
            let resultData403 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result403 = types.ProblemDetails.fromJS(resultData403);
            return throwException("Forbidden", status, _responseText, _headers, result403);
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = types.ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentResponseDtoApiResponse>(null as any);
    }

    /**
     * Execute a public app with provided inputs (uses system user)
     * @param body (optional) 
     * @return OK
     */
    demoShowcase_ExecutePublicApp(appId: string, body: types.ExecutionRequestDto | undefined): Promise<types.ExecutionResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/execute/{appId}";
        if (appId === undefined || appId === null)
            throw new Error("The parameter 'appId' must be defined.");
        url_ = url_.replace("{appId}", encodeURIComponent("" + appId));
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
            return this.processDemoShowcase_ExecutePublicApp(_response);
        });
    }

    protected processDemoShowcase_ExecutePublicApp(response: Response): Promise<types.ExecutionResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ExecutionResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status === 403) {
            return response.text().then((_responseText) => {
            let result403: any = null;
            let resultData403 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result403 = types.ProblemDetails.fromJS(resultData403);
            return throwException("Forbidden", status, _responseText, _headers, result403);
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = types.ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ExecutionResponseDtoApiResponse>(null as any);
    }

    /**
     * Get all demo showcases with associated app details (public - legacy)
     * @return OK
     */
    demoShowcase_GetAllLegacy(): Promise<types.DemoShowcasePublicDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/legacy";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_GetAllLegacy(_response);
        });
    }

    protected processDemoShowcase_GetAllLegacy(response: Response): Promise<types.DemoShowcasePublicDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.DemoShowcasePublicDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.DemoShowcasePublicDtoListApiResponse>(null as any);
    }

    /**
     * Launch a remote app with optional SSO credentials
     * @return OK
     */
    demoShowcase_LaunchRemoteApp(appId: string): Promise<types.RemoteAppLaunchResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/remoteapp/{appId}/launch";
        if (appId === undefined || appId === null)
            throw new Error("The parameter 'appId' must be defined.");
        url_ = url_.replace("{appId}", encodeURIComponent("" + appId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_LaunchRemoteApp(_response);
        });
    }

    protected processDemoShowcase_LaunchRemoteApp(response: Response): Promise<types.RemoteAppLaunchResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.RemoteAppLaunchResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status === 403) {
            return response.text().then((_responseText) => {
            let result403: any = null;
            let resultData403 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result403 = types.ProblemDetails.fromJS(resultData403);
            return throwException("Forbidden", status, _responseText, _headers, result403);
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = types.ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.RemoteAppLaunchResponseDtoApiResponse>(null as any);
    }

    /**
     * Get public execution status and details
     * @return OK
     */
    demoShowcase_GetPublicExecutionStatus(executionId: string): Promise<types.PublicExecutionDetailDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/execution/{executionId}/status";
        if (executionId === undefined || executionId === null)
            throw new Error("The parameter 'executionId' must be defined.");
        url_ = url_.replace("{executionId}", encodeURIComponent("" + executionId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_GetPublicExecutionStatus(_response);
        });
    }

    protected processDemoShowcase_GetPublicExecutionStatus(response: Response): Promise<types.PublicExecutionDetailDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.PublicExecutionDetailDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
            let result401: any = null;
            let resultData401 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result401 = types.ProblemDetails.fromJS(resultData401);
            return throwException("Unauthorized", status, _responseText, _headers, result401);
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = types.ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.PublicExecutionDetailDtoApiResponse>(null as any);
    }

    /**
     * Get public execution logs
     * @param lines (optional) 
     * @return OK
     */
    demoShowcase_GetPublicExecutionLogs(executionId: string, lines: number | undefined): Promise<types.PublicExecutionLogsDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/execution/{executionId}/logs?";
        if (executionId === undefined || executionId === null)
            throw new Error("The parameter 'executionId' must be defined.");
        url_ = url_.replace("{executionId}", encodeURIComponent("" + executionId));
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
            return this.processDemoShowcase_GetPublicExecutionLogs(_response);
        });
    }

    protected processDemoShowcase_GetPublicExecutionLogs(response: Response): Promise<types.PublicExecutionLogsDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.PublicExecutionLogsDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
            let result401: any = null;
            let resultData401 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result401 = types.ProblemDetails.fromJS(resultData401);
            return throwException("Unauthorized", status, _responseText, _headers, result401);
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = types.ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.PublicExecutionLogsDtoApiResponse>(null as any);
    }

    /**
     * List public execution output files
     * @return OK
     */
    demoShowcase_GetPublicExecutionFiles(executionId: string): Promise<types.PublicExecutionFilesDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/execution/{executionId}/files";
        if (executionId === undefined || executionId === null)
            throw new Error("The parameter 'executionId' must be defined.");
        url_ = url_.replace("{executionId}", encodeURIComponent("" + executionId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_GetPublicExecutionFiles(_response);
        });
    }

    protected processDemoShowcase_GetPublicExecutionFiles(response: Response): Promise<types.PublicExecutionFilesDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.PublicExecutionFilesDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
            let result401: any = null;
            let resultData401 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result401 = types.ProblemDetails.fromJS(resultData401);
            return throwException("Unauthorized", status, _responseText, _headers, result401);
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = types.ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.PublicExecutionFilesDtoApiResponse>(null as any);
    }

    /**
     * Download a single output file from public execution
     * @return OK
     */
    demoShowcase_DownloadPublicExecutionFile(executionId: string, filePath: string): Promise<types.VersionFileDetailDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/execution/{executionId}/files/download/{filePath}";
        if (executionId === undefined || executionId === null)
            throw new Error("The parameter 'executionId' must be defined.");
        url_ = url_.replace("{executionId}", encodeURIComponent("" + executionId));
        if (filePath === undefined || filePath === null)
            throw new Error("The parameter 'filePath' must be defined.");
        url_ = url_.replace("{filePath}", encodeURIComponent("" + filePath));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_DownloadPublicExecutionFile(_response);
        });
    }

    protected processDemoShowcase_DownloadPublicExecutionFile(response: Response): Promise<types.VersionFileDetailDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionFileDetailDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
            let result401: any = null;
            let resultData401 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result401 = types.ProblemDetails.fromJS(resultData401);
            return throwException("Unauthorized", status, _responseText, _headers, result401);
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = types.ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionFileDetailDtoApiResponse>(null as any);
    }

    /**
     * Download all output files from public execution as ZIP
     * @return OK
     */
    demoShowcase_DownloadAllPublicExecutionFiles(executionId: string): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/execution/{executionId}/files/download-all";
        if (executionId === undefined || executionId === null)
            throw new Error("The parameter 'executionId' must be defined.");
        url_ = url_.replace("{executionId}", encodeURIComponent("" + executionId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_DownloadAllPublicExecutionFiles(_response);
        });
    }

    protected processDemoShowcase_DownloadAllPublicExecutionFiles(response: Response): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
            let result401: any = null;
            let resultData401 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result401 = types.ProblemDetails.fromJS(resultData401);
            return throwException("Unauthorized", status, _responseText, _headers, result401);
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = types.ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    /**
     * Get detailed execution information with resource usage and results
     * @return OK
     */
    demoShowcase_GetPublicExecutionDetails(executionId: string): Promise<types.PublicExecutionDetailExtendedDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/execution/{executionId}/details";
        if (executionId === undefined || executionId === null)
            throw new Error("The parameter 'executionId' must be defined.");
        url_ = url_.replace("{executionId}", encodeURIComponent("" + executionId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_GetPublicExecutionDetails(_response);
        });
    }

    protected processDemoShowcase_GetPublicExecutionDetails(response: Response): Promise<types.PublicExecutionDetailExtendedDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.PublicExecutionDetailExtendedDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
            let result401: any = null;
            let resultData401 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result401 = types.ProblemDetails.fromJS(resultData401);
            return throwException("Unauthorized", status, _responseText, _headers, result401);
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = types.ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.PublicExecutionDetailExtendedDtoApiResponse>(null as any);
    }

    /**
     * Stop a running public execution
     * @return OK
     */
    demoShowcase_StopPublicExecution(executionId: string): Promise<types.ExecutionStopResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/execution/{executionId}/stop";
        if (executionId === undefined || executionId === null)
            throw new Error("The parameter 'executionId' must be defined.");
        url_ = url_.replace("{executionId}", encodeURIComponent("" + executionId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_StopPublicExecution(_response);
        });
    }

    protected processDemoShowcase_StopPublicExecution(response: Response): Promise<types.ExecutionStopResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ExecutionStopResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
            let result401: any = null;
            let resultData401 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result401 = types.ProblemDetails.fromJS(resultData401);
            return throwException("Unauthorized", status, _responseText, _headers, result401);
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = types.ProblemDetails.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ExecutionStopResponseDtoApiResponse>(null as any);
    }

    /**
     * Get all demo showcases for admin (raw data)
     * @return OK
     */
    demoShowcase_GetAllAdmin(): Promise<types.DemoShowcaseDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/admin";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_GetAllAdmin(_response);
        });
    }

    protected processDemoShowcase_GetAllAdmin(response: Response): Promise<types.DemoShowcaseDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.DemoShowcaseDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.DemoShowcaseDtoListApiResponse>(null as any);
    }

    /**
     * Update a demo showcase entry
     * @param body (optional) 
     * @return OK
     */
    demoShowcase_Update(id: string, body: types.DemoShowcaseUpdateDto | undefined): Promise<types.DemoShowcaseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
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
            return this.processDemoShowcase_Update(_response);
        });
    }

    protected processDemoShowcase_Update(response: Response): Promise<types.DemoShowcaseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.DemoShowcaseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.DemoShowcaseDtoApiResponse>(null as any);
    }

    /**
     * Delete a demo showcase entry
     * @return OK
     */
    demoShowcase_Delete(id: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_Delete(_response);
        });
    }

    protected processDemoShowcase_Delete(response: Response): Promise<types.BooleanApiResponse> {
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
     * Upload a video file and return its path
     * @param file (optional) 
     * @return OK
     */
    demoShowcase_UploadVideo(file: types.FileParameter | undefined): Promise<types.VideoUploadResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/upload-video";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = new FormData();
        if (file === null || file === undefined)
            throw new Error("The parameter 'file' cannot be null.");
        else
            content_.append("file", file.data, file.fileName ? file.fileName : "file");

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_UploadVideo(_response);
        });
    }

    protected processDemoShowcase_UploadVideo(response: Response): Promise<types.VideoUploadResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VideoUploadResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VideoUploadResponseDtoApiResponse>(null as any);
    }

    /**
     * Get all available apps for admin dropdown selector
     * @return OK
     */
    demoShowcase_GetAvailableApps(): Promise<types.AvailableAppsDtoApiResponse> {
        let url_ = this.baseUrl + "/api/DemoShowcase/available-apps";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDemoShowcase_GetAvailableApps(_response);
        });
    }

    protected processDemoShowcase_GetAvailableApps(response: Response): Promise<types.AvailableAppsDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.AvailableAppsDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.AvailableAppsDtoApiResponse>(null as any);
    }
}
// --- END OF FILE DemoShowcaseClient.ts ---