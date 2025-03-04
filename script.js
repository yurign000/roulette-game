let pointer = getComputedStyle(document.querySelector('#pointer'));
let pHeight = Number(pointer.height.replace('px',''));
let pLeft = Number(pointer.left.replace('px',''));

let roulette = document.querySelector("#roulette");
let rotator = document.querySelector("#rotator")

let random_rotation = Math.floor(Math.random() * 360 * 10) + (360 * 5)

console.log(10 + random_rotation/360)

let cursor_rotate_animation = '@keyframes cursor_rotate{';
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
`
let style = document.createElement('style');
const startRoulette = () => {
    style.innerHTML = cursor_rotate_animation;
    
    roulette.style.transform = `rotate(${random_rotation}deg)`
    document.head.appendChild(style)
    setTimeout(() => {
        roulette.style.transform = 'rotate(0deg)'
        roulette.style.transition = 'none'
        style.innerHTML = '';
    }, 10 * 1000);
}

const editRouletteOptions = (id, text) => {
    document.querySelector(`#roulette .rewards[data-id='${id}']`).innerHTML = text;
}
 