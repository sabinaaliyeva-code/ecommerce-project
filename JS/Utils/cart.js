import {getProduct} from "../Services/api.js";



export async function renderCart(){

    let data=await getProduct();
    let productCart = JSON.parse(localStorage.getItem("product-cart")) || [];
    let cartContainer = document.querySelector(".cart-container");
    
    
    cartContainer.innerHTML = "";

    if (productCart.length === 0) {
        cartContainer.innerHTML = `<p class="empty">Cart is empty</p>`;
        return;
    }

    productCart.forEach((item) => {

        let cartItem = data.find((e) =>
            (e.productId) ==(item.productId)
        );

        if (cartItem) {
            cartContainer.innerHTML += `
                   
    <div class="cart-item">

        <div class="cart-left">
                <img src="${cartItem.images[0].full}">

                <div class="info">
                    <div class="company"><p>${cartItem.company}</p></div>
                    <div class="name"><p>${cartItem.productName}</p></div>
                    <div class="price"><p>${cartItem.currency} ${cartItem.current}</p></div>
                </div>
        </div>
        <div class="cart-right">
            

            <div class="actions">
             
            <div class="cart-quantity">
                <button class="minus" data-id=${cartItem.productId}><img src="./images/icon-minus.svg"></button>
                <span class="count" >${item.count}</span>
                <button class="plus" data-id=${cartItem.productId}><img src="./images/icon-plus.svg"></button>
            </div>
            <div class="total">
               <span>Price : ${cartItem.currency} ${cartItem.current * item.count}</span>
            </div>
                
            </div>
            <button class="remove" data-id=${cartItem.productId}><img src="./images/icon-delete.svg"></button>
            

        </div>
       

    </div>
    

    

    `;

            
    }

    cartContainer.innerHTML += `
        <div class="checkout">
             <button class="checkout-btn">Checkout</button>
        </div>
     `;

        
        
    
    });



    


    
   
    
   
    

    


 
    
}


let cartContainer = document.querySelector(".cart-container");


cartContainer.addEventListener("click",(e)=>{

    let btn = e.target.closest("button");
    let productCart = JSON.parse(localStorage.getItem("product-cart")) || [];
    let id=btn.getAttribute("data-id");
    if (!btn) return;


    
    //increade item
    if(btn.classList.contains("plus")){
        let item=productCart.find((p)=>{
           return p.productId==id;
        });

       
        item.count++;
       
    }

    //decrease item

    if(btn.classList.contains("minus")){

        let item=productCart.find((p)=>{
            
            return p.productId==id;

        
        });
        if(item && item.count >1){
            item.count--;
        }
        
    }

    //remove item

    if(btn.classList.contains("remove")){
        
        productCart=productCart.filter((p)=>{
            
            return p.productId!=id;

        
        });
        
    }


    
    
    //save
    localStorage.setItem("product-cart", JSON.stringify(productCart));

    
    
    //uptade cart count in navbar
    updateCartCount();

    renderCart()

})


























