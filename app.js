// Dark Mode
const icon = document.getElementById("icon");

icon.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if (icon.className == "fa-solid fa-moon") {
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-solid fa-moon";
    }
});

//Local Storage


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







