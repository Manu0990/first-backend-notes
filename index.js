const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());                                         // Making json file readable
app.use(express.urlencoded({ extended: true }));                 // Making encoded url data readable
app.use(express.static(path.join(__dirname, 'public')));         // Adding the static file path
app.set('view engine', 'ejs');                                   // Defining view engine(frontend) as ejs

app.get("/", function (req, res) {
    fs.readdir("./files", function (err, files) {
        res.render("home", { files: files });
    });

});

app.get("/files/:filename", function (req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
        res.render('showdata', { filename: req.params.filename, filedata: filedata });
    })
});

app.get("/edit/:filename", function (req, res) {
    fs.readFile(`./edit/${req.params.filename}`, "utf-8", function (err, filedata) {
        res.render('edit', { filename: req.params.filename, filedata: filedata });
    })
});

app.post("/create", function (req, res) {
    fs.writeFile(`./files/${req.body.title.split(" ").join("_")}.txt`, req.body.description, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

app.post("/edit", function (req, res) {
    fs.rename(`./files/${req.body.PreviousName}`, `./files/${(req.body.NewName).split(" ").join("_")}`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

app.listen(3000);