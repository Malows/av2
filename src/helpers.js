export const pruneNode = node => {
  node.innerHTML = ''
  while (node.hasChildNodes()) node.removeChild(node.firstChild)
  return node
}

export const capitalize = word =>
  word[0].toUpperCase() + word.substring(1).toUpperCase()

export const crearCuadro = (nombre, innerText = null) => `
  <div class="textines" id="m${nombre}" onclick="sacarcuadro('m${nombre}')">
    <p class="letras">${innerText || 'no se que queres que haga'}</p>
  </div>`
