<script lang="ts">
    import { getContext } from "svelte"
	import type { Writable } from "svelte/store"

	import { mLightKey } from "$lib/symbols"
	import type { ColorLightEndpoint } from "$lib/devices/endpoints"
    import type { MLight } from "./mLight"

    let mLightStore: Writable<MLight> = getContext(mLightKey)

    // We are either given a real light, or are we are the main light controller
    export let light: ColorLightEndpoint | undefined = undefined
    const _light: ColorLightEndpoint = light || ($mLightStore).colorLight
    const main: boolean = light == undefined

    let grouped: boolean = false
    $: deviceName =
        main
      ? `${$mLightStore.numLightsInGroup} Light${$mLightStore.numLightsInGroup == 1 ? "" : "s"}`
      : _light.device.name

    function sync() {
        _light.colorControl.saturation = $mLightStore.colorLight.colorControl.saturation
        _light.colorControl.hue = $mLightStore.colorLight.colorControl.hue
        _light.levelControl.level = $mLightStore.colorLight.levelControl.level
        _light.onOff.isOn = $mLightStore.colorLight.onOff.isOn
    }

    // If mLight changed and we're part of the group, update our state
    $: if ($mLightStore && grouped) {
        sync()
    }

    // If a property changed on mLight, send an update to all subscribers
    $: if (_light && main) {
        $mLightStore = $mLightStore
    }

    function onOnOffClick() {
        grouped = false
        _light.onOff.toggle()
        _light.onOff = _light.onOff
    }

    function onGroupClick() {
        if (grouped) {
            $mLightStore.numLightsInGroup -= 1
            grouped = false
        }
        else {
            $mLightStore.numLightsInGroup += 1
            grouped = true
        }
    }

    function onChange() {
        grouped = false
    }
</script>


