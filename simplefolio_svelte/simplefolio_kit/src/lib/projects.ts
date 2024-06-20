import { getDatabase, ref, get, set} from "firebase/database";
import {embedIntoData, getFirstEmbedInText, getApp} from "./projectLogic"

// import { title } from "process";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
let app = getApp()
let db = getDatabase(app)
interface Project {
    "ctime": number,
    "mtime": number,
    "title": string,
    "text": string,
    "imgs": string[]
    "tags"?: string[]
}

interface ProjectsType {
    "text": Project[]
    "images": any
}

async function getProjects(): Promise<ProjectsType> {
    if (window.sessionStorage.getItem("projectsFormatted") != null) {
        return (JSON.parse(window.sessionStorage.getItem("projectsFormatted")!) as ProjectsType)!
    } 
    let refer = ref(db, "/data")
    let text = (await get(refer)).val()
    let images =(await  get(ref(db, "/images"))).val()
    let a = {
        "text":text,
        "images": images
    }
    window.sessionStorage.setItem("projectsFormatted",JSON.stringify(a))
    return a
}
interface Settings {
    projectsEnabled:boolean,
    funEnabled: boolean,
    researchEnabled:boolean
}
// export async function putProjectsIn(settings: Settings) {

    
//     let currentProjs = document.querySelector("#projects-grid")!
//     let projTemplate = document.querySelector("#project-instance-template")
//     currentProjs = (currentProjs.cloneNode() as HTMLElement)
//     let copy = projTemplate.cloneNode(true)
//     copy.style = ""
//     copy.id = "project-instance"
//     console.log(copy)
 
//     // projTemplate.remove()
//     let time1 = Date.now()
//     // console.log("getting project")
//     let projects = await getProjects()
//     // console.log("Time: " + (Date.now() - time1)/1000)
//     let maxIndex = projects.text.length -1
//     projects.text = projects.text.reverse()
//     console.log(projects)
//     let projParent = currentProjs
//     function onProjectClicked(e: Event){
//         //@ts-ignore shut yo whining
//         let id = (e.target as HTMLElement).parentNode?.querySelector(".data").innerText
//         window.location.href = "/project?id=" + id
    
//     }
//     if (projParent != null) {
//         let i = 0
//         for (const proj of projects.text) {
//             // if a proj does not have a tag, it is assumed to be in the fun catagory
          

//             let newProj = copy.cloneNode(true)
//             let dataEl = document.createElement("p")
//             dataEl.style = "display: none;"
//             dataEl.innerText = (maxIndex-i).toString()
//             dataEl.classList = "data"
//             newProj.appendChild(dataEl)
            
//             let titleEl = (newProj as HTMLElement).querySelector("#proj-title")
            
//             let imgEl = (newProj as HTMLElement).querySelector("#thumbnailProj")
//             //@ts-ignore
//             imgEl.src = dataForEmbeded //heheh this is such a hack, using base64 instead of a url to resolve an img >:)
//             console.log(titleEl)
//             //@ts-ignore
//             titleEl.innerText = proj.title
//             newProj.addEventListener("click", onProjectClicked)
//             projParent?.appendChild(newProj)
            
            
//             i++;
//         }
//     }
//     console.log(projParent)
//     document.querySelector("#projects-grid")?.replaceWith(projParent)
// }

export default getProjects