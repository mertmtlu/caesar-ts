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

export interface IActiveDeploymentDto {
    programId?: string | undefined;
    programName?: string | undefined;
    version?: string | undefined;
    deploymentType?: string | undefined;
    status?: string | undefined;
    deployedAt?: Date;
    url?: string | undefined;
    healthStatus?: string | undefined;
}
export interface IActiveDeploymentDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IActiveDeploymentDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IAddressDto {
    city?: string | undefined;
    county?: string | undefined;
    district?: string | undefined;
    street?: string | undefined;
}
export interface IAddressResponseDto {
    city?: string | undefined;
    county?: string | undefined;
    district?: string | undefined;
    street?: string | undefined;
}
export interface IAlternativeTMComparisonResponseDto {
    id?: string | undefined;
    location?: ILocationRequestDto;
    address?: IAddressDto;
    hazardSummary?: IHazardSummaryResponseDto;
    distanceFromOriginal?: number;
    comparisonScore?: IComparisonScoreDto;
}
export interface IAlternativeTMComparisonResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IAlternativeTMComparisonResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IAlternativeTMCreateDto {
    tmId: string;
    location: ILocationRequestDto;
    address?: IAddressDto;
    dD1: IEarthquakeLevelDto;
    dD2: IEarthquakeLevelDto;
    dD3: IEarthquakeLevelDto;
    earthquakeScenario?: IEarthquakeLevelDto;
    pollution: IPollutionDto;
    fireHazard: IFireHazardDto;
    securityHazard: ISecurityHazardDto;
    noiseHazard: INoiseHazardDto;
    avalancheHazard: IAvalancheHazardDto;
    landslideHazard: ILandslideHazardDto;
    rockFallHazard: IRockFallHazardDto;
    floodHazard: IFloodHazardDto;
    tsunamiHazard: ITsunamiHazardDto;
    soil: ISoilDto;
}
export interface IAlternativeTMDetailResponseDto {
    id?: string | undefined;
    tmId?: string | undefined;
    location?: ILocationResponseDto;
    address?: IAddressResponseDto;
    dD1?: IEarthquakeLevelResponseDto;
    dD2?: IEarthquakeLevelResponseDto;
    dD3?: IEarthquakeLevelResponseDto;
    earthquakeScenario?: IEarthquakeLevelResponseDto;
    tm?: ITMSummaryResponseDto;
    pollution?: IPollutionResponseDto;
    fireHazard?: IFireHazardResponseDto;
    securityHazard?: ISecurityHazardResponseDto;
    noiseHazard?: INoiseHazardResponseDto;
    avalancheHazard?: IAvalancheHazardResponseDto;
    landslideHazard?: ILandslideHazardResponseDto;
    rockFallHazard?: IRockFallHazardResponseDto;
    floodHazard?: IFloodHazardResponseDto;
    tsunamiHazard?: ITsunamiHazardResponseDto;
    soil?: ISoilResponseDto;
    hazardSummary?: IHazardSummaryResponseDto;
}
export interface IAlternativeTMDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IAlternativeTMDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IAlternativeTMResponseDto {
    id?: string | undefined;
    tmId?: string | undefined;
    location?: ILocationResponseDto;
    address?: IAddressResponseDto;
    dD1?: IEarthquakeLevelResponseDto;
    dD2?: IEarthquakeLevelResponseDto;
    dD3?: IEarthquakeLevelResponseDto;
    earthquakeScenario?: IEarthquakeLevelResponseDto;
}
export interface IAlternativeTMResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IAlternativeTMResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IAlternativeTMSummaryResponseDto {
    id?: string | undefined;
    location?: ILocationResponseDto;
    city?: string | undefined;
    overallRiskScore?: number;
}
export interface IAlternativeTMSummaryResponseDtoPagedResponse {
    items?: IAlternativeTMSummaryResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}
export interface IAlternativeTMSummaryResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IAlternativeTMSummaryResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IAlternativeTMUpdateDto {
    tmId?: string | undefined;
    location?: ILocationRequestDto;
    address?: IAddressDto;
    dD1?: IEarthquakeLevelDto;
    dD2?: IEarthquakeLevelDto;
    dD3?: IEarthquakeLevelDto;
    earthquakeScenario?: IEarthquakeLevelDto;
    pollution?: IPollutionDto;
    fireHazard?: IFireHazardDto;
    securityHazard?: ISecurityHazardDto;
    noiseHazard?: INoiseHazardDto;
    avalancheHazard?: IAvalancheHazardDto;
    landslideHazard?: ILandslideHazardDto;
    rockFallHazard?: IRockFallHazardDto;
    floodHazard?: IFloodHazardDto;
    tsunamiHazard?: ITsunamiHazardDto;
    soil?: ISoilDto;
}
export interface IAppDeploymentConfigUpdateDto {
    configuration?: { [key: string]: any; } | undefined;
    environment?: { [key: string]: string; } | undefined;
    supportedFeatures?: string[] | undefined;
    domainName?: string | undefined;
    port?: number | undefined;
}
export interface IAppDeploymentInfo {
    deploymentType?: AppDeploymentType;
    configuration?: { [key: string]: any; } | undefined;
    lastDeployed?: Date | undefined;
    status?: string | undefined;
    supportedFeatures?: string[] | undefined;
}
export interface IAppDeploymentRequestDto {
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
}
export interface IApplicationHealthDto {
    status?: string | undefined;
    lastCheck?: Date;
    responseTimeMs?: number;
    errorMessage?: string | undefined;
    details?: { [key: string]: any; } | undefined;
    checks?: IHealthCheckResultDto[] | undefined;
}
export interface IApplicationHealthDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IApplicationHealthDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IApplicationMetricsDto {
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
}
export interface IApplicationMetricsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IApplicationMetricsDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IAuditInfoResponseDto {
    createdAt?: Date;
    updatedAt?: Date | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
}
export interface IAuthenticationResponseDto {
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    expiresAt?: Date;
    tokenType?: string | undefined;
    user?: IUserDto;
}
export interface IAuthenticationResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IAuthenticationResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IAvalancheHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory: number;
    incident?: string | undefined;
    incidentDescription?: string | undefined;
    snowDepth?: number;
    firstHillLocation?: ILocationRequestDto;
    elevationDifference?: number;
}
export interface IAvalancheHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;
    incident?: string | undefined;
    incidentDescription?: string | undefined;
    snowDepth?: number;
    firstHillLocation?: ILocationResponseDto;
    elevationDifference?: number;
}
export interface IBlockResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    modelingType?: string | undefined;
    xAxisLength?: number;
    yAxisLength?: number;
    storeyHeight?: { [key: string]: number; } | undefined;
    longLength?: number;
    shortLength?: number;
    totalHeight?: number;
}
export interface IBlockResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IBlockResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IBlockResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IBlockResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IBlockStatisticsResponseDto {
    blockId?: string | undefined;
    modelingType?: string | undefined;
    area?: number;
    height?: number;
    storeyCount?: number;
    aspectRatio?: number;
    volumeEstimate?: number;
}
export interface IBlockStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IBlockStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IBlockSummaryResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    modelingType?: string | undefined;
    totalHeight?: number;
    storeyCount?: number;
}
export interface IBlockSummaryResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IBlockSummaryResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IBooleanApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: boolean;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IBuildingBlockAddDto {
    blockId: string;
}
export interface IBuildingCreateDto {
    tmId: string;
    buildingTMID: number;
    name?: string | undefined;
    type: BuildingType;
    inScopeOfMETU?: boolean;
    reportName?: string | undefined;
}
export interface IBuildingDetailResponseDto {
    id?: string | undefined;
    tmId?: string | undefined;
    buildingTMID?: number;
    name?: string | undefined;
    type?: string | undefined;
    inScopeOfMETU?: boolean;
    reportName?: string | undefined;
    code?: number;
    bks?: number;
    tm?: ITMSummaryResponseDto;
    blocks?: IBlockResponseDto[] | undefined;
    blockCount?: number;
    auditInfo?: IAuditInfoResponseDto;
}
export interface IBuildingDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IBuildingDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IBuildingListResponseDto {
    id?: string | undefined;
    tmName?: string | undefined;
    buildingTMID?: number;
    name?: string | undefined;
    type?: string | undefined;
    inScopeOfMETU?: boolean;
    blockCount?: number;
    reportName?: string | undefined;
}
export interface IBuildingListResponseDtoPagedResponse {
    items?: IBuildingListResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}
