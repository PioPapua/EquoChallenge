class Helpers {
  constructor () {
    this.baseUrl = `${window.location.origin}/`
  }

  goTo (url) {
    window.location.href = `${this.baseUrl}${url}`
  }
}
export const helpers = new Helpers()
