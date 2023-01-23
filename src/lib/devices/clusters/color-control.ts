import type { ApiColorControl } from "../../types/api"
import type { Endpoint } from "../endpoints"
import type { Cluster } from "./cluster"


export class ColorControlCluster implements Cluster {
    endpoint: Endpoint

    hue: number = 0
    saturation: number = 0
    // TODO lear more about color theory
    // For now use levelControl as lightness until I learn more
    // lightness: number = 0

    constructor(endpoint: Endpoint, api: ApiColorControl) {
        this.endpoint = endpoint

        this.hue = api.hue
        this.saturation = api.saturation
    }
}
