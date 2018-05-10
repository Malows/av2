export const pruneNode = node => {
  node.innerHTML = ''
  while (node.hasChildNodes()) node.removeChild(node.firstChild)
  return node
}
