const ADD_NEW_GROUP= "ADD_NEW_GROUP"


let initialState= {
    groups:[
        {
            name: "Goose the first",
            privilege: 1,
            userCount: 177013,
            creationDate:new Date()
        },
        {
            name: "Goose the second",
            privilege: 2,
            userCount: 1234,
            creationDate:new Date()
        },
        {
            name: "Goose the third",
            privilege: 0,
            userCount: 1243,
            creationDate:new Date()
        },
        {
            name: "Goose the forth",
            privilege: 1,
            userCount: 324,
            creationDate:new Date()
        },
        {
            name: "Goose the five",
            privilege: 2,
            userCount: 123,
            creationDate:new Date()
        }
    ],
    priority: 0
}


const groupReducer= (state = initialState, action)=>
{
    switch (action.type)
    {
        //TODO this reducer doesnt work/ REPAIR
        case ADD_NEW_GROUP:
        {

            let newState={
                ...state,
                groups: [...state.groups,
                    {  name: action.name,
                    privilege: 2,
                    userCount: 1,
                    creationDate: new Date()
                }]
            }
            return newState;

        }
        default:
            return state;
    }
}


export const addNewGroup =(name)=>({type:ADD_NEW_GROUP,name})
export default groupReducer;