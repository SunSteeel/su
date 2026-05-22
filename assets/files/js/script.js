

const releaseDate =
new Date(2026, 4, 22, 20, 47, 0);

const hoursElement =
document.getElementById('hours');

const minutesElement =
document.getElementById('minutes');

const secondsElement =
document.getElementById('seconds');

function updateCountdown(){

  const now = new Date();

  const diff = releaseDate - now;



  if(diff <= 0){

    window.location.href = "home.html";

    return;
  }


  const totalHours =
  Math.floor(diff / (1000 * 60 * 60));

  const minutes =
  Math.floor((diff / (1000 * 60)) % 60);

  const seconds =
  Math.floor((diff / 1000) % 60);



  hoursElement.innerText =
  String(totalHours).padStart(2, '0');

  minutesElement.innerText =
  String(minutes).padStart(2, '0');

  secondsElement.innerText =
  String(seconds).padStart(2, '0');

}


updateCountdown();

setInterval(updateCountdown, 1000);