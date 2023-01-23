import type { ApiDevice } from "../../types/api"
import { DeviceKind } from "../../types/enum"
import type { MetadataEndpoint } from "../endpoints/metadata"
import { type Endpoint, EndpointFromApi } from "../endpoints"


export class Device {
    id: number
    name: string
    endpoints: Endpoint[]
    deviceType: DeviceKind
    groups: number[]
    areas: number[]

    get metadata(): MetadataEndpoint {
        return this.endpoints[0] as MetadataEndpoint
    }

    get summary(): string {
        return "Placeholder Summary"
    }

    constructor(api: ApiDevice) {
        this.id = api.id
        this.name = api.name
        this.endpoints = api.endpoints.map(ep => EndpointFromApi(this, ep))
        this.deviceType = api.deviceKind as DeviceKind || DeviceKind.Device
        this.groups = api.groups
        this.areas = api.areas
    }
}
