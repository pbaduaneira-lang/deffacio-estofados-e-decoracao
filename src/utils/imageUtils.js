/**
 * Recebe um arquivo de imagem (File), redimensiona proporcionalmente 
 * para uma largura máxima e retorna a string Base64 da imagem comprimida (JPEG).
 * 
 * @param {File} file Arquivo de imagem do input
 * @param {number} maxWidth Largura máxima desejada
 * @param {number} quality Qualidade do JPEG (0.0 a 1.0)
 * @returns {Promise<string>} Promise que resolve com a string Base64
 */
export const resizeAndConvertImage = (file, maxWidth = 800, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('O arquivo selecionado não é uma imagem válida.'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        // Calcular novas dimensões
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        // Desenhar no Canvas para redimensionar
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Fundo branco caso a imagem tenha transparência (JPEG não suporta alpha)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Exportar para Base64 (JPEG)
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      
      img.onerror = () => {
        reject(new Error('Erro ao processar a imagem.'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler o arquivo selecionado.'));
    };
  });
};
