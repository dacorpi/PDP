/*Desarrollo por:
David Córdoba Pimienta
Juan Felipe Velasco García
Programación Distribuida y Paralela - 2021
*/

import { React, useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import "./GameStyles.css";
import { Modal, Button, Form } from "react-bootstrap";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [profit, setProfit] = useState(0);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [num, setNum] = useState(30);
  let intervalRef = useRef();

  const decreaseNum = () => { 
    setNum((prev) => prev - 1);
  };

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficult}&type=multiple`
    )
      .then((res) => res.json())  //recorrido de respuestas
      .then((data) => {
        console.log(data.results);
        setQuestions(data.results);
      });

  }, []);

  useEffect(() => {
    console.log(num);
    if (num === 30) {
      intervalRef.current = setInterval(decreaseNum, 1000);
    } else if (num === 0) {
      setModal2(true);
    }
  }, [num])

  const { user } = useParams();     //captura de datos
  const { category } = useParams();
  const { difficult } = useParams();

  const handleClose = () => setModal(false);
  const win = () => {
    setNum(30);
    clearInterval(intervalRef.current);
    setIndex(index + 1);
    setProfit(profit + 1000);
    if (index == 9) {
      setModal(true);
    }
  };

  const handleClose2 = () => setModal2(false);
  const lost = () => {
    setModal2(true);
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="header">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link">PLAYER: {user}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link">LEVEL: {difficult}</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link">QUESTION: #{index + 1}</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link active">PROFIT: ${profit}</a>
            </li>
            <li id="exit" class="nav-item ">
              <a class="nav-link" href="/">LOG OUT</a>
            </li>
          </ul>
        </div>
      </nav>
      <br></br>
      <link href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap" rel="stylesheet"></link>
      <div className="card bg">
        <br />
        <button class="counter">{(num > 0) ? num : 0}</button> 
        <br></br>
        <p id="q">{questions[index] ? questions[index].question : ""}</p> 
        <button class="btn btn-success btn-lg btn-block optionsbtn" onClick={lost}>
          {questions[index] ? questions[index].incorrect_answers[2] : ""} 
        </button>
        <br></br>
        <button class="btn btn-success btn-lg btn-block optionsbtn" onClick={lost}>
          {questions[index] ? questions[index].incorrect_answers[0] : ""} 
        </button>
        <br></br>
        <button class="btn btn-success btn-lg btn-block optionsbtn" onClick={lost}> 
          {questions[index] ? questions[index].incorrect_answers[1] : ""} 
        </button>
        <br></br>
        <button class="btn btn-success btn-lg btn-block optionsbtn" onClick={win}> 
          {questions[index] ? questions[index].correct_answer : ""} 
        </button>
        <div className="card winning">
          <ol className="list_win">
            <li><span>1. </span> $1,000</li>
            <li><span>2. </span> $2,000</li>
            <li><span>3. </span> $3,000</li>
            <li><span>4. </span> $4,000</li>
            <li><span>5. </span> $5,000</li>
            <li><span>6. </span> $6,000</li>
            <li><span>7. </span> $7,000</li>
            <li><span>8. </span> $8,000</li>
            <li><span>9. </span> $9,000</li>
            <li><span>10. </span> $10,000</li>
          </ol>
        </div>
      </div>
      <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <p id="pwin">YOU HAVE WON! &#x1f911;</p></Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button id="bwin" onClick={(() => window.location = "/")}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modal2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title> <p id="plost">GAME OVER! 🤨</p></Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button id="blost" onClick={(() => window.location = "/")}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Game;