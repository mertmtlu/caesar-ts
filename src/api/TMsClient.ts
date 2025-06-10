import * as types from './types';
import * as interfaces from './interfaces';
import { throwException } from './utils';
import {
    SortDirection,
} from './enums';

export class TMsClient implements interfaces.ITMsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }
    /**
     * Get all TMs with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    tMs_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.TMListResponseDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/TMs?";
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
            return this.processTMs_GetAll(_response);
        });
    }
    protected processTMs_GetAll(response: Response): Promise<types.TMListResponseDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.TMListResponseDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.TMListResponseDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Create new TM
     * @param body (optional) 
     * @return OK
     */
    tMs_Create(body: types.TMCreateDto | undefined): Promise<types.TMResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/TMs";
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
            return this.processTMs_Create(_response);
        });
    }
    protected processTMs_Create(response: Response): Promise<types.TMResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.TMResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.TMResponseDtoApiResponse>(null as any);
    }
    /**
     * Get TM by ID
     * @return OK
     */
    tMs_GetById(id: string): Promise<types.TMDetailResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/TMs/{id}";
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
            return this.processTMs_GetById(_response);
        });
    }
    protected processTMs_GetById(response: Response): Promise<types.TMDetailResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.TMDetailResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.TMDetailResponseDtoApiResponse>(null as any);
    }
    /**
     * Update TM
     * @param body (optional) 
     * @return OK
     */
    tMs_Update(id: string, body: types.TMUpdateDto | undefined): Promise<types.TMResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/TMs/{id}";
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
            return this.processTMs_Update(_response);
        });
    }
    protected processTMs_Update(response: Response): Promise<types.TMResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.TMResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.TMResponseDtoApiResponse>(null as any);
    }
    /**
     * Delete TM
     * @return OK
     */
    tMs_Delete(id: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/TMs/{id}";
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
            return this.processTMs_Delete(_response);
        });
    }
    protected processTMs_Delete(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get TM by name
     * @return OK
     */
    tMs_GetByName(name: string): Promise<types.TMResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/TMs/by-name/{name}";
        if (name === undefined || name === null)
            throw new Error("The parameter 'name' must be defined.");
        url_ = url_.replace("{name}", encodeURIComponent("" + name));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTMs_GetByName(_response);
        });
    }
    protected processTMs_GetByName(response: Response): Promise<types.TMResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.TMResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.TMResponseDtoApiResponse>(null as any);
    }
    /**
     * Get TMs by region ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    tMs_GetByRegionId(regionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.TMListResponseDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/TMs/by-region/{regionId}?";
        if (regionId === undefined || regionId === null)
            throw new Error("The parameter 'regionId' must be defined.");
        url_ = url_.replace("{regionId}", encodeURIComponent("" + regionId));
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
            return this.processTMs_GetByRegionId(_response);
        });
    }
    protected processTMs_GetByRegionId(response: Response): Promise<types.TMListResponseDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.TMListResponseDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.TMListResponseDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Search TMs
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    tMs_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: types.TMSearchDto | undefined): Promise<types.TMListResponseDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/TMs/search?";
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
            return this.processTMs_Search(_response);
        });
    }
    protected processTMs_Search(response: Response): Promise<types.TMListResponseDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.TMListResponseDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.TMListResponseDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Update TM state
     * @param body (optional) 
     * @return OK
     */
    tMs_UpdateState(id: string, body: types.TMStateUpdateDto | undefined): Promise<types.TMResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/TMs/{id}/state";
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
            return this.processTMs_UpdateState(_response);
        });
    }
    protected processTMs_UpdateState(response: Response): Promise<types.TMResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.TMResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.TMResponseDtoApiResponse>(null as any);
    }
    /**
     * Update TM voltages
     * @param body (optional) 
     * @return OK
     */
    tMs_UpdateVoltages(id: string, body: types.TMVoltageUpdateDto | undefined): Promise<types.TMResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/TMs/{id}/voltages";
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
            return this.processTMs_UpdateVoltages(_response);
        });
    }
    protected processTMs_UpdateVoltages(response: Response): Promise<types.TMResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.TMResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.TMResponseDtoApiResponse>(null as any);
    }
    /**
     * Get TM statistics
     * @return OK
     */
    tMs_GetStatistics(id: string): Promise<types.TMStatisticsResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/TMs/{id}/statistics";
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
            return this.processTMs_GetStatistics(_response);
        });
    }
    protected processTMs_GetStatistics(response: Response): Promise<types.TMStatisticsResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.TMStatisticsResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.TMStatisticsResponseDtoApiResponse>(null as any);
    }
    /**
     * Get hazard summary for TM
     * @return OK
     */
    tMs_GetHazardSummary(id: string): Promise<types.TMHazardSummaryResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/TMs/{id}/hazard-summary";
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
            return this.processTMs_GetHazardSummary(_response);
        });
    }
    protected processTMs_GetHazardSummary(response: Response): Promise<types.TMHazardSummaryResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.TMHazardSummaryResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.TMHazardSummaryResponseDtoApiResponse>(null as any);
    }
}