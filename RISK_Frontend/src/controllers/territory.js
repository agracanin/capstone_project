/* 
    Controller Class For Territory Event Listeners
*/
export class Territory {

    element = undefined
    index = undefined
    name = ""
    color = 'white'
    hoverColor = ""
    troops = 0
    initalized = false

    // Allows Communication To Top Level
    CB_onMouseOver = undefined
    CB_onMouseOut = undefined
    DB_onMouseClick = undefined

    constructor(name, offset_x = 0, offset_y = 0) {
        this.name = name
        this.offset_x = offset_x
        this.offset_y = offset_y
    }

    Run() {
        this.element = document.getElementById(this.name)
        // Set Colors For Territories Here
        this.initalized = true
        this.element.style.fill = this.color
        this.element.style.cursor = 'pointer'
        this.AddEventListeners()
        this.Update()
    }

    Update() {
        if (!this.initalized) return
        this.DrawTroopIcon(this.troops)
    }

    AddEventListeners() {
        this.OnMouseOver()
        this.OnMouseOut()
        this.OnMouseClick()
    }

    OnMouseOver() {
        this.element.addEventListener('mouseover', () => {
            this.element.style.filter = "invert(10%)"
            this.CB_onMouseOver(this.index)
            this.Update()
        })
    }

    OnMouseOut() {
        this.element.addEventListener('mouseout', () => {
            this.element.style.filter = 'url(#filter12951)';
            this.element.style.transition = '600ms ease all'
            this.CB_onMouseOut(this.index)
            this.Update()
        })
    }

    OnMouseClick() {
        this.element.addEventListener('click', () => {
            // this.element.title = this.name
            // Show Some Kind of Popup
            console.log(this.name)
            this.CB_onMouseClick(this.index)
            this.Update()
        })
    }

    SetPlayerColor(color) {
        if (!this.initalized) return
        this.color = color;
        this.element.style.fill = color
    }

    GetCenter() {
        const cords = this.element.getBoundingClientRect()
        this.center = { x: cords.x + cords.width / 2, y: cords.y + cords.height / 2 }
        this.center.x = this.center.x * (100 - this.offset_x) / 100
        this.center.y = this.center.y * (100 - this.offset_y) / 100
    }

    DrawTroopIcon(troopCount = 0) {
        this.GetCenter()
        this.RemoveTroopIcon()

        const troopCounter = document.createElement("span");
        troopCounter.innerText = troopCount.toString();
        troopCounter.style.color = 'white';
        troopCounter.style.fontWeight = 'bold';
        troopCounter.style.fontSize = "1.25rem"
        troopCounter.style.webkitTextStrokeWidth = '1.3px';
        troopCounter.style.webkitTextStrokeColor = 'black';

        const troopIcon = document.createElement("div")
        troopIcon.appendChild(troopCounter)
        troopIcon.id = `${this.name}-troopicon`
        troopIcon.style.background = "purple"
        troopIcon.style.border = "2px solid black"
        troopIcon.style.borderRadius = "50%"
        troopIcon.style.color = "white"
        troopIcon.style.height = "26px"
        troopIcon.style.width = "26px"
        troopIcon.style.display = "flex"
        troopIcon.style.alignItems = "center"
        troopIcon.style.justifyContent = "center"
        troopIcon.style.position = "absolute"
        troopIcon.style.left = `${this.center.x}px`
        troopIcon.style.top = `${this.center.y}px`
        troopIcon.style.pointerEvents = "none";
        troopIcon.style.userSelect = "none";

        const troopIcons = document.getElementById("game-board")
        troopIcons.appendChild(troopIcon)
    }

    RemoveTroopIcon() {
        try {
            document.getElementById(`${this.name}-troopicon`).remove()
        } catch (err) {

        }
    }

}

export default Territory