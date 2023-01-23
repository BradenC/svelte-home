<script lang="ts">
	import { getContext } from "svelte"

    import Icon from "@iconify/svelte"

	import type { NameAndId } from "$lib/types/generic";
    import type { Device } from "$lib/devices/devices/device"
	import { areaPageDataKey } from "$lib/symbols"
	import type { AreaPageData } from "../+page"
    import { type DevicesTabNavigationState, DeviceSubtab } from "../tab-navigation"
    import Commands from "./commands/commands.svelte"
    import DeviceCard from "./device-card.svelte"
    import Metadata from "./metadata/metadata.svelte"
    import Power from "./power/power.svelte"
    import State from "./state/state.svelte"
    import Notifications from "./notifications/notifications.svelte"
    import Permissions from "./permissions/permissions.svelte"

    const data: AreaPageData = getContext(areaPageDataKey)
    const devices: Device[] = data.devices
    const groups: NameAndId[] = data.groups

    export let deviceSubtabNavigation: DevicesTabNavigationState

    $: selectedSubtab = deviceSubtabNavigation.subtab
    $: selectedDevice = devices.find(d => d.id === deviceSubtabNavigation.deviceId)

    let groupToShow: NameAndId = groups[0]

    $: visibleDevices = devices.filter(d => groupToShow.name === "All" || d.groups.includes(groupToShow.id))

    let menuOption: "base" | "add" | "filter" = "base"

    function onSubtabClick(_subtab: DeviceSubtab) {
        deviceSubtabNavigation.subtab = _subtab
    }

    function onDeviceClick(_device: Device) {
        deviceSubtabNavigation.deviceId = _device.id
    }

    function onBackClick() {
        deviceSubtabNavigation.deviceId = undefined
    }

    function onAddClick() {
        menuOption = menuOption === "add" ? "base" : "add"
    }

    function onAddFromAreaClick() {
        alert("Not implemented")
    }

    function onAddNewClick() {
        alert("Not implemented")
    }

    function onFilterClick() {
        menuOption = menuOption === "filter" ? "base" : "filter"
    }

    function onSelectAllClick() {
        alert("Not implemented")
    }

    function onDeselectAllClick() {
        alert("Not implemented")
    }

    function onSaveAsGroupClick() {
        alert("Not implemented")
    }
</script>


