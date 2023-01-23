<script lang="ts">
	import { getContext, setContext } from "svelte"
	import { writable, type Writable } from "svelte/store"

	import type { Device } from "$lib/devices/devices/device"
    import { ColorLightEndpoint } from "$lib/devices/endpoints/color-light"
	import { areaPageDataKey, mLightKey } from "$lib/symbols"
    import type { AreaPageData } from "../../+page"
    import ColorLightSwitch from "./color-light-switch-card.svelte"
    import { MLight } from "./mLight"

    const mLight: MLight = new MLight()

    const data: AreaPageData = getContext(areaPageDataKey)
    const devices: Device[] = data.devices

    const lights: ColorLightEndpoint[]
      = devices.flatMap(d => d.endpoints).filter(ep => ep instanceof ColorLightEndpoint) as ColorLightEndpoint[]

    const mLightStore: Writable<MLight> = writable(mLight)

    setContext(mLightKey, mLightStore)
</script>


<div id="outer">
    <div class="grid">
        <div class="primary cell"><ColorLightSwitch/></div>
        {#each lights as light}
        <div class="cell"><ColorLightSwitch light={light}/></div>
        {/each}
    </div>
</div>


<style lang="scss">
    @import "/src/styles/globals.scss";

    $cell-width: 6em;
    $gap: 4em;

    #outer {
        height: 100%;

        div.grid {
            display: grid;

            height: 100%;

            grid-auto-flow: column;
            grid-template-rows: repeat(3, 1fr);

            gap: $gap;

            .cell {
                width: $cell-width;
                height: $cell-width * 1.8;
            }

            .primary {
                width: $cell-width * 2 + $gap;

                grid-row-start: 1;
                grid-row-end: 3;
                grid-column-start: 1;
                grid-column-end: 3;
            }
        }
    }
</style>
