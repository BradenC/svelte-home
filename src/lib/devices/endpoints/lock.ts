import type { LockCluster } from "../clusters/lock"
import { EndpointBase } from "./endpoint-base"


export class LockEndpoint extends EndpointBase {
    declare lock: LockCluster
}
