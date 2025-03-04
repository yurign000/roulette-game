let roulette = document.querySelector("#roulette");
let roulette_shadow = document.querySelector("#roulette__shadow");
let rotator = document.querySelector("#rotator");
let pointer = document.querySelector("#pointer");
let style = document.createElement('style');
let rouletteSizeStyle = document.createElement('style');

let cursor_rotate_animation = '';
let alreadyStarted = false;

rouletteSizeStyle.innerHTML = `
    :root{
        --size: ${window.innerHeight * 0.79}px;
    }
`
document.head.appendChild(rouletteSizeStyle);

pointer.style.left = `calc(50vw + (${getComputedStyle(roulette).width}/2) + 85px)`

const createRotateAnimation = (random_rotation) => {
    cursor_rotate_animation = '@keyframes cursor_rotate{';
    
    for(let i = 0, j = 1; i<100; i += 0.2){
        if(i > 10 + (random_rotation/360)){
            i += j
            j+=1
        }
        cursor_rotate_animation += `
        ${i}%{
            transform: translate(-5px, 10px) rotate(-12deg);
        }
        ${i+0.7}%{
            transform: translate(-5px, 10px) rotate(-5deg);
        }`
        i+=0.7
    }
    cursor_rotate_animation += `
        }
        #rotator{
            animation: cursor_rotate 10s forwards;
            animation-timing-function: cubic-bezier(0.15, 1.29, 1, 1);
        }
        #roulette{
            transition: 10s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
    `
}

const getRandomRotation = () => {
    let random_rotation = Math.floor(Math.random() * 360 * 10) + (360 * 10); 
    createRotateAnimation(random_rotation);

    return random_rotation;
}

const startRouletteController = () => {
    if(!alreadyStarted){
        alreadyStarted = true;
    
        roulette.style.animation = 'none'
        roulette_shadow.style.animation = 'none'
        roulette.style.transform = 'rotate(0deg)';
        style.remove()
    
        setTimeout(() => {
            startRoullete()
        }, 100);
    };
}
    
const startRoullete = () => {
    let random_rotation = getRandomRotation();

    style.innerHTML = cursor_rotate_animation;
    
    roulette.style.transform = `rotate(${random_rotation}deg)`
    document.head.appendChild(style)

    setTimeout(() => {
        alreadyStarted = false;    
    }, 10 * 1000);
}

const editRouletteOptions = (id, text) => {
    document.querySelector(`#roulette .rewards[data-id='${id}']`).innerHTML = text;
}
 