import { getNiveles, setNiveles } from './estado'
import { pruneNode } from './helpers'

export function agregarNuevoNivel (nivel) {
  const niveles = [ ...getNiveles().niveles, nivel ]
  setNiveles({ niveles })
}

export const renderNivel = (nivel, activo) =>
  `<div class="nivel${activo ? '--activo' : ''}" id="nivel${nivel.nombre}">
    <img src="./img/fondos/${nivel.nombre}.png" />
  </div>`

export const renderNiveles = () =>
  Object.entries(getNiveles().niveles)
    .map(x => renderNivel(x, getNiveles().nivelActual === x))
    .join('\n')

export function refreshNiveles () {
  const divNiveles = pruneNode(document.getElementById('niveles'))
  divNiveles.insertAdjacentHTML('afterbegin', renderNiveles())
  return divNiveles
}

const conseguirInfoDeNivel = (f) => (nivel = null) =>
  nivel
    ? f(getNiveles().niveles.find(x => x === nivel))
    : f(getNiveles().nivelActual)

export const conseguirCoordenadas = conseguirInfoDeNivel(_ => ({ x: _.x, y: _.y }))

export const conseguirNombre = conseguirInfoDeNivel(_ => _.nombre)

export const busquedaPorCoordenada = coord =>
  getNiveles().niveles.find(nivel => nivel.x === coord.x && nivel.y === coord.y)

export function hacerEntrable (nivel) {
  let niveles = getNiveles().niveles
  const index = niveles.findIndex(x => x === nivel)

  if (index === -1) throw Error('Nivel no encontrado en el array de niveles')

  niveles[index].entrable = true
  return setNiveles({ niveles })
}

export function cambiaNivel (direccion) {
  let coordenadas = conseguirCoordenadas()

  if (direccion === 'norte') coordenadas.y += 1
  if (direccion === 'sur') coordenadas.y -= 1
  if (direccion === 'este') coordenadas.x += 1
  if (direccion === 'oeste') coordenadas.x -= 1

  const nivelActual = busquedaPorCoordenada(coordenadas)
  return setNiveles({ nivelActual })
}
