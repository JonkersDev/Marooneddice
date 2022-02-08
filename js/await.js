let interaction = false;
const body = document.body;
const checkInter = ()=>{
  interaction = true;
  body.removeEventListener('click', checkInter);
}
body.addEventListener('click', checkInter);

let fullScr = document.createElement('div');
fullScr.classList.add('await-click');
fullScr.innerText = 'Rotate your screen to lanndscape and click the screen to continue'
fullScr.addEventListener('click', ()=>{
    document.body.requestFullscreen();
    let script = document.createElement('script');
    script.src = 'js/total.js';
    body.append(script);

    body.append()
    fullScr.remove();
});
body.append(fullScr)

let sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
