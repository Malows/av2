import Position from './Position'

export default class Nivel {
  construct (name, x, y, entrable) {
    this.name = name
    this.x = x
    this.y = y
    this.entrable = entrable
  }

  set setEntrable (newVal) {
    this.entrable = newVal
  }

  makeEntrable () {
    this.entrable = true
  }

  makeNoEntrable () {
    this.entrable = false
  }

  toggleEntrable () {
    this.entrable = !this.entrable
  }

  get position () {
    return new Position(this.x, this.y)
  }
}
