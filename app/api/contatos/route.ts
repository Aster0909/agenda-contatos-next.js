//Api Salvar contatos//

// app/api/contatos/route.ts
import { NextResponse } from 'next/server';
import { getContatos, adicionarContato } from '../../lib/contatos';

// Listar todos os contatos
export async function GET() {
  const contatos = getContatos();
  return NextResponse.json(contatos);
}

// Adicionar novo contato
export async function POST(request: Request) {
  const data = await request.json();
  adicionarContato(data);
  return NextResponse.json({ mensagem: 'Contato adicionado com sucesso!' });
}

