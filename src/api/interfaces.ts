// --- START OF FILE interfaces.ts ---

import * as types from './typeInterfaces';
import * as enums from './enums';

export interface IAlternativeTMsClient {

    /**
     * Get alternative TM by ID
     * @return OK
     */
    alternativeTMs_GetById(id: string): Promise<types.IAlternativeTMDetailResponseDtoApiResponse>;

    /**
     * Update alternative TM
     * @param body (optional) 
     * @return OK
     */
    alternativeTMs_Update(id: string, body: types.IAlternativeTMUpdateDto | undefined): Promise<types.IAlternativeTMResponseDtoApiResponse>;

    /**
     * Delete alternative TM
     * @return OK
     */
    alternativeTMs_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get alternative TMs by TM ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    alternativeTMs_GetByTmId(tmId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IAlternativeTMSummaryResponseDtoPagedResponseApiResponse>;

    /**
     * Get alternative TMs by city
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    alternativeTMs_GetByCity(city: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IAlternativeTMSummaryResponseDtoPagedResponseApiResponse>;

    /**
     * Get alternative TMs by county
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    alternativeTMs_GetByCounty(county: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IAlternativeTMSummaryResponseDtoPagedResponseApiResponse>;

    /**
     * Create new alternative TM
     * @param body (optional) 
     * @return OK
     */
    alternativeTMs_Create(body: types.IAlternativeTMCreateDto | undefined): Promise<types.IAlternativeTMResponseDtoApiResponse>;

    /**
     * Compare alternative TMs for a specific TM
     * @return OK
     */
    alternativeTMs_CompareAlternatives(tmId: string): Promise<types.IAlternativeTMComparisonResponseDtoListApiResponse>;

    /**
     * Create alternative TM from existing TM
     * @param body (optional) 
     * @return OK
     */
    alternativeTMs_CreateFromTM(tmId: string, body: types.ICreateFromTMDto | undefined): Promise<types.IAlternativeTMResponseDtoApiResponse>;
}

export interface IAuthClient {

    /**
     * Authenticate user and return JWT token
     * @param body (optional) 
     * @return OK
     */
    auth_Login(body: types.IUserLoginDto | undefined): Promise<types.IAuthenticationResponseDtoApiResponse>;

    /**
     * Register a new user
     * @param body (optional) 
     * @return OK
     */
    auth_Register(body: types.IUserRegisterDto | undefined): Promise<types.IAuthenticationResponseDtoApiResponse>;

    /**
     * Refresh access token using refresh token
     * @param body (optional) 
     * @return OK
     */
    auth_RefreshToken(body: types.IRefreshTokenDto | undefined): Promise<types.ITokenResponseDtoApiResponse>;

    /**
     * Logout user and revoke refresh token
     * @return OK
     */
    auth_Logout(): Promise<types.IBooleanApiResponse>;

