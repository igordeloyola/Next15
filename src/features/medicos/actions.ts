// src/features/medicos/actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { medicoSchema } from './schema';
import { revalidatePath } from 'next/cache';
// Remova 'redirect' se não estiver usando em nenhuma outra parte do arquivo
// import { redirect } from 'next/navigation';

export async function listarMedicos() {
  try {
    return await prisma.medico.findMany({
      orderBy: { nome: 'asc' },
    });
  } catch (error: unknown) {
    // Adicione o tipo 'unknown'
    console.error('Erro ao listar médicos:', error); // Use a variável 'error'
    return [];
  }
}

export async function criarMedico(prevState: unknown, formData: FormData) {
  // Use 'unknown'
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
  } catch (error: unknown) {
    // Use 'unknown'
    console.error('Erro ao criar médico:', error); // Use a variável 'error'
    return { error: 'Erro ao criar médico' };
  }
}

export async function editarMedico(prevState: unknown, formData: FormData) {
  // Use 'unknown'
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
  } catch (error: unknown) {
    // Use 'unknown'
    console.error('Erro ao editar médico:', error); // Use a variável 'error'
    return { error: 'Erro ao editar médico' };
  }
}

export async function deletarMedico(id: string) {
  try {
    await prisma.medico.delete({ where: { id } });
    revalidatePath('/medicos');
    return { success: true };
  } catch (error: unknown) {
    // <-- Use 'unknown' aqui também
    console.error('Erro ao deletar médico:', error); // <-- Adicione esta linha para usar 'error'
    return { error: 'Erro ao deletar médico' };
  }
}
