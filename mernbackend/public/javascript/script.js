var bars = document.querySelector("#bars");
var sideMenu = document.querySelector("#sidemenu");
var times = document.querySelector("#times");

bars.addEventListener("click",function(){
    sideMenu.style.display = "block";
    times.style.display = "block";
    bars.style.display = "none";
});
times.addEventListener("click",function(){
    sideMenu.style.display="none";
    times.style.display="none";
    bars.style.display="block";
})

// bars.style.display="none";
