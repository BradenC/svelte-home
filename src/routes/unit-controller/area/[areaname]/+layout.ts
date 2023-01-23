/**
 * The state of "which contents to display" is stored in `AreaTabNavigationState`
 * This state is managed internally by the app
 * This state is a singleton with
 *   initial values by the url
 *   subsequent values updated by the app
 */

import type { LayoutLoad } from "./$types"

import { AreaTabNavigationState } from "./tab-navigation"


let areaTabNavigationState: AreaTabNavigationState

const load: LayoutLoad = async function ({ params, url }) {
    areaTabNavigationState
      = AreaTabNavigationState.makeNewAreaTabNavigationState(url.searchParams, areaTabNavigationState)

    return {
        areaTabNavigationState,
        areaName: params.areaname
    }
}

export { load }
