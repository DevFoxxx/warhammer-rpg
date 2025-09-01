import express from "express";

const router = express.Router();

// Rotta di test per verificare che tutto funzioni
router.get("/", (req, res) => {
  res.send("Benvenuto nell'area master!");
});

// Qui potrai aggiungere rotte specifiche per il master
// Ad esempio: modificare, creare o gestire elementi della campagna
router.post("/create", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Nome e descrizione sono richiesti" });
  }

  // Simuliamo la creazione di un oggetto
  const newItem = {
    id: Date.now(),
    name,
    description,
  };

  res.status(201).json({ message: "Oggetto creato con successo", item: newItem });
});

// Altro esempio di rotta: eliminare un oggetto
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  res.json({ message: `Oggetto con id ${id} eliminato (simulazione)` });
});

export default router;
