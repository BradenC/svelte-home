<div id="outer">
    <header>
        <nav>
            <div id="left">
                <a href="/">
                    Home Automation
                </a>
            </div>
            <div id="right">
                <a href="/unit-controller/areas" id="areas">Areas</a>
                <a href="/unit-controller/account" id="areas">Account</a>
            </div>
        </nav>
    </header>

    <div id="slot">
        <slot></slot>
    </div>
</div>


<style lang="scss">
    @import "/src/styles/globals.scss";
    
    $headerHeight: 5rem;
    $navPadding: 1rem;

    #outer {
        height: 100vh;

        #slot {
            height: calc(100vh - $headerHeight);
	        background-color: $bg1;
        }

        header {
            background-color: $bannerColor;

            nav {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;

                height: $headerHeight;

                #left {
                    padding: $navPadding;

                    a:hover {
                        background-color: transparent;
                    }

                    a {
                        font-size: 2.5rem;
                        font-weight: 700;
                        color: $logoColor;
                    }
                }

                #right {
                    padding-right: $navPadding - $clickPadding;

                    a {
                        font-size: 1.25rem;
                        color: $text5;
                    }
                }
            }
        }
    }
</style>
