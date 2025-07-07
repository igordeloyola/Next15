// src/features/medicos/components/MedicosPage.tsx
'use client';

import { useState, useEffect } from 'react'; // REMOVIDO: 'use' da importação
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
import { useActionState } from 'react';

// Definir o tipo de retorno consistente para as actions (deve ser o mesmo que em actions.ts)
type ActionState = {
  success?: boolean;
  error?: string;
  details?: Record<string, unknown>; // Alterado de 'any' para um tipo mais específico
};

export function MedicosPage() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [editingMedico, setEditingMedico] = useState<Medico | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Função para lidar com a submissão do formulário (criação/edição)
  // Esta função é a que será passada para useActionState
  const handleFormSubmit = async (
    prevState: ActionState,
    formData: FormData
  ): Promise<ActionState> => {
    let result: ActionState;
    if (isCreating) {
      result = await criarMedico(prevState, formData);
    } else {
      result = await editarMedico(prevState, formData);
    }

    if (result.success) {
      await loadMedicos(); // Recarrega os médicos após sucesso
      setEditingMedico(null);
      setIsCreating(false);
    }
    return result;
  };

  // Usar useActionState para gerenciar o estado da submissão do formulário
  // A tipagem aqui é crucial para evitar 'any'
  const [formState, formAction, isPending] = useActionState<
    ActionState,
    FormData
  >(handleFormSubmit, { success: false });

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

  async function handleDelete(id: string) {
    const result = await deletarMedico(id);
    if (result?.success) {
      await loadMedicos();
    } else {
      console.error('Erro ao deletar:', result?.error);
      alert('Erro ao deletar médico: ' + result?.error);
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
          formAction={formAction}
          onCancel={handleCancel}
          isPending={isPending}
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

      {/* Exibir feedback do formulário (sucesso/erro) */}
      {formState?.error && (
        <div className='text-red-500 text-sm mt-4'>{formState.error}</div>
      )}
      {formState?.success && !isPending && (
        <div className='text-green-500 text-sm mt-4'>
          Operação realizada com sucesso!
        </div>
      )}
    </div>
  );
}
