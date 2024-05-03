

export class Continent {
    element = undefined
    name = ""
    defaultColor = 'black'

    constructor(name) {
        this.name = name;
    }

    Run() {
        this.element = document.getElementById(this.name)
        // Set Colors For Continets
        // this.element.style.fill = this.defaultColor
    }

    SetPlayerColor(color) { 
        this.defaultColor = color
        this.element.fill = this.defaultColor
    }

}

export default Continent