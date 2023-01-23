import { error } from "@sveltejs/kit"

import type { NameAndId } from "$lib/types/generic"
import { Device } from "$lib/devices/devices/device"
import type { ApiDevice, ApiScene, ApiSystem } from "$lib/types/api"
import { validateAreaData } from "$lib/validation"
import type { PageLoad } from "./$types"


export interface AreaPageData {
    areas: NameAndId[],
    groups: NameAndId[],
    devices: Device[],
    scenes: ApiScene[],
    systems: ApiSystem[]
}

interface IResult {
    areas: NameAndId[],
    groups: NameAndId[],
    devices: ApiDevice[],
    scenes: ApiScene[],
    systems: ApiSystem[]
}

const load: PageLoad = async function ({ fetch, params }): Promise<AreaPageData> {
    const result: IResult = await fetch("/mock/areaData.json").then((res) => res.json())

    if (!validateAreaData(result)) {
        console.error(validateAreaData.errors)
        throw error(400, "Failed validation")
    }

    const areas: NameAndId[] = [{id: 0, name: "All"}, ...result.areas]
    const groups: NameAndId[] = [{id: 0, name: "All"}, ...result.groups]

    const area = areas.find(a => a.name === params.areaname)
    if (!area)
        throw error(404, 'Area not found')
    const areaId: number = area.id

    const allDevices: Device[] = result.devices.map(d => new Device(d))
    const devices: Device[] = allDevices.filter(d => area.name == "All" || d.areas.includes(areaId))

    const scenes = result.scenes
    const systems = result.systems

    return {
        areas,
        groups,
        devices,
        scenes,
        systems
    }
}

export { load }
