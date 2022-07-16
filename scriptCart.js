let yourData = JSON.parse(localStorage.getItem("yourData")) || [];
let productData;

window.onload = () => {document.body.style.display = "block";
fetch("data.json").then(x => x.json()).then(x => {productData = x;
  cartItems();
  cartItemTotals();
});
};
function navToggleFunction() {
    let navUl = document.querySelector("ul");
    let navLi = document.querySelectorAll(".nav-link");
    let navHref = document.querySelectorAll(".nav-target");
    let navToggle = document.getElementById("nav-toggle");
        if(window.innerWidth<=575) {
         navToggle.style.display = "inline";
         navToggle.onclick = () => {
            navLi.forEach((x)=> {
              x.classList.toggle("nav-li-toggle");
              
            
            });
         };
         navLi.forEach((x) => {x.classList.add("nav-li-toggle");});
         navHref.forEach((x) => {x.classList.add("nav-target-toggle");});
         navUl.style.flexDirection= "column";
        }
        else{
            navToggle.style.display = "none";
            navLi.forEach((x) => {x.classList.remove("nav-li-toggle");});
            navHref.forEach((x) => {x.classList.remove("nav-target-toggle");});
            navUl.style.flexDirection = "row";
        }
 
 
    window.addEventListener("resize",navToggleFunction);
 };
 navToggleFunction();
 
//  function cartItemQuantity() {
//     let cartItem = document.getElementById("header-cart-num");
//    cartItem.innerText = yourData.map((x) => x.item).reduce((x, y) => x + y, 0);
//  };
//  cartItemQuantity(); 

 function cartItems() {
  let productSection = document.getElementById("product-section");
  productSection.innerHTML = "";
  console.log(productData);
  if (yourData.length == 0) {
    productSection.innerHTML =`<h1 class="empty-cart-heading">Your Cart Is Empty</h1>`;
  }
  console.log(yourData);
  yourData.map(x => {
    let searchData = productData.find((y) => x.id === y.id);
    // let searchItemData = yourData.find((x) => x.id === y.id);
   let {id,link,name,desc,price} = searchData;
   productSection.innerHTML += `<div class="item-container"id="item-container-${id}"><span class="item-remove"onclick="removeItem(${id})">x</span><img class="item-img"alt="${name}"src="${link}"><div class="item-detail"><p class="item-name">${name}</p><br><p class ="item-desc">${desc}</p></div><div class="item-quantity-container"><i class="item-minus-button"onclick="itemsDecreasement(${id})">&minus;</i>
   <span id="${id}"class="item-quantity">${x === undefined ? 0 : x.item}</span>
   <i class="item-plus-button"onclick="itemsIncreasement(${id})">&plus;</i>
   </div><p class="item-price"id="item-price-${id}">$ ${price*x.item}</p></div>`;

  })
  
 };
 
 function itemsIncreasement(id) {
  if (yourData.map((x) => x.item).reduce((x, y) => x + y, 0) >= 20) 
  {alert("add 20 items at a time");
   return;      
  };
  let selectedItem = id;
  let searchData = yourData.find((x) => x.id === selectedItem);

  // if (searchData === undefined) {
  //   yourData.push(
  //      {
  //        id:selectedItem,
  //        item:1
  //      }
  //   )
  // } else 
  if (searchData.item === 10) return;
  else{
    // console.log(yourData);
    searchData.item+=1;
    // console.log(yourData);
  }
  localStorage.setItem("yourData",JSON.stringify(yourData));
  // if (searchData === undefined) {
  //   searchData = yourData.find((x) => x.id === selectedItem);
    // updateItemQuantity(selectedItem,searchData);
  // } else{
    updateItemQuantity(selectedItem,searchData);
  // }
  cartItems();
  cartItemQuantity();

};

function itemsDecreasement(id) {
  let selectedItem = id;
   let searchData = yourData.find((x) => x.id === selectedItem);
   if (searchData.item > 1) {
    searchData.item-=1;
    localStorage.setItem("yourData",JSON.stringify(yourData));
    updateItemQuantity(selectedItem,searchData);
    cartItems();
    cartItemQuantity(); 
    
   }
   else if (searchData.item <=1) {
    document.getElementById(`${selectedItem}`).innerText = "0";
    document.getElementById(`item-container-${selectedItem}`).style.animationPlayState = "running";
    document.getElementById(`item-container-${selectedItem}`).addEventListener("animationend",() => {document.getElementById(`item-container-${selectedItem}`).remove();
    yourData = yourData.filter((x) => x.id !== selectedItem);
    localStorage.setItem("yourData",JSON.stringify(yourData));
    cartItemQuantity();
   }); 
   }
  
  
};

function removeItem(id) {
  let selectedItem = id;
  document.querySelector(`#item-container-${id}`).style.animationPlayState = "running";
  document.getElementById(`item-container-${id}`).addEventListener("animationend",() => {document.getElementById(`item-container-${id}`).remove();
  yourData = yourData.filter((x) => x.id !== selectedItem);
  localStorage.setItem("yourData",JSON.stringify(yourData));
  cartItemQuantity();
});

}

function updateItemQuantity(id,searchData) {
  if (document.getElementById(`${id}`) ===undefined) return;
  document.getElementById(`${id}`).innerText = `${searchData === undefined ? 0 : searchData.item}`;
  // document.getElementById(`item-price-${id}`).innerText = `${searchData.item}`;
};
function cartItemQuantity() {
  let cartItem = document.getElementById("header-cart-num");
 cartItem.innerText = yourData.map((x) => x.item).reduce((x, y) => x + y, 0);
};
cartItemQuantity();

function cartItemTotals() {
  let cartTotal = document.querySelectorAll(".item-price");
  let cartTotals = [];
  cartTotal.forEach((x) => {cartTotals.push(parseInt(x.innerText))} )
  // let total = cartTotal.map((x) => x.value).reduce((x, y) => x + y, 0);
  console.log(cartTotals);
};
 