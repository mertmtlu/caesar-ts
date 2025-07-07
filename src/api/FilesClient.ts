// --- START OF FILE FilesClient.ts ---

import * as types from './types';
import * as interfaces from './interfaces';
import { throwException } from './utils';

export class FilesClient implements interfaces.IFilesClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * Store files for a specific program version
     * @param body (optional) 
     * @return OK
     */
    files_StoreVersionFiles(programId: string, versionId: string, body: types.VersionFileCreateDto[] | undefined): Promise<types.FileStorageResultListApiResponse> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/versions/{versionId}/upload";
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
            return this.processFiles_StoreVersionFiles(_response);
        });
    }

    protected processFiles_StoreVersionFiles(response: Response): Promise<types.FileStorageResultListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.FileStorageResultListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.FileStorageResultListApiResponse>(null as any);
    }

    /**
     * List all files for a specific program version
     * @return OK
     */
    files_ListVersionFiles(programId: string, versionId: string): Promise<types.VersionFileDtoListApiResponse> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/versions/{versionId}";
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
            return this.processFiles_ListVersionFiles(_response);
        });
    }

    protected processFiles_ListVersionFiles(response: Response): Promise<types.VersionFileDtoListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionFileDtoListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionFileDtoListApiResponse>(null as any);
    }

    /**
     * Delete all files for a specific program version
     * @return OK
     */
    files_DeleteVersionFiles(programId: string, versionId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/versions/{versionId}";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processFiles_DeleteVersionFiles(_response);
        });
    }

    protected processFiles_DeleteVersionFiles(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get file content for a specific program version
     * @return OK
     */
    files_GetVersionFile(programId: string, versionId: string, filePath: string): Promise<types.VersionFileDetailDtoApiResponse> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/versions/{versionId}/files/{filePath}";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
        if (filePath === undefined || filePath === null)
            throw new Error("The parameter 'filePath' must be defined.");
        url_ = url_.replace("{filePath}", encodeURIComponent("" + filePath));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processFiles_GetVersionFile(_response);
        });
    }

    protected processFiles_GetVersionFile(response: Response): Promise<types.VersionFileDetailDtoApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.VersionFileDetailDtoApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.VersionFileDetailDtoApiResponse>(null as any);
    }

    /**
     * Update file content for a specific program version
     * @param body (optional) 
     * @return OK
     */
    files_UpdateVersionFile(programId: string, versionId: string, filePath: string, body: types.VersionFileUpdateDto | undefined): Promise<types.StringApiResponse> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/versions/{versionId}/files/{filePath}";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
        if (filePath === undefined || filePath === null)
            throw new Error("The parameter 'filePath' must be defined.");
        url_ = url_.replace("{filePath}", encodeURIComponent("" + filePath));
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
            return this.processFiles_UpdateVersionFile(_response);
        });
    }

    protected processFiles_UpdateVersionFile(response: Response): Promise<types.StringApiResponse> {
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
     * Delete file from a specific program version
     * @return OK
     */
    files_DeleteVersionFile(programId: string, versionId: string, filePath: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/versions/{versionId}/files/{filePath}";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
        if (filePath === undefined || filePath === null)
            throw new Error("The parameter 'filePath' must be defined.");
        url_ = url_.replace("{filePath}", encodeURIComponent("" + filePath));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processFiles_DeleteVersionFile(_response);
        });
    }

    protected processFiles_DeleteVersionFile(response: Response): Promise<types.BooleanApiResponse> {
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
     * Copy files from one version to another within the same program
     * @return OK
     */
    files_CopyVersionFiles(programId: string, fromVersionId: string, toVersionId: string): Promise<types.FileStorageResultListApiResponse> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/versions/{fromVersionId}/copy-to/{toVersionId}";
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

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processFiles_CopyVersionFiles(_response);
        });
    }

    protected processFiles_CopyVersionFiles(response: Response): Promise<types.FileStorageResultListApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.FileStorageResultListApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.FileStorageResultListApiResponse>(null as any);
    }

    /**
     * Delete all files for a program (all versions)
     * @return OK
     */
    files_DeleteProgramFiles(programId: string): Promise<types.BooleanApiResponse> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processFiles_DeleteProgramFiles(_response);
        });
    }

    protected processFiles_DeleteProgramFiles(response: Response): Promise<types.BooleanApiResponse> {
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
     * Get storage statistics for a program
     * @return OK
     */
    files_GetProgramStorageStatistics(programId: string): Promise<types.StorageStatisticsApiResponse> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/statistics";
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
            return this.processFiles_GetProgramStorageStatistics(_response);
        });
    }

    protected processFiles_GetProgramStorageStatistics(response: Response): Promise<types.StorageStatisticsApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.StorageStatisticsApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.StorageStatisticsApiResponse>(null as any);
    }

    /**
     * Validate file before upload
     * @param body (optional) 
     * @return OK
     */
    files_ValidateFile(body: types.FileValidationRequest | undefined): Promise<types.FileValidationResultApiResponse> {
        let url_ = this.baseUrl + "/api/Files/validate";
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
            return this.processFiles_ValidateFile(_response);
        });
    }

    protected processFiles_ValidateFile(response: Response): Promise<types.FileValidationResultApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.FileValidationResultApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.FileValidationResultApiResponse>(null as any);
    }

    /**
     * Calculate file hash
     * @param body (optional) 
     * @return OK
     */
    files_CalculateFileHash(body: string | undefined): Promise<types.StringApiResponse> {
        let url_ = this.baseUrl + "/api/Files/calculate-hash";
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
            return this.processFiles_CalculateFileHash(_response);
        });
    }

    protected processFiles_CalculateFileHash(response: Response): Promise<types.StringApiResponse> {
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
     * Get file path structure for a program version
     * @param filePath (optional) 
     * @return OK
     */
    files_GetVersionFilePath(programId: string, versionId: string, filePath: string | undefined): Promise<types.StringApiResponse> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/versions/{versionId}/path?";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
        if (filePath === null)
            throw new Error("The parameter 'filePath' cannot be null.");
        else if (filePath !== undefined)
            url_ += "filePath=" + encodeURIComponent("" + filePath) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processFiles_GetVersionFilePath(_response);
        });
    }

    protected processFiles_GetVersionFilePath(response: Response): Promise<types.StringApiResponse> {
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
     * Bulk download selected files from a program version as a ZIP archive
     * @param body (optional) 
     * @return OK
     */
    files_BulkDownloadFiles(programId: string, versionId: string, body: types.BulkDownloadRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/versions/{versionId}/bulk-download";
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
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processFiles_BulkDownloadFiles(_response);
        });
    }

    protected processFiles_BulkDownloadFiles(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * Download all files from a program version as a ZIP archive
     * @param includeMetadata (optional) 
     * @param compressionLevel (optional) 
     * @return OK
     */
    files_DownloadAllVersionFiles(programId: string, versionId: string, includeMetadata: boolean | undefined, compressionLevel: string | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/versions/{versionId}/download-all?";
        if (programId === undefined || programId === null)
            throw new Error("The parameter 'programId' must be defined.");
        url_ = url_.replace("{programId}", encodeURIComponent("" + programId));
        if (versionId === undefined || versionId === null)
            throw new Error("The parameter 'versionId' must be defined.");
        url_ = url_.replace("{versionId}", encodeURIComponent("" + versionId));
        if (includeMetadata === null)
            throw new Error("The parameter 'includeMetadata' cannot be null.");
        else if (includeMetadata !== undefined)
            url_ += "includeMetadata=" + encodeURIComponent("" + includeMetadata) + "&";
        if (compressionLevel === null)
            throw new Error("The parameter 'compressionLevel' cannot be null.");
        else if (compressionLevel !== undefined)
            url_ += "compressionLevel=" + encodeURIComponent("" + compressionLevel) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processFiles_DownloadAllVersionFiles(_response);
        });
    }

    protected processFiles_DownloadAllVersionFiles(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * Bulk upload files to a program version
     * @param body (optional) 
     * @return OK
     */
    files_BulkUploadFiles(programId: string, versionId: string, body: types.VersionFileCreateDto[] | undefined): Promise<types.BulkOperationResultApiResponse> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/versions/{versionId}/bulk-upload";
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
            return this.processFiles_BulkUploadFiles(_response);
        });
    }

    protected processFiles_BulkUploadFiles(response: Response): Promise<types.BulkOperationResultApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BulkOperationResultApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BulkOperationResultApiResponse>(null as any);
    }

    /**
     * Bulk delete files from a program version
     * @param body (optional) 
     * @return OK
     */
    files_BulkDeleteFiles(programId: string, versionId: string, body: string[] | undefined): Promise<types.BulkOperationResultApiResponse> {
        let url_ = this.baseUrl + "/api/Files/programs/{programId}/versions/{versionId}/bulk-delete";
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
            return this.processFiles_BulkDeleteFiles(_response);
        });
    }

    protected processFiles_BulkDeleteFiles(response: Response): Promise<types.BulkOperationResultApiResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = types.BulkOperationResultApiResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException(JSON.parse(_responseText).message, status, _responseText, _headers);
            });
        }
        return Promise.resolve<types.BulkOperationResultApiResponse>(null as any);
    }
}
// --- END OF FILE FilesClient.ts ---