export interface IBuildingListResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IBuildingListResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IBuildingResponseDto {
    id?: string | undefined;
    tmId?: string | undefined;
    buildingTMID?: number;
    name?: string | undefined;
    type?: string | undefined;
    inScopeOfMETU?: boolean;
    reportName?: string | undefined;
    code?: number;
    bks?: number;
}
export interface IBuildingResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IBuildingResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IBuildingSearchDto {
    name?: string | undefined;
    tmId?: string | undefined;
    type?: BuildingType;
    inScopeOfMETU?: boolean | undefined;
    reportName?: string | undefined;
}
export interface IBuildingStatisticsResponseDto {
    buildingId?: string | undefined;
    blockCount?: number;
    concreteBlockCount?: number;
    masonryBlockCount?: number;
    totalArea?: number;
    maxHeight?: number;
    code?: number;
    bks?: number;
}
export interface IBuildingStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IBuildingStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IBuildingSummaryResponseDto {
    id?: string | undefined;
    buildingTMID?: number;
    name?: string | undefined;
    type?: string | undefined;
    blockCount?: number;
}
export interface IBuildingUpdateDto {
    tmId?: string | undefined;
    buildingTMID?: number | undefined;
    name?: string | undefined;
    type?: BuildingType;
    inScopeOfMETU?: boolean | undefined;
    reportName?: string | undefined;
}
export interface IBulkOperationResult {
    successCount?: number;
    failureCount?: number;
    totalProcessed?: number;
    errors?: string[] | undefined;
}
export interface IBulkOperationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IBulkOperationResult;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IBulkRequestStatusUpdateDto {
    requestIds: string[];
    status: string;
    reason?: string | undefined;
}
export interface IClientCreateDto {
    name: string;
    type: ClientType;
}
export interface IClientDetailResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    regionCount?: number;
    regions?: IRegionSummaryResponseDto[] | undefined;
    auditInfo?: IAuditInfoResponseDto;
}
export interface IClientDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IClientDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IClientListResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    regionCount?: number;
    totalTMCount?: number;
}
export interface IClientListResponseDtoPagedResponse {
    items?: IClientListResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}
