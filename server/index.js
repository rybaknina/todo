const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

const port = 3000;

const task_path = path.resolve(__dirname, './data/task.json');
const static_dir = path.resolve(__dirname, '../dist/');

app.use(express.static(static_dir));
app.use(express.json());


app.get('/api/v1/task', (req, res) => {
    fs.readFile(task_path, 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.status(500).send(err);
        }
    });
});

app.post('/api/v1/task', (req, res) => {
    fs.readFile(task_path, 'utf-8', (err, data) => {
        if (!err) {
            const task = JSON.parse(data);
            task.push(req.body);
            fs.writeFile(task_path, JSON.stringify(task), 'utf-8', (err, data) => {
                res.sendStatus(201);
            });
        } else {
            res.status(500).send(err);
        }
    })
});

app.delete('/api/v1/task/:id', (req, res) => {
  fs.readFile(task_path, 'utf-8', (err, data) => {
    if (!err) {
      const tasks = JSON.parse(data);
      let index = tasks.findIndex(task => task.id === parseInt(req.params.id));
      if (index >= 0) {
          tasks.splice(index, 1);
        fs.writeFile(task_path, JSON.stringify(tasks), 'utf-8', () => {
          res.sendStatus(200);
        });
      } else {
        res.status(404).send("record not found");
      }
    } else {
      res.status(500).send(err);
    }
  })
});

app.put('/api/v1/task/:id', (req, res) => {
    fs.readFile(task_path, 'utf-8', (err, data) => {
        if (!err) {
            const tasks = JSON.parse(data);
            let index = tasks.findIndex(task => task.id === parseInt(req.params.id));
            if (index >= 0) {
                tasks[index].completed = !tasks[index].completed;
                fs.writeFile(task_path, JSON.stringify(tasks), 'utf-8', () => {
                    res.sendStatus(200);
                });
            } else {
                res.status(404).send("record not found");
            }
        } else {
            res.status(500).send(err);
        }
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

