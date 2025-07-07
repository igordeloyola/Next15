'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Medico } from '../schema';
import { MedicoList } from './MedicoList';
import { MedicoForm } from './MedicoForm';
import {
  listarMedicos,
  criarMedico,
  editarMedico,
  deletarMedico,
} from '../actions';

export function MedicosPage() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [editingMedico, setEditingMedico] = useState<Medico | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMedicos();
  }, []);

  async function loadMedicos() {
    try {
      const dados = await listarMedicos();
      setMedicos(dados as Medico[]);
    } catch (error) {
      console.error('Erro ao carregar médicos:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(prevState: unknown, data: FormData) {
    const action = isCreating ? criarMedico : editarMedico;
    const result = await action(prevState, data);

    if (result?.success) {
      await loadMedicos();
      setEditingMedico(null);
      setIsCreating(false);
    }

    return result;
  }

  async function handleDelete(id: string) {
    const result = await deletarMedico(id);
    if (result?.success) {
      await loadMedicos();
    }
  }

  function handleCreateNew() {
    setEditingMedico(null);
    setIsCreating(true);
  }

  function handleEdit(medico: Medico) {
    setEditingMedico(medico);
    setIsCreating(false);
  }

  function handleCancel() {
    setEditingMedico(null);
    setIsCreating(false);
  }

  const showForm = isCreating || editingMedico;

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Gerenciamento de Médicos</h1>

      {showForm ? (
        <MedicoForm
          initialData={editingMedico || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <Button onClick={handleCreateNew} className='mb-4'>
            Novo Médico
          </Button>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <MedicoList
              medicos={medicos}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
}
