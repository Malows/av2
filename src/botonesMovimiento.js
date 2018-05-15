import { getMovilidad, setMovilidad, detenido } from './estado'
import { pruneNode, capitalize } from './helpers'

const NO_DIBUJAR = 0
const ACCESIBLE = 1
const NO_ACCESIBLE = 2

function genericMoverse (direccion) {
  if (detenido()) return undefined
}

export const moverseNorte = genericMoverse('norte')

function evaluarNivel (nivel) {
  if (!nivel) return NO_DIBUJAR
  return nivel.hasOwnProperty('entrable') && nivel.entrable === 'entrable'
    ? ACCESIBLE
    : NO_ACCESIBLE
}

export function botonesNavegacion ({ x, y }) {
  const { norte, sur, este, oeste } = testeadorMovilidad(x, y)
  const Orientacion = {}

  if (oeste !== getMovilidad().oeste) { Orientacion.oeste = getMovilidad.Oeste = oeste }

  if (este !== getMovilidad().este) { Orientacion.este = getMovilidad.Este = este }

  if (sur !== getMovilidad().sur) { Orientacion.sur = getMovilidad.Sur = sur }

  if (norte !== getMovilidad().norte) { Orientacion.norte = getMovilidad.Norte = norte }

  setMovilidad(Orientacion)
}

function testeadorMovilidad ({ x, y, nivelArray }) {
  const oeste = nivelArray.find(nivel => nivel.x === x - 1 && nivel.y === y)
  const este = nivelArray.find(nivel => nivel.x === x - 1 && nivel.y === y)
  const norte = nivelArray.find(nivel => nivel.x === x && nivel.y === y + 1)
  const sur = nivelArray.find(nivel => nivel.x === x && nivel.y === y - 1)

  return {
    oeste: evaluarNivel(oeste),
    este: evaluarNivel(este),
    sur: evaluarNivel(sur),
    norte: evaluarNivel(norte)
  }
}

function renderBotonMovilidad (orientacion, estado) {
  if (estado === NO_DIBUJAR) return ''

  const capi = capitalize(orientacion)
  const mod = estado === ACCESIBLE ? '' : '--inactiva'
  const clase = `navegacion${mod} navegacion__${orientacion}`

  const id = `id="boton${capi}"`
  const src = `src="./img/${orientacion}.png"`

  return estado === NO_ACCESIBLE
    ? `<img ${id} ${clase} ${src} />`
    : `<input ${id} ${clase} ${src} type="image"/>`
}

export const renderMovilidad = () =>
  Object.entries(getMovilidad())
    .map(x => renderBotonMovilidad(...x))
    .join('\n')

export function refreshMovimientos () {
  const divMovilidad = pruneNode(document.getElementById('movilidad'))
  divMovilidad.insertAdjacentHTML('afterbegin', renderMovilidad())
}
