const express = require("express")
const path = require("path")

app = express()
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.render("index.pug", { fileStructure: [
        {type: "folder", name: "movies", items: []}, 
        {type: "folder", name: "videos", items: []}, 
        {type: "folder", name: "photos", items: []},
        {type: "folder", name: "apps", items: []}, 
        {type: "folder", name: "scripts", items: []},
        {type: "folder", name: "projects", items: []},
        {type: "folder", name: "musics", items: [
            {type: "folder", name: "zevaqueiro", items: [
                {type: "file", name: "zevaqueiro-coisas_do_interior.mp3"},
            ]},
            {type: "folder", name: "luanestilizado", items: [
                {type: "file", name: "luanestilizado-vida_de_vaqueiro.mp3"},
                {type: "file", name: "luanestilizado-galera_do_interior.mp3"},
            ]},
            {type: "folder", name: "avioesdoforro", items: [
                {type: "file", name: "avioesdoforro-alta_estacao.mp3"},
            ]},
            {type: "folder", name: "raisaiarodada", items: [
                {type: "file", name: "raisaiarodada-filho_do_mato.mp3"},
            ]},
        ]},
        {type: "folder", name: "databases", items: []},
        {type: "file", name: "nbr-8800.pdf"}
    ] })
})
app.listen(3000, () => {

})