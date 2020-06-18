// custom functions to be used in multiple pages/components

export default (context, inject) => {
  // function to return icon src
  const theIcon = (icon) => {
    return '/' + icon + '.svg'
  }
  inject('theIcon', theIcon)
}
