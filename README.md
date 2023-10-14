# ejercicio2
Ejercicio2 prueba backend

Clonar el proyecto y ubicado en la terminal dentro del proyecto usar el comando
`npm i` -> para instalar las dependencias
`npm run dev` -> para ejecutar el proyecto

Para usar estos endpoints cambiar la ruta de los archivos por los dos archivos en el repositorio llamados `ejemplo.txt` y `ejemplo1.txt`

Para el conteo de palabras se interpreta como una palabra la cadena de texto separada por un espacio, o un salto de linea.

curl --request POST \
  --url http://localhost:4000/api/file/count-words \
  --header 'Content-Type: multipart/form-data' \
  --form 'file=...ejemplo.txt' \
  --form 'file1=...\ejemplo1.txt'

Para encontrar palabras, se busca la cantidad de veces que aparece la cedana buscada en todo el archivo y devuelve el número de repeticiones ocurridas.

curl --request POST \
  --url 'http://localhost:4000/api/file/find-word?word=a' \
  --header 'Content-Type: multipart/form-data' \
  --form 'file=...ejemplo.txt' \
  --form 'file1=...ejemplo1.txt'
