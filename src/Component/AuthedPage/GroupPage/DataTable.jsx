import React from "react";
import {useTable} from "react-table";

const DataTable = ({columns,data}) => {


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

const jsonchick = {
    Columns:[
        {
            Header: "User/program",
            accessor: "user/program"
        },
        {
            Header: "date1",
            columns:[
                {
                    Header: "CPU USAGE",
                    accessor: "date1-cpu"
                }, {
                    Header: "RAM USAGE",
                    accessor: "date1-ram"
                }

            ]
        },{
            Header: "date2",
            columns:[
                {
                    Header: "CPU USAGE",
                    accessor: "date2-cpu"
                }, {
                    Header: "RAM USAGE",
                    accessor: "date2-ram"
                }

            ]
        },

    ],
    data: [
        {"user":"goose","date1-cpu":"15%","date1-ram":"34"},
        {"user":"Amine","date1-cpu":"100%","date1-ram":"1020"},


    ]
}


export default DataTable;