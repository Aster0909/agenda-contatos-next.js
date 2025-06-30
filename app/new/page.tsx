//Novo contato//

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/contatos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ nome: '', email: '', telefone: '' });
    alert('Contato salvo com sucesso!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-white w-[600px] p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-red-700 mb-2">Agenda de Contatos</h1>
        <h2 className="text-xl text-center text-red-600 font-medium mb-6">Novo Contato</h2>
     

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-[500px] flex flex-col items-center space-y-6 mt-8 mx-auto"
        >
          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="w-[500px] h-[24px] px-4 py-2 border-[3px] rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          /><br></br>
          <input
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
            className="w-[500px] h-[24px] px-4 py-2 border-[3px] rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          /><br></br>
          <input
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
            required
            className="w-[500px] h-[24px] px-4 py-2 border-[3px] rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          /><br></br>

          <button
            type="submit"
           className="w-[128px] h-[32px] py-3 font-bold border border-black bg-red-600 text-white rounded-[10px] hover:bg-red-700 transition active:scale-95"
          >
            Enviar
          </button>
           <br></br>
           <button
          type="button"
          onClick={() => router.push('/')}
          className="w-[128px] h-[32px] py-3 font-bold border border-black bg-red-600 text-white rounded-[10px] hover:bg-red-700 transition active:scale-95"
        >
          Voltar
        </button>
        </form>
      </div>
    </div>
  );
}


