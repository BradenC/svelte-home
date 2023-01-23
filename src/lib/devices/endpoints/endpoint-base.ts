import type { ApiEndpoint } from "../../types/api"
import type { Device } from "../devices/device"

import { BasicCluster } from "../clusters/basic"
import { OnOffCluster } from "../clusters/on-off"
import { LevelControlCluster } from "../clusters/level-control"
import { LockCluster } from "../clusters/lock"
import { CameraCluster } from "../clusters/camera"
import { SensorCluster } from "../clusters/sensor"
import { MeasurementCluster } from "../clusters/measurement"
import { ColorControlCluster } from "../clusters/color-control"
import { ModeCluster } from "../clusters/mode"


export class EndpointBase {
    // Parent
    device: Device

    // Clusters
    basic?: BasicCluster
    onOff?: OnOffCluster
    levelControl?: LevelControlCluster
    lock?: LockCluster
    camera?: CameraCluster
    sensor?: SensorCluster
    measurement?: MeasurementCluster
    colorControl?: ColorControlCluster
    mode?: ModeCluster

    constructor(device: Device, api: ApiEndpoint) {
        this.device = device

        this.basic = api.clusters.basic ? new BasicCluster(this, api.clusters.basic) : undefined
        this.onOff = api.clusters.onOff ? new OnOffCluster(this, api.clusters.onOff) : undefined
        this.levelControl = api.clusters.level ? new LevelControlCluster(this, api.clusters.level) : undefined
        this.lock = api.clusters.lock ? new LockCluster(this, api.clusters.lock) : undefined
        this.camera = api.clusters.camera ? new CameraCluster(this, api.clusters.camera) : undefined
        this.sensor = api.clusters.sensor ? new SensorCluster(this, api.clusters.sensor) : undefined
        this.measurement = api.clusters.measurement ? new MeasurementCluster(this, api.clusters.measurement) : undefined
        this.colorControl = api.clusters.color ? new ColorControlCluster(this, api.clusters.color) : undefined
        this.mode = api.clusters.mode ? new ModeCluster(this, api.clusters.mode) : undefined
    }
}
