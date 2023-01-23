import type { ApiMeasurement } from "../../types/api"
import type { Endpoint } from "../endpoints"
import type { Cluster } from "./cluster"


export class MeasurementCluster implements Cluster {
    endpoint: Endpoint

    value: number = 0

    public constructor(endpoint: Endpoint, api: ApiMeasurement) {
        this.endpoint = endpoint
        
        this.value = api.value
    }
}
