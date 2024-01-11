import React, { useState, useEffect } from "react";
import MovieForm from "./MovieForm";
import TitleForm from "./TitleForm";
import MovieList from "./MovieList"
import api from "../services/api";
import "./App.css";

function App() {
  const paraAssistirEndpoint = "/paraAssistir";
  const assistidosEndpoint = "/assistidos";
  const compareEndpoint = "/compare";
  const [searchResult, setSearchResult] = useState("");
  const [paraAssistir, setParaAssistir] = useState([]);
  const [assistidos, setAssistidos] = useState([]);
  const [error, setError] = useState();

  const fetchParaAssistir = async () => {
    try {
      const { data } = await api.get(paraAssistirEndpoint);
      setParaAssistir(data);
    } catch (error) {
      setError("Não foi possível buscar os filmes não assistidos!");
    }
  };
  const fetchAssistidos = async () => {
    try {
      const { data } = await api.get(assistidosEndpoint);
      setAssistidos(data);
    } catch (error) {
      setError("Não foi possível buscar filmes assistidos!");
    }
  };

  const handleAddAlimento = async (title) => {
    try {
      const alimento = { _id: Date.now(), title };
      setParaAssistir([...paraAssistir, alimento]);

      const { data: savedAlimento } = await api.create(paraAssistirEndpoint, alimento);

      setParaAssistir([...paraAssistir, savedAlimento]);
    } catch (error) {
      setError("Não foi possível salvar o filme para assistir!");
      setParaAssistir(paraAssistir);
    }
  };

  const titleSearch = async (title) => {
    if (title === ""){
      setSearchResult({
        alimento: null,
        assistido: null
      });
      return;
    }
    try {
      const { data } = await api.get(compareEndpoint+"/"+title);
      setSearchResult(data);
    } catch (error) {
      console.log("Não foi possível buscar os filmes!");
    }
  };

  const handleAddAssistido = async (title) => {
    try {
      const assistido = { _id: Date.now(), title };
      setAssistidos([...assistidos, assistido]);

      const { data: savedAssistido } = await api.create(assistidosEndpoint, assistido);

      setAssistidos([...assistidos, savedAssistido]);
    } catch (error) {
      setError("Não foi possível salvar o filme assistido!");
      setAssistidos(assistidos);
    }
  };

  const handleDeleteAlimento = async (alimento) => {
    try {
      setParaAssistir(paraAssistir.filter((m) => m !== alimento));
      await api.remove(paraAssistirEndpoint + "/" + alimento._id);
    } catch (error) {
      setError("Não foi possível excluir o filme para assistir!");
      setParaAssistir(paraAssistir);
    }
  };

  const handleDeleteAssistido = async (assistido) => {
    try {
      setAssistidos(assistidos.filter((s) => s !== assistido));
      await api.remove(assistidosEndpoint + "/" + assistido._id);
    } catch (error) {
      setError("Não foi possível excluir o filme assistido!");
      setAssistidos(assistidos);
    }
  };

  useEffect(() => {
    fetchParaAssistir();
    fetchAssistidos();
  }, []);

  return (
    <div className="App">
      <div className="paraAssistirContainer">
        <h1>Filmes para assistir</h1>
        <MovieForm onAddMovie={handleAddAlimento} placeholder="adicione um filme para assistir" />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
        <MovieList movies={paraAssistir} onDeleteMovie={handleDeleteAlimento} type="AlimentoItem" />
      </div>
      <div className="assistidosContainer">
        <h1>Filmes assistidos</h1>
        <MovieForm onAddMovie={handleAddAssistido} placeholder="adicione um filme que já assistiu" />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
        <MovieList movies={assistidos} onDeleteMovie={handleDeleteAssistido} type="AssistidoItem"/>
      </div>
      <div className="compareContainer">
        <h1>Procure um filme:</h1>
        <TitleForm onSearchTitle={titleSearch} searchResult={searchResult} />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
