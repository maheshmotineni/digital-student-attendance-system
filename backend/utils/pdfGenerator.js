const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.generateAttendancePDF = (data, res) => {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Attendance_Report.pdf"
  );

  doc.pipe(res);

  doc.fontSize(18).text("Attendance Report", { align: "center" });
  doc.moveDown();

  data.forEach((record, index) => {
    doc
      .fontSize(12)
      .text(
        `${index + 1}. Student: ${record.student.name} | Subject: ${
          record.subject.name
        } | Status: ${record.status} | Date: ${record.date.toDateString()}`
      );
  });

  doc.end();
};