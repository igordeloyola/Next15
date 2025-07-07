'use server';

import { prisma } from '@/lib/prisma';
import { medicoSchema } from './schema';
// Adicionar imports
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function listarMedicos() {
  try {
    return await prisma.medico.findMany({
      orderBy: { nome: 'asc' },
    });
  } catch (error) {
    console.error('Erro ao listar médicos:', error);
    return [];
  }
}

// Substituir função criarMedico
export async function criarMedico(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: 'Dados do formulário não encontrados' };
  }

  const data = Object.fromEntries(formData.entries());
  const parsed = medicoSchema.omit({ id: true }).safeParse(data);

  if (!parsed.success) {
    return { error: 'Dados inválidos', details: parsed.error.format() };
  }

  try {
    await prisma.medico.create({
      data: parsed.data,
    });
    revalidatePath('/medicos');
    return { success: true };
  } catch (error) {
    return { error: 'Erro ao criar médico' };
  }
}

// Substituir função editarMedico
export async function editarMedico(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: 'Dados do formulário não encontrados' };
  }

  const data = Object.fromEntries(formData.entries());
  const parsed = medicoSchema.safeParse(data);

  if (!parsed.success) {
    return { error: 'Dados inválidos', details: parsed.error.format() };
  }

  if (!parsed.data.id) {
    return { error: 'ID do médico é obrigatório' };
  }

  try {
    await prisma.medico.update({
      where: { id: parsed.data.id },
      data: {
        nome: parsed.data.nome,
        crm: parsed.data.crm,
        conselho: parsed.data.conselho,
        especialidade: parsed.data.especialidade,
      },
    });
    revalidatePath('/medicos');
    return { success: true };
  } catch (error) {
    return { error: 'Erro ao editar médico' };
  }
}

// Substituir função deletarMedico
export async function deletarMedico(id: string) {
  try {
    await prisma.medico.delete({ where: { id } });
    revalidatePath('/medicos');
    return { success: true };
  } catch (error) {
    return { error: 'Erro ao deletar médico' };
  }
}
