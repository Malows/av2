import { getAcciones, setAcciones, detenido } from './estado'
import { audioSeleccionarAccion, audioDeseleccionarAccion } from './sonidos'
import { pruneNode } from './helpers'

const genericAccion = accion => () => {
  if (detenido()) return undefined

  let acciones = { tomar: 0, mirar: 0, usar: 0 }
  acciones[accion] = getAcciones()[accion]

  if (acciones[accion][accion]) audioSeleccionarAccion.play()
  else audioDeseleccionarAccion.play()

  acciones[accion] = (acciones[accion] + 1) % 2
  return setAcciones(acciones)
}

export const accionTomar = genericAccion('tomar')
export const accionMirar = genericAccion('mirar')
export const accionUsar = genericAccion('usar')

export const renderBoton = (accion, seleccionado) =>
  `<input class="${accion}${seleccionado ? ' seleccionado' : ''}" type="image" src="./img/${accion}.png" />`

export const renderAcciones = () =>
  Object.entries(getAcciones())
    .map(([accion, seleccionado]) => renderBoton(accion, seleccionado))
    .join('\n')

export function refreshAcciones () {
  const divAcciones = pruneNode(document.getElementById('acciones'))
  divAcciones.insertAdjacentHTML('afterbegin', renderAcciones())
  return divAcciones
}
