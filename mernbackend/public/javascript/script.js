var bars = document.querySelector("#bars");
var sideMenu = document.querySelector("#sidemenu");
var times = document.querySelector("#times");

bars.addEventListener("click", function () {
  sideMenu.style.display = "block";
  times.style.display = "block";
  bars.style.display = "none";
});
times.addEventListener("click", function () {
  sideMenu.style.display = "none";
  times.style.display = "none";
  bars.style.display = "block";
});

// bars.style.display="none";

// cart related javascript

let carts = document.querySelectorAll(".add-cart");
let products = [
  {
    name: "Operating Systems",
    tag: "book",
    price: 450,
    inCart: 0
  },
  {
    name: "System Programming",
    tag: "book",
    price: 400,
    inCart: 0
  },
  {
    name: "Compiler Design",
    tag: "book",
    price: 400,
    inCart: 0
  },
  {
    name: "Computer science",
    tag: "book",
    price: 550,
    inCart: 0
  }
];
