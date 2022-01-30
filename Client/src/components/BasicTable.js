import React, { useMemo } from "react"
import { useTable } from "react-table"
import { COLUMNS } from "./columns"
import MOCK_DATA from "/src/components/MOCK_DATA.json"

export const BasicTables = (props) => {

    const dataGot = props.sendData;

    {
        console.log(dataGot)
    }

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({

        columns,
        data: dataGot

    })

    const {

        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow

    } = tableInstance

    return (

        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => {

                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => {
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                })
                            }
                        </tr>

                    })
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {

                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr key={1} {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td key={1} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })

                }

            </tbody>

        </table>

    )

}