import * as types from './types';
import * as interfaces from './interfaces';
import { throwException } from './utils';
import {
    SortDirection,
} from './enums';

export class VersionsClient implements interfaces.IVersionsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }
    /**
     * Get all versions with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.VersionListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Versions?";
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
            return this.processVersions_GetAll(_response);
        });
    }
    protected processVersions_GetAll(response: Response): Promise<types.VersionListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Create new version for a program
    Note: This creates the version entity. Files are uploaded separately through the commit process.
     * @param body (optional) 
     * @return OK
     */
    versions_Create(body: types.VersionCreateDto | undefined): Promise<types.VersionDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions";
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
            return this.processVersions_Create(_response);
        });
    }
    protected processVersions_Create(response: Response): Promise<types.VersionDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionDtoApiResponse>(null as any);
    }
    /**
     * Get version by ID with full details including files
     * @return OK
     */
    versions_GetById(id: string): Promise<types.VersionDetailDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/{id}";
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
            return this.processVersions_GetById(_response);
        });
    }
    protected processVersions_GetById(response: Response): Promise<types.VersionDetailDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionDetailDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionDetailDtoApiResponse>(null as any);
    }
    /**
     * Update version metadata (commit message, review comments)
    Note: File changes should be done through the commit process
     * @param body (optional) 
     * @return OK
     */
    versions_Update(id: string, body: types.VersionUpdateDto | undefined): Promise<types.VersionDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/{id}";
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
            return this.processVersions_Update(_response);
        });
    }
    protected processVersions_Update(response: Response): Promise<types.VersionDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionDtoApiResponse>(null as any);
    }
    /**
     * Delete version (only if pending and not current)
    This will also delete associated files through IFileStorageService
     * @return OK
     */
    versions_Delete(id: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/{id}";
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
            return this.processVersions_Delete(_response);
        });
    }
    protected processVersions_Delete(response: Response): Promise<types.BooleanApiResponse> {
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
     * Advanced version search with filtering
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    versions_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: types.VersionSearchDto | undefined): Promise<types.VersionListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/search?";
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
            return this.processVersions_Search(_response);
        });
    }
    protected processVersions_Search(response: Response): Promise<types.VersionListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Get all versions for a specific program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.VersionListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/by-program/{programId}?";
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
            return this.processVersions_GetByProgram(_response);
        });
    }
    protected processVersions_GetByProgram(response: Response): Promise<types.VersionListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Get latest version for a program
     * @return OK
     */
    versions_GetLatestVersionForProgram(programId: string): Promise<types.VersionDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/programs/{programId}/latest";
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
            return this.processVersions_GetLatestVersionForProgram(_response);
        });
    }
    protected processVersions_GetLatestVersionForProgram(response: Response): Promise<types.VersionDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionDtoApiResponse>(null as any);
    }
    /**
     * Get specific version by program and version number
     * @return OK
     */
    versions_GetByProgramAndVersionNumber(programId: string, versionNumber: number): Promise<types.VersionDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/programs/{programId}/version/{versionNumber}";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionNumber === undefined || versionNumber === null)
            throw new Error("The parameter 'versionNumber' must be defined.");
        url_ = url_.replace("{versionNumber}", encodeURIComponent("" + versionNumber));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processVersions_GetByProgramAndVersionNumber(_response);
        });
    }
    protected processVersions_GetByProgramAndVersionNumber(response: Response): Promise<types.VersionDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionDtoApiResponse>(null as any);
    }
    /**
     * Get next version number for a program
     * @return OK
     */
    versions_GetNextVersionNumber(programId: string): Promise<types.Int32ApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/programs/{programId}/next-version-number";
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
            return this.processVersions_GetNextVersionNumber(_response);
        });
    }
    protected processVersions_GetNextVersionNumber(response: Response): Promise<types.Int32ApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.Int32ApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.Int32ApiResponse>(null as any);
    }
    /**
     * Get versions by creator
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByCreator(creatorId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.VersionListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/by-creator/{creatorId}?";
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
            return this.processVersions_GetByCreator(_response);
        });
    }
    protected processVersions_GetByCreator(response: Response): Promise<types.VersionListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Get versions by status (pending, approved, rejected)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.VersionListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/by-status/{status}?";
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
            return this.processVersions_GetByStatus(_response);
        });
    }
    protected processVersions_GetByStatus(response: Response): Promise<types.VersionListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Get all versions pending review
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetPendingReviews(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.VersionListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/pending-reviews?";
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
            return this.processVersions_GetPendingReviews(_response);
        });
    }
    protected processVersions_GetPendingReviews(response: Response): Promise<types.VersionListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Get versions by reviewer
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByReviewer(reviewerId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.VersionListDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/by-reviewer/{reviewerId}?";
        if (reviewerId === undefined || reviewerId === null)
            throw new Error("The parameter 'reviewerId' must be defined.");
        url_ = url_.replace("{reviewerId}", encodeURIComponent("" + reviewerId));
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
            return this.processVersions_GetByReviewer(_response);
        });
    }
    protected processVersions_GetByReviewer(response: Response): Promise<types.VersionListDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionListDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionListDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Update version status
     * @param body (optional) 
     * @return OK
     */
    versions_UpdateStatus(id: string, body: types.VersionStatusUpdateDto | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/{id}/status";
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
            return this.processVersions_UpdateStatus(_response);
        });
    }
    protected processVersions_UpdateStatus(response: Response): Promise<types.BooleanApiResponse> {
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
     * Submit version review (approve or reject)
     * @param body (optional) 
     * @return OK
     */
    versions_SubmitReview(id: string, body: types.VersionReviewSubmissionDto | undefined): Promise<types.VersionReviewDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/{id}/review";
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
            return this.processVersions_SubmitReview(_response);
        });
    }
    protected processVersions_SubmitReview(response: Response): Promise<types.VersionReviewDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionReviewDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionReviewDtoApiResponse>(null as any);
    }
    /**
     * Quick approve version
     * @param body (optional) 
     * @return OK
     */
    versions_ApproveVersion(id: string, body: string | undefined): Promise<types.VersionReviewDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/{id}/approve";
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
            return this.processVersions_ApproveVersion(_response);
        });
    }
    protected processVersions_ApproveVersion(response: Response): Promise<types.VersionReviewDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionReviewDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionReviewDtoApiResponse>(null as any);
    }
    /**
     * Quick reject version
     * @param body (optional) 
     * @return OK
     */
    versions_RejectVersion(id: string, body: string | undefined): Promise<types.VersionReviewDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/{id}/reject";
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
            return this.processVersions_RejectVersion(_response);
        });
    }
    protected processVersions_RejectVersion(response: Response): Promise<types.VersionReviewDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionReviewDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionReviewDtoApiResponse>(null as any);
    }
    /**
     * Commit changes to create a new version with files
    This uses IFileStorageService internally to handle file operations
    Process: Upload files -> Commit -> Review -> Approve -> Execute
     * @param body (optional) 
     * @return OK
     */
    versions_CommitChanges(programId: string, body: types.VersionCommitDto | undefined): Promise<types.VersionDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/programs/{programId}/commit";
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
            return this.processVersions_CommitChanges(_response);
        });
    }
    protected processVersions_CommitChanges(response: Response): Promise<types.VersionDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionDtoApiResponse>(null as any);
    }
    /**
     * Validate commit before actual commit
    This checks file validity and other constraints
     * @param body (optional) 
     * @return OK
     */
    versions_ValidateCommit(programId: string, body: types.VersionCommitValidationDto | undefined): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/programs/{programId}/validate-commit";
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
            return this.processVersions_ValidateCommit(_response);
        });
    }
    protected processVersions_ValidateCommit(response: Response): Promise<types.BooleanApiResponse> {
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
     * Compare two versions and get differences
     * @return OK
     */
    versions_CompareVersions(fromVersionId: string, toVersionId: string): Promise<types.VersionDiffDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/{fromVersionId}/compare/{toVersionId}";
        if (fromVersionId === undefined || fromVersionId === null)
            throw new Error("The parameter 'fromVersionId' must be defined.");
        url_ = url_.replace("{fromVersionId}", encodeURIComponent("" + fromVersionId));
        if (toVersionId === undefined || toVersionId === null)
            throw new Error("The parameter 'toVersionId' must be defined.");
        url_ = url_.replace("{toVersionId}", encodeURIComponent("" + toVersionId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processVersions_CompareVersions(_response);
        });
    }
    protected processVersions_CompareVersions(response: Response): Promise<types.VersionDiffDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionDiffDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionDiffDtoApiResponse>(null as any);
    }
    /**
     * Get diff from previous version
     * @return OK
     */
    versions_GetDiffFromPrevious(versionId: string): Promise<types.VersionDiffDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/{versionId}/diff-from-previous";
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
            return this.processVersions_GetDiffFromPrevious(_response);
        });
    }
    protected processVersions_GetDiffFromPrevious(response: Response): Promise<types.VersionDiffDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionDiffDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionDiffDtoApiResponse>(null as any);
    }
    /**
     * Get change summary for a version
     * @return OK
     */
    versions_GetChangeSummary(versionId: string): Promise<types.VersionChangeDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/{versionId}/changes";
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
            return this.processVersions_GetChangeSummary(_response);
        });
    }
    protected processVersions_GetChangeSummary(response: Response): Promise<types.VersionChangeDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionChangeDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionChangeDtoListApiResponse>(null as any);
    }
    /**
     * Deploy approved version
     * @param body (optional) 
     * @return OK
     */
    versions_DeployVersion(versionId: string, body: types.VersionDeploymentRequestDto | undefined): Promise<types.VersionDeploymentDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/{versionId}/deploy";
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
            return this.processVersions_DeployVersion(_response);
        });
    }
    protected processVersions_DeployVersion(response: Response): Promise<types.VersionDeploymentDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionDeploymentDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionDeploymentDtoApiResponse>(null as any);
    }
    /**
     * Revert program to previous version
     * @return OK
     */
    versions_RevertToPreviousVersion(programId: string, versionId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/programs/{programId}/revert/{versionId}";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processVersions_RevertToPreviousVersion(_response);
        });
    }
    protected processVersions_RevertToPreviousVersion(response: Response): Promise<types.BooleanApiResponse> {
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
     * Set version as current for program
     * @return OK
     */
    versions_SetAsCurrentVersion(programId: string, versionId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/programs/{programId}/set-current/{versionId}";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processVersions_SetAsCurrentVersion(_response);
        });
    }
    protected processVersions_SetAsCurrentVersion(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get version statistics for a program
     * @return OK
     */
    versions_GetVersionStats(programId: string): Promise<types.VersionStatsDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/programs/{programId}/stats";
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
            return this.processVersions_GetVersionStats(_response);
        });
    }
    protected processVersions_GetVersionStats(response: Response): Promise<types.VersionStatsDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionStatsDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionStatsDtoApiResponse>(null as any);
    }
    /**
     * Get version activity for a program
     * @param days (optional) 
     * @return OK
     */
    versions_GetVersionActivity(programId: string, days: number | undefined): Promise<types.VersionActivityDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/Versions/programs/{programId}/activity?";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (days === null)
            throw new Error("The parameter 'days' cannot be null.");
        else if (days !== undefined)
            url_ += "days=" + encodeURIComponent("" + days) + "&";
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processVersions_GetVersionActivity(_response);
        });
    }
    protected processVersions_GetVersionActivity(response: Response): Promise<types.VersionActivityDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionActivityDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionActivityDtoListApiResponse>(null as any);
    }
}
