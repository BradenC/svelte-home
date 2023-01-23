import type { MeasurementCluster } from "../clusters/measurement"
import type { SensorCluster } from "../clusters/sensor"
import { EndpointBase } from "./endpoint-base"


export abstract class MeasurerSensorEndpoint extends EndpointBase {
    declare measurement: MeasurementCluster
    declare sensor: SensorCluster

    get current(): number {
        return this.measurement.value
    }

    get target(): number {
        return (this.sensor.hi + this.sensor.lo) / 2
    }

    set target(val: number) {
        const diff: number = val - this.target

        this.sensor.hi += diff
        this.sensor.lo += diff
    }
}
