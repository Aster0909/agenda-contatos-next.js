'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Contato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export default function ListaContatos() {
  const [contatos, setContatos] = useState<Contato[]>([]);

  const carregarContatos = async () => {
    const res = await fetch('/api/contatos');
    const data = await res.json();
    setContatos(data);
  };

  const removerContato = async (id: string) => {
    await fetch(`/api/contatos/${id}`, { method: 'DELETE' });
    carregarContatos();
  };

  useEffect(() => {
    carregarContatos();
  }, []);

  return (
    <main className="flex flex-col items-center p-8 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Agenda de Contatos</h1>

      <Link href="/new">
        <button className="w-[300px] h-[32px] py-3 font-bold border border-black bg-red-600 text-white rounded-[10px] hover:bg-red-700 transition active:scale-95">
          Adicionar Novo Contato
        </button>
      </Link>

      <ul className="w-full max-w-md space-y-4">
        {contatos.map((contato) => (
          <li key={contato.id} className="bg-white text-black p-4 rounded shadow-md">
            <p><strong>Nome:</strong> {contato.nome}</p>
            <p><strong>Email:</strong> {contato.email}</p>
            <p><strong>Telefone:</strong> {contato.telefone}</p>
            <div className="mt-2 flex gap-2">
              <Link href={`/edit/${contato.id}`}>
           
                <button className="w-[128px] h-[32px] py-3 font-bold border border-black bg-red-600 text-white rounded-[10px] hover:bg-red-700 transition active:scale-95">Editar</button>
              </Link>
              <button
                onClick={() => removerContato(contato.id)}
           className="w-[128px] h-[32px] py-3 font-bold border border-black bg-red-600 text-white rounded-[10px] hover:bg-red-700 transition active:scale-95"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

