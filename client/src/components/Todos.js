import { React, useState, useEffect } from 'react';
import TodoBody from './TodoBody';
import DateTimePicker from 'react-datetime-picker';
import { useNavigate } from 'react-router-dom';

export default function Todos() {
    const navigate = useNavigate();

    useEffect(()=>{if(!localStorage.getItem('user_id')){navigate('/login')}});
    
    //  SORTING FUNCTION
    const sortByDate = arr => {
        const sorter = (a, b) => {
            return new Date(a.due).getTime() - new Date(b.due).getTime();
        }
        arr.sort(sorter);
    };
    const [Todos, setTodos] = useState([]);
    const [load, setLoad] = useState(true);
    const [add, setAdd] = useState(false);
    const [addtitle, setAddtitle] = useState('');
    const [addbody, setAddbody] = useState('');
    const [adddue, setAdddue] = useState(new Date());
    const [editingID, setEditingID] = useState(null);


    const getTodos = async () => {
        let result = await fetch(`http://localhost:8000/api/${localStorage.getItem('user_id')}`, {
            method: "GET",
            headers: {
                "content-type": "text/html"
            }
        });
        let parsedData = await result.json();
        let array = parsedData.search_results.filter((e)=>{let d=new Date(e.due);return d>Date.now()})
        sortByDate(array)
        setTodos(array)
        // sortByDate(parsedData.search_results);
        // setTodos(parsedData.search_results);
        setLoad(false);

    }

    const addTask = async () => {
        setEditingID(null);
        let result = await fetch(`http://localhost:8000/api/${localStorage.getItem('user_id')}`, {
            method: 'POST',
            body: JSON.stringify({
                title: addtitle,
                body: addbody,
                due: adddue,
                user_id: localStorage.getItem('user_id')
            }),
            headers: { "Content-type": "application/json" }
        });
        result = await result.json();
        if (result.message === 'done') { console.log('created');setAdd(false);setAddbody('');setAddtitle('');setAdddue(new Date()); }
        getTodos();
    }

    const removeTodo = async (id) =>{
        setAdd(false);setEditingID(null);
        let result = await fetch(`http://localhost:8000/api/${id}`, {
            method: 'DELETE',
            headers: { "Content-type": "application/json" },
        });
        result = await result.json();
        if(result.message==='done'){console.log('removed', id);getTodos();}
        
    }

    const editTodo = async (id) =>{
        setAdd(false);
        setEditingID(id);
    }

    const updateTodo = async (id, title, body, due) => {
        let result = await fetch(`http://localhost:8000/api/${id}`, {
            method: 'PUT',
            body: JSON.stringify({title, body, due}),
            headers: { "Content-type": "application/json" }
        });
        result = await result.json();
        if(result.status===200){
            // Todos.forEach((value)=>{
            //     if(value._id===id){value.title=title, value.body}
            // });
            getTodos();
            setEditingID(null);
        }else{
            return true;
        }
    }

    const cancelupdateTodo = async () => {
        setEditingID(null);
    }

    useEffect(() => { getTodos() }, [load]);
    return (
        <div className="Todos my-5">
            <button type="button" className="btn btn-danger" onClick={() => { localStorage.removeItem('user_id'); navigate('/login') }}>Logout</button>
            <button type="button" className="btn btn-success" onClick={() => { setAdd(true);setEditingID(null) }}>New Task</button>
            {add && (
                <div className="card my-3">
                    <div className="card-body">
                        <div className="input-group mb-3" style={{ width: '40%' }}>
                            <span className="input-group-text" id="basic-addon1">Title</span>
                            <input type="text" className="form-control" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1" onChange={(e) => { setAddtitle(e.target.value) }} />
                        </div>
                        <button type="button" className="btn btn-danger" onClick={() => { addTask() }}>Create</button>
                        <DateTimePicker onChange={setAdddue} value={adddue} />
                        {/* <input type="time" id="appt" name="appt" onChange={(e)=>{setAdddue(Date(e.target.value))}}/> */}
                        <hr />
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">message</span>
                            <textarea type="text" className="form-control" placeholder="Your message" aria-label="Your message" aria-describedby="basic-addon1" onChange={(e) => { setAddbody(e.target.value) }} />
                        </div>
                    </div>
                </div>)}
            {Todos.map((e) => {
                return (
                    <TodoBody title={e.title} body={e.body} time={e.timestamp} due={e.due} id={e._id} key={e._id} removeTodo={removeTodo} editTodo={editTodo} editing={editingID===e._id?true:null} updateTodo={updateTodo} cancelupdateTodo={cancelupdateTodo}/>
                )
            })}
        </div>
    );
}