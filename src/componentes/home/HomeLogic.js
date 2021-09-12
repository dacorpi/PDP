/*Desarrollo por:
David Córdoba Pimienta
Juan Felipe Velasco García
Programación Distribuida y Paralela - 2021
*/

import React, { Fragment, useState } from 'react';
import { Component } from 'react';
import { Link } from "react-router-dom";
import './HomeStyles.css';
import { useHistory } from "react-router-dom";

const Home = () => {

    const [datos, setDatos] = useState({
        usuario: '',
        categoria: '',
        dificultad: ''
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    let history = useHistory();
    
    const enviarDatos = (event) => {
        event.preventDefault();
        let user = datos.usuario
        let category = datos.categoria
        let difficult = datos.dificultad
        history.push(`/Home/Game/${user}/${category}/${difficult}`);
    }

    return (
        <Fragment>
            <main role="main" className="flex-shrink-0 mt-5">
                <audio src="audios/inicio.mp3" autoplay loop></audio>
                <div className="card bg">
                    <h1> PLAY, LEARN AND WIN!!! </h1>
                    <form onSubmit={enviarDatos}>
                        <div class="form-group">
                            <br></br>
                            <br></br>
                            <label>User👤</label>
                            <input type="text" name="usuario" class="form-control" id="usuario" placeholder="Type your name"
                                onChange={handleInputChange} required
                            />
                        </div>
                        <br></br>
                        <div class="form-group">
                            <label for="selectCategory">Category📚</label>
                            <select class="form-control" id="categoria" name="categoria" onChange={handleInputChange} required>
                                <option value="">Choose one</option>
                                <option value="15">&#127918; Video Games </option>
                                <option value="18">&#128187; Computers </option>
                                <option value="9">&#128161; General Knowledge</option>
                                <option value="32">&#128126; Cartoon and Animations </option>
                                <option value="12">&#127926; Music</option>
                            </select>
                        </div>
                        <br></br>
                        <div class="form-group">
                            <label for="selectCategory">Dificulty💪</label>
                            <select class="form-control" id="dificultad" name="dificultad" onChange={handleInputChange} required>
                                <option value="">Choose one</option>
                                <option value="easy">😀 Easy</option>
                                <option value="medium">😬 Normal</option>
                                <option value="hard">🥵 Hard</option>
                            </select>
                        </div>
                        <br></br>
                        <button type="submit" class="btn btn-success" >
                            ENTER
                        </button>
                        <br></br>
                    </form>
                    <br></br>
                    <br></br>
                    <footer>
                        <p id="foot">Developed by: <br></br>
                            &#128104;&#8205;&#128187;David Córdoba Pimienta <br></br>
                            &#128104;&#8205;&#128187;Juan Felipe Velasco García <br></br>
                            PCJIC - Programación Distribuida y Paralela - 2021</p>
                    </footer>
                </div>
            </main>
            <link href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap" rel="stylesheet"></link>
        </Fragment>
    )
};

export default Home;