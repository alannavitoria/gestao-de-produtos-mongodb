const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//Teste

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
})
.catch((error) => {
  console.error('❌ Erro ao conectar com MongoDB:', error.message);
});

// Configurações do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const produtosRouter = require('./routes/produtos');
app.use('/produtos', produtosRouter);

// Rota principal
app.get('/', (req, res) => {
  res.redirect('/produtos');
});

// Rota de erro 404
app.use((req, res) => {
  res.status(404).render('error', { message: 'Página não encontrada' });
});

// Middleware de erro
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render('error', { message: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
});