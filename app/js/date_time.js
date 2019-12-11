// HOUR
const clock = () => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('hora').innerHTML =
    h + ":" + m + ":" + s;

    //DATE
    let dia = today.getDate();
    let mes = today.getMonth();
    let ano = today.getUTCFullYear();
    
    document.getElementById('data').innerHTML = dia +'/'+(mes++) + '/' + ano;


    let t = setTimeout(clock, 500);
}

const checkTime = (i) => {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


