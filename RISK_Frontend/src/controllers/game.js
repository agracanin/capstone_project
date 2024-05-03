import Territories from './territories'
import Continents from './continents'

export class GameController {
    TerritoryControllers = []
    ContinentControllers = []

    // Call Backs
    Territory_MouseOverCallBack = undefined
    Territory_MouseOutCallBack = undefined
    Territory_MouseClickCallBack = undefined

    constructor() {
        Object.assign(this.TerritoryControllers, Territories)
        Object.assign(this.ContinentControllers, Continents)
        // this.SetTerritoryIndexes()
        this.AddEventListeners()
    }

    Run() {
        this.InitTerritoryControllers()
        this.InitContinentControllers()
    }

    InitTerritoryControllers() {
        this.TerritoryControllers.forEach( t => {
            t.Run()
        })
    }

    InitContinentControllers() {
        this.ContinentControllers.forEach( c => {
            c.Run()
        })
        this.ResetContinentFills()
    }

    AddEventListeners() {
        window.addEventListener('resize', () => {
            this.TerritoryControllers.forEach( t => {
                t.Update()
            })
        })
    }

    ResetContinentFills() {
        const layer = document.getElementById('layer2')
        let paths = layer.childNodes
        paths.forEach( path => {
            if (path.tagName === 'g') {
                let spath = path.childNodes
                spath[0].style.fill = 'none' 
            } else {
                path.style.fill = "none";
            }
        })
    }

    SetTerritoryIndexes() {
        this.TerritoryControllers.forEach( (territory, index) => {
            territory.index = index
            territory.CB_onMouseOver = this.Territory_MouseOverCallBack
            territory.CB_onMouseOut = this.Territory_MouseOutCallBack
            territory.CB_onMouseClick = this.Territory_MouseClickCallBack
        })
    }

}

export default GameController