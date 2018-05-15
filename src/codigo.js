import { getNiveles, setNiveles, setInventario, getInventario, setDialogo } from './estado'
import Nivel from './models/Nivel'
// import Objeto from './models/Objeto'

export function descripcion (nombre) {
  if (nombre === 'a') { return 'Esto es una letra A de color verde' }
  if (nombre === 'b') { return 'Esto es una letra B de color amarillo' }
  if (nombre === 'c') { return 'Esto es una letra C de color azul' }
  if (nombre === 'd') { return 'Esto es una letra D de color rojo' }
  if (nombre === 'e') { return 'Esto es una letra E de color celeste' }
  if (nombre === 'f') { return 'Esto es una letra F de color naranja' }
  if (nombre === 'g') { return 'Esto es una letra G de color rosa' }
  if (nombre === 'h') { return 'Esto es una letra H de color violeta' }
  if (nombre === 'llave') { return 'Esto es una llave mal dibujada' }
  if (nombre === 'cofre') { return 'Un cofre sucio cerrado' }
  if (nombre === 'puerta') { return 'Una puerta cerrada' }

  if (nombre === 'ab') { return 'La mezcla magica' }
  if (nombre === 'nadausar') { return 'No te entiendo' }
  if (nombre === 'cofreu') { return 'cofre abierto, tiene una llave' }
  if (nombre === 'puertaa') { return 'Puerta abierta' }

  if (nombre === 'notomar') { return 'No puedo agarrar eso' }
}

// ------ Funciones de Usar ------------

export function funcionesUsar (codigo) {
  switch (codigo) {
    case 'ab':
      return setDialogo('ab')

    case 'puerta':
      return setDialogo('puerta')

    case 'cofre':
      // eliminarDelNivel(codigo)
      // objetoFondo('cofrea', 'pieza')
      return setDialogo('cofre')

    case 'llavepuerta':
      // eliminarDelNivel('puerta')
      // objetoFondo('puertaa', 'entrada')
      setInventario({
        objetos: getInventario().objetos.filter(x => x.name !== 'llave'),
        objetoSeleccionado: undefined
      })
      const niveles = getNiveles().niveles
      const index = niveles.findIndex(x => x.name === 'entrada')
      // esto puede ser una referencia al nivel en el objeto
      niveles[index].makeEntrable()
      setNiveles({ niveles })
      return setDialogo('puerta abierta')

    default:
      return setDialogo('nada usar')
  }
}

const ENTRABLE = true
const NO_ENTRABLE = false

let niveles = [
  [ 'pieza', 2, 2, ENTRABLE ],
  [ 'entrada', 2, 1, ENTRABLE ],
  [ 'relleno1', 1, 2, ENTRABLE ],
  [ 'relleno2', 3, 2, ENTRABLE ],
  [ 'relleno3', 2, 3, ENTRABLE ],
  [ 'fin', 2, 0, NO_ENTRABLE ]
]
niveles = niveles.map(x => new Nivel(...x))
const nivelActivo = niveles.find(x => x.name === 'pieza')

setNiveles({ niveles, nivelActivo })

/*
let objetollave = new Objeto('llave', 'tomable', 'pieza')
let objetocofre = new Objeto('cofre', 'noTomable', 'pieza')
let objetopuerta = new Objeto('puerta', 'noTomable', 'entrada')
*/
