

export async function getProduct(){
    let response = await fetch("../product.json");
    let data= await response.json();
    return data;
    
    
}




