import type { OnOffCluster } from "../clusters/on-off"
import type { LevelControlCluster } from "../clusters/level-control"
import { EndpointBase } from "./endpoint-base"


export class HeaterEndpoint extends EndpointBase {
    declare onOff: OnOffCluster
    declare levelControl: LevelControlCluster
}
