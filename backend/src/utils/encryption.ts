import crypto from 'crypto';

// El algoritmo AES-256-GCM requiere una clave de 32 bytes (256 bits)
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // Recomendado para GCM

/**
 * Cifra un texto plano utilizando la clave maestra de entorno.
 */
export function encrypt(text: string, secretKeyHex: string): { encryptedData: string; iv: string } {
  const key = Buffer.from(secretKeyHex, 'hex');
  const iv = crypto.randomBytes(IV_LENGTH);
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Obtenemos la etiqueta de autenticación obligatoria en GCM
  const authTag = cipher.getAuthTag().toString('hex');

  // Combinamos los datos cifrados con el authTag
  const encryptedData = `${encrypted}:${authTag}`;

  return {
    encryptedData,
    iv: iv.toString('hex')
  };
}

/**
 * Descifra los datos previamente cifrados con AES-256-GCM.
 */
export function decrypt(encryptedData: string, ivHex: string, secretKeyHex: string): string {
  const key = Buffer.from(secretKeyHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  
  const [encrypted, authTagHex] = encryptedData.split(':');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

/**
 * Utilidad auxiliar para generar una clave maestra segura de 256 bits en formato Hex.
 */
export function generateMasterKey(): string {
  return crypto.randomBytes(32).toString('hex');
}