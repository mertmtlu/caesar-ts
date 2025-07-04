export interface IAlternativeTMsClient {

    /**
     * Get alternative TM by ID
     * @return OK
     */
    alternativeTMs_GetById(id: string): Promise<AlternativeTMDetailResponseDtoApiResponse>;

    /**
     * Update alternative TM
     * @param body (optional) 
     * @return OK
     */
    alternativeTMs_Update(id: string, body: AlternativeTMUpdateDto | undefined): Promise<AlternativeTMResponseDtoApiResponse>;

    /**
     * Delete alternative TM
     * @return OK
     */
    alternativeTMs_Delete(id: string): Promise<BooleanApiResponse>;

    /**
     * Get alternative TMs by TM ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    alternativeTMs_GetByTmId(tmId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<AlternativeTMSummaryResponseDtoPagedResponseApiResponse>;

    /**
     * Get alternative TMs by city
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    alternativeTMs_GetByCity(city: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<AlternativeTMSummaryResponseDtoPagedResponseApiResponse>;

    /**
     * Get alternative TMs by county
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    alternativeTMs_GetByCounty(county: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<AlternativeTMSummaryResponseDtoPagedResponseApiResponse>;

    /**
     * Create new alternative TM
     * @param body (optional) 
     * @return OK
     */
    alternativeTMs_Create(body: AlternativeTMCreateDto | undefined): Promise<AlternativeTMResponseDtoApiResponse>;

    /**
     * Compare alternative TMs for a specific TM
     * @return OK
     */
    alternativeTMs_CompareAlternatives(tmId: string): Promise<AlternativeTMComparisonResponseDtoListApiResponse>;

    /**
     * Create alternative TM from existing TM
     * @param body (optional) 
     * @return OK
     */
    alternativeTMs_CreateFromTM(tmId: string, body: CreateFromTMDto | undefined): Promise<AlternativeTMResponseDtoApiResponse>;
}

export interface IAuthClient {

    /**
     * Authenticate user and return JWT token
     * @param body (optional) 
     * @return OK
     */
    auth_Login(body: UserLoginDto | undefined): Promise<AuthenticationResponseDtoApiResponse>;

    /**
     * Register a new user
     * @param body (optional) 
     * @return OK
     */
    auth_Register(body: UserRegisterDto | undefined): Promise<AuthenticationResponseDtoApiResponse>;

    /**
     * Refresh access token using refresh token
     * @param body (optional) 
     * @return OK
     */
    auth_RefreshToken(body: RefreshTokenDto | undefined): Promise<TokenResponseDtoApiResponse>;

    /**
     * Logout user and revoke refresh token
     * @return OK
     */
    auth_Logout(): Promise<BooleanApiResponse>;

    /**
     * Request password reset token
     * @param body (optional) 
     * @return OK
     */
    auth_ForgotPassword(body: UserPasswordResetRequestDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Reset password using token
     * @param body (optional) 
     * @return OK
     */
    auth_ResetPassword(body: UserPasswordResetDto | undefined): Promise<PasswordResetResponseDtoApiResponse>;

    /**
     * Change password for authenticated user
     * @param body (optional) 
     * @return OK
     */
    auth_ChangePassword(body: UserPasswordChangeDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Validate JWT token
     * @param token (optional) 
     * @return OK
     */
    auth_ValidateToken(token: string | undefined): Promise<BooleanApiResponse>;

    /**
     * Revoke a specific refresh token
     * @param body (optional) 
     * @return OK
     */
    auth_RevokeToken(body: RevokeTokenDto | undefined): Promise<BooleanApiResponse>;
}

export interface IBlocksClient {

    /**
     * Get all blocks in a building
     * @return OK
     */
    blocks_GetAll(buildingId: string): Promise<BlockResponseDtoListApiResponse>;

    /**
     * Get block by ID
     * @return OK
     */
    blocks_GetById(buildingId: string, blockId: string): Promise<BlockResponseDtoApiResponse>;

    /**
     * Delete block
     * @return OK
     */
    blocks_Delete(buildingId: string, blockId: string): Promise<BooleanApiResponse>;

    /**
     * Get block summary
     * @return OK
     */
    blocks_GetSummary(buildingId: string, blockId: string): Promise<BlockSummaryResponseDtoApiResponse>;

    /**
     * Get all concrete blocks in a building
     * @return OK
     */
    blocks_GetConcreteBlocks(buildingId: string): Promise<ConcreteBlockResponseDtoListApiResponse>;

    /**
     * Create new concrete block
     * @param body (optional) 
     * @return OK
     */
    blocks_CreateConcrete(buildingId: string, body: ConcreteCreateDto | undefined): Promise<ConcreteBlockResponseDtoApiResponse>;

    /**
     * Get all masonry blocks in a building
     * @return OK
     */
    blocks_GetMasonryBlocks(buildingId: string): Promise<MasonryBlockResponseDtoListApiResponse>;

    /**
     * Create new masonry block
     * @param body (optional) 
     * @return OK
     */
    blocks_CreateMasonry(buildingId: string, body: MasonryCreateDto | undefined): Promise<MasonryBlockResponseDtoApiResponse>;

    /**
     * Update concrete block
     * @param body (optional) 
     * @return OK
     */
    blocks_UpdateConcrete(buildingId: string, blockId: string, body: ConcreteUpdateDto | undefined): Promise<ConcreteBlockResponseDtoApiResponse>;

    /**
     * Update masonry block
     * @param body (optional) 
     * @return OK
     */
    blocks_UpdateMasonry(buildingId: string, blockId: string, body: MasonryUpdateDto | undefined): Promise<MasonryBlockResponseDtoApiResponse>;

    /**
     * Get block statistics
     * @return OK
     */
    blocks_GetStatistics(buildingId: string, blockId: string): Promise<BlockStatisticsResponseDtoApiResponse>;

    /**
     * Copy block within the same building
     * @param body (optional) 
     * @return OK
     */
    blocks_CopyBlock(buildingId: string, blockId: string, body: CopyBlockDto | undefined): Promise<BlockResponseDtoApiResponse>;
}

export interface IBuildingsClient {

    /**
     * Get all buildings with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    buildings_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<BuildingListResponseDtoPagedResponseApiResponse>;

    /**
     * Create new building
     * @param body (optional) 
     * @return OK
     */
    buildings_Create(body: BuildingCreateDto | undefined): Promise<BuildingResponseDtoApiResponse>;

    /**
     * Get building by ID
     * @return OK
     */
    buildings_GetById(id: string): Promise<BuildingDetailResponseDtoApiResponse>;

    /**
     * Update building
     * @param body (optional) 
     * @return OK
     */
    buildings_Update(id: string, body: BuildingUpdateDto | undefined): Promise<BuildingResponseDtoApiResponse>;

    /**
     * Delete building
     * @return OK
     */
    buildings_Delete(id: string): Promise<BooleanApiResponse>;

    /**
     * Get buildings by TM ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    buildings_GetByTmId(tmId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<BuildingListResponseDtoPagedResponseApiResponse>;

    /**
     * Search buildings
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    buildings_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: BuildingSearchDto | undefined): Promise<BuildingListResponseDtoPagedResponseApiResponse>;

    /**
     * Add block to building
     * @param body (optional) 
     * @return OK
     */
    buildings_AddBlock(id: string, body: BuildingBlockAddDto | undefined): Promise<BuildingResponseDtoApiResponse>;

    /**
     * Remove block from building
     * @return OK
     */
    buildings_RemoveBlock(id: string, blockId: string): Promise<BuildingResponseDtoApiResponse>;

    /**
     * Get buildings by type
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    buildings_GetByType(type: BuildingType, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<BuildingListResponseDtoPagedResponseApiResponse>;

    /**
     * Get buildings in scope of METU
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    buildings_GetInMETUScope(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<BuildingListResponseDtoPagedResponseApiResponse>;

    /**
     * Get building statistics
     * @return OK
     */
    buildings_GetStatistics(id: string): Promise<BuildingStatisticsResponseDtoApiResponse>;
}

export interface IClientsClient {

    /**
     * Get all clients with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    clients_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ClientListResponseDtoPagedResponseApiResponse>;

    /**
     * Create new client
     * @param body (optional) 
     * @return OK
     */
    clients_Create(body: ClientCreateDto | undefined): Promise<ClientResponseDtoApiResponse>;

    /**
     * Get client by ID
     * @return OK
     */
    clients_GetById(id: string): Promise<ClientDetailResponseDtoApiResponse>;

    /**
     * Update client
     * @param body (optional) 
     * @return OK
     */
    clients_Update(id: string, body: ClientUpdateDto | undefined): Promise<ClientResponseDtoApiResponse>;

    /**
     * Delete client
     * @return OK
     */
    clients_Delete(id: string): Promise<BooleanApiResponse>;

    /**
     * Get client by name
     * @return OK
     */
    clients_GetByName(name: string): Promise<ClientResponseDtoApiResponse>;

    /**
     * Get client summary statistics
     * @return OK
     */
    clients_GetStatistics(id: string): Promise<ClientStatisticsResponseDtoApiResponse>;
}

export interface IDeploymentsClient {

    /**
     * Deploy pre-built application (Angular, React, Vue dist folder)
     * @param body (optional) 
     * @return OK
     */
    deployments_DeployPreBuiltApp(programId: string, body: AppDeploymentRequestDto | undefined): Promise<ProgramDeploymentDtoApiResponse>;

    /**
     * Deploy static site (HTML, CSS, JS files)
     * @param body (optional) 
     * @return OK
     */
    deployments_DeployStaticSite(programId: string, body: StaticSiteDeploymentRequestDto | undefined): Promise<ProgramDeploymentDtoApiResponse>;

    /**
     * Deploy container application using Docker
     * @param body (optional) 
     * @return OK
     */
    deployments_DeployContainerApp(programId: string, body: ContainerDeploymentRequestDto | undefined): Promise<ProgramDeploymentDtoApiResponse>;

    /**
     * Get deployment status for a program
     * @return OK
     */
    deployments_GetDeploymentStatus(programId: string): Promise<ProgramDeploymentStatusDtoApiResponse>;

    /**
     * Start a deployed application
     * @return OK
     */
    deployments_StartApplication(programId: string): Promise<BooleanApiResponse>;

    /**
     * Stop a deployed application
     * @return OK
     */
    deployments_StopApplication(programId: string): Promise<BooleanApiResponse>;

    /**
     * Restart a deployed application
     * @return OK
     */
    deployments_RestartApplication(programId: string): Promise<BooleanApiResponse>;

    /**
     * Get application logs
     * @param lines (optional) 
     * @return OK
     */
    deployments_GetApplicationLogs(programId: string, lines: number | undefined): Promise<StringListApiResponse>;

    /**
     * Update deployment configuration
     * @param body (optional) 
     * @return OK
     */
    deployments_UpdateDeploymentConfig(programId: string, body: AppDeploymentConfigUpdateDto | undefined): Promise<ProgramDtoApiResponse>;

    /**
     * Get application health status
     * @return OK
     */
    deployments_GetApplicationHealth(programId: string): Promise<ApplicationHealthDtoApiResponse>;

    /**
     * Scale application instances (for container deployments)
     * @param body (optional) 
     * @return OK
     */
    deployments_ScaleApplication(programId: string, body: number | undefined): Promise<BooleanApiResponse>;

    /**
     * Get application metrics
     * @return OK
     */
    deployments_GetApplicationMetrics(programId: string): Promise<ApplicationMetricsDtoApiResponse>;

    /**
     * Undeploy an application
     * @return OK
     */
    deployments_UndeployApplication(programId: string): Promise<BooleanApiResponse>;

    /**
     * Validate deployment configuration
     * @param body (optional) 
     * @return OK
     */
    deployments_ValidateDeployment(programId: string, body: AppDeploymentRequestDto | undefined): Promise<DeploymentValidationResultApiResponse>;

    /**
     * Get supported deployment options for a program
     * @return OK
     */
    deployments_GetSupportedDeploymentOptions(programId: string): Promise<SupportedDeploymentOptionDtoListApiResponse>;

    /**
     * Get deployment history for a program
     * @param limit (optional) 
     * @return OK
     */
    deployments_GetDeploymentHistory(programId: string, limit: number | undefined): Promise<DeploymentHistoryDtoListApiResponse>;

    /**
     * Get all active deployments
     * @return OK
     */
    deployments_GetActiveDeployments(): Promise<ActiveDeploymentDtoListApiResponse>;

    /**
     * Get deployment statistics
     * @param fromDate (optional) 
     * @param toDate (optional) 
     * @return OK
     */
    deployments_GetDeploymentStatistics(fromDate: Date | undefined, toDate: Date | undefined): Promise<DeploymentStatisticsDtoApiResponse>;

    /**
     * Rollback to previous deployment
     * @param body (optional) 
     * @return OK
     */
    deployments_RollbackDeployment(programId: string, body: RollbackRequestDto | undefined): Promise<ProgramDeploymentDtoApiResponse>;

    /**
     * Get deployment environment variables
     * @return OK
     */
    deployments_GetDeploymentEnvironment(programId: string): Promise<StringStringDictionaryApiResponse>;

    /**
     * Update deployment environment variables
     * @param body (optional) 
     * @return OK
     */
    deployments_UpdateDeploymentEnvironment(programId: string, body: { [key: string]: string; } | undefined): Promise<BooleanApiResponse>;

    /**
     * Get deployment resource usage
     * @return OK
     */
    deployments_GetDeploymentResourceUsage(programId: string): Promise<DeploymentResourceUsageDtoApiResponse>;

    /**
     * Test deployment connection
     * @return OK
     */
    deployments_TestDeploymentConnection(programId: string): Promise<ConnectionTestResultApiResponse>;
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
    executions_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get execution by ID
     * @return OK
     */
    executions_GetById(id: string): Promise<ExecutionDetailDtoApiResponse>;

    /**
     * Delete execution
     * @return OK
     */
    executions_Delete(id: string): Promise<BooleanApiResponse>;

    /**
     * Advanced execution search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    executions_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: ExecutionSearchDto | undefined): Promise<ExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get executions by program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get executions by version
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetByVersion(versionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get executions by user
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetByUser(userId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get executions by status
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get running executions
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetRunningExecutions(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get completed executions
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetCompletedExecutions(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get failed executions
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    executions_GetFailedExecutions(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ExecutionListDtoPagedResponseApiResponse>;

    /**
     * Get recent executions
     * @param count (optional) 
     * @return OK
     */
    executions_GetRecentExecutions(count: number | undefined): Promise<ExecutionListDtoListApiResponse>;

    /**
     * Execute program using current version
     * @param body (optional) 
     * @return OK
     */
    executions_ExecuteProgram(programId: string, body: ProgramExecutionRequestDto | undefined): Promise<ExecutionDtoApiResponse>;

    /**
     * Execute specific version
     * @param body (optional) 
     * @return OK
     */
    executions_ExecuteVersion(versionId: string, body: VersionExecutionRequestDto | undefined): Promise<ExecutionDtoApiResponse>;

    /**
     * Execute with advanced parameters
     * @param body (optional) 
     * @return OK
     */
    executions_ExecuteWithParameters(body: ExecutionParametersDto | undefined): Promise<ExecutionDtoApiResponse>;

    /**
     * Stop execution
     * @return OK
     */
    executions_StopExecution(id: string): Promise<BooleanApiResponse>;

    /**
     * Pause execution
     * @return OK
     */
    executions_PauseExecution(id: string): Promise<BooleanApiResponse>;

    /**
     * Resume execution
     * @return OK
     */
    executions_ResumeExecution(id: string): Promise<BooleanApiResponse>;

    /**
     * Get execution status
     * @return OK
     */
    executions_GetExecutionStatus(id: string): Promise<ExecutionStatusDtoApiResponse>;

    /**
     * Get execution output stream
     * @return OK
     */
    executions_GetExecutionOutputStream(id: string): Promise<StringApiResponse>;

    /**
     * Get execution logs
     * @param lines (optional) 
     * @return OK
     */
    executions_GetExecutionLogs(id: string, lines: number | undefined): Promise<StringListApiResponse>;

    /**
     * Get execution result
     * @return OK
     */
    executions_GetExecutionResult(id: string): Promise<ExecutionResultDtoApiResponse>;

    /**
     * Deploy web application
     * @param body (optional) 
     * @return OK
     */
    executions_DeployWebApplication(programId: string, body: WebAppDeploymentRequestDto | undefined): Promise<ExecutionDtoApiResponse>;

    /**
     * Get web application URL
     * @return OK
     */
    executions_GetWebApplicationUrl(id: string): Promise<StringApiResponse>;

    /**
     * Get web application status
     * @return OK
     */
    executions_GetWebApplicationStatus(id: string): Promise<WebAppStatusDtoApiResponse>;

    /**
     * Restart web application
     * @return OK
     */
    executions_RestartWebApplication(id: string): Promise<BooleanApiResponse>;

    /**
     * Stop web application
     * @return OK
     */
    executions_StopWebApplication(id: string): Promise<BooleanApiResponse>;

    /**
     * Get resource usage for execution
     * @return OK
     */
    executions_GetResourceUsage(id: string): Promise<ExecutionResourceUsageDtoApiResponse>;

    /**
     * Update resource usage for execution
     * @param body (optional) 
     * @return OK
     */
    executions_UpdateResourceUsage(id: string, body: ExecutionResourceUpdateDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Get resource trends for program
     * @param days (optional) 
     * @return OK
     */
    executions_GetResourceTrends(programId: string, days: number | undefined): Promise<ExecutionResourceTrendDtoListApiResponse>;

    /**
     * Get resource limits for program
     * @return OK
     */
    executions_GetResourceLimits(programId: string): Promise<ExecutionResourceLimitsDtoApiResponse>;

    /**
     * Update resource limits for program
     * @param body (optional) 
     * @return OK
     */
    executions_UpdateResourceLimits(programId: string, body: ExecutionResourceLimitsUpdateDto | undefined): Promise<BooleanApiResponse>;

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
    executions_GetExecutionStats(programId: string | undefined, userId: string | undefined, fromDate: Date | undefined, toDate: Date | undefined, statuses: string[] | undefined, executionType: string | undefined): Promise<ExecutionStatsDtoApiResponse>;

    /**
     * Get execution trends
     * @param programId (optional) 
     * @param days (optional) 
     * @return OK
     */
    executions_GetExecutionTrends(programId: string | undefined, days: number | undefined): Promise<ExecutionTrendDtoListApiResponse>;

    /**
     * Get execution performance for program
     * @return OK
     */
    executions_GetExecutionPerformance(programId: string): Promise<ExecutionPerformanceDtoListApiResponse>;

    /**
     * Get user execution summary
     * @return OK
     */
    executions_GetUserExecutionSummary(userId: string): Promise<ExecutionSummaryDtoApiResponse>;

    /**
     * Get execution environment for program
     * @return OK
     */
    executions_GetExecutionEnvironment(programId: string): Promise<ExecutionEnvironmentDtoApiResponse>;

    /**
     * Update execution environment for program
     * @param body (optional) 
     * @return OK
     */
    executions_UpdateExecutionEnvironment(programId: string, body: ExecutionEnvironmentUpdateDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Get execution templates
     * @param language (optional) 
     * @return OK
     */
    executions_GetExecutionTemplates(language: string | undefined): Promise<ExecutionTemplateDtoListApiResponse>;

    /**
     * Validate execution request
     * @param body (optional) 
     * @return OK
     */
    executions_ValidateExecutionRequest(body: ProgramExecutionRequestDto | undefined): Promise<ExecutionValidationResultApiResponse>;

    /**
     * Get execution queue status
     * @return OK
     */
    executions_GetExecutionQueueStatus(): Promise<ExecutionQueueStatusDtoApiResponse>;

    /**
     * Schedule execution for program
     * @param body (optional) 
     * @return OK
     */
    executions_ScheduleExecution(programId: string, body: ExecutionScheduleRequestDto | undefined): Promise<ExecutionDtoApiResponse>;

    /**
     * Cancel scheduled execution
     * @return OK
     */
    executions_CancelScheduledExecution(id: string): Promise<BooleanApiResponse>;

    /**
     * Get scheduled executions
     * @return OK
     */
    executions_GetScheduledExecutions(): Promise<ExecutionListDtoListApiResponse>;

    /**
     * Get supported programming languages
     * @return OK
     */
    executions_GetSupportedLanguages(): Promise<StringListApiResponse>;

    /**
     * Analyze project structure
     * @param versionId (optional) 
     * @return OK
     */
    executions_AnalyzeProject(programId: string, versionId: string | undefined): Promise<ProjectStructureAnalysisDtoApiResponse>;

    /**
     * Validate project for execution
     * @param versionId (optional) 
     * @return OK
     */
    executions_ValidateProject(programId: string, versionId: string | undefined): Promise<ProjectValidationResultDtoApiResponse>;

    /**
     * Cleanup old executions
     * @param daysToKeep (optional) 
     * @return OK
     */
    executions_CleanupOldExecutions(daysToKeep: number | undefined): Promise<Int32ApiResponse>;

    /**
     * Archive execution
     * @return OK
     */
    executions_ArchiveExecution(id: string): Promise<BooleanApiResponse>;

    /**
     * Get cleanup report
     * @return OK
     */
    executions_GetCleanupReport(): Promise<ExecutionCleanupReportDtoListApiResponse>;

    /**
     * Run security scan on program
     * @return OK
     */
    executions_RunSecurityScan(programId: string): Promise<ExecutionSecurityScanResultApiResponse>;

    /**
     * Check if execution is allowed for user on program
     * @return OK
     */
    executions_IsExecutionAllowed(programId: string, userId: string): Promise<BooleanApiResponse>;
}

export interface IFilesClient {

    /**
     * Store files for a specific program version
     * @param body (optional) 
     * @return OK
     */
    files_StoreVersionFiles(programId: string, versionId: string, body: VersionFileCreateDto[] | undefined): Promise<FileStorageResultListApiResponse>;

    /**
     * List all files for a specific program version
     * @return OK
     */
    files_ListVersionFiles(programId: string, versionId: string): Promise<VersionFileDtoListApiResponse>;

    /**
     * Delete all files for a specific program version
     * @return OK
     */
    files_DeleteVersionFiles(programId: string, versionId: string): Promise<BooleanApiResponse>;

    /**
     * Get file content for a specific program version
     * @return OK
     */
    files_GetVersionFile(programId: string, versionId: string, filePath: string): Promise<VersionFileDetailDtoApiResponse>;

    /**
     * Update file content for a specific program version
     * @param body (optional) 
     * @return OK
     */
    files_UpdateVersionFile(programId: string, versionId: string, filePath: string, body: VersionFileUpdateDto | undefined): Promise<StringApiResponse>;

    /**
     * Delete file from a specific program version
     * @return OK
     */
    files_DeleteVersionFile(programId: string, versionId: string, filePath: string): Promise<BooleanApiResponse>;

    /**
     * Copy files from one version to another within the same program
     * @return OK
     */
    files_CopyVersionFiles(programId: string, fromVersionId: string, toVersionId: string): Promise<FileStorageResultListApiResponse>;

    /**
     * Delete all files for a program (all versions)
     * @return OK
     */
    files_DeleteProgramFiles(programId: string): Promise<BooleanApiResponse>;

    /**
     * Get storage statistics for a program
     * @return OK
     */
    files_GetProgramStorageStatistics(programId: string): Promise<StorageStatisticsApiResponse>;

    /**
     * Validate file before upload
     * @param body (optional) 
     * @return OK
     */
    files_ValidateFile(body: FileValidationRequest | undefined): Promise<FileValidationResultApiResponse>;

    /**
     * Calculate file hash
     * @param body (optional) 
     * @return OK
     */
    files_CalculateFileHash(body: string | undefined): Promise<StringApiResponse>;

    /**
     * Get file path structure for a program version
     * @param filePath (optional) 
     * @return OK
     */
    files_GetVersionFilePath(programId: string, versionId: string, filePath: string | undefined): Promise<StringApiResponse>;

    /**
     * Bulk download selected files from a program version as a ZIP archive
     * @param body (optional) 
     * @return OK
     */
    files_BulkDownloadFiles(programId: string, versionId: string, body: BulkDownloadRequest | undefined): Promise<void>;

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
    files_BulkUploadFiles(programId: string, versionId: string, body: VersionFileCreateDto[] | undefined): Promise<BulkOperationResultApiResponse>;

    /**
     * Bulk delete files from a program version
     * @param body (optional) 
     * @return OK
     */
    files_BulkDeleteFiles(programId: string, versionId: string, body: string[] | undefined): Promise<BulkOperationResultApiResponse>;
}

export interface IProgramsClient {

    /**
     * Get all programs with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ProgramListDtoPagedResponseApiResponse>;

    /**
     * Create new program entity
    Note: This creates the program metadata only. Use VersionsController commit process to add files.
     * @param body (optional) 
     * @return OK
     */
    programs_Create(body: ProgramCreateDto | undefined): Promise<ProgramDtoApiResponse>;

    /**
     * Get program by ID with full details (excluding files - use VersionsController for files)
     * @return OK
     */
    programs_GetById(id: string): Promise<ProgramDetailDtoApiResponse>;

    /**
     * Update program metadata
    Note: File changes should be done through VersionsController commit process
     * @param body (optional) 
     * @return OK
     */
    programs_Update(id: string, body: ProgramUpdateDto | undefined): Promise<ProgramDtoApiResponse>;

    /**
     * Delete program
    Note: This will also trigger cleanup of associated versions and files through service layer
     * @return OK
     */
    programs_Delete(id: string): Promise<BooleanApiResponse>;

    /**
     * Advanced program search with filtering
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    programs_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: ProgramSearchDto | undefined): Promise<ProgramListDtoPagedResponseApiResponse>;

    /**
     * Get programs by creator
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetByCreator(creatorId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ProgramListDtoPagedResponseApiResponse>;

    /**
     * Get programs by status (draft, active, archived, etc.)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ProgramListDtoPagedResponseApiResponse>;

    /**
     * Get programs by type (web, console, api, etc.)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetByType(type: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ProgramListDtoPagedResponseApiResponse>;

    /**
     * Get programs by programming language
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetByLanguage(language: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ProgramListDtoPagedResponseApiResponse>;

    /**
     * Get programs accessible to current user based on permissions
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetUserAccessiblePrograms(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ProgramListDtoPagedResponseApiResponse>;

    /**
     * Get programs accessible to a group
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    programs_GetGroupAccessiblePrograms(groupId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<ProgramListDtoPagedResponseApiResponse>;

    /**
     * Update program status (draft, active, archived, deprecated)
     * @param body (optional) 
     * @return OK
     */
    programs_UpdateStatus(id: string, body: string | undefined): Promise<BooleanApiResponse>;

    /**
     * Update program's current version (must be an approved version)
    Note: This sets which version is considered "current" for execution
     * @param body (optional) 
     * @return OK
     */
    programs_UpdateCurrentVersion(id: string, body: string | undefined): Promise<BooleanApiResponse>;

    /**
     * Get all permissions for a program
     * @return OK
     */
    programs_GetProgramPermissions(id: string): Promise<ProgramPermissionDtoListApiResponse>;

    /**
     * Add user permission to program
     * @param body (optional) 
     * @return OK
     */
    programs_AddUserPermission(id: string, body: ProgramUserPermissionDto | undefined): Promise<ProgramDtoApiResponse>;

    /**
     * Update user permission for program
     * @param body (optional) 
     * @return OK
     */
    programs_UpdateUserPermission(id: string, userId: string, body: ProgramUserPermissionDto | undefined): Promise<ProgramDtoApiResponse>;

    /**
     * Remove user permission from program
     * @return OK
     */
    programs_RemoveUserPermission(id: string, userId: string): Promise<BooleanApiResponse>;

    /**
     * Add group permission to program
     * @param body (optional) 
     * @return OK
     */
    programs_AddGroupPermission(id: string, body: ProgramGroupPermissionDto | undefined): Promise<ProgramDtoApiResponse>;

    /**
     * Update group permission for program
     * @param body (optional) 
     * @return OK
     */
    programs_UpdateGroupPermission(id: string, groupId: string, body: ProgramGroupPermissionDto | undefined): Promise<ProgramDtoApiResponse>;

    /**
     * Remove group permission from program
     * @return OK
     */
    programs_RemoveGroupPermission(id: string, groupId: string): Promise<BooleanApiResponse>;

    /**
     * Get current deployment status for program
    Note: For deploying specific versions, use VersionsController
     * @return OK
     */
    programs_GetDeploymentStatus(id: string): Promise<ProgramDeploymentStatusDtoApiResponse>;

    /**
     * Get application logs for deployed program
     * @param lines (optional) 
     * @return OK
     */
    programs_GetApplicationLogs(id: string, lines: number | undefined): Promise<StringListApiResponse>;

    /**
     * Restart deployed application
    Note: This restarts the currently deployed version
     * @return OK
     */
    programs_RestartApplication(id: string): Promise<BooleanApiResponse>;

    /**
     * Validate program name uniqueness
     * @param excludeId (optional) 
     * @param body (optional) 
     * @return OK
     */
    programs_ValidateNameUnique(excludeId: string | undefined, body: string | undefined): Promise<BooleanApiResponse>;

    /**
     * Validate user access to program
     * @param requiredAccessLevel (optional) 
     * @return OK
     */
    programs_ValidateUserAccess(id: string, requiredAccessLevel: string | undefined): Promise<BooleanApiResponse>;
}

export interface IRegionsClient {

    /**
     * Get all regions with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    regions_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RegionListResponseDtoPagedResponseApiResponse>;

    /**
     * Create new region
     * @param body (optional) 
     * @return OK
     */
    regions_Create(body: RegionCreateDto | undefined): Promise<RegionResponseDtoApiResponse>;

    /**
     * Get region by ID
     * @return OK
     */
    regions_GetById(id: string): Promise<RegionDetailResponseDtoApiResponse>;

    /**
     * Update region
     * @param body (optional) 
     * @return OK
     */
    regions_Update(id: string, body: RegionUpdateDto | undefined): Promise<RegionResponseDtoApiResponse>;

    /**
     * Delete region
     * @return OK
     */
    regions_Delete(id: string): Promise<BooleanApiResponse>;

    /**
     * Get region by number
     * @return OK
     */
    regions_GetByNumber(regionNo: number): Promise<RegionResponseDtoApiResponse>;

    /**
     * Get regions by client ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    regions_GetByClientId(clientId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RegionListResponseDtoPagedResponseApiResponse>;

    /**
     * Update region cities
     * @param body (optional) 
     * @return OK
     */
    regions_UpdateCities(id: string, body: RegionCityUpdateDto | undefined): Promise<RegionResponseDtoApiResponse>;

    /**
     * Get region statistics
     * @return OK
     */
    regions_GetStatistics(id: string): Promise<RegionStatisticsResponseDtoApiResponse>;

    /**
     * Get regions that operate in a specific city
     * @return OK
     */
    regions_GetRegionsInCity(city: string): Promise<RegionSummaryResponseDtoListApiResponse>;
}

export interface IRequestsClient {

    /**
     * Get all requests with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Create new request
     * @param body (optional) 
     * @return OK
     */
    requests_Create(body: RequestCreateDto | undefined): Promise<RequestDtoApiResponse>;

    /**
     * Get request by ID
     * @return OK
     */
    requests_GetById(id: string): Promise<RequestDetailDtoApiResponse>;

    /**
     * Update request
     * @param body (optional) 
     * @return OK
     */
    requests_Update(id: string, body: RequestUpdateDto | undefined): Promise<RequestDtoApiResponse>;

    /**
     * Delete request
     * @return OK
     */
    requests_Delete(id: string): Promise<BooleanApiResponse>;

    /**
     * Advanced request search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    requests_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: RequestSearchDto | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Get requests by type
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByType(type: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Get requests by status
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Get requests by priority
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByPriority(priority: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Get requests by requester
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByRequester(userId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Get requests by assignee
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByAssignee(userId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Get requests by program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Get unassigned requests
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetUnassignedRequests(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Update request status
     * @param body (optional) 
     * @return OK
     */
    requests_UpdateStatus(id: string, body: RequestStatusUpdateDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Assign request
     * @param body (optional) 
     * @return OK
     */
    requests_AssignRequest(id: string, body: RequestAssignmentDto | undefined): Promise<RequestDtoApiResponse>;

    /**
     * Unassign request
     * @return OK
     */
    requests_UnassignRequest(id: string): Promise<BooleanApiResponse>;

    /**
     * Update request priority
     * @param body (optional) 
     * @return OK
     */
    requests_UpdatePriority(id: string, body: RequestPriorityUpdateDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Add response to request
     * @param body (optional) 
     * @return OK
     */
    requests_AddResponse(id: string, body: RequestResponseCreateDto | undefined): Promise<RequestResponseDtoApiResponse>;

    /**
     * Get responses for request
     * @return OK
     */
    requests_GetResponses(id: string): Promise<RequestResponseDtoListApiResponse>;

    /**
     * Update request response
     * @param body (optional) 
     * @return OK
     */
    requests_UpdateResponse(id: string, responseId: string, body: RequestResponseUpdateDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Delete request response
     * @return OK
     */
    requests_DeleteResponse(id: string, responseId: string): Promise<BooleanApiResponse>;

    /**
     * Open request
     * @return OK
     */
    requests_OpenRequest(id: string): Promise<BooleanApiResponse>;

    /**
     * Start work on request
     * @param body (optional) 
     * @return OK
     */
    requests_StartWorkOnRequest(id: string, body: string | undefined): Promise<BooleanApiResponse>;

    /**
     * Complete request
     * @param body (optional) 
     * @return OK
     */
    requests_CompleteRequest(id: string, body: RequestCompletionDto | undefined): Promise<RequestDtoApiResponse>;

    /**
     * Reject request
     * @param body (optional) 
     * @return OK
     */
    requests_RejectRequest(id: string, body: RequestRejectionDto | undefined): Promise<RequestDtoApiResponse>;

    /**
     * Reopen request
     * @param body (optional) 
     * @return OK
     */
    requests_ReopenRequest(id: string, body: string | undefined): Promise<BooleanApiResponse>;

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
    requests_GetRequestStats(programId: string | undefined, fromDate: Date | undefined, toDate: Date | undefined, type: string | undefined, assignedTo: string | undefined, statuses: string[] | undefined): Promise<RequestStatsDtoApiResponse>;

    /**
     * Get request trends
     * @param days (optional) 
     * @return OK
     */
    requests_GetRequestTrends(days: number | undefined): Promise<RequestTrendDtoListApiResponse>;

    /**
     * Get request metrics by type
     * @return OK
     */
    requests_GetRequestMetricsByType(): Promise<RequestMetricDtoListApiResponse>;

    /**
     * Get request metrics by status
     * @return OK
     */
    requests_GetRequestMetricsByStatus(): Promise<RequestMetricDtoListApiResponse>;

    /**
     * Get assignee performance
     * @return OK
     */
    requests_GetAssigneePerformance(): Promise<RequestPerformanceDtoListApiResponse>;

    /**
     * Get request templates
     * @param type (optional) 
     * @return OK
     */
    requests_GetRequestTemplates(type: string | undefined): Promise<RequestTemplateDtoListApiResponse>;

    /**
     * Create request template
     * @param body (optional) 
     * @return OK
     */
    requests_CreateRequestTemplate(body: RequestTemplateCreateDto | undefined): Promise<RequestTemplateDtoApiResponse>;

    /**
     * Create request from template
     * @param body (optional) 
     * @return OK
     */
    requests_CreateFromTemplate(templateId: string, body: RequestFromTemplateDto | undefined): Promise<RequestDtoApiResponse>;

    /**
     * Subscribe to request updates
     * @param body (optional) 
     * @return OK
     */
    requests_SubscribeToRequestUpdates(id: string, body: string | undefined): Promise<BooleanApiResponse>;

    /**
     * Unsubscribe from request updates
     * @param body (optional) 
     * @return OK
     */
    requests_UnsubscribeFromRequestUpdates(id: string, body: string | undefined): Promise<BooleanApiResponse>;

    /**
     * Get request subscribers
     * @return OK
     */
    requests_GetRequestSubscribers(id: string): Promise<StringListApiResponse>;

    /**
     * Validate request
     * @param body (optional) 
     * @return OK
     */
    requests_ValidateRequest(body: RequestCreateDto | undefined): Promise<RequestValidationResultApiResponse>;

    /**
     * Check if user can modify request
     * @param userId (optional) 
     * @return OK
     */
    requests_CanUserModifyRequest(id: string, userId: string | undefined): Promise<BooleanApiResponse>;

    /**
     * Get available request types
     * @return OK
     */
    requests_GetAvailableRequestTypes(): Promise<StringListApiResponse>;

    /**
     * Get available request statuses
     * @return OK
     */
    requests_GetAvailableRequestStatuses(): Promise<StringListApiResponse>;

    /**
     * Get available request priorities
     * @return OK
     */
    requests_GetAvailableRequestPriorities(): Promise<StringListApiResponse>;

    /**
     * Get my requests (current user)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetMyRequests(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Get my assigned requests (current user)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetMyAssignments(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Get recent requests
     * @param count (optional) 
     * @return OK
     */
    requests_GetRecentRequests(count: number | undefined): Promise<RequestListDtoListApiResponse>;

    /**
     * Get priority requests
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetPriorityRequests(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Get overdue requests
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    requests_GetOverdueRequests(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<RequestListDtoPagedResponseApiResponse>;

    /**
     * Bulk update request status
     * @param body (optional) 
     * @return OK
     */
    requests_BulkUpdateStatus(body: BulkRequestStatusUpdateDto | undefined): Promise<BooleanApiResponse>;
}

export interface ITMsClient {

    /**
     * Get all TMs with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    tMs_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<TMListResponseDtoPagedResponseApiResponse>;

    /**
     * Create new TM
     * @param body (optional) 
     * @return OK
     */
    tMs_Create(body: TMCreateDto | undefined): Promise<TMResponseDtoApiResponse>;

    /**
     * Get TM by ID
     * @return OK
     */
    tMs_GetById(id: string): Promise<TMDetailResponseDtoApiResponse>;

    /**
     * Update TM
     * @param body (optional) 
     * @return OK
     */
    tMs_Update(id: string, body: TMUpdateDto | undefined): Promise<TMResponseDtoApiResponse>;

    /**
     * Delete TM
     * @return OK
     */
    tMs_Delete(id: string): Promise<BooleanApiResponse>;

    /**
     * Get TM by name
     * @return OK
     */
    tMs_GetByName(name: string): Promise<TMResponseDtoApiResponse>;

    /**
     * Get TMs by region ID
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    tMs_GetByRegionId(regionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<TMListResponseDtoPagedResponseApiResponse>;

    /**
     * Search TMs
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    tMs_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: TMSearchDto | undefined): Promise<TMListResponseDtoPagedResponseApiResponse>;

    /**
     * Update TM state
     * @param body (optional) 
     * @return OK
     */
    tMs_UpdateState(id: string, body: TMStateUpdateDto | undefined): Promise<TMResponseDtoApiResponse>;

    /**
     * Update TM voltages
     * @param body (optional) 
     * @return OK
     */
    tMs_UpdateVoltages(id: string, body: TMVoltageUpdateDto | undefined): Promise<TMResponseDtoApiResponse>;

    /**
     * Get TM statistics
     * @return OK
     */
    tMs_GetStatistics(id: string): Promise<TMStatisticsResponseDtoApiResponse>;

    /**
     * Get hazard summary for TM
     * @return OK
     */
    tMs_GetHazardSummary(id: string): Promise<TMHazardSummaryResponseDtoApiResponse>;
}

export interface IUiComponentsClient {

    /**
     * Get all UI components with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<UiComponentListDtoPagedResponseApiResponse>;

    /**
     * Get UI component by ID
     * @return OK
     */
    uiComponents_GetById(id: string): Promise<UiComponentDetailDtoApiResponse>;

    /**
     * Update UI component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_Update(id: string, body: UiComponentUpdateDto | undefined): Promise<UiComponentDtoApiResponse>;

    /**
     * Delete UI component
     * @return OK
     */
    uiComponents_Delete(id: string): Promise<BooleanApiResponse>;

    /**
     * Create new UI component for a specific program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_Create(programId: string, versionId: string, body: UiComponentCreateDto | undefined): Promise<UiComponentDtoApiResponse>;

    /**
     * Get UI components for a specific program version
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByProgramVersion(programId: string, versionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<UiComponentListDtoPagedResponseApiResponse>;

    /**
     * Copy components from one version to another
     * @param body (optional) 
     * @return OK
     */
    uiComponents_CopyComponentsToNewVersion(programId: string, fromVersionId: string, toVersionId: string, body: string[] | undefined): Promise<UiComponentListDtoListApiResponse>;

    /**
     * Copy a component to a different program version
     * @param newName (optional) 
     * @return OK
     */
    uiComponents_CopyComponentToVersion(componentId: string, targetProgramId: string, targetVersionId: string, newName: string | undefined): Promise<BooleanApiResponse>;

    /**
     * Get available components for a program version
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetAvailableForProgramVersion(programId: string, versionId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<UiComponentListDtoPagedResponseApiResponse>;

    /**
     * Advanced UI component search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    uiComponents_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: UiComponentSearchDto | undefined): Promise<UiComponentListDtoPagedResponseApiResponse>;

    /**
     * Get UI components by program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<UiComponentListDtoPagedResponseApiResponse>;

    /**
     * Get UI components by type
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByType(type: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<UiComponentListDtoPagedResponseApiResponse>;

    /**
     * Get UI components by creator
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByCreator(creatorId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<UiComponentListDtoPagedResponseApiResponse>;

    /**
     * Get UI components by status
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<UiComponentListDtoPagedResponseApiResponse>;

    /**
     * Update UI component status
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateStatus(id: string, body: string | undefined): Promise<BooleanApiResponse>;

    /**
     * Activate UI component
     * @return OK
     */
    uiComponents_ActivateComponent(id: string): Promise<BooleanApiResponse>;

    /**
     * Deactivate UI component
     * @return OK
     */
    uiComponents_DeactivateComponent(id: string): Promise<BooleanApiResponse>;

    /**
     * Deprecate UI component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_DeprecateComponent(id: string, body: string | undefined): Promise<BooleanApiResponse>;

    /**
     * Get UI component bundle
     * @return OK
     */
    uiComponents_GetComponentBundle(id: string): Promise<UiComponentBundleDtoApiResponse>;

    /**
     * Upload UI component bundle (assets will be stored in version-specific storage)
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UploadComponentBundle(id: string, body: UiComponentBundleUploadDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Update UI component assets
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateComponentAssets(id: string, body: UiComponentAssetDto[] | undefined): Promise<BooleanApiResponse>;

    /**
     * Get UI component assets (retrieved from version-specific storage)
     * @return OK
     */
    uiComponents_GetComponentAssets(id: string): Promise<UiComponentAssetDtoListApiResponse>;

    /**
     * Get UI component configuration
     * @return OK
     */
    uiComponents_GetComponentConfiguration(id: string): Promise<UiComponentConfigDtoApiResponse>;

    /**
     * Update UI component configuration
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateComponentConfiguration(id: string, body: UiComponentConfigUpdateDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Get UI component schema
     * @return OK
     */
    uiComponents_GetComponentSchema(id: string): Promise<UiComponentSchemaDtoApiResponse>;

    /**
     * Update UI component schema
     * @param body (optional) 
     * @return OK
     */
    uiComponents_UpdateComponentSchema(id: string, body: UiComponentSchemaUpdateDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Validate UI component schema
     * @param body (optional) 
     * @return OK
     */
    uiComponents_ValidateComponentSchema(id: string, body: any | undefined): Promise<BooleanApiResponse>;

    /**
     * Get UI component usage
     * @return OK
     */
    uiComponents_GetComponentUsage(id: string): Promise<UiComponentUsageDtoListApiResponse>;

    /**
     * Get program version component mappings
     * @return OK
     */
    uiComponents_GetProgramVersionComponentMappings(programId: string, versionId: string): Promise<ProgramComponentMappingDtoListApiResponse>;

    /**
     * Map component to program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_MapComponentToProgramVersion(programId: string, versionId: string, body: UiComponentMappingDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Unmap component from program version
     * @return OK
     */
    uiComponents_UnmapComponentFromProgramVersion(programId: string, versionId: string, componentId: string): Promise<BooleanApiResponse>;

    /**
     * Get recommended components for program version
     * @return OK
     */
    uiComponents_GetRecommendedComponents(programId: string, versionId: string): Promise<UiComponentRecommendationDtoListApiResponse>;

    /**
     * Search compatible components
     * @param body (optional) 
     * @return OK
     */
    uiComponents_SearchCompatibleComponents(body: UiComponentCompatibilitySearchDto | undefined): Promise<UiComponentListDtoListApiResponse>;

    /**
     * Validate component name uniqueness for program version
     * @param excludeId (optional) 
     * @param body (optional) 
     * @return OK
     */
    uiComponents_ValidateNameUniqueForVersion(programId: string, versionId: string, excludeId: string | undefined, body: string | undefined): Promise<BooleanApiResponse>;

    /**
     * Validate component definition for program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_ValidateComponentDefinition(programId: string, versionId: string, body: UiComponentCreateDto | undefined): Promise<UiComponentValidationResultApiResponse>;

    /**
     * Get available component types
     * @return OK
     */
    uiComponents_GetAvailableComponentTypes(): Promise<StringListApiResponse>;

    /**
     * Get component categories
     * @return OK
     */
    uiComponents_GetComponentCategories(): Promise<UiComponentCategoryDtoListApiResponse>;

    /**
     * Add tags to component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_AddComponentTags(id: string, body: string[] | undefined): Promise<BooleanApiResponse>;

    /**
     * Remove tags from component
     * @param body (optional) 
     * @return OK
     */
    uiComponents_RemoveComponentTags(id: string, body: string[] | undefined): Promise<BooleanApiResponse>;

    /**
     * Get current user's accessible components
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    uiComponents_GetMyComponents(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<UiComponentListDtoPagedResponseApiResponse>;

    /**
     * Clone component to a specific program version
     * @param body (optional) 
     * @return OK
     */
    uiComponents_CloneComponent(id: string, targetProgramId: string, targetVersionId: string, body: string | undefined): Promise<UiComponentDtoApiResponse>;
}

export interface IUsersClient {

    /**
     * Get all users with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    users_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<UserListDtoPagedResponseApiResponse>;

    /**
     * Create new user (admin only)
     * @param body (optional) 
     * @return OK
     */
    users_Create(body: UserRegisterDto | undefined): Promise<UserDtoApiResponse>;

    /**
     * Get user by ID
     * @return OK
     */
    users_GetById(id: string): Promise<UserDetailDtoApiResponse>;

    /**
     * Update user details
     * @param body (optional) 
     * @return OK
     */
    users_Update(id: string, body: UserUpdateDto | undefined): Promise<UserDtoApiResponse>;

    /**
     * Delete user
     * @return OK
     */
    users_Delete(id: string): Promise<BooleanApiResponse>;

    /**
     * Get current user profile
     * @return OK
     */
    users_GetCurrentUserProfile(): Promise<UserProfileDtoApiResponse>;

    /**
     * Update current user profile
     * @param body (optional) 
     * @return OK
     */
    users_UpdateCurrentUserProfile(body: UserUpdateDto | undefined): Promise<UserDtoApiResponse>;

    /**
     * Get current user permissions
     * @return OK
     */
    users_GetCurrentUserPermissions(): Promise<StringListApiResponse>;

    /**
     * Advanced user search
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    users_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: UserSearchDto | undefined): Promise<UserListDtoPagedResponseApiResponse>;

    /**
     * Get users by role
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    users_GetByRole(role: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<UserListDtoPagedResponseApiResponse>;

    /**
     * Get active users only
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    users_GetActiveUsers(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<UserListDtoPagedResponseApiResponse>;

    /**
     * Update user roles
     * @param body (optional) 
     * @return OK
     */
    users_UpdateRoles(id: string, body: UserRoleUpdateDto | undefined): Promise<UserDtoApiResponse>;

    /**
     * Update user permissions
     * @param body (optional) 
     * @return OK
     */
    users_UpdatePermissions(id: string, body: UserPermissionUpdateDto | undefined): Promise<UserDtoApiResponse>;

    /**
     * Get user's effective permissions (role + direct)
     * @return OK
     */
    users_GetEffectivePermissions(id: string): Promise<StringListApiResponse>;

    /**
     * Assign clients to user
     * @param body (optional) 
     * @return OK
     */
    users_AssignClients(id: string, body: UserClientAssignmentDto | undefined): Promise<UserDtoApiResponse>;

    /**
     * Activate user account
     * @return OK
     */
    users_Activate(id: string): Promise<BooleanApiResponse>;

    /**
     * Deactivate user account
     * @return OK
     */
    users_Deactivate(id: string): Promise<BooleanApiResponse>;

    /**
     * Revoke all refresh tokens for user
     * @return OK
     */
    users_RevokeAllTokens(id: string): Promise<BooleanApiResponse>;

    /**
     * Get user by email
     * @return OK
     */
    users_GetByEmail(email: string): Promise<UserDtoApiResponse>;

    /**
     * Get user by username
     * @return OK
     */
    users_GetByUsername(username: string): Promise<UserDtoApiResponse>;

    /**
     * Get available roles
     * @return OK
     */
    users_GetAvailableRoles(): Promise<StringListApiResponse>;

    /**
     * Get available permissions
     * @return OK
     */
    users_GetAvailablePermissions(): Promise<StringStringListDictionaryApiResponse>;
}

export interface IVersionsClient {

    /**
     * Get all versions with pagination
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetAll(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<VersionListDtoPagedResponseApiResponse>;

    /**
     * Create new version for a program
    Note: This creates the version entity. Files are uploaded separately through the commit process.
     * @param body (optional) 
     * @return OK
     */
    versions_Create(body: VersionCreateDto | undefined): Promise<VersionDtoApiResponse>;

    /**
     * Get version by ID with full details including files
     * @return OK
     */
    versions_GetById(id: string): Promise<VersionDetailDtoApiResponse>;

    /**
     * Update version metadata (commit message, review comments)
    Note: File changes should be done through the commit process
     * @param body (optional) 
     * @return OK
     */
    versions_Update(id: string, body: VersionUpdateDto | undefined): Promise<VersionDtoApiResponse>;

    /**
     * Delete version (only if pending and not current)
    This will also delete associated files through IFileStorageService
     * @return OK
     */
    versions_Delete(id: string): Promise<BooleanApiResponse>;

    /**
     * Advanced version search with filtering
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @param body (optional) 
     * @return OK
     */
    versions_Search(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined, body: VersionSearchDto | undefined): Promise<VersionListDtoPagedResponseApiResponse>;

    /**
     * Get all versions for a specific program
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByProgram(programId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<VersionListDtoPagedResponseApiResponse>;

    /**
     * Get latest version for a program
     * @return OK
     */
    versions_GetLatestVersionForProgram(programId: string): Promise<VersionDtoApiResponse>;

    /**
     * Get specific version by program and version number
     * @return OK
     */
    versions_GetByProgramAndVersionNumber(programId: string, versionNumber: number): Promise<VersionDtoApiResponse>;

    /**
     * Get next version number for a program
     * @return OK
     */
    versions_GetNextVersionNumber(programId: string): Promise<Int32ApiResponse>;

    /**
     * Get versions by creator
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByCreator(creatorId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<VersionListDtoPagedResponseApiResponse>;

    /**
     * Get versions by status (pending, approved, rejected)
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByStatus(status: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<VersionListDtoPagedResponseApiResponse>;

    /**
     * Get all versions pending review
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetPendingReviews(pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<VersionListDtoPagedResponseApiResponse>;

    /**
     * Get versions by reviewer
     * @param pageNumber (optional) 
     * @param pageSize (optional) 
     * @param sorting_Direction (optional) 
     * @return OK
     */
    versions_GetByReviewer(reviewerId: string, pageNumber: number | undefined, pageSize: number | undefined, sorting_Field: string, sorting_Direction: SortDirection | undefined): Promise<VersionListDtoPagedResponseApiResponse>;

    /**
     * Update version status
     * @param body (optional) 
     * @return OK
     */
    versions_UpdateStatus(id: string, body: VersionStatusUpdateDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Submit version review (approve or reject)
     * @param body (optional) 
     * @return OK
     */
    versions_SubmitReview(id: string, body: VersionReviewSubmissionDto | undefined): Promise<VersionReviewDtoApiResponse>;

    /**
     * Quick approve version
     * @param body (optional) 
     * @return OK
     */
    versions_ApproveVersion(id: string, body: string | undefined): Promise<VersionReviewDtoApiResponse>;

    /**
     * Quick reject version
     * @param body (optional) 
     * @return OK
     */
    versions_RejectVersion(id: string, body: string | undefined): Promise<VersionReviewDtoApiResponse>;

    /**
     * Commit changes to create a new version with files
    This uses IFileStorageService internally to handle file operations
    Process: Upload files -> Commit -> Review -> Approve -> Execute
     * @param body (optional) 
     * @return OK
     */
    versions_CommitChanges(programId: string, body: VersionCommitDto | undefined): Promise<VersionDtoApiResponse>;

    /**
     * Validate commit before actual commit
    This checks file validity and other constraints
     * @param body (optional) 
     * @return OK
     */
    versions_ValidateCommit(programId: string, body: VersionCommitValidationDto | undefined): Promise<BooleanApiResponse>;

    /**
     * Compare two versions and get differences
     * @return OK
     */
    versions_CompareVersions(fromVersionId: string, toVersionId: string): Promise<VersionDiffDtoApiResponse>;

    /**
     * Get diff from previous version
     * @return OK
     */
    versions_GetDiffFromPrevious(versionId: string): Promise<VersionDiffDtoApiResponse>;

    /**
     * Get change summary for a version
     * @return OK
     */
    versions_GetChangeSummary(versionId: string): Promise<VersionChangeDtoListApiResponse>;

    /**
     * Deploy approved version
     * @param body (optional) 
     * @return OK
     */
    versions_DeployVersion(versionId: string, body: VersionDeploymentRequestDto | undefined): Promise<VersionDeploymentDtoApiResponse>;

    /**
     * Revert program to previous version
     * @return OK
     */
    versions_RevertToPreviousVersion(programId: string, versionId: string): Promise<BooleanApiResponse>;

    /**
     * Set version as current for program
     * @return OK
     */
    versions_SetAsCurrentVersion(programId: string, versionId: string): Promise<BooleanApiResponse>;

    /**
     * Get version statistics for a program
     * @return OK
     */
    versions_GetVersionStats(programId: string): Promise<VersionStatsDtoApiResponse>;

    /**
     * Get version activity for a program
     * @param days (optional) 
     * @return OK
     */
    versions_GetVersionActivity(programId: string, days: number | undefined): Promise<VersionActivityDtoListApiResponse>;
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
    regions?: RegionSummaryResponseDto[] | undefined;
    auditInfo?: AuditInfoResponseDto;
}

export interface IClientDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ClientDetailResponseDto;
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
    items?: ClientListResponseDto[] | undefined;
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
    data?: ClientListResponseDtoPagedResponse;
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
    data?: ClientResponseDto;
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
    data?: ClientStatisticsResponseDto;
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

export interface IUserClientAssignmentDto {
    userId: string;
    clientIds: string[];
}