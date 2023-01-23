import type { ApiSensor } from "../../types/api"
import type { SensorState } from "../../types/enum"
import type { Endpoint } from "../endpoints"
import type { Cluster } from "./cluster"


export class SensorCluster implements Cluster {
    endpoint: Endpoint

    state: SensorState
    hi: number
    lo: number

    public constructor(endpoint: Endpoint, api: ApiSensor) {
        this.endpoint = endpoint
        
        this.state = api.state
        this.hi = api.hi
        this.lo = api.lo
    }
}
