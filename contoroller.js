let data = require("./student")

const getStudents = () => {
    return new Promise((res, rej) => {
        res(data);
    })
}

const getStudent = (id) => {
    return new Promise((res, rej) => {
        const student = data.find(s => s.id === id);
        if(!student)
        rej({message: "student not found"});
        res(student);
    })
}

const updateStudent = (id) => {
    return new Promise((res, rej) => {
        let student = data.find(d => d.id === id);

        if(!student)
        rej({message: "student not found"});
        student['name'] = 'Emad';
        res(student);
    })

}

const deleteStudent = (id) => {
    return new Promise((res, rej) => {
        const student = data.find(d => d.id === id);

        if(!student)
        rej({message: "student not found"});

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
            const {name} = student;

            if(!name)
            rej({message: "name is requiered"});
            
            let newStudent = {
                ...student,
                id: Math.floor(5 + Math.random() * 10).toString()
            }

            data = [...data, newStudent];
            res(data);
        })
    })
}

const method = { getStudents, getStudent, updateStudent, deleteStudent, createStudent };
module.exports = method;