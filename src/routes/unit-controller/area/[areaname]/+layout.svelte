<script lang="ts">
    import type { LayoutData } from "./$types"
    import { type AreaTabNavigationState, AreaTab } from "./tab-navigation"

    export let data: LayoutData
    let areaTabNavigationState: AreaTabNavigationState = data.areaTabNavigationState

    function onTabClick(tab: AreaTab) {
        areaTabNavigationState.tab = tab
    }
</script>


<div id="outer">
    <div id="bar">
        <h1>{data.areaName}</h1>
        <nav>
            {#each Object.values(AreaTab) as tabName}
            <button class:selected="{areaTabNavigationState.tab === tabName}"
              on:click={() => onTabClick(tabName)}>{tabName}</button>
            {/each}
        </nav>
    </div>

    <div id="slot">
        <slot></slot>
    </div>
</div>


<style lang="scss">
    @import "/src/styles/globals.scss";

    $barHeight: 5rem;

    #outer {
        display: flex;
        flex-direction: column;

        height: 100%;

        #bar {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;

            width: 100%;
            height: $barHeight;

            padding: 0 1.25rem .5rem 1.25rem;

            background-color: $bannerColor;

            border-radius: 0;
            border-bottom: solid 1px $bg6;

            h1 {
                font-size: 3rem;
            }

            nav {
                display: flex;
                flex-direction: row;

                button {
                    font-size: 1.25rem;
                    color: $text3;

                    padding: .5rem;
                    margin-left: .25rem;

                    text-transform: capitalize;
                }
            }
        }

        #slot {
            height: calc(100% - $barHeight)
        }
    }
</style>
