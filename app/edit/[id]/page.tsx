'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarContato() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' });

  useEffect(() => {
    const carregarContato = async () => {
      const res = await fetch(`/api/contatos/${id}`);
      if (res.ok) {
        const data = await res.json();
        setForm(data);
      } else {
        alert('Contato não encontrado!');
        router.push('/');
      }
    };
    carregarContato();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/contatos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert('Contato atualizado com sucesso!');
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-white w-[600px] p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-red-700 mb-6">Editar Contato</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[500px] flex flex-col items-center space-y-6 mt-8 mx-autospace-y-4">
            <br></br>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome"
            className="w-[500px] h-[24px] px-4 py-2 border-[3px] rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          /><br></br>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-[500px] h-[24px] px-4 py-2 border-[3px] rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          /><br></br>
          <input
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            placeholder="Telefone"
            className="w-[500px] h-[24px] px-4 py-2 border-[3px] rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
          <br></br>
          <button type="submit" className="w-[128px] h-[32px] py-3 font-bold border border-black bg-red-600 text-white rounded-[10px] hover:bg-red-700 transition active:scale-95">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
