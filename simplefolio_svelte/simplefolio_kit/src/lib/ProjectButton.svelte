<script lang="ts">
    export let name:string
    export let img:string
    export let index:string
    export let tags: string[]
    export let ctime: string
    import moment from "moment"
    function clickedOnArticle() {
        window.location.href="/project?id="+index
    }
    
   

</script>

<div id="project-instance" on:click={clickedOnArticle} class="fadeIn">
    <img id="thumbnailProj" src={img}/>    
    <p id="proj-title">{name}</p>
    <p id="datetext">{moment.unix(parseInt(ctime)/1000).fromNow()}</p>
    <!-- {parseInt(ctime)} -->
    {#each tags as tag}
        <div id={tag + "-label"} class="thing-label">
            <p>{tag}</p>
        </div>
    {/each}
  </div>


