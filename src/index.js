import '../scss/style.scss'

// Definiendo el div principal

const divPrincipal = document.getElementById('principal')

// Declarando botones

let tomar = 0
let mirar = 0
let usar = 0
let seleccion = 0
objetoi.count = 0

// / seleccionados para usar

let usaro1 = null
let usaro2 = null

// / Freno de acciones

let detener = 0

// Declarando musica

const audio = document.getElementById('sonidoTuru')
const sabrir = document.getElementById('sonidoAbrirCuadro')
const scerrar = document.getElementById('sonidoCerrarCuadro')
const ssel = document.getElementById('sonidoSel')
const sunsel = document.getElementById('sonidoUnsel')
const cnvl = document.getElementById('sonidoNivel')
const asf = document.getElementById('sonidoSeleFicha')

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

  if (direccion == 'norte') {
    xLlegada = coordenadasPartida.x
    yLlegada = coordenadasPartida.y + 1
  }

  if (direccion == 'sur') {
    xLlegada = coordenadasPartida.x
    yLlegada = coordenadasPartida.y - 1
  }

  if (direccion == 'este') {
    xLlegada = coordenadasPartida.x + 1
    yLlegada = coordenadasPartida.y
  }

  if (direccion == 'oeste') {
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

  if (tomar) {
    if (juntable == 'tomable') {
      let boton = document.getElementById(nombre)
      let lugar = boton.parentNode
      lugar.removeChild(boton)
      audio.play()
      let tomado = new objetoi(nombre)
    } else {
      cuadromirar('notomar')
    }
    tomar = 0
  }

  if (mirar) {
    mirar = 0
    cuadromirar(nombre)
  }

  if (usar) {
    usaro2 = nombre
    accionUsar()
  }

  actualizarAcciones(tomar, mirar, usar)
}

function accionUsar () {
  let parte1 = usaro1 || ''

  if (usaro1 != null) {
    selecFicha()
  }

  let parte2 = usaro2

  let combinacion = parte1 + parte2

  funcionesUsar(combinacion)

  usaro1 = null
  usaro2 = null

  usar = 0
}

function cuadromirar (nombre) {
  detener = 1
  sabrir.play()

  const cuadrin = `
  <div class="textines" id="m${nombre}" onclick="sacarcuadro('m${nombre}')">
    <p class="letras">${nombre}</p>
  </div>`

  divPrincipal.insertAdjacentHTML('afterbegin', cuadrin)
}

function cuadrousar (nombre) {
  detener = 1

  const cuadrin = document.createElement('div')
  cuadrin.className = 'textines'
  cuadrin.setAttribute('id', 'u' + nombre)

  const texto1 = document.createElement('p')
  texto1.textContent = 'no se que queres que haga'
  texto1.className = 'letras'

  divPrincipal.appendChild(cuadrin)
  cuadrin.appendChild(texto1)

  const sacardir = "sacarcuadro('u" + nombre + "')"
  cuadrin.setAttribute('onclick', sacardir)
}

function sacarcuadro (nombre) {
  const cuadro = document.getElementById(nombre)
  divPrincipal.removeChild(cuadro)
  scerrar.play()
  detener = 0
}

// Generadores de fichas de invetario

function objetoi (nombre) {
  objetoi.count++
  inventa[objetoi.count] = nombre
  const boton = `<input type="image" id="${nombre}" onclick="accionficha('${nombre}')" src="./img/obj/${nombre}-o.png" class="objeto${objetoi.count}o" />`
  divPrincipal.insertAdjacentHTML('afterbegin', boton)
}

function accionficha (nombre) {
  if (detener) return undefined

  if (usar) {
    if (usaro1 == null) {
      const index = inventa.findIndex(objInventario => objInventario === nombre)
      if (index !== -1) {
        selecFicha(nombre, index)
      }
    } else {
      usaro2 = nombre
      accionUsar()
    }
  }

  if (mirar) {
    mirar = 0
    cuadromirar(nombre)
  }
  actualizarAcciones(tomar, mirar, usar)
}

function selecFicha (nombre, indice) {
  console.log('entro en seleccion');
  if (!seleccion) {
    console.log('es 0');
    console.log(inventa);
    seleccion = 1
    const imgsele = `<input type="image" src="./img/fichasel.png" id="pepito" class="objeto${indice}o always-on-top" />`
    console.log(imgsele);
    divPrincipal.insertAdjacentHTML('afterbegin', imgsele)

    usaro1 = nombre
    asf.play()
  } else {
    console.log('es 1');
    seleccion = 0
    const botone = document.getElementById('pepito')
    divPrincipal.removeChild(botone)
  }
}

function eliminar (nombre) {
  const botone = document.getElementById(nombre)
  divPrincipal.removeChild(botone)

  const index = inventa.findIndex(obj => obj === nombre)
  if (index === -1) return undefined

  inventa[index] = null
  objetoi.count--
  inventario()
}

function eliminarDelNivel (nombre) {
  let hijo = document.getElementById(nombre)
  let padre = hijo.parentNode
  padre.removeChild(hijo)
}

// ordenador de inventario

function inventario () {
  let a = 1
  let test
  let test2
  let elqsigue

  for (var indice = 0; indice < inventa.length; indice++) {
    if (inventa[indice]) continue
    let siguienteIndice = indice + 1
    let siguienteElemento = inventa[indice + 1]
    if (siguienteElemento) {
      document.getElementById(siguienteElemento).className = `objeto${indice}o`
      inventa[siguienteIndice] = null
      inventa[indice] = siguienteElemento
    }
  }
}
