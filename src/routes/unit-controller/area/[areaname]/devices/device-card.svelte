<script lang="ts">
    import Icon from "@iconify/svelte"

    import type { Device } from "$lib/devices/devices/device"

    export let device: Device

    // The real devices have an enum for various things they can be plugged into
    // So, leave this as a switch, even tho it looks weird on a boolean
    function getPlugIconName(isPluggedIn: boolean): string {
        switch (isPluggedIn) {
            case (true):
                return "material-symbols:power-plug"
            case (false):
             
            return "material-symbols:power-plug-off"
        }
    }

    function getBatteryIconName(percent: number): string {
        if (percent < 10)
            return "material-symbols:battery-horiz-000-rounded"
        else if (percent < 25)
            return "material-symbols:battery-low"
        else if (percent < 50)
            return "material-symbols:battery-horiz-050-rounded"
        else if (percent < 75)
            return "material-symbols:battery-horiz-075-rounded"
        else
            return "material-symbols:battery-full-alt"
    }

    function getPowerIconName(device: Device): string | undefined {
        switch (device.metadata.basic.powerType) {
            case ("main"):
                return getPlugIconName(device.metadata.basic.isPluggedIn!)
            case ("battery"):
                return getBatteryIconName(device.metadata.basic.batteryPercent!)
        }
    }
</script>


<div id="outer" on:click>
    <div id="icon">
        <Icon icon="material-symbols:question-mark-rounded" height="100%"/>
    </div>
    <div id="content">
        <div id="top">
            <span id="name">{device.name}</span>
            <div id="power">
                <Icon icon={getPowerIconName(device)} height="100%"/>
            </div>
        </div>
        <div id="bottom">
            <span id="summary">{device.summary}</span>
        </div>
    </div>
</div>


<style lang="scss">
    @import "/src/styles/globals.scss";

    #outer:hover {
        background-color: $bg5;
    }

    #outer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        height: 9rem;
        width: 24rem;
        padding: .5rem 1.5rem .5rem 1.5rem;

        border-radius: 1rem;
        background-color: $bg3;

        #icon {
            height: 100%;
            width: 3rem;

            margin-right: 1.5rem;
        }

        #content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            height: 100%;
            width: 100%;

            cursor: pointer;

            #top {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                height: 50%;

                #name {
                    font-size: 1.5rem;
                    color: $text3;
                }

                #power {
                    height: 3rem;
                }
            }

            #bottom {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                height: 50%;

                #summary {
                    font-size: 1rem;
                    color: $text5;
                }
            }
        }
    }
</style>
