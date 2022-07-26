let productData,productSection;
let yourData = JSON.parse(localStorage.getItem("yourData")) || [];
productSection = document.getElementById("product-section");
fetch("data.json").then(x => x.json()).then(x => {
   productData = x;
   getProduct();
}).catch(error => console.log(error));
let getProduct = () => {
    productData.map(x => {
        let {id,link,name,desc,price} =x;
         // console.log(id,desc,name,link);
        /*   console.log(des);
           console.log(name);
        */
       let searchData = yourData.find((x) => x.id === id);
       productSection.innerHTML+=`<div id="product-container-${id}"class="product-container"><div id="product-img-${id}-container"class="product-img-container"><img src="${link}"alt="${name}"class="product-img"></div>
       <p id="product-name-${id}"class="product-name">${name}</p>
       <p class="product-desc">${desc}</p><div class="product-price-container">
<p class="product-price">&#8377; ${price}</p><div class="product-quantity-container"><i class="product-minus-button"onclick="itemsDecreasement('${id}')">&minus;</i>
       <span id="${id}"class="product-quantity">${searchData === undefined ? 0 : searchData.item}</span>
       <i class="product-plus-button"onclick="itemsIncreasement('${id}')">&plus;</i>
       </div>
       </div>
       </div>`;
    })
    
};

let adsSlider = () =>{
   let index,slideImg;
   index = 0;
   let slide = () => {
      slideImg = document.querySelectorAll(".ads-container-img");
      for (let i = 0; i < slideImg.length; i++) {
         // console.log(slideImg);
         slideImg[i].style.display = "none";
         // slideImg[i].style.right = "-100%";
      }
      slideImg[index].style.display= "inline";
      // slideImg[index].style.right= "0px";
      if (index >= slideImg.length -1) {
         index = 0;
      }else{index++}
      // console.log(index);
   };
   // document.getElementById("ads-container").style.height = "calc(100vh - 140px)";
   slide();
   setInterval(slide,4000);
};
adsSlider();


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
window.onload = () => {document.body.style.display = "block"};



function itemsIncreasement(id) {
    if (yourData.map((x) => x.item).reduce((x, y) => x + y, 0) >= 20) 
    {alert("add 20 items at a time");
     return;      
    };
    let selectedItem = id;
    let searchData = yourData.find((x) => x.id === selectedItem);

    if (searchData === undefined) {
      yourData.push(
         {
           id:selectedItem,
           item:1
         }
      )
    } else if (searchData.item === 10) return;
    else{
      searchData.item+=1;
    }
    localStorage.setItem("yourData",JSON.stringify(yourData));
    if (searchData === undefined) {
      searchData = yourData.find((x) => x.id === selectedItem);
      updateItemQuantity(selectedItem,searchData);
    } else{
      updateItemQuantity(selectedItem,searchData);
    }
    cartItemQuantity();

};

function itemsDecreasement(id) {
   let selectedItem = id;
    let searchData = yourData.find((x) => x.id === selectedItem);
    if (searchData === undefined) return;
    else if (searchData.item === 0) return;
    else if (searchData.item === 1) {
      searchData.item -=1;
      // yourData.pop(searchData);
      yourData = yourData.filter((x) => x.id !== selectedItem);
   }
    else{searchData.item -=1;}
    localStorage.setItem("yourData",JSON.stringify(yourData));
    updateItemQuantity(selectedItem,searchData);
    cartItemQuantity();
};

function updateItemQuantity(id,searchData) {
   document.getElementById(`${id}`).innerText = `${searchData.item}`;
};
function cartItemQuantity() {
   let cartItem = document.getElementById("header-cart-num");
  cartItem.innerText = yourData.map((x) => x.item).reduce((x, y) => x + y, 0);
};
cartItemQuantity();