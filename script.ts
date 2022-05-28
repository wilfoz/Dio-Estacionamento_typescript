interface Veiculo {
    nome: string;
    placa: string;
    entrada: Date | string;
}
(function () {
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    function patio() {

        function ler(): Veiculo[] {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }

        function salvar(veiculos: Veiculo[]) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }

        function adicionar(veiculo: Veiculo, salva?: boolean) {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">Remover</button>
                </td>
            `;

            row.querySelector('.delete')?.addEventListener('click', function () {
                remover(this.dataset.placa);
            });

            $('#patio')?.appendChild(row);

            if (salva) salvar([...ler(), veiculo]);
        }

        function calcTempo(mil: number) {
            const min = Math.floor(mil / 60);
            const seg = Math.floor(mil % 60000 / 1000);

            return `${min}m e ${seg}s`;
        }
        function remover(placa: string) { 
            const { entrada, nome } = ler().find(v => v.placa === placa);
            const tempo = new Date().getTime() - new Date(entrada).getTime();
            const tempoCalculado = calcTempo(tempo);

            if(!confirm(`O veiculo ${nome} permaneceu por ${tempoCalculado}`)) return;

            const veiculos = ler().filter(v => v.placa !== placa);
            salvar(veiculos);
            render();
        }

        function render() {
            $('#patio')!.innerHTML = '';
            const _patio = ler();

            if (_patio.length) {
                _patio.forEach(veiculo => adicionar(veiculo));
            }
        }

        return {
            ler,
            adicionar,
            remover,
            salvar,
            render
        }
    }

    patio().render();

    $('#cadastrar')?.addEventListener('click', () => {
        const nome = $('#nome')?.value;
        const placa = $('#placa')?.value;

        if (!nome || !placa) {
            alert('Preencha todos os campos');
            return;
        }

        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);

    });
})();