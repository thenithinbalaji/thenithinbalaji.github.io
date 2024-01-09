tldr_count = 0; //for bio shortening
total_company_count = 3; //for total count of companies in experience section to loop images

//constants for loading data from github assets repo
aboutme = [] //gets loaded in dataload function
phrases = ["Human", "Web Developer", "Undergrad", "Minimalist", "Coder"] //rest gets loaded in dataload function
top_projects = [] //gets loaded in dataload function
all_projects = [] //gets loaded in dataload function

//counters
textScramble_counter = 0 //for TextScamble
company_counter = 0; //for changing image in experience section
projects_counter = 0; //for changing projects in projects section

//dataload function for loading data
async function dataload() {
    const resp1 = await fetch("https://raw.githubusercontent.com/thenithinbalaji/assets/main/portfolio_v1/about_me.json");
    const data1 = await resp1.json()
    aboutme = data1["data"]

    const resp2 = await fetch("https://raw.githubusercontent.com/thenithinbalaji/assets/main/portfolio_v1/phrases.json");
    const data2 = await resp2.json()
    phrases = data2["data"]

    const resp3 = await fetch("https://raw.githubusercontent.com/thenithinbalaji/assets/main/portfolio_v1/top_projects.json");
    const data3 = await resp3.json()
    top_projects = data3["data"]
    setprojects();

    const resp4 = await fetch("https://raw.githubusercontent.com/thenithinbalaji/assets/main/repos.json");
    const data4 = await resp4.json()
    all_projects = data4
    all_projects.reverse();
    setgithubprojects();

    document.getElementById("about-me-text").innerText = aboutme[tldr_count];
}

//textscramble class
class TextScramble {

    constructor(el) {
        this.el = el
        this.chars = 'ABCDEFGHIJLKMNOPQRSTUVWXYZ'
        this.update = this.update.bind(this)
    }

    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }

    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

//for changing subtext whoami in name section
const fx = new TextScramble(document.getElementById('whoami'))
const next = () => {
    fx.setText(phrases[textScramble_counter]).then(() => {
        setTimeout(next, 1000)
    })
    textScramble_counter = (textScramble_counter + 1) % phrases.length
}

window.onload = function () {
    document.getElementById("tldr-counter").innerText = tldr_count; // initialise TLDR count as 0
    next(); // scramble text
    dataload(); // load data from github
    setbdate(); //set bdate
    setcompanylogo(); //set company logo in experience section
}

//for blue bubble background in name section and footer
window.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY;

    const totalHeight = document.body.scrollHeight;
    const currentScroll = window.innerHeight + window.scrollY;

    const name_section = document.getElementById('name-section');
    const footer = document.getElementById('footer');

    if (scrollPosition > 100) {
        name_section.style.borderRadius = '0';
        name_section.style.margin = '0';
    }

    else {
        name_section.style.borderTopLeftRadius = '9999px';
        name_section.style.borderBottomLeftRadius = '9999px';
        name_section.style.borderTopRightRadius = '9999px';
        name_section.style.borderBottomRightRadius = '9999px';
        name_section.style.margin = '2rem';
    }

    if (totalHeight - currentScroll < 250) {
        footer.style.borderRadius = '0';
        footer.style.margin = '0';
    }

    else {
        footer.style.borderTopLeftRadius = '9999px';
        footer.style.borderBottomLeftRadius = '9999px';
        footer.style.borderTopRightRadius = '9999px';
        footer.style.borderBottomRightRadius = '9999px';
        footer.style.margin = '2rem';
    }

    document.getElementById('curvy-arrow-circle-1').style.transform = 'rotate(' + scrollPosition + 'deg)';
    document.getElementById('curvy-arrow-circle-2').style.transform = 'rotate(' + scrollPosition + 'deg)';

});

document.getElementById("tldr-button").addEventListener('click', function () {
    tldr_count += 1;
    document.getElementById("tldr-counter").innerText = tldr_count;

    if (tldr_count < aboutme.length) {
        document.getElementById("about-me-text").innerText = aboutme[tldr_count];
    }
})

