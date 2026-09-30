import { PrismaClient } from '@prisma/client';
import { encrypt, decrypt } from '../utils/encryption';

const prisma = new PrismaClient();
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '';

interface CreateItemDTO {
  userId: string;
  title: string;
  username: string;
  secretValue: string; // La contraseña en texto plano que el usuario quiere guardar
  notes?: string;
}

export class VaultService {
  /**
   * Guarda un nuevo elemento cifrando el secreto antes de enviarlo a MySQL
   */
  static async createItem(data: CreateItemDTO) {
    if (!ENCRYPTION_KEY) {
      throw new Error('ENCRYPTION_KEY no está definida en las variables de entorno.');
    }

    // Ciframos la contraseña usando nuestra utilidad AES-256-GCM
    const { encryptedData, iv } = encrypt(data.secretValue, ENCRYPTION_KEY);

    const newItem = await prisma.vaultItem.create({
      data: {
        userId: data.userId,
        title: data.title,
        username: data.username,
        encryptedData,
        iv,
        notes: data.notes,
      },
    });

    return {
      id: newItem.id,
      title: newItem.title,
      username: newItem.username,
      createdAt: newItem.createdAt,
    };
  }

  /**
   * Obtiene y descifra un elemento del cofre por su ID
   */
  static async getItemDecrypted(itemId: string, userId: string) {
    if (!ENCRYPTION_KEY) {
      throw new Error('ENCRYPTION_KEY no está definida.');
    }

    const item = await prisma.vaultItem.findFirst({
      where: { id: itemId, userId },
    });

    if (!item) {
      throw new Error('Elemento no encontrado o no autorizado.');
    }

    // Desciframos los datos para devolvérselos al usuario autenticado
    const decryptedPassword = decrypt(item.encryptedData, item.iv, ENCRYPTION_KEY);

    return {
      id: item.id,
      title: item.title,
      username: item.username,
      decryptedPassword,
      notes: item.notes,
      updatedAt: item.updatedAt,
    };
  }
}