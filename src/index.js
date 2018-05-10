import '../scss/style.scss'

// Definiendo el div principal

const divPrincipal = document.getElementById('principal')

// Declarando botones

let seleccion = 0
objetoi.count = 0

// / seleccionados para usar

let usaro1 = null
let usaro2 = null

// / Freno de acciones

let detener = 0

// Declarando musica

// ///// creando niveles /////////////////////////

let nivelArray = []
let contadorNiveles = 0

function nivelNuevo (nombre, x, y, entrable) {
  contadorNiveles++
  nivelArray.push({ nombre, x, y, entrable })

  const nuevoNivel = `
    <div class="nivel" id="nivel${nombre}" style="display: none">
        <img src="./img/fondos/${nombre}.png" />
    </div>`

  divPrincipal.insertAdjacentHTML('afterbegin', nuevoNivel)
}

function nivelIncial (nombre) {
  let nivel = document.getElementById('nivel' + nombre)
  nivel.style.visibility = 'visible'

  nivelActual = nombre

  let { x, y } = conseguirCoordenadas(nombre)

  botonesNavegacion(x, y)
}

function conseguirCoordenadas (nombre) {
  const nivelBuscado = nivelArray.find(nivel => nivel.nombre === nombre)
  if (nivelBuscado) {
    return { x: nivelBuscado.x, y: nivelBuscado.y }
  }
  throw Error('Nivel no encontrado en el array de niveles', nombre)
}

function conseguirNombre (x, y) {
  const nivelBuscado = nivelArray.find(nivel => nivel.x === x && nivel.y === y)
  if (nivelBuscado) return nivelBuscado.nombre

  throw Error('Nivel no encontrado en el array de niveles')
}

function hacerEntrable (nombre) {
  const index = nivelArray.findIndex(nivel => nivel.nombre === nombre)
  if (index === -1) throw Error('Nivel no encontrado en el array de niveles')

  nivelArray[index].entrable = 'entrable'

  let coordenadas = conseguirCoordenadas(nivelActual)
  botonesNavegacion(coordenadas.x, coordenadas.y)
}

// ///////// cambia nivel{}  //////////////////

let nivelActual = null

let movilidad = { norte: 0, sur: 0, este: false, oeste: false }

let estadoBotonNorte = 0
let estadoBotonSur = 0
let estadoBotonEste = false
let estadoBotonOeste = false

function cambiaNivel (direccion) {
  let partida = document.getElementById('nivel' + nivelActual)
  partida.style.visibility = 'hidden'

  let coordenadasPartida = conseguirCoordenadas(nivelActual)

  let xLlegada
  let yLlegada

  if (direccion === 'norte') {
    xLlegada = coordenadasPartida.x
    yLlegada = coordenadasPartida.y + 1
  }

  if (direccion === 'sur') {
    xLlegada = coordenadasPartida.x
    yLlegada = coordenadasPartida.y - 1
  }

  if (direccion === 'este') {
    xLlegada = coordenadasPartida.x + 1
    yLlegada = coordenadasPartida.y
  }

  if (direccion === 'oeste') {
    xLlegada = coordenadasPartida.x - 1
    yLlegada = coordenadasPartida.y
  }

  let nombreLlegada = conseguirNombre(xLlegada, yLlegada)

  let llegada = document.getElementById('nivel' + nombreLlegada)
  llegada.style.visibility = 'visible'

  nivelActual = nombreLlegada
  botonesNavegacion(xLlegada, yLlegada)
}
// /////// Declarando inventario//////////////

let inventa = []

// Generadores de objetos

function objeto (nombre, juntable, lugar) {
  const boton = `<input type="image" id="${nombre}" src="./img/obj/${nombre}.png" class="objeto${nombre}" onclick="accion('${nombre}', '${juntable}')" />`
  let nivel = document.getElementById('nivel' + lugar)
  nivel.insertAdjacentHTML('afterbegin', boton)
}

function objetoFondo (nombre, lugar) {
  const objeto = `<img src="./img/obj/${nombre}.png" class="objeto${nombre}" />`
  const nivel = document.getElementById('nivel' + lugar)
  nivel.insertAdjacentHTML('afterbegin', objeto)
}

function accion (nombre, juntable) {
  if (detener) return undefined

  if (estado.acciones.tomar) {
    if (juntable === 'tomable') {
      eliminarNodo(nombre)
      audio.play()
      let tomado = new objetoi(nombre)
    } else {
      cuadromirar('notomar')
    }
    estado.acciones.tomar = 0
  }

  if (estado.acciones.mirar) {
    estado.acciones.mirar = 0
    cuadromirar(nombre)
  }

  if (estado.acciones.usar) {
    usaro2 = nombre
    accionUsar()
  }

  actualizarAcciones(tomar, mirar, usar)
}

function accionUsar () {
  let parte1 = usaro1 || ''

  if (usaro1 !== null) selecFicha()

  let parte2 = usaro2

  let combinacion = parte1 + parte2

  funcionesUsar(combinacion)

  usaro1 = null
  usaro2 = null

  usar = 0
}

const crearCuadro = (nombre, innerText = null) => `
  <div class="textines" id="m${nombre}" onclick="sacarcuadro('m${nombre}')">
    <p class="letras">${innerText || 'no se que queres que haga'}</p>
  </div>`

function cuadromirar (nombre) {
  detener = 1
  sabrir.play()
  const cuadrin = crearCuadro(nombre, nombre)
  divPrincipal.insertAdjacentHTML('afterbegin', cuadrin)
}

function cuadrousar (nombre) {
  detener = 1
  const cuadrin = crearCuadro(nombre)
  divPrincipal.insertAdjacentHTML('afterbegin', cuadrin)
}

function sacarcuadro (nombre) {
  eliminarNodo(nombre)
  scerrar.play()
  detener = 0
}

function eliminarNodo (id) {
  const elem = document.getElementById(id)
  elem.parentNode.removeChild(elem)
}
