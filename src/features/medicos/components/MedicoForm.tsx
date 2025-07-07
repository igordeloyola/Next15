'use client';

import { useActionState, useState } from 'react';
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
  onSubmit: (prevState: any, data: FormData) => Promise<any>;
  onCancel: () => void;
}

export function MedicoForm({
  initialData,
  onSubmit,
  onCancel,
}: MedicoFormProps) {
  const [state, formAction, isPending] = useActionState(onSubmit, {
    success: false,
  });
  const [especialidade, setEspecialidade] = useState<Especialidade>(
    initialData?.especialidade || 'CARDIOLOGIA'
  );

  const handleEspecialidadeChange = (value: string) => {
    setEspecialidade(value as Especialidade);
  };

  return (
    <form action={formAction} className='space-y-4 max-w-md'>
      {initialData?.id && (
        <input type='hidden' name='id' value={initialData.id} />
      )}
      <input type='hidden' name='especialidade' value={especialidade} />

      <div>
        <Label htmlFor='nome'>Nome</Label>
        <Input
          id='nome'
          name='nome'
          defaultValue={initialData?.nome}
          required
        />
      </div>

      <div>
        <Label htmlFor='crm'>CRM</Label>
        <Input id='crm' name='crm' defaultValue={initialData?.crm} required />
      </div>

      <div>
        <Label htmlFor='conselho'>Conselho</Label>
        <Input
          id='conselho'
          name='conselho'
          defaultValue={initialData?.conselho}
          required
        />
      </div>

      <div>
        <Label htmlFor='especialidade'>Especialidade</Label>
        <Select value={especialidade} onValueChange={handleEspecialidadeChange}>
          <SelectTrigger>
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

      {state?.error && (
        <div className='text-red-500 text-sm'>{state.error}</div>
      )}

      <div className='flex gap-2'>
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Salvando...' : 'Salvar'}
        </Button>
        <Button
          type='button'
          variant='outline'
          onClick={onCancel}
          disabled={isPending}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
