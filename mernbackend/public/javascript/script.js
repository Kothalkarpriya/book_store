// const parselib = require("nodemon/lib/cli/parse");

// console.log("Reached");
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

var carts = document.querySelectorAll(".add-cart");
let products = [
  {
    name: "Operating Systems",
    tag: "book",
    price: 450,
    inCart: 0,
  },
  {
    name: "System Programming",
    tag: "book",
    price: 400,
    inCart: 0,
  },
  {
    name: "Compiler Design",
    tag: "book",
    price: 400,
    inCart: 0,
  },
  {
    name: "Computer science",
    tag: "book",
    price: 550,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function cartNumbers(item) {
  // console.log("Products clicked ", product);
  var productNumbers = localStorage.getItem("cartNumbers");
  // console.log(productNumbers);
  var prodNum = parseInt(productNumbers);

  if (prodNum) {
    localStorage.setItem("cartNumbers", prodNum + 1);
    document.querySelector(".carts span").textContent = prodNum + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".carts span").textContent = 1;
  }
  setItems(item);
}

function setItems(product) {
  var cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems === null) {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  } else {
    if (cartItems[product.tag] !== undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
      cartItems[product.tag].inCart += 1;
    }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(item) {
  var cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    var cost = parseInt(cartCost);
    localStorage.setItem("totalCost", cost + item.price);
  } else {
    localStorage.setItem("totalCost", item.price);
  }
}

function displayCart(){
  var cartCost = localStorage.getItem("totalCost");
  var cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".cart-products");

  // console.log(cartItems);
  if(cartItems && productContainer){
    // console.log("runnning");
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="product">
        <ion-icon name="close-circle-outline"></ion-icon>
        <span>${item.name}</span>
      </div>
      <div class="price">Rs. ${item.price}.00</div>

      <div class="quantity">
        <ion-icon class="decrease" name="caret-back-circle"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon class="increase" name="caret-forward-circle"></ion-icon>
      </div>
      <div class="total">
      Rs. ${item.inCart * item.price}.00</div>
      `
    });

    productContainer.innerHTML += `
    <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">Basket Total: </h4>
      <h4 class="basketTotal">Rs. ${cartCost}.00</h4>
    </div>
    `

    deleteButtons();
    manageQuantity();
  }
}
function deleteButtons() {
  let deleteButtons = document.querySelectorAll('.product ion-icon');
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartCost = localStorage.getItem("totalCost");
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let productName;
  console.log(cartItems);

  for(let i=0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', () => {
          productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
         
          localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
          localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

          delete cartItems[productName];
          localStorage.setItem('productsInCart', JSON.stringify(cartItems));

          displayCart();
          onLoadCartNumbers();
      })
  }
}

function manageQuantity() {
  let decreaseButtons = document.querySelectorAll('.decrease');
  let increaseButtons = document.querySelectorAll('.increase');
  let currentQuantity = 0;
  let currentProduct = '';
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  for(let i=0; i < increaseButtons.length; i++) {
      decreaseButtons[i].addEventListener('click', () => {
          console.log(cartItems);
          currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
          console.log(currentQuantity);
          currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
          console.log(currentProduct);

          if( cartItems[currentProduct].inCart > 1 ) {
              cartItems[currentProduct].inCart -= 1;
              cartNumbers(cartItems[currentProduct], "decrease");
              totalCost(cartItems[currentProduct], "decrease");
              localStorage.setItem('productsInCart', JSON.stringify(cartItems));
              displayCart();
          }
      });

      increaseButtons[i].addEventListener('click', () => {
          console.log(cartItems);
          currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
          console.log(currentQuantity);
          currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
          console.log(currentProduct);

          cartItems[currentProduct].inCart += 1;
          cartNumbers(cartItems[currentProduct]);
          totalCost(cartItems[currentProduct]);
          localStorage.setItem('productsInCart', JSON.stringify(cartItems));
          displayCart();
      });
  }
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".carts span").textContent = productNumbers;
  }
}

onLoadCartNumbers();
displayCart();