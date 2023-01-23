import { Device } from "$lib/devices/devices/device"
import type { ColorLightEndpoint } from "$lib/devices/endpoints"
import { DeviceKind, EndpointKind } from "$lib/types/enum"


export class MLight extends Device {
    numLightsInGroup: number = 0

    get colorLight(): ColorLightEndpoint {
        return this.endpoints[1] as ColorLightEndpoint
    }

    constructor() {
        super({
            id: 0,
            name: "Main Control",
            deviceKind: DeviceKind.Device,
            areas: [],
            groups: [],
            endpoints: [
                {
                    endpointKind: EndpointKind.Metadata,
                    clusters: {
                        basic: { }
                    }
                },
                {
                    endpointKind: EndpointKind.ColorLight,
                    clusters: {
                        onOff: { on: true },
                        level: { level: 254 },
                        color: { hue: 360, saturation: 0 }
                    }
                }
            ]
        })
    }
}
