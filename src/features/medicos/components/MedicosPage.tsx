'use client';

import { useState, useEffect } from 'react';
import { MedicoInput } from '../schema';
import { MedicoList } from './MedicoList';
import { MedicoForm } from './MedicoForm';
import { MedicoListItem } from '../schema';
import {
  listarMedicos,
  criarMedico,
  editarMedico,
  deletarMedico,
} from '../actions';

export function MedicosPage() {
  const [medicos, setMedicos] = useState<MedicoListItem[]>([]);
  const [editando, setEditando] = useState<MedicoInput | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMedicos() {
      try {
        const dados = await listarMedicos();
        setMedicos(dados as MedicoListItem[]);
      } catch (error) {
        console.error('Erro ao carregar médicos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMedicos();
  }, []);

  async function handleCreate(data: FormData) {
    setIsSaving(true);
    try {
      await criarMedico(data);
      const dadosAtualizados = await listarMedicos();
      setMedicos(dadosAtualizados);
      setEditando(null);
    } catch (error) {
      console.error('Erro ao criar médico:', error);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleEdit(data: FormData) {
    setIsSaving(true);
    setIsCreating(false);
    try {
      await editarMedico(data);
      const dadosAtualizados = await listarMedicos();
      setMedicos(dadosAtualizados);
      setEditando(null);
    } catch (error) {
      console.error('Erro ao editar médico:', error);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setIsSaving(true);
    try {
      await deletarMedico(id);
      const dadosAtualizados = await listarMedicos();
      setMedicos(dadosAtualizados);
    } catch (error) {
      console.error('Erro ao deletar médico:', error);
    } finally {
      setIsSaving(false);
    }
  }

  function handleEditClick(medico: MedicoInput) {
    //console.log('Médico sendo editado:', medico); // Adicione este log
    setEditando(medico);
    setIsCreating(false);
  }

  function handleCancel() {
    setEditando(null);
  }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Gerenciamento de Médicos</h1>

      {editando ? (
        <MedicoForm
          initialData={editando}
          onSubmit={isCreating ? handleCreate : handleEdit}
          onCancel={() => {
            setEditando(null);
            setIsCreating(false);
          }}
          isSaving={isSaving}
        />
      ) : (
        <>
          <button
            className='btn btn-primary mb-4'
            onClick={() => {
              setEditando({
                nome: '',
                crm: '',
                conselho: '',
                especialidade: 'CARDIOLOGIA',
              });
              setIsCreating(true);
            }}
          >
            Novo Médico
          </button>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <MedicoList
              medicos={medicos}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
}
