export * from "./endpoints/camera"
export * from "./endpoints/color-light"
export * from "./endpoints/endpoint-base"
export * from "./endpoints/heater"
export * from "./endpoints/humidifier"
export * from "./endpoints/light"
export * from "./endpoints/lock"
export * from "./endpoints/metadata"
export * from "./endpoints/temperature-measurer-sensor"
export * from "./endpoints/humidity-measurer-sensor"
export * from "./endpoints/endpoint-base"

import type { ApiEndpoint } from "../types/api"
import { EndpointKind } from "../types/enum"
import type { Device } from "./devices/device"

import { MetadataEndpoint} from "./endpoints/metadata"
import { LightEndpoint } from "./endpoints/light"
import { ColorLightEndpoint } from "./endpoints/color-light"
import { HeaterEndpoint } from "./endpoints/heater"
import { HumidifierEndpoint } from "./endpoints/humidifier"
import { TemperatureMeasurerSensorEndpoint } from "./endpoints/temperature-measurer-sensor"
import { HumidityMeasurerSensorEndpoint } from "./endpoints/humidity-measurer-sensor"
import { CameraEndpoint } from "./endpoints/camera"
import { LockEndpoint } from "./endpoints/lock"
import { UnknownEndpoint } from "./endpoints/unknown"


export type Endpoint = UnknownEndpoint | ColorLightEndpoint | CameraEndpoint | HeaterEndpoint | HumidifierEndpoint
  | LightEndpoint | LockEndpoint | MetadataEndpoint

export function EndpointFromApi(device: Device, api: ApiEndpoint): Endpoint {
    switch (api.endpointKind) {
        case EndpointKind.Camera:
            return new CameraEndpoint(device, api)
        case EndpointKind.Metadata:
            return new MetadataEndpoint(device, api)
        case EndpointKind.ColorLight:
            return new ColorLightEndpoint(device, api)
        case EndpointKind.Heater:
            return new HeaterEndpoint(device, api)
        case EndpointKind.Humidifier:
            return new HumidifierEndpoint(device, api)
        case EndpointKind.HumidityMeasurerSensor:
            return new HumidityMeasurerSensorEndpoint(device, api)
        case EndpointKind.TemperatureMeasurerSensor:
            return new TemperatureMeasurerSensorEndpoint(device, api)
        case EndpointKind.Light:
            return new LightEndpoint(device, api)
        case EndpointKind.Lock:
            return new LockEndpoint(device, api)
        case EndpointKind.Unknown:
            return new UnknownEndpoint(device, api)
    }
}
