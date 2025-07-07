'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Medico } from '../schema';

interface MedicoListProps {
  medicos: Medico[];
  onEdit: (medico: Medico) => void;
  onDelete: (id: string) => Promise<void>;
}

export function MedicoList({ medicos, onEdit, onDelete }: MedicoListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>CRM</TableHead>
          <TableHead>Conselho</TableHead>
          <TableHead>Especialidade</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {medicos.map((medico) => (
          <TableRow key={medico.id}>
            <TableCell>{medico.nome}</TableCell>
            <TableCell>{medico.crm}</TableCell>
            <TableCell>{medico.conselho}</TableCell>
            <TableCell>{medico.especialidade}</TableCell>
            <TableCell className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => onEdit(medico)}
              >
                Editar
              </Button>
              <Button
                variant='destructive'
                size='sm'
                onClick={() => onDelete(medico.id)}
              >
                Deletar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
