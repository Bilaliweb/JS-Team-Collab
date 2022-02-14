import React, { useMemo } from "react"
import { useTable } from "react-table"
import { COLUMNS } from "./columns"
import { COLUMN_MEMBERS } from "./column_member"
import { COLUMN_LABELS } from "./column_label"
import { COLUMN_INVOICES } from "./column_invoice"
import { COLUMN_ATTACHMENTS } from "./column_attachments"

let headers = [COLUMNS, COLUMN_MEMBERS, COLUMN_LABELS, COLUMN_INVOICES, COLUMN_ATTACHMENTS]

export const BasicTables = (props) => {

    const dataGot = props.sendData;
    // console.log(dataGot);
    const [data, pointer] = dataGot
    // const columns = useMemo(() => headers[pointer], []);

    const tableInstance = useTable({

        columns: headers[pointer],
        data

    })


    const {

        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow

    } = tableInstance

    return (
        <table className="border-collapse w-screen" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td  {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}