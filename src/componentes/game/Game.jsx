import {React, useState, useEffect} from "react";
import { useParams } from "react-router";
import "./game.css";
import { Modal, Button, Form } from "react-bootstrap";

const Game = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0)
  const [ganancia, setGanancia] = useState(0)
  const [modal, setModal] = useState(false)

        useEffect(() => {
            fetch(
            `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficult}&type=multiple`
            )
            .then((res) => res.json())
            .then((data) => {
                console.log(data.results);
                setPreguntas(data.results);
            });
        }, []);

        const { user } = useParams();
        const { category } = useParams();
        const { difficult } = useParams();

        const handleClose = () => setModal(false);
        const cambios = () => 
        {setIndice(indice+1);
         setGanancia(ganancia+1000);
         if(indice == 9){
             setModal(true);
         }
        };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="header">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link">{user}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link">Nivel: {difficult}</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link">Ganacia: {ganancia}</a>
            </li>
          </ul>
        </div>
      </nav>
      <br></br>
      <div className="card">
        <br></br>
        <button class="counter">30</button>
        <br></br>
        <p>{preguntas[indice] ? preguntas[indice].question :"" }</p>
        <br></br>
        <button class="btn btn-dark btn-lg btn-block optionsbtn" onClick={cambios}>
        {preguntas[indice] ? preguntas[indice].correct_answer :""}
        </button>
        <br></br>
        <button class="btn btn-dark btn-lg btn-block optionsbtn">
        {preguntas[indice] ? preguntas[indice].incorrect_answers[0] :"" }
        </button>
        <br></br>
        <button class="btn btn-dark btn-lg btn-block optionsbtn">
        {preguntas[indice] ? preguntas[indice].incorrect_answers[1] :"" }
        </button>
        <br></br>
        <button class="btn btn-dark btn-lg btn-block optionsbtn">
        {preguntas[indice] ? preguntas[indice].incorrect_answers[2] :"" }
        </button>
      </div>
      <div className="card winning">
        <p>1 $1,000</p>
        <p>2 $2,000</p>
        <p>3 $3,000</p>
        <p>4 $4,000</p>
        <p>5 $5,000</p>
        <p>6 $6,000</p>
        <p>7 $7,000</p>
        <p>8 $8,000</p>
        <p>9 $9,000</p>
        <p>10 $10,000</p>
      </div>
      <Modal show={modal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>¡GANASTE!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={(() => window.location="/")}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
    
  );
};

export default Game;