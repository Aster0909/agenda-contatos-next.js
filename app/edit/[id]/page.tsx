'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Contato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export default function EditarContato() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState<Contato>({
    id: '',
    nome: '',
    email: '',
    telefone: '',
  });

  // Carrega os dados do contato atual
  useEffect(() => {
    const carregarContato = async () => {
      const res = await fetch(`/api/contatos/${id}`);
      const data = await res.json();
      setForm(data);
    };

    if (id) {
      carregarContato();
    }
  }, [id]);

  // Atualiza valores do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envia o formulário atualizado
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/api/contatos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    router.push('/');
  };

  const removerContato = async (id: string) => {
  await fetch(`/api/contatos/${id}`, {
    method: 'DELETE',
  });
};

  return (
    <main className="flex flex-col items-center p-8 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Editar Contato</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[500px] flex flex-col items-center space-y-6 mt-8 mx-auto">
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="p-2 rounded border border-gray-300 text-black"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="E-mail"
          className="p-2 rounded border border-gray-300 text-black"
          required
        />
        <input
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          placeholder="Telefone"
          className="p-2 rounded border border-gray-300 text-black"
          required
        />
        <button
          type="submit"
          className="w-[128px] h-[32px] py-3 font-bold border border-black bg-red-600 text-white rounded-[10px] hover:bg-red-700 transition active:scale-95"
        >
          Salvar
        </button>
      </form>
    </main>
  );
}
