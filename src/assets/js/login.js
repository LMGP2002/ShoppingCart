

(function(){
    const wrapper=document.querySelector('.wrapper');
    const btnPopUpLogin=document.querySelector('.btnLogin');
    const close=document.querySelector('.icon-close');
    
    
    // if(btnPopUpLogin!=null && wrapper!=null){
    // }
    if(btnPopUpLogin!=null){
        btnPopUpLogin.addEventListener('click',()=>{
            wrapper.classList.add("active-popup");
        });
    }

    if(close!=null){
        close.addEventListener('click',()=>{
            wrapper.classList.remove("active-popup");
        });

    }
    
})()


var typingEffect=new Typed(".multiText", {
    strings: ["fuerza","agilidad"],
    loop: true,
    typeSpeed : 100,
    backSpeed : 80,
    startDelay : 200,
    backDelay : 1500
})
