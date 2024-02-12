function saveNames() {
    document.getElementById("botonjugador").disabled = false
    document.getElementById("botonjugador2").disabled = false
    document.getElementById("botonjugador3").disabled = false
    document.getElementById("botonjugador4").disabled = false
    document.getElementById("generar").style.display = "block"
    document.getElementById("numero").style.display = "block"
    document.getElementById("turno").style.display = "block"
    var name1 = document.getElementById("name1").value;
    var name2 = document.getElementById("name2").value;
    var name3 = document.getElementById("name3").value;
    var name4 = document.getElementById("name4").value;
    document.getElementById("botonjugador").innerHTML = name1
    document.getElementById("botonjugador2").innerHTML = name2
    document.getElementById("botonjugador3").innerHTML = name3
    document.getElementById("botonjugador4").innerHTML = name4

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
    var matriz2 = generarArregloAleatorio(TipoDeCarton);
    var matriz3 = generarArregloAleatorio(TipoDeCarton);
    var matriz4 = generarArregloAleatorio(TipoDeCarton);
    
    console.log(matriz);
    
    function visualizarMatriz(matriz, id) {
        var n = matriz.length;
        var tabla = document.createElement('table');
        tabla.setAttribute("id", id);
        tabla.className = 'matriz';
    
        for (var i = 0; i < n; i++) {
            var fila = document.createElement('tr');
            for (var j = 0; j < n; j++) {
            var celda = document.createElement('td');
            celda.textContent = matriz[i][j];
            celda.dataset.row = i;
            celda.dataset.col = j;
            celda.addEventListener("click", function(event) {
                seleccionarNumero(event, id);
            });
            fila.appendChild(celda);
            }
            tabla.appendChild(fila);
        }
    
        document.body.appendChild(tabla);
    }
    visualizarMatriz(matriz,"matriz1");
    visualizarMatriz(matriz2,"matriz2");
    visualizarMatriz(matriz3,"matriz3");
    visualizarMatriz(matriz4,"matriz4");
    mostrarMatriz1();

    function verificarCompletado(tabla, id) {
        var n = tabla.rows.length;
        var puntos = 0;
    
        // Verificar filas
        for (var i = 0; i < n; i++) {
            var filaCompleta = true;
            for (var j = 0; j < n; j++) {
                var celda = tabla.rows[i].cells[j];
                if (!celda.classList.contains("strickout")) {
                    filaCompleta = false;
                    break;
                }
            }
            if (filaCompleta) {
                console.log("Ganaste un punto en la fila " + (i + 1) + " de la tabla " + id);
                puntos += 1;
            }
        }
    
        // Verificar columnas
        for (var j = 0; j < n; j++) {
            var columnaCompleta = true;
            for (var i = 0; i < n; i++) {
                var celda = tabla.rows[i].cells[j];
                if (!celda.classList.contains("strickout")) {
                    columnaCompleta = false;
                    break;
                }
            }
            if (columnaCompleta) {
                console.log("Ganaste un punto en la columna " + (j + 1) + " de la tabla " + id);
                puntos += 1;
            }
        }
    
        // Verificar diagonales principales
        var diagonal1Completa = true;
        for (var i = 0; i < n; i++) {
            var celda = tabla.rows[i].cells[i];
            if (!celda.classList.contains("strickout")) {
                diagonal1Completa = false;
                break;
            }
        }
        if (diagonal1Completa) {
            console.log("Ganaste tres puntos en la diagonal principal de la tabla " + id);
            puntos += 3;
        }
    
        // Verificar diagonales secundarias
        var diagonal2Completa = true;
        for (var i = 0; i < n; i++) {
            var celda = tabla.rows[i].cells[n - 1 - i];
            if (!celda.classList.contains("strickout")) {
                diagonal2Completa = false;
                break;
            }
        }
        if (diagonal2Completa) {
            console.log("Ganaste tres puntos en la diagonal secundaria de la tabla " + id);
            puntos += 3;
        }
    
        // Verificar si se han completado todas las casillas
        var todasCompletas = true;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                var celda = tabla.rows[i].cells[j];
                if (!celda.classList.contains("strickout")) {
                    todasCompletas = false;
                    break;
                }
            }
        }
        if (todasCompletas) {
            console.log("Ganaste cinco puntos por completar todas las casillas de la tabla " + id);
            puntos += 5;
        }
    
        return puntos;
    }
    // Función seleccionar número
    function seleccionarNumero(event) {
        var celda = event.target;
        var id = celda.parentNode.parentNode.id;
        if (!celda.classList.contains("strickout")) {
            celda.classList.add("strickout");
            var tabla = document.getElementById(id);
            var puntos = verificarCompletado(tabla, id);
            console.log("Puntos totales en la tabla " + id + ": " + puntos);
        }
    }
    
    const boton = document.getElementById('generar');
    const numero = document.getElementById('numero');
    const turno = document.getElementById('turno')

    let numerosGenerados = [];
    boton.addEventListener('click', () => {
        if (numerosGenerados.length < 25) {
            let numAleatorio = generarNumeroAleatorioBingo();
            numerosGenerados.push(numAleatorio);
            numero.textContent = numAleatorio;
            turno.textContent = " turno" + numerosGenerados.length
        } else {
            
            alert('ya se acabo el juego');
        }
    
    });

    function generarNumeroAleatorioBingo() {
        let numAleatorio = Math.floor(Math.random() * 50) + 1;
        while (numerosGenerados.includes(numAleatorio)) {
            numAleatorio = Math.floor(Math.random() * 50) + 1;
        }
        return numAleatorio;
    }
}
function mostrarMatriz1(){
    document.getElementById("matriz1").style.display = "table"
    document.getElementById("matriz2").style.display = "none"
    document.getElementById("matriz3").style.display = "none"
    document.getElementById("matriz4").style.display = "none"
    document.getElementById("botonjugador").disabled = true
    document.getElementById("botonjugador2").disabled = false
    document.getElementById("botonjugador3").disabled = false
    document.getElementById("botonjugador4").disabled = false
}
function mostrarMatriz2(){
    document.getElementById("matriz1").style.display = "none"
    document.getElementById("matriz2").style.display = "table"
    document.getElementById("matriz3").style.display = "none"
    document.getElementById("matriz4").style.display = "none"
    document.getElementById("botonjugador").disabled = false
    document.getElementById("botonjugador2").disabled = true
    document.getElementById("botonjugador3").disabled = false
    document.getElementById("botonjugador4").disabled = false
}
function mostrarMatriz3(){
    document.getElementById("matriz1").style.display = "none"
    document.getElementById("matriz2").style.display = "none"
    document.getElementById("matriz3").style.display = "table"
    document.getElementById("matriz4").style.display = "none"
    document.getElementById("botonjugador").disabled = false
    document.getElementById("botonjugador2").disabled = false
    document.getElementById("botonjugador3").disabled = true
    document.getElementById("botonjugador4").disabled = false
}
function mostrarMatriz4(){
    document.getElementById("matriz1").style.display = "none"
    document.getElementById("matriz2").style.display = "none"
    document.getElementById("matriz3").style.display = "none"
    document.getElementById("matriz4").style.display = "table"
    document.getElementById("botonjugador").disabled = false
    document.getElementById("botonjugador2").disabled = false
    document.getElementById("botonjugador3").disabled = false
    document.getElementById("botonjugador4").disabled = true
}
