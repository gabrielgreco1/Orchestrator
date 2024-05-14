import fs from 'fs';
import path from 'path';

// Função para deletar todos os arquivos .png na pasta atual
export default function deletePngFiles(directory) {    
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
  
      for (const file of files) {
        if (path.extname(file) === '.png') {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
        }
      }
    });
  }