export interface IClientListResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IClientListResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IClientResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    type?: string | undefined;
}
export interface IClientResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IClientResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IClientStatisticsResponseDto {
    clientId?: string | undefined;
    regionCount?: number;
    totalTMs?: number;
    totalBuildings?: number;
    activeTMs?: number;
}
export interface IClientStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IClientStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IClientSummaryResponseDto {
    id?: string | undefined;
    name?: string | undefined;
}
export interface IClientUpdateDto {
    name?: string | undefined;
    type?: ClientType;
}
export interface IComparisonScoreDto {
    earthquakeImprovement?: number;
    hazardImprovement?: number;
    overallImprovement?: number;
    advantages?: string[] | undefined;
    disadvantages?: string[] | undefined;
}
export interface IConcreteBlockResponseDto {
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
}
export interface IConcreteBlockResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IConcreteBlockResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IConcreteBlockResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IConcreteBlockResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IConcreteCreateDto {
    id: string;
    name: string;
    xAxisLength: number;
    yAxisLength: number;
    storeyHeight: { [key: string]: number; };
    compressiveStrengthOfConcrete: number;
    yieldStrengthOfSteel: number;
    transverseReinforcementSpacing: number;
    reinforcementRatio: number;
    hookExists?: boolean;
    isStrengthened?: boolean;
}
export interface IConcreteUpdateDto {
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
}
export interface IConnectionTestResult {
    isConnected?: boolean;
    responseTimeMs?: number;
    statusCode?: number;
    message?: string | undefined;
    testedAt?: Date;
}
export interface IConnectionTestResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IConnectionTestResult;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IContainerDeploymentRequestDto {
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
    portMappings?: IContainerPortMappingDto[] | undefined;
    volumeMounts?: IContainerVolumeMountDto[] | undefined;
    resourceLimits?: IContainerResourceLimitsDto;
    replicas?: number;
    healthCheck?: IContainerHealthCheckDto;
}
export interface IContainerHealthCheckDto {
    command?: string | undefined;
    intervalSeconds?: number;
    timeoutSeconds?: number;
    retries?: number;
    startPeriodSeconds?: number;
}
export interface IContainerPortMappingDto {
    containerPort?: number;
    hostPort?: number | undefined;
    protocol?: string | undefined;
}
export interface IContainerResourceLimitsDto {
    cpuLimit?: string | undefined;
    memoryLimit?: string | undefined;
    cpuRequest?: string | undefined;
    memoryRequest?: string | undefined;
}
export interface IContainerVolumeMountDto {
    containerPath?: string | undefined;
    hostPath?: string | undefined;
    type?: string | undefined;
    readOnly?: boolean;
}
export interface ICopyBlockDto {
    newBlockId: string | undefined;
    newName?: string | undefined;
}
export interface ICreateFromTMDto {
    location: ILocationRequestDto;
    address?: IAddressDto;
    copyHazardData?: boolean;
    copyEarthquakeData?: boolean;
}
export interface IDeploymentHistoryDto {
    id?: string | undefined;
    programId?: string | undefined;
    version?: string | undefined;
    deploymentType?: string | undefined;
    status?: string | undefined;
    deployedAt?: Date;
    deployedBy?: string | undefined;
    duration?: string;
    errorMessage?: string | undefined;
}
export interface IDeploymentHistoryDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IDeploymentHistoryDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IDeploymentResourceUsageDto {
    programId?: string | undefined;
    cpuUsagePercent?: number;
    memoryUsageMB?: number;
    diskUsageMB?: number;
    networkInMB?: number;
    networkOutMB?: number;
    lastUpdated?: Date;
}
export interface IDeploymentResourceUsageDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IDeploymentResourceUsageDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IDeploymentStatisticsDto {
    totalDeployments?: number;
    successfulDeployments?: number;
    failedDeployments?: number;
    activeDeployments?: number;
    deploymentsByType?: { [key: string]: number; } | undefined;
    averageDeploymentTime?: string;
    fromDate?: Date;
    toDate?: Date;
}
export interface IDeploymentStatisticsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IDeploymentStatisticsDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IDeploymentValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    recommendations?: string[] | undefined;
    validatedConfiguration?: { [key: string]: any; } | undefined;
}
export interface IDeploymentValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IDeploymentValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IDownloadRequest {
    downloadPath?: string | undefined;
}
export interface IEarthquakeLevelDto {
    pga?: number;
    pgv?: number;
    ss?: number;
    s1?: number;
    sds?: number;
    sd1?: number;
}
export interface IEarthquakeLevelResponseDto {
    pga?: number;
    pgv?: number;
    ss?: number;
    s1?: number;
    sds?: number;
    sd1?: number;
}
export interface IExecutionCleanupReportDto {
    cleanupDate?: Date;
    executionsRemoved?: number;
    spaceFreed?: number;
    daysRetained?: number;
    removedByStatus?: { [key: string]: number; } | undefined;
}
export interface IExecutionCleanupReportDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionCleanupReportDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionDetailDto {
    id?: string | undefined;
    programId?: string | undefined;
    versionId?: string | undefined;
    userId?: string | undefined;
    executionType?: string | undefined;
    startedAt?: Date;
    completedAt?: Date | undefined;
    status?: string | undefined;
    parameters?: any | undefined;
    results?: IExecutionResultDto;
    resourceUsage?: IExecutionResourceUsageDto;
    programName?: string | undefined;
    userName?: string | undefined;
    versionNumber?: number | undefined;
    outputFiles?: IExecutionOutputFileDto[] | undefined;
    recentLogs?: string[] | undefined;
    environment?: IExecutionEnvironmentDto;
    webAppUrl?: string | undefined;
    webAppStatus?: IWebAppStatusDto;
}
export interface IExecutionDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionDto {
    id?: string | undefined;
    programId?: string | undefined;
    versionId?: string | undefined;
    userId?: string | undefined;
    executionType?: string | undefined;
    startedAt?: Date;
    completedAt?: Date | undefined;
    status?: string | undefined;
    parameters?: any | undefined;
    results?: IExecutionResultDto;
    resourceUsage?: IExecutionResourceUsageDto;
}
export interface IExecutionDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionEnvironmentDto {
    programId?: string | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: IExecutionResourceLimitsDto;
    configuration?: { [key: string]: any; } | undefined;
    lastUpdated?: Date;
}
export interface IExecutionEnvironmentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionEnvironmentDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionEnvironmentUpdateDto {
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: IExecutionResourceLimitsDto;
    configuration?: { [key: string]: any; } | undefined;
}
export interface IExecutionListDto {
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
    resourceUsage?: IExecutionResourceUsageDto;
}
export interface IExecutionListDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionListDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionListDtoPagedResponse {
    items?: IExecutionListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}
