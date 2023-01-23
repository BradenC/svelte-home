<script lang="ts">
    import Icon from "@iconify/svelte"

    import type { LockEndpoint } from "$lib/devices/endpoints"

    export let lock: LockEndpoint

    function onLockClick() {
        lock.lock.toggle()
        lock.lock = lock.lock
    }
</script>


<div id="outer" class="card">
    <h2>{lock.device?.name}</h2>
    <div class="main icon" on:click={onLockClick}>
        {#if lock.lock.isLocked}
        <Icon icon="material-symbols:lock" height="100%"/>
        {:else}
        <Icon icon="material-symbols:lock-open" height="100%"/>
        {/if}
    </div>
</div>


<style lang="scss">
    @import "/src/styles/card.scss";
</style>
