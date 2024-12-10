const html = document.querySelector('html');

const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');

const banner = document.querySelector('.app__image');
const displayTempo = document.querySelector('#timer');
const titulo = document.querySelector('.app__title');

const imagemPlayPause = document.querySelector('.app__card-primary-butto-icon');

const iniciarOuPausarBtn = document.querySelector('#start-pause span');

const botoes = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause');

const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('./sons/play.wav');
const musicaPausa = new Audio('./sons/pause.mp3');
const tempoFinalizado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else{
        musica.pause()
    }
    
});


focoBtn.addEventListener('click', () => {
   tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
   focoBtn.classList.add('active')

});

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
  curtoBtn.classList.add('active')

});

longoBtn.addEventListener('click', () => {
   tempoDecorridoEmSegundos = 900
    alterarContexto ('descanso-longo')
   longoBtn.classList.add('active')

});

function alterarContexto (contexto){
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;

    }
}

const contagemRegressiva = () => {
if(tempoDecorridoEmSegundos <= 0){
    tempoFinalizado.play()
    alert ('Tempo Finalizado')
    zerar()
    return;

}
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()

}

startPauseBtn.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        musicaPausa.play();
        zerar()
        return;
    };
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBtn.textContent = 'Pausar'
    imagemPlayPause.setAttribute('src', `./imagens/pause.png`)
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBtn.textContent = 'Começar'
    imagemPlayPause.setAttribute('src', `./imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos *1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`

}
mostrarTempo()

document.addEventListener("mousemove", (e) => {
    const glow = document.createElement("div");
    glow.style.cssText = `
        position: absolute; width: 5px; height: 5px; 
        background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 0%);
        border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%);
        opacity: 0.8;
    `;
    glow.style.left = `${e.pageX}px`;
    glow.style.top = `${e.pageY}px`;
    document.body.appendChild(glow);

    setTimeout(() => {
        glow.style.opacity = "0";
        glow.style.transform = "scale(2)";
    }, 10);

    setTimeout(() => glow.remove(), 0); // Remove após 500ms
});

document.addEventListener("click", (e) => {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.style.cssText = `
            position: absolute; width: 5px; height: 5px; 
            background: var(--color-secondary); border-radius: 50%; 
            pointer-events: none; transform: translate(-50%, -50%);
            top: ${e.pageY}px; left: ${e.pageX}px;
            animation: explode 0.5s forwards;
        `;
        document.body.appendChild(particle);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 100;

        particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
        particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);

        setTimeout(() => particle.remove(), 500); // Remove após 500ms
    }
});

// Adicione o estilo para a animação
const style = document.createElement("style");
style.innerHTML = `
@keyframes explode {
    to {
        transform: translate(calc(var(--dx)), calc(var(--dy))) scale(0);
        opacity: 0;
    }
}`;
document.head.appendChild(style);
