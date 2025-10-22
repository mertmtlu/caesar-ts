// --- START OF FILE AIAssistantClient.ts ---

import * as types from './types';
import * as interfaces from './interfaces';
import * as enums from './enums';
import { throwException } from './utils';

export class AIAssistantClient implements interfaces.IAIAssistantClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * Converse with the AI assistant about a specific program/version.
    The AI can suggest file modifications, answer questions, and provide guidance.
     * @param body (optional) Conversation request containing user prompt, history, and target program/version
     * @return OK
     */
    aIAssistant_Converse(body: types.AIConversationRequestDto | undefined): Promise<types.AIConversationResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/ai/converse";
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
            return this.processAIAssistant_Converse(_response);
        });
    }

    protected processAIAssistant_Converse(response: Response): Promise<types.AIConversationResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.AIConversationResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = types.ProblemDetails.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
            });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
            let result401: any = null;
            let resultData401 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result401 = types.ProblemDetails.fromJS(resultData401);
            return throwException("Unauthorized", status, _responseText, _headers, result401);
            });
        } else if (status === 403) {
            return response.text().then((_responseText) => {
            let result403: any = null;
            let resultData403 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result403 = types.ProblemDetails.fromJS(resultData403);
            return throwException("Forbidden", status, _responseText, _headers, result403);
            });
        } else if (status === 500) {
            return response.text().then((_responseText) => {
            return throwException("Internal Server Error", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.AIConversationResponseDtoApiResponse>(null as any);
    }

    /**
     * Get suggested prompts based on current project context
     * @param programId Program ID
     * @return OK
     */
    aIAssistant_GetSuggestedPrompts(programId: string): Promise<types.StringListApiResponse> {
        let url_ = this.baseUrl + "/api/ai/suggestions/{programId}";
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
            return this.processAIAssistant_GetSuggestedPrompts(_response);
        });
    }

    protected processAIAssistant_GetSuggestedPrompts(response: Response): Promise<types.StringListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.StringListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = types.ProblemDetails.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
            });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
            let result401: any = null;
            let resultData401 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result401 = types.ProblemDetails.fromJS(resultData401);
            return throwException("Unauthorized", status, _responseText, _headers, result401);
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
        } else if (status === 500) {
            return response.text().then((_responseText) => {
            return throwException("Internal Server Error", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.StringListApiResponse>(null as any);
    }
}
// --- END OF FILE AIAssistantClient.ts ---