import type { ApiLock } from "../../types/api"
import type { Endpoint } from "../endpoints"
import type { Cluster } from "./cluster"


export class LockCluster implements Cluster {
    endpoint: Endpoint

    isLocked: boolean = false

    public constructor(endpoint: Endpoint, api: ApiLock) {
        this.endpoint = endpoint
        this.isLocked = api.locked
    }

    // TODO make this a service call
    public toggle() {
        this.isLocked = !this.isLocked
    }
}
