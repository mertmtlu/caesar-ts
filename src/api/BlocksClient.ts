import * as types from './types';
import * as interfaces from './interfaces';
import { throwException } from './utils';



export class BlocksClient implements interfaces.IBlocksClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }
    /**
     * Get all blocks in a building
     * @return OK
     */
    blocks_GetAll(buildingId: string): Promise<types.BlockResponseDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/buildings/{buildingId}/blocks";
        if (buildingId === undefined || buildingId === null)
            throw new Error("The parameter 'buildingId' must be defined.");
        url_ = url_.replace("{buildingId}", encodeURIComponent("" + buildingId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlocks_GetAll(_response);
        });
    }
    protected processBlocks_GetAll(response: Response): Promise<types.BlockResponseDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BlockResponseDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BlockResponseDtoListApiResponse>(null as any);
    }
    /**
     * Get block by ID
     * @return OK
     */
    blocks_GetById(buildingId: string, blockId: string): Promise<types.BlockResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/buildings/{buildingId}/blocks/{blockId}";
        if (buildingId === undefined || buildingId === null)
            throw new Error("The parameter 'buildingId' must be defined.");
        url_ = url_.replace("{buildingId}", encodeURIComponent("" + buildingId));
        if (blockId === undefined || blockId === null)
            throw new Error("The parameter 'blockId' must be defined.");
        url_ = url_.replace("{blockId}", encodeURIComponent("" + blockId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlocks_GetById(_response);
        });
    }
    protected processBlocks_GetById(response: Response): Promise<types.BlockResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BlockResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BlockResponseDtoApiResponse>(null as any);
    }
    /**
     * Delete block
     * @return OK
     */
    blocks_Delete(buildingId: string, blockId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/buildings/{buildingId}/blocks/{blockId}";
        if (buildingId === undefined || buildingId === null)
            throw new Error("The parameter 'buildingId' must be defined.");
        url_ = url_.replace("{buildingId}", encodeURIComponent("" + buildingId));
        if (blockId === undefined || blockId === null)
            throw new Error("The parameter 'blockId' must be defined.");
        url_ = url_.replace("{blockId}", encodeURIComponent("" + blockId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlocks_Delete(_response);
        });
    }
    protected processBlocks_Delete(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get block summary
     * @return OK
     */
    blocks_GetSummary(buildingId: string, blockId: string): Promise<types.BlockSummaryResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/buildings/{buildingId}/blocks/{blockId}/summary";
        if (buildingId === undefined || buildingId === null)
            throw new Error("The parameter 'buildingId' must be defined.");
        url_ = url_.replace("{buildingId}", encodeURIComponent("" + buildingId));
        if (blockId === undefined || blockId === null)
            throw new Error("The parameter 'blockId' must be defined.");
        url_ = url_.replace("{blockId}", encodeURIComponent("" + blockId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlocks_GetSummary(_response);
        });
    }
    protected processBlocks_GetSummary(response: Response): Promise<types.BlockSummaryResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BlockSummaryResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BlockSummaryResponseDtoApiResponse>(null as any);
    }
    /**
     * Get all concrete blocks in a building
     * @return OK
     */
    blocks_GetConcreteBlocks(buildingId: string): Promise<types.ConcreteBlockResponseDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/buildings/{buildingId}/blocks/concrete";
        if (buildingId === undefined || buildingId === null)
            throw new Error("The parameter 'buildingId' must be defined.");
        url_ = url_.replace("{buildingId}", encodeURIComponent("" + buildingId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlocks_GetConcreteBlocks(_response);
        });
    }
    protected processBlocks_GetConcreteBlocks(response: Response): Promise<types.ConcreteBlockResponseDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ConcreteBlockResponseDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ConcreteBlockResponseDtoListApiResponse>(null as any);
    }
    /**
     * Create new concrete block
     * @param body (optional) 
     * @return OK
     */
    blocks_CreateConcrete(buildingId: string, body: types.ConcreteCreateDto | undefined): Promise<types.ConcreteBlockResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/buildings/{buildingId}/blocks/concrete";
        if (buildingId === undefined || buildingId === null)
            throw new Error("The parameter 'buildingId' must be defined.");
        url_ = url_.replace("{buildingId}", encodeURIComponent("" + buildingId));
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
            return this.processBlocks_CreateConcrete(_response);
        });
    }
    protected processBlocks_CreateConcrete(response: Response): Promise<types.ConcreteBlockResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ConcreteBlockResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ConcreteBlockResponseDtoApiResponse>(null as any);
    }
    /**
     * Get all masonry blocks in a building
     * @return OK
     */
    blocks_GetMasonryBlocks(buildingId: string): Promise<types.MasonryBlockResponseDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/buildings/{buildingId}/blocks/masonry";
        if (buildingId === undefined || buildingId === null)
            throw new Error("The parameter 'buildingId' must be defined.");
        url_ = url_.replace("{buildingId}", encodeURIComponent("" + buildingId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlocks_GetMasonryBlocks(_response);
        });
    }
    protected processBlocks_GetMasonryBlocks(response: Response): Promise<types.MasonryBlockResponseDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.MasonryBlockResponseDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.MasonryBlockResponseDtoListApiResponse>(null as any);
    }
    /**
     * Create new masonry block
     * @param body (optional) 
     * @return OK
     */
    blocks_CreateMasonry(buildingId: string, body: types.MasonryCreateDto | undefined): Promise<types.MasonryBlockResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/buildings/{buildingId}/blocks/masonry";
        if (buildingId === undefined || buildingId === null)
            throw new Error("The parameter 'buildingId' must be defined.");
        url_ = url_.replace("{buildingId}", encodeURIComponent("" + buildingId));
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
            return this.processBlocks_CreateMasonry(_response);
        });
    }
    protected processBlocks_CreateMasonry(response: Response): Promise<types.MasonryBlockResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.MasonryBlockResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.MasonryBlockResponseDtoApiResponse>(null as any);
    }
    /**
     * Update concrete block
     * @param body (optional) 
     * @return OK
     */
    blocks_UpdateConcrete(buildingId: string, blockId: string, body: types.ConcreteUpdateDto | undefined): Promise<types.ConcreteBlockResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/buildings/{buildingId}/blocks/concrete/{blockId}";
        if (buildingId === undefined || buildingId === null)
            throw new Error("The parameter 'buildingId' must be defined.");
        url_ = url_.replace("{buildingId}", encodeURIComponent("" + buildingId));
        if (blockId === undefined || blockId === null)
            throw new Error("The parameter 'blockId' must be defined.");
        url_ = url_.replace("{blockId}", encodeURIComponent("" + blockId));
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
            return this.processBlocks_UpdateConcrete(_response);
        });
    }
    protected processBlocks_UpdateConcrete(response: Response): Promise<types.ConcreteBlockResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.ConcreteBlockResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.ConcreteBlockResponseDtoApiResponse>(null as any);
    }
    /**
     * Update masonry block
     * @param body (optional) 
     * @return OK
     */
    blocks_UpdateMasonry(buildingId: string, blockId: string, body: types.MasonryUpdateDto | undefined): Promise<types.MasonryBlockResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/buildings/{buildingId}/blocks/masonry/{blockId}";
        if (buildingId === undefined || buildingId === null)
            throw new Error("The parameter 'buildingId' must be defined.");
        url_ = url_.replace("{buildingId}", encodeURIComponent("" + buildingId));
        if (blockId === undefined || blockId === null)
            throw new Error("The parameter 'blockId' must be defined.");
        url_ = url_.replace("{blockId}", encodeURIComponent("" + blockId));
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
            return this.processBlocks_UpdateMasonry(_response);
        });
    }
    protected processBlocks_UpdateMasonry(response: Response): Promise<types.MasonryBlockResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.MasonryBlockResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.MasonryBlockResponseDtoApiResponse>(null as any);
    }
    /**
     * Get block statistics
     * @return OK
     */
    blocks_GetStatistics(buildingId: string, blockId: string): Promise<types.BlockStatisticsResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/buildings/{buildingId}/blocks/{blockId}/statistics";
        if (buildingId === undefined || buildingId === null)
            throw new Error("The parameter 'buildingId' must be defined.");
        url_ = url_.replace("{buildingId}", encodeURIComponent("" + buildingId));
        if (blockId === undefined || blockId === null)
            throw new Error("The parameter 'blockId' must be defined.");
        url_ = url_.replace("{blockId}", encodeURIComponent("" + blockId));
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlocks_GetStatistics(_response);
        });
    }
    protected processBlocks_GetStatistics(response: Response): Promise<types.BlockStatisticsResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BlockStatisticsResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BlockStatisticsResponseDtoApiResponse>(null as any);
    }
    /**
     * Copy block within the same building
     * @param body (optional) 
     * @return OK
     */
    blocks_CopyBlock(buildingId: string, blockId: string, body: types.CopyBlockDto | undefined): Promise<types.BlockResponseDtoApiResponse> {
        let url_ = this.baseUrl + "/api/buildings/{buildingId}/blocks/{blockId}/copy";
        if (buildingId === undefined || buildingId === null)
            throw new Error("The parameter 'buildingId' must be defined.");
        url_ = url_.replace("{buildingId}", encodeURIComponent("" + buildingId));
        if (blockId === undefined || blockId === null)
            throw new Error("The parameter 'blockId' must be defined.");
        url_ = url_.replace("{blockId}", encodeURIComponent("" + blockId));
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
            return this.processBlocks_CopyBlock(_response);
        });
    }
    protected processBlocks_CopyBlock(response: Response): Promise<types.BlockResponseDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BlockResponseDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BlockResponseDtoApiResponse>(null as any);
    }
}