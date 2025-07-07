'use server';

import { prisma } from '@/lib/prisma';
import { medicoSchema } from './schema';

export async function listarMedicos() {
  return await prisma.medico.findMany();
}

export async function criarMedico(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = medicoSchema.omit({ id: true }).safeParse(data); // omite id na criação

  if (!parsed.success) {
    throw new Error(JSON.stringify(parsed.error.format()));
  }

  const medico = parsed.data;

  await prisma.medico.create({
    data: {
      nome: medico.nome,
      crm: medico.crm,
      conselho: medico.conselho,
      especialidade: medico.especialidade,
    },
  });
}

export async function editarMedico(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = medicoSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(JSON.stringify(parsed.error.format()));
  }

  const medico = parsed.data;

  if (!medico.id) throw new Error('ID do médico é obrigatório');

  await prisma.medico.update({
    where: { id: medico.id },
    data: {
      nome: medico.nome,
      crm: medico.crm,
      conselho: medico.conselho,
      especialidade: medico.especialidade,
    },
  });
}

export async function deletarMedico(id: string) {
  await prisma.medico.delete({ where: { id } });
}
