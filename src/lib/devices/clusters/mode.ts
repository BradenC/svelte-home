import type { ApiMode } from "../../types/api"
import type { Endpoint } from "../endpoints"
import type { Cluster } from "./cluster"


export class ModeCluster implements Cluster {
    endpoint: Endpoint

    mode: number

    public constructor(endpoint: Endpoint, api: ApiMode) {
        this.endpoint = endpoint
        
        this.mode = api.mode
    }
}
