// Alteração de Tema (Interação JS)
const btnTema = document.getElementById('btn-tema');
btnTema.addEventListener('click', () => {
    const atual = document.body.getAttribute('data-theme');
    const novo = atual === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', novo);
});

// Integração com a API do GitHub
const usuarioGithub = "SUBSTITUA_PELO_TEU_USUARIO"; // <-- Coloque seu usuário aqui!

async function carregarProjetos() {
    const loading = document.getElementById('loading');
    const errorMsg = document.getElementById('error-msg');
    const lista = document.getElementById('lista-projetos');

    loading.style.display = 'block';
    errorMsg.style.display = 'none';
    lista.innerHTML = '';

    try {
        const response = await fetch(`https://github.com{usuarioGithub}/repos`);
        
        if (!response.ok) {
            throw new Error('Erro na requisição HTTP');
        }

        const dados = await response.json();
        loading.style.display = 'none';

        if (dados.length === 0) {
            lista.innerHTML = '<p>Nenhum repositório público encontrado.</p>';
            return;
        }

        // Mostra apenas os 6 primeiros
        dados.slice(0, 6).forEach(repo => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'Sem descrição cadastrada.'}</p>
                <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
            `;
            lista.appendChild(card);
        });

    } catch (error) {
        loading.style.display = 'none';
        errorMsg.style.display = 'block';
        console.error(error);
    }
}

// Inicializa a busca ao carregar a página
carregarProjetos();
