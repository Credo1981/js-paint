let canv = document.getElementById('canvas');
let ctx = canv.getContext('2d');
let isMouseDown = false;
let coords = [];

canv.width = window.innerWidth;
canv.height = window.innerHeight;

// PAINT

// мышь нажата
canv.addEventListener('mousedown', function () {
    isMouseDown = true;
})

// мышь отжата
canv.addEventListener('mouseup', function () {
    isMouseDown = false;
    ctx.beginPath();
    coords.push('');
})

// мышь двигается
canv.addEventListener('mousemove', function (e) {

    if (isMouseDown) {

        coords.push([e.clientX, e.clientY]);

        ctx.lineWidth = 5 * 2;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
})

// нажатие горячих клавиш

// Функция Сохранить рисунок в localStorage
function save() {
    localStorage.setItem('coords', JSON.stringify(coords));
}


// Функция Очистить экран
function clear() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.beginPath();
    ctx.fillStyle = 'black';

}

function replay() {
    let timer = setInterval(function () {
        if (!coords.length) {
            clearInterval(timer);
            ctx.beginPath();
            return;
        }
        let crd = coords.shift();
        let e = {
            clientX: crd['0'],
            clientY: crd['1']
        };
        // дублирование кода отрисовки
        ctx.lineWidth = 5 * 2;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);


    }, 30)
}

document.addEventListener('keydown', function (e) {
    // console.log(e.keyCode);
    if (e.keyCode == 83) {
        // s = save
        save();
        console.log('Saved...')
    }
    if (e.keyCode == 82) {
        // r = replay
        console.log('Replaying...')

        coords = JSON.parse(localStorage.getItem('coords'));
        clear();
        replay();
    }
    if (e.keyCode == 67) {
        // c = clear
        clear();
        console.log('Cleared...')
    }
})
