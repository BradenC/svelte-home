import type { LevelControl } from "$lib/types/api"
import type { Endpoint } from "../endpoints"
import type { Cluster } from "./cluster"


export class LevelControlCluster implements Cluster {
    endpoint: Endpoint

    level: number = 200

    public constructor(endpoint: Endpoint, api: LevelControl) {
        this.endpoint = endpoint
        
        this.level = api.level
    }

    // TODO make this a service call
    setLevel(level: number, duration: number = 0) {
        this.level = level
    }
}
