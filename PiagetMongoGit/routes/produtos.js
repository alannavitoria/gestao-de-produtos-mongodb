const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find().sort({ createdAt: -1 });
    res.render('index', { produtos });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Erro ao carregar produtos' });
  }
});

// Formulário de criação
router.get('/create', (req, res) => {
  res.render('create', { produto: new Produto() });
});

// Detalhes do produto
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).render('error', { message: 'Produto não encontrado' });
    }
    res.render('details', { produto });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Erro ao carregar produto' });
  }
});

// Formulário de edição
router.get('/:id/edit', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).render('error', { message: 'Produto não encontrado' });
    }
    res.render('edit', { produto });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Erro ao carregar produto' });
  }
});

// Criar produto
router.post('/', async (req, res) => {
  try {
    const produto = new Produto({
      nomeDoProduto: req.body.nomeDoProduto,
      descricaoDoProduto: req.body.descricaoDoProduto,
      codigoDoProduto: req.body.codigoDoProduto,
      precoDoProduto: req.body.precoDoProduto
    });
    
    await produto.save();
    res.redirect('/produtos');
  } catch (error) {
    console.error(error);
    res.render('create', {
      produto: req.body,
      error: 'Erro ao criar produto'
    });
  }
});

// Atualizar produto
router.put('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(
      req.params.id,
      {
        nomeDoProduto: req.body.nomeDoProduto,
        descricaoDoProduto: req.body.descricaoDoProduto,
        codigoDoProduto: req.body.codigoDoProduto,
        precoDoProduto: req.body.precoDoProduto
      },
      { new: true, runValidators: true }
    );

    if (!produto) {
      return res.status(404).render('error', { message: 'Produto não encontrado' });
    }

    res.redirect('/produtos');
  } catch (error) {
    console.error(error);
    res.render('edit', {
      produto: req.body,
      error: 'Erro ao atualizar produto'
    });
  }
});

// Deletar produto
router.delete('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) {
      return res.status(404).render('error', { message: 'Produto não encontrado' });
    }
    res.redirect('/produtos');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Erro ao deletar produto' });
  }
});

module.exports = router;

// Teste