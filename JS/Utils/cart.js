import {getProduct} from "./Services/api.js";



export async function renderCart(){

    let data=await getProduct();
    let productCart = JSON.parse(localStorage.getItem("product-cart")) || [];
    let basketContainer = document.querySelector(".basket-container");
    
    
    basketContainer.innerHTML = "";

    if (productCart.length === 0) {
        basketContainer.innerHTML = "<p>Cart is empty</p>";
        return;
    }

    productCart.forEach((item) => {

        let containerItem = data.find((e) =>
            (e.productId) ==(item.productId)
        );

        if (containerItem) {
            basketContainer.innerHTML += `
                   
            <div class="cart-item">

            <div class="cart-left">
                <img src="${containerItem.images[0].full}">

                <div class="info">
                    <div class="company">${containerItem.company}</div>
                    <div class="name">${containerItem.productName}</div>
                    <div class="price">${containerItem.currency} ${containerItem.current}</div>
                </div>
            </div>
            <div class="total">
               <span>Price : ${containerItem.currency} ${containerItem.current * item.count}</span>
            </div>

            <div class="actions">
                <div>
                <button class="minus" data-id=${containerItem.productId}>-</button>
                <span class="count" >${item.count}</span>
                <button class="plus" data-id=${containerItem.productId}>+</button>
                <button class="remove" data-id=${containerItem.productId}>Remove</button>
               </div>
            </div>

        </div>
       

    </div>
    

    

    `;

            
    }

    basketContainer.innerHTML += `
        <div class="checkout">
             <button class="checkout-btn">Checkout</button>
        </div>
     `;

        
        
    
    });



    


    
   
    
   
    

    


 
    
}


let basketContainer = document.querySelector(".basket-container");


basketContainer.addEventListener("click",(e)=>{

    let productCart = JSON.parse(localStorage.getItem("product-cart")) || [];
    let id=e.target.getAttribute("data-id");


    
    //increade item
    if(e.target.classList.contains("plus")){
        let item=productCart.find((p)=>{
           return p.productId==id;
        });

       
        item.count++;
       
    }

    //decrease item

    if(e.target.classList.contains("minus")){

        let item=productCart.find((p)=>{
            
            return p.productId==id;

        
        });
        if(item && item.count >1){
            item.count--;
        }
        
    }

    //remove item

    if(e.target.classList.contains("remove")){
        
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


























