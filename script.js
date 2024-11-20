document.addEventListener('DOMContentLoaded', () => {
  let carrinho = [];

  const comprarBtns = document.querySelectorAll('.comprar-btn');
  const carrinhoElement = document.getElementById('itensCarrinho');
  
  comprarBtns.forEach(button => {
    button.addEventListener('click', (e) => {
      const produto = e.target.dataset.produto;
      carrinho.push(produto);
      atualizarCarrinho();
    });
  });

  function atualizarCarrinho() {
    if (carrinho.length === 0) {
      carrinhoElement.innerHTML = "<p>Seu carrinho está vazio!</p>";
    } else {
      carrinhoElement.innerHTML = `<ul>${carrinho.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }
  }

  // Função para finalizar compra
  document.getElementById('finalizarCompra').addEventListener('click', () => {
    if (carrinho.length === 0) {
      alert('Adicione produtos ao carrinho antes de finalizar.');
      return;
    }

    // Criar uma sessão de pagamento com a Stripe (exemplo)
    const stripe = Stripe('sua_chave_publica_da_stripe'); // Substitua com sua chave pública real da Stripe
    stripe.redirectToCheckout({
      lineItems: carrinho.map(item => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item,
          },
          unit_amount: 1000, // Exemplo de valor em centavos (R$ 10)
        },
        quantity: 1,
      })),
      mode: 'payment',
      successUrl: window.location.href + '?success=true',
      cancelUrl: window.location.href + '?cancel=true',
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
      }
    });
  });
});
