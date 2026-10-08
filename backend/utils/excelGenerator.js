const ExcelJS = require("exceljs");

exports.generateExcel = async (data, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Attendance");

  worksheet.columns = [
    { header: "Student", key: "student", width: 20 },
    { header: "Subject", key: "subject", width: 20 },
    { header: "Status", key: "status", width: 15 },
    { header: "Date", key: "date", width: 20 }
  ];

  data.forEach(record => {
    worksheet.addRow({
      student: record.student.name,
      subject: record.subject.name,
      status: record.status,
      date: record.date.toDateString()
    });
  });

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Attendance_Report.xlsx"
  );

  await workbook.xlsx.write(res);
  res.end();
};