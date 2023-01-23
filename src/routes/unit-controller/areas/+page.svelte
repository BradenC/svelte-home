<script lang="ts">    
    import type { PageData } from './$types'

    export let data: PageData
    let areaGroups = data.areaGroups
</script>


<div id="outer">
    {#each areaGroups as areaGroup}
    <h3>{areaGroup.name}</h3>
    <ol>
        {#each areaGroup.areaNames as areaName}
        <li><div><a href="/unit-controller/area/{areaName}">{areaName}</a></div></li>
        {/each}
    </ol>
    {/each}
</div>


<style lang="scss">
    @import '/src/styles/globals.scss';

    #outer {
        height: 100%;

        margin: 0;
        padding: 1.5rem;

        overflow: auto;

        h1 {
            font-size: 5rem;
            margin-bottom: 1rem;
        }

        h3 {
            color: $text10;
            margin-bottom: 1rem;
        }


        ol {
            columns: 2;
            column-gap: 1.5rem;

            margin-bottom: .5rem;

            li {
                display: flex;
                break-inside: avoid;

                div:hover {
                    background-color: $bg4;
                }

                div {
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    background-color: $bg2;

                    height: 4rem;
                    width: 100%;

                    margin-bottom: 1rem;
                    border-radius: .5rem;
                    
                    a {
                        display: flex;
                        flex-direction: row;
                        align-items: center;

                        font-size: 1.5rem;
                        color: $text1;
                        text-decoration: inherit;

                        width: 100%;
                        height: 100%;

                        padding: 1rem;
                    }
                }
            }
        }
    }
</style>
