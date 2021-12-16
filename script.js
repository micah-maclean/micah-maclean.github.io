const menu = document.querySelector("nav");
const navToogle = document.querySelector(".nav-toogle");
const toogleIcon = document.querySelector(".toogle-icon");

const anchorLink = document.querySelectorAll(".anchor-link");

navToogle.addEventListener("click", () => {
    const visibility = menu.getAttribute("data-visible");

    console.log(visibility);
    if(visibility === "false"){
        menu.setAttribute("data-visible", true);
        toogleIcon.setAttribute("class", "fas fa-times fa-fw toogle-icon");
    } else if(visibility === "true"){
        menu.setAttribute("data-visible", false);
        toogleIcon.setAttribute("class", "fas fa-bars fa-fw toogle-icon");
    }
} );

anchorLink.forEach( link => {
    link.addEventListener("click", () =>{
        menu.setAttribute("data-visible", false);
        toogleIcon.setAttribute("class", "fas fa-bars fa-fw toogle-icon");
    });
});
