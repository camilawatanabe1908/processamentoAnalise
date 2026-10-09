class Consumidor {

    constructor(
        private nome: string,
        private idade: number,
        private email: string
    ) {
        if (!this.validar()) {
            throw new Error("Dados inválidos");
        }
    }

    protected validar = (): boolean => {
        return this.nome.length >= 2
            && this.idade >= 0 && this.idade <= 120
            && this.email.includes("@") && this.email.includes(".");
    }

    public getNome = (): string => {
        return this.nome;
    }

    public getIdade = (): number => {
        return this.idade;
    }

    public apresentar = (): string => {
        return `Consumidor: ${this.nome} (${this.idade} anos) - ${this.email}`;
    }

    public editar = (nome: string, idade: number, email: string): void => {
        const anterior = [this.nome, this.idade, this.email] as const;
        [this.nome, this.idade, this.email] = [nome, idade, email];

        if (!this.validar()) {
            [this.nome, this.idade, this.email] = anterior;
            throw new Error("Dados inválidos");
        }
    }
}

const lista: Consumidor[] = [
    new Consumidor("Ana Silva", 30, "ana@email.com"),
    new Consumidor("Carlos Souza", 22, "carlos@email.com"),
    new Consumidor("Mariana Lima", 45, "mariana@email.com"),
    new Consumidor("Roberto Alves", 19, "roberto@email.com"),
    new Consumidor("Fernanda Dias", 33, "fernanda@email.com"),
];

const media = lista.reduce((soma, c) => soma + c.getIdade(), 0) / lista.length;
const porIdade = [...lista].sort((a, b) => a.getIdade() - b.getIdade());
const maisNovo = porIdade[0]!;
const maisVelho = porIdade[porIdade.length - 1]!;

console.log("=== LISTA DE CONSUMIDORES ===");
lista.forEach(c => console.log(c.apresentar()));

console.log("\n=== ANÁLISE ESTATÍSTICA ===");
console.log(`Média das Idades: ${media.toFixed(1)} anos`);
console.log(`Mais Velho(a): ${maisVelho.getNome()} (${maisVelho.getIdade()} anos)`);
console.log(`Mais Novo(a): ${maisNovo.getNome()} (${maisNovo.getIdade()} anos)`);

console.log("\n=== TESTE DE VALIDAÇÃO ===");
try {
    new Consumidor("", -5, "email-invalido");
} catch (e) {
    console.log((e as Error).message);
}