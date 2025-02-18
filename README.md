TicTacToe

Descripción

Como propuesta como proyecto nos fue asignado realizar un TicTacToe utilizando como estructura principal un tablero de "gato". Implementando la funcionalidad de las celdas, el bot, marcador de victorias y derrotas con JavaScript. Ademas de lo ya visto tanto de HTML y CSS

Como estructura principal me base en el proyecto visto en el video https://youtu.be/AnmwHjpEhtA?si=QgXk0ldZ2MZK9qx8 utilizando un estructura similar con los debidos cambios en base al documento de requerimientos dados en el classroom.

Para el estilado principal utilice el estilado Flex y grid especificamente para la creacion de las 9 celdas para el gato. 

En la parte logica se utilizaron tanto foros, videos y codigo visto en clase. El cual permite a los usuarios jugar una partida de TicTacToe contra la maquina, en un tablero funcional que registraba las victorias, derrotas y empates en el LocalStorage en sus respectivas listas

Con este proyecto mayoritariamente entendi como poder aplicar mi propia logica para la resolucion de problemas en Js, sin embargo si note muchas dudas o falta de entendimiento que el profesor JeanCa me ayudo a resolver.

Siguiente el punto anterior, al igual del proyecto pasado cada dia asimilo mas que la programacion es a base de prueba y error.

Características

Jugar contra la maquina
Verificacion de victoria, derrota y empate.
Almacenamiento del score global en el LocalStorage
Reinicio de la partida en cualquier momento

Tecnologías utilizadas

HTML5 para la estructura.
CSS3 para el diseño y la presentación.
JavaScript para la funcionalidad.

Instalación y uso

Extraer la informacion del archivo comprimido.

Abre el archivo index.html en tu navegador.

Estructura del proyecto

/tictactoeMario/
│── index.html        # Archivo principal
│── index.css         # Estilos
│── index.js          # Funcionalidad

Funcionamiento

Tablero funcional que inicia la partida en el momento que el jugador 1 realiza el primer movimiento.

Bot que realizara un movimiento en alguna celda aleatoria que este vacia.

En el momento que un jugador realice 3 celdas seguidas de forma horizontal, vertical u diagonal el tablero realizara un verificacion segun las posiciones de cada celda, dara el ganador y terminara la ronda.

Una vez haya una victoria, derrota y empate se guardara el resultado en la tabla de puntuaciones de manera Local. 


