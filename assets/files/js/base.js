const music =
document.getElementById(
  "bgMusic"
);

const toggle =
document.getElementById(
  "musicToggle"
);

const icon =
toggle.querySelector(
  ".icon"
);


const musicOn =
"../../assets/images/on.png";

const musicOff =
"../../assets/images/off.png";

const maxVolume = 0.25;

music.volume = maxVolume;

let playing = false;

let fading = false;

async function startMusic(){

  if(fading) return;

  try{

    await music.play();

    playing = true;

    icon.src =
    musicOn;

    music.volume = 0;

    fading = true;

    let volume = 0;

    const fade =
    setInterval(() => {

      if(volume >= maxVolume){

        clearInterval(fade);

        music.volume =
        maxVolume;

        fading = false;

        return;

      }

      volume += 0.01;

      music.volume = volume;

    }, 60);

  }catch(error){

    console.log(
      "erro play:",
      error
    );

  }

}


function stopMusic(){

  if(fading) return;

  fading = true;

  let volume =
  music.volume;

  const fade =
  setInterval(() => {

    if(volume <= 0.01){

      clearInterval(fade);

      music.pause();

      music.volume = 0;

      playing = false;

      fading = false;

      icon.src =
      musicOff;

      return;

    }

    volume -= 0.01;

    music.volume = volume;

  }, 60);

}


document.addEventListener(
  "click",
  async () => {

    if(
      localStorage.getItem(
        "musicAllowed"
      ) === "true"
      &&
      !playing
    ){

      await startMusic();

    }

  },
  { once: true }
);


toggle.addEventListener(
  "click",
  async (e) => {

    e.stopPropagation();

    toggle.classList.remove(
      "switching"
    );

    void toggle.offsetWidth;

    toggle.classList.add(
      "switching"
    );

    if(playing){

      stopMusic();

    } else {

      await startMusic();

    }

  }
);


window.addEventListener(
  "scroll",
  () => {

    toggle.style.top =
    "24px";

    toggle.style.right =
    "24px";

  }
);


const portal =
document.getElementById(
  "musicPortal"
);

if(portal){

  portal.appendChild(
    toggle
  );

}


const allAudios =
document.querySelectorAll(
  "audio"
);

allAudios.forEach(audio => {

  if(audio.id === "bgMusic")
    return;

  audio.addEventListener(
    "play",
    () => {

      if(!music.paused){

        stopMusic();

      }

      allAudios.forEach(other => {

        if(
          other !== audio
        ){

          other.pause();

        }

      });

    }
  );

  audio.addEventListener(
    "pause",
    async () => {

  

      const someonePlaying =
      [...allAudios].some(a =>
        a !== music &&
        !a.paused
      );

      if(
        !someonePlaying
        &&
        localStorage.getItem(
          "musicAllowed"
        ) === "true"
      ){

        await startMusic();

      }

    }
  );

});