    /**
     * Request password reset token
     * @param body (optional) 
     * @return OK
     */
    auth_ForgotPassword(body: types.IUserPasswordResetRequestDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Reset password using token
     * @param body (optional) 
     * @return OK
     */
    auth_ResetPassword(body: types.IUserPasswordResetDto | undefined): Promise<types.IPasswordResetResponseDtoApiResponse>;

    /**
     * Change password for authenticated user
     * @param body (optional) 
     * @return OK
     */
    auth_ChangePassword(body: types.IUserPasswordChangeDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Validate JWT token
     * @param token (optional) 
     * @return OK
     */
    auth_ValidateToken(token: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Revoke a specific refresh token
     * @param body (optional) 
     * @return OK
     */
    auth_RevokeToken(body: types.IRevokeTokenDto | undefined): Promise<types.IBooleanApiResponse>;
}

export interface IBlocksClient {

    /**
     * Get all blocks in a building
     * @return OK
     */
    blocks_GetAll(buildingId: string): Promise<types.IBlockResponseDtoListApiResponse>;

    /**
     * Get block by ID
     * @return OK
     */
    blocks_GetById(buildingId: string, blockId: string): Promise<types.IBlockResponseDtoApiResponse>;

    /**
     * Delete block
     * @return OK
     */
    blocks_Delete(buildingId: string, blockId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get block summary
     * @return OK
     */
    blocks_GetSummary(buildingId: string, blockId: string): Promise<types.IBlockSummaryResponseDtoApiResponse>;

    /**
     * Get all concrete blocks in a building
     * @return OK
     */
    blocks_GetConcreteBlocks(buildingId: string): Promise<types.IConcreteBlockResponseDtoListApiResponse>;

    /**
     * Create new concrete block
     * @param body (optional) 
     * @return OK
     */
    blocks_CreateConcrete(buildingId: string, body: types.IConcreteCreateDto | undefined): Promise<types.IConcreteBlockResponseDtoApiResponse>;

    /**
     * Get all masonry blocks in a building
     * @return OK
     */
    blocks_GetMasonryBlocks(buildingId: string): Promise<types.IMasonryBlockResponseDtoListApiResponse>;

    /**
     * Create new masonry block
     * @param body (optional) 
     * @return OK
     */
    blocks_CreateMasonry(buildingId: string, body: types.IMasonryCreateDto | undefined): Promise<types.IMasonryBlockResponseDtoApiResponse>;

    /**
     * Update concrete block
     * @param body (optional) 
     * @return OK
     */
    blocks_UpdateConcrete(buildingId: string, blockId: string, body: types.IConcreteUpdateDto | undefined): Promise<types.IConcreteBlockResponseDtoApiResponse>;

    /**
     * Update masonry block
     * @param body (optional) 
     * @return OK
     */
    blocks_UpdateMasonry(buildingId: string, blockId: string, body: types.IMasonryUpdateDto | undefined): Promise<types.IMasonryBlockResponseDtoApiResponse>;

    /**
     * Get block statistics
     * @return OK
     */
    blocks_GetStatistics(buildingId: string, blockId: string): Promise<types.IBlockStatisticsResponseDtoApiResponse>;

    /**
     * Copy block within the same building
     * @param body (optional) 
     * @return OK
     */
    blocks_CopyBlock(buildingId: string, blockId: string, body: types.ICopyBlockDto | undefined): Promise<types.IBlockResponseDtoApiResponse>;
}

export interface IBuildingsClient {

    /**
     * Get all buildings with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    buildings_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IBuildingListResponseDtoPagedResponseApiResponse>;

    /**
     * Create new building
     * @param body (optional) 
     * @return OK
     */
    buildings_Create(body: types.IBuildingCreateDto | undefined): Promise<types.IBuildingResponseDtoApiResponse>;

    /**
     * Get building by ID
     * @return OK
     */
    buildings_GetById(id: string): Promise<types.IBuildingDetailResponseDtoApiResponse>;

    /**
     * Update building
     * @param body (optional) 
     * @return OK
     */
    buildings_Update(id: string, body: types.IBuildingUpdateDto | undefined): Promise<types.IBuildingResponseDtoApiResponse>;

    /**
     * Delete building
     * @return OK
     */
    buildings_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get buildings by TM ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    buildings_GetByTmId(tmId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IBuildingListResponseDtoPagedResponseApiResponse>;

    /**
     * Search buildings
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    buildings_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined, body: types.IBuildingSearchDto | undefined): Promise<types.IBuildingListResponseDtoPagedResponseApiResponse>;

    /**
     * Add block to building
     * @param body (optional) 
     * @return OK
     */
    buildings_AddBlock(id: string, body: types.IBuildingBlockAddDto | undefined): Promise<types.IBuildingResponseDtoApiResponse>;

    /**
     * Remove block from building
     * @return OK
     */
    buildings_RemoveBlock(id: string, blockId: string): Promise<types.IBuildingResponseDtoApiResponse>;

    /**
     * Get buildings by type
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    buildings_GetByType(type: enums.BuildingType, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IBuildingListResponseDtoPagedResponseApiResponse>;

    /**
     * Get buildings in scope of METU
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    buildings_GetInMETUScope(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IBuildingListResponseDtoPagedResponseApiResponse>;

    /**
     * Get building statistics
     * @return OK
     */
    buildings_GetStatistics(id: string): Promise<types.IBuildingStatisticsResponseDtoApiResponse>;
}

export interface IClientsClient {

    /**
     * Get all clients with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    clients_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IClientListResponseDtoPagedResponseApiResponse>;

    /**
     * Create new client
     * @param body (optional) 
     * @return OK
     */
    clients_Create(body: types.IClientCreateDto | undefined): Promise<types.IClientResponseDtoApiResponse>;

    /**
     * Get client by ID
     * @return OK
     */
    clients_GetById(id: string): Promise<types.IClientDetailResponseDtoApiResponse>;

    /**
     * Update client
     * @param body (optional) 
     * @return OK
     */
    clients_Update(id: string, body: types.IClientUpdateDto | undefined): Promise<types.IClientResponseDtoApiResponse>;

    /**
     * Delete client
     * @return OK
     */
    clients_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get client by name
     * @return OK
     */
    clients_GetByName(name: string): Promise<types.IClientResponseDtoApiResponse>;

    /**
     * Get client summary statistics
     * @return OK
     */
    clients_GetStatistics(id: string): Promise<types.IClientStatisticsResponseDtoApiResponse>;
}

export interface IDeploymentsClient {

    /**
     * Deploy pre-built application (Angular, React, Vue dist folder)
     * @param body (optional) 
     * @return OK
     */
    deployments_DeployPreBuiltApp(programId: string, body: types.IAppDeploymentRequestDto | undefined): Promise<types.IProgramDeploymentDtoApiResponse>;

    /**
     * Deploy static site (HTML, CSS, JS files)
     * @param body (optional) 
     * @return OK
     */
    deployments_DeployStaticSite(programId: string, body: types.IStaticSiteDeploymentRequestDto | undefined): Promise<types.IProgramDeploymentDtoApiResponse>;

    /**
     * Deploy container application using Docker
     * @param body (optional) 
     * @return OK
     */
    deployments_DeployContainerApp(programId: string, body: types.IContainerDeploymentRequestDto | undefined): Promise<types.IProgramDeploymentDtoApiResponse>;

    /**
     * Get deployment status for a program
     * @return OK
     */
    deployments_GetDeploymentStatus(programId: string): Promise<types.IProgramDeploymentStatusDtoApiResponse>;

    /**
     * Start a deployed application
     * @return OK
     */
    deployments_StartApplication(programId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Stop a deployed application
     * @return OK
     */
    deployments_StopApplication(programId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Restart a deployed application
     * @return OK
     */
    deployments_RestartApplication(programId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get application logs
     * @param lines (optional) 
     * @return OK
     */
    deployments_GetApplicationLogs(programId: string, lines: number | undefined): Promise<types.IStringListApiResponse>;

    /**
     * Update deployment configuration
     * @param body (optional) 
     * @return OK
     */
    deployments_UpdateDeploymentConfig(programId: string, body: types.IAppDeploymentConfigUpdateDto | undefined): Promise<types.IProgramDtoApiResponse>;

    /**
     * Get application health status
     * @return OK
     */
    deployments_GetApplicationHealth(programId: string): Promise<types.IApplicationHealthDtoApiResponse>;

    /**
     * Scale application instances (for container deployments)
     * @param body (optional) 
     * @return OK
     */
    deployments_ScaleApplication(programId: string, body: number | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get application metrics
     * @return OK
     */
    deployments_GetApplicationMetrics(programId: string): Promise<types.IApplicationMetricsDtoApiResponse>;

    /**
     * Undeploy an application
     * @return OK
     */
    deployments_UndeployApplication(programId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Validate deployment configuration
     * @param body (optional) 
     * @return OK
     */
    deployments_ValidateDeployment(programId: string, body: types.IAppDeploymentRequestDto | undefined): Promise<types.IDeploymentValidationResultApiResponse>;

    /**
     * Get supported deployment options for a program
     * @return OK
     */
    deployments_GetSupportedDeploymentOptions(programId: string): Promise<types.ISupportedDeploymentOptionDtoListApiResponse>;

    /**
     * Get deployment history for a program
     * @param limit (optional) 
     * @return OK
     */
    deployments_GetDeploymentHistory(programId: string, limit: number | undefined): Promise<types.IDeploymentHistoryDtoListApiResponse>;

    /**
     * Get all active deployments
     * @return OK
     */
    deployments_GetActiveDeployments(): Promise<types.IActiveDeploymentDtoListApiResponse>;

    /**
     * Get deployment statistics
     * @param fromDate (optional) 
     * @param toDate (optional) 
     * @return OK
     */
    deployments_GetDeploymentStatistics(fromDate: Date | undefined, toDate: Date | undefined): Promise<types.IDeploymentStatisticsDtoApiResponse>;

    /**
     * Rollback to previous deployment
     * @param body (optional) 
     * @return OK
     */
    deployments_RollbackDeployment(programId: string, body: types.IRollbackRequestDto | undefined): Promise<types.IProgramDeploymentDtoApiResponse>;

    /**
     * Get deployment environment variables
     * @return OK
     */
    deployments_GetDeploymentEnvironment(programId: string): Promise<types.IStringStringDictionaryApiResponse>;

    /**
     * Update deployment environment variables
     * @param body (optional) 
     * @return OK
     */
    deployments_UpdateDeploymentEnvironment(programId: string, body: { [key: string]: string; } | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get deployment resource usage
     * @return OK
     */
    deployments_GetDeploymentResourceUsage(programId: string): Promise<types.IDeploymentResourceUsageDtoApiResponse>;

    /**
     * Test deployment connection
     * @return OK
     */
    deployments_TestDeploymentConnection(programId: string): Promise<types.IConnectionTestResultApiResponse>;
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
    executions_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get execution by ID
     * @return OK
     */
    executions_GetById(id: string): Promise<types.IExecutionDetailDtoApiResponse>;

    /**
     * Delete execution
     * @return OK
     */
    executions_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Advanced execution search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    executions_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined, body: types.IExecutionSearchDto | undefined): Promise<types.IExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get executions by program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get executions by version
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetByVersion(versionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get executions by user
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetByUser(userId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get executions by status
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get running executions
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetRunningExecutions(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get completed executions
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetCompletedExecutions(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get failed executions
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetFailedExecutions(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get recent executions
     * @param count (optional) 
     * @return OK
     */
    executions_GetRecentExecutions(count: number | undefined): Promise<types.IExecutionListDtoListApiResponse>;

    /**
     * Execute program using current version
     * @param body (optional) 
     * @return OK
     */
    executions_ExecuteProgram(programId: string, body: types.IProgramExecutionRequestDto | undefined): Promise<types.IExecutionDtoApiResponse>;

    /**
     * Execute specific version
     * @param body (optional) 
     * @return OK
     */
    executions_ExecuteVersion(versionId: string, body: types.IVersionExecutionRequestDto | undefined): Promise<types.IExecutionDtoApiResponse>;

    /**
     * Execute with advanced parameters
     * @param body (optional) 
     * @return OK
     */
    executions_ExecuteWithParameters(body: types.IExecutionParametersDto | undefined): Promise<types.IExecutionDtoApiResponse>;

    /**
     * Stop execution
     * @return OK
     */
    executions_StopExecution(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Pause execution
     * @return OK
     */
    executions_PauseExecution(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Resume execution
     * @return OK
     */
    executions_ResumeExecution(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get execution status
     * @return OK
     */
    executions_GetExecutionStatus(id: string): Promise<types.IExecutionStatusDtoApiResponse>;

    /**
     * Get execution output stream
     * @return OK
     */
    executions_GetExecutionOutputStream(id: string): Promise<types.IStringApiResponse>;

    /**
     * Get execution logs
     * @param lines (optional) 
     * @return OK
     */
    executions_GetExecutionLogs(id: string, lines: number | undefined): Promise<types.IStringListApiResponse>;

    /**
     * Get execution result
     * @return OK
     */
    executions_GetExecutionResult(id: string): Promise<types.IExecutionResultDtoApiResponse>;

    /**
     * Deploy web application
     * @param body (optional) 
     * @return OK
     */
    executions_DeployWebApplication(programId: string, body: types.IWebAppDeploymentRequestDto | undefined): Promise<types.IExecutionDtoApiResponse>;

    /**
     * Get web application URL
     * @return OK
     */
    executions_GetWebApplicationUrl(id: string): Promise<types.IStringApiResponse>;

    /**
     * Get web application status
     * @return OK
     */
    executions_GetWebApplicationStatus(id: string): Promise<types.IWebAppStatusDtoApiResponse>;

    /**
     * Restart web application
     * @return OK
     */
    executions_RestartWebApplication(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Stop web application
     * @return OK
     */
    executions_StopWebApplication(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get resource usage for execution
     * @return OK
     */
    executions_GetResourceUsage(id: string): Promise<types.IExecutionResourceUsageDtoApiResponse>;

    /**
     * Update resource usage for execution
     * @param body (optional) 
     * @return OK
     */
    executions_UpdateResourceUsage(id: string, body: types.IExecutionResourceUpdateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get resource trends for program
     * @param days (optional) 
     * @return OK
     */
    executions_GetResourceTrends(programId: string, days: number | undefined): Promise<types.IExecutionResourceTrendDtoListApiResponse>;

    /**
     * Get resource limits for program
     * @return OK
     */
    executions_GetResourceLimits(programId: string): Promise<types.IExecutionResourceLimitsDtoApiResponse>;

    /**
     * Update resource limits for program
     * @param body (optional) 
     * @return OK
     */
    executions_UpdateResourceLimits(programId: string, body: types.IExecutionResourceLimitsUpdateDto | undefined): Promise<types.IBooleanApiResponse>;

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
    executions_GetExecutionStats(programId: string | undefined, userId: string | undefined, fromDate: Date | undefined, toDate: Date | undefined, statuses: string[] | undefined, executionType: string | undefined): Promise<types.IExecutionStatsDtoApiResponse>;

    /**
     * Get execution trends
     * @param programId (optional) 
     * @param days (optional) 
     * @return OK
     */
    executions_GetExecutionTrends(programId: string | undefined, days: number | undefined): Promise<types.IExecutionTrendDtoListApiResponse>;

    /**
     * Get execution performance for program
     * @return OK
     */
    executions_GetExecutionPerformance(programId: string): Promise<types.IExecutionPerformanceDtoListApiResponse>;

    /**
     * Get user execution summary
     * @return OK
     */
    executions_GetUserExecutionSummary(userId: string): Promise<types.IExecutionSummaryDtoApiResponse>;

    /**
     * Get execution environment for program
     * @return OK
     */
    executions_GetExecutionEnvironment(programId: string): Promise<types.IExecutionEnvironmentDtoApiResponse>;

    /**
     * Update execution environment for program
     * @param body (optional) 
     * @return OK
     */
    executions_UpdateExecutionEnvironment(programId: string, body: types.IExecutionEnvironmentUpdateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get execution templates
     * @param language (optional) 
     * @return OK
     */
    executions_GetExecutionTemplates(language: string | undefined): Promise<types.IExecutionTemplateDtoListApiResponse>;

    /**
     * Validate execution request
     * @param body (optional) 
     * @return OK
     */
    executions_ValidateExecutionRequest(body: types.IProgramExecutionRequestDto | undefined): Promise<types.IExecutionValidationResultApiResponse>;

    /**
     * Get execution queue status
     * @return OK
     */
    executions_GetExecutionQueueStatus(): Promise<types.IExecutionQueueStatusDtoApiResponse>;

    /**
     * Schedule execution for program
     * @param body (optional) 
     * @return OK
     */
    executions_ScheduleExecution(programId: string, body: types.IExecutionScheduleRequestDto | undefined): Promise<types.IExecutionDtoApiResponse>;

    /**
     * Cancel scheduled execution
     * @return OK
     */
    executions_CancelScheduledExecution(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get scheduled executions
     * @return OK
     */
    executions_GetScheduledExecutions(): Promise<types.IExecutionListDtoListApiResponse>;

    /**
     * Get supported programming languages
     * @return OK
     */
    executions_GetSupportedLanguages(): Promise<types.IStringListApiResponse>;

    /**
     * Analyze project structure
     * @param versionId (optional) 
     * @return OK
     */
    executions_AnalyzeProject(programId: string, versionId: string | undefined): Promise<types.IProjectStructureAnalysisDtoApiResponse>;

    /**
     * Validate project for execution
     * @param versionId (optional) 
     * @return OK
     */
    executions_ValidateProject(programId: string, versionId: string | undefined): Promise<types.IProjectValidationResultDtoApiResponse>;

    /**
     * Cleanup old executions
     * @param daysToKeep (optional) 
     * @return OK
     */
    executions_CleanupOldExecutions(daysToKeep: number | undefined): Promise<types.IInt32ApiResponse>;

    /**
     * Archive execution
     * @return OK
     */
    executions_ArchiveExecution(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get cleanup report
     * @return OK
     */
    executions_GetCleanupReport(): Promise<types.IExecutionCleanupReportDtoListApiResponse>;

    /**
     * List all output files from an execution
     * @return OK
     */
    executions_ListExecutionFiles(id: string): Promise<types.IExecutionFileListResponseDtoApiResponse>;

    /**
     * Download a specific output file from an execution
     * @return OK
     */
    executions_DownloadExecutionFile(id: string, filePath: string): Promise<types.IVersionFileDetailDtoApiResponse>;

    /**
     * Download all output files from an execution as a ZIP archive
     * @param includeMetadata (optional) 
     * @param compressionLevel (optional) 
     * @return OK
     */
    executions_DownloadAllExecutionFiles(id: string, includeMetadata: boolean | undefined, compressionLevel: string | undefined): Promise<void>;

    /**
     * Download selected output files from an execution as a ZIP archive
     * @param body (optional) 
     * @return OK
     */
    executions_BulkDownloadExecutionFiles(id: string, body: types.IBulkDownloadRequest | undefined): Promise<void>;

    /**
     * Run security scan on program
     * @return OK
     */
    executions_RunSecurityScan(programId: string): Promise<types.IExecutionSecurityScanResultApiResponse>;

    /**
     * Check if execution is allowed for user on program
     * @return OK
     */
    executions_IsExecutionAllowed(programId: string, userId: string): Promise<types.IBooleanApiResponse>;
}

export interface IFilesClient {

    /**
     * Store files for a specific program version
     * @param body (optional) 
     * @return OK
     */
    files_StoreVersionFiles(programId: string, versionId: string, body: types.IVersionFileCreateDto[] | undefined): Promise<types.IFileStorageResultListApiResponse>;

    /**
     * List all files for a specific program version
     * @return OK
     */
    files_ListVersionFiles(programId: string, versionId: string): Promise<types.IVersionFileDtoListApiResponse>;

    /**
     * Delete all files for a specific program version
     * @return OK
     */
    files_DeleteVersionFiles(programId: string, versionId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get file content for a specific program version
     * @return OK
     */
    files_GetVersionFile(programId: string, versionId: string, filePath: string): Promise<types.IVersionFileDetailDtoApiResponse>;

    /**
     * Update file content for a specific program version
     * @param body (optional) 
     * @return OK
     */
    files_UpdateVersionFile(programId: string, versionId: string, filePath: string, body: types.IVersionFileUpdateDto | undefined): Promise<types.IStringApiResponse>;

    /**
     * Delete file from a specific program version
     * @return OK
     */
    files_DeleteVersionFile(programId: string, versionId: string, filePath: string): Promise<types.IBooleanApiResponse>;

    /**
     * Copy files from one version to another within the same program
     * @return OK
     */
    files_CopyVersionFiles(programId: string, fromVersionId: string, toVersionId: string): Promise<types.IFileStorageResultListApiResponse>;

    /**
     * Delete all files for a program (all versions)
     * @return OK
     */
    files_DeleteProgramFiles(programId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get storage statistics for a program
     * @return OK
     */
    files_GetProgramStorageStatistics(programId: string): Promise<types.IStorageStatisticsApiResponse>;

    /**
     * Validate file before upload
     * @param body (optional) 
     * @return OK
     */
    files_ValidateFile(body: types.IFileValidationRequest | undefined): Promise<types.IFileValidationResultApiResponse>;

    /**
     * Calculate file hash
     * @param body (optional) 
     * @return OK
     */
    files_CalculateFileHash(body: string | undefined): Promise<types.IStringApiResponse>;

    /**
     * Get file path structure for a program version
     * @param filePath (optional) 
     * @return OK
     */
    files_GetVersionFilePath(programId: string, versionId: string, filePath: string | undefined): Promise<types.IStringApiResponse>;

    /**
     * Bulk download selected files from a program version as a ZIP archive
     * @param body (optional) 
     * @return OK
     */
    files_BulkDownloadFiles(programId: string, versionId: string, body: types.IBulkDownloadRequest | undefined): Promise<void>;

    /**
     * Download all files from a program version as a ZIP archive
     * @param includeMetadata (optional) 
     * @param compressionLevel (optional) 
     * @return OK
     */
    files_DownloadAllVersionFiles(programId: string, versionId: string, includeMetadata: boolean | undefined, compressionLevel: string | undefined): Promise<void>;

    /**
     * Bulk upload files to a program version
     * @param body (optional) 
     * @return OK
     */
    files_BulkUploadFiles(programId: string, versionId: string, body: types.IVersionFileCreateDto[] | undefined): Promise<types.IBulkOperationResultApiResponse>;

    /**
     * Bulk delete files from a program version
     * @param body (optional) 
     * @return OK
     */
    files_BulkDeleteFiles(programId: string, versionId: string, body: string[] | undefined): Promise<types.IBulkOperationResultApiResponse>;
}

export interface IGroupsClient {

    /**
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @return OK
     */
    groups_GetAll(pageNumber: number | undefined, pageSize: number | undefined): Promise<types.IGroupListDtoPagedResponse>;

    /**
     * @param body (optional) 
     * @return OK
     */
    groups_Create(body: types.IGroupCreateDto | undefined): Promise<types.IGroupDto>;

    /**
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param body (optional) 
     * @return OK
     */
    groups_Search(pageNumber: number | undefined, pageSize: number | undefined, body: types.IGroupSearchDto | undefined): Promise<types.IGroupListDtoPagedResponse>;

    /**
     * @return OK
     */
    groups_GetById(id: string): Promise<types.IGroupDto>;

    /**
     * @param body (optional) 
     * @return OK
     */
    groups_Update(id: string, body: types.IGroupUpdateDto | undefined): Promise<types.IGroupDto>;

    /**
     * @return OK
     */
    groups_Delete(id: string): Promise<void>;

    /**
     * @return OK
     */
    groups_GetActive(): Promise<types.IGroupListDto[]>;

    /**
     * @return OK
     */
    groups_GetByCreator(creatorId: string): Promise<types.IGroupListDto[]>;

    /**
     * @return OK
     */
    groups_GetUserGroups(userId: string): Promise<types.IGroupListDto[]>;

    /**
     * @param body (optional) 
     * @return OK
     */
    groups_UpdateStatus(id: string, body: boolean | undefined): Promise<void>;

    /**
     * @param body (optional) 
     * @return OK
     */
    groups_AddMember(id: string, body: string | undefined): Promise<void>;

    /**
     * @return OK
     */
    groups_GetMembers(id: string): Promise<types.IGroupMemberDto[]>;

    /**
     * @return OK
     */
    groups_RemoveMember(id: string, userId: string): Promise<void>;

    /**
     * @param body (optional) 
     * @return OK
     */
    groups_AddMembers(id: string, body: string[] | undefined): Promise<void>;

    /**
     * @param body (optional) 
     * @return OK
     */
    groups_RemoveMembers(id: string, body: string[] | undefined): Promise<void>;

    /**
     * @return OK
     */
    groups_CheckMembership(id: string, userId: string): Promise<boolean>;
}

export interface IIconsClient {

    /**
     * @param body (optional) 
     * @return OK
     */
    icons_CreateIcon(body: types.IIconCreateDto | undefined): Promise<types.IIconResponseDtoApiResponse>;

    /**
     * @return OK
     */
    icons_GetIcon(id: string): Promise<types.IIconResponseDtoApiResponse>;

    /**
     * @param body (optional) 
     * @return OK
     */
    icons_UpdateIcon(id: string, body: types.IIconUpdateDto | undefined): Promise<types.IIconResponseDtoApiResponse>;

    /**
     * @return OK
     */
    icons_DeleteIcon(id: string): Promise<types.IObjectApiResponse>;

    /**
     * @return OK
     */
    icons_GetIconByEntity(entityType: enums.IconEntityType, entityId: string): Promise<types.IIconResponseDtoApiResponse>;

    /**
     * @return OK
     */
    icons_DeleteIconByEntity(entityType: enums.IconEntityType, entityId: string): Promise<types.IObjectApiResponse>;

    /**
     * @return OK
     */
    icons_GetIconsByType(entityType: enums.IconEntityType): Promise<types.IIconResponseDtoIEnumerableApiResponse>;

    /**
     * @param body (optional) 
     * @return OK
     */
    icons_GetIconsBatch(body: types.IIconBatchRequestDto | undefined): Promise<types.IIconResponseDtoIEnumerableApiResponse>;

    /**
     * @param body (optional) 
     * @return OK
     */
    icons_GetIconsByEntityIds(body: types.IIconEntityBatchRequestDto | undefined): Promise<types.IIconResponseDtoIEnumerableApiResponse>;

    /**
     * @return OK
     */
    icons_GetUserIcons(): Promise<types.IIconResponseDtoIEnumerableApiResponse>;

    /**
     * @return OK
     */
    icons_GetIconStats(entityType: enums.IconEntityType): Promise<types.IIconStatsResponseDtoApiResponse>;

    /**
     * @param body (optional) 
     * @return OK
     */
    icons_ValidateIconConstraints(body: types.IIconValidationRequestDto | undefined): Promise<types.IIconValidationResponseDtoApiResponse>;
}

export interface IProgramsClient {

    /**
     * Get all programs with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IProgramListDtoPagedResponseApiResponse>;

    /**
     * Create new program entity
    Note: This creates the program metadata only. Use VersionsController commit process to add files.
     * @param body (optional) 
     * @return OK
     */
    programs_Create(body: types.IProgramCreateDto | undefined): Promise<types.IProgramDtoApiResponse>;

    /**
     * Get program by ID with full details (excluding files - use VersionsController for files)
     * @return OK
     */
    programs_GetById(id: string): Promise<types.IProgramDetailDtoApiResponse>;

    /**
     * Update program metadata
    Note: File changes should be done through VersionsController commit process
     * @param body (optional) 
     * @return OK
     */
    programs_Update(id: string, body: types.IProgramUpdateDto | undefined): Promise<types.IProgramDtoApiResponse>;

    /**
     * Delete program
    Note: This will also trigger cleanup of associated versions and files through service layer
     * @return OK
     */
    programs_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Advanced program search with filtering
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    programs_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined, body: types.IProgramSearchDto | undefined): Promise<types.IProgramListDtoPagedResponseApiResponse>;

    /**
     * Get programs by creator
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetByCreator(creatorId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IProgramListDtoPagedResponseApiResponse>;

    /**
     * Get programs by status (draft, active, archived, etc.)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IProgramListDtoPagedResponseApiResponse>;

    /**
     * Get programs by type (web, console, api, etc.)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetByType(type: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IProgramListDtoPagedResponseApiResponse>;

    /**
     * Get programs by programming language
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetByLanguage(language: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IProgramListDtoPagedResponseApiResponse>;

    /**
     * Get programs accessible to current user based on permissions with aggregated data
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetUserAccessiblePrograms(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IProgramSummaryDtoPagedResponseApiResponse>;

    /**
     * Get programs accessible to a group
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetGroupAccessiblePrograms(groupId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IProgramListDtoPagedResponseApiResponse>;

    /**
     * Update program status (draft, active, archived, deprecated)
     * @param body (optional) 
     * @return OK
     */
    programs_UpdateStatus(id: string, body: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Update program's current version (must be an approved version)
    Note: This sets which version is considered "current" for execution
     * @param body (optional) 
     * @return OK
     */
    programs_UpdateCurrentVersion(id: string, body: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get all permissions for a program
     * @return OK
     */
    programs_GetProgramPermissions(id: string): Promise<types.IProgramPermissionDtoListApiResponse>;

    /**
     * Add user permission to program
     * @param body (optional) 
     * @return OK
     */
    programs_AddUserPermission(id: string, body: types.IProgramUserPermissionDto | undefined): Promise<types.IProgramDtoApiResponse>;

    /**
     * Update user permission for program
     * @param body (optional) 
     * @return OK
     */
    programs_UpdateUserPermission(id: string, userId: string, body: types.IProgramUserPermissionDto | undefined): Promise<types.IProgramDtoApiResponse>;

    /**
     * Remove user permission from program
     * @return OK
     */
    programs_RemoveUserPermission(id: string, userId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Add group permission to program
     * @param body (optional) 
     * @return OK
     */
    programs_AddGroupPermission(id: string, body: types.IProgramGroupPermissionDto | undefined): Promise<types.IProgramDtoApiResponse>;

    /**
     * Update group permission for program
     * @param body (optional) 
     * @return OK
     */
    programs_UpdateGroupPermission(id: string, groupId: string, body: types.IProgramGroupPermissionDto | undefined): Promise<types.IProgramDtoApiResponse>;

    /**
     * Remove group permission from program
     * @return OK
     */
    programs_RemoveGroupPermission(id: string, groupId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get current deployment status for program
    Note: For deploying specific versions, use VersionsController
     * @return OK
     */
    programs_GetDeploymentStatus(id: string): Promise<types.IProgramDeploymentStatusDtoApiResponse>;

    /**
     * Get application logs for deployed program
     * @param lines (optional) 
     * @return OK
     */
    programs_GetApplicationLogs(id: string, lines: number | undefined): Promise<types.IStringListApiResponse>;

    /**
     * Restart deployed application
    Note: This restarts the currently deployed version
     * @return OK
     */
    programs_RestartApplication(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Validate program name uniqueness
     * @param excludeId (optional) 
     * @param body (optional) 
     * @return OK
     */
    programs_ValidateNameUnique(excludeId: string | undefined, body: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Validate user access to program
     * @param requiredAccessLevel (optional) 
     * @return OK
     */
    programs_ValidateUserAccess(id: string, requiredAccessLevel: string | undefined): Promise<types.IBooleanApiResponse>;
}

export interface IRegionsClient {

    /**
     * Get all regions with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    regions_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRegionListResponseDtoPagedResponseApiResponse>;

    /**
     * Create new region
     * @param body (optional) 
     * @return OK
     */
    regions_Create(body: types.IRegionCreateDto | undefined): Promise<types.IRegionResponseDtoApiResponse>;

    /**
     * Get region by ID
     * @return OK
     */
    regions_GetById(id: string): Promise<types.IRegionDetailResponseDtoApiResponse>;

    /**
     * Update region
     * @param body (optional) 
     * @return OK
     */
    regions_Update(id: string, body: types.IRegionUpdateDto | undefined): Promise<types.IRegionResponseDtoApiResponse>;

    /**
     * Delete region
     * @return OK
     */
    regions_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get region by number
     * @return OK
     */
    regions_GetByNumber(regionNo: number): Promise<types.IRegionResponseDtoApiResponse>;

    /**
     * Get regions by client ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    regions_GetByClientId(clientId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRegionListResponseDtoPagedResponseApiResponse>;

    /**
     * Update region cities
     * @param body (optional) 
     * @return OK
     */
    regions_UpdateCities(id: string, body: types.IRegionCityUpdateDto | undefined): Promise<types.IRegionResponseDtoApiResponse>;

    /**
     * Get region statistics
     * @return OK
     */
    regions_GetStatistics(id: string): Promise<types.IRegionStatisticsResponseDtoApiResponse>;

    /**
     * Get regions that operate in a specific city
     * @return OK
     */
    regions_GetRegionsInCity(city: string): Promise<types.IRegionSummaryResponseDtoListApiResponse>;
}

export interface IRemoteAppsClient {

    /**
     * Get all remote apps with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    remoteApps_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRemoteAppListDtoPagedResponseApiResponse>;

    /**
     * Create new remote app
     * @param body (optional) 
     * @return OK
     */
    remoteApps_Create(body: types.IRemoteAppCreateDto | undefined): Promise<types.IRemoteAppDtoApiResponse>;

    /**
     * Get remote app by ID with full details
     * @return OK
     */
    remoteApps_GetById(id: string): Promise<types.IRemoteAppDetailDtoApiResponse>;

    /**
     * Update remote app
     * @param body (optional) 
     * @return OK
     */
    remoteApps_Update(id: string, body: types.IRemoteAppUpdateDto | undefined): Promise<types.IRemoteAppDtoApiResponse>;

    /**
     * Delete remote app
     * @return OK
     */
    remoteApps_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get remote apps by creator
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    remoteApps_GetByCreator(creatorId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRemoteAppListDtoPagedResponseApiResponse>;

    /**
     * Get remote apps by current user
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    remoteApps_GetByCurrentUser(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRemoteAppListDtoPagedResponseApiResponse>;

    /**
     * Get remote apps by status (active, inactive, etc.)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    remoteApps_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRemoteAppListDtoPagedResponseApiResponse>;

    /**
     * Get remote apps accessible to current user (public apps + assigned private apps)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    remoteApps_GetUserAccessibleApps(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRemoteAppListDtoPagedResponseApiResponse>;

    /**
     * Get public remote apps
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    remoteApps_GetPublicApps(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRemoteAppListDtoPagedResponseApiResponse>;

    /**
     * Assign user to remote app
     * @param body (optional) 
     * @return OK
     */
    remoteApps_AssignUser(id: string, body: types.IRemoteAppUserAssignmentDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Unassign user from remote app
     * @return OK
     */
    remoteApps_UnassignUser(id: string, userId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Check if user is assigned to remote app
     * @return OK
     */
    remoteApps_IsUserAssigned(id: string, userId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Update remote app status (active, inactive, maintenance)
     * @param body (optional) 
     * @return OK
     */
    remoteApps_UpdateStatus(id: string, body: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Launch remote app - returns launch URL in response DTO
     * @return OK
     */
    remoteApps_Launch(id: string): Promise<types.IRemoteAppLaunchDtoApiResponse>;

    /**
     * Validate remote app name uniqueness
     * @param excludeId (optional) 
     * @param body (optional) 
     * @return OK
     */
    remoteApps_ValidateNameUnique(excludeId: string | undefined, body: string | undefined): Promise<types.IBooleanApiResponse>;
}

export interface IRequestsClient {

    /**
     * Get all requests with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Create new request
     * @param body (optional) 
     * @return OK
     */
    requests_Create(body: types.IRequestCreateDto | undefined): Promise<types.IRequestDtoApiResponse>;

    /**
     * Get request by ID
     * @return OK
     */
    requests_GetById(id: string): Promise<types.IRequestDetailDtoApiResponse>;

    /**
     * Update request
     * @param body (optional) 
     * @return OK
     */
    requests_Update(id: string, body: types.IRequestUpdateDto | undefined): Promise<types.IRequestDtoApiResponse>;

    /**
     * Delete request
     * @return OK
     */
    requests_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Advanced request search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    requests_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined, body: types.IRequestSearchDto | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Get requests by type
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByType(type: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Get requests by status
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Get requests by priority
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByPriority(priority: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Get requests by requester
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByRequester(userId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Get requests by assignee
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByAssignee(userId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Get requests by program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Get unassigned requests
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetUnassignedRequests(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Update request status
     * @param body (optional) 
     * @return OK
     */
    requests_UpdateStatus(id: string, body: types.IRequestStatusUpdateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Assign request
     * @param body (optional) 
     * @return OK
     */
    requests_AssignRequest(id: string, body: types.IRequestAssignmentDto | undefined): Promise<types.IRequestDtoApiResponse>;

    /**
     * Unassign request
     * @return OK
     */
    requests_UnassignRequest(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Update request priority
     * @param body (optional) 
     * @return OK
     */
    requests_UpdatePriority(id: string, body: types.IRequestPriorityUpdateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Add response to request
     * @param body (optional) 
     * @return OK
     */
    requests_AddResponse(id: string, body: types.IRequestResponseCreateDto | undefined): Promise<types.IRequestResponseDtoApiResponse>;

    /**
     * Get responses for request
     * @return OK
     */
    requests_GetResponses(id: string): Promise<types.IRequestResponseDtoListApiResponse>;

    /**
     * Update request response
     * @param body (optional) 
     * @return OK
     */
    requests_UpdateResponse(id: string, responseId: string, body: types.IRequestResponseUpdateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Delete request response
     * @return OK
     */
    requests_DeleteResponse(id: string, responseId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Open request
     * @return OK
     */
    requests_OpenRequest(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Start work on request
     * @param body (optional) 
     * @return OK
     */
    requests_StartWorkOnRequest(id: string, body: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Complete request
     * @param body (optional) 
     * @return OK
     */
    requests_CompleteRequest(id: string, body: types.IRequestCompletionDto | undefined): Promise<types.IRequestDtoApiResponse>;

    /**
     * Reject request
     * @param body (optional) 
     * @return OK
     */
    requests_RejectRequest(id: string, body: types.IRequestRejectionDto | undefined): Promise<types.IRequestDtoApiResponse>;

    /**
     * Reopen request
     * @param body (optional) 
     * @return OK
     */
    requests_ReopenRequest(id: string, body: string | undefined): Promise<types.IBooleanApiResponse>;

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
    requests_GetRequestStats(programId: string | undefined, fromDate: Date | undefined, toDate: Date | undefined, type: string | undefined, assignedTo: string | undefined, statuses: string[] | undefined): Promise<types.IRequestStatsDtoApiResponse>;

    /**
     * Get request trends
     * @param days (optional) 
     * @return OK
     */
    requests_GetRequestTrends(days: number | undefined): Promise<types.IRequestTrendDtoListApiResponse>;

    /**
     * Get request metrics by type
     * @return OK
     */
    requests_GetRequestMetricsByType(): Promise<types.IRequestMetricDtoListApiResponse>;

    /**
     * Get request metrics by status
     * @return OK
     */
    requests_GetRequestMetricsByStatus(): Promise<types.IRequestMetricDtoListApiResponse>;

    /**
     * Get assignee performance
     * @return OK
     */
    requests_GetAssigneePerformance(): Promise<types.IRequestPerformanceDtoListApiResponse>;

    /**
     * Get request templates
     * @param type (optional) 
     * @return OK
     */
    requests_GetRequestTemplates(type: string | undefined): Promise<types.IRequestTemplateDtoListApiResponse>;

    /**
     * Create request template
     * @param body (optional) 
     * @return OK
     */
    requests_CreateRequestTemplate(body: types.IRequestTemplateCreateDto | undefined): Promise<types.IRequestTemplateDtoApiResponse>;

    /**
     * Create request from template
     * @param body (optional) 
     * @return OK
     */
    requests_CreateFromTemplate(templateId: string, body: types.IRequestFromTemplateDto | undefined): Promise<types.IRequestDtoApiResponse>;

    /**
     * Subscribe to request updates
     * @param body (optional) 
     * @return OK
     */
    requests_SubscribeToRequestUpdates(id: string, body: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Unsubscribe from request updates
     * @param body (optional) 
     * @return OK
     */
    requests_UnsubscribeFromRequestUpdates(id: string, body: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get request subscribers
     * @return OK
     */
    requests_GetRequestSubscribers(id: string): Promise<types.IStringListApiResponse>;

    /**
     * Validate request
     * @param body (optional) 
     * @return OK
     */
    requests_ValidateRequest(body: types.IRequestCreateDto | undefined): Promise<types.IRequestValidationResultApiResponse>;

    /**
     * Check if user can modify request
     * @param userId (optional) 
     * @return OK
     */
    requests_CanUserModifyRequest(id: string, userId: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get available request types
     * @return OK
     */
    requests_GetAvailableRequestTypes(): Promise<types.IStringListApiResponse>;

    /**
     * Get available request statuses
     * @return OK
     */
    requests_GetAvailableRequestStatuses(): Promise<types.IStringListApiResponse>;

    /**
     * Get available request priorities
     * @return OK
     */
    requests_GetAvailableRequestPriorities(): Promise<types.IStringListApiResponse>;

    /**
     * Get my requests (current user)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetMyRequests(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Get my assigned requests (current user)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetMyAssignments(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Get recent requests
     * @param count (optional) 
     * @return OK
     */
    requests_GetRecentRequests(count: number | undefined): Promise<types.IRequestListDtoListApiResponse>;

    /**
     * Get priority requests
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetPriorityRequests(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Get overdue requests
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetOverdueRequests(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IRequestListDtoPagedResponseApiResponse>;

    /**
     * Bulk update request status
     * @param body (optional) 
     * @return OK
     */
    requests_BulkUpdateStatus(body: types.IBulkRequestStatusUpdateDto | undefined): Promise<types.IBooleanApiResponse>;
}

export interface ITMsClient {

    /**
     * Get all TMs with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    tMs_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.ITMListResponseDtoPagedResponseApiResponse>;

    /**
     * Create new TM
     * @param body (optional) 
     * @return OK
     */
    tMs_Create(body: types.ITMCreateDto | undefined): Promise<types.ITMResponseDtoApiResponse>;

    /**
     * Get TM by ID
     * @return OK
     */
    tMs_GetById(id: string): Promise<types.ITMDetailResponseDtoApiResponse>;

    /**
     * Update TM
     * @param body (optional) 
     * @return OK
     */
    tMs_Update(id: string, body: types.ITMUpdateDto | undefined): Promise<types.ITMResponseDtoApiResponse>;

    /**
     * Delete TM
     * @return OK
     */
    tMs_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get TM by name
     * @return OK
     */
    tMs_GetByName(name: string): Promise<types.ITMResponseDtoApiResponse>;

    /**
     * Get TMs by region ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    tMs_GetByRegionId(regionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.ITMListResponseDtoPagedResponseApiResponse>;

    /**
     * Search TMs
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    tMs_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined, body: types.ITMSearchDto | undefined): Promise<types.ITMListResponseDtoPagedResponseApiResponse>;

    /**
     * Update TM state
     * @param body (optional) 
     * @return OK
     */
    tMs_UpdateState(id: string, body: types.ITMStateUpdateDto | undefined): Promise<types.ITMResponseDtoApiResponse>;

    /**
     * Update TM voltages
     * @param body (optional) 
     * @return OK
     */
    tMs_UpdateVoltages(id: string, body: types.ITMVoltageUpdateDto | undefined): Promise<types.ITMResponseDtoApiResponse>;

    /**
     * Get TM statistics
     * @return OK
     */
    tMs_GetStatistics(id: string): Promise<types.ITMStatisticsResponseDtoApiResponse>;

    /**
     * Get hazard summary for TM
     * @return OK
     */
    tMs_GetHazardSummary(id: string): Promise<types.ITMHazardSummaryResponseDtoApiResponse>;
}

export interface IUIWorkflowClient {

    /**
     * Gets all pending UI interactions for the current user
     * @return OK
     */
    uIWorkflow_GetPendingUIInteractions(): Promise<types.IUIInteractionSessionListApiResponseApiResponse>;

    /**
     * Gets all UI interactions for a specific workflow execution
     * @param workflowId The workflow ID
     * @param executionId The execution ID
     * @return OK
     */
    uIWorkflow_GetWorkflowUIInteractions(workflowId: string, executionId: string): Promise<types.IUIInteractionSessionListApiResponseApiResponse>;

    /**
     * Gets details of a specific UI interaction
     * @param interactionId The interaction ID
     * @return OK
     */
    uIWorkflow_GetUIInteraction(interactionId: string): Promise<types.IUIInteractionDetailApiResponseApiResponse>;

    /**
     * Submits a response to a UI interaction
     * @param interactionId The interaction ID
     * @param body (optional) The submission request
     * @return OK
     */
    uIWorkflow_SubmitUIInteraction(interactionId: string, body: types.IUIInteractionSubmissionRequest | undefined): Promise<types.IStringApiResponse>;

    /**
     * Completes a UI interaction and continues workflow execution
     * @param interactionId The interaction ID
     * @param body (optional) The output data from user interaction
     * @return OK
     */
    uIWorkflow_CompleteUIInteraction(interactionId: string, body: { [key: string]: any; } | undefined): Promise<types.INodeExecutionResponseDtoApiResponse>;

    /**
     * Cancels a UI interaction
     * @param interactionId The interaction ID
     * @param body (optional) 
     * @return OK
     */
    uIWorkflow_CancelUIInteraction(interactionId: string, body: types.ICancelUIInteractionRequest | undefined): Promise<types.IStringApiResponse>;

    /**
     * Gets all active UI interactions (admin endpoint)
     * @return OK
     */
    uIWorkflow_GetActiveUIInteractions(): Promise<types.IUIInteractionSessionListApiResponseApiResponse>;

    /**
     * Processes timed out interactions (admin endpoint)
     * @return OK
     */
    uIWorkflow_ProcessTimedOutInteractions(): Promise<types.IStringApiResponse>;
}

export interface IUiComponentsClient {

    /**
     * Get all UI components with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IUiComponentListDtoPagedResponseApiResponse>;

    /**
     * Get UI component by ID
     * @return OK
     */
    uiComponents_GetById(id: string): Promise<types.IUiComponentDetailDtoApiResponse>;

    /**
     * Update UI component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_Update(id: string, body: types.IUiComponentUpdateDto | undefined): Promise<types.IUiComponentDtoApiResponse>;

    /**
     * Delete UI component
     * @return OK
     */
    uiComponents_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Create new UI component for a specific program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_Create(programId: string, versionId: string, body: types.IUiComponentCreateDto | undefined): Promise<types.IUiComponentDtoApiResponse>;

    /**
     * Get UI components for a specific program version
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByProgramVersion(programId: string, versionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IUiComponentListDtoPagedResponseApiResponse>;

    /**
     * Copy components from one version to another
     * @param body (optional) 
     * @return OK
     */
    uiComponents_CopyComponentsToNewVersion(programId: string, fromVersionId: string, toVersionId: string, body: string[] | undefined): Promise<types.IUiComponentListDtoListApiResponse>;

    /**
     * Copy a component to a different program version
     * @param newName (optional) 
     * @return OK
     */
    uiComponents_CopyComponentToVersion(componentId: string, targetProgramId: string, targetVersionId: string, newName: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get available components for a program version
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetAvailableForProgramVersion(programId: string, versionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IUiComponentListDtoPagedResponseApiResponse>;

    /**
     * Advanced UI component search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    uiComponents_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined, body: types.IUiComponentSearchDto | undefined): Promise<types.IUiComponentListDtoPagedResponseApiResponse>;

    /**
     * Get UI components by program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IUiComponentListDtoPagedResponseApiResponse>;

    /**
     * Get UI components by type
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByType(type: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IUiComponentListDtoPagedResponseApiResponse>;

    /**
     * Get UI components by creator
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByCreator(creatorId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IUiComponentListDtoPagedResponseApiResponse>;

    /**
     * Get UI components by status
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IUiComponentListDtoPagedResponseApiResponse>;

    /**
     * Update UI component status
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateStatus(id: string, body: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Activate UI component
     * @return OK
     */
    uiComponents_ActivateComponent(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Deactivate UI component
     * @return OK
     */
    uiComponents_DeactivateComponent(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Deprecate UI component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_DeprecateComponent(id: string, body: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get UI component bundle
     * @return OK
     */
    uiComponents_GetComponentBundle(id: string): Promise<types.IUiComponentBundleDtoApiResponse>;

    /**
     * Upload UI component bundle (assets will be stored in version-specific storage)
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UploadComponentBundle(id: string, body: types.IUiComponentBundleUploadDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Update UI component assets
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateComponentAssets(id: string, body: types.IUiComponentAssetDto[] | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get UI component assets (retrieved from version-specific storage)
     * @return OK
     */
    uiComponents_GetComponentAssets(id: string): Promise<types.IUiComponentAssetDtoListApiResponse>;

    /**
     * Get UI component configuration
     * @return OK
     */
    uiComponents_GetComponentConfiguration(id: string): Promise<types.IUiComponentConfigDtoApiResponse>;

    /**
     * Update UI component configuration
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateComponentConfiguration(id: string, body: types.IUiComponentConfigUpdateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get UI component schema
     * @return OK
     */
    uiComponents_GetComponentSchema(id: string): Promise<types.IUiComponentSchemaDtoApiResponse>;

    /**
     * Update UI component schema
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateComponentSchema(id: string, body: types.IUiComponentSchemaUpdateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Validate UI component schema
     * @param body (optional) 
     * @return OK
     */
    uiComponents_ValidateComponentSchema(id: string, body: any | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get UI component usage
     * @return OK
     */
    uiComponents_GetComponentUsage(id: string): Promise<types.IUiComponentUsageDtoListApiResponse>;

    /**
     * Get program version component mappings
     * @return OK
     */
    uiComponents_GetProgramVersionComponentMappings(programId: string, versionId: string): Promise<types.IProgramComponentMappingDtoListApiResponse>;

    /**
     * Map component to program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_MapComponentToProgramVersion(programId: string, versionId: string, body: types.IUiComponentMappingDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Unmap component from program version
     * @return OK
     */
    uiComponents_UnmapComponentFromProgramVersion(programId: string, versionId: string, componentId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get recommended components for program version
     * @return OK
     */
    uiComponents_GetRecommendedComponents(programId: string, versionId: string): Promise<types.IUiComponentRecommendationDtoListApiResponse>;

    /**
     * Search compatible components
     * @param body (optional) 
     * @return OK
     */
    uiComponents_SearchCompatibleComponents(body: types.IUiComponentCompatibilitySearchDto | undefined): Promise<types.IUiComponentListDtoListApiResponse>;

    /**
     * Validate component name uniqueness for program version
     * @param excludeId (optional) 
     * @param body (optional) 
     * @return OK
     */
    uiComponents_ValidateNameUniqueForVersion(programId: string, versionId: string, excludeId: string | undefined, body: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Validate component definition for program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_ValidateComponentDefinition(programId: string, versionId: string, body: types.IUiComponentCreateDto | undefined): Promise<types.IUiComponentValidationResultApiResponse>;

    /**
     * Get available component types
     * @return OK
     */
    uiComponents_GetAvailableComponentTypes(): Promise<types.IStringListApiResponse>;

    /**
     * Get component categories
     * @return OK
     */
    uiComponents_GetComponentCategories(): Promise<types.IUiComponentCategoryDtoListApiResponse>;

    /**
     * Add tags to component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_AddComponentTags(id: string, body: string[] | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Remove tags from component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_RemoveComponentTags(id: string, body: string[] | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get current user's accessible components
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetMyComponents(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IUiComponentListDtoPagedResponseApiResponse>;

    /**
     * Clone component to a specific program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_CloneComponent(id: string, targetProgramId: string, targetVersionId: string, body: string | undefined): Promise<types.IUiComponentDtoApiResponse>;
}

export interface IUsersClient {

    /**
     * Get all users with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    users_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IUserListDtoPagedResponseApiResponse>;

    /**
     * Create new user (admin only)
     * @param body (optional) 
     * @return OK
     */
    users_Create(body: types.IUserRegisterDto | undefined): Promise<types.IUserDtoApiResponse>;

    /**
     * Get user by ID
     * @return OK
     */
    users_GetById(id: string): Promise<types.IUserDetailDtoApiResponse>;

    /**
     * Update user details
     * @param body (optional) 
     * @return OK
     */
    users_Update(id: string, body: types.IUserUpdateDto | undefined): Promise<types.IUserDtoApiResponse>;

    /**
     * Delete user
     * @return OK
     */
    users_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get current user profile
     * @return OK
     */
    users_GetCurrentUserProfile(): Promise<types.IUserProfileDtoApiResponse>;

    /**
     * Update current user profile
     * @param body (optional) 
     * @return OK
     */
    users_UpdateCurrentUserProfile(body: types.IUserUpdateDto | undefined): Promise<types.IUserDtoApiResponse>;

    /**
     * Get current user permissions
     * @return OK
     */
    users_GetCurrentUserPermissions(): Promise<types.IStringListApiResponse>;

    /**
     * Advanced user search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    users_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined, body: types.IUserSearchDto | undefined): Promise<types.IUserListDtoPagedResponseApiResponse>;

    /**
     * Get users by role
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    users_GetByRole(role: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IUserListDtoPagedResponseApiResponse>;

    /**
     * Get active users only
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    users_GetActiveUsers(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IUserListDtoPagedResponseApiResponse>;

    /**
     * Update user roles
     * @param body (optional) 
     * @return OK
     */
    users_UpdateRoles(id: string, body: types.IUserRoleUpdateDto | undefined): Promise<types.IUserDtoApiResponse>;

    /**
     * Update user permissions
     * @param body (optional) 
     * @return OK
     */
    users_UpdatePermissions(id: string, body: types.IUserPermissionUpdateDto | undefined): Promise<types.IUserDtoApiResponse>;

    /**
     * Get user's effective permissions (role + direct)
     * @return OK
     */
    users_GetEffectivePermissions(id: string): Promise<types.IStringListApiResponse>;

    /**
     * Assign clients to user
     * @param body (optional) 
     * @return OK
     */
    users_AssignClients(id: string, body: types.IUserClientAssignmentDto | undefined): Promise<types.IUserDtoApiResponse>;

    /**
     * Activate user account
     * @return OK
     */
    users_Activate(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Deactivate user account
     * @return OK
     */
    users_Deactivate(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Revoke all refresh tokens for user
     * @return OK
     */
    users_RevokeAllTokens(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get user by email
     * @return OK
     */
    users_GetByEmail(email: string): Promise<types.IUserDtoApiResponse>;

    /**
     * Get user by username
     * @return OK
     */
    users_GetByUsername(username: string): Promise<types.IUserDtoApiResponse>;

    /**
     * Get available roles
     * @return OK
     */
    users_GetAvailableRoles(): Promise<types.IStringListApiResponse>;

    /**
     * Get available permissions
     * @return OK
     */
    users_GetAvailablePermissions(): Promise<types.IStringStringListDictionaryApiResponse>;
}

export interface IVersionsClient {

    /**
     * Get all versions with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IVersionListDtoPagedResponseApiResponse>;

    /**
     * Create new version for a program
    Note: This creates the version entity. Files are uploaded separately through the commit process.
     * @param body (optional) 
     * @return OK
     */
    versions_Create(body: types.IVersionCreateDto | undefined): Promise<types.IVersionDtoApiResponse>;

    /**
     * Get version by ID with full details including files
     * @return OK
     */
    versions_GetById(id: string): Promise<types.IVersionDetailDtoApiResponse>;

    /**
     * Update version metadata (commit message, review comments)
    Note: File changes should be done through the commit process
     * @param body (optional) 
     * @return OK
     */
    versions_Update(id: string, body: types.IVersionUpdateDto | undefined): Promise<types.IVersionDtoApiResponse>;

    /**
     * Delete version (only if pending and not current)
    This will also delete associated files through IFileStorageService
     * @return OK
     */
    versions_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Advanced version search with filtering
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    versions_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined, body: types.IVersionSearchDto | undefined): Promise<types.IVersionListDtoPagedResponseApiResponse>;

    /**
     * Get all versions for a specific program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IVersionListDtoPagedResponseApiResponse>;

    /**
     * Get latest version for a program
     * @return OK
     */
    versions_GetLatestVersionForProgram(programId: string): Promise<types.IVersionDtoApiResponse>;

    /**
     * Get specific version by program and version number
     * @return OK
     */
    versions_GetByProgramAndVersionNumber(programId: string, versionNumber: number): Promise<types.IVersionDtoApiResponse>;

    /**
     * Get next version number for a program
     * @return OK
     */
    versions_GetNextVersionNumber(programId: string): Promise<types.IInt32ApiResponse>;

    /**
     * Get versions by creator
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByCreator(creatorId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IVersionListDtoPagedResponseApiResponse>;

    /**
     * Get versions by status (pending, approved, rejected)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IVersionListDtoPagedResponseApiResponse>;

    /**
     * Get all versions pending review
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetPendingReviews(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IVersionListDtoPagedResponseApiResponse>;

    /**
     * Get versions by reviewer
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByReviewer(reviewerId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IVersionListDtoPagedResponseApiResponse>;

    /**
     * Update version status
     * @param body (optional) 
     * @return OK
     */
    versions_UpdateStatus(id: string, body: types.IVersionStatusUpdateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Submit version review (approve or reject)
     * @param body (optional) 
     * @return OK
     */
    versions_SubmitReview(id: string, body: types.IVersionReviewSubmissionDto | undefined): Promise<types.IVersionReviewDtoApiResponse>;

    /**
     * Quick approve version
     * @param body (optional) 
     * @return OK
     */
    versions_ApproveVersion(id: string, body: string | undefined): Promise<types.IVersionReviewDtoApiResponse>;

    /**
     * Quick reject version
     * @param body (optional) 
     * @return OK
     */
    versions_RejectVersion(id: string, body: string | undefined): Promise<types.IVersionReviewDtoApiResponse>;

    /**
     * Commit changes to create a new version with files
    This uses IFileStorageService internally to handle file operations
    Process: Upload files -> Commit -> Review -> Approve -> Execute
     * @param body (optional) 
     * @return OK
     */
    versions_CommitChanges(programId: string, body: types.IVersionCommitDto | undefined): Promise<types.IVersionDtoApiResponse>;

    /**
     * Validate commit before actual commit
    This checks file validity and other constraints
     * @param body (optional) 
     * @return OK
     */
    versions_ValidateCommit(programId: string, body: types.IVersionCommitValidationDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Compare two versions and get differences
     * @return OK
     */
    versions_CompareVersions(fromVersionId: string, toVersionId: string): Promise<types.IVersionDiffDtoApiResponse>;

    /**
     * Get diff from previous version
     * @return OK
     */
    versions_GetDiffFromPrevious(versionId: string): Promise<types.IVersionDiffDtoApiResponse>;

    /**
     * Get change summary for a version
     * @return OK
     */
    versions_GetChangeSummary(versionId: string): Promise<types.IVersionChangeDtoListApiResponse>;

    /**
     * Deploy approved version
     * @param body (optional) 
     * @return OK
     */
    versions_DeployVersion(versionId: string, body: types.IVersionDeploymentRequestDto | undefined): Promise<types.IVersionDeploymentDtoApiResponse>;

    /**
     * Revert program to previous version
     * @return OK
     */
    versions_RevertToPreviousVersion(programId: string, versionId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Set version as current for program
     * @return OK
     */
    versions_SetAsCurrentVersion(programId: string, versionId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get version statistics for a program
     * @return OK
     */
    versions_GetVersionStats(programId: string): Promise<types.IVersionStatsDtoApiResponse>;

    /**
     * Get version activity for a program
     * @param days (optional) 
     * @return OK
     */
    versions_GetVersionActivity(programId: string, days: number | undefined): Promise<types.IVersionActivityDtoListApiResponse>;
}

export interface IWorkflowsClient {

    /**
     * Get all workflows with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    workflows_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IWorkflowListDtoPagedResponseApiResponse>;

    /**
     * Create a new workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_Create(body: types.IWorkflowCreateDto | undefined): Promise<types.IWorkflowDetailDtoApiResponse>;

    /**
     * Get workflow by ID
     * @return OK
     */
    workflows_GetById(id: string): Promise<types.IWorkflowDetailDtoApiResponse>;

    /**
     * Update an existing workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_Update(id: string, body: types.IWorkflowUpdateDto | undefined): Promise<types.IWorkflowDetailDtoApiResponse>;

    /**
     * Delete a workflow
     * @return OK
     */
    workflows_Delete(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Update only the name and description of a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_UpdateNameDescription(id: string, body: types.IWorkflowNameDescriptionUpdateDto | undefined): Promise<types.IWorkflowDetailDtoApiResponse>;

    /**
     * Get workflows by user
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    workflows_GetByUser(userId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IWorkflowListDtoPagedResponseApiResponse>;

    /**
     * Get workflows by status
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    workflows_GetByStatus(status: enums.WorkflowStatus, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IWorkflowListDtoPagedResponseApiResponse>;

    /**
     * Search workflows
     * @param searchTerm (optional) 
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    workflows_Search(searchTerm: string | undefined, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IWorkflowListDtoPagedResponseApiResponse>;

    /**
     * Get workflow templates
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    workflows_GetTemplates(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IWorkflowListDtoPagedResponseApiResponse>;

    /**
     * Clone a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_Clone(id: string, body: types.IWorkflowCloneDto | undefined): Promise<types.IWorkflowDetailDtoApiResponse>;

    /**
     * Update workflow status
     * @param body (optional) 
     * @return OK
     */
    workflows_UpdateStatus(id: string, body: enums.WorkflowStatus | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Archive a workflow
     * @return OK
     */
    workflows_Archive(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Restore an archived workflow
     * @return OK
     */
    workflows_Restore(id: string): Promise<types.IBooleanApiResponse>;

    /**
     * Validate a workflow
     * @return OK
     */
    workflows_Validate(id: string): Promise<types.IWorkflowValidationResultApiResponse>;

    /**
     * Get workflow execution plan
     * @return OK
     */
    workflows_GetExecutionPlan(id: string): Promise<types.IWorkflowExecutionPlanDtoApiResponse>;

    /**
     * Get workflow complexity metrics
     * @return OK
     */
    workflows_GetComplexity(id: string): Promise<types.IWorkflowComplexityMetricsApiResponse>;

    /**
     * Execute a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_Execute(id: string, body: types.IWorkflowExecutionRequest | undefined): Promise<types.IWorkflowExecutionResponseDtoApiResponse>;

    /**
     * Get workflow execution status
     * @return OK
     */
    workflows_GetExecutionStatus(executionId: string): Promise<types.IWorkflowExecutionResponseDtoApiResponse>;

    /**
     * Pause a workflow execution
     * @return OK
     */
    workflows_PauseExecution(executionId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Resume a workflow execution
     * @return OK
     */
    workflows_ResumeExecution(executionId: string): Promise<types.IWorkflowExecutionResponseDtoApiResponse>;

    /**
     * Cancel a workflow execution
     * @return OK
     */
    workflows_CancelExecution(executionId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get all node outputs from a workflow execution
     * @return OK
     */
    workflows_GetExecutionOutputs(executionId: string): Promise<types.IStringWorkflowDataContractDtoDictionaryApiResponse>;

    /**
     * Get specific node output from a workflow execution
     * @return OK
     */
    workflows_GetNodeOutput(executionId: string, nodeId: string): Promise<types.IWorkflowDataContractDtoApiResponse>;

    /**
     * Get execution statistics
     * @return OK
     */
    workflows_GetExecutionStatistics(executionId: string): Promise<types.IWorkflowExecutionStatisticsResponseDtoApiResponse>;

    /**
     * Get execution logs
     * @param skip (optional) 
     * @param take (optional) 
     * @return OK
     */
    workflows_GetExecutionLogs(executionId: string, skip: number | undefined, take: number | undefined): Promise<types.IWorkflowExecutionLogResponseDtoListApiResponse>;

    /**
     * Download a specific output file from a workflow execution
     * @return OK
     */
    workflows_DownloadExecutionFile(executionId: string, filePath: string): Promise<types.IVersionFileDetailDtoApiResponse>;

    /**
     * Download all output files from a workflow execution as a ZIP archive
     * @return OK
     */
    workflows_DownloadAllExecutionFiles(executionId: string): Promise<void>;

    /**
     * Download selected output files from a workflow execution as a ZIP archive
     * @param body (optional) 
     * @return OK
     */
    workflows_BulkDownloadExecutionFiles(executionId: string, body: types.IWorkflowExecutionFileBulkDownloadRequest | undefined): Promise<void>;

    /**
     * Add a node to a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_AddNode(id: string, body: types.IWorkflowNodeCreateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Update a node in a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_UpdateNode(id: string, nodeId: string, body: types.IWorkflowNodeUpdateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Remove a node from a workflow
     * @return OK
     */
    workflows_RemoveNode(id: string, nodeId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Execute a specific node in a workflow execution
     * @return OK
     */
    workflows_ExecuteNode(executionId: string, nodeId: string): Promise<types.INodeExecutionResponseDtoApiResponse>;

    /**
     * Retry a failed node in a workflow execution
     * @return OK
     */
    workflows_RetryNode(executionId: string, nodeId: string): Promise<types.INodeExecutionResponseDtoApiResponse>;

    /**
     * Skip a node in a workflow execution
     * @param body (optional) 
     * @return OK
     */
    workflows_SkipNode(executionId: string, nodeId: string, body: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Add an edge to a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_AddEdge(id: string, body: types.IWorkflowEdgeCreateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Update an edge in a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_UpdateEdge(id: string, edgeId: string, body: types.IWorkflowEdgeUpdateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Remove an edge from a workflow
     * @return OK
     */
    workflows_RemoveEdge(id: string, edgeId: string): Promise<types.IBooleanApiResponse>;

    /**
     * Get workflow statistics
     * @return OK
     */
    workflows_GetStatistics(id: string): Promise<types.IWorkflowStatisticsDtoApiResponse>;

    /**
     * Get workflow execution history
     * @param limit (optional) 
     * @return OK
     */
    workflows_GetExecutionHistory(id: string, limit: number | undefined): Promise<types.IWorkflowExecutionSummaryDtoListApiResponse>;

    /**
     * Get all active executions
     * @return OK
     */
    workflows_GetActiveExecutions(): Promise<types.IWorkflowExecutionResponseDtoListApiResponse>;

    /**
     * Get workflow permissions
     * @return OK
     */
    workflows_GetPermissions(id: string): Promise<types.IWorkflowPermissionDtoApiResponse>;

    /**
     * Update workflow permissions
     * @param body (optional) 
     * @return OK
     */
    workflows_UpdatePermissions(id: string, body: types.IWorkflowPermissionUpdateDto | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Get all workflow tags
     * @return OK
     */
    workflows_GetTags(): Promise<types.IStringListApiResponse>;

    /**
     * Get workflows by tag
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    workflows_GetByTag(tag: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: enums.SortDirection | undefined): Promise<types.IWorkflowListDtoPagedResponseApiResponse>;

    /**
     * Export a workflow
     * @param format (optional) 
     * @return OK
     */
    workflows_Export(id: string, format: string | undefined): Promise<types.IBooleanApiResponse>;

    /**
     * Import a workflow
     * @param body (optional) 
     * @return OK
     */
    workflows_Import(body: types.IWorkflowImportDto | undefined): Promise<types.IWorkflowDetailDtoApiResponse>;
}

// --- END OF FILE interfaces.ts ---