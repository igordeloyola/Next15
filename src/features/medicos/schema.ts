import { z } from 'zod';

export const especialidades = [
  'CARDIOLOGIA',
  'DERMATOLOGIA',
  'ORTOPEDIA',
  'PEDIATRIA',
  'GINECOLOGIA',
] as const;

export const medicoSchema = z.object({
  id: z.string().optional(), // continua opcional para criação
  nome: z.string().min(1, 'Nome é obrigatório'),
  crm: z.string().min(1, 'CRM é obrigatório'),
  conselho: z.string().min(1, 'Conselho é obrigatório'),
  especialidade: z.enum(especialidades, {
    errorMap: () => ({ message: 'Especialidade inválida' }),
  }),
});

// Tipo para criação/edição (id opcional)
export type MedicoInput = z.infer<typeof medicoSchema>;

// Tipo para listagem e manipulação (id obrigatório)
export type MedicoListItem = Omit<MedicoInput, 'id'> & { id: string };

export type Especialidade = (typeof especialidades)[number];
