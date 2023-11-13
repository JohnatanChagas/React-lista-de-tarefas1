import { useState, useEffect } from "react";
import "./TodoList.css";
import Icone from "./assets/icon.webp";

function TodoList() {

  const listaStorage = localStorage.getItem('Lista')


  const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
  const [novoItem, setNovoItem] = useState([]);


  useEffect(()=> {
    localStorage.setItem('Lista', JSON.stringify(lista));
  },[lista])

  function adicionaItem(form) {
    form.preventDefault();
    if (!novoItem) {
      return;
    }
    setLista([...lista, { text: novoItem, isCompleted: false }]);
    setNovoItem(" ");
    document.getElementById("input-entrada").focus();
  }

  function clicou(index) {
    const listAux = [...lista];
    listAux[index].isCompleted = !listAux[index].isCompleted
    setLista(listAux);
  }


  function deleta(index) {
    const listAux = [...lista];
    listAux.splice(index,1)
    setLista(listAux);
  }

  function deletaTudo() {
    setLista([]);
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={adicionaItem}>
        <input
          id="input-entrada"
          value={novoItem}
          onChange={(e) => {
            setNovoItem(e.target.value);
          }}
          type="text"
          placeholder="Adicione uma tarefa"
        />
        <button className="add" type="submit">
          Add
        </button>
      </form>

      <div className="listaTarefas">
        <div style={{ textAlign: "center" }}>
          {lista.length < 1 ? (
            <img className="icone-central" src={Icone} />
          ) : (
            lista.map((item, index) => (

              <div 
              key={index}
              className={item.isCompleted ? "item completo" : "item"}>
                <span onClick={()=> {clicou (index)}}>{item.text}</span>
                <button onClick={()=> {deleta (index)}} className="del">Deletar</button>
              </div>
            ))
          )}
          {
            lista.length > 0 && 
            <button onClick={()=> {deletaTudo ()}} className="deleteAll">Deletar Todas</button>
          }

        </div>
      </div>
    </div>
  );
}

export default TodoList;
