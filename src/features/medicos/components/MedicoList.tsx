'use client';

import { MedicoListItem } from '../schema';

interface MedicoListProps {
  medicos: MedicoListItem[]; // id obrigatório
  onEdit: (medico: MedicoListItem) => void;
  onDelete: (id: string) => Promise<void>;
}

export function MedicoList({ medicos, onEdit, onDelete }: MedicoListProps) {
  return (
    <table className='w-full border-collapse'>
      <thead>
        <tr>
          <th className='border p-2'>Nome</th>
          <th className='border p-2'>CRM</th>
          <th className='border p-2'>Conselho</th>
          <th className='border p-2'>Especialidade</th>
          <th className='border p-2'>Ações</th>
        </tr>
      </thead>
      <tbody>
        {medicos.map((medico) => (
          <tr key={medico.id}>
            <td className='border p-2'>
              {medico.nome}
              <p>{medico.id}</p>
            </td>
            <td className='border p-2'>{medico.crm}</td>
            <td className='border p-2'>{medico.conselho}</td>
            <td className='border p-2'>{medico.especialidade}</td>
            <td className='border p-2 flex gap-2'>
              <button
                className='btn btn-primary'
                onClick={() => onEdit(medico)}
              >
                Editar
              </button>
              <button
                className='btn btn-outline btn-error'
                onClick={() => onDelete(medico.id)} // id é string garantido
              >
                Deletar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
