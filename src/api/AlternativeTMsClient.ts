// --- START OF FILE AlternativeTMsClient.ts ---

import * as types from './types';
import * as interfaces from './interfaces';
import * as enums from './enums';
import { throwException } from './utils';

export class AlternativeTMsClient implements interfaces.IAlternativeTMsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * Get alternative TM by ID
     * @return OK
     */
    alternativeTMs_GetById(id: string): Promise<types.AlternativeTMDetailResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/AlternativeTMs/{id}";
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
            return this.processAlternativeTMs_GetById(_response);
        });
    }

    protected processAlternativeTMs_GetById(response: Response): Promise<types.AlternativeTMDetailResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.AlternativeTMDetailResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.AlternativeTMDetailResponseDtoApiResponse>(null as any);
    }

    /**
     * Update alternative TM
     * @param body (optional) 
     * @return OK
     */
    alternativeTMs_Update(id: string, body: types.AlternativeTMUpdateDto | undefined): Promise<types.AlternativeTMResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/AlternativeTMs/{id}";
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
            return this.processAlternativeTMs_Update(_response);
        });
    }

    protected processAlternativeTMs_Update(response: Response): Promise<types.AlternativeTMResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.AlternativeTMResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.AlternativeTMResponseDtoApiResponse>(null as any);
    }

    /**
     * Delete alternative TM
     * @return OK
     */
    alternativeTMs_Delete(id: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/AlternativeTMs/{id}";
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
            return this.processAlternativeTMs_Delete(_response);
        });
    }

    protected processAlternativeTMs_Delete(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get alternative TMs by TM ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    alternativeTMs_GetByTmId(tmId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/AlternativeTMs/by-tm/{tmId}?";
        if (tmId === undefined || tmId === null)
            throw new Error("The parameter 'tmId' must be defined.");
        url_ = url_.replace("{tmId}", encodeURIComponent("" + tmId));
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
            return this.processAlternativeTMs_GetByTmId(_response);
        });
    }

    protected processAlternativeTMs_GetByTmId(response: Response): Promise<types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse>(null as any);
    }

    /**
     * Get alternative TMs by city
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    alternativeTMs_GetByCity(city: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/AlternativeTMs/by-city/{city}?";
        if (city === undefined || city === null)
            throw new Error("The parameter 'city' must be defined.");
        url_ = url_.replace("{city}", encodeURIComponent("" + city));
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
            return this.processAlternativeTMs_GetByCity(_response);
        });
    }

    protected processAlternativeTMs_GetByCity(response: Response): Promise<types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse>(null as any);
    }

    /**
     * Get alternative TMs by county
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    alternativeTMs_GetByCounty(county: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse> {
        let url_ = this.baseUrl + "/api/AlternativeTMs/by-county/{county}?";
        if (county === undefined || county === null)
            throw new Error("The parameter 'county' must be defined.");
        url_ = url_.replace("{county}", encodeURIComponent("" + county));
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
            return this.processAlternativeTMs_GetByCounty(_response);
        });
    }

    protected processAlternativeTMs_GetByCounty(response: Response): Promise<types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse>(null as any);
    }

    /**
     * Create new alternative TM
     * @param body (optional) 
     * @return OK
     */
    alternativeTMs_Create(body: types.AlternativeTMCreateDto | undefined): Promise<types.AlternativeTMResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/AlternativeTMs";
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
            return this.processAlternativeTMs_Create(_response);
        });
    }

    protected processAlternativeTMs_Create(response: Response): Promise<types.AlternativeTMResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.AlternativeTMResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.AlternativeTMResponseDtoApiResponse>(null as any);
    }

    /**
     * Compare alternative TMs for a specific TM
     * @return OK
     */
    alternativeTMs_CompareAlternatives(tmId: string): Promise<types.AlternativeTMComparisonResponseDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/AlternativeTMs/compare/{tmId}";
        if (tmId === undefined || tmId === null)
            throw new Error("The parameter 'tmId' must be defined.");
        url_ = url_.replace("{tmId}", encodeURIComponent("" + tmId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAlternativeTMs_CompareAlternatives(_response);
        });
    }

    protected processAlternativeTMs_CompareAlternatives(response: Response): Promise<types.AlternativeTMComparisonResponseDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.AlternativeTMComparisonResponseDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.AlternativeTMComparisonResponseDtoListApiResponse>(null as any);
    }

    /**
     * Create alternative TM from existing TM
     * @param body (optional) 
     * @return OK
     */
    alternativeTMs_CreateFromTM(tmId: string, body: types.CreateFromTMDto | undefined): Promise<types.AlternativeTMResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/AlternativeTMs/create-from-tm/{tmId}";
        if (tmId === undefined || tmId === null)
            throw new Error("The parameter 'tmId' must be defined.");
        url_ = url_.replace("{tmId}", encodeURIComponent("" + tmId));
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
            return this.processAlternativeTMs_CreateFromTM(_response);
        });
    }

    protected processAlternativeTMs_CreateFromTM(response: Response): Promise<types.AlternativeTMResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.AlternativeTMResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.AlternativeTMResponseDtoApiResponse>(null as any);
    }
}
// --- END OF FILE AlternativeTMsClient.ts ---