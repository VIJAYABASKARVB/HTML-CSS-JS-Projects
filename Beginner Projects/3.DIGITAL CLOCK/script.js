// METHOD 1:
/*
setInterval(timedisplay,1000);

function timedisplay(){

    const d = new Date();
    text = d.toString();

    let extracted = text.slice(16,24);

    document.getElementById('time-display').innerHTML = extracted;

}
*/

// METHOD 2:
setInterval(timedisplay, 1000);

function timedisplay() {
    const d = new Date();
    const time = d.toLocaleTimeString(); 
    document.getElementById('time-display').textContent = time;
}



