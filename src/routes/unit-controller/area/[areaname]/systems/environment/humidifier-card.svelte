<script lang="ts">
    import Icon from '@iconify/svelte'

    import type {
        HumidifierEndpoint,
        HumidityMeasurerSensorEndpoint
    } from "$lib/devices/endpoints"

    export let humidifier: HumidifierEndpoint
    export let humiditySensor: HumidityMeasurerSensorEndpoint

    function onUpClick() {
        humiditySensor.target += .01
    }

    function onDownClick() {
        humiditySensor.target -= .01
    }
</script>


<div id="outer" class="card">
    <h2>Humidity</h2>
    <div id="target">
        <div class="icon" on:click={onUpClick}>
            <Icon icon="mdi-light:chevron-up" height="100%"/>
        </div>
        <h2>{humiditySensor.target*100}%</h2>
        <div class="icon" on:click={onDownClick}>
            <Icon icon="mdi-light:chevron-down" height="100%"/>
        </div>
    </div>
    <div id="bottom">
        <div id="current">
            <span>Current: {humiditySensor.current*100}%</span>
        </div>
    </div>
</div>


<style lang="scss">
    @import "/src/styles/card.scss";
    @import "./environment.scss";
</style>
