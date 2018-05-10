// Generadores de fichas de invetario
import { getInventario, setInventario, detenido } from './estado'

export function agregarObjeto (objeto) {
    if (detenido()) return undefined;

    const { objetos } = getobjetos()
    objetos.push(objeto)
    return setobjetos({ objetos })
}

export function seleccionarObjeto (objeto) {
    if (detenido()) return undefined;

    let { objetoSeleccionado } = getInventario()
    objetoSeleccionado = objeto
    asf.play()
    return setInventario({ objetoSeleccionado })
}

export function quitarObjeto (objeto) {
    if (detenido()) return undefined;

    let { objetos, objetoSeleccionado } = getInventario()
    if (objeto === objetoSeleccionado) objetoSeleccionado = null
    objetos = objetos.filter(x => x !== objeto)
    return setInventario({ objetos, objetoSeleccionado })
}

export const renderObjeto = (objeto, seleccionado) =>
    `<input type="image" class="objeto${seleccionado ? ' seleccionado' : ''}" id="${objeto.nombre}" src="./img/obj/${objeto.nombre}.png" />`

export const renderInventario = () => {
    const { objetos, objetoSeleccionado } = getInventario()
    return objetos.map(x => renderObjeto(x, x === objetoSeleccionado)).join('\n')
}

export function refreshInventario () {
    const divInventario = pruneNode(document.getElementById('inventario'))
    divInventario.insertAdjacentHTML('afterbegin', renderInventario())
}


const pruneNode = node => {
    node.innerHTML = ''
    while (node.hasChildNodes()) node.removeChild(node.firstChild)
    return node
}
