const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nomeDoProduto: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres']
  },
  descricaoDoProduto: {
    type: String,
    required: [true, 'Descrição do produto é obrigatória'],
    trim: true,
    maxlength: [500, 'Descrição não pode ter mais de 500 caracteres']
  },
  codigoDoProduto: {
    type: String,
    required: [true, 'Código do produto é obrigatório'],
    unique: true,
    trim: true,
    uppercase: true
  },
  precoDoProduto: {
    type: Number,
    required: [true, 'Preço do produto é obrigatório'],
    min: [0, 'Preço não pode ser negativo'],
    max: [1000000, 'Preço não pode ser maior que 1.000.000']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Produto', productSchema);