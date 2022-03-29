const menu = document.querySelector("nav");
const navToogle = document.querySelector(".nav-toogle");
const toogleIcon = document.querySelector(".toogle-icon");
const anchorLink = document.querySelectorAll(".anchor-link");


navToogle.addEventListener("click", () => {
    const visibility = menu.getAttribute("data-visible");

    if(visibility === "false"){
        openMenu();
    } else if(visibility === "true"){
        closeMenu();
    }
} );

//Remove menu of view when a link is pressed
anchorLink.forEach( link => {
    link.addEventListener("click", () =>{
        closeMenu();
    });
});

function openMenu() {
    menu.setAttribute("data-visible", true);
    toogleIcon.setAttribute("class", "fas fa-times fa-fw toogle-icon");
    navToogle.style.background = "rgba(0, 0, 0, 0)";
}

function closeMenu() {
    menu.setAttribute("data-visible", false);
    toogleIcon.setAttribute("class", "fas fa-bars fa-fw toogle-icon");
    navToogle.style.background = "rgb(36, 52, 71, 0.9)";
}