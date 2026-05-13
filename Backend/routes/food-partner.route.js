import express from 'express'
import db from '../src/db.js'

const router = express.Router()

router.get('/:id', (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM foodpartner WHERE sno = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error', error: err })
    if (result.length === 0) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'foodpartner found', result })
  })
})
router.get("/", (req, res) => {
  db.query(
    "SELECT foodschema.*, foodpartner.sno as partner_sno FROM foodschema JOIN foodpartner ON foodschema.foodpartnername = foodpartner.name",
    (err, result) => {
      if (err) return res.json({ message: "error" })
      res.json({ rows: result })
    }
  )
})
export default router