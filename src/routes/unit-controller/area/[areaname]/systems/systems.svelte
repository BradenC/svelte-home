<script lang="ts">
    import Lighting from "./lighting/lighting.svelte"
    import Environment from "./environment/environment.svelte"
    import Security from "./security/security.svelte"

    import { type SystemsTabNavigationState, SystemsSubtab } from "../tab-navigation"

    export let systemSubtabNavigation: SystemsTabNavigationState

    function onSubtabClick(subtab: SystemsSubtab) {
        systemSubtabNavigation.subtab = subtab
    }
</script>


<div id="outer">
    <div id="left">
        <nav>
            <button
              class:selected="{systemSubtabNavigation.subtab === SystemsSubtab.Lighting}"
              on:click={() => onSubtabClick(SystemsSubtab.Lighting)}>{SystemsSubtab.Lighting}</button>
            <button
              class:selected="{systemSubtabNavigation.subtab === SystemsSubtab.Environment}"
              on:click={() => onSubtabClick(SystemsSubtab.Environment)}>{SystemsSubtab.Environment}</button>
            <button
              class:selected="{systemSubtabNavigation.subtab === SystemsSubtab.Security}"
              on:click={() => onSubtabClick(SystemsSubtab.Security)}>{SystemsSubtab.Security}</button>
        </nav>
    </div>
    <div id="right">        
        <div hidden={systemSubtabNavigation.subtab !== SystemsSubtab.Lighting}>
            <Lighting/>
        </div>
        <div hidden={systemSubtabNavigation.subtab !== SystemsSubtab.Environment}>
            <Environment/>
        </div>
        <div hidden={systemSubtabNavigation.subtab !== SystemsSubtab.Security}>
            <Security/>
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
            position: relative;

            margin: 2rem;
            height: calc(100% - 3.5rem);

            overflow-y: hidden;
        }

        #right::-webkit-scrollbar {
                height: .5rem;
        }

        #right::-webkit-scrollbar-thumb {
            background-color: $text8;
            border-radius: 1rem;
        }
    }
</style>
