'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarContatoPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' });

  useEffect(() => {
    async function carregar() {
      const res = await fetch(`/api/contatos/${id}`);
      const data = await res.json();
      setForm(data);
    }

    if (id) carregar();
  }, [id]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    await fetch(`/api/contatos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
      <input name="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input name="telefone" value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} />
      <button type="submit">Salvar</button>
    </form>
  );
}
