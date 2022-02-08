import errorReducer from "./error"
import * as errorAction from "./error"

describe("Error reducer and actions", () => {

    const errorObj = {
        what: "something", 
        why: "because", 
        output: "here"
    }

    it("Should return empty status", () => {

        expect(errorReducer(
            undefined, 
            { type: '@INIT' }
        )).toEqual({ 
            status: "empty",
            error: {}
        })
        
        expect(errorReducer({
            status: 1,
            error: {here: [errorObj] }
        }, errorAction.clear("here"))).toEqual({ 
            status: "empty",
            error: {}
        })

    })

    it("Should return 1 status", () => {

        expect(errorReducer({ 
                status: "empty",
                error: {}
              }
        , errorAction.add(errorObj))).toEqual({
            status: 1,
            error: {here: [errorObj] }
        })
    })

})