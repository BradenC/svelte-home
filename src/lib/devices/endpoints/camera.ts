import type { OnOffCluster } from "../clusters/on-off"
import type { CameraCluster } from "../clusters/camera"
import { EndpointBase } from "./endpoint-base"


export class CameraEndpoint extends EndpointBase {
    declare onOff: OnOffCluster
    declare camera: CameraCluster
}
