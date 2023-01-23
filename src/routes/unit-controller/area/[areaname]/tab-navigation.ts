/**
 * Keep track of navigation state so that if a user leaves and returns to a tab, their place is not lost.
 * 
 * In the app, a navigation can be triggered by simply updating a property on this object.
 */

import { get } from "svelte/store"
import { goto } from "$app/navigation"
import { page } from "$app/stores"


export enum AreaTab {
    Systems = "systems",
    Scenes = "scenes",
    Devices = "devices"
}

export enum SystemsSubtab {
    Lighting = "lighting",
    Environment = "environment",
    Security = "security"
}

export enum DeviceSubtab {
    State = "state",
    Commands = "commands",
    Power = "power",
    Metadata = "metadata",
    Notifications = "notifications",
    Permissions = "permissions"
}

function upsertQueryParam(k: string, v: string | undefined) {
    let query = new URLSearchParams(get(page).url.searchParams)

    if (v)
        query.set(k, v)
    else
        query.delete(k)

    goto(`?${query.toString()}`)
}

abstract class TabNavigationState {
    /**
     * Add relevant tab data to the url when this tab is selected
     */
    activate(query: URLSearchParams) {}

    /**
     * Remove no-longer-relevant data from the url when this tab is left
     */
    deactivate(query: URLSearchParams) {}

    /**
     * If the url would point to an invalid state (such as a device subtab with no device selected)
     * then change to the nearest valid state
     */
    sanitize(query: URLSearchParams) {}

    /**
     * Build new state from the url
     */
    constructor(query: URLSearchParams) {}
}

export class SystemsTabNavigationState implements TabNavigationState {
    private _subtab: SystemsSubtab

    get subtab(): SystemsSubtab {
        return this._subtab
    }

    set subtab(s: SystemsSubtab) {
        this._subtab = s
        upsertQueryParam('s', this._subtab)
    }

    constructor(query: URLSearchParams) {
        const s = query.get("s") as SystemsSubtab
        this._subtab = Object.values(SystemsSubtab).includes(s) ? s : SystemsSubtab.Lighting
    }

    activate(query: URLSearchParams) {
        query.set('s', this._subtab)
    }

    deactivate(query: URLSearchParams) {
        query.delete('s')
    }

    sanitize(query: URLSearchParams) {}
}

export class ScenesTabNavigationState implements TabNavigationState {
    constructor(query: URLSearchParams) {}
    activate(query: URLSearchParams) {}
    deactivate(query: URLSearchParams) {}
    sanitize(query: URLSearchParams) {}
}

export class DevicesTabNavigationState implements TabNavigationState {
    private _subtab: DeviceSubtab
    private _deviceId: number | undefined

    get subtab(): DeviceSubtab {
        return this._subtab
    }

    set subtab(s: DeviceSubtab) {
        this._subtab = s
        upsertQueryParam('s', this._subtab)
    }

    get deviceId(): number | undefined {
        return this._deviceId
    }

    set deviceId(id: number | undefined) {
        this._subtab = this._subtab || DeviceSubtab.State
        this._deviceId = id

        let query = new URLSearchParams(get(page).url.searchParams)

        if (this._deviceId)
            query.set('d', this._deviceId.toString())
        else
            query.delete('d')
    
        goto(`?${query.toString()}`)
    }

    constructor(query: URLSearchParams) {
        const s = query.get("s") as DeviceSubtab
        this._subtab = Object.values(DeviceSubtab).includes(s) ? s : DeviceSubtab.State
        this._deviceId = Number(query.get("d")) || undefined
    }

    activate(query: URLSearchParams) {
        if (this._deviceId) {
            query.set('s', this._subtab)
            query.set('d', this._deviceId.toString())
        }
    }

    deactivate(query: URLSearchParams) {
        query.delete('s')
        query.delete('d')
    }

    sanitize(query: URLSearchParams) {
        if (query.get("d"))
            this._deviceId == undefined
    }
}

export class AreaTabNavigationState {
    systems: SystemsTabNavigationState
    scenes: ScenesTabNavigationState
    devices: DevicesTabNavigationState

    trigger: boolean = false

     _tab: AreaTab

    get tab(): AreaTab {
        return this._tab
    }

    set tab(s: AreaTab) {
        this._tab = s

        let query = new URLSearchParams(get(page).url.searchParams)

        query.set('t', this._tab)

        switch (this._tab) {
            case AreaTab.Systems:
                this.scenes.deactivate(query)
                this.devices.deactivate(query)
                this.systems.activate(query)
                break

            case AreaTab.Scenes:
                this.systems.deactivate(query)
                this.devices.deactivate(query)
                this.scenes.activate(query)
                break

            case AreaTab.Devices:
                this.systems.deactivate(query)
                this.scenes.deactivate(query)
                this.devices.activate(query)
                break
        }

        goto(`?${query.toString()}`)
    }

    constructor(query: URLSearchParams) {
        const t = query.get("t") as AreaTab
        this._tab = Object.values(AreaTab).includes(t) ? t : AreaTab.Systems

        this.systems = new SystemsTabNavigationState(query)
        this.scenes = new ScenesTabNavigationState(query)
        this.devices = new DevicesTabNavigationState(query)
    }

    /**
     * Given
     *   existing nav state
     *   new data from url
     * Return
     *   a valid and useful new nav state
     * 
     * For example:
     *   If a user wants to navigate to the devices tab and the lighting subtab, this is an illegal combination
     *   So, update the nav state + url to direct them to a valid combination that is close to what they wanted
     *     such as devices tab with metadata subtab
     */
    static makeNewAreaTabNavigationState(query: URLSearchParams, prev: AreaTabNavigationState): AreaTabNavigationState {
        let next: AreaTabNavigationState = prev ?? new AreaTabNavigationState(query)

        next.systems.sanitize(query)
        next.scenes.sanitize(query)
        next.devices.sanitize(query)

        return next
    }
}
