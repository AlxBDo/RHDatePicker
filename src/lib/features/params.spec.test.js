import paramsReducer from "./params" 
import * as paramsAction from "./params"

describe("Params reducer and actions", () => {

    it("Should have a void status", () => {

        expect(paramsReducer(
            undefined, 
            { type: '@INIT' }
        )).toEqual({ 
            status: "void", 
            display: {}, 
            checked: [] 
        })

    })

    it("Should have a defined status", () => {

        expect(paramsReducer(
            { status: "void", display: {}, checked: [] }, 
            paramsAction.init("myId")
        )).toEqual({ 
            status: "defined", 
            display: {}, 
            checked: ["myId"] 
        })

    })

    it("Should had a new attribute to display object", () => {

        expect(paramsReducer(
            { status: "defined", display: {}, checked: ["myId"] }, 
            paramsAction.setDisplay("myId")
        )).toEqual({ 
            status: "defined", 
            display: { myId: false }, 
            checked: ["myId"] 
        })

        expect(paramsReducer(
            { status: "defined", display: {}, checked: ["myId"] }, 
            paramsAction.setDisplay("myId", true)
        )).toEqual({ 
            status: "defined", 
            display: { myId: true }, 
            checked: ["myId"] 
        })

    })

    it("Should update display object", () => {

        expect(paramsReducer(
            { status: "defined", display: { myId: true }, checked: ["myId"] }, 
            paramsAction.updateDisplay("myId", false)
        )).toEqual({ 
            status: "defined", 
            display: { myId: false }, 
            checked: ["myId"] 
        })

        expect(paramsReducer(
            { status: "defined", display: { myId: false }, checked: ["myId"] }, 
            paramsAction.updateDisplay("myId", true)
        )).toEqual({ 
            status: "defined", 
            display: { myId: true }, 
            checked: ["myId"] 
        })

    })

})