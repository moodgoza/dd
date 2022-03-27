const studentController = require('./contoroller');
const http = require('http');

const student = require('./student')
const server = http.createServer(async (req, res) => {

    if (req.url === "/api/students" && req.method === "GET") {
        await studentController.getStudents()
            .then(data => res.end(JSON.stringify(data)))
            .catch(e => res.end(JSON.stringify({ message: e.message })))

    }
    else if (req.url.match(/\/api\/students\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split('/')[3];
        await studentController.getStudent(id)
            .then(data => res.end(JSON.stringify(data)))
            .catch(e => res.end(JSON.stringify({ message: e.message })));
    }
    else if (req.url.match(/\/api\/students\/([0-9]+)/) && req.method === "PATCH") {
        const id = req.url.split('/')[3];
        await studentController.updateStudent(id)
            .then((data) => {
                console.log(data);
                res.end(JSON.stringify(data));
            })
            .catch(e => res.end(JSON.stringify({ message: e.message })));
    }
    else if (req.url.match(/\/api\/students\/([0-9]+)/) && req.method === "DELETE") {
        const id = req.url.split('/')[3];
        await studentController.deleteStudent(id)
            .then((data) => {
                console.log(data);
                res.end(JSON.stringify(data));
            })
            .catch(e => res.end(JSON.stringify({ message: e.message })));
    }
    else if (req.url === '/api/students' && req.method === "POST") {

        await studentController.createStudent(req)
        .then(data => res.end(JSON.stringify(data)))
        .catch(e => res.end(JSON.stringify({message: e.message})));
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "ROUTE NOT FOUND" }));
    }

})
server.listen(5000, () => {
    console.log("Server listening on port 5000");
})