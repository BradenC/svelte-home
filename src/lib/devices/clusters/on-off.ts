import type { ApiOnOff } from "../../types/api"
import type { Endpoint } from "../endpoints"
import type { Cluster } from "./cluster"


export class OnOffCluster implements Cluster {
    endpoint: Endpoint

    isOn: boolean

    public constructor(endpoint: Endpoint, api: ApiOnOff) {
        this.endpoint = endpoint

        this.isOn = api.on
    }

    // TODO make this a service call
    toggle() {
        this.isOn = !this.isOn
    }
}
