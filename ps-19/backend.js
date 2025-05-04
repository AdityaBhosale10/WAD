const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.0/student')
  

const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_Marks: Number
});

const Student = mongoose.model('studentmarks', studentSchema);

// (c) Insert array of documents
app.get('/insert', async (req, res) => {
  const students = [
    { Name: 'ABC', Roll_No: 111, WAD_Marks: 25, CC_Marks: 25, DSBDA_Marks: 25, CNS_Marks: 25, AI_Marks: 25 },
    { Name: 'DEF', Roll_No: 112, WAD_Marks: 15, CC_Marks: 30, DSBDA_Marks: 35, CNS_Marks: 20, AI_Marks: 10 },
    { Name: 'GHI', Roll_No: 113, WAD_Marks: 28, CC_Marks: 22, DSBDA_Marks: 29, CNS_Marks: 26, AI_Marks: 30 },
  ];
  await Student.insertMany(students);
  res.send('Students inserted');
});

// (d) Total count + List all
app.get('/list', async (req, res) => {
  const count = await Student.countDocuments();
  const students = await Student.find();
  let html = `<h2>Total Students: ${count}</h2><pre>${JSON.stringify(students, null, 2)}</pre>`;
  res.send(html);
});

// (e) Students with DSBDA > 20
app.get('/dsbda', async (req, res) => {
  const result = await Student.find({ DSBDA_Marks: { $gt: 20 } }, { Name: 1, _id: 0 });
  res.send(result.map(s => s.Name).join('<br>'));
});

// (f) Update marks of specific student
app.get('/update/:name', async (req, res) => {
  const { name } = req.params;
  const result = await Student.updateOne(
    { Name: name },
    { $inc: { WAD_Marks: 10, CC_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, AI_Marks: 10 } }
  );
  res.send(`Updated marks for ${name}`);
});

// (g) Names with >25 in all
app.get('/allabove25', async (req, res) => {
  const result = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_Marks: { $gt: 25 }
  }, { Name: 1, _id: 0 });
  res.send(result.map(s => s.Name).join('<br>'));
});

// (h) < 40 in WAD and CNS (as math & science)
app.get('/below40', async (req, res) => {
  const result = await Student.find({
    WAD_Marks: { $lt: 40 },
    CNS_Marks: { $lt: 40 }
  }, { Name: 1, _id: 0 });
  res.send(result.map(s => s.Name).join('<br>'));
});

// (i) Remove specified student
app.get('/delete/:name', async (req, res) => {
  const { name } = req.params;
  await Student.deleteOne({ Name: name });
  res.send(`Deleted student ${name}`);
});

// (j) Tabular format
app.get('/table', async (req, res) => {
  const students = await Student.find();
  let html = `
    <table border="1" cellpadding="10" cellspacing="0">
      <tr>
        <th>Name</th><th>Roll No</th><th>WAD</th><th>CC</th><th>DSBDA</th><th>CNS</th><th>AI</th>
      </tr>
  `;
  students.forEach(s => {
    html += `
      <tr>
        <td>${s.Name}</td><td>${s.Roll_No}</td><td>${s.WAD_Marks}</td>
        <td>${s.CC_Marks}</td><td>${s.DSBDA_Marks}</td><td>${s.CNS_Marks}</td><td>${s.AI_Marks}</td>
      </tr>
    `;
  });
  html += `</table>`;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
