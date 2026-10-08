const QRSession = require("../models/QRSession");

// Generate a new QR session
const generateQR = async (req, res) => {
  try {
    const { subjectId } = req.body;

    if (!subjectId) {
      return res.status(400).json({ msg: "subjectId is required" });
    }

    const token = Math.random().toString(36).substr(2, 8); // random QR token
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    const qrSession = await QRSession.create({
      subject: subjectId, // must match the model field
      token,
      expiresAt
    });

    res.json(qrSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Deactivate a QR session
const deactivateQR = async (req, res) => {
  try {
    const updated = await QRSession.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: "QR session not found" });

    res.json({ message: "QR deactivated", qrSession: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { generateQR, deactivateQR };