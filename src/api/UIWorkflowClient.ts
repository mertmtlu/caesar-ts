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
     * Gets all pending UI interactions for the current user
     * @return OK
     */
    uIWorkflow_GetPendingUIInteractions(): Promise<types.UIInteractionSessionListApiResponseApiResponse> {
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

    protected processUIWorkflow_GetPendingUIInteractions(response: Response): Promise<types.UIInteractionSessionListApiResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UIInteractionSessionListApiResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UIInteractionSessionListApiResponseApiResponse>(null as any);
    }

    /**
     * Gets all UI interactions for a specific workflow execution
     * @param workflowId The workflow ID
     * @param executionId The execution ID
     * @return OK
     */
    uIWorkflow_GetWorkflowUIInteractions(workflowId: string, executionId: string): Promise<types.UIInteractionSessionListApiResponseApiResponse> {
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

    protected processUIWorkflow_GetWorkflowUIInteractions(response: Response): Promise<types.UIInteractionSessionListApiResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UIInteractionSessionListApiResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UIInteractionSessionListApiResponseApiResponse>(null as any);
    }

    /**
     * Gets details of a specific UI interaction
     * @param interactionId The interaction ID
     * @return OK
     */
    uIWorkflow_GetUIInteraction(interactionId: string): Promise<types.UIInteractionDetailApiResponseApiResponse> {
        let url_ = this.baseUrl + "/api/UIWorkflow/interactions/{interactionId}";
        if (interactionId === undefined || interactionId === null)
            throw new Error("The parameter 'interactionId' must be defined.");
        url_ = url_.replace("{interactionId}", encodeURIComponent("" + interactionId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUIWorkflow_GetUIInteraction(_response);
        });
    }

    protected processUIWorkflow_GetUIInteraction(response: Response): Promise<types.UIInteractionDetailApiResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UIInteractionDetailApiResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UIInteractionDetailApiResponseApiResponse>(null as any);
    }

    /**
     * Submits a response to a UI interaction
     * @param interactionId The interaction ID
     * @param body (optional) The submission request
     * @return OK
     */
    uIWorkflow_SubmitUIInteraction(interactionId: string, body: types.UIInteractionSubmissionRequest | undefined): Promise<types.StringApiResponse> {
        let url_ = this.baseUrl + "/api/UIWorkflow/interactions/{interactionId}/submit";
        if (interactionId === undefined || interactionId === null)
            throw new Error("The parameter 'interactionId' must be defined.");
        url_ = url_.replace("{interactionId}", encodeURIComponent("" + interactionId));
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

    protected processUIWorkflow_SubmitUIInteraction(response: Response): Promise<types.StringApiResponse> {
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
     * Cancels a UI interaction
     * @param interactionId The interaction ID
     * @param body (optional) 
     * @return OK
     */
    uIWorkflow_CancelUIInteraction(interactionId: string, body: types.CancelUIInteractionRequest | undefined): Promise<types.StringApiResponse> {
        let url_ = this.baseUrl + "/api/UIWorkflow/interactions/{interactionId}/cancel";
        if (interactionId === undefined || interactionId === null)
            throw new Error("The parameter 'interactionId' must be defined.");
        url_ = url_.replace("{interactionId}", encodeURIComponent("" + interactionId));
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
     * Gets all active UI interactions (admin endpoint)
     * @return OK
     */
    uIWorkflow_GetActiveUIInteractions(): Promise<types.UIInteractionSessionListApiResponseApiResponse> {
        let url_ = this.baseUrl + "/api/UIWorkflow/active";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUIWorkflow_GetActiveUIInteractions(_response);
        });
    }

    protected processUIWorkflow_GetActiveUIInteractions(response: Response): Promise<types.UIInteractionSessionListApiResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UIInteractionSessionListApiResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UIInteractionSessionListApiResponseApiResponse>(null as any);
    }

    /**
     * Processes timed out interactions (admin endpoint)
     * @return OK
     */
    uIWorkflow_ProcessTimedOutInteractions(): Promise<types.StringApiResponse> {
        let url_ = this.baseUrl + "/api/UIWorkflow/process-timeouts";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUIWorkflow_ProcessTimedOutInteractions(_response);
        });
    }

    protected processUIWorkflow_ProcessTimedOutInteractions(response: Response): Promise<types.StringApiResponse> {
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
}
// --- END OF FILE UIWorkflowClient.ts ---