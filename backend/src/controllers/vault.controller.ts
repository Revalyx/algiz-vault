import { Request, Response } from 'express';
import { VaultService } from '../services/vault.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class VaultController {
  /**
   * Crea un usuario rápido de prueba (para facilitar las pruebas iniciales)
   */
  static async registerUser(req: Request, res: Response) {
    try {
      const { email, masterHash } = req.body;
      
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }

      const user = await prisma.user.create({
        data: { email, masterHash: masterHash || 'dummy_hash' }
      });

      return res.status(201).json({ message: 'Usuario creado con éxito', userId: user.id });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Controlador para guardar un secreto cifrado
   */
  static async createVaultItem(req: Request, res: Response) {
    try {
      const { userId, title, username, secretValue, notes } = req.body;

      if (!userId || !title || !username || !secretValue) {
        return res.status(400).json({ error: 'Faltan campos obligatorios (userId, title, username, secretValue)' });
      }

      const newItem = await VaultService.createItem({
        userId,
        title,
        username,
        secretValue,
        notes
      });

      return res.status(201).json({
        message: 'Secreto cifrado y guardado con éxito en el cofre',
        item: newItem
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Controlador para recuperar y descifrar un secreto
   */
  static async getVaultItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req.query; // Para pruebas rápidas por query param

      if (!userId) {
        return res.status(400).json({ error: 'Se requiere el userId para autorizar la lectura' });
      }

      const decryptedItem = await VaultService.getItemDecrypted(String(id), String(userId));

      return res.status(200).json({
        message: 'Secreto descifrado correctamente',
        item: decryptedItem
      });
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}