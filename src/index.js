import '../scss/style.scss'
// Definiendo el div principal

const divPrincipal = document.getElementById('principal')

divPrincipal.insertAdjacentHTML('afterbegin', `
    <div id="escenario"></div>
    <div id="inventario"></div>
    <div id="movilidad"></div>`)

export function objeto (nombre, juntable, lugar) {
  const boton = `<input type="image" id="${nombre}" src="./img/obj/${nombre}.png" class="objeto${nombre}" onclick="accion('${nombre}', '${juntable}')" />`
  let nivel = document.getElementById('nivel' + lugar)
  nivel.insertAdjacentHTML('afterbegin', boton)
}

export function objetoFondo (nombre, lugar) {
  const objeto = `<img src="./img/obj/${nombre}.png" class="objeto${nombre}" />`
  const nivel = document.getElementById('nivel' + lugar)
  nivel.insertAdjacentHTML('afterbegin', objeto)
}
