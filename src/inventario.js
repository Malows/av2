// Generadores de fichas de invetario

function objetoi (nombre) {
  objetoi.count++
  inventa[objetoi.count] = nombre
  const boton = `<input type="image" id="${nombre}" onclick="accionficha('${nombre}')" src="./img/obj/${nombre}-o.png" class="objeto${objetoi.count}o" />`
  divPrincipal.insertAdjacentHTML('afterbegin', boton)
}

function accionficha (nombre) {
  if (detener) return undefined

  if (usar) {
    if (usaro1 == null) {
      const index = inventa.findIndex(objInventario => objInventario === nombre)
      if (index !== -1) {
        selecFicha(nombre, index)
      }
    } else {
      usaro2 = nombre
      accionUsar()
    }
  }

  if (mirar) {
    mirar = 0
    cuadromirar(nombre)
  }
  actualizarAcciones(tomar, mirar, usar)
}

// ordenador de inventario

function inventario () {
  let a = 1
  let test
  let test2
  let elqsigue

  for (var indice = 0; indice < inventa.length; indice++) {
    if (inventa[indice]) continue
    let siguienteIndice = indice + 1
    let siguienteElemento = inventa[indice + 1]
    if (siguienteElemento) {
      document.getElementById(siguienteElemento).className = `objeto${indice}o`
      inventa[siguienteIndice] = null
      inventa[indice] = siguienteElemento
    }
  }
}

function selecFicha (nombre, indice) {
  console.log('entro en seleccion')
  if (!seleccion) {
    console.log('es 0')
    console.log(inventa)
    seleccion = 1
    const imgsele = `<input type="image" src="./img/fichasel.png" id="pepito" class="objeto${indice}o always-on-top" />`
    console.log(imgsele)
    divPrincipal.insertAdjacentHTML('afterbegin', imgsele)

    usaro1 = nombre
    asf.play()
  } else {
    console.log('es 1')
    seleccion = 0
    const botone = document.getElementById('pepito')
    divPrincipal.removeChild(botone)
  }
}

function eliminar (nombre) {
  const botone = document.getElementById(nombre)
  divPrincipal.removeChild(botone)

  const index = inventa.findIndex(obj => obj === nombre)
  if (index === -1) return undefined

  inventa[index] = null
  objetoi.count--
  inventario()
}