<div id="outer">
    <div id="devices" hidden={!!selectedDevice}>
        <div id="top">
            <div id="num-devices">
                {visibleDevices.length} device{devices.length === 1 ? "" : "s"}
            </div>
            <div id="options">
                <div id="option-details">
                    {#if menuOption==="add"}
                    <div id="add">
                        <button id="add-new" class="button" on:click={onAddNewClick}>Add new device</button>
                        <button id="add-from-area" class="button" on:click={onAddFromAreaClick}>
                            Add device from
                            <select on:click|stopPropagation>
                                <option value="foo">Foo</option>
                                <option value="bar">Bar</option>
                                <option value="baz">Baz</option>
                            </select>
                        </button>
                    </div>
                    {:else if menuOption==="filter"}
                    <div id="filter">
                        <div id="show-group">
                            Show
                            <select name="" id="" on:click|stopPropagation bind:value={groupToShow}>
                                {#each groups as deviceGroup}
                                <option value={deviceGroup}>{deviceGroup.name}</option>
                                {/each}
                            </select>
                        </div>
                        <div id="selection">
                            <div id="all">
                                <!-- <div class="button" on:click={onSelectAllClick}>Select all</div>
                                <div class="button" on:click={onDeselectAllClick}>Deselect all</div> -->
                                <button on:click={onSelectAllClick}>Select all</button>
                                <button on:click={onDeselectAllClick}>Deselect all</button>
                            </div>
                            <button id="save-group" on:click={onSaveAsGroupClick}>Save selection as group</button>
                        </div>
                    </div>
                    {/if}
                </div>
                <div id="icons">
                    <div id="add" class="icon" class:selected={menuOption==="add"} on:click={onAddClick}>
                        <Icon icon="mdi-light:plus" height="100%"/>
                    </div>
                    <div id="filter" class="icon" class:selected={menuOption==="filter"} on:click={onFilterClick}>
                        <Icon icon="mdi-light:menu" height="100%"/>
                    </div>
                </div>
            </div>
        </div>
        <div id="bottom">
            <div id="device-list">
                {#each visibleDevices as visibleDevice}
                <DeviceCard device={visibleDevice} on:click={() => onDeviceClick(visibleDevice)}/>
                {/each}
            </div>
        </div>
    </div>
    <div id="device-wrapper" hidden={!selectedDevice}>
        <div id="device">
            <div id="left">
                <nav>
                    <button
                      on:click={onBackClick}>Back to device list</button>
                    <button
                      class:selected="{selectedSubtab === DeviceSubtab.State}"
                      on:click={() => onSubtabClick(DeviceSubtab.State)}>{DeviceSubtab.State}</button>
                    <button
                      class:selected="{selectedSubtab === DeviceSubtab.Commands}"
                      on:click={() => onSubtabClick(DeviceSubtab.Commands)}>{DeviceSubtab.Commands}</button>
                    <button
                      class:selected="{selectedSubtab === DeviceSubtab.Power}"
                      on:click={() => onSubtabClick(DeviceSubtab.Power)}>{DeviceSubtab.Power}</button>
                    <button
                      class:selected="{selectedSubtab === DeviceSubtab.Metadata}"
                      on:click={() => onSubtabClick(DeviceSubtab.Metadata)}>{DeviceSubtab.Metadata}</button>
                    <button
                      class:selected="{selectedSubtab === DeviceSubtab.Notifications}"
                      on:click={() => onSubtabClick(DeviceSubtab.Notifications)}>{DeviceSubtab.Notifications}</button>
                    <button
                      class:selected="{selectedSubtab === DeviceSubtab.Permissions}"
                      on:click={() => onSubtabClick(DeviceSubtab.Permissions)}>{DeviceSubtab.Permissions}</button>
                </nav>
            </div>
            <div id="right">
                <div hidden={selectedSubtab !== DeviceSubtab.State}>
                    <State/>
                </div>
                <div hidden={selectedSubtab !== DeviceSubtab.Commands}>
                    <Commands/>
                </div>
                <div hidden={selectedSubtab !== DeviceSubtab.Power}>
                    <Power/>
                </div>
                <div hidden={selectedSubtab !== DeviceSubtab.Metadata}>
                    <Metadata/>
                </div>
                <div hidden={selectedSubtab !== DeviceSubtab.Notifications}>
                    <Notifications/>
                </div>
                <div hidden={selectedSubtab !== DeviceSubtab.Permissions}>
                    <Permissions/>
                </div>
            </div>
        </div>
    </div>
</div>


<style lang="scss">
    @import "/src/styles/globals.scss";

    #outer {
        display: flex;
        flex-direction: row;

        height: 100%;
        width: 100%;

        #devices {
            $topHeight: 5rem;

            width: 100%;

            padding: 1rem;

            #top {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                height: $topHeight;
                width: 100%;
                
                #num-devices {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    height: 100%;
                    width: 22rem;

                    white-space: nowrap;

                    margin: .20rem 1rem 0 0;

                    font-size: 2em;
                    font-weight: bold;
                    color: $text2;
                }

                #options {
                    display: flex;
                    flex-direction: row;

                    color: $text2;

                    width: 100%;

                    margin-left: 1em;

                    #option-details {
                        display: flex;
                        flex-direction: row;
                        align-items: start;

                        height: 100%;
                        width: 100%;

                        select {
                            font-size: 1rem;
                            color: $text3;

                            background-color: $bg2;
                            border: none;

                            padding: 0;
                            margin-left: .25rem;
                        }

                        .button:hover {
                            background-color: $bg5;
                        }

                        #add {
                            display: flex;
                            flex-direction: row;
                            justify-content: flex-end;
                            align-items: center;

                            width: 100%;
                        }

                        #filter {
                            display: flex;
                            flex-direction: row;
                            justify-content: end;
                            width: 100%;

                            #show-group {
                                padding: .5rem;
                            }

                            #selection {
                                display: flex;
                                flex-direction: column;
                                align-items: flex-end;

                                margin-left: 1rem;

                                #all {
                                    display: flex;
                                    flex-direction: row;
                                }

                                #save-group:hover {
                                    background-color: $bg5;
                                }
                            }
                        }
                    }

                    #icons {
                        display: flex;
                        flex-direction: row;

                        .icon {
                            height: 2.5rem;

                            margin-left: 1rem;
                            padding: .25rem;

                            cursor: pointer;
                        }

                        .icon.selected {
                            background-color: $bg5;
                        }

                        .icon:hover {
                            background-color: $bg5;
                        }
                    }

                }
            }

            #bottom {
                max-height: calc(100% - $topHeight);
                width: 100%;
                margin-right: 1.5rem;

                overflow-y: auto;

                #device-list {                    
                    $gap: 2rem;

                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: $gap;

                    width: fit-content;

                    margin-top: 2rem;
                }
            }
        }

        #device-wrapper {
            #device {
                display: flex;
                flex-direction: row;

                height: 100%;
                width: 100%;

                #left {
                    display: flex;
                    flex-direction: column;

                    height: 100%;

                    padding: 2rem 0 2rem 0;

                    nav {
                        display: flex;
                        flex-direction: column;

                        height: 100%;

                        padding: 0 1.5rem 0 1.5rem;

                        border-radius: 0;
                        border-right: 1px solid $bg4;

                        button {
                            text-align: start;
                            font-size: 1.25rem;
                            color: $text4;
                            text-decoration: none;

                            margin-bottom: 1rem;
                            padding: .5rem;

                            text-transform: capitalize;
                        }
                    }
                }

                #right {
                    margin: 2rem;
                    max-height: 90%;
                }
            }
        }
    }
</style>
