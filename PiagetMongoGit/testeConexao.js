

const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Testando conexão...');
console.log('String de conexão:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Erro na conexão:', error.message);
    process.exit(1);
  });