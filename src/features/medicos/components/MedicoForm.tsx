// src/features/medicos/components/MedicoForm.tsx
'use client';

// REMOVIDO: useActionState do import, pois ele será usado em MedicosPage.tsx
import { useState } from 'react';
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

// REMOVIDO: A definição de ActionState aqui, pois ela está em actions.ts agora
// e não é diretamente usada por este componente (apenas a interface de props)

interface MedicoFormProps {
  initialData?: MedicoInput;
  // A prop 'formAction' será a função retornada por useActionState em MedicosPage.tsx
  // Ela não precisa de 'prevState' ou Promise aqui, pois é a 'action' do formulário
  formAction: (formData: FormData) => void; // Apenas recebe FormData e não retorna nada diretamente
  onCancel: () => void;
  isPending: boolean; // Recebe o estado de carregamento de useActionState
}

export function MedicoForm({
  initialData,
  formAction, // Agora recebe formAction
  onCancel,
  isPending, // Agora recebe isPending
}: MedicoFormProps) {
  // REMOVIDO: A chamada a useActionState aqui. O erro 21:13 deve desaparecer com isso.

  const [especialidade, setEspecialidade] = useState<Especialidade>(
    initialData?.especialidade || 'CARDIOLOGIA'
  );

  const handleEspecialidadeChange = (value: string) => {
    setEspecialidade(value as Especialidade);
  };

  return (
    // Use 'action={formAction}' para integrar com useActionState
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

      {/* Não há 'state.error' direto aqui, MedicosPage.tsx que irá lidar com ele */}

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
