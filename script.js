// Função para aplicar formatação de texto (Negrito, Itálico, Alinhamento, etc)
function formatText(command) {
    document.execCommand(command, false, null);
    // Devolve o foco ao editor para continuarmos a escrever
    document.getElementById('editor').focus();
}

// Função para exportar/guardar o documento
function saveFile() {
    const editor = document.getElementById('editor');
    const content = editor.innerHTML;
    
    // Cria um objeto de ficheiro (Blob) com o conteúdo HTML
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Cria um link temporário para forçar o download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento.html'; // Podes mudar a extensão
    document.body.appendChild(a);
    a.click();
    
    // Limpa a memória
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Função para abrir um ficheiro (.txt ou .html)
function openFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const editor = document.getElementById('editor');
        
        // Se for um ficheiro de texto, mete o conteúdo como texto limpo
        // Se for HTML, renderiza as tags (mantém o estilo)
        if (file.name.endsWith('.txt')) {
            editor.innerText = content;
        } else {
            editor.innerHTML = content;
        }
    };
    
    // Lê o ficheiro como texto
    reader.readAsText(file);
    
    // Limpa o input para poderes carregar o mesmo ficheiro duas vezes se precisares
    event.target.value = '';
}
