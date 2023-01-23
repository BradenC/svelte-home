import type { PageLoad } from "./$types"


export interface AreaGroup {
    name: string
    areaNames: string[]
}

export const load: PageLoad = async function({ fetch }) {
    interface IResult {
        areaGroups: AreaGroup[]
    }

    const result: IResult = await fetch("/mock/areaGroups.json")
        .then((res) => res.json())

    const areaGroups: AreaGroup[] = result.areaGroups

    return { areaGroups }
}
