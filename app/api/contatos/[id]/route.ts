//API Editar e Remover

import { NextRequest, NextResponse } from 'next/server';
import { getContatos, atualizarContato, removerContato } from '../../../lib/contatos';

// Buscar contato por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const contatos = getContatos();
  const contato = contatos.find((c) => c.id === id);

  if (!contato) {
    return NextResponse.json({ error: 'Contato não encontrado' }, { status: 404 });
  }

  return NextResponse.json(contato);
}

// Atualizar contato por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const dadosAtualizados = await req.json();
  atualizarContato(id, dadosAtualizados);

  return NextResponse.json({ message: 'Contato atualizado com sucesso' });
}

// Remover contato por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  removerContato(id);

  return NextResponse.json({ message: 'Contato removido com sucesso' });
}
