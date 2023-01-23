<script lang="ts">
	import { getContext } from "svelte";

	import type { Device } from "$lib/devices/devices/device"
    import {
        CameraEndpoint,
        LockEndpoint
    } from "$lib/devices/endpoints"
	import { areaPageDataKey } from "$lib/symbols"
	import type { AreaPageData } from "../../+page"
	import LockCard from "./lock-card.svelte"
	import CameraCard from "./camera-card.svelte"

    const data: AreaPageData = getContext(areaPageDataKey)
    const devices: Device[] = data.devices

    export let locks: LockEndpoint[]
      = devices.flatMap(d => d.endpoints)
               .filter(ep => ep instanceof LockEndpoint) as LockEndpoint[]

    export let cameras: CameraEndpoint[] = []
      = devices.flatMap(d => d.endpoints)
               .filter(ep => ep instanceof CameraEndpoint) as CameraEndpoint[]
</script>


<div id="outer">
    {#each locks as lock}
    <div class="lock-container"><LockCard lock={lock}/></div>
    {/each}
    {#each cameras as camera}
    <div class="camera-container"><CameraCard camera={camera} --margin-left=1em/></div>
    {/each}
</div>


<style lang="scss">
    @import "/src/styles/globals.scss";

    #outer {
        display: flex;
        flex-direction: row;

        width: 100%;
        height: 100%;
        max-height: 30em;

        .camera-container {
            margin-left: 1em;
        }
    }
</style>
