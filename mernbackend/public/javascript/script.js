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
]

for(let i = 0 ; i< carts.length ; i++){
  carts[i].addEventListener("click",()=>{
    cartNumbers(products[i]);
  })
}

function cartNumbers(product){
  console.log("Products clicked ", product);
  let productNumbers = localStorage.getItem('cartNumbers');
  // console.log(typeof productNumbers);

  productNumbers = parseInt(productNumbers);
  // console.log(typeof productNumbers);

  if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector('.carts span').textContent = productNumbers +  1;
  }else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.carts span').textContent = 1;
  }
  setItems(product);
}

function setItems(product){
  console.log("inside of SetItems");
  console.log("My product is ",product);
  let cartItems = localStorage.getItem('productsInCart');

  cartItems = JSON.parse(cartItems);
  // console.log("My cart ITems care", cartItems);

  if(cartItems != null){
    cartItems[product.tag].inCart += 1;  
  }  
  // }else if(){}
  else{
    product.inCart = 1;
    cartItems = {
      [product.tag]:product
    }
  }
  
  localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers){
    document
    .querySelector('.carts span').textContent = productNumbers;
  }
}


onLoadCartNumbers();