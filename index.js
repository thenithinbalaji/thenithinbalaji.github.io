tldr_count = 0;

const aboutme = [
    "",
    "I'm Nithin Balaji (@thenithinbalaji) - A developer based in India. I'm interested in web, games, tech, open-source, and anything that sparks my creativity. I'm an IT graduate with a passion for engineering and experience in startups and freelancing as a developer. Reach out if you want hands-on deck for something cool!",
    "I'm Nithin Balaji (@thenithinbalaji) - A developer and a freelancer interested in web, games, tech, open-source, and anything that sparks my creativity. I'm an engineering graduate with experience working with startups. Reach out if you want a hands-on deck for something cool!",
    "I'm Nithin Balaji (@thenithinbalaji) - A developer, an engineering graduate and a freelancer interested in web, games, tech, open-source, and anything that sparks my creativity. Reach out if you want a hands-on deck for something cool!",
    "I'm Nithin Balaji (@thenithinbalaji) - A developer, an engineering graduate and a freelancer interested in web, games, tech, open-source, and anything that sparks my creativity.",
    "I'm Nithin Balaji, a developer interested in web, games, tech, blogging and open-source. I love building innovative projects. Reach out if you have a cool project I can work with!",
    "I'm Nithin Balaji - a developer. I love web, games, tech and open-source.",
    "A developer. I love web, technology and open-source.",
    "A developer from India",
    "A developer",
    "You know me already, don't you?",
    "Just reload the page bruh",
    "Scroll Down WTF",
    "You just pissed the shortening AI",
    "A developer",
    "Hmmmm",
    "WOWOWOW Jobless",
    "A developer based in India",
    "a web dev",
    "you win, i lost, stop shortening my bio",
    "Ayo WTF",
    "I am nobody, is that what you want?",
    "I'm a loser from India. Are you happy now?",
    "A developer based in India and I won't short it more than this",
    "A developer based in India and I won't short it more than this, you heard me right!",
    "A developer based in India",
]

const phrases = [
    'Web Developer',
    'Undergrad',
    'Freelancer',
    'Creative Guy',
    'Writer',
    'Game Developer',
    'Tech Enthusiast',
    'Discord Bot Developer',
    'Minimalist',
    'Programmer',
    'UI/UX Designer',
    'Nerd',
    'Coffee Hater',
    'Cinephile',
    'Man',
    'Nomad',
    'Open Source Contributor',
    'Blogger',
    'YouTuber',
    'Windows Lover',
    'Geek',
    'Discord Mod',
    'Human',
];


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

const el = document.querySelector('#whoami')
const fx = new TextScramble(el)
let counter = 0

const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 1000)
    })
    counter = (counter + 1) % phrases.length
}

window.onload = function () {
    next();

    document.getElementById("tldr-counter").innerText = tldr_count;
}

window.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY;
    // console.log(scrollPosition);

    const name_section = document.getElementById('name-section');
    const about_me_section = document.getElementById('about-me-section');

    if (scrollPosition > 100) {
        name_section.style.borderRadius = '0';
        name_section.style.margin = '0';

        about_me_section.style.borderTopWidth = '4px';
        about_me_section.style.borderBottomWidth = '4px';
    }

    else {
        name_section.style.borderTopLeftRadius = '9999px';
        name_section.style.borderBottomLeftRadius = '9999px';
        name_section.style.borderTopRightRadius = '9999px';
        name_section.style.borderBottomRightRadius = '9999px';
        name_section.style.margin = '2rem';

        about_me_section.style.borderWidth = '0px';
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