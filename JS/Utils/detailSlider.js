function setupSlider(){
    
    let slides=document.querySelectorAll(".image-product");
    let thumbs=document.querySelectorAll(".thumb");
    let prev=document.querySelector(".prev");
    let next=document.querySelector(".next");
    



    let currentIndex=0;

    showSlide(currentIndex);

    function showSlide(index){

       slides.forEach((img)=>{

          img.classList.remove("active");
          slides[index].classList.add("active");

    });

    thumbs.forEach((e)=>{
        
        e.classList.remove("active");
        thumbs[index].classList.add("active");


        
    });



    }




   

    prev.addEventListener("click", ()=>{

       currentIndex++;

       if(currentIndex>=slides.length){

           currentIndex=0;
        }

    showSlide(currentIndex);

    });

   

    next.addEventListener("click", ()=>{

    currentIndex--;

        if(currentIndex<0){

            currentIndex=slides.length-1;
        }

    showSlide(currentIndex);

    });


    thumbs.forEach((img, index)=>{

       img.addEventListener("click", ()=>{

         currentIndex=index;

    showSlide(currentIndex);

        });
    

    });

}