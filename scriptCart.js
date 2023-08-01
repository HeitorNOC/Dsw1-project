function replaceVirgulaPorPonto(str) {
    return str.replace(',', '.');
}

function calcularPrecoTotal() {
    let cafesComprados = localStorage.getItem('cafesComprados');

    if (cafesComprados) {
        cafesComprados = JSON.parse(cafesComprados);

        let precoTotal = 0;

        cafesComprados.forEach(cafe => {
            const preco = replaceVirgulaPorPonto(cafe.preco); // Converter a vírgula para ponto
            precoTotal += parseFloat(preco) * cafe.qtd;
        });

        return precoTotal;
    } else {
        return 0;
    }
}

function deleteCafe(nome) {
    let cafesComprados = localStorage.getItem('cafesComprados');

    if (cafesComprados) {
        cafesComprados = JSON.parse(cafesComprados);

        // Filtra os cafés para remover o café com o nome fornecido
        cafesComprados = cafesComprados.filter(cafe => cafe.nome !== nome);

        // Atualiza o LocalStorage com o novo array de cafés após a remoção
        localStorage.setItem('cafesComprados', JSON.stringify(cafesComprados));

        // Atualiza a exibição dos cafés no carrinho
        mostrarCafesNoCarrinho();
        calcularPrecoTotal()
    }
}

function mostrarCafesNoCarrinho() {
    let cafesComprados = localStorage.getItem('cafesComprados');

    if (cafesComprados) {
        cafesComprados = JSON.parse(cafesComprados);

        const listaCafes = document.getElementById('listaCafes');
        listaCafes.innerHTML = ''; // Limpa a lista antes de exibir os cafés
        if (cafesComprados.length == 1 || cafesComprados.length == 2) {
            cafesComprados.forEach(cafe => {
                const cafeElement = document.createElement('div');
                cafeElement.innerHTML = `
                        <div class="listaCafes">
                            <div>
                                <h3>${cafe.nome}</h3>
                                <p>R$ ${parseFloat(replaceVirgulaPorPonto(cafe.preco)).toFixed(2)}</p>
                                <p>Quantidade: ${cafe.qtd}</p>
                            </div>
                            <div class="buttonDelete">
                                <button class="noselect" onclick="deleteCafe('${cafe.nome}')"><span class="text">Excluir</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                            </div>
                        </div>
                        `;
                listaCafes.appendChild(cafeElement);
            });
        } else {
            cafesComprados.forEach(cafe => {
                const cafeElement = document.createElement('div');
                cafeElement.innerHTML = `
                        <div class="listaCafes">
                            <div>
                                <h3>${cafe.nome}</h3>
                                <p>R$ ${parseFloat(replaceVirgulaPorPonto(cafe.preco)).toFixed(2)}</p>
                                <p>Quantidade: ${cafe.qtd}</p>
                            </div>
                            <div class="buttonDelete">
                                <button class="noselect" onclick="deleteCafe('${cafe.nome}')"><span class="text">Excluir</span></button>
                            </div>
                        </div>
                        `;
                listaCafes.appendChild(cafeElement);
            });
        }


        const precoTotalElement = document.getElementById('precoTotal');
        precoTotalElement.innerHTML = `R$ ${calcularPrecoTotal().toFixed(2).replace('.', ',')}`; // Converter ponto para vírgula
    } else {
        const listaCafes = document.getElementById('listaCafes');
        listaCafes.innerHTML = '<p>Não há cafés no carrinho.</p>';
    }
}

function verificarCarrinho() {
    let cafesComprados = localStorage.getItem('cafesComprados');

    if (!cafesComprados || JSON.parse(cafesComprados).length === 0) {
        alert('Carrinho vazio');
    } else {
        window.location.href = '/sucesso.html'; // Redirecionar para a página de conclusão da compra
    }
}

function abrirWhatsApp() {
    const numeroTelefone = '+5581996213652';
    const mensagem = 'Olá, estou interessado em comprar café!';

    const mensagemEncoded = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagemEncoded}`;

    window.open(linkWhatsApp, '_blank');
}

mostrarCafesNoCarrinho();
