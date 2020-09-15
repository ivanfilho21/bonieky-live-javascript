const rVotoPara = document.querySelector('.esquerda .rotulo.r1 span')
const rCargo = document.querySelector('.esquerda .rotulo.r2 span')
const numeros = document.querySelector('.esquerda .rotulo.r3')
const rDescricao = document.querySelector('.esquerda .rotulo.r4 span')
const rRodape = document.querySelector('.esquerda .rodape')

const candidato = document.querySelector('.direita .candidato')
const vice = document.querySelector('.direita .candidato.menor')

window.onload = () => {
  let btns = document.querySelectorAll('.teclado--botao')
  for (let btn of btns) {
    btn.onclick = () => {
      clicar(btn.innerHTML)
    }
  }

  document.querySelector('.teclado--botao.branco').onclick = () => branco()
  document.querySelector('.teclado--botao.laranja').onclick = () => corrigir()
  document.querySelector('.teclado--botao.verde').onclick = () => confirmar()
}

function clicar(value) {
  console.log(value)
}

function branco() {
  console.log('branco')
}

function corrigir() {
  console.log('corrigir')
}

function confirmar() {
  console.log('confirmar')
}