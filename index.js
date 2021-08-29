const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
app.use(cors())
const fileUpload = require("express-fileupload");
app.get('/', function (req, res) {
    console.log("handle request");
    res.send('handle request')
})

app.use(fileUpload({ createParentPath: true }));
app.use(express.static(__dirname));

app.post("/upload", async (req, res) => {
    const dateNow = Date.now();
    const newpath = path.join(
        __dirname,
        "./uploads",
        `${dateNow}__${req.files.file.name}`
    );

    let file = req.files.file;

    file.mv(newpath).then((success) => {
        res.send({
            status: true,
            message: "File is uploaded",
            data: {
                name: file.name,
                mimetype: file.mimetype,
                size: file.size / 1024 / 1024,
                src: `http://localhost:5000/uploads/${dateNow}__${file.name}`
            },
        });
    });
})
app.listen(5000, () => {
    console.log("listening to port 3000");
});