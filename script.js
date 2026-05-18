// Formatações Simples (Negrito, Itálico, etc.)
function formatText(command) {
    document.execCommand(command, false, null);
}

// Formatações com parâmetros (Cores, Tamanhos)
function formatParamText(command, value) {
    document.execCommand(command, false, value);
}

// Função para adicionar uma nova página limpa ao editor
function addNewPage() {
    const pagesWrapper = document.getElementById('pagesWrapper');
    
    // Cria o elemento da nova folha
    const newPage = document.createElement('div');
    newPage.className = 'page';
    newPage.setAttribute('contenteditable', 'true');
    newPage.setAttribute('spellcheck', 'false');
    
    // Adiciona um parágrafo vazio padrão para poder começar a escrever logo
    newPage.innerHTML = '<p><br></p>';
    
    // Insere no ecrã
    pagesWrapper.appendChild(newPage);
    
    // Faz scroll automático para a nova página e foca nela
    newPage.scrollIntoView({ behavior: 'smooth' });
    newPage.focus();
}

// Exportar todo o conjunto de páginas num único ficheiro formatado
function saveFile() {
    const wrapper = document.getElementById('pagesWrapper');
    const content = wrapper.innerHTML;
    
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meu_documento_gabriel.html';
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Abrir e reconstruir as páginas guardadas
function openFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const wrapper = document.getElementById('pagesWrapper');
        wrapper.innerHTML = content;
    };
    
    reader.readAsText(file);
    event.target.value = '';
}

// SISTEMA DE TOAST (Mensagem a cada 10 segundos)
function triggerGabrielToast() {
    const toast = document.getElementById('toast');
    
    // Mostra o toast adicionando a classe CSS
    toast.classList.add('show');
    
    // Esconde o toast após 3.5 segundos de exibição
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// Executa a função do Toast a cada 10000 milissegundos (10 segundos)
setInterval(triggerGabrielToast, 10000);
