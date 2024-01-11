import React, { useEffect, useState } from "react";
import Input from "./Input";

function TitleForm({onSearchTitle, searchResult}) {
  const [title, setTitle] = useState("");
  const handleChange = (e) => setTitle(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    onSearchTitle(title);
  };
  var response = ""

  if(searchResult.paraAssistir && searchResult.assistido && searchResult.paraAssistir.title === searchResult.assistido.title) {
    response = `O filme está presente em ambas as listas, por favor o remova de uma delas.`;
  }else if(searchResult.paraAssistir != null){
    response = `O filme ${searchResult.paraAssistir.title} com o id ${searchResult.paraAssistir._id} está presente e ainda não foi assistido.`;
  }else if(searchResult.assistido){
    response = `O filme ${searchResult.assistido.title} com o id ${searchResult.assistido._id} está presente e já foi assistido.`;
  }else{
    response = `O filme ${title} consultado não está presente!`;
  }

  useEffect(()=>onSearchTitle(title), [title]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
        aria-label="Pesquisa no Banco"
        onChange={handleChange}
        placeholder="Consulte um item"
        type="text"
        />
      </form>
      <h3>
        {response}
      </h3>
    </div>
  )
}

export default TitleForm;