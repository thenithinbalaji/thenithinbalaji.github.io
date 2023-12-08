tldr_count = 0;
aboutme = [] //gets loaded in dataload
phrases = ["Human", "Web Developer", "Undergrad", "Minimalist", "Coder"] //rest gets loaded in dataload
counter = 0 //for TextScamble

company_count = 0;
total_company_count = 3;

async function dataload() {
    const resp1 = await fetch("https://raw.githubusercontent.com/thenithinbalaji/assets/main/portfolio_v1/about_me.json");
    const data1 = await resp1.json()
    aboutme = data1["data"]

    const resp2 = await fetch("https://raw.githubusercontent.com/thenithinbalaji/assets/main/portfolio_v1/phrases.json");
    const data2 = await resp2.json()
    phrases = data2["data"]

    document.getElementById("about-me-text").innerText = aboutme[tldr_count];
}

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

const el = document.getElementById('whoami')
const fx = new TextScramble(el)

const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 1000)
    })
    counter = (counter + 1) % phrases.length
}

window.onload = function () {
    next(); // scramble text
    dataload(); // load data from github

    document.getElementById("tldr-counter").innerText = tldr_count; // initialise TLDR count as 0

    setbdate(); //set bdate

    setcompanylogo();
}

window.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY;
    // console.log(scrollPosition);

    const name_section = document.getElementById('name-section');
    const about_me_section = document.getElementById('about-me-section');

    if (scrollPosition > 100) {
        name_section.style.borderRadius = '0';
        name_section.style.margin = '0';

        // about_me_section.style.borderTopWidth = '4px';
        // about_me_section.style.borderBottomWidth = '4px';
    }

    else {
        name_section.style.borderTopLeftRadius = '9999px';
        name_section.style.borderBottomLeftRadius = '9999px';
        name_section.style.borderTopRightRadius = '9999px';
        name_section.style.borderBottomRightRadius = '9999px';
        name_section.style.margin = '2rem';

        // about_me_section.style.borderWidth = '0px';
    }

    document.getElementById('curvy-arrow-circle').style.transform = 'rotate(' + scrollPosition + 'deg)';

});

document.getElementById("tldr-button").addEventListener('click', function () {
    tldr_count += 1;
    document.getElementById("tldr-counter").innerText = tldr_count;

    if (tldr_count < aboutme.length) {
        document.getElementById("about-me-text").innerText = aboutme[tldr_count];
    }
})

function resetbio() {
    // play reset animation on curvy circle
    var element = document.getElementById("curvy-arrow-circle");
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

    var message = "IM " + years + " years" + " " + months + " months";

    document.getElementById("born-date").innerHTML = message;
}

function setcompanylogo() {
    // console.log(company_count)

    document.getElementById("company-logo").src = "./assets/company" + company_count + ".png";
    company_count = company_count + 1;
    company_count = company_count % total_company_count;

    setTimeout(function () {
        setcompanylogo();
    }, 1000);
}