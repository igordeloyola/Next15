'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { MedicoInput, especialidades, Especialidade } from '../schema';

interface MedicoFormProps {
  initialData?: MedicoInput;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

export function MedicoForm({
  initialData,
  onSubmit,
  onCancel,
  isSaving,
}: MedicoFormProps) {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [crm, setCrm] = useState(initialData?.crm || '');
  const [conselho, setConselho] = useState(initialData?.conselho || '');
  const [especialidade, setEspecialidade] = useState<Especialidade>(
    initialData?.especialidade || 'CARDIOLOGIA'
  );

  useEffect(() => {
    setNome(initialData?.nome || '');
    setCrm(initialData?.crm || '');
    setConselho(initialData?.conselho || '');
    setEspecialidade(initialData?.especialidade || 'CARDIOLOGIA');
  }, [initialData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    if (initialData?.id) formData.append('id', initialData.id);
    formData.append('nome', nome);
    formData.append('crm', crm);
    formData.append('conselho', conselho);
    formData.append('especialidade', especialidade);

    // // --- ADICIONE ESTE CONSOLE.LOG ---
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }
    // // ---------------------------------
    await onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4 max-w-md'>
      <div>
        <Label htmlFor='nome'>Nome</Label>
        <Input
          id='nome'
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='crm'>CRM</Label>
        <Input
          id='crm'
          value={crm}
          onChange={(e) => setCrm(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='conselho'>Conselho</Label>
        <Input
          id='conselho'
          value={conselho}
          onChange={(e) => setConselho(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='especialidade'>Especialidade</Label>
        <Select
          value={especialidade}
          onValueChange={(value) => setEspecialidade(value as Especialidade)}
        >
          <SelectTrigger id='especialidade'>
            <SelectValue placeholder='Selecione uma especialidade' />
          </SelectTrigger>
          <SelectContent>
            {especialidades.map((esp) => (
              <SelectItem key={esp} value={esp}>
                {esp.charAt(0) + esp.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex gap-2'>
        <Button type='submit' disabled={isSaving}>
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
        <Button
          type='button'
          variant='outline'
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
