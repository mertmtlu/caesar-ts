import * as types from './types';
import * as interfaces from './interfaces';
import { throwException } from './utils';
import {
    SortDirection,
} from './enums';

export class UiComponentsClient implements interfaces.IUiComponentsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }
    /**
     * Get all UI components with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents?";
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
            return this.processUiComponents_GetAll(_response);
        });
    }
    protected processUiComponents_GetAll(response: Response): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Get UI component by ID
     * @return OK
     */
    uiComponents_GetById(id: string): Promise<types.UiComponentDetailDtoApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}";
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
            return this.processUiComponents_GetById(_response);
        });
    }
    protected processUiComponents_GetById(response: Response): Promise<types.UiComponentDetailDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentDetailDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentDetailDtoApiResponse>(null as any);
    }
    /**
     * Update UI component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_Update(id: string, body: types.UiComponentUpdateDto | undefined): Promise<types.UiComponentDtoApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}";
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
            return this.processUiComponents_Update(_response);
        });
    }
    protected processUiComponents_Update(response: Response): Promise<types.UiComponentDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentDtoApiResponse>(null as any);
    }
    /**
     * Delete UI component
     * @return OK
     */
    uiComponents_Delete(id: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}";
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
            return this.processUiComponents_Delete(_response);
        });
    }
    protected processUiComponents_Delete(response: Response): Promise<types.BooleanApiResponse> {
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
     * Create new UI component for a specific program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_Create(programId: string, versionId: string, body: types.UiComponentCreateDto | undefined): Promise<types.UiComponentDtoApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/programs/{programId}/versions/{versionId}";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
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
            return this.processUiComponents_Create(_response);
        });
    }
    protected processUiComponents_Create(response: Response): Promise<types.UiComponentDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentDtoApiResponse>(null as any);
    }
    /**
     * Get UI components for a specific program version
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByProgramVersion(programId: string, versionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/programs/{programId}/versions/{versionId}?";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
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
            return this.processUiComponents_GetByProgramVersion(_response);
        });
    }
    protected processUiComponents_GetByProgramVersion(response: Response): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Copy components from one version to another
     * @param body (optional) 
     * @return OK
     */
    uiComponents_CopyComponentsToNewVersion(programId: string, fromVersionId: string, toVersionId: string, body: string[] | undefined): Promise<types.UiComponentListDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/programs/{programId}/versions/{fromVersionId}/copy-to/{toVersionId}";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (fromVersionId === undefined || fromVersionId === null)
            throw new Error("The parameter 'fromVersionId' must be defined.");
        url_ = url_.replace("{fromVersionId}", encodeURIComponent("" + fromVersionId));
        if (toVersionId === undefined || toVersionId === null)
            throw new Error("The parameter 'toVersionId' must be defined.");
        url_ = url_.replace("{toVersionId}", encodeURIComponent("" + toVersionId));
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
            return this.processUiComponents_CopyComponentsToNewVersion(_response);
        });
    }
    protected processUiComponents_CopyComponentsToNewVersion(response: Response): Promise<types.UiComponentListDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentListDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentListDtoListApiResponse>(null as any);
    }
    /**
     * Copy a component to a different program version
     * @param newName (optional) 
     * @return OK
     */
    uiComponents_CopyComponentToVersion(componentId: string, targetProgramId: string, targetVersionId: string, newName: string | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{componentId}/copy-to/programs/{targetProgramId}/versions/{targetVersionId}?";
        if (componentId === undefined || componentId === null)
            throw new Error("The parameter 'componentId' must be defined.");
        url_ = url_.replace("{componentId}", encodeURIComponent("" + componentId));
        if (targetProgramId === undefined || targetProgramId === null)
            throw new Error("The parameter 'targetProgramId' must be defined.");
        url_ = url_.replace("{targetProgramId}", encodeURIComponent("" + targetProgramId));
        if (targetVersionId === undefined || targetVersionId === null)
            throw new Error("The parameter 'targetVersionId' must be defined.");
        url_ = url_.replace("{targetVersionId}", encodeURIComponent("" + targetVersionId));
        if (newName === null)
            throw new Error("The parameter 'newName' cannot be null.");
        else if (newName !== undefined)
            url_ += "newName=" + encodeURIComponent("" + newName) + "&";
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUiComponents_CopyComponentToVersion(_response);
        });
    }
    protected processUiComponents_CopyComponentToVersion(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get available components for a program version
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetAvailableForProgramVersion(programId: string, versionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/programs/{programId}/versions/{versionId}/available?";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
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
            return this.processUiComponents_GetAvailableForProgramVersion(_response);
        });
    }
    protected processUiComponents_GetAvailableForProgramVersion(response: Response): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Advanced UI component search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    uiComponents_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: types.UiComponentSearchDto | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/search?";
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
            return this.processUiComponents_Search(_response);
        });
    }
    protected processUiComponents_Search(response: Response): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Get UI components by program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/programs/{programId}?";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
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
            return this.processUiComponents_GetByProgram(_response);
        });
    }
    protected processUiComponents_GetByProgram(response: Response): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Get UI components by type
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByType(type: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/by-type/{type}?";
        if (type === undefined || type === null)
            throw new Error("The parameter 'type' must be defined.");
        url_ = url_.replace("{type}", encodeURIComponent("" + type));
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
            return this.processUiComponents_GetByType(_response);
        });
    }
    protected processUiComponents_GetByType(response: Response): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Get UI components by creator
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByCreator(creatorId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/by-creator/{creatorId}?";
        if (creatorId === undefined || creatorId === null)
            throw new Error("The parameter 'creatorId' must be defined.");
        url_ = url_.replace("{creatorId}", encodeURIComponent("" + creatorId));
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
            return this.processUiComponents_GetByCreator(_response);
        });
    }
    protected processUiComponents_GetByCreator(response: Response): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Get UI components by status
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/by-status/{status}?";
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
            return this.processUiComponents_GetByStatus(_response);
        });
    }
    protected processUiComponents_GetByStatus(response: Response): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Update UI component status
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateStatus(id: string, body: string | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/status";
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
            return this.processUiComponents_UpdateStatus(_response);
        });
    }
    protected processUiComponents_UpdateStatus(response: Response): Promise<types.BooleanApiResponse> {
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
     * Activate UI component
     * @return OK
     */
    uiComponents_ActivateComponent(id: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/activate";
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
            return this.processUiComponents_ActivateComponent(_response);
        });
    }
    protected processUiComponents_ActivateComponent(response: Response): Promise<types.BooleanApiResponse> {
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
     * Deactivate UI component
     * @return OK
     */
    uiComponents_DeactivateComponent(id: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/deactivate";
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
            return this.processUiComponents_DeactivateComponent(_response);
        });
    }
    protected processUiComponents_DeactivateComponent(response: Response): Promise<types.BooleanApiResponse> {
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
     * Deprecate UI component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_DeprecateComponent(id: string, body: string | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/deprecate";
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
            return this.processUiComponents_DeprecateComponent(_response);
        });
    }
    protected processUiComponents_DeprecateComponent(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get UI component bundle
     * @return OK
     */
    uiComponents_GetComponentBundle(id: string): Promise<types.UiComponentBundleDtoApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/bundle";
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
            return this.processUiComponents_GetComponentBundle(_response);
        });
    }
    protected processUiComponents_GetComponentBundle(response: Response): Promise<types.UiComponentBundleDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentBundleDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentBundleDtoApiResponse>(null as any);
    }
    /**
     * Upload UI component bundle (assets will be stored in version-specific storage)
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UploadComponentBundle(id: string, body: types.UiComponentBundleUploadDto | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/upload-bundle";
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
            return this.processUiComponents_UploadComponentBundle(_response);
        });
    }
    protected processUiComponents_UploadComponentBundle(response: Response): Promise<types.BooleanApiResponse> {
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
     * Update UI component assets
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateComponentAssets(id: string, body: types.UiComponentAssetDto[] | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/assets";
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
            return this.processUiComponents_UpdateComponentAssets(_response);
        });
    }
    protected processUiComponents_UpdateComponentAssets(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get UI component assets (retrieved from version-specific storage)
     * @return OK
     */
    uiComponents_GetComponentAssets(id: string): Promise<types.UiComponentAssetDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/assets";
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
            return this.processUiComponents_GetComponentAssets(_response);
        });
    }
    protected processUiComponents_GetComponentAssets(response: Response): Promise<types.UiComponentAssetDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentAssetDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentAssetDtoListApiResponse>(null as any);
    }
    /**
     * Get UI component configuration
     * @return OK
     */
    uiComponents_GetComponentConfiguration(id: string): Promise<types.UiComponentConfigDtoApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/configuration";
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
            return this.processUiComponents_GetComponentConfiguration(_response);
        });
    }
    protected processUiComponents_GetComponentConfiguration(response: Response): Promise<types.UiComponentConfigDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentConfigDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentConfigDtoApiResponse>(null as any);
    }
    /**
     * Update UI component configuration
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateComponentConfiguration(id: string, body: types.UiComponentConfigUpdateDto | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/configuration";
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
            return this.processUiComponents_UpdateComponentConfiguration(_response);
        });
    }
    protected processUiComponents_UpdateComponentConfiguration(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get UI component schema
     * @return OK
     */
    uiComponents_GetComponentSchema(id: string): Promise<types.UiComponentSchemaDtoApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/schema";
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
            return this.processUiComponents_GetComponentSchema(_response);
        });
    }
    protected processUiComponents_GetComponentSchema(response: Response): Promise<types.UiComponentSchemaDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentSchemaDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentSchemaDtoApiResponse>(null as any);
    }
    /**
     * Update UI component schema
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateComponentSchema(id: string, body: types.UiComponentSchemaUpdateDto | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/schema";
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
            return this.processUiComponents_UpdateComponentSchema(_response);
        });
    }
    protected processUiComponents_UpdateComponentSchema(response: Response): Promise<types.BooleanApiResponse> {
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
     * Validate UI component schema
     * @param body (optional) 
     * @return OK
     */
    uiComponents_ValidateComponentSchema(id: string, body: any | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/validate-schema";
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
            return this.processUiComponents_ValidateComponentSchema(_response);
        });
    }
    protected processUiComponents_ValidateComponentSchema(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get UI component usage
     * @return OK
     */
    uiComponents_GetComponentUsage(id: string): Promise<types.UiComponentUsageDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/usage";
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
            return this.processUiComponents_GetComponentUsage(_response);
        });
    }
    protected processUiComponents_GetComponentUsage(response: Response): Promise<types.UiComponentUsageDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentUsageDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentUsageDtoListApiResponse>(null as any);
    }
    /**
     * Get program version component mappings
     * @return OK
     */
    uiComponents_GetProgramVersionComponentMappings(programId: string, versionId: string): Promise<types.ProgramComponentMappingDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/programs/{programId}/versions/{versionId}/mappings";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUiComponents_GetProgramVersionComponentMappings(_response);
        });
    }
    protected processUiComponents_GetProgramVersionComponentMappings(response: Response): Promise<types.ProgramComponentMappingDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ProgramComponentMappingDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ProgramComponentMappingDtoListApiResponse>(null as any);
    }
    /**
     * Map component to program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_MapComponentToProgramVersion(programId: string, versionId: string, body: types.UiComponentMappingDto | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/programs/{programId}/versions/{versionId}/map";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
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
            return this.processUiComponents_MapComponentToProgramVersion(_response);
        });
    }
    protected processUiComponents_MapComponentToProgramVersion(response: Response): Promise<types.BooleanApiResponse> {
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
     * Unmap component from program version
     * @return OK
     */
    uiComponents_UnmapComponentFromProgramVersion(programId: string, versionId: string, componentId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/programs/{programId}/versions/{versionId}/unmap/{componentId}";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
        if (componentId === undefined || componentId === null)
            throw new Error("The parameter 'componentId' must be defined.");
        url_ = url_.replace("{componentId}", encodeURIComponent("" + componentId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUiComponents_UnmapComponentFromProgramVersion(_response);
        });
    }
    protected processUiComponents_UnmapComponentFromProgramVersion(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get recommended components for program version
     * @return OK
     */
    uiComponents_GetRecommendedComponents(programId: string, versionId: string): Promise<types.UiComponentRecommendationDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/programs/{programId}/versions/{versionId}/recommendations";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUiComponents_GetRecommendedComponents(_response);
        });
    }
    protected processUiComponents_GetRecommendedComponents(response: Response): Promise<types.UiComponentRecommendationDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentRecommendationDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentRecommendationDtoListApiResponse>(null as any);
    }
    /**
     * Search compatible components
     * @param body (optional) 
     * @return OK
     */
    uiComponents_SearchCompatibleComponents(body: types.UiComponentCompatibilitySearchDto | undefined): Promise<types.UiComponentListDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/search-compatible";
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
            return this.processUiComponents_SearchCompatibleComponents(_response);
        });
    }
    protected processUiComponents_SearchCompatibleComponents(response: Response): Promise<types.UiComponentListDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentListDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentListDtoListApiResponse>(null as any);
    }
    /**
     * Validate component name uniqueness for program version
     * @param excludeId (optional) 
     * @param body (optional) 
     * @return OK
     */
    uiComponents_ValidateNameUniqueForVersion(programId: string, versionId: string, excludeId: string | undefined, body: string | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/programs/{programId}/versions/{versionId}/validate-name?";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
        if (excludeId === null)
            throw new Error("The parameter 'excludeId' cannot be null.");
        else if (excludeId !== undefined)
            url_ += "excludeId=" + encodeURIComponent("" + excludeId) + "&";
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
            return this.processUiComponents_ValidateNameUniqueForVersion(_response);
        });
    }
    protected processUiComponents_ValidateNameUniqueForVersion(response: Response): Promise<types.BooleanApiResponse> {
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
     * Validate component definition for program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_ValidateComponentDefinition(programId: string, versionId: string, body: types.UiComponentCreateDto | undefined): Promise<types.UiComponentValidationResultApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/programs/{programId}/versions/{versionId}/validate-definition";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
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
            return this.processUiComponents_ValidateComponentDefinition(_response);
        });
    }
    protected processUiComponents_ValidateComponentDefinition(response: Response): Promise<types.UiComponentValidationResultApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentValidationResultApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentValidationResultApiResponse>(null as any);
    }
    /**
     * Get available component types
     * @return OK
     */
    uiComponents_GetAvailableComponentTypes(): Promise<types.StringListApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/types";
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUiComponents_GetAvailableComponentTypes(_response);
        });
    }
    protected processUiComponents_GetAvailableComponentTypes(response: Response): Promise<types.StringListApiResponse> {
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
     * Get component categories
     * @return OK
     */
    uiComponents_GetComponentCategories(): Promise<types.UiComponentCategoryDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/categories";
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUiComponents_GetComponentCategories(_response);
        });
    }
    protected processUiComponents_GetComponentCategories(response: Response): Promise<types.UiComponentCategoryDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentCategoryDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentCategoryDtoListApiResponse>(null as any);
    }
    /**
     * Add tags to component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_AddComponentTags(id: string, body: string[] | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/tags";
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
            return this.processUiComponents_AddComponentTags(_response);
        });
    }
    protected processUiComponents_AddComponentTags(response: Response): Promise<types.BooleanApiResponse> {
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
     * Remove tags from component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_RemoveComponentTags(id: string, body: string[] | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/tags";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(body);
        let options_: RequestInit = {
            body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUiComponents_RemoveComponentTags(_response);
        });
    }
    protected processUiComponents_RemoveComponentTags(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get current user's accessible components
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetMyComponents(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/my-components?";
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
            return this.processUiComponents_GetMyComponents(_response);
        });
    }
    protected processUiComponents_GetMyComponents(response: Response): Promise<types.UiComponentListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Clone component to a specific program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_CloneComponent(id: string, targetProgramId: string, targetVersionId: string, body: string | undefined): Promise<types.UiComponentDtoApiResponse> {
        let url_ = this.baseUrl + "/api/UiComponents/{id}/clone-to/programs/{targetProgramId}/versions/{targetVersionId}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (targetProgramId === undefined || targetProgramId === null)
            throw new Error("The parameter 'targetProgramId' must be defined.");
        url_ = url_.replace("{targetProgramId}", encodeURIComponent("" + targetProgramId));
        if (targetVersionId === undefined || targetVersionId === null)
            throw new Error("The parameter 'targetVersionId' must be defined.");
        url_ = url_.replace("{targetVersionId}", encodeURIComponent("" + targetVersionId));
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
            return this.processUiComponents_CloneComponent(_response);
        });
    }
    protected processUiComponents_CloneComponent(response: Response): Promise<types.UiComponentDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.UiComponentDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.UiComponentDtoApiResponse>(null as any);
    }
}