export interface IExecutionListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionOutputFileContentDto {
    fileName?: string | undefined;
    contentType?: string | undefined;
    content?: string | undefined;
    size?: number;
    createdAt?: Date;
}
export interface IExecutionOutputFileContentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionOutputFileContentDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionOutputFileDto {
    fileName?: string | undefined;
    path?: string | undefined;
    size?: number;
    contentType?: string | undefined;
    createdAt?: Date;
    downloadUrl?: string | undefined;
}
export interface IExecutionOutputFileDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionOutputFileDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionParametersDto {
    programId: string;
    versionId?: string | undefined;
    parameters?: any | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: IExecutionResourceLimitsDto;
    saveResults?: boolean;
    timeoutMinutes?: number;
    executionName?: string | undefined;
}
export interface IExecutionPerformanceDto {
    programId?: string | undefined;
    programName?: string | undefined;
    executionCount?: number;
    successRate?: number;
    averageExecutionTime?: number;
    averageResourceUsage?: number;
    lastExecution?: Date;
}
export interface IExecutionPerformanceDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionPerformanceDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionQueueStatusDto {
    queueLength?: number;
    runningExecutions?: number;
    maxConcurrentExecutions?: number;
    averageWaitTime?: number;
    queuedExecutions?: IExecutionListDto[] | undefined;
}
export interface IExecutionQueueStatusDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionQueueStatusDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionResourceLimitsDto {
    maxCpuPercentage?: number;
    maxMemoryMb?: number;
    maxDiskMb?: number;
    maxExecutionTimeMinutes?: number;
    maxConcurrentExecutions?: number;
}
export interface IExecutionResourceLimitsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionResourceLimitsDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionResourceLimitsUpdateDto {
    maxCpuPercentage?: number | undefined;
    maxMemoryMb?: number | undefined;
    maxDiskMb?: number | undefined;
    maxExecutionTimeMinutes?: number | undefined;
    maxConcurrentExecutions?: number | undefined;
}
export interface IExecutionResourceTrendDto {
    timestamp?: Date;
    cpuUsage?: number;
    memoryUsage?: number;
    diskUsage?: number;
    activeExecutions?: number;
}
export interface IExecutionResourceTrendDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionResourceTrendDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionResourceUpdateDto {
    cpuTime?: number;
    memoryUsed?: number;
    diskUsed?: number;
    additionalMetrics?: { [key: string]: any; } | undefined;
}
export interface IExecutionResourceUsageDto {
    cpuTime?: number;
    memoryUsed?: number;
    diskUsed?: number;
    cpuPercentage?: number;
    memoryPercentage?: number;
    diskPercentage?: number;
    lastUpdated?: Date;
}
export interface IExecutionResourceUsageDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionResourceUsageDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionResultDto {
    exitCode?: number;
    output?: string | undefined;
    outputFiles?: string[] | undefined;
    error?: string | undefined;
    webAppUrl?: string | undefined;
    completedAt?: Date | undefined;
}
export interface IExecutionResultDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionResultDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionScheduleRequestDto {
    scheduledTime?: Date;
    parameters?: any | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: IExecutionResourceLimitsDto;
    saveResults?: boolean;
    description?: string | undefined;
}
export interface IExecutionSearchDto {
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
}
export interface IExecutionSecurityScanResult {
    isSecure?: boolean;
    securityIssues?: string[] | undefined;
    securityWarnings?: string[] | undefined;
    riskLevel?: number;
    scanDate?: Date;
}
export interface IExecutionSecurityScanResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionSecurityScanResult;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionStatsDto {
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
}
export interface IExecutionStatsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionStatsDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionStatusDto {
    id?: string | undefined;
    status?: string | undefined;
    startedAt?: Date;
    completedAt?: Date | undefined;
    progress?: number | undefined;
    currentStep?: string | undefined;
    resourceUsage?: IExecutionResourceUsageDto;
    statusMessage?: string | undefined;
}
export interface IExecutionStatusDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionStatusDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionSummaryDto {
    userId?: string | undefined;
    totalExecutions?: number;
    successfulExecutions?: number;
    failedExecutions?: number;
    totalCpuTime?: number;
    totalMemoryUsed?: number;
    lastExecution?: Date | undefined;
    programPerformance?: IExecutionPerformanceDto[] | undefined;
}
export interface IExecutionSummaryDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionSummaryDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionTemplateDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    language?: string | undefined;
    parameterSchema?: any | undefined;
    defaultEnvironment?: { [key: string]: string; } | undefined;
    defaultResourceLimits?: IExecutionResourceLimitsDto;
}
export interface IExecutionTemplateDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionTemplateDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionTrendDto {
    date?: Date;
    executionCount?: number;
    successfulCount?: number;
    failedCount?: number;
    averageExecutionTime?: number;
    totalResourceUsage?: number;
}
export interface IExecutionTrendDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionTrendDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IExecutionValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    recommendedLimits?: IExecutionResourceLimitsDto;
}
export interface IExecutionValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IExecutionValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IFileStorageResult {
    filePath?: string | undefined;
    storageKey?: string | undefined;
    hash?: string | undefined;
    size?: number;
    contentType?: string | undefined;
    success?: boolean;
    errorMessage?: string | undefined;
}
export interface IFileStorageResultListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IFileStorageResult[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IFileValidationRequest {
    fileName: string;
    content: string;
    contentType: string;
}
export interface IFileValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    suggestedContentType?: string | undefined;
}
export interface IFileValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IFileValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IFireHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory: number;
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
}
export interface IFireHazardResponseDto {
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
}
export interface IFloodHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory: number;
    incident?: string | undefined;
    incidentDescription?: string | undefined;
    drainageSystem?: string | undefined;
    basementFlooding?: string | undefined;
    extremeEventCondition?: string | undefined;
}
export interface IFloodHazardResponseDto {
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
}
export interface IHazardResponseDto {
    score?: number;
    level?: string | undefined;
    description?: string | undefined;
    hasCCTV?: boolean | undefined;
}
export interface IHazardSummaryResponseDto {
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
}
export interface IHealthCheckResultDto {
    name?: string | undefined;
    status?: string | undefined;
    checkedAt?: Date;
    durationMs?: number;
    message?: string | undefined;
}
export interface IInt32ApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: number;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface ILandslideHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory: number;
}
export interface ILandslideHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;
}
export interface ILocationRequestDto {
    latitude: number;
    longitude: number;
}
export interface ILocationResponseDto {
    latitude?: number;
    longitude?: number;
}
export interface IMasonryBlockResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    modelingType?: string | undefined;
    xAxisLength?: number;
    yAxisLength?: number;
    storeyHeight?: { [key: string]: number; } | undefined;
    longLength?: number;
    shortLength?: number;
    totalHeight?: number;
    unitTypeList?: IMasonryUnitTypeResponseDto[] | undefined;
}
export interface IMasonryBlockResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IMasonryBlockResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IMasonryBlockResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IMasonryBlockResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IMasonryCreateDto {
    id: string;
    name: string;
    xAxisLength: number;
    yAxisLength: number;
    storeyHeight: { [key: string]: number; };
    unitTypeList?: IMasonryUnitType[] | undefined;
}
export interface IMasonryUnitType {
}
export interface IMasonryUnitTypeResponseDto {
}
export interface IMasonryUpdateDto {
    id?: string | undefined;
    name?: string | undefined;
    xAxisLength?: number | undefined;
    yAxisLength?: number | undefined;
    storeyHeight?: { [key: string]: number; } | undefined;
    unitTypeList?: IMasonryUnitType[] | undefined;
}
export interface INoiseHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory: number;
    noiseMeasurementsForBuildings?: INoiseMeasurementsForBuildings | undefined;
    noiseMeasurementsForCoordinates?: { [key: string]: number; } | undefined;
    residentialArea?: boolean;
    exists?: boolean;
    extremeNoise?: boolean;
    extremeNoiseDescription?: string | undefined;
}
export interface INoiseHazardResponseDto {
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
}
export interface IPasswordResetResponseDto {
    success?: boolean;
    message?: string | undefined;
}
export interface IPasswordResetResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IPasswordResetResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IPollutionDto {
    pollutantLocation: ILocationRequestDto;
    pollutantNo: number;
    pollutantSource?: string | undefined;
    pollutantDistance?: number;
    pollutantLevel?: Level;
}
export interface IPollutionResponseDto {
    pollutantLocation?: ILocationResponseDto;
    pollutantNo?: number;
    pollutantSource?: string | undefined;
    pollutantDistance?: number;
    pollutantLevel?: string | undefined;
}
export interface IProgramComponentMappingDto {
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
}
export interface IProgramComponentMappingDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IProgramComponentMappingDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IProgramCreateDto {
    name: string;
    description?: string | undefined;
    type: string;
    language: string;
    mainFile?: string | undefined;
    uiType: string;
    uiConfiguration?: any | undefined;
    metadata?: any | undefined;
    deploymentInfo?: IAppDeploymentInfo;
}
export interface IProgramDeploymentDto {
    id?: string | undefined;
    deploymentType?: AppDeploymentType;
    status?: string | undefined;
    lastDeployed?: Date | undefined;
    configuration?: { [key: string]: any; } | undefined;
    supportedFeatures?: string[] | undefined;
    applicationUrl?: string | undefined;
    logs?: string[] | undefined;
}
export interface IProgramDeploymentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IProgramDeploymentDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IProgramDeploymentStatusDto {
    deploymentType?: AppDeploymentType;
    status?: string | undefined;
    lastDeployed?: Date | undefined;
    applicationUrl?: string | undefined;
    isHealthy?: boolean;
    lastHealthCheck?: Date;
    recentLogs?: string[] | undefined;
}
export interface IProgramDeploymentStatusDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IProgramDeploymentStatusDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IProgramDetailDto {
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
    deploymentInfo?: IAppDeploymentInfo;
    permissions?: IProgramPermissionDto[] | undefined;
    files?: IProgramFileDto[] | undefined;
    deploymentStatus?: IProgramDeploymentStatusDto;
    stats?: IProgramStatsDto;
}
export interface IProgramDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IProgramDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IProgramDto {
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
    deploymentInfo?: IAppDeploymentInfo;
}
export interface IProgramDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IProgramDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IProgramExecutionRequestDto {
    parameters?: any | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: IExecutionResourceLimitsDto;
    saveResults?: boolean;
    timeoutMinutes?: number;
}
export interface IProgramFileDto {
    path?: string | undefined;
    contentType?: string | undefined;
    size?: number;
    lastModified?: Date;
    description?: string | undefined;
    hash?: string | undefined;
}
export interface IProgramGroupPermissionDto {
    groupId: string;
    accessLevel: string;
}
export interface IProgramListDto {
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
}
export interface IProgramListDtoPagedResponse {
    items?: IProgramListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}
