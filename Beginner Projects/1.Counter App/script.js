let count = 0;

document.getElementsByClassName("increase")[0].addEventListener('click',function(){
    count++;
    document.getElementById('todisplay').innerHTML = count
});

document.getElementsByClassName("decrease")[0].addEventListener('click',function(){
    count--;
    if(count<0){
        count = 0;
        document.getElementById('todisplay').innerHTML = count;
    }
    else{
        document.getElementById('todisplay').innerHTML = count
    }
});

document.getElementsByClassName("reset")[0].addEventListener('click',function(){
    count = 0;
    document.getElementById('todisplay').innerHTML = count
});

