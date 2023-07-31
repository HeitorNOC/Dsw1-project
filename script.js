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