export interface IProgramListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IProgramListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IProgramPermissionDto {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    accessLevel?: string | undefined;
}
export interface IProgramPermissionDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IProgramPermissionDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IProgramSearchDto {
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
}
export interface IProgramStatsDto {
    totalExecutions?: number;
    successfulExecutions?: number;
    failedExecutions?: number;
    lastExecution?: Date | undefined;
    averageExecutionTime?: number;
    totalVersions?: number;
    lastUpdate?: Date | undefined;
}
export interface IProgramUpdateDto {
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    language?: string | undefined;
    mainFile?: string | undefined;
    uiType?: string | undefined;
    uiConfiguration?: any | undefined;
    metadata?: any | undefined;
    deploymentInfo?: IAppDeploymentInfo;
}
export interface IProgramUserPermissionDto {
    userId: string;
    accessLevel: string;
}
export interface IProjectComplexityDto {
    totalFiles?: number;
    totalLines?: number;
    dependencies?: number;
    complexityLevel?: string | undefined;
    complexityScore?: number;
}
export interface IProjectFileDto {
    path?: string | undefined;
    type?: string | undefined;
    size?: number;
    extension?: string | undefined;
    isEntryPoint?: boolean;
    lineCount?: number;
}
export interface IProjectSecurityScanDto {
    hasSecurityIssues?: boolean;
    issues?: ISecurityIssueDto[] | undefined;
    riskLevel?: number;
}
export interface IProjectStructureAnalysisDto {
    language?: string | undefined;
    projectType?: string | undefined;
    entryPoints?: string[] | undefined;
    configFiles?: string[] | undefined;
    sourceFiles?: string[] | undefined;
    dependencies?: string[] | undefined;
    hasBuildFile?: boolean;
    mainEntryPoint?: string | undefined;
    files?: IProjectFileDto[] | undefined;
    complexity?: IProjectComplexityDto;
    metadata?: { [key: string]: any; } | undefined;
}
export interface IProjectStructureAnalysisDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IProjectStructureAnalysisDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IProjectValidationResultDto {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    suggestions?: string[] | undefined;
    securityScan?: IProjectSecurityScanDto;
    complexity?: IProjectComplexityDto;
}
export interface IProjectValidationResultDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IProjectValidationResultDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRefreshTokenDto {
    accessToken: string;
    refreshToken: string;
}
export interface IRegionCityUpdateDto {
    action: Operation;
    cities: string[];
}
export interface IRegionCreateDto {
    clientId: string;
    regionId: number;
    cities: string[];
    headquarters: string;
}
export interface IRegionDetailResponseDto {
    id?: string | undefined;
    clientId?: string | undefined;
    regionId?: number;
    cities?: string[] | undefined;
    headquarters?: string | undefined;
    client?: IClientSummaryResponseDto;
    tmCount?: number;
    activeTMCount?: number;
    tMs?: ITMSummaryResponseDto[] | undefined;
    auditInfo?: IAuditInfoResponseDto;
}
export interface IRegionDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRegionDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRegionListResponseDto {
    id?: string | undefined;
    regionId?: number;
    clientName?: string | undefined;
    headquarters?: string | undefined;
    cities?: string[] | undefined;
    tmCount?: number;
    activeTMCount?: number;
}
export interface IRegionListResponseDtoPagedResponse {
    items?: IRegionListResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}
export interface IRegionListResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRegionListResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRegionResponseDto {
    id?: string | undefined;
    clientId?: string | undefined;
    regionId?: number;
    cities?: string[] | undefined;
    headquarters?: string | undefined;
}
export interface IRegionResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRegionResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRegionStatisticsResponseDto {
    regionId?: string | undefined;
    cityCount?: number;
    tmCount?: number;
    activeTMCount?: number;
    buildingCount?: number;
    tMsPerCity?: { [key: string]: number; } | undefined;
}
export interface IRegionStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRegionStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRegionSummaryResponseDto {
    id?: string | undefined;
    regionId?: number;
    headquarters?: string | undefined;
    cityCount?: number;
}
export interface IRegionSummaryResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRegionSummaryResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRegionUpdateDto {
    clientId?: string | undefined;
    id?: number | undefined;
    cities?: string[] | undefined;
    headquarters?: string | undefined;
}
export interface IRequestAssignmentDto {
    assignedTo: string;
    assignmentNotes?: string | undefined;
}
export interface IRequestCompletionDto {
    completionNotes: string;
    deliverableLinks?: string[] | undefined;
    completionData?: any | undefined;
}
export interface IRequestCreateDto {
    type: string;
    title: string;
    description: string;
    requestedBy?: string | undefined;
    programId?: string | undefined;
    relatedEntityId?: string | undefined;
    relatedEntityType?: string | undefined;
    priority?: string | undefined;
    metadata?: any | undefined;
}
export interface IRequestDetailDto {
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
    responses?: IRequestResponseDto[] | undefined;
    relatedEntity?: IRequestRelatedEntityDto;
    timeline?: IRequestTimelineDto;
    subscribers?: string[] | undefined;
}
export interface IRequestDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestDto {
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
}
export interface IRequestDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestFromTemplateDto {
    fieldValues: { [key: string]: any; };
    programId?: string | undefined;
    relatedEntityId?: string | undefined;
    relatedEntityType?: string | undefined;
}
export interface IRequestListDto {
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
}
export interface IRequestListDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestListDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestListDtoPagedResponse {
    items?: IRequestListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}
