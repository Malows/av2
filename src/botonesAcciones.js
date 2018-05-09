export function actualizarAcciones (tomar, mirar, usar) {
  document.querySelector('.tomar').src = `./img/tomar${tomer ? 'p' : ''}.png`
  document.querySelector('.mirar').src = `./img/mirar${mirar ? 'p' : ''}.png`
  document.querySelector('.usar').src = `./img/usar${usar ? 'p' : ''}.png`
}

// ///////// elbotondetomar{}  //////////////////
function crearBoton (accion) {
  if (!['tomar', 'mirar', 'usar'].includes(accion)) { throw Error('Acción no valida. Las acciones pueden ser "tomar", "mirar", "usar".') }

  const funcion = accion + accion + '()'
  return function () {
    return `<input class="${accion}" type="image" src="./img/${accion}.png" onclick="${funcion}" />`
  }
}

export const crearBotonTomar = crearBoton('tomar')

export const crearBotonMirar = crearBoton('mirar')

export const crearBotonUsar = crearBoton('usar')

export function tomartomar () {
  if (detener == 0 && usaro1 == null) {
    mirar = 0
    usar = 0
    if (tomar == 0) {
      tomar = 1
      ssel.play()
    } else if (tomar == 1) {
      tomar = 0
      sunsel.play()
    }
    actualizarAcciones(tomar, mirar, usar)
  }
}

// ////////// elbotondemirar(){} ////////////////////

export function mirarmirar () {
  if (detener === 0 && usaro1 === null) {
    tomar = 0
    usar = 0
    if (mirar == 0) {
      mirar = 1
      ssel.play()
    } else if (mirar == 1) {
      mirar = 0
      sunsel.play()
    }
    actualizarAcciones(tomar, mirar, usar)
  }
}

// ////////// elbotondeusar(){} ////////////////////

export function usarusar () {
  if (detener == 0 && usaro1 == null) {
    mirar = 0
    tomar = 0
    if (usar == 0) {
      usar = 1
      ssel.play()
    } else if (usar == 1) {
      usar = 0
      sunsel.play()
    }
    actualizarAcciones(tomar, mirar, usar)
  }
}
