import type { ApiBasic } from "../../types/api"
import type { PowerType } from "../../types/enum"
import type { Endpoint } from "../endpoints"
import type { Cluster } from "./cluster"


export class BasicCluster implements Cluster {
    endpoint: Endpoint
    productName?: string
    productVersion?: string
    serialNumber?: string
    manufacturerName?: string
    manufactureDate?: Date
    powerType?: PowerType
    batteryPercent?: number
    isPluggedIn?: boolean

    public constructor(endpoint: Endpoint, api: ApiBasic) {
        this.endpoint = endpoint

        this.productName = api.productName
        this.productVersion = api.productVersion
        this.serialNumber = api.serialNumber
        this.manufacturerName = api.manufacturerName
        this.manufactureDate = api.manufactureDate
        this.powerType = api.powerType
        this.batteryPercent = api.batteryPercent
        this.isPluggedIn = api.isPluggedIn
    }
}