export interface IRequestListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestMetricDto {
    category?: string | undefined;
    label?: string | undefined;
    count?: number;
    percentage?: number;
}
export interface IRequestMetricDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestMetricDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestPerformanceDto {
    userId?: string | undefined;
    userName?: string | undefined;
    assignedCount?: number;
    completedCount?: number;
    completionRate?: number;
    averageResolutionTime?: number;
    rating?: number;
}
export interface IRequestPerformanceDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestPerformanceDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestPriorityUpdateDto {
    priority: string;
    reason?: string | undefined;
}
export interface IRequestRejectionDto {
    rejectionReason: string;
    alternativeSuggestions?: string[] | undefined;
}
export interface IRequestRelatedEntityDto {
    entityType?: string | undefined;
    entityId?: string | undefined;
    entityName?: string | undefined;
    linkDescription?: string | undefined;
}
export interface IRequestResponseCreateDto {
    message: string;
    isInternal?: boolean;
    attachments?: string[] | undefined;
}
export interface IRequestResponseDto {
    id?: string | undefined;
    requestId?: string | undefined;
    respondedBy?: string | undefined;
    respondedByName?: string | undefined;
    respondedAt?: Date;
    message?: string | undefined;
    isInternal?: boolean;
    attachments?: string[] | undefined;
}
export interface IRequestResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestResponseUpdateDto {
    message: string;
    isInternal?: boolean | undefined;
    attachments?: string[] | undefined;
}
export interface IRequestSearchDto {
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
}
export interface IRequestStatsDto {
    totalRequests?: number;
    openRequests?: number;
    inProgressRequests?: number;
    completedRequests?: number;
    rejectedRequests?: number;
    unassignedRequests?: number;
    averageResolutionTime?: number;
    requestsByType?: { [key: string]: number; } | undefined;
    requestsByPriority?: { [key: string]: number; } | undefined;
}
export interface IRequestStatsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestStatsDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestStatusUpdateDto {
    status: string;
    reason?: string | undefined;
}
export interface IRequestTemplateCreateDto {
    name: string;
    description?: string | undefined;
    type: string;
    titleTemplate: string;
    descriptionTemplate: string;
    fieldDefinitions?: any | undefined;
    priority?: string | undefined;
    isActive?: boolean;
}
export interface IRequestTemplateDto {
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
}
export interface IRequestTemplateDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestTemplateDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestTemplateDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestTemplateDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestTimelineDto {
    createdAt?: Date;
    assignedAt?: Date | undefined;
    firstResponseAt?: Date | undefined;
    completedAt?: Date | undefined;
    resolutionTime?: string | undefined;
    events?: IRequestTimelineEventDto[] | undefined;
}
export interface IRequestTimelineEventDto {
    timestamp?: Date;
    eventType?: string | undefined;
    description?: string | undefined;
    userId?: string | undefined;
    userName?: string | undefined;
}
export interface IRequestTrendDto {
    date?: Date;
    createdCount?: number;
    completedCount?: number;
    totalOpen?: number;
}
export interface IRequestTrendDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestTrendDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestUpdateDto {
    programId?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    priority?: string | undefined;
    metadata?: any | undefined;
}
export interface IRequestValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    suggestions?: IRequestValidationSuggestionDto[] | undefined;
}
export interface IRequestValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IRequestValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IRequestValidationSuggestionDto {
    field?: string | undefined;
    message?: string | undefined;
    suggestedValue?: string | undefined;
}
export interface IRevokeTokenDto {
    token: string | undefined;
}
export interface IRockFallHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory: number;
}
export interface IRockFallHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;
}
export interface IRollbackRequestDto {
    targetVersion: string;
    reason?: string | undefined;
    forceRollback?: boolean;
}
export interface ISecurityHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory: number;
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
}
export interface ISecurityHazardResponseDto {
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
}
export interface ISecurityIssueDto {
    type?: string | undefined;
    description?: string | undefined;
    file?: string | undefined;
    line?: number;
    severity?: string | undefined;
}
export interface ISoilDto {
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
}
export interface ISoilResponseDto {
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
}
export interface IStaticSiteDeploymentRequestDto {
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
}
export interface IStorageStatistics {
    programId?: string | undefined;
    totalFiles?: number;
    totalSize?: number;
    versionCount?: number;
    lastModified?: Date;
    fileTypeCount?: { [key: string]: number; } | undefined;
    fileTypeSizes?: { [key: string]: number; } | undefined;
}
export interface IStorageStatisticsApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IStorageStatistics;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IStringApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: string | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IStringListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: string[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IStringStringDictionaryApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: { [key: string]: string; } | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IStringStringListDictionaryApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: { [key: string]: string[]; } | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface ISupportedDeploymentOptionDto {
    deploymentType?: AppDeploymentType;
    name?: string | undefined;
    description?: string | undefined;
    isRecommended?: boolean;
    requiredFeatures?: string[] | undefined;
    supportedFeatures?: string[] | undefined;
    defaultConfiguration?: { [key: string]: any; } | undefined;
}
export interface ISupportedDeploymentOptionDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ISupportedDeploymentOptionDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface ITMCreateDto {
    regionId: string;
    tmId: number;
    name: string;
    type?: TMType;
    state?: TMState;
    voltages: number[];
    provisionalAcceptanceDate?: Date | undefined;
    location: ILocationRequestDto;
    address?: IAddressDto;
}
export interface ITMDetailResponseDto {
    id?: string | undefined;
    regionId?: string | undefined;
    tmId?: number;
    name?: string | undefined;
    type?: string | undefined;
    state?: string | undefined;
    voltages?: number[] | undefined;
    maxVoltage?: number;
    provisionalAcceptanceDate?: Date;
    location?: ILocationResponseDto;
    address?: IAddressResponseDto;
    region?: IRegionSummaryResponseDto;
    dD1?: IEarthquakeLevelResponseDto;
    dD2?: IEarthquakeLevelResponseDto;
    dD3?: IEarthquakeLevelResponseDto;
    earthquakeScenario?: IEarthquakeLevelResponseDto;
    pollution?: IPollutionDto;
    fireHazard?: IFireHazardDto;
    securityHazard?: ISecurityHazardDto;
    noiseHazard?: INoiseHazardDto;
    avalancheHazard?: IAvalancheHazardDto;
    landslideHazard?: ILandslideHazardDto;
    rockFallHazard?: IRockFallHazardDto;
    floodHazard?: IFloodHazardDto;
    tsunamiHazard?: ITsunamiHazardDto;
    soil?: ISoilResponseDto;
    buildingCount?: number;
    buildings?: IBuildingSummaryResponseDto[] | undefined;
    alternativeTMs?: IAlternativeTMSummaryResponseDto[] | undefined;
}
export interface ITMDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ITMDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface ITMHazardSummaryResponseDto {
    tmId?: string | undefined;
    fireHazard?: IHazardResponseDto;
    securityHazard?: IHazardResponseDto;
    floodHazard?: IHazardResponseDto;
    overallRiskScore?: number;
}
export interface ITMHazardSummaryResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ITMHazardSummaryResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface ITMListResponseDto {
    id?: string | undefined;
    tmId?: number;
    name?: string | undefined;
    regionName?: string | undefined;
    type?: string | undefined;
    state?: string | undefined;
    voltages?: number[] | undefined;
    city?: string | undefined;
    buildingCount?: number;
}
export interface ITMListResponseDtoPagedResponse {
    items?: ITMListResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}
export interface ITMListResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ITMListResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface ITMResponseDto {
    id?: string | undefined;
    regionId?: string | undefined;
    tmId?: number;
    name?: string | undefined;
    type?: string | undefined;
    state?: string | undefined;
    voltages?: number[] | undefined;
    maxVoltage?: number;
    provisionalAcceptanceDate?: Date;
    location?: ILocationResponseDto;
    address?: IAddressResponseDto;
}
export interface ITMResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ITMResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface ITMSearchDto {
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
}
export interface ITMStateUpdateDto {
    state: TMState;
}
export interface ITMStatisticsResponseDto {
    tmId?: string | undefined;
    buildingCount?: number;
    maxVoltage?: number;
    alternativeTMCount?: number;
    overallRiskScore?: number;
    daysSinceAcceptance?: number;
}
export interface ITMStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ITMStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface ITMSummaryResponseDto {
    id?: string | undefined;
    tmId?: number;
    name?: string | undefined;
    state?: string | undefined;
    maxVoltage?: number;
}
export interface ITMUpdateDto {
    regionId?: string | undefined;
    id?: number | undefined;
    name?: string | undefined;
    type?: TMType;
    state?: TMState;
    voltages?: number[] | undefined;
    provisionalAcceptanceDate?: Date | undefined;
    location?: ILocationRequestDto;
    address?: IAddressDto;
    dD1?: IEarthquakeLevelDto;
    dD2?: IEarthquakeLevelDto;
    dD3?: IEarthquakeLevelDto;
    earthquakeScenario?: IEarthquakeLevelDto;
    pollution?: IPollutionDto;
    fireHazard?: IFireHazardDto;
    securityHazard?: ISecurityHazardDto;
    noiseHazard?: INoiseHazardDto;
    avalancheHazard?: IAvalancheHazardDto;
    landslideHazard?: ILandslideHazardDto;
    rockFallHazard?: IRockFallHazardDto;
    floodHazard?: IFloodHazardDto;
    tsunamiHazard?: ITsunamiHazardDto;
    soil?: ISoilDto;
}
export interface ITMVoltageUpdateDto {
    voltages: number[];
}
export interface ITokenResponseDto {
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    expiresAt?: Date;
    tokenType?: string | undefined;
}
export interface ITokenResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ITokenResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface ITsunamiHazardDto {
    score?: number;
    level?: Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory: number;
}
export interface ITsunamiHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;
}
export interface IUiComponentAssetDto {
    path?: string | undefined;
    contentType?: string | undefined;
    assetType?: string | undefined;
    size?: number;
    lastModified?: Date;
    url?: string | undefined;
}
export interface IUiComponentAssetDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUiComponentAssetDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUiComponentAssetUploadDto {
    path: string;
    content: string;
    contentType: string;
    assetType?: string | undefined;
}
export interface IUiComponentBundleDto {
    id?: string | undefined;
    componentId?: string | undefined;
    bundleType?: string | undefined;
    assets?: IUiComponentAssetDto[] | undefined;
    dependencies?: { [key: string]: string; } | undefined;
    createdAt?: Date;
    totalSize?: number;
}
export interface IUiComponentBundleDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUiComponentBundleDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUiComponentBundleInfoDto {
    bundleType?: string | undefined;
    assetUrls?: string[] | undefined;
    dependencies?: { [key: string]: string; } | undefined;
    lastUpdated?: Date;
    totalSize?: number;
}
export interface IUiComponentBundleUploadDto {
    assets: IUiComponentAssetUploadDto[];
    dependencies?: { [key: string]: string; } | undefined;
    bundleType?: string | undefined;
}
export interface IUiComponentCategoryDto {
    name?: string | undefined;
    description?: string | undefined;
    componentCount?: number;
    subCategories?: string[] | undefined;
}
export interface IUiComponentCategoryDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUiComponentCategoryDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUiComponentCompatibilitySearchDto {
    programType: string;
    programLanguage?: string | undefined;
    requiredFeatures?: string[] | undefined;
    compatibleTypes?: string[] | undefined;
}
export interface IUiComponentConfigDto {
    componentId?: string | undefined;
    configuration?: any | undefined;
    lastUpdated?: Date;
    updatedBy?: string | undefined;
}
export interface IUiComponentConfigDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUiComponentConfigDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUiComponentConfigUpdateDto {
    configuration: any;
}
export interface IUiComponentCreateDto {
    name: string;
    description?: string | undefined;
    type: string;
    configuration?: any | undefined;
    schema?: any | undefined;
    tags?: string[] | undefined;
}
export interface IUiComponentDetailDto {
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
    assets?: IUiComponentAssetDto[] | undefined;
    bundleInfo?: IUiComponentBundleInfoDto;
    stats?: IUiComponentStatsDto;
    usage?: IUiComponentUsageDto[] | undefined;
}
export interface IUiComponentDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUiComponentDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUiComponentDto {
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
}
export interface IUiComponentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUiComponentDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUiComponentListDto {
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
}
export interface IUiComponentListDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUiComponentListDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUiComponentListDtoPagedResponse {
    items?: IUiComponentListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}
