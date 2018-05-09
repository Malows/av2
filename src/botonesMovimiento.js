// codificación del estado del cuarto

const NO_DIBUJAR = 0
const ACCESIBLE = 1
const NO_ACCESIBLE = 2

function evaluarNivel (nivel) {
  if (!nivel) return NO_DIBUJAR
  return nivel.hasOwnProperty('entrable') && nivel.entrable === 'entrable'
    ? ACCESIBLE
    : NO_ACCESIBLE
}

function crearBotonNavegacion (orientacion, estado) {
  if (estado === NO_DIBUJAR) return ''

  const mini = orientacion.toLowerCase()
  const capi = orientacion[0].toUpperCase() + mini.substring(1)

  const mod = estado === ACCESIBLE ? '' : '--inactiva'
  const clase = `navegacion${mod} navegacion__${mini}`

  const id = `id="boton${capi}"`
  const src = `src="./img/${mini}.png"`

  return estado === NO_ACCESIBLE
    ? `<img ${id} ${clase} ${src} />`
    : `<input ${id} ${clase} ${src} type="image" onclick="cambiaNivel('${mini}')"/>`
}

export function renderBotonesNavegacion (orientaciones) {
  // orientaciones es un objeto que puede tener pares claves-valor
  // las claves deben ser una cardinalidad
  // y el valor debe ser si el boton es accesible o no
  // en el caso de faltar un par clave-valor, no se dibuja el boton
  const btns = Object.entries(orientaciones)
    .map(x => crearBotonNavegacion(...x))
    .join('')
  document.getElementById('botonesNavegacion').innerHTML = btns
}

export function botonesNavegacion ({ x, y }) {
  const { norte, sur, este, oeste } = testeadorMovilidad(x, y)
  const Orientacion = {}

  if (oeste !== estadoBotonOeste) { Orientacion.oeste = estadoBotonOeste = oeste }

  if (este !== estadoBotonEste) { Orientacion.este = estadoBotonEste = este }

  if (sur !== estadoBotonSur) { Orientacion.sur = estadoBotonSur = sur }

  if (norte !== estadoBotonNorte) { Orientacion.norte = estadoBotonNorte = norte }

  renderBotonesNavegacion(Orientacion)
}

function testeadorMovilidad ({ x, y, nivelArray }) {
  const oeste = nivelArray.find(nivel => nivel.x === x - 1 && nivel.y === y)
  const este = nivelArray.findIndex(nivel => nivel.x === x - 1 && nivel.y === y)
  const norte = nivelArray.findIndex(nivel => nivel.x === x && nivel.y === y + 1)
  const sur = nivelArray.findIndex(nivel => nivel.x === x && nivel.y === y - 1)

  return {
    oeste: evaluarNivel(oeste),
    este: evaluarNivel(este),
    sur: evaluarNivel(sur),
    norte: evaluarNivel(norte)
  }
}
