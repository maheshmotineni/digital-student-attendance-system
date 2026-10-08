const crypto = require("crypto");
const QRSession = require("../models/QRSession");

exports.generateQRSession = async (subjectId) => {
  const token = crypto.randomBytes(16).toString("hex");

  const session = await QRSession.create({
    subject: subjectId,
    token,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    active: true
  });

  return session;
};

exports.validateQR = async (token) => {
  const session = await QRSession.findOne({
    token,
    active: true
  });

  if (!session) return null;

  if (new Date() > session.expiresAt) {
    session.active = false;
    await session.save();
    return null;
  }

  return session;
};