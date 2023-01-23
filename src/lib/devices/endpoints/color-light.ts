import type { ColorControlCluster } from "../clusters/color-control"
import { LightEndpoint } from "./light"


export class ColorLightEndpoint extends LightEndpoint {
    declare colorControl: ColorControlCluster
}
