/*Desarrollo por:
David Córdoba Pimienta
Juan Felipe Velasco García
Programación Distribuida y Paralela - 2021
*/

import { React, useState, useEffect, useRef } from "react"; {/*Se importa hooks para manejar los estados*/}
import { useParams } from "react-router"; {/*Se utiliza para capturar a los parametros de la ruta*/}
import "./GameStyles.css"; {/*Se incluyen los estilos del juego*/}
import { Modal, Button, Form } from "react-bootstrap"; {/*Se incluye bootstrap*/}

const Game = () => { //Se utiliza useState que crea internamente la variable donde almacenar el estado del componente
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [profit, setProfit] = useState(0);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [num, setNum] = useState(30);
  let intervalRef = useRef(); //Permite trabajar con referencias en componentes funcionales.

  const decreaseNum = () => { 
    setNum((prev) => prev - 1); //Se modifica el estado de num
  };

  useEffect(() => {//Recibe como parámetro una función que se ejecutará cada vez que nuestro componente se renderice O ya sea por un cambio de estado
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
      setModal2(true); //Se modifica el estado del modal 2
    }
  }, [num])

  const { user } = useParams();     //captura de datos
  const { category } = useParams();
  const { difficult } = useParams();

  const handleClose = () => setModal(false);
  const win = () => {
    setNum(30);
    clearInterval(intervalRef.current);
    setIndex(index + 1); //Se modifica el estado del Index
    setProfit(profit + 1000); //Se modifica el estado del Profit
    if (index == 9) {
      setModal(true); //Se modifica el estado del modal 1
    }
  };

  const handleClose2 = () => setModal2(false);
  const lost = () => {
    setModal2(true); //Se modifica el estado del modal 2
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light"> {/*Se crea el navbar sueperior */}
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
        <button class="counter">{(num > 0) ? num : 0}</button> {/*Se crea el reloj */}
        <br></br>
        <p id="q">{questions[index] ? questions[index].question : ""}</p> {/*Se trae la pregunta */}
        <button class="btn btn-success btn-lg btn-block optionsbtn" onClick={lost}> {/*Se crea el botón de la respuesta 1*/}
          {questions[index] ? questions[index].incorrect_answers[2] : ""} {/*Se trae la respuesta 1*/}
        </button>
        <br></br>
        <button class="btn btn-success btn-lg btn-block optionsbtn" onClick={lost} >{/*Se crea el botón de la respuesta 2*/}
          {questions[index] ? questions[index].incorrect_answers[0] : ""} {/*Se trae la respuesta 2 */}
        </button>
        <br></br>
        <button class="btn btn-success btn-lg btn-block optionsbtn" onClick={lost}> {/*Se crea el botón de la respuesta 3*/}
          {questions[index] ? questions[index].incorrect_answers[1] : ""} {/*Se trae la respuesta 3 */}
        </button>
        <br></br>
        <button class="btn btn-success btn-lg btn-block optionsbtn" onClick={win}> {/*Se crea el botón de la respuesta 4*/}
          {questions[index] ? questions[index].correct_answer : ""} {/*Se trae la respuesta 4 */}
        </button>
        <div className="card winning"> {/*Se crea el lsitado de las ganancias por pregunta*/}
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
      <Modal show={modal} onHide={handleClose}> {/*Se crea el modal de ganar el juego*/}
        <Modal.Header closeButton>
          <Modal.Title> <p id="pwin">YOU HAVE WON! &#x1f911;</p></Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button id="bwin" onClick={(() => window.location = "/")}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modal2} onHide={handleClose2}> {/*Se crea el modal de perder el juego*/}
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