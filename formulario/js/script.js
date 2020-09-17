const Validator = {
  handleSubmit: (event) => {
    event.preventDefault()

    let inputs = form.querySelectorAll('input')
    let valid = true
    
    // Limpar mensagens de erro, se houver
    Validator.clearErrors()

    for (let ipt of inputs) {
      // Retorna true ou a mensagem de erro
      let resposta = Validator.checkInput(ipt)

      if (resposta != true) {
        // Exibe o 
        valid = false
        Validator.showError(ipt, resposta)
      }
    }

    console.log(valid)

    if (valid) {
      form.submit()
    }
  },
  checkInput: (ipt) => {
    let valid = true
    let rules = ipt.getAttribute('data-rules')
    let emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (rules) {
      // Separa as regras
      rules = rules.split('|')
      console.log(rules)

      for (let rule of rules) {
        // Remove espaços em branco no início e no final da string
        rule = rule.trim()
        // Separa a regra do valor, caso haja
        rule = rule.split(':')

        switch (rule[0]) {
          case 'required':
            if (! ipt.value) {
              valid = false
              return 'Campo obrigatório.'
            }
            break
          case 'min':
            if (ipt.value.length < rule[1]) {
              valid = false
              return `Campo precisa de no mínimo ${rule[1]} caractere${rule[1] == 1 ? '' : 's'}.`
            }
            break
          case 'email':
            if (ipt.value) {
              if (! emailRegex.test(ipt.value.toLowerCase())) {
                valid = false
                return 'E-mail inválido.'
              }
            }
            break
          case 'confirmed':
            let confirmation = form.querySelector('input[name=senha_confirmacao]')
            if (! confirmation) {
              continue
            }
            
            if (ipt.value != confirmation.value) {
              valid = false
              Validator.showError(confirmation)
              return 'Senhas não conferem.'
            }
            break
        }
      }
    }

    return valid
  },
  showError: (ipt, errorMessage) => {
    ipt.classList.add('contem-erro')

    if (errorMessage) {
      let eError = document.createElement('div')
      eError.classList.add('erro')
      eError.innerHTML = errorMessage

      ipt.parentElement.insertBefore(eError, ipt.nextElementSibling)
    }
  },
  clearErrors: () => {
    let inputs = form.querySelectorAll('input')
    let errors = form.querySelectorAll('.erro')

    for (let i of inputs) {
      i.classList.remove('contem-erro')
    }

    for (let e of errors) {
      e.remove()
    }
  }
}
const form = document.querySelector('.formulario')
form.addEventListener('submit', Validator.handleSubmit)