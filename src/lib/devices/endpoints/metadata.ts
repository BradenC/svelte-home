import type { BasicCluster } from "../clusters/basic"
import { EndpointBase } from "./endpoint-base"


export class MetadataEndpoint extends EndpointBase {
    declare basic: BasicCluster
}
