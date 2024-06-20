<script lang="ts">
    // import { onMount } from "svelte";
    // onMount(async () => {
    //   let a = import("./lib/start.js")
    //   let b = import("./lib/projects.js")
    import picofme from "../assets/okaypictureofme.jpg"
    import robot from "../assets/minaturerobot.png"
    import tuskytime from "../assets/tuskytime.png"
    import projectile from "../assets/compmode.png"
    import ProjectButton from "$lib/ProjectButton.svelte"
    import {onMount} from "svelte"
    import { getProjects, getFirstEmbedInText, embedIntoData } from "$lib/projectLogic.js";
    import noThumbnail from "../assets/noThumbnail.jpg"
    
    let savedS = localStorage.getItem("savedSettings")
    let projectsEnabled = true
    let researchEnabled = false
    let funEnabled = false

    if (savedS != null) {
      let ss = JSON.parse(savedS)
      projectsEnabled = ss.projectsEnabled
      researchEnabled = ss.researchEnabled
      funEnabled = ss.funEnabled
    }
    let containerClass = ""
    async function updateProjects(data:any) {
      let container = document.querySelector("#projects-grid-center")
      let containerHeight = container?.clientHeight
      container.style = "visibility:hidden; min-height: " + containerHeight + "px;"
      projects = []
      let temp_projects = await getProjects(data)
      
      let i = -1
      for (const proj of temp_projects) {
        i++;
        let embedName = getFirstEmbedInText(proj.text) // we are taking the first embed in the article and displaying it as a thumbnail
        let dataForEmbeded
        if (embedName == null) {
            dataForEmbeded = noThumbnail
        } else {
            dataForEmbeded  = await embedIntoData(embedName)
        }
     
        let tags = proj.tags
        // console.log("checking " + i)
     
        // console.log(tags.)
        console.log(tags)
        if (tags == undefined) {
            if (!funEnabled) {
                continue
            }
        }   
        else if (tags.includes("fun") && !funEnabled) {
          console.log("eliminating because clause 1")
            continue
        } else if (tags.includes("project") && !projectsEnabled) {
          console.log("eliminating because clause 2")
            continue
        } else if (tags.includes("research") && !researchEnabled) {
            console.log("eliminating because clause 3")
            continue
        }
        container = document.querySelector("#projects-grid-center")
        container.style = "visibility:hidden; min-height: " + containerHeight + "px;"
        // containerClass = "fadeIn"
        projects = [{
          "title": proj.title,
          "img": dataForEmbeded,
          "index": i,
          "tags": proj.tags,
          "ctime": proj.ctime
        },...projects]
        setTimeout(() => {
         
          container.style = ""
        }, 2)
      }
      // container.style = ""
      
    }
    let projects = []
    // let a_putProjectsIn
    onMount(async () => {
      let data = {projectsEnabled, researchEnabled, funEnabled}
      // let {getProjects} = await import("$lib/projectLogic.js")
    
      updateProjects(data)
    
      
    })
    async function settingsChanged() {
      let data = {projectsEnabled, researchEnabled, funEnabled}
      localStorage.setItem("savedSettings", JSON.stringify(data))
      updateProjects(data)
      setTimeout(()=> {
        if (projects.length == 0) {
          let container = document.querySelector("#projects-grid-center")
          container.style = ""
        }
      },500)
    }
    // import resume from "./assets/resume.pdf"
  
    // })
    import initScrollReveal from "../lib/scrollReveal.js";
    import initTiltEffect from "../lib/tiltAnimation.js";
    import { targetElements, defaultProps } from "../lib/scrollRevealConfig.js";
    // import { onMount } from "svelte";
    onMount(() => {

        initScrollReveal(targetElements, defaultProps);
        initTiltEffect();
    })
 
  </script>
  
  <!--
    Hello!
    -
    Simplefolio is a clean and responsive portfolio template for Developers!
    Created by Jacobo Martinez.
    -
    Github Repo: https://github.com/cobiwave/simplefolio/
    Readme: https://github.com/cobiwave/simplefolio/README.md
    -
    For business & inquires, contact me -> jacobojavier98@gmail.com
  -->
  
    
  
    <!-- Todo: read the following HTML Todos to create your stunning portfolio website -->
    <div id="wasbody">
      <div id="top"></div>
  
      <!-- **** Hero Section **** -->                               
      <section id="hero" class="jumbotron">
        <div class="container">
          <h1 class="hero-title load-hidden">
            Hi, my name is <span class="text-color-main">David Macpherson</span>
            <br />
            ...and I've made a lot of things.
          </h1>
          <div id="horizontal-row">
            <p class="hero-cta load-hidden">
              <a rel="noreferrer" class="cta-btn cta-btn--hero" href="#projects"
                >What things?</a
              >
            </p>
            <p class="hero-cta load-hidden">
              <a rel="noreferrer" class="cta-btn cta-btn--hero" href="#about"
                >Who am I?</a
              >
            </p>
            
          </div>
          
        </div>
      </section>
      <!-- /END Hero Section -->
   <!-- **** Projects Section **** -->
   <section id="projects">
    <div class="container">
      <div class="project-wrapper">
        <!-- <h2 class="section-title"></h2> -->
        <div id="settings">
          <input type="checkbox" name="project" bind:checked={projectsEnabled} on:change={settingsChanged}>
          <label for="project">Projects</label>
          <input type="checkbox" name="project" bind:checked={researchEnabled} on:change={settingsChanged}>
          <label for="project">Research</label>
          <input type="checkbox" name="project" bind:checked={funEnabled} on:change={settingsChanged}>
          <label for="project">Fun</label>
        </div>
        <div id="project-instance-template" style="display:none">
          <img id="thumbnailProj" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII="}/>
          <p id="proj-title"></p>
        </div>
        <div id="projects-grid-center">
          <div id="projects-grid" class={containerClass}>

            {#each projects as project}
              <ProjectButton name={project.title} img={project.img} index={project.index} tags={project.tags} ctime={project.ctime}/>
            {/each}
            

          </div>
          
        </div>
        <h2 class="section-title dark-blue-text">Highlights</h2>

        <!-- Notice: each .row is a project -->
        <div class="row">
          <div class="col-lg-4 col-sm-12">
            <div class="project-wrapper__text load-hidden">
              <h3 class="project-wrapper__text-title">Weekend 3D-printed Robot</h3>
              <div>
                <p class="mb-4">
                  In order to guarantee my admission into my school's local robotics team,
I prototyped, designed, 3d-printed, wired, and programmed a fully
functional miniature robot in the span of 2 days. Programmed it in C++, controlled via Bluetooth, designed all the parts in Fusion360, and printed on a Voron. I nicknamed it "MiniLoco", after the robotics team.
                </p>
              </div>
              <a
                rel="noreferrer"
                target="_blank"
                class="cta-btn cta-btn--hero"
                href="#!"
              >
                See Live
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                class="cta-btn text-color-main"
                href="#!"
              >
                Source Code
              </a>
            </div>
          </div>
          <div class="col-lg-8 col-sm-12">
            <div class="project-wrapper__image load-hidden">
              <a rel="noreferrer" href="#!" target="_blank">
                <div
                  data-tilt
                  data-tilt-max="4"
                  data-tilt-glare="true"
                  data-tilt-max-glare="0.5"
                  class="thumbnail rounded js-tilt"
                >
                  <img
                    alt="Project Image"
                    class="img-fluid"
                    src={robot}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <!-- /END Project -->

        <!-- Notice: each .row is a project -->
        <div class="row">
          <div class="col-lg-4 col-sm-12">
            <div class="project-wrapper__text load-hidden">
              <h3 class="project-wrapper__text-title">Projectile Motion Simulator</h3>
              <div>
                <p class="mb-4">
                  Created to make a lab in my physics course more efficent; this simulation was written using Euler's method to approximate all 100 kinematic derivatives of position at any angle, allowing
                  for absurdly granular control over the kinematics of the projectile. Created using Typescript and Svelte in the course of a night, I learned a lot about OOP principles & dynamic functionality doing this.
                </p>
              </div>
              <a
                rel="noreferrer"
                target="_blank"
                class="cta-btn cta-btn--hero"
                href="https://ironon.github.io/projectilemotionthingypleaseitssolateatnight/"
              >
                See Live
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                class="cta-btn text-color-main"
                href="https://github.com/ironon/projectile_motion_computational_model"
              >
                Source Code
              </a>
            </div>
          </div>
          <div class="col-lg-8 col-sm-12">
            <div class="project-wrapper__image load-hidden">
              <a rel="noreferrer" href="https://ironon.github.io/projectilemotionthingypleaseitssolateatnight/" target="_blank">
                <div
                  data-tilt
                  data-tilt-max="4"
                  data-tilt-glare="true"
                  data-tilt-max-glare="0.5"
                  class="thumbnail rounded js-tilt"
                >
                  <img
                    alt="Screenshot of Computational Model"
                    class="img-fluid"
                    src={projectile}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <!-- /END Project -->

        <!-- Notice: each .row is a project -->
        <div class="row">
          <div class="col-lg-4 col-sm-12">
            <div class="project-wrapper__text load-hidden">
              <h3 class="project-wrapper__text-title">School Scheduling Website</h3>
              <div>
                <p class="mb-4">
                  I created a website to solve a common scheduling problem at my school in which students did not know what their schedule was that day, as 
                  the school has a strange schedule that rotates very quickly. This website allows students to not have to worry about their schedule for that day,
                  and is currently used by 2,000+ students and teachers. Created using Astro and Typescript, and I used Python to process data needed to make the website.
                </p>
              </div>
              <a
                rel="noreferrer"
                target="_blank"
                class="cta-btn cta-btn--hero"
                href="https://tuskytime.org"
              >
                See Live
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                class="cta-btn text-color-main"
                href="https://github.com/ironon/tuskytime"
              >
                Source Code
              </a>
            </div>
          </div>
          <div class="col-lg-8 col-sm-12">
            <div class="project-wrapper__image load-hidden">
              <a rel="noreferrer" href="#!" target="_blank">
                <div
                  data-tilt
                  data-tilt-max="4"
                  data-tilt-glare="true"
                  data-tilt-max-glare="0.5"
                  class="thumbnail rounded js-tilt"
                >
                  <img
                    alt="Project Image"
                    class="img-fluid"
                    src={tuskytime}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <!-- /END Project -->
      </div>
    </div>
  </section>
  <!-- /END Projects Section -->
      <!-- **** About Section **** -->
      <section id="about">
        <div class="container">
          <h2 class="section-title load-hidden">About me</h2>
          <div class="row about-wrapper">
            <div class="col-md-6 col-sm-12">
              <div class="about-wrapper__image load-hidden">
                <img
                  alt="Profile Image"
                  class="img-fluid rounded shadow-lg"
                  height="auto"
                  width="300px"
                  src={picofme}
             
                />
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="about-wrapper__info load-hidden">
                <h2>Who am I?</h2>
                <p class="about-wrapper__info-text">
                  If I had to descibe myself briefly, I'd say I'm a sterotypical STEM nerd who
                 loves learning new things and solving challenges. I've been captivated by computer science & engineering since I
  was young, and that interest has since branched out into other areas. With both of my parents being computer scientists, and growing up in Northern Virginia in one of the most weathiest counties of America, I quickly learned
  that there are a lot of smart people in this world. If I wanted to join their ranks, I would need to be able to learn new concepts quickly, efficently, and thoroughly. After prioritizing learning over all else for years, I now have become
  skilled in various aspects of STEM, and I have every intention of continuing my learning.
                </p>
                <!-- <h2>Hobbies</h2> -->
                <!-- <p class="about-wrapper__info-text">
                  I'm don't think I could talk about my love for computer science without talking about gaming. Like many others, I love <i>Minecraft</i>, <i>Team Fortress 2</i>, <i>Portal 2</i>, and a lot of other games. I originally got into computer science through learning
                  to mod some of these games, and I still love gaming to this day. I'm very intriguted in the newly-developing 
                  personal knowledge management (PKM) space, I use <a href="https://obsidian.md">obsidian.md</a> for almost everything. As someone who has
                  completed almost every math course my schools have to offer, I can say I find the mathematics behind AI and machine learning so very interesting. I get called
                  such a nerd when my idea of a fun YouTube video is watching math videos on how neural networks work.
                </p> -->
                <span class="d-flex mt-3">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    class="cta-btn cta-btn--resume"
                    href="/resume.pdf"
                  >
                    View Resume
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- /END About Section -->
  
     
  
      <!-- **** Contact Section **** -->
      <section id="contact">
        <div class="container">
          <h2 class="section-title">Contact</h2>
          <div class="contact-wrapper load-hidden">
            <p class="contact-wrapper__text">david.allan.macpherson@gmail.com</p>
            <!-- <a
              rel="noreferrer"
              target="_blank"
              class="cta-btn cta-btn--resume"
              href="mailto:example@email.com"
              >Call to Action</a
            > -->
          </div>
        </div>
      </section>
      <!-- /END Contact Section -->
  
      <!-- **** Footer Section **** -->
      <footer class="footer navbar-static-bottom">
        <div class="container">
          <a rel="noreferrer" href="#top" class="back-to-top">
            <i class="fa fa-angle-up fa-2x" aria-hidden="true"></i>
          </a>
          <div class="social-links">
            <a rel="noreferrer" href="mailto:david.allan.macpherson@gmail.com" target="_blank">
              <img src="/icons8-gmail-50.png"/>
            </a>
            <a rel="noreferrer" href="https://www.linkedin.com/in/david-macpherson-101673289/" target="_blank">
              <img src="/linkedin.png"/>
            </a>
            <a rel="noreferrer" href="https://github.com/ironon" target="_blank">
              <img src="/github.png"/>
            </a>
          </div>
  
          <hr />
  
          <!-- Notice: if you want to give me some credit, it will be huge for me! if not, put your data on it -->
          <p class="footer__text">
            © 2021 - Template developed by
            <a rel="noreferrer" href="https://github.com/cobiwave" target="_blank"
              >Jacobo Martínez</a
            >
            and modified extensively by <a rel="noreferrer" href="https://github.com/ironon" target="_blank"
            >David Macpherson</a
          >
          </p>
  
          <!-- TO DO: remove this entire paragraph once you finish your portfolio -->
          <p class="mt-3 pt-3">
            <a
              rel="noreferrer"
              class="github-button"
              href="https://github.com/cobiwave/simplefolio/fork"
              data-icon="octicon-repo-forked"
              data-size="large"
              data-show-count="true"
              aria-label="Fork ntkme/github-buttons on GitHub"
              >Fork</a
            >
            <a
              rel="noreferrer" 
              class="github-button"
              href="https://github.com/cobiwave/simplefolio"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star cobiwave/simplefolio on GitHub"
              >Star</a
            >
          </p>
        </div>
      </footer>
      <!-- /END Footer Section -->
  
      
    </div>
  
  
  <style>
    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.svelte:hover {
      filter: drop-shadow(0 0 2em #ff3e00aa);
    }
    .read-the-docs {
      color: #888;
    }
    #settings {
      display: flex;
      /* justify-content: spa; */
    }
    #settings input {
      margin-left:2rem;
    }
    #horizontal-row {
      display: flex;
    }
    #horizontal-row p{
      margin-right: 2rem;
      
    }
  </style>
  