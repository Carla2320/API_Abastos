const router = require("express").Router();
const { Product } = require("../../db");
const { check, validationResult } = require("express-validator");

router.get("/visualizarP", async (req, res) => {
  let films = await Product.findAll();
  res.json(films);
});

router.post("/actualizarEstado", async(req,res) => {
  const { num_productos, estado} = req.body;
  try {
    const producto = await Product.findOne({ where: { num_productos: num_productos } });
    producto.estado = estado;
    await producto.save();
    res.json({
        ok: true,
        producto
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, Contactate con soporte para mas información",
    });
  }
});
router.post(
  "/producto",
  [
    check("num_producto", " Es obligatorio"),
    check("nombre", "Nombre es obligatorio").not().isEmpty(),
    check("descripcion", "Descripcion es obligatorio").not().isEmpty(),
    check("precio", "Precio es obligatorio").not().isEmpty(),
    check("estado", "Estado es obligatorio").not().isEmpty(),
    check("porcentaje_descuento", "Porcentaje es obligatorio").not().isEmpty(),
    check("imagen", "Imagen es obligatorio").not().isEmpty(),
  ],
  async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(422).json({ error: errores.array() });
    }
    let producto = await Product.create(req.body);
    res.json(producto);
  }
);


module.exports = router;
