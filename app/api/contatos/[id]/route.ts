//API Editar e Remover

import { NextRequest, NextResponse } from 'next/server';
import { getContatos, atualizarContato, removerContato } from '../../../lib/contatos';
import type { Contato } from '../../../lib/contatos';


// Função auxiliar para extrair ID da URL
function extrairId(req: NextRequest) {
  return req.nextUrl.pathname.split('/').pop()!;
}

// Buscar contato por ID
export async function GET(req: NextRequest) {
  const id = extrairId(req);
  const contatos: Contato[] = getContatos();
  const contato = contatos.find((c: Contato) => c.id === id); 

  if (!contato) {
    return NextResponse.json({ error: 'Contato não encontrado' }, { status: 404 });
  }

  return NextResponse.json(contato);
}

// Atualizar contato por ID
export async function PUT(req: NextRequest) {
  const id = extrairId(req);
  const dadosAtualizados = await req.json();
  atualizarContato(id, dadosAtualizados);

  return NextResponse.json({ message: 'Contato atualizado com sucesso' });
}

// Remover contato por ID
export async function DELETE(req: NextRequest) {
  const id = extrairId(req);
  removerContato(id);

  return NextResponse.json({ message: 'Contato removido com sucesso' });
}

