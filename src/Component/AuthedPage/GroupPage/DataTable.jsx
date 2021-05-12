import React from "react";
import {useTable} from "react-table";


const columns = [{
    Header:"ID",
    accessor: "id"
},{
    Header: "Value",
    accessor: "value"
}
]
const data = [
    {
        id:1,
        value:3
    }, {
        id:2,
        value:4
    }, {
        id:3,
        value:5
    }, {
        id:4,
        value:6
    },
]

const DataTable = (props) => {


    const tableInstance = useTable(
        {
            columns,
            data
        }
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance


    return (
        <table {...getTableProps()} className="table">
            <thead>
            {headerGroups.map((headerGroup)=>(
                <tr{...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map((column)=>(
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))
                    }
                </tr>
                )

            )}

            </thead>
            <tbody{...getTableBodyProps()}>
            {
                rows.map(row=> {
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map(cell=>(
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))
                            }
                        </tr>
                    )
                })
            }

            </tbody>
        </table>
    )
}

export default DataTable;