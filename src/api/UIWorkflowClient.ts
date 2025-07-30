// --- START OF FILE UIWorkflowClient.ts ---

import * as types from './types';
import * as interfaces from './interfaces';
import * as enums from './enums';
import { throwException } from './utils';

export class UIWorkflowClient implements interfaces.IUIWorkflowClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * Get pending UI interactions for the current user
     * @return OK
     */
    uIWorkflow_GetPendingUIInteractions(): Promise<types.UIInteractionSessionListApiResponse> {
        let url_ = this.baseUrl + "/api/UIWorkflow/pending";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUIWorkflow_GetPendingUIInteractions(_response);
        });
    }

    protected processUIWorkflow_GetPendingUIInteractions(response: Response): Promise<types.UIInteractionSessionListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UIInteractionSessionListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UIInteractionSessionListApiResponse>(null as any);
    }

    /**
     * Get a specific UI interaction session
     * @return OK
     */
    uIWorkflow_GetUIInteractionSession(sessionId: string): Promise<types.UIInteractionSessionApiResponse> {
        let url_ = this.baseUrl + "/api/UIWorkflow/sessions/{sessionId}";
        if (sessionId === undefined || sessionId === null)
            throw new Error("The parameter 'sessionId' must be defined.");
        url_ = url_.replace("{sessionId}", encodeURIComponent("" + sessionId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUIWorkflow_GetUIInteractionSession(_response);
        });
    }

    protected processUIWorkflow_GetUIInteractionSession(response: Response): Promise<types.UIInteractionSessionApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UIInteractionSessionApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UIInteractionSessionApiResponse>(null as any);
    }

    /**
     * Submit UI interaction data
     * @param body (optional) 
     * @return OK
     */
    uIWorkflow_SubmitUIInteraction(sessionId: string, body: types.BsonElement[] | undefined): Promise<types.UIInteractionResultApiResponse> {
        let url_ = this.baseUrl + "/api/UIWorkflow/sessions/{sessionId}/submit";
        if (sessionId === undefined || sessionId === null)
            throw new Error("The parameter 'sessionId' must be defined.");
        url_ = url_.replace("{sessionId}", encodeURIComponent("" + sessionId));
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
            return this.processUIWorkflow_SubmitUIInteraction(_response);
        });
    }

    protected processUIWorkflow_SubmitUIInteraction(response: Response): Promise<types.UIInteractionResultApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UIInteractionResultApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UIInteractionResultApiResponse>(null as any);
    }

    /**
     * Skip UI interaction (if allowed)
     * @return OK
     */
    uIWorkflow_SkipUIInteraction(sessionId: string): Promise<types.UIInteractionResultApiResponse> {
        let url_ = this.baseUrl + "/api/UIWorkflow/sessions/{sessionId}/skip";
        if (sessionId === undefined || sessionId === null)
            throw new Error("The parameter 'sessionId' must be defined.");
        url_ = url_.replace("{sessionId}", encodeURIComponent("" + sessionId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUIWorkflow_SkipUIInteraction(_response);
        });
    }

    protected processUIWorkflow_SkipUIInteraction(response: Response): Promise<types.UIInteractionResultApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UIInteractionResultApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UIInteractionResultApiResponse>(null as any);
    }

    /**
     * Cancel UI interaction
     * @param body (optional) 
     * @return OK
     */
    uIWorkflow_CancelUIInteraction(sessionId: string, body: types.CancelUIInteractionRequest | undefined): Promise<types.StringApiResponse> {
        let url_ = this.baseUrl + "/api/UIWorkflow/sessions/{sessionId}/cancel";
        if (sessionId === undefined || sessionId === null)
            throw new Error("The parameter 'sessionId' must be defined.");
        url_ = url_.replace("{sessionId}", encodeURIComponent("" + sessionId));
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
            return this.processUIWorkflow_CancelUIInteraction(_response);
        });
    }

    protected processUIWorkflow_CancelUIInteraction(response: Response): Promise<types.StringApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.StringApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.StringApiResponse>(null as any);
    }

    /**
     * Get UI interaction status for a workflow execution
     * @return OK
     */
    uIWorkflow_GetWorkflowUIInteractions(workflowId: string, executionId: string): Promise<types.UIInteractionSessionListApiResponse> {
        let url_ = this.baseUrl + "/api/UIWorkflow/workflows/{workflowId}/executions/{executionId}/ui-interactions";
        if (workflowId === undefined || workflowId === null)
            throw new Error("The parameter 'workflowId' must be defined.");
        url_ = url_.replace("{workflowId}", encodeURIComponent("" + workflowId));
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
            return this.processUIWorkflow_GetWorkflowUIInteractions(_response);
        });
    }

    protected processUIWorkflow_GetWorkflowUIInteractions(response: Response): Promise<types.UIInteractionSessionListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UIInteractionSessionListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UIInteractionSessionListApiResponse>(null as any);
    }
}
// --- END OF FILE UIWorkflowClient.ts ---