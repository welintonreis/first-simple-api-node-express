const express = require("express");
const { uuid } = require("uuidv4");

const app = express();
const port = 9000;
const host = "0.0.0.0";
const projects = [];

app.use(express.json());

app.get("/projects", (req, res) => {
  res.send(projects);
});

app.post("/projects", function (req, res) {
  const { name, owner } = req.body;
  const project = { id: uuid(), name: name, owner: owner };
  projects.push(project);
  res.send(project);
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { name, owner } = req.body;
  const project = { id: id, name: name, owner: owner };
  const prjIndex = projects.findIndex((p) => p.id === id);

  if (prjIndex >= 0) {
    projects[prjIndex] = project;
    res.send(project);
  } else {
    res.send("Oops, sommething goes wrong!");
  }
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const prjIndex = projects.findIndex((p) => p.id === id);
  if (prjIndex >= 0) {
    projects.splice(prjIndex, 1);
    res.send("Deletato!!");
  } else {
    res.send("Oops, algo deu errado...");
  }
});

app.listen(port, host);
