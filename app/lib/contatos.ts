import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export type Contato = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
};

const filePath = path.join(process.cwd(), 'data', 'contatos.json');

// Lê contatos do arquivo JSON
export function getContatos(): Contato[] {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler contatos:', error);
    return [];
  }
}

// Salva os contatos no arquivo JSON
export function salvarContatos(contatos: Contato[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(contatos, null, 2));
  } catch (error) {
    console.error('Erro ao salvar contatos:', error);
  }
}

// Adiciona um novo contato
export function adicionarContato(contato: Omit<Contato, 'id'>): void {
  const contatos = getContatos();
  const novoContato = { ...contato, id: uuidv4() };
  contatos.push(novoContato);
  salvarContatos(contatos);
}

// Atualiza um contato existente pelo ID
export function atualizarContato(id: string, dadosAtualizados: Partial<Contato>): void {
  const contatos = getContatos();
  const index = contatos.findIndex((c) => c.id === id);
  if (index !== -1) {
    contatos[index] = { ...contatos[index], ...dadosAtualizados };
    salvarContatos(contatos);
  }
}

// Remove um contato pelo ID
export function removerContato(id: string): void {
  const contatos = getContatos().filter((c) => c.id !== id);
  salvarContatos(contatos);
}
