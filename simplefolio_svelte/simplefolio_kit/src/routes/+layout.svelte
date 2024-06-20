<script lang="ts">
    import "../app.pcss";
    import "../styles.scss"
    import { ModeWatcher, mode } from "mode-watcher";
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    import "highlight.js/styles/arta.css"
    let newStyle
    async function doModeStuff() {
      
        toggleMode()
    }
    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";
</script>

<div id="mode-switcher">
    <Button on:click="{doModeStuff}" variant="outline" size="icon">
        <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"></Sun>
        <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"></Moon>
        <span class="sr-only">Toggle theme</span>
      </Button>
</div>
<slot></slot>

<style>
    #mode-switcher {
        width: fit-content;
        height: fit-content;
        /* background-color: blue; */
        position: absolute;
    }
</style>