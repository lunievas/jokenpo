let pontosDoUsuario = 0
let pontosDoComputador = 0

const USUARIO = 'Usuário';
const COMPUTADOR = 'Computador';
const PAPEL = "papel";
const PEDRA = "pedra";
const TESOURA = "tesoura";
const jogadasPossiveis = [PAPEL, PEDRA, TESOURA];

/*
const imgPapel: Elemento img que mostra a imagem do papel 
const imgPedra: Elemento img que mostra a imagem da pedra
const imgTesoura: Elemento img que mostra a imagem da tesoura
const divJogadaDoComputador: Elemento div que mostra a interrogaçãodo e vai mostrar a jogada do computador;
const spanPlacarUsuario: Elemento span que mostra a pontuação do usuário;
const spanPlacarComputador: Elemento span que mostra a pontuação do computador;
const pPlacar: Elemento p que contem as duas spans que mostram os pontos;
const audioDaVitoria: Elemento que contém o áudio da vitória;
const audioDaDerrota: Elemento que contém audio da derrota;
*/

//CAPTURA DOS ELEMENTOS//
const imgPapel = document.getElementById('imgPapel');
const imgPedra = document.getElementById('imgPedra');
const imgTesoura = document.getElementById('imgTesoura');

const divJogadaDoComputador = document.getElementById('compChoice');

const spanPlacarUsuario = document.getElementById('userScore');
const spanPlacarComputador = document.getElementById('compScore');

const pPlacar = document.getElementById('scores');

const audioDaVitoria = document.getElementById('audioDaVitoria');
const audioDaDerrota = document.getElementById('audioDaDerrota');

/**
 * 
 * A função deve atualizar o placar na tela
 * 
 * @param {number} pontosDoUsuario 
 * @param {number} pontosDoComputador 
 */
function atualizarPlacar(pontosDoUsuario, pontosDoComputador){
    spanPlacarComputador.innerText =  pontosDoComputador;
    spanPlacarUsuario.innerText = pontosDoUsuario;
}


/**
 * Limpa todas classe css de pPlacar e em seguida
 * atribui a classe 'green-glow a pPlacar
 */
function mostrarUsuarioVencendo(){ 
   pPlacar.classList.remove('scoreboard','red-glow');

    pPlacar.classList.add('green-glow');
}

/**
 * Limpa todas classes css de pPlacar e em seguida
 * atribui a classe 'red-glow a pPlacar
 */
function mostrarUsuarioPerdendo(){
    // pPlacar.classList.replace("green-glow", "red-glow");
    pPlacar.classList.remove('green-glow', 'scoreboard');
    pPlacar.classList.add('red-glow');

   
}
/**
 * Limpa todas classe css de pPlacar
 */
function mostrarJogoEmpatado(){
    pPlacar.classList.remove('green-glow', 'red-glow');
}

/**
 * 
 * Retorna USUARIO caso a pontuacaoDoUsuario seja maior
 * que pontuacaoDoComputador. Retorna COMPUTADOR caso
 * pontuacaoDoComputador seja maior que pontuacaoDoUsuario.
 * Retorna undefined se as pontuações forem iguais.
 * 
 * @param {number} pontosDoUsuario 
 * @param {number} pontosDoComputador 
 * @returns USUARIO | COMPUTADOR | undefined
 */
function quemEstaGanhando(pontosDoUsuario, pontosDoComputador) {
    if(pontosDoComputador > pontosDoUsuario){
        return COMPUTADOR;
    }else if(pontosDoUsuario > pontosDoComputador){
        return USUARIO;
    }else{
        return undefined;
    }
}

/**
 * Pausa o audioDaVitoria, volta para o instante zero e
 * toca audioDaVitoria
 */
function alertarVitoria(){
    audioDaVitoria.pause();
    audioDaVitoria.currentTime = 0;
    audioDaVitoria.play();
}

function alertarDerrota(){
    audioDaDerrota.pause();
    audioDaDerrota.currentTime = 0;
    audioDaDerrota.play();
  };

/**
 * 
 * @param {string} jogadaDoUsuario 
 * @param {string} jogadaDoComputador 
 * @returns USUARIO | COMPUTADOR | undefined
 */
function quemVenceu(jogadaDoUsuario, jogadaDoComputador) {

    const combinacao = jogadaDoUsuario + jogadaDoComputador;

    switch (combinacao) {

        // VITÓRIA!
        case PAPEL + PEDRA:
        case PEDRA + TESOURA:
        case TESOURA + PAPEL:
            return USUARIO;

        // DERROTA!
        case PEDRA + PAPEL:
        case TESOURA + PEDRA:
        case PAPEL + TESOURA:
            return COMPUTADOR

        // EMPATE!
        default:
            return undefined;

    }

}

function jogadaAleatoria(){
    let n = Math.floor(3 * Math.random());
    return jogadasPossiveis[n]
  
}

function jokenpo(jogadaDoUsuario){
    let jogadaDoComputador =  jogadaAleatoria();
    let vencedor =  quemVenceu(jogadaDoUsuario, jogadaDoComputador);

    if(vencedor == USUARIO){
        pontosDoUsuario++;
        alertarVitoria();
    }else if(vencedor == COMPUTADOR){
        pontosDoComputador++;
        alertarDerrota();
    }

    atualizarPlacar(pontosDoUsuario, pontosDoComputador)
}





function onPapelClick(){
    jokenpo(PAPEL);
}

function onTesouraClick() {
    jokenpo(TESOURA);
}

function onPedraClick(){
    jokenpo(PEDRA);
}

imgPapel.addEventListener('click', onPapelClick);
imgTesoura.addEventListener('click', onTesouraClick);
imgPedra.addEventListener('click', onPedraClick);





atualizarPlacar(3,2);
mostrarUsuarioVencendo();
mostrarUsuarioPerdendo();
mostrarJogoEmpatado();
// console.log(quemEstaGanhando(10,6))

