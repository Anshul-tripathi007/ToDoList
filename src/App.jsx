import React from "react";
import { useState } from "react";
import { HiArchiveBoxXMark } from "react-icons/hi2";

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);

  window.onload = () => {
    let str = localStorage.getItem("array");
    if (str) {
      let newarr = JSON.parse(str);
      setTasks(newarr);
    }
  };
  const handleTitleChange = (evt) => {
    setTitle(evt.target.value);
  };

  const handleDescChange = (evt) => {
    setDesc(evt.target.value);
  };

  const handleAddTask = (evt) => {
    if (!title) alert("Please enter title");
    else if (!desc) alert("Please enter description");
    else {
      let newarr = [...tasks];
      newarr.push({ title, desc });
      setTasks(newarr);
      let str = JSON.stringify(newarr);
      localStorage.setItem("array", str);
      setTitle("");
      setDesc("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const deleteTask = (i) => {
    let newarr = [...tasks];
    newarr.splice(i, 1);
    let str = JSON.stringify(newarr);
    localStorage.setItem("array", str);
    setTasks(newarr);
  };

  let renderTasks =
    tasks.length > 0 ? (
      tasks.map((t, i) => {
        return (
          <div
            key={i}
            className="my-5 text-white flex items-center border-l-fuchsia-50 mr-60"
          >
          <HiArchiveBoxXMark className="mx-2"onClick={() => {
                deleteTask(i);
              }}/>

            <p className="text-xl mx-1">{t.title} : </p>
            <p className="text-base mx-2 ">{t.desc}</p>
          </div>
        );
      })
    ) : (
      <h2 className="text-white text-3xl">No Tasks found</h2>
    );

  return (
    <>
      <div
        id="main"
        className="bg-neutral-800 flex-col flex-grow"
        style={{ height: "100vh", width: "100vw", overflowY: "scroll" }}
      >
        <h1 className="font-bold text-center text-6xl">My ToDos</h1>
        <form onSubmit={handleFormSubmit} className="p-4 ml-60 w-2/3">
          <input
            value={title}
            onChange={handleTitleChange}
            className="my-8 w-96 h-8"
            placeholder="ENTER TITLE"
          ></input>
          <br></br>
          <input
            className="w-96 h-8 my-2"
            value={desc}
            onChange={handleDescChange}
            placeholder="ENTER DESCRIPTION"
          ></input>
          <br />
          <button
            id="addTask"
            onClick={handleAddTask}
            className="bg-white my-2 rounded-md"
          >
            Add Task
          </button>
        </form>
        <div id="container" className="flex-col p-4 ml-60">
          <ul>{renderTasks}</ul>
        </div>
      </div>
    </>
  );
}

export default App;
