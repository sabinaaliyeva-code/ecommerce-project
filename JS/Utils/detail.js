import {getProduct} from "../Services/api.js";
import { renderCart } from "./cart.js";


if(!JSON.parse(localStorage.getItem("product-cart"))){
    localStorage.setItem("product-cart", JSON.stringify([]));
}


let productInfo=document.querySelector(".left")
let productImages=document.querySelector(".container")
let thumbImages=document.querySelector(".row")

export async function render(){

    let data =await getProduct()
    
    let productImages=document.querySelector(".container")
    let thumbImages=document.querySelector(".row")
    productImages.innerHTML=" "
    thumbImages.innerHTML=" "
    let imagesHTML = " "


   data.forEach((e)=>{
        
        


        e.images.forEach((img)=>{
            
           
           imagesHTML=imagesHTML +
           
           `
           <img src="${img.full}" class="image-product" data-img-id="${img.id}">
            `

           
        })

        productImages.innerHTML = `
        <div class="slider-wrapper">
             ${imagesHTML}

            <div class="prev">
                <img src="./images/icon-previous.svg">
            </div>

            <div class="next">
              <img src="./images/icon-next.svg">
            </div>
        </div>
        `
        

       

        e.images.forEach((img)=>{

        thumbImages.innerHTML=thumbImages.innerHTML + `<div class="column">
            <img src="${img.thumbnail}" width="100px" class="thumb" data-id="${img.id}">
        
        </div>`

        })

        

        productInfo.innerHTML=

        `<div class="product-info">
                <div class="company"><p>${e.company}</p></div>
                <div class="title"><p>${e.productName}</p></div>
                <div class="description">
                    <p>${e.description}</p>
                </div>
                <div class="price-box">
                    <span class="price">${e.currency}${e.current}</span>
                    <span class="discount">${e.discount}</span>

                </div>
                <span class="old-price">${e.currency}${e.oldPrice}</span>

            </div>
            <div class="quantity-box">
            <div class="quantity">
                <button class="minus" data-id=${e.productId}><img src="./images/icon-minus.svg"></button>
                <span class="count" data-id=${e.productId}>1</span>
                <button class="plus" data-id=${e.productId}><img src="./images/icon-plus.svg"></button>
            </div>
            <button class="add" data-id=${e.productId}> 
                <img src="./images/icon-cart.svg" class=cart-svg>
                <span>Add To Card</span>
            </button>
            </div>
            
            

        </div> ` ;


        
      //Slider for images

      Slider()
            
    })


    
    

    

    

     

   
    let quantity = document.querySelector(".quantity-box");

    quantity.addEventListener("click", (e) => {

        let btn = e.target.closest("button"); 
        let id = btn.getAttribute("data-id");
        

        let countSpan = document.querySelector(`.count[data-id="${id}"]`);
        let count = Number(countSpan.innerText);

        let productCart = JSON.parse(localStorage.getItem("product-cart") || "[]");
        let cartNofication=document.querySelector(".cart-notification");

        //plus
        if (btn.classList.contains("plus")) {
           count++;
           countSpan.innerText = count;
        }

        //minus
        if (btn.classList.contains("minus")) {
           if (count > 1) count--;
           countSpan.innerText = count;
        }

        //add to cart
        if (btn.classList.contains("add")) {

           let item = productCart.find((p) => {
            return p.productId == id;
           });

           if (item) {
               item.count += count;
            } else {
              productCart.push
              ({ 
                productId: id, 
                count: count 
              });
            }


           cartNofication.classList.add("active");
        
           setTimeout(()=>{
            cartNofication.classList.remove("active");
           },2000)
           
           console.log(cartNofication)
            
            

            
           

            
            
            countSpan.innerText = 1;
           

            

            
            localStorage.setItem("product-cart", JSON.stringify(productCart));


            //uptade cart-count in navbar

            updateCartCount();
        

            if (cartBox.classList.contains("active")) {
               renderCart();
            }

            


            

            
        }

        


        
        


       

        
});



let cartBtn = document.querySelector(".product-cart");
let cartBox = document.querySelector(".cart-box");
let closeBtn = document.querySelector(".close");


cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cartBox.classList.add("active");

    renderCart(); 
});



closeBtn.addEventListener("click", () => {
    
    cartBox.classList.remove("active");
    
});








  


   
    



    

   

    


    

   
}


render()












