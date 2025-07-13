const Categoria = require('../models/categoria');

// Obtener todas las categorías
exports.getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



exports.createCategoria = async (req, res) => {
    try {
        let categoria;
        //creamos nuestro producto
        categoria = new Categoria(req.body);

        await categoria.save();
        res.send(categoria);

    } catch (error) {
        console.log(error);
        res.json(500).send('HUBO UN ERROR')
    }

}