export interface IUiComponentListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUiComponentListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUiComponentMappingDto {
    componentId: string;
    mappingName: string;
    mappingConfiguration?: any | undefined;
    displayOrder?: number;
    isActive?: boolean;
}
export interface IUiComponentRecommendationDto {
    componentId?: string | undefined;
    componentName?: string | undefined;
    componentType?: string | undefined;
    programId?: string | undefined;
    versionId?: string | undefined;
    recommendationReason?: string | undefined;
    compatibilityScore?: number;
    usageCount?: number;
    rating?: number;
}
export interface IUiComponentRecommendationDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUiComponentRecommendationDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUiComponentSchemaDto {
    componentId?: string | undefined;
    schema?: any | undefined;
    lastUpdated?: Date;
    updatedBy?: string | undefined;
    isValid?: boolean;
}
export interface IUiComponentSchemaDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUiComponentSchemaDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUiComponentSchemaUpdateDto {
    schema: any;
}
export interface IUiComponentSearchDto {
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
}
export interface IUiComponentStatsDto {
    totalUsage?: number;
    activeUsage?: number;
    lastUsed?: Date | undefined;
    averageRating?: number;
    ratingCount?: number;
    totalDownloads?: number;
}
export interface IUiComponentUpdateDto {
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    configuration?: any | undefined;
    schema?: any | undefined;
    tags?: string[] | undefined;
}
export interface IUiComponentUsageDto {
    programId?: string | undefined;
    programName?: string | undefined;
    versionId?: string | undefined;
    versionNumber?: number | undefined;
    mappingName?: string | undefined;
    usedSince?: Date;
    isActive?: boolean;
    displayOrder?: number;
}
export interface IUiComponentUsageDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUiComponentUsageDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUiComponentValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    suggestions?: IUiComponentValidationSuggestionDto[] | undefined;
}
export interface IUiComponentValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUiComponentValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUiComponentValidationSuggestionDto {
    type?: string | undefined;
    message?: string | undefined;
    suggestedValue?: string | undefined;
}
export interface IUserDetailDto {
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
    assignedClients?: IClientSummaryResponseDto[] | undefined;
}
export interface IUserDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUserDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUserDto {
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
}
export interface IUserDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUserDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUserListDto {
    id?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;
    fullName?: string | undefined;
    roles?: string[] | undefined;
    isActive?: boolean;
    lastLoginDate?: Date | undefined;
}
export interface IUserListDtoPagedResponse {
    items?: IUserListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}
