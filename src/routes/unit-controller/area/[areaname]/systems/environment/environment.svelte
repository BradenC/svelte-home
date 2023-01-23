<script lang="ts">
	import { getContext } from "svelte"

	import type { Device } from "$lib/devices/devices/device"
    import {
        HeaterEndpoint,
        TemperatureMeasurerSensorEndpoint,
        HumidifierEndpoint,
        HumidityMeasurerSensorEndpoint
    } from "$lib/devices/endpoints"
	import { areaPageDataKey } from "$lib/symbols"
	import type { AreaPageData } from "../../+page"
	import ThermostatCard from "./thermostat-card.svelte"
	import HumidifierCard from "./humidifier-card.svelte"

    const data: AreaPageData = getContext(areaPageDataKey)
    const devices: Device[] = data.devices

    let heater: HeaterEndpoint | undefined
      = devices.flatMap(d => d.endpoints)
               .find(ep => ep instanceof HeaterEndpoint) as HeaterEndpoint

    let temperatureSensor: TemperatureMeasurerSensorEndpoint | undefined
      = devices.flatMap(d => d.endpoints)
               .find(ep => ep instanceof TemperatureMeasurerSensorEndpoint) as TemperatureMeasurerSensorEndpoint

    let humidifier: HumidifierEndpoint | undefined
      = devices.flatMap(d => d.endpoints)
               .find(ep => ep instanceof HumidifierEndpoint) as HumidifierEndpoint

    let humiditySensor: HumidityMeasurerSensorEndpoint | undefined
      = devices.flatMap(d => d.endpoints)
               .find(ep => ep instanceof HumidityMeasurerSensorEndpoint) as HumidityMeasurerSensorEndpoint
</script>


<div id="outer">
    {#if heater && temperatureSensor}
    <div class="container"><ThermostatCard heater={heater} temperatureSensor={temperatureSensor}/></div>
    {/if}
    {#if humidifier && humiditySensor}
    <div class="container humidifier"><HumidifierCard humidifier={humidifier} humiditySensor={humiditySensor}/></div>
    {/if}
</div>


<style lang="scss">
    @import "/src/styles/globals.scss";

    #outer {
        display: flex;
        flex-direction: row;

        .container {
            width: 50%;
            height: 30em;
        }

        .humidifier {
            margin-left: 1em;
        }
    }
</style>
