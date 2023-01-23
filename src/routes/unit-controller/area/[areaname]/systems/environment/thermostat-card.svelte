<script lang="ts">
    import Icon from '@iconify/svelte';

    import type {
        TemperatureMeasurerSensorEndpoint,
        HeaterEndpoint
    } from "$lib/devices/endpoints"

    export let heater: HeaterEndpoint
    export let temperatureSensor: TemperatureMeasurerSensorEndpoint

    function onUpClick() {
        temperatureSensor.target += 1
    }

    function onDownClick() {
        temperatureSensor.target -= 1
    }
</script>


<div id="outer" class="card">
    <h2>Temperature</h2>
    <div id="target">
        <div class="icon" on:click={onUpClick}>
            <Icon icon="mdi-light:chevron-up" height="100%"/>
        </div>
        <h2>{temperatureSensor.target}°</h2>
        <div class="icon" on:click={onDownClick}>
            <Icon icon="mdi-light:chevron-down" height="100%"/>
        </div>
    </div>
    <div id="bottom">
        <div id="current">
            <span>Current: {temperatureSensor.current}°</span>
        </div>
    </div>
</div>


<style lang="scss">
    @import "/src/styles/card.scss";
    @import "./environment.scss";
</style>
