import type { ApiCamera } from "../../types/api"
import type { Endpoint } from "../endpoints"
import type { Cluster } from "./cluster"


export class CameraCluster implements Cluster {
    endpoint: Endpoint

    public constructor(endpoint: Endpoint, api: ApiCamera) {
        this.endpoint = endpoint
    }
}
