// --- START OF FILE IconsClient.ts ---

import * as types from './types';
import * as interfaces from './interfaces';
import * as enums from './enums';
import { throwException } from './utils';

export class IconsClient implements interfaces.IIconsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * @param body (optional) 
     * @return OK
     */
    icons_CreateIcon(body: types.IconCreateDto | undefined): Promise<types.IconResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Icons";
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
            return this.processIcons_CreateIcon(_response);
        });
    }

    protected processIcons_CreateIcon(response: Response): Promise<types.IconResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 201) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.IconResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 201 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.IconResponseDtoApiResponse>(null as any);
    }

    /**
     * @return OK
     */
    icons_GetIcon(id: string): Promise<types.IconResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Icons/{id}";
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
            return this.processIcons_GetIcon(_response);
        });
    }

    protected processIcons_GetIcon(response: Response): Promise<types.IconResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 201) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.IconResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 201 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.IconResponseDtoApiResponse>(null as any);
    }

    /**
     * @param body (optional) 
     * @return OK
     */
    icons_UpdateIcon(id: string, body: types.IconUpdateDto | undefined): Promise<types.IconResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Icons/{id}";
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
            return this.processIcons_UpdateIcon(_response);
        });
    }

    protected processIcons_UpdateIcon(response: Response): Promise<types.IconResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 201) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.IconResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 201 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.IconResponseDtoApiResponse>(null as any);
    }

    /**
     * @return OK
     */
    icons_DeleteIcon(id: string): Promise<types.ObjectApiResponse> {
        let url_ = this.baseUrl + "/api/Icons/{id}";
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
            return this.processIcons_DeleteIcon(_response);
        });
    }

    protected processIcons_DeleteIcon(response: Response): Promise<types.ObjectApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ObjectApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ObjectApiResponse>(null as any);
    }

    /**
     * @return OK
     */
    icons_GetIconByEntity(entityType: enums.IconEntityType, entityId: string): Promise<types.IconResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Icons/entity/{entityType}/{entityId}";
        if (entityType === undefined || entityType === null)
            throw new Error("The parameter 'entityType' must be defined.");
        url_ = url_.replace("{entityType}", encodeURIComponent("" + entityType));
        if (entityId === undefined || entityId === null)
            throw new Error("The parameter 'entityId' must be defined.");
        url_ = url_.replace("{entityId}", encodeURIComponent("" + entityId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processIcons_GetIconByEntity(_response);
        });
    }

    protected processIcons_GetIconByEntity(response: Response): Promise<types.IconResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 201) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.IconResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 201 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.IconResponseDtoApiResponse>(null as any);
    }

    /**
     * @return OK
     */
    icons_DeleteIconByEntity(entityType: enums.IconEntityType, entityId: string): Promise<types.ObjectApiResponse> {
        let url_ = this.baseUrl + "/api/Icons/entity/{entityType}/{entityId}";
        if (entityType === undefined || entityType === null)
            throw new Error("The parameter 'entityType' must be defined.");
        url_ = url_.replace("{entityType}", encodeURIComponent("" + entityType));
        if (entityId === undefined || entityId === null)
            throw new Error("The parameter 'entityId' must be defined.");
        url_ = url_.replace("{entityId}", encodeURIComponent("" + entityId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processIcons_DeleteIconByEntity(_response);
        });
    }

    protected processIcons_DeleteIconByEntity(response: Response): Promise<types.ObjectApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ObjectApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ObjectApiResponse>(null as any);
    }

    /**
     * @return OK
     */
    icons_GetIconsByType(entityType: enums.IconEntityType): Promise<types.IconResponseDtoIEnumerableApiResponse> {
        let url_ = this.baseUrl + "/api/Icons/type/{entityType}";
        if (entityType === undefined || entityType === null)
            throw new Error("The parameter 'entityType' must be defined.");
        url_ = url_.replace("{entityType}", encodeURIComponent("" + entityType));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processIcons_GetIconsByType(_response);
        });
    }

    protected processIcons_GetIconsByType(response: Response): Promise<types.IconResponseDtoIEnumerableApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.IconResponseDtoIEnumerableApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.IconResponseDtoIEnumerableApiResponse>(null as any);
    }

    /**
     * @param body (optional) 
     * @return OK
     */
    icons_GetIconsBatch(body: types.IconBatchRequestDto | undefined): Promise<types.IconResponseDtoIEnumerableApiResponse> {
        let url_ = this.baseUrl + "/api/Icons/batch";
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
            return this.processIcons_GetIconsBatch(_response);
        });
    }

    protected processIcons_GetIconsBatch(response: Response): Promise<types.IconResponseDtoIEnumerableApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.IconResponseDtoIEnumerableApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.IconResponseDtoIEnumerableApiResponse>(null as any);
    }

    /**
     * @param body (optional) 
     * @return OK
     */
    icons_GetIconsByEntityIds(body: types.IconEntityBatchRequestDto | undefined): Promise<types.IconResponseDtoIEnumerableApiResponse> {
        let url_ = this.baseUrl + "/api/Icons/batch/entities";
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
            return this.processIcons_GetIconsByEntityIds(_response);
        });
    }

    protected processIcons_GetIconsByEntityIds(response: Response): Promise<types.IconResponseDtoIEnumerableApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.IconResponseDtoIEnumerableApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.IconResponseDtoIEnumerableApiResponse>(null as any);
    }

    /**
     * @return OK
     */
    icons_GetUserIcons(): Promise<types.IconResponseDtoIEnumerableApiResponse> {
        let url_ = this.baseUrl + "/api/Icons/user";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processIcons_GetUserIcons(_response);
        });
    }

    protected processIcons_GetUserIcons(response: Response): Promise<types.IconResponseDtoIEnumerableApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.IconResponseDtoIEnumerableApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.IconResponseDtoIEnumerableApiResponse>(null as any);
    }

    /**
     * @return OK
     */
    icons_GetIconStats(entityType: enums.IconEntityType): Promise<types.IconStatsResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Icons/stats/{entityType}";
        if (entityType === undefined || entityType === null)
            throw new Error("The parameter 'entityType' must be defined.");
        url_ = url_.replace("{entityType}", encodeURIComponent("" + entityType));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processIcons_GetIconStats(_response);
        });
    }

    protected processIcons_GetIconStats(response: Response): Promise<types.IconStatsResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.IconStatsResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.IconStatsResponseDtoApiResponse>(null as any);
    }

    /**
     * @param body (optional) 
     * @return OK
     */
    icons_ValidateIconConstraints(body: types.IconValidationRequestDto | undefined): Promise<types.IconValidationResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Icons/validate";
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
            return this.processIcons_ValidateIconConstraints(_response);
        });
    }

    protected processIcons_ValidateIconConstraints(response: Response): Promise<types.IconValidationResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.IconValidationResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.IconValidationResponseDtoApiResponse>(null as any);
    }
}
// --- END OF FILE IconsClient.ts ---