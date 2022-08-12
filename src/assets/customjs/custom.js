// let box = document.getElementById('notifi-box');
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

//Dashboard sidebar toggle function
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