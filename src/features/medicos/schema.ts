import { z } from 'zod';

export const especialidades = [
  'CARDIOLOGIA',
  'DERMATOLOGIA',
  'ORTOPEDIA',
  'PEDIATRIA',
  'GINECOLOGIA',
] as const;

export const medicoSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  crm: z.string().min(1, 'CRM é obrigatório'),
  conselho: z.string().min(1, 'Conselho é obrigatório'),
  especialidade: z.enum(especialidades, {
    errorMap: () => ({ message: 'Especialidade inválida' }),
  }),
});

// Simplificar tipos
export type Medico = z.infer<typeof medicoSchema> & { id: string };
export type MedicoInput = z.infer<typeof medicoSchema>;
export type Especialidade = (typeof especialidades)[number];
