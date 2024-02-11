function saveNames() {
    var name1 = document.getElementById("name1").value;
    var name2 = document.getElementById("name2").value;
    var name3 = document.getElementById("name3").value;
    var name4 = document.getElementById("name4").value;
    var TipoDeCarton = document.getElementById("TipoDeCarton").value;
    console.log(name1,name2,name3,name4);
    console.log(TipoDeCarton);
    // Genera un número aleatorio entre 1 y 50
    function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 50) + 1;
    }

    // Genera un arreglo de NxN con números aleatorios entre 1 y 50
    function generarArregloAleatorio(n) {
    // Genera un arreglo vacío de NxN
    var arreglo = new Array(n);
    for (var i = 0; i < n; i++) {
        arreglo[i] = new Array(n);
    }

    // Genera los números aleatorios y los agrega al arreglo
    var numeros = [];
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
        var numero;
        do {
            numero = generarNumeroAleatorio();
        } while (numeros.includes(numero));
        arreglo[i][j] = numero;
        numeros.push(numero);
        }
    }

    return arreglo;
    }

    // Genera una matriz cuadrada (NxN) aleatoria
    var matriz = generarArregloAleatorio(TipoDeCarton);
    console.log(matriz);

    // Visualiza la matriz en pantalla
    function visualizarMatriz(matriz) {
    var n = matriz.length;
    var tabla = document.createElement('table');
    tabla.className = 'matriz';

    for (var i = 0; i < n; i++) {
        var fila = document.createElement('tr');
        for (var j = 0; j < n; j++) {
        var celda = document.createElement('td');
        celda.textContent = matriz[i][j];
        celda.dataset.row = i;
        celda.dataset.col = j;
        celda.addEventListener("click", seleccionarNumero);
        fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }

    document.body.appendChild(tabla);
    }
    visualizarMatriz(matriz);

    // Declara la variable global "tienePuntoDiagonal"
    var tienePuntoDiagonalP = false;
    var tienePuntoDiagonalS = false;

    // Función para seleccionar un número de la matriz
    function seleccionarNumero(event) {
        var row = event.target.dataset.row;
        var col = event.target.dataset.col;
        var celda = event.target;

        if (!celda.classList.contains("strickout")) {
            celda.classList.add("strickout");
            var filaCompleta = true;
            for (var j = 0; j < TipoDeCarton; j++) {
            if (!document.querySelector(`[data-row="${row}"][data-col="${j}"]`).classList.contains("strickout")) {
                filaCompleta = false;
                break;
            }
            }
            if (filaCompleta) {
            console.log("Tienes un punto en la fila " + (parseInt(row) + 1));
            }

            var colCompleta = true;
            for (var i = 0; i < TipoDeCarton; i++) {
            if (!document.querySelector(`[data-row="${i}"][data-col="${col}"]`).classList.contains("strickout")) {
                colCompleta = false;
                break;
            }
            }
            if (colCompleta) {
            console.log("Tienes un punto en la columna " + (parseInt(col) + 1));
            }

            var diagonalPrincipalCompleta = true;
            for (var i = 0; i < TipoDeCarton; i++) {
            if (!document.querySelector(`[data-row="${i}"][data-col="${i}"]`).classList.contains("strickout")) {
                diagonalPrincipalCompleta = false;
                break;
            }
            }
            if (diagonalPrincipalCompleta && !tienePuntoDiagonalP) {
            console.log("Tienes un punto en la diagonal principal");
            tienePuntoDiagonalP = true;
            }

            var diagonalSecundariaCompleta = true;
            for (var i = 0; i < TipoDeCarton; i++) {
            if (!document.querySelector(`[data-row="${i}"][data-col="${TipoDeCarton - i - 1}"]`).classList.contains("strickout")) {
                diagonalSecundariaCompleta = false;
                break;
            }
            }
            if (diagonalSecundariaCompleta && !tienePuntoDiagonalS) {
            console.log("Tienes un punto en la diagonal secundaria");
            tienePuntoDiagonalS = true;
            }
        }

    }
}