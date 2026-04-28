if(!JSON.parse(localStorage.getItem("product-cart"))){
    localStorage.setItem("product-cart", JSON.stringify([]));
}


function updateCartCount() {
    let productCart = JSON.parse(localStorage.getItem("product-cart") || "[]");

    let total = 0;

    productCart.forEach(item => {
        total += item.count;
    });

    let countEl = document.querySelector(".cart-count");

    
    countEl.innerText = total;
    
}


updateCartCount();