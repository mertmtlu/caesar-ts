import * as types from './types';
import * as interfaces from './interfaces';
import { throwException } from './utils';
import {
    SortDirection,
} from './enums';

export class RegionsClient implements interfaces.IRegionsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }
    /**
     * Get all regions with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    regions_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RegionListResponseDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Regions?";
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
            return this.processRegions_GetAll(_response);
        });
    }
    protected processRegions_GetAll(response: Response): Promise<types.RegionListResponseDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.RegionListResponseDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.RegionListResponseDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Create new region
     * @param body (optional) 
     * @return OK
     */
    regions_Create(body: types.RegionCreateDto | undefined): Promise<types.RegionResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Regions";
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
            return this.processRegions_Create(_response);
        });
    }
    protected processRegions_Create(response: Response): Promise<types.RegionResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.RegionResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.RegionResponseDtoApiResponse>(null as any);
    }
    /**
     * Get region by ID
     * @return OK
     */
    regions_GetById(id: string): Promise<types.RegionDetailResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Regions/{id}";
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
            return this.processRegions_GetById(_response);
        });
    }
    protected processRegions_GetById(response: Response): Promise<types.RegionDetailResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.RegionDetailResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.RegionDetailResponseDtoApiResponse>(null as any);
    }
    /**
     * Update region
     * @param body (optional) 
     * @return OK
     */
    regions_Update(id: string, body: types.RegionUpdateDto | undefined): Promise<types.RegionResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Regions/{id}";
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
            return this.processRegions_Update(_response);
        });
    }
    protected processRegions_Update(response: Response): Promise<types.RegionResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.RegionResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.RegionResponseDtoApiResponse>(null as any);
    }
    /**
     * Delete region
     * @return OK
     */
    regions_Delete(id: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Regions/{id}";
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
            return this.processRegions_Delete(_response);
        });
    }
    protected processRegions_Delete(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get region by number
     * @return OK
     */
    regions_GetByNumber(regionNo: number): Promise<types.RegionResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Regions/by-number/{regionNo}";
        if (regionNo === undefined || regionNo === null)
            throw new Error("The parameter 'regionNo' must be defined.");
        url_ = url_.replace("{regionNo}", encodeURIComponent("" + regionNo));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processRegions_GetByNumber(_response);
        });
    }
    protected processRegions_GetByNumber(response: Response): Promise<types.RegionResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.RegionResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.RegionResponseDtoApiResponse>(null as any);
    }
    /**
     * Get regions by client ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    regions_GetByClientId(clientId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RegionListResponseDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/Regions/by-client/{clientId}?";
        if (clientId === undefined || clientId === null)
            throw new Error("The parameter 'clientId' must be defined.");
        url_ = url_.replace("{clientId}", encodeURIComponent("" + clientId));
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
            return this.processRegions_GetByClientId(_response);
        });
    }
    protected processRegions_GetByClientId(response: Response): Promise<types.RegionListResponseDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.RegionListResponseDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.RegionListResponseDtoPagedResponseApiResponse>(null as any);
    }
    /**
     * Update region cities
     * @param body (optional) 
     * @return OK
     */
    regions_UpdateCities(id: string, body: types.RegionCityUpdateDto | undefined): Promise<types.RegionResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Regions/{id}/cities";
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
            return this.processRegions_UpdateCities(_response);
        });
    }
    protected processRegions_UpdateCities(response: Response): Promise<types.RegionResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.RegionResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.RegionResponseDtoApiResponse>(null as any);
    }
    /**
     * Get region statistics
     * @return OK
     */
    regions_GetStatistics(id: string): Promise<types.RegionStatisticsResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Regions/{id}/statistics";
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
            return this.processRegions_GetStatistics(_response);
        });
    }
    protected processRegions_GetStatistics(response: Response): Promise<types.RegionStatisticsResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.RegionStatisticsResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.RegionStatisticsResponseDtoApiResponse>(null as any);
    }
    /**
     * Get regions that operate in a specific city
     * @return OK
     */
    regions_GetRegionsInCity(city: string): Promise<types.RegionSummaryResponseDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/Regions/in-city/{city}";
        if (city === undefined || city === null)
            throw new Error("The parameter 'city' must be defined.");
        url_ = url_.replace("{city}", encodeURIComponent("" + city));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processRegions_GetRegionsInCity(_response);
        });
    }
    protected processRegions_GetRegionsInCity(response: Response): Promise<types.RegionSummaryResponseDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.RegionSummaryResponseDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.RegionSummaryResponseDtoListApiResponse>(null as any);
    }
}