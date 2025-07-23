// --- START OF FILE WorkflowsClient.ts ---

import * as types from './types';
import * as interfaces from './interfaces';
import * as enums from './enums';
import { throwException } from './utils';

export class WorkflowsClient implements interfaces.IWorkflowsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * Get all workflows with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    workflows_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.WorkflowListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows?";
        if (pageNumber === null)
            throw new Error("The parameter 'pageNumber' cannot be null.");
        else if (pageNumber !== undefined)
            url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
        if (pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (pageSize !== undefined)
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        if (sorting_Field === undefined || sorting_Field === null)
            throw new Error("The parameter 'sorting_Field' must be defined and cannot be null.");
        else
            url_ += "Sorting.Field=" + encodeURIComponent("" + sorting_Field) + "&";
        if (sorting_Direction === null)
            throw new Error("The parameter 'sorting_Direction' cannot be null.");
        else if (sorting_Direction !== undefined)
            url_ += "Sorting.Direction=" + encodeURIComponent("" + sorting_Direction) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetAll(_response);
        });
    }

    protected processWorkflows_GetAll(response: Response): Promise<types.WorkflowListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowListDtoPagedResponseApiResponse>(null as any);
    }

    /**
     * Create a new workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_Create(body: types.WorkflowCreateDto | undefined): Promise<types.WorkflowDetailDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows";
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
            return this.processWorkflows_Create(_response);
        });
    }

    protected processWorkflows_Create(response: Response): Promise<types.WorkflowDetailDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowDetailDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowDetailDtoApiResponse>(null as any);
    }

    /**
     * Get workflow by ID
     * @return OK
     */
    workflows_GetById(id: string): Promise<types.WorkflowDetailDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetById(_response);
        });
    }

    protected processWorkflows_GetById(response: Response): Promise<types.WorkflowDetailDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowDetailDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowDetailDtoApiResponse>(null as any);
    }

    /**
     * Update an existing workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_Update(id: string, body: types.WorkflowUpdateDto | undefined): Promise<types.WorkflowDetailDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}";
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
            return this.processWorkflows_Update(_response);
        });
    }

    protected processWorkflows_Update(response: Response): Promise<types.WorkflowDetailDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowDetailDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowDetailDtoApiResponse>(null as any);
    }

    /**
     * Delete a workflow
     * @return OK
     */
    workflows_Delete(id: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}";
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
            return this.processWorkflows_Delete(_response);
        });
    }

    protected processWorkflows_Delete(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get workflows by user
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    workflows_GetByUser(userId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.WorkflowListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/user/{userId}?";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        if (pageNumber === null)
            throw new Error("The parameter 'pageNumber' cannot be null.");
        else if (pageNumber !== undefined)
            url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
        if (pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (pageSize !== undefined)
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        if (sorting_Field === undefined || sorting_Field === null)
            throw new Error("The parameter 'sorting_Field' must be defined and cannot be null.");
        else
            url_ += "Sorting.Field=" + encodeURIComponent("" + sorting_Field) + "&";
        if (sorting_Direction === null)
            throw new Error("The parameter 'sorting_Direction' cannot be null.");
        else if (sorting_Direction !== undefined)
            url_ += "Sorting.Direction=" + encodeURIComponent("" + sorting_Direction) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetByUser(_response);
        });
    }

    protected processWorkflows_GetByUser(response: Response): Promise<types.WorkflowListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowListDtoPagedResponseApiResponse>(null as any);
    }

    /**
     * Get workflows by status
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    workflows_GetByStatus(status: enums.WorkflowStatus, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.WorkflowListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/status/{status}?";
        if (status === undefined || status === null)
            throw new Error("The parameter 'status' must be defined.");
        url_ = url_.replace("{status}", encodeURIComponent("" + status));
        if (pageNumber === null)
            throw new Error("The parameter 'pageNumber' cannot be null.");
        else if (pageNumber !== undefined)
            url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
        if (pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (pageSize !== undefined)
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        if (sorting_Field === undefined || sorting_Field === null)
            throw new Error("The parameter 'sorting_Field' must be defined and cannot be null.");
        else
            url_ += "Sorting.Field=" + encodeURIComponent("" + sorting_Field) + "&";
        if (sorting_Direction === null)
            throw new Error("The parameter 'sorting_Direction' cannot be null.");
        else if (sorting_Direction !== undefined)
            url_ += "Sorting.Direction=" + encodeURIComponent("" + sorting_Direction) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetByStatus(_response);
        });
    }

    protected processWorkflows_GetByStatus(response: Response): Promise<types.WorkflowListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowListDtoPagedResponseApiResponse>(null as any);
    }

    /**
     * Search workflows
     * @param searchTerm (optional) 
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    workflows_Search(searchTerm: string | undefined, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.WorkflowListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/search?";
        if (searchTerm === null)
            throw new Error("The parameter 'searchTerm' cannot be null.");
        else if (searchTerm !== undefined)
            url_ += "searchTerm=" + encodeURIComponent("" + searchTerm) + "&";
        if (pageNumber === null)
            throw new Error("The parameter 'pageNumber' cannot be null.");
        else if (pageNumber !== undefined)
            url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
        if (pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (pageSize !== undefined)
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        if (sorting_Field === undefined || sorting_Field === null)
            throw new Error("The parameter 'sorting_Field' must be defined and cannot be null.");
        else
            url_ += "Sorting.Field=" + encodeURIComponent("" + sorting_Field) + "&";
        if (sorting_Direction === null)
            throw new Error("The parameter 'sorting_Direction' cannot be null.");
        else if (sorting_Direction !== undefined)
            url_ += "Sorting.Direction=" + encodeURIComponent("" + sorting_Direction) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_Search(_response);
        });
    }

    protected processWorkflows_Search(response: Response): Promise<types.WorkflowListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowListDtoPagedResponseApiResponse>(null as any);
    }

    /**
     * Get workflow templates
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    workflows_GetTemplates(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.WorkflowListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/templates?";
        if (pageNumber === null)
            throw new Error("The parameter 'pageNumber' cannot be null.");
        else if (pageNumber !== undefined)
            url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
        if (pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (pageSize !== undefined)
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        if (sorting_Field === undefined || sorting_Field === null)
            throw new Error("The parameter 'sorting_Field' must be defined and cannot be null.");
        else
            url_ += "Sorting.Field=" + encodeURIComponent("" + sorting_Field) + "&";
        if (sorting_Direction === null)
            throw new Error("The parameter 'sorting_Direction' cannot be null.");
        else if (sorting_Direction !== undefined)
            url_ += "Sorting.Direction=" + encodeURIComponent("" + sorting_Direction) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetTemplates(_response);
        });
    }

    protected processWorkflows_GetTemplates(response: Response): Promise<types.WorkflowListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowListDtoPagedResponseApiResponse>(null as any);
    }

    /**
     * Clone a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_Clone(id: string, body: types.WorkflowCloneDto | undefined): Promise<types.WorkflowDetailDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/clone";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
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
            return this.processWorkflows_Clone(_response);
        });
    }

    protected processWorkflows_Clone(response: Response): Promise<types.WorkflowDetailDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowDetailDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowDetailDtoApiResponse>(null as any);
    }

    /**
     * Update workflow status
     * @param body (optional) 
     * @return OK
     */
    workflows_UpdateStatus(id: string, body: enums.WorkflowStatus | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/status";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_UpdateStatus(_response);
        });
    }

    protected processWorkflows_UpdateStatus(response: Response): Promise<types.BooleanApiResponse> {
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
     * Archive a workflow
     * @return OK
     */
    workflows_Archive(id: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/archive";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_Archive(_response);
        });
    }

    protected processWorkflows_Archive(response: Response): Promise<types.BooleanApiResponse> {
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
     * Restore an archived workflow
     * @return OK
     */
    workflows_Restore(id: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/restore";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_Restore(_response);
        });
    }

    protected processWorkflows_Restore(response: Response): Promise<types.BooleanApiResponse> {
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
     * Validate a workflow
     * @return OK
     */
    workflows_Validate(id: string): Promise<types.WorkflowValidationResultApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/validate";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_Validate(_response);
        });
    }

    protected processWorkflows_Validate(response: Response): Promise<types.WorkflowValidationResultApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowValidationResultApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowValidationResultApiResponse>(null as any);
    }

    /**
     * Get workflow execution plan
     * @return OK
     */
    workflows_GetExecutionPlan(id: string): Promise<types.WorkflowExecutionPlanDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/execution-plan";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetExecutionPlan(_response);
        });
    }

    protected processWorkflows_GetExecutionPlan(response: Response): Promise<types.WorkflowExecutionPlanDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowExecutionPlanDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowExecutionPlanDtoApiResponse>(null as any);
    }

    /**
     * Get workflow complexity metrics
     * @return OK
     */
    workflows_GetComplexity(id: string): Promise<types.WorkflowComplexityMetricsApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/complexity";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetComplexity(_response);
        });
    }

    protected processWorkflows_GetComplexity(response: Response): Promise<types.WorkflowComplexityMetricsApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowComplexityMetricsApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowComplexityMetricsApiResponse>(null as any);
    }

    /**
     * Execute a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_Execute(id: string, body: types.WorkflowExecutionRequest | undefined): Promise<types.WorkflowExecutionResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/execute";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
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
            return this.processWorkflows_Execute(_response);
        });
    }

    protected processWorkflows_Execute(response: Response): Promise<types.WorkflowExecutionResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowExecutionResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowExecutionResponseDtoApiResponse>(null as any);
    }

    /**
     * Get workflow execution status
     * @return OK
     */
    workflows_GetExecutionStatus(executionId: string): Promise<types.WorkflowExecutionResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/executions/{executionId}";
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
            return this.processWorkflows_GetExecutionStatus(_response);
        });
    }

    protected processWorkflows_GetExecutionStatus(response: Response): Promise<types.WorkflowExecutionResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowExecutionResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowExecutionResponseDtoApiResponse>(null as any);
    }

    /**
     * Pause a workflow execution
     * @return OK
     */
    workflows_PauseExecution(executionId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/executions/{executionId}/pause";
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
            return this.processWorkflows_PauseExecution(_response);
        });
    }

    protected processWorkflows_PauseExecution(response: Response): Promise<types.BooleanApiResponse> {
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
     * Resume a workflow execution
     * @return OK
     */
    workflows_ResumeExecution(executionId: string): Promise<types.WorkflowExecutionResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/executions/{executionId}/resume";
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
            return this.processWorkflows_ResumeExecution(_response);
        });
    }

    protected processWorkflows_ResumeExecution(response: Response): Promise<types.WorkflowExecutionResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowExecutionResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowExecutionResponseDtoApiResponse>(null as any);
    }

    /**
     * Cancel a workflow execution
     * @return OK
     */
    workflows_CancelExecution(executionId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/executions/{executionId}/cancel";
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
            return this.processWorkflows_CancelExecution(_response);
        });
    }

    protected processWorkflows_CancelExecution(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get all node outputs from a workflow execution
     * @return OK
     */
    workflows_GetExecutionOutputs(executionId: string): Promise<types.StringWorkflowDataContractDtoDictionaryApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/executions/{executionId}/outputs";
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
            return this.processWorkflows_GetExecutionOutputs(_response);
        });
    }

    protected processWorkflows_GetExecutionOutputs(response: Response): Promise<types.StringWorkflowDataContractDtoDictionaryApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.StringWorkflowDataContractDtoDictionaryApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.StringWorkflowDataContractDtoDictionaryApiResponse>(null as any);
    }

    /**
     * Get specific node output from a workflow execution
     * @return OK
     */
    workflows_GetNodeOutput(executionId: string, nodeId: string): Promise<types.WorkflowDataContractDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/executions/{executionId}/outputs/{nodeId}";
        if (executionId === undefined || executionId === null)
            throw new Error("The parameter 'executionId' must be defined.");
        url_ = url_.replace("{executionId}", encodeURIComponent("" + executionId));
        if (nodeId === undefined || nodeId === null)
            throw new Error("The parameter 'nodeId' must be defined.");
        url_ = url_.replace("{nodeId}", encodeURIComponent("" + nodeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetNodeOutput(_response);
        });
    }

    protected processWorkflows_GetNodeOutput(response: Response): Promise<types.WorkflowDataContractDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowDataContractDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowDataContractDtoApiResponse>(null as any);
    }

    /**
     * Get execution statistics
     * @return OK
     */
    workflows_GetExecutionStatistics(executionId: string): Promise<types.WorkflowExecutionStatisticsResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/executions/{executionId}/statistics";
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
            return this.processWorkflows_GetExecutionStatistics(_response);
        });
    }

    protected processWorkflows_GetExecutionStatistics(response: Response): Promise<types.WorkflowExecutionStatisticsResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowExecutionStatisticsResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowExecutionStatisticsResponseDtoApiResponse>(null as any);
    }

    /**
     * Get execution logs
     * @param skip (optional) 
     * @param take (optional) 
     * @return OK
     */
    workflows_GetExecutionLogs(executionId: string, skip: number | undefined, take: number | undefined): Promise<types.WorkflowExecutionLogResponseDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/executions/{executionId}/logs?";
        if (executionId === undefined || executionId === null)
            throw new Error("The parameter 'executionId' must be defined.");
        url_ = url_.replace("{executionId}", encodeURIComponent("" + executionId));
        if (skip === null)
            throw new Error("The parameter 'skip' cannot be null.");
        else if (skip !== undefined)
            url_ += "skip=" + encodeURIComponent("" + skip) + "&";
        if (take === null)
            throw new Error("The parameter 'take' cannot be null.");
        else if (take !== undefined)
            url_ += "take=" + encodeURIComponent("" + take) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetExecutionLogs(_response);
        });
    }

    protected processWorkflows_GetExecutionLogs(response: Response): Promise<types.WorkflowExecutionLogResponseDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowExecutionLogResponseDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowExecutionLogResponseDtoListApiResponse>(null as any);
    }

    /**
     * Add a node to a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_AddNode(id: string, body: types.WorkflowNodeCreateDto | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/nodes";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
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
            return this.processWorkflows_AddNode(_response);
        });
    }

    protected processWorkflows_AddNode(response: Response): Promise<types.BooleanApiResponse> {
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
     * Update a node in a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_UpdateNode(id: string, nodeId: string, body: types.WorkflowNodeUpdateDto | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/nodes/{nodeId}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (nodeId === undefined || nodeId === null)
            throw new Error("The parameter 'nodeId' must be defined.");
        url_ = url_.replace("{nodeId}", encodeURIComponent("" + nodeId));
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
            return this.processWorkflows_UpdateNode(_response);
        });
    }

    protected processWorkflows_UpdateNode(response: Response): Promise<types.BooleanApiResponse> {
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
     * Remove a node from a workflow
     * @return OK
     */
    workflows_RemoveNode(id: string, nodeId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/nodes/{nodeId}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (nodeId === undefined || nodeId === null)
            throw new Error("The parameter 'nodeId' must be defined.");
        url_ = url_.replace("{nodeId}", encodeURIComponent("" + nodeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_RemoveNode(_response);
        });
    }

    protected processWorkflows_RemoveNode(response: Response): Promise<types.BooleanApiResponse> {
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
     * Execute a specific node in a workflow execution
     * @return OK
     */
    workflows_ExecuteNode(executionId: string, nodeId: string): Promise<types.NodeExecutionResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/executions/{executionId}/nodes/{nodeId}/execute";
        if (executionId === undefined || executionId === null)
            throw new Error("The parameter 'executionId' must be defined.");
        url_ = url_.replace("{executionId}", encodeURIComponent("" + executionId));
        if (nodeId === undefined || nodeId === null)
            throw new Error("The parameter 'nodeId' must be defined.");
        url_ = url_.replace("{nodeId}", encodeURIComponent("" + nodeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_ExecuteNode(_response);
        });
    }

    protected processWorkflows_ExecuteNode(response: Response): Promise<types.NodeExecutionResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.NodeExecutionResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.NodeExecutionResponseDtoApiResponse>(null as any);
    }

    /**
     * Retry a failed node in a workflow execution
     * @return OK
     */
    workflows_RetryNode(executionId: string, nodeId: string): Promise<types.NodeExecutionResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/executions/{executionId}/nodes/{nodeId}/retry";
        if (executionId === undefined || executionId === null)
            throw new Error("The parameter 'executionId' must be defined.");
        url_ = url_.replace("{executionId}", encodeURIComponent("" + executionId));
        if (nodeId === undefined || nodeId === null)
            throw new Error("The parameter 'nodeId' must be defined.");
        url_ = url_.replace("{nodeId}", encodeURIComponent("" + nodeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_RetryNode(_response);
        });
    }

    protected processWorkflows_RetryNode(response: Response): Promise<types.NodeExecutionResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.NodeExecutionResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.NodeExecutionResponseDtoApiResponse>(null as any);
    }

    /**
     * Skip a node in a workflow execution
     * @param body (optional) 
     * @return OK
     */
    workflows_SkipNode(executionId: string, nodeId: string, body: string | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/executions/{executionId}/nodes/{nodeId}/skip";
        if (executionId === undefined || executionId === null)
            throw new Error("The parameter 'executionId' must be defined.");
        url_ = url_.replace("{executionId}", encodeURIComponent("" + executionId));
        if (nodeId === undefined || nodeId === null)
            throw new Error("The parameter 'nodeId' must be defined.");
        url_ = url_.replace("{nodeId}", encodeURIComponent("" + nodeId));
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
            return this.processWorkflows_SkipNode(_response);
        });
    }

    protected processWorkflows_SkipNode(response: Response): Promise<types.BooleanApiResponse> {
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
     * Add an edge to a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_AddEdge(id: string, body: types.WorkflowEdgeCreateDto | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/edges";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
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
            return this.processWorkflows_AddEdge(_response);
        });
    }

    protected processWorkflows_AddEdge(response: Response): Promise<types.BooleanApiResponse> {
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
     * Update an edge in a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_UpdateEdge(id: string, edgeId: string, body: types.WorkflowEdgeUpdateDto | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/edges/{edgeId}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (edgeId === undefined || edgeId === null)
            throw new Error("The parameter 'edgeId' must be defined.");
        url_ = url_.replace("{edgeId}", encodeURIComponent("" + edgeId));
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
            return this.processWorkflows_UpdateEdge(_response);
        });
    }

    protected processWorkflows_UpdateEdge(response: Response): Promise<types.BooleanApiResponse> {
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
     * Remove an edge from a workflow
     * @return OK
     */
    workflows_RemoveEdge(id: string, edgeId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/edges/{edgeId}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (edgeId === undefined || edgeId === null)
            throw new Error("The parameter 'edgeId' must be defined.");
        url_ = url_.replace("{edgeId}", encodeURIComponent("" + edgeId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_RemoveEdge(_response);
        });
    }

    protected processWorkflows_RemoveEdge(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get workflow statistics
     * @return OK
     */
    workflows_GetStatistics(id: string): Promise<types.WorkflowStatisticsDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/statistics";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetStatistics(_response);
        });
    }

    protected processWorkflows_GetStatistics(response: Response): Promise<types.WorkflowStatisticsDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowStatisticsDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowStatisticsDtoApiResponse>(null as any);
    }

    /**
     * Get workflow execution history
     * @param limit (optional) 
     * @return OK
     */
    workflows_GetExecutionHistory(id: string, limit: number | undefined): Promise<types.WorkflowExecutionSummaryDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/executions?";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
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
            return this.processWorkflows_GetExecutionHistory(_response);
        });
    }

    protected processWorkflows_GetExecutionHistory(response: Response): Promise<types.WorkflowExecutionSummaryDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowExecutionSummaryDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowExecutionSummaryDtoListApiResponse>(null as any);
    }

    /**
     * Get all active executions
     * @return OK
     */
    workflows_GetActiveExecutions(): Promise<types.WorkflowExecutionResponseDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/executions/active";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetActiveExecutions(_response);
        });
    }

    protected processWorkflows_GetActiveExecutions(response: Response): Promise<types.WorkflowExecutionResponseDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowExecutionResponseDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowExecutionResponseDtoListApiResponse>(null as any);
    }

    /**
     * Get workflow permissions
     * @return OK
     */
    workflows_GetPermissions(id: string): Promise<types.WorkflowPermissionDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/permissions";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetPermissions(_response);
        });
    }

    protected processWorkflows_GetPermissions(response: Response): Promise<types.WorkflowPermissionDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowPermissionDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowPermissionDtoApiResponse>(null as any);
    }

    /**
     * Update workflow permissions
     * @param body (optional) 
     * @return OK
     */
    workflows_UpdatePermissions(id: string, body: types.WorkflowPermissionUpdateDto | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/permissions";
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
            return this.processWorkflows_UpdatePermissions(_response);
        });
    }

    protected processWorkflows_UpdatePermissions(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get all workflow tags
     * @return OK
     */
    workflows_GetTags(): Promise<types.StringListApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/tags";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetTags(_response);
        });
    }

    protected processWorkflows_GetTags(response: Response): Promise<types.StringListApiResponse> {
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
     * Get workflows by tag
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    workflows_GetByTag(tag: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.WorkflowListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/tags/{tag}?";
        if (tag === undefined || tag === null)
            throw new Error("The parameter 'tag' must be defined.");
        url_ = url_.replace("{tag}", encodeURIComponent("" + tag));
        if (pageNumber === null)
            throw new Error("The parameter 'pageNumber' cannot be null.");
        else if (pageNumber !== undefined)
            url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
        if (pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (pageSize !== undefined)
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        if (sorting_Field === undefined || sorting_Field === null)
            throw new Error("The parameter 'sorting_Field' must be defined and cannot be null.");
        else
            url_ += "Sorting.Field=" + encodeURIComponent("" + sorting_Field) + "&";
        if (sorting_Direction === null)
            throw new Error("The parameter 'sorting_Direction' cannot be null.");
        else if (sorting_Direction !== undefined)
            url_ += "Sorting.Direction=" + encodeURIComponent("" + sorting_Direction) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_GetByTag(_response);
        });
    }

    protected processWorkflows_GetByTag(response: Response): Promise<types.WorkflowListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowListDtoPagedResponseApiResponse>(null as any);
    }

    /**
     * Export a workflow
     * @param format (optional) 
     * @return OK
     */
    workflows_Export(id: string, format: string | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/{id}/export?";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (format === null)
            throw new Error("The parameter 'format' cannot be null.");
        else if (format !== undefined)
            url_ += "format=" + encodeURIComponent("" + format) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWorkflows_Export(_response);
        });
    }

    protected processWorkflows_Export(response: Response): Promise<types.BooleanApiResponse> {
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
     * Import a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_Import(body: types.WorkflowImportDto | undefined): Promise<types.WorkflowDetailDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Workflows/import";
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
            return this.processWorkflows_Import(_response);
        });
    }

    protected processWorkflows_Import(response: Response): Promise<types.WorkflowDetailDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.WorkflowDetailDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.WorkflowDetailDtoApiResponse>(null as any);
    }
}
// --- END OF FILE WorkflowsClient.ts ---