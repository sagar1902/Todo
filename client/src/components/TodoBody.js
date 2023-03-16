import { React, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

export default function TodoBody(props) {
    let time = new Date(props.time);
    let due = new Date(props.due);
    // const [editing, setEditing] = useState(false);
    const [addtitle, setAddtitle] = useState(props.title);
    const [addbody, setAddbody] = useState(props.body);
    const [adddue, setAdddue] = useState(due);

    if (!props.editing) {
        return (
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <button type="button" className="btn btn-warning" onClick={() => { props.editTodo(props.id) }}>Edit Task</button>
                    <button type="button" className="btn btn-danger" onClick={() => { props.removeTodo(props.id) }}>Remove Task</button>
                    <hr />
                    <p className="card-text">{props.body}</p>
                    <hr />
                    <p><strong>Due: {due.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</strong></p>
                    <p>Created At: {time.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</p>
                </div>
            </div>
        );
    }
    else {
        return (
                <>
            <div className="card my-3">
                    <div className="card-body">
                        <div className="input-group mb-3" style={{ width: '40%' }}>
                            <span className="input-group-text" id="basic-addon1">Title</span>
                            <input type="text" className="form-control" value={addtitle} aria-label="Title" aria-describedby="basic-addon1" onChange={(e) => { setAddtitle(e.target.value) }} />
                        </div>
                        <button type="button" className="btn btn-warning" onClick={() => { props.updateTodo(props.id, addtitle, addbody, adddue) }}>update</button>
                        <button type="button" className="btn btn-danger" onClick={() => { props.cancelupdateTodo() }}>cancel</button>
                        <DateTimePicker onChange={setAdddue} value={adddue} />
                        {/* <input type="time" id="appt" name="appt" onChange={(e)=>{setAdddue(Date(e.target.value))}}/> */}
                        <hr />
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">message</span>
                            <input type="text" className="form-control" value={addbody} aria-label="Your message" aria-describedby="basic-addon1" onChange={(e) => { setAddbody(e.target.value) }} />
                        </div>
                    </div>
                    </div>
{/* 


            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <button type="button" className="btn btn-warning" onClick={() => { props.updateTodo(props.id) }}>Edit Task</button>
                    <button type="button" className="btn btn-danger" onClick={() => { props.removeTodo(props.id) }}>Remove Task</button>
                    <hr />
                    <p className="card-text">{props.body}</p>
                    <hr />
                    <p><strong>Due: {due.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</strong></p>
                    <p>Created At: {time.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</p>
                </div>
            </div> */}
            </>
        );
    }
}