export interface IUserListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUserListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUserLoginDto {
    usernameOrEmail: string;
    password: string;
    rememberMe?: boolean;
}
export interface IUserPasswordChangeDto {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
export interface IUserPasswordResetDto {
    resetToken: string;
    newPassword: string;
    confirmNewPassword: string;
}
export interface IUserPasswordResetRequestDto {
    email: string;
}
export interface IUserPermissionUpdateDto {
    userId: string;
    permissions: string[];
}
export interface IUserProfileDto {
    id?: string | undefined;
    username?: string | undefined;
    fullName?: string | undefined;
    roles?: string[] | undefined;
    createdDate?: Date;
    lastLoginDate?: Date | undefined;
}
export interface IUserProfileDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IUserProfileDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IUserRegisterDto {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}
export interface IUserRoleUpdateDto {
    roles: string[];
}
export interface IUserSearchDto {
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
}
export interface IUserUpdateDto {
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
}
export interface IVersionActivityDto {
    date?: Date;
    activity?: string | undefined;
    userId?: string | undefined;
    userName?: string | undefined;
    description?: string | undefined;
}
export interface IVersionActivityDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IVersionActivityDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IVersionChangeDto {
    path?: string | undefined;
    action?: string | undefined;
    description?: string | undefined;
    impactLevel?: number;
}
export interface IVersionChangeDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IVersionChangeDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IVersionCommitDto {
    commitMessage: string;
    changes: IVersionFileChangeDto[];
}
export interface IVersionCommitValidationDto {
    changes: IVersionFileChangeDto[];
}
export interface IVersionCreateDto {
    programId: string;
    commitMessage: string;
    files?: IVersionFileCreateDto[] | undefined;
}
export interface IVersionDeploymentDto {
    id?: string | undefined;
    versionId?: string | undefined;
    status?: string | undefined;
    deployedAt?: Date;
    deployedBy?: string | undefined;
    targetEnvironments?: string[] | undefined;
    configuration?: { [key: string]: any; } | undefined;
}
export interface IVersionDeploymentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IVersionDeploymentDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IVersionDeploymentInfoDto {
    isDeployed?: boolean;
    lastDeployment?: Date | undefined;
    deploymentStatus?: string | undefined;
    environments?: string[] | undefined;
}
export interface IVersionDeploymentRequestDto {
    deploymentConfiguration?: { [key: string]: any; } | undefined;
    targetEnvironments?: string[] | undefined;
    setAsCurrent?: boolean;
}
export interface IVersionDetailDto {
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
    files?: IVersionFileDto[] | undefined;
    stats?: IVersionStatsDto;
    deploymentInfo?: IVersionDeploymentInfoDto;
}
export interface IVersionDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IVersionDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IVersionDiffDto {
    fromVersionId?: string | undefined;
    toVersionId?: string | undefined;
    fromVersionNumber?: number;
    toVersionNumber?: number;
    changes?: IVersionFileChangeSummaryDto[] | undefined;
    stats?: IVersionDiffStatsDto;
}
export interface IVersionDiffDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IVersionDiffDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IVersionDiffStatsDto {
    filesChanged?: number;
    filesAdded?: number;
    filesDeleted?: number;
    totalLinesAdded?: number;
    totalLinesRemoved?: number;
}
export interface IVersionDto {
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
}
export interface IVersionDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IVersionDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IVersionExecutionRequestDto {
    parameters?: any | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: IExecutionResourceLimitsDto;
    saveResults?: boolean;
    timeoutMinutes?: number;
}
export interface IVersionFileChangeDto {
    path: string;
    action: string;
    content?: string | undefined;
    contentType?: string | undefined;
}
export interface IVersionFileChangeSummaryDto {
    path?: string | undefined;
    action?: string | undefined;
    linesAdded?: number;
    linesRemoved?: number;
    sizeBefore?: number;
    sizeAfter?: number;
}
export interface IVersionFileCreateDto {
    path: string;
    content: string;
    contentType?: string | undefined;
    fileType?: string | undefined;
}
export interface IVersionFileDetailDto {
    path?: string | undefined;
    storageKey?: string | undefined;
    hash?: string | undefined;
    size?: number;
    fileType?: string | undefined;
    contentType?: string | undefined;
    content?: string | undefined;
    lastModified?: Date;
}
export interface IVersionFileDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IVersionFileDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IVersionFileDto {
    path?: string | undefined;
    storageKey?: string | undefined;
    hash?: string | undefined;
    size?: number;
    fileType?: string | undefined;
    contentType?: string | undefined;
}
export interface IVersionFileDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IVersionFileDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IVersionFileUpdateDto {
    content: string;
    contentType?: string | undefined;
    fileType?: string | undefined;
}
export interface IVersionListDto {
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
}
export interface IVersionListDtoPagedResponse {
    items?: IVersionListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}
export interface IVersionListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IVersionListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IVersionReviewDto {
    id?: string | undefined;
    versionId?: string | undefined;
    status?: string | undefined;
    comments?: string | undefined;
    reviewedBy?: string | undefined;
    reviewedByName?: string | undefined;
    reviewedAt?: Date;
}
export interface IVersionReviewDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IVersionReviewDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IVersionReviewSubmissionDto {
    status: string;
    comments: string;
}
export interface IVersionSearchDto {
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
}
export interface IVersionStatsDto {
    totalFiles?: number;
    totalSize?: number;
    fileTypeCount?: { [key: string]: number; } | undefined;
    executionCount?: number;
    isCurrentVersion?: boolean;
}
export interface IVersionStatsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IVersionStatsDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface IVersionStatusUpdateDto {
    status: string;
    comments?: string | undefined;
}
export interface IVersionUpdateDto {
    commitMessage?: string | undefined;
    reviewComments?: string | undefined;
}
export interface IWebAppDeploymentRequestDto {
    configuration?: { [key: string]: any; } | undefined;
    environment?: { [key: string]: string; } | undefined;
    features?: string[] | undefined;
    autoStart?: boolean;
    port?: number | undefined;
    domainName?: string | undefined;
}
export interface IWebAppStatusDto {
    status?: string | undefined;
    url?: string | undefined;
    isHealthy?: boolean;
    lastHealthCheck?: Date;
    responseTime?: number;
    errorMessage?: string | undefined;
    metrics?: { [key: string]: any; } | undefined;
}
export interface IWebAppStatusDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: IWebAppStatusDto;
    errors?: string[] | undefined;
    timestamp?: Date;
}
export interface INoiseMeasurementsForBuildings {
    control?: number;
    security?: number;
    switchyard?: number;
}