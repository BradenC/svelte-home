import {
    DeviceKind,
    EndpointKind,
    PowerType,
    SensorState,
    MoveState
} from "./enum"


export interface ApiBasic {
    productName?: string
    productVersion?: string
    serialNumber?: string
    manufacturerName?: string
    manufactureDate?: Date
    powerType?: PowerType
    batteryPercent?: number
    isPluggedIn?: boolean
}

export interface ApiOnOff {
    on: boolean
}

export interface LevelControl {
    level: number
}

export interface ApiMeasurement {
    value: number
}

export interface ApiSensor {
    state: SensorState
    hi: number
    lo: number
}

export interface ApiColorControl {
    hue: number
    saturation: number
}

export interface ApiLock {
    locked: boolean
}

export interface ApiCamera {}

export interface ApiAppliance {}

export interface ApiWindowCovering {
    openPercent: number
    moveState: MoveState
}

export interface ApiMedia {
    mediaTypes: string[]
    playing: boolean
}

export interface ApiMode {
    mode: number
}

export interface ApiClusters {
    basic?: ApiBasic
    onOff?: ApiOnOpp
    level?: LevelControl
    measurement?: ApiMeasurement
    sensor?: ApiSensor
    color?: ApiColorControl
    lock?: ApiLock
    camera?: ApiCamera
    appliance?: ApiAppliance
    windowCovering?: ApiWindowCovering
    media?: ApiMedia
    mode?: ApiMode
}

export interface ApiEndpoint {
    endpointKind: EndpointKind
    clusters: ApiClusters

}

export interface ApiDevice {
    id: number
    name: string
    deviceKind: DeviceKind
    areas: number[]
    groups: number[]
    endpoints: ApiEndpoint[]
}

interface ApiScene {}

interface ApiSystem {}
