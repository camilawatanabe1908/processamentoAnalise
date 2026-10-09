import promptSync from "prompt-sync";

const prompt = promptSync();

type Consumidor = {
    nome: string;
    idade: number;
    email: string;
};

type ExtremosIdade = {
    maisVelho: Consumidor;
    maisNovo: Consumidor;
};

const criarConsumidor = (nome: string, idade: number, email: string): Consumidor => ({
    nome,
    idade,
    email,
});

const lerTexto = (mensagem: string): string => {
    let valor = (prompt(mensagem) ?? "").trim();
    while (valor === "") {
        console.log("Valor inválido. Tente novamente.");
        valor = (prompt(mensagem) ?? "").trim();
    }
    return valor;
};

const lerIdade = (mensagem: string): number => {
    let valor = Number(prompt(mensagem));
    while (Number.isNaN(valor) || valor <= 0) {
        console.log("Idade inválida. Digite um número maior que zero.");
        valor = Number(prompt(mensagem));
    }
    return valor;
};

const calcularMediaIdade = (consumidores: Consumidor[]): number => {
    if (consumidores.length === 0) return 0;
    const soma = consumidores.reduce((total, c) => total + c.idade, 0);
    return soma / consumidores.length;
};

const obterMaiorEMenorIdade = (consumidores: Consumidor[]): ExtremosIdade | null => {
    const primeiro = consumidores[0];
    if (!primeiro) return null;

    let maisVelho = primeiro;
    let maisNovo = primeiro;

    for (const consumidor of consumidores) {
        if (consumidor.idade > maisVelho.idade) maisVelho = consumidor;
        if (consumidor.idade < maisNovo.idade) maisNovo = consumidor;
    }

    return { maisVelho, maisNovo };
};

const cadastrarConsumidores = (quantidade: number): Consumidor[] => {
    const consumidores: Consumidor[] = [];
    for (let i = 0; i < quantidade; i++) {
        console.log(`\nConsumidor ${i + 1} de ${quantidade}`);
        const nome = lerTexto("Nome: ");
        const idade = lerIdade("Idade: ");
        const email = lerTexto("E-mail: ");
        consumidores.push(criarConsumidor(nome, idade, email));
    }
    return consumidores;
};

const exibirResultados = (consumidores: Consumidor[]): void => {
    console.log("\n===== Consumidores cadastrados =====");
    consumidores.forEach((c, i) => {
        console.log(`${i + 1}. ${c.nome} | ${c.idade} anos | ${c.email}`);
    });

    console.log(`\nMédia das idades: ${calcularMediaIdade(consumidores).toFixed(1)} anos`);

    const extremos = obterMaiorEMenorIdade(consumidores);
    if (extremos) {
        console.log(`Consumidor mais velho: ${extremos.maisVelho.nome} (${extremos.maisVelho.idade} anos)`);
        console.log(`Consumidor mais novo: ${extremos.maisNovo.nome} (${extremos.maisNovo.idade} anos)`);
    }
};

const consumidores = cadastrarConsumidores(5);
exibirResultados(consumidores);