function adicionarCafe(nomeCafe, precoCafe) {
    const cafeComprado = {
        nome: nomeCafe,
        preco: precoCafe,
        qtd: 1
    };

    let cafesComprados = localStorage.getItem('cafesComprados');

    if (cafesComprados) {
        cafesComprados = JSON.parse(cafesComprados);

        // Verificar se o café já está no carrinho
        const cafeExistente = cafesComprados.find(cafe => cafe.nome === cafeComprado.nome);

        if (cafeExistente) {
            // Se o café já existe, incrementar a quantidade
            cafeExistente.qtd++;
        } else {
            // Caso contrário, adicionar o café ao carrinho
            cafesComprados.push(cafeComprado);
        }
    } else {
        cafesComprados = [cafeComprado];
    }

    localStorage.setItem('cafesComprados', JSON.stringify(cafesComprados));

    alert('Café adicionado ao carrinho!');
}

function abrirWhatsApp() {
    const numeroTelefone = '+5581996213652'; 
    const mensagem = 'Olá, estou interessado em comprar café!';

    const mensagemEncoded = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagemEncoded}`;

    window.open(linkWhatsApp, '_blank');
  }




