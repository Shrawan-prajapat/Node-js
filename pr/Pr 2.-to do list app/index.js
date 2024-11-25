import express from 'express';


const port = 9000;
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

let tasks = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/addTask', (req, res) => {
    const { task, status, deadline } = req.body;
    const newTask = {
        id: Date.now(),
        task,
        status,
        deadline
    };
    tasks.push(newTask);
    res.redirect('/');
});

app.get('/deleteTask', (req, res) => {
    const id = parseInt(req.query.id);
    tasks = tasks.filter(task => task.id !== id);
    res.redirect('/');
});

app.get('/editTask', (req, res) => {
    const id = parseInt(req.query.id);
    const taskToEdit = tasks.find(task => task.id === id);
    res.render('edit', { task: taskToEdit });
});

app.post('/updateTask', (req, res) => {
    const { id, task, status, deadline } = req.body;
    tasks = tasks.map(t => {
        if (t.id === parseInt(id)) {
            return { id: t.id, task, status, deadline };
        }
        return t;
    });
    res.redirect('/');
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);

})