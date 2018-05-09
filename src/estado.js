const estado = {
  acciones: {
    tomar: 0,
    mirar: 0,
    usar: 0
  },
  inventario: {
    objetos: [],
    objetoSeleccionado: null
  },
  detener: false,
  niveles: [],
  nivelActual: null,
  dialogo: null,
  movilidad: {
    norte: 0,
    sur: 0,
    este: 0,
    oeste: 0
  }
}

const genericGet = collection => () => estado[collection]
const genericSet = collection => (insertionSet) => {
  estado[collection] = { ...estado[collection], ...insertionSet }
  return estado[collection]
}

export const getAcciones = genericGet('acciones')
export const getMovilidad = genericGet('movilidad')
export const getInventario = genericGet('inventario')

export const setAcciones = genericSet('acciones')
export const setMovilidad = genericSet('movilidad')
export const setInventario = genericSet('inventario')
