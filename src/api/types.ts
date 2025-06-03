import { formatDate } from './utils';
import {
    IActiveDeploymentDto,
    IActiveDeploymentDtoListApiResponse,
    IAddressDto,
    IAddressResponseDto,
    IAlternativeTMComparisonResponseDto,
    IAlternativeTMComparisonResponseDtoListApiResponse,
    IAlternativeTMCreateDto,
    IAlternativeTMDetailResponseDto,
    IAlternativeTMDetailResponseDtoApiResponse,
    IAlternativeTMResponseDto,
    IAlternativeTMResponseDtoApiResponse,
    IAlternativeTMSummaryResponseDto,
    IAlternativeTMSummaryResponseDtoPagedResponse,
    IAlternativeTMSummaryResponseDtoPagedResponseApiResponse,
    IAlternativeTMUpdateDto,
    IAppDeploymentConfigUpdateDto,
    IAppDeploymentInfo,
    IAppDeploymentRequestDto,
    IApplicationHealthDto,
    IApplicationHealthDtoApiResponse,
    IApplicationMetricsDto,
    IApplicationMetricsDtoApiResponse,
    IAuditInfoResponseDto,
    IAuthenticationResponseDto,
    IAuthenticationResponseDtoApiResponse,
    IAvalancheHazardDto,
    IAvalancheHazardResponseDto,
    IBlockResponseDto,
    IBlockResponseDtoApiResponse,
    IBlockResponseDtoListApiResponse,
    IBlockStatisticsResponseDto,
    IBlockStatisticsResponseDtoApiResponse,
    IBlockSummaryResponseDto,
    IBlockSummaryResponseDtoApiResponse,
    IBooleanApiResponse,
    IBuildingBlockAddDto,
    IBuildingCreateDto,
    IBuildingDetailResponseDto,
    IBuildingDetailResponseDtoApiResponse,
    IBuildingListResponseDto,
    IBuildingListResponseDtoPagedResponse,
    IBuildingListResponseDtoPagedResponseApiResponse,
    IBuildingResponseDto,
    IBuildingResponseDtoApiResponse,
    IBuildingSearchDto,
    IBuildingStatisticsResponseDto,
    IBuildingStatisticsResponseDtoApiResponse,
    IBuildingSummaryResponseDto,
    IBuildingUpdateDto,
    IBulkOperationResult,
    IBulkOperationResultApiResponse,
    IBulkRequestStatusUpdateDto,
    IClientCreateDto,
    IClientDetailResponseDto,
    IClientDetailResponseDtoApiResponse,
    IClientListResponseDto,
    IClientListResponseDtoPagedResponse,
    IClientListResponseDtoPagedResponseApiResponse,
    IClientResponseDto,
    IClientResponseDtoApiResponse,
    IClientStatisticsResponseDto,
    IClientStatisticsResponseDtoApiResponse,
    IClientSummaryResponseDto,
    IClientUpdateDto,
    IComparisonScoreDto,
    IConcreteBlockResponseDto,
    IConcreteBlockResponseDtoApiResponse,
    IConcreteBlockResponseDtoListApiResponse,
    IConcreteCreateDto,
    IConcreteUpdateDto,
    IConnectionTestResult,
    IConnectionTestResultApiResponse,
    IContainerDeploymentRequestDto,
    IContainerHealthCheckDto,
    IContainerPortMappingDto,
    IContainerResourceLimitsDto,
    IContainerVolumeMountDto,
    ICopyBlockDto,
    ICreateFromTMDto,
    IDeploymentHistoryDto,
    IDeploymentHistoryDtoListApiResponse,
    IDeploymentResourceUsageDto,
    IDeploymentResourceUsageDtoApiResponse,
    IDeploymentStatisticsDto,
    IDeploymentStatisticsDtoApiResponse,
    IDeploymentValidationResult,
    IDeploymentValidationResultApiResponse,
    IDownloadRequest,
    IEarthquakeLevelDto,
    IEarthquakeLevelResponseDto,
    IExecutionCleanupReportDto,
    IExecutionCleanupReportDtoListApiResponse,
    IExecutionDetailDto,
    IExecutionDetailDtoApiResponse,
    IExecutionDto,
    IExecutionDtoApiResponse,
    IExecutionEnvironmentDto,
    IExecutionEnvironmentDtoApiResponse,
    IExecutionEnvironmentUpdateDto,
    IExecutionListDto,
    IExecutionListDtoListApiResponse,
    IExecutionListDtoPagedResponse,
    IExecutionListDtoPagedResponseApiResponse,
    IExecutionOutputFileContentDto,
    IExecutionOutputFileContentDtoApiResponse,
    IExecutionOutputFileDto,
    IExecutionOutputFileDtoListApiResponse,
    IExecutionParametersDto,
    IExecutionPerformanceDto,
    IExecutionPerformanceDtoListApiResponse,
    IExecutionQueueStatusDto,
    IExecutionQueueStatusDtoApiResponse,
    IExecutionResourceLimitsDto,
    IExecutionResourceLimitsDtoApiResponse,
    IExecutionResourceLimitsUpdateDto,
    IExecutionResourceTrendDto,
    IExecutionResourceTrendDtoListApiResponse,
    IExecutionResourceUpdateDto,
    IExecutionResourceUsageDto,
    IExecutionResourceUsageDtoApiResponse,
    IExecutionResultDto,
    IExecutionResultDtoApiResponse,
    IExecutionScheduleRequestDto,
    IExecutionSearchDto,
    IExecutionSecurityScanResult,
    IExecutionSecurityScanResultApiResponse,
    IExecutionStatsDto,
    IExecutionStatsDtoApiResponse,
    IExecutionStatusDto,
    IExecutionStatusDtoApiResponse,
    IExecutionSummaryDto,
    IExecutionSummaryDtoApiResponse,
    IExecutionTemplateDto,
    IExecutionTemplateDtoListApiResponse,
    IExecutionTrendDto,
    IExecutionTrendDtoListApiResponse,
    IExecutionValidationResult,
    IExecutionValidationResultApiResponse,
    IFileStorageResult,
    IFileStorageResultListApiResponse,
    IFileValidationRequest,
    IFileValidationResult,
    IFileValidationResultApiResponse,
    IFireHazardDto,
    IFireHazardResponseDto,
    IFloodHazardDto,
    IFloodHazardResponseDto,
    IHazardResponseDto,
    IHazardSummaryResponseDto,
    IHealthCheckResultDto,
    IInt32ApiResponse,
    ILandslideHazardDto,
    ILandslideHazardResponseDto,
    ILocationRequestDto,
    ILocationResponseDto,
    IMasonryBlockResponseDto,
    IMasonryBlockResponseDtoApiResponse,
    IMasonryBlockResponseDtoListApiResponse,
    IMasonryCreateDto,
    IMasonryUnitType,
    IMasonryUnitTypeResponseDto,
    IMasonryUpdateDto,
    INoiseHazardDto,
    INoiseHazardResponseDto,
    IPasswordResetResponseDto,
    IPasswordResetResponseDtoApiResponse,
    IPollutionDto,
    IPollutionResponseDto,
    IProgramComponentMappingDto,
    IProgramComponentMappingDtoListApiResponse,
    IProgramCreateDto,
    IProgramDeploymentDto,
    IProgramDeploymentDtoApiResponse,
    IProgramDeploymentStatusDto,
    IProgramDeploymentStatusDtoApiResponse,
    IProgramDetailDto,
    IProgramDetailDtoApiResponse,
    IProgramDto,
    IProgramDtoApiResponse,
    IProgramExecutionRequestDto,
    IProgramFileDto,
    IProgramGroupPermissionDto,
    IProgramListDto,
    IProgramListDtoPagedResponse,
    IProgramListDtoPagedResponseApiResponse,
    IProgramPermissionDto,
    IProgramPermissionDtoListApiResponse,
    IProgramSearchDto,
    IProgramStatsDto,
    IProgramUpdateDto,
    IProgramUserPermissionDto,
    IProjectComplexityDto,
    IProjectFileDto,
    IProjectSecurityScanDto,
    IProjectStructureAnalysisDto,
    IProjectStructureAnalysisDtoApiResponse,
    IProjectValidationResultDto,
    IProjectValidationResultDtoApiResponse,
    IRefreshTokenDto,
    IRegionCityUpdateDto,
    IRegionCreateDto,
    IRegionDetailResponseDto,
    IRegionDetailResponseDtoApiResponse,
    IRegionListResponseDto,
    IRegionListResponseDtoPagedResponse,
    IRegionListResponseDtoPagedResponseApiResponse,
    IRegionResponseDto,
    IRegionResponseDtoApiResponse,
    IRegionStatisticsResponseDto,
    IRegionStatisticsResponseDtoApiResponse,
    IRegionSummaryResponseDto,
    IRegionSummaryResponseDtoListApiResponse,
    IRegionUpdateDto,
    IRequestAssignmentDto,
    IRequestCompletionDto,
    IRequestCreateDto,
    IRequestDetailDto,
    IRequestDetailDtoApiResponse,
    IRequestDto,
    IRequestDtoApiResponse,
    IRequestFromTemplateDto,
    IRequestListDto,
    IRequestListDtoListApiResponse,
    IRequestListDtoPagedResponse,
    IRequestListDtoPagedResponseApiResponse,
    IRequestMetricDto,
    IRequestMetricDtoListApiResponse,
    IRequestPerformanceDto,
    IRequestPerformanceDtoListApiResponse,
    IRequestPriorityUpdateDto,
    IRequestRejectionDto,
    IRequestRelatedEntityDto,
    IRequestResponseCreateDto,
    IRequestResponseDto,
    IRequestResponseDtoApiResponse,
    IRequestResponseDtoListApiResponse,
    IRequestResponseUpdateDto,
    IRequestSearchDto,
    IRequestStatsDto,
    IRequestStatsDtoApiResponse,
    IRequestStatusUpdateDto,
    IRequestTemplateCreateDto,
    IRequestTemplateDto,
    IRequestTemplateDtoApiResponse,
    IRequestTemplateDtoListApiResponse,
    IRequestTimelineDto,
    IRequestTimelineEventDto,
    IRequestTrendDto,
    IRequestTrendDtoListApiResponse,
    IRequestUpdateDto,
    IRequestValidationResult,
    IRequestValidationResultApiResponse,
    IRequestValidationSuggestionDto,
    IRevokeTokenDto,
    IRockFallHazardDto,
    IRockFallHazardResponseDto,
    IRollbackRequestDto,
    ISecurityHazardDto,
    ISecurityHazardResponseDto,
    ISecurityIssueDto,
    ISoilDto,
    ISoilResponseDto,
    IStaticSiteDeploymentRequestDto,
    IStorageStatistics,
    IStorageStatisticsApiResponse,
    IStringApiResponse,
    IStringListApiResponse,
    IStringStringDictionaryApiResponse,
    IStringStringListDictionaryApiResponse,
    ISupportedDeploymentOptionDto,
    ISupportedDeploymentOptionDtoListApiResponse,
    ITMCreateDto,
    ITMDetailResponseDto,
    ITMDetailResponseDtoApiResponse,
    ITMHazardSummaryResponseDto,
    ITMHazardSummaryResponseDtoApiResponse,
    ITMListResponseDto,
    ITMListResponseDtoPagedResponse,
    ITMListResponseDtoPagedResponseApiResponse,
    ITMResponseDto,
    ITMResponseDtoApiResponse,
    ITMSearchDto,
    ITMStateUpdateDto,
    ITMStatisticsResponseDto,
    ITMStatisticsResponseDtoApiResponse,
    ITMSummaryResponseDto,
    ITMUpdateDto,
    ITMVoltageUpdateDto,
    ITokenResponseDto,
    ITokenResponseDtoApiResponse,
    ITsunamiHazardDto,
    ITsunamiHazardResponseDto,
    IUiComponentAssetDto,
    IUiComponentAssetDtoListApiResponse,
    IUiComponentAssetUploadDto,
    IUiComponentBundleDto,
    IUiComponentBundleDtoApiResponse,
    IUiComponentBundleInfoDto,
    IUiComponentBundleUploadDto,
    IUiComponentCategoryDto,
    IUiComponentCategoryDtoListApiResponse,
    IUiComponentCompatibilitySearchDto,
    IUiComponentConfigDto,
    IUiComponentConfigDtoApiResponse,
    IUiComponentConfigUpdateDto,
    IUiComponentCreateDto,
    IUiComponentDetailDto,
    IUiComponentDetailDtoApiResponse,
    IUiComponentDto,
    IUiComponentDtoApiResponse,
    IUiComponentListDto,
    IUiComponentListDtoListApiResponse,
    IUiComponentListDtoPagedResponse,
    IUiComponentListDtoPagedResponseApiResponse,
    IUiComponentMappingDto,
    IUiComponentRecommendationDto,
    IUiComponentRecommendationDtoListApiResponse,
    IUiComponentSchemaDto,
    IUiComponentSchemaDtoApiResponse,
    IUiComponentSchemaUpdateDto,
    IUiComponentSearchDto,
    IUiComponentStatsDto,
    IUiComponentUpdateDto,
    IUiComponentUsageDto,
    IUiComponentUsageDtoListApiResponse,
    IUiComponentValidationResult,
    IUiComponentValidationResultApiResponse,
    IUiComponentValidationSuggestionDto,
    IUserDetailDto,
    IUserDetailDtoApiResponse,
    IUserDto,
    IUserDtoApiResponse,
    IUserListDto,
    IUserListDtoPagedResponse,
    IUserListDtoPagedResponseApiResponse,
    IUserLoginDto,
    IUserPasswordChangeDto,
    IUserPasswordResetDto,
    IUserPasswordResetRequestDto,
    IUserPermissionUpdateDto,
    IUserProfileDto,
    IUserProfileDtoApiResponse,
    IUserRegisterDto,
    IUserRoleUpdateDto,
    IUserSearchDto,
    IUserUpdateDto,
    IVersionActivityDto,
    IVersionActivityDtoListApiResponse,
    IVersionChangeDto,
    IVersionChangeDtoListApiResponse,
    IVersionCommitDto,
    IVersionCommitValidationDto,
    IVersionCreateDto,
    IVersionDeploymentDto,
    IVersionDeploymentDtoApiResponse,
    IVersionDeploymentInfoDto,
    IVersionDeploymentRequestDto,
    IVersionDetailDto,
    IVersionDetailDtoApiResponse,
    IVersionDiffDto,
    IVersionDiffDtoApiResponse,
    IVersionDiffStatsDto,
    IVersionDto,
    IVersionDtoApiResponse,
    IVersionExecutionRequestDto,
    IVersionFileChangeDto,
    IVersionFileChangeSummaryDto,
    IVersionFileCreateDto,
    IVersionFileDetailDto,
    IVersionFileDetailDtoApiResponse,
    IVersionFileDto,
    IVersionFileDtoListApiResponse,
    IVersionFileUpdateDto,
    IVersionListDto,
    IVersionListDtoPagedResponse,
    IVersionListDtoPagedResponseApiResponse,
    IVersionReviewDto,
    IVersionReviewDtoApiResponse,
    IVersionReviewSubmissionDto,
    IVersionSearchDto,
    IVersionStatsDto,
    IVersionStatsDtoApiResponse,
    IVersionStatusUpdateDto,
    IVersionUpdateDto,
    IWebAppDeploymentRequestDto,
    IWebAppStatusDto,
    IWebAppStatusDtoApiResponse,
    INoiseMeasurementsForBuildings
} from './typeInterfaces'
import {
    AppDeploymentType,
    BuildingType,
    ClientType,
    Level,
    Operation,
    PerimeterWallType, 
    SortDirection,
    TBDY2018SoilClass,
    TDY2007SoilClass,
    TMState,
    TMType,
    WallCondition
} from './enums';

//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.4.0.0 (NJsonSchema v11.3.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming
export class ActiveDeploymentDto implements IActiveDeploymentDto {
    programId?: string | undefined;
    programName?: string | undefined;
    version?: string | undefined;
    deploymentType?: string | undefined;
    status?: string | undefined;
    deployedAt?: Date;
    url?: string | undefined;
    healthStatus?: string | undefined;
    constructor(data?: IActiveDeploymentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programId = _data["programId"];
            this.programName = _data["programName"];
            this.version = _data["version"];
            this.deploymentType = _data["deploymentType"];
            this.status = _data["status"];
            this.deployedAt = _data["deployedAt"] ? new Date(_data["deployedAt"].toString()) : <any>undefined;
            this.url = _data["url"];
            this.healthStatus = _data["healthStatus"];
        }
    }
    static fromJS(data: any): ActiveDeploymentDto {
        data = typeof data === 'object' ? data : {};
        let result = new ActiveDeploymentDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programId"] = this.programId;
        data["programName"] = this.programName;
        data["version"] = this.version;
        data["deploymentType"] = this.deploymentType;
        data["status"] = this.status;
        data["deployedAt"] = this.deployedAt ? this.deployedAt.toISOString() : <any>undefined;
        data["url"] = this.url;
        data["healthStatus"] = this.healthStatus;
        return data;
    }
}

export class ActiveDeploymentDtoListApiResponse implements IActiveDeploymentDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ActiveDeploymentDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IActiveDeploymentDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(ActiveDeploymentDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ActiveDeploymentDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ActiveDeploymentDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class AddressDto implements IAddressDto {
    city?: string | undefined;
    county?: string | undefined;
    district?: string | undefined;
    street?: string | undefined;
    constructor(data?: IAddressDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.city = _data["city"];
            this.county = _data["county"];
            this.district = _data["district"];
            this.street = _data["street"];
        }
    }
    static fromJS(data: any): AddressDto {
        data = typeof data === 'object' ? data : {};
        let result = new AddressDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["city"] = this.city;
        data["county"] = this.county;
        data["district"] = this.district;
        data["street"] = this.street;
        return data;
    }
}

export class AddressResponseDto implements IAddressResponseDto {
    city?: string | undefined;
    county?: string | undefined;
    district?: string | undefined;
    street?: string | undefined;
    constructor(data?: IAddressResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.city = _data["city"];
            this.county = _data["county"];
            this.district = _data["district"];
            this.street = _data["street"];
        }
    }
    static fromJS(data: any): AddressResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new AddressResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["city"] = this.city;
        data["county"] = this.county;
        data["district"] = this.district;
        data["street"] = this.street;
        return data;
    }
}

export class AlternativeTMComparisonResponseDto implements IAlternativeTMComparisonResponseDto {
    id?: string | undefined;
    location?: LocationRequestDto;
    address?: AddressDto;
    hazardSummary?: HazardSummaryResponseDto;
    distanceFromOriginal?: number;
    comparisonScore?: ComparisonScoreDto;
    constructor(data?: IAlternativeTMComparisonResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.location = _data["location"] ? LocationRequestDto.fromJS(_data["location"]) : <any>undefined;
            this.address = _data["address"] ? AddressDto.fromJS(_data["address"]) : <any>undefined;
            this.hazardSummary = _data["hazardSummary"] ? HazardSummaryResponseDto.fromJS(_data["hazardSummary"]) : <any>undefined;
            this.distanceFromOriginal = _data["distanceFromOriginal"];
            this.comparisonScore = _data["comparisonScore"] ? ComparisonScoreDto.fromJS(_data["comparisonScore"]) : <any>undefined;
        }
    }
    static fromJS(data: any): AlternativeTMComparisonResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new AlternativeTMComparisonResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["location"] = this.location ? this.location.toJSON() : <any>undefined;
        data["address"] = this.address ? this.address.toJSON() : <any>undefined;
        data["hazardSummary"] = this.hazardSummary ? this.hazardSummary.toJSON() : <any>undefined;
        data["distanceFromOriginal"] = this.distanceFromOriginal;
        data["comparisonScore"] = this.comparisonScore ? this.comparisonScore.toJSON() : <any>undefined;
        return data;
    }
}

export class AlternativeTMComparisonResponseDtoListApiResponse implements IAlternativeTMComparisonResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: AlternativeTMComparisonResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IAlternativeTMComparisonResponseDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(AlternativeTMComparisonResponseDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): AlternativeTMComparisonResponseDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new AlternativeTMComparisonResponseDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class AlternativeTMCreateDto implements IAlternativeTMCreateDto {
    tmId!: string;
    location!: LocationRequestDto;
    address?: AddressDto;
    dD1!: EarthquakeLevelDto;
    dD2!: EarthquakeLevelDto;
    dD3!: EarthquakeLevelDto;
    earthquakeScenario?: EarthquakeLevelDto;
    pollution!: PollutionDto;
    fireHazard!: FireHazardDto;
    securityHazard!: SecurityHazardDto;
    noiseHazard!: NoiseHazardDto;
    avalancheHazard!: AvalancheHazardDto;
    landslideHazard!: LandslideHazardDto;
    rockFallHazard!: RockFallHazardDto;
    floodHazard!: FloodHazardDto;
    tsunamiHazard!: TsunamiHazardDto;
    soil!: SoilDto;
    constructor(data?: IAlternativeTMCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.location = new LocationRequestDto();
            this.dD1 = new EarthquakeLevelDto();
            this.dD2 = new EarthquakeLevelDto();
            this.dD3 = new EarthquakeLevelDto();
            this.pollution = new PollutionDto();
            this.fireHazard = new FireHazardDto();
            this.securityHazard = new SecurityHazardDto();
            this.noiseHazard = new NoiseHazardDto();
            this.avalancheHazard = new AvalancheHazardDto();
            this.landslideHazard = new LandslideHazardDto();
            this.rockFallHazard = new RockFallHazardDto();
            this.floodHazard = new FloodHazardDto();
            this.tsunamiHazard = new TsunamiHazardDto();
            this.soil = new SoilDto();
        }
    }
    init(_data?: any) {
        if (_data) {
            this.tmId = _data["tmId"];
            this.location = _data["location"] ? LocationRequestDto.fromJS(_data["location"]) : new LocationRequestDto();
            this.address = _data["address"] ? AddressDto.fromJS(_data["address"]) : <any>undefined;
            this.dD1 = _data["dD1"] ? EarthquakeLevelDto.fromJS(_data["dD1"]) : new EarthquakeLevelDto();
            this.dD2 = _data["dD2"] ? EarthquakeLevelDto.fromJS(_data["dD2"]) : new EarthquakeLevelDto();
            this.dD3 = _data["dD3"] ? EarthquakeLevelDto.fromJS(_data["dD3"]) : new EarthquakeLevelDto();
            this.earthquakeScenario = _data["earthquakeScenario"] ? EarthquakeLevelDto.fromJS(_data["earthquakeScenario"]) : <any>undefined;
            this.pollution = _data["pollution"] ? PollutionDto.fromJS(_data["pollution"]) : new PollutionDto();
            this.fireHazard = _data["fireHazard"] ? FireHazardDto.fromJS(_data["fireHazard"]) : new FireHazardDto();
            this.securityHazard = _data["securityHazard"] ? SecurityHazardDto.fromJS(_data["securityHazard"]) : new SecurityHazardDto();
            this.noiseHazard = _data["noiseHazard"] ? NoiseHazardDto.fromJS(_data["noiseHazard"]) : new NoiseHazardDto();
            this.avalancheHazard = _data["avalancheHazard"] ? AvalancheHazardDto.fromJS(_data["avalancheHazard"]) : new AvalancheHazardDto();
            this.landslideHazard = _data["landslideHazard"] ? LandslideHazardDto.fromJS(_data["landslideHazard"]) : new LandslideHazardDto();
            this.rockFallHazard = _data["rockFallHazard"] ? RockFallHazardDto.fromJS(_data["rockFallHazard"]) : new RockFallHazardDto();
            this.floodHazard = _data["floodHazard"] ? FloodHazardDto.fromJS(_data["floodHazard"]) : new FloodHazardDto();
            this.tsunamiHazard = _data["tsunamiHazard"] ? TsunamiHazardDto.fromJS(_data["tsunamiHazard"]) : new TsunamiHazardDto();
            this.soil = _data["soil"] ? SoilDto.fromJS(_data["soil"]) : new SoilDto();
        }
    }
    static fromJS(data: any): AlternativeTMCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new AlternativeTMCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["tmId"] = this.tmId;
        data["location"] = this.location ? this.location.toJSON() : <any>undefined;
        data["address"] = this.address ? this.address.toJSON() : <any>undefined;
        data["dD1"] = this.dD1 ? this.dD1.toJSON() : <any>undefined;
        data["dD2"] = this.dD2 ? this.dD2.toJSON() : <any>undefined;
        data["dD3"] = this.dD3 ? this.dD3.toJSON() : <any>undefined;
        data["earthquakeScenario"] = this.earthquakeScenario ? this.earthquakeScenario.toJSON() : <any>undefined;
        data["pollution"] = this.pollution ? this.pollution.toJSON() : <any>undefined;
        data["fireHazard"] = this.fireHazard ? this.fireHazard.toJSON() : <any>undefined;
        data["securityHazard"] = this.securityHazard ? this.securityHazard.toJSON() : <any>undefined;
        data["noiseHazard"] = this.noiseHazard ? this.noiseHazard.toJSON() : <any>undefined;
        data["avalancheHazard"] = this.avalancheHazard ? this.avalancheHazard.toJSON() : <any>undefined;
        data["landslideHazard"] = this.landslideHazard ? this.landslideHazard.toJSON() : <any>undefined;
        data["rockFallHazard"] = this.rockFallHazard ? this.rockFallHazard.toJSON() : <any>undefined;
        data["floodHazard"] = this.floodHazard ? this.floodHazard.toJSON() : <any>undefined;
        data["tsunamiHazard"] = this.tsunamiHazard ? this.tsunamiHazard.toJSON() : <any>undefined;
        data["soil"] = this.soil ? this.soil.toJSON() : <any>undefined;
        return data;
    }
}

export class AlternativeTMDetailResponseDto implements IAlternativeTMDetailResponseDto {
    id?: string | undefined;
    tmId?: string | undefined;
    location?: LocationResponseDto;
    address?: AddressResponseDto;
    dD1?: EarthquakeLevelResponseDto;
    dD2?: EarthquakeLevelResponseDto;
    dD3?: EarthquakeLevelResponseDto;
    earthquakeScenario?: EarthquakeLevelResponseDto;
    tm?: TMSummaryResponseDto;
    pollution?: PollutionResponseDto;
    fireHazard?: FireHazardResponseDto;
    securityHazard?: SecurityHazardResponseDto;
    noiseHazard?: NoiseHazardResponseDto;
    avalancheHazard?: AvalancheHazardResponseDto;
    landslideHazard?: LandslideHazardResponseDto;
    rockFallHazard?: RockFallHazardResponseDto;
    floodHazard?: FloodHazardResponseDto;
    tsunamiHazard?: TsunamiHazardResponseDto;
    soil?: SoilResponseDto;
    hazardSummary?: HazardSummaryResponseDto;
    constructor(data?: IAlternativeTMDetailResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.tmId = _data["tmId"];
            this.location = _data["location"] ? LocationResponseDto.fromJS(_data["location"]) : <any>undefined;
            this.address = _data["address"] ? AddressResponseDto.fromJS(_data["address"]) : <any>undefined;
            this.dD1 = _data["dD1"] ? EarthquakeLevelResponseDto.fromJS(_data["dD1"]) : <any>undefined;
            this.dD2 = _data["dD2"] ? EarthquakeLevelResponseDto.fromJS(_data["dD2"]) : <any>undefined;
            this.dD3 = _data["dD3"] ? EarthquakeLevelResponseDto.fromJS(_data["dD3"]) : <any>undefined;
            this.earthquakeScenario = _data["earthquakeScenario"] ? EarthquakeLevelResponseDto.fromJS(_data["earthquakeScenario"]) : <any>undefined;
            this.tm = _data["tm"] ? TMSummaryResponseDto.fromJS(_data["tm"]) : <any>undefined;
            this.pollution = _data["pollution"] ? PollutionResponseDto.fromJS(_data["pollution"]) : <any>undefined;
            this.fireHazard = _data["fireHazard"] ? FireHazardResponseDto.fromJS(_data["fireHazard"]) : <any>undefined;
            this.securityHazard = _data["securityHazard"] ? SecurityHazardResponseDto.fromJS(_data["securityHazard"]) : <any>undefined;
            this.noiseHazard = _data["noiseHazard"] ? NoiseHazardResponseDto.fromJS(_data["noiseHazard"]) : <any>undefined;
            this.avalancheHazard = _data["avalancheHazard"] ? AvalancheHazardResponseDto.fromJS(_data["avalancheHazard"]) : <any>undefined;
            this.landslideHazard = _data["landslideHazard"] ? LandslideHazardResponseDto.fromJS(_data["landslideHazard"]) : <any>undefined;
            this.rockFallHazard = _data["rockFallHazard"] ? RockFallHazardResponseDto.fromJS(_data["rockFallHazard"]) : <any>undefined;
            this.floodHazard = _data["floodHazard"] ? FloodHazardResponseDto.fromJS(_data["floodHazard"]) : <any>undefined;
            this.tsunamiHazard = _data["tsunamiHazard"] ? TsunamiHazardResponseDto.fromJS(_data["tsunamiHazard"]) : <any>undefined;
            this.soil = _data["soil"] ? SoilResponseDto.fromJS(_data["soil"]) : <any>undefined;
            this.hazardSummary = _data["hazardSummary"] ? HazardSummaryResponseDto.fromJS(_data["hazardSummary"]) : <any>undefined;
        }
    }
    static fromJS(data: any): AlternativeTMDetailResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new AlternativeTMDetailResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["tmId"] = this.tmId;
        data["location"] = this.location ? this.location.toJSON() : <any>undefined;
        data["address"] = this.address ? this.address.toJSON() : <any>undefined;
        data["dD1"] = this.dD1 ? this.dD1.toJSON() : <any>undefined;
        data["dD2"] = this.dD2 ? this.dD2.toJSON() : <any>undefined;
        data["dD3"] = this.dD3 ? this.dD3.toJSON() : <any>undefined;
        data["earthquakeScenario"] = this.earthquakeScenario ? this.earthquakeScenario.toJSON() : <any>undefined;
        data["tm"] = this.tm ? this.tm.toJSON() : <any>undefined;
        data["pollution"] = this.pollution ? this.pollution.toJSON() : <any>undefined;
        data["fireHazard"] = this.fireHazard ? this.fireHazard.toJSON() : <any>undefined;
        data["securityHazard"] = this.securityHazard ? this.securityHazard.toJSON() : <any>undefined;
        data["noiseHazard"] = this.noiseHazard ? this.noiseHazard.toJSON() : <any>undefined;
        data["avalancheHazard"] = this.avalancheHazard ? this.avalancheHazard.toJSON() : <any>undefined;
        data["landslideHazard"] = this.landslideHazard ? this.landslideHazard.toJSON() : <any>undefined;
        data["rockFallHazard"] = this.rockFallHazard ? this.rockFallHazard.toJSON() : <any>undefined;
        data["floodHazard"] = this.floodHazard ? this.floodHazard.toJSON() : <any>undefined;
        data["tsunamiHazard"] = this.tsunamiHazard ? this.tsunamiHazard.toJSON() : <any>undefined;
        data["soil"] = this.soil ? this.soil.toJSON() : <any>undefined;
        data["hazardSummary"] = this.hazardSummary ? this.hazardSummary.toJSON() : <any>undefined;
        return data;
    }
}

export class AlternativeTMDetailResponseDtoApiResponse implements IAlternativeTMDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: AlternativeTMDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IAlternativeTMDetailResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? AlternativeTMDetailResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): AlternativeTMDetailResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new AlternativeTMDetailResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class AlternativeTMResponseDto implements IAlternativeTMResponseDto {
    id?: string | undefined;
    tmId?: string | undefined;
    location?: LocationResponseDto;
    address?: AddressResponseDto;
    dD1?: EarthquakeLevelResponseDto;
    dD2?: EarthquakeLevelResponseDto;
    dD3?: EarthquakeLevelResponseDto;
    earthquakeScenario?: EarthquakeLevelResponseDto;
    constructor(data?: IAlternativeTMResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.tmId = _data["tmId"];
            this.location = _data["location"] ? LocationResponseDto.fromJS(_data["location"]) : <any>undefined;
            this.address = _data["address"] ? AddressResponseDto.fromJS(_data["address"]) : <any>undefined;
            this.dD1 = _data["dD1"] ? EarthquakeLevelResponseDto.fromJS(_data["dD1"]) : <any>undefined;
            this.dD2 = _data["dD2"] ? EarthquakeLevelResponseDto.fromJS(_data["dD2"]) : <any>undefined;
            this.dD3 = _data["dD3"] ? EarthquakeLevelResponseDto.fromJS(_data["dD3"]) : <any>undefined;
            this.earthquakeScenario = _data["earthquakeScenario"] ? EarthquakeLevelResponseDto.fromJS(_data["earthquakeScenario"]) : <any>undefined;
        }
    }
    static fromJS(data: any): AlternativeTMResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new AlternativeTMResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["tmId"] = this.tmId;
        data["location"] = this.location ? this.location.toJSON() : <any>undefined;
        data["address"] = this.address ? this.address.toJSON() : <any>undefined;
        data["dD1"] = this.dD1 ? this.dD1.toJSON() : <any>undefined;
        data["dD2"] = this.dD2 ? this.dD2.toJSON() : <any>undefined;
        data["dD3"] = this.dD3 ? this.dD3.toJSON() : <any>undefined;
        data["earthquakeScenario"] = this.earthquakeScenario ? this.earthquakeScenario.toJSON() : <any>undefined;
        return data;
    }
}

export class AlternativeTMResponseDtoApiResponse implements IAlternativeTMResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: AlternativeTMResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IAlternativeTMResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? AlternativeTMResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): AlternativeTMResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new AlternativeTMResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class AlternativeTMSummaryResponseDto implements IAlternativeTMSummaryResponseDto {
    id?: string | undefined;
    location?: LocationResponseDto;
    city?: string | undefined;
    overallRiskScore?: number;
    constructor(data?: IAlternativeTMSummaryResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.location = _data["location"] ? LocationResponseDto.fromJS(_data["location"]) : <any>undefined;
            this.city = _data["city"];
            this.overallRiskScore = _data["overallRiskScore"];
        }
    }
    static fromJS(data: any): AlternativeTMSummaryResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new AlternativeTMSummaryResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["location"] = this.location ? this.location.toJSON() : <any>undefined;
        data["city"] = this.city;
        data["overallRiskScore"] = this.overallRiskScore;
        return data;
    }
}

export class AlternativeTMSummaryResponseDtoPagedResponse implements IAlternativeTMSummaryResponseDtoPagedResponse {
    items?: AlternativeTMSummaryResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
    constructor(data?: IAlternativeTMSummaryResponseDtoPagedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(AlternativeTMSummaryResponseDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            (<any>this).hasPreviousPage = _data["hasPreviousPage"];
            (<any>this).hasNextPage = _data["hasNextPage"];
        }
    }
    static fromJS(data: any): AlternativeTMSummaryResponseDtoPagedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new AlternativeTMSummaryResponseDtoPagedResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item ? item.toJSON() : <any>undefined);
        }
        data["pageNumber"] = this.pageNumber;
        data["pageSize"] = this.pageSize;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export class AlternativeTMSummaryResponseDtoPagedResponseApiResponse implements IAlternativeTMSummaryResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: AlternativeTMSummaryResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IAlternativeTMSummaryResponseDtoPagedResponseApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? AlternativeTMSummaryResponseDtoPagedResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): AlternativeTMSummaryResponseDtoPagedResponseApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new AlternativeTMSummaryResponseDtoPagedResponseApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class AlternativeTMUpdateDto implements IAlternativeTMUpdateDto {
    tmId?: string | undefined;
    location?: LocationRequestDto;
    address?: AddressDto;
    dD1?: EarthquakeLevelDto;
    dD2?: EarthquakeLevelDto;
    dD3?: EarthquakeLevelDto;
    earthquakeScenario?: EarthquakeLevelDto;
    pollution?: PollutionDto;
    fireHazard?: FireHazardDto;
    securityHazard?: SecurityHazardDto;
    noiseHazard?: NoiseHazardDto;
    avalancheHazard?: AvalancheHazardDto;
    landslideHazard?: LandslideHazardDto;
    rockFallHazard?: RockFallHazardDto;
    floodHazard?: FloodHazardDto;
    tsunamiHazard?: TsunamiHazardDto;
    soil?: SoilDto;
    constructor(data?: IAlternativeTMUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.tmId = _data["tmId"];
            this.location = _data["location"] ? LocationRequestDto.fromJS(_data["location"]) : <any>undefined;
            this.address = _data["address"] ? AddressDto.fromJS(_data["address"]) : <any>undefined;
            this.dD1 = _data["dD1"] ? EarthquakeLevelDto.fromJS(_data["dD1"]) : <any>undefined;
            this.dD2 = _data["dD2"] ? EarthquakeLevelDto.fromJS(_data["dD2"]) : <any>undefined;
            this.dD3 = _data["dD3"] ? EarthquakeLevelDto.fromJS(_data["dD3"]) : <any>undefined;
            this.earthquakeScenario = _data["earthquakeScenario"] ? EarthquakeLevelDto.fromJS(_data["earthquakeScenario"]) : <any>undefined;
            this.pollution = _data["pollution"] ? PollutionDto.fromJS(_data["pollution"]) : <any>undefined;
            this.fireHazard = _data["fireHazard"] ? FireHazardDto.fromJS(_data["fireHazard"]) : <any>undefined;
            this.securityHazard = _data["securityHazard"] ? SecurityHazardDto.fromJS(_data["securityHazard"]) : <any>undefined;
            this.noiseHazard = _data["noiseHazard"] ? NoiseHazardDto.fromJS(_data["noiseHazard"]) : <any>undefined;
            this.avalancheHazard = _data["avalancheHazard"] ? AvalancheHazardDto.fromJS(_data["avalancheHazard"]) : <any>undefined;
            this.landslideHazard = _data["landslideHazard"] ? LandslideHazardDto.fromJS(_data["landslideHazard"]) : <any>undefined;
            this.rockFallHazard = _data["rockFallHazard"] ? RockFallHazardDto.fromJS(_data["rockFallHazard"]) : <any>undefined;
            this.floodHazard = _data["floodHazard"] ? FloodHazardDto.fromJS(_data["floodHazard"]) : <any>undefined;
            this.tsunamiHazard = _data["tsunamiHazard"] ? TsunamiHazardDto.fromJS(_data["tsunamiHazard"]) : <any>undefined;
            this.soil = _data["soil"] ? SoilDto.fromJS(_data["soil"]) : <any>undefined;
        }
    }
    static fromJS(data: any): AlternativeTMUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new AlternativeTMUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["tmId"] = this.tmId;
        data["location"] = this.location ? this.location.toJSON() : <any>undefined;
        data["address"] = this.address ? this.address.toJSON() : <any>undefined;
        data["dD1"] = this.dD1 ? this.dD1.toJSON() : <any>undefined;
        data["dD2"] = this.dD2 ? this.dD2.toJSON() : <any>undefined;
        data["dD3"] = this.dD3 ? this.dD3.toJSON() : <any>undefined;
        data["earthquakeScenario"] = this.earthquakeScenario ? this.earthquakeScenario.toJSON() : <any>undefined;
        data["pollution"] = this.pollution ? this.pollution.toJSON() : <any>undefined;
        data["fireHazard"] = this.fireHazard ? this.fireHazard.toJSON() : <any>undefined;
        data["securityHazard"] = this.securityHazard ? this.securityHazard.toJSON() : <any>undefined;
        data["noiseHazard"] = this.noiseHazard ? this.noiseHazard.toJSON() : <any>undefined;
        data["avalancheHazard"] = this.avalancheHazard ? this.avalancheHazard.toJSON() : <any>undefined;
        data["landslideHazard"] = this.landslideHazard ? this.landslideHazard.toJSON() : <any>undefined;
        data["rockFallHazard"] = this.rockFallHazard ? this.rockFallHazard.toJSON() : <any>undefined;
        data["floodHazard"] = this.floodHazard ? this.floodHazard.toJSON() : <any>undefined;
        data["tsunamiHazard"] = this.tsunamiHazard ? this.tsunamiHazard.toJSON() : <any>undefined;
        data["soil"] = this.soil ? this.soil.toJSON() : <any>undefined;
        return data;
    }
}

export class AppDeploymentConfigUpdateDto implements IAppDeploymentConfigUpdateDto {
    configuration?: { [key: string]: any; } | undefined;
    environment?: { [key: string]: string; } | undefined;
    supportedFeatures?: string[] | undefined;
    domainName?: string | undefined;
    port?: number | undefined;
    constructor(data?: IAppDeploymentConfigUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            if (Array.isArray(_data["supportedFeatures"])) {
                this.supportedFeatures = [] as any;
                for (let item of _data["supportedFeatures"])
                    this.supportedFeatures!.push(item);
            }
            this.domainName = _data["domainName"];
            this.port = _data["port"];
        }
    }
    static fromJS(data: any): AppDeploymentConfigUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new AppDeploymentConfigUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        if (Array.isArray(this.supportedFeatures)) {
            data["supportedFeatures"] = [];
            for (let item of this.supportedFeatures)
                data["supportedFeatures"].push(item);
        }
        data["domainName"] = this.domainName;
        data["port"] = this.port;
        return data;
    }
}

export class AppDeploymentInfo implements IAppDeploymentInfo {
    deploymentType?: AppDeploymentType;
    configuration?: { [key: string]: any; } | undefined;
    lastDeployed?: Date | undefined;
    status?: string | undefined;
    supportedFeatures?: string[] | undefined;
    constructor(data?: IAppDeploymentInfo) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.deploymentType = _data["deploymentType"];
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
            this.lastDeployed = _data["lastDeployed"] ? new Date(_data["lastDeployed"].toString()) : <any>undefined;
            this.status = _data["status"];
            if (Array.isArray(_data["supportedFeatures"])) {
                this.supportedFeatures = [] as any;
                for (let item of _data["supportedFeatures"])
                    this.supportedFeatures!.push(item);
            }
        }
    }
    static fromJS(data: any): AppDeploymentInfo {
        data = typeof data === 'object' ? data : {};
        let result = new AppDeploymentInfo();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["deploymentType"] = this.deploymentType;
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        data["lastDeployed"] = this.lastDeployed ? this.lastDeployed.toISOString() : <any>undefined;
        data["status"] = this.status;
        if (Array.isArray(this.supportedFeatures)) {
            data["supportedFeatures"] = [];
            for (let item of this.supportedFeatures)
                data["supportedFeatures"].push(item);
        }
        return data;
    }
}

export class AppDeploymentRequestDto implements IAppDeploymentRequestDto {
    deploymentType?: AppDeploymentType;
    configuration?: { [key: string]: any; } | undefined;
    environment?: { [key: string]: string; } | undefined;
    supportedFeatures?: string[] | undefined;
    autoStart?: boolean;
    domainName?: string | undefined;
    port?: number | undefined;
    baseHref?: string | undefined;
    spaRouting?: boolean;
    apiIntegration?: boolean;
    authenticationMode?: string | undefined;
    constructor(data?: IAppDeploymentRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.deploymentType = _data["deploymentType"];
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            if (Array.isArray(_data["supportedFeatures"])) {
                this.supportedFeatures = [] as any;
                for (let item of _data["supportedFeatures"])
                    this.supportedFeatures!.push(item);
            }
            this.autoStart = _data["autoStart"];
            this.domainName = _data["domainName"];
            this.port = _data["port"];
            this.baseHref = _data["baseHref"];
            this.spaRouting = _data["spaRouting"];
            this.apiIntegration = _data["apiIntegration"];
            this.authenticationMode = _data["authenticationMode"];
        }
    }
    static fromJS(data: any): AppDeploymentRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new AppDeploymentRequestDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["deploymentType"] = this.deploymentType;
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        if (Array.isArray(this.supportedFeatures)) {
            data["supportedFeatures"] = [];
            for (let item of this.supportedFeatures)
                data["supportedFeatures"].push(item);
        }
        data["autoStart"] = this.autoStart;
        data["domainName"] = this.domainName;
        data["port"] = this.port;
        data["baseHref"] = this.baseHref;
        data["spaRouting"] = this.spaRouting;
        data["apiIntegration"] = this.apiIntegration;
        data["authenticationMode"] = this.authenticationMode;
        return data;
    }
}

export class ApplicationHealthDto implements IApplicationHealthDto {
    status?: string | undefined;
    lastCheck?: Date;
    responseTimeMs?: number;
    errorMessage?: string | undefined;
    details?: { [key: string]: any; } | undefined;
    checks?: HealthCheckResultDto[] | undefined;
    constructor(data?: IApplicationHealthDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.status = _data["status"];
            this.lastCheck = _data["lastCheck"] ? new Date(_data["lastCheck"].toString()) : <any>undefined;
            this.responseTimeMs = _data["responseTimeMs"];
            this.errorMessage = _data["errorMessage"];
            if (_data["details"]) {
                this.details = {} as any;
                for (let key in _data["details"]) {
                    if (_data["details"].hasOwnProperty(key))
                        (<any>this.details)![key] = _data["details"][key];
                }
            }
            if (Array.isArray(_data["checks"])) {
                this.checks = [] as any;
                for (let item of _data["checks"])
                    this.checks!.push(HealthCheckResultDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ApplicationHealthDto {
        data = typeof data === 'object' ? data : {};
        let result = new ApplicationHealthDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["status"] = this.status;
        data["lastCheck"] = this.lastCheck ? this.lastCheck.toISOString() : <any>undefined;
        data["responseTimeMs"] = this.responseTimeMs;
        data["errorMessage"] = this.errorMessage;
        if (this.details) {
            data["details"] = {};
            for (let key in this.details) {
                if (this.details.hasOwnProperty(key))
                    (<any>data["details"])[key] = (<any>this.details)[key];
            }
        }
        if (Array.isArray(this.checks)) {
            data["checks"] = [];
            for (let item of this.checks)
                data["checks"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class ApplicationHealthDtoApiResponse implements IApplicationHealthDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ApplicationHealthDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IApplicationHealthDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ApplicationHealthDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ApplicationHealthDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ApplicationHealthDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ApplicationMetricsDto implements IApplicationMetricsDto {
    programId?: string | undefined;
    collectedAt?: Date;
    cpuUsagePercent?: number;
    memoryUsageBytes?: number;
    diskUsageBytes?: number;
    networkConnectionsCount?: number;
    requestsPerSecond?: number;
    averageResponseTimeMs?: number;
    activeInstances?: number;
    customMetrics?: { [key: string]: any; } | undefined;
    constructor(data?: IApplicationMetricsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programId = _data["programId"];
            this.collectedAt = _data["collectedAt"] ? new Date(_data["collectedAt"].toString()) : <any>undefined;
            this.cpuUsagePercent = _data["cpuUsagePercent"];
            this.memoryUsageBytes = _data["memoryUsageBytes"];
            this.diskUsageBytes = _data["diskUsageBytes"];
            this.networkConnectionsCount = _data["networkConnectionsCount"];
            this.requestsPerSecond = _data["requestsPerSecond"];
            this.averageResponseTimeMs = _data["averageResponseTimeMs"];
            this.activeInstances = _data["activeInstances"];
            if (_data["customMetrics"]) {
                this.customMetrics = {} as any;
                for (let key in _data["customMetrics"]) {
                    if (_data["customMetrics"].hasOwnProperty(key))
                        (<any>this.customMetrics)![key] = _data["customMetrics"][key];
                }
            }
        }
    }
    static fromJS(data: any): ApplicationMetricsDto {
        data = typeof data === 'object' ? data : {};
        let result = new ApplicationMetricsDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programId"] = this.programId;
        data["collectedAt"] = this.collectedAt ? this.collectedAt.toISOString() : <any>undefined;
        data["cpuUsagePercent"] = this.cpuUsagePercent;
        data["memoryUsageBytes"] = this.memoryUsageBytes;
        data["diskUsageBytes"] = this.diskUsageBytes;
        data["networkConnectionsCount"] = this.networkConnectionsCount;
        data["requestsPerSecond"] = this.requestsPerSecond;
        data["averageResponseTimeMs"] = this.averageResponseTimeMs;
        data["activeInstances"] = this.activeInstances;
        if (this.customMetrics) {
            data["customMetrics"] = {};
            for (let key in this.customMetrics) {
                if (this.customMetrics.hasOwnProperty(key))
                    (<any>data["customMetrics"])[key] = (<any>this.customMetrics)[key];
            }
        }
        return data;
    }
}

export class ApplicationMetricsDtoApiResponse implements IApplicationMetricsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ApplicationMetricsDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IApplicationMetricsDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ApplicationMetricsDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ApplicationMetricsDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ApplicationMetricsDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class AuditInfoResponseDto implements IAuditInfoResponseDto {
    createdAt?: Date;
    updatedAt?: Date | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    constructor(data?: IAuditInfoResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.updatedAt = _data["updatedAt"] ? new Date(_data["updatedAt"].toString()) : <any>undefined;
            this.createdBy = _data["createdBy"];
            this.updatedBy = _data["updatedBy"];
        }
    }
    static fromJS(data: any): AuditInfoResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new AuditInfoResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["updatedAt"] = this.updatedAt ? this.updatedAt.toISOString() : <any>undefined;
        data["createdBy"] = this.createdBy;
        data["updatedBy"] = this.updatedBy;
        return data;
    }
}

export class AuthenticationResponseDto implements IAuthenticationResponseDto {
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    expiresAt?: Date;
    tokenType?: string | undefined;
    user?: UserDto;
    constructor(data?: IAuthenticationResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.accessToken = _data["accessToken"];
            this.refreshToken = _data["refreshToken"];
            this.expiresAt = _data["expiresAt"] ? new Date(_data["expiresAt"].toString()) : <any>undefined;
            this.tokenType = _data["tokenType"];
            this.user = _data["user"] ? UserDto.fromJS(_data["user"]) : <any>undefined;
        }
    }
    static fromJS(data: any): AuthenticationResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticationResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["accessToken"] = this.accessToken;
        data["refreshToken"] = this.refreshToken;
        data["expiresAt"] = this.expiresAt ? this.expiresAt.toISOString() : <any>undefined;
        data["tokenType"] = this.tokenType;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        return data;
    }
}

export class AuthenticationResponseDtoApiResponse implements IAuthenticationResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: AuthenticationResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IAuthenticationResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? AuthenticationResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): AuthenticationResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticationResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class AvalancheHazardDto implements IAvalancheHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;
    incident?: string | undefined;
    incidentDescription?: string | undefined;
    snowDepth?: number;
    firstHillLocation?: LocationRequestDto;
    elevationDifference?: number;
    constructor(data?: IAvalancheHazardDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
            this.incident = _data["incident"];
            this.incidentDescription = _data["incidentDescription"];
            this.snowDepth = _data["snowDepth"];
            this.firstHillLocation = _data["firstHillLocation"] ? LocationRequestDto.fromJS(_data["firstHillLocation"]) : <any>undefined;
            this.elevationDifference = _data["elevationDifference"];
        }
    }
    static fromJS(data: any): AvalancheHazardDto {
        data = typeof data === 'object' ? data : {};
        let result = new AvalancheHazardDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        data["incident"] = this.incident;
        data["incidentDescription"] = this.incidentDescription;
        data["snowDepth"] = this.snowDepth;
        data["firstHillLocation"] = this.firstHillLocation ? this.firstHillLocation.toJSON() : <any>undefined;
        data["elevationDifference"] = this.elevationDifference;
        return data;
    }
}

export class AvalancheHazardResponseDto implements IAvalancheHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;
    incident?: string | undefined;
    incidentDescription?: string | undefined;
    snowDepth?: number;
    firstHillLocation?: LocationResponseDto;
    elevationDifference?: number;
    constructor(data?: IAvalancheHazardResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
            this.incident = _data["incident"];
            this.incidentDescription = _data["incidentDescription"];
            this.snowDepth = _data["snowDepth"];
            this.firstHillLocation = _data["firstHillLocation"] ? LocationResponseDto.fromJS(_data["firstHillLocation"]) : <any>undefined;
            this.elevationDifference = _data["elevationDifference"];
        }
    }
    static fromJS(data: any): AvalancheHazardResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new AvalancheHazardResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        data["incident"] = this.incident;
        data["incidentDescription"] = this.incidentDescription;
        data["snowDepth"] = this.snowDepth;
        data["firstHillLocation"] = this.firstHillLocation ? this.firstHillLocation.toJSON() : <any>undefined;
        data["elevationDifference"] = this.elevationDifference;
        return data;
    }
}

export class BlockResponseDto implements IBlockResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    modelingType?: string | undefined;
    xAxisLength?: number;
    yAxisLength?: number;
    storeyHeight?: { [key: string]: number; } | undefined;
    longLength?: number;
    shortLength?: number;
    totalHeight?: number;
    constructor(data?: IBlockResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.modelingType = _data["modelingType"];
            this.xAxisLength = _data["xAxisLength"];
            this.yAxisLength = _data["yAxisLength"];
            if (_data["storeyHeight"]) {
                this.storeyHeight = {} as any;
                for (let key in _data["storeyHeight"]) {
                    if (_data["storeyHeight"].hasOwnProperty(key))
                        (<any>this.storeyHeight)![key] = _data["storeyHeight"][key];
                }
            }
            this.longLength = _data["longLength"];
            this.shortLength = _data["shortLength"];
            this.totalHeight = _data["totalHeight"];
        }
    }
    static fromJS(data: any): BlockResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new BlockResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["modelingType"] = this.modelingType;
        data["xAxisLength"] = this.xAxisLength;
        data["yAxisLength"] = this.yAxisLength;
        if (this.storeyHeight) {
            data["storeyHeight"] = {};
            for (let key in this.storeyHeight) {
                if (this.storeyHeight.hasOwnProperty(key))
                    (<any>data["storeyHeight"])[key] = (<any>this.storeyHeight)[key];
            }
        }
        data["longLength"] = this.longLength;
        data["shortLength"] = this.shortLength;
        data["totalHeight"] = this.totalHeight;
        return data;
    }
}

export class BlockResponseDtoApiResponse implements IBlockResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BlockResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IBlockResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? BlockResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): BlockResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BlockResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class BlockResponseDtoListApiResponse implements IBlockResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BlockResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IBlockResponseDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(BlockResponseDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): BlockResponseDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BlockResponseDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class BlockStatisticsResponseDto implements IBlockStatisticsResponseDto {
    blockId?: string | undefined;
    modelingType?: string | undefined;
    area?: number;
    height?: number;
    storeyCount?: number;
    aspectRatio?: number;
    volumeEstimate?: number;
    constructor(data?: IBlockStatisticsResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.blockId = _data["blockId"];
            this.modelingType = _data["modelingType"];
            this.area = _data["area"];
            this.height = _data["height"];
            this.storeyCount = _data["storeyCount"];
            this.aspectRatio = _data["aspectRatio"];
            this.volumeEstimate = _data["volumeEstimate"];
        }
    }
    static fromJS(data: any): BlockStatisticsResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new BlockStatisticsResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["blockId"] = this.blockId;
        data["modelingType"] = this.modelingType;
        data["area"] = this.area;
        data["height"] = this.height;
        data["storeyCount"] = this.storeyCount;
        data["aspectRatio"] = this.aspectRatio;
        data["volumeEstimate"] = this.volumeEstimate;
        return data;
    }
}

export class BlockStatisticsResponseDtoApiResponse implements IBlockStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BlockStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IBlockStatisticsResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? BlockStatisticsResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): BlockStatisticsResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BlockStatisticsResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class BlockSummaryResponseDto implements IBlockSummaryResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    modelingType?: string | undefined;
    totalHeight?: number;
    storeyCount?: number;
    constructor(data?: IBlockSummaryResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.modelingType = _data["modelingType"];
            this.totalHeight = _data["totalHeight"];
            this.storeyCount = _data["storeyCount"];
        }
    }
    static fromJS(data: any): BlockSummaryResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new BlockSummaryResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["modelingType"] = this.modelingType;
        data["totalHeight"] = this.totalHeight;
        data["storeyCount"] = this.storeyCount;
        return data;
    }
}

export class BlockSummaryResponseDtoApiResponse implements IBlockSummaryResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BlockSummaryResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IBlockSummaryResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? BlockSummaryResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): BlockSummaryResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BlockSummaryResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class BooleanApiResponse implements IBooleanApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: boolean;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IBooleanApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"];
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): BooleanApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BooleanApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class BuildingBlockAddDto implements IBuildingBlockAddDto {
    blockId!: string;
    constructor(data?: IBuildingBlockAddDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.blockId = _data["blockId"];
        }
    }
    static fromJS(data: any): BuildingBlockAddDto {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingBlockAddDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["blockId"] = this.blockId;
        return data;
    }
}

export class BuildingCreateDto implements IBuildingCreateDto {
    tmId!: string;
    buildingTMID!: number;
    name?: string | undefined;
    type!: BuildingType;
    inScopeOfMETU?: boolean;
    reportName?: string | undefined;
    constructor(data?: IBuildingCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.tmId = _data["tmId"];
            this.buildingTMID = _data["buildingTMID"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.inScopeOfMETU = _data["inScopeOfMETU"];
            this.reportName = _data["reportName"];
        }
    }
    static fromJS(data: any): BuildingCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["tmId"] = this.tmId;
        data["buildingTMID"] = this.buildingTMID;
        data["name"] = this.name;
        data["type"] = this.type;
        data["inScopeOfMETU"] = this.inScopeOfMETU;
        data["reportName"] = this.reportName;
        return data;
    }
}

export class BuildingDetailResponseDto implements IBuildingDetailResponseDto {
    id?: string | undefined;
    tmId?: string | undefined;
    buildingTMID?: number;
    name?: string | undefined;
    type?: string | undefined;
    inScopeOfMETU?: boolean;
    reportName?: string | undefined;
    code?: number;
    bks?: number;
    tm?: TMSummaryResponseDto;
    blocks?: BlockResponseDto[] | undefined;
    blockCount?: number;
    auditInfo?: AuditInfoResponseDto;
    constructor(data?: IBuildingDetailResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.tmId = _data["tmId"];
            this.buildingTMID = _data["buildingTMID"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.inScopeOfMETU = _data["inScopeOfMETU"];
            this.reportName = _data["reportName"];
            this.code = _data["code"];
            this.bks = _data["bks"];
            this.tm = _data["tm"] ? TMSummaryResponseDto.fromJS(_data["tm"]) : <any>undefined;
            if (Array.isArray(_data["blocks"])) {
                this.blocks = [] as any;
                for (let item of _data["blocks"])
                    this.blocks!.push(BlockResponseDto.fromJS(item));
            }
            this.blockCount = _data["blockCount"];
            this.auditInfo = _data["auditInfo"] ? AuditInfoResponseDto.fromJS(_data["auditInfo"]) : <any>undefined;
        }
    }
    static fromJS(data: any): BuildingDetailResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingDetailResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["tmId"] = this.tmId;
        data["buildingTMID"] = this.buildingTMID;
        data["name"] = this.name;
        data["type"] = this.type;
        data["inScopeOfMETU"] = this.inScopeOfMETU;
        data["reportName"] = this.reportName;
        data["code"] = this.code;
        data["bks"] = this.bks;
        data["tm"] = this.tm ? this.tm.toJSON() : <any>undefined;
        if (Array.isArray(this.blocks)) {
            data["blocks"] = [];
            for (let item of this.blocks)
                data["blocks"].push(item ? item.toJSON() : <any>undefined);
        }
        data["blockCount"] = this.blockCount;
        data["auditInfo"] = this.auditInfo ? this.auditInfo.toJSON() : <any>undefined;
        return data;
    }
}

export class BuildingDetailResponseDtoApiResponse implements IBuildingDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BuildingDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IBuildingDetailResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? BuildingDetailResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): BuildingDetailResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingDetailResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class BuildingListResponseDto implements IBuildingListResponseDto {
    id?: string | undefined;
    tmName?: string | undefined;
    buildingTMID?: number;
    name?: string | undefined;
    type?: string | undefined;
    inScopeOfMETU?: boolean;
    blockCount?: number;
    reportName?: string | undefined;
    constructor(data?: IBuildingListResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.tmName = _data["tmName"];
            this.buildingTMID = _data["buildingTMID"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.inScopeOfMETU = _data["inScopeOfMETU"];
            this.blockCount = _data["blockCount"];
            this.reportName = _data["reportName"];
        }
    }
    static fromJS(data: any): BuildingListResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingListResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["tmName"] = this.tmName;
        data["buildingTMID"] = this.buildingTMID;
        data["name"] = this.name;
        data["type"] = this.type;
        data["inScopeOfMETU"] = this.inScopeOfMETU;
        data["blockCount"] = this.blockCount;
        data["reportName"] = this.reportName;
        return data;
    }
}

export class BuildingListResponseDtoPagedResponse implements IBuildingListResponseDtoPagedResponse {
    items?: BuildingListResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
    constructor(data?: IBuildingListResponseDtoPagedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(BuildingListResponseDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            (<any>this).hasPreviousPage = _data["hasPreviousPage"];
            (<any>this).hasNextPage = _data["hasNextPage"];
        }
    }
    static fromJS(data: any): BuildingListResponseDtoPagedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingListResponseDtoPagedResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item ? item.toJSON() : <any>undefined);
        }
        data["pageNumber"] = this.pageNumber;
        data["pageSize"] = this.pageSize;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export class BuildingListResponseDtoPagedResponseApiResponse implements IBuildingListResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BuildingListResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IBuildingListResponseDtoPagedResponseApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? BuildingListResponseDtoPagedResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): BuildingListResponseDtoPagedResponseApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingListResponseDtoPagedResponseApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class BuildingResponseDto implements IBuildingResponseDto {
    id?: string | undefined;
    tmId?: string | undefined;
    buildingTMID?: number;
    name?: string | undefined;
    type?: string | undefined;
    inScopeOfMETU?: boolean;
    reportName?: string | undefined;
    code?: number;
    bks?: number;
    constructor(data?: IBuildingResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.tmId = _data["tmId"];
            this.buildingTMID = _data["buildingTMID"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.inScopeOfMETU = _data["inScopeOfMETU"];
            this.reportName = _data["reportName"];
            this.code = _data["code"];
            this.bks = _data["bks"];
        }
    }
    static fromJS(data: any): BuildingResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["tmId"] = this.tmId;
        data["buildingTMID"] = this.buildingTMID;
        data["name"] = this.name;
        data["type"] = this.type;
        data["inScopeOfMETU"] = this.inScopeOfMETU;
        data["reportName"] = this.reportName;
        data["code"] = this.code;
        data["bks"] = this.bks;
        return data;
    }
}

export class BuildingResponseDtoApiResponse implements IBuildingResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BuildingResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IBuildingResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? BuildingResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): BuildingResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class BuildingSearchDto implements IBuildingSearchDto {
    name?: string | undefined;
    tmId?: string | undefined;
    type?: BuildingType;
    inScopeOfMETU?: boolean | undefined;
    reportName?: string | undefined;
    constructor(data?: IBuildingSearchDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.tmId = _data["tmId"];
            this.type = _data["type"];
            this.inScopeOfMETU = _data["inScopeOfMETU"];
            this.reportName = _data["reportName"];
        }
    }
    static fromJS(data: any): BuildingSearchDto {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingSearchDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["tmId"] = this.tmId;
        data["type"] = this.type;
        data["inScopeOfMETU"] = this.inScopeOfMETU;
        data["reportName"] = this.reportName;
        return data;
    }
}

export class BuildingStatisticsResponseDto implements IBuildingStatisticsResponseDto {
    buildingId?: string | undefined;
    blockCount?: number;
    concreteBlockCount?: number;
    masonryBlockCount?: number;
    totalArea?: number;
    maxHeight?: number;
    code?: number;
    bks?: number;
    constructor(data?: IBuildingStatisticsResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.buildingId = _data["buildingId"];
            this.blockCount = _data["blockCount"];
            this.concreteBlockCount = _data["concreteBlockCount"];
            this.masonryBlockCount = _data["masonryBlockCount"];
            this.totalArea = _data["totalArea"];
            this.maxHeight = _data["maxHeight"];
            this.code = _data["code"];
            this.bks = _data["bks"];
        }
    }
    static fromJS(data: any): BuildingStatisticsResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingStatisticsResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["buildingId"] = this.buildingId;
        data["blockCount"] = this.blockCount;
        data["concreteBlockCount"] = this.concreteBlockCount;
        data["masonryBlockCount"] = this.masonryBlockCount;
        data["totalArea"] = this.totalArea;
        data["maxHeight"] = this.maxHeight;
        data["code"] = this.code;
        data["bks"] = this.bks;
        return data;
    }
}

export class BuildingStatisticsResponseDtoApiResponse implements IBuildingStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BuildingStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IBuildingStatisticsResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? BuildingStatisticsResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): BuildingStatisticsResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingStatisticsResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class BuildingSummaryResponseDto implements IBuildingSummaryResponseDto {
    id?: string | undefined;
    buildingTMID?: number;
    name?: string | undefined;
    type?: string | undefined;
    blockCount?: number;
    constructor(data?: IBuildingSummaryResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.buildingTMID = _data["buildingTMID"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.blockCount = _data["blockCount"];
        }
    }
    static fromJS(data: any): BuildingSummaryResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingSummaryResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["buildingTMID"] = this.buildingTMID;
        data["name"] = this.name;
        data["type"] = this.type;
        data["blockCount"] = this.blockCount;
        return data;
    }
}

export class BuildingUpdateDto implements IBuildingUpdateDto {
    tmId?: string | undefined;
    buildingTMID?: number | undefined;
    name?: string | undefined;
    type?: BuildingType;
    inScopeOfMETU?: boolean | undefined;
    reportName?: string | undefined;
    constructor(data?: IBuildingUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.tmId = _data["tmId"];
            this.buildingTMID = _data["buildingTMID"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.inScopeOfMETU = _data["inScopeOfMETU"];
            this.reportName = _data["reportName"];
        }
    }
    static fromJS(data: any): BuildingUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new BuildingUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["tmId"] = this.tmId;
        data["buildingTMID"] = this.buildingTMID;
        data["name"] = this.name;
        data["type"] = this.type;
        data["inScopeOfMETU"] = this.inScopeOfMETU;
        data["reportName"] = this.reportName;
        return data;
    }
}

export class BulkOperationResult implements IBulkOperationResult {
    successCount?: number;
    failureCount?: number;
    totalProcessed?: number;
    errors?: string[] | undefined;
    constructor(data?: IBulkOperationResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.successCount = _data["successCount"];
            this.failureCount = _data["failureCount"];
            this.totalProcessed = _data["totalProcessed"];
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
        }
    }
    static fromJS(data: any): BulkOperationResult {
        data = typeof data === 'object' ? data : {};
        let result = new BulkOperationResult();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["successCount"] = this.successCount;
        data["failureCount"] = this.failureCount;
        data["totalProcessed"] = this.totalProcessed;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        return data;
    }
}

export class BulkOperationResultApiResponse implements IBulkOperationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BulkOperationResult;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IBulkOperationResultApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? BulkOperationResult.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): BulkOperationResultApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new BulkOperationResultApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class BulkRequestStatusUpdateDto implements IBulkRequestStatusUpdateDto {
    requestIds!: string[];
    status!: string;
    reason?: string | undefined;
    constructor(data?: IBulkRequestStatusUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.requestIds = [];
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["requestIds"])) {
                this.requestIds = [] as any;
                for (let item of _data["requestIds"])
                    this.requestIds!.push(item);
            }
            this.status = _data["status"];
            this.reason = _data["reason"];
        }
    }
    static fromJS(data: any): BulkRequestStatusUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new BulkRequestStatusUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.requestIds)) {
            data["requestIds"] = [];
            for (let item of this.requestIds)
                data["requestIds"].push(item);
        }
        data["status"] = this.status;
        data["reason"] = this.reason;
        return data;
    }
}

export class ClientCreateDto implements IClientCreateDto {
    name!: string;
    type!: ClientType;
    constructor(data?: IClientCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.type = _data["type"];
        }
    }
    static fromJS(data: any): ClientCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new ClientCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["type"] = this.type;
        return data;
    }
}

export class ClientDetailResponseDto implements IClientDetailResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    regionCount?: number;
    regions?: RegionSummaryResponseDto[] | undefined;
    auditInfo?: AuditInfoResponseDto;
    constructor(data?: IClientDetailResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.regionCount = _data["regionCount"];
            if (Array.isArray(_data["regions"])) {
                this.regions = [] as any;
                for (let item of _data["regions"])
                    this.regions!.push(RegionSummaryResponseDto.fromJS(item));
            }
            this.auditInfo = _data["auditInfo"] ? AuditInfoResponseDto.fromJS(_data["auditInfo"]) : <any>undefined;
        }
    }
    static fromJS(data: any): ClientDetailResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new ClientDetailResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["type"] = this.type;
        data["regionCount"] = this.regionCount;
        if (Array.isArray(this.regions)) {
            data["regions"] = [];
            for (let item of this.regions)
                data["regions"].push(item ? item.toJSON() : <any>undefined);
        }
        data["auditInfo"] = this.auditInfo ? this.auditInfo.toJSON() : <any>undefined;
        return data;
    }
}

export class ClientDetailResponseDtoApiResponse implements IClientDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ClientDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IClientDetailResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ClientDetailResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ClientDetailResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ClientDetailResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ClientListResponseDto implements IClientListResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    regionCount?: number;
    totalTMCount?: number;
    constructor(data?: IClientListResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.regionCount = _data["regionCount"];
            this.totalTMCount = _data["totalTMCount"];
        }
    }
    static fromJS(data: any): ClientListResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new ClientListResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["type"] = this.type;
        data["regionCount"] = this.regionCount;
        data["totalTMCount"] = this.totalTMCount;
        return data;
    }
}

export class ClientListResponseDtoPagedResponse implements IClientListResponseDtoPagedResponse {
    items?: ClientListResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
    constructor(data?: IClientListResponseDtoPagedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(ClientListResponseDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            (<any>this).hasPreviousPage = _data["hasPreviousPage"];
            (<any>this).hasNextPage = _data["hasNextPage"];
        }
    }
    static fromJS(data: any): ClientListResponseDtoPagedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ClientListResponseDtoPagedResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item ? item.toJSON() : <any>undefined);
        }
        data["pageNumber"] = this.pageNumber;
        data["pageSize"] = this.pageSize;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export class ClientListResponseDtoPagedResponseApiResponse implements IClientListResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ClientListResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IClientListResponseDtoPagedResponseApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ClientListResponseDtoPagedResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ClientListResponseDtoPagedResponseApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ClientListResponseDtoPagedResponseApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ClientResponseDto implements IClientResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    constructor(data?: IClientResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.type = _data["type"];
        }
    }
    static fromJS(data: any): ClientResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new ClientResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["type"] = this.type;
        return data;
    }
}

export class ClientResponseDtoApiResponse implements IClientResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ClientResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IClientResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ClientResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ClientResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ClientResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ClientStatisticsResponseDto implements IClientStatisticsResponseDto {
    clientId?: string | undefined;
    regionCount?: number;
    totalTMs?: number;
    totalBuildings?: number;
    activeTMs?: number;
    constructor(data?: IClientStatisticsResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.clientId = _data["clientId"];
            this.regionCount = _data["regionCount"];
            this.totalTMs = _data["totalTMs"];
            this.totalBuildings = _data["totalBuildings"];
            this.activeTMs = _data["activeTMs"];
        }
    }
    static fromJS(data: any): ClientStatisticsResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new ClientStatisticsResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["clientId"] = this.clientId;
        data["regionCount"] = this.regionCount;
        data["totalTMs"] = this.totalTMs;
        data["totalBuildings"] = this.totalBuildings;
        data["activeTMs"] = this.activeTMs;
        return data;
    }
}

export class ClientStatisticsResponseDtoApiResponse implements IClientStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ClientStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IClientStatisticsResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ClientStatisticsResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ClientStatisticsResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ClientStatisticsResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ClientSummaryResponseDto implements IClientSummaryResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    constructor(data?: IClientSummaryResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
        }
    }
    static fromJS(data: any): ClientSummaryResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new ClientSummaryResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        return data;
    }
}

export class ClientUpdateDto implements IClientUpdateDto {
    name?: string | undefined;
    type?: ClientType;
    constructor(data?: IClientUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.type = _data["type"];
        }
    }
    static fromJS(data: any): ClientUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new ClientUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["type"] = this.type;
        return data;
    }
}

export class ComparisonScoreDto implements IComparisonScoreDto {
    earthquakeImprovement?: number;
    hazardImprovement?: number;
    overallImprovement?: number;
    advantages?: string[] | undefined;
    disadvantages?: string[] | undefined;
    constructor(data?: IComparisonScoreDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.earthquakeImprovement = _data["earthquakeImprovement"];
            this.hazardImprovement = _data["hazardImprovement"];
            this.overallImprovement = _data["overallImprovement"];
            if (Array.isArray(_data["advantages"])) {
                this.advantages = [] as any;
                for (let item of _data["advantages"])
                    this.advantages!.push(item);
            }
            if (Array.isArray(_data["disadvantages"])) {
                this.disadvantages = [] as any;
                for (let item of _data["disadvantages"])
                    this.disadvantages!.push(item);
            }
        }
    }
    static fromJS(data: any): ComparisonScoreDto {
        data = typeof data === 'object' ? data : {};
        let result = new ComparisonScoreDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["earthquakeImprovement"] = this.earthquakeImprovement;
        data["hazardImprovement"] = this.hazardImprovement;
        data["overallImprovement"] = this.overallImprovement;
        if (Array.isArray(this.advantages)) {
            data["advantages"] = [];
            for (let item of this.advantages)
                data["advantages"].push(item);
        }
        if (Array.isArray(this.disadvantages)) {
            data["disadvantages"] = [];
            for (let item of this.disadvantages)
                data["disadvantages"].push(item);
        }
        return data;
    }
}

export class ConcreteBlockResponseDto implements IConcreteBlockResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    modelingType?: string | undefined;
    xAxisLength?: number;
    yAxisLength?: number;
    storeyHeight?: { [key: string]: number; } | undefined;
    longLength?: number;
    shortLength?: number;
    totalHeight?: number;
    compressiveStrengthOfConcrete?: number;
    yieldStrengthOfSteel?: number;
    transverseReinforcementSpacing?: number;
    reinforcementRatio?: number;
    hookExists?: boolean;
    isStrengthened?: boolean;
    constructor(data?: IConcreteBlockResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.modelingType = _data["modelingType"];
            this.xAxisLength = _data["xAxisLength"];
            this.yAxisLength = _data["yAxisLength"];
            if (_data["storeyHeight"]) {
                this.storeyHeight = {} as any;
                for (let key in _data["storeyHeight"]) {
                    if (_data["storeyHeight"].hasOwnProperty(key))
                        (<any>this.storeyHeight)![key] = _data["storeyHeight"][key];
                }
            }
            this.longLength = _data["longLength"];
            this.shortLength = _data["shortLength"];
            this.totalHeight = _data["totalHeight"];
            this.compressiveStrengthOfConcrete = _data["compressiveStrengthOfConcrete"];
            this.yieldStrengthOfSteel = _data["yieldStrengthOfSteel"];
            this.transverseReinforcementSpacing = _data["transverseReinforcementSpacing"];
            this.reinforcementRatio = _data["reinforcementRatio"];
            this.hookExists = _data["hookExists"];
            this.isStrengthened = _data["isStrengthened"];
        }
    }
    static fromJS(data: any): ConcreteBlockResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new ConcreteBlockResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["modelingType"] = this.modelingType;
        data["xAxisLength"] = this.xAxisLength;
        data["yAxisLength"] = this.yAxisLength;
        if (this.storeyHeight) {
            data["storeyHeight"] = {};
            for (let key in this.storeyHeight) {
                if (this.storeyHeight.hasOwnProperty(key))
                    (<any>data["storeyHeight"])[key] = (<any>this.storeyHeight)[key];
            }
        }
        data["longLength"] = this.longLength;
        data["shortLength"] = this.shortLength;
        data["totalHeight"] = this.totalHeight;
        data["compressiveStrengthOfConcrete"] = this.compressiveStrengthOfConcrete;
        data["yieldStrengthOfSteel"] = this.yieldStrengthOfSteel;
        data["transverseReinforcementSpacing"] = this.transverseReinforcementSpacing;
        data["reinforcementRatio"] = this.reinforcementRatio;
        data["hookExists"] = this.hookExists;
        data["isStrengthened"] = this.isStrengthened;
        return data;
    }
}

export class ConcreteBlockResponseDtoApiResponse implements IConcreteBlockResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ConcreteBlockResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IConcreteBlockResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ConcreteBlockResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ConcreteBlockResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ConcreteBlockResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ConcreteBlockResponseDtoListApiResponse implements IConcreteBlockResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ConcreteBlockResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IConcreteBlockResponseDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(ConcreteBlockResponseDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ConcreteBlockResponseDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ConcreteBlockResponseDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ConcreteCreateDto implements IConcreteCreateDto {
    id!: string;
    name!: string;
    xAxisLength!: number;
    yAxisLength!: number;
    storeyHeight!: { [key: string]: number; };
    compressiveStrengthOfConcrete!: number;
    yieldStrengthOfSteel!: number;
    transverseReinforcementSpacing!: number;
    reinforcementRatio!: number;
    hookExists?: boolean;
    isStrengthened?: boolean;
    constructor(data?: IConcreteCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.storeyHeight = {};
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.xAxisLength = _data["xAxisLength"];
            this.yAxisLength = _data["yAxisLength"];
            if (_data["storeyHeight"]) {
                this.storeyHeight = {} as any;
                for (let key in _data["storeyHeight"]) {
                    if (_data["storeyHeight"].hasOwnProperty(key))
                        (<any>this.storeyHeight)![key] = _data["storeyHeight"][key];
                }
            }
            this.compressiveStrengthOfConcrete = _data["compressiveStrengthOfConcrete"];
            this.yieldStrengthOfSteel = _data["yieldStrengthOfSteel"];
            this.transverseReinforcementSpacing = _data["transverseReinforcementSpacing"];
            this.reinforcementRatio = _data["reinforcementRatio"];
            this.hookExists = _data["hookExists"];
            this.isStrengthened = _data["isStrengthened"];
        }
    }
    static fromJS(data: any): ConcreteCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new ConcreteCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["xAxisLength"] = this.xAxisLength;
        data["yAxisLength"] = this.yAxisLength;
        if (this.storeyHeight) {
            data["storeyHeight"] = {};
            for (let key in this.storeyHeight) {
                if (this.storeyHeight.hasOwnProperty(key))
                    (<any>data["storeyHeight"])[key] = (<any>this.storeyHeight)[key];
            }
        }
        data["compressiveStrengthOfConcrete"] = this.compressiveStrengthOfConcrete;
        data["yieldStrengthOfSteel"] = this.yieldStrengthOfSteel;
        data["transverseReinforcementSpacing"] = this.transverseReinforcementSpacing;
        data["reinforcementRatio"] = this.reinforcementRatio;
        data["hookExists"] = this.hookExists;
        data["isStrengthened"] = this.isStrengthened;
        return data;
    }
}

export class ConcreteUpdateDto implements IConcreteUpdateDto {
    id?: string | undefined;
    name?: string | undefined;
    xAxisLength?: number | undefined;
    yAxisLength?: number | undefined;
    storeyHeight?: { [key: string]: number; } | undefined;
    compressiveStrengthOfConcrete?: number | undefined;
    yieldStrengthOfSteel?: number | undefined;
    transverseReinforcementSpacing?: number | undefined;
    reinforcementRatio?: number | undefined;
    hookExists?: boolean | undefined;
    isStrengthened?: boolean | undefined;
    constructor(data?: IConcreteUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.xAxisLength = _data["xAxisLength"];
            this.yAxisLength = _data["yAxisLength"];
            if (_data["storeyHeight"]) {
                this.storeyHeight = {} as any;
                for (let key in _data["storeyHeight"]) {
                    if (_data["storeyHeight"].hasOwnProperty(key))
                        (<any>this.storeyHeight)![key] = _data["storeyHeight"][key];
                }
            }
            this.compressiveStrengthOfConcrete = _data["compressiveStrengthOfConcrete"];
            this.yieldStrengthOfSteel = _data["yieldStrengthOfSteel"];
            this.transverseReinforcementSpacing = _data["transverseReinforcementSpacing"];
            this.reinforcementRatio = _data["reinforcementRatio"];
            this.hookExists = _data["hookExists"];
            this.isStrengthened = _data["isStrengthened"];
        }
    }
    static fromJS(data: any): ConcreteUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new ConcreteUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["xAxisLength"] = this.xAxisLength;
        data["yAxisLength"] = this.yAxisLength;
        if (this.storeyHeight) {
            data["storeyHeight"] = {};
            for (let key in this.storeyHeight) {
                if (this.storeyHeight.hasOwnProperty(key))
                    (<any>data["storeyHeight"])[key] = (<any>this.storeyHeight)[key];
            }
        }
        data["compressiveStrengthOfConcrete"] = this.compressiveStrengthOfConcrete;
        data["yieldStrengthOfSteel"] = this.yieldStrengthOfSteel;
        data["transverseReinforcementSpacing"] = this.transverseReinforcementSpacing;
        data["reinforcementRatio"] = this.reinforcementRatio;
        data["hookExists"] = this.hookExists;
        data["isStrengthened"] = this.isStrengthened;
        return data;
    }
}

export class ConnectionTestResult implements IConnectionTestResult {
    isConnected?: boolean;
    responseTimeMs?: number;
    statusCode?: number;
    message?: string | undefined;
    testedAt?: Date;
    constructor(data?: IConnectionTestResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.isConnected = _data["isConnected"];
            this.responseTimeMs = _data["responseTimeMs"];
            this.statusCode = _data["statusCode"];
            this.message = _data["message"];
            this.testedAt = _data["testedAt"] ? new Date(_data["testedAt"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ConnectionTestResult {
        data = typeof data === 'object' ? data : {};
        let result = new ConnectionTestResult();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isConnected"] = this.isConnected;
        data["responseTimeMs"] = this.responseTimeMs;
        data["statusCode"] = this.statusCode;
        data["message"] = this.message;
        data["testedAt"] = this.testedAt ? this.testedAt.toISOString() : <any>undefined;
        return data;
    }
}

export class ConnectionTestResultApiResponse implements IConnectionTestResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ConnectionTestResult;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IConnectionTestResultApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ConnectionTestResult.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ConnectionTestResultApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ConnectionTestResultApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ContainerDeploymentRequestDto implements IContainerDeploymentRequestDto {
    deploymentType?: AppDeploymentType;
    configuration?: { [key: string]: any; } | undefined;
    environment?: { [key: string]: string; } | undefined;
    supportedFeatures?: string[] | undefined;
    autoStart?: boolean;
    domainName?: string | undefined;
    port?: number | undefined;
    baseHref?: string | undefined;
    spaRouting?: boolean;
    apiIntegration?: boolean;
    authenticationMode?: string | undefined;
    dockerfilePath?: string | undefined;
    imageName?: string | undefined;
    imageTag?: string | undefined;
    buildArgs?: { [key: string]: string; } | undefined;
    portMappings?: ContainerPortMappingDto[] | undefined;
    volumeMounts?: ContainerVolumeMountDto[] | undefined;
    resourceLimits?: ContainerResourceLimitsDto;
    replicas?: number;
    healthCheck?: ContainerHealthCheckDto;
    constructor(data?: IContainerDeploymentRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.deploymentType = _data["deploymentType"];
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            if (Array.isArray(_data["supportedFeatures"])) {
                this.supportedFeatures = [] as any;
                for (let item of _data["supportedFeatures"])
                    this.supportedFeatures!.push(item);
            }
            this.autoStart = _data["autoStart"];
            this.domainName = _data["domainName"];
            this.port = _data["port"];
            this.baseHref = _data["baseHref"];
            this.spaRouting = _data["spaRouting"];
            this.apiIntegration = _data["apiIntegration"];
            this.authenticationMode = _data["authenticationMode"];
            this.dockerfilePath = _data["dockerfilePath"];
            this.imageName = _data["imageName"];
            this.imageTag = _data["imageTag"];
            if (_data["buildArgs"]) {
                this.buildArgs = {} as any;
                for (let key in _data["buildArgs"]) {
                    if (_data["buildArgs"].hasOwnProperty(key))
                        (<any>this.buildArgs)![key] = _data["buildArgs"][key];
                }
            }
            if (Array.isArray(_data["portMappings"])) {
                this.portMappings = [] as any;
                for (let item of _data["portMappings"])
                    this.portMappings!.push(ContainerPortMappingDto.fromJS(item));
            }
            if (Array.isArray(_data["volumeMounts"])) {
                this.volumeMounts = [] as any;
                for (let item of _data["volumeMounts"])
                    this.volumeMounts!.push(ContainerVolumeMountDto.fromJS(item));
            }
            this.resourceLimits = _data["resourceLimits"] ? ContainerResourceLimitsDto.fromJS(_data["resourceLimits"]) : <any>undefined;
            this.replicas = _data["replicas"];
            this.healthCheck = _data["healthCheck"] ? ContainerHealthCheckDto.fromJS(_data["healthCheck"]) : <any>undefined;
        }
    }
    static fromJS(data: any): ContainerDeploymentRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new ContainerDeploymentRequestDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["deploymentType"] = this.deploymentType;
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        if (Array.isArray(this.supportedFeatures)) {
            data["supportedFeatures"] = [];
            for (let item of this.supportedFeatures)
                data["supportedFeatures"].push(item);
        }
        data["autoStart"] = this.autoStart;
        data["domainName"] = this.domainName;
        data["port"] = this.port;
        data["baseHref"] = this.baseHref;
        data["spaRouting"] = this.spaRouting;
        data["apiIntegration"] = this.apiIntegration;
        data["authenticationMode"] = this.authenticationMode;
        data["dockerfilePath"] = this.dockerfilePath;
        data["imageName"] = this.imageName;
        data["imageTag"] = this.imageTag;
        if (this.buildArgs) {
            data["buildArgs"] = {};
            for (let key in this.buildArgs) {
                if (this.buildArgs.hasOwnProperty(key))
                    (<any>data["buildArgs"])[key] = (<any>this.buildArgs)[key];
            }
        }
        if (Array.isArray(this.portMappings)) {
            data["portMappings"] = [];
            for (let item of this.portMappings)
                data["portMappings"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.volumeMounts)) {
            data["volumeMounts"] = [];
            for (let item of this.volumeMounts)
                data["volumeMounts"].push(item ? item.toJSON() : <any>undefined);
        }
        data["resourceLimits"] = this.resourceLimits ? this.resourceLimits.toJSON() : <any>undefined;
        data["replicas"] = this.replicas;
        data["healthCheck"] = this.healthCheck ? this.healthCheck.toJSON() : <any>undefined;
        return data;
    }
}

export class ContainerHealthCheckDto implements IContainerHealthCheckDto {
    command?: string | undefined;
    intervalSeconds?: number;
    timeoutSeconds?: number;
    retries?: number;
    startPeriodSeconds?: number;
    constructor(data?: IContainerHealthCheckDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.command = _data["command"];
            this.intervalSeconds = _data["intervalSeconds"];
            this.timeoutSeconds = _data["timeoutSeconds"];
            this.retries = _data["retries"];
            this.startPeriodSeconds = _data["startPeriodSeconds"];
        }
    }
    static fromJS(data: any): ContainerHealthCheckDto {
        data = typeof data === 'object' ? data : {};
        let result = new ContainerHealthCheckDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["command"] = this.command;
        data["intervalSeconds"] = this.intervalSeconds;
        data["timeoutSeconds"] = this.timeoutSeconds;
        data["retries"] = this.retries;
        data["startPeriodSeconds"] = this.startPeriodSeconds;
        return data;
    }
}

export class ContainerPortMappingDto implements IContainerPortMappingDto {
    containerPort?: number;
    hostPort?: number | undefined;
    protocol?: string | undefined;
    constructor(data?: IContainerPortMappingDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.containerPort = _data["containerPort"];
            this.hostPort = _data["hostPort"];
            this.protocol = _data["protocol"];
        }
    }
    static fromJS(data: any): ContainerPortMappingDto {
        data = typeof data === 'object' ? data : {};
        let result = new ContainerPortMappingDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["containerPort"] = this.containerPort;
        data["hostPort"] = this.hostPort;
        data["protocol"] = this.protocol;
        return data;
    }
}

export class ContainerResourceLimitsDto implements IContainerResourceLimitsDto {
    cpuLimit?: string | undefined;
    memoryLimit?: string | undefined;
    cpuRequest?: string | undefined;
    memoryRequest?: string | undefined;
    constructor(data?: IContainerResourceLimitsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.cpuLimit = _data["cpuLimit"];
            this.memoryLimit = _data["memoryLimit"];
            this.cpuRequest = _data["cpuRequest"];
            this.memoryRequest = _data["memoryRequest"];
        }
    }
    static fromJS(data: any): ContainerResourceLimitsDto {
        data = typeof data === 'object' ? data : {};
        let result = new ContainerResourceLimitsDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["cpuLimit"] = this.cpuLimit;
        data["memoryLimit"] = this.memoryLimit;
        data["cpuRequest"] = this.cpuRequest;
        data["memoryRequest"] = this.memoryRequest;
        return data;
    }
}

export class ContainerVolumeMountDto implements IContainerVolumeMountDto {
    containerPath?: string | undefined;
    hostPath?: string | undefined;
    type?: string | undefined;
    readOnly?: boolean;
    constructor(data?: IContainerVolumeMountDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.containerPath = _data["containerPath"];
            this.hostPath = _data["hostPath"];
            this.type = _data["type"];
            this.readOnly = _data["readOnly"];
        }
    }
    static fromJS(data: any): ContainerVolumeMountDto {
        data = typeof data === 'object' ? data : {};
        let result = new ContainerVolumeMountDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["containerPath"] = this.containerPath;
        data["hostPath"] = this.hostPath;
        data["type"] = this.type;
        data["readOnly"] = this.readOnly;
        return data;
    }
}

export class CopyBlockDto implements ICopyBlockDto {
    newBlockId!: string | undefined;
    newName?: string | undefined;
    constructor(data?: ICopyBlockDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.newBlockId = _data["newBlockId"];
            this.newName = _data["newName"];
        }
    }
    static fromJS(data: any): CopyBlockDto {
        data = typeof data === 'object' ? data : {};
        let result = new CopyBlockDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["newBlockId"] = this.newBlockId;
        data["newName"] = this.newName;
        return data;
    }
}

export class CreateFromTMDto implements ICreateFromTMDto {
    location!: LocationRequestDto;
    address?: AddressDto;
    copyHazardData?: boolean;
    copyEarthquakeData?: boolean;
    constructor(data?: ICreateFromTMDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.location = new LocationRequestDto();
        }
    }
    init(_data?: any) {
        if (_data) {
            this.location = _data["location"] ? LocationRequestDto.fromJS(_data["location"]) : new LocationRequestDto();
            this.address = _data["address"] ? AddressDto.fromJS(_data["address"]) : <any>undefined;
            this.copyHazardData = _data["copyHazardData"];
            this.copyEarthquakeData = _data["copyEarthquakeData"];
        }
    }
    static fromJS(data: any): CreateFromTMDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateFromTMDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["location"] = this.location ? this.location.toJSON() : <any>undefined;
        data["address"] = this.address ? this.address.toJSON() : <any>undefined;
        data["copyHazardData"] = this.copyHazardData;
        data["copyEarthquakeData"] = this.copyEarthquakeData;
        return data;
    }
}

export class DeploymentHistoryDto implements IDeploymentHistoryDto {
    id?: string | undefined;
    programId?: string | undefined;
    version?: string | undefined;
    deploymentType?: string | undefined;
    status?: string | undefined;
    deployedAt?: Date;
    deployedBy?: string | undefined;
    duration?: string;
    errorMessage?: string | undefined;
    constructor(data?: IDeploymentHistoryDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.programId = _data["programId"];
            this.version = _data["version"];
            this.deploymentType = _data["deploymentType"];
            this.status = _data["status"];
            this.deployedAt = _data["deployedAt"] ? new Date(_data["deployedAt"].toString()) : <any>undefined;
            this.deployedBy = _data["deployedBy"];
            this.duration = _data["duration"];
            this.errorMessage = _data["errorMessage"];
        }
    }
    static fromJS(data: any): DeploymentHistoryDto {
        data = typeof data === 'object' ? data : {};
        let result = new DeploymentHistoryDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["programId"] = this.programId;
        data["version"] = this.version;
        data["deploymentType"] = this.deploymentType;
        data["status"] = this.status;
        data["deployedAt"] = this.deployedAt ? this.deployedAt.toISOString() : <any>undefined;
        data["deployedBy"] = this.deployedBy;
        data["duration"] = this.duration;
        data["errorMessage"] = this.errorMessage;
        return data;
    }
}

export class DeploymentHistoryDtoListApiResponse implements IDeploymentHistoryDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: DeploymentHistoryDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IDeploymentHistoryDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(DeploymentHistoryDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): DeploymentHistoryDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new DeploymentHistoryDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class DeploymentResourceUsageDto implements IDeploymentResourceUsageDto {
    programId?: string | undefined;
    cpuUsagePercent?: number;
    memoryUsageMB?: number;
    diskUsageMB?: number;
    networkInMB?: number;
    networkOutMB?: number;
    lastUpdated?: Date;
    constructor(data?: IDeploymentResourceUsageDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programId = _data["programId"];
            this.cpuUsagePercent = _data["cpuUsagePercent"];
            this.memoryUsageMB = _data["memoryUsageMB"];
            this.diskUsageMB = _data["diskUsageMB"];
            this.networkInMB = _data["networkInMB"];
            this.networkOutMB = _data["networkOutMB"];
            this.lastUpdated = _data["lastUpdated"] ? new Date(_data["lastUpdated"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): DeploymentResourceUsageDto {
        data = typeof data === 'object' ? data : {};
        let result = new DeploymentResourceUsageDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programId"] = this.programId;
        data["cpuUsagePercent"] = this.cpuUsagePercent;
        data["memoryUsageMB"] = this.memoryUsageMB;
        data["diskUsageMB"] = this.diskUsageMB;
        data["networkInMB"] = this.networkInMB;
        data["networkOutMB"] = this.networkOutMB;
        data["lastUpdated"] = this.lastUpdated ? this.lastUpdated.toISOString() : <any>undefined;
        return data;
    }
}

export class DeploymentResourceUsageDtoApiResponse implements IDeploymentResourceUsageDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: DeploymentResourceUsageDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IDeploymentResourceUsageDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? DeploymentResourceUsageDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): DeploymentResourceUsageDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new DeploymentResourceUsageDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class DeploymentStatisticsDto implements IDeploymentStatisticsDto {
    totalDeployments?: number;
    successfulDeployments?: number;
    failedDeployments?: number;
    activeDeployments?: number;
    deploymentsByType?: { [key: string]: number; } | undefined;
    averageDeploymentTime?: string;
    fromDate?: Date;
    toDate?: Date;
    constructor(data?: IDeploymentStatisticsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.totalDeployments = _data["totalDeployments"];
            this.successfulDeployments = _data["successfulDeployments"];
            this.failedDeployments = _data["failedDeployments"];
            this.activeDeployments = _data["activeDeployments"];
            if (_data["deploymentsByType"]) {
                this.deploymentsByType = {} as any;
                for (let key in _data["deploymentsByType"]) {
                    if (_data["deploymentsByType"].hasOwnProperty(key))
                        (<any>this.deploymentsByType)![key] = _data["deploymentsByType"][key];
                }
            }
            this.averageDeploymentTime = _data["averageDeploymentTime"];
            this.fromDate = _data["fromDate"] ? new Date(_data["fromDate"].toString()) : <any>undefined;
            this.toDate = _data["toDate"] ? new Date(_data["toDate"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): DeploymentStatisticsDto {
        data = typeof data === 'object' ? data : {};
        let result = new DeploymentStatisticsDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalDeployments"] = this.totalDeployments;
        data["successfulDeployments"] = this.successfulDeployments;
        data["failedDeployments"] = this.failedDeployments;
        data["activeDeployments"] = this.activeDeployments;
        if (this.deploymentsByType) {
            data["deploymentsByType"] = {};
            for (let key in this.deploymentsByType) {
                if (this.deploymentsByType.hasOwnProperty(key))
                    (<any>data["deploymentsByType"])[key] = (<any>this.deploymentsByType)[key];
            }
        }
        data["averageDeploymentTime"] = this.averageDeploymentTime;
        data["fromDate"] = this.fromDate ? this.fromDate.toISOString() : <any>undefined;
        data["toDate"] = this.toDate ? this.toDate.toISOString() : <any>undefined;
        return data;
    }
}

export class DeploymentStatisticsDtoApiResponse implements IDeploymentStatisticsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: DeploymentStatisticsDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IDeploymentStatisticsDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? DeploymentStatisticsDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): DeploymentStatisticsDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new DeploymentStatisticsDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class DeploymentValidationResult implements IDeploymentValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    recommendations?: string[] | undefined;
    validatedConfiguration?: { [key: string]: any; } | undefined;
    constructor(data?: IDeploymentValidationResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.isValid = _data["isValid"];
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            if (Array.isArray(_data["warnings"])) {
                this.warnings = [] as any;
                for (let item of _data["warnings"])
                    this.warnings!.push(item);
            }
            if (Array.isArray(_data["recommendations"])) {
                this.recommendations = [] as any;
                for (let item of _data["recommendations"])
                    this.recommendations!.push(item);
            }
            if (_data["validatedConfiguration"]) {
                this.validatedConfiguration = {} as any;
                for (let key in _data["validatedConfiguration"]) {
                    if (_data["validatedConfiguration"].hasOwnProperty(key))
                        (<any>this.validatedConfiguration)![key] = _data["validatedConfiguration"][key];
                }
            }
        }
    }
    static fromJS(data: any): DeploymentValidationResult {
        data = typeof data === 'object' ? data : {};
        let result = new DeploymentValidationResult();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isValid"] = this.isValid;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        if (Array.isArray(this.warnings)) {
            data["warnings"] = [];
            for (let item of this.warnings)
                data["warnings"].push(item);
        }
        if (Array.isArray(this.recommendations)) {
            data["recommendations"] = [];
            for (let item of this.recommendations)
                data["recommendations"].push(item);
        }
        if (this.validatedConfiguration) {
            data["validatedConfiguration"] = {};
            for (let key in this.validatedConfiguration) {
                if (this.validatedConfiguration.hasOwnProperty(key))
                    (<any>data["validatedConfiguration"])[key] = (<any>this.validatedConfiguration)[key];
            }
        }
        return data;
    }
}

export class DeploymentValidationResultApiResponse implements IDeploymentValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: DeploymentValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IDeploymentValidationResultApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? DeploymentValidationResult.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): DeploymentValidationResultApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new DeploymentValidationResultApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class DownloadRequest implements IDownloadRequest {
    downloadPath?: string | undefined;
    constructor(data?: IDownloadRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.downloadPath = _data["downloadPath"];
        }
    }
    static fromJS(data: any): DownloadRequest {
        data = typeof data === 'object' ? data : {};
        let result = new DownloadRequest();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["downloadPath"] = this.downloadPath;
        return data;
    }
}

export class EarthquakeLevelDto implements IEarthquakeLevelDto {
    pga?: number;
    pgv?: number;
    ss?: number;
    s1?: number;
    sds?: number;
    sd1?: number;
    constructor(data?: IEarthquakeLevelDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.pga = _data["pga"];
            this.pgv = _data["pgv"];
            this.ss = _data["ss"];
            this.s1 = _data["s1"];
            this.sds = _data["sds"];
            this.sd1 = _data["sd1"];
        }
    }
    static fromJS(data: any): EarthquakeLevelDto {
        data = typeof data === 'object' ? data : {};
        let result = new EarthquakeLevelDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pga"] = this.pga;
        data["pgv"] = this.pgv;
        data["ss"] = this.ss;
        data["s1"] = this.s1;
        data["sds"] = this.sds;
        data["sd1"] = this.sd1;
        return data;
    }
}

export class EarthquakeLevelResponseDto implements IEarthquakeLevelResponseDto {
    pga?: number;
    pgv?: number;
    ss?: number;
    s1?: number;
    sds?: number;
    sd1?: number;
    constructor(data?: IEarthquakeLevelResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.pga = _data["pga"];
            this.pgv = _data["pgv"];
            this.ss = _data["ss"];
            this.s1 = _data["s1"];
            this.sds = _data["sds"];
            this.sd1 = _data["sd1"];
        }
    }
    static fromJS(data: any): EarthquakeLevelResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new EarthquakeLevelResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pga"] = this.pga;
        data["pgv"] = this.pgv;
        data["ss"] = this.ss;
        data["s1"] = this.s1;
        data["sds"] = this.sds;
        data["sd1"] = this.sd1;
        return data;
    }
}

export class ExecutionCleanupReportDto implements IExecutionCleanupReportDto {
    cleanupDate?: Date;
    executionsRemoved?: number;
    spaceFreed?: number;
    daysRetained?: number;
    removedByStatus?: { [key: string]: number; } | undefined;
    constructor(data?: IExecutionCleanupReportDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.cleanupDate = _data["cleanupDate"] ? new Date(_data["cleanupDate"].toString()) : <any>undefined;
            this.executionsRemoved = _data["executionsRemoved"];
            this.spaceFreed = _data["spaceFreed"];
            this.daysRetained = _data["daysRetained"];
            if (_data["removedByStatus"]) {
                this.removedByStatus = {} as any;
                for (let key in _data["removedByStatus"]) {
                    if (_data["removedByStatus"].hasOwnProperty(key))
                        (<any>this.removedByStatus)![key] = _data["removedByStatus"][key];
                }
            }
        }
    }
    static fromJS(data: any): ExecutionCleanupReportDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionCleanupReportDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["cleanupDate"] = this.cleanupDate ? this.cleanupDate.toISOString() : <any>undefined;
        data["executionsRemoved"] = this.executionsRemoved;
        data["spaceFreed"] = this.spaceFreed;
        data["daysRetained"] = this.daysRetained;
        if (this.removedByStatus) {
            data["removedByStatus"] = {};
            for (let key in this.removedByStatus) {
                if (this.removedByStatus.hasOwnProperty(key))
                    (<any>data["removedByStatus"])[key] = (<any>this.removedByStatus)[key];
            }
        }
        return data;
    }
}

export class ExecutionCleanupReportDtoListApiResponse implements IExecutionCleanupReportDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionCleanupReportDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionCleanupReportDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(ExecutionCleanupReportDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionCleanupReportDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionCleanupReportDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionDetailDto implements IExecutionDetailDto {
    id?: string | undefined;
    programId?: string | undefined;
    versionId?: string | undefined;
    userId?: string | undefined;
    executionType?: string | undefined;
    startedAt?: Date;
    completedAt?: Date | undefined;
    status?: string | undefined;
    parameters?: any | undefined;
    results?: ExecutionResultDto;
    resourceUsage?: ExecutionResourceUsageDto;
    programName?: string | undefined;
    userName?: string | undefined;
    versionNumber?: number | undefined;
    outputFiles?: ExecutionOutputFileDto[] | undefined;
    recentLogs?: string[] | undefined;
    environment?: ExecutionEnvironmentDto;
    webAppUrl?: string | undefined;
    webAppStatus?: WebAppStatusDto;
    constructor(data?: IExecutionDetailDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.programId = _data["programId"];
            this.versionId = _data["versionId"];
            this.userId = _data["userId"];
            this.executionType = _data["executionType"];
            this.startedAt = _data["startedAt"] ? new Date(_data["startedAt"].toString()) : <any>undefined;
            this.completedAt = _data["completedAt"] ? new Date(_data["completedAt"].toString()) : <any>undefined;
            this.status = _data["status"];
            this.parameters = _data["parameters"];
            this.results = _data["results"] ? ExecutionResultDto.fromJS(_data["results"]) : <any>undefined;
            this.resourceUsage = _data["resourceUsage"] ? ExecutionResourceUsageDto.fromJS(_data["resourceUsage"]) : <any>undefined;
            this.programName = _data["programName"];
            this.userName = _data["userName"];
            this.versionNumber = _data["versionNumber"];
            if (Array.isArray(_data["outputFiles"])) {
                this.outputFiles = [] as any;
                for (let item of _data["outputFiles"])
                    this.outputFiles!.push(ExecutionOutputFileDto.fromJS(item));
            }
            if (Array.isArray(_data["recentLogs"])) {
                this.recentLogs = [] as any;
                for (let item of _data["recentLogs"])
                    this.recentLogs!.push(item);
            }
            this.environment = _data["environment"] ? ExecutionEnvironmentDto.fromJS(_data["environment"]) : <any>undefined;
            this.webAppUrl = _data["webAppUrl"];
            this.webAppStatus = _data["webAppStatus"] ? WebAppStatusDto.fromJS(_data["webAppStatus"]) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionDetailDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["programId"] = this.programId;
        data["versionId"] = this.versionId;
        data["userId"] = this.userId;
        data["executionType"] = this.executionType;
        data["startedAt"] = this.startedAt ? this.startedAt.toISOString() : <any>undefined;
        data["completedAt"] = this.completedAt ? this.completedAt.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["parameters"] = this.parameters;
        data["results"] = this.results ? this.results.toJSON() : <any>undefined;
        data["resourceUsage"] = this.resourceUsage ? this.resourceUsage.toJSON() : <any>undefined;
        data["programName"] = this.programName;
        data["userName"] = this.userName;
        data["versionNumber"] = this.versionNumber;
        if (Array.isArray(this.outputFiles)) {
            data["outputFiles"] = [];
            for (let item of this.outputFiles)
                data["outputFiles"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.recentLogs)) {
            data["recentLogs"] = [];
            for (let item of this.recentLogs)
                data["recentLogs"].push(item);
        }
        data["environment"] = this.environment ? this.environment.toJSON() : <any>undefined;
        data["webAppUrl"] = this.webAppUrl;
        data["webAppStatus"] = this.webAppStatus ? this.webAppStatus.toJSON() : <any>undefined;
        return data;
    }
}

export class ExecutionDetailDtoApiResponse implements IExecutionDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionDetailDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionDetailDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionDetailDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionDetailDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionDto implements IExecutionDto {
    id?: string | undefined;
    programId?: string | undefined;
    versionId?: string | undefined;
    userId?: string | undefined;
    executionType?: string | undefined;
    startedAt?: Date;
    completedAt?: Date | undefined;
    status?: string | undefined;
    parameters?: any | undefined;
    results?: ExecutionResultDto;
    resourceUsage?: ExecutionResourceUsageDto;
    constructor(data?: IExecutionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.programId = _data["programId"];
            this.versionId = _data["versionId"];
            this.userId = _data["userId"];
            this.executionType = _data["executionType"];
            this.startedAt = _data["startedAt"] ? new Date(_data["startedAt"].toString()) : <any>undefined;
            this.completedAt = _data["completedAt"] ? new Date(_data["completedAt"].toString()) : <any>undefined;
            this.status = _data["status"];
            this.parameters = _data["parameters"];
            this.results = _data["results"] ? ExecutionResultDto.fromJS(_data["results"]) : <any>undefined;
            this.resourceUsage = _data["resourceUsage"] ? ExecutionResourceUsageDto.fromJS(_data["resourceUsage"]) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["programId"] = this.programId;
        data["versionId"] = this.versionId;
        data["userId"] = this.userId;
        data["executionType"] = this.executionType;
        data["startedAt"] = this.startedAt ? this.startedAt.toISOString() : <any>undefined;
        data["completedAt"] = this.completedAt ? this.completedAt.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["parameters"] = this.parameters;
        data["results"] = this.results ? this.results.toJSON() : <any>undefined;
        data["resourceUsage"] = this.resourceUsage ? this.resourceUsage.toJSON() : <any>undefined;
        return data;
    }
}

export class ExecutionDtoApiResponse implements IExecutionDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionEnvironmentDto implements IExecutionEnvironmentDto {
    programId?: string | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: ExecutionResourceLimitsDto;
    configuration?: { [key: string]: any; } | undefined;
    lastUpdated?: Date;
    constructor(data?: IExecutionEnvironmentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programId = _data["programId"];
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            this.resourceLimits = _data["resourceLimits"] ? ExecutionResourceLimitsDto.fromJS(_data["resourceLimits"]) : <any>undefined;
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
            this.lastUpdated = _data["lastUpdated"] ? new Date(_data["lastUpdated"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionEnvironmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionEnvironmentDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programId"] = this.programId;
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        data["resourceLimits"] = this.resourceLimits ? this.resourceLimits.toJSON() : <any>undefined;
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        data["lastUpdated"] = this.lastUpdated ? this.lastUpdated.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionEnvironmentDtoApiResponse implements IExecutionEnvironmentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionEnvironmentDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionEnvironmentDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionEnvironmentDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionEnvironmentDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionEnvironmentDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionEnvironmentUpdateDto implements IExecutionEnvironmentUpdateDto {
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: ExecutionResourceLimitsDto;
    configuration?: { [key: string]: any; } | undefined;
    constructor(data?: IExecutionEnvironmentUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            this.resourceLimits = _data["resourceLimits"] ? ExecutionResourceLimitsDto.fromJS(_data["resourceLimits"]) : <any>undefined;
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
        }
    }
    static fromJS(data: any): ExecutionEnvironmentUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionEnvironmentUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        data["resourceLimits"] = this.resourceLimits ? this.resourceLimits.toJSON() : <any>undefined;
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        return data;
    }
}

export class ExecutionListDto implements IExecutionListDto {
    id?: string | undefined;
    programId?: string | undefined;
    programName?: string | undefined;
    versionId?: string | undefined;
    versionNumber?: number | undefined;
    userId?: string | undefined;
    userName?: string | undefined;
    executionType?: string | undefined;
    startedAt?: Date;
    completedAt?: Date | undefined;
    status?: string | undefined;
    exitCode?: number | undefined;
    hasError?: boolean;
    duration?: number | undefined;
    resourceUsage?: ExecutionResourceUsageDto;
    constructor(data?: IExecutionListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.programId = _data["programId"];
            this.programName = _data["programName"];
            this.versionId = _data["versionId"];
            this.versionNumber = _data["versionNumber"];
            this.userId = _data["userId"];
            this.userName = _data["userName"];
            this.executionType = _data["executionType"];
            this.startedAt = _data["startedAt"] ? new Date(_data["startedAt"].toString()) : <any>undefined;
            this.completedAt = _data["completedAt"] ? new Date(_data["completedAt"].toString()) : <any>undefined;
            this.status = _data["status"];
            this.exitCode = _data["exitCode"];
            this.hasError = _data["hasError"];
            this.duration = _data["duration"];
            this.resourceUsage = _data["resourceUsage"] ? ExecutionResourceUsageDto.fromJS(_data["resourceUsage"]) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["programId"] = this.programId;
        data["programName"] = this.programName;
        data["versionId"] = this.versionId;
        data["versionNumber"] = this.versionNumber;
        data["userId"] = this.userId;
        data["userName"] = this.userName;
        data["executionType"] = this.executionType;
        data["startedAt"] = this.startedAt ? this.startedAt.toISOString() : <any>undefined;
        data["completedAt"] = this.completedAt ? this.completedAt.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["exitCode"] = this.exitCode;
        data["hasError"] = this.hasError;
        data["duration"] = this.duration;
        data["resourceUsage"] = this.resourceUsage ? this.resourceUsage.toJSON() : <any>undefined;
        return data;
    }
}

export class ExecutionListDtoListApiResponse implements IExecutionListDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionListDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionListDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(ExecutionListDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionListDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionListDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionListDtoPagedResponse implements IExecutionListDtoPagedResponse {
    items?: ExecutionListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
    constructor(data?: IExecutionListDtoPagedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(ExecutionListDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            (<any>this).hasPreviousPage = _data["hasPreviousPage"];
            (<any>this).hasNextPage = _data["hasNextPage"];
        }
    }
    static fromJS(data: any): ExecutionListDtoPagedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionListDtoPagedResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item ? item.toJSON() : <any>undefined);
        }
        data["pageNumber"] = this.pageNumber;
        data["pageSize"] = this.pageSize;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export class ExecutionListDtoPagedResponseApiResponse implements IExecutionListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionListDtoPagedResponseApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionListDtoPagedResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionListDtoPagedResponseApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionListDtoPagedResponseApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionOutputFileContentDto implements IExecutionOutputFileContentDto {
    fileName?: string | undefined;
    contentType?: string | undefined;
    content?: string | undefined;
    size?: number;
    createdAt?: Date;
    constructor(data?: IExecutionOutputFileContentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.fileName = _data["fileName"];
            this.contentType = _data["contentType"];
            this.content = _data["content"];
            this.size = _data["size"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionOutputFileContentDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionOutputFileContentDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fileName"] = this.fileName;
        data["contentType"] = this.contentType;
        data["content"] = this.content;
        data["size"] = this.size;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionOutputFileContentDtoApiResponse implements IExecutionOutputFileContentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionOutputFileContentDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionOutputFileContentDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionOutputFileContentDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionOutputFileContentDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionOutputFileContentDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionOutputFileDto implements IExecutionOutputFileDto {
    fileName?: string | undefined;
    path?: string | undefined;
    size?: number;
    contentType?: string | undefined;
    createdAt?: Date;
    downloadUrl?: string | undefined;
    constructor(data?: IExecutionOutputFileDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.fileName = _data["fileName"];
            this.path = _data["path"];
            this.size = _data["size"];
            this.contentType = _data["contentType"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.downloadUrl = _data["downloadUrl"];
        }
    }
    static fromJS(data: any): ExecutionOutputFileDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionOutputFileDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fileName"] = this.fileName;
        data["path"] = this.path;
        data["size"] = this.size;
        data["contentType"] = this.contentType;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["downloadUrl"] = this.downloadUrl;
        return data;
    }
}

export class ExecutionOutputFileDtoListApiResponse implements IExecutionOutputFileDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionOutputFileDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionOutputFileDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(ExecutionOutputFileDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionOutputFileDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionOutputFileDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionParametersDto implements IExecutionParametersDto {
    programId!: string;
    versionId?: string | undefined;
    parameters?: any | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: ExecutionResourceLimitsDto;
    saveResults?: boolean;
    timeoutMinutes?: number;
    executionName?: string | undefined;
    constructor(data?: IExecutionParametersDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programId = _data["programId"];
            this.versionId = _data["versionId"];
            this.parameters = _data["parameters"];
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            this.resourceLimits = _data["resourceLimits"] ? ExecutionResourceLimitsDto.fromJS(_data["resourceLimits"]) : <any>undefined;
            this.saveResults = _data["saveResults"];
            this.timeoutMinutes = _data["timeoutMinutes"];
            this.executionName = _data["executionName"];
        }
    }
    static fromJS(data: any): ExecutionParametersDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionParametersDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programId"] = this.programId;
        data["versionId"] = this.versionId;
        data["parameters"] = this.parameters;
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        data["resourceLimits"] = this.resourceLimits ? this.resourceLimits.toJSON() : <any>undefined;
        data["saveResults"] = this.saveResults;
        data["timeoutMinutes"] = this.timeoutMinutes;
        data["executionName"] = this.executionName;
        return data;
    }
}

export class ExecutionPerformanceDto implements IExecutionPerformanceDto {
    programId?: string | undefined;
    programName?: string | undefined;
    executionCount?: number;
    successRate?: number;
    averageExecutionTime?: number;
    averageResourceUsage?: number;
    lastExecution?: Date;
    constructor(data?: IExecutionPerformanceDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programId = _data["programId"];
            this.programName = _data["programName"];
            this.executionCount = _data["executionCount"];
            this.successRate = _data["successRate"];
            this.averageExecutionTime = _data["averageExecutionTime"];
            this.averageResourceUsage = _data["averageResourceUsage"];
            this.lastExecution = _data["lastExecution"] ? new Date(_data["lastExecution"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionPerformanceDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionPerformanceDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programId"] = this.programId;
        data["programName"] = this.programName;
        data["executionCount"] = this.executionCount;
        data["successRate"] = this.successRate;
        data["averageExecutionTime"] = this.averageExecutionTime;
        data["averageResourceUsage"] = this.averageResourceUsage;
        data["lastExecution"] = this.lastExecution ? this.lastExecution.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionPerformanceDtoListApiResponse implements IExecutionPerformanceDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionPerformanceDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionPerformanceDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(ExecutionPerformanceDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionPerformanceDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionPerformanceDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionQueueStatusDto implements IExecutionQueueStatusDto {
    queueLength?: number;
    runningExecutions?: number;
    maxConcurrentExecutions?: number;
    averageWaitTime?: number;
    queuedExecutions?: ExecutionListDto[] | undefined;
    constructor(data?: IExecutionQueueStatusDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.queueLength = _data["queueLength"];
            this.runningExecutions = _data["runningExecutions"];
            this.maxConcurrentExecutions = _data["maxConcurrentExecutions"];
            this.averageWaitTime = _data["averageWaitTime"];
            if (Array.isArray(_data["queuedExecutions"])) {
                this.queuedExecutions = [] as any;
                for (let item of _data["queuedExecutions"])
                    this.queuedExecutions!.push(ExecutionListDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ExecutionQueueStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionQueueStatusDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["queueLength"] = this.queueLength;
        data["runningExecutions"] = this.runningExecutions;
        data["maxConcurrentExecutions"] = this.maxConcurrentExecutions;
        data["averageWaitTime"] = this.averageWaitTime;
        if (Array.isArray(this.queuedExecutions)) {
            data["queuedExecutions"] = [];
            for (let item of this.queuedExecutions)
                data["queuedExecutions"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class ExecutionQueueStatusDtoApiResponse implements IExecutionQueueStatusDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionQueueStatusDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionQueueStatusDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionQueueStatusDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionQueueStatusDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionQueueStatusDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionResourceLimitsDto implements IExecutionResourceLimitsDto {
    maxCpuPercentage?: number;
    maxMemoryMb?: number;
    maxDiskMb?: number;
    maxExecutionTimeMinutes?: number;
    maxConcurrentExecutions?: number;
    constructor(data?: IExecutionResourceLimitsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.maxCpuPercentage = _data["maxCpuPercentage"];
            this.maxMemoryMb = _data["maxMemoryMb"];
            this.maxDiskMb = _data["maxDiskMb"];
            this.maxExecutionTimeMinutes = _data["maxExecutionTimeMinutes"];
            this.maxConcurrentExecutions = _data["maxConcurrentExecutions"];
        }
    }
    static fromJS(data: any): ExecutionResourceLimitsDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionResourceLimitsDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["maxCpuPercentage"] = this.maxCpuPercentage;
        data["maxMemoryMb"] = this.maxMemoryMb;
        data["maxDiskMb"] = this.maxDiskMb;
        data["maxExecutionTimeMinutes"] = this.maxExecutionTimeMinutes;
        data["maxConcurrentExecutions"] = this.maxConcurrentExecutions;
        return data;
    }
}

export class ExecutionResourceLimitsDtoApiResponse implements IExecutionResourceLimitsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionResourceLimitsDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionResourceLimitsDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionResourceLimitsDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionResourceLimitsDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionResourceLimitsDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionResourceLimitsUpdateDto implements IExecutionResourceLimitsUpdateDto {
    maxCpuPercentage?: number | undefined;
    maxMemoryMb?: number | undefined;
    maxDiskMb?: number | undefined;
    maxExecutionTimeMinutes?: number | undefined;
    maxConcurrentExecutions?: number | undefined;
    constructor(data?: IExecutionResourceLimitsUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.maxCpuPercentage = _data["maxCpuPercentage"];
            this.maxMemoryMb = _data["maxMemoryMb"];
            this.maxDiskMb = _data["maxDiskMb"];
            this.maxExecutionTimeMinutes = _data["maxExecutionTimeMinutes"];
            this.maxConcurrentExecutions = _data["maxConcurrentExecutions"];
        }
    }
    static fromJS(data: any): ExecutionResourceLimitsUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionResourceLimitsUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["maxCpuPercentage"] = this.maxCpuPercentage;
        data["maxMemoryMb"] = this.maxMemoryMb;
        data["maxDiskMb"] = this.maxDiskMb;
        data["maxExecutionTimeMinutes"] = this.maxExecutionTimeMinutes;
        data["maxConcurrentExecutions"] = this.maxConcurrentExecutions;
        return data;
    }
}

export class ExecutionResourceTrendDto implements IExecutionResourceTrendDto {
    timestamp?: Date;
    cpuUsage?: number;
    memoryUsage?: number;
    diskUsage?: number;
    activeExecutions?: number;
    constructor(data?: IExecutionResourceTrendDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
            this.cpuUsage = _data["cpuUsage"];
            this.memoryUsage = _data["memoryUsage"];
            this.diskUsage = _data["diskUsage"];
            this.activeExecutions = _data["activeExecutions"];
        }
    }
    static fromJS(data: any): ExecutionResourceTrendDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionResourceTrendDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        data["cpuUsage"] = this.cpuUsage;
        data["memoryUsage"] = this.memoryUsage;
        data["diskUsage"] = this.diskUsage;
        data["activeExecutions"] = this.activeExecutions;
        return data;
    }
}

export class ExecutionResourceTrendDtoListApiResponse implements IExecutionResourceTrendDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionResourceTrendDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionResourceTrendDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(ExecutionResourceTrendDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionResourceTrendDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionResourceTrendDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionResourceUpdateDto implements IExecutionResourceUpdateDto {
    cpuTime?: number;
    memoryUsed?: number;
    diskUsed?: number;
    additionalMetrics?: { [key: string]: any; } | undefined;
    constructor(data?: IExecutionResourceUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.cpuTime = _data["cpuTime"];
            this.memoryUsed = _data["memoryUsed"];
            this.diskUsed = _data["diskUsed"];
            if (_data["additionalMetrics"]) {
                this.additionalMetrics = {} as any;
                for (let key in _data["additionalMetrics"]) {
                    if (_data["additionalMetrics"].hasOwnProperty(key))
                        (<any>this.additionalMetrics)![key] = _data["additionalMetrics"][key];
                }
            }
        }
    }
    static fromJS(data: any): ExecutionResourceUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionResourceUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["cpuTime"] = this.cpuTime;
        data["memoryUsed"] = this.memoryUsed;
        data["diskUsed"] = this.diskUsed;
        if (this.additionalMetrics) {
            data["additionalMetrics"] = {};
            for (let key in this.additionalMetrics) {
                if (this.additionalMetrics.hasOwnProperty(key))
                    (<any>data["additionalMetrics"])[key] = (<any>this.additionalMetrics)[key];
            }
        }
        return data;
    }
}

export class ExecutionResourceUsageDto implements IExecutionResourceUsageDto {
    cpuTime?: number;
    memoryUsed?: number;
    diskUsed?: number;
    cpuPercentage?: number;
    memoryPercentage?: number;
    diskPercentage?: number;
    lastUpdated?: Date;
    constructor(data?: IExecutionResourceUsageDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.cpuTime = _data["cpuTime"];
            this.memoryUsed = _data["memoryUsed"];
            this.diskUsed = _data["diskUsed"];
            this.cpuPercentage = _data["cpuPercentage"];
            this.memoryPercentage = _data["memoryPercentage"];
            this.diskPercentage = _data["diskPercentage"];
            this.lastUpdated = _data["lastUpdated"] ? new Date(_data["lastUpdated"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionResourceUsageDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionResourceUsageDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["cpuTime"] = this.cpuTime;
        data["memoryUsed"] = this.memoryUsed;
        data["diskUsed"] = this.diskUsed;
        data["cpuPercentage"] = this.cpuPercentage;
        data["memoryPercentage"] = this.memoryPercentage;
        data["diskPercentage"] = this.diskPercentage;
        data["lastUpdated"] = this.lastUpdated ? this.lastUpdated.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionResourceUsageDtoApiResponse implements IExecutionResourceUsageDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionResourceUsageDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionResourceUsageDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionResourceUsageDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionResourceUsageDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionResourceUsageDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionResultDto implements IExecutionResultDto {
    exitCode?: number;
    output?: string | undefined;
    outputFiles?: string[] | undefined;
    error?: string | undefined;
    webAppUrl?: string | undefined;
    completedAt?: Date | undefined;
    constructor(data?: IExecutionResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.exitCode = _data["exitCode"];
            this.output = _data["output"];
            if (Array.isArray(_data["outputFiles"])) {
                this.outputFiles = [] as any;
                for (let item of _data["outputFiles"])
                    this.outputFiles!.push(item);
            }
            this.error = _data["error"];
            this.webAppUrl = _data["webAppUrl"];
            this.completedAt = _data["completedAt"] ? new Date(_data["completedAt"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionResultDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["exitCode"] = this.exitCode;
        data["output"] = this.output;
        if (Array.isArray(this.outputFiles)) {
            data["outputFiles"] = [];
            for (let item of this.outputFiles)
                data["outputFiles"].push(item);
        }
        data["error"] = this.error;
        data["webAppUrl"] = this.webAppUrl;
        data["completedAt"] = this.completedAt ? this.completedAt.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionResultDtoApiResponse implements IExecutionResultDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionResultDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionResultDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionResultDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionResultDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionResultDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionScheduleRequestDto implements IExecutionScheduleRequestDto {
    scheduledTime?: Date;
    parameters?: any | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: ExecutionResourceLimitsDto;
    saveResults?: boolean;
    description?: string | undefined;
    constructor(data?: IExecutionScheduleRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.scheduledTime = _data["scheduledTime"] ? new Date(_data["scheduledTime"].toString()) : <any>undefined;
            this.parameters = _data["parameters"];
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            this.resourceLimits = _data["resourceLimits"] ? ExecutionResourceLimitsDto.fromJS(_data["resourceLimits"]) : <any>undefined;
            this.saveResults = _data["saveResults"];
            this.description = _data["description"];
        }
    }
    static fromJS(data: any): ExecutionScheduleRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionScheduleRequestDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["scheduledTime"] = this.scheduledTime ? this.scheduledTime.toISOString() : <any>undefined;
        data["parameters"] = this.parameters;
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        data["resourceLimits"] = this.resourceLimits ? this.resourceLimits.toJSON() : <any>undefined;
        data["saveResults"] = this.saveResults;
        data["description"] = this.description;
        return data;
    }
}

export class ExecutionSearchDto implements IExecutionSearchDto {
    programId?: string | undefined;
    versionId?: string | undefined;
    userId?: string | undefined;
    status?: string | undefined;
    executionType?: string | undefined;
    startedFrom?: Date | undefined;
    startedTo?: Date | undefined;
    completedFrom?: Date | undefined;
    completedTo?: Date | undefined;
    exitCodeFrom?: number | undefined;
    exitCodeTo?: number | undefined;
    hasErrors?: boolean | undefined;
    constructor(data?: IExecutionSearchDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programId = _data["programId"];
            this.versionId = _data["versionId"];
            this.userId = _data["userId"];
            this.status = _data["status"];
            this.executionType = _data["executionType"];
            this.startedFrom = _data["startedFrom"] ? new Date(_data["startedFrom"].toString()) : <any>undefined;
            this.startedTo = _data["startedTo"] ? new Date(_data["startedTo"].toString()) : <any>undefined;
            this.completedFrom = _data["completedFrom"] ? new Date(_data["completedFrom"].toString()) : <any>undefined;
            this.completedTo = _data["completedTo"] ? new Date(_data["completedTo"].toString()) : <any>undefined;
            this.exitCodeFrom = _data["exitCodeFrom"];
            this.exitCodeTo = _data["exitCodeTo"];
            this.hasErrors = _data["hasErrors"];
        }
    }
    static fromJS(data: any): ExecutionSearchDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionSearchDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programId"] = this.programId;
        data["versionId"] = this.versionId;
        data["userId"] = this.userId;
        data["status"] = this.status;
        data["executionType"] = this.executionType;
        data["startedFrom"] = this.startedFrom ? this.startedFrom.toISOString() : <any>undefined;
        data["startedTo"] = this.startedTo ? this.startedTo.toISOString() : <any>undefined;
        data["completedFrom"] = this.completedFrom ? this.completedFrom.toISOString() : <any>undefined;
        data["completedTo"] = this.completedTo ? this.completedTo.toISOString() : <any>undefined;
        data["exitCodeFrom"] = this.exitCodeFrom;
        data["exitCodeTo"] = this.exitCodeTo;
        data["hasErrors"] = this.hasErrors;
        return data;
    }
}

export class ExecutionSecurityScanResult implements IExecutionSecurityScanResult {
    isSecure?: boolean;
    securityIssues?: string[] | undefined;
    securityWarnings?: string[] | undefined;
    riskLevel?: number;
    scanDate?: Date;
    constructor(data?: IExecutionSecurityScanResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.isSecure = _data["isSecure"];
            if (Array.isArray(_data["securityIssues"])) {
                this.securityIssues = [] as any;
                for (let item of _data["securityIssues"])
                    this.securityIssues!.push(item);
            }
            if (Array.isArray(_data["securityWarnings"])) {
                this.securityWarnings = [] as any;
                for (let item of _data["securityWarnings"])
                    this.securityWarnings!.push(item);
            }
            this.riskLevel = _data["riskLevel"];
            this.scanDate = _data["scanDate"] ? new Date(_data["scanDate"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionSecurityScanResult {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionSecurityScanResult();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isSecure"] = this.isSecure;
        if (Array.isArray(this.securityIssues)) {
            data["securityIssues"] = [];
            for (let item of this.securityIssues)
                data["securityIssues"].push(item);
        }
        if (Array.isArray(this.securityWarnings)) {
            data["securityWarnings"] = [];
            for (let item of this.securityWarnings)
                data["securityWarnings"].push(item);
        }
        data["riskLevel"] = this.riskLevel;
        data["scanDate"] = this.scanDate ? this.scanDate.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionSecurityScanResultApiResponse implements IExecutionSecurityScanResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionSecurityScanResult;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionSecurityScanResultApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionSecurityScanResult.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionSecurityScanResultApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionSecurityScanResultApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionStatsDto implements IExecutionStatsDto {
    totalExecutions?: number;
    successfulExecutions?: number;
    failedExecutions?: number;
    runningExecutions?: number;
    averageExecutionTime?: number;
    successRate?: number;
    totalCpuTime?: number;
    totalMemoryUsed?: number;
    executionsByStatus?: { [key: string]: number; } | undefined;
    executionsByType?: { [key: string]: number; } | undefined;
    constructor(data?: IExecutionStatsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.totalExecutions = _data["totalExecutions"];
            this.successfulExecutions = _data["successfulExecutions"];
            this.failedExecutions = _data["failedExecutions"];
            this.runningExecutions = _data["runningExecutions"];
            this.averageExecutionTime = _data["averageExecutionTime"];
            this.successRate = _data["successRate"];
            this.totalCpuTime = _data["totalCpuTime"];
            this.totalMemoryUsed = _data["totalMemoryUsed"];
            if (_data["executionsByStatus"]) {
                this.executionsByStatus = {} as any;
                for (let key in _data["executionsByStatus"]) {
                    if (_data["executionsByStatus"].hasOwnProperty(key))
                        (<any>this.executionsByStatus)![key] = _data["executionsByStatus"][key];
                }
            }
            if (_data["executionsByType"]) {
                this.executionsByType = {} as any;
                for (let key in _data["executionsByType"]) {
                    if (_data["executionsByType"].hasOwnProperty(key))
                        (<any>this.executionsByType)![key] = _data["executionsByType"][key];
                }
            }
        }
    }
    static fromJS(data: any): ExecutionStatsDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionStatsDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalExecutions"] = this.totalExecutions;
        data["successfulExecutions"] = this.successfulExecutions;
        data["failedExecutions"] = this.failedExecutions;
        data["runningExecutions"] = this.runningExecutions;
        data["averageExecutionTime"] = this.averageExecutionTime;
        data["successRate"] = this.successRate;
        data["totalCpuTime"] = this.totalCpuTime;
        data["totalMemoryUsed"] = this.totalMemoryUsed;
        if (this.executionsByStatus) {
            data["executionsByStatus"] = {};
            for (let key in this.executionsByStatus) {
                if (this.executionsByStatus.hasOwnProperty(key))
                    (<any>data["executionsByStatus"])[key] = (<any>this.executionsByStatus)[key];
            }
        }
        if (this.executionsByType) {
            data["executionsByType"] = {};
            for (let key in this.executionsByType) {
                if (this.executionsByType.hasOwnProperty(key))
                    (<any>data["executionsByType"])[key] = (<any>this.executionsByType)[key];
            }
        }
        return data;
    }
}

export class ExecutionStatsDtoApiResponse implements IExecutionStatsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionStatsDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionStatsDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionStatsDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionStatsDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionStatsDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionStatusDto implements IExecutionStatusDto {
    id?: string | undefined;
    status?: string | undefined;
    startedAt?: Date;
    completedAt?: Date | undefined;
    progress?: number | undefined;
    currentStep?: string | undefined;
    resourceUsage?: ExecutionResourceUsageDto;
    statusMessage?: string | undefined;
    constructor(data?: IExecutionStatusDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.status = _data["status"];
            this.startedAt = _data["startedAt"] ? new Date(_data["startedAt"].toString()) : <any>undefined;
            this.completedAt = _data["completedAt"] ? new Date(_data["completedAt"].toString()) : <any>undefined;
            this.progress = _data["progress"];
            this.currentStep = _data["currentStep"];
            this.resourceUsage = _data["resourceUsage"] ? ExecutionResourceUsageDto.fromJS(_data["resourceUsage"]) : <any>undefined;
            this.statusMessage = _data["statusMessage"];
        }
    }
    static fromJS(data: any): ExecutionStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionStatusDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["status"] = this.status;
        data["startedAt"] = this.startedAt ? this.startedAt.toISOString() : <any>undefined;
        data["completedAt"] = this.completedAt ? this.completedAt.toISOString() : <any>undefined;
        data["progress"] = this.progress;
        data["currentStep"] = this.currentStep;
        data["resourceUsage"] = this.resourceUsage ? this.resourceUsage.toJSON() : <any>undefined;
        data["statusMessage"] = this.statusMessage;
        return data;
    }
}

export class ExecutionStatusDtoApiResponse implements IExecutionStatusDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionStatusDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionStatusDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionStatusDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionStatusDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionStatusDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionSummaryDto implements IExecutionSummaryDto {
    userId?: string | undefined;
    totalExecutions?: number;
    successfulExecutions?: number;
    failedExecutions?: number;
    totalCpuTime?: number;
    totalMemoryUsed?: number;
    lastExecution?: Date | undefined;
    programPerformance?: ExecutionPerformanceDto[] | undefined;
    constructor(data?: IExecutionSummaryDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.userId = _data["userId"];
            this.totalExecutions = _data["totalExecutions"];
            this.successfulExecutions = _data["successfulExecutions"];
            this.failedExecutions = _data["failedExecutions"];
            this.totalCpuTime = _data["totalCpuTime"];
            this.totalMemoryUsed = _data["totalMemoryUsed"];
            this.lastExecution = _data["lastExecution"] ? new Date(_data["lastExecution"].toString()) : <any>undefined;
            if (Array.isArray(_data["programPerformance"])) {
                this.programPerformance = [] as any;
                for (let item of _data["programPerformance"])
                    this.programPerformance!.push(ExecutionPerformanceDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): ExecutionSummaryDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionSummaryDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userId"] = this.userId;
        data["totalExecutions"] = this.totalExecutions;
        data["successfulExecutions"] = this.successfulExecutions;
        data["failedExecutions"] = this.failedExecutions;
        data["totalCpuTime"] = this.totalCpuTime;
        data["totalMemoryUsed"] = this.totalMemoryUsed;
        data["lastExecution"] = this.lastExecution ? this.lastExecution.toISOString() : <any>undefined;
        if (Array.isArray(this.programPerformance)) {
            data["programPerformance"] = [];
            for (let item of this.programPerformance)
                data["programPerformance"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class ExecutionSummaryDtoApiResponse implements IExecutionSummaryDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionSummaryDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionSummaryDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionSummaryDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionSummaryDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionSummaryDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionTemplateDto implements IExecutionTemplateDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    language?: string | undefined;
    parameterSchema?: any | undefined;
    defaultEnvironment?: { [key: string]: string; } | undefined;
    defaultResourceLimits?: ExecutionResourceLimitsDto;
    constructor(data?: IExecutionTemplateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.language = _data["language"];
            this.parameterSchema = _data["parameterSchema"];
            if (_data["defaultEnvironment"]) {
                this.defaultEnvironment = {} as any;
                for (let key in _data["defaultEnvironment"]) {
                    if (_data["defaultEnvironment"].hasOwnProperty(key))
                        (<any>this.defaultEnvironment)![key] = _data["defaultEnvironment"][key];
                }
            }
            this.defaultResourceLimits = _data["defaultResourceLimits"] ? ExecutionResourceLimitsDto.fromJS(_data["defaultResourceLimits"]) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionTemplateDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionTemplateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["language"] = this.language;
        data["parameterSchema"] = this.parameterSchema;
        if (this.defaultEnvironment) {
            data["defaultEnvironment"] = {};
            for (let key in this.defaultEnvironment) {
                if (this.defaultEnvironment.hasOwnProperty(key))
                    (<any>data["defaultEnvironment"])[key] = (<any>this.defaultEnvironment)[key];
            }
        }
        data["defaultResourceLimits"] = this.defaultResourceLimits ? this.defaultResourceLimits.toJSON() : <any>undefined;
        return data;
    }
}

export class ExecutionTemplateDtoListApiResponse implements IExecutionTemplateDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionTemplateDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionTemplateDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(ExecutionTemplateDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionTemplateDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionTemplateDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionTrendDto implements IExecutionTrendDto {
    date?: Date;
    executionCount?: number;
    successfulCount?: number;
    failedCount?: number;
    averageExecutionTime?: number;
    totalResourceUsage?: number;
    constructor(data?: IExecutionTrendDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.date = _data["date"] ? new Date(_data["date"].toString()) : <any>undefined;
            this.executionCount = _data["executionCount"];
            this.successfulCount = _data["successfulCount"];
            this.failedCount = _data["failedCount"];
            this.averageExecutionTime = _data["averageExecutionTime"];
            this.totalResourceUsage = _data["totalResourceUsage"];
        }
    }
    static fromJS(data: any): ExecutionTrendDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionTrendDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["date"] = this.date ? this.date.toISOString() : <any>undefined;
        data["executionCount"] = this.executionCount;
        data["successfulCount"] = this.successfulCount;
        data["failedCount"] = this.failedCount;
        data["averageExecutionTime"] = this.averageExecutionTime;
        data["totalResourceUsage"] = this.totalResourceUsage;
        return data;
    }
}

export class ExecutionTrendDtoListApiResponse implements IExecutionTrendDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionTrendDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionTrendDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(ExecutionTrendDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionTrendDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionTrendDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ExecutionValidationResult implements IExecutionValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    recommendedLimits?: ExecutionResourceLimitsDto;
    constructor(data?: IExecutionValidationResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.isValid = _data["isValid"];
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            if (Array.isArray(_data["warnings"])) {
                this.warnings = [] as any;
                for (let item of _data["warnings"])
                    this.warnings!.push(item);
            }
            this.recommendedLimits = _data["recommendedLimits"] ? ExecutionResourceLimitsDto.fromJS(_data["recommendedLimits"]) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionValidationResult {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionValidationResult();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isValid"] = this.isValid;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        if (Array.isArray(this.warnings)) {
            data["warnings"] = [];
            for (let item of this.warnings)
                data["warnings"].push(item);
        }
        data["recommendedLimits"] = this.recommendedLimits ? this.recommendedLimits.toJSON() : <any>undefined;
        return data;
    }
}

export class ExecutionValidationResultApiResponse implements IExecutionValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IExecutionValidationResultApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ExecutionValidationResult.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ExecutionValidationResultApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ExecutionValidationResultApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class FileStorageResult implements IFileStorageResult {
    filePath?: string | undefined;
    storageKey?: string | undefined;
    hash?: string | undefined;
    size?: number;
    contentType?: string | undefined;
    success?: boolean;
    errorMessage?: string | undefined;
    constructor(data?: IFileStorageResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.filePath = _data["filePath"];
            this.storageKey = _data["storageKey"];
            this.hash = _data["hash"];
            this.size = _data["size"];
            this.contentType = _data["contentType"];
            this.success = _data["success"];
            this.errorMessage = _data["errorMessage"];
        }
    }
    static fromJS(data: any): FileStorageResult {
        data = typeof data === 'object' ? data : {};
        let result = new FileStorageResult();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["filePath"] = this.filePath;
        data["storageKey"] = this.storageKey;
        data["hash"] = this.hash;
        data["size"] = this.size;
        data["contentType"] = this.contentType;
        data["success"] = this.success;
        data["errorMessage"] = this.errorMessage;
        return data;
    }
}

export class FileStorageResultListApiResponse implements IFileStorageResultListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: FileStorageResult[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IFileStorageResultListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(FileStorageResult.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): FileStorageResultListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new FileStorageResultListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class FileValidationRequest implements IFileValidationRequest {
    fileName!: string;
    content!: string;
    contentType!: string;
    constructor(data?: IFileValidationRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.fileName = _data["fileName"];
            this.content = _data["content"];
            this.contentType = _data["contentType"];
        }
    }
    static fromJS(data: any): FileValidationRequest {
        data = typeof data === 'object' ? data : {};
        let result = new FileValidationRequest();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fileName"] = this.fileName;
        data["content"] = this.content;
        data["contentType"] = this.contentType;
        return data;
    }
}

export class FileValidationResult implements IFileValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    suggestedContentType?: string | undefined;
    constructor(data?: IFileValidationResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.isValid = _data["isValid"];
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            if (Array.isArray(_data["warnings"])) {
                this.warnings = [] as any;
                for (let item of _data["warnings"])
                    this.warnings!.push(item);
            }
            this.suggestedContentType = _data["suggestedContentType"];
        }
    }
    static fromJS(data: any): FileValidationResult {
        data = typeof data === 'object' ? data : {};
        let result = new FileValidationResult();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isValid"] = this.isValid;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        if (Array.isArray(this.warnings)) {
            data["warnings"] = [];
            for (let item of this.warnings)
                data["warnings"].push(item);
        }
        data["suggestedContentType"] = this.suggestedContentType;
        return data;
    }
}

export class FileValidationResultApiResponse implements IFileValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: FileValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IFileValidationResultApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? FileValidationResult.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): FileValidationResultApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new FileValidationResultApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class FireHazardDto implements IFireHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;
    fireSystem?: boolean;
    afforestationCondition?: boolean;
    forestType?: string | undefined;
    stubbleBurning?: boolean;
    externalFireIncident?: boolean;
    externalFireIncidentDescription?: string | undefined;
    nearbyGasStation?: boolean;
    distanceToNearbyGasStation?: number;
    hasIndustrialFireDanger?: boolean;
    industrialFireExposedFacade?: number;
    forestFireDanger?: boolean;
    distanceToClosestForest?: number;
    vegetationType?: string | undefined;
    constructor(data?: IFireHazardDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
            this.fireSystem = _data["fireSystem"];
            this.afforestationCondition = _data["afforestationCondition"];
            this.forestType = _data["forestType"];
            this.stubbleBurning = _data["stubbleBurning"];
            this.externalFireIncident = _data["externalFireIncident"];
            this.externalFireIncidentDescription = _data["externalFireIncidentDescription"];
            this.nearbyGasStation = _data["nearbyGasStation"];
            this.distanceToNearbyGasStation = _data["distanceToNearbyGasStation"];
            this.hasIndustrialFireDanger = _data["hasIndustrialFireDanger"];
            this.industrialFireExposedFacade = _data["industrialFireExposedFacade"];
            this.forestFireDanger = _data["forestFireDanger"];
            this.distanceToClosestForest = _data["distanceToClosestForest"];
            this.vegetationType = _data["vegetationType"];
        }
    }
    static fromJS(data: any): FireHazardDto {
        data = typeof data === 'object' ? data : {};
        let result = new FireHazardDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        data["fireSystem"] = this.fireSystem;
        data["afforestationCondition"] = this.afforestationCondition;
        data["forestType"] = this.forestType;
        data["stubbleBurning"] = this.stubbleBurning;
        data["externalFireIncident"] = this.externalFireIncident;
        data["externalFireIncidentDescription"] = this.externalFireIncidentDescription;
        data["nearbyGasStation"] = this.nearbyGasStation;
        data["distanceToNearbyGasStation"] = this.distanceToNearbyGasStation;
        data["hasIndustrialFireDanger"] = this.hasIndustrialFireDanger;
        data["industrialFireExposedFacade"] = this.industrialFireExposedFacade;
        data["forestFireDanger"] = this.forestFireDanger;
        data["distanceToClosestForest"] = this.distanceToClosestForest;
        data["vegetationType"] = this.vegetationType;
        return data;
    }
}

export class FireHazardResponseDto implements IFireHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;
    fireSystem?: boolean;
    afforestationCondition?: boolean;
    forestType?: string | undefined;
    stubbleBurning?: boolean;
    externalFireIncident?: boolean;
    externalFireIncidentDescription?: string | undefined;
    nearbyGasStation?: boolean;
    distanceToNearbyGasStation?: number;
    hasIndustrialFireDanger?: boolean;
    industrialFireExposedFacade?: number;
    forestFireDanger?: boolean;
    distanceToClosestForest?: number;
    vegetationType?: string | undefined;
    constructor(data?: IFireHazardResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
            this.fireSystem = _data["fireSystem"];
            this.afforestationCondition = _data["afforestationCondition"];
            this.forestType = _data["forestType"];
            this.stubbleBurning = _data["stubbleBurning"];
            this.externalFireIncident = _data["externalFireIncident"];
            this.externalFireIncidentDescription = _data["externalFireIncidentDescription"];
            this.nearbyGasStation = _data["nearbyGasStation"];
            this.distanceToNearbyGasStation = _data["distanceToNearbyGasStation"];
            this.hasIndustrialFireDanger = _data["hasIndustrialFireDanger"];
            this.industrialFireExposedFacade = _data["industrialFireExposedFacade"];
            this.forestFireDanger = _data["forestFireDanger"];
            this.distanceToClosestForest = _data["distanceToClosestForest"];
            this.vegetationType = _data["vegetationType"];
        }
    }
    static fromJS(data: any): FireHazardResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new FireHazardResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        data["fireSystem"] = this.fireSystem;
        data["afforestationCondition"] = this.afforestationCondition;
        data["forestType"] = this.forestType;
        data["stubbleBurning"] = this.stubbleBurning;
        data["externalFireIncident"] = this.externalFireIncident;
        data["externalFireIncidentDescription"] = this.externalFireIncidentDescription;
        data["nearbyGasStation"] = this.nearbyGasStation;
        data["distanceToNearbyGasStation"] = this.distanceToNearbyGasStation;
        data["hasIndustrialFireDanger"] = this.hasIndustrialFireDanger;
        data["industrialFireExposedFacade"] = this.industrialFireExposedFacade;
        data["forestFireDanger"] = this.forestFireDanger;
        data["distanceToClosestForest"] = this.distanceToClosestForest;
        data["vegetationType"] = this.vegetationType;
        return data;
    }
}

export class FloodHazardDto implements IFloodHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;
    incident?: string | undefined;
    incidentDescription?: string | undefined;
    drainageSystem?: string | undefined;
    basementFlooding?: string | undefined;
    extremeEventCondition?: string | undefined;
    constructor(data?: IFloodHazardDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
            this.incident = _data["incident"];
            this.incidentDescription = _data["incidentDescription"];
            this.drainageSystem = _data["drainageSystem"];
            this.basementFlooding = _data["basementFlooding"];
            this.extremeEventCondition = _data["extremeEventCondition"];
        }
    }
    static fromJS(data: any): FloodHazardDto {
        data = typeof data === 'object' ? data : {};
        let result = new FloodHazardDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        data["incident"] = this.incident;
        data["incidentDescription"] = this.incidentDescription;
        data["drainageSystem"] = this.drainageSystem;
        data["basementFlooding"] = this.basementFlooding;
        data["extremeEventCondition"] = this.extremeEventCondition;
        return data;
    }
}

export class FloodHazardResponseDto implements IFloodHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;
    incident?: string | undefined;
    incidentDescription?: string | undefined;
    drainageSystem?: string | undefined;
    basementFlooding?: string | undefined;
    extremeEventCondition?: string | undefined;
    constructor(data?: IFloodHazardResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
            this.incident = _data["incident"];
            this.incidentDescription = _data["incidentDescription"];
            this.drainageSystem = _data["drainageSystem"];
            this.basementFlooding = _data["basementFlooding"];
            this.extremeEventCondition = _data["extremeEventCondition"];
        }
    }
    static fromJS(data: any): FloodHazardResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new FloodHazardResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        data["incident"] = this.incident;
        data["incidentDescription"] = this.incidentDescription;
        data["drainageSystem"] = this.drainageSystem;
        data["basementFlooding"] = this.basementFlooding;
        data["extremeEventCondition"] = this.extremeEventCondition;
        return data;
    }
}

export class HazardResponseDto implements IHazardResponseDto {
    score?: number;
    level?: string | undefined;
    description?: string | undefined;
    hasCCTV?: boolean | undefined;
    constructor(data?: IHazardResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            this.description = _data["description"];
            this.hasCCTV = _data["hasCCTV"];
        }
    }
    static fromJS(data: any): HazardResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new HazardResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        data["description"] = this.description;
        data["hasCCTV"] = this.hasCCTV;
        return data;
    }
}

export class HazardSummaryResponseDto implements IHazardSummaryResponseDto {
    fireHazardScore?: number;
    securityHazardScore?: number;
    noiseHazardScore?: number;
    avalancheHazardScore?: number;
    landslideHazardScore?: number;
    rockFallHazardScore?: number;
    floodHazardScore?: number;
    tsunamiHazardScore?: number;
    overallRiskScore?: number;
    highestRiskType?: string | undefined;
    constructor(data?: IHazardSummaryResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.fireHazardScore = _data["fireHazardScore"];
            this.securityHazardScore = _data["securityHazardScore"];
            this.noiseHazardScore = _data["noiseHazardScore"];
            this.avalancheHazardScore = _data["avalancheHazardScore"];
            this.landslideHazardScore = _data["landslideHazardScore"];
            this.rockFallHazardScore = _data["rockFallHazardScore"];
            this.floodHazardScore = _data["floodHazardScore"];
            this.tsunamiHazardScore = _data["tsunamiHazardScore"];
            this.overallRiskScore = _data["overallRiskScore"];
            this.highestRiskType = _data["highestRiskType"];
        }
    }
    static fromJS(data: any): HazardSummaryResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new HazardSummaryResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fireHazardScore"] = this.fireHazardScore;
        data["securityHazardScore"] = this.securityHazardScore;
        data["noiseHazardScore"] = this.noiseHazardScore;
        data["avalancheHazardScore"] = this.avalancheHazardScore;
        data["landslideHazardScore"] = this.landslideHazardScore;
        data["rockFallHazardScore"] = this.rockFallHazardScore;
        data["floodHazardScore"] = this.floodHazardScore;
        data["tsunamiHazardScore"] = this.tsunamiHazardScore;
        data["overallRiskScore"] = this.overallRiskScore;
        data["highestRiskType"] = this.highestRiskType;
        return data;
    }
}

export class HealthCheckResultDto implements IHealthCheckResultDto {
    name?: string | undefined;
    status?: string | undefined;
    checkedAt?: Date;
    durationMs?: number;
    message?: string | undefined;
    constructor(data?: IHealthCheckResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.status = _data["status"];
            this.checkedAt = _data["checkedAt"] ? new Date(_data["checkedAt"].toString()) : <any>undefined;
            this.durationMs = _data["durationMs"];
            this.message = _data["message"];
        }
    }
    static fromJS(data: any): HealthCheckResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new HealthCheckResultDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["status"] = this.status;
        data["checkedAt"] = this.checkedAt ? this.checkedAt.toISOString() : <any>undefined;
        data["durationMs"] = this.durationMs;
        data["message"] = this.message;
        return data;
    }
}

export class Int32ApiResponse implements IInt32ApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: number;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IInt32ApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"];
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): Int32ApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new Int32ApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class LandslideHazardDto implements ILandslideHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;
    constructor(data?: ILandslideHazardDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
        }
    }
    static fromJS(data: any): LandslideHazardDto {
        data = typeof data === 'object' ? data : {};
        let result = new LandslideHazardDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        return data;
    }
}

export class LandslideHazardResponseDto implements ILandslideHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;
    constructor(data?: ILandslideHazardResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
        }
    }
    static fromJS(data: any): LandslideHazardResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new LandslideHazardResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        return data;
    }
}

export class LocationRequestDto implements ILocationRequestDto {
    latitude!: number;
    longitude!: number;
    constructor(data?: ILocationRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.latitude = _data["latitude"];
            this.longitude = _data["longitude"];
        }
    }
    static fromJS(data: any): LocationRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new LocationRequestDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["latitude"] = this.latitude;
        data["longitude"] = this.longitude;
        return data;
    }
}

export class LocationResponseDto implements ILocationResponseDto {
    latitude?: number;
    longitude?: number;
    constructor(data?: ILocationResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.latitude = _data["latitude"];
            this.longitude = _data["longitude"];
        }
    }
    static fromJS(data: any): LocationResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new LocationResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["latitude"] = this.latitude;
        data["longitude"] = this.longitude;
        return data;
    }
}

export class MasonryBlockResponseDto implements IMasonryBlockResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    modelingType?: string | undefined;
    xAxisLength?: number;
    yAxisLength?: number;
    storeyHeight?: { [key: string]: number; } | undefined;
    longLength?: number;
    shortLength?: number;
    totalHeight?: number;
    unitTypeList?: MasonryUnitTypeResponseDto[] | undefined;
    constructor(data?: IMasonryBlockResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.modelingType = _data["modelingType"];
            this.xAxisLength = _data["xAxisLength"];
            this.yAxisLength = _data["yAxisLength"];
            if (_data["storeyHeight"]) {
                this.storeyHeight = {} as any;
                for (let key in _data["storeyHeight"]) {
                    if (_data["storeyHeight"].hasOwnProperty(key))
                        (<any>this.storeyHeight)![key] = _data["storeyHeight"][key];
                }
            }
            this.longLength = _data["longLength"];
            this.shortLength = _data["shortLength"];
            this.totalHeight = _data["totalHeight"];
            if (Array.isArray(_data["unitTypeList"])) {
                this.unitTypeList = [] as any;
                for (let item of _data["unitTypeList"])
                    this.unitTypeList!.push(MasonryUnitTypeResponseDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): MasonryBlockResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new MasonryBlockResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["modelingType"] = this.modelingType;
        data["xAxisLength"] = this.xAxisLength;
        data["yAxisLength"] = this.yAxisLength;
        if (this.storeyHeight) {
            data["storeyHeight"] = {};
            for (let key in this.storeyHeight) {
                if (this.storeyHeight.hasOwnProperty(key))
                    (<any>data["storeyHeight"])[key] = (<any>this.storeyHeight)[key];
            }
        }
        data["longLength"] = this.longLength;
        data["shortLength"] = this.shortLength;
        data["totalHeight"] = this.totalHeight;
        if (Array.isArray(this.unitTypeList)) {
            data["unitTypeList"] = [];
            for (let item of this.unitTypeList)
                data["unitTypeList"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class MasonryBlockResponseDtoApiResponse implements IMasonryBlockResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: MasonryBlockResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IMasonryBlockResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? MasonryBlockResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): MasonryBlockResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new MasonryBlockResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class MasonryBlockResponseDtoListApiResponse implements IMasonryBlockResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: MasonryBlockResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IMasonryBlockResponseDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(MasonryBlockResponseDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): MasonryBlockResponseDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new MasonryBlockResponseDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class MasonryCreateDto implements IMasonryCreateDto {
    id!: string;
    name!: string;
    xAxisLength!: number;
    yAxisLength!: number;
    storeyHeight!: { [key: string]: number; };
    unitTypeList?: MasonryUnitType[] | undefined;
    constructor(data?: IMasonryCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.storeyHeight = {};
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.xAxisLength = _data["xAxisLength"];
            this.yAxisLength = _data["yAxisLength"];
            if (_data["storeyHeight"]) {
                this.storeyHeight = {} as any;
                for (let key in _data["storeyHeight"]) {
                    if (_data["storeyHeight"].hasOwnProperty(key))
                        (<any>this.storeyHeight)![key] = _data["storeyHeight"][key];
                }
            }
            if (Array.isArray(_data["unitTypeList"])) {
                this.unitTypeList = [] as any;
                for (let item of _data["unitTypeList"])
                    this.unitTypeList!.push(MasonryUnitType.fromJS(item));
            }
        }
    }
    static fromJS(data: any): MasonryCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new MasonryCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["xAxisLength"] = this.xAxisLength;
        data["yAxisLength"] = this.yAxisLength;
        if (this.storeyHeight) {
            data["storeyHeight"] = {};
            for (let key in this.storeyHeight) {
                if (this.storeyHeight.hasOwnProperty(key))
                    (<any>data["storeyHeight"])[key] = (<any>this.storeyHeight)[key];
            }
        }
        if (Array.isArray(this.unitTypeList)) {
            data["unitTypeList"] = [];
            for (let item of this.unitTypeList)
                data["unitTypeList"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class MasonryUnitType implements IMasonryUnitType {
    constructor(data?: IMasonryUnitType) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
    }
    static fromJS(data: any): MasonryUnitType {
        data = typeof data === 'object' ? data : {};
        let result = new MasonryUnitType();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        return data;
    }
}

export class MasonryUnitTypeResponseDto implements IMasonryUnitTypeResponseDto {
    constructor(data?: IMasonryUnitTypeResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
    }
    static fromJS(data: any): MasonryUnitTypeResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new MasonryUnitTypeResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        return data;
    }
}

export class MasonryUpdateDto implements IMasonryUpdateDto {
    id?: string | undefined;
    name?: string | undefined;
    xAxisLength?: number | undefined;
    yAxisLength?: number | undefined;
    storeyHeight?: { [key: string]: number; } | undefined;
    unitTypeList?: MasonryUnitType[] | undefined;
    constructor(data?: IMasonryUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.xAxisLength = _data["xAxisLength"];
            this.yAxisLength = _data["yAxisLength"];
            if (_data["storeyHeight"]) {
                this.storeyHeight = {} as any;
                for (let key in _data["storeyHeight"]) {
                    if (_data["storeyHeight"].hasOwnProperty(key))
                        (<any>this.storeyHeight)![key] = _data["storeyHeight"][key];
                }
            }
            if (Array.isArray(_data["unitTypeList"])) {
                this.unitTypeList = [] as any;
                for (let item of _data["unitTypeList"])
                    this.unitTypeList!.push(MasonryUnitType.fromJS(item));
            }
        }
    }
    static fromJS(data: any): MasonryUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new MasonryUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["xAxisLength"] = this.xAxisLength;
        data["yAxisLength"] = this.yAxisLength;
        if (this.storeyHeight) {
            data["storeyHeight"] = {};
            for (let key in this.storeyHeight) {
                if (this.storeyHeight.hasOwnProperty(key))
                    (<any>data["storeyHeight"])[key] = (<any>this.storeyHeight)[key];
            }
        }
        if (Array.isArray(this.unitTypeList)) {
            data["unitTypeList"] = [];
            for (let item of this.unitTypeList)
                data["unitTypeList"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class NoiseHazardDto implements INoiseHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;
    noiseMeasurementsForBuildings?: NoiseMeasurementsForBuildings | undefined;
    noiseMeasurementsForCoordinates?: { [key: string]: number; } | undefined;
    residentialArea?: boolean;
    exists?: boolean;
    extremeNoise?: boolean;
    extremeNoiseDescription?: string | undefined;
    constructor(data?: INoiseHazardDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
            this.noiseMeasurementsForBuildings = _data["noiseMeasurementsForBuildings"] ? NoiseMeasurementsForBuildings.fromJS(_data["noiseMeasurementsForBuildings"]) : <any>undefined;
            if (_data["noiseMeasurementsForCoordinates"]) {
                this.noiseMeasurementsForCoordinates = {} as any;
                for (let key in _data["noiseMeasurementsForCoordinates"]) {
                    if (_data["noiseMeasurementsForCoordinates"].hasOwnProperty(key))
                        (<any>this.noiseMeasurementsForCoordinates)![key] = _data["noiseMeasurementsForCoordinates"][key];
                }
            }
            this.residentialArea = _data["residentialArea"];
            this.exists = _data["exists"];
            this.extremeNoise = _data["extremeNoise"];
            this.extremeNoiseDescription = _data["extremeNoiseDescription"];
        }
    }
    static fromJS(data: any): NoiseHazardDto {
        data = typeof data === 'object' ? data : {};
        let result = new NoiseHazardDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        data["noiseMeasurementsForBuildings"] = this.noiseMeasurementsForBuildings ? this.noiseMeasurementsForBuildings.toJSON() : <any>undefined;
        if (this.noiseMeasurementsForCoordinates) {
            data["noiseMeasurementsForCoordinates"] = {};
            for (let key in this.noiseMeasurementsForCoordinates) {
                if (this.noiseMeasurementsForCoordinates.hasOwnProperty(key))
                    (<any>data["noiseMeasurementsForCoordinates"])[key] = (<any>this.noiseMeasurementsForCoordinates)[key];
            }
        }
        data["residentialArea"] = this.residentialArea;
        data["exists"] = this.exists;
        data["extremeNoise"] = this.extremeNoise;
        data["extremeNoiseDescription"] = this.extremeNoiseDescription;
        return data;
    }
}

export class NoiseHazardResponseDto implements INoiseHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;
    noiseMeasurementsForBuildings?: { [key: string]: number; } | undefined;
    noiseMeasurementsForCoordinates?: { [key: string]: number; } | undefined;
    residentialArea?: boolean;
    exists?: boolean;
    extremeNoise?: boolean;
    extremeNoiseDescription?: string | undefined;
    constructor(data?: INoiseHazardResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
            if (_data["noiseMeasurementsForBuildings"]) {
                this.noiseMeasurementsForBuildings = {} as any;
                for (let key in _data["noiseMeasurementsForBuildings"]) {
                    if (_data["noiseMeasurementsForBuildings"].hasOwnProperty(key))
                        (<any>this.noiseMeasurementsForBuildings)![key] = _data["noiseMeasurementsForBuildings"][key];
                }
            }
            if (_data["noiseMeasurementsForCoordinates"]) {
                this.noiseMeasurementsForCoordinates = {} as any;
                for (let key in _data["noiseMeasurementsForCoordinates"]) {
                    if (_data["noiseMeasurementsForCoordinates"].hasOwnProperty(key))
                        (<any>this.noiseMeasurementsForCoordinates)![key] = _data["noiseMeasurementsForCoordinates"][key];
                }
            }
            this.residentialArea = _data["residentialArea"];
            this.exists = _data["exists"];
            this.extremeNoise = _data["extremeNoise"];
            this.extremeNoiseDescription = _data["extremeNoiseDescription"];
        }
    }
    static fromJS(data: any): NoiseHazardResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new NoiseHazardResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        if (this.noiseMeasurementsForBuildings) {
            data["noiseMeasurementsForBuildings"] = {};
            for (let key in this.noiseMeasurementsForBuildings) {
                if (this.noiseMeasurementsForBuildings.hasOwnProperty(key))
                    (<any>data["noiseMeasurementsForBuildings"])[key] = (<any>this.noiseMeasurementsForBuildings)[key];
            }
        }
        if (this.noiseMeasurementsForCoordinates) {
            data["noiseMeasurementsForCoordinates"] = {};
            for (let key in this.noiseMeasurementsForCoordinates) {
                if (this.noiseMeasurementsForCoordinates.hasOwnProperty(key))
                    (<any>data["noiseMeasurementsForCoordinates"])[key] = (<any>this.noiseMeasurementsForCoordinates)[key];
            }
        }
        data["residentialArea"] = this.residentialArea;
        data["exists"] = this.exists;
        data["extremeNoise"] = this.extremeNoise;
        data["extremeNoiseDescription"] = this.extremeNoiseDescription;
        return data;
    }
}

export class PasswordResetResponseDto implements IPasswordResetResponseDto {
    success?: boolean;
    message?: string | undefined;
    constructor(data?: IPasswordResetResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
        }
    }
    static fromJS(data: any): PasswordResetResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new PasswordResetResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        return data;
    }
}

export class PasswordResetResponseDtoApiResponse implements IPasswordResetResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: PasswordResetResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IPasswordResetResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? PasswordResetResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): PasswordResetResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new PasswordResetResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class PollutionDto implements IPollutionDto {
    pollutantLocation!: LocationRequestDto;
    pollutantNo!: number;
    pollutantSource?: string | undefined;
    pollutantDistance?: number;
    pollutantLevel?: Level;
    constructor(data?: IPollutionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.pollutantLocation = new LocationRequestDto();
        }
    }
    init(_data?: any) {
        if (_data) {
            this.pollutantLocation = _data["pollutantLocation"] ? LocationRequestDto.fromJS(_data["pollutantLocation"]) : new LocationRequestDto();
            this.pollutantNo = _data["pollutantNo"];
            this.pollutantSource = _data["pollutantSource"];
            this.pollutantDistance = _data["pollutantDistance"];
            this.pollutantLevel = _data["pollutantLevel"];
        }
    }
    static fromJS(data: any): PollutionDto {
        data = typeof data === 'object' ? data : {};
        let result = new PollutionDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pollutantLocation"] = this.pollutantLocation ? this.pollutantLocation.toJSON() : <any>undefined;
        data["pollutantNo"] = this.pollutantNo;
        data["pollutantSource"] = this.pollutantSource;
        data["pollutantDistance"] = this.pollutantDistance;
        data["pollutantLevel"] = this.pollutantLevel;
        return data;
    }
}

export class PollutionResponseDto implements IPollutionResponseDto {
    pollutantLocation?: LocationResponseDto;
    pollutantNo?: number;
    pollutantSource?: string | undefined;
    pollutantDistance?: number;
    pollutantLevel?: string | undefined;
    constructor(data?: IPollutionResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.pollutantLocation = _data["pollutantLocation"] ? LocationResponseDto.fromJS(_data["pollutantLocation"]) : <any>undefined;
            this.pollutantNo = _data["pollutantNo"];
            this.pollutantSource = _data["pollutantSource"];
            this.pollutantDistance = _data["pollutantDistance"];
            this.pollutantLevel = _data["pollutantLevel"];
        }
    }
    static fromJS(data: any): PollutionResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new PollutionResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pollutantLocation"] = this.pollutantLocation ? this.pollutantLocation.toJSON() : <any>undefined;
        data["pollutantNo"] = this.pollutantNo;
        data["pollutantSource"] = this.pollutantSource;
        data["pollutantDistance"] = this.pollutantDistance;
        data["pollutantLevel"] = this.pollutantLevel;
        return data;
    }
}

export class ProgramComponentMappingDto implements IProgramComponentMappingDto {
    id?: string | undefined;
    programId?: string | undefined;
    versionId?: string | undefined;
    componentId?: string | undefined;
    componentName?: string | undefined;
    mappingName?: string | undefined;
    mappingConfiguration?: any | undefined;
    displayOrder?: number;
    isActive?: boolean;
    createdAt?: Date;
    constructor(data?: IProgramComponentMappingDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.programId = _data["programId"];
            this.versionId = _data["versionId"];
            this.componentId = _data["componentId"];
            this.componentName = _data["componentName"];
            this.mappingName = _data["mappingName"];
            this.mappingConfiguration = _data["mappingConfiguration"];
            this.displayOrder = _data["displayOrder"];
            this.isActive = _data["isActive"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramComponentMappingDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramComponentMappingDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["programId"] = this.programId;
        data["versionId"] = this.versionId;
        data["componentId"] = this.componentId;
        data["componentName"] = this.componentName;
        data["mappingName"] = this.mappingName;
        data["mappingConfiguration"] = this.mappingConfiguration;
        data["displayOrder"] = this.displayOrder;
        data["isActive"] = this.isActive;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        return data;
    }
}

export class ProgramComponentMappingDtoListApiResponse implements IProgramComponentMappingDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramComponentMappingDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IProgramComponentMappingDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(ProgramComponentMappingDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramComponentMappingDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramComponentMappingDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ProgramCreateDto implements IProgramCreateDto {
    name!: string;
    description?: string | undefined;
    type!: string;
    language!: string;
    mainFile?: string | undefined;
    uiType!: string;
    uiConfiguration?: any | undefined;
    metadata?: any | undefined;
    deploymentInfo?: AppDeploymentInfo;
    constructor(data?: IProgramCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.language = _data["language"];
            this.mainFile = _data["mainFile"];
            this.uiType = _data["uiType"];
            this.uiConfiguration = _data["uiConfiguration"];
            this.metadata = _data["metadata"];
            this.deploymentInfo = _data["deploymentInfo"] ? AppDeploymentInfo.fromJS(_data["deploymentInfo"]) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["language"] = this.language;
        data["mainFile"] = this.mainFile;
        data["uiType"] = this.uiType;
        data["uiConfiguration"] = this.uiConfiguration;
        data["metadata"] = this.metadata;
        data["deploymentInfo"] = this.deploymentInfo ? this.deploymentInfo.toJSON() : <any>undefined;
        return data;
    }
}

export class ProgramDeploymentDto implements IProgramDeploymentDto {
    id?: string | undefined;
    deploymentType?: AppDeploymentType;
    status?: string | undefined;
    lastDeployed?: Date | undefined;
    configuration?: { [key: string]: any; } | undefined;
    supportedFeatures?: string[] | undefined;
    applicationUrl?: string | undefined;
    logs?: string[] | undefined;
    constructor(data?: IProgramDeploymentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.deploymentType = _data["deploymentType"];
            this.status = _data["status"];
            this.lastDeployed = _data["lastDeployed"] ? new Date(_data["lastDeployed"].toString()) : <any>undefined;
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
            if (Array.isArray(_data["supportedFeatures"])) {
                this.supportedFeatures = [] as any;
                for (let item of _data["supportedFeatures"])
                    this.supportedFeatures!.push(item);
            }
            this.applicationUrl = _data["applicationUrl"];
            if (Array.isArray(_data["logs"])) {
                this.logs = [] as any;
                for (let item of _data["logs"])
                    this.logs!.push(item);
            }
        }
    }
    static fromJS(data: any): ProgramDeploymentDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramDeploymentDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["deploymentType"] = this.deploymentType;
        data["status"] = this.status;
        data["lastDeployed"] = this.lastDeployed ? this.lastDeployed.toISOString() : <any>undefined;
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        if (Array.isArray(this.supportedFeatures)) {
            data["supportedFeatures"] = [];
            for (let item of this.supportedFeatures)
                data["supportedFeatures"].push(item);
        }
        data["applicationUrl"] = this.applicationUrl;
        if (Array.isArray(this.logs)) {
            data["logs"] = [];
            for (let item of this.logs)
                data["logs"].push(item);
        }
        return data;
    }
}

export class ProgramDeploymentDtoApiResponse implements IProgramDeploymentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramDeploymentDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IProgramDeploymentDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ProgramDeploymentDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramDeploymentDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramDeploymentDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ProgramDeploymentStatusDto implements IProgramDeploymentStatusDto {
    deploymentType?: AppDeploymentType;
    status?: string | undefined;
    lastDeployed?: Date | undefined;
    applicationUrl?: string | undefined;
    isHealthy?: boolean;
    lastHealthCheck?: Date;
    recentLogs?: string[] | undefined;
    constructor(data?: IProgramDeploymentStatusDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.deploymentType = _data["deploymentType"];
            this.status = _data["status"];
            this.lastDeployed = _data["lastDeployed"] ? new Date(_data["lastDeployed"].toString()) : <any>undefined;
            this.applicationUrl = _data["applicationUrl"];
            this.isHealthy = _data["isHealthy"];
            this.lastHealthCheck = _data["lastHealthCheck"] ? new Date(_data["lastHealthCheck"].toString()) : <any>undefined;
            if (Array.isArray(_data["recentLogs"])) {
                this.recentLogs = [] as any;
                for (let item of _data["recentLogs"])
                    this.recentLogs!.push(item);
            }
        }
    }
    static fromJS(data: any): ProgramDeploymentStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramDeploymentStatusDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["deploymentType"] = this.deploymentType;
        data["status"] = this.status;
        data["lastDeployed"] = this.lastDeployed ? this.lastDeployed.toISOString() : <any>undefined;
        data["applicationUrl"] = this.applicationUrl;
        data["isHealthy"] = this.isHealthy;
        data["lastHealthCheck"] = this.lastHealthCheck ? this.lastHealthCheck.toISOString() : <any>undefined;
        if (Array.isArray(this.recentLogs)) {
            data["recentLogs"] = [];
            for (let item of this.recentLogs)
                data["recentLogs"].push(item);
        }
        return data;
    }
}

export class ProgramDeploymentStatusDtoApiResponse implements IProgramDeploymentStatusDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramDeploymentStatusDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IProgramDeploymentStatusDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ProgramDeploymentStatusDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramDeploymentStatusDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramDeploymentStatusDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ProgramDetailDto implements IProgramDetailDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    language?: string | undefined;
    mainFile?: string | undefined;
    uiType?: string | undefined;
    uiConfiguration?: any | undefined;
    creator?: string | undefined;
    createdAt?: Date;
    status?: string | undefined;
    currentVersion?: string | undefined;
    metadata?: any | undefined;
    deploymentInfo?: AppDeploymentInfo;
    permissions?: ProgramPermissionDto[] | undefined;
    files?: ProgramFileDto[] | undefined;
    deploymentStatus?: ProgramDeploymentStatusDto;
    stats?: ProgramStatsDto;
    constructor(data?: IProgramDetailDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.language = _data["language"];
            this.mainFile = _data["mainFile"];
            this.uiType = _data["uiType"];
            this.uiConfiguration = _data["uiConfiguration"];
            this.creator = _data["creator"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.status = _data["status"];
            this.currentVersion = _data["currentVersion"];
            this.metadata = _data["metadata"];
            this.deploymentInfo = _data["deploymentInfo"] ? AppDeploymentInfo.fromJS(_data["deploymentInfo"]) : <any>undefined;
            if (Array.isArray(_data["permissions"])) {
                this.permissions = [] as any;
                for (let item of _data["permissions"])
                    this.permissions!.push(ProgramPermissionDto.fromJS(item));
            }
            if (Array.isArray(_data["files"])) {
                this.files = [] as any;
                for (let item of _data["files"])
                    this.files!.push(ProgramFileDto.fromJS(item));
            }
            this.deploymentStatus = _data["deploymentStatus"] ? ProgramDeploymentStatusDto.fromJS(_data["deploymentStatus"]) : <any>undefined;
            this.stats = _data["stats"] ? ProgramStatsDto.fromJS(_data["stats"]) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramDetailDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["language"] = this.language;
        data["mainFile"] = this.mainFile;
        data["uiType"] = this.uiType;
        data["uiConfiguration"] = this.uiConfiguration;
        data["creator"] = this.creator;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["currentVersion"] = this.currentVersion;
        data["metadata"] = this.metadata;
        data["deploymentInfo"] = this.deploymentInfo ? this.deploymentInfo.toJSON() : <any>undefined;
        if (Array.isArray(this.permissions)) {
            data["permissions"] = [];
            for (let item of this.permissions)
                data["permissions"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.files)) {
            data["files"] = [];
            for (let item of this.files)
                data["files"].push(item ? item.toJSON() : <any>undefined);
        }
        data["deploymentStatus"] = this.deploymentStatus ? this.deploymentStatus.toJSON() : <any>undefined;
        data["stats"] = this.stats ? this.stats.toJSON() : <any>undefined;
        return data;
    }
}

export class ProgramDetailDtoApiResponse implements IProgramDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IProgramDetailDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ProgramDetailDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramDetailDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramDetailDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ProgramDto implements IProgramDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    language?: string | undefined;
    mainFile?: string | undefined;
    uiType?: string | undefined;
    uiConfiguration?: any | undefined;
    creator?: string | undefined;
    createdAt?: Date;
    status?: string | undefined;
    currentVersion?: string | undefined;
    metadata?: any | undefined;
    deploymentInfo?: AppDeploymentInfo;
    constructor(data?: IProgramDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.language = _data["language"];
            this.mainFile = _data["mainFile"];
            this.uiType = _data["uiType"];
            this.uiConfiguration = _data["uiConfiguration"];
            this.creator = _data["creator"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.status = _data["status"];
            this.currentVersion = _data["currentVersion"];
            this.metadata = _data["metadata"];
            this.deploymentInfo = _data["deploymentInfo"] ? AppDeploymentInfo.fromJS(_data["deploymentInfo"]) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["language"] = this.language;
        data["mainFile"] = this.mainFile;
        data["uiType"] = this.uiType;
        data["uiConfiguration"] = this.uiConfiguration;
        data["creator"] = this.creator;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["currentVersion"] = this.currentVersion;
        data["metadata"] = this.metadata;
        data["deploymentInfo"] = this.deploymentInfo ? this.deploymentInfo.toJSON() : <any>undefined;
        return data;
    }
}

export class ProgramDtoApiResponse implements IProgramDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IProgramDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ProgramDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ProgramExecutionRequestDto implements IProgramExecutionRequestDto {
    parameters?: any | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: ExecutionResourceLimitsDto;
    saveResults?: boolean;
    timeoutMinutes?: number;
    constructor(data?: IProgramExecutionRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.parameters = _data["parameters"];
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            this.resourceLimits = _data["resourceLimits"] ? ExecutionResourceLimitsDto.fromJS(_data["resourceLimits"]) : <any>undefined;
            this.saveResults = _data["saveResults"];
            this.timeoutMinutes = _data["timeoutMinutes"];
        }
    }
    static fromJS(data: any): ProgramExecutionRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramExecutionRequestDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["parameters"] = this.parameters;
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        data["resourceLimits"] = this.resourceLimits ? this.resourceLimits.toJSON() : <any>undefined;
        data["saveResults"] = this.saveResults;
        data["timeoutMinutes"] = this.timeoutMinutes;
        return data;
    }
}

export class ProgramFileDto implements IProgramFileDto {
    path?: string | undefined;
    contentType?: string | undefined;
    size?: number;
    lastModified?: Date;
    description?: string | undefined;
    hash?: string | undefined;
    constructor(data?: IProgramFileDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.path = _data["path"];
            this.contentType = _data["contentType"];
            this.size = _data["size"];
            this.lastModified = _data["lastModified"] ? new Date(_data["lastModified"].toString()) : <any>undefined;
            this.description = _data["description"];
            this.hash = _data["hash"];
        }
    }
    static fromJS(data: any): ProgramFileDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramFileDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["path"] = this.path;
        data["contentType"] = this.contentType;
        data["size"] = this.size;
        data["lastModified"] = this.lastModified ? this.lastModified.toISOString() : <any>undefined;
        data["description"] = this.description;
        data["hash"] = this.hash;
        return data;
    }
}

export class ProgramGroupPermissionDto implements IProgramGroupPermissionDto {
    groupId!: string;
    accessLevel!: string;
    constructor(data?: IProgramGroupPermissionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.groupId = _data["groupId"];
            this.accessLevel = _data["accessLevel"];
        }
    }
    static fromJS(data: any): ProgramGroupPermissionDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramGroupPermissionDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["groupId"] = this.groupId;
        data["accessLevel"] = this.accessLevel;
        return data;
    }
}

export class ProgramListDto implements IProgramListDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    language?: string | undefined;
    uiType?: string | undefined;
    creator?: string | undefined;
    createdAt?: Date;
    status?: string | undefined;
    currentVersion?: string | undefined;
    deploymentType?: AppDeploymentType;
    deploymentStatus?: string | undefined;
    constructor(data?: IProgramListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.language = _data["language"];
            this.uiType = _data["uiType"];
            this.creator = _data["creator"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.status = _data["status"];
            this.currentVersion = _data["currentVersion"];
            this.deploymentType = _data["deploymentType"];
            this.deploymentStatus = _data["deploymentStatus"];
        }
    }
    static fromJS(data: any): ProgramListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["language"] = this.language;
        data["uiType"] = this.uiType;
        data["creator"] = this.creator;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["currentVersion"] = this.currentVersion;
        data["deploymentType"] = this.deploymentType;
        data["deploymentStatus"] = this.deploymentStatus;
        return data;
    }
}

export class ProgramListDtoPagedResponse implements IProgramListDtoPagedResponse {
    items?: ProgramListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
    constructor(data?: IProgramListDtoPagedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(ProgramListDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            (<any>this).hasPreviousPage = _data["hasPreviousPage"];
            (<any>this).hasNextPage = _data["hasNextPage"];
        }
    }
    static fromJS(data: any): ProgramListDtoPagedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramListDtoPagedResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item ? item.toJSON() : <any>undefined);
        }
        data["pageNumber"] = this.pageNumber;
        data["pageSize"] = this.pageSize;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export class ProgramListDtoPagedResponseApiResponse implements IProgramListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IProgramListDtoPagedResponseApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ProgramListDtoPagedResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramListDtoPagedResponseApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramListDtoPagedResponseApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ProgramPermissionDto implements IProgramPermissionDto {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    accessLevel?: string | undefined;
    constructor(data?: IProgramPermissionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.type = _data["type"];
            this.id = _data["id"];
            this.name = _data["name"];
            this.accessLevel = _data["accessLevel"];
        }
    }
    static fromJS(data: any): ProgramPermissionDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramPermissionDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["id"] = this.id;
        data["name"] = this.name;
        data["accessLevel"] = this.accessLevel;
        return data;
    }
}

export class ProgramPermissionDtoListApiResponse implements IProgramPermissionDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramPermissionDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IProgramPermissionDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(ProgramPermissionDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramPermissionDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramPermissionDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ProgramSearchDto implements IProgramSearchDto {
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    language?: string | undefined;
    uiType?: string | undefined;
    creator?: string | undefined;
    status?: string | undefined;
    createdFrom?: Date | undefined;
    createdTo?: Date | undefined;
    tags?: string[] | undefined;
    deploymentType?: AppDeploymentType;
    constructor(data?: IProgramSearchDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.language = _data["language"];
            this.uiType = _data["uiType"];
            this.creator = _data["creator"];
            this.status = _data["status"];
            this.createdFrom = _data["createdFrom"] ? new Date(_data["createdFrom"].toString()) : <any>undefined;
            this.createdTo = _data["createdTo"] ? new Date(_data["createdTo"].toString()) : <any>undefined;
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
            this.deploymentType = _data["deploymentType"];
        }
    }
    static fromJS(data: any): ProgramSearchDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramSearchDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["language"] = this.language;
        data["uiType"] = this.uiType;
        data["creator"] = this.creator;
        data["status"] = this.status;
        data["createdFrom"] = this.createdFrom ? this.createdFrom.toISOString() : <any>undefined;
        data["createdTo"] = this.createdTo ? this.createdTo.toISOString() : <any>undefined;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        data["deploymentType"] = this.deploymentType;
        return data;
    }
}

export class ProgramStatsDto implements IProgramStatsDto {
    totalExecutions?: number;
    successfulExecutions?: number;
    failedExecutions?: number;
    lastExecution?: Date | undefined;
    averageExecutionTime?: number;
    totalVersions?: number;
    lastUpdate?: Date | undefined;
    constructor(data?: IProgramStatsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.totalExecutions = _data["totalExecutions"];
            this.successfulExecutions = _data["successfulExecutions"];
            this.failedExecutions = _data["failedExecutions"];
            this.lastExecution = _data["lastExecution"] ? new Date(_data["lastExecution"].toString()) : <any>undefined;
            this.averageExecutionTime = _data["averageExecutionTime"];
            this.totalVersions = _data["totalVersions"];
            this.lastUpdate = _data["lastUpdate"] ? new Date(_data["lastUpdate"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramStatsDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramStatsDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalExecutions"] = this.totalExecutions;
        data["successfulExecutions"] = this.successfulExecutions;
        data["failedExecutions"] = this.failedExecutions;
        data["lastExecution"] = this.lastExecution ? this.lastExecution.toISOString() : <any>undefined;
        data["averageExecutionTime"] = this.averageExecutionTime;
        data["totalVersions"] = this.totalVersions;
        data["lastUpdate"] = this.lastUpdate ? this.lastUpdate.toISOString() : <any>undefined;
        return data;
    }
}

export class ProgramUpdateDto implements IProgramUpdateDto {
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    language?: string | undefined;
    mainFile?: string | undefined;
    uiType?: string | undefined;
    uiConfiguration?: any | undefined;
    metadata?: any | undefined;
    deploymentInfo?: AppDeploymentInfo;
    constructor(data?: IProgramUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.language = _data["language"];
            this.mainFile = _data["mainFile"];
            this.uiType = _data["uiType"];
            this.uiConfiguration = _data["uiConfiguration"];
            this.metadata = _data["metadata"];
            this.deploymentInfo = _data["deploymentInfo"] ? AppDeploymentInfo.fromJS(_data["deploymentInfo"]) : <any>undefined;
        }
    }
    static fromJS(data: any): ProgramUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["language"] = this.language;
        data["mainFile"] = this.mainFile;
        data["uiType"] = this.uiType;
        data["uiConfiguration"] = this.uiConfiguration;
        data["metadata"] = this.metadata;
        data["deploymentInfo"] = this.deploymentInfo ? this.deploymentInfo.toJSON() : <any>undefined;
        return data;
    }
}

export class ProgramUserPermissionDto implements IProgramUserPermissionDto {
    userId!: string;
    accessLevel!: string;
    constructor(data?: IProgramUserPermissionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.userId = _data["userId"];
            this.accessLevel = _data["accessLevel"];
        }
    }
    static fromJS(data: any): ProgramUserPermissionDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProgramUserPermissionDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userId"] = this.userId;
        data["accessLevel"] = this.accessLevel;
        return data;
    }
}

export class ProjectComplexityDto implements IProjectComplexityDto {
    totalFiles?: number;
    totalLines?: number;
    dependencies?: number;
    complexityLevel?: string | undefined;
    complexityScore?: number;
    constructor(data?: IProjectComplexityDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.totalFiles = _data["totalFiles"];
            this.totalLines = _data["totalLines"];
            this.dependencies = _data["dependencies"];
            this.complexityLevel = _data["complexityLevel"];
            this.complexityScore = _data["complexityScore"];
        }
    }
    static fromJS(data: any): ProjectComplexityDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectComplexityDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalFiles"] = this.totalFiles;
        data["totalLines"] = this.totalLines;
        data["dependencies"] = this.dependencies;
        data["complexityLevel"] = this.complexityLevel;
        data["complexityScore"] = this.complexityScore;
        return data;
    }
}

export class ProjectFileDto implements IProjectFileDto {
    path?: string | undefined;
    type?: string | undefined;
    size?: number;
    extension?: string | undefined;
    isEntryPoint?: boolean;
    lineCount?: number;
    constructor(data?: IProjectFileDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.path = _data["path"];
            this.type = _data["type"];
            this.size = _data["size"];
            this.extension = _data["extension"];
            this.isEntryPoint = _data["isEntryPoint"];
            this.lineCount = _data["lineCount"];
        }
    }
    static fromJS(data: any): ProjectFileDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectFileDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["path"] = this.path;
        data["type"] = this.type;
        data["size"] = this.size;
        data["extension"] = this.extension;
        data["isEntryPoint"] = this.isEntryPoint;
        data["lineCount"] = this.lineCount;
        return data;
    }
}

export class ProjectSecurityScanDto implements IProjectSecurityScanDto {
    hasSecurityIssues?: boolean;
    issues?: SecurityIssueDto[] | undefined;
    riskLevel?: number;
    constructor(data?: IProjectSecurityScanDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.hasSecurityIssues = _data["hasSecurityIssues"];
            if (Array.isArray(_data["issues"])) {
                this.issues = [] as any;
                for (let item of _data["issues"])
                    this.issues!.push(SecurityIssueDto.fromJS(item));
            }
            this.riskLevel = _data["riskLevel"];
        }
    }
    static fromJS(data: any): ProjectSecurityScanDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectSecurityScanDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["hasSecurityIssues"] = this.hasSecurityIssues;
        if (Array.isArray(this.issues)) {
            data["issues"] = [];
            for (let item of this.issues)
                data["issues"].push(item ? item.toJSON() : <any>undefined);
        }
        data["riskLevel"] = this.riskLevel;
        return data;
    }
}

export class ProjectStructureAnalysisDto implements IProjectStructureAnalysisDto {
    language?: string | undefined;
    projectType?: string | undefined;
    entryPoints?: string[] | undefined;
    configFiles?: string[] | undefined;
    sourceFiles?: string[] | undefined;
    dependencies?: string[] | undefined;
    hasBuildFile?: boolean;
    mainEntryPoint?: string | undefined;
    files?: ProjectFileDto[] | undefined;
    complexity?: ProjectComplexityDto;
    metadata?: { [key: string]: any; } | undefined;
    constructor(data?: IProjectStructureAnalysisDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.language = _data["language"];
            this.projectType = _data["projectType"];
            if (Array.isArray(_data["entryPoints"])) {
                this.entryPoints = [] as any;
                for (let item of _data["entryPoints"])
                    this.entryPoints!.push(item);
            }
            if (Array.isArray(_data["configFiles"])) {
                this.configFiles = [] as any;
                for (let item of _data["configFiles"])
                    this.configFiles!.push(item);
            }
            if (Array.isArray(_data["sourceFiles"])) {
                this.sourceFiles = [] as any;
                for (let item of _data["sourceFiles"])
                    this.sourceFiles!.push(item);
            }
            if (Array.isArray(_data["dependencies"])) {
                this.dependencies = [] as any;
                for (let item of _data["dependencies"])
                    this.dependencies!.push(item);
            }
            this.hasBuildFile = _data["hasBuildFile"];
            this.mainEntryPoint = _data["mainEntryPoint"];
            if (Array.isArray(_data["files"])) {
                this.files = [] as any;
                for (let item of _data["files"])
                    this.files!.push(ProjectFileDto.fromJS(item));
            }
            this.complexity = _data["complexity"] ? ProjectComplexityDto.fromJS(_data["complexity"]) : <any>undefined;
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
        }
    }
    static fromJS(data: any): ProjectStructureAnalysisDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectStructureAnalysisDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["language"] = this.language;
        data["projectType"] = this.projectType;
        if (Array.isArray(this.entryPoints)) {
            data["entryPoints"] = [];
            for (let item of this.entryPoints)
                data["entryPoints"].push(item);
        }
        if (Array.isArray(this.configFiles)) {
            data["configFiles"] = [];
            for (let item of this.configFiles)
                data["configFiles"].push(item);
        }
        if (Array.isArray(this.sourceFiles)) {
            data["sourceFiles"] = [];
            for (let item of this.sourceFiles)
                data["sourceFiles"].push(item);
        }
        if (Array.isArray(this.dependencies)) {
            data["dependencies"] = [];
            for (let item of this.dependencies)
                data["dependencies"].push(item);
        }
        data["hasBuildFile"] = this.hasBuildFile;
        data["mainEntryPoint"] = this.mainEntryPoint;
        if (Array.isArray(this.files)) {
            data["files"] = [];
            for (let item of this.files)
                data["files"].push(item ? item.toJSON() : <any>undefined);
        }
        data["complexity"] = this.complexity ? this.complexity.toJSON() : <any>undefined;
        if (this.metadata) {
            data["metadata"] = {};
            for (let key in this.metadata) {
                if (this.metadata.hasOwnProperty(key))
                    (<any>data["metadata"])[key] = (<any>this.metadata)[key];
            }
        }
        return data;
    }
}

export class ProjectStructureAnalysisDtoApiResponse implements IProjectStructureAnalysisDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProjectStructureAnalysisDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IProjectStructureAnalysisDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ProjectStructureAnalysisDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ProjectStructureAnalysisDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectStructureAnalysisDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class ProjectValidationResultDto implements IProjectValidationResultDto {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    suggestions?: string[] | undefined;
    securityScan?: ProjectSecurityScanDto;
    complexity?: ProjectComplexityDto;
    constructor(data?: IProjectValidationResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.isValid = _data["isValid"];
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            if (Array.isArray(_data["warnings"])) {
                this.warnings = [] as any;
                for (let item of _data["warnings"])
                    this.warnings!.push(item);
            }
            if (Array.isArray(_data["suggestions"])) {
                this.suggestions = [] as any;
                for (let item of _data["suggestions"])
                    this.suggestions!.push(item);
            }
            this.securityScan = _data["securityScan"] ? ProjectSecurityScanDto.fromJS(_data["securityScan"]) : <any>undefined;
            this.complexity = _data["complexity"] ? ProjectComplexityDto.fromJS(_data["complexity"]) : <any>undefined;
        }
    }
    static fromJS(data: any): ProjectValidationResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectValidationResultDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isValid"] = this.isValid;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        if (Array.isArray(this.warnings)) {
            data["warnings"] = [];
            for (let item of this.warnings)
                data["warnings"].push(item);
        }
        if (Array.isArray(this.suggestions)) {
            data["suggestions"] = [];
            for (let item of this.suggestions)
                data["suggestions"].push(item);
        }
        data["securityScan"] = this.securityScan ? this.securityScan.toJSON() : <any>undefined;
        data["complexity"] = this.complexity ? this.complexity.toJSON() : <any>undefined;
        return data;
    }
}

export class ProjectValidationResultDtoApiResponse implements IProjectValidationResultDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProjectValidationResultDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IProjectValidationResultDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? ProjectValidationResultDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): ProjectValidationResultDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectValidationResultDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RefreshTokenDto implements IRefreshTokenDto {
    accessToken!: string;
    refreshToken!: string;
    constructor(data?: IRefreshTokenDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.accessToken = _data["accessToken"];
            this.refreshToken = _data["refreshToken"];
        }
    }
    static fromJS(data: any): RefreshTokenDto {
        data = typeof data === 'object' ? data : {};
        let result = new RefreshTokenDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["accessToken"] = this.accessToken;
        data["refreshToken"] = this.refreshToken;
        return data;
    }
}

export class RegionCityUpdateDto implements IRegionCityUpdateDto {
    action!: Operation;
    cities!: string[];
    constructor(data?: IRegionCityUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.cities = [];
        }
    }
    init(_data?: any) {
        if (_data) {
            this.action = _data["action"];
            if (Array.isArray(_data["cities"])) {
                this.cities = [] as any;
                for (let item of _data["cities"])
                    this.cities!.push(item);
            }
        }
    }
    static fromJS(data: any): RegionCityUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionCityUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["action"] = this.action;
        if (Array.isArray(this.cities)) {
            data["cities"] = [];
            for (let item of this.cities)
                data["cities"].push(item);
        }
        return data;
    }
}

export class RegionCreateDto implements IRegionCreateDto {
    clientId!: string;
    regionId!: number;
    cities!: string[];
    headquarters!: string;
    constructor(data?: IRegionCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.cities = [];
        }
    }
    init(_data?: any) {
        if (_data) {
            this.clientId = _data["clientId"];
            this.regionId = _data["regionId"];
            if (Array.isArray(_data["cities"])) {
                this.cities = [] as any;
                for (let item of _data["cities"])
                    this.cities!.push(item);
            }
            this.headquarters = _data["headquarters"];
        }
    }
    static fromJS(data: any): RegionCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["clientId"] = this.clientId;
        data["regionId"] = this.regionId;
        if (Array.isArray(this.cities)) {
            data["cities"] = [];
            for (let item of this.cities)
                data["cities"].push(item);
        }
        data["headquarters"] = this.headquarters;
        return data;
    }
}

export class RegionDetailResponseDto implements IRegionDetailResponseDto {
    id?: string | undefined;
    clientId?: string | undefined;
    regionId?: number;
    cities?: string[] | undefined;
    headquarters?: string | undefined;
    client?: ClientSummaryResponseDto;
    tmCount?: number;
    activeTMCount?: number;
    tMs?: TMSummaryResponseDto[] | undefined;
    auditInfo?: AuditInfoResponseDto;
    constructor(data?: IRegionDetailResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.clientId = _data["clientId"];
            this.regionId = _data["regionId"];
            if (Array.isArray(_data["cities"])) {
                this.cities = [] as any;
                for (let item of _data["cities"])
                    this.cities!.push(item);
            }
            this.headquarters = _data["headquarters"];
            this.client = _data["client"] ? ClientSummaryResponseDto.fromJS(_data["client"]) : <any>undefined;
            this.tmCount = _data["tmCount"];
            this.activeTMCount = _data["activeTMCount"];
            if (Array.isArray(_data["tMs"])) {
                this.tMs = [] as any;
                for (let item of _data["tMs"])
                    this.tMs!.push(TMSummaryResponseDto.fromJS(item));
            }
            this.auditInfo = _data["auditInfo"] ? AuditInfoResponseDto.fromJS(_data["auditInfo"]) : <any>undefined;
        }
    }
    static fromJS(data: any): RegionDetailResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionDetailResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["clientId"] = this.clientId;
        data["regionId"] = this.regionId;
        if (Array.isArray(this.cities)) {
            data["cities"] = [];
            for (let item of this.cities)
                data["cities"].push(item);
        }
        data["headquarters"] = this.headquarters;
        data["client"] = this.client ? this.client.toJSON() : <any>undefined;
        data["tmCount"] = this.tmCount;
        data["activeTMCount"] = this.activeTMCount;
        if (Array.isArray(this.tMs)) {
            data["tMs"] = [];
            for (let item of this.tMs)
                data["tMs"].push(item ? item.toJSON() : <any>undefined);
        }
        data["auditInfo"] = this.auditInfo ? this.auditInfo.toJSON() : <any>undefined;
        return data;
    }
}

export class RegionDetailResponseDtoApiResponse implements IRegionDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RegionDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRegionDetailResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? RegionDetailResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RegionDetailResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RegionDetailResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RegionListResponseDto implements IRegionListResponseDto {
    id?: string | undefined;
    regionId?: number;
    clientName?: string | undefined;
    headquarters?: string | undefined;
    cities?: string[] | undefined;
    tmCount?: number;
    activeTMCount?: number;
    constructor(data?: IRegionListResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.regionId = _data["regionId"];
            this.clientName = _data["clientName"];
            this.headquarters = _data["headquarters"];
            if (Array.isArray(_data["cities"])) {
                this.cities = [] as any;
                for (let item of _data["cities"])
                    this.cities!.push(item);
            }
            this.tmCount = _data["tmCount"];
            this.activeTMCount = _data["activeTMCount"];
        }
    }
    static fromJS(data: any): RegionListResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionListResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["regionId"] = this.regionId;
        data["clientName"] = this.clientName;
        data["headquarters"] = this.headquarters;
        if (Array.isArray(this.cities)) {
            data["cities"] = [];
            for (let item of this.cities)
                data["cities"].push(item);
        }
        data["tmCount"] = this.tmCount;
        data["activeTMCount"] = this.activeTMCount;
        return data;
    }
}

export class RegionListResponseDtoPagedResponse implements IRegionListResponseDtoPagedResponse {
    items?: RegionListResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
    constructor(data?: IRegionListResponseDtoPagedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(RegionListResponseDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            (<any>this).hasPreviousPage = _data["hasPreviousPage"];
            (<any>this).hasNextPage = _data["hasNextPage"];
        }
    }
    static fromJS(data: any): RegionListResponseDtoPagedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RegionListResponseDtoPagedResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item ? item.toJSON() : <any>undefined);
        }
        data["pageNumber"] = this.pageNumber;
        data["pageSize"] = this.pageSize;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export class RegionListResponseDtoPagedResponseApiResponse implements IRegionListResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RegionListResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRegionListResponseDtoPagedResponseApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? RegionListResponseDtoPagedResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RegionListResponseDtoPagedResponseApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RegionListResponseDtoPagedResponseApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RegionResponseDto implements IRegionResponseDto {
    id?: string | undefined;
    clientId?: string | undefined;
    regionId?: number;
    cities?: string[] | undefined;
    headquarters?: string | undefined;
    constructor(data?: IRegionResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.clientId = _data["clientId"];
            this.regionId = _data["regionId"];
            if (Array.isArray(_data["cities"])) {
                this.cities = [] as any;
                for (let item of _data["cities"])
                    this.cities!.push(item);
            }
            this.headquarters = _data["headquarters"];
        }
    }
    static fromJS(data: any): RegionResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["clientId"] = this.clientId;
        data["regionId"] = this.regionId;
        if (Array.isArray(this.cities)) {
            data["cities"] = [];
            for (let item of this.cities)
                data["cities"].push(item);
        }
        data["headquarters"] = this.headquarters;
        return data;
    }
}

export class RegionResponseDtoApiResponse implements IRegionResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RegionResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRegionResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? RegionResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RegionResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RegionResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RegionStatisticsResponseDto implements IRegionStatisticsResponseDto {
    regionId?: string | undefined;
    cityCount?: number;
    tmCount?: number;
    activeTMCount?: number;
    buildingCount?: number;
    tMsPerCity?: { [key: string]: number; } | undefined;
    constructor(data?: IRegionStatisticsResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.regionId = _data["regionId"];
            this.cityCount = _data["cityCount"];
            this.tmCount = _data["tmCount"];
            this.activeTMCount = _data["activeTMCount"];
            this.buildingCount = _data["buildingCount"];
            if (_data["tMsPerCity"]) {
                this.tMsPerCity = {} as any;
                for (let key in _data["tMsPerCity"]) {
                    if (_data["tMsPerCity"].hasOwnProperty(key))
                        (<any>this.tMsPerCity)![key] = _data["tMsPerCity"][key];
                }
            }
        }
    }
    static fromJS(data: any): RegionStatisticsResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionStatisticsResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["regionId"] = this.regionId;
        data["cityCount"] = this.cityCount;
        data["tmCount"] = this.tmCount;
        data["activeTMCount"] = this.activeTMCount;
        data["buildingCount"] = this.buildingCount;
        if (this.tMsPerCity) {
            data["tMsPerCity"] = {};
            for (let key in this.tMsPerCity) {
                if (this.tMsPerCity.hasOwnProperty(key))
                    (<any>data["tMsPerCity"])[key] = (<any>this.tMsPerCity)[key];
            }
        }
        return data;
    }
}

export class RegionStatisticsResponseDtoApiResponse implements IRegionStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RegionStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRegionStatisticsResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? RegionStatisticsResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RegionStatisticsResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RegionStatisticsResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RegionSummaryResponseDto implements IRegionSummaryResponseDto {
    id?: string | undefined;
    regionId?: number;
    headquarters?: string | undefined;
    cityCount?: number;
    constructor(data?: IRegionSummaryResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.regionId = _data["regionId"];
            this.headquarters = _data["headquarters"];
            this.cityCount = _data["cityCount"];
        }
    }
    static fromJS(data: any): RegionSummaryResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionSummaryResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["regionId"] = this.regionId;
        data["headquarters"] = this.headquarters;
        data["cityCount"] = this.cityCount;
        return data;
    }
}

export class RegionSummaryResponseDtoListApiResponse implements IRegionSummaryResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RegionSummaryResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRegionSummaryResponseDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(RegionSummaryResponseDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RegionSummaryResponseDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RegionSummaryResponseDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RegionUpdateDto implements IRegionUpdateDto {
    clientId?: string | undefined;
    id?: number | undefined;
    cities?: string[] | undefined;
    headquarters?: string | undefined;
    constructor(data?: IRegionUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.clientId = _data["clientId"];
            this.id = _data["id"];
            if (Array.isArray(_data["cities"])) {
                this.cities = [] as any;
                for (let item of _data["cities"])
                    this.cities!.push(item);
            }
            this.headquarters = _data["headquarters"];
        }
    }
    static fromJS(data: any): RegionUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["clientId"] = this.clientId;
        data["id"] = this.id;
        if (Array.isArray(this.cities)) {
            data["cities"] = [];
            for (let item of this.cities)
                data["cities"].push(item);
        }
        data["headquarters"] = this.headquarters;
        return data;
    }
}

export class RequestAssignmentDto implements IRequestAssignmentDto {
    assignedTo!: string;
    assignmentNotes?: string | undefined;
    constructor(data?: IRequestAssignmentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.assignedTo = _data["assignedTo"];
            this.assignmentNotes = _data["assignmentNotes"];
        }
    }
    static fromJS(data: any): RequestAssignmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestAssignmentDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["assignedTo"] = this.assignedTo;
        data["assignmentNotes"] = this.assignmentNotes;
        return data;
    }
}

export class RequestCompletionDto implements IRequestCompletionDto {
    completionNotes!: string;
    deliverableLinks?: string[] | undefined;
    completionData?: any | undefined;
    constructor(data?: IRequestCompletionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.completionNotes = _data["completionNotes"];
            if (Array.isArray(_data["deliverableLinks"])) {
                this.deliverableLinks = [] as any;
                for (let item of _data["deliverableLinks"])
                    this.deliverableLinks!.push(item);
            }
            this.completionData = _data["completionData"];
        }
    }
    static fromJS(data: any): RequestCompletionDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestCompletionDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["completionNotes"] = this.completionNotes;
        if (Array.isArray(this.deliverableLinks)) {
            data["deliverableLinks"] = [];
            for (let item of this.deliverableLinks)
                data["deliverableLinks"].push(item);
        }
        data["completionData"] = this.completionData;
        return data;
    }
}

export class RequestCreateDto implements IRequestCreateDto {
    type!: string;
    title!: string;
    description!: string;
    requestedBy?: string | undefined;
    programId?: string | undefined;
    relatedEntityId?: string | undefined;
    relatedEntityType?: string | undefined;
    priority?: string | undefined;
    metadata?: any | undefined;
    constructor(data?: IRequestCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.type = _data["type"];
            this.title = _data["title"];
            this.description = _data["description"];
            this.requestedBy = _data["requestedBy"];
            this.programId = _data["programId"];
            this.relatedEntityId = _data["relatedEntityId"];
            this.relatedEntityType = _data["relatedEntityType"];
            this.priority = _data["priority"];
            this.metadata = _data["metadata"];
        }
    }
    static fromJS(data: any): RequestCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["title"] = this.title;
        data["description"] = this.description;
        data["requestedBy"] = this.requestedBy;
        data["programId"] = this.programId;
        data["relatedEntityId"] = this.relatedEntityId;
        data["relatedEntityType"] = this.relatedEntityType;
        data["priority"] = this.priority;
        data["metadata"] = this.metadata;
        return data;
    }
}

export class RequestDetailDto implements IRequestDetailDto {
    id?: string | undefined;
    type?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    programId?: string | undefined;
    relatedEntityId?: string | undefined;
    relatedEntityType?: string | undefined;
    requestedBy?: string | undefined;
    requestedAt?: Date;
    assignedTo?: string | undefined;
    status?: string | undefined;
    priority?: string | undefined;
    metadata?: any | undefined;
    requestedByName?: string | undefined;
    assignedToName?: string | undefined;
    programName?: string | undefined;
    responses?: RequestResponseDto[] | undefined;
    relatedEntity?: RequestRelatedEntityDto;
    timeline?: RequestTimelineDto;
    subscribers?: string[] | undefined;
    constructor(data?: IRequestDetailDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.type = _data["type"];
            this.title = _data["title"];
            this.description = _data["description"];
            this.programId = _data["programId"];
            this.relatedEntityId = _data["relatedEntityId"];
            this.relatedEntityType = _data["relatedEntityType"];
            this.requestedBy = _data["requestedBy"];
            this.requestedAt = _data["requestedAt"] ? new Date(_data["requestedAt"].toString()) : <any>undefined;
            this.assignedTo = _data["assignedTo"];
            this.status = _data["status"];
            this.priority = _data["priority"];
            this.metadata = _data["metadata"];
            this.requestedByName = _data["requestedByName"];
            this.assignedToName = _data["assignedToName"];
            this.programName = _data["programName"];
            if (Array.isArray(_data["responses"])) {
                this.responses = [] as any;
                for (let item of _data["responses"])
                    this.responses!.push(RequestResponseDto.fromJS(item));
            }
            this.relatedEntity = _data["relatedEntity"] ? RequestRelatedEntityDto.fromJS(_data["relatedEntity"]) : <any>undefined;
            this.timeline = _data["timeline"] ? RequestTimelineDto.fromJS(_data["timeline"]) : <any>undefined;
            if (Array.isArray(_data["subscribers"])) {
                this.subscribers = [] as any;
                for (let item of _data["subscribers"])
                    this.subscribers!.push(item);
            }
        }
    }
    static fromJS(data: any): RequestDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestDetailDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["type"] = this.type;
        data["title"] = this.title;
        data["description"] = this.description;
        data["programId"] = this.programId;
        data["relatedEntityId"] = this.relatedEntityId;
        data["relatedEntityType"] = this.relatedEntityType;
        data["requestedBy"] = this.requestedBy;
        data["requestedAt"] = this.requestedAt ? this.requestedAt.toISOString() : <any>undefined;
        data["assignedTo"] = this.assignedTo;
        data["status"] = this.status;
        data["priority"] = this.priority;
        data["metadata"] = this.metadata;
        data["requestedByName"] = this.requestedByName;
        data["assignedToName"] = this.assignedToName;
        data["programName"] = this.programName;
        if (Array.isArray(this.responses)) {
            data["responses"] = [];
            for (let item of this.responses)
                data["responses"].push(item ? item.toJSON() : <any>undefined);
        }
        data["relatedEntity"] = this.relatedEntity ? this.relatedEntity.toJSON() : <any>undefined;
        data["timeline"] = this.timeline ? this.timeline.toJSON() : <any>undefined;
        if (Array.isArray(this.subscribers)) {
            data["subscribers"] = [];
            for (let item of this.subscribers)
                data["subscribers"].push(item);
        }
        return data;
    }
}

export class RequestDetailDtoApiResponse implements IRequestDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestDetailDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? RequestDetailDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestDetailDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestDetailDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestDto implements IRequestDto {
    id?: string | undefined;
    type?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    programId?: string | undefined;
    relatedEntityId?: string | undefined;
    relatedEntityType?: string | undefined;
    requestedBy?: string | undefined;
    requestedAt?: Date;
    assignedTo?: string | undefined;
    status?: string | undefined;
    priority?: string | undefined;
    metadata?: any | undefined;
    constructor(data?: IRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.type = _data["type"];
            this.title = _data["title"];
            this.description = _data["description"];
            this.programId = _data["programId"];
            this.relatedEntityId = _data["relatedEntityId"];
            this.relatedEntityType = _data["relatedEntityType"];
            this.requestedBy = _data["requestedBy"];
            this.requestedAt = _data["requestedAt"] ? new Date(_data["requestedAt"].toString()) : <any>undefined;
            this.assignedTo = _data["assignedTo"];
            this.status = _data["status"];
            this.priority = _data["priority"];
            this.metadata = _data["metadata"];
        }
    }
    static fromJS(data: any): RequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["type"] = this.type;
        data["title"] = this.title;
        data["description"] = this.description;
        data["programId"] = this.programId;
        data["relatedEntityId"] = this.relatedEntityId;
        data["relatedEntityType"] = this.relatedEntityType;
        data["requestedBy"] = this.requestedBy;
        data["requestedAt"] = this.requestedAt ? this.requestedAt.toISOString() : <any>undefined;
        data["assignedTo"] = this.assignedTo;
        data["status"] = this.status;
        data["priority"] = this.priority;
        data["metadata"] = this.metadata;
        return data;
    }
}

export class RequestDtoApiResponse implements IRequestDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? RequestDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestFromTemplateDto implements IRequestFromTemplateDto {
    fieldValues!: { [key: string]: any; };
    programId?: string | undefined;
    relatedEntityId?: string | undefined;
    relatedEntityType?: string | undefined;
    constructor(data?: IRequestFromTemplateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.fieldValues = {};
        }
    }
    init(_data?: any) {
        if (_data) {
            if (_data["fieldValues"]) {
                this.fieldValues = {} as any;
                for (let key in _data["fieldValues"]) {
                    if (_data["fieldValues"].hasOwnProperty(key))
                        (<any>this.fieldValues)![key] = _data["fieldValues"][key];
                }
            }
            this.programId = _data["programId"];
            this.relatedEntityId = _data["relatedEntityId"];
            this.relatedEntityType = _data["relatedEntityType"];
        }
    }
    static fromJS(data: any): RequestFromTemplateDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestFromTemplateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.fieldValues) {
            data["fieldValues"] = {};
            for (let key in this.fieldValues) {
                if (this.fieldValues.hasOwnProperty(key))
                    (<any>data["fieldValues"])[key] = (<any>this.fieldValues)[key];
            }
        }
        data["programId"] = this.programId;
        data["relatedEntityId"] = this.relatedEntityId;
        data["relatedEntityType"] = this.relatedEntityType;
        return data;
    }
}

export class RequestListDto implements IRequestListDto {
    id?: string | undefined;
    type?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    programId?: string | undefined;
    programName?: string | undefined;
    requestedBy?: string | undefined;
    requestedByName?: string | undefined;
    requestedAt?: Date;
    assignedTo?: string | undefined;
    assignedToName?: string | undefined;
    status?: string | undefined;
    priority?: string | undefined;
    responseCount?: number;
    lastResponseAt?: Date | undefined;
    relatedEntityType?: string | undefined;
    constructor(data?: IRequestListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.type = _data["type"];
            this.title = _data["title"];
            this.description = _data["description"];
            this.programId = _data["programId"];
            this.programName = _data["programName"];
            this.requestedBy = _data["requestedBy"];
            this.requestedByName = _data["requestedByName"];
            this.requestedAt = _data["requestedAt"] ? new Date(_data["requestedAt"].toString()) : <any>undefined;
            this.assignedTo = _data["assignedTo"];
            this.assignedToName = _data["assignedToName"];
            this.status = _data["status"];
            this.priority = _data["priority"];
            this.responseCount = _data["responseCount"];
            this.lastResponseAt = _data["lastResponseAt"] ? new Date(_data["lastResponseAt"].toString()) : <any>undefined;
            this.relatedEntityType = _data["relatedEntityType"];
        }
    }
    static fromJS(data: any): RequestListDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["type"] = this.type;
        data["title"] = this.title;
        data["description"] = this.description;
        data["programId"] = this.programId;
        data["programName"] = this.programName;
        data["requestedBy"] = this.requestedBy;
        data["requestedByName"] = this.requestedByName;
        data["requestedAt"] = this.requestedAt ? this.requestedAt.toISOString() : <any>undefined;
        data["assignedTo"] = this.assignedTo;
        data["assignedToName"] = this.assignedToName;
        data["status"] = this.status;
        data["priority"] = this.priority;
        data["responseCount"] = this.responseCount;
        data["lastResponseAt"] = this.lastResponseAt ? this.lastResponseAt.toISOString() : <any>undefined;
        data["relatedEntityType"] = this.relatedEntityType;
        return data;
    }
}

export class RequestListDtoListApiResponse implements IRequestListDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestListDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestListDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(RequestListDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestListDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestListDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestListDtoPagedResponse implements IRequestListDtoPagedResponse {
    items?: RequestListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
    constructor(data?: IRequestListDtoPagedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(RequestListDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            (<any>this).hasPreviousPage = _data["hasPreviousPage"];
            (<any>this).hasNextPage = _data["hasNextPage"];
        }
    }
    static fromJS(data: any): RequestListDtoPagedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestListDtoPagedResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item ? item.toJSON() : <any>undefined);
        }
        data["pageNumber"] = this.pageNumber;
        data["pageSize"] = this.pageSize;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export class RequestListDtoPagedResponseApiResponse implements IRequestListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestListDtoPagedResponseApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? RequestListDtoPagedResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestListDtoPagedResponseApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestListDtoPagedResponseApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestMetricDto implements IRequestMetricDto {
    category?: string | undefined;
    label?: string | undefined;
    count?: number;
    percentage?: number;
    constructor(data?: IRequestMetricDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.category = _data["category"];
            this.label = _data["label"];
            this.count = _data["count"];
            this.percentage = _data["percentage"];
        }
    }
    static fromJS(data: any): RequestMetricDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestMetricDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["category"] = this.category;
        data["label"] = this.label;
        data["count"] = this.count;
        data["percentage"] = this.percentage;
        return data;
    }
}

export class RequestMetricDtoListApiResponse implements IRequestMetricDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestMetricDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestMetricDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(RequestMetricDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestMetricDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestMetricDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestPerformanceDto implements IRequestPerformanceDto {
    userId?: string | undefined;
    userName?: string | undefined;
    assignedCount?: number;
    completedCount?: number;
    completionRate?: number;
    averageResolutionTime?: number;
    rating?: number;
    constructor(data?: IRequestPerformanceDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.userId = _data["userId"];
            this.userName = _data["userName"];
            this.assignedCount = _data["assignedCount"];
            this.completedCount = _data["completedCount"];
            this.completionRate = _data["completionRate"];
            this.averageResolutionTime = _data["averageResolutionTime"];
            this.rating = _data["rating"];
        }
    }
    static fromJS(data: any): RequestPerformanceDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestPerformanceDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userId"] = this.userId;
        data["userName"] = this.userName;
        data["assignedCount"] = this.assignedCount;
        data["completedCount"] = this.completedCount;
        data["completionRate"] = this.completionRate;
        data["averageResolutionTime"] = this.averageResolutionTime;
        data["rating"] = this.rating;
        return data;
    }
}

export class RequestPerformanceDtoListApiResponse implements IRequestPerformanceDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestPerformanceDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestPerformanceDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(RequestPerformanceDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestPerformanceDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestPerformanceDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestPriorityUpdateDto implements IRequestPriorityUpdateDto {
    priority!: string;
    reason?: string | undefined;
    constructor(data?: IRequestPriorityUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.priority = _data["priority"];
            this.reason = _data["reason"];
        }
    }
    static fromJS(data: any): RequestPriorityUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestPriorityUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["priority"] = this.priority;
        data["reason"] = this.reason;
        return data;
    }
}

export class RequestRejectionDto implements IRequestRejectionDto {
    rejectionReason!: string;
    alternativeSuggestions?: string[] | undefined;
    constructor(data?: IRequestRejectionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.rejectionReason = _data["rejectionReason"];
            if (Array.isArray(_data["alternativeSuggestions"])) {
                this.alternativeSuggestions = [] as any;
                for (let item of _data["alternativeSuggestions"])
                    this.alternativeSuggestions!.push(item);
            }
        }
    }
    static fromJS(data: any): RequestRejectionDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestRejectionDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["rejectionReason"] = this.rejectionReason;
        if (Array.isArray(this.alternativeSuggestions)) {
            data["alternativeSuggestions"] = [];
            for (let item of this.alternativeSuggestions)
                data["alternativeSuggestions"].push(item);
        }
        return data;
    }
}

export class RequestRelatedEntityDto implements IRequestRelatedEntityDto {
    entityType?: string | undefined;
    entityId?: string | undefined;
    entityName?: string | undefined;
    linkDescription?: string | undefined;
    constructor(data?: IRequestRelatedEntityDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.entityType = _data["entityType"];
            this.entityId = _data["entityId"];
            this.entityName = _data["entityName"];
            this.linkDescription = _data["linkDescription"];
        }
    }
    static fromJS(data: any): RequestRelatedEntityDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestRelatedEntityDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["entityType"] = this.entityType;
        data["entityId"] = this.entityId;
        data["entityName"] = this.entityName;
        data["linkDescription"] = this.linkDescription;
        return data;
    }
}

export class RequestResponseCreateDto implements IRequestResponseCreateDto {
    message!: string;
    isInternal?: boolean;
    attachments?: string[] | undefined;
    constructor(data?: IRequestResponseCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.message = _data["message"];
            this.isInternal = _data["isInternal"];
            if (Array.isArray(_data["attachments"])) {
                this.attachments = [] as any;
                for (let item of _data["attachments"])
                    this.attachments!.push(item);
            }
        }
    }
    static fromJS(data: any): RequestResponseCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestResponseCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["message"] = this.message;
        data["isInternal"] = this.isInternal;
        if (Array.isArray(this.attachments)) {
            data["attachments"] = [];
            for (let item of this.attachments)
                data["attachments"].push(item);
        }
        return data;
    }
}

export class RequestResponseDto implements IRequestResponseDto {
    id?: string | undefined;
    requestId?: string | undefined;
    respondedBy?: string | undefined;
    respondedByName?: string | undefined;
    respondedAt?: Date;
    message?: string | undefined;
    isInternal?: boolean;
    attachments?: string[] | undefined;
    constructor(data?: IRequestResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.requestId = _data["requestId"];
            this.respondedBy = _data["respondedBy"];
            this.respondedByName = _data["respondedByName"];
            this.respondedAt = _data["respondedAt"] ? new Date(_data["respondedAt"].toString()) : <any>undefined;
            this.message = _data["message"];
            this.isInternal = _data["isInternal"];
            if (Array.isArray(_data["attachments"])) {
                this.attachments = [] as any;
                for (let item of _data["attachments"])
                    this.attachments!.push(item);
            }
        }
    }
    static fromJS(data: any): RequestResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["requestId"] = this.requestId;
        data["respondedBy"] = this.respondedBy;
        data["respondedByName"] = this.respondedByName;
        data["respondedAt"] = this.respondedAt ? this.respondedAt.toISOString() : <any>undefined;
        data["message"] = this.message;
        data["isInternal"] = this.isInternal;
        if (Array.isArray(this.attachments)) {
            data["attachments"] = [];
            for (let item of this.attachments)
                data["attachments"].push(item);
        }
        return data;
    }
}

export class RequestResponseDtoApiResponse implements IRequestResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? RequestResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestResponseDtoListApiResponse implements IRequestResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestResponseDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(RequestResponseDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestResponseDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestResponseDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestResponseUpdateDto implements IRequestResponseUpdateDto {
    message!: string;
    isInternal?: boolean | undefined;
    attachments?: string[] | undefined;
    constructor(data?: IRequestResponseUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.message = _data["message"];
            this.isInternal = _data["isInternal"];
            if (Array.isArray(_data["attachments"])) {
                this.attachments = [] as any;
                for (let item of _data["attachments"])
                    this.attachments!.push(item);
            }
        }
    }
    static fromJS(data: any): RequestResponseUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestResponseUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["message"] = this.message;
        data["isInternal"] = this.isInternal;
        if (Array.isArray(this.attachments)) {
            data["attachments"] = [];
            for (let item of this.attachments)
                data["attachments"].push(item);
        }
        return data;
    }
}

export class RequestSearchDto implements IRequestSearchDto {
    type?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    status?: string | undefined;
    priority?: string | undefined;
    requestedBy?: string | undefined;
    assignedTo?: string | undefined;
    programId?: string | undefined;
    relatedEntityId?: string | undefined;
    relatedEntityType?: string | undefined;
    requestedFrom?: Date | undefined;
    requestedTo?: Date | undefined;
    tags?: string[] | undefined;
    constructor(data?: IRequestSearchDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.type = _data["type"];
            this.title = _data["title"];
            this.description = _data["description"];
            this.status = _data["status"];
            this.priority = _data["priority"];
            this.requestedBy = _data["requestedBy"];
            this.assignedTo = _data["assignedTo"];
            this.programId = _data["programId"];
            this.relatedEntityId = _data["relatedEntityId"];
            this.relatedEntityType = _data["relatedEntityType"];
            this.requestedFrom = _data["requestedFrom"] ? new Date(_data["requestedFrom"].toString()) : <any>undefined;
            this.requestedTo = _data["requestedTo"] ? new Date(_data["requestedTo"].toString()) : <any>undefined;
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
        }
    }
    static fromJS(data: any): RequestSearchDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestSearchDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["title"] = this.title;
        data["description"] = this.description;
        data["status"] = this.status;
        data["priority"] = this.priority;
        data["requestedBy"] = this.requestedBy;
        data["assignedTo"] = this.assignedTo;
        data["programId"] = this.programId;
        data["relatedEntityId"] = this.relatedEntityId;
        data["relatedEntityType"] = this.relatedEntityType;
        data["requestedFrom"] = this.requestedFrom ? this.requestedFrom.toISOString() : <any>undefined;
        data["requestedTo"] = this.requestedTo ? this.requestedTo.toISOString() : <any>undefined;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        return data;
    }
}

export class RequestStatsDto implements IRequestStatsDto {
    totalRequests?: number;
    openRequests?: number;
    inProgressRequests?: number;
    completedRequests?: number;
    rejectedRequests?: number;
    unassignedRequests?: number;
    averageResolutionTime?: number;
    requestsByType?: { [key: string]: number; } | undefined;
    requestsByPriority?: { [key: string]: number; } | undefined;
    constructor(data?: IRequestStatsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.totalRequests = _data["totalRequests"];
            this.openRequests = _data["openRequests"];
            this.inProgressRequests = _data["inProgressRequests"];
            this.completedRequests = _data["completedRequests"];
            this.rejectedRequests = _data["rejectedRequests"];
            this.unassignedRequests = _data["unassignedRequests"];
            this.averageResolutionTime = _data["averageResolutionTime"];
            if (_data["requestsByType"]) {
                this.requestsByType = {} as any;
                for (let key in _data["requestsByType"]) {
                    if (_data["requestsByType"].hasOwnProperty(key))
                        (<any>this.requestsByType)![key] = _data["requestsByType"][key];
                }
            }
            if (_data["requestsByPriority"]) {
                this.requestsByPriority = {} as any;
                for (let key in _data["requestsByPriority"]) {
                    if (_data["requestsByPriority"].hasOwnProperty(key))
                        (<any>this.requestsByPriority)![key] = _data["requestsByPriority"][key];
                }
            }
        }
    }
    static fromJS(data: any): RequestStatsDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestStatsDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalRequests"] = this.totalRequests;
        data["openRequests"] = this.openRequests;
        data["inProgressRequests"] = this.inProgressRequests;
        data["completedRequests"] = this.completedRequests;
        data["rejectedRequests"] = this.rejectedRequests;
        data["unassignedRequests"] = this.unassignedRequests;
        data["averageResolutionTime"] = this.averageResolutionTime;
        if (this.requestsByType) {
            data["requestsByType"] = {};
            for (let key in this.requestsByType) {
                if (this.requestsByType.hasOwnProperty(key))
                    (<any>data["requestsByType"])[key] = (<any>this.requestsByType)[key];
            }
        }
        if (this.requestsByPriority) {
            data["requestsByPriority"] = {};
            for (let key in this.requestsByPriority) {
                if (this.requestsByPriority.hasOwnProperty(key))
                    (<any>data["requestsByPriority"])[key] = (<any>this.requestsByPriority)[key];
            }
        }
        return data;
    }
}

export class RequestStatsDtoApiResponse implements IRequestStatsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestStatsDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestStatsDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? RequestStatsDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestStatsDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestStatsDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestStatusUpdateDto implements IRequestStatusUpdateDto {
    status!: string;
    reason?: string | undefined;
    constructor(data?: IRequestStatusUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.status = _data["status"];
            this.reason = _data["reason"];
        }
    }
    static fromJS(data: any): RequestStatusUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestStatusUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["status"] = this.status;
        data["reason"] = this.reason;
        return data;
    }
}

export class RequestTemplateCreateDto implements IRequestTemplateCreateDto {
    name!: string;
    description?: string | undefined;
    type!: string;
    titleTemplate!: string;
    descriptionTemplate!: string;
    fieldDefinitions?: any | undefined;
    priority?: string | undefined;
    isActive?: boolean;
    constructor(data?: IRequestTemplateCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.titleTemplate = _data["titleTemplate"];
            this.descriptionTemplate = _data["descriptionTemplate"];
            this.fieldDefinitions = _data["fieldDefinitions"];
            this.priority = _data["priority"];
            this.isActive = _data["isActive"];
        }
    }
    static fromJS(data: any): RequestTemplateCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestTemplateCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["titleTemplate"] = this.titleTemplate;
        data["descriptionTemplate"] = this.descriptionTemplate;
        data["fieldDefinitions"] = this.fieldDefinitions;
        data["priority"] = this.priority;
        data["isActive"] = this.isActive;
        return data;
    }
}

export class RequestTemplateDto implements IRequestTemplateDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    titleTemplate?: string | undefined;
    descriptionTemplate?: string | undefined;
    fieldDefinitions?: any | undefined;
    priority?: string | undefined;
    isActive?: boolean;
    createdBy?: string | undefined;
    createdAt?: Date;
    usageCount?: number;
    constructor(data?: IRequestTemplateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.titleTemplate = _data["titleTemplate"];
            this.descriptionTemplate = _data["descriptionTemplate"];
            this.fieldDefinitions = _data["fieldDefinitions"];
            this.priority = _data["priority"];
            this.isActive = _data["isActive"];
            this.createdBy = _data["createdBy"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.usageCount = _data["usageCount"];
        }
    }
    static fromJS(data: any): RequestTemplateDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestTemplateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["titleTemplate"] = this.titleTemplate;
        data["descriptionTemplate"] = this.descriptionTemplate;
        data["fieldDefinitions"] = this.fieldDefinitions;
        data["priority"] = this.priority;
        data["isActive"] = this.isActive;
        data["createdBy"] = this.createdBy;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["usageCount"] = this.usageCount;
        return data;
    }
}

export class RequestTemplateDtoApiResponse implements IRequestTemplateDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestTemplateDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestTemplateDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? RequestTemplateDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestTemplateDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestTemplateDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestTemplateDtoListApiResponse implements IRequestTemplateDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestTemplateDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestTemplateDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(RequestTemplateDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestTemplateDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestTemplateDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestTimelineDto implements IRequestTimelineDto {
    createdAt?: Date;
    assignedAt?: Date | undefined;
    firstResponseAt?: Date | undefined;
    completedAt?: Date | undefined;
    resolutionTime?: string | undefined;
    events?: RequestTimelineEventDto[] | undefined;
    constructor(data?: IRequestTimelineDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.assignedAt = _data["assignedAt"] ? new Date(_data["assignedAt"].toString()) : <any>undefined;
            this.firstResponseAt = _data["firstResponseAt"] ? new Date(_data["firstResponseAt"].toString()) : <any>undefined;
            this.completedAt = _data["completedAt"] ? new Date(_data["completedAt"].toString()) : <any>undefined;
            this.resolutionTime = _data["resolutionTime"];
            if (Array.isArray(_data["events"])) {
                this.events = [] as any;
                for (let item of _data["events"])
                    this.events!.push(RequestTimelineEventDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): RequestTimelineDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestTimelineDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["assignedAt"] = this.assignedAt ? this.assignedAt.toISOString() : <any>undefined;
        data["firstResponseAt"] = this.firstResponseAt ? this.firstResponseAt.toISOString() : <any>undefined;
        data["completedAt"] = this.completedAt ? this.completedAt.toISOString() : <any>undefined;
        data["resolutionTime"] = this.resolutionTime;
        if (Array.isArray(this.events)) {
            data["events"] = [];
            for (let item of this.events)
                data["events"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class RequestTimelineEventDto implements IRequestTimelineEventDto {
    timestamp?: Date;
    eventType?: string | undefined;
    description?: string | undefined;
    userId?: string | undefined;
    userName?: string | undefined;
    constructor(data?: IRequestTimelineEventDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
            this.eventType = _data["eventType"];
            this.description = _data["description"];
            this.userId = _data["userId"];
            this.userName = _data["userName"];
        }
    }
    static fromJS(data: any): RequestTimelineEventDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestTimelineEventDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        data["eventType"] = this.eventType;
        data["description"] = this.description;
        data["userId"] = this.userId;
        data["userName"] = this.userName;
        return data;
    }
}

export class RequestTrendDto implements IRequestTrendDto {
    date?: Date;
    createdCount?: number;
    completedCount?: number;
    totalOpen?: number;
    constructor(data?: IRequestTrendDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.date = _data["date"] ? new Date(_data["date"].toString()) : <any>undefined;
            this.createdCount = _data["createdCount"];
            this.completedCount = _data["completedCount"];
            this.totalOpen = _data["totalOpen"];
        }
    }
    static fromJS(data: any): RequestTrendDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestTrendDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["date"] = this.date ? this.date.toISOString() : <any>undefined;
        data["createdCount"] = this.createdCount;
        data["completedCount"] = this.completedCount;
        data["totalOpen"] = this.totalOpen;
        return data;
    }
}

export class RequestTrendDtoListApiResponse implements IRequestTrendDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestTrendDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestTrendDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(RequestTrendDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestTrendDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestTrendDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestUpdateDto implements IRequestUpdateDto {
    programId?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    priority?: string | undefined;
    metadata?: any | undefined;
    constructor(data?: IRequestUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programId = _data["programId"];
            this.title = _data["title"];
            this.description = _data["description"];
            this.priority = _data["priority"];
            this.metadata = _data["metadata"];
        }
    }
    static fromJS(data: any): RequestUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programId"] = this.programId;
        data["title"] = this.title;
        data["description"] = this.description;
        data["priority"] = this.priority;
        data["metadata"] = this.metadata;
        return data;
    }
}

export class RequestValidationResult implements IRequestValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    suggestions?: RequestValidationSuggestionDto[] | undefined;
    constructor(data?: IRequestValidationResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.isValid = _data["isValid"];
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            if (Array.isArray(_data["warnings"])) {
                this.warnings = [] as any;
                for (let item of _data["warnings"])
                    this.warnings!.push(item);
            }
            if (Array.isArray(_data["suggestions"])) {
                this.suggestions = [] as any;
                for (let item of _data["suggestions"])
                    this.suggestions!.push(RequestValidationSuggestionDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): RequestValidationResult {
        data = typeof data === 'object' ? data : {};
        let result = new RequestValidationResult();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isValid"] = this.isValid;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        if (Array.isArray(this.warnings)) {
            data["warnings"] = [];
            for (let item of this.warnings)
                data["warnings"].push(item);
        }
        if (Array.isArray(this.suggestions)) {
            data["suggestions"] = [];
            for (let item of this.suggestions)
                data["suggestions"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class RequestValidationResultApiResponse implements IRequestValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IRequestValidationResultApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? RequestValidationResult.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): RequestValidationResultApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new RequestValidationResultApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class RequestValidationSuggestionDto implements IRequestValidationSuggestionDto {
    field?: string | undefined;
    message?: string | undefined;
    suggestedValue?: string | undefined;
    constructor(data?: IRequestValidationSuggestionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.field = _data["field"];
            this.message = _data["message"];
            this.suggestedValue = _data["suggestedValue"];
        }
    }
    static fromJS(data: any): RequestValidationSuggestionDto {
        data = typeof data === 'object' ? data : {};
        let result = new RequestValidationSuggestionDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["field"] = this.field;
        data["message"] = this.message;
        data["suggestedValue"] = this.suggestedValue;
        return data;
    }
}

export class RevokeTokenDto implements IRevokeTokenDto {
    token!: string | undefined;
    constructor(data?: IRevokeTokenDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.token = _data["token"];
        }
    }
    static fromJS(data: any): RevokeTokenDto {
        data = typeof data === 'object' ? data : {};
        let result = new RevokeTokenDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["token"] = this.token;
        return data;
    }
}

export class RockFallHazardDto implements IRockFallHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;
    constructor(data?: IRockFallHazardDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
        }
    }
    static fromJS(data: any): RockFallHazardDto {
        data = typeof data === 'object' ? data : {};
        let result = new RockFallHazardDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        return data;
    }
}

export class RockFallHazardResponseDto implements IRockFallHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;
    constructor(data?: IRockFallHazardResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
        }
    }
    static fromJS(data: any): RockFallHazardResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new RockFallHazardResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        return data;
    }
}

export class RollbackRequestDto implements IRollbackRequestDto {
    targetVersion!: string;
    reason?: string | undefined;
    forceRollback?: boolean;
    constructor(data?: IRollbackRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.targetVersion = _data["targetVersion"];
            this.reason = _data["reason"];
            this.forceRollback = _data["forceRollback"];
        }
    }
    static fromJS(data: any): RollbackRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new RollbackRequestDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["targetVersion"] = this.targetVersion;
        data["reason"] = this.reason;
        data["forceRollback"] = this.forceRollback;
        return data;
    }
}

export class SecurityHazardDto implements ISecurityHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;
    hasSecuritySystem?: boolean;
    securitySystemScore?: number;
    egmRiskLevel?: number;
    egmRiskLevelScore?: number;
    perimeterFenceType?: PerimeterWallType;
    perimeterWallTypeScore?: number;
    wallCondition?: WallCondition;
    wallConditionScore?: number;
    hasCCTV?: boolean;
    cctvConditionScore?: number;
    iemDistance?: number;
    iemDistanceScore?: number;
    constructor(data?: ISecurityHazardDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
            this.hasSecuritySystem = _data["hasSecuritySystem"];
            this.securitySystemScore = _data["securitySystemScore"];
            this.egmRiskLevel = _data["egmRiskLevel"];
            this.egmRiskLevelScore = _data["egmRiskLevelScore"];
            this.perimeterFenceType = _data["perimeterFenceType"];
            this.perimeterWallTypeScore = _data["perimeterWallTypeScore"];
            this.wallCondition = _data["wallCondition"];
            this.wallConditionScore = _data["wallConditionScore"];
            this.hasCCTV = _data["hasCCTV"];
            this.cctvConditionScore = _data["cctvConditionScore"];
            this.iemDistance = _data["iemDistance"];
            this.iemDistanceScore = _data["iemDistanceScore"];
        }
    }
    static fromJS(data: any): SecurityHazardDto {
        data = typeof data === 'object' ? data : {};
        let result = new SecurityHazardDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        data["hasSecuritySystem"] = this.hasSecuritySystem;
        data["securitySystemScore"] = this.securitySystemScore;
        data["egmRiskLevel"] = this.egmRiskLevel;
        data["egmRiskLevelScore"] = this.egmRiskLevelScore;
        data["perimeterFenceType"] = this.perimeterFenceType;
        data["perimeterWallTypeScore"] = this.perimeterWallTypeScore;
        data["wallCondition"] = this.wallCondition;
        data["wallConditionScore"] = this.wallConditionScore;
        data["hasCCTV"] = this.hasCCTV;
        data["cctvConditionScore"] = this.cctvConditionScore;
        data["iemDistance"] = this.iemDistance;
        data["iemDistanceScore"] = this.iemDistanceScore;
        return data;
    }
}

export class SecurityHazardResponseDto implements ISecurityHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;
    hasSecuritySystem?: boolean;
    securitySystemScore?: number;
    egmRiskLevel?: number;
    egmRiskLevelScore?: number;
    perimeterFenceType?: string | undefined;
    perimeterWallTypeScore?: number;
    wallCondition?: string | undefined;
    wallConditionScore?: number;
    hasCCTV?: boolean;
    cctvConditionScore?: number;
    iemDistance?: number;
    iemDistanceScore?: number;
    constructor(data?: ISecurityHazardResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
            this.hasSecuritySystem = _data["hasSecuritySystem"];
            this.securitySystemScore = _data["securitySystemScore"];
            this.egmRiskLevel = _data["egmRiskLevel"];
            this.egmRiskLevelScore = _data["egmRiskLevelScore"];
            this.perimeterFenceType = _data["perimeterFenceType"];
            this.perimeterWallTypeScore = _data["perimeterWallTypeScore"];
            this.wallCondition = _data["wallCondition"];
            this.wallConditionScore = _data["wallConditionScore"];
            this.hasCCTV = _data["hasCCTV"];
            this.cctvConditionScore = _data["cctvConditionScore"];
            this.iemDistance = _data["iemDistance"];
            this.iemDistanceScore = _data["iemDistanceScore"];
        }
    }
    static fromJS(data: any): SecurityHazardResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new SecurityHazardResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        data["hasSecuritySystem"] = this.hasSecuritySystem;
        data["securitySystemScore"] = this.securitySystemScore;
        data["egmRiskLevel"] = this.egmRiskLevel;
        data["egmRiskLevelScore"] = this.egmRiskLevelScore;
        data["perimeterFenceType"] = this.perimeterFenceType;
        data["perimeterWallTypeScore"] = this.perimeterWallTypeScore;
        data["wallCondition"] = this.wallCondition;
        data["wallConditionScore"] = this.wallConditionScore;
        data["hasCCTV"] = this.hasCCTV;
        data["cctvConditionScore"] = this.cctvConditionScore;
        data["iemDistance"] = this.iemDistance;
        data["iemDistanceScore"] = this.iemDistanceScore;
        return data;
    }
}

export class SecurityIssueDto implements ISecurityIssueDto {
    type?: string | undefined;
    description?: string | undefined;
    file?: string | undefined;
    line?: number;
    severity?: string | undefined;
    constructor(data?: ISecurityIssueDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.type = _data["type"];
            this.description = _data["description"];
            this.file = _data["file"];
            this.line = _data["line"];
            this.severity = _data["severity"];
        }
    }
    static fromJS(data: any): SecurityIssueDto {
        data = typeof data === 'object' ? data : {};
        let result = new SecurityIssueDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["description"] = this.description;
        data["file"] = this.file;
        data["line"] = this.line;
        data["severity"] = this.severity;
        return data;
    }
}

export class SoilDto implements ISoilDto {
    hasSoilStudyReport?: boolean;
    soilStudyReportDate?: Date | undefined;
    soilClassDataSource?: string | undefined;
    geotechnicalReport?: string | undefined;
    results?: string | undefined;
    drillHoleCount?: number;
    soilClassTDY2007?: TDY2007SoilClass;
    soilClassTBDY2018?: TBDY2018SoilClass;
    finalDecisionOnOldData?: TBDY2018SoilClass;
    notes?: string | undefined;
    newSoilClassDataReport?: string | undefined;
    newLiquefactionRiskDataReport?: string | undefined;
    geotechnicalReportMTV?: string | undefined;
    liquefactionRiskGeotechnicalReport?: string | undefined;
    distanceToActiveFaultKm?: number;
    finalSoilClassification?: TBDY2018SoilClass;
    soilVS30?: number;
    structureType?: string | undefined;
    vass?: string | undefined;
    liquefactionRisk?: boolean;
    constructor(data?: ISoilDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.hasSoilStudyReport = _data["hasSoilStudyReport"];
            this.soilStudyReportDate = _data["soilStudyReportDate"] ? new Date(_data["soilStudyReportDate"].toString()) : <any>undefined;
            this.soilClassDataSource = _data["soilClassDataSource"];
            this.geotechnicalReport = _data["geotechnicalReport"];
            this.results = _data["results"];
            this.drillHoleCount = _data["drillHoleCount"];
            this.soilClassTDY2007 = _data["soilClassTDY2007"];
            this.soilClassTBDY2018 = _data["soilClassTBDY2018"];
            this.finalDecisionOnOldData = _data["finalDecisionOnOldData"];
            this.notes = _data["notes"];
            this.newSoilClassDataReport = _data["newSoilClassDataReport"];
            this.newLiquefactionRiskDataReport = _data["newLiquefactionRiskDataReport"];
            this.geotechnicalReportMTV = _data["geotechnicalReportMTV"];
            this.liquefactionRiskGeotechnicalReport = _data["liquefactionRiskGeotechnicalReport"];
            this.distanceToActiveFaultKm = _data["distanceToActiveFaultKm"];
            this.finalSoilClassification = _data["finalSoilClassification"];
            this.soilVS30 = _data["soilVS30"];
            this.structureType = _data["structureType"];
            this.vass = _data["vass"];
            this.liquefactionRisk = _data["liquefactionRisk"];
        }
    }
    static fromJS(data: any): SoilDto {
        data = typeof data === 'object' ? data : {};
        let result = new SoilDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["hasSoilStudyReport"] = this.hasSoilStudyReport;
        data["soilStudyReportDate"] = this.soilStudyReportDate ? this.soilStudyReportDate.toISOString() : <any>undefined;
        data["soilClassDataSource"] = this.soilClassDataSource;
        data["geotechnicalReport"] = this.geotechnicalReport;
        data["results"] = this.results;
        data["drillHoleCount"] = this.drillHoleCount;
        data["soilClassTDY2007"] = this.soilClassTDY2007;
        data["soilClassTBDY2018"] = this.soilClassTBDY2018;
        data["finalDecisionOnOldData"] = this.finalDecisionOnOldData;
        data["notes"] = this.notes;
        data["newSoilClassDataReport"] = this.newSoilClassDataReport;
        data["newLiquefactionRiskDataReport"] = this.newLiquefactionRiskDataReport;
        data["geotechnicalReportMTV"] = this.geotechnicalReportMTV;
        data["liquefactionRiskGeotechnicalReport"] = this.liquefactionRiskGeotechnicalReport;
        data["distanceToActiveFaultKm"] = this.distanceToActiveFaultKm;
        data["finalSoilClassification"] = this.finalSoilClassification;
        data["soilVS30"] = this.soilVS30;
        data["structureType"] = this.structureType;
        data["vass"] = this.vass;
        data["liquefactionRisk"] = this.liquefactionRisk;
        return data;
    }
}

export class SoilResponseDto implements ISoilResponseDto {
    hasSoilStudyReport?: boolean;
    soilStudyReportDate?: Date | undefined;
    soilClassDataSource?: string | undefined;
    geotechnicalReport?: string | undefined;
    results?: string | undefined;
    drillHoleCount?: number;
    soilClassTDY2007?: string | undefined;
    soilClassTBDY2018?: string | undefined;
    finalDecisionOnOldData?: string | undefined;
    notes?: string | undefined;
    newSoilClassDataReport?: string | undefined;
    newLiquefactionRiskDataReport?: string | undefined;
    geotechnicalReportMTV?: string | undefined;
    liquefactionRiskGeotechnicalReport?: string | undefined;
    distanceToActiveFaultKm?: number;
    finalSoilClassification?: string | undefined;
    soilVS30?: number;
    structureType?: string | undefined;
    vass?: string | undefined;
    liquefactionRisk?: boolean;
    constructor(data?: ISoilResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.hasSoilStudyReport = _data["hasSoilStudyReport"];
            this.soilStudyReportDate = _data["soilStudyReportDate"] ? new Date(_data["soilStudyReportDate"].toString()) : <any>undefined;
            this.soilClassDataSource = _data["soilClassDataSource"];
            this.geotechnicalReport = _data["geotechnicalReport"];
            this.results = _data["results"];
            this.drillHoleCount = _data["drillHoleCount"];
            this.soilClassTDY2007 = _data["soilClassTDY2007"];
            this.soilClassTBDY2018 = _data["soilClassTBDY2018"];
            this.finalDecisionOnOldData = _data["finalDecisionOnOldData"];
            this.notes = _data["notes"];
            this.newSoilClassDataReport = _data["newSoilClassDataReport"];
            this.newLiquefactionRiskDataReport = _data["newLiquefactionRiskDataReport"];
            this.geotechnicalReportMTV = _data["geotechnicalReportMTV"];
            this.liquefactionRiskGeotechnicalReport = _data["liquefactionRiskGeotechnicalReport"];
            this.distanceToActiveFaultKm = _data["distanceToActiveFaultKm"];
            this.finalSoilClassification = _data["finalSoilClassification"];
            this.soilVS30 = _data["soilVS30"];
            this.structureType = _data["structureType"];
            this.vass = _data["vass"];
            this.liquefactionRisk = _data["liquefactionRisk"];
        }
    }
    static fromJS(data: any): SoilResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new SoilResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["hasSoilStudyReport"] = this.hasSoilStudyReport;
        data["soilStudyReportDate"] = this.soilStudyReportDate ? this.soilStudyReportDate.toISOString() : <any>undefined;
        data["soilClassDataSource"] = this.soilClassDataSource;
        data["geotechnicalReport"] = this.geotechnicalReport;
        data["results"] = this.results;
        data["drillHoleCount"] = this.drillHoleCount;
        data["soilClassTDY2007"] = this.soilClassTDY2007;
        data["soilClassTBDY2018"] = this.soilClassTBDY2018;
        data["finalDecisionOnOldData"] = this.finalDecisionOnOldData;
        data["notes"] = this.notes;
        data["newSoilClassDataReport"] = this.newSoilClassDataReport;
        data["newLiquefactionRiskDataReport"] = this.newLiquefactionRiskDataReport;
        data["geotechnicalReportMTV"] = this.geotechnicalReportMTV;
        data["liquefactionRiskGeotechnicalReport"] = this.liquefactionRiskGeotechnicalReport;
        data["distanceToActiveFaultKm"] = this.distanceToActiveFaultKm;
        data["finalSoilClassification"] = this.finalSoilClassification;
        data["soilVS30"] = this.soilVS30;
        data["structureType"] = this.structureType;
        data["vass"] = this.vass;
        data["liquefactionRisk"] = this.liquefactionRisk;
        return data;
    }
}

export class StaticSiteDeploymentRequestDto implements IStaticSiteDeploymentRequestDto {
    deploymentType?: AppDeploymentType;
    configuration?: { [key: string]: any; } | undefined;
    environment?: { [key: string]: string; } | undefined;
    supportedFeatures?: string[] | undefined;
    autoStart?: boolean;
    domainName?: string | undefined;
    port?: number | undefined;
    baseHref?: string | undefined;
    spaRouting?: boolean;
    apiIntegration?: boolean;
    authenticationMode?: string | undefined;
    entryPoint?: string | undefined;
    cachingStrategy?: string | undefined;
    cdnEnabled?: boolean;
    headers?: { [key: string]: string; } | undefined;
    constructor(data?: IStaticSiteDeploymentRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.deploymentType = _data["deploymentType"];
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            if (Array.isArray(_data["supportedFeatures"])) {
                this.supportedFeatures = [] as any;
                for (let item of _data["supportedFeatures"])
                    this.supportedFeatures!.push(item);
            }
            this.autoStart = _data["autoStart"];
            this.domainName = _data["domainName"];
            this.port = _data["port"];
            this.baseHref = _data["baseHref"];
            this.spaRouting = _data["spaRouting"];
            this.apiIntegration = _data["apiIntegration"];
            this.authenticationMode = _data["authenticationMode"];
            this.entryPoint = _data["entryPoint"];
            this.cachingStrategy = _data["cachingStrategy"];
            this.cdnEnabled = _data["cdnEnabled"];
            if (_data["headers"]) {
                this.headers = {} as any;
                for (let key in _data["headers"]) {
                    if (_data["headers"].hasOwnProperty(key))
                        (<any>this.headers)![key] = _data["headers"][key];
                }
            }
        }
    }
    static fromJS(data: any): StaticSiteDeploymentRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new StaticSiteDeploymentRequestDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["deploymentType"] = this.deploymentType;
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        if (Array.isArray(this.supportedFeatures)) {
            data["supportedFeatures"] = [];
            for (let item of this.supportedFeatures)
                data["supportedFeatures"].push(item);
        }
        data["autoStart"] = this.autoStart;
        data["domainName"] = this.domainName;
        data["port"] = this.port;
        data["baseHref"] = this.baseHref;
        data["spaRouting"] = this.spaRouting;
        data["apiIntegration"] = this.apiIntegration;
        data["authenticationMode"] = this.authenticationMode;
        data["entryPoint"] = this.entryPoint;
        data["cachingStrategy"] = this.cachingStrategy;
        data["cdnEnabled"] = this.cdnEnabled;
        if (this.headers) {
            data["headers"] = {};
            for (let key in this.headers) {
                if (this.headers.hasOwnProperty(key))
                    (<any>data["headers"])[key] = (<any>this.headers)[key];
            }
        }
        return data;
    }
}

export class StorageStatistics implements IStorageStatistics {
    programId?: string | undefined;
    totalFiles?: number;
    totalSize?: number;
    versionCount?: number;
    lastModified?: Date;
    fileTypeCount?: { [key: string]: number; } | undefined;
    fileTypeSizes?: { [key: string]: number; } | undefined;
    constructor(data?: IStorageStatistics) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programId = _data["programId"];
            this.totalFiles = _data["totalFiles"];
            this.totalSize = _data["totalSize"];
            this.versionCount = _data["versionCount"];
            this.lastModified = _data["lastModified"] ? new Date(_data["lastModified"].toString()) : <any>undefined;
            if (_data["fileTypeCount"]) {
                this.fileTypeCount = {} as any;
                for (let key in _data["fileTypeCount"]) {
                    if (_data["fileTypeCount"].hasOwnProperty(key))
                        (<any>this.fileTypeCount)![key] = _data["fileTypeCount"][key];
                }
            }
            if (_data["fileTypeSizes"]) {
                this.fileTypeSizes = {} as any;
                for (let key in _data["fileTypeSizes"]) {
                    if (_data["fileTypeSizes"].hasOwnProperty(key))
                        (<any>this.fileTypeSizes)![key] = _data["fileTypeSizes"][key];
                }
            }
        }
    }
    static fromJS(data: any): StorageStatistics {
        data = typeof data === 'object' ? data : {};
        let result = new StorageStatistics();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programId"] = this.programId;
        data["totalFiles"] = this.totalFiles;
        data["totalSize"] = this.totalSize;
        data["versionCount"] = this.versionCount;
        data["lastModified"] = this.lastModified ? this.lastModified.toISOString() : <any>undefined;
        if (this.fileTypeCount) {
            data["fileTypeCount"] = {};
            for (let key in this.fileTypeCount) {
                if (this.fileTypeCount.hasOwnProperty(key))
                    (<any>data["fileTypeCount"])[key] = (<any>this.fileTypeCount)[key];
            }
        }
        if (this.fileTypeSizes) {
            data["fileTypeSizes"] = {};
            for (let key in this.fileTypeSizes) {
                if (this.fileTypeSizes.hasOwnProperty(key))
                    (<any>data["fileTypeSizes"])[key] = (<any>this.fileTypeSizes)[key];
            }
        }
        return data;
    }
}

export class StorageStatisticsApiResponse implements IStorageStatisticsApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: StorageStatistics;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IStorageStatisticsApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? StorageStatistics.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): StorageStatisticsApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new StorageStatisticsApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class StringApiResponse implements IStringApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: string | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IStringApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"];
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): StringApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new StringApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class StringListApiResponse implements IStringListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: string[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IStringListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(item);
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): StringListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new StringListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class StringStringDictionaryApiResponse implements IStringStringDictionaryApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: { [key: string]: string; } | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IStringStringDictionaryApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (_data["data"]) {
                this.data = {} as any;
                for (let key in _data["data"]) {
                    if (_data["data"].hasOwnProperty(key))
                        (<any>this.data)![key] = _data["data"][key];
                }
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): StringStringDictionaryApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new StringStringDictionaryApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (this.data) {
            data["data"] = {};
            for (let key in this.data) {
                if (this.data.hasOwnProperty(key))
                    (<any>data["data"])[key] = (<any>this.data)[key];
            }
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class StringStringListDictionaryApiResponse implements IStringStringListDictionaryApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: { [key: string]: string[]; } | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IStringStringListDictionaryApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (_data["data"]) {
                this.data = {} as any;
                for (let key in _data["data"]) {
                    if (_data["data"].hasOwnProperty(key))
                        (<any>this.data)![key] = _data["data"][key];
                }
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): StringStringListDictionaryApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new StringStringListDictionaryApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (this.data) {
            data["data"] = {};
            for (let key in this.data) {
                if (this.data.hasOwnProperty(key))
                    (<any>data["data"])[key] = (<any>this.data)[key];
            }
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class SupportedDeploymentOptionDto implements ISupportedDeploymentOptionDto {
    deploymentType?: AppDeploymentType;
    name?: string | undefined;
    description?: string | undefined;
    isRecommended?: boolean;
    requiredFeatures?: string[] | undefined;
    supportedFeatures?: string[] | undefined;
    defaultConfiguration?: { [key: string]: any; } | undefined;
    constructor(data?: ISupportedDeploymentOptionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.deploymentType = _data["deploymentType"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.isRecommended = _data["isRecommended"];
            if (Array.isArray(_data["requiredFeatures"])) {
                this.requiredFeatures = [] as any;
                for (let item of _data["requiredFeatures"])
                    this.requiredFeatures!.push(item);
            }
            if (Array.isArray(_data["supportedFeatures"])) {
                this.supportedFeatures = [] as any;
                for (let item of _data["supportedFeatures"])
                    this.supportedFeatures!.push(item);
            }
            if (_data["defaultConfiguration"]) {
                this.defaultConfiguration = {} as any;
                for (let key in _data["defaultConfiguration"]) {
                    if (_data["defaultConfiguration"].hasOwnProperty(key))
                        (<any>this.defaultConfiguration)![key] = _data["defaultConfiguration"][key];
                }
            }
        }
    }
    static fromJS(data: any): SupportedDeploymentOptionDto {
        data = typeof data === 'object' ? data : {};
        let result = new SupportedDeploymentOptionDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["deploymentType"] = this.deploymentType;
        data["name"] = this.name;
        data["description"] = this.description;
        data["isRecommended"] = this.isRecommended;
        if (Array.isArray(this.requiredFeatures)) {
            data["requiredFeatures"] = [];
            for (let item of this.requiredFeatures)
                data["requiredFeatures"].push(item);
        }
        if (Array.isArray(this.supportedFeatures)) {
            data["supportedFeatures"] = [];
            for (let item of this.supportedFeatures)
                data["supportedFeatures"].push(item);
        }
        if (this.defaultConfiguration) {
            data["defaultConfiguration"] = {};
            for (let key in this.defaultConfiguration) {
                if (this.defaultConfiguration.hasOwnProperty(key))
                    (<any>data["defaultConfiguration"])[key] = (<any>this.defaultConfiguration)[key];
            }
        }
        return data;
    }
}

export class SupportedDeploymentOptionDtoListApiResponse implements ISupportedDeploymentOptionDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: SupportedDeploymentOptionDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: ISupportedDeploymentOptionDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(SupportedDeploymentOptionDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): SupportedDeploymentOptionDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new SupportedDeploymentOptionDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class TMCreateDto implements ITMCreateDto {
    regionId!: string;
    tmId!: number;
    name!: string;
    type?: TMType;
    state?: TMState;
    voltages!: number[];
    provisionalAcceptanceDate?: Date | undefined;
    location!: LocationRequestDto;
    address?: AddressDto;
    constructor(data?: ITMCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.voltages = [];
            this.location = new LocationRequestDto();
        }
    }
    init(_data?: any) {
        if (_data) {
            this.regionId = _data["regionId"];
            this.tmId = _data["tmId"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.state = _data["state"];
            if (Array.isArray(_data["voltages"])) {
                this.voltages = [] as any;
                for (let item of _data["voltages"])
                    this.voltages!.push(item);
            }
            this.provisionalAcceptanceDate = _data["provisionalAcceptanceDate"] ? new Date(_data["provisionalAcceptanceDate"].toString()) : <any>undefined;
            this.location = _data["location"] ? LocationRequestDto.fromJS(_data["location"]) : new LocationRequestDto();
            this.address = _data["address"] ? AddressDto.fromJS(_data["address"]) : <any>undefined;
        }
    }
    static fromJS(data: any): TMCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new TMCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["regionId"] = this.regionId;
        data["tmId"] = this.tmId;
        data["name"] = this.name;
        data["type"] = this.type;
        data["state"] = this.state;
        if (Array.isArray(this.voltages)) {
            data["voltages"] = [];
            for (let item of this.voltages)
                data["voltages"].push(item);
        }
        data["provisionalAcceptanceDate"] = this.provisionalAcceptanceDate ? formatDate(this.provisionalAcceptanceDate) : <any>undefined;
        data["location"] = this.location ? this.location.toJSON() : <any>undefined;
        data["address"] = this.address ? this.address.toJSON() : <any>undefined;
        return data;
    }
}

export class TMDetailResponseDto implements ITMDetailResponseDto {
    id?: string | undefined;
    regionId?: string | undefined;
    tmId?: number;
    name?: string | undefined;
    type?: string | undefined;
    state?: string | undefined;
    voltages?: number[] | undefined;
    maxVoltage?: number;
    provisionalAcceptanceDate?: Date;
    location?: LocationResponseDto;
    address?: AddressResponseDto;
    region?: RegionSummaryResponseDto;
    dD1?: EarthquakeLevelResponseDto;
    dD2?: EarthquakeLevelResponseDto;
    dD3?: EarthquakeLevelResponseDto;
    earthquakeScenario?: EarthquakeLevelResponseDto;
    pollution?: PollutionDto;
    fireHazard?: FireHazardDto;
    securityHazard?: SecurityHazardDto;
    noiseHazard?: NoiseHazardDto;
    avalancheHazard?: AvalancheHazardDto;
    landslideHazard?: LandslideHazardDto;
    rockFallHazard?: RockFallHazardDto;
    floodHazard?: FloodHazardDto;
    tsunamiHazard?: TsunamiHazardDto;
    soil?: SoilResponseDto;
    buildingCount?: number;
    buildings?: BuildingSummaryResponseDto[] | undefined;
    alternativeTMs?: AlternativeTMSummaryResponseDto[] | undefined;
    constructor(data?: ITMDetailResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.regionId = _data["regionId"];
            this.tmId = _data["tmId"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.state = _data["state"];
            if (Array.isArray(_data["voltages"])) {
                this.voltages = [] as any;
                for (let item of _data["voltages"])
                    this.voltages!.push(item);
            }
            this.maxVoltage = _data["maxVoltage"];
            this.provisionalAcceptanceDate = _data["provisionalAcceptanceDate"] ? new Date(_data["provisionalAcceptanceDate"].toString()) : <any>undefined;
            this.location = _data["location"] ? LocationResponseDto.fromJS(_data["location"]) : <any>undefined;
            this.address = _data["address"] ? AddressResponseDto.fromJS(_data["address"]) : <any>undefined;
            this.region = _data["region"] ? RegionSummaryResponseDto.fromJS(_data["region"]) : <any>undefined;
            this.dD1 = _data["dD1"] ? EarthquakeLevelResponseDto.fromJS(_data["dD1"]) : <any>undefined;
            this.dD2 = _data["dD2"] ? EarthquakeLevelResponseDto.fromJS(_data["dD2"]) : <any>undefined;
            this.dD3 = _data["dD3"] ? EarthquakeLevelResponseDto.fromJS(_data["dD3"]) : <any>undefined;
            this.earthquakeScenario = _data["earthquakeScenario"] ? EarthquakeLevelResponseDto.fromJS(_data["earthquakeScenario"]) : <any>undefined;
            this.pollution = _data["pollution"] ? PollutionDto.fromJS(_data["pollution"]) : <any>undefined;
            this.fireHazard = _data["fireHazard"] ? FireHazardDto.fromJS(_data["fireHazard"]) : <any>undefined;
            this.securityHazard = _data["securityHazard"] ? SecurityHazardDto.fromJS(_data["securityHazard"]) : <any>undefined;
            this.noiseHazard = _data["noiseHazard"] ? NoiseHazardDto.fromJS(_data["noiseHazard"]) : <any>undefined;
            this.avalancheHazard = _data["avalancheHazard"] ? AvalancheHazardDto.fromJS(_data["avalancheHazard"]) : <any>undefined;
            this.landslideHazard = _data["landslideHazard"] ? LandslideHazardDto.fromJS(_data["landslideHazard"]) : <any>undefined;
            this.rockFallHazard = _data["rockFallHazard"] ? RockFallHazardDto.fromJS(_data["rockFallHazard"]) : <any>undefined;
            this.floodHazard = _data["floodHazard"] ? FloodHazardDto.fromJS(_data["floodHazard"]) : <any>undefined;
            this.tsunamiHazard = _data["tsunamiHazard"] ? TsunamiHazardDto.fromJS(_data["tsunamiHazard"]) : <any>undefined;
            this.soil = _data["soil"] ? SoilResponseDto.fromJS(_data["soil"]) : <any>undefined;
            this.buildingCount = _data["buildingCount"];
            if (Array.isArray(_data["buildings"])) {
                this.buildings = [] as any;
                for (let item of _data["buildings"])
                    this.buildings!.push(BuildingSummaryResponseDto.fromJS(item));
            }
            if (Array.isArray(_data["alternativeTMs"])) {
                this.alternativeTMs = [] as any;
                for (let item of _data["alternativeTMs"])
                    this.alternativeTMs!.push(AlternativeTMSummaryResponseDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): TMDetailResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new TMDetailResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["regionId"] = this.regionId;
        data["tmId"] = this.tmId;
        data["name"] = this.name;
        data["type"] = this.type;
        data["state"] = this.state;
        if (Array.isArray(this.voltages)) {
            data["voltages"] = [];
            for (let item of this.voltages)
                data["voltages"].push(item);
        }
        data["maxVoltage"] = this.maxVoltage;
        data["provisionalAcceptanceDate"] = this.provisionalAcceptanceDate ? this.provisionalAcceptanceDate.toISOString() : <any>undefined;
        data["location"] = this.location ? this.location.toJSON() : <any>undefined;
        data["address"] = this.address ? this.address.toJSON() : <any>undefined;
        data["region"] = this.region ? this.region.toJSON() : <any>undefined;
        data["dD1"] = this.dD1 ? this.dD1.toJSON() : <any>undefined;
        data["dD2"] = this.dD2 ? this.dD2.toJSON() : <any>undefined;
        data["dD3"] = this.dD3 ? this.dD3.toJSON() : <any>undefined;
        data["earthquakeScenario"] = this.earthquakeScenario ? this.earthquakeScenario.toJSON() : <any>undefined;
        data["pollution"] = this.pollution ? this.pollution.toJSON() : <any>undefined;
        data["fireHazard"] = this.fireHazard ? this.fireHazard.toJSON() : <any>undefined;
        data["securityHazard"] = this.securityHazard ? this.securityHazard.toJSON() : <any>undefined;
        data["noiseHazard"] = this.noiseHazard ? this.noiseHazard.toJSON() : <any>undefined;
        data["avalancheHazard"] = this.avalancheHazard ? this.avalancheHazard.toJSON() : <any>undefined;
        data["landslideHazard"] = this.landslideHazard ? this.landslideHazard.toJSON() : <any>undefined;
        data["rockFallHazard"] = this.rockFallHazard ? this.rockFallHazard.toJSON() : <any>undefined;
        data["floodHazard"] = this.floodHazard ? this.floodHazard.toJSON() : <any>undefined;
        data["tsunamiHazard"] = this.tsunamiHazard ? this.tsunamiHazard.toJSON() : <any>undefined;
        data["soil"] = this.soil ? this.soil.toJSON() : <any>undefined;
        data["buildingCount"] = this.buildingCount;
        if (Array.isArray(this.buildings)) {
            data["buildings"] = [];
            for (let item of this.buildings)
                data["buildings"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.alternativeTMs)) {
            data["alternativeTMs"] = [];
            for (let item of this.alternativeTMs)
                data["alternativeTMs"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class TMDetailResponseDtoApiResponse implements ITMDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: TMDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: ITMDetailResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? TMDetailResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): TMDetailResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new TMDetailResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class TMHazardSummaryResponseDto implements ITMHazardSummaryResponseDto {
    tmId?: string | undefined;
    fireHazard?: HazardResponseDto;
    securityHazard?: HazardResponseDto;
    floodHazard?: HazardResponseDto;
    overallRiskScore?: number;
    constructor(data?: ITMHazardSummaryResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.tmId = _data["tmId"];
            this.fireHazard = _data["fireHazard"] ? HazardResponseDto.fromJS(_data["fireHazard"]) : <any>undefined;
            this.securityHazard = _data["securityHazard"] ? HazardResponseDto.fromJS(_data["securityHazard"]) : <any>undefined;
            this.floodHazard = _data["floodHazard"] ? HazardResponseDto.fromJS(_data["floodHazard"]) : <any>undefined;
            this.overallRiskScore = _data["overallRiskScore"];
        }
    }
    static fromJS(data: any): TMHazardSummaryResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new TMHazardSummaryResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["tmId"] = this.tmId;
        data["fireHazard"] = this.fireHazard ? this.fireHazard.toJSON() : <any>undefined;
        data["securityHazard"] = this.securityHazard ? this.securityHazard.toJSON() : <any>undefined;
        data["floodHazard"] = this.floodHazard ? this.floodHazard.toJSON() : <any>undefined;
        data["overallRiskScore"] = this.overallRiskScore;
        return data;
    }
}

export class TMHazardSummaryResponseDtoApiResponse implements ITMHazardSummaryResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: TMHazardSummaryResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: ITMHazardSummaryResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? TMHazardSummaryResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): TMHazardSummaryResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new TMHazardSummaryResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class TMListResponseDto implements ITMListResponseDto {
    id?: string | undefined;
    tmId?: number;
    name?: string | undefined;
    regionName?: string | undefined;
    type?: string | undefined;
    state?: string | undefined;
    voltages?: number[] | undefined;
    city?: string | undefined;
    buildingCount?: number;
    constructor(data?: ITMListResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.tmId = _data["tmId"];
            this.name = _data["name"];
            this.regionName = _data["regionName"];
            this.type = _data["type"];
            this.state = _data["state"];
            if (Array.isArray(_data["voltages"])) {
                this.voltages = [] as any;
                for (let item of _data["voltages"])
                    this.voltages!.push(item);
            }
            this.city = _data["city"];
            this.buildingCount = _data["buildingCount"];
        }
    }
    static fromJS(data: any): TMListResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new TMListResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["tmId"] = this.tmId;
        data["name"] = this.name;
        data["regionName"] = this.regionName;
        data["type"] = this.type;
        data["state"] = this.state;
        if (Array.isArray(this.voltages)) {
            data["voltages"] = [];
            for (let item of this.voltages)
                data["voltages"].push(item);
        }
        data["city"] = this.city;
        data["buildingCount"] = this.buildingCount;
        return data;
    }
}

export class TMListResponseDtoPagedResponse implements ITMListResponseDtoPagedResponse {
    items?: TMListResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
    constructor(data?: ITMListResponseDtoPagedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(TMListResponseDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            (<any>this).hasPreviousPage = _data["hasPreviousPage"];
            (<any>this).hasNextPage = _data["hasNextPage"];
        }
    }
    static fromJS(data: any): TMListResponseDtoPagedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new TMListResponseDtoPagedResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item ? item.toJSON() : <any>undefined);
        }
        data["pageNumber"] = this.pageNumber;
        data["pageSize"] = this.pageSize;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export class TMListResponseDtoPagedResponseApiResponse implements ITMListResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: TMListResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: ITMListResponseDtoPagedResponseApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? TMListResponseDtoPagedResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): TMListResponseDtoPagedResponseApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new TMListResponseDtoPagedResponseApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class TMResponseDto implements ITMResponseDto {
    id?: string | undefined;
    regionId?: string | undefined;
    tmId?: number;
    name?: string | undefined;
    type?: string | undefined;
    state?: string | undefined;
    voltages?: number[] | undefined;
    maxVoltage?: number;
    provisionalAcceptanceDate?: Date;
    location?: LocationResponseDto;
    address?: AddressResponseDto;
    constructor(data?: ITMResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.regionId = _data["regionId"];
            this.tmId = _data["tmId"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.state = _data["state"];
            if (Array.isArray(_data["voltages"])) {
                this.voltages = [] as any;
                for (let item of _data["voltages"])
                    this.voltages!.push(item);
            }
            this.maxVoltage = _data["maxVoltage"];
            this.provisionalAcceptanceDate = _data["provisionalAcceptanceDate"] ? new Date(_data["provisionalAcceptanceDate"].toString()) : <any>undefined;
            this.location = _data["location"] ? LocationResponseDto.fromJS(_data["location"]) : <any>undefined;
            this.address = _data["address"] ? AddressResponseDto.fromJS(_data["address"]) : <any>undefined;
        }
    }
    static fromJS(data: any): TMResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new TMResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["regionId"] = this.regionId;
        data["tmId"] = this.tmId;
        data["name"] = this.name;
        data["type"] = this.type;
        data["state"] = this.state;
        if (Array.isArray(this.voltages)) {
            data["voltages"] = [];
            for (let item of this.voltages)
                data["voltages"].push(item);
        }
        data["maxVoltage"] = this.maxVoltage;
        data["provisionalAcceptanceDate"] = this.provisionalAcceptanceDate ? this.provisionalAcceptanceDate.toISOString() : <any>undefined;
        data["location"] = this.location ? this.location.toJSON() : <any>undefined;
        data["address"] = this.address ? this.address.toJSON() : <any>undefined;
        return data;
    }
}

export class TMResponseDtoApiResponse implements ITMResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: TMResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: ITMResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? TMResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): TMResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new TMResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class TMSearchDto implements ITMSearchDto {
    name?: string | undefined;
    regionId?: string | undefined;
    type?: TMType;
    state?: TMState;
    voltages?: number[] | undefined;
    city?: string | undefined;
    county?: string | undefined;
    maxVoltage?: number | undefined;
    provisionalAcceptanceDateFrom?: Date | undefined;
    provisionalAcceptanceDateTo?: Date | undefined;
    constructor(data?: ITMSearchDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.regionId = _data["regionId"];
            this.type = _data["type"];
            this.state = _data["state"];
            if (Array.isArray(_data["voltages"])) {
                this.voltages = [] as any;
                for (let item of _data["voltages"])
                    this.voltages!.push(item);
            }
            this.city = _data["city"];
            this.county = _data["county"];
            this.maxVoltage = _data["maxVoltage"];
            this.provisionalAcceptanceDateFrom = _data["provisionalAcceptanceDateFrom"] ? new Date(_data["provisionalAcceptanceDateFrom"].toString()) : <any>undefined;
            this.provisionalAcceptanceDateTo = _data["provisionalAcceptanceDateTo"] ? new Date(_data["provisionalAcceptanceDateTo"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): TMSearchDto {
        data = typeof data === 'object' ? data : {};
        let result = new TMSearchDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["regionId"] = this.regionId;
        data["type"] = this.type;
        data["state"] = this.state;
        if (Array.isArray(this.voltages)) {
            data["voltages"] = [];
            for (let item of this.voltages)
                data["voltages"].push(item);
        }
        data["city"] = this.city;
        data["county"] = this.county;
        data["maxVoltage"] = this.maxVoltage;
        data["provisionalAcceptanceDateFrom"] = this.provisionalAcceptanceDateFrom ? formatDate(this.provisionalAcceptanceDateFrom) : <any>undefined;
        data["provisionalAcceptanceDateTo"] = this.provisionalAcceptanceDateTo ? formatDate(this.provisionalAcceptanceDateTo) : <any>undefined;
        return data;
    }
}

export class TMStateUpdateDto implements ITMStateUpdateDto {
    state!: TMState;
    constructor(data?: ITMStateUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.state = _data["state"];
        }
    }
    static fromJS(data: any): TMStateUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new TMStateUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["state"] = this.state;
        return data;
    }
}

export class TMStatisticsResponseDto implements ITMStatisticsResponseDto {
    tmId?: string | undefined;
    buildingCount?: number;
    maxVoltage?: number;
    alternativeTMCount?: number;
    overallRiskScore?: number;
    daysSinceAcceptance?: number;
    constructor(data?: ITMStatisticsResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.tmId = _data["tmId"];
            this.buildingCount = _data["buildingCount"];
            this.maxVoltage = _data["maxVoltage"];
            this.alternativeTMCount = _data["alternativeTMCount"];
            this.overallRiskScore = _data["overallRiskScore"];
            this.daysSinceAcceptance = _data["daysSinceAcceptance"];
        }
    }
    static fromJS(data: any): TMStatisticsResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new TMStatisticsResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["tmId"] = this.tmId;
        data["buildingCount"] = this.buildingCount;
        data["maxVoltage"] = this.maxVoltage;
        data["alternativeTMCount"] = this.alternativeTMCount;
        data["overallRiskScore"] = this.overallRiskScore;
        data["daysSinceAcceptance"] = this.daysSinceAcceptance;
        return data;
    }
}

export class TMStatisticsResponseDtoApiResponse implements ITMStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: TMStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: ITMStatisticsResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? TMStatisticsResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): TMStatisticsResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new TMStatisticsResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class TMSummaryResponseDto implements ITMSummaryResponseDto {
    id?: string | undefined;
    tmId?: number;
    name?: string | undefined;
    state?: string | undefined;
    maxVoltage?: number;
    constructor(data?: ITMSummaryResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.tmId = _data["tmId"];
            this.name = _data["name"];
            this.state = _data["state"];
            this.maxVoltage = _data["maxVoltage"];
        }
    }
    static fromJS(data: any): TMSummaryResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new TMSummaryResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["tmId"] = this.tmId;
        data["name"] = this.name;
        data["state"] = this.state;
        data["maxVoltage"] = this.maxVoltage;
        return data;
    }
}

export class TMUpdateDto implements ITMUpdateDto {
    regionId?: string | undefined;
    id?: number | undefined;
    name?: string | undefined;
    type?: TMType;
    state?: TMState;
    voltages?: number[] | undefined;
    provisionalAcceptanceDate?: Date | undefined;
    location?: LocationRequestDto;
    address?: AddressDto;
    dD1?: EarthquakeLevelDto;
    dD2?: EarthquakeLevelDto;
    dD3?: EarthquakeLevelDto;
    earthquakeScenario?: EarthquakeLevelDto;
    pollution?: PollutionDto;
    fireHazard?: FireHazardDto;
    securityHazard?: SecurityHazardDto;
    noiseHazard?: NoiseHazardDto;
    avalancheHazard?: AvalancheHazardDto;
    landslideHazard?: LandslideHazardDto;
    rockFallHazard?: RockFallHazardDto;
    floodHazard?: FloodHazardDto;
    tsunamiHazard?: TsunamiHazardDto;
    soil?: SoilDto;
    constructor(data?: ITMUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.regionId = _data["regionId"];
            this.id = _data["id"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.state = _data["state"];
            if (Array.isArray(_data["voltages"])) {
                this.voltages = [] as any;
                for (let item of _data["voltages"])
                    this.voltages!.push(item);
            }
            this.provisionalAcceptanceDate = _data["provisionalAcceptanceDate"] ? new Date(_data["provisionalAcceptanceDate"].toString()) : <any>undefined;
            this.location = _data["location"] ? LocationRequestDto.fromJS(_data["location"]) : <any>undefined;
            this.address = _data["address"] ? AddressDto.fromJS(_data["address"]) : <any>undefined;
            this.dD1 = _data["dD1"] ? EarthquakeLevelDto.fromJS(_data["dD1"]) : <any>undefined;
            this.dD2 = _data["dD2"] ? EarthquakeLevelDto.fromJS(_data["dD2"]) : <any>undefined;
            this.dD3 = _data["dD3"] ? EarthquakeLevelDto.fromJS(_data["dD3"]) : <any>undefined;
            this.earthquakeScenario = _data["earthquakeScenario"] ? EarthquakeLevelDto.fromJS(_data["earthquakeScenario"]) : <any>undefined;
            this.pollution = _data["pollution"] ? PollutionDto.fromJS(_data["pollution"]) : <any>undefined;
            this.fireHazard = _data["fireHazard"] ? FireHazardDto.fromJS(_data["fireHazard"]) : <any>undefined;
            this.securityHazard = _data["securityHazard"] ? SecurityHazardDto.fromJS(_data["securityHazard"]) : <any>undefined;
            this.noiseHazard = _data["noiseHazard"] ? NoiseHazardDto.fromJS(_data["noiseHazard"]) : <any>undefined;
            this.avalancheHazard = _data["avalancheHazard"] ? AvalancheHazardDto.fromJS(_data["avalancheHazard"]) : <any>undefined;
            this.landslideHazard = _data["landslideHazard"] ? LandslideHazardDto.fromJS(_data["landslideHazard"]) : <any>undefined;
            this.rockFallHazard = _data["rockFallHazard"] ? RockFallHazardDto.fromJS(_data["rockFallHazard"]) : <any>undefined;
            this.floodHazard = _data["floodHazard"] ? FloodHazardDto.fromJS(_data["floodHazard"]) : <any>undefined;
            this.tsunamiHazard = _data["tsunamiHazard"] ? TsunamiHazardDto.fromJS(_data["tsunamiHazard"]) : <any>undefined;
            this.soil = _data["soil"] ? SoilDto.fromJS(_data["soil"]) : <any>undefined;
        }
    }
    static fromJS(data: any): TMUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new TMUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["regionId"] = this.regionId;
        data["id"] = this.id;
        data["name"] = this.name;
        data["type"] = this.type;
        data["state"] = this.state;
        if (Array.isArray(this.voltages)) {
            data["voltages"] = [];
            for (let item of this.voltages)
                data["voltages"].push(item);
        }
        data["provisionalAcceptanceDate"] = this.provisionalAcceptanceDate ? formatDate(this.provisionalAcceptanceDate) : <any>undefined;
        data["location"] = this.location ? this.location.toJSON() : <any>undefined;
        data["address"] = this.address ? this.address.toJSON() : <any>undefined;
        data["dD1"] = this.dD1 ? this.dD1.toJSON() : <any>undefined;
        data["dD2"] = this.dD2 ? this.dD2.toJSON() : <any>undefined;
        data["dD3"] = this.dD3 ? this.dD3.toJSON() : <any>undefined;
        data["earthquakeScenario"] = this.earthquakeScenario ? this.earthquakeScenario.toJSON() : <any>undefined;
        data["pollution"] = this.pollution ? this.pollution.toJSON() : <any>undefined;
        data["fireHazard"] = this.fireHazard ? this.fireHazard.toJSON() : <any>undefined;
        data["securityHazard"] = this.securityHazard ? this.securityHazard.toJSON() : <any>undefined;
        data["noiseHazard"] = this.noiseHazard ? this.noiseHazard.toJSON() : <any>undefined;
        data["avalancheHazard"] = this.avalancheHazard ? this.avalancheHazard.toJSON() : <any>undefined;
        data["landslideHazard"] = this.landslideHazard ? this.landslideHazard.toJSON() : <any>undefined;
        data["rockFallHazard"] = this.rockFallHazard ? this.rockFallHazard.toJSON() : <any>undefined;
        data["floodHazard"] = this.floodHazard ? this.floodHazard.toJSON() : <any>undefined;
        data["tsunamiHazard"] = this.tsunamiHazard ? this.tsunamiHazard.toJSON() : <any>undefined;
        data["soil"] = this.soil ? this.soil.toJSON() : <any>undefined;
        return data;
    }
}

export class TMVoltageUpdateDto implements ITMVoltageUpdateDto {
    voltages!: number[];
    constructor(data?: ITMVoltageUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.voltages = [];
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["voltages"])) {
                this.voltages = [] as any;
                for (let item of _data["voltages"])
                    this.voltages!.push(item);
            }
        }
    }
    static fromJS(data: any): TMVoltageUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new TMVoltageUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.voltages)) {
            data["voltages"] = [];
            for (let item of this.voltages)
                data["voltages"].push(item);
        }
        return data;
    }
}

export class TokenResponseDto implements ITokenResponseDto {
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    expiresAt?: Date;
    tokenType?: string | undefined;
    constructor(data?: ITokenResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.accessToken = _data["accessToken"];
            this.refreshToken = _data["refreshToken"];
            this.expiresAt = _data["expiresAt"] ? new Date(_data["expiresAt"].toString()) : <any>undefined;
            this.tokenType = _data["tokenType"];
        }
    }
    static fromJS(data: any): TokenResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new TokenResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["accessToken"] = this.accessToken;
        data["refreshToken"] = this.refreshToken;
        data["expiresAt"] = this.expiresAt ? this.expiresAt.toISOString() : <any>undefined;
        data["tokenType"] = this.tokenType;
        return data;
    }
}

export class TokenResponseDtoApiResponse implements ITokenResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: TokenResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: ITokenResponseDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? TokenResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): TokenResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new TokenResponseDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class TsunamiHazardDto implements ITsunamiHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;
    constructor(data?: ITsunamiHazardDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
        }
    }
    static fromJS(data: any): TsunamiHazardDto {
        data = typeof data === 'object' ? data : {};
        let result = new TsunamiHazardDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        return data;
    }
}

export class TsunamiHazardResponseDto implements ITsunamiHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;
    constructor(data?: ITsunamiHazardResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
            this.level = _data["level"];
            if (_data["eliminationCosts"]) {
                this.eliminationCosts = {} as any;
                for (let key in _data["eliminationCosts"]) {
                    if (_data["eliminationCosts"].hasOwnProperty(key))
                        (<any>this.eliminationCosts)![key] = _data["eliminationCosts"][key];
                }
            }
            this.previousIncidentOccurred = _data["previousIncidentOccurred"];
            this.previousIncidentDescription = _data["previousIncidentDescription"];
            this.distanceToInventory = _data["distanceToInventory"];
        }
    }
    static fromJS(data: any): TsunamiHazardResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new TsunamiHazardResponseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        data["level"] = this.level;
        if (this.eliminationCosts) {
            data["eliminationCosts"] = {};
            for (let key in this.eliminationCosts) {
                if (this.eliminationCosts.hasOwnProperty(key))
                    (<any>data["eliminationCosts"])[key] = (<any>this.eliminationCosts)[key];
            }
        }
        data["previousIncidentOccurred"] = this.previousIncidentOccurred;
        data["previousIncidentDescription"] = this.previousIncidentDescription;
        data["distanceToInventory"] = this.distanceToInventory;
        return data;
    }
}

export class UiComponentAssetDto implements IUiComponentAssetDto {
    path?: string | undefined;
    contentType?: string | undefined;
    assetType?: string | undefined;
    size?: number;
    lastModified?: Date;
    url?: string | undefined;
    constructor(data?: IUiComponentAssetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.path = _data["path"];
            this.contentType = _data["contentType"];
            this.assetType = _data["assetType"];
            this.size = _data["size"];
            this.lastModified = _data["lastModified"] ? new Date(_data["lastModified"].toString()) : <any>undefined;
            this.url = _data["url"];
        }
    }
    static fromJS(data: any): UiComponentAssetDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentAssetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["path"] = this.path;
        data["contentType"] = this.contentType;
        data["assetType"] = this.assetType;
        data["size"] = this.size;
        data["lastModified"] = this.lastModified ? this.lastModified.toISOString() : <any>undefined;
        data["url"] = this.url;
        return data;
    }
}

export class UiComponentAssetDtoListApiResponse implements IUiComponentAssetDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentAssetDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUiComponentAssetDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(UiComponentAssetDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentAssetDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentAssetDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentAssetUploadDto implements IUiComponentAssetUploadDto {
    path!: string;
    content!: string;
    contentType!: string;
    assetType?: string | undefined;
    constructor(data?: IUiComponentAssetUploadDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.path = _data["path"];
            this.content = _data["content"];
            this.contentType = _data["contentType"];
            this.assetType = _data["assetType"];
        }
    }
    static fromJS(data: any): UiComponentAssetUploadDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentAssetUploadDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["path"] = this.path;
        data["content"] = this.content;
        data["contentType"] = this.contentType;
        data["assetType"] = this.assetType;
        return data;
    }
}

export class UiComponentBundleDto implements IUiComponentBundleDto {
    id?: string | undefined;
    componentId?: string | undefined;
    bundleType?: string | undefined;
    assets?: UiComponentAssetDto[] | undefined;
    dependencies?: { [key: string]: string; } | undefined;
    createdAt?: Date;
    totalSize?: number;
    constructor(data?: IUiComponentBundleDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.componentId = _data["componentId"];
            this.bundleType = _data["bundleType"];
            if (Array.isArray(_data["assets"])) {
                this.assets = [] as any;
                for (let item of _data["assets"])
                    this.assets!.push(UiComponentAssetDto.fromJS(item));
            }
            if (_data["dependencies"]) {
                this.dependencies = {} as any;
                for (let key in _data["dependencies"]) {
                    if (_data["dependencies"].hasOwnProperty(key))
                        (<any>this.dependencies)![key] = _data["dependencies"][key];
                }
            }
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.totalSize = _data["totalSize"];
        }
    }
    static fromJS(data: any): UiComponentBundleDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentBundleDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["componentId"] = this.componentId;
        data["bundleType"] = this.bundleType;
        if (Array.isArray(this.assets)) {
            data["assets"] = [];
            for (let item of this.assets)
                data["assets"].push(item ? item.toJSON() : <any>undefined);
        }
        if (this.dependencies) {
            data["dependencies"] = {};
            for (let key in this.dependencies) {
                if (this.dependencies.hasOwnProperty(key))
                    (<any>data["dependencies"])[key] = (<any>this.dependencies)[key];
            }
        }
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["totalSize"] = this.totalSize;
        return data;
    }
}

export class UiComponentBundleDtoApiResponse implements IUiComponentBundleDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentBundleDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUiComponentBundleDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? UiComponentBundleDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentBundleDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentBundleDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentBundleInfoDto implements IUiComponentBundleInfoDto {
    bundleType?: string | undefined;
    assetUrls?: string[] | undefined;
    dependencies?: { [key: string]: string; } | undefined;
    lastUpdated?: Date;
    totalSize?: number;
    constructor(data?: IUiComponentBundleInfoDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.bundleType = _data["bundleType"];
            if (Array.isArray(_data["assetUrls"])) {
                this.assetUrls = [] as any;
                for (let item of _data["assetUrls"])
                    this.assetUrls!.push(item);
            }
            if (_data["dependencies"]) {
                this.dependencies = {} as any;
                for (let key in _data["dependencies"]) {
                    if (_data["dependencies"].hasOwnProperty(key))
                        (<any>this.dependencies)![key] = _data["dependencies"][key];
                }
            }
            this.lastUpdated = _data["lastUpdated"] ? new Date(_data["lastUpdated"].toString()) : <any>undefined;
            this.totalSize = _data["totalSize"];
        }
    }
    static fromJS(data: any): UiComponentBundleInfoDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentBundleInfoDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["bundleType"] = this.bundleType;
        if (Array.isArray(this.assetUrls)) {
            data["assetUrls"] = [];
            for (let item of this.assetUrls)
                data["assetUrls"].push(item);
        }
        if (this.dependencies) {
            data["dependencies"] = {};
            for (let key in this.dependencies) {
                if (this.dependencies.hasOwnProperty(key))
                    (<any>data["dependencies"])[key] = (<any>this.dependencies)[key];
            }
        }
        data["lastUpdated"] = this.lastUpdated ? this.lastUpdated.toISOString() : <any>undefined;
        data["totalSize"] = this.totalSize;
        return data;
    }
}

export class UiComponentBundleUploadDto implements IUiComponentBundleUploadDto {
    assets!: UiComponentAssetUploadDto[];
    dependencies?: { [key: string]: string; } | undefined;
    bundleType?: string | undefined;
    constructor(data?: IUiComponentBundleUploadDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.assets = [];
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["assets"])) {
                this.assets = [] as any;
                for (let item of _data["assets"])
                    this.assets!.push(UiComponentAssetUploadDto.fromJS(item));
            }
            if (_data["dependencies"]) {
                this.dependencies = {} as any;
                for (let key in _data["dependencies"]) {
                    if (_data["dependencies"].hasOwnProperty(key))
                        (<any>this.dependencies)![key] = _data["dependencies"][key];
                }
            }
            this.bundleType = _data["bundleType"];
        }
    }
    static fromJS(data: any): UiComponentBundleUploadDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentBundleUploadDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.assets)) {
            data["assets"] = [];
            for (let item of this.assets)
                data["assets"].push(item ? item.toJSON() : <any>undefined);
        }
        if (this.dependencies) {
            data["dependencies"] = {};
            for (let key in this.dependencies) {
                if (this.dependencies.hasOwnProperty(key))
                    (<any>data["dependencies"])[key] = (<any>this.dependencies)[key];
            }
        }
        data["bundleType"] = this.bundleType;
        return data;
    }
}

export class UiComponentCategoryDto implements IUiComponentCategoryDto {
    name?: string | undefined;
    description?: string | undefined;
    componentCount?: number;
    subCategories?: string[] | undefined;
    constructor(data?: IUiComponentCategoryDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.description = _data["description"];
            this.componentCount = _data["componentCount"];
            if (Array.isArray(_data["subCategories"])) {
                this.subCategories = [] as any;
                for (let item of _data["subCategories"])
                    this.subCategories!.push(item);
            }
        }
    }
    static fromJS(data: any): UiComponentCategoryDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentCategoryDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["componentCount"] = this.componentCount;
        if (Array.isArray(this.subCategories)) {
            data["subCategories"] = [];
            for (let item of this.subCategories)
                data["subCategories"].push(item);
        }
        return data;
    }
}

export class UiComponentCategoryDtoListApiResponse implements IUiComponentCategoryDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentCategoryDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUiComponentCategoryDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(UiComponentCategoryDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentCategoryDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentCategoryDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentCompatibilitySearchDto implements IUiComponentCompatibilitySearchDto {
    programType!: string;
    programLanguage?: string | undefined;
    requiredFeatures?: string[] | undefined;
    compatibleTypes?: string[] | undefined;
    constructor(data?: IUiComponentCompatibilitySearchDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programType = _data["programType"];
            this.programLanguage = _data["programLanguage"];
            if (Array.isArray(_data["requiredFeatures"])) {
                this.requiredFeatures = [] as any;
                for (let item of _data["requiredFeatures"])
                    this.requiredFeatures!.push(item);
            }
            if (Array.isArray(_data["compatibleTypes"])) {
                this.compatibleTypes = [] as any;
                for (let item of _data["compatibleTypes"])
                    this.compatibleTypes!.push(item);
            }
        }
    }
    static fromJS(data: any): UiComponentCompatibilitySearchDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentCompatibilitySearchDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programType"] = this.programType;
        data["programLanguage"] = this.programLanguage;
        if (Array.isArray(this.requiredFeatures)) {
            data["requiredFeatures"] = [];
            for (let item of this.requiredFeatures)
                data["requiredFeatures"].push(item);
        }
        if (Array.isArray(this.compatibleTypes)) {
            data["compatibleTypes"] = [];
            for (let item of this.compatibleTypes)
                data["compatibleTypes"].push(item);
        }
        return data;
    }
}

export class UiComponentConfigDto implements IUiComponentConfigDto {
    componentId?: string | undefined;
    configuration?: any | undefined;
    lastUpdated?: Date;
    updatedBy?: string | undefined;
    constructor(data?: IUiComponentConfigDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.componentId = _data["componentId"];
            this.configuration = _data["configuration"];
            this.lastUpdated = _data["lastUpdated"] ? new Date(_data["lastUpdated"].toString()) : <any>undefined;
            this.updatedBy = _data["updatedBy"];
        }
    }
    static fromJS(data: any): UiComponentConfigDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentConfigDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["componentId"] = this.componentId;
        data["configuration"] = this.configuration;
        data["lastUpdated"] = this.lastUpdated ? this.lastUpdated.toISOString() : <any>undefined;
        data["updatedBy"] = this.updatedBy;
        return data;
    }
}

export class UiComponentConfigDtoApiResponse implements IUiComponentConfigDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentConfigDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUiComponentConfigDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? UiComponentConfigDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentConfigDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentConfigDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentConfigUpdateDto implements IUiComponentConfigUpdateDto {
    configuration!: any;
    constructor(data?: IUiComponentConfigUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.configuration = _data["configuration"];
        }
    }
    static fromJS(data: any): UiComponentConfigUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentConfigUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["configuration"] = this.configuration;
        return data;
    }
}

export class UiComponentCreateDto implements IUiComponentCreateDto {
    name!: string;
    description?: string | undefined;
    type!: string;
    configuration?: any | undefined;
    schema?: any | undefined;
    tags?: string[] | undefined;
    constructor(data?: IUiComponentCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.configuration = _data["configuration"];
            this.schema = _data["schema"];
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
        }
    }
    static fromJS(data: any): UiComponentCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["configuration"] = this.configuration;
        data["schema"] = this.schema;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        return data;
    }
}

export class UiComponentDetailDto implements IUiComponentDetailDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    creator?: string | undefined;
    createdAt?: Date;
    programId?: string | undefined;
    versionId?: string | undefined;
    configuration?: any | undefined;
    schema?: any | undefined;
    status?: string | undefined;
    tags?: string[] | undefined;
    creatorName?: string | undefined;
    programName?: string | undefined;
    versionNumber?: number | undefined;
    assets?: UiComponentAssetDto[] | undefined;
    bundleInfo?: UiComponentBundleInfoDto;
    stats?: UiComponentStatsDto;
    usage?: UiComponentUsageDto[] | undefined;
    constructor(data?: IUiComponentDetailDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.creator = _data["creator"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.programId = _data["programId"];
            this.versionId = _data["versionId"];
            this.configuration = _data["configuration"];
            this.schema = _data["schema"];
            this.status = _data["status"];
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
            this.creatorName = _data["creatorName"];
            this.programName = _data["programName"];
            this.versionNumber = _data["versionNumber"];
            if (Array.isArray(_data["assets"])) {
                this.assets = [] as any;
                for (let item of _data["assets"])
                    this.assets!.push(UiComponentAssetDto.fromJS(item));
            }
            this.bundleInfo = _data["bundleInfo"] ? UiComponentBundleInfoDto.fromJS(_data["bundleInfo"]) : <any>undefined;
            this.stats = _data["stats"] ? UiComponentStatsDto.fromJS(_data["stats"]) : <any>undefined;
            if (Array.isArray(_data["usage"])) {
                this.usage = [] as any;
                for (let item of _data["usage"])
                    this.usage!.push(UiComponentUsageDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): UiComponentDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentDetailDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["creator"] = this.creator;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["programId"] = this.programId;
        data["versionId"] = this.versionId;
        data["configuration"] = this.configuration;
        data["schema"] = this.schema;
        data["status"] = this.status;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        data["creatorName"] = this.creatorName;
        data["programName"] = this.programName;
        data["versionNumber"] = this.versionNumber;
        if (Array.isArray(this.assets)) {
            data["assets"] = [];
            for (let item of this.assets)
                data["assets"].push(item ? item.toJSON() : <any>undefined);
        }
        data["bundleInfo"] = this.bundleInfo ? this.bundleInfo.toJSON() : <any>undefined;
        data["stats"] = this.stats ? this.stats.toJSON() : <any>undefined;
        if (Array.isArray(this.usage)) {
            data["usage"] = [];
            for (let item of this.usage)
                data["usage"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class UiComponentDetailDtoApiResponse implements IUiComponentDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUiComponentDetailDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? UiComponentDetailDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentDetailDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentDetailDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentDto implements IUiComponentDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    creator?: string | undefined;
    createdAt?: Date;
    programId?: string | undefined;
    versionId?: string | undefined;
    configuration?: any | undefined;
    schema?: any | undefined;
    status?: string | undefined;
    tags?: string[] | undefined;
    constructor(data?: IUiComponentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.creator = _data["creator"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.programId = _data["programId"];
            this.versionId = _data["versionId"];
            this.configuration = _data["configuration"];
            this.schema = _data["schema"];
            this.status = _data["status"];
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
        }
    }
    static fromJS(data: any): UiComponentDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["creator"] = this.creator;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["programId"] = this.programId;
        data["versionId"] = this.versionId;
        data["configuration"] = this.configuration;
        data["schema"] = this.schema;
        data["status"] = this.status;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        return data;
    }
}

export class UiComponentDtoApiResponse implements IUiComponentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUiComponentDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? UiComponentDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentListDto implements IUiComponentListDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    creator?: string | undefined;
    creatorName?: string | undefined;
    createdAt?: Date;
    programId?: string | undefined;
    programName?: string | undefined;
    versionId?: string | undefined;
    versionNumber?: number | undefined;
    status?: string | undefined;
    usageCount?: number;
    tags?: string[] | undefined;
    constructor(data?: IUiComponentListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.creator = _data["creator"];
            this.creatorName = _data["creatorName"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.programId = _data["programId"];
            this.programName = _data["programName"];
            this.versionId = _data["versionId"];
            this.versionNumber = _data["versionNumber"];
            this.status = _data["status"];
            this.usageCount = _data["usageCount"];
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
        }
    }
    static fromJS(data: any): UiComponentListDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["creator"] = this.creator;
        data["creatorName"] = this.creatorName;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["programId"] = this.programId;
        data["programName"] = this.programName;
        data["versionId"] = this.versionId;
        data["versionNumber"] = this.versionNumber;
        data["status"] = this.status;
        data["usageCount"] = this.usageCount;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        return data;
    }
}

export class UiComponentListDtoListApiResponse implements IUiComponentListDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentListDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUiComponentListDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(UiComponentListDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentListDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentListDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentListDtoPagedResponse implements IUiComponentListDtoPagedResponse {
    items?: UiComponentListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
    constructor(data?: IUiComponentListDtoPagedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(UiComponentListDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            (<any>this).hasPreviousPage = _data["hasPreviousPage"];
            (<any>this).hasNextPage = _data["hasNextPage"];
        }
    }
    static fromJS(data: any): UiComponentListDtoPagedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentListDtoPagedResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item ? item.toJSON() : <any>undefined);
        }
        data["pageNumber"] = this.pageNumber;
        data["pageSize"] = this.pageSize;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export class UiComponentListDtoPagedResponseApiResponse implements IUiComponentListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUiComponentListDtoPagedResponseApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? UiComponentListDtoPagedResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentListDtoPagedResponseApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentListDtoPagedResponseApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentMappingDto implements IUiComponentMappingDto {
    componentId!: string;
    mappingName!: string;
    mappingConfiguration?: any | undefined;
    displayOrder?: number;
    isActive?: boolean;
    constructor(data?: IUiComponentMappingDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.componentId = _data["componentId"];
            this.mappingName = _data["mappingName"];
            this.mappingConfiguration = _data["mappingConfiguration"];
            this.displayOrder = _data["displayOrder"];
            this.isActive = _data["isActive"];
        }
    }
    static fromJS(data: any): UiComponentMappingDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentMappingDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["componentId"] = this.componentId;
        data["mappingName"] = this.mappingName;
        data["mappingConfiguration"] = this.mappingConfiguration;
        data["displayOrder"] = this.displayOrder;
        data["isActive"] = this.isActive;
        return data;
    }
}

export class UiComponentRecommendationDto implements IUiComponentRecommendationDto {
    componentId?: string | undefined;
    componentName?: string | undefined;
    componentType?: string | undefined;
    programId?: string | undefined;
    versionId?: string | undefined;
    recommendationReason?: string | undefined;
    compatibilityScore?: number;
    usageCount?: number;
    rating?: number;
    constructor(data?: IUiComponentRecommendationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.componentId = _data["componentId"];
            this.componentName = _data["componentName"];
            this.componentType = _data["componentType"];
            this.programId = _data["programId"];
            this.versionId = _data["versionId"];
            this.recommendationReason = _data["recommendationReason"];
            this.compatibilityScore = _data["compatibilityScore"];
            this.usageCount = _data["usageCount"];
            this.rating = _data["rating"];
        }
    }
    static fromJS(data: any): UiComponentRecommendationDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentRecommendationDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["componentId"] = this.componentId;
        data["componentName"] = this.componentName;
        data["componentType"] = this.componentType;
        data["programId"] = this.programId;
        data["versionId"] = this.versionId;
        data["recommendationReason"] = this.recommendationReason;
        data["compatibilityScore"] = this.compatibilityScore;
        data["usageCount"] = this.usageCount;
        data["rating"] = this.rating;
        return data;
    }
}

export class UiComponentRecommendationDtoListApiResponse implements IUiComponentRecommendationDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentRecommendationDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUiComponentRecommendationDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(UiComponentRecommendationDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentRecommendationDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentRecommendationDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentSchemaDto implements IUiComponentSchemaDto {
    componentId?: string | undefined;
    schema?: any | undefined;
    lastUpdated?: Date;
    updatedBy?: string | undefined;
    isValid?: boolean;
    constructor(data?: IUiComponentSchemaDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.componentId = _data["componentId"];
            this.schema = _data["schema"];
            this.lastUpdated = _data["lastUpdated"] ? new Date(_data["lastUpdated"].toString()) : <any>undefined;
            this.updatedBy = _data["updatedBy"];
            this.isValid = _data["isValid"];
        }
    }
    static fromJS(data: any): UiComponentSchemaDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentSchemaDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["componentId"] = this.componentId;
        data["schema"] = this.schema;
        data["lastUpdated"] = this.lastUpdated ? this.lastUpdated.toISOString() : <any>undefined;
        data["updatedBy"] = this.updatedBy;
        data["isValid"] = this.isValid;
        return data;
    }
}

export class UiComponentSchemaDtoApiResponse implements IUiComponentSchemaDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentSchemaDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUiComponentSchemaDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? UiComponentSchemaDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentSchemaDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentSchemaDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentSchemaUpdateDto implements IUiComponentSchemaUpdateDto {
    schema!: any;
    constructor(data?: IUiComponentSchemaUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.schema = _data["schema"];
        }
    }
    static fromJS(data: any): UiComponentSchemaUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentSchemaUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["schema"] = this.schema;
        return data;
    }
}

export class UiComponentSearchDto implements IUiComponentSearchDto {
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    creator?: string | undefined;
    status?: string | undefined;
    programId?: string | undefined;
    versionId?: string | undefined;
    tags?: string[] | undefined;
    createdFrom?: Date | undefined;
    createdTo?: Date | undefined;
    constructor(data?: IUiComponentSearchDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.creator = _data["creator"];
            this.status = _data["status"];
            this.programId = _data["programId"];
            this.versionId = _data["versionId"];
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
            this.createdFrom = _data["createdFrom"] ? new Date(_data["createdFrom"].toString()) : <any>undefined;
            this.createdTo = _data["createdTo"] ? new Date(_data["createdTo"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentSearchDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentSearchDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["creator"] = this.creator;
        data["status"] = this.status;
        data["programId"] = this.programId;
        data["versionId"] = this.versionId;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        data["createdFrom"] = this.createdFrom ? this.createdFrom.toISOString() : <any>undefined;
        data["createdTo"] = this.createdTo ? this.createdTo.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentStatsDto implements IUiComponentStatsDto {
    totalUsage?: number;
    activeUsage?: number;
    lastUsed?: Date | undefined;
    averageRating?: number;
    ratingCount?: number;
    totalDownloads?: number;
    constructor(data?: IUiComponentStatsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.totalUsage = _data["totalUsage"];
            this.activeUsage = _data["activeUsage"];
            this.lastUsed = _data["lastUsed"] ? new Date(_data["lastUsed"].toString()) : <any>undefined;
            this.averageRating = _data["averageRating"];
            this.ratingCount = _data["ratingCount"];
            this.totalDownloads = _data["totalDownloads"];
        }
    }
    static fromJS(data: any): UiComponentStatsDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentStatsDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalUsage"] = this.totalUsage;
        data["activeUsage"] = this.activeUsage;
        data["lastUsed"] = this.lastUsed ? this.lastUsed.toISOString() : <any>undefined;
        data["averageRating"] = this.averageRating;
        data["ratingCount"] = this.ratingCount;
        data["totalDownloads"] = this.totalDownloads;
        return data;
    }
}

export class UiComponentUpdateDto implements IUiComponentUpdateDto {
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    configuration?: any | undefined;
    schema?: any | undefined;
    tags?: string[] | undefined;
    constructor(data?: IUiComponentUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.description = _data["description"];
            this.type = _data["type"];
            this.configuration = _data["configuration"];
            this.schema = _data["schema"];
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
        }
    }
    static fromJS(data: any): UiComponentUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["type"] = this.type;
        data["configuration"] = this.configuration;
        data["schema"] = this.schema;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        return data;
    }
}

export class UiComponentUsageDto implements IUiComponentUsageDto {
    programId?: string | undefined;
    programName?: string | undefined;
    versionId?: string | undefined;
    versionNumber?: number | undefined;
    mappingName?: string | undefined;
    usedSince?: Date;
    isActive?: boolean;
    displayOrder?: number;
    constructor(data?: IUiComponentUsageDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programId = _data["programId"];
            this.programName = _data["programName"];
            this.versionId = _data["versionId"];
            this.versionNumber = _data["versionNumber"];
            this.mappingName = _data["mappingName"];
            this.usedSince = _data["usedSince"] ? new Date(_data["usedSince"].toString()) : <any>undefined;
            this.isActive = _data["isActive"];
            this.displayOrder = _data["displayOrder"];
        }
    }
    static fromJS(data: any): UiComponentUsageDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentUsageDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programId"] = this.programId;
        data["programName"] = this.programName;
        data["versionId"] = this.versionId;
        data["versionNumber"] = this.versionNumber;
        data["mappingName"] = this.mappingName;
        data["usedSince"] = this.usedSince ? this.usedSince.toISOString() : <any>undefined;
        data["isActive"] = this.isActive;
        data["displayOrder"] = this.displayOrder;
        return data;
    }
}

export class UiComponentUsageDtoListApiResponse implements IUiComponentUsageDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentUsageDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUiComponentUsageDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(UiComponentUsageDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentUsageDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentUsageDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentValidationResult implements IUiComponentValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    suggestions?: UiComponentValidationSuggestionDto[] | undefined;
    constructor(data?: IUiComponentValidationResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.isValid = _data["isValid"];
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            if (Array.isArray(_data["warnings"])) {
                this.warnings = [] as any;
                for (let item of _data["warnings"])
                    this.warnings!.push(item);
            }
            if (Array.isArray(_data["suggestions"])) {
                this.suggestions = [] as any;
                for (let item of _data["suggestions"])
                    this.suggestions!.push(UiComponentValidationSuggestionDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): UiComponentValidationResult {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentValidationResult();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isValid"] = this.isValid;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        if (Array.isArray(this.warnings)) {
            data["warnings"] = [];
            for (let item of this.warnings)
                data["warnings"].push(item);
        }
        if (Array.isArray(this.suggestions)) {
            data["suggestions"] = [];
            for (let item of this.suggestions)
                data["suggestions"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class UiComponentValidationResultApiResponse implements IUiComponentValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUiComponentValidationResultApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? UiComponentValidationResult.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UiComponentValidationResultApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentValidationResultApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UiComponentValidationSuggestionDto implements IUiComponentValidationSuggestionDto {
    type?: string | undefined;
    message?: string | undefined;
    suggestedValue?: string | undefined;
    constructor(data?: IUiComponentValidationSuggestionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.type = _data["type"];
            this.message = _data["message"];
            this.suggestedValue = _data["suggestedValue"];
        }
    }
    static fromJS(data: any): UiComponentValidationSuggestionDto {
        data = typeof data === 'object' ? data : {};
        let result = new UiComponentValidationSuggestionDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["message"] = this.message;
        data["suggestedValue"] = this.suggestedValue;
        return data;
    }
}

export class UserDetailDto implements IUserDetailDto {
    id?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    fullName?: string | undefined;
    roles?: string[] | undefined;
    isActive?: boolean;
    lastLoginDate?: Date | undefined;
    createdDate?: Date;
    permissions?: string[] | undefined;
    assignedClientIds?: string[] | undefined;
    modifiedDate?: Date | undefined;
    assignedClients?: ClientSummaryResponseDto[] | undefined;
    constructor(data?: IUserDetailDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.email = _data["email"];
            this.username = _data["username"];
            this.firstName = _data["firstName"];
            this.lastName = _data["lastName"];
            this.fullName = _data["fullName"];
            if (Array.isArray(_data["roles"])) {
                this.roles = [] as any;
                for (let item of _data["roles"])
                    this.roles!.push(item);
            }
            this.isActive = _data["isActive"];
            this.lastLoginDate = _data["lastLoginDate"] ? new Date(_data["lastLoginDate"].toString()) : <any>undefined;
            this.createdDate = _data["createdDate"] ? new Date(_data["createdDate"].toString()) : <any>undefined;
            if (Array.isArray(_data["permissions"])) {
                this.permissions = [] as any;
                for (let item of _data["permissions"])
                    this.permissions!.push(item);
            }
            if (Array.isArray(_data["assignedClientIds"])) {
                this.assignedClientIds = [] as any;
                for (let item of _data["assignedClientIds"])
                    this.assignedClientIds!.push(item);
            }
            this.modifiedDate = _data["modifiedDate"] ? new Date(_data["modifiedDate"].toString()) : <any>undefined;
            if (Array.isArray(_data["assignedClients"])) {
                this.assignedClients = [] as any;
                for (let item of _data["assignedClients"])
                    this.assignedClients!.push(ClientSummaryResponseDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): UserDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserDetailDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["email"] = this.email;
        data["username"] = this.username;
        data["firstName"] = this.firstName;
        data["lastName"] = this.lastName;
        data["fullName"] = this.fullName;
        if (Array.isArray(this.roles)) {
            data["roles"] = [];
            for (let item of this.roles)
                data["roles"].push(item);
        }
        data["isActive"] = this.isActive;
        data["lastLoginDate"] = this.lastLoginDate ? this.lastLoginDate.toISOString() : <any>undefined;
        data["createdDate"] = this.createdDate ? this.createdDate.toISOString() : <any>undefined;
        if (Array.isArray(this.permissions)) {
            data["permissions"] = [];
            for (let item of this.permissions)
                data["permissions"].push(item);
        }
        if (Array.isArray(this.assignedClientIds)) {
            data["assignedClientIds"] = [];
            for (let item of this.assignedClientIds)
                data["assignedClientIds"].push(item);
        }
        data["modifiedDate"] = this.modifiedDate ? this.modifiedDate.toISOString() : <any>undefined;
        if (Array.isArray(this.assignedClients)) {
            data["assignedClients"] = [];
            for (let item of this.assignedClients)
                data["assignedClients"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class UserDetailDtoApiResponse implements IUserDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UserDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUserDetailDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? UserDetailDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UserDetailDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UserDetailDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UserDto implements IUserDto {
    id?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    fullName?: string | undefined;
    roles?: string[] | undefined;
    isActive?: boolean;
    lastLoginDate?: Date | undefined;
    createdDate?: Date;
    constructor(data?: IUserDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.email = _data["email"];
            this.username = _data["username"];
            this.firstName = _data["firstName"];
            this.lastName = _data["lastName"];
            this.fullName = _data["fullName"];
            if (Array.isArray(_data["roles"])) {
                this.roles = [] as any;
                for (let item of _data["roles"])
                    this.roles!.push(item);
            }
            this.isActive = _data["isActive"];
            this.lastLoginDate = _data["lastLoginDate"] ? new Date(_data["lastLoginDate"].toString()) : <any>undefined;
            this.createdDate = _data["createdDate"] ? new Date(_data["createdDate"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UserDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["email"] = this.email;
        data["username"] = this.username;
        data["firstName"] = this.firstName;
        data["lastName"] = this.lastName;
        data["fullName"] = this.fullName;
        if (Array.isArray(this.roles)) {
            data["roles"] = [];
            for (let item of this.roles)
                data["roles"].push(item);
        }
        data["isActive"] = this.isActive;
        data["lastLoginDate"] = this.lastLoginDate ? this.lastLoginDate.toISOString() : <any>undefined;
        data["createdDate"] = this.createdDate ? this.createdDate.toISOString() : <any>undefined;
        return data;
    }
}

export class UserDtoApiResponse implements IUserDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UserDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUserDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? UserDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UserDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UserDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UserListDto implements IUserListDto {
    id?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;
    fullName?: string | undefined;
    roles?: string[] | undefined;
    isActive?: boolean;
    lastLoginDate?: Date | undefined;
    constructor(data?: IUserListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.email = _data["email"];
            this.username = _data["username"];
            this.fullName = _data["fullName"];
            if (Array.isArray(_data["roles"])) {
                this.roles = [] as any;
                for (let item of _data["roles"])
                    this.roles!.push(item);
            }
            this.isActive = _data["isActive"];
            this.lastLoginDate = _data["lastLoginDate"] ? new Date(_data["lastLoginDate"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UserListDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["email"] = this.email;
        data["username"] = this.username;
        data["fullName"] = this.fullName;
        if (Array.isArray(this.roles)) {
            data["roles"] = [];
            for (let item of this.roles)
                data["roles"].push(item);
        }
        data["isActive"] = this.isActive;
        data["lastLoginDate"] = this.lastLoginDate ? this.lastLoginDate.toISOString() : <any>undefined;
        return data;
    }
}

export class UserListDtoPagedResponse implements IUserListDtoPagedResponse {
    items?: UserListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
    constructor(data?: IUserListDtoPagedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(UserListDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            (<any>this).hasPreviousPage = _data["hasPreviousPage"];
            (<any>this).hasNextPage = _data["hasNextPage"];
        }
    }
    static fromJS(data: any): UserListDtoPagedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UserListDtoPagedResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item ? item.toJSON() : <any>undefined);
        }
        data["pageNumber"] = this.pageNumber;
        data["pageSize"] = this.pageSize;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export class UserListDtoPagedResponseApiResponse implements IUserListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UserListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUserListDtoPagedResponseApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? UserListDtoPagedResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UserListDtoPagedResponseApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UserListDtoPagedResponseApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UserLoginDto implements IUserLoginDto {
    usernameOrEmail!: string;
    password!: string;
    rememberMe?: boolean;
    constructor(data?: IUserLoginDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.usernameOrEmail = _data["usernameOrEmail"];
            this.password = _data["password"];
            this.rememberMe = _data["rememberMe"];
        }
    }
    static fromJS(data: any): UserLoginDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserLoginDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["usernameOrEmail"] = this.usernameOrEmail;
        data["password"] = this.password;
        data["rememberMe"] = this.rememberMe;
        return data;
    }
}

export class UserPasswordChangeDto implements IUserPasswordChangeDto {
    currentPassword!: string;
    newPassword!: string;
    confirmNewPassword!: string;
    constructor(data?: IUserPasswordChangeDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.currentPassword = _data["currentPassword"];
            this.newPassword = _data["newPassword"];
            this.confirmNewPassword = _data["confirmNewPassword"];
        }
    }
    static fromJS(data: any): UserPasswordChangeDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserPasswordChangeDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["currentPassword"] = this.currentPassword;
        data["newPassword"] = this.newPassword;
        data["confirmNewPassword"] = this.confirmNewPassword;
        return data;
    }
}

export class UserPasswordResetDto implements IUserPasswordResetDto {
    resetToken!: string;
    newPassword!: string;
    confirmNewPassword!: string;
    constructor(data?: IUserPasswordResetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.resetToken = _data["resetToken"];
            this.newPassword = _data["newPassword"];
            this.confirmNewPassword = _data["confirmNewPassword"];
        }
    }
    static fromJS(data: any): UserPasswordResetDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserPasswordResetDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["resetToken"] = this.resetToken;
        data["newPassword"] = this.newPassword;
        data["confirmNewPassword"] = this.confirmNewPassword;
        return data;
    }
}

export class UserPasswordResetRequestDto implements IUserPasswordResetRequestDto {
    email!: string;
    constructor(data?: IUserPasswordResetRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.email = _data["email"];
        }
    }
    static fromJS(data: any): UserPasswordResetRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserPasswordResetRequestDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["email"] = this.email;
        return data;
    }
}

export class UserPermissionUpdateDto implements IUserPermissionUpdateDto {
    userId!: string;
    permissions!: string[];
    constructor(data?: IUserPermissionUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.permissions = [];
        }
    }
    init(_data?: any) {
        if (_data) {
            this.userId = _data["userId"];
            if (Array.isArray(_data["permissions"])) {
                this.permissions = [] as any;
                for (let item of _data["permissions"])
                    this.permissions!.push(item);
            }
        }
    }
    static fromJS(data: any): UserPermissionUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserPermissionUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userId"] = this.userId;
        if (Array.isArray(this.permissions)) {
            data["permissions"] = [];
            for (let item of this.permissions)
                data["permissions"].push(item);
        }
        return data;
    }
}

export class UserProfileDto implements IUserProfileDto {
    id?: string | undefined;
    username?: string | undefined;
    fullName?: string | undefined;
    roles?: string[] | undefined;
    createdDate?: Date;
    lastLoginDate?: Date | undefined;
    constructor(data?: IUserProfileDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.username = _data["username"];
            this.fullName = _data["fullName"];
            if (Array.isArray(_data["roles"])) {
                this.roles = [] as any;
                for (let item of _data["roles"])
                    this.roles!.push(item);
            }
            this.createdDate = _data["createdDate"] ? new Date(_data["createdDate"].toString()) : <any>undefined;
            this.lastLoginDate = _data["lastLoginDate"] ? new Date(_data["lastLoginDate"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UserProfileDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserProfileDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["username"] = this.username;
        data["fullName"] = this.fullName;
        if (Array.isArray(this.roles)) {
            data["roles"] = [];
            for (let item of this.roles)
                data["roles"].push(item);
        }
        data["createdDate"] = this.createdDate ? this.createdDate.toISOString() : <any>undefined;
        data["lastLoginDate"] = this.lastLoginDate ? this.lastLoginDate.toISOString() : <any>undefined;
        return data;
    }
}

export class UserProfileDtoApiResponse implements IUserProfileDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UserProfileDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IUserProfileDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? UserProfileDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UserProfileDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new UserProfileDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class UserRegisterDto implements IUserRegisterDto {
    email!: string;
    username!: string;
    password!: string;
    confirmPassword!: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
    constructor(data?: IUserRegisterDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.email = _data["email"];
            this.username = _data["username"];
            this.password = _data["password"];
            this.confirmPassword = _data["confirmPassword"];
            this.firstName = _data["firstName"];
            this.lastName = _data["lastName"];
        }
    }
    static fromJS(data: any): UserRegisterDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserRegisterDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["email"] = this.email;
        data["username"] = this.username;
        data["password"] = this.password;
        data["confirmPassword"] = this.confirmPassword;
        data["firstName"] = this.firstName;
        data["lastName"] = this.lastName;
        return data;
    }
}

export class UserRoleUpdateDto implements IUserRoleUpdateDto {
    roles!: string[];
    constructor(data?: IUserRoleUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.roles = [];
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["roles"])) {
                this.roles = [] as any;
                for (let item of _data["roles"])
                    this.roles!.push(item);
            }
        }
    }
    static fromJS(data: any): UserRoleUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserRoleUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.roles)) {
            data["roles"] = [];
            for (let item of this.roles)
                data["roles"].push(item);
        }
        return data;
    }
}

export class UserSearchDto implements IUserSearchDto {
    email?: string | undefined;
    username?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    roles?: string[] | undefined;
    isActive?: boolean | undefined;
    createdFrom?: Date | undefined;
    createdTo?: Date | undefined;
    lastLoginFrom?: Date | undefined;
    lastLoginTo?: Date | undefined;
    constructor(data?: IUserSearchDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.email = _data["email"];
            this.username = _data["username"];
            this.firstName = _data["firstName"];
            this.lastName = _data["lastName"];
            if (Array.isArray(_data["roles"])) {
                this.roles = [] as any;
                for (let item of _data["roles"])
                    this.roles!.push(item);
            }
            this.isActive = _data["isActive"];
            this.createdFrom = _data["createdFrom"] ? new Date(_data["createdFrom"].toString()) : <any>undefined;
            this.createdTo = _data["createdTo"] ? new Date(_data["createdTo"].toString()) : <any>undefined;
            this.lastLoginFrom = _data["lastLoginFrom"] ? new Date(_data["lastLoginFrom"].toString()) : <any>undefined;
            this.lastLoginTo = _data["lastLoginTo"] ? new Date(_data["lastLoginTo"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): UserSearchDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserSearchDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["email"] = this.email;
        data["username"] = this.username;
        data["firstName"] = this.firstName;
        data["lastName"] = this.lastName;
        if (Array.isArray(this.roles)) {
            data["roles"] = [];
            for (let item of this.roles)
                data["roles"].push(item);
        }
        data["isActive"] = this.isActive;
        data["createdFrom"] = this.createdFrom ? this.createdFrom.toISOString() : <any>undefined;
        data["createdTo"] = this.createdTo ? this.createdTo.toISOString() : <any>undefined;
        data["lastLoginFrom"] = this.lastLoginFrom ? this.lastLoginFrom.toISOString() : <any>undefined;
        data["lastLoginTo"] = this.lastLoginTo ? this.lastLoginTo.toISOString() : <any>undefined;
        return data;
    }
}

export class UserUpdateDto implements IUserUpdateDto {
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    constructor(data?: IUserUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.firstName = _data["firstName"];
            this.lastName = _data["lastName"];
            this.email = _data["email"];
        }
    }
    static fromJS(data: any): UserUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["firstName"] = this.firstName;
        data["lastName"] = this.lastName;
        data["email"] = this.email;
        return data;
    }
}

export class VersionActivityDto implements IVersionActivityDto {
    date?: Date;
    activity?: string | undefined;
    userId?: string | undefined;
    userName?: string | undefined;
    description?: string | undefined;
    constructor(data?: IVersionActivityDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.date = _data["date"] ? new Date(_data["date"].toString()) : <any>undefined;
            this.activity = _data["activity"];
            this.userId = _data["userId"];
            this.userName = _data["userName"];
            this.description = _data["description"];
        }
    }
    static fromJS(data: any): VersionActivityDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionActivityDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["date"] = this.date ? this.date.toISOString() : <any>undefined;
        data["activity"] = this.activity;
        data["userId"] = this.userId;
        data["userName"] = this.userName;
        data["description"] = this.description;
        return data;
    }
}

export class VersionActivityDtoListApiResponse implements IVersionActivityDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionActivityDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IVersionActivityDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(VersionActivityDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionActivityDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new VersionActivityDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionChangeDto implements IVersionChangeDto {
    path?: string | undefined;
    action?: string | undefined;
    description?: string | undefined;
    impactLevel?: number;
    constructor(data?: IVersionChangeDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.path = _data["path"];
            this.action = _data["action"];
            this.description = _data["description"];
            this.impactLevel = _data["impactLevel"];
        }
    }
    static fromJS(data: any): VersionChangeDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionChangeDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["path"] = this.path;
        data["action"] = this.action;
        data["description"] = this.description;
        data["impactLevel"] = this.impactLevel;
        return data;
    }
}

export class VersionChangeDtoListApiResponse implements IVersionChangeDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionChangeDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IVersionChangeDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(VersionChangeDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionChangeDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new VersionChangeDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionCommitDto implements IVersionCommitDto {
    commitMessage!: string;
    changes!: VersionFileChangeDto[];
    constructor(data?: IVersionCommitDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.changes = [];
        }
    }
    init(_data?: any) {
        if (_data) {
            this.commitMessage = _data["commitMessage"];
            if (Array.isArray(_data["changes"])) {
                this.changes = [] as any;
                for (let item of _data["changes"])
                    this.changes!.push(VersionFileChangeDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): VersionCommitDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionCommitDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["commitMessage"] = this.commitMessage;
        if (Array.isArray(this.changes)) {
            data["changes"] = [];
            for (let item of this.changes)
                data["changes"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class VersionCommitValidationDto implements IVersionCommitValidationDto {
    changes!: VersionFileChangeDto[];
    constructor(data?: IVersionCommitValidationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.changes = [];
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["changes"])) {
                this.changes = [] as any;
                for (let item of _data["changes"])
                    this.changes!.push(VersionFileChangeDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): VersionCommitValidationDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionCommitValidationDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.changes)) {
            data["changes"] = [];
            for (let item of this.changes)
                data["changes"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class VersionCreateDto implements IVersionCreateDto {
    programId!: string;
    commitMessage!: string;
    files?: VersionFileCreateDto[] | undefined;
    constructor(data?: IVersionCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programId = _data["programId"];
            this.commitMessage = _data["commitMessage"];
            if (Array.isArray(_data["files"])) {
                this.files = [] as any;
                for (let item of _data["files"])
                    this.files!.push(VersionFileCreateDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): VersionCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programId"] = this.programId;
        data["commitMessage"] = this.commitMessage;
        if (Array.isArray(this.files)) {
            data["files"] = [];
            for (let item of this.files)
                data["files"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class VersionDeploymentDto implements IVersionDeploymentDto {
    id?: string | undefined;
    versionId?: string | undefined;
    status?: string | undefined;
    deployedAt?: Date;
    deployedBy?: string | undefined;
    targetEnvironments?: string[] | undefined;
    configuration?: { [key: string]: any; } | undefined;
    constructor(data?: IVersionDeploymentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.versionId = _data["versionId"];
            this.status = _data["status"];
            this.deployedAt = _data["deployedAt"] ? new Date(_data["deployedAt"].toString()) : <any>undefined;
            this.deployedBy = _data["deployedBy"];
            if (Array.isArray(_data["targetEnvironments"])) {
                this.targetEnvironments = [] as any;
                for (let item of _data["targetEnvironments"])
                    this.targetEnvironments!.push(item);
            }
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
        }
    }
    static fromJS(data: any): VersionDeploymentDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionDeploymentDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["versionId"] = this.versionId;
        data["status"] = this.status;
        data["deployedAt"] = this.deployedAt ? this.deployedAt.toISOString() : <any>undefined;
        data["deployedBy"] = this.deployedBy;
        if (Array.isArray(this.targetEnvironments)) {
            data["targetEnvironments"] = [];
            for (let item of this.targetEnvironments)
                data["targetEnvironments"].push(item);
        }
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        return data;
    }
}

export class VersionDeploymentDtoApiResponse implements IVersionDeploymentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionDeploymentDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IVersionDeploymentDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? VersionDeploymentDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionDeploymentDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new VersionDeploymentDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionDeploymentInfoDto implements IVersionDeploymentInfoDto {
    isDeployed?: boolean;
    lastDeployment?: Date | undefined;
    deploymentStatus?: string | undefined;
    environments?: string[] | undefined;
    constructor(data?: IVersionDeploymentInfoDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.isDeployed = _data["isDeployed"];
            this.lastDeployment = _data["lastDeployment"] ? new Date(_data["lastDeployment"].toString()) : <any>undefined;
            this.deploymentStatus = _data["deploymentStatus"];
            if (Array.isArray(_data["environments"])) {
                this.environments = [] as any;
                for (let item of _data["environments"])
                    this.environments!.push(item);
            }
        }
    }
    static fromJS(data: any): VersionDeploymentInfoDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionDeploymentInfoDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isDeployed"] = this.isDeployed;
        data["lastDeployment"] = this.lastDeployment ? this.lastDeployment.toISOString() : <any>undefined;
        data["deploymentStatus"] = this.deploymentStatus;
        if (Array.isArray(this.environments)) {
            data["environments"] = [];
            for (let item of this.environments)
                data["environments"].push(item);
        }
        return data;
    }
}

export class VersionDeploymentRequestDto implements IVersionDeploymentRequestDto {
    deploymentConfiguration?: { [key: string]: any; } | undefined;
    targetEnvironments?: string[] | undefined;
    setAsCurrent?: boolean;
    constructor(data?: IVersionDeploymentRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (_data["deploymentConfiguration"]) {
                this.deploymentConfiguration = {} as any;
                for (let key in _data["deploymentConfiguration"]) {
                    if (_data["deploymentConfiguration"].hasOwnProperty(key))
                        (<any>this.deploymentConfiguration)![key] = _data["deploymentConfiguration"][key];
                }
            }
            if (Array.isArray(_data["targetEnvironments"])) {
                this.targetEnvironments = [] as any;
                for (let item of _data["targetEnvironments"])
                    this.targetEnvironments!.push(item);
            }
            this.setAsCurrent = _data["setAsCurrent"];
        }
    }
    static fromJS(data: any): VersionDeploymentRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionDeploymentRequestDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.deploymentConfiguration) {
            data["deploymentConfiguration"] = {};
            for (let key in this.deploymentConfiguration) {
                if (this.deploymentConfiguration.hasOwnProperty(key))
                    (<any>data["deploymentConfiguration"])[key] = (<any>this.deploymentConfiguration)[key];
            }
        }
        if (Array.isArray(this.targetEnvironments)) {
            data["targetEnvironments"] = [];
            for (let item of this.targetEnvironments)
                data["targetEnvironments"].push(item);
        }
        data["setAsCurrent"] = this.setAsCurrent;
        return data;
    }
}

export class VersionDetailDto implements IVersionDetailDto {
    id?: string | undefined;
    programId?: string | undefined;
    versionNumber?: number;
    commitMessage?: string | undefined;
    createdBy?: string | undefined;
    createdAt?: Date;
    status?: string | undefined;
    reviewer?: string | undefined;
    reviewedAt?: Date | undefined;
    reviewComments?: string | undefined;
    programName?: string | undefined;
    createdByName?: string | undefined;
    reviewerName?: string | undefined;
    files?: VersionFileDto[] | undefined;
    stats?: VersionStatsDto;
    deploymentInfo?: VersionDeploymentInfoDto;
    constructor(data?: IVersionDetailDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.programId = _data["programId"];
            this.versionNumber = _data["versionNumber"];
            this.commitMessage = _data["commitMessage"];
            this.createdBy = _data["createdBy"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.status = _data["status"];
            this.reviewer = _data["reviewer"];
            this.reviewedAt = _data["reviewedAt"] ? new Date(_data["reviewedAt"].toString()) : <any>undefined;
            this.reviewComments = _data["reviewComments"];
            this.programName = _data["programName"];
            this.createdByName = _data["createdByName"];
            this.reviewerName = _data["reviewerName"];
            if (Array.isArray(_data["files"])) {
                this.files = [] as any;
                for (let item of _data["files"])
                    this.files!.push(VersionFileDto.fromJS(item));
            }
            this.stats = _data["stats"] ? VersionStatsDto.fromJS(_data["stats"]) : <any>undefined;
            this.deploymentInfo = _data["deploymentInfo"] ? VersionDeploymentInfoDto.fromJS(_data["deploymentInfo"]) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionDetailDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["programId"] = this.programId;
        data["versionNumber"] = this.versionNumber;
        data["commitMessage"] = this.commitMessage;
        data["createdBy"] = this.createdBy;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["reviewer"] = this.reviewer;
        data["reviewedAt"] = this.reviewedAt ? this.reviewedAt.toISOString() : <any>undefined;
        data["reviewComments"] = this.reviewComments;
        data["programName"] = this.programName;
        data["createdByName"] = this.createdByName;
        data["reviewerName"] = this.reviewerName;
        if (Array.isArray(this.files)) {
            data["files"] = [];
            for (let item of this.files)
                data["files"].push(item ? item.toJSON() : <any>undefined);
        }
        data["stats"] = this.stats ? this.stats.toJSON() : <any>undefined;
        data["deploymentInfo"] = this.deploymentInfo ? this.deploymentInfo.toJSON() : <any>undefined;
        return data;
    }
}

export class VersionDetailDtoApiResponse implements IVersionDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IVersionDetailDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? VersionDetailDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionDetailDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new VersionDetailDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionDiffDto implements IVersionDiffDto {
    fromVersionId?: string | undefined;
    toVersionId?: string | undefined;
    fromVersionNumber?: number;
    toVersionNumber?: number;
    changes?: VersionFileChangeSummaryDto[] | undefined;
    stats?: VersionDiffStatsDto;
    constructor(data?: IVersionDiffDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.fromVersionId = _data["fromVersionId"];
            this.toVersionId = _data["toVersionId"];
            this.fromVersionNumber = _data["fromVersionNumber"];
            this.toVersionNumber = _data["toVersionNumber"];
            if (Array.isArray(_data["changes"])) {
                this.changes = [] as any;
                for (let item of _data["changes"])
                    this.changes!.push(VersionFileChangeSummaryDto.fromJS(item));
            }
            this.stats = _data["stats"] ? VersionDiffStatsDto.fromJS(_data["stats"]) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionDiffDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionDiffDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fromVersionId"] = this.fromVersionId;
        data["toVersionId"] = this.toVersionId;
        data["fromVersionNumber"] = this.fromVersionNumber;
        data["toVersionNumber"] = this.toVersionNumber;
        if (Array.isArray(this.changes)) {
            data["changes"] = [];
            for (let item of this.changes)
                data["changes"].push(item ? item.toJSON() : <any>undefined);
        }
        data["stats"] = this.stats ? this.stats.toJSON() : <any>undefined;
        return data;
    }
}

export class VersionDiffDtoApiResponse implements IVersionDiffDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionDiffDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IVersionDiffDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? VersionDiffDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionDiffDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new VersionDiffDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionDiffStatsDto implements IVersionDiffStatsDto {
    filesChanged?: number;
    filesAdded?: number;
    filesDeleted?: number;
    totalLinesAdded?: number;
    totalLinesRemoved?: number;
    constructor(data?: IVersionDiffStatsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.filesChanged = _data["filesChanged"];
            this.filesAdded = _data["filesAdded"];
            this.filesDeleted = _data["filesDeleted"];
            this.totalLinesAdded = _data["totalLinesAdded"];
            this.totalLinesRemoved = _data["totalLinesRemoved"];
        }
    }
    static fromJS(data: any): VersionDiffStatsDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionDiffStatsDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["filesChanged"] = this.filesChanged;
        data["filesAdded"] = this.filesAdded;
        data["filesDeleted"] = this.filesDeleted;
        data["totalLinesAdded"] = this.totalLinesAdded;
        data["totalLinesRemoved"] = this.totalLinesRemoved;
        return data;
    }
}

export class VersionDto implements IVersionDto {
    id?: string | undefined;
    programId?: string | undefined;
    versionNumber?: number;
    commitMessage?: string | undefined;
    createdBy?: string | undefined;
    createdAt?: Date;
    status?: string | undefined;
    reviewer?: string | undefined;
    reviewedAt?: Date | undefined;
    reviewComments?: string | undefined;
    constructor(data?: IVersionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.programId = _data["programId"];
            this.versionNumber = _data["versionNumber"];
            this.commitMessage = _data["commitMessage"];
            this.createdBy = _data["createdBy"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.status = _data["status"];
            this.reviewer = _data["reviewer"];
            this.reviewedAt = _data["reviewedAt"] ? new Date(_data["reviewedAt"].toString()) : <any>undefined;
            this.reviewComments = _data["reviewComments"];
        }
    }
    static fromJS(data: any): VersionDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["programId"] = this.programId;
        data["versionNumber"] = this.versionNumber;
        data["commitMessage"] = this.commitMessage;
        data["createdBy"] = this.createdBy;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["reviewer"] = this.reviewer;
        data["reviewedAt"] = this.reviewedAt ? this.reviewedAt.toISOString() : <any>undefined;
        data["reviewComments"] = this.reviewComments;
        return data;
    }
}

export class VersionDtoApiResponse implements IVersionDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IVersionDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? VersionDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new VersionDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionExecutionRequestDto implements IVersionExecutionRequestDto {
    parameters?: any | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: ExecutionResourceLimitsDto;
    saveResults?: boolean;
    timeoutMinutes?: number;
    constructor(data?: IVersionExecutionRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.parameters = _data["parameters"];
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            this.resourceLimits = _data["resourceLimits"] ? ExecutionResourceLimitsDto.fromJS(_data["resourceLimits"]) : <any>undefined;
            this.saveResults = _data["saveResults"];
            this.timeoutMinutes = _data["timeoutMinutes"];
        }
    }
    static fromJS(data: any): VersionExecutionRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionExecutionRequestDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["parameters"] = this.parameters;
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        data["resourceLimits"] = this.resourceLimits ? this.resourceLimits.toJSON() : <any>undefined;
        data["saveResults"] = this.saveResults;
        data["timeoutMinutes"] = this.timeoutMinutes;
        return data;
    }
}

export class VersionFileChangeDto implements IVersionFileChangeDto {
    path!: string;
    action!: string;
    content?: string | undefined;
    contentType?: string | undefined;
    constructor(data?: IVersionFileChangeDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.path = _data["path"];
            this.action = _data["action"];
            this.content = _data["content"];
            this.contentType = _data["contentType"];
        }
    }
    static fromJS(data: any): VersionFileChangeDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionFileChangeDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["path"] = this.path;
        data["action"] = this.action;
        data["content"] = this.content;
        data["contentType"] = this.contentType;
        return data;
    }
}

export class VersionFileChangeSummaryDto implements IVersionFileChangeSummaryDto {
    path?: string | undefined;
    action?: string | undefined;
    linesAdded?: number;
    linesRemoved?: number;
    sizeBefore?: number;
    sizeAfter?: number;
    constructor(data?: IVersionFileChangeSummaryDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.path = _data["path"];
            this.action = _data["action"];
            this.linesAdded = _data["linesAdded"];
            this.linesRemoved = _data["linesRemoved"];
            this.sizeBefore = _data["sizeBefore"];
            this.sizeAfter = _data["sizeAfter"];
        }
    }
    static fromJS(data: any): VersionFileChangeSummaryDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionFileChangeSummaryDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["path"] = this.path;
        data["action"] = this.action;
        data["linesAdded"] = this.linesAdded;
        data["linesRemoved"] = this.linesRemoved;
        data["sizeBefore"] = this.sizeBefore;
        data["sizeAfter"] = this.sizeAfter;
        return data;
    }
}

export class VersionFileCreateDto implements IVersionFileCreateDto {
    path!: string;
    content!: string;
    contentType?: string | undefined;
    fileType?: string | undefined;
    constructor(data?: IVersionFileCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.path = _data["path"];
            this.content = _data["content"];
            this.contentType = _data["contentType"];
            this.fileType = _data["fileType"];
        }
    }
    static fromJS(data: any): VersionFileCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionFileCreateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["path"] = this.path;
        data["content"] = this.content;
        data["contentType"] = this.contentType;
        data["fileType"] = this.fileType;
        return data;
    }
}

export class VersionFileDetailDto implements IVersionFileDetailDto {
    path?: string | undefined;
    storageKey?: string | undefined;
    hash?: string | undefined;
    size?: number;
    fileType?: string | undefined;
    contentType?: string | undefined;
    content?: string | undefined;
    lastModified?: Date;
    constructor(data?: IVersionFileDetailDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.path = _data["path"];
            this.storageKey = _data["storageKey"];
            this.hash = _data["hash"];
            this.size = _data["size"];
            this.fileType = _data["fileType"];
            this.contentType = _data["contentType"];
            this.content = _data["content"];
            this.lastModified = _data["lastModified"] ? new Date(_data["lastModified"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionFileDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionFileDetailDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["path"] = this.path;
        data["storageKey"] = this.storageKey;
        data["hash"] = this.hash;
        data["size"] = this.size;
        data["fileType"] = this.fileType;
        data["contentType"] = this.contentType;
        data["content"] = this.content;
        data["lastModified"] = this.lastModified ? this.lastModified.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionFileDetailDtoApiResponse implements IVersionFileDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionFileDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IVersionFileDetailDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? VersionFileDetailDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionFileDetailDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new VersionFileDetailDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionFileDto implements IVersionFileDto {
    path?: string | undefined;
    storageKey?: string | undefined;
    hash?: string | undefined;
    size?: number;
    fileType?: string | undefined;
    contentType?: string | undefined;
    constructor(data?: IVersionFileDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.path = _data["path"];
            this.storageKey = _data["storageKey"];
            this.hash = _data["hash"];
            this.size = _data["size"];
            this.fileType = _data["fileType"];
            this.contentType = _data["contentType"];
        }
    }
    static fromJS(data: any): VersionFileDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionFileDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["path"] = this.path;
        data["storageKey"] = this.storageKey;
        data["hash"] = this.hash;
        data["size"] = this.size;
        data["fileType"] = this.fileType;
        data["contentType"] = this.contentType;
        return data;
    }
}

export class VersionFileDtoListApiResponse implements IVersionFileDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionFileDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IVersionFileDtoListApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(VersionFileDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionFileDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new VersionFileDtoListApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionFileUpdateDto implements IVersionFileUpdateDto {
    content!: string;
    contentType?: string | undefined;
    fileType?: string | undefined;
    constructor(data?: IVersionFileUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.content = _data["content"];
            this.contentType = _data["contentType"];
            this.fileType = _data["fileType"];
        }
    }
    static fromJS(data: any): VersionFileUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionFileUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["content"] = this.content;
        data["contentType"] = this.contentType;
        data["fileType"] = this.fileType;
        return data;
    }
}

export class VersionListDto implements IVersionListDto {
    id?: string | undefined;
    programId?: string | undefined;
    programName?: string | undefined;
    versionNumber?: number;
    commitMessage?: string | undefined;
    createdBy?: string | undefined;
    createdByName?: string | undefined;
    createdAt?: Date;
    status?: string | undefined;
    reviewer?: string | undefined;
    reviewerName?: string | undefined;
    reviewedAt?: Date | undefined;
    fileCount?: number;
    isCurrent?: boolean;
    constructor(data?: IVersionListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.programId = _data["programId"];
            this.programName = _data["programName"];
            this.versionNumber = _data["versionNumber"];
            this.commitMessage = _data["commitMessage"];
            this.createdBy = _data["createdBy"];
            this.createdByName = _data["createdByName"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.status = _data["status"];
            this.reviewer = _data["reviewer"];
            this.reviewerName = _data["reviewerName"];
            this.reviewedAt = _data["reviewedAt"] ? new Date(_data["reviewedAt"].toString()) : <any>undefined;
            this.fileCount = _data["fileCount"];
            this.isCurrent = _data["isCurrent"];
        }
    }
    static fromJS(data: any): VersionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionListDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["programId"] = this.programId;
        data["programName"] = this.programName;
        data["versionNumber"] = this.versionNumber;
        data["commitMessage"] = this.commitMessage;
        data["createdBy"] = this.createdBy;
        data["createdByName"] = this.createdByName;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["reviewer"] = this.reviewer;
        data["reviewerName"] = this.reviewerName;
        data["reviewedAt"] = this.reviewedAt ? this.reviewedAt.toISOString() : <any>undefined;
        data["fileCount"] = this.fileCount;
        data["isCurrent"] = this.isCurrent;
        return data;
    }
}

export class VersionListDtoPagedResponse implements IVersionListDtoPagedResponse {
    items?: VersionListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
    constructor(data?: IVersionListDtoPagedResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(VersionListDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            (<any>this).hasPreviousPage = _data["hasPreviousPage"];
            (<any>this).hasNextPage = _data["hasNextPage"];
        }
    }
    static fromJS(data: any): VersionListDtoPagedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new VersionListDtoPagedResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item ? item.toJSON() : <any>undefined);
        }
        data["pageNumber"] = this.pageNumber;
        data["pageSize"] = this.pageSize;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export class VersionListDtoPagedResponseApiResponse implements IVersionListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IVersionListDtoPagedResponseApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? VersionListDtoPagedResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionListDtoPagedResponseApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new VersionListDtoPagedResponseApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionReviewDto implements IVersionReviewDto {
    id?: string | undefined;
    versionId?: string | undefined;
    status?: string | undefined;
    comments?: string | undefined;
    reviewedBy?: string | undefined;
    reviewedByName?: string | undefined;
    reviewedAt?: Date;
    constructor(data?: IVersionReviewDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.versionId = _data["versionId"];
            this.status = _data["status"];
            this.comments = _data["comments"];
            this.reviewedBy = _data["reviewedBy"];
            this.reviewedByName = _data["reviewedByName"];
            this.reviewedAt = _data["reviewedAt"] ? new Date(_data["reviewedAt"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionReviewDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionReviewDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["versionId"] = this.versionId;
        data["status"] = this.status;
        data["comments"] = this.comments;
        data["reviewedBy"] = this.reviewedBy;
        data["reviewedByName"] = this.reviewedByName;
        data["reviewedAt"] = this.reviewedAt ? this.reviewedAt.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionReviewDtoApiResponse implements IVersionReviewDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionReviewDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IVersionReviewDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? VersionReviewDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionReviewDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new VersionReviewDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionReviewSubmissionDto implements IVersionReviewSubmissionDto {
    status!: string;
    comments!: string;
    constructor(data?: IVersionReviewSubmissionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.status = _data["status"];
            this.comments = _data["comments"];
        }
    }
    static fromJS(data: any): VersionReviewSubmissionDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionReviewSubmissionDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["status"] = this.status;
        data["comments"] = this.comments;
        return data;
    }
}

export class VersionSearchDto implements IVersionSearchDto {
    programId?: string | undefined;
    createdBy?: string | undefined;
    reviewer?: string | undefined;
    status?: string | undefined;
    createdFrom?: Date | undefined;
    createdTo?: Date | undefined;
    reviewedFrom?: Date | undefined;
    reviewedTo?: Date | undefined;
    versionNumberFrom?: number | undefined;
    versionNumberTo?: number | undefined;
    constructor(data?: IVersionSearchDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.programId = _data["programId"];
            this.createdBy = _data["createdBy"];
            this.reviewer = _data["reviewer"];
            this.status = _data["status"];
            this.createdFrom = _data["createdFrom"] ? new Date(_data["createdFrom"].toString()) : <any>undefined;
            this.createdTo = _data["createdTo"] ? new Date(_data["createdTo"].toString()) : <any>undefined;
            this.reviewedFrom = _data["reviewedFrom"] ? new Date(_data["reviewedFrom"].toString()) : <any>undefined;
            this.reviewedTo = _data["reviewedTo"] ? new Date(_data["reviewedTo"].toString()) : <any>undefined;
            this.versionNumberFrom = _data["versionNumberFrom"];
            this.versionNumberTo = _data["versionNumberTo"];
        }
    }
    static fromJS(data: any): VersionSearchDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionSearchDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["programId"] = this.programId;
        data["createdBy"] = this.createdBy;
        data["reviewer"] = this.reviewer;
        data["status"] = this.status;
        data["createdFrom"] = this.createdFrom ? this.createdFrom.toISOString() : <any>undefined;
        data["createdTo"] = this.createdTo ? this.createdTo.toISOString() : <any>undefined;
        data["reviewedFrom"] = this.reviewedFrom ? this.reviewedFrom.toISOString() : <any>undefined;
        data["reviewedTo"] = this.reviewedTo ? this.reviewedTo.toISOString() : <any>undefined;
        data["versionNumberFrom"] = this.versionNumberFrom;
        data["versionNumberTo"] = this.versionNumberTo;
        return data;
    }
}

export class VersionStatsDto implements IVersionStatsDto {
    totalFiles?: number;
    totalSize?: number;
    fileTypeCount?: { [key: string]: number; } | undefined;
    executionCount?: number;
    isCurrentVersion?: boolean;
    constructor(data?: IVersionStatsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.totalFiles = _data["totalFiles"];
            this.totalSize = _data["totalSize"];
            if (_data["fileTypeCount"]) {
                this.fileTypeCount = {} as any;
                for (let key in _data["fileTypeCount"]) {
                    if (_data["fileTypeCount"].hasOwnProperty(key))
                        (<any>this.fileTypeCount)![key] = _data["fileTypeCount"][key];
                }
            }
            this.executionCount = _data["executionCount"];
            this.isCurrentVersion = _data["isCurrentVersion"];
        }
    }
    static fromJS(data: any): VersionStatsDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionStatsDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalFiles"] = this.totalFiles;
        data["totalSize"] = this.totalSize;
        if (this.fileTypeCount) {
            data["fileTypeCount"] = {};
            for (let key in this.fileTypeCount) {
                if (this.fileTypeCount.hasOwnProperty(key))
                    (<any>data["fileTypeCount"])[key] = (<any>this.fileTypeCount)[key];
            }
        }
        data["executionCount"] = this.executionCount;
        data["isCurrentVersion"] = this.isCurrentVersion;
        return data;
    }
}

export class VersionStatsDtoApiResponse implements IVersionStatsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionStatsDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IVersionStatsDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? VersionStatsDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): VersionStatsDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new VersionStatsDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class VersionStatusUpdateDto implements IVersionStatusUpdateDto {
    status!: string;
    comments?: string | undefined;
    constructor(data?: IVersionStatusUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.status = _data["status"];
            this.comments = _data["comments"];
        }
    }
    static fromJS(data: any): VersionStatusUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionStatusUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["status"] = this.status;
        data["comments"] = this.comments;
        return data;
    }
}

export class VersionUpdateDto implements IVersionUpdateDto {
    commitMessage?: string | undefined;
    reviewComments?: string | undefined;
    constructor(data?: IVersionUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.commitMessage = _data["commitMessage"];
            this.reviewComments = _data["reviewComments"];
        }
    }
    static fromJS(data: any): VersionUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new VersionUpdateDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["commitMessage"] = this.commitMessage;
        data["reviewComments"] = this.reviewComments;
        return data;
    }
}

export class WebAppDeploymentRequestDto implements IWebAppDeploymentRequestDto {
    configuration?: { [key: string]: any; } | undefined;
    environment?: { [key: string]: string; } | undefined;
    features?: string[] | undefined;
    autoStart?: boolean;
    port?: number | undefined;
    domainName?: string | undefined;
    constructor(data?: IWebAppDeploymentRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            if (Array.isArray(_data["features"])) {
                this.features = [] as any;
                for (let item of _data["features"])
                    this.features!.push(item);
            }
            this.autoStart = _data["autoStart"];
            this.port = _data["port"];
            this.domainName = _data["domainName"];
        }
    }
    static fromJS(data: any): WebAppDeploymentRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new WebAppDeploymentRequestDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        if (Array.isArray(this.features)) {
            data["features"] = [];
            for (let item of this.features)
                data["features"].push(item);
        }
        data["autoStart"] = this.autoStart;
        data["port"] = this.port;
        data["domainName"] = this.domainName;
        return data;
    }
}

export class WebAppStatusDto implements IWebAppStatusDto {
    status?: string | undefined;
    url?: string | undefined;
    isHealthy?: boolean;
    lastHealthCheck?: Date;
    responseTime?: number;
    errorMessage?: string | undefined;
    metrics?: { [key: string]: any; } | undefined;
    constructor(data?: IWebAppStatusDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.status = _data["status"];
            this.url = _data["url"];
            this.isHealthy = _data["isHealthy"];
            this.lastHealthCheck = _data["lastHealthCheck"] ? new Date(_data["lastHealthCheck"].toString()) : <any>undefined;
            this.responseTime = _data["responseTime"];
            this.errorMessage = _data["errorMessage"];
            if (_data["metrics"]) {
                this.metrics = {} as any;
                for (let key in _data["metrics"]) {
                    if (_data["metrics"].hasOwnProperty(key))
                        (<any>this.metrics)![key] = _data["metrics"][key];
                }
            }
        }
    }
    static fromJS(data: any): WebAppStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new WebAppStatusDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["status"] = this.status;
        data["url"] = this.url;
        data["isHealthy"] = this.isHealthy;
        data["lastHealthCheck"] = this.lastHealthCheck ? this.lastHealthCheck.toISOString() : <any>undefined;
        data["responseTime"] = this.responseTime;
        data["errorMessage"] = this.errorMessage;
        if (this.metrics) {
            data["metrics"] = {};
            for (let key in this.metrics) {
                if (this.metrics.hasOwnProperty(key))
                    (<any>data["metrics"])[key] = (<any>this.metrics)[key];
            }
        }
        return data;
    }
}

export class WebAppStatusDtoApiResponse implements IWebAppStatusDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WebAppStatusDto;
    errors?: string[] | undefined;
    timestamp?: Date;
    constructor(data?: IWebAppStatusDtoApiResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.data = _data["data"] ? WebAppStatusDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): WebAppStatusDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WebAppStatusDtoApiResponse();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["data"] = this.data ? this.data.toJSON() : <any>undefined;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item);
        }
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        return data;
    }
}

export class NoiseMeasurementsForBuildings implements INoiseMeasurementsForBuildings {
    control?: number;
    security?: number;
    switchyard?: number;
    constructor(data?: INoiseMeasurementsForBuildings) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            this.control = _data["Control"];
            this.security = _data["Security"];
            this.switchyard = _data["Switchyard"];
        }
    }
    static fromJS(data: any): NoiseMeasurementsForBuildings {
        data = typeof data === 'object' ? data : {};
        let result = new NoiseMeasurementsForBuildings();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Control"] = this.control;
        data["Security"] = this.security;
        data["Switchyard"] = this.switchyard;
        return data;
    }
}
