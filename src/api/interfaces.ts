import * as types from './types';
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

export interface IAlternativeTMsClient {
    /**
     * Get alternative TM by ID
     * @return OK
     */
    alternativeTMs_GetById(id: string): Promise<types.AlternativeTMDetailResponseDtoApiResponse>;
    /**
     * Update alternative TM
     * @param body (optional) 
     * @return OK
     */
    alternativeTMs_Update(id: string, body: types.AlternativeTMUpdateDto | undefined): Promise<types.AlternativeTMResponseDtoApiResponse>;
    /**
     * Delete alternative TM
     * @return OK
     */
    alternativeTMs_Delete(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Get alternative TMs by TM ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    alternativeTMs_GetByTmId(tmId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse>;
    /**
     * Get alternative TMs by city
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    alternativeTMs_GetByCity(city: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse>;
    /**
     * Get alternative TMs by county
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    alternativeTMs_GetByCounty(county: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.AlternativeTMSummaryResponseDtoPagedResponseApiResponse>;
    /**
     * Create new alternative TM
     * @param body (optional) 
     * @return OK
     */
    alternativeTMs_Create(body: types.AlternativeTMCreateDto | undefined): Promise<types.AlternativeTMResponseDtoApiResponse>;
    /**
     * Compare alternative TMs for a specific TM
     * @return OK
     */
    alternativeTMs_CompareAlternatives(tmId: string): Promise<types.AlternativeTMComparisonResponseDtoListApiResponse>;
    /**
     * Create alternative TM from existing TM
     * @param body (optional) 
     * @return OK
     */
    alternativeTMs_CreateFromTM(tmId: string, body: types.CreateFromTMDto | undefined): Promise<types.AlternativeTMResponseDtoApiResponse>;
}
export interface IAuthClient {
    /**
     * Authenticate user and return JWT token
     * @param body (optional) 
     * @return OK
     */
    auth_Login(body: types.UserLoginDto | undefined): Promise<types.AuthenticationResponseDtoApiResponse>;
    /**
     * Register a new user
     * @param body (optional) 
     * @return OK
     */
    auth_Register(body: types.UserRegisterDto | undefined): Promise<types.AuthenticationResponseDtoApiResponse>;
    /**
     * Refresh access token using refresh token
     * @param body (optional) 
     * @return OK
     */
    auth_RefreshToken(body: types.RefreshTokenDto | undefined): Promise<types.TokenResponseDtoApiResponse>;
    /**
     * Logout user and revoke refresh token
     * @return OK
     */
    auth_Logout(): Promise<types.BooleanApiResponse>;
    /**
     * Request password reset token
     * @param body (optional) 
     * @return OK
     */
    auth_ForgotPassword(body: types.UserPasswordResetRequestDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Reset password using token
     * @param body (optional) 
     * @return OK
     */
    auth_ResetPassword(body: types.UserPasswordResetDto | undefined): Promise<types.PasswordResetResponseDtoApiResponse>;
    /**
     * Change password for authenticated user
     * @param body (optional) 
     * @return OK
     */
    auth_ChangePassword(body: types.UserPasswordChangeDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Validate JWT token
     * @param token (optional) 
     * @return OK
     */
    auth_ValidateToken(token: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Revoke a specific refresh token
     * @param body (optional) 
     * @return OK
     */
    auth_RevokeToken(body: types.RevokeTokenDto | undefined): Promise<types.BooleanApiResponse>;
}
export interface IBlocksClient {
    /**
     * Get all blocks in a building
     * @return OK
     */
    blocks_GetAll(buildingId: string): Promise<types.BlockResponseDtoListApiResponse>;
    /**
     * Get block by ID
     * @return OK
     */
    blocks_GetById(buildingId: string, blockId: string): Promise<types.BlockResponseDtoApiResponse>;
    /**
     * Delete block
     * @return OK
     */
    blocks_Delete(buildingId: string, blockId: string): Promise<types.BooleanApiResponse>;
    /**
     * Get block summary
     * @return OK
     */
    blocks_GetSummary(buildingId: string, blockId: string): Promise<types.BlockSummaryResponseDtoApiResponse>;
    /**
     * Get all concrete blocks in a building
     * @return OK
     */
    blocks_GetConcreteBlocks(buildingId: string): Promise<types.ConcreteBlockResponseDtoListApiResponse>;
    /**
     * Create new concrete block
     * @param body (optional) 
     * @return OK
     */
    blocks_CreateConcrete(buildingId: string, body: types.ConcreteCreateDto | undefined): Promise<types.ConcreteBlockResponseDtoApiResponse>;
    /**
     * Get all masonry blocks in a building
     * @return OK
     */
    blocks_GetMasonryBlocks(buildingId: string): Promise<types.MasonryBlockResponseDtoListApiResponse>;
    /**
     * Create new masonry block
     * @param body (optional) 
     * @return OK
     */
    blocks_CreateMasonry(buildingId: string, body: types.MasonryCreateDto | undefined): Promise<types.MasonryBlockResponseDtoApiResponse>;
    /**
     * Update concrete block
     * @param body (optional) 
     * @return OK
     */
    blocks_UpdateConcrete(buildingId: string, blockId: string, body: types.ConcreteUpdateDto | undefined): Promise<types.ConcreteBlockResponseDtoApiResponse>;
    /**
     * Update masonry block
     * @param body (optional) 
     * @return OK
     */
    blocks_UpdateMasonry(buildingId: string, blockId: string, body: types.MasonryUpdateDto | undefined): Promise<types.MasonryBlockResponseDtoApiResponse>;
    /**
     * Get block statistics
     * @return OK
     */
    blocks_GetStatistics(buildingId: string, blockId: string): Promise<types.BlockStatisticsResponseDtoApiResponse>;
    /**
     * Copy block within the same building
     * @param body (optional) 
     * @return OK
     */
    blocks_CopyBlock(buildingId: string, blockId: string, body: types.CopyBlockDto | undefined): Promise<types.BlockResponseDtoApiResponse>;
}
export interface IBuildingsClient {
    /**
     * Get all buildings with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    buildings_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.BuildingListResponseDtoPagedResponseApiResponse>;
    /**
     * Create new building
     * @param body (optional) 
     * @return OK
     */
    buildings_Create(body: types.BuildingCreateDto | undefined): Promise<types.BuildingResponseDtoApiResponse>;
    /**
     * Get building by ID
     * @return OK
     */
    buildings_GetById(id: string): Promise<types.BuildingDetailResponseDtoApiResponse>;
    /**
     * Update building
     * @param body (optional) 
     * @return OK
     */
    buildings_Update(id: string, body: types.BuildingUpdateDto | undefined): Promise<types.BuildingResponseDtoApiResponse>;
    /**
     * Delete building
     * @return OK
     */
    buildings_Delete(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Get buildings by TM ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    buildings_GetByTmId(tmId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.BuildingListResponseDtoPagedResponseApiResponse>;
    /**
     * Search buildings
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    buildings_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: types.BuildingSearchDto | undefined): Promise<types.BuildingListResponseDtoPagedResponseApiResponse>;
    /**
     * Add block to building
     * @param body (optional) 
     * @return OK
     */
    buildings_AddBlock(id: string, body: types.BuildingBlockAddDto | undefined): Promise<types.BuildingResponseDtoApiResponse>;
    /**
     * Remove block from building
     * @return OK
     */
    buildings_RemoveBlock(id: string, blockId: string): Promise<types.BuildingResponseDtoApiResponse>;
    /**
     * Get buildings by type
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    buildings_GetByType(type: BuildingType, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.BuildingListResponseDtoPagedResponseApiResponse>;
    /**
     * Get buildings in scope of METU
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    buildings_GetInMETUScope(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.BuildingListResponseDtoPagedResponseApiResponse>;
    /**
     * Get building statistics
     * @return OK
     */
    buildings_GetStatistics(id: string): Promise<types.BuildingStatisticsResponseDtoApiResponse>;
}
export interface IClientsClient {
    /**
     * Get all clients with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    clients_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ClientListResponseDtoPagedResponseApiResponse>;
    /**
     * Create new client
     * @param body (optional) 
     * @return OK
     */
    clients_Create(body: types.ClientCreateDto | undefined): Promise<types.ClientResponseDtoApiResponse>;
    /**
     * Get client by ID
     * @return OK
     */
    clients_GetById(id: string): Promise<types.ClientDetailResponseDtoApiResponse>;
    /**
     * Update client
     * @param body (optional) 
     * @return OK
     */
    clients_Update(id: string, body: types.ClientUpdateDto | undefined): Promise<types.ClientResponseDtoApiResponse>;
    /**
     * Delete client
     * @return OK
     */
    clients_Delete(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Get client by name
     * @return OK
     */
    clients_GetByName(name: string): Promise<types.ClientResponseDtoApiResponse>;
    /**
     * Get client summary statistics
     * @return OK
     */
    clients_GetStatistics(id: string): Promise<types.ClientStatisticsResponseDtoApiResponse>;
}
export interface IDeploymentsClient {
    /**
     * Deploy pre-built application (Angular, React, Vue dist folder)
     * @param body (optional) 
     * @return OK
     */
    deployments_DeployPreBuiltApp(programId: string, body: types.AppDeploymentRequestDto | undefined): Promise<types.ProgramDeploymentDtoApiResponse>;
    /**
     * Deploy static site (HTML, CSS, JS files)
     * @param body (optional) 
     * @return OK
     */
    deployments_DeployStaticSite(programId: string, body: types.StaticSiteDeploymentRequestDto | undefined): Promise<types.ProgramDeploymentDtoApiResponse>;
    /**
     * Deploy container application using Docker
     * @param body (optional) 
     * @return OK
     */
    deployments_DeployContainerApp(programId: string, body: types.ContainerDeploymentRequestDto | undefined): Promise<types.ProgramDeploymentDtoApiResponse>;
    /**
     * Get deployment status for a program
     * @return OK
     */
    deployments_GetDeploymentStatus(programId: string): Promise<types.ProgramDeploymentStatusDtoApiResponse>;
    /**
     * Start a deployed application
     * @return OK
     */
    deployments_StartApplication(programId: string): Promise<types.BooleanApiResponse>;
    /**
     * Stop a deployed application
     * @return OK
     */
    deployments_StopApplication(programId: string): Promise<types.BooleanApiResponse>;
    /**
     * Restart a deployed application
     * @return OK
     */
    deployments_RestartApplication(programId: string): Promise<types.BooleanApiResponse>;
    /**
     * Get application logs
     * @param lines (optional) 
     * @return OK
     */
    deployments_GetApplicationLogs(programId: string, lines: number | undefined): Promise<types.StringListApiResponse>;
    /**
     * Update deployment configuration
     * @param body (optional) 
     * @return OK
     */
    deployments_UpdateDeploymentConfig(programId: string, body: types.AppDeploymentConfigUpdateDto | undefined): Promise<types.ProgramDtoApiResponse>;
    /**
     * Get application health status
     * @return OK
     */
    deployments_GetApplicationHealth(programId: string): Promise<types.ApplicationHealthDtoApiResponse>;
    /**
     * Scale application instances (for container deployments)
     * @param body (optional) 
     * @return OK
     */
    deployments_ScaleApplication(programId: string, body: number | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get application metrics
     * @return OK
     */
    deployments_GetApplicationMetrics(programId: string): Promise<types.ApplicationMetricsDtoApiResponse>;
    /**
     * Undeploy an application
     * @return OK
     */
    deployments_UndeployApplication(programId: string): Promise<types.BooleanApiResponse>;
    /**
     * Validate deployment configuration
     * @param body (optional) 
     * @return OK
     */
    deployments_ValidateDeployment(programId: string, body: types.AppDeploymentRequestDto | undefined): Promise<types.DeploymentValidationResultApiResponse>;
    /**
     * Get supported deployment options for a program
     * @return OK
     */
    deployments_GetSupportedDeploymentOptions(programId: string): Promise<types.SupportedDeploymentOptionDtoListApiResponse>;
    /**
     * Get deployment history for a program
     * @param limit (optional) 
     * @return OK
     */
    deployments_GetDeploymentHistory(programId: string, limit: number | undefined): Promise<types.DeploymentHistoryDtoListApiResponse>;
    /**
     * Get all active deployments
     * @return OK
     */
    deployments_GetActiveDeployments(): Promise<types.ActiveDeploymentDtoListApiResponse>;
    /**
     * Get deployment statistics
     * @param fromDate (optional) 
     * @param toDate (optional) 
     * @return OK
     */
    deployments_GetDeploymentStatistics(fromDate: Date | undefined, toDate: Date | undefined): Promise<types.DeploymentStatisticsDtoApiResponse>;
    /**
     * Rollback to previous deployment
     * @param body (optional) 
     * @return OK
     */
    deployments_RollbackDeployment(programId: string, body: types.RollbackRequestDto | undefined): Promise<types.ProgramDeploymentDtoApiResponse>;
    /**
     * Get deployment environment variables
     * @return OK
     */
    deployments_GetDeploymentEnvironment(programId: string): Promise<types.StringStringDictionaryApiResponse>;
    /**
     * Update deployment environment variables
     * @param body (optional) 
     * @return OK
     */
    deployments_UpdateDeploymentEnvironment(programId: string, body: { [key: string]: string; } | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get deployment resource usage
     * @return OK
     */
    deployments_GetDeploymentResourceUsage(programId: string): Promise<types.DeploymentResourceUsageDtoApiResponse>;
    /**
     * Test deployment connection
     * @return OK
     */
    deployments_TestDeploymentConnection(programId: string): Promise<types.ConnectionTestResultApiResponse>;
}
export interface IDocumentationClient {
    /**
     * Get all API schemas and endpoints
     * @return OK
     */
    documentation_GetAllSchemas(): Promise<void>;
    /**
     * Get enum mappings
     * @return OK
     */
    documentation_GetEnumMappings(): Promise<void>;
}
export interface IExecutionsClient {
    /**
     * Get all executions with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ExecutionListDtoPagedResponseApiResponse>;
    /**
     * Get execution by ID
     * @return OK
     */
    executions_GetById(id: string): Promise<types.ExecutionDetailDtoApiResponse>;
    /**
     * Delete execution
     * @return OK
     */
    executions_Delete(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Advanced execution search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    executions_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: types.ExecutionSearchDto | undefined): Promise<types.ExecutionListDtoPagedResponseApiResponse>;
    /**
     * Get executions by program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ExecutionListDtoPagedResponseApiResponse>;
    /**
     * Get executions by version
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetByVersion(versionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ExecutionListDtoPagedResponseApiResponse>;
    /**
     * Get executions by user
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetByUser(userId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ExecutionListDtoPagedResponseApiResponse>;
    /**
     * Get executions by status
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ExecutionListDtoPagedResponseApiResponse>;
    /**
     * Get running executions
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetRunningExecutions(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ExecutionListDtoPagedResponseApiResponse>;
    /**
     * Get completed executions
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetCompletedExecutions(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ExecutionListDtoPagedResponseApiResponse>;
    /**
     * Get failed executions
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetFailedExecutions(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ExecutionListDtoPagedResponseApiResponse>;
    /**
     * Get recent executions
     * @param count (optional) 
     * @return OK
     */
    executions_GetRecentExecutions(count: number | undefined): Promise<types.ExecutionListDtoListApiResponse>;
    /**
     * Execute program using current version
     * @param body (optional) 
     * @return OK
     */
    executions_ExecuteProgram(programId: string, body: types.ProgramExecutionRequestDto | undefined): Promise<types.ExecutionDtoApiResponse>;
    /**
     * Execute specific version
     * @param body (optional) 
     * @return OK
     */
    executions_ExecuteVersion(versionId: string, body: types.VersionExecutionRequestDto | undefined): Promise<types.ExecutionDtoApiResponse>;
    /**
     * Execute with advanced parameters
     * @param body (optional) 
     * @return OK
     */
    executions_ExecuteWithParameters(body: types.ExecutionParametersDto | undefined): Promise<types.ExecutionDtoApiResponse>;
    /**
     * Stop execution
     * @return OK
     */
    executions_StopExecution(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Pause execution
     * @return OK
     */
    executions_PauseExecution(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Resume execution
     * @return OK
     */
    executions_ResumeExecution(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Get execution status
     * @return OK
     */
    executions_GetExecutionStatus(id: string): Promise<types.ExecutionStatusDtoApiResponse>;
    /**
     * Get execution output stream
     * @return OK
     */
    executions_GetExecutionOutputStream(id: string): Promise<types.StringApiResponse>;
    /**
     * Get execution logs
     * @param lines (optional) 
     * @return OK
     */
    executions_GetExecutionLogs(id: string, lines: number | undefined): Promise<types.StringListApiResponse>;
    /**
     * Get execution result
     * @return OK
     */
    executions_GetExecutionResult(id: string): Promise<types.ExecutionResultDtoApiResponse>;
    /**
     * Get execution output files
     * @return OK
     */
    executions_GetExecutionOutputFiles(id: string): Promise<types.ExecutionOutputFileDtoListApiResponse>;
    /**
     * Get specific execution output file
     * @return OK
     */
    executions_GetExecutionOutputFile(id: string, fileName: string): Promise<types.ExecutionOutputFileContentDtoApiResponse>;
    /**
     * Download execution results
     * @param body (optional) 
     * @return OK
     */
    executions_DownloadExecutionResults(id: string, body: types.DownloadRequest | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Deploy web application
     * @param body (optional) 
     * @return OK
     */
    executions_DeployWebApplication(programId: string, body: types.WebAppDeploymentRequestDto | undefined): Promise<types.ExecutionDtoApiResponse>;
    /**
     * Get web application URL
     * @return OK
     */
    executions_GetWebApplicationUrl(id: string): Promise<types.StringApiResponse>;
    /**
     * Get web application status
     * @return OK
     */
    executions_GetWebApplicationStatus(id: string): Promise<types.WebAppStatusDtoApiResponse>;
    /**
     * Restart web application
     * @return OK
     */
    executions_RestartWebApplication(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Stop web application
     * @return OK
     */
    executions_StopWebApplication(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Get resource usage for execution
     * @return OK
     */
    executions_GetResourceUsage(id: string): Promise<types.ExecutionResourceUsageDtoApiResponse>;
    /**
     * Update resource usage for execution
     * @param body (optional) 
     * @return OK
     */
    executions_UpdateResourceUsage(id: string, body: types.ExecutionResourceUpdateDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get resource trends for program
     * @param days (optional) 
     * @return OK
     */
    executions_GetResourceTrends(programId: string, days: number | undefined): Promise<types.ExecutionResourceTrendDtoListApiResponse>;
    /**
     * Get resource limits for program
     * @return OK
     */
    executions_GetResourceLimits(programId: string): Promise<types.ExecutionResourceLimitsDtoApiResponse>;
    /**
     * Update resource limits for program
     * @param body (optional) 
     * @return OK
     */
    executions_UpdateResourceLimits(programId: string, body: types.ExecutionResourceLimitsUpdateDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get execution statistics
     * @param programId (optional) 
     * @param userId (optional) 
     * @param fromDate (optional) 
     * @param toDate (optional) 
     * @param statuses (optional) 
     * @param executionType (optional) 
     * @return OK
     */
    executions_GetExecutionStats(programId: string | undefined, userId: string | undefined, fromDate: Date | undefined, toDate: Date | undefined, statuses: string[] | undefined, executionType: string | undefined): Promise<types.ExecutionStatsDtoApiResponse>;
    /**
     * Get execution trends
     * @param programId (optional) 
     * @param days (optional) 
     * @return OK
     */
    executions_GetExecutionTrends(programId: string | undefined, days: number | undefined): Promise<types.ExecutionTrendDtoListApiResponse>;
    /**
     * Get execution performance for program
     * @return OK
     */
    executions_GetExecutionPerformance(programId: string): Promise<types.ExecutionPerformanceDtoListApiResponse>;
    /**
     * Get user execution summary
     * @return OK
     */
    executions_GetUserExecutionSummary(userId: string): Promise<types.ExecutionSummaryDtoApiResponse>;
    /**
     * Get execution environment for program
     * @return OK
     */
    executions_GetExecutionEnvironment(programId: string): Promise<types.ExecutionEnvironmentDtoApiResponse>;
    /**
     * Update execution environment for program
     * @param body (optional) 
     * @return OK
     */
    executions_UpdateExecutionEnvironment(programId: string, body: types.ExecutionEnvironmentUpdateDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get execution templates
     * @param language (optional) 
     * @return OK
     */
    executions_GetExecutionTemplates(language: string | undefined): Promise<types.ExecutionTemplateDtoListApiResponse>;
    /**
     * Validate execution request
     * @param body (optional) 
     * @return OK
     */
    executions_ValidateExecutionRequest(body: types.ProgramExecutionRequestDto | undefined): Promise<types.ExecutionValidationResultApiResponse>;
    /**
     * Get execution queue status
     * @return OK
     */
    executions_GetExecutionQueueStatus(): Promise<types.ExecutionQueueStatusDtoApiResponse>;
    /**
     * Schedule execution for program
     * @param body (optional) 
     * @return OK
     */
    executions_ScheduleExecution(programId: string, body: types.ExecutionScheduleRequestDto | undefined): Promise<types.ExecutionDtoApiResponse>;
    /**
     * Cancel scheduled execution
     * @return OK
     */
    executions_CancelScheduledExecution(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Get scheduled executions
     * @return OK
     */
    executions_GetScheduledExecutions(): Promise<types.ExecutionListDtoListApiResponse>;
    /**
     * Get supported programming languages
     * @return OK
     */
    executions_GetSupportedLanguages(): Promise<types.StringListApiResponse>;
    /**
     * Analyze project structure
     * @param versionId (optional) 
     * @return OK
     */
    executions_AnalyzeProject(programId: string, versionId: string | undefined): Promise<types.ProjectStructureAnalysisDtoApiResponse>;
    /**
     * Validate project for execution
     * @param versionId (optional) 
     * @return OK
     */
    executions_ValidateProject(programId: string, versionId: string | undefined): Promise<types.ProjectValidationResultDtoApiResponse>;
    /**
     * Cleanup old executions
     * @param daysToKeep (optional) 
     * @return OK
     */
    executions_CleanupOldExecutions(daysToKeep: number | undefined): Promise<types.Int32ApiResponse>;
    /**
     * Archive execution
     * @return OK
     */
    executions_ArchiveExecution(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Get cleanup report
     * @return OK
     */
    executions_GetCleanupReport(): Promise<types.ExecutionCleanupReportDtoListApiResponse>;
    /**
     * Run security scan on program
     * @return OK
     */
    executions_RunSecurityScan(programId: string): Promise<types.ExecutionSecurityScanResultApiResponse>;
    /**
     * Check if execution is allowed for user on program
     * @return OK
     */
    executions_IsExecutionAllowed(programId: string, userId: string): Promise<types.BooleanApiResponse>;
}
export interface IFilesClient {
    /**
     * Store files for a specific program version
     * @param body (optional) 
     * @return OK
     */
    files_StoreVersionFiles(programId: string, versionId: string, body: types.VersionFileCreateDto[] | undefined): Promise<types.FileStorageResultListApiResponse>;
    /**
     * List all files for a specific program version
     * @return OK
     */
    files_ListVersionFiles(programId: string, versionId: string): Promise<types.VersionFileDtoListApiResponse>;
    /**
     * Delete all files for a specific program version
     * @return OK
     */
    files_DeleteVersionFiles(programId: string, versionId: string): Promise<types.BooleanApiResponse>;
    /**
     * Get file content for a specific program version
     * @return OK
     */
    files_GetVersionFile(programId: string, versionId: string, filePath: string): Promise<types.VersionFileDetailDtoApiResponse>;
    /**
     * Update file content for a specific program version
     * @param body (optional) 
     * @return OK
     */
    files_UpdateVersionFile(programId: string, versionId: string, filePath: string, body: types.VersionFileUpdateDto | undefined): Promise<types.StringApiResponse>;
    /**
     * Delete file from a specific program version
     * @return OK
     */
    files_DeleteVersionFile(programId: string, versionId: string, filePath: string): Promise<types.BooleanApiResponse>;
    /**
     * Copy files from one version to another within the same program
     * @return OK
     */
    files_CopyVersionFiles(programId: string, fromVersionId: string, toVersionId: string): Promise<types.FileStorageResultListApiResponse>;
    /**
     * Delete all files for a program (all versions)
     * @return OK
     */
    files_DeleteProgramFiles(programId: string): Promise<types.BooleanApiResponse>;
    /**
     * Get storage statistics for a program
     * @return OK
     */
    files_GetProgramStorageStatistics(programId: string): Promise<types.StorageStatisticsApiResponse>;
    /**
     * Validate file before upload
     * @param body (optional) 
     * @return OK
     */
    files_ValidateFile(body: types.FileValidationRequest | undefined): Promise<types.FileValidationResultApiResponse>;
    /**
     * Calculate file hash
     * @param body (optional) 
     * @return OK
     */
    files_CalculateFileHash(body: string | undefined): Promise<types.StringApiResponse>;
    /**
     * Get file path structure for a program version
     * @param filePath (optional) 
     * @return OK
     */
    files_GetVersionFilePath(programId: string, versionId: string, filePath: string | undefined): Promise<types.StringApiResponse>;
    /**
     * Bulk upload files to a program version
     * @param body (optional) 
     * @return OK
     */
    files_BulkUploadFiles(programId: string, versionId: string, body: types.VersionFileCreateDto[] | undefined): Promise<types.BulkOperationResultApiResponse>;
    /**
     * Bulk delete files from a program version
     * @param body (optional) 
     * @return OK
     */
    files_BulkDeleteFiles(programId: string, versionId: string, body: string[] | undefined): Promise<types.BulkOperationResultApiResponse>;
}
export interface IProgramsClient {
    /**
     * Get all programs with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ProgramListDtoPagedResponseApiResponse>;
    /**
     * Create new program entity
    Note: This creates the program metadata only. Use VersionsController commit process to add files.
     * @param body (optional) 
     * @return OK
     */
    programs_Create(body: types.ProgramCreateDto | undefined): Promise<types.ProgramDtoApiResponse>;
    /**
     * Get program by ID with full details (excluding files - use VersionsController for files)
     * @return OK
     */
    programs_GetById(id: string): Promise<types.ProgramDetailDtoApiResponse>;
    /**
     * Update program metadata
    Note: File changes should be done through VersionsController commit process
     * @param body (optional) 
     * @return OK
     */
    programs_Update(id: string, body: types.ProgramUpdateDto | undefined): Promise<types.ProgramDtoApiResponse>;
    /**
     * Delete program
    Note: This will also trigger cleanup of associated versions and files through service layer
     * @return OK
     */
    programs_Delete(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Advanced program search with filtering
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    programs_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: types.ProgramSearchDto | undefined): Promise<types.ProgramListDtoPagedResponseApiResponse>;
    /**
     * Get programs by creator
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetByCreator(creatorId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ProgramListDtoPagedResponseApiResponse>;
    /**
     * Get programs by status (draft, active, archived, etc.)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ProgramListDtoPagedResponseApiResponse>;
    /**
     * Get programs by type (web, console, api, etc.)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetByType(type: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ProgramListDtoPagedResponseApiResponse>;
    /**
     * Get programs by programming language
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetByLanguage(language: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ProgramListDtoPagedResponseApiResponse>;
    /**
     * Get programs accessible to current user based on permissions
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetUserAccessiblePrograms(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ProgramListDtoPagedResponseApiResponse>;
    /**
     * Get programs accessible to a group
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetGroupAccessiblePrograms(groupId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.ProgramListDtoPagedResponseApiResponse>;
    /**
     * Update program status (draft, active, archived, deprecated)
     * @param body (optional) 
     * @return OK
     */
    programs_UpdateStatus(id: string, body: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Update program's current version (must be an approved version)
    Note: This sets which version is considered "current" for execution
     * @param body (optional) 
     * @return OK
     */
    programs_UpdateCurrentVersion(id: string, body: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get all permissions for a program
     * @return OK
     */
    programs_GetProgramPermissions(id: string): Promise<types.ProgramPermissionDtoListApiResponse>;
    /**
     * Add user permission to program
     * @param body (optional) 
     * @return OK
     */
    programs_AddUserPermission(id: string, body: types.ProgramUserPermissionDto | undefined): Promise<types.ProgramDtoApiResponse>;
    /**
     * Update user permission for program
     * @param body (optional) 
     * @return OK
     */
    programs_UpdateUserPermission(id: string, userId: string, body: types.ProgramUserPermissionDto | undefined): Promise<types.ProgramDtoApiResponse>;
    /**
     * Remove user permission from program
     * @return OK
     */
    programs_RemoveUserPermission(id: string, userId: string): Promise<types.BooleanApiResponse>;
    /**
     * Add group permission to program
     * @param body (optional) 
     * @return OK
     */
    programs_AddGroupPermission(id: string, body: types.ProgramGroupPermissionDto | undefined): Promise<types.ProgramDtoApiResponse>;
    /**
     * Update group permission for program
     * @param body (optional) 
     * @return OK
     */
    programs_UpdateGroupPermission(id: string, groupId: string, body: types.ProgramGroupPermissionDto | undefined): Promise<types.ProgramDtoApiResponse>;
    /**
     * Remove group permission from program
     * @return OK
     */
    programs_RemoveGroupPermission(id: string, groupId: string): Promise<types.BooleanApiResponse>;
    /**
     * Get current deployment status for program
    Note: For deploying specific versions, use VersionsController
     * @return OK
     */
    programs_GetDeploymentStatus(id: string): Promise<types.ProgramDeploymentStatusDtoApiResponse>;
    /**
     * Get application logs for deployed program
     * @param lines (optional) 
     * @return OK
     */
    programs_GetApplicationLogs(id: string, lines: number | undefined): Promise<types.StringListApiResponse>;
    /**
     * Restart deployed application
    Note: This restarts the currently deployed version
     * @return OK
     */
    programs_RestartApplication(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Validate program name uniqueness
     * @param excludeId (optional) 
     * @param body (optional) 
     * @return OK
     */
    programs_ValidateNameUnique(excludeId: string | undefined, body: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Validate user access to program
     * @param requiredAccessLevel (optional) 
     * @return OK
     */
    programs_ValidateUserAccess(id: string, requiredAccessLevel: string | undefined): Promise<types.BooleanApiResponse>;
}
export interface IRegionsClient {
    /**
     * Get all regions with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    regions_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RegionListResponseDtoPagedResponseApiResponse>;
    /**
     * Create new region
     * @param body (optional) 
     * @return OK
     */
    regions_Create(body: types.RegionCreateDto | undefined): Promise<types.RegionResponseDtoApiResponse>;
    /**
     * Get region by ID
     * @return OK
     */
    regions_GetById(id: string): Promise<types.RegionDetailResponseDtoApiResponse>;
    /**
     * Update region
     * @param body (optional) 
     * @return OK
     */
    regions_Update(id: string, body: types.RegionUpdateDto | undefined): Promise<types.RegionResponseDtoApiResponse>;
    /**
     * Delete region
     * @return OK
     */
    regions_Delete(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Get region by number
     * @return OK
     */
    regions_GetByNumber(regionNo: number): Promise<types.RegionResponseDtoApiResponse>;
    /**
     * Get regions by client ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    regions_GetByClientId(clientId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RegionListResponseDtoPagedResponseApiResponse>;
    /**
     * Update region cities
     * @param body (optional) 
     * @return OK
     */
    regions_UpdateCities(id: string, body: types.RegionCityUpdateDto | undefined): Promise<types.RegionResponseDtoApiResponse>;
    /**
     * Get region statistics
     * @return OK
     */
    regions_GetStatistics(id: string): Promise<types.RegionStatisticsResponseDtoApiResponse>;
    /**
     * Get regions that operate in a specific city
     * @return OK
     */
    regions_GetRegionsInCity(city: string): Promise<types.RegionSummaryResponseDtoListApiResponse>;
}
export interface IRequestsClient {
    /**
     * Get all requests with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Create new request
     * @param body (optional) 
     * @return OK
     */
    requests_Create(body: types.RequestCreateDto | undefined): Promise<types.RequestDtoApiResponse>;
    /**
     * Get request by ID
     * @return OK
     */
    requests_GetById(id: string): Promise<types.RequestDetailDtoApiResponse>;
    /**
     * Update request
     * @param body (optional) 
     * @return OK
     */
    requests_Update(id: string, body: types.RequestUpdateDto | undefined): Promise<types.RequestDtoApiResponse>;
    /**
     * Delete request
     * @return OK
     */
    requests_Delete(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Advanced request search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    requests_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: types.RequestSearchDto | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Get requests by type
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByType(type: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Get requests by status
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Get requests by priority
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByPriority(priority: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Get requests by requester
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByRequester(userId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Get requests by assignee
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByAssignee(userId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Get requests by program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Get unassigned requests
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetUnassignedRequests(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Update request status
     * @param body (optional) 
     * @return OK
     */
    requests_UpdateStatus(id: string, body: types.RequestStatusUpdateDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Assign request
     * @param body (optional) 
     * @return OK
     */
    requests_AssignRequest(id: string, body: types.RequestAssignmentDto | undefined): Promise<types.RequestDtoApiResponse>;
    /**
     * Unassign request
     * @return OK
     */
    requests_UnassignRequest(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Update request priority
     * @param body (optional) 
     * @return OK
     */
    requests_UpdatePriority(id: string, body: types.RequestPriorityUpdateDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Add response to request
     * @param body (optional) 
     * @return OK
     */
    requests_AddResponse(id: string, body: types.RequestResponseCreateDto | undefined): Promise<types.RequestResponseDtoApiResponse>;
    /**
     * Get responses for request
     * @return OK
     */
    requests_GetResponses(id: string): Promise<types.RequestResponseDtoListApiResponse>;
    /**
     * Update request response
     * @param body (optional) 
     * @return OK
     */
    requests_UpdateResponse(id: string, responseId: string, body: types.RequestResponseUpdateDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Delete request response
     * @return OK
     */
    requests_DeleteResponse(id: string, responseId: string): Promise<types.BooleanApiResponse>;
    /**
     * Open request
     * @return OK
     */
    requests_OpenRequest(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Start work on request
     * @param body (optional) 
     * @return OK
     */
    requests_StartWorkOnRequest(id: string, body: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Complete request
     * @param body (optional) 
     * @return OK
     */
    requests_CompleteRequest(id: string, body: types.RequestCompletionDto | undefined): Promise<types.RequestDtoApiResponse>;
    /**
     * Reject request
     * @param body (optional) 
     * @return OK
     */
    requests_RejectRequest(id: string, body: types.RequestRejectionDto | undefined): Promise<types.RequestDtoApiResponse>;
    /**
     * Reopen request
     * @param body (optional) 
     * @return OK
     */
    requests_ReopenRequest(id: string, body: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get request statistics
     * @param programId (optional) 
     * @param fromDate (optional) 
     * @param toDate (optional) 
     * @param type (optional) 
     * @param assignedTo (optional) 
     * @param statuses (optional) 
     * @return OK
     */
    requests_GetRequestStats(programId: string | undefined, fromDate: Date | undefined, toDate: Date | undefined, type: string | undefined, assignedTo: string | undefined, statuses: string[] | undefined): Promise<types.RequestStatsDtoApiResponse>;
    /**
     * Get request trends
     * @param days (optional) 
     * @return OK
     */
    requests_GetRequestTrends(days: number | undefined): Promise<types.RequestTrendDtoListApiResponse>;
    /**
     * Get request metrics by type
     * @return OK
     */
    requests_GetRequestMetricsByType(): Promise<types.RequestMetricDtoListApiResponse>;
    /**
     * Get request metrics by status
     * @return OK
     */
    requests_GetRequestMetricsByStatus(): Promise<types.RequestMetricDtoListApiResponse>;
    /**
     * Get assignee performance
     * @return OK
     */
    requests_GetAssigneePerformance(): Promise<types.RequestPerformanceDtoListApiResponse>;
    /**
     * Get request templates
     * @param type (optional) 
     * @return OK
     */
    requests_GetRequestTemplates(type: string | undefined): Promise<types.RequestTemplateDtoListApiResponse>;
    /**
     * Create request template
     * @param body (optional) 
     * @return OK
     */
    requests_CreateRequestTemplate(body: types.RequestTemplateCreateDto | undefined): Promise<types.RequestTemplateDtoApiResponse>;
    /**
     * Create request from template
     * @param body (optional) 
     * @return OK
     */
    requests_CreateFromTemplate(templateId: string, body: types.RequestFromTemplateDto | undefined): Promise<types.RequestDtoApiResponse>;
    /**
     * Subscribe to request updates
     * @param body (optional) 
     * @return OK
     */
    requests_SubscribeToRequestUpdates(id: string, body: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Unsubscribe from request updates
     * @param body (optional) 
     * @return OK
     */
    requests_UnsubscribeFromRequestUpdates(id: string, body: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get request subscribers
     * @return OK
     */
    requests_GetRequestSubscribers(id: string): Promise<types.StringListApiResponse>;
    /**
     * Validate request
     * @param body (optional) 
     * @return OK
     */
    requests_ValidateRequest(body: types.RequestCreateDto | undefined): Promise<types.RequestValidationResultApiResponse>;
    /**
     * Check if user can modify request
     * @param userId (optional) 
     * @return OK
     */
    requests_CanUserModifyRequest(id: string, userId: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get available request types
     * @return OK
     */
    requests_GetAvailableRequestTypes(): Promise<types.StringListApiResponse>;
    /**
     * Get available request statuses
     * @return OK
     */
    requests_GetAvailableRequestStatuses(): Promise<types.StringListApiResponse>;
    /**
     * Get available request priorities
     * @return OK
     */
    requests_GetAvailableRequestPriorities(): Promise<types.StringListApiResponse>;
    /**
     * Get my requests (current user)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetMyRequests(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Get my assigned requests (current user)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetMyAssignments(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Get recent requests
     * @param count (optional) 
     * @return OK
     */
    requests_GetRecentRequests(count: number | undefined): Promise<types.RequestListDtoListApiResponse>;
    /**
     * Get priority requests
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetPriorityRequests(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Get overdue requests
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetOverdueRequests(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.RequestListDtoPagedResponseApiResponse>;
    /**
     * Bulk update request status
     * @param body (optional) 
     * @return OK
     */
    requests_BulkUpdateStatus(body: types.BulkRequestStatusUpdateDto | undefined): Promise<types.BooleanApiResponse>;
}
export interface ITMsClient {
    /**
     * Get all TMs with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    tMs_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.TMListResponseDtoPagedResponseApiResponse>;
    /**
     * Create new TM
     * @param body (optional) 
     * @return OK
     */
    tMs_Create(body: types.TMCreateDto | undefined): Promise<types.TMResponseDtoApiResponse>;
    /**
     * Get TM by ID
     * @return OK
     */
    tMs_GetById(id: string): Promise<types.TMDetailResponseDtoApiResponse>;
    /**
     * Update TM
     * @param body (optional) 
     * @return OK
     */
    tMs_Update(id: string, body: types.TMUpdateDto | undefined): Promise<types.TMResponseDtoApiResponse>;
    /**
     * Delete TM
     * @return OK
     */
    tMs_Delete(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Get TM by name
     * @return OK
     */
    tMs_GetByName(name: string): Promise<types.TMResponseDtoApiResponse>;
    /**
     * Get TMs by region ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    tMs_GetByRegionId(regionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.TMListResponseDtoPagedResponseApiResponse>;
    /**
     * Search TMs
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    tMs_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: types.TMSearchDto | undefined): Promise<types.TMListResponseDtoPagedResponseApiResponse>;
    /**
     * Update TM state
     * @param body (optional) 
     * @return OK
     */
    tMs_UpdateState(id: string, body: types.TMStateUpdateDto | undefined): Promise<types.TMResponseDtoApiResponse>;
    /**
     * Update TM voltages
     * @param body (optional) 
     * @return OK
     */
    tMs_UpdateVoltages(id: string, body: types.TMVoltageUpdateDto | undefined): Promise<types.TMResponseDtoApiResponse>;
    /**
     * Get TM statistics
     * @return OK
     */
    tMs_GetStatistics(id: string): Promise<types.TMStatisticsResponseDtoApiResponse>;
    /**
     * Get hazard summary for TM
     * @return OK
     */
    tMs_GetHazardSummary(id: string): Promise<types.TMHazardSummaryResponseDtoApiResponse>;
}
export interface IUiComponentsClient {
    /**
     * Get all UI components with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse>;
    /**
     * Get UI component by ID
     * @return OK
     */
    uiComponents_GetById(id: string): Promise<types.UiComponentDetailDtoApiResponse>;
    /**
     * Update UI component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_Update(id: string, body: types.UiComponentUpdateDto | undefined): Promise<types.UiComponentDtoApiResponse>;
    /**
     * Delete UI component
     * @return OK
     */
    uiComponents_Delete(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Create new UI component for a specific program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_Create(programId: string, versionId: string, body: types.UiComponentCreateDto | undefined): Promise<types.UiComponentDtoApiResponse>;
    /**
     * Get UI components for a specific program version
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByProgramVersion(programId: string, versionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse>;
    /**
     * Copy components from one version to another
     * @param body (optional) 
     * @return OK
     */
    uiComponents_CopyComponentsToNewVersion(programId: string, fromVersionId: string, toVersionId: string, body: string[] | undefined): Promise<types.UiComponentListDtoListApiResponse>;
    /**
     * Copy a component to a different program version
     * @param newName (optional) 
     * @return OK
     */
    uiComponents_CopyComponentToVersion(componentId: string, targetProgramId: string, targetVersionId: string, newName: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get available components for a program version
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetAvailableForProgramVersion(programId: string, versionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse>;
    /**
     * Advanced UI component search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    uiComponents_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: types.UiComponentSearchDto | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse>;
    /**
     * Get UI components by program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse>;
    /**
     * Get UI components by type
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByType(type: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse>;
    /**
     * Get UI components by creator
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByCreator(creatorId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse>;
    /**
     * Get UI components by status
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse>;
    /**
     * Update UI component status
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateStatus(id: string, body: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Activate UI component
     * @return OK
     */
    uiComponents_ActivateComponent(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Deactivate UI component
     * @return OK
     */
    uiComponents_DeactivateComponent(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Deprecate UI component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_DeprecateComponent(id: string, body: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get UI component bundle
     * @return OK
     */
    uiComponents_GetComponentBundle(id: string): Promise<types.UiComponentBundleDtoApiResponse>;
    /**
     * Upload UI component bundle (assets will be stored in version-specific storage)
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UploadComponentBundle(id: string, body: types.UiComponentBundleUploadDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Update UI component assets
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateComponentAssets(id: string, body: types.UiComponentAssetDto[] | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get UI component assets (retrieved from version-specific storage)
     * @return OK
     */
    uiComponents_GetComponentAssets(id: string): Promise<types.UiComponentAssetDtoListApiResponse>;
    /**
     * Get UI component configuration
     * @return OK
     */
    uiComponents_GetComponentConfiguration(id: string): Promise<types.UiComponentConfigDtoApiResponse>;
    /**
     * Update UI component configuration
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateComponentConfiguration(id: string, body: types.UiComponentConfigUpdateDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get UI component schema
     * @return OK
     */
    uiComponents_GetComponentSchema(id: string): Promise<types.UiComponentSchemaDtoApiResponse>;
    /**
     * Update UI component schema
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateComponentSchema(id: string, body: types.UiComponentSchemaUpdateDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Validate UI component schema
     * @param body (optional) 
     * @return OK
     */
    uiComponents_ValidateComponentSchema(id: string, body: any | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get UI component usage
     * @return OK
     */
    uiComponents_GetComponentUsage(id: string): Promise<types.UiComponentUsageDtoListApiResponse>;
    /**
     * Get program version component mappings
     * @return OK
     */
    uiComponents_GetProgramVersionComponentMappings(programId: string, versionId: string): Promise<types.ProgramComponentMappingDtoListApiResponse>;
    /**
     * Map component to program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_MapComponentToProgramVersion(programId: string, versionId: string, body: types.UiComponentMappingDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Unmap component from program version
     * @return OK
     */
    uiComponents_UnmapComponentFromProgramVersion(programId: string, versionId: string, componentId: string): Promise<types.BooleanApiResponse>;
    /**
     * Get recommended components for program version
     * @return OK
     */
    uiComponents_GetRecommendedComponents(programId: string, versionId: string): Promise<types.UiComponentRecommendationDtoListApiResponse>;
    /**
     * Search compatible components
     * @param body (optional) 
     * @return OK
     */
    uiComponents_SearchCompatibleComponents(body: types.UiComponentCompatibilitySearchDto | undefined): Promise<types.UiComponentListDtoListApiResponse>;
    /**
     * Validate component name uniqueness for program version
     * @param excludeId (optional) 
     * @param body (optional) 
     * @return OK
     */
    uiComponents_ValidateNameUniqueForVersion(programId: string, versionId: string, excludeId: string | undefined, body: string | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Validate component definition for program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_ValidateComponentDefinition(programId: string, versionId: string, body: types.UiComponentCreateDto | undefined): Promise<types.UiComponentValidationResultApiResponse>;
    /**
     * Get available component types
     * @return OK
     */
    uiComponents_GetAvailableComponentTypes(): Promise<types.StringListApiResponse>;
    /**
     * Get component categories
     * @return OK
     */
    uiComponents_GetComponentCategories(): Promise<types.UiComponentCategoryDtoListApiResponse>;
    /**
     * Add tags to component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_AddComponentTags(id: string, body: string[] | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Remove tags from component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_RemoveComponentTags(id: string, body: string[] | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Get current user's accessible components
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetMyComponents(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UiComponentListDtoPagedResponseApiResponse>;
    /**
     * Clone component to a specific program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_CloneComponent(id: string, targetProgramId: string, targetVersionId: string, body: string | undefined): Promise<types.UiComponentDtoApiResponse>;
}
export interface IUsersClient {
    /**
     * Get all users with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    users_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UserListDtoPagedResponseApiResponse>;
    /**
     * Create new user (admin only)
     * @param body (optional) 
     * @return OK
     */
    users_Create(body: types.UserRegisterDto | undefined): Promise<types.UserDtoApiResponse>;
    /**
     * Get user by ID
     * @return OK
     */
    users_GetById(id: string): Promise<types.UserDetailDtoApiResponse>;
    /**
     * Update user details
     * @param body (optional) 
     * @return OK
     */
    users_Update(id: string, body: types.UserUpdateDto | undefined): Promise<types.UserDtoApiResponse>;
    /**
     * Delete user
     * @return OK
     */
    users_Delete(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Get current user profile
     * @return OK
     */
    users_GetCurrentUserProfile(): Promise<types.UserProfileDtoApiResponse>;
    /**
     * Update current user profile
     * @param body (optional) 
     * @return OK
     */
    users_UpdateCurrentUserProfile(body: types.UserUpdateDto | undefined): Promise<types.UserDtoApiResponse>;
    /**
     * Get current user permissions
     * @return OK
     */
    users_GetCurrentUserPermissions(): Promise<types.StringListApiResponse>;
    /**
     * Advanced user search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    users_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: types.UserSearchDto | undefined): Promise<types.UserListDtoPagedResponseApiResponse>;
    /**
     * Get users by role
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    users_GetByRole(role: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UserListDtoPagedResponseApiResponse>;
    /**
     * Get active users only
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    users_GetActiveUsers(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.UserListDtoPagedResponseApiResponse>;
    /**
     * Update user roles
     * @param body (optional) 
     * @return OK
     */
    users_UpdateRoles(id: string, body: types.UserRoleUpdateDto | undefined): Promise<types.UserDtoApiResponse>;
    /**
     * Update user permissions
     * @param body (optional) 
     * @return OK
     */
    users_UpdatePermissions(id: string, body: types.UserPermissionUpdateDto | undefined): Promise<types.UserDtoApiResponse>;
    /**
     * Get user's effective permissions (role + direct)
     * @return OK
     */
    users_GetEffectivePermissions(id: string): Promise<types.StringListApiResponse>;
    /**
     * Assign clients to user
     * @param body (optional) 
     * @return OK
     */
    users_AssignClients(id: string, body: IUserClientAssignmentDto | undefined): Promise<types.UserDtoApiResponse>;
    /**
     * Activate user account
     * @return OK
     */
    users_Activate(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Deactivate user account
     * @return OK
     */
    users_Deactivate(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Revoke all refresh tokens for user
     * @return OK
     */
    users_RevokeAllTokens(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Get user by email
     * @return OK
     */
    users_GetByEmail(email: string): Promise<types.UserDtoApiResponse>;
    /**
     * Get user by username
     * @return OK
     */
    users_GetByUsername(username: string): Promise<types.UserDtoApiResponse>;
    /**
     * Get available roles
     * @return OK
     */
    users_GetAvailableRoles(): Promise<types.StringListApiResponse>;
    /**
     * Get available permissions
     * @return OK
     */
    users_GetAvailablePermissions(): Promise<types.StringStringListDictionaryApiResponse>;
}
export interface IVersionsClient {
    /**
     * Get all versions with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.VersionListDtoPagedResponseApiResponse>;
    /**
     * Create new version for a program
    Note: This creates the version entity. Files are uploaded separately through the commit process.
     * @param body (optional) 
     * @return OK
     */
    versions_Create(body: types.VersionCreateDto | undefined): Promise<types.VersionDtoApiResponse>;
    /**
     * Get version by ID with full details including files
     * @return OK
     */
    versions_GetById(id: string): Promise<types.VersionDetailDtoApiResponse>;
    /**
     * Update version metadata (commit message, review comments)
    Note: File changes should be done through the commit process
     * @param body (optional) 
     * @return OK
     */
    versions_Update(id: string, body: types.VersionUpdateDto | undefined): Promise<types.VersionDtoApiResponse>;
    /**
     * Delete version (only if pending and not current)
    This will also delete associated files through IFileStorageService
     * @return OK
     */
    versions_Delete(id: string): Promise<types.BooleanApiResponse>;
    /**
     * Advanced version search with filtering
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    versions_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: types.VersionSearchDto | undefined): Promise<types.VersionListDtoPagedResponseApiResponse>;
    /**
     * Get all versions for a specific program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.VersionListDtoPagedResponseApiResponse>;
    /**
     * Get latest version for a program
     * @return OK
     */
    versions_GetLatestVersionForProgram(programId: string): Promise<types.VersionDtoApiResponse>;
    /**
     * Get specific version by program and version number
     * @return OK
     */
    versions_GetByProgramAndVersionNumber(programId: string, versionNumber: number): Promise<types.VersionDtoApiResponse>;
    /**
     * Get next version number for a program
     * @return OK
     */
    versions_GetNextVersionNumber(programId: string): Promise<types.Int32ApiResponse>;
    /**
     * Get versions by creator
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByCreator(creatorId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.VersionListDtoPagedResponseApiResponse>;
    /**
     * Get versions by status (pending, approved, rejected)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.VersionListDtoPagedResponseApiResponse>;
    /**
     * Get all versions pending review
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetPendingReviews(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.VersionListDtoPagedResponseApiResponse>;
    /**
     * Get versions by reviewer
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByReviewer(reviewerId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<types.VersionListDtoPagedResponseApiResponse>;
    /**
     * Update version status
     * @param body (optional) 
     * @return OK
     */
    versions_UpdateStatus(id: string, body: types.VersionStatusUpdateDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Submit version review (approve or reject)
     * @param body (optional) 
     * @return OK
     */
    versions_SubmitReview(id: string, body: types.VersionReviewSubmissionDto | undefined): Promise<types.VersionReviewDtoApiResponse>;
    /**
     * Quick approve version
     * @param body (optional) 
     * @return OK
     */
    versions_ApproveVersion(id: string, body: string | undefined): Promise<types.VersionReviewDtoApiResponse>;
    /**
     * Quick reject version
     * @param body (optional) 
     * @return OK
     */
    versions_RejectVersion(id: string, body: string | undefined): Promise<types.VersionReviewDtoApiResponse>;
    /**
     * Commit changes to create a new version with files
    This uses IFileStorageService internally to handle file operations
    Process: Upload files -> Commit -> Review -> Approve -> Execute
     * @param body (optional) 
     * @return OK
     */
    versions_CommitChanges(programId: string, body: types.VersionCommitDto | undefined): Promise<types.VersionDtoApiResponse>;
    /**
     * Validate commit before actual commit
    This checks file validity and other constraints
     * @param body (optional) 
     * @return OK
     */
    versions_ValidateCommit(programId: string, body: types.VersionCommitValidationDto | undefined): Promise<types.BooleanApiResponse>;
    /**
     * Compare two versions and get differences
     * @return OK
     */
    versions_CompareVersions(fromVersionId: string, toVersionId: string): Promise<types.VersionDiffDtoApiResponse>;
    /**
     * Get diff from previous version
     * @return OK
     */
    versions_GetDiffFromPrevious(versionId: string): Promise<types.VersionDiffDtoApiResponse>;
    /**
     * Get change summary for a version
     * @return OK
     */
    versions_GetChangeSummary(versionId: string): Promise<types.VersionChangeDtoListApiResponse>;
    /**
     * Deploy approved version
     * @param body (optional) 
     * @return OK
     */
    versions_DeployVersion(versionId: string, body: types.VersionDeploymentRequestDto | undefined): Promise<types.VersionDeploymentDtoApiResponse>;
    /**
     * Revert program to previous version
     * @return OK
     */
    versions_RevertToPreviousVersion(programId: string, versionId: string): Promise<types.BooleanApiResponse>;
    /**
     * Set version as current for program
     * @return OK
     */
    versions_SetAsCurrentVersion(programId: string, versionId: string): Promise<types.BooleanApiResponse>;
    /**
     * Get version statistics for a program
     * @return OK
     */
    versions_GetVersionStats(programId: string): Promise<types.VersionStatsDtoApiResponse>;
    /**
     * Get version activity for a program
     * @param days (optional) 
     * @return OK
     */
    versions_GetVersionActivity(programId: string, days: number | undefined): Promise<types.VersionActivityDtoListApiResponse>;
}
export interface IUserClientAssignmentDto {
    userId: string;
    clientIds: string[];
}