<div id="outer">
    <div id="top">
        <div id="on-off" class:main class:on={_light.onOff.isOn}
          on:click={onOnOffClick}
          style="--color: hsl({_light.colorControl.hue} {_light.colorControl.saturation}% {_light.levelControl.level*100/254}%)">
        </div>
        <div id="name" class:main>
            <h2>{deviceName}</h2>
        </div>
    </div>
    <div id="content">
        <div class="slider-container">
            <input type="range" min="0" max="254"
              id="level" class:main
              bind:value={_light.levelControl.level}
              on:change={onChange}
              style="background: linear-gradient(90deg,
              hsl({_light.colorControl.hue} {_light.colorControl.saturation}% 0%),
              hsl({_light.colorControl.hue} {_light.colorControl.saturation}% 50%),
              hsl({_light.colorControl.hue} {_light.colorControl.saturation}% 100%);">
        </div>
        <div class="slider-container">
            <input type="range" min="0" max="360"
              id="hue" class:main
              bind:value={_light.colorControl.hue}
              on:change={onChange}
              style="background: linear-gradient(90deg,
              hsl(0 {_light.colorControl.saturation}% {_light.levelControl.level*100/254}%),
              hsl(60 {_light.colorControl.saturation}% {_light.levelControl.level*100/254}%),
              hsl(120 {_light.colorControl.saturation}% {_light.levelControl.level*100/254}%),
              hsl(180 {_light.colorControl.saturation}% {_light.levelControl.level*100/254}%),
              hsl(240 {_light.colorControl.saturation}% {_light.levelControl.level*100/254}%),
              hsl(300 {_light.colorControl.saturation}% {_light.levelControl.level*100/254}%),
              hsl(360 {_light.colorControl.saturation}% {_light.levelControl.level*100/254}%));">
        </div>
        <div class="slider-container">
            <input type="range" min="0" max="100"
              id="saturation" class:main
              bind:value={_light.colorControl.saturation}
              on:mousedown={onChange}
              style="background: linear-gradient(90deg,
              hsl({_light.colorControl.hue} 100% {_light.levelControl.level*100/254}%),
              hsl({_light.colorControl.hue} 0% {_light.levelControl.level*100/254}%));">
            {#if !main}
            <div id="group" on:click={onGroupClick} class:grouped class:main></div>
            {/if}
        </div>
    </div>
</div>


<style lang="scss">
    @import "/src/styles/globals.scss";

    $length-level-main: 28em;
    $length-hue-main: 26em;
    $length-saturation-main: 24em;

    $length-level: 12em;
    $length-hue: 9em;
    $length-saturation: 7em;

    #outer {
        display: flex;
        flex-direction: column;

        #top {
            display: flex;
            flex-direction: row;
            align-items: center;

            #on-off {
                display: flex;
                justify-content: center;

                border-radius: 4px;
                background-color: $bg1;

                cursor: pointer;
            }

            #on-off.main {
                $on-off-size: 2em;

                min-height: $on-off-size;
                min-width: $on-off-size;
            }

            #on-off:not(.main) {
                $on-off-size: 1em;

                min-height: $on-off-size;
                min-width: $on-off-size;
            }

            #on-off.on {
                border: none;
                box-shadow: 0 0 .5em var(--color);
                background-color: var(--color);
            }

            #on-off:not(.on) {
                border: 1px solid var(--color);
                background-color: $bg1;
            }

            #name.main {
                font-size: 2em;
                margin-left: .5em;
                width: calc(100% - 1em - .5em);

                h2 {
                    height: 1.5em;
                }
            }

            #name:not(.main) {
                font-size: .5em;
                margin-left: .75em;
                width: calc(100% - 2em - .75em);

                h2 {
                    height: 3em;
                }
            }

            #name {
                h2 {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    color: $text8;

                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }

        #content {
            display: flex;
            flex-direction: row;
            align-items: flex-start;

            margin-top: .5em;

            .slider-container {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;

                width: 100%;

                input[type=range] {
                    appearance: none;

                    position: absolute;

                    height: 2px;

                    border-radius: 15px;
                }

                input[type=range].main {
                    margin-top: calc($length-level-main / 2 + 1em);
                }

                input[type=range]:not(.main) {
                    margin-top: calc($length-level / 2);
                }

                #level.main {
                    width: $length-level-main;
                    transform: translate(0, 0) rotate(270deg);
                }

                #level:not(.main) {
                    width: $length-level;
                    transform: translate(0, 0) rotate(270deg);
                }

                #hue.main {
                    width: $length-hue-main;
                    transform: translate(0, calc(($length-hue-main - $length-level-main) / 2)) rotate(270deg);
                }

                #hue:not(main) {
                    width: $length-hue;
                    transform: translate(0, calc(($length-hue - $length-level) / 2)) rotate(270deg);
                }

                #saturation {
                    direction: rtl;
                }

                #saturation.main {
                    width: $length-saturation-main;
                    transform: translate(0, calc(($length-saturation-main - $length-level-main) / 2)) rotate(270deg);
                }

                #saturation:not(.main) {
                    width: $length-saturation;
                    transform: translate(0, calc(($length-saturation - $length-level) / 2)) rotate(270deg);
                }

                input[type=range]::-webkit-slider-thumb {
                    appearance: none;

                    height: 15px;
                    width: 35px;
                    bottom: 1px;

                    background-color: $bg1;
                    border-radius: 5px;
                    border: 2px solid $text8;

                    cursor: grab;

                    transition: border 1000ms ease;
                }

                input[type=range].main::-webkit-slider-thumb {
                    height: 20px;
                    width: 50px;
                }

                #group {
                    position: relative;

                    $group-button-size: 1em;

                    top: $length-saturation + $group-button-size - .5em;

                    height: $group-button-size;
                    width: $group-button-size;

                    border-radius: 3px;
                    border: 1px solid $text8;

                    background-color: transparent;

                    cursor: pointer;
                }

                #group.grouped {
                    background-color: $text8;
                }
            }
        }
    }
</style>
