import React from "react";

let mas = new Array(50);
for(let i=0; i< mas.length;i++)
{
    mas[i]=i;
}
const GroupsPage= (props)=>{
    return(
        <div>
            THIS IF GROUPS PAGE. PAGE AT CONSTRUCTION
            {
                mas.map((i)=>
                <div>{i}</div>
                )
            }
        </div>
    )
}
export default GroupsPage;