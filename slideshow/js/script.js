var imgQtd = 0
var isParado = false
var slideAtual = 0

ajax('fotos.json', 'GET', (resposta) => {
  let fotos = JSON.parse(resposta)
  imgQtd = fotos.length

  for (let item of fotos) {
    console.log(item)
    document.querySelector('.slider .painel').innerHTML +=
      `<div class="item" style="background-image: url(${item['url']});">
        <div class="info">
          <h3 class="titulo">${item['info']['titulo']}</h3>
          <p class="subtitulo">${item['info']['subtitulo']}</p>
        </div>
      </div>`
  }

  document.querySelector('.slider .painel').style.width = `calc(100vw * ${imgQtd})`

  setInterval(() => { if (! isParado) avancar() }, 8000)
})

function voltar() {
  slideAtual = (slideAtual > 0 ? slideAtual : imgQtd) -1
  atualizarMargem()
}

function togglePausar() {
  let iconeClasse = `fas fa-${isParado ? 'pause' : 'play'}`
  document.querySelector('.slider .controle.pausa span').className = iconeClasse
  isParado = ! isParado
}

function avancar() {
  slideAtual = slideAtual >= (imgQtd -1) ? 0 : slideAtual +1
  atualizarMargem()
}

function atualizarMargem() {
  let novaMargem = slideAtual * document.querySelector('.slider .item').clientWidth
  document.querySelector('.slider .painel').style.marginLeft = `-${novaMargem}px`
}