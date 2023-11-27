// Dark Mode
const dark = document.getElementById("dark-toggle");

dark.addEventListener("click", () => {
    if(document.body.classList.contains("pink-theme")){
        document.body.classList.remove("pink-theme");
    }
    document.body.classList.toggle("dark-theme");
    if (dark.className == "fa-solid fa-moon font-subheader") {
        dark.className = "fa-solid fa-sun font-subheader";
    } else {
        dark.className = "fa-solid fa-moon font-subheader";
    }
});


const pink = document.getElementById("pink-toggle");
pink.addEventListener("click", () => {
    document.body.classList.toggle("pink-theme");
    
});



// Collapse
const collapse = document.getElementById("collapse-toggle");
const collapseContent = document.getElementsByClassName("collapse-content")[0];

collapse.addEventListener("click", () => {
    if (collapseContent.className == "collapse-content") {
        collapse.className = "fa-solid fa-down-left-and-up-right-to-center";
        collapseContent.className = "collapse-content show";
    } else {
        collapse.className = "fa-solid fa-up-right-and-down-left-from-center";
        collapseContent.className = "collapse-content";
    }
})

//Animate on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

const hiddE = document.querySelectorAll(".hidd");

hiddE.forEach((el) => observer.observe(el));




//   Social Click
const emoji = document.getElementById("eye");
const links = document.getElementsByClassName("_link")[0];
const up = document.getElementsByClassName("up");
const soc = document.getElementsByClassName("social")[0];



emoji.addEventListener("click", () => {
    if (window.getComputedStyle(soc).display == "none") {
        emoji.style.transition = "all 1s ease-in-out";
        soc.style.display = "block";
        emoji.style.width = "60px";
        emoji.style.height = "60px";
    } else {
        emoji.style.transition = "all 1s ease-in-out";
        soc.style.display = "none";
        emoji.style.width = "50px";
        emoji.style.height = "50px";
    }
});







