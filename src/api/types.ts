// --- START OF FILE types.ts ---

import * as interfaces from './typeInterfaces';
import * as enums from './enums';
import { formatDate } from './utils';

export class ActiveDeploymentDto implements interfaces.IActiveDeploymentDto {
    programId?: string | undefined;
    programName?: string | undefined;
    version?: string | undefined;
    deploymentType?: string | undefined;
    status?: string | undefined;
    deployedAt?: Date;
    url?: string | undefined;
    healthStatus?: string | undefined;

    constructor(data?: interfaces.IActiveDeploymentDto) {
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

export class ActiveDeploymentDtoListApiResponse implements interfaces.IActiveDeploymentDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ActiveDeploymentDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IActiveDeploymentDtoListApiResponse) {
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

export class AddressDto implements interfaces.IAddressDto {
    city?: string | undefined;
    county?: string | undefined;
    district?: string | undefined;
    street?: string | undefined;

    constructor(data?: interfaces.IAddressDto) {
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

export class AddressResponseDto implements interfaces.IAddressResponseDto {
    city?: string | undefined;
    county?: string | undefined;
    district?: string | undefined;
    street?: string | undefined;

    constructor(data?: interfaces.IAddressResponseDto) {
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

export class AlternativeTMComparisonResponseDto implements interfaces.IAlternativeTMComparisonResponseDto {
    id?: string | undefined;
    location?: LocationRequestDto;
    address?: AddressDto;
    hazardSummary?: HazardSummaryResponseDto;
    distanceFromOriginal?: number;
    comparisonScore?: ComparisonScoreDto;

    constructor(data?: interfaces.IAlternativeTMComparisonResponseDto) {
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

export class AlternativeTMComparisonResponseDtoListApiResponse implements interfaces.IAlternativeTMComparisonResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: AlternativeTMComparisonResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IAlternativeTMComparisonResponseDtoListApiResponse) {
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

export class AlternativeTMCreateDto implements interfaces.IAlternativeTMCreateDto {
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

    constructor(data?: interfaces.IAlternativeTMCreateDto) {
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

export class AlternativeTMDetailResponseDto implements interfaces.IAlternativeTMDetailResponseDto {
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

    constructor(data?: interfaces.IAlternativeTMDetailResponseDto) {
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

export class AlternativeTMDetailResponseDtoApiResponse implements interfaces.IAlternativeTMDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: AlternativeTMDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IAlternativeTMDetailResponseDtoApiResponse) {
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

export class AlternativeTMResponseDto implements interfaces.IAlternativeTMResponseDto {
    id?: string | undefined;
    tmId?: string | undefined;
    location?: LocationResponseDto;
    address?: AddressResponseDto;
    dD1?: EarthquakeLevelResponseDto;
    dD2?: EarthquakeLevelResponseDto;
    dD3?: EarthquakeLevelResponseDto;
    earthquakeScenario?: EarthquakeLevelResponseDto;

    constructor(data?: interfaces.IAlternativeTMResponseDto) {
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

export class AlternativeTMResponseDtoApiResponse implements interfaces.IAlternativeTMResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: AlternativeTMResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IAlternativeTMResponseDtoApiResponse) {
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

export class AlternativeTMSummaryResponseDto implements interfaces.IAlternativeTMSummaryResponseDto {
    id?: string | undefined;
    location?: LocationResponseDto;
    city?: string | undefined;
    overallRiskScore?: number;

    constructor(data?: interfaces.IAlternativeTMSummaryResponseDto) {
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

export class AlternativeTMSummaryResponseDtoPagedResponse implements interfaces.IAlternativeTMSummaryResponseDtoPagedResponse {
    items?: AlternativeTMSummaryResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;

    constructor(data?: interfaces.IAlternativeTMSummaryResponseDtoPagedResponse) {
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

export class AlternativeTMSummaryResponseDtoPagedResponseApiResponse implements interfaces.IAlternativeTMSummaryResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: AlternativeTMSummaryResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IAlternativeTMSummaryResponseDtoPagedResponseApiResponse) {
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

export class AlternativeTMUpdateDto implements interfaces.IAlternativeTMUpdateDto {
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

    constructor(data?: interfaces.IAlternativeTMUpdateDto) {
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

export class AppDeploymentConfigUpdateDto implements interfaces.IAppDeploymentConfigUpdateDto {
    configuration?: { [key: string]: any; } | undefined;
    environment?: { [key: string]: string; } | undefined;
    supportedFeatures?: string[] | undefined;
    domainName?: string | undefined;
    port?: number | undefined;

    constructor(data?: interfaces.IAppDeploymentConfigUpdateDto) {
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

export class AppDeploymentInfo implements interfaces.IAppDeploymentInfo {
    deploymentType?: enums.AppDeploymentType;
    configuration?: { [key: string]: any; } | undefined;
    lastDeployed?: Date | undefined;
    status?: string | undefined;
    supportedFeatures?: string[] | undefined;

    constructor(data?: interfaces.IAppDeploymentInfo) {
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

export class AppDeploymentRequestDto implements interfaces.IAppDeploymentRequestDto {
    deploymentType?: enums.AppDeploymentType;
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

    constructor(data?: interfaces.IAppDeploymentRequestDto) {
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

export class ApplicationHealthDto implements interfaces.IApplicationHealthDto {
    status?: string | undefined;
    lastCheck?: Date;
    responseTimeMs?: number;
    errorMessage?: string | undefined;
    details?: { [key: string]: any; } | undefined;
    checks?: HealthCheckResultDto[] | undefined;

    constructor(data?: interfaces.IApplicationHealthDto) {
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

export class ApplicationHealthDtoApiResponse implements interfaces.IApplicationHealthDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ApplicationHealthDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IApplicationHealthDtoApiResponse) {
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

export class ApplicationMetricsDto implements interfaces.IApplicationMetricsDto {
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

    constructor(data?: interfaces.IApplicationMetricsDto) {
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

export class ApplicationMetricsDtoApiResponse implements interfaces.IApplicationMetricsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ApplicationMetricsDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IApplicationMetricsDtoApiResponse) {
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

export class AuditInfoResponseDto implements interfaces.IAuditInfoResponseDto {
    createdAt?: Date;
    updatedAt?: Date | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;

    constructor(data?: interfaces.IAuditInfoResponseDto) {
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

export class AuthenticationResponseDto implements interfaces.IAuthenticationResponseDto {
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    expiresAt?: Date;
    tokenType?: string | undefined;
    user?: UserDto;

    constructor(data?: interfaces.IAuthenticationResponseDto) {
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

export class AuthenticationResponseDtoApiResponse implements interfaces.IAuthenticationResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: AuthenticationResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IAuthenticationResponseDtoApiResponse) {
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

export class AvalancheHazardDto implements interfaces.IAvalancheHazardDto {
    score?: number;
    level?: enums.Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;
    incident?: string | undefined;
    incidentDescription?: string | undefined;
    snowDepth?: number;
    firstHillLocation?: LocationRequestDto;
    elevationDifference?: number;

    constructor(data?: interfaces.IAvalancheHazardDto) {
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

export class AvalancheHazardResponseDto implements interfaces.IAvalancheHazardResponseDto {
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

    constructor(data?: interfaces.IAvalancheHazardResponseDto) {
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

export class BlockResponseDto implements interfaces.IBlockResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    modelingType?: string | undefined;
    xAxisLength?: number;
    yAxisLength?: number;
    storeyHeight?: { [key: string]: number; } | undefined;
    longLength?: number;
    shortLength?: number;
    totalHeight?: number;

    constructor(data?: interfaces.IBlockResponseDto) {
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

export class BlockResponseDtoApiResponse implements interfaces.IBlockResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BlockResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IBlockResponseDtoApiResponse) {
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

export class BlockResponseDtoListApiResponse implements interfaces.IBlockResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BlockResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IBlockResponseDtoListApiResponse) {
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

export class BlockStatisticsResponseDto implements interfaces.IBlockStatisticsResponseDto {
    blockId?: string | undefined;
    modelingType?: string | undefined;
    area?: number;
    height?: number;
    storeyCount?: number;
    aspectRatio?: number;
    volumeEstimate?: number;

    constructor(data?: interfaces.IBlockStatisticsResponseDto) {
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

export class BlockStatisticsResponseDtoApiResponse implements interfaces.IBlockStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BlockStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IBlockStatisticsResponseDtoApiResponse) {
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

export class BlockSummaryResponseDto implements interfaces.IBlockSummaryResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    modelingType?: string | undefined;
    totalHeight?: number;
    storeyCount?: number;

    constructor(data?: interfaces.IBlockSummaryResponseDto) {
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

export class BlockSummaryResponseDtoApiResponse implements interfaces.IBlockSummaryResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BlockSummaryResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IBlockSummaryResponseDtoApiResponse) {
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

export class BooleanApiResponse implements interfaces.IBooleanApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: boolean;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IBooleanApiResponse) {
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

export class BuildingBlockAddDto implements interfaces.IBuildingBlockAddDto {
    blockId!: string;

    constructor(data?: interfaces.IBuildingBlockAddDto) {
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

export class BuildingCreateDto implements interfaces.IBuildingCreateDto {
    tmId!: string;
    buildingTMID!: number;
    name?: string | undefined;
    type!: enums.BuildingType;
    inScopeOfMETU?: boolean;
    reportName?: string | undefined;

    constructor(data?: interfaces.IBuildingCreateDto) {
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

export class BuildingDetailResponseDto implements interfaces.IBuildingDetailResponseDto {
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

    constructor(data?: interfaces.IBuildingDetailResponseDto) {
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

export class BuildingDetailResponseDtoApiResponse implements interfaces.IBuildingDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BuildingDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IBuildingDetailResponseDtoApiResponse) {
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

export class BuildingListResponseDto implements interfaces.IBuildingListResponseDto {
    id?: string | undefined;
    tmName?: string | undefined;
    buildingTMID?: number;
    name?: string | undefined;
    type?: string | undefined;
    inScopeOfMETU?: boolean;
    blockCount?: number;
    reportName?: string | undefined;

    constructor(data?: interfaces.IBuildingListResponseDto) {
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

export class BuildingListResponseDtoPagedResponse implements interfaces.IBuildingListResponseDtoPagedResponse {
    items?: BuildingListResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;

    constructor(data?: interfaces.IBuildingListResponseDtoPagedResponse) {
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

export class BuildingListResponseDtoPagedResponseApiResponse implements interfaces.IBuildingListResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BuildingListResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IBuildingListResponseDtoPagedResponseApiResponse) {
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

export class BuildingResponseDto implements interfaces.IBuildingResponseDto {
    id?: string | undefined;
    tmId?: string | undefined;
    buildingTMID?: number;
    name?: string | undefined;
    type?: string | undefined;
    inScopeOfMETU?: boolean;
    reportName?: string | undefined;
    code?: number;
    bks?: number;

    constructor(data?: interfaces.IBuildingResponseDto) {
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

export class BuildingResponseDtoApiResponse implements interfaces.IBuildingResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BuildingResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IBuildingResponseDtoApiResponse) {
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

export class BuildingSearchDto implements interfaces.IBuildingSearchDto {
    name?: string | undefined;
    tmId?: string | undefined;
    type?: enums.BuildingType;
    inScopeOfMETU?: boolean | undefined;
    reportName?: string | undefined;

    constructor(data?: interfaces.IBuildingSearchDto) {
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

export class BuildingStatisticsResponseDto implements interfaces.IBuildingStatisticsResponseDto {
    buildingId?: string | undefined;
    blockCount?: number;
    concreteBlockCount?: number;
    masonryBlockCount?: number;
    totalArea?: number;
    maxHeight?: number;
    code?: number;
    bks?: number;

    constructor(data?: interfaces.IBuildingStatisticsResponseDto) {
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

export class BuildingStatisticsResponseDtoApiResponse implements interfaces.IBuildingStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BuildingStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IBuildingStatisticsResponseDtoApiResponse) {
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

export class BuildingSummaryResponseDto implements interfaces.IBuildingSummaryResponseDto {
    id?: string | undefined;
    buildingTMID?: number;
    name?: string | undefined;
    type?: string | undefined;
    blockCount?: number;

    constructor(data?: interfaces.IBuildingSummaryResponseDto) {
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

export class BuildingUpdateDto implements interfaces.IBuildingUpdateDto {
    tmId?: string | undefined;
    buildingTMID?: number | undefined;
    name?: string | undefined;
    type?: enums.BuildingType;
    inScopeOfMETU?: boolean | undefined;
    reportName?: string | undefined;

    constructor(data?: interfaces.IBuildingUpdateDto) {
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

export class BulkDownloadRequest implements interfaces.IBulkDownloadRequest {
    filePaths?: string[] | undefined;
    includeMetadata?: boolean;
    compressionLevel?: string | undefined;

    constructor(data?: interfaces.IBulkDownloadRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["filePaths"])) {
                this.filePaths = [] as any;
                for (let item of _data["filePaths"])
                    this.filePaths!.push(item);
            }
            this.includeMetadata = _data["includeMetadata"];
            this.compressionLevel = _data["compressionLevel"];
        }
    }

    static fromJS(data: any): BulkDownloadRequest {
        data = typeof data === 'object' ? data : {};
        let result = new BulkDownloadRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.filePaths)) {
            data["filePaths"] = [];
            for (let item of this.filePaths)
                data["filePaths"].push(item);
        }
        data["includeMetadata"] = this.includeMetadata;
        data["compressionLevel"] = this.compressionLevel;
        return data;
    }
}

export class BulkOperationResult implements interfaces.IBulkOperationResult {
    successCount?: number;
    failureCount?: number;
    totalProcessed?: number;
    errors?: string[] | undefined;

    constructor(data?: interfaces.IBulkOperationResult) {
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

export class BulkOperationResultApiResponse implements interfaces.IBulkOperationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: BulkOperationResult;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IBulkOperationResultApiResponse) {
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

export class BulkRequestStatusUpdateDto implements interfaces.IBulkRequestStatusUpdateDto {
    requestIds!: string[];
    status!: string;
    reason?: string | undefined;

    constructor(data?: interfaces.IBulkRequestStatusUpdateDto) {
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

export class ClientCreateDto implements interfaces.IClientCreateDto {
    name!: string;
    type!: enums.ClientType;

    constructor(data?: interfaces.IClientCreateDto) {
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

export class ClientDetailResponseDto implements interfaces.IClientDetailResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    regionCount?: number;
    regions?: RegionSummaryResponseDto[] | undefined;
    auditInfo?: AuditInfoResponseDto;

    constructor(data?: interfaces.IClientDetailResponseDto) {
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

export class ClientDetailResponseDtoApiResponse implements interfaces.IClientDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ClientDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IClientDetailResponseDtoApiResponse) {
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

export class ClientListResponseDto implements interfaces.IClientListResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    regionCount?: number;
    totalTMCount?: number;

    constructor(data?: interfaces.IClientListResponseDto) {
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

export class ClientListResponseDtoPagedResponse implements interfaces.IClientListResponseDtoPagedResponse {
    items?: ClientListResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;

    constructor(data?: interfaces.IClientListResponseDtoPagedResponse) {
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

export class ClientListResponseDtoPagedResponseApiResponse implements interfaces.IClientListResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ClientListResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IClientListResponseDtoPagedResponseApiResponse) {
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

export class ClientResponseDto implements interfaces.IClientResponseDto {
    id?: string | undefined;
    name?: string | undefined;
    type?: string | undefined;

    constructor(data?: interfaces.IClientResponseDto) {
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

export class ClientResponseDtoApiResponse implements interfaces.IClientResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ClientResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IClientResponseDtoApiResponse) {
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

export class ClientStatisticsResponseDto implements interfaces.IClientStatisticsResponseDto {
    clientId?: string | undefined;
    regionCount?: number;
    totalTMs?: number;
    totalBuildings?: number;
    activeTMs?: number;

    constructor(data?: interfaces.IClientStatisticsResponseDto) {
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

export class ClientStatisticsResponseDtoApiResponse implements interfaces.IClientStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ClientStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IClientStatisticsResponseDtoApiResponse) {
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

export class ClientSummaryResponseDto implements interfaces.IClientSummaryResponseDto {
    id?: string | undefined;
    name?: string | undefined;

    constructor(data?: interfaces.IClientSummaryResponseDto) {
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

export class ClientUpdateDto implements interfaces.IClientUpdateDto {
    name?: string | undefined;
    type?: enums.ClientType;

    constructor(data?: interfaces.IClientUpdateDto) {
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

export class ComparisonScoreDto implements interfaces.IComparisonScoreDto {
    earthquakeImprovement?: number;
    hazardImprovement?: number;
    overallImprovement?: number;
    advantages?: string[] | undefined;
    disadvantages?: string[] | undefined;

    constructor(data?: interfaces.IComparisonScoreDto) {
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

export class ConcreteBlockResponseDto implements interfaces.IConcreteBlockResponseDto {
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

    constructor(data?: interfaces.IConcreteBlockResponseDto) {
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

export class ConcreteBlockResponseDtoApiResponse implements interfaces.IConcreteBlockResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ConcreteBlockResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IConcreteBlockResponseDtoApiResponse) {
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

export class ConcreteBlockResponseDtoListApiResponse implements interfaces.IConcreteBlockResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ConcreteBlockResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IConcreteBlockResponseDtoListApiResponse) {
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

export class ConcreteCreateDto implements interfaces.IConcreteCreateDto {
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

    constructor(data?: interfaces.IConcreteCreateDto) {
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

export class ConcreteUpdateDto implements interfaces.IConcreteUpdateDto {
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

    constructor(data?: interfaces.IConcreteUpdateDto) {
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

export class ConnectionTestResult implements interfaces.IConnectionTestResult {
    isConnected?: boolean;
    responseTimeMs?: number;
    statusCode?: number;
    message?: string | undefined;
    testedAt?: Date;

    constructor(data?: interfaces.IConnectionTestResult) {
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

export class ConnectionTestResultApiResponse implements interfaces.IConnectionTestResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ConnectionTestResult;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IConnectionTestResultApiResponse) {
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

export class ContainerDeploymentRequestDto implements interfaces.IContainerDeploymentRequestDto {
    deploymentType?: enums.AppDeploymentType;
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

    constructor(data?: interfaces.IContainerDeploymentRequestDto) {
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

export class ContainerHealthCheckDto implements interfaces.IContainerHealthCheckDto {
    command?: string | undefined;
    intervalSeconds?: number;
    timeoutSeconds?: number;
    retries?: number;
    startPeriodSeconds?: number;

    constructor(data?: interfaces.IContainerHealthCheckDto) {
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

export class ContainerPortMappingDto implements interfaces.IContainerPortMappingDto {
    containerPort?: number;
    hostPort?: number | undefined;
    protocol?: string | undefined;

    constructor(data?: interfaces.IContainerPortMappingDto) {
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

export class ContainerResourceLimitsDto implements interfaces.IContainerResourceLimitsDto {
    cpuLimit?: string | undefined;
    memoryLimit?: string | undefined;
    cpuRequest?: string | undefined;
    memoryRequest?: string | undefined;

    constructor(data?: interfaces.IContainerResourceLimitsDto) {
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

export class ContainerVolumeMountDto implements interfaces.IContainerVolumeMountDto {
    containerPath?: string | undefined;
    hostPath?: string | undefined;
    type?: string | undefined;
    readOnly?: boolean;

    constructor(data?: interfaces.IContainerVolumeMountDto) {
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

export class CopyBlockDto implements interfaces.ICopyBlockDto {
    newBlockId!: string | undefined;
    newName?: string | undefined;

    constructor(data?: interfaces.ICopyBlockDto) {
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

export class CreateFromTMDto implements interfaces.ICreateFromTMDto {
    location!: LocationRequestDto;
    address?: AddressDto;
    copyHazardData?: boolean;
    copyEarthquakeData?: boolean;

    constructor(data?: interfaces.ICreateFromTMDto) {
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

export class DataAttachmentDto implements interfaces.IDataAttachmentDto {
    attachmentId?: string | undefined;
    fileName?: string | undefined;
    contentType?: string | undefined;
    size?: number;
    storagePath?: string | undefined;
    checksum?: string | undefined;
    description?: string | undefined;
    createdAt?: Date;

    constructor(data?: interfaces.IDataAttachmentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.attachmentId = _data["attachmentId"];
            this.fileName = _data["fileName"];
            this.contentType = _data["contentType"];
            this.size = _data["size"];
            this.storagePath = _data["storagePath"];
            this.checksum = _data["checksum"];
            this.description = _data["description"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): DataAttachmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataAttachmentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["attachmentId"] = this.attachmentId;
        data["fileName"] = this.fileName;
        data["contentType"] = this.contentType;
        data["size"] = this.size;
        data["storagePath"] = this.storagePath;
        data["checksum"] = this.checksum;
        data["description"] = this.description;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        return data;
    }
}

export class DataContractMetadataDto implements interfaces.IDataContractMetadataDto {
    contentType?: string | undefined;
    encoding?: string | undefined;
    size?: number;
    originalFormat?: string | undefined;
    transformations?: DataTransformationDto[] | undefined;
    validationResults?: DataValidationResultDto[] | undefined;
    quality?: DataQualityMetricsDto;
    lineage?: DataLineageDto;
    customMetadata?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IDataContractMetadataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.contentType = _data["contentType"];
            this.encoding = _data["encoding"];
            this.size = _data["size"];
            this.originalFormat = _data["originalFormat"];
            if (Array.isArray(_data["transformations"])) {
                this.transformations = [] as any;
                for (let item of _data["transformations"])
                    this.transformations!.push(DataTransformationDto.fromJS(item));
            }
            if (Array.isArray(_data["validationResults"])) {
                this.validationResults = [] as any;
                for (let item of _data["validationResults"])
                    this.validationResults!.push(DataValidationResultDto.fromJS(item));
            }
            this.quality = _data["quality"] ? DataQualityMetricsDto.fromJS(_data["quality"]) : <any>undefined;
            this.lineage = _data["lineage"] ? DataLineageDto.fromJS(_data["lineage"]) : <any>undefined;
            if (_data["customMetadata"]) {
                this.customMetadata = {} as any;
                for (let key in _data["customMetadata"]) {
                    if (_data["customMetadata"].hasOwnProperty(key))
                        (<any>this.customMetadata)![key] = _data["customMetadata"][key];
                }
            }
        }
    }

    static fromJS(data: any): DataContractMetadataDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataContractMetadataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["contentType"] = this.contentType;
        data["encoding"] = this.encoding;
        data["size"] = this.size;
        data["originalFormat"] = this.originalFormat;
        if (Array.isArray(this.transformations)) {
            data["transformations"] = [];
            for (let item of this.transformations)
                data["transformations"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.validationResults)) {
            data["validationResults"] = [];
            for (let item of this.validationResults)
                data["validationResults"].push(item ? item.toJSON() : <any>undefined);
        }
        data["quality"] = this.quality ? this.quality.toJSON() : <any>undefined;
        data["lineage"] = this.lineage ? this.lineage.toJSON() : <any>undefined;
        if (this.customMetadata) {
            data["customMetadata"] = {};
            for (let key in this.customMetadata) {
                if (this.customMetadata.hasOwnProperty(key))
                    (<any>data["customMetadata"])[key] = (<any>this.customMetadata)[key];
            }
        }
        return data;
    }
}

export class DataDependencyDto implements interfaces.IDataDependencyDto {
    nodeId?: string | undefined;
    outputName?: string | undefined;
    dependencyType?: enums.DependencyType;
    isOptional?: boolean;

    constructor(data?: interfaces.IDataDependencyDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.nodeId = _data["nodeId"];
            this.outputName = _data["outputName"];
            this.dependencyType = _data["dependencyType"];
            this.isOptional = _data["isOptional"];
        }
    }

    static fromJS(data: any): DataDependencyDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataDependencyDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["nodeId"] = this.nodeId;
        data["outputName"] = this.outputName;
        data["dependencyType"] = this.dependencyType;
        data["isOptional"] = this.isOptional;
        return data;
    }
}

export class DataLineageDto implements interfaces.IDataLineageDto {
    sourceNodes?: string[] | undefined;
    transformationPath?: string[] | undefined;
    dependencies?: DataDependencyDto[] | undefined;
    originalSources?: DataSourceDto[] | undefined;

    constructor(data?: interfaces.IDataLineageDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["sourceNodes"])) {
                this.sourceNodes = [] as any;
                for (let item of _data["sourceNodes"])
                    this.sourceNodes!.push(item);
            }
            if (Array.isArray(_data["transformationPath"])) {
                this.transformationPath = [] as any;
                for (let item of _data["transformationPath"])
                    this.transformationPath!.push(item);
            }
            if (Array.isArray(_data["dependencies"])) {
                this.dependencies = [] as any;
                for (let item of _data["dependencies"])
                    this.dependencies!.push(DataDependencyDto.fromJS(item));
            }
            if (Array.isArray(_data["originalSources"])) {
                this.originalSources = [] as any;
                for (let item of _data["originalSources"])
                    this.originalSources!.push(DataSourceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DataLineageDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataLineageDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.sourceNodes)) {
            data["sourceNodes"] = [];
            for (let item of this.sourceNodes)
                data["sourceNodes"].push(item);
        }
        if (Array.isArray(this.transformationPath)) {
            data["transformationPath"] = [];
            for (let item of this.transformationPath)
                data["transformationPath"].push(item);
        }
        if (Array.isArray(this.dependencies)) {
            data["dependencies"] = [];
            for (let item of this.dependencies)
                data["dependencies"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.originalSources)) {
            data["originalSources"] = [];
            for (let item of this.originalSources)
                data["originalSources"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class DataQualityIssueDto implements interfaces.IDataQualityIssueDto {
    type?: enums.DataQualityIssueType;
    severity?: enums.IssueSeverity;
    description?: string | undefined;
    field?: string | undefined;
    recommendation?: string | undefined;

    constructor(data?: interfaces.IDataQualityIssueDto) {
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
            this.severity = _data["severity"];
            this.description = _data["description"];
            this.field = _data["field"];
            this.recommendation = _data["recommendation"];
        }
    }

    static fromJS(data: any): DataQualityIssueDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataQualityIssueDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["severity"] = this.severity;
        data["description"] = this.description;
        data["field"] = this.field;
        data["recommendation"] = this.recommendation;
        return data;
    }
}

export class DataQualityMetricsDto implements interfaces.IDataQualityMetricsDto {
    completeness?: number;
    accuracy?: number;
    consistency?: number;
    validity?: number;
    timeliness?: number;
    uniqueness?: number;
    overallScore?: number;
    issues?: DataQualityIssueDto[] | undefined;

    constructor(data?: interfaces.IDataQualityMetricsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.completeness = _data["completeness"];
            this.accuracy = _data["accuracy"];
            this.consistency = _data["consistency"];
            this.validity = _data["validity"];
            this.timeliness = _data["timeliness"];
            this.uniqueness = _data["uniqueness"];
            this.overallScore = _data["overallScore"];
            if (Array.isArray(_data["issues"])) {
                this.issues = [] as any;
                for (let item of _data["issues"])
                    this.issues!.push(DataQualityIssueDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DataQualityMetricsDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataQualityMetricsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["completeness"] = this.completeness;
        data["accuracy"] = this.accuracy;
        data["consistency"] = this.consistency;
        data["validity"] = this.validity;
        data["timeliness"] = this.timeliness;
        data["uniqueness"] = this.uniqueness;
        data["overallScore"] = this.overallScore;
        if (Array.isArray(this.issues)) {
            data["issues"] = [];
            for (let item of this.issues)
                data["issues"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class DataSourceDto implements interfaces.IDataSourceDto {
    sourceId?: string | undefined;
    sourceType?: enums.DataSourceType;
    location?: string | undefined;
    accessedAt?: Date;
    version?: string | undefined;

    constructor(data?: interfaces.IDataSourceDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.sourceId = _data["sourceId"];
            this.sourceType = _data["sourceType"];
            this.location = _data["location"];
            this.accessedAt = _data["accessedAt"] ? new Date(_data["accessedAt"].toString()) : <any>undefined;
            this.version = _data["version"];
        }
    }

    static fromJS(data: any): DataSourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataSourceDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sourceId"] = this.sourceId;
        data["sourceType"] = this.sourceType;
        data["location"] = this.location;
        data["accessedAt"] = this.accessedAt ? this.accessedAt.toISOString() : <any>undefined;
        data["version"] = this.version;
        return data;
    }
}

export class DataTransformationDto implements interfaces.IDataTransformationDto {
    transformationId?: string | undefined;
    type?: enums.TransformationType;
    expression?: string | undefined;
    appliedAt?: Date;
    appliedBy?: string | undefined;
    inputSchema?: { [key: string]: any; } | undefined;
    outputSchema?: { [key: string]: any; } | undefined;
    success?: boolean;
    error?: string | undefined;

    constructor(data?: interfaces.IDataTransformationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.transformationId = _data["transformationId"];
            this.type = _data["type"];
            this.expression = _data["expression"];
            this.appliedAt = _data["appliedAt"] ? new Date(_data["appliedAt"].toString()) : <any>undefined;
            this.appliedBy = _data["appliedBy"];
            if (_data["inputSchema"]) {
                this.inputSchema = {} as any;
                for (let key in _data["inputSchema"]) {
                    if (_data["inputSchema"].hasOwnProperty(key))
                        (<any>this.inputSchema)![key] = _data["inputSchema"][key];
                }
            }
            if (_data["outputSchema"]) {
                this.outputSchema = {} as any;
                for (let key in _data["outputSchema"]) {
                    if (_data["outputSchema"].hasOwnProperty(key))
                        (<any>this.outputSchema)![key] = _data["outputSchema"][key];
                }
            }
            this.success = _data["success"];
            this.error = _data["error"];
        }
    }

    static fromJS(data: any): DataTransformationDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataTransformationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["transformationId"] = this.transformationId;
        data["type"] = this.type;
        data["expression"] = this.expression;
        data["appliedAt"] = this.appliedAt ? this.appliedAt.toISOString() : <any>undefined;
        data["appliedBy"] = this.appliedBy;
        if (this.inputSchema) {
            data["inputSchema"] = {};
            for (let key in this.inputSchema) {
                if (this.inputSchema.hasOwnProperty(key))
                    (<any>data["inputSchema"])[key] = (<any>this.inputSchema)[key];
            }
        }
        if (this.outputSchema) {
            data["outputSchema"] = {};
            for (let key in this.outputSchema) {
                if (this.outputSchema.hasOwnProperty(key))
                    (<any>data["outputSchema"])[key] = (<any>this.outputSchema)[key];
            }
        }
        data["success"] = this.success;
        data["error"] = this.error;
        return data;
    }
}

export class DataValidationResultDto implements interfaces.IDataValidationResultDto {
    validationId?: string | undefined;
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    validatedAt?: Date;
    validationType?: enums.ValidationType;
    schemaUsed?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IDataValidationResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.validationId = _data["validationId"];
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
            this.validatedAt = _data["validatedAt"] ? new Date(_data["validatedAt"].toString()) : <any>undefined;
            this.validationType = _data["validationType"];
            if (_data["schemaUsed"]) {
                this.schemaUsed = {} as any;
                for (let key in _data["schemaUsed"]) {
                    if (_data["schemaUsed"].hasOwnProperty(key))
                        (<any>this.schemaUsed)![key] = _data["schemaUsed"][key];
                }
            }
        }
    }

    static fromJS(data: any): DataValidationResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new DataValidationResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["validationId"] = this.validationId;
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
        data["validatedAt"] = this.validatedAt ? this.validatedAt.toISOString() : <any>undefined;
        data["validationType"] = this.validationType;
        if (this.schemaUsed) {
            data["schemaUsed"] = {};
            for (let key in this.schemaUsed) {
                if (this.schemaUsed.hasOwnProperty(key))
                    (<any>data["schemaUsed"])[key] = (<any>this.schemaUsed)[key];
            }
        }
        return data;
    }
}

export class DeploymentHistoryDto implements interfaces.IDeploymentHistoryDto {
    id?: string | undefined;
    programId?: string | undefined;
    version?: string | undefined;
    deploymentType?: string | undefined;
    status?: string | undefined;
    deployedAt?: Date;
    deployedBy?: string | undefined;
    duration?: string;
    errorMessage?: string | undefined;

    constructor(data?: interfaces.IDeploymentHistoryDto) {
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

export class DeploymentHistoryDtoListApiResponse implements interfaces.IDeploymentHistoryDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: DeploymentHistoryDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IDeploymentHistoryDtoListApiResponse) {
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

export class DeploymentResourceUsageDto implements interfaces.IDeploymentResourceUsageDto {
    programId?: string | undefined;
    cpuUsagePercent?: number;
    memoryUsageMB?: number;
    diskUsageMB?: number;
    networkInMB?: number;
    networkOutMB?: number;
    lastUpdated?: Date;

    constructor(data?: interfaces.IDeploymentResourceUsageDto) {
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

export class DeploymentResourceUsageDtoApiResponse implements interfaces.IDeploymentResourceUsageDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: DeploymentResourceUsageDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IDeploymentResourceUsageDtoApiResponse) {
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

export class DeploymentStatisticsDto implements interfaces.IDeploymentStatisticsDto {
    totalDeployments?: number;
    successfulDeployments?: number;
    failedDeployments?: number;
    activeDeployments?: number;
    deploymentsByType?: { [key: string]: number; } | undefined;
    averageDeploymentTime?: string;
    fromDate?: Date;
    toDate?: Date;

    constructor(data?: interfaces.IDeploymentStatisticsDto) {
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

export class DeploymentStatisticsDtoApiResponse implements interfaces.IDeploymentStatisticsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: DeploymentStatisticsDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IDeploymentStatisticsDtoApiResponse) {
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

export class DeploymentValidationResult implements interfaces.IDeploymentValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    recommendations?: string[] | undefined;
    validatedConfiguration?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IDeploymentValidationResult) {
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

export class DeploymentValidationResultApiResponse implements interfaces.IDeploymentValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: DeploymentValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IDeploymentValidationResultApiResponse) {
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

export class EarthquakeLevelDto implements interfaces.IEarthquakeLevelDto {
    pga?: number;
    pgv?: number;
    ss?: number;
    s1?: number;
    sds?: number;
    sd1?: number;

    constructor(data?: interfaces.IEarthquakeLevelDto) {
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

export class EarthquakeLevelResponseDto implements interfaces.IEarthquakeLevelResponseDto {
    pga?: number;
    pgv?: number;
    ss?: number;
    s1?: number;
    sds?: number;
    sd1?: number;

    constructor(data?: interfaces.IEarthquakeLevelResponseDto) {
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

export class EdgeConditionDto implements interfaces.IEdgeConditionDto {
    expression!: string;
    conditionType?: enums.EdgeConditionType;
    evaluateOnSourceOutput?: boolean;
    defaultValue?: any | undefined;
    failureAction?: enums.EdgeFailureAction;

    constructor(data?: interfaces.IEdgeConditionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.expression = _data["expression"];
            this.conditionType = _data["conditionType"];
            this.evaluateOnSourceOutput = _data["evaluateOnSourceOutput"];
            this.defaultValue = _data["defaultValue"];
            this.failureAction = _data["failureAction"];
        }
    }

    static fromJS(data: any): EdgeConditionDto {
        data = typeof data === 'object' ? data : {};
        let result = new EdgeConditionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["expression"] = this.expression;
        data["conditionType"] = this.conditionType;
        data["evaluateOnSourceOutput"] = this.evaluateOnSourceOutput;
        data["defaultValue"] = this.defaultValue;
        data["failureAction"] = this.failureAction;
        return data;
    }
}

export class EdgePointDto implements interfaces.IEdgePointDto {
    x?: number;
    y?: number;
    type?: enums.EdgePointType;

    constructor(data?: interfaces.IEdgePointDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.x = _data["x"];
            this.y = _data["y"];
            this.type = _data["type"];
        }
    }

    static fromJS(data: any): EdgePointDto {
        data = typeof data === 'object' ? data : {};
        let result = new EdgePointDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["x"] = this.x;
        data["y"] = this.y;
        data["type"] = this.type;
        return data;
    }
}

export class EdgeTransformationDto implements interfaces.IEdgeTransformationDto {
    transformationType?: enums.EdgeTransformationType;
    expression!: string;
    inputSchema?: { [key: string]: any; } | undefined;
    outputSchema?: { [key: string]: any; } | undefined;
    customFunction?: string | undefined;
    parameters?: { [key: string]: any; } | undefined;
    validateSchema?: boolean;

    constructor(data?: interfaces.IEdgeTransformationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.transformationType = _data["transformationType"];
            this.expression = _data["expression"];
            if (_data["inputSchema"]) {
                this.inputSchema = {} as any;
                for (let key in _data["inputSchema"]) {
                    if (_data["inputSchema"].hasOwnProperty(key))
                        (<any>this.inputSchema)![key] = _data["inputSchema"][key];
                }
            }
            if (_data["outputSchema"]) {
                this.outputSchema = {} as any;
                for (let key in _data["outputSchema"]) {
                    if (_data["outputSchema"].hasOwnProperty(key))
                        (<any>this.outputSchema)![key] = _data["outputSchema"][key];
                }
            }
            this.customFunction = _data["customFunction"];
            if (_data["parameters"]) {
                this.parameters = {} as any;
                for (let key in _data["parameters"]) {
                    if (_data["parameters"].hasOwnProperty(key))
                        (<any>this.parameters)![key] = _data["parameters"][key];
                }
            }
            this.validateSchema = _data["validateSchema"];
        }
    }

    static fromJS(data: any): EdgeTransformationDto {
        data = typeof data === 'object' ? data : {};
        let result = new EdgeTransformationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["transformationType"] = this.transformationType;
        data["expression"] = this.expression;
        if (this.inputSchema) {
            data["inputSchema"] = {};
            for (let key in this.inputSchema) {
                if (this.inputSchema.hasOwnProperty(key))
                    (<any>data["inputSchema"])[key] = (<any>this.inputSchema)[key];
            }
        }
        if (this.outputSchema) {
            data["outputSchema"] = {};
            for (let key in this.outputSchema) {
                if (this.outputSchema.hasOwnProperty(key))
                    (<any>data["outputSchema"])[key] = (<any>this.outputSchema)[key];
            }
        }
        data["customFunction"] = this.customFunction;
        if (this.parameters) {
            data["parameters"] = {};
            for (let key in this.parameters) {
                if (this.parameters.hasOwnProperty(key))
                    (<any>data["parameters"])[key] = (<any>this.parameters)[key];
            }
        }
        data["validateSchema"] = this.validateSchema;
        return data;
    }
}

export class EdgeUIConfigurationDto implements interfaces.IEdgeUIConfigurationDto {
    color?: string | undefined;
    style?: enums.EdgeStyle;
    width?: number;
    label?: string | undefined;
    showLabel?: boolean;
    animateFlow?: boolean;
    points?: EdgePointDto[] | undefined;

    constructor(data?: interfaces.IEdgeUIConfigurationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.color = _data["color"];
            this.style = _data["style"];
            this.width = _data["width"];
            this.label = _data["label"];
            this.showLabel = _data["showLabel"];
            this.animateFlow = _data["animateFlow"];
            if (Array.isArray(_data["points"])) {
                this.points = [] as any;
                for (let item of _data["points"])
                    this.points!.push(EdgePointDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): EdgeUIConfigurationDto {
        data = typeof data === 'object' ? data : {};
        let result = new EdgeUIConfigurationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["color"] = this.color;
        data["style"] = this.style;
        data["width"] = this.width;
        data["label"] = this.label;
        data["showLabel"] = this.showLabel;
        data["animateFlow"] = this.animateFlow;
        if (Array.isArray(this.points)) {
            data["points"] = [];
            for (let item of this.points)
                data["points"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class EdgeValidationError implements interfaces.IEdgeValidationError {
    errorCode?: string | undefined;
    errorType?: string | undefined;
    message?: string | undefined;
    details?: string | undefined;
    severity?: enums.ValidationSeverity;
    suggestedFix?: string | undefined;
    context?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IEdgeValidationError) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.errorCode = _data["errorCode"];
            this.errorType = _data["errorType"];
            this.message = _data["message"];
            this.details = _data["details"];
            this.severity = _data["severity"];
            this.suggestedFix = _data["suggestedFix"];
            if (_data["context"]) {
                this.context = {} as any;
                for (let key in _data["context"]) {
                    if (_data["context"].hasOwnProperty(key))
                        (<any>this.context)![key] = _data["context"][key];
                }
            }
        }
    }

    static fromJS(data: any): EdgeValidationError {
        data = typeof data === 'object' ? data : {};
        let result = new EdgeValidationError();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["errorCode"] = this.errorCode;
        data["errorType"] = this.errorType;
        data["message"] = this.message;
        data["details"] = this.details;
        data["severity"] = this.severity;
        data["suggestedFix"] = this.suggestedFix;
        if (this.context) {
            data["context"] = {};
            for (let key in this.context) {
                if (this.context.hasOwnProperty(key))
                    (<any>data["context"])[key] = (<any>this.context)[key];
            }
        }
        return data;
    }
}

export class EdgeValidationResult implements interfaces.IEdgeValidationResult {
    isValid?: boolean;
    errors?: EdgeValidationError[] | undefined;
    warnings?: EdgeValidationWarning[] | undefined;
    metadata?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IEdgeValidationResult) {
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
                    this.errors!.push(EdgeValidationError.fromJS(item));
            }
            if (Array.isArray(_data["warnings"])) {
                this.warnings = [] as any;
                for (let item of _data["warnings"])
                    this.warnings!.push(EdgeValidationWarning.fromJS(item));
            }
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
        }
    }

    static fromJS(data: any): EdgeValidationResult {
        data = typeof data === 'object' ? data : {};
        let result = new EdgeValidationResult();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isValid"] = this.isValid;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.warnings)) {
            data["warnings"] = [];
            for (let item of this.warnings)
                data["warnings"].push(item ? item.toJSON() : <any>undefined);
        }
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

export class EdgeValidationWarning implements interfaces.IEdgeValidationWarning {
    warningCode?: string | undefined;
    warningType?: string | undefined;
    message?: string | undefined;
    details?: string | undefined;
    severity?: enums.ValidationSeverity;
    recommendation?: string | undefined;
    context?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IEdgeValidationWarning) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.warningCode = _data["warningCode"];
            this.warningType = _data["warningType"];
            this.message = _data["message"];
            this.details = _data["details"];
            this.severity = _data["severity"];
            this.recommendation = _data["recommendation"];
            if (_data["context"]) {
                this.context = {} as any;
                for (let key in _data["context"]) {
                    if (_data["context"].hasOwnProperty(key))
                        (<any>this.context)![key] = _data["context"][key];
                }
            }
        }
    }

    static fromJS(data: any): EdgeValidationWarning {
        data = typeof data === 'object' ? data : {};
        let result = new EdgeValidationWarning();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["warningCode"] = this.warningCode;
        data["warningType"] = this.warningType;
        data["message"] = this.message;
        data["details"] = this.details;
        data["severity"] = this.severity;
        data["recommendation"] = this.recommendation;
        if (this.context) {
            data["context"] = {};
            for (let key in this.context) {
                if (this.context.hasOwnProperty(key))
                    (<any>data["context"])[key] = (<any>this.context)[key];
            }
        }
        return data;
    }
}

export class EncryptionInfoDto implements interfaces.IEncryptionInfoDto {
    algorithm?: string | undefined;
    keyId?: string | undefined;
    isEncrypted?: boolean;
    encryptedFields?: string[] | undefined;

    constructor(data?: interfaces.IEncryptionInfoDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.algorithm = _data["algorithm"];
            this.keyId = _data["keyId"];
            this.isEncrypted = _data["isEncrypted"];
            if (Array.isArray(_data["encryptedFields"])) {
                this.encryptedFields = [] as any;
                for (let item of _data["encryptedFields"])
                    this.encryptedFields!.push(item);
            }
        }
    }

    static fromJS(data: any): EncryptionInfoDto {
        data = typeof data === 'object' ? data : {};
        let result = new EncryptionInfoDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["algorithm"] = this.algorithm;
        data["keyId"] = this.keyId;
        data["isEncrypted"] = this.isEncrypted;
        if (Array.isArray(this.encryptedFields)) {
            data["encryptedFields"] = [];
            for (let item of this.encryptedFields)
                data["encryptedFields"].push(item);
        }
        return data;
    }
}

export class ExecutionCleanupReportDto implements interfaces.IExecutionCleanupReportDto {
    cleanupDate?: Date;
    executionsRemoved?: number;
    spaceFreed?: number;
    daysRetained?: number;
    removedByStatus?: { [key: string]: number; } | undefined;

    constructor(data?: interfaces.IExecutionCleanupReportDto) {
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

export class ExecutionCleanupReportDtoListApiResponse implements interfaces.IExecutionCleanupReportDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionCleanupReportDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionCleanupReportDtoListApiResponse) {
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

export class ExecutionDetailDto implements interfaces.IExecutionDetailDto {
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
    recentLogs?: string[] | undefined;
    environment?: ExecutionEnvironmentDto;
    webAppUrl?: string | undefined;
    webAppStatus?: WebAppStatusDto;

    constructor(data?: interfaces.IExecutionDetailDto) {
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

export class ExecutionDetailDtoApiResponse implements interfaces.IExecutionDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionDetailDtoApiResponse) {
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

export class ExecutionDto implements interfaces.IExecutionDto {
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

    constructor(data?: interfaces.IExecutionDto) {
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

export class ExecutionDtoApiResponse implements interfaces.IExecutionDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionDtoApiResponse) {
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

export class ExecutionEnvironmentDto implements interfaces.IExecutionEnvironmentDto {
    programId?: string | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: ExecutionResourceLimitsDto;
    configuration?: { [key: string]: any; } | undefined;
    lastUpdated?: Date;

    constructor(data?: interfaces.IExecutionEnvironmentDto) {
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

export class ExecutionEnvironmentDtoApiResponse implements interfaces.IExecutionEnvironmentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionEnvironmentDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionEnvironmentDtoApiResponse) {
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

export class ExecutionEnvironmentUpdateDto implements interfaces.IExecutionEnvironmentUpdateDto {
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: ExecutionResourceLimitsDto;
    configuration?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IExecutionEnvironmentUpdateDto) {
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

export class ExecutionListDto implements interfaces.IExecutionListDto {
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

    constructor(data?: interfaces.IExecutionListDto) {
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

export class ExecutionListDtoListApiResponse implements interfaces.IExecutionListDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionListDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionListDtoListApiResponse) {
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

export class ExecutionListDtoPagedResponse implements interfaces.IExecutionListDtoPagedResponse {
    items?: ExecutionListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;

    constructor(data?: interfaces.IExecutionListDtoPagedResponse) {
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

export class ExecutionListDtoPagedResponseApiResponse implements interfaces.IExecutionListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionListDtoPagedResponseApiResponse) {
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

export class ExecutionParametersDto implements interfaces.IExecutionParametersDto {
    programId!: string;
    versionId?: string | undefined;
    parameters?: any | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: ExecutionResourceLimitsDto;
    saveResults?: boolean;
    timeoutMinutes?: number;
    executionName?: string | undefined;

    constructor(data?: interfaces.IExecutionParametersDto) {
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

export class ExecutionPerformanceDto implements interfaces.IExecutionPerformanceDto {
    programId?: string | undefined;
    programName?: string | undefined;
    executionCount?: number;
    successRate?: number;
    averageExecutionTime?: number;
    averageResourceUsage?: number;
    lastExecution?: Date;

    constructor(data?: interfaces.IExecutionPerformanceDto) {
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

export class ExecutionPerformanceDtoListApiResponse implements interfaces.IExecutionPerformanceDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionPerformanceDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionPerformanceDtoListApiResponse) {
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

export class ExecutionQueueStatusDto implements interfaces.IExecutionQueueStatusDto {
    queueLength?: number;
    runningExecutions?: number;
    maxConcurrentExecutions?: number;
    averageWaitTime?: number;
    queuedExecutions?: ExecutionListDto[] | undefined;

    constructor(data?: interfaces.IExecutionQueueStatusDto) {
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

export class ExecutionQueueStatusDtoApiResponse implements interfaces.IExecutionQueueStatusDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionQueueStatusDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionQueueStatusDtoApiResponse) {
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

export class ExecutionResourceLimitsDto implements interfaces.IExecutionResourceLimitsDto {
    maxCpuPercentage?: number;
    maxMemoryMb?: number;
    maxDiskMb?: number;
    maxExecutionTimeMinutes?: number;
    maxConcurrentExecutions?: number;

    constructor(data?: interfaces.IExecutionResourceLimitsDto) {
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

export class ExecutionResourceLimitsDtoApiResponse implements interfaces.IExecutionResourceLimitsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionResourceLimitsDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionResourceLimitsDtoApiResponse) {
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

export class ExecutionResourceLimitsUpdateDto implements interfaces.IExecutionResourceLimitsUpdateDto {
    maxCpuPercentage?: number | undefined;
    maxMemoryMb?: number | undefined;
    maxDiskMb?: number | undefined;
    maxExecutionTimeMinutes?: number | undefined;
    maxConcurrentExecutions?: number | undefined;

    constructor(data?: interfaces.IExecutionResourceLimitsUpdateDto) {
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

export class ExecutionResourceTrendDto implements interfaces.IExecutionResourceTrendDto {
    timestamp?: Date;
    cpuUsage?: number;
    memoryUsage?: number;
    diskUsage?: number;
    activeExecutions?: number;

    constructor(data?: interfaces.IExecutionResourceTrendDto) {
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

export class ExecutionResourceTrendDtoListApiResponse implements interfaces.IExecutionResourceTrendDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionResourceTrendDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionResourceTrendDtoListApiResponse) {
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

export class ExecutionResourceUpdateDto implements interfaces.IExecutionResourceUpdateDto {
    cpuTime?: number;
    memoryUsed?: number;
    diskUsed?: number;
    additionalMetrics?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IExecutionResourceUpdateDto) {
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

export class ExecutionResourceUsageDto implements interfaces.IExecutionResourceUsageDto {
    cpuTime?: number;
    memoryUsed?: number;
    diskUsed?: number;
    cpuPercentage?: number;
    memoryPercentage?: number;
    diskPercentage?: number;
    lastUpdated?: Date;

    constructor(data?: interfaces.IExecutionResourceUsageDto) {
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

export class ExecutionResourceUsageDtoApiResponse implements interfaces.IExecutionResourceUsageDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionResourceUsageDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionResourceUsageDtoApiResponse) {
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

export class ExecutionResultDto implements interfaces.IExecutionResultDto {
    exitCode?: number;
    output?: string | undefined;
    outputFiles?: string[] | undefined;
    error?: string | undefined;
    webAppUrl?: string | undefined;
    completedAt?: Date | undefined;

    constructor(data?: interfaces.IExecutionResultDto) {
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

export class ExecutionResultDtoApiResponse implements interfaces.IExecutionResultDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionResultDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionResultDtoApiResponse) {
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

export class ExecutionScheduleRequestDto implements interfaces.IExecutionScheduleRequestDto {
    scheduledTime?: Date;
    parameters?: any | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: ExecutionResourceLimitsDto;
    saveResults?: boolean;
    description?: string | undefined;

    constructor(data?: interfaces.IExecutionScheduleRequestDto) {
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

export class ExecutionSearchDto implements interfaces.IExecutionSearchDto {
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

    constructor(data?: interfaces.IExecutionSearchDto) {
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

export class ExecutionSecurityScanResult implements interfaces.IExecutionSecurityScanResult {
    isSecure?: boolean;
    securityIssues?: string[] | undefined;
    securityWarnings?: string[] | undefined;
    riskLevel?: number;
    scanDate?: Date;

    constructor(data?: interfaces.IExecutionSecurityScanResult) {
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

export class ExecutionSecurityScanResultApiResponse implements interfaces.IExecutionSecurityScanResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionSecurityScanResult;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionSecurityScanResultApiResponse) {
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

export class ExecutionStatsDto implements interfaces.IExecutionStatsDto {
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

    constructor(data?: interfaces.IExecutionStatsDto) {
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

export class ExecutionStatsDtoApiResponse implements interfaces.IExecutionStatsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionStatsDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionStatsDtoApiResponse) {
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

export class ExecutionStatusDto implements interfaces.IExecutionStatusDto {
    id?: string | undefined;
    status?: string | undefined;
    startedAt?: Date;
    completedAt?: Date | undefined;
    progress?: number | undefined;
    currentStep?: string | undefined;
    resourceUsage?: ExecutionResourceUsageDto;
    statusMessage?: string | undefined;

    constructor(data?: interfaces.IExecutionStatusDto) {
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

export class ExecutionStatusDtoApiResponse implements interfaces.IExecutionStatusDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionStatusDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionStatusDtoApiResponse) {
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

export class ExecutionSummaryDto implements interfaces.IExecutionSummaryDto {
    userId?: string | undefined;
    totalExecutions?: number;
    successfulExecutions?: number;
    failedExecutions?: number;
    totalCpuTime?: number;
    totalMemoryUsed?: number;
    lastExecution?: Date | undefined;
    programPerformance?: ExecutionPerformanceDto[] | undefined;

    constructor(data?: interfaces.IExecutionSummaryDto) {
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

export class ExecutionSummaryDtoApiResponse implements interfaces.IExecutionSummaryDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionSummaryDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionSummaryDtoApiResponse) {
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

export class ExecutionTemplateDto implements interfaces.IExecutionTemplateDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    language?: string | undefined;
    parameterSchema?: any | undefined;
    defaultEnvironment?: { [key: string]: string; } | undefined;
    defaultResourceLimits?: ExecutionResourceLimitsDto;

    constructor(data?: interfaces.IExecutionTemplateDto) {
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

export class ExecutionTemplateDtoListApiResponse implements interfaces.IExecutionTemplateDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionTemplateDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionTemplateDtoListApiResponse) {
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

export class ExecutionTrendDto implements interfaces.IExecutionTrendDto {
    date?: Date;
    executionCount?: number;
    successfulCount?: number;
    failedCount?: number;
    averageExecutionTime?: number;
    totalResourceUsage?: number;

    constructor(data?: interfaces.IExecutionTrendDto) {
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

export class ExecutionTrendDtoListApiResponse implements interfaces.IExecutionTrendDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionTrendDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionTrendDtoListApiResponse) {
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

export class ExecutionValidationResult implements interfaces.IExecutionValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    recommendedLimits?: ExecutionResourceLimitsDto;

    constructor(data?: interfaces.IExecutionValidationResult) {
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

export class ExecutionValidationResultApiResponse implements interfaces.IExecutionValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ExecutionValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IExecutionValidationResultApiResponse) {
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

export class FileStorageResult implements interfaces.IFileStorageResult {
    filePath?: string | undefined;
    storageKey?: string | undefined;
    hash?: string | undefined;
    size?: number;
    contentType?: string | undefined;
    success?: boolean;
    errorMessage?: string | undefined;

    constructor(data?: interfaces.IFileStorageResult) {
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

export class FileStorageResultListApiResponse implements interfaces.IFileStorageResultListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: FileStorageResult[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IFileStorageResultListApiResponse) {
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

export class FileValidationRequest implements interfaces.IFileValidationRequest {
    fileName!: string;
    content!: string;
    contentType!: string;

    constructor(data?: interfaces.IFileValidationRequest) {
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

export class FileValidationResult implements interfaces.IFileValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    suggestedContentType?: string | undefined;

    constructor(data?: interfaces.IFileValidationResult) {
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

export class FileValidationResultApiResponse implements interfaces.IFileValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: FileValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IFileValidationResultApiResponse) {
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

export class FireHazardDto implements interfaces.IFireHazardDto {
    score?: number;
    level?: enums.Level;
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

    constructor(data?: interfaces.IFireHazardDto) {
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

export class FireHazardResponseDto implements interfaces.IFireHazardResponseDto {
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

    constructor(data?: interfaces.IFireHazardResponseDto) {
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

export class FloodHazardDto implements interfaces.IFloodHazardDto {
    score?: number;
    level?: enums.Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;
    incident?: string | undefined;
    incidentDescription?: string | undefined;
    drainageSystem?: string | undefined;
    basementFlooding?: string | undefined;
    extremeEventCondition?: string | undefined;

    constructor(data?: interfaces.IFloodHazardDto) {
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

export class FloodHazardResponseDto implements interfaces.IFloodHazardResponseDto {
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

    constructor(data?: interfaces.IFloodHazardResponseDto) {
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

export class HazardResponseDto implements interfaces.IHazardResponseDto {
    score?: number;
    level?: string | undefined;
    description?: string | undefined;
    hasCCTV?: boolean | undefined;

    constructor(data?: interfaces.IHazardResponseDto) {
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

export class HazardSummaryResponseDto implements interfaces.IHazardSummaryResponseDto {
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

    constructor(data?: interfaces.IHazardSummaryResponseDto) {
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

export class HealthCheckResultDto implements interfaces.IHealthCheckResultDto {
    name?: string | undefined;
    status?: string | undefined;
    checkedAt?: Date;
    durationMs?: number;
    message?: string | undefined;

    constructor(data?: interfaces.IHealthCheckResultDto) {
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

export class Int32ApiResponse implements interfaces.IInt32ApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: number;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IInt32ApiResponse) {
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

export class LandslideHazardDto implements interfaces.ILandslideHazardDto {
    score?: number;
    level?: enums.Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;

    constructor(data?: interfaces.ILandslideHazardDto) {
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

export class LandslideHazardResponseDto implements interfaces.ILandslideHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;

    constructor(data?: interfaces.ILandslideHazardResponseDto) {
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

export class LocationRequestDto implements interfaces.ILocationRequestDto {
    latitude!: number;
    longitude!: number;

    constructor(data?: interfaces.ILocationRequestDto) {
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

export class LocationResponseDto implements interfaces.ILocationResponseDto {
    latitude?: number;
    longitude?: number;

    constructor(data?: interfaces.ILocationResponseDto) {
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

export class MasonryBlockResponseDto implements interfaces.IMasonryBlockResponseDto {
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

    constructor(data?: interfaces.IMasonryBlockResponseDto) {
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

export class MasonryBlockResponseDtoApiResponse implements interfaces.IMasonryBlockResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: MasonryBlockResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IMasonryBlockResponseDtoApiResponse) {
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

export class MasonryBlockResponseDtoListApiResponse implements interfaces.IMasonryBlockResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: MasonryBlockResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IMasonryBlockResponseDtoListApiResponse) {
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

export class MasonryCreateDto implements interfaces.IMasonryCreateDto {
    id!: string;
    name!: string;
    xAxisLength!: number;
    yAxisLength!: number;
    storeyHeight!: { [key: string]: number; };
    unitTypeList?: MasonryUnitType[] | undefined;

    constructor(data?: interfaces.IMasonryCreateDto) {
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

export class MasonryUnitType implements interfaces.IMasonryUnitType {

    constructor(data?: interfaces.IMasonryUnitType) {
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

export class MasonryUnitTypeResponseDto implements interfaces.IMasonryUnitTypeResponseDto {

    constructor(data?: interfaces.IMasonryUnitTypeResponseDto) {
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

export class MasonryUpdateDto implements interfaces.IMasonryUpdateDto {
    id?: string | undefined;
    name?: string | undefined;
    xAxisLength?: number | undefined;
    yAxisLength?: number | undefined;
    storeyHeight?: { [key: string]: number; } | undefined;
    unitTypeList?: MasonryUnitType[] | undefined;

    constructor(data?: interfaces.IMasonryUpdateDto) {
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

export class NodeConditionalExecutionDto implements interfaces.INodeConditionalExecutionDto {
    condition!: string;
    conditionType?: enums.ConditionalType;
    skipIfConditionFails?: boolean;
    alternativeNodeId?: string | undefined;

    constructor(data?: interfaces.INodeConditionalExecutionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.condition = _data["condition"];
            this.conditionType = _data["conditionType"];
            this.skipIfConditionFails = _data["skipIfConditionFails"];
            this.alternativeNodeId = _data["alternativeNodeId"];
        }
    }

    static fromJS(data: any): NodeConditionalExecutionDto {
        data = typeof data === 'object' ? data : {};
        let result = new NodeConditionalExecutionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["condition"] = this.condition;
        data["conditionType"] = this.conditionType;
        data["skipIfConditionFails"] = this.skipIfConditionFails;
        data["alternativeNodeId"] = this.alternativeNodeId;
        return data;
    }
}

export class NodeExecutionResponseDto implements interfaces.INodeExecutionResponseDto {
    id?: string | undefined;
    executionId?: string | undefined;
    nodeId?: string | undefined;
    nodeName?: string | undefined;
    programId?: string | undefined;
    versionId?: string | undefined;
    startedAt?: Date;
    completedAt?: Date | undefined;
    duration?: string | undefined;
    status?: enums.NodeExecutionStatus;
    exitCode?: number | undefined;
    errorMessage?: string | undefined;
    inputData?: { [key: string]: any; } | undefined;
    outputData?: { [key: string]: any; } | undefined;
    metadata?: { [key: string]: any; } | undefined;
    retryHistory?: string[] | undefined;
    isSkipped?: boolean;
    skipReason?: string | undefined;

    constructor(data?: interfaces.INodeExecutionResponseDto) {
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
            this.executionId = _data["executionId"];
            this.nodeId = _data["nodeId"];
            this.nodeName = _data["nodeName"];
            this.programId = _data["programId"];
            this.versionId = _data["versionId"];
            this.startedAt = _data["startedAt"] ? new Date(_data["startedAt"].toString()) : <any>undefined;
            this.completedAt = _data["completedAt"] ? new Date(_data["completedAt"].toString()) : <any>undefined;
            this.duration = _data["duration"];
            this.status = _data["status"];
            this.exitCode = _data["exitCode"];
            this.errorMessage = _data["errorMessage"];
            if (_data["inputData"]) {
                this.inputData = {} as any;
                for (let key in _data["inputData"]) {
                    if (_data["inputData"].hasOwnProperty(key))
                        (<any>this.inputData)![key] = _data["inputData"][key];
                }
            }
            if (_data["outputData"]) {
                this.outputData = {} as any;
                for (let key in _data["outputData"]) {
                    if (_data["outputData"].hasOwnProperty(key))
                        (<any>this.outputData)![key] = _data["outputData"][key];
                }
            }
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
            if (Array.isArray(_data["retryHistory"])) {
                this.retryHistory = [] as any;
                for (let item of _data["retryHistory"])
                    this.retryHistory!.push(item);
            }
            this.isSkipped = _data["isSkipped"];
            this.skipReason = _data["skipReason"];
        }
    }

    static fromJS(data: any): NodeExecutionResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new NodeExecutionResponseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["executionId"] = this.executionId;
        data["nodeId"] = this.nodeId;
        data["nodeName"] = this.nodeName;
        data["programId"] = this.programId;
        data["versionId"] = this.versionId;
        data["startedAt"] = this.startedAt ? this.startedAt.toISOString() : <any>undefined;
        data["completedAt"] = this.completedAt ? this.completedAt.toISOString() : <any>undefined;
        data["duration"] = this.duration;
        data["status"] = this.status;
        data["exitCode"] = this.exitCode;
        data["errorMessage"] = this.errorMessage;
        if (this.inputData) {
            data["inputData"] = {};
            for (let key in this.inputData) {
                if (this.inputData.hasOwnProperty(key))
                    (<any>data["inputData"])[key] = (<any>this.inputData)[key];
            }
        }
        if (this.outputData) {
            data["outputData"] = {};
            for (let key in this.outputData) {
                if (this.outputData.hasOwnProperty(key))
                    (<any>data["outputData"])[key] = (<any>this.outputData)[key];
            }
        }
        if (this.metadata) {
            data["metadata"] = {};
            for (let key in this.metadata) {
                if (this.metadata.hasOwnProperty(key))
                    (<any>data["metadata"])[key] = (<any>this.metadata)[key];
            }
        }
        if (Array.isArray(this.retryHistory)) {
            data["retryHistory"] = [];
            for (let item of this.retryHistory)
                data["retryHistory"].push(item);
        }
        data["isSkipped"] = this.isSkipped;
        data["skipReason"] = this.skipReason;
        return data;
    }
}

export class NodeExecutionResponseDtoApiResponse implements interfaces.INodeExecutionResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: NodeExecutionResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.INodeExecutionResponseDtoApiResponse) {
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
            this.data = _data["data"] ? NodeExecutionResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): NodeExecutionResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new NodeExecutionResponseDtoApiResponse();
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

export class NodeExecutionSettingsDto implements interfaces.INodeExecutionSettingsDto {
    timeoutMinutes?: number;
    retryCount?: number;
    retryDelaySeconds?: number;
    resourceLimits?: NodeResourceLimitsDto;
    environment?: { [key: string]: string; } | undefined;
    runInParallel?: boolean;
    priority?: number;

    constructor(data?: interfaces.INodeExecutionSettingsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.timeoutMinutes = _data["timeoutMinutes"];
            this.retryCount = _data["retryCount"];
            this.retryDelaySeconds = _data["retryDelaySeconds"];
            this.resourceLimits = _data["resourceLimits"] ? NodeResourceLimitsDto.fromJS(_data["resourceLimits"]) : <any>undefined;
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            this.runInParallel = _data["runInParallel"];
            this.priority = _data["priority"];
        }
    }

    static fromJS(data: any): NodeExecutionSettingsDto {
        data = typeof data === 'object' ? data : {};
        let result = new NodeExecutionSettingsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["timeoutMinutes"] = this.timeoutMinutes;
        data["retryCount"] = this.retryCount;
        data["retryDelaySeconds"] = this.retryDelaySeconds;
        data["resourceLimits"] = this.resourceLimits ? this.resourceLimits.toJSON() : <any>undefined;
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        data["runInParallel"] = this.runInParallel;
        data["priority"] = this.priority;
        return data;
    }
}

export class NodeInputConfigurationDto implements interfaces.INodeInputConfigurationDto {
    inputMappings?: NodeInputMappingDto[] | undefined;
    staticInputs?: { [key: string]: any; } | undefined;
    userInputs?: NodeUserInputDto[] | undefined;
    validationRules?: NodeValidationRuleDto[] | undefined;

    constructor(data?: interfaces.INodeInputConfigurationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["inputMappings"])) {
                this.inputMappings = [] as any;
                for (let item of _data["inputMappings"])
                    this.inputMappings!.push(NodeInputMappingDto.fromJS(item));
            }
            if (_data["staticInputs"]) {
                this.staticInputs = {} as any;
                for (let key in _data["staticInputs"]) {
                    if (_data["staticInputs"].hasOwnProperty(key))
                        (<any>this.staticInputs)![key] = _data["staticInputs"][key];
                }
            }
            if (Array.isArray(_data["userInputs"])) {
                this.userInputs = [] as any;
                for (let item of _data["userInputs"])
                    this.userInputs!.push(NodeUserInputDto.fromJS(item));
            }
            if (Array.isArray(_data["validationRules"])) {
                this.validationRules = [] as any;
                for (let item of _data["validationRules"])
                    this.validationRules!.push(NodeValidationRuleDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): NodeInputConfigurationDto {
        data = typeof data === 'object' ? data : {};
        let result = new NodeInputConfigurationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.inputMappings)) {
            data["inputMappings"] = [];
            for (let item of this.inputMappings)
                data["inputMappings"].push(item ? item.toJSON() : <any>undefined);
        }
        if (this.staticInputs) {
            data["staticInputs"] = {};
            for (let key in this.staticInputs) {
                if (this.staticInputs.hasOwnProperty(key))
                    (<any>data["staticInputs"])[key] = (<any>this.staticInputs)[key];
            }
        }
        if (Array.isArray(this.userInputs)) {
            data["userInputs"] = [];
            for (let item of this.userInputs)
                data["userInputs"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.validationRules)) {
            data["validationRules"] = [];
            for (let item of this.validationRules)
                data["validationRules"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class NodeInputMappingDto implements interfaces.INodeInputMappingDto {
    inputName!: string;
    sourceNodeId!: string;
    sourceOutputName!: string;
    transformation?: string | undefined;
    isOptional?: boolean;
    defaultValue?: any | undefined;

    constructor(data?: interfaces.INodeInputMappingDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.inputName = _data["inputName"];
            this.sourceNodeId = _data["sourceNodeId"];
            this.sourceOutputName = _data["sourceOutputName"];
            this.transformation = _data["transformation"];
            this.isOptional = _data["isOptional"];
            this.defaultValue = _data["defaultValue"];
        }
    }

    static fromJS(data: any): NodeInputMappingDto {
        data = typeof data === 'object' ? data : {};
        let result = new NodeInputMappingDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["inputName"] = this.inputName;
        data["sourceNodeId"] = this.sourceNodeId;
        data["sourceOutputName"] = this.sourceOutputName;
        data["transformation"] = this.transformation;
        data["isOptional"] = this.isOptional;
        data["defaultValue"] = this.defaultValue;
        return data;
    }
}

export class NodeOutputConfigurationDto implements interfaces.INodeOutputConfigurationDto {
    outputMappings?: NodeOutputMappingDto[] | undefined;
    outputSchema?: { [key: string]: any; } | undefined;
    cacheResults?: boolean;
    cacheTtlMinutes?: number;

    constructor(data?: interfaces.INodeOutputConfigurationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["outputMappings"])) {
                this.outputMappings = [] as any;
                for (let item of _data["outputMappings"])
                    this.outputMappings!.push(NodeOutputMappingDto.fromJS(item));
            }
            if (_data["outputSchema"]) {
                this.outputSchema = {} as any;
                for (let key in _data["outputSchema"]) {
                    if (_data["outputSchema"].hasOwnProperty(key))
                        (<any>this.outputSchema)![key] = _data["outputSchema"][key];
                }
            }
            this.cacheResults = _data["cacheResults"];
            this.cacheTtlMinutes = _data["cacheTtlMinutes"];
        }
    }

    static fromJS(data: any): NodeOutputConfigurationDto {
        data = typeof data === 'object' ? data : {};
        let result = new NodeOutputConfigurationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.outputMappings)) {
            data["outputMappings"] = [];
            for (let item of this.outputMappings)
                data["outputMappings"].push(item ? item.toJSON() : <any>undefined);
        }
        if (this.outputSchema) {
            data["outputSchema"] = {};
            for (let key in this.outputSchema) {
                if (this.outputSchema.hasOwnProperty(key))
                    (<any>data["outputSchema"])[key] = (<any>this.outputSchema)[key];
            }
        }
        data["cacheResults"] = this.cacheResults;
        data["cacheTtlMinutes"] = this.cacheTtlMinutes;
        return data;
    }
}

export class NodeOutputMappingDto implements interfaces.INodeOutputMappingDto {
    outputName!: string;
    sourceField!: string;
    transformation?: string | undefined;
    dataType?: string | undefined;
    isArray?: boolean;

    constructor(data?: interfaces.INodeOutputMappingDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.outputName = _data["outputName"];
            this.sourceField = _data["sourceField"];
            this.transformation = _data["transformation"];
            this.dataType = _data["dataType"];
            this.isArray = _data["isArray"];
        }
    }

    static fromJS(data: any): NodeOutputMappingDto {
        data = typeof data === 'object' ? data : {};
        let result = new NodeOutputMappingDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["outputName"] = this.outputName;
        data["sourceField"] = this.sourceField;
        data["transformation"] = this.transformation;
        data["dataType"] = this.dataType;
        data["isArray"] = this.isArray;
        return data;
    }
}

export class NodePositionDto implements interfaces.INodePositionDto {
    x?: number;
    y?: number;
    width?: number;
    height?: number;

    constructor(data?: interfaces.INodePositionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.x = _data["x"];
            this.y = _data["y"];
            this.width = _data["width"];
            this.height = _data["height"];
        }
    }

    static fromJS(data: any): NodePositionDto {
        data = typeof data === 'object' ? data : {};
        let result = new NodePositionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["x"] = this.x;
        data["y"] = this.y;
        data["width"] = this.width;
        data["height"] = this.height;
        return data;
    }
}

export class NodeResourceLimitsDto implements interfaces.INodeResourceLimitsDto {
    maxCpuPercentage?: number;
    maxMemoryMb?: number;
    maxDiskMb?: number;

    constructor(data?: interfaces.INodeResourceLimitsDto) {
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
        }
    }

    static fromJS(data: any): NodeResourceLimitsDto {
        data = typeof data === 'object' ? data : {};
        let result = new NodeResourceLimitsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["maxCpuPercentage"] = this.maxCpuPercentage;
        data["maxMemoryMb"] = this.maxMemoryMb;
        data["maxDiskMb"] = this.maxDiskMb;
        return data;
    }
}

export class NodeUIConfigurationDto implements interfaces.INodeUIConfigurationDto {
    color?: string | undefined;
    icon?: string | undefined;
    showProgress?: boolean;
    customLabel?: string | undefined;

    constructor(data?: interfaces.INodeUIConfigurationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.color = _data["color"];
            this.icon = _data["icon"];
            this.showProgress = _data["showProgress"];
            this.customLabel = _data["customLabel"];
        }
    }

    static fromJS(data: any): NodeUIConfigurationDto {
        data = typeof data === 'object' ? data : {};
        let result = new NodeUIConfigurationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["color"] = this.color;
        data["icon"] = this.icon;
        data["showProgress"] = this.showProgress;
        data["customLabel"] = this.customLabel;
        return data;
    }
}

export class NodeUserInputDto implements interfaces.INodeUserInputDto {
    name!: string;
    type?: string | undefined;
    label?: string | undefined;
    placeholder?: string | undefined;
    isRequired?: boolean;
    options?: string[] | undefined;
    defaultValue?: any | undefined;
    validation?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.INodeUserInputDto) {
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
            this.label = _data["label"];
            this.placeholder = _data["placeholder"];
            this.isRequired = _data["isRequired"];
            if (Array.isArray(_data["options"])) {
                this.options = [] as any;
                for (let item of _data["options"])
                    this.options!.push(item);
            }
            this.defaultValue = _data["defaultValue"];
            if (_data["validation"]) {
                this.validation = {} as any;
                for (let key in _data["validation"]) {
                    if (_data["validation"].hasOwnProperty(key))
                        (<any>this.validation)![key] = _data["validation"][key];
                }
            }
        }
    }

    static fromJS(data: any): NodeUserInputDto {
        data = typeof data === 'object' ? data : {};
        let result = new NodeUserInputDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["type"] = this.type;
        data["label"] = this.label;
        data["placeholder"] = this.placeholder;
        data["isRequired"] = this.isRequired;
        if (Array.isArray(this.options)) {
            data["options"] = [];
            for (let item of this.options)
                data["options"].push(item);
        }
        data["defaultValue"] = this.defaultValue;
        if (this.validation) {
            data["validation"] = {};
            for (let key in this.validation) {
                if (this.validation.hasOwnProperty(key))
                    (<any>data["validation"])[key] = (<any>this.validation)[key];
            }
        }
        return data;
    }
}

export class NodeValidationError implements interfaces.INodeValidationError {
    errorCode?: string | undefined;
    errorType?: string | undefined;
    message?: string | undefined;
    details?: string | undefined;
    severity?: enums.ValidationSeverity;
    suggestedFix?: string | undefined;
    context?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.INodeValidationError) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.errorCode = _data["errorCode"];
            this.errorType = _data["errorType"];
            this.message = _data["message"];
            this.details = _data["details"];
            this.severity = _data["severity"];
            this.suggestedFix = _data["suggestedFix"];
            if (_data["context"]) {
                this.context = {} as any;
                for (let key in _data["context"]) {
                    if (_data["context"].hasOwnProperty(key))
                        (<any>this.context)![key] = _data["context"][key];
                }
            }
        }
    }

    static fromJS(data: any): NodeValidationError {
        data = typeof data === 'object' ? data : {};
        let result = new NodeValidationError();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["errorCode"] = this.errorCode;
        data["errorType"] = this.errorType;
        data["message"] = this.message;
        data["details"] = this.details;
        data["severity"] = this.severity;
        data["suggestedFix"] = this.suggestedFix;
        if (this.context) {
            data["context"] = {};
            for (let key in this.context) {
                if (this.context.hasOwnProperty(key))
                    (<any>data["context"])[key] = (<any>this.context)[key];
            }
        }
        return data;
    }
}

export class NodeValidationResult implements interfaces.INodeValidationResult {
    isValid?: boolean;
    errors?: NodeValidationError[] | undefined;
    warnings?: NodeValidationWarning[] | undefined;
    metadata?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.INodeValidationResult) {
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
                    this.errors!.push(NodeValidationError.fromJS(item));
            }
            if (Array.isArray(_data["warnings"])) {
                this.warnings = [] as any;
                for (let item of _data["warnings"])
                    this.warnings!.push(NodeValidationWarning.fromJS(item));
            }
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
        }
    }

    static fromJS(data: any): NodeValidationResult {
        data = typeof data === 'object' ? data : {};
        let result = new NodeValidationResult();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isValid"] = this.isValid;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.warnings)) {
            data["warnings"] = [];
            for (let item of this.warnings)
                data["warnings"].push(item ? item.toJSON() : <any>undefined);
        }
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

export class NodeValidationRuleDto implements interfaces.INodeValidationRuleDto {
    field!: string;
    rule!: string;
    value?: any | undefined;
    message?: string | undefined;

    constructor(data?: interfaces.INodeValidationRuleDto) {
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
            this.rule = _data["rule"];
            this.value = _data["value"];
            this.message = _data["message"];
        }
    }

    static fromJS(data: any): NodeValidationRuleDto {
        data = typeof data === 'object' ? data : {};
        let result = new NodeValidationRuleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["field"] = this.field;
        data["rule"] = this.rule;
        data["value"] = this.value;
        data["message"] = this.message;
        return data;
    }
}

export class NodeValidationWarning implements interfaces.INodeValidationWarning {
    warningCode?: string | undefined;
    warningType?: string | undefined;
    message?: string | undefined;
    details?: string | undefined;
    severity?: enums.ValidationSeverity;
    recommendation?: string | undefined;
    context?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.INodeValidationWarning) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.warningCode = _data["warningCode"];
            this.warningType = _data["warningType"];
            this.message = _data["message"];
            this.details = _data["details"];
            this.severity = _data["severity"];
            this.recommendation = _data["recommendation"];
            if (_data["context"]) {
                this.context = {} as any;
                for (let key in _data["context"]) {
                    if (_data["context"].hasOwnProperty(key))
                        (<any>this.context)![key] = _data["context"][key];
                }
            }
        }
    }

    static fromJS(data: any): NodeValidationWarning {
        data = typeof data === 'object' ? data : {};
        let result = new NodeValidationWarning();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["warningCode"] = this.warningCode;
        data["warningType"] = this.warningType;
        data["message"] = this.message;
        data["details"] = this.details;
        data["severity"] = this.severity;
        data["recommendation"] = this.recommendation;
        if (this.context) {
            data["context"] = {};
            for (let key in this.context) {
                if (this.context.hasOwnProperty(key))
                    (<any>data["context"])[key] = (<any>this.context)[key];
            }
        }
        return data;
    }
}

export class NoiseHazardDto implements interfaces.INoiseHazardDto {
    score?: number;
    level?: enums.Level;
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

    constructor(data?: interfaces.INoiseHazardDto) {
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

export class NoiseHazardResponseDto implements interfaces.INoiseHazardResponseDto {
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

    constructor(data?: interfaces.INoiseHazardResponseDto) {
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

export class NoiseMeasurementsForBuildings implements interfaces.INoiseMeasurementsForBuildings {
    control?: number;
    security?: number;
    switchyard?: number;

    constructor(data?: interfaces.INoiseMeasurementsForBuildings) {
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

export class PasswordResetResponseDto implements interfaces.IPasswordResetResponseDto {
    success?: boolean;
    message?: string | undefined;

    constructor(data?: interfaces.IPasswordResetResponseDto) {
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

export class PasswordResetResponseDtoApiResponse implements interfaces.IPasswordResetResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: PasswordResetResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IPasswordResetResponseDtoApiResponse) {
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

export class PollutionDto implements interfaces.IPollutionDto {
    pollutantLocation!: LocationRequestDto;
    pollutantNo!: number;
    pollutantSource?: string | undefined;
    pollutantDistance?: number;
    pollutantLevel?: enums.Level;

    constructor(data?: interfaces.IPollutionDto) {
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

export class PollutionResponseDto implements interfaces.IPollutionResponseDto {
    pollutantLocation?: LocationResponseDto;
    pollutantNo?: number;
    pollutantSource?: string | undefined;
    pollutantDistance?: number;
    pollutantLevel?: string | undefined;

    constructor(data?: interfaces.IPollutionResponseDto) {
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

export class ProgramComponentMappingDto implements interfaces.IProgramComponentMappingDto {
    id?: string | undefined;
    programId?: string | undefined;
    versionId?: string | undefined;
    componentId?: string | undefined;
    componentName?: string | undefined;
    mappingName?: string | undefined;
    mappingConfiguration?: { [key: string]: any; } | undefined;
    displayOrder?: number;
    isActive?: boolean;
    createdAt?: Date;

    constructor(data?: interfaces.IProgramComponentMappingDto) {
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
            if (_data["mappingConfiguration"]) {
                this.mappingConfiguration = {} as any;
                for (let key in _data["mappingConfiguration"]) {
                    if (_data["mappingConfiguration"].hasOwnProperty(key))
                        (<any>this.mappingConfiguration)![key] = _data["mappingConfiguration"][key];
                }
            }
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
        if (this.mappingConfiguration) {
            data["mappingConfiguration"] = {};
            for (let key in this.mappingConfiguration) {
                if (this.mappingConfiguration.hasOwnProperty(key))
                    (<any>data["mappingConfiguration"])[key] = (<any>this.mappingConfiguration)[key];
            }
        }
        data["displayOrder"] = this.displayOrder;
        data["isActive"] = this.isActive;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        return data;
    }
}

export class ProgramComponentMappingDtoListApiResponse implements interfaces.IProgramComponentMappingDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramComponentMappingDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IProgramComponentMappingDtoListApiResponse) {
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

export class ProgramCreateDto implements interfaces.IProgramCreateDto {
    name!: string;
    description?: string | undefined;
    type!: string;
    language!: string;
    mainFile?: string | undefined;
    uiType!: string;
    uiConfiguration?: any | undefined;
    metadata?: any | undefined;
    deploymentInfo?: AppDeploymentInfo;

    constructor(data?: interfaces.IProgramCreateDto) {
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

export class ProgramDeploymentDto implements interfaces.IProgramDeploymentDto {
    id?: string | undefined;
    deploymentType?: enums.AppDeploymentType;
    status?: string | undefined;
    lastDeployed?: Date | undefined;
    configuration?: { [key: string]: any; } | undefined;
    supportedFeatures?: string[] | undefined;
    applicationUrl?: string | undefined;
    logs?: string[] | undefined;

    constructor(data?: interfaces.IProgramDeploymentDto) {
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

export class ProgramDeploymentDtoApiResponse implements interfaces.IProgramDeploymentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramDeploymentDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IProgramDeploymentDtoApiResponse) {
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

export class ProgramDeploymentStatusDto implements interfaces.IProgramDeploymentStatusDto {
    deploymentType?: enums.AppDeploymentType;
    status?: string | undefined;
    lastDeployed?: Date | undefined;
    applicationUrl?: string | undefined;
    isHealthy?: boolean;
    lastHealthCheck?: Date;
    recentLogs?: string[] | undefined;

    constructor(data?: interfaces.IProgramDeploymentStatusDto) {
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

export class ProgramDeploymentStatusDtoApiResponse implements interfaces.IProgramDeploymentStatusDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramDeploymentStatusDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IProgramDeploymentStatusDtoApiResponse) {
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

export class ProgramDetailDto implements interfaces.IProgramDetailDto {
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

    constructor(data?: interfaces.IProgramDetailDto) {
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

export class ProgramDetailDtoApiResponse implements interfaces.IProgramDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IProgramDetailDtoApiResponse) {
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

export class ProgramDto implements interfaces.IProgramDto {
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

    constructor(data?: interfaces.IProgramDto) {
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

export class ProgramDtoApiResponse implements interfaces.IProgramDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IProgramDtoApiResponse) {
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

export class ProgramExecutionRequestDto implements interfaces.IProgramExecutionRequestDto {
    parameters?: any | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: ExecutionResourceLimitsDto;
    saveResults?: boolean;
    timeoutMinutes?: number;

    constructor(data?: interfaces.IProgramExecutionRequestDto) {
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

export class ProgramFileDto implements interfaces.IProgramFileDto {
    path?: string | undefined;
    contentType?: string | undefined;
    size?: number;
    lastModified?: Date;
    description?: string | undefined;
    hash?: string | undefined;

    constructor(data?: interfaces.IProgramFileDto) {
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

export class ProgramGroupPermissionDto implements interfaces.IProgramGroupPermissionDto {
    groupId!: string;
    accessLevel!: string;

    constructor(data?: interfaces.IProgramGroupPermissionDto) {
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

export class ProgramListDto implements interfaces.IProgramListDto {
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
    deploymentType?: enums.AppDeploymentType;
    deploymentStatus?: string | undefined;

    constructor(data?: interfaces.IProgramListDto) {
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

export class ProgramListDtoPagedResponse implements interfaces.IProgramListDtoPagedResponse {
    items?: ProgramListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;

    constructor(data?: interfaces.IProgramListDtoPagedResponse) {
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

export class ProgramListDtoPagedResponseApiResponse implements interfaces.IProgramListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IProgramListDtoPagedResponseApiResponse) {
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

export class ProgramPermissionDto implements interfaces.IProgramPermissionDto {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    accessLevel?: string | undefined;

    constructor(data?: interfaces.IProgramPermissionDto) {
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

export class ProgramPermissionDtoListApiResponse implements interfaces.IProgramPermissionDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProgramPermissionDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IProgramPermissionDtoListApiResponse) {
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

export class ProgramSearchDto implements interfaces.IProgramSearchDto {
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
    deploymentType?: enums.AppDeploymentType;

    constructor(data?: interfaces.IProgramSearchDto) {
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

export class ProgramStatsDto implements interfaces.IProgramStatsDto {
    totalExecutions?: number;
    successfulExecutions?: number;
    failedExecutions?: number;
    lastExecution?: Date | undefined;
    averageExecutionTime?: number;
    totalVersions?: number;
    lastUpdate?: Date | undefined;

    constructor(data?: interfaces.IProgramStatsDto) {
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

export class ProgramUpdateDto implements interfaces.IProgramUpdateDto {
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    language?: string | undefined;
    mainFile?: string | undefined;
    uiType?: string | undefined;
    uiConfiguration?: any | undefined;
    metadata?: any | undefined;
    deploymentInfo?: AppDeploymentInfo;

    constructor(data?: interfaces.IProgramUpdateDto) {
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

export class ProgramUserPermissionDto implements interfaces.IProgramUserPermissionDto {
    userId!: string;
    accessLevel!: string;

    constructor(data?: interfaces.IProgramUserPermissionDto) {
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

export class ProjectComplexityDto implements interfaces.IProjectComplexityDto {
    totalFiles?: number;
    totalLines?: number;
    dependencies?: number;
    complexityLevel?: string | undefined;
    complexityScore?: number;

    constructor(data?: interfaces.IProjectComplexityDto) {
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

export class ProjectFileDto implements interfaces.IProjectFileDto {
    path?: string | undefined;
    type?: string | undefined;
    size?: number;
    extension?: string | undefined;
    isEntryPoint?: boolean;
    lineCount?: number;

    constructor(data?: interfaces.IProjectFileDto) {
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

export class ProjectSecurityScanDto implements interfaces.IProjectSecurityScanDto {
    hasSecurityIssues?: boolean;
    issues?: SecurityIssueDto[] | undefined;
    riskLevel?: number;

    constructor(data?: interfaces.IProjectSecurityScanDto) {
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

export class ProjectStructureAnalysisDto implements interfaces.IProjectStructureAnalysisDto {
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

    constructor(data?: interfaces.IProjectStructureAnalysisDto) {
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

export class ProjectStructureAnalysisDtoApiResponse implements interfaces.IProjectStructureAnalysisDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProjectStructureAnalysisDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IProjectStructureAnalysisDtoApiResponse) {
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

export class ProjectValidationResultDto implements interfaces.IProjectValidationResultDto {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    suggestions?: string[] | undefined;
    securityScan?: ProjectSecurityScanDto;
    complexity?: ProjectComplexityDto;

    constructor(data?: interfaces.IProjectValidationResultDto) {
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

export class ProjectValidationResultDtoApiResponse implements interfaces.IProjectValidationResultDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: ProjectValidationResultDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IProjectValidationResultDtoApiResponse) {
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

export class RefreshTokenDto implements interfaces.IRefreshTokenDto {
    accessToken!: string;
    refreshToken!: string;

    constructor(data?: interfaces.IRefreshTokenDto) {
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

export class RegionCityUpdateDto implements interfaces.IRegionCityUpdateDto {
    action!: enums.Operation;
    cities!: string[];

    constructor(data?: interfaces.IRegionCityUpdateDto) {
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

export class RegionCreateDto implements interfaces.IRegionCreateDto {
    clientId!: string;
    regionId!: number;
    cities!: string[];
    headquarters!: string;

    constructor(data?: interfaces.IRegionCreateDto) {
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

export class RegionDetailResponseDto implements interfaces.IRegionDetailResponseDto {
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

    constructor(data?: interfaces.IRegionDetailResponseDto) {
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

export class RegionDetailResponseDtoApiResponse implements interfaces.IRegionDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RegionDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRegionDetailResponseDtoApiResponse) {
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

export class RegionListResponseDto implements interfaces.IRegionListResponseDto {
    id?: string | undefined;
    regionId?: number;
    clientName?: string | undefined;
    headquarters?: string | undefined;
    cities?: string[] | undefined;
    tmCount?: number;
    activeTMCount?: number;

    constructor(data?: interfaces.IRegionListResponseDto) {
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

export class RegionListResponseDtoPagedResponse implements interfaces.IRegionListResponseDtoPagedResponse {
    items?: RegionListResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;

    constructor(data?: interfaces.IRegionListResponseDtoPagedResponse) {
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

export class RegionListResponseDtoPagedResponseApiResponse implements interfaces.IRegionListResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RegionListResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRegionListResponseDtoPagedResponseApiResponse) {
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

export class RegionResponseDto implements interfaces.IRegionResponseDto {
    id?: string | undefined;
    clientId?: string | undefined;
    regionId?: number;
    cities?: string[] | undefined;
    headquarters?: string | undefined;

    constructor(data?: interfaces.IRegionResponseDto) {
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

export class RegionResponseDtoApiResponse implements interfaces.IRegionResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RegionResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRegionResponseDtoApiResponse) {
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

export class RegionStatisticsResponseDto implements interfaces.IRegionStatisticsResponseDto {
    regionId?: string | undefined;
    cityCount?: number;
    tmCount?: number;
    activeTMCount?: number;
    buildingCount?: number;
    tMsPerCity?: { [key: string]: number; } | undefined;

    constructor(data?: interfaces.IRegionStatisticsResponseDto) {
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

export class RegionStatisticsResponseDtoApiResponse implements interfaces.IRegionStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RegionStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRegionStatisticsResponseDtoApiResponse) {
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

export class RegionSummaryResponseDto implements interfaces.IRegionSummaryResponseDto {
    id?: string | undefined;
    regionId?: number;
    headquarters?: string | undefined;
    cityCount?: number;

    constructor(data?: interfaces.IRegionSummaryResponseDto) {
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

export class RegionSummaryResponseDtoListApiResponse implements interfaces.IRegionSummaryResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RegionSummaryResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRegionSummaryResponseDtoListApiResponse) {
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

export class RegionUpdateDto implements interfaces.IRegionUpdateDto {
    clientId?: string | undefined;
    id?: number | undefined;
    cities?: string[] | undefined;
    headquarters?: string | undefined;

    constructor(data?: interfaces.IRegionUpdateDto) {
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

export class RequestAssignmentDto implements interfaces.IRequestAssignmentDto {
    assignedTo!: string;
    assignmentNotes?: string | undefined;

    constructor(data?: interfaces.IRequestAssignmentDto) {
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

export class RequestCompletionDto implements interfaces.IRequestCompletionDto {
    completionNotes!: string;
    deliverableLinks?: string[] | undefined;
    completionData?: any | undefined;

    constructor(data?: interfaces.IRequestCompletionDto) {
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

export class RequestCreateDto implements interfaces.IRequestCreateDto {
    type!: string;
    title!: string;
    description!: string;
    requestedBy?: string | undefined;
    programId?: string | undefined;
    relatedEntityId?: string | undefined;
    relatedEntityType?: string | undefined;
    priority?: string | undefined;
    metadata?: any | undefined;

    constructor(data?: interfaces.IRequestCreateDto) {
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

export class RequestDetailDto implements interfaces.IRequestDetailDto {
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

    constructor(data?: interfaces.IRequestDetailDto) {
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

export class RequestDetailDtoApiResponse implements interfaces.IRequestDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestDetailDtoApiResponse) {
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

export class RequestDto implements interfaces.IRequestDto {
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

    constructor(data?: interfaces.IRequestDto) {
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

export class RequestDtoApiResponse implements interfaces.IRequestDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestDtoApiResponse) {
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

export class RequestFromTemplateDto implements interfaces.IRequestFromTemplateDto {
    fieldValues!: { [key: string]: any; };
    programId?: string | undefined;
    relatedEntityId?: string | undefined;
    relatedEntityType?: string | undefined;

    constructor(data?: interfaces.IRequestFromTemplateDto) {
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

export class RequestListDto implements interfaces.IRequestListDto {
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

    constructor(data?: interfaces.IRequestListDto) {
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

export class RequestListDtoListApiResponse implements interfaces.IRequestListDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestListDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestListDtoListApiResponse) {
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

export class RequestListDtoPagedResponse implements interfaces.IRequestListDtoPagedResponse {
    items?: RequestListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;

    constructor(data?: interfaces.IRequestListDtoPagedResponse) {
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

export class RequestListDtoPagedResponseApiResponse implements interfaces.IRequestListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestListDtoPagedResponseApiResponse) {
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

export class RequestMetricDto implements interfaces.IRequestMetricDto {
    category?: string | undefined;
    label?: string | undefined;
    count?: number;
    percentage?: number;

    constructor(data?: interfaces.IRequestMetricDto) {
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

export class RequestMetricDtoListApiResponse implements interfaces.IRequestMetricDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestMetricDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestMetricDtoListApiResponse) {
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

export class RequestPerformanceDto implements interfaces.IRequestPerformanceDto {
    userId?: string | undefined;
    userName?: string | undefined;
    assignedCount?: number;
    completedCount?: number;
    completionRate?: number;
    averageResolutionTime?: number;
    rating?: number;

    constructor(data?: interfaces.IRequestPerformanceDto) {
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

export class RequestPerformanceDtoListApiResponse implements interfaces.IRequestPerformanceDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestPerformanceDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestPerformanceDtoListApiResponse) {
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

export class RequestPriorityUpdateDto implements interfaces.IRequestPriorityUpdateDto {
    priority!: string;
    reason?: string | undefined;

    constructor(data?: interfaces.IRequestPriorityUpdateDto) {
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

export class RequestRejectionDto implements interfaces.IRequestRejectionDto {
    rejectionReason!: string;
    alternativeSuggestions?: string[] | undefined;

    constructor(data?: interfaces.IRequestRejectionDto) {
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

export class RequestRelatedEntityDto implements interfaces.IRequestRelatedEntityDto {
    entityType?: string | undefined;
    entityId?: string | undefined;
    entityName?: string | undefined;
    linkDescription?: string | undefined;

    constructor(data?: interfaces.IRequestRelatedEntityDto) {
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

export class RequestResponseCreateDto implements interfaces.IRequestResponseCreateDto {
    message!: string;
    isInternal?: boolean;
    attachments?: string[] | undefined;

    constructor(data?: interfaces.IRequestResponseCreateDto) {
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

export class RequestResponseDto implements interfaces.IRequestResponseDto {
    id?: string | undefined;
    requestId?: string | undefined;
    respondedBy?: string | undefined;
    respondedByName?: string | undefined;
    respondedAt?: Date;
    message?: string | undefined;
    isInternal?: boolean;
    attachments?: string[] | undefined;

    constructor(data?: interfaces.IRequestResponseDto) {
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

export class RequestResponseDtoApiResponse implements interfaces.IRequestResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestResponseDtoApiResponse) {
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

export class RequestResponseDtoListApiResponse implements interfaces.IRequestResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestResponseDtoListApiResponse) {
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

export class RequestResponseUpdateDto implements interfaces.IRequestResponseUpdateDto {
    message!: string;
    isInternal?: boolean | undefined;
    attachments?: string[] | undefined;

    constructor(data?: interfaces.IRequestResponseUpdateDto) {
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

export class RequestSearchDto implements interfaces.IRequestSearchDto {
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

    constructor(data?: interfaces.IRequestSearchDto) {
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

export class RequestStatsDto implements interfaces.IRequestStatsDto {
    totalRequests?: number;
    openRequests?: number;
    inProgressRequests?: number;
    completedRequests?: number;
    rejectedRequests?: number;
    unassignedRequests?: number;
    averageResolutionTime?: number;
    requestsByType?: { [key: string]: number; } | undefined;
    requestsByPriority?: { [key: string]: number; } | undefined;

    constructor(data?: interfaces.IRequestStatsDto) {
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

export class RequestStatsDtoApiResponse implements interfaces.IRequestStatsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestStatsDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestStatsDtoApiResponse) {
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

export class RequestStatusUpdateDto implements interfaces.IRequestStatusUpdateDto {
    status!: string;
    reason?: string | undefined;

    constructor(data?: interfaces.IRequestStatusUpdateDto) {
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

export class RequestTemplateCreateDto implements interfaces.IRequestTemplateCreateDto {
    name!: string;
    description?: string | undefined;
    type!: string;
    titleTemplate!: string;
    descriptionTemplate!: string;
    fieldDefinitions?: any | undefined;
    priority?: string | undefined;
    isActive?: boolean;

    constructor(data?: interfaces.IRequestTemplateCreateDto) {
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

export class RequestTemplateDto implements interfaces.IRequestTemplateDto {
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

    constructor(data?: interfaces.IRequestTemplateDto) {
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

export class RequestTemplateDtoApiResponse implements interfaces.IRequestTemplateDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestTemplateDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestTemplateDtoApiResponse) {
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

export class RequestTemplateDtoListApiResponse implements interfaces.IRequestTemplateDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestTemplateDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestTemplateDtoListApiResponse) {
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

export class RequestTimelineDto implements interfaces.IRequestTimelineDto {
    createdAt?: Date;
    assignedAt?: Date | undefined;
    firstResponseAt?: Date | undefined;
    completedAt?: Date | undefined;
    resolutionTime?: string | undefined;
    events?: RequestTimelineEventDto[] | undefined;

    constructor(data?: interfaces.IRequestTimelineDto) {
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

export class RequestTimelineEventDto implements interfaces.IRequestTimelineEventDto {
    timestamp?: Date;
    eventType?: string | undefined;
    description?: string | undefined;
    userId?: string | undefined;
    userName?: string | undefined;

    constructor(data?: interfaces.IRequestTimelineEventDto) {
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

export class RequestTrendDto implements interfaces.IRequestTrendDto {
    date?: Date;
    createdCount?: number;
    completedCount?: number;
    totalOpen?: number;

    constructor(data?: interfaces.IRequestTrendDto) {
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

export class RequestTrendDtoListApiResponse implements interfaces.IRequestTrendDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestTrendDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestTrendDtoListApiResponse) {
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

export class RequestUpdateDto implements interfaces.IRequestUpdateDto {
    programId?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    priority?: string | undefined;
    metadata?: any | undefined;

    constructor(data?: interfaces.IRequestUpdateDto) {
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

export class RequestValidationResult implements interfaces.IRequestValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    suggestions?: RequestValidationSuggestionDto[] | undefined;

    constructor(data?: interfaces.IRequestValidationResult) {
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

export class RequestValidationResultApiResponse implements interfaces.IRequestValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: RequestValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IRequestValidationResultApiResponse) {
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

export class RequestValidationSuggestionDto implements interfaces.IRequestValidationSuggestionDto {
    field?: string | undefined;
    message?: string | undefined;
    suggestedValue?: string | undefined;

    constructor(data?: interfaces.IRequestValidationSuggestionDto) {
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

export class RevokeTokenDto implements interfaces.IRevokeTokenDto {
    token!: string | undefined;

    constructor(data?: interfaces.IRevokeTokenDto) {
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

export class RockFallHazardDto implements interfaces.IRockFallHazardDto {
    score?: number;
    level?: enums.Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;

    constructor(data?: interfaces.IRockFallHazardDto) {
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

export class RockFallHazardResponseDto implements interfaces.IRockFallHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;

    constructor(data?: interfaces.IRockFallHazardResponseDto) {
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

export class RollbackRequestDto implements interfaces.IRollbackRequestDto {
    targetVersion!: string;
    reason?: string | undefined;
    forceRollback?: boolean;

    constructor(data?: interfaces.IRollbackRequestDto) {
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

export class SecurityHazardDto implements interfaces.ISecurityHazardDto {
    score?: number;
    level?: enums.Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;
    hasSecuritySystem?: boolean;
    securitySystemScore?: number;
    egmRiskLevel?: number;
    egmRiskLevelScore?: number;
    perimeterFenceType?: enums.PerimeterWallType;
    perimeterWallTypeScore?: number;
    wallCondition?: enums.WallCondition;
    wallConditionScore?: number;
    hasCCTV?: boolean;
    cctvConditionScore?: number;
    iemDistance?: number;
    iemDistanceScore?: number;

    constructor(data?: interfaces.ISecurityHazardDto) {
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

export class SecurityHazardResponseDto implements interfaces.ISecurityHazardResponseDto {
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

    constructor(data?: interfaces.ISecurityHazardResponseDto) {
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

export class SecurityIssueDto implements interfaces.ISecurityIssueDto {
    type?: string | undefined;
    description?: string | undefined;
    file?: string | undefined;
    line?: number;
    severity?: string | undefined;

    constructor(data?: interfaces.ISecurityIssueDto) {
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

export class SoilDto implements interfaces.ISoilDto {
    hasSoilStudyReport?: boolean;
    soilStudyReportDate?: Date | undefined;
    soilClassDataSource?: string | undefined;
    geotechnicalReport?: string | undefined;
    results?: string | undefined;
    drillHoleCount?: number;
    soilClassTDY2007?: enums.TDY2007SoilClass;
    soilClassTBDY2018?: enums.TBDY2018SoilClass;
    finalDecisionOnOldData?: enums.TBDY2018SoilClass;
    notes?: string | undefined;
    newSoilClassDataReport?: string | undefined;
    newLiquefactionRiskDataReport?: string | undefined;
    geotechnicalReportMTV?: string | undefined;
    liquefactionRiskGeotechnicalReport?: string | undefined;
    distanceToActiveFaultKm?: number;
    finalSoilClassification?: enums.TBDY2018SoilClass;
    soilVS30?: number;
    structureType?: string | undefined;
    vass?: string | undefined;
    liquefactionRisk?: boolean;

    constructor(data?: interfaces.ISoilDto) {
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

export class SoilResponseDto implements interfaces.ISoilResponseDto {
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

    constructor(data?: interfaces.ISoilResponseDto) {
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

export class StaticSiteDeploymentRequestDto implements interfaces.IStaticSiteDeploymentRequestDto {
    deploymentType?: enums.AppDeploymentType;
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

    constructor(data?: interfaces.IStaticSiteDeploymentRequestDto) {
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

export class StorageStatistics implements interfaces.IStorageStatistics {
    programId?: string | undefined;
    totalFiles?: number;
    totalSize?: number;
    versionCount?: number;
    lastModified?: Date;
    fileTypeCount?: { [key: string]: number; } | undefined;
    fileTypeSizes?: { [key: string]: number; } | undefined;

    constructor(data?: interfaces.IStorageStatistics) {
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

export class StorageStatisticsApiResponse implements interfaces.IStorageStatisticsApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: StorageStatistics;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IStorageStatisticsApiResponse) {
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

export class StringApiResponse implements interfaces.IStringApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: string | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IStringApiResponse) {
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

export class StringListApiResponse implements interfaces.IStringListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: string[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IStringListApiResponse) {
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

export class StringStringDictionaryApiResponse implements interfaces.IStringStringDictionaryApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: { [key: string]: string; } | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IStringStringDictionaryApiResponse) {
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

export class StringStringListDictionaryApiResponse implements interfaces.IStringStringListDictionaryApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: { [key: string]: string[]; } | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IStringStringListDictionaryApiResponse) {
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

export class StringWorkflowDataContractDtoDictionaryApiResponse implements interfaces.IStringWorkflowDataContractDtoDictionaryApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: { [key: string]: WorkflowDataContractDto; } | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IStringWorkflowDataContractDtoDictionaryApiResponse) {
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
                        (<any>this.data)![key] = _data["data"][key] ? WorkflowDataContractDto.fromJS(_data["data"][key]) : new WorkflowDataContractDto();
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

    static fromJS(data: any): StringWorkflowDataContractDtoDictionaryApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new StringWorkflowDataContractDtoDictionaryApiResponse();
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
                    (<any>data["data"])[key] = this.data[key] ? this.data[key].toJSON() : <any>undefined;
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

export class SupportedDeploymentOptionDto implements interfaces.ISupportedDeploymentOptionDto {
    deploymentType?: enums.AppDeploymentType;
    name?: string | undefined;
    description?: string | undefined;
    isRecommended?: boolean;
    requiredFeatures?: string[] | undefined;
    supportedFeatures?: string[] | undefined;
    defaultConfiguration?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.ISupportedDeploymentOptionDto) {
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

export class SupportedDeploymentOptionDtoListApiResponse implements interfaces.ISupportedDeploymentOptionDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: SupportedDeploymentOptionDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.ISupportedDeploymentOptionDtoListApiResponse) {
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

export class TMCreateDto implements interfaces.ITMCreateDto {
    regionId!: string;
    tmId!: number;
    name!: string;
    type?: enums.TMType;
    state?: enums.TMState;
    voltages!: number[];
    provisionalAcceptanceDate?: Date | undefined;
    location!: LocationRequestDto;
    address?: AddressDto;

    constructor(data?: interfaces.ITMCreateDto) {
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

export class TMDetailResponseDto implements interfaces.ITMDetailResponseDto {
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

    constructor(data?: interfaces.ITMDetailResponseDto) {
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

export class TMDetailResponseDtoApiResponse implements interfaces.ITMDetailResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: TMDetailResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.ITMDetailResponseDtoApiResponse) {
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

export class TMHazardSummaryResponseDto implements interfaces.ITMHazardSummaryResponseDto {
    tmId?: string | undefined;
    fireHazard?: HazardResponseDto;
    securityHazard?: HazardResponseDto;
    floodHazard?: HazardResponseDto;
    overallRiskScore?: number;

    constructor(data?: interfaces.ITMHazardSummaryResponseDto) {
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

export class TMHazardSummaryResponseDtoApiResponse implements interfaces.ITMHazardSummaryResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: TMHazardSummaryResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.ITMHazardSummaryResponseDtoApiResponse) {
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

export class TMListResponseDto implements interfaces.ITMListResponseDto {
    id?: string | undefined;
    tmId?: number;
    name?: string | undefined;
    regionName?: string | undefined;
    type?: string | undefined;
    state?: string | undefined;
    voltages?: number[] | undefined;
    city?: string | undefined;
    buildingCount?: number;

    constructor(data?: interfaces.ITMListResponseDto) {
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

export class TMListResponseDtoPagedResponse implements interfaces.ITMListResponseDtoPagedResponse {
    items?: TMListResponseDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;

    constructor(data?: interfaces.ITMListResponseDtoPagedResponse) {
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

export class TMListResponseDtoPagedResponseApiResponse implements interfaces.ITMListResponseDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: TMListResponseDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.ITMListResponseDtoPagedResponseApiResponse) {
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

export class TMResponseDto implements interfaces.ITMResponseDto {
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

    constructor(data?: interfaces.ITMResponseDto) {
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

export class TMResponseDtoApiResponse implements interfaces.ITMResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: TMResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.ITMResponseDtoApiResponse) {
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

export class TMSearchDto implements interfaces.ITMSearchDto {
    name?: string | undefined;
    regionId?: string | undefined;
    type?: enums.TMType;
    state?: enums.TMState;
    voltages?: number[] | undefined;
    city?: string | undefined;
    county?: string | undefined;
    maxVoltage?: number | undefined;
    provisionalAcceptanceDateFrom?: Date | undefined;
    provisionalAcceptanceDateTo?: Date | undefined;

    constructor(data?: interfaces.ITMSearchDto) {
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

export class TMStateUpdateDto implements interfaces.ITMStateUpdateDto {
    state!: enums.TMState;

    constructor(data?: interfaces.ITMStateUpdateDto) {
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

export class TMStatisticsResponseDto implements interfaces.ITMStatisticsResponseDto {
    tmId?: string | undefined;
    buildingCount?: number;
    maxVoltage?: number;
    alternativeTMCount?: number;
    overallRiskScore?: number;
    daysSinceAcceptance?: number;

    constructor(data?: interfaces.ITMStatisticsResponseDto) {
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

export class TMStatisticsResponseDtoApiResponse implements interfaces.ITMStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: TMStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.ITMStatisticsResponseDtoApiResponse) {
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

export class TMSummaryResponseDto implements interfaces.ITMSummaryResponseDto {
    id?: string | undefined;
    tmId?: number;
    name?: string | undefined;
    state?: string | undefined;
    maxVoltage?: number;

    constructor(data?: interfaces.ITMSummaryResponseDto) {
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

export class TMUpdateDto implements interfaces.ITMUpdateDto {
    regionId?: string | undefined;
    id?: number | undefined;
    name?: string | undefined;
    type?: enums.TMType;
    state?: enums.TMState;
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

    constructor(data?: interfaces.ITMUpdateDto) {
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

export class TMVoltageUpdateDto implements interfaces.ITMVoltageUpdateDto {
    voltages!: number[];

    constructor(data?: interfaces.ITMVoltageUpdateDto) {
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

export class TokenResponseDto implements interfaces.ITokenResponseDto {
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    expiresAt?: Date;
    tokenType?: string | undefined;

    constructor(data?: interfaces.ITokenResponseDto) {
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

export class TokenResponseDtoApiResponse implements interfaces.ITokenResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: TokenResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.ITokenResponseDtoApiResponse) {
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

export class TsunamiHazardDto implements interfaces.ITsunamiHazardDto {
    score?: number;
    level?: enums.Level;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred!: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory!: number;

    constructor(data?: interfaces.ITsunamiHazardDto) {
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

export class TsunamiHazardResponseDto implements interfaces.ITsunamiHazardResponseDto {
    score?: number;
    level?: string | undefined;
    eliminationCosts?: { [key: string]: number; } | undefined;
    previousIncidentOccurred?: boolean;
    previousIncidentDescription?: string | undefined;
    distanceToInventory?: number;

    constructor(data?: interfaces.ITsunamiHazardResponseDto) {
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

export class UiComponentAssetDto implements interfaces.IUiComponentAssetDto {
    path?: string | undefined;
    contentType?: string | undefined;
    assetType?: string | undefined;
    size?: number;
    lastModified?: Date;
    url?: string | undefined;

    constructor(data?: interfaces.IUiComponentAssetDto) {
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

export class UiComponentAssetDtoListApiResponse implements interfaces.IUiComponentAssetDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentAssetDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUiComponentAssetDtoListApiResponse) {
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

export class UiComponentAssetUploadDto implements interfaces.IUiComponentAssetUploadDto {
    path!: string;
    content!: string;
    contentType!: string;
    assetType?: string | undefined;

    constructor(data?: interfaces.IUiComponentAssetUploadDto) {
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

export class UiComponentBundleDto implements interfaces.IUiComponentBundleDto {
    id?: string | undefined;
    componentId?: string | undefined;
    bundleType?: string | undefined;
    assets?: UiComponentAssetDto[] | undefined;
    dependencies?: { [key: string]: string; } | undefined;
    createdAt?: Date;
    totalSize?: number;

    constructor(data?: interfaces.IUiComponentBundleDto) {
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

export class UiComponentBundleDtoApiResponse implements interfaces.IUiComponentBundleDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentBundleDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUiComponentBundleDtoApiResponse) {
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

export class UiComponentBundleInfoDto implements interfaces.IUiComponentBundleInfoDto {
    bundleType?: string | undefined;
    assetUrls?: string[] | undefined;
    dependencies?: { [key: string]: string; } | undefined;
    lastUpdated?: Date;
    totalSize?: number;

    constructor(data?: interfaces.IUiComponentBundleInfoDto) {
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

export class UiComponentBundleUploadDto implements interfaces.IUiComponentBundleUploadDto {
    assets!: UiComponentAssetUploadDto[];
    dependencies?: { [key: string]: string; } | undefined;
    bundleType?: string | undefined;

    constructor(data?: interfaces.IUiComponentBundleUploadDto) {
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

export class UiComponentCategoryDto implements interfaces.IUiComponentCategoryDto {
    name?: string | undefined;
    description?: string | undefined;
    componentCount?: number;
    subCategories?: string[] | undefined;

    constructor(data?: interfaces.IUiComponentCategoryDto) {
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

export class UiComponentCategoryDtoListApiResponse implements interfaces.IUiComponentCategoryDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentCategoryDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUiComponentCategoryDtoListApiResponse) {
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

export class UiComponentCompatibilitySearchDto implements interfaces.IUiComponentCompatibilitySearchDto {
    programType!: string;
    programLanguage?: string | undefined;
    requiredFeatures?: string[] | undefined;
    compatibleTypes?: string[] | undefined;

    constructor(data?: interfaces.IUiComponentCompatibilitySearchDto) {
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

export class UiComponentConfigDto implements interfaces.IUiComponentConfigDto {
    componentId?: string | undefined;
    configuration?: { [key: string]: any; } | undefined;
    lastUpdated?: Date;
    updatedBy?: string | undefined;

    constructor(data?: interfaces.IUiComponentConfigDto) {
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
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
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
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        data["lastUpdated"] = this.lastUpdated ? this.lastUpdated.toISOString() : <any>undefined;
        data["updatedBy"] = this.updatedBy;
        return data;
    }
}

export class UiComponentConfigDtoApiResponse implements interfaces.IUiComponentConfigDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentConfigDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUiComponentConfigDtoApiResponse) {
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

export class UiComponentConfigUpdateDto implements interfaces.IUiComponentConfigUpdateDto {
    configuration!: string;

    constructor(data?: interfaces.IUiComponentConfigUpdateDto) {
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

export class UiComponentCreateDto implements interfaces.IUiComponentCreateDto {
    name!: string;
    description?: string | undefined;
    type!: string;
    configuration?: string | undefined;
    schema?: string | undefined;
    tags?: string[] | undefined;

    constructor(data?: interfaces.IUiComponentCreateDto) {
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

export class UiComponentDetailDto implements interfaces.IUiComponentDetailDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    creator?: string | undefined;
    createdAt?: Date;
    programId?: string | undefined;
    versionId?: string | undefined;
    configuration?: { [key: string]: any; } | undefined;
    schema?: { [key: string]: any; } | undefined;
    status?: string | undefined;
    tags?: string[] | undefined;
    creatorName?: string | undefined;
    programName?: string | undefined;
    versionNumber?: number | undefined;
    assets?: UiComponentAssetDto[] | undefined;
    bundleInfo?: UiComponentBundleInfoDto;
    stats?: UiComponentStatsDto;
    usage?: UiComponentUsageDto[] | undefined;

    constructor(data?: interfaces.IUiComponentDetailDto) {
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
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
            if (_data["schema"]) {
                this.schema = {} as any;
                for (let key in _data["schema"]) {
                    if (_data["schema"].hasOwnProperty(key))
                        (<any>this.schema)![key] = _data["schema"][key];
                }
            }
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
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        if (this.schema) {
            data["schema"] = {};
            for (let key in this.schema) {
                if (this.schema.hasOwnProperty(key))
                    (<any>data["schema"])[key] = (<any>this.schema)[key];
            }
        }
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

export class UiComponentDetailDtoApiResponse implements interfaces.IUiComponentDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUiComponentDetailDtoApiResponse) {
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

export class UiComponentDto implements interfaces.IUiComponentDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    creator?: string | undefined;
    createdAt?: Date;
    programId?: string | undefined;
    versionId?: string | undefined;
    configuration?: { [key: string]: any; } | undefined;
    schema?: { [key: string]: any; } | undefined;
    status?: string | undefined;
    tags?: string[] | undefined;

    constructor(data?: interfaces.IUiComponentDto) {
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
            if (_data["configuration"]) {
                this.configuration = {} as any;
                for (let key in _data["configuration"]) {
                    if (_data["configuration"].hasOwnProperty(key))
                        (<any>this.configuration)![key] = _data["configuration"][key];
                }
            }
            if (_data["schema"]) {
                this.schema = {} as any;
                for (let key in _data["schema"]) {
                    if (_data["schema"].hasOwnProperty(key))
                        (<any>this.schema)![key] = _data["schema"][key];
                }
            }
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
        if (this.configuration) {
            data["configuration"] = {};
            for (let key in this.configuration) {
                if (this.configuration.hasOwnProperty(key))
                    (<any>data["configuration"])[key] = (<any>this.configuration)[key];
            }
        }
        if (this.schema) {
            data["schema"] = {};
            for (let key in this.schema) {
                if (this.schema.hasOwnProperty(key))
                    (<any>data["schema"])[key] = (<any>this.schema)[key];
            }
        }
        data["status"] = this.status;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        return data;
    }
}

export class UiComponentDtoApiResponse implements interfaces.IUiComponentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUiComponentDtoApiResponse) {
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

export class UiComponentListDto implements interfaces.IUiComponentListDto {
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

    constructor(data?: interfaces.IUiComponentListDto) {
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

export class UiComponentListDtoListApiResponse implements interfaces.IUiComponentListDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentListDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUiComponentListDtoListApiResponse) {
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

export class UiComponentListDtoPagedResponse implements interfaces.IUiComponentListDtoPagedResponse {
    items?: UiComponentListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;

    constructor(data?: interfaces.IUiComponentListDtoPagedResponse) {
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

export class UiComponentListDtoPagedResponseApiResponse implements interfaces.IUiComponentListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUiComponentListDtoPagedResponseApiResponse) {
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

export class UiComponentMappingDto implements interfaces.IUiComponentMappingDto {
    componentId!: string;
    mappingName!: string;
    mappingConfiguration?: any | undefined;
    displayOrder?: number;
    isActive?: boolean;

    constructor(data?: interfaces.IUiComponentMappingDto) {
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

export class UiComponentRecommendationDto implements interfaces.IUiComponentRecommendationDto {
    componentId?: string | undefined;
    componentName?: string | undefined;
    componentType?: string | undefined;
    programId?: string | undefined;
    versionId?: string | undefined;
    recommendationReason?: string | undefined;
    compatibilityScore?: number;
    usageCount?: number;
    rating?: number;

    constructor(data?: interfaces.IUiComponentRecommendationDto) {
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

export class UiComponentRecommendationDtoListApiResponse implements interfaces.IUiComponentRecommendationDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentRecommendationDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUiComponentRecommendationDtoListApiResponse) {
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

export class UiComponentSchemaDto implements interfaces.IUiComponentSchemaDto {
    componentId?: string | undefined;
    schema?: { [key: string]: any; } | undefined;
    lastUpdated?: Date;
    updatedBy?: string | undefined;
    isValid?: boolean;

    constructor(data?: interfaces.IUiComponentSchemaDto) {
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
            if (_data["schema"]) {
                this.schema = {} as any;
                for (let key in _data["schema"]) {
                    if (_data["schema"].hasOwnProperty(key))
                        (<any>this.schema)![key] = _data["schema"][key];
                }
            }
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
        if (this.schema) {
            data["schema"] = {};
            for (let key in this.schema) {
                if (this.schema.hasOwnProperty(key))
                    (<any>data["schema"])[key] = (<any>this.schema)[key];
            }
        }
        data["lastUpdated"] = this.lastUpdated ? this.lastUpdated.toISOString() : <any>undefined;
        data["updatedBy"] = this.updatedBy;
        data["isValid"] = this.isValid;
        return data;
    }
}

export class UiComponentSchemaDtoApiResponse implements interfaces.IUiComponentSchemaDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentSchemaDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUiComponentSchemaDtoApiResponse) {
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

export class UiComponentSchemaUpdateDto implements interfaces.IUiComponentSchemaUpdateDto {
    schema!: string;

    constructor(data?: interfaces.IUiComponentSchemaUpdateDto) {
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

export class UiComponentSearchDto implements interfaces.IUiComponentSearchDto {
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

    constructor(data?: interfaces.IUiComponentSearchDto) {
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

export class UiComponentStatsDto implements interfaces.IUiComponentStatsDto {
    totalUsage?: number;
    activeUsage?: number;
    lastUsed?: Date | undefined;
    averageRating?: number;
    ratingCount?: number;
    totalDownloads?: number;

    constructor(data?: interfaces.IUiComponentStatsDto) {
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

export class UiComponentUpdateDto implements interfaces.IUiComponentUpdateDto {
    name?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    configuration?: string | undefined;
    schema?: string | undefined;
    tags?: string[] | undefined;

    constructor(data?: interfaces.IUiComponentUpdateDto) {
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

export class UiComponentUsageDto implements interfaces.IUiComponentUsageDto {
    programId?: string | undefined;
    programName?: string | undefined;
    versionId?: string | undefined;
    versionNumber?: number | undefined;
    mappingName?: string | undefined;
    usedSince?: Date;
    isActive?: boolean;
    displayOrder?: number;

    constructor(data?: interfaces.IUiComponentUsageDto) {
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

export class UiComponentUsageDtoListApiResponse implements interfaces.IUiComponentUsageDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentUsageDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUiComponentUsageDtoListApiResponse) {
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

export class UiComponentValidationResult implements interfaces.IUiComponentValidationResult {
    isValid?: boolean;
    errors?: string[] | undefined;
    warnings?: string[] | undefined;
    suggestions?: UiComponentValidationSuggestionDto[] | undefined;

    constructor(data?: interfaces.IUiComponentValidationResult) {
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

export class UiComponentValidationResultApiResponse implements interfaces.IUiComponentValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UiComponentValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUiComponentValidationResultApiResponse) {
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

export class UiComponentValidationSuggestionDto implements interfaces.IUiComponentValidationSuggestionDto {
    type?: string | undefined;
    message?: string | undefined;
    suggestedValue?: string | undefined;

    constructor(data?: interfaces.IUiComponentValidationSuggestionDto) {
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

export class UserDetailDto implements interfaces.IUserDetailDto {
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

    constructor(data?: interfaces.IUserDetailDto) {
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

export class UserDetailDtoApiResponse implements interfaces.IUserDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UserDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUserDetailDtoApiResponse) {
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

export class UserDto implements interfaces.IUserDto {
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

    constructor(data?: interfaces.IUserDto) {
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

export class UserDtoApiResponse implements interfaces.IUserDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UserDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUserDtoApiResponse) {
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

export class UserListDto implements interfaces.IUserListDto {
    id?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;
    fullName?: string | undefined;
    roles?: string[] | undefined;
    isActive?: boolean;
    lastLoginDate?: Date | undefined;

    constructor(data?: interfaces.IUserListDto) {
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

export class UserListDtoPagedResponse implements interfaces.IUserListDtoPagedResponse {
    items?: UserListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;

    constructor(data?: interfaces.IUserListDtoPagedResponse) {
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

export class UserListDtoPagedResponseApiResponse implements interfaces.IUserListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UserListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUserListDtoPagedResponseApiResponse) {
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

export class UserLoginDto implements interfaces.IUserLoginDto {
    usernameOrEmail!: string;
    password!: string;
    rememberMe?: boolean;

    constructor(data?: interfaces.IUserLoginDto) {
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

export class UserPasswordChangeDto implements interfaces.IUserPasswordChangeDto {
    currentPassword!: string;
    newPassword!: string;
    confirmNewPassword!: string;

    constructor(data?: interfaces.IUserPasswordChangeDto) {
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

export class UserPasswordResetDto implements interfaces.IUserPasswordResetDto {
    resetToken!: string;
    newPassword!: string;
    confirmNewPassword!: string;

    constructor(data?: interfaces.IUserPasswordResetDto) {
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

export class UserPasswordResetRequestDto implements interfaces.IUserPasswordResetRequestDto {
    email!: string;

    constructor(data?: interfaces.IUserPasswordResetRequestDto) {
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

export class UserPermissionUpdateDto implements interfaces.IUserPermissionUpdateDto {
    userId!: string;
    permissions!: string[];

    constructor(data?: interfaces.IUserPermissionUpdateDto) {
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

export class UserProfileDto implements interfaces.IUserProfileDto {
    id?: string | undefined;
    username?: string | undefined;
    fullName?: string | undefined;
    roles?: string[] | undefined;
    createdDate?: Date;
    lastLoginDate?: Date | undefined;

    constructor(data?: interfaces.IUserProfileDto) {
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

export class UserProfileDtoApiResponse implements interfaces.IUserProfileDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: UserProfileDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IUserProfileDtoApiResponse) {
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

export class UserRegisterDto implements interfaces.IUserRegisterDto {
    email!: string;
    username!: string;
    password!: string;
    confirmPassword!: string;
    firstName?: string | undefined;
    lastName?: string | undefined;

    constructor(data?: interfaces.IUserRegisterDto) {
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

export class UserRoleUpdateDto implements interfaces.IUserRoleUpdateDto {
    roles!: string[];

    constructor(data?: interfaces.IUserRoleUpdateDto) {
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

export class UserSearchDto implements interfaces.IUserSearchDto {
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

    constructor(data?: interfaces.IUserSearchDto) {
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

export class UserUpdateDto implements interfaces.IUserUpdateDto {
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;

    constructor(data?: interfaces.IUserUpdateDto) {
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

export class VersionActivityDto implements interfaces.IVersionActivityDto {
    date?: Date;
    activity?: string | undefined;
    userId?: string | undefined;
    userName?: string | undefined;
    description?: string | undefined;

    constructor(data?: interfaces.IVersionActivityDto) {
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

export class VersionActivityDtoListApiResponse implements interfaces.IVersionActivityDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionActivityDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IVersionActivityDtoListApiResponse) {
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

export class VersionChangeDto implements interfaces.IVersionChangeDto {
    path?: string | undefined;
    action?: string | undefined;
    description?: string | undefined;
    impactLevel?: number;

    constructor(data?: interfaces.IVersionChangeDto) {
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

export class VersionChangeDtoListApiResponse implements interfaces.IVersionChangeDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionChangeDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IVersionChangeDtoListApiResponse) {
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

export class VersionCommitDto implements interfaces.IVersionCommitDto {
    commitMessage!: string;
    changes!: VersionFileChangeDto[];

    constructor(data?: interfaces.IVersionCommitDto) {
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

export class VersionCommitValidationDto implements interfaces.IVersionCommitValidationDto {
    changes!: VersionFileChangeDto[];

    constructor(data?: interfaces.IVersionCommitValidationDto) {
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

export class VersionCreateDto implements interfaces.IVersionCreateDto {
    programId!: string;
    commitMessage!: string;
    files?: VersionFileCreateDto[] | undefined;

    constructor(data?: interfaces.IVersionCreateDto) {
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

export class VersionDeploymentDto implements interfaces.IVersionDeploymentDto {
    id?: string | undefined;
    versionId?: string | undefined;
    status?: string | undefined;
    deployedAt?: Date;
    deployedBy?: string | undefined;
    targetEnvironments?: string[] | undefined;
    configuration?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IVersionDeploymentDto) {
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

export class VersionDeploymentDtoApiResponse implements interfaces.IVersionDeploymentDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionDeploymentDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IVersionDeploymentDtoApiResponse) {
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

export class VersionDeploymentInfoDto implements interfaces.IVersionDeploymentInfoDto {
    isDeployed?: boolean;
    lastDeployment?: Date | undefined;
    deploymentStatus?: string | undefined;
    environments?: string[] | undefined;

    constructor(data?: interfaces.IVersionDeploymentInfoDto) {
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

export class VersionDeploymentRequestDto implements interfaces.IVersionDeploymentRequestDto {
    deploymentConfiguration?: { [key: string]: any; } | undefined;
    targetEnvironments?: string[] | undefined;
    setAsCurrent?: boolean;

    constructor(data?: interfaces.IVersionDeploymentRequestDto) {
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

export class VersionDetailDto implements interfaces.IVersionDetailDto {
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

    constructor(data?: interfaces.IVersionDetailDto) {
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

export class VersionDetailDtoApiResponse implements interfaces.IVersionDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IVersionDetailDtoApiResponse) {
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

export class VersionDiffDto implements interfaces.IVersionDiffDto {
    fromVersionId?: string | undefined;
    toVersionId?: string | undefined;
    fromVersionNumber?: number;
    toVersionNumber?: number;
    changes?: VersionFileChangeSummaryDto[] | undefined;
    stats?: VersionDiffStatsDto;

    constructor(data?: interfaces.IVersionDiffDto) {
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

export class VersionDiffDtoApiResponse implements interfaces.IVersionDiffDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionDiffDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IVersionDiffDtoApiResponse) {
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

export class VersionDiffStatsDto implements interfaces.IVersionDiffStatsDto {
    filesChanged?: number;
    filesAdded?: number;
    filesDeleted?: number;
    totalLinesAdded?: number;
    totalLinesRemoved?: number;

    constructor(data?: interfaces.IVersionDiffStatsDto) {
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

export class VersionDto implements interfaces.IVersionDto {
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

    constructor(data?: interfaces.IVersionDto) {
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

export class VersionDtoApiResponse implements interfaces.IVersionDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IVersionDtoApiResponse) {
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

export class VersionExecutionRequestDto implements interfaces.IVersionExecutionRequestDto {
    parameters?: any | undefined;
    environment?: { [key: string]: string; } | undefined;
    resourceLimits?: ExecutionResourceLimitsDto;
    saveResults?: boolean;
    timeoutMinutes?: number;

    constructor(data?: interfaces.IVersionExecutionRequestDto) {
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

export class VersionFileChangeDto implements interfaces.IVersionFileChangeDto {
    path!: string;
    action!: string;
    content?: string | undefined;
    contentType?: string | undefined;

    constructor(data?: interfaces.IVersionFileChangeDto) {
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

export class VersionFileChangeSummaryDto implements interfaces.IVersionFileChangeSummaryDto {
    path?: string | undefined;
    action?: string | undefined;
    linesAdded?: number;
    linesRemoved?: number;
    sizeBefore?: number;
    sizeAfter?: number;

    constructor(data?: interfaces.IVersionFileChangeSummaryDto) {
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

export class VersionFileCreateDto implements interfaces.IVersionFileCreateDto {
    path!: string;
    content!: string;
    contentType?: string | undefined;
    fileType?: string | undefined;

    constructor(data?: interfaces.IVersionFileCreateDto) {
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

export class VersionFileDetailDto implements interfaces.IVersionFileDetailDto {
    path?: string | undefined;
    storageKey?: string | undefined;
    hash?: string | undefined;
    size?: number;
    fileType?: string | undefined;
    contentType?: string | undefined;
    content?: string | undefined;
    lastModified?: Date;

    constructor(data?: interfaces.IVersionFileDetailDto) {
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

export class VersionFileDetailDtoApiResponse implements interfaces.IVersionFileDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionFileDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IVersionFileDetailDtoApiResponse) {
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

export class VersionFileDto implements interfaces.IVersionFileDto {
    path?: string | undefined;
    storageKey?: string | undefined;
    hash?: string | undefined;
    size?: number;
    fileType?: string | undefined;
    contentType?: string | undefined;

    constructor(data?: interfaces.IVersionFileDto) {
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

export class VersionFileDtoListApiResponse implements interfaces.IVersionFileDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionFileDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IVersionFileDtoListApiResponse) {
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

export class VersionFileUpdateDto implements interfaces.IVersionFileUpdateDto {
    content!: string;
    contentType?: string | undefined;
    fileType?: string | undefined;

    constructor(data?: interfaces.IVersionFileUpdateDto) {
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

export class VersionListDto implements interfaces.IVersionListDto {
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

    constructor(data?: interfaces.IVersionListDto) {
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

export class VersionListDtoPagedResponse implements interfaces.IVersionListDtoPagedResponse {
    items?: VersionListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;

    constructor(data?: interfaces.IVersionListDtoPagedResponse) {
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

export class VersionListDtoPagedResponseApiResponse implements interfaces.IVersionListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IVersionListDtoPagedResponseApiResponse) {
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

export class VersionReviewDto implements interfaces.IVersionReviewDto {
    id?: string | undefined;
    versionId?: string | undefined;
    status?: string | undefined;
    comments?: string | undefined;
    reviewedBy?: string | undefined;
    reviewedByName?: string | undefined;
    reviewedAt?: Date;

    constructor(data?: interfaces.IVersionReviewDto) {
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

export class VersionReviewDtoApiResponse implements interfaces.IVersionReviewDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionReviewDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IVersionReviewDtoApiResponse) {
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

export class VersionReviewSubmissionDto implements interfaces.IVersionReviewSubmissionDto {
    status!: string;
    comments!: string;

    constructor(data?: interfaces.IVersionReviewSubmissionDto) {
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

export class VersionSearchDto implements interfaces.IVersionSearchDto {
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

    constructor(data?: interfaces.IVersionSearchDto) {
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

export class VersionStatsDto implements interfaces.IVersionStatsDto {
    totalFiles?: number;
    totalSize?: number;
    fileTypeCount?: { [key: string]: number; } | undefined;
    executionCount?: number;
    isCurrentVersion?: boolean;

    constructor(data?: interfaces.IVersionStatsDto) {
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

export class VersionStatsDtoApiResponse implements interfaces.IVersionStatsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: VersionStatsDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IVersionStatsDtoApiResponse) {
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

export class VersionStatusUpdateDto implements interfaces.IVersionStatusUpdateDto {
    status!: string;
    comments?: string | undefined;

    constructor(data?: interfaces.IVersionStatusUpdateDto) {
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

export class VersionUpdateDto implements interfaces.IVersionUpdateDto {
    commitMessage?: string | undefined;
    reviewComments?: string | undefined;

    constructor(data?: interfaces.IVersionUpdateDto) {
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

export class WebAppDeploymentRequestDto implements interfaces.IWebAppDeploymentRequestDto {
    configuration?: { [key: string]: any; } | undefined;
    environment?: { [key: string]: string; } | undefined;
    features?: string[] | undefined;
    autoStart?: boolean;
    port?: number | undefined;
    domainName?: string | undefined;

    constructor(data?: interfaces.IWebAppDeploymentRequestDto) {
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

export class WebAppStatusDto implements interfaces.IWebAppStatusDto {
    status?: string | undefined;
    url?: string | undefined;
    isHealthy?: boolean;
    lastHealthCheck?: Date;
    responseTime?: number;
    errorMessage?: string | undefined;
    metrics?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IWebAppStatusDto) {
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

export class WebAppStatusDtoApiResponse implements interfaces.IWebAppStatusDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WebAppStatusDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWebAppStatusDtoApiResponse) {
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

export class WorkflowCloneDto implements interfaces.IWorkflowCloneDto {
    name!: string;
    description?: string | undefined;
    clonePermissions?: boolean;
    cloneExecutionHistory?: boolean;
    tags?: string[] | undefined;

    constructor(data?: interfaces.IWorkflowCloneDto) {
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
            this.clonePermissions = _data["clonePermissions"];
            this.cloneExecutionHistory = _data["cloneExecutionHistory"];
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
        }
    }

    static fromJS(data: any): WorkflowCloneDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowCloneDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["clonePermissions"] = this.clonePermissions;
        data["cloneExecutionHistory"] = this.cloneExecutionHistory;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        return data;
    }
}

export class WorkflowComplexityMetrics implements interfaces.IWorkflowComplexityMetrics {
    totalNodes?: number;
    totalEdges?: number;
    maxDepth?: number;
    maxWidth?: number;
    cyclomaticComplexity?: number;
    connectivityRatio?: number;
    parallelBranches?: number;
    conditionalNodes?: number;
    loopNodes?: number;
    complexityLevel?: enums.ComplexityLevel;
    additionalMetrics?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IWorkflowComplexityMetrics) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.totalNodes = _data["totalNodes"];
            this.totalEdges = _data["totalEdges"];
            this.maxDepth = _data["maxDepth"];
            this.maxWidth = _data["maxWidth"];
            this.cyclomaticComplexity = _data["cyclomaticComplexity"];
            this.connectivityRatio = _data["connectivityRatio"];
            this.parallelBranches = _data["parallelBranches"];
            this.conditionalNodes = _data["conditionalNodes"];
            this.loopNodes = _data["loopNodes"];
            this.complexityLevel = _data["complexityLevel"];
            if (_data["additionalMetrics"]) {
                this.additionalMetrics = {} as any;
                for (let key in _data["additionalMetrics"]) {
                    if (_data["additionalMetrics"].hasOwnProperty(key))
                        (<any>this.additionalMetrics)![key] = _data["additionalMetrics"][key];
                }
            }
        }
    }

    static fromJS(data: any): WorkflowComplexityMetrics {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowComplexityMetrics();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalNodes"] = this.totalNodes;
        data["totalEdges"] = this.totalEdges;
        data["maxDepth"] = this.maxDepth;
        data["maxWidth"] = this.maxWidth;
        data["cyclomaticComplexity"] = this.cyclomaticComplexity;
        data["connectivityRatio"] = this.connectivityRatio;
        data["parallelBranches"] = this.parallelBranches;
        data["conditionalNodes"] = this.conditionalNodes;
        data["loopNodes"] = this.loopNodes;
        data["complexityLevel"] = this.complexityLevel;
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

export class WorkflowComplexityMetricsApiResponse implements interfaces.IWorkflowComplexityMetricsApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowComplexityMetrics;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowComplexityMetricsApiResponse) {
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
            this.data = _data["data"] ? WorkflowComplexityMetrics.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowComplexityMetricsApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowComplexityMetricsApiResponse();
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

export class WorkflowCreateDto implements interfaces.IWorkflowCreateDto {
    name!: string;
    description?: string | undefined;
    status?: enums.WorkflowStatus;
    nodes?: WorkflowNodeCreateDto[] | undefined;
    edges?: WorkflowEdgeCreateDto[] | undefined;
    settings?: WorkflowSettingsDto;
    permissions?: WorkflowPermissionsDto;
    tags?: string[] | undefined;
    metadata?: { [key: string]: any; } | undefined;
    isTemplate?: boolean;
    templateId?: string | undefined;

    constructor(data?: interfaces.IWorkflowCreateDto) {
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
            this.status = _data["status"];
            if (Array.isArray(_data["nodes"])) {
                this.nodes = [] as any;
                for (let item of _data["nodes"])
                    this.nodes!.push(WorkflowNodeCreateDto.fromJS(item));
            }
            if (Array.isArray(_data["edges"])) {
                this.edges = [] as any;
                for (let item of _data["edges"])
                    this.edges!.push(WorkflowEdgeCreateDto.fromJS(item));
            }
            this.settings = _data["settings"] ? WorkflowSettingsDto.fromJS(_data["settings"]) : <any>undefined;
            this.permissions = _data["permissions"] ? WorkflowPermissionsDto.fromJS(_data["permissions"]) : <any>undefined;
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
            this.isTemplate = _data["isTemplate"];
            this.templateId = _data["templateId"];
        }
    }

    static fromJS(data: any): WorkflowCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowCreateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["status"] = this.status;
        if (Array.isArray(this.nodes)) {
            data["nodes"] = [];
            for (let item of this.nodes)
                data["nodes"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.edges)) {
            data["edges"] = [];
            for (let item of this.edges)
                data["edges"].push(item ? item.toJSON() : <any>undefined);
        }
        data["settings"] = this.settings ? this.settings.toJSON() : <any>undefined;
        data["permissions"] = this.permissions ? this.permissions.toJSON() : <any>undefined;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        if (this.metadata) {
            data["metadata"] = {};
            for (let key in this.metadata) {
                if (this.metadata.hasOwnProperty(key))
                    (<any>data["metadata"])[key] = (<any>this.metadata)[key];
            }
        }
        data["isTemplate"] = this.isTemplate;
        data["templateId"] = this.templateId;
        return data;
    }
}

export class WorkflowDataContractDto implements interfaces.IWorkflowDataContractDto {
    contractId?: string | undefined;
    sourceNodeId?: string | undefined;
    targetNodeId?: string | undefined;
    dataType?: enums.WorkflowDataType;
    data?: { [key: string]: any; } | undefined;
    metadata?: DataContractMetadataDto;
    schema?: { [key: string]: any; } | undefined;
    version?: string | undefined;
    timestamp?: Date;
    expiresAt?: Date | undefined;
    checksum?: string | undefined;
    compression?: enums.CompressionType;
    encryption?: EncryptionInfoDto;
    attachments?: DataAttachmentDto[] | undefined;

    constructor(data?: interfaces.IWorkflowDataContractDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.contractId = _data["contractId"];
            this.sourceNodeId = _data["sourceNodeId"];
            this.targetNodeId = _data["targetNodeId"];
            this.dataType = _data["dataType"];
            if (_data["data"]) {
                this.data = {} as any;
                for (let key in _data["data"]) {
                    if (_data["data"].hasOwnProperty(key))
                        (<any>this.data)![key] = _data["data"][key];
                }
            }
            this.metadata = _data["metadata"] ? DataContractMetadataDto.fromJS(_data["metadata"]) : <any>undefined;
            if (_data["schema"]) {
                this.schema = {} as any;
                for (let key in _data["schema"]) {
                    if (_data["schema"].hasOwnProperty(key))
                        (<any>this.schema)![key] = _data["schema"][key];
                }
            }
            this.version = _data["version"];
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
            this.expiresAt = _data["expiresAt"] ? new Date(_data["expiresAt"].toString()) : <any>undefined;
            this.checksum = _data["checksum"];
            this.compression = _data["compression"];
            this.encryption = _data["encryption"] ? EncryptionInfoDto.fromJS(_data["encryption"]) : <any>undefined;
            if (Array.isArray(_data["attachments"])) {
                this.attachments = [] as any;
                for (let item of _data["attachments"])
                    this.attachments!.push(DataAttachmentDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): WorkflowDataContractDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowDataContractDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["contractId"] = this.contractId;
        data["sourceNodeId"] = this.sourceNodeId;
        data["targetNodeId"] = this.targetNodeId;
        data["dataType"] = this.dataType;
        if (this.data) {
            data["data"] = {};
            for (let key in this.data) {
                if (this.data.hasOwnProperty(key))
                    (<any>data["data"])[key] = (<any>this.data)[key];
            }
        }
        data["metadata"] = this.metadata ? this.metadata.toJSON() : <any>undefined;
        if (this.schema) {
            data["schema"] = {};
            for (let key in this.schema) {
                if (this.schema.hasOwnProperty(key))
                    (<any>data["schema"])[key] = (<any>this.schema)[key];
            }
        }
        data["version"] = this.version;
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        data["expiresAt"] = this.expiresAt ? this.expiresAt.toISOString() : <any>undefined;
        data["checksum"] = this.checksum;
        data["compression"] = this.compression;
        data["encryption"] = this.encryption ? this.encryption.toJSON() : <any>undefined;
        if (Array.isArray(this.attachments)) {
            data["attachments"] = [];
            for (let item of this.attachments)
                data["attachments"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class WorkflowDataContractDtoApiResponse implements interfaces.IWorkflowDataContractDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowDataContractDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowDataContractDtoApiResponse) {
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
            this.data = _data["data"] ? WorkflowDataContractDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowDataContractDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowDataContractDtoApiResponse();
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

export class WorkflowDetailDto implements interfaces.IWorkflowDetailDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    creator?: string | undefined;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    status?: enums.WorkflowStatus;
    version?: number;
    nodes?: WorkflowNodeDto[] | undefined;
    edges?: WorkflowEdgeDto[] | undefined;
    settings?: WorkflowSettingsDto;
    permissions?: WorkflowPermissionDto;
    tags?: string[] | undefined;
    metadata?: { [key: string]: any; } | undefined;
    isTemplate?: boolean;
    templateId?: string | undefined;
    lastExecutionId?: string | undefined;
    executionCount?: number;
    averageExecutionTime?: string | undefined;
    complexityMetrics?: WorkflowComplexityMetrics;
    validationResult?: WorkflowValidationResult;

    constructor(data?: interfaces.IWorkflowDetailDto) {
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
            this.creator = _data["creator"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.updatedAt = _data["updatedAt"] ? new Date(_data["updatedAt"].toString()) : <any>undefined;
            this.status = _data["status"];
            this.version = _data["version"];
            if (Array.isArray(_data["nodes"])) {
                this.nodes = [] as any;
                for (let item of _data["nodes"])
                    this.nodes!.push(WorkflowNodeDto.fromJS(item));
            }
            if (Array.isArray(_data["edges"])) {
                this.edges = [] as any;
                for (let item of _data["edges"])
                    this.edges!.push(WorkflowEdgeDto.fromJS(item));
            }
            this.settings = _data["settings"] ? WorkflowSettingsDto.fromJS(_data["settings"]) : <any>undefined;
            this.permissions = _data["permissions"] ? WorkflowPermissionDto.fromJS(_data["permissions"]) : <any>undefined;
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
            this.isTemplate = _data["isTemplate"];
            this.templateId = _data["templateId"];
            this.lastExecutionId = _data["lastExecutionId"];
            this.executionCount = _data["executionCount"];
            this.averageExecutionTime = _data["averageExecutionTime"];
            this.complexityMetrics = _data["complexityMetrics"] ? WorkflowComplexityMetrics.fromJS(_data["complexityMetrics"]) : <any>undefined;
            this.validationResult = _data["validationResult"] ? WorkflowValidationResult.fromJS(_data["validationResult"]) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowDetailDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["creator"] = this.creator;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["updatedAt"] = this.updatedAt ? this.updatedAt.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["version"] = this.version;
        if (Array.isArray(this.nodes)) {
            data["nodes"] = [];
            for (let item of this.nodes)
                data["nodes"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.edges)) {
            data["edges"] = [];
            for (let item of this.edges)
                data["edges"].push(item ? item.toJSON() : <any>undefined);
        }
        data["settings"] = this.settings ? this.settings.toJSON() : <any>undefined;
        data["permissions"] = this.permissions ? this.permissions.toJSON() : <any>undefined;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        if (this.metadata) {
            data["metadata"] = {};
            for (let key in this.metadata) {
                if (this.metadata.hasOwnProperty(key))
                    (<any>data["metadata"])[key] = (<any>this.metadata)[key];
            }
        }
        data["isTemplate"] = this.isTemplate;
        data["templateId"] = this.templateId;
        data["lastExecutionId"] = this.lastExecutionId;
        data["executionCount"] = this.executionCount;
        data["averageExecutionTime"] = this.averageExecutionTime;
        data["complexityMetrics"] = this.complexityMetrics ? this.complexityMetrics.toJSON() : <any>undefined;
        data["validationResult"] = this.validationResult ? this.validationResult.toJSON() : <any>undefined;
        return data;
    }
}

export class WorkflowDetailDtoApiResponse implements interfaces.IWorkflowDetailDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowDetailDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowDetailDtoApiResponse) {
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
            this.data = _data["data"] ? WorkflowDetailDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowDetailDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowDetailDtoApiResponse();
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

export class WorkflowEdgeCreateDto implements interfaces.IWorkflowEdgeCreateDto {
    id!: string;
    sourceNodeId!: string;
    targetNodeId!: string;
    sourceOutputName?: string | undefined;
    targetInputName?: string | undefined;
    edgeType?: enums.WorkflowEdgeType;
    condition?: EdgeConditionDto;
    transformation?: EdgeTransformationDto;
    uiConfiguration?: EdgeUIConfigurationDto;
    metadata?: { [key: string]: any; } | undefined;
    isDisabled?: boolean;

    constructor(data?: interfaces.IWorkflowEdgeCreateDto) {
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
            this.sourceNodeId = _data["sourceNodeId"];
            this.targetNodeId = _data["targetNodeId"];
            this.sourceOutputName = _data["sourceOutputName"];
            this.targetInputName = _data["targetInputName"];
            this.edgeType = _data["edgeType"];
            this.condition = _data["condition"] ? EdgeConditionDto.fromJS(_data["condition"]) : <any>undefined;
            this.transformation = _data["transformation"] ? EdgeTransformationDto.fromJS(_data["transformation"]) : <any>undefined;
            this.uiConfiguration = _data["uiConfiguration"] ? EdgeUIConfigurationDto.fromJS(_data["uiConfiguration"]) : <any>undefined;
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
            this.isDisabled = _data["isDisabled"];
        }
    }

    static fromJS(data: any): WorkflowEdgeCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowEdgeCreateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["sourceNodeId"] = this.sourceNodeId;
        data["targetNodeId"] = this.targetNodeId;
        data["sourceOutputName"] = this.sourceOutputName;
        data["targetInputName"] = this.targetInputName;
        data["edgeType"] = this.edgeType;
        data["condition"] = this.condition ? this.condition.toJSON() : <any>undefined;
        data["transformation"] = this.transformation ? this.transformation.toJSON() : <any>undefined;
        data["uiConfiguration"] = this.uiConfiguration ? this.uiConfiguration.toJSON() : <any>undefined;
        if (this.metadata) {
            data["metadata"] = {};
            for (let key in this.metadata) {
                if (this.metadata.hasOwnProperty(key))
                    (<any>data["metadata"])[key] = (<any>this.metadata)[key];
            }
        }
        data["isDisabled"] = this.isDisabled;
        return data;
    }
}

export class WorkflowEdgeDto implements interfaces.IWorkflowEdgeDto {
    id?: string | undefined;
    sourceNodeId?: string | undefined;
    targetNodeId?: string | undefined;
    sourceOutputName?: string | undefined;
    targetInputName?: string | undefined;
    edgeType?: enums.WorkflowEdgeType;
    condition?: EdgeConditionDto;
    transformation?: EdgeTransformationDto;
    uiConfiguration?: EdgeUIConfigurationDto;
    metadata?: { [key: string]: any; } | undefined;
    isDisabled?: boolean;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    validationResult?: EdgeValidationResult;

    constructor(data?: interfaces.IWorkflowEdgeDto) {
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
            this.sourceNodeId = _data["sourceNodeId"];
            this.targetNodeId = _data["targetNodeId"];
            this.sourceOutputName = _data["sourceOutputName"];
            this.targetInputName = _data["targetInputName"];
            this.edgeType = _data["edgeType"];
            this.condition = _data["condition"] ? EdgeConditionDto.fromJS(_data["condition"]) : <any>undefined;
            this.transformation = _data["transformation"] ? EdgeTransformationDto.fromJS(_data["transformation"]) : <any>undefined;
            this.uiConfiguration = _data["uiConfiguration"] ? EdgeUIConfigurationDto.fromJS(_data["uiConfiguration"]) : <any>undefined;
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
            this.isDisabled = _data["isDisabled"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.updatedAt = _data["updatedAt"] ? new Date(_data["updatedAt"].toString()) : <any>undefined;
            this.validationResult = _data["validationResult"] ? EdgeValidationResult.fromJS(_data["validationResult"]) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowEdgeDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowEdgeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["sourceNodeId"] = this.sourceNodeId;
        data["targetNodeId"] = this.targetNodeId;
        data["sourceOutputName"] = this.sourceOutputName;
        data["targetInputName"] = this.targetInputName;
        data["edgeType"] = this.edgeType;
        data["condition"] = this.condition ? this.condition.toJSON() : <any>undefined;
        data["transformation"] = this.transformation ? this.transformation.toJSON() : <any>undefined;
        data["uiConfiguration"] = this.uiConfiguration ? this.uiConfiguration.toJSON() : <any>undefined;
        if (this.metadata) {
            data["metadata"] = {};
            for (let key in this.metadata) {
                if (this.metadata.hasOwnProperty(key))
                    (<any>data["metadata"])[key] = (<any>this.metadata)[key];
            }
        }
        data["isDisabled"] = this.isDisabled;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["updatedAt"] = this.updatedAt ? this.updatedAt.toISOString() : <any>undefined;
        data["validationResult"] = this.validationResult ? this.validationResult.toJSON() : <any>undefined;
        return data;
    }
}

export class WorkflowEdgeUpdateDto implements interfaces.IWorkflowEdgeUpdateDto {
    sourceNodeId?: string | undefined;
    targetNodeId?: string | undefined;
    sourceOutputName?: string | undefined;
    targetInputName?: string | undefined;
    edgeType?: enums.WorkflowEdgeType;
    condition?: EdgeConditionDto;
    transformation?: EdgeTransformationDto;
    uiConfiguration?: EdgeUIConfigurationDto;
    metadata?: { [key: string]: any; } | undefined;
    isDisabled?: boolean | undefined;

    constructor(data?: interfaces.IWorkflowEdgeUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.sourceNodeId = _data["sourceNodeId"];
            this.targetNodeId = _data["targetNodeId"];
            this.sourceOutputName = _data["sourceOutputName"];
            this.targetInputName = _data["targetInputName"];
            this.edgeType = _data["edgeType"];
            this.condition = _data["condition"] ? EdgeConditionDto.fromJS(_data["condition"]) : <any>undefined;
            this.transformation = _data["transformation"] ? EdgeTransformationDto.fromJS(_data["transformation"]) : <any>undefined;
            this.uiConfiguration = _data["uiConfiguration"] ? EdgeUIConfigurationDto.fromJS(_data["uiConfiguration"]) : <any>undefined;
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
            this.isDisabled = _data["isDisabled"];
        }
    }

    static fromJS(data: any): WorkflowEdgeUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowEdgeUpdateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sourceNodeId"] = this.sourceNodeId;
        data["targetNodeId"] = this.targetNodeId;
        data["sourceOutputName"] = this.sourceOutputName;
        data["targetInputName"] = this.targetInputName;
        data["edgeType"] = this.edgeType;
        data["condition"] = this.condition ? this.condition.toJSON() : <any>undefined;
        data["transformation"] = this.transformation ? this.transformation.toJSON() : <any>undefined;
        data["uiConfiguration"] = this.uiConfiguration ? this.uiConfiguration.toJSON() : <any>undefined;
        if (this.metadata) {
            data["metadata"] = {};
            for (let key in this.metadata) {
                if (this.metadata.hasOwnProperty(key))
                    (<any>data["metadata"])[key] = (<any>this.metadata)[key];
            }
        }
        data["isDisabled"] = this.isDisabled;
        return data;
    }
}

export class WorkflowExecutionContextDto implements interfaces.IWorkflowExecutionContextDto {
    userInputs?: { [key: string]: any; } | undefined;
    globalVariables?: { [key: string]: any; } | undefined;
    environment?: { [key: string]: string; } | undefined;
    executionMode?: enums.WorkflowExecutionMode;
    debugMode?: boolean;
    saveIntermediateResults?: boolean;
    maxConcurrentNodes?: number;
    timeoutMinutes?: number;

    constructor(data?: interfaces.IWorkflowExecutionContextDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (_data["userInputs"]) {
                this.userInputs = {} as any;
                for (let key in _data["userInputs"]) {
                    if (_data["userInputs"].hasOwnProperty(key))
                        (<any>this.userInputs)![key] = _data["userInputs"][key];
                }
            }
            if (_data["globalVariables"]) {
                this.globalVariables = {} as any;
                for (let key in _data["globalVariables"]) {
                    if (_data["globalVariables"].hasOwnProperty(key))
                        (<any>this.globalVariables)![key] = _data["globalVariables"][key];
                }
            }
            if (_data["environment"]) {
                this.environment = {} as any;
                for (let key in _data["environment"]) {
                    if (_data["environment"].hasOwnProperty(key))
                        (<any>this.environment)![key] = _data["environment"][key];
                }
            }
            this.executionMode = _data["executionMode"];
            this.debugMode = _data["debugMode"];
            this.saveIntermediateResults = _data["saveIntermediateResults"];
            this.maxConcurrentNodes = _data["maxConcurrentNodes"];
            this.timeoutMinutes = _data["timeoutMinutes"];
        }
    }

    static fromJS(data: any): WorkflowExecutionContextDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionContextDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.userInputs) {
            data["userInputs"] = {};
            for (let key in this.userInputs) {
                if (this.userInputs.hasOwnProperty(key))
                    (<any>data["userInputs"])[key] = (<any>this.userInputs)[key];
            }
        }
        if (this.globalVariables) {
            data["globalVariables"] = {};
            for (let key in this.globalVariables) {
                if (this.globalVariables.hasOwnProperty(key))
                    (<any>data["globalVariables"])[key] = (<any>this.globalVariables)[key];
            }
        }
        if (this.environment) {
            data["environment"] = {};
            for (let key in this.environment) {
                if (this.environment.hasOwnProperty(key))
                    (<any>data["environment"])[key] = (<any>this.environment)[key];
            }
        }
        data["executionMode"] = this.executionMode;
        data["debugMode"] = this.debugMode;
        data["saveIntermediateResults"] = this.saveIntermediateResults;
        data["maxConcurrentNodes"] = this.maxConcurrentNodes;
        data["timeoutMinutes"] = this.timeoutMinutes;
        return data;
    }
}

export class WorkflowExecutionLogResponseDto implements interfaces.IWorkflowExecutionLogResponseDto {
    id?: string | undefined;
    executionId?: string | undefined;
    nodeId?: string | undefined;
    level?: string | undefined;
    message?: string | undefined;
    timestamp?: Date;
    data?: { [key: string]: any; } | undefined;
    exception?: string | undefined;

    constructor(data?: interfaces.IWorkflowExecutionLogResponseDto) {
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
            this.executionId = _data["executionId"];
            this.nodeId = _data["nodeId"];
            this.level = _data["level"];
            this.message = _data["message"];
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
            if (_data["data"]) {
                this.data = {} as any;
                for (let key in _data["data"]) {
                    if (_data["data"].hasOwnProperty(key))
                        (<any>this.data)![key] = _data["data"][key];
                }
            }
            this.exception = _data["exception"];
        }
    }

    static fromJS(data: any): WorkflowExecutionLogResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionLogResponseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["executionId"] = this.executionId;
        data["nodeId"] = this.nodeId;
        data["level"] = this.level;
        data["message"] = this.message;
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
        if (this.data) {
            data["data"] = {};
            for (let key in this.data) {
                if (this.data.hasOwnProperty(key))
                    (<any>data["data"])[key] = (<any>this.data)[key];
            }
        }
        data["exception"] = this.exception;
        return data;
    }
}

export class WorkflowExecutionLogResponseDtoListApiResponse implements interfaces.IWorkflowExecutionLogResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowExecutionLogResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowExecutionLogResponseDtoListApiResponse) {
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
                    this.data!.push(WorkflowExecutionLogResponseDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowExecutionLogResponseDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionLogResponseDtoListApiResponse();
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

export class WorkflowExecutionOptimizationDto implements interfaces.IWorkflowExecutionOptimizationDto {
    optimizationType?: string | undefined;
    description?: string | undefined;
    recommendation?: string | undefined;
    potentialTimeReduction?: number;
    potentialResourceReduction?: number;
    complexity?: enums.OptimizationComplexity;
    affectedNodes?: string[] | undefined;

    constructor(data?: interfaces.IWorkflowExecutionOptimizationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.optimizationType = _data["optimizationType"];
            this.description = _data["description"];
            this.recommendation = _data["recommendation"];
            this.potentialTimeReduction = _data["potentialTimeReduction"];
            this.potentialResourceReduction = _data["potentialResourceReduction"];
            this.complexity = _data["complexity"];
            if (Array.isArray(_data["affectedNodes"])) {
                this.affectedNodes = [] as any;
                for (let item of _data["affectedNodes"])
                    this.affectedNodes!.push(item);
            }
        }
    }

    static fromJS(data: any): WorkflowExecutionOptimizationDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionOptimizationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["optimizationType"] = this.optimizationType;
        data["description"] = this.description;
        data["recommendation"] = this.recommendation;
        data["potentialTimeReduction"] = this.potentialTimeReduction;
        data["potentialResourceReduction"] = this.potentialResourceReduction;
        data["complexity"] = this.complexity;
        if (Array.isArray(this.affectedNodes)) {
            data["affectedNodes"] = [];
            for (let item of this.affectedNodes)
                data["affectedNodes"].push(item);
        }
        return data;
    }
}

export class WorkflowExecutionOptions implements interfaces.IWorkflowExecutionOptions {
    dryRun?: boolean;
    debugMode?: boolean;
    saveIntermediateResults?: boolean;
    continueOnError?: boolean;
    maxConcurrentNodes?: number;
    timeoutMinutes?: number;
    enableNotifications?: boolean;
    notificationRecipients?: string[] | undefined;
    priority?: enums.ExecutionPriority;
    customOptions?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IWorkflowExecutionOptions) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.dryRun = _data["dryRun"];
            this.debugMode = _data["debugMode"];
            this.saveIntermediateResults = _data["saveIntermediateResults"];
            this.continueOnError = _data["continueOnError"];
            this.maxConcurrentNodes = _data["maxConcurrentNodes"];
            this.timeoutMinutes = _data["timeoutMinutes"];
            this.enableNotifications = _data["enableNotifications"];
            if (Array.isArray(_data["notificationRecipients"])) {
                this.notificationRecipients = [] as any;
                for (let item of _data["notificationRecipients"])
                    this.notificationRecipients!.push(item);
            }
            this.priority = _data["priority"];
            if (_data["customOptions"]) {
                this.customOptions = {} as any;
                for (let key in _data["customOptions"]) {
                    if (_data["customOptions"].hasOwnProperty(key))
                        (<any>this.customOptions)![key] = _data["customOptions"][key];
                }
            }
        }
    }

    static fromJS(data: any): WorkflowExecutionOptions {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionOptions();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["dryRun"] = this.dryRun;
        data["debugMode"] = this.debugMode;
        data["saveIntermediateResults"] = this.saveIntermediateResults;
        data["continueOnError"] = this.continueOnError;
        data["maxConcurrentNodes"] = this.maxConcurrentNodes;
        data["timeoutMinutes"] = this.timeoutMinutes;
        data["enableNotifications"] = this.enableNotifications;
        if (Array.isArray(this.notificationRecipients)) {
            data["notificationRecipients"] = [];
            for (let item of this.notificationRecipients)
                data["notificationRecipients"].push(item);
        }
        data["priority"] = this.priority;
        if (this.customOptions) {
            data["customOptions"] = {};
            for (let key in this.customOptions) {
                if (this.customOptions.hasOwnProperty(key))
                    (<any>data["customOptions"])[key] = (<any>this.customOptions)[key];
            }
        }
        return data;
    }
}

export class WorkflowExecutionPhaseDto implements interfaces.IWorkflowExecutionPhaseDto {
    phaseNumber?: number;
    phaseName?: string | undefined;
    nodeIds?: string[] | undefined;
    nodeNames?: string[] | undefined;
    estimatedDuration?: string;
    canRunInParallel?: boolean;
    dependencies?: string[] | undefined;
    outputs?: string[] | undefined;

    constructor(data?: interfaces.IWorkflowExecutionPhaseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.phaseNumber = _data["phaseNumber"];
            this.phaseName = _data["phaseName"];
            if (Array.isArray(_data["nodeIds"])) {
                this.nodeIds = [] as any;
                for (let item of _data["nodeIds"])
                    this.nodeIds!.push(item);
            }
            if (Array.isArray(_data["nodeNames"])) {
                this.nodeNames = [] as any;
                for (let item of _data["nodeNames"])
                    this.nodeNames!.push(item);
            }
            this.estimatedDuration = _data["estimatedDuration"];
            this.canRunInParallel = _data["canRunInParallel"];
            if (Array.isArray(_data["dependencies"])) {
                this.dependencies = [] as any;
                for (let item of _data["dependencies"])
                    this.dependencies!.push(item);
            }
            if (Array.isArray(_data["outputs"])) {
                this.outputs = [] as any;
                for (let item of _data["outputs"])
                    this.outputs!.push(item);
            }
        }
    }

    static fromJS(data: any): WorkflowExecutionPhaseDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionPhaseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["phaseNumber"] = this.phaseNumber;
        data["phaseName"] = this.phaseName;
        if (Array.isArray(this.nodeIds)) {
            data["nodeIds"] = [];
            for (let item of this.nodeIds)
                data["nodeIds"].push(item);
        }
        if (Array.isArray(this.nodeNames)) {
            data["nodeNames"] = [];
            for (let item of this.nodeNames)
                data["nodeNames"].push(item);
        }
        data["estimatedDuration"] = this.estimatedDuration;
        data["canRunInParallel"] = this.canRunInParallel;
        if (Array.isArray(this.dependencies)) {
            data["dependencies"] = [];
            for (let item of this.dependencies)
                data["dependencies"].push(item);
        }
        if (Array.isArray(this.outputs)) {
            data["outputs"] = [];
            for (let item of this.outputs)
                data["outputs"].push(item);
        }
        return data;
    }
}

export class WorkflowExecutionPlanDto implements interfaces.IWorkflowExecutionPlanDto {
    workflowId?: string | undefined;
    workflowName?: string | undefined;
    executionOrder?: string[] | undefined;
    dependencyGraph?: { [key: string]: string[]; } | undefined;
    executionPhases?: WorkflowExecutionPhaseDto[] | undefined;
    estimatedExecutionTime?: string;
    maxConcurrentNodes?: number;
    potentialRisks?: WorkflowExecutionRiskDto[] | undefined;
    optimizations?: WorkflowExecutionOptimizationDto[] | undefined;
    validationResult?: WorkflowValidationResult;

    constructor(data?: interfaces.IWorkflowExecutionPlanDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.workflowId = _data["workflowId"];
            this.workflowName = _data["workflowName"];
            if (Array.isArray(_data["executionOrder"])) {
                this.executionOrder = [] as any;
                for (let item of _data["executionOrder"])
                    this.executionOrder!.push(item);
            }
            if (_data["dependencyGraph"]) {
                this.dependencyGraph = {} as any;
                for (let key in _data["dependencyGraph"]) {
                    if (_data["dependencyGraph"].hasOwnProperty(key))
                        (<any>this.dependencyGraph)![key] = _data["dependencyGraph"][key] !== undefined ? _data["dependencyGraph"][key] : [];
                }
            }
            if (Array.isArray(_data["executionPhases"])) {
                this.executionPhases = [] as any;
                for (let item of _data["executionPhases"])
                    this.executionPhases!.push(WorkflowExecutionPhaseDto.fromJS(item));
            }
            this.estimatedExecutionTime = _data["estimatedExecutionTime"];
            this.maxConcurrentNodes = _data["maxConcurrentNodes"];
            if (Array.isArray(_data["potentialRisks"])) {
                this.potentialRisks = [] as any;
                for (let item of _data["potentialRisks"])
                    this.potentialRisks!.push(WorkflowExecutionRiskDto.fromJS(item));
            }
            if (Array.isArray(_data["optimizations"])) {
                this.optimizations = [] as any;
                for (let item of _data["optimizations"])
                    this.optimizations!.push(WorkflowExecutionOptimizationDto.fromJS(item));
            }
            this.validationResult = _data["validationResult"] ? WorkflowValidationResult.fromJS(_data["validationResult"]) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowExecutionPlanDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionPlanDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["workflowId"] = this.workflowId;
        data["workflowName"] = this.workflowName;
        if (Array.isArray(this.executionOrder)) {
            data["executionOrder"] = [];
            for (let item of this.executionOrder)
                data["executionOrder"].push(item);
        }
        if (this.dependencyGraph) {
            data["dependencyGraph"] = {};
            for (let key in this.dependencyGraph) {
                if (this.dependencyGraph.hasOwnProperty(key))
                    (<any>data["dependencyGraph"])[key] = (<any>this.dependencyGraph)[key];
            }
        }
        if (Array.isArray(this.executionPhases)) {
            data["executionPhases"] = [];
            for (let item of this.executionPhases)
                data["executionPhases"].push(item ? item.toJSON() : <any>undefined);
        }
        data["estimatedExecutionTime"] = this.estimatedExecutionTime;
        data["maxConcurrentNodes"] = this.maxConcurrentNodes;
        if (Array.isArray(this.potentialRisks)) {
            data["potentialRisks"] = [];
            for (let item of this.potentialRisks)
                data["potentialRisks"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.optimizations)) {
            data["optimizations"] = [];
            for (let item of this.optimizations)
                data["optimizations"].push(item ? item.toJSON() : <any>undefined);
        }
        data["validationResult"] = this.validationResult ? this.validationResult.toJSON() : <any>undefined;
        return data;
    }
}

export class WorkflowExecutionPlanDtoApiResponse implements interfaces.IWorkflowExecutionPlanDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowExecutionPlanDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowExecutionPlanDtoApiResponse) {
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
            this.data = _data["data"] ? WorkflowExecutionPlanDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowExecutionPlanDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionPlanDtoApiResponse();
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

export class WorkflowExecutionProgress implements interfaces.IWorkflowExecutionProgress {
    totalNodes?: number;
    completedNodes?: number;
    failedNodes?: number;
    skippedNodes?: number;
    runningNodes?: number;
    percentComplete?: number;
    currentPhase?: string | undefined;
    estimatedTimeRemaining?: string | undefined;

    constructor(data?: interfaces.IWorkflowExecutionProgress) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.totalNodes = _data["totalNodes"];
            this.completedNodes = _data["completedNodes"];
            this.failedNodes = _data["failedNodes"];
            this.skippedNodes = _data["skippedNodes"];
            this.runningNodes = _data["runningNodes"];
            this.percentComplete = _data["percentComplete"];
            this.currentPhase = _data["currentPhase"];
            this.estimatedTimeRemaining = _data["estimatedTimeRemaining"];
        }
    }

    static fromJS(data: any): WorkflowExecutionProgress {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionProgress();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalNodes"] = this.totalNodes;
        data["completedNodes"] = this.completedNodes;
        data["failedNodes"] = this.failedNodes;
        data["skippedNodes"] = this.skippedNodes;
        data["runningNodes"] = this.runningNodes;
        data["percentComplete"] = this.percentComplete;
        data["currentPhase"] = this.currentPhase;
        data["estimatedTimeRemaining"] = this.estimatedTimeRemaining;
        return data;
    }
}

export class WorkflowExecutionRequest implements interfaces.IWorkflowExecutionRequest {
    workflowId!: string | undefined;
    workflowVersionId?: string | undefined;
    executionName?: string | undefined;
    executionContext?: WorkflowExecutionContextDto;
    options?: WorkflowExecutionOptions;
    metadata?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IWorkflowExecutionRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.workflowId = _data["workflowId"];
            this.workflowVersionId = _data["workflowVersionId"];
            this.executionName = _data["executionName"];
            this.executionContext = _data["executionContext"] ? WorkflowExecutionContextDto.fromJS(_data["executionContext"]) : <any>undefined;
            this.options = _data["options"] ? WorkflowExecutionOptions.fromJS(_data["options"]) : <any>undefined;
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
        }
    }

    static fromJS(data: any): WorkflowExecutionRequest {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["workflowId"] = this.workflowId;
        data["workflowVersionId"] = this.workflowVersionId;
        data["executionName"] = this.executionName;
        data["executionContext"] = this.executionContext ? this.executionContext.toJSON() : <any>undefined;
        data["options"] = this.options ? this.options.toJSON() : <any>undefined;
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

export class WorkflowExecutionResponseDto implements interfaces.IWorkflowExecutionResponseDto {
    id?: string | undefined;
    workflowId?: string | undefined;
    workflowName?: string | undefined;
    workflowVersion?: number;
    executionName?: string | undefined;
    executedBy?: string | undefined;
    executedByUsername?: string | undefined;
    startedAt?: Date;
    completedAt?: Date | undefined;
    duration?: string | undefined;
    status?: enums.WorkflowExecutionStatus;
    progress?: WorkflowExecutionProgress;
    triggerType?: enums.WorkflowTriggerType;
    isRerun?: boolean;
    parentExecutionId?: string | undefined;
    errorMessage?: string | undefined;
    nodeStatuses?: { [key: string]: enums.NodeExecutionStatus; } | undefined;
    metadata?: { [key: string]: any; } | undefined;
    executionContext?: WorkflowExecutionContextDto;

    constructor(data?: interfaces.IWorkflowExecutionResponseDto) {
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
            this.workflowId = _data["workflowId"];
            this.workflowName = _data["workflowName"];
            this.workflowVersion = _data["workflowVersion"];
            this.executionName = _data["executionName"];
            this.executedBy = _data["executedBy"];
            this.executedByUsername = _data["executedByUsername"];
            this.startedAt = _data["startedAt"] ? new Date(_data["startedAt"].toString()) : <any>undefined;
            this.completedAt = _data["completedAt"] ? new Date(_data["completedAt"].toString()) : <any>undefined;
            this.duration = _data["duration"];
            this.status = _data["status"];
            this.progress = _data["progress"] ? WorkflowExecutionProgress.fromJS(_data["progress"]) : <any>undefined;
            this.triggerType = _data["triggerType"];
            this.isRerun = _data["isRerun"];
            this.parentExecutionId = _data["parentExecutionId"];
            this.errorMessage = _data["errorMessage"];
            if (_data["nodeStatuses"]) {
                this.nodeStatuses = {} as any;
                for (let key in _data["nodeStatuses"]) {
                    if (_data["nodeStatuses"].hasOwnProperty(key))
                        (<any>this.nodeStatuses)![key] = _data["nodeStatuses"][key];
                }
            }
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
            this.executionContext = _data["executionContext"] ? WorkflowExecutionContextDto.fromJS(_data["executionContext"]) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowExecutionResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionResponseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["workflowId"] = this.workflowId;
        data["workflowName"] = this.workflowName;
        data["workflowVersion"] = this.workflowVersion;
        data["executionName"] = this.executionName;
        data["executedBy"] = this.executedBy;
        data["executedByUsername"] = this.executedByUsername;
        data["startedAt"] = this.startedAt ? this.startedAt.toISOString() : <any>undefined;
        data["completedAt"] = this.completedAt ? this.completedAt.toISOString() : <any>undefined;
        data["duration"] = this.duration;
        data["status"] = this.status;
        data["progress"] = this.progress ? this.progress.toJSON() : <any>undefined;
        data["triggerType"] = this.triggerType;
        data["isRerun"] = this.isRerun;
        data["parentExecutionId"] = this.parentExecutionId;
        data["errorMessage"] = this.errorMessage;
        if (this.nodeStatuses) {
            data["nodeStatuses"] = {};
            for (let key in this.nodeStatuses) {
                if (this.nodeStatuses.hasOwnProperty(key))
                    (<any>data["nodeStatuses"])[key] = (<any>this.nodeStatuses)[key];
            }
        }
        if (this.metadata) {
            data["metadata"] = {};
            for (let key in this.metadata) {
                if (this.metadata.hasOwnProperty(key))
                    (<any>data["metadata"])[key] = (<any>this.metadata)[key];
            }
        }
        data["executionContext"] = this.executionContext ? this.executionContext.toJSON() : <any>undefined;
        return data;
    }
}

export class WorkflowExecutionResponseDtoApiResponse implements interfaces.IWorkflowExecutionResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowExecutionResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowExecutionResponseDtoApiResponse) {
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
            this.data = _data["data"] ? WorkflowExecutionResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowExecutionResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionResponseDtoApiResponse();
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

export class WorkflowExecutionResponseDtoListApiResponse implements interfaces.IWorkflowExecutionResponseDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowExecutionResponseDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowExecutionResponseDtoListApiResponse) {
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
                    this.data!.push(WorkflowExecutionResponseDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowExecutionResponseDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionResponseDtoListApiResponse();
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

export class WorkflowExecutionRiskDto implements interfaces.IWorkflowExecutionRiskDto {
    riskType?: string | undefined;
    description?: string | undefined;
    level?: enums.RiskLevel;
    nodeId?: string | undefined;
    edgeId?: string | undefined;
    mitigation?: string | undefined;
    impact?: number;
    probability?: number;

    constructor(data?: interfaces.IWorkflowExecutionRiskDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.riskType = _data["riskType"];
            this.description = _data["description"];
            this.level = _data["level"];
            this.nodeId = _data["nodeId"];
            this.edgeId = _data["edgeId"];
            this.mitigation = _data["mitigation"];
            this.impact = _data["impact"];
            this.probability = _data["probability"];
        }
    }

    static fromJS(data: any): WorkflowExecutionRiskDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionRiskDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["riskType"] = this.riskType;
        data["description"] = this.description;
        data["level"] = this.level;
        data["nodeId"] = this.nodeId;
        data["edgeId"] = this.edgeId;
        data["mitigation"] = this.mitigation;
        data["impact"] = this.impact;
        data["probability"] = this.probability;
        return data;
    }
}

export class WorkflowExecutionStatisticsResponseDto implements interfaces.IWorkflowExecutionStatisticsResponseDto {
    totalNodes?: number;
    completedNodes?: number;
    failedNodes?: number;
    skippedNodes?: number;
    pendingNodes?: number;
    runningNodes?: number;
    completionPercentage?: number;
    totalExecutionTime?: string;
    averageNodeExecutionTime?: string;
    statusDistribution?: { [key: string]: number; } | undefined;
    nodeExecutionTimes?: { [key: string]: string; } | undefined;

    constructor(data?: interfaces.IWorkflowExecutionStatisticsResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.totalNodes = _data["totalNodes"];
            this.completedNodes = _data["completedNodes"];
            this.failedNodes = _data["failedNodes"];
            this.skippedNodes = _data["skippedNodes"];
            this.pendingNodes = _data["pendingNodes"];
            this.runningNodes = _data["runningNodes"];
            this.completionPercentage = _data["completionPercentage"];
            this.totalExecutionTime = _data["totalExecutionTime"];
            this.averageNodeExecutionTime = _data["averageNodeExecutionTime"];
            if (_data["statusDistribution"]) {
                this.statusDistribution = {} as any;
                for (let key in _data["statusDistribution"]) {
                    if (_data["statusDistribution"].hasOwnProperty(key))
                        (<any>this.statusDistribution)![key] = _data["statusDistribution"][key];
                }
            }
            if (_data["nodeExecutionTimes"]) {
                this.nodeExecutionTimes = {} as any;
                for (let key in _data["nodeExecutionTimes"]) {
                    if (_data["nodeExecutionTimes"].hasOwnProperty(key))
                        (<any>this.nodeExecutionTimes)![key] = _data["nodeExecutionTimes"][key];
                }
            }
        }
    }

    static fromJS(data: any): WorkflowExecutionStatisticsResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionStatisticsResponseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalNodes"] = this.totalNodes;
        data["completedNodes"] = this.completedNodes;
        data["failedNodes"] = this.failedNodes;
        data["skippedNodes"] = this.skippedNodes;
        data["pendingNodes"] = this.pendingNodes;
        data["runningNodes"] = this.runningNodes;
        data["completionPercentage"] = this.completionPercentage;
        data["totalExecutionTime"] = this.totalExecutionTime;
        data["averageNodeExecutionTime"] = this.averageNodeExecutionTime;
        if (this.statusDistribution) {
            data["statusDistribution"] = {};
            for (let key in this.statusDistribution) {
                if (this.statusDistribution.hasOwnProperty(key))
                    (<any>data["statusDistribution"])[key] = (<any>this.statusDistribution)[key];
            }
        }
        if (this.nodeExecutionTimes) {
            data["nodeExecutionTimes"] = {};
            for (let key in this.nodeExecutionTimes) {
                if (this.nodeExecutionTimes.hasOwnProperty(key))
                    (<any>data["nodeExecutionTimes"])[key] = (<any>this.nodeExecutionTimes)[key];
            }
        }
        return data;
    }
}

export class WorkflowExecutionStatisticsResponseDtoApiResponse implements interfaces.IWorkflowExecutionStatisticsResponseDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowExecutionStatisticsResponseDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowExecutionStatisticsResponseDtoApiResponse) {
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
            this.data = _data["data"] ? WorkflowExecutionStatisticsResponseDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowExecutionStatisticsResponseDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionStatisticsResponseDtoApiResponse();
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

export class WorkflowExecutionSummaryDto implements interfaces.IWorkflowExecutionSummaryDto {
    id?: string | undefined;
    executionName?: string | undefined;
    executedBy?: string | undefined;
    startedAt?: Date;
    completedAt?: Date | undefined;
    duration?: string | undefined;
    status?: enums.WorkflowExecutionStatus;
    progress?: WorkflowExecutionProgress;
    triggerType?: enums.WorkflowTriggerType;
    isRerun?: boolean;
    errorMessage?: string | undefined;
    nodeStatuses?: { [key: string]: enums.NodeExecutionStatus; } | undefined;
    metadata?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IWorkflowExecutionSummaryDto) {
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
            this.executionName = _data["executionName"];
            this.executedBy = _data["executedBy"];
            this.startedAt = _data["startedAt"] ? new Date(_data["startedAt"].toString()) : <any>undefined;
            this.completedAt = _data["completedAt"] ? new Date(_data["completedAt"].toString()) : <any>undefined;
            this.duration = _data["duration"];
            this.status = _data["status"];
            this.progress = _data["progress"] ? WorkflowExecutionProgress.fromJS(_data["progress"]) : <any>undefined;
            this.triggerType = _data["triggerType"];
            this.isRerun = _data["isRerun"];
            this.errorMessage = _data["errorMessage"];
            if (_data["nodeStatuses"]) {
                this.nodeStatuses = {} as any;
                for (let key in _data["nodeStatuses"]) {
                    if (_data["nodeStatuses"].hasOwnProperty(key))
                        (<any>this.nodeStatuses)![key] = _data["nodeStatuses"][key];
                }
            }
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
        }
    }

    static fromJS(data: any): WorkflowExecutionSummaryDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionSummaryDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["executionName"] = this.executionName;
        data["executedBy"] = this.executedBy;
        data["startedAt"] = this.startedAt ? this.startedAt.toISOString() : <any>undefined;
        data["completedAt"] = this.completedAt ? this.completedAt.toISOString() : <any>undefined;
        data["duration"] = this.duration;
        data["status"] = this.status;
        data["progress"] = this.progress ? this.progress.toJSON() : <any>undefined;
        data["triggerType"] = this.triggerType;
        data["isRerun"] = this.isRerun;
        data["errorMessage"] = this.errorMessage;
        if (this.nodeStatuses) {
            data["nodeStatuses"] = {};
            for (let key in this.nodeStatuses) {
                if (this.nodeStatuses.hasOwnProperty(key))
                    (<any>data["nodeStatuses"])[key] = (<any>this.nodeStatuses)[key];
            }
        }
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

export class WorkflowExecutionSummaryDtoListApiResponse implements interfaces.IWorkflowExecutionSummaryDtoListApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowExecutionSummaryDto[] | undefined;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowExecutionSummaryDtoListApiResponse) {
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
                    this.data!.push(WorkflowExecutionSummaryDto.fromJS(item));
            }
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowExecutionSummaryDtoListApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowExecutionSummaryDtoListApiResponse();
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

export class WorkflowImportDto implements interfaces.IWorkflowImportDto {
    workflowData!: string;
    format?: string | undefined;
    name!: string;
    description?: string | undefined;
    importPermissions?: boolean;
    tags?: string[] | undefined;

    constructor(data?: interfaces.IWorkflowImportDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.workflowData = _data["workflowData"];
            this.format = _data["format"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.importPermissions = _data["importPermissions"];
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
        }
    }

    static fromJS(data: any): WorkflowImportDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowImportDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["workflowData"] = this.workflowData;
        data["format"] = this.format;
        data["name"] = this.name;
        data["description"] = this.description;
        data["importPermissions"] = this.importPermissions;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        return data;
    }
}

export class WorkflowListDto implements interfaces.IWorkflowListDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    creator?: string | undefined;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    status?: enums.WorkflowStatus;
    version?: number;
    tags?: string[] | undefined;
    isTemplate?: boolean;
    executionCount?: number;
    averageExecutionTime?: string | undefined;
    nodeCount?: number;
    edgeCount?: number;
    complexityLevel?: enums.ComplexityLevel;
    isPublic?: boolean;
    hasPermission?: boolean;

    constructor(data?: interfaces.IWorkflowListDto) {
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
            this.creator = _data["creator"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.updatedAt = _data["updatedAt"] ? new Date(_data["updatedAt"].toString()) : <any>undefined;
            this.status = _data["status"];
            this.version = _data["version"];
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
            this.isTemplate = _data["isTemplate"];
            this.executionCount = _data["executionCount"];
            this.averageExecutionTime = _data["averageExecutionTime"];
            this.nodeCount = _data["nodeCount"];
            this.edgeCount = _data["edgeCount"];
            this.complexityLevel = _data["complexityLevel"];
            this.isPublic = _data["isPublic"];
            this.hasPermission = _data["hasPermission"];
        }
    }

    static fromJS(data: any): WorkflowListDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowListDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["creator"] = this.creator;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["updatedAt"] = this.updatedAt ? this.updatedAt.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["version"] = this.version;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        data["isTemplate"] = this.isTemplate;
        data["executionCount"] = this.executionCount;
        data["averageExecutionTime"] = this.averageExecutionTime;
        data["nodeCount"] = this.nodeCount;
        data["edgeCount"] = this.edgeCount;
        data["complexityLevel"] = this.complexityLevel;
        data["isPublic"] = this.isPublic;
        data["hasPermission"] = this.hasPermission;
        return data;
    }
}

export class WorkflowListDtoPagedResponse implements interfaces.IWorkflowListDtoPagedResponse {
    items?: WorkflowListDto[] | undefined;
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;

    constructor(data?: interfaces.IWorkflowListDtoPagedResponse) {
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
                    this.items!.push(WorkflowListDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            (<any>this).hasPreviousPage = _data["hasPreviousPage"];
            (<any>this).hasNextPage = _data["hasNextPage"];
        }
    }

    static fromJS(data: any): WorkflowListDtoPagedResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowListDtoPagedResponse();
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

export class WorkflowListDtoPagedResponseApiResponse implements interfaces.IWorkflowListDtoPagedResponseApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowListDtoPagedResponse;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowListDtoPagedResponseApiResponse) {
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
            this.data = _data["data"] ? WorkflowListDtoPagedResponse.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowListDtoPagedResponseApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowListDtoPagedResponseApiResponse();
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

export class WorkflowNodeCreateDto implements interfaces.IWorkflowNodeCreateDto {
    id!: string;
    name!: string;
    description?: string | undefined;
    programId!: string;
    versionId?: string | undefined;
    nodeType?: enums.WorkflowNodeType;
    position?: NodePositionDto;
    inputConfiguration?: NodeInputConfigurationDto;
    outputConfiguration?: NodeOutputConfigurationDto;
    executionSettings?: NodeExecutionSettingsDto;
    conditionalExecution?: NodeConditionalExecutionDto;
    uiConfiguration?: NodeUIConfigurationDto;
    metadata?: { [key: string]: any; } | undefined;
    isDisabled?: boolean;

    constructor(data?: interfaces.IWorkflowNodeCreateDto) {
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
            this.programId = _data["programId"];
            this.versionId = _data["versionId"];
            this.nodeType = _data["nodeType"];
            this.position = _data["position"] ? NodePositionDto.fromJS(_data["position"]) : <any>undefined;
            this.inputConfiguration = _data["inputConfiguration"] ? NodeInputConfigurationDto.fromJS(_data["inputConfiguration"]) : <any>undefined;
            this.outputConfiguration = _data["outputConfiguration"] ? NodeOutputConfigurationDto.fromJS(_data["outputConfiguration"]) : <any>undefined;
            this.executionSettings = _data["executionSettings"] ? NodeExecutionSettingsDto.fromJS(_data["executionSettings"]) : <any>undefined;
            this.conditionalExecution = _data["conditionalExecution"] ? NodeConditionalExecutionDto.fromJS(_data["conditionalExecution"]) : <any>undefined;
            this.uiConfiguration = _data["uiConfiguration"] ? NodeUIConfigurationDto.fromJS(_data["uiConfiguration"]) : <any>undefined;
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
            this.isDisabled = _data["isDisabled"];
        }
    }

    static fromJS(data: any): WorkflowNodeCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowNodeCreateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["programId"] = this.programId;
        data["versionId"] = this.versionId;
        data["nodeType"] = this.nodeType;
        data["position"] = this.position ? this.position.toJSON() : <any>undefined;
        data["inputConfiguration"] = this.inputConfiguration ? this.inputConfiguration.toJSON() : <any>undefined;
        data["outputConfiguration"] = this.outputConfiguration ? this.outputConfiguration.toJSON() : <any>undefined;
        data["executionSettings"] = this.executionSettings ? this.executionSettings.toJSON() : <any>undefined;
        data["conditionalExecution"] = this.conditionalExecution ? this.conditionalExecution.toJSON() : <any>undefined;
        data["uiConfiguration"] = this.uiConfiguration ? this.uiConfiguration.toJSON() : <any>undefined;
        if (this.metadata) {
            data["metadata"] = {};
            for (let key in this.metadata) {
                if (this.metadata.hasOwnProperty(key))
                    (<any>data["metadata"])[key] = (<any>this.metadata)[key];
            }
        }
        data["isDisabled"] = this.isDisabled;
        return data;
    }
}

export class WorkflowNodeDto implements interfaces.IWorkflowNodeDto {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    programId?: string | undefined;
    programName?: string | undefined;
    versionId?: string | undefined;
    nodeType?: enums.WorkflowNodeType;
    position?: NodePositionDto;
    inputConfiguration?: NodeInputConfigurationDto;
    outputConfiguration?: NodeOutputConfigurationDto;
    executionSettings?: NodeExecutionSettingsDto;
    conditionalExecution?: NodeConditionalExecutionDto;
    uiConfiguration?: NodeUIConfigurationDto;
    metadata?: { [key: string]: any; } | undefined;
    isDisabled?: boolean;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    validationResult?: NodeValidationResult;

    constructor(data?: interfaces.IWorkflowNodeDto) {
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
            this.programId = _data["programId"];
            this.programName = _data["programName"];
            this.versionId = _data["versionId"];
            this.nodeType = _data["nodeType"];
            this.position = _data["position"] ? NodePositionDto.fromJS(_data["position"]) : <any>undefined;
            this.inputConfiguration = _data["inputConfiguration"] ? NodeInputConfigurationDto.fromJS(_data["inputConfiguration"]) : <any>undefined;
            this.outputConfiguration = _data["outputConfiguration"] ? NodeOutputConfigurationDto.fromJS(_data["outputConfiguration"]) : <any>undefined;
            this.executionSettings = _data["executionSettings"] ? NodeExecutionSettingsDto.fromJS(_data["executionSettings"]) : <any>undefined;
            this.conditionalExecution = _data["conditionalExecution"] ? NodeConditionalExecutionDto.fromJS(_data["conditionalExecution"]) : <any>undefined;
            this.uiConfiguration = _data["uiConfiguration"] ? NodeUIConfigurationDto.fromJS(_data["uiConfiguration"]) : <any>undefined;
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
            this.isDisabled = _data["isDisabled"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.updatedAt = _data["updatedAt"] ? new Date(_data["updatedAt"].toString()) : <any>undefined;
            this.validationResult = _data["validationResult"] ? NodeValidationResult.fromJS(_data["validationResult"]) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowNodeDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowNodeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["programId"] = this.programId;
        data["programName"] = this.programName;
        data["versionId"] = this.versionId;
        data["nodeType"] = this.nodeType;
        data["position"] = this.position ? this.position.toJSON() : <any>undefined;
        data["inputConfiguration"] = this.inputConfiguration ? this.inputConfiguration.toJSON() : <any>undefined;
        data["outputConfiguration"] = this.outputConfiguration ? this.outputConfiguration.toJSON() : <any>undefined;
        data["executionSettings"] = this.executionSettings ? this.executionSettings.toJSON() : <any>undefined;
        data["conditionalExecution"] = this.conditionalExecution ? this.conditionalExecution.toJSON() : <any>undefined;
        data["uiConfiguration"] = this.uiConfiguration ? this.uiConfiguration.toJSON() : <any>undefined;
        if (this.metadata) {
            data["metadata"] = {};
            for (let key in this.metadata) {
                if (this.metadata.hasOwnProperty(key))
                    (<any>data["metadata"])[key] = (<any>this.metadata)[key];
            }
        }
        data["isDisabled"] = this.isDisabled;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["updatedAt"] = this.updatedAt ? this.updatedAt.toISOString() : <any>undefined;
        data["validationResult"] = this.validationResult ? this.validationResult.toJSON() : <any>undefined;
        return data;
    }
}

export class WorkflowNodeUpdateDto implements interfaces.IWorkflowNodeUpdateDto {
    name?: string | undefined;
    description?: string | undefined;
    programId?: string | undefined;
    versionId?: string | undefined;
    nodeType?: enums.WorkflowNodeType;
    position?: NodePositionDto;
    inputConfiguration?: NodeInputConfigurationDto;
    outputConfiguration?: NodeOutputConfigurationDto;
    executionSettings?: NodeExecutionSettingsDto;
    conditionalExecution?: NodeConditionalExecutionDto;
    uiConfiguration?: NodeUIConfigurationDto;
    metadata?: { [key: string]: any; } | undefined;
    isDisabled?: boolean | undefined;

    constructor(data?: interfaces.IWorkflowNodeUpdateDto) {
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
            this.programId = _data["programId"];
            this.versionId = _data["versionId"];
            this.nodeType = _data["nodeType"];
            this.position = _data["position"] ? NodePositionDto.fromJS(_data["position"]) : <any>undefined;
            this.inputConfiguration = _data["inputConfiguration"] ? NodeInputConfigurationDto.fromJS(_data["inputConfiguration"]) : <any>undefined;
            this.outputConfiguration = _data["outputConfiguration"] ? NodeOutputConfigurationDto.fromJS(_data["outputConfiguration"]) : <any>undefined;
            this.executionSettings = _data["executionSettings"] ? NodeExecutionSettingsDto.fromJS(_data["executionSettings"]) : <any>undefined;
            this.conditionalExecution = _data["conditionalExecution"] ? NodeConditionalExecutionDto.fromJS(_data["conditionalExecution"]) : <any>undefined;
            this.uiConfiguration = _data["uiConfiguration"] ? NodeUIConfigurationDto.fromJS(_data["uiConfiguration"]) : <any>undefined;
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
            this.isDisabled = _data["isDisabled"];
        }
    }

    static fromJS(data: any): WorkflowNodeUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowNodeUpdateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["programId"] = this.programId;
        data["versionId"] = this.versionId;
        data["nodeType"] = this.nodeType;
        data["position"] = this.position ? this.position.toJSON() : <any>undefined;
        data["inputConfiguration"] = this.inputConfiguration ? this.inputConfiguration.toJSON() : <any>undefined;
        data["outputConfiguration"] = this.outputConfiguration ? this.outputConfiguration.toJSON() : <any>undefined;
        data["executionSettings"] = this.executionSettings ? this.executionSettings.toJSON() : <any>undefined;
        data["conditionalExecution"] = this.conditionalExecution ? this.conditionalExecution.toJSON() : <any>undefined;
        data["uiConfiguration"] = this.uiConfiguration ? this.uiConfiguration.toJSON() : <any>undefined;
        if (this.metadata) {
            data["metadata"] = {};
            for (let key in this.metadata) {
                if (this.metadata.hasOwnProperty(key))
                    (<any>data["metadata"])[key] = (<any>this.metadata)[key];
            }
        }
        data["isDisabled"] = this.isDisabled;
        return data;
    }
}

export class WorkflowNotificationSettingsDto implements interfaces.IWorkflowNotificationSettingsDto {
    notifyOnStart?: boolean;
    notifyOnCompletion?: boolean;
    notifyOnFailure?: boolean;
    recipients?: string[] | undefined;

    constructor(data?: interfaces.IWorkflowNotificationSettingsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.notifyOnStart = _data["notifyOnStart"];
            this.notifyOnCompletion = _data["notifyOnCompletion"];
            this.notifyOnFailure = _data["notifyOnFailure"];
            if (Array.isArray(_data["recipients"])) {
                this.recipients = [] as any;
                for (let item of _data["recipients"])
                    this.recipients!.push(item);
            }
        }
    }

    static fromJS(data: any): WorkflowNotificationSettingsDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowNotificationSettingsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["notifyOnStart"] = this.notifyOnStart;
        data["notifyOnCompletion"] = this.notifyOnCompletion;
        data["notifyOnFailure"] = this.notifyOnFailure;
        if (Array.isArray(this.recipients)) {
            data["recipients"] = [];
            for (let item of this.recipients)
                data["recipients"].push(item);
        }
        return data;
    }
}

export class WorkflowPermissionDto implements interfaces.IWorkflowPermissionDto {
    isPublic?: boolean;
    allowedUsers?: string[] | undefined;
    allowedRoles?: string[] | undefined;
    permissions?: WorkflowUserPermissionDto[] | undefined;
    currentUserPermissions?: enums.WorkflowPermissionType[] | undefined;

    constructor(data?: interfaces.IWorkflowPermissionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.isPublic = _data["isPublic"];
            if (Array.isArray(_data["allowedUsers"])) {
                this.allowedUsers = [] as any;
                for (let item of _data["allowedUsers"])
                    this.allowedUsers!.push(item);
            }
            if (Array.isArray(_data["allowedRoles"])) {
                this.allowedRoles = [] as any;
                for (let item of _data["allowedRoles"])
                    this.allowedRoles!.push(item);
            }
            if (Array.isArray(_data["permissions"])) {
                this.permissions = [] as any;
                for (let item of _data["permissions"])
                    this.permissions!.push(WorkflowUserPermissionDto.fromJS(item));
            }
            if (Array.isArray(_data["currentUserPermissions"])) {
                this.currentUserPermissions = [] as any;
                for (let item of _data["currentUserPermissions"])
                    this.currentUserPermissions!.push(item);
            }
        }
    }

    static fromJS(data: any): WorkflowPermissionDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowPermissionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isPublic"] = this.isPublic;
        if (Array.isArray(this.allowedUsers)) {
            data["allowedUsers"] = [];
            for (let item of this.allowedUsers)
                data["allowedUsers"].push(item);
        }
        if (Array.isArray(this.allowedRoles)) {
            data["allowedRoles"] = [];
            for (let item of this.allowedRoles)
                data["allowedRoles"].push(item);
        }
        if (Array.isArray(this.permissions)) {
            data["permissions"] = [];
            for (let item of this.permissions)
                data["permissions"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.currentUserPermissions)) {
            data["currentUserPermissions"] = [];
            for (let item of this.currentUserPermissions)
                data["currentUserPermissions"].push(item);
        }
        return data;
    }
}

export class WorkflowPermissionDtoApiResponse implements interfaces.IWorkflowPermissionDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowPermissionDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowPermissionDtoApiResponse) {
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
            this.data = _data["data"] ? WorkflowPermissionDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowPermissionDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowPermissionDtoApiResponse();
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

export class WorkflowPermissionUpdateDto implements interfaces.IWorkflowPermissionUpdateDto {
    isPublic?: boolean | undefined;
    allowedUsers?: string[] | undefined;
    allowedRoles?: string[] | undefined;
    permissions?: WorkflowUserPermissionDto[] | undefined;

    constructor(data?: interfaces.IWorkflowPermissionUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.isPublic = _data["isPublic"];
            if (Array.isArray(_data["allowedUsers"])) {
                this.allowedUsers = [] as any;
                for (let item of _data["allowedUsers"])
                    this.allowedUsers!.push(item);
            }
            if (Array.isArray(_data["allowedRoles"])) {
                this.allowedRoles = [] as any;
                for (let item of _data["allowedRoles"])
                    this.allowedRoles!.push(item);
            }
            if (Array.isArray(_data["permissions"])) {
                this.permissions = [] as any;
                for (let item of _data["permissions"])
                    this.permissions!.push(WorkflowUserPermissionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): WorkflowPermissionUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowPermissionUpdateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isPublic"] = this.isPublic;
        if (Array.isArray(this.allowedUsers)) {
            data["allowedUsers"] = [];
            for (let item of this.allowedUsers)
                data["allowedUsers"].push(item);
        }
        if (Array.isArray(this.allowedRoles)) {
            data["allowedRoles"] = [];
            for (let item of this.allowedRoles)
                data["allowedRoles"].push(item);
        }
        if (Array.isArray(this.permissions)) {
            data["permissions"] = [];
            for (let item of this.permissions)
                data["permissions"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class WorkflowPermissionsDto implements interfaces.IWorkflowPermissionsDto {
    isPublic?: boolean;
    allowedUsers?: string[] | undefined;
    allowedRoles?: string[] | undefined;
    permissions?: WorkflowUserPermissionDto[] | undefined;

    constructor(data?: interfaces.IWorkflowPermissionsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.isPublic = _data["isPublic"];
            if (Array.isArray(_data["allowedUsers"])) {
                this.allowedUsers = [] as any;
                for (let item of _data["allowedUsers"])
                    this.allowedUsers!.push(item);
            }
            if (Array.isArray(_data["allowedRoles"])) {
                this.allowedRoles = [] as any;
                for (let item of _data["allowedRoles"])
                    this.allowedRoles!.push(item);
            }
            if (Array.isArray(_data["permissions"])) {
                this.permissions = [] as any;
                for (let item of _data["permissions"])
                    this.permissions!.push(WorkflowUserPermissionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): WorkflowPermissionsDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowPermissionsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isPublic"] = this.isPublic;
        if (Array.isArray(this.allowedUsers)) {
            data["allowedUsers"] = [];
            for (let item of this.allowedUsers)
                data["allowedUsers"].push(item);
        }
        if (Array.isArray(this.allowedRoles)) {
            data["allowedRoles"] = [];
            for (let item of this.allowedRoles)
                data["allowedRoles"].push(item);
        }
        if (Array.isArray(this.permissions)) {
            data["permissions"] = [];
            for (let item of this.permissions)
                data["permissions"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class WorkflowRetryPolicyDto implements interfaces.IWorkflowRetryPolicyDto {
    maxRetries?: number;
    retryDelaySeconds?: number;
    exponentialBackoff?: boolean;
    retryOnFailureTypes?: string[] | undefined;

    constructor(data?: interfaces.IWorkflowRetryPolicyDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.maxRetries = _data["maxRetries"];
            this.retryDelaySeconds = _data["retryDelaySeconds"];
            this.exponentialBackoff = _data["exponentialBackoff"];
            if (Array.isArray(_data["retryOnFailureTypes"])) {
                this.retryOnFailureTypes = [] as any;
                for (let item of _data["retryOnFailureTypes"])
                    this.retryOnFailureTypes!.push(item);
            }
        }
    }

    static fromJS(data: any): WorkflowRetryPolicyDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowRetryPolicyDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["maxRetries"] = this.maxRetries;
        data["retryDelaySeconds"] = this.retryDelaySeconds;
        data["exponentialBackoff"] = this.exponentialBackoff;
        if (Array.isArray(this.retryOnFailureTypes)) {
            data["retryOnFailureTypes"] = [];
            for (let item of this.retryOnFailureTypes)
                data["retryOnFailureTypes"].push(item);
        }
        return data;
    }
}

export class WorkflowSettingsDto implements interfaces.IWorkflowSettingsDto {
    maxConcurrentNodes?: number;
    timeoutMinutes?: number;
    retryPolicy?: WorkflowRetryPolicyDto;
    enableDebugging?: boolean;
    saveIntermediateResults?: boolean;
    notificationSettings?: WorkflowNotificationSettingsDto;

    constructor(data?: interfaces.IWorkflowSettingsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.maxConcurrentNodes = _data["maxConcurrentNodes"];
            this.timeoutMinutes = _data["timeoutMinutes"];
            this.retryPolicy = _data["retryPolicy"] ? WorkflowRetryPolicyDto.fromJS(_data["retryPolicy"]) : <any>undefined;
            this.enableDebugging = _data["enableDebugging"];
            this.saveIntermediateResults = _data["saveIntermediateResults"];
            this.notificationSettings = _data["notificationSettings"] ? WorkflowNotificationSettingsDto.fromJS(_data["notificationSettings"]) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowSettingsDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowSettingsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["maxConcurrentNodes"] = this.maxConcurrentNodes;
        data["timeoutMinutes"] = this.timeoutMinutes;
        data["retryPolicy"] = this.retryPolicy ? this.retryPolicy.toJSON() : <any>undefined;
        data["enableDebugging"] = this.enableDebugging;
        data["saveIntermediateResults"] = this.saveIntermediateResults;
        data["notificationSettings"] = this.notificationSettings ? this.notificationSettings.toJSON() : <any>undefined;
        return data;
    }
}

export class WorkflowStatisticsDto implements interfaces.IWorkflowStatisticsDto {
    totalExecutions?: number;
    successfulExecutions?: number;
    failedExecutions?: number;
    cancelledExecutions?: number;
    successRate?: number;
    averageExecutionTime?: string;
    fastestExecutionTime?: string;
    slowestExecutionTime?: string;
    lastExecutionDate?: Date | undefined;
    executionsByStatus?: { [key: string]: number; } | undefined;
    executionsByMonth?: { [key: string]: number; } | undefined;
    nodeSuccessRates?: { [key: string]: number; } | undefined;
    nodeAverageExecutionTimes?: { [key: string]: string; } | undefined;
    recentExecutions?: WorkflowExecutionSummaryDto[] | undefined;

    constructor(data?: interfaces.IWorkflowStatisticsDto) {
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
            this.cancelledExecutions = _data["cancelledExecutions"];
            this.successRate = _data["successRate"];
            this.averageExecutionTime = _data["averageExecutionTime"];
            this.fastestExecutionTime = _data["fastestExecutionTime"];
            this.slowestExecutionTime = _data["slowestExecutionTime"];
            this.lastExecutionDate = _data["lastExecutionDate"] ? new Date(_data["lastExecutionDate"].toString()) : <any>undefined;
            if (_data["executionsByStatus"]) {
                this.executionsByStatus = {} as any;
                for (let key in _data["executionsByStatus"]) {
                    if (_data["executionsByStatus"].hasOwnProperty(key))
                        (<any>this.executionsByStatus)![key] = _data["executionsByStatus"][key];
                }
            }
            if (_data["executionsByMonth"]) {
                this.executionsByMonth = {} as any;
                for (let key in _data["executionsByMonth"]) {
                    if (_data["executionsByMonth"].hasOwnProperty(key))
                        (<any>this.executionsByMonth)![key] = _data["executionsByMonth"][key];
                }
            }
            if (_data["nodeSuccessRates"]) {
                this.nodeSuccessRates = {} as any;
                for (let key in _data["nodeSuccessRates"]) {
                    if (_data["nodeSuccessRates"].hasOwnProperty(key))
                        (<any>this.nodeSuccessRates)![key] = _data["nodeSuccessRates"][key];
                }
            }
            if (_data["nodeAverageExecutionTimes"]) {
                this.nodeAverageExecutionTimes = {} as any;
                for (let key in _data["nodeAverageExecutionTimes"]) {
                    if (_data["nodeAverageExecutionTimes"].hasOwnProperty(key))
                        (<any>this.nodeAverageExecutionTimes)![key] = _data["nodeAverageExecutionTimes"][key];
                }
            }
            if (Array.isArray(_data["recentExecutions"])) {
                this.recentExecutions = [] as any;
                for (let item of _data["recentExecutions"])
                    this.recentExecutions!.push(WorkflowExecutionSummaryDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): WorkflowStatisticsDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowStatisticsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalExecutions"] = this.totalExecutions;
        data["successfulExecutions"] = this.successfulExecutions;
        data["failedExecutions"] = this.failedExecutions;
        data["cancelledExecutions"] = this.cancelledExecutions;
        data["successRate"] = this.successRate;
        data["averageExecutionTime"] = this.averageExecutionTime;
        data["fastestExecutionTime"] = this.fastestExecutionTime;
        data["slowestExecutionTime"] = this.slowestExecutionTime;
        data["lastExecutionDate"] = this.lastExecutionDate ? this.lastExecutionDate.toISOString() : <any>undefined;
        if (this.executionsByStatus) {
            data["executionsByStatus"] = {};
            for (let key in this.executionsByStatus) {
                if (this.executionsByStatus.hasOwnProperty(key))
                    (<any>data["executionsByStatus"])[key] = (<any>this.executionsByStatus)[key];
            }
        }
        if (this.executionsByMonth) {
            data["executionsByMonth"] = {};
            for (let key in this.executionsByMonth) {
                if (this.executionsByMonth.hasOwnProperty(key))
                    (<any>data["executionsByMonth"])[key] = (<any>this.executionsByMonth)[key];
            }
        }
        if (this.nodeSuccessRates) {
            data["nodeSuccessRates"] = {};
            for (let key in this.nodeSuccessRates) {
                if (this.nodeSuccessRates.hasOwnProperty(key))
                    (<any>data["nodeSuccessRates"])[key] = (<any>this.nodeSuccessRates)[key];
            }
        }
        if (this.nodeAverageExecutionTimes) {
            data["nodeAverageExecutionTimes"] = {};
            for (let key in this.nodeAverageExecutionTimes) {
                if (this.nodeAverageExecutionTimes.hasOwnProperty(key))
                    (<any>data["nodeAverageExecutionTimes"])[key] = (<any>this.nodeAverageExecutionTimes)[key];
            }
        }
        if (Array.isArray(this.recentExecutions)) {
            data["recentExecutions"] = [];
            for (let item of this.recentExecutions)
                data["recentExecutions"].push(item ? item.toJSON() : <any>undefined);
        }
        return data;
    }
}

export class WorkflowStatisticsDtoApiResponse implements interfaces.IWorkflowStatisticsDtoApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowStatisticsDto;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowStatisticsDtoApiResponse) {
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
            this.data = _data["data"] ? WorkflowStatisticsDto.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowStatisticsDtoApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowStatisticsDtoApiResponse();
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

export class WorkflowUpdateDto implements interfaces.IWorkflowUpdateDto {
    name?: string | undefined;
    description?: string | undefined;
    status?: enums.WorkflowStatus;
    nodes?: WorkflowNodeUpdateDto[] | undefined;
    edges?: WorkflowEdgeUpdateDto[] | undefined;
    settings?: WorkflowSettingsDto;
    permissions?: WorkflowPermissionsDto;
    tags?: string[] | undefined;
    metadata?: { [key: string]: any; } | undefined;
    isTemplate?: boolean | undefined;

    constructor(data?: interfaces.IWorkflowUpdateDto) {
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
            this.status = _data["status"];
            if (Array.isArray(_data["nodes"])) {
                this.nodes = [] as any;
                for (let item of _data["nodes"])
                    this.nodes!.push(WorkflowNodeUpdateDto.fromJS(item));
            }
            if (Array.isArray(_data["edges"])) {
                this.edges = [] as any;
                for (let item of _data["edges"])
                    this.edges!.push(WorkflowEdgeUpdateDto.fromJS(item));
            }
            this.settings = _data["settings"] ? WorkflowSettingsDto.fromJS(_data["settings"]) : <any>undefined;
            this.permissions = _data["permissions"] ? WorkflowPermissionsDto.fromJS(_data["permissions"]) : <any>undefined;
            if (Array.isArray(_data["tags"])) {
                this.tags = [] as any;
                for (let item of _data["tags"])
                    this.tags!.push(item);
            }
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
            this.isTemplate = _data["isTemplate"];
        }
    }

    static fromJS(data: any): WorkflowUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowUpdateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["status"] = this.status;
        if (Array.isArray(this.nodes)) {
            data["nodes"] = [];
            for (let item of this.nodes)
                data["nodes"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.edges)) {
            data["edges"] = [];
            for (let item of this.edges)
                data["edges"].push(item ? item.toJSON() : <any>undefined);
        }
        data["settings"] = this.settings ? this.settings.toJSON() : <any>undefined;
        data["permissions"] = this.permissions ? this.permissions.toJSON() : <any>undefined;
        if (Array.isArray(this.tags)) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        if (this.metadata) {
            data["metadata"] = {};
            for (let key in this.metadata) {
                if (this.metadata.hasOwnProperty(key))
                    (<any>data["metadata"])[key] = (<any>this.metadata)[key];
            }
        }
        data["isTemplate"] = this.isTemplate;
        return data;
    }
}

export class WorkflowUserPermissionDto implements interfaces.IWorkflowUserPermissionDto {
    userId!: string;
    permissions?: enums.WorkflowPermissionType[] | undefined;

    constructor(data?: interfaces.IWorkflowUserPermissionDto) {
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
            if (Array.isArray(_data["permissions"])) {
                this.permissions = [] as any;
                for (let item of _data["permissions"])
                    this.permissions!.push(item);
            }
        }
    }

    static fromJS(data: any): WorkflowUserPermissionDto {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowUserPermissionDto();
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

export class WorkflowValidationError implements interfaces.IWorkflowValidationError {
    errorCode?: string | undefined;
    errorType?: string | undefined;
    message?: string | undefined;
    details?: string | undefined;
    nodeId?: string | undefined;
    edgeId?: string | undefined;
    severity?: enums.ValidationSeverity;
    suggestedFix?: string | undefined;
    context?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IWorkflowValidationError) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.errorCode = _data["errorCode"];
            this.errorType = _data["errorType"];
            this.message = _data["message"];
            this.details = _data["details"];
            this.nodeId = _data["nodeId"];
            this.edgeId = _data["edgeId"];
            this.severity = _data["severity"];
            this.suggestedFix = _data["suggestedFix"];
            if (_data["context"]) {
                this.context = {} as any;
                for (let key in _data["context"]) {
                    if (_data["context"].hasOwnProperty(key))
                        (<any>this.context)![key] = _data["context"][key];
                }
            }
        }
    }

    static fromJS(data: any): WorkflowValidationError {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowValidationError();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["errorCode"] = this.errorCode;
        data["errorType"] = this.errorType;
        data["message"] = this.message;
        data["details"] = this.details;
        data["nodeId"] = this.nodeId;
        data["edgeId"] = this.edgeId;
        data["severity"] = this.severity;
        data["suggestedFix"] = this.suggestedFix;
        if (this.context) {
            data["context"] = {};
            for (let key in this.context) {
                if (this.context.hasOwnProperty(key))
                    (<any>data["context"])[key] = (<any>this.context)[key];
            }
        }
        return data;
    }
}

export class WorkflowValidationInfo implements interfaces.IWorkflowValidationInfo {
    infoCode?: string | undefined;
    infoType?: string | undefined;
    message?: string | undefined;
    details?: string | undefined;
    context?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IWorkflowValidationInfo) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.infoCode = _data["infoCode"];
            this.infoType = _data["infoType"];
            this.message = _data["message"];
            this.details = _data["details"];
            if (_data["context"]) {
                this.context = {} as any;
                for (let key in _data["context"]) {
                    if (_data["context"].hasOwnProperty(key))
                        (<any>this.context)![key] = _data["context"][key];
                }
            }
        }
    }

    static fromJS(data: any): WorkflowValidationInfo {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowValidationInfo();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["infoCode"] = this.infoCode;
        data["infoType"] = this.infoType;
        data["message"] = this.message;
        data["details"] = this.details;
        if (this.context) {
            data["context"] = {};
            for (let key in this.context) {
                if (this.context.hasOwnProperty(key))
                    (<any>data["context"])[key] = (<any>this.context)[key];
            }
        }
        return data;
    }
}

export class WorkflowValidationResult implements interfaces.IWorkflowValidationResult {
    isValid?: boolean;
    errors?: WorkflowValidationError[] | undefined;
    warnings?: WorkflowValidationWarning[] | undefined;
    info?: WorkflowValidationInfo[] | undefined;
    complexityMetrics?: WorkflowComplexityMetrics;
    metadata?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IWorkflowValidationResult) {
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
                    this.errors!.push(WorkflowValidationError.fromJS(item));
            }
            if (Array.isArray(_data["warnings"])) {
                this.warnings = [] as any;
                for (let item of _data["warnings"])
                    this.warnings!.push(WorkflowValidationWarning.fromJS(item));
            }
            if (Array.isArray(_data["info"])) {
                this.info = [] as any;
                for (let item of _data["info"])
                    this.info!.push(WorkflowValidationInfo.fromJS(item));
            }
            this.complexityMetrics = _data["complexityMetrics"] ? WorkflowComplexityMetrics.fromJS(_data["complexityMetrics"]) : <any>undefined;
            if (_data["metadata"]) {
                this.metadata = {} as any;
                for (let key in _data["metadata"]) {
                    if (_data["metadata"].hasOwnProperty(key))
                        (<any>this.metadata)![key] = _data["metadata"][key];
                }
            }
        }
    }

    static fromJS(data: any): WorkflowValidationResult {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowValidationResult();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isValid"] = this.isValid;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.warnings)) {
            data["warnings"] = [];
            for (let item of this.warnings)
                data["warnings"].push(item ? item.toJSON() : <any>undefined);
        }
        if (Array.isArray(this.info)) {
            data["info"] = [];
            for (let item of this.info)
                data["info"].push(item ? item.toJSON() : <any>undefined);
        }
        data["complexityMetrics"] = this.complexityMetrics ? this.complexityMetrics.toJSON() : <any>undefined;
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

export class WorkflowValidationResultApiResponse implements interfaces.IWorkflowValidationResultApiResponse {
    success?: boolean;
    message?: string | undefined;
    data?: WorkflowValidationResult;
    errors?: string[] | undefined;
    timestamp?: Date;

    constructor(data?: interfaces.IWorkflowValidationResultApiResponse) {
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
            this.data = _data["data"] ? WorkflowValidationResult.fromJS(_data["data"]) : <any>undefined;
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(item);
            }
            this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WorkflowValidationResultApiResponse {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowValidationResultApiResponse();
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

export class WorkflowValidationWarning implements interfaces.IWorkflowValidationWarning {
    warningCode?: string | undefined;
    warningType?: string | undefined;
    message?: string | undefined;
    details?: string | undefined;
    nodeId?: string | undefined;
    edgeId?: string | undefined;
    severity?: enums.ValidationSeverity;
    recommendation?: string | undefined;
    context?: { [key: string]: any; } | undefined;

    constructor(data?: interfaces.IWorkflowValidationWarning) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.warningCode = _data["warningCode"];
            this.warningType = _data["warningType"];
            this.message = _data["message"];
            this.details = _data["details"];
            this.nodeId = _data["nodeId"];
            this.edgeId = _data["edgeId"];
            this.severity = _data["severity"];
            this.recommendation = _data["recommendation"];
            if (_data["context"]) {
                this.context = {} as any;
                for (let key in _data["context"]) {
                    if (_data["context"].hasOwnProperty(key))
                        (<any>this.context)![key] = _data["context"][key];
                }
            }
        }
    }

    static fromJS(data: any): WorkflowValidationWarning {
        data = typeof data === 'object' ? data : {};
        let result = new WorkflowValidationWarning();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["warningCode"] = this.warningCode;
        data["warningType"] = this.warningType;
        data["message"] = this.message;
        data["details"] = this.details;
        data["nodeId"] = this.nodeId;
        data["edgeId"] = this.edgeId;
        data["severity"] = this.severity;
        data["recommendation"] = this.recommendation;
        if (this.context) {
            data["context"] = {};
            for (let key in this.context) {
                if (this.context.hasOwnProperty(key))
                    (<any>data["context"])[key] = (<any>this.context)[key];
            }
        }
        return data;
    }
}

// --- END OF FILE types.ts ---