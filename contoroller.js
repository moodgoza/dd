let data = require("./student")

const getStudents = () => {
    return new Promise((res, rej) => {
        res(data);
    })
}

const getStudent = (id) => {
    return new Promise((res, rej) => {
        res(data.find(s => s.id === id));
    })
}

const updateStudent = (id) => {
    return new Promise((res, rej) => {
        let student = data.find(d => d.id === id);
        student['name'] = 'Abood';
        res(student);
    })

}

const deleteStudent = (id) => {
    return new Promise((res, rej) => {
        data = data.filter(d => d.id !== id);
        res(data);
    })
}

const createStudent = async (req) => {
    return new Promise(async (res, rej) => {

        let body = "";

        await req.on('data', (chunk) => {
            console.log(chunk.toString())
            body += chunk.toString();
            
        })
         console.log(body)

       

        req.on('end', () => {
            const student = JSON.parse(body);
            console.log(student);
            let newStudent = {
                id: Math.floor(5 + Math.random() * 10).toString(),
                ...student
            }

            data = [...data, newStudent];
            res(data);
        })
    })
}

const method = { getStudents, getStudent, updateStudent, deleteStudent, createStudent };
module.exports = method;