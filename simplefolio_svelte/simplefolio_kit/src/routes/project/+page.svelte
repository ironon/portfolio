<script lang="ts">
    
    
    import {marked, Marked} from "marked"
    import { markedHighlight } from "marked-highlight";
    // import admonition from 'marked-admonition-extension';
    import markedKatex from "marked-katex-extension"
    import 'marked-admonition-extension/dist/index.css'
    import hljs from 'highlight.js'
    import {getDarkMode} from "$lib/colorMode.js"
    import {page } from '$app/stores';
    // import {getApp} from "../../lib/projectLogic"
    import { getApp,embedIntoData, getAllEmbedsInText,getProject } from "../../lib/projectLogic.js";
    import { onMount } from "svelte";
    import moment from "moment";
    
   
    // import { getApp } from "../../lib/projectLogic.js";
    let a_embdedIntoData:any;
    let a_getAllEmbedsInText:any;
    //@ts-nocheck
    const firebaseConfig = {
        apiKey: "AIzaSyDoQmX191KFVmno9kvVjxQ2R5IMH2LnV_8",
        authDomain: "portfolio-b5e43.firebaseapp.com",
        databaseURL: "https://portfolio-b5e43-default-rtdb.firebaseio.com",
        projectId: "portfolio-b5e43",
        storageBucket: "portfolio-b5e43.appspot.com",
        messagingSenderId: "675815494829",
        appId: "1:675815494829:web:48763f462e5f60a7d86224",
        measurementId: "G-QB7P796EVL"
    };
    let a_initializeApp
    let a_getDatabase
    let a_ref
    let a_get
    let proj
    // marked.use(markedKatex({throwOnError:false}))
    onMount(async () => {
        // let { embedIntoData, getAllEmbedsInText, getProject } = await import("../../lib/projectLogic.js")
        let {initializeApp} = await import("firebase/app")
        let {getDatabase, ref, get} = await import("firebase/database");
       
        a_embdedIntoData = embedIntoData
        a_getAllEmbedsInText = getAllEmbedsInText
        a_initializeApp = initializeApp
        a_ref = ref
        a_get = get
        app = getApp()
        db = getDatabase(app)

        
        proj = getProject(numericId)
    })
    const url = $page.url;
    let id = url.searchParams.get("id")
   
    // let id = window.location.
        // Initialize Firebase
    let app
    // let app = getApp()
    let db 
    let numericId:number = parseInt(id)
    // let thisProj: { text: any; }
    let projects = []
    
    async function replaceEmbeds(html:string) {
        let picNames = a_getAllEmbedsInText(html)
        let resultHTML = html
        let picNamesToData = {}
        //@ts-ignore shut
        for (const picName of picNames){
            let result = await a_embdedIntoData(picName)
        
            picNamesToData[picName] =result

        }
        //@ts-ignore
        Object.keys(picNamesToData).forEach((name:string) => {
            console.log(picNamesToData[name])
            //@ts-ignore
            resultHTML = resultHTML.replace("![["+name+"]]", `</p><div id="center-image"><img id="dynamicimage" src="${picNamesToData[name]}"/></div><label id="smalltext">click to enlarge</label><p>`)
        })
        return resultHTML

    }
</script>

<div id="proj-view">
    <div id="page-view">
       {#if proj}

       {#await proj}
           <!-- <p>loading..</p> -->
       {:then data}
            {#await new Marked(markedHighlight({
                langPrefix: 'hljs language-',
                highlight(code, lang, info) {
                  const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                  return hljs.highlight(code, { language }).value;
                }
              }),markedKatex({throwOnError:false})).parse(data.text)}

            {:then markdown}
            
            {#await replaceEmbeds(markdown)}
                <!-- <p>still loading...</p> -->
            {:then data2}
                <h1 id="centered">{data.title}</h1>
                <h3 id="centered">{moment.unix(data.ctime/1000).toLocaleString()}</h3>
                <!-- {data.ctime} -->
                <a id="centered" href="/">Back to home page</a>
                <!-- {markdown} -->
                {@html data2}
            {/await}

            {/await}
       {/await}
       {/if}
    </div>
</div>
<style scoped>
    #proj-view {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        background-color: azure;
        display: flex;
        justify-content: center;
    }
   
    #page-view {
        width: max(412px, 50%);
        display: flex;
        overflow-y: scroll;
        flex-direction: column;
        align-items:flex-start;
        border: 1px solid black;
        padding-left: 5rem;
        padding-right: 5rem;
        background: linear-gradient(#daf0f6, #e7f2f5);
        padding-bottom: 25rem;
    }
    #centered {
        width: 100%;
        text-align: center;
    }
    
</style>

