
//notification toggle function - trainer dashboard
let down = false;
function toggleNotification(box){
    if (down) {
        box.style.height = '0px';
        box.style.opacity = 0;
        down = false;
    }
    else {
        box.style.height = '300px';
        box.style.opacity = 1;
        down = true;
    }
}

//Dashboard sidebar toggle function -- trainer dashboard
let hamclicked = false;
function toggleSidebar(sidebar, close) {
    if(!hamclicked) {
        sidebar.style.left = '0px';
        sidebar.style.width = '200px';
        sidebar.style.zIndex = '1';
        close.style.display = 'initial';
        hamclicked = true;
    }    
    else {
        sidebar.style.left = '0px';
        sidebar.style.width = '0px';                
        hamclicked = false;
    }

    close.addEventListener("click", function() {
        sidebar.style.left = '0px';
        sidebar.style.width = '0px'; 
        close.style.display = 'none';
        hamclicked = false;
    });

}

//Password strength meter - signup page
let regExpWeak = /[a-zA-Z]/;
let regExpMedium = /\d+/;
let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
function passwordStrength(input, indicator, weak, medium, strong, text){
    let flag = 0;
    if(input.value !=""){
        indicator.style.display = "block";
        indicator.style.display = "flex";

        if((input.value.length <=3) && ((input.value.match(regExpWeak)) || (input.value.match(regExpMedium)) || (input.value.match(regExpStrong)))) flag=1;
        if(((input.value.length >3) && (input.value.length <8)) && ((input.value.match(regExpWeak)) && (input.value.match(regExpMedium))) || ((input.value.match(regExpMedium)) && (input.value.match(regExpWeak))) || (input.value.match(regExpStrong))) flag=2;
        if(((input.value.length >=8) && (input.value.length <=20)) && (input.value.match(regExpWeak)) && (input.value.match(regExpMedium)) && (input.value.match(regExpStrong))) flag=3;
        
        if(flag == 1){
            weak.classList.add("active");
            text.style.display = "block";
            text.classlist.add("weak");
            text.textContent = "Weak password";            
        } 

        if(flag == 2){
            medium.classList.add("active"); 
            // text.style.display = "block";
            text.classList.add("medium");            
            text.textContent = "Average password";
        } else{
            medium.classList.remove("active");
            text.classList.remove("medium");
        }

        if(flag == 3){
            strong.classList.add("active");
            medium.classList.add("active");
            // text.style.display = "block";
            text.classList.add("strong");            
            text.textContent = "Strong password";
        } else{
            strong.classList.remove("active");
            text.classList.remove("strong");
        }
        

    } else {
        indicator.style.display = "none";
        text.style.display = "none"
    }
}