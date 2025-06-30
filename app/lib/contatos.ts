import fs from 'fs';
import path from 'path';
import { json } from 'stream/consumers';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.join(process.cwd(), 'data', 'contatos.json');


// Lê contatos do arquivo JSON
export function getContatos(){
    const data = fs.readFileSync(filePath, 'utf-8');
    console.log("Lendo contatos;", data);
    return JSON.parse(data);
}

// Salva os contatos
export function salvarContatos (contatos: any[]){
    fs.writeFileSync(filePath, JSON.stringify(contatos, null,2));
}


//Adiciona os contatos
export function adicionarContato(contato: any){
    const contatos = getContatos();
    contato.id = uuidv4();
    contatos.push(contato);
    salvarContatos(contatos);
}

//Atualiza um novo contato existente pelo ID
export function atualizarContato(id: string, dadosAtualizados: any){
    const contatos = getContatos();
    const index = contatos.findIndex((c: any) => c.id === id);
    if (index !== -1){
        contatos[index] = { ...contatos[index], ...dadosAtualizados};
        salvarContatos(contatos);
    }
}


//Remove um contato pelo ID
export function removerContato(id: string){
    const contatos = getContatos().filter((c: any) => c.id !== id);
    salvarContatos(contatos);
}