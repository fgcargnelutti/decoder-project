const TEXTAREA_ID = 'text__decode';
const RESULT_ELEMENT_ID = 'text__decoded';
const EMPTY_STATE_ID = 'empty__state';
const RESULT_TEXT_ID = 'text__decoded__result';
const COPY_BUTTON_ID = 'copyButton';

// Função criptografar
function encrypt() {
    const textArea = document.getElementById(TEXTAREA_ID);
    const text = textArea.value;
    if (!text) {
        alert('Insira um texto.');
        return;
    }

    const encryptedText = text
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');

    displayResult(encryptedText);
}

// Função descriptografar
function decrypt() {
    const textArea = document.getElementById(TEXTAREA_ID);
    const text = textArea.value;
    if (!text) {
        alert('Insira um texto.');
        return;
    }

    const decryptedText = text
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');

    displayResult(decryptedText);
}

// Função para exibir o resultado
function displayResult(text) {
    const resultElement = document.getElementById(RESULT_ELEMENT_ID);
    const emptyStateElement = document.getElementById(EMPTY_STATE_ID);
    const resultTextElement = document.getElementById(RESULT_TEXT_ID);

    resultTextElement.textContent = text;
    resultElement.classList.remove('hidden');
    emptyStateElement.classList.add('hidden');

    updateCopyButtonState();
}

// Função copiar
function copyToClipboard() {
    const textToCopy = document.getElementById(RESULT_TEXT_ID).textContent;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Texto copiado.');
        })
        .catch(error => {
            console.error('Erro ao copiar o texto: ', error);
            alert('Não foi possível copiar o texto. Verifique se a permissão para copiar está habilitada.');
        });
}

// Função para atualizar o estado do botão "Copiar"
function updateCopyButtonState() {
    const resultElement = document.getElementById(RESULT_ELEMENT_ID);
    const copyButton = document.getElementById(COPY_BUTTON_ID);

    if (resultElement.classList.contains('hidden') || !resultElement.textContent.trim()) {
        copyButton.disabled = true;
    } else {
        copyButton.disabled = false;
    }
}


document.getElementById(COPY_BUTTON_ID).addEventListener('click', copyToClipboard);

// Função para filtrar caracteres
function filterText(text) {
    let filteredText = '';

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        if ((charCode >= 97 && charCode <= 122) || charCode === 32) {
            filteredText += text.charAt(i);
        }
    }

    return filteredText;
}

// Função para apresentar mensagem de validação de caracteres
document.getElementById(TEXTAREA_ID).addEventListener('input', function (event) {
    const inputText = event.target.value;
    const filteredText = filterText(inputText);

    if (inputText !== filteredText) {
        alert('Apenas letras minúsculas e espaços são permitidos.');
    }

    event.target.value = filteredText;
});

window.onload = function() {
    document.querySelector('.text__area').focus();
    updateCopyButtonState();
};