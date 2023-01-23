<script lang="ts">
    import Icon from "@iconify/svelte"

    import type { CameraEndpoint } from "$lib/devices/endpoints"

    export let camera: CameraEndpoint

    function onCameraClick() {
        camera.onOff.toggle()
        camera = camera
    }
</script>


<div id="outer" class="card">
    <h2>{camera.device?.name}</h2>
    <div class="main icon" on:click={onCameraClick}>
        {#if camera.onOff?.isOn}
        <Icon icon="mdi:security-camera" height="100%"/>
        {:else}
        <Icon icon="mdi:security-camera-off" height="100%"/>
        {/if}
    </div>
    <div id="device-arrow" class="icon">
        <Icon icon="material-symbols:arrow-right-alt" height="4em"/>
    </div>
</div>


<style lang="scss">
    @import "/src/styles/globals.scss";
</style>
