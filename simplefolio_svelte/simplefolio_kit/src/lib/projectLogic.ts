// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase, ref, set, get, Database} from "firebase/database"
import { onMount } from "svelte";
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

let db: Database
let analytics
let app: FirebaseApp

    console.log("window loaded")
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    db = getDatabase(app)

  // Initialize Firebase
export function getApp() {
    return app
}
export async function getProjects(data:any) {
    let dbLoc
    if (window.sessionStorage.getItem("projects") != null && window.sessionStorage.getItem("projects") != undefined) {
        console.log("getting projects from sessionstorage")
        dbLoc = JSON.parse(window.sessionStorage.getItem("projects")!)
        console.log(window.sessionStorage.getItem("projects"))
    } else {
        dbLoc =  await (await get(ref(db, "/data"))).val()
        console.log("getting from database")
        console.log(dbLoc)
        window.sessionStorage.setItem("projects", JSON.stringify(dbLoc))
    }
    console.log(dbLoc)
    return dbLoc
}
export async function getProject(numericId:number) {
    let dbLoc
    if (window.sessionStorage.getItem("projects") != undefined) {
        dbLoc = JSON.parse(window.sessionStorage.getItem("projects")!)
    } else {
        dbLoc =  await (await get(ref(db, "/data"))).val()
        window.sessionStorage.setItem("projects", JSON.stringify(dbLoc))
    }
    let fullData = dbLoc
    let thisProj = fullData[numericId]
    return thisProj
}
export function getFirstEmbedInText(text:string) {
    let expression = text.match(/!\[\[.*\]\]/)
    if (expression == null) {
        return
    }
    return expression[0].replace("![[", "").replace("]]", "")
}
export function getAllEmbedsInText(text:string) {
    let expressions = [...text.matchAll(/!\[\[.*\]\]/gm)]
    let result = expressions.map((exp) => {
        if (exp == null) {
            return
        }
        return exp[0].replace("![[", "").replace("]]", "")
    })
    return result
}
export async function embedIntoData(embed:string) {
    let savedImg = ref(db, `/images/${btoa(embed)}`) 
    let imgData = await (await get(savedImg)).val()
    return imgData
}