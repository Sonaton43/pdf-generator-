document.querySelectorAll('.dropdown-are').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        dropdown.querySelector('.dropdown-menu-are').style.visibility = 'visible';
        dropdown.querySelector('.dropdown-menu-are').style.opacity = '1';
    });
    dropdown.addEventListener('mouseleave', () => {
        dropdown.querySelector('.dropdown-menu-are').style.visibility = 'hidden';
        dropdown.querySelector('.dropdown-menu-are').style.opacity = '0';
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const barIcon = document.querySelector(".bar-icon");
    const xIcon = document.querySelector(".x-icon");
    const fullscreenNav = document.querySelector(".fullscreen-nav");

    barIcon.addEventListener("click", function () {
        if (fullscreenNav.classList.contains("active")) {

            fullscreenNav.classList.add("out");

            setTimeout(() => {
                fullscreenNav.classList.remove("active", "out");
            }, 300); 
        } else {
            fullscreenNav.classList.add("active");
        }
    });
    xIcon.addEventListener("click", function () {

        fullscreenNav.classList.add("out");

        setTimeout(() => {
            fullscreenNav.classList.remove("active");
            fullscreenNav.classList.remove("out");
        }, 300);
    });
});
