(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">Remover</button>
                </td>
            `;
            (_a = row.querySelector('.delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            (_b = $('#patio')) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function calcTempo(mil) {
            const min = Math.floor(mil / 60);
            const seg = Math.floor(mil % 60000 / 1000);
            return `${min}m e ${seg}s`;
        }
        function remover(placa) {
            const { entrada, nome } = ler().find(v => v.placa === placa);
            const tempo = new Date().getTime() - new Date(entrada).getTime();
            const tempoCalculado = calcTempo(tempo);
            if (!confirm(`O veiculo ${nome} permaneceu por ${tempoCalculado}`))
                return;
            const veiculos = ler().filter(v => v.placa !== placa);
            salvar(veiculos);
            render();
        }
        function render() {
            $('#patio').innerHTML = '';
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
        };
    }
    patio().render();
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert('Preencha todos os campos');
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
