import crypto from 'crypto';

// Gerar uma chave de autenticação aleatória
const authKey = crypto.randomBytes(32).toString('hex');

console.log('Chave de autenticação:', authKey);