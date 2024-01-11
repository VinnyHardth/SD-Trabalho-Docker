#!/bin/sh

echo "Esperando o MongoDB iniciar..."
./wait-for db-paraAssistir:27017 
./wait-for db-assistidos:27018 


echo "Iniciando o servidor..."
npm start 