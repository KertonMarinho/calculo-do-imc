// Capturar evento de submit do formulário
const form = document.querySelector('#formulario');
//esculta a cada submit do formulário e chama a função que incia a validação do calculo
form.addEventListener('submit', function (e) { //primeiro parametro qual o evento deve escultar:submet
  e.preventDefault();//parar o envio do formulário uitlizando o evento(preventDefault)
  //pega dados do input inteiro
  const inputPeso = e.target.querySelector('#peso'); //target:Obtenha o elemento que desencadeou um evento específico
  const inputAltura = e.target.querySelector('#altura');
  //pegando o valor do input e converte inputs pra number,se o objeto não pode ser convertido para um número, é retornado NaN
  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);
  //estrutura condicional:se retorna um NAN execulta o if
  if (!peso) {
    setResultado('Peso inválido', false);
    return;//sempre que tiver return a funcão parar neste local
  }

  if (!altura) {
    setResultado('Altura inválida', false);
    return;
  }

  const imc = getImc(peso, altura); //chama e armazena a função de calculo do imc
  const nivelImc = getNivelImc(imc);//chama a função e mostrar o nível de imc

  const msg = `Seu IMC é ${imc} (${nivelImc}).`;

  setResultado(msg, true);
});

function getNivelImc (imc) {
  const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso',
    'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

  if (imc >= 39.9) return nivel[5];
  if (imc >= 34.9) return nivel[4];
  if (imc >= 29.9) return nivel[3];
  if (imc >= 24.9) return nivel[2];
  if (imc >= 18.5) return nivel[1];
  if (imc < 18.5) return nivel[0];
}
//calculo do imc
function getImc (peso, altura) {
  const imc = peso / altura ** 2;
  return imc.toFixed(2);//duas casas decimais
}
//cria  o paragrafo (tag <p>)
function criaP () {
  const p = document.createElement('p');
  return p;
}
//funcção que coloca o resultadao dentro da div
function setResultado (msg, isValid) {//segunda pra emtro recebe false o true
  const resultado = document.querySelector('#resultado');//seleciona id resultado do html
  resultado.innerHTML = '';//limpa o html result

  const p = criaP();
  //adcionando uma classe na tag p
  if (isValid) {
    p.classList.add('paragrafo-resultado'); //<p class="paragrafo-resultado">
  } else {
    p.classList.add('bad');  //<p class="bad">
  }
  //adiciona mensagem ao usuário
  p.innerHTML = msg;
  resultado.appendChild(p);
}