//project navigation button
document.getElementById("project-prev-button").addEventListener('click', function () {
    projects_counter -= 1;

    if (projects_counter < 0)
        projects_counter = top_projects.length - 1;

    setprojects();
})

//project navigation button
document.getElementById("project-next-button").addEventListener('click', function () {
    projects_counter += 1;
    projects_counter = projects_counter % top_projects.length;
    setprojects();
})

//reset bio and tldr
function resetbio() {
    // play reset animation on curvy circle
    var element = document.getElementById("curvy-arrow-circle-1");
    element.classList.add("playresetbio");

    setTimeout(function () {
        element.classList.remove("playresetbio");
    }, 1000);


    // sramble about me text
    tldr_count = 0;
    document.getElementById("tldr-counter").innerText = tldr_count;

    const text = document.getElementById("about-me-text")
    const fx = new TextScramble(text)
    fx.setText(aboutme[tldr_count])
}

function setbdate() {
    today = new Date()
    past = new Date(2002, 8, 3) //dates in js are counted from 0, so 8 is Sept

    var diff = Math.floor(today.getTime() - past.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var years = Math.floor(days / 365); // Assuming a year has 365 days
    var months = Math.floor((days % 365) / 30); // Assuming a month has 30 days

    var message = "IM " + years + " years" + " " + months + " months old";

    document.getElementById("born-date").innerHTML = message;
}

//company logo in experience section
function setcompanylogo() {
    // console.log(company_counter)

    document.getElementById("company-logo").src = "./assets/company/company" + company_counter + ".png";
    company_counter = company_counter + 1;
    company_counter = company_counter % total_company_count;

    setTimeout(function () {
        setcompanylogo();
    }, 1000);
}

function setprojects() {
    const project = top_projects[projects_counter];

    document.getElementById("project-title").innerHTML = project["name"];
    document.getElementById("project-desc").innerHTML = project["description"];
    document.getElementById("project-stack").src = "https://skillicons.dev/icons?i=" + project["stack"];
    document.getElementById("project-link1-name").innerHTML = project["link_1_name"];
    document.getElementById("project-link2-name").innerHTML = project["link_2_name"];
    document.getElementById("project-link1").href = project["link1"];
    document.getElementById("project-link2").href = project["link2"];

    document.getElementById("project-image").src = "./assets/projects/" + project["github_id"] + ".png";

    if (project["link_2_name"] == null)
        document.getElementById("project-link2").style.display = "none";

    else
        document.getElementById("project-link2").style.display = "block";

}

function setgithubprojects() {
    const container = document.querySelector('.github-projects-container-items');

    for (i = 0; i < 2; i++)
        all_projects.forEach(project => {
            if (project.stargazers_count > 2) {
                const projectLink = document.createElement('a');
                projectLink.setAttribute('class', 'p-5 rounded-lg bg-slate-100 flex flex-col hover:bg-slate-200 cursor-pointer text-nowrap border-2 hover:border-black');
                projectLink.setAttribute('href', project.html_url);

                const projectName = document.createElement('p');
                projectName.setAttribute('class', 'cursor-pointer font-bold text-lg');
                projectName.textContent = project.name.split('-').join(' ');

                const projectLanguage = document.createElement('p');
                projectLanguage.setAttribute('class', 'cursor-pointer');
                projectLanguage.textContent = project.language;

                const countsContainer = document.createElement('div');
                countsContainer.setAttribute('class', 'flex gap-5 cursor-pointer');

                const stargazersCount = document.createElement('p');
                stargazersCount.setAttribute('class', 'cursor-pointer');
                stargazersCount.textContent = `${project.stargazers_count}⭐`;
                countsContainer.appendChild(stargazersCount);

                if (project.forks_count > 0) {
                    const forksCount = document.createElement('p');
                    forksCount.setAttribute('class', 'cursor-pointer');
                    forksCount.textContent = `${project.forks_count}🍴`;
                    countsContainer.appendChild(forksCount);
                }

                projectLink.appendChild(projectName);
                projectLink.appendChild(projectLanguage);
                projectLink.appendChild(countsContainer);

                container.appendChild(projectLink);
            }
        });

}