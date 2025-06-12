document.addEventListener('DOMContentLoaded', () => {
    const btnEntrar = document.getElementById('btn-entrar');
    const telaBoasVindas = document.getElementById('tela-boas-vindas');
    const galeriaContainer = document.getElementById('galeria-container');
    const polaroids = document.querySelectorAll('.polaroid');
    const overlay = document.getElementById('overlay');

    // Função para espalhar as polaroids de forma aleatória
    function espalharPolaroids() {
        polaroids.forEach(polaroid => {
            const rot = Math.random() * 20 - 10; // Rotação de -10 a 10 graus
            const top = Math.random() * 20 - 10; // Deslocamento de -10 a 10 px
            const left = Math.random() * 20 - 10;
            polaroid.style.transform = `rotate(${rot}deg) translate(${left}px, ${top}px)`;
        });
    }

    // Inicia o App
    btnEntrar.addEventListener('click', () => {
        telaBoasVindas.style.opacity = '0';
        setTimeout(() => {
            telaBoasVindas.classList.remove('ativa');
            espalharPolaroids();
        }, 500);
    });

    let polaroidAtiva = null;

    polaroids.forEach(polaroid => {
        polaroid.addEventListener('click', () => {
            // Se não há polaroid ativa, ativa esta
            if (!polaroid.classList.contains('ativa')) {
                if (polaroidAtiva) {
                    polaroidAtiva.classList.remove('ativa');
                    polaroidAtiva.querySelector('.polaroid-inner').classList.remove('virado');
                    espalharPolaroids(); // Re-espalha para não ficar no mesmo lugar
                }
                
                polaroidAtiva = polaroid;
                polaroid.classList.add('ativa');
                overlay.classList.add('visivel');
            } else {
                // Se já está ativa, vira
                const inner = polaroid.querySelector('.polaroid-inner');
                inner.classList.toggle('virado');
            }
        });
    });

    // Clicar no overlay fecha a polaroid ativa
    overlay.addEventListener('click', () => {
        if (polaroidAtiva) {
            polaroidAtiva.classList.remove('ativa');
            // Reseta a rotação do verso para a próxima vez que for aberta
            setTimeout(() => {
                 if (polaroidAtiva) { // Checa novamente caso o usuário clique rápido
                    polaroidAtiva.querySelector('.polaroid-inner').classList.remove('virado');
                    polaroidAtiva = null;
                 }
            }, 500); // Espera a animação de "encolher" terminar
            overlay.classList.remove('visivel');
            espalharPolaroids(); // Re-espalha a galeria
        }
    });
});