<script lang="ts">
	import { setContext } from "svelte"

    import type { PageData } from "./$types"
    import { areaPageDataKey } from "$lib/symbols"
    import type { AreaPageData } from "./+page"
	import { AreaTab } from "./tab-navigation"

    import Systems from "./systems/systems.svelte"
    import Scenes from "./scenes/scenes.svelte"
    import Devices from "./devices/devices.svelte"


    export let data: PageData

    $: nav = data.areaTabNavigationState

    const pageData: AreaPageData = {
        areas: data.areas,
        groups: data.groups,
        systems: data.systems,
        scenes: data.scenes,
        devices: data.devices
    }

    setContext(areaPageDataKey, pageData)
</script>


<div class="tab" hidden={nav._tab !== AreaTab.Systems}>
    <Systems systemSubtabNavigation={nav.systems}/>
</div>
<div class="tab" hidden={nav._tab !== AreaTab.Scenes}>
    <Scenes/>
</div>
<div class="tab" hidden={nav._tab !== AreaTab.Devices}>
    <Devices deviceSubtabNavigation={nav.devices}/>
</div>


<style lang="scss">
    div.tab {
        height: 100%;
    }
</style>
