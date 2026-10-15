const perguntas = [
    {
        pergunta:
            "Você pretende fazer vestibular após terminar o ensino médio?",
        opcoes: [
            "Sim, quero entrar em uma faculdade.",
            "Ainda não decidi se quero fazer vestibular."
        ]
    },
    {
        pergunta:
            "Você já sabe qual profissão deseja seguir?",
        opcoes: [
            "Sim, já tenho uma profissão em mente.",
            "Não, ainda estou descobrindo minhas opções."
        ]
    },
    {
        pergunta:
            "Como você se sente em relação ao vestibular?",
        opcoes: [
            "Estou confiante e me preparando para a prova.",
            "Estou preocupado(a) e tenho dúvidas sobre como me preparar."
        ]
    },
    {
        pergunta:
            "O que você pretende fazer depois de concluir o ensino médio?",
        opcoes: [
            "Fazer uma faculdade ou curso técnico.",
            "Procurar um emprego e conquistar minha independência financeira."
        ]
    },
    {
        pergunta:
            "Qual é sua maior preocupação em relação ao futuro?",
        opcoes: [
            "Escolher a profissão certa e conseguir entrar na faculdade.",
            "Conseguir um bom emprego e ter estabilidade financeira."
        ]
    }
];

// Estado do questionário
let perguntaAtual = 0;
let respostas = [];

// Elementos da página
const secaoPerguntas =
    document.getElementById("secao-perguntas");

const secaoResultado =
    document.getElementById("secao-resultado");

const elementoPergunta =
    document.getElementById("pergunta");

const elementoOpcoes =
    document.getElementById("opcoes");

const elementoContador =
    document.getElementById("contador");

const elementoPorcentagem =
    document.getElementById("porcentagem");

const elementoProgresso =
    document.getElementById("progresso");

const elementoBarra =
    document.getElementById("barra");

const elementoMensagem =
    document.getElementById("mensagem");

const botaoProximo =
    document.getElementById("proximo");

const botaoReiniciar =
    document.getElementById("reiniciar");

const listaRespostas =
    document.getElementById("lista-respostas");

// Exibe a pergunta atual e suas duas opções
function mostrarPergunta() {
    const item = perguntas[perguntaAtual];

    elementoPergunta.textContent = item.pergunta;

    elementoContador.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    const porcentagem =
        Math.round(
            ((perguntaAtual + 1) / perguntas.length) * 100
        );

    elementoPorcentagem.textContent = `${porcentagem}%`;
    elementoProgresso.style.width = `${porcentagem}%`;

    elementoBarra.setAttribute(
        "aria-valuenow",
        String(porcentagem)
    );

    elementoOpcoes.replaceChildren();
    elementoMensagem.textContent = "";
    botaoProximo.disabled = true;

    // Cria os dois botões de resposta
    item.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "opcao";
        botao.textContent =
            `${indice === 0 ? "A" : "B"}) ${opcao}`;

        botao.setAttribute("aria-pressed", "false");

        botao.addEventListener("click", () => {
            selecionarResposta(indice);
        });

        elementoOpcoes.appendChild(botao);
    });

    // Muda o texto do botão na última pergunta
    botaoProximo.textContent =
        perguntaAtual === perguntas.length - 1
            ? "Ver minhas respostas →"
            : "Próxima pergunta →";
}

// Registra a resposta escolhida
function selecionarResposta(indice) {
    respostas[perguntaAtual] = indice;

    const botoes =
        elementoOpcoes.querySelectorAll(".opcao");

    botoes.forEach((botao, i) => {
        const selecionado = i === indice;

        botao.classList.toggle(
            "selecionada",
            selecionado
        );

        botao.setAttribute(
            "aria-pressed",
            String(selecionado)
        );
    });

    elementoMensagem.textContent =
        "Resposta selecionada! Você pode continuar.";

    botaoProximo.disabled = false;
}

// Avança para a próxima pergunta
function avancarPergunta() {
    // Impede o avanço sem uma resposta
    if (respostas[perguntaAtual] === undefined) {
        elementoMensagem.textContent =
            "Escolha uma opção antes de continuar.";
        return;
    }

    if (perguntaAtual < perguntas.length - 1) {
        perguntaAtual++;
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

// Mostra todas as respostas escolhidas
function mostrarResultado() {
    secaoPerguntas.hidden = true;
    secaoResultado.hidden = false;

    listaRespostas.replaceChildren();

    perguntas.forEach((item, indice) => {
        const linha = document.createElement("li");
        const respostaEscolhida =
            item.opcoes[respostas[indice]];

        const perguntaTexto =
            document.createElement("strong");

        perguntaTexto.textContent = item.pergunta;

        const respostaTexto =
            document.createElement("p");

        respostaTexto.textContent =
            `${respostas[indice] === 0 ? "A" : "B"}) ${respostaEscolhida}`;

        linha.appendChild(perguntaTexto);
        linha.appendChild(respostaTexto);

        listaRespostas.appendChild(linha);
    });

    botaoReiniciar.focus();
}

// Reinicia o questionário
function reiniciarQuestionario() {
    perguntaAtual = 0;
    respostas = [];

    secaoPerguntas.hidden = false;
    secaoResultado.hidden = true;

    mostrarPergunta();
}

// Eventos dos botões
botaoProximo.addEventListener(
    "click",
    avancarPergunta
);

botaoReiniciar.addEventListener(
    "click",
    reiniciarQuestionario
);

// Inicia o questionário
mostrarPergunta();