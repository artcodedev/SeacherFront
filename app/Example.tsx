'use client'

import { useEffect, useState } from 'react';

import {
    MRT_GlobalFilterTextField,

    type MRT_Row,
    type MRT_ColumnDef,
    useMaterialReactTable,
    MRT_TableContainer,
    MRT_RowSelectionState,
    getMRT_RowSelectionHandler,
} from 'material-react-table';

import { data as initData, type Person } from './makeData';
import { Fetch } from './Utils/Fetch';
import { Data } from './Models/Models';



const columns: MRT_ColumnDef<Data>[] = [
    {
        accessorKey: 'name.firstName',
        header: 'First Name',
    },
    {
        accessorKey: 'name.lastName',
        header: 'Last Name',
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'city',
        header: 'City',
    },
    {
        accessorKey: 'state',
        header: 'State',
    },
];



const Example = () => {

    const [data, setData] = useState(() => initData);
    const [globalFilter, setGlobalFilter] = useState<string>('');

    useEffect(() => {

        console.log(globalFilter);
        const fetchData = async () => {

            
              const s = await Fetch.request(`https://m5dtgg-3000.csb.app/api/v1/items`, { });
              
                  console.log(s)
            //   setData([...filteredData]);
        };

        fetchData();


    }, []);


    // useEffect(() => {

    //     console.log(globalFilter);
    //     const fetchData = async () => {

            
    //           const filteredData = await fetch("https://m5dtgg-3000.csb.app/api/v1/items",  { method: 'GET', mode: 'cors'});

    //           console.log(filteredData)
    //         //   setData([...filteredData]);
    //     };

    //     fetchData();
    // }, [globalFilter]);


    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnActions: false,
        enableCellActions: false,
        enableGlobalFilterRankedResults: false,
        enableRowSelection: true,
        enablePagination: false,
        // enableSorting: false,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        enableRowOrdering: true,

        manualFiltering: true, //turn off client-side filtering
        onGlobalFilterChange: setGlobalFilter, //hoist internal global state to your state
        // state: { globalFilter }, 
        //   enableRowSelection: (row) => {console.log(row.index); return true},

        muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({

            onClick: (event) => {

                getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event)
            },
            sx: { cursor: 'pointer' },
        }),

        muiRowDragHandleProps: ({ table }) => ({

            onDragEnd: () => {

                const { draggingRow, hoveredRow } = table.getState();

                // console.log(draggingRow);
                console.log(hoveredRow?.index);

                if (hoveredRow && draggingRow) {

                    data.splice(

                        (hoveredRow as MRT_Row<Person>).index,

                        0,

                        data.splice(draggingRow.index, 1)[0],

                    );

                    setData([...data]);

                }

            },

        }),
        initialState: {
            showGlobalFilter: true,
        },

    });

    const sort = (e: any) => {
    }

    return (

        <>
            <MRT_GlobalFilterTextField table={table} />
            <MRT_TableContainer table={table} />
        </>

    );
};

export default Example;
