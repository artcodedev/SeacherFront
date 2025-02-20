

'use client'

import Container from '@mui/material/Container';
import Loading from "./Components/Loading";
import { useState, useEffect, useRef, SetStateAction, useLayoutEffect } from "react";
// import { useElementSize } from "usehooks-ts";
import {
  type MRT_Row,
  type MRT_ColumnDef,
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_RowSelectionState,
  getMRT_RowSelectionHandler,
} from 'material-react-table';

import { Cookies, useCookies } from 'next-client-cookies';
import { Fetch } from "./Utils/Fetch";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField/TextField";
import IconButton from "@mui/material/IconButton/IconButton";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

/*
*** Models
*/
import { Data, Fetch_data, IMap } from "./Models/Models";

const columns: MRT_ColumnDef<Data>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  }
];

export default function Home() {

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data[]>([]);
  const cookies: Cookies = useCookies();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [scrollRequest, setScrollRequest] = useState<number | null>(0);

  const [blockToDoubleFetch, setBlockToDoubleFetch] = useState<boolean>(false);

  const sortInAscendingOrder = async () => {
    setData([...data.sort((x, y) => x.id - y.id)]);

    const sorted: Fetch_data = await Fetch.request('/api/v1/set_sorted', { token: token, sorted: 0 });

    console.log(sorted);

    // some kind of action

  }

  const sortInDescendingOrder = async () => {

    setData([...data.sort((x, y) => x.id - y.id).reverse()])

    const sorted: Fetch_data = await Fetch.request('/api/v1/set_sorted', { token: token, sorted: 1 });

    console.log(sorted);

    // some kind of action
  }

  const search_fetch = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const search: string = e.target.value;

    setSearchQuery(search)

    setLoadingTable(true);

    setBlockToDoubleFetch(false);

    const data: Fetch_data = await Fetch.request('/api/v1/get_search', { token: token, query: search.length ? search : '' });

    if (data) {
      setData(data.data);
      setLoadingTable(false);
    }

    /*
    *** Show some errors
    */
  }

  const getTokenData = async (): Promise<void> => {

    const data: Fetch_data = await Fetch.request('/api/v1/get_token_data', {});

    if (data) {

      console.log(data)

      cookies.set('token', data.token);

      setToken(data.token);
      setData(data.data);
      setLoading(false);

      setSearchQuery(data.profile.search)

    }

    /*
    *** Show some errors
    */

  }

  const getData = async (token: string) => {

    const data: Fetch_data = await Fetch.request('/api/v1/get_data', { token: token });

    if (data) {

      setToken(token);

      setData(data.data);

      setSearchQuery(data.profile.search);

      const dataSelected: SetStateAction<MRT_RowSelectionState> = {}

      for (let i of Object.keys(data.profile.selected)) {
        dataSelected[i] = true
      }
      setRowSelection(dataSelected)

      setLoading(false);
    }

    /*
    *** Show some errors
    */

  }

  const moveActions = async (draggingRow: number, hoveredRow: number) => {

    const move: Fetch_data = await Fetch.request('/api/v1/set_move', { token: token, draggingRow: draggingRow, hoveredRow: hoveredRow });

    console.log(move);

    // some kind of action
  }

  const setSelected = async (indexes: IMap<boolean>) => {

    const data: Fetch_data = await Fetch.request('/api/v1/get_selected', { token: token, selected: indexes });

    if (data) {
      /*
      *** Some do if needs
      */
    }

    /*
    *** Show some errors
    */
  }

  useEffect(() => {

    setSelected(rowSelection)

  }, [rowSelection]);

  useEffect(() => {

    const token: string | undefined = cookies.get('token');

    token?.length ? getData(token) : getTokenData();

  }, []);

  const fetchOffsetData = async (): Promise<void> => {

    if (blockToDoubleFetch) return;

    const data_offset: {data: Data[]} = await Fetch.request('/api/v1/get_offset_data', { token: token, offset: data.length });

    if (data_offset) {
      if (data_offset.data != null && data_offset.data.length ) {

        setData(data.concat(data_offset.data));
        setBlockToDoubleFetch(false);
      }

    }

  }

  const handleScroll = () => {
    const position: number = window.pageYOffset;

    if (scrollRequest != null) {
      if (scrollRequest < position) {
        setBlockToDoubleFetch(true);
        fetchOffsetData();
      }
    }

  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);

  });

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const { clientHeight } = ref.current;

      setScrollRequest(clientHeight / 3);

    }
  });

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableCellActions: false,
    enableGlobalFilterRankedResults: false,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    enablePagination: false,
    enableSorting: false,
    enableRowOrdering: true,
    manualFiltering: true,
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({

      onClick: (event) => {

        getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event)
      },
      sx: { cursor: 'pointer' },
    }),

    muiRowDragHandleProps: ({ table }) => ({

      onDragEnd: () => {

        const { draggingRow, hoveredRow } = table.getState();

        if (hoveredRow?.index != undefined && draggingRow?.index != undefined) {

          moveActions(draggingRow.index, hoveredRow.index);

          data.splice(

            (hoveredRow as MRT_Row<Data>).index,

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


  return (
    <>

      {loading ? <Loading /> : <div >
        <AppBar position="static" sx={{ minWidth: "100%" }}>
          <Container sx={{ minWidth: "100%" }}>
            <Toolbar disableGutters sx={{
              minWidth: "100%", justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Some logo
              </Typography>

            </Toolbar>
          </Container>
        </AppBar>

        <Box sx={{ margin: '20px 20px' }}>
          <Box sx={{ display: 'flex' }}>
            <TextField id="outlined-basic" label="Search name" variant="outlined" value={searchQuery} onChange={search_fetch} />
            <Box sx={{ marginLeft: '20px' }}>

              <IconButton aria-label="filter" size="large" onClick={sortInDescendingOrder}>
                <ArrowDownwardIcon />
              </IconButton>

              <IconButton aria-label="filter" size="large" onClick={sortInAscendingOrder}>
                <ArrowUpwardIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ marginTop: '20px', minHeight: '100px', position: 'relative' }} >

            {loadingTable ? <Loading /> : <div ref={ref}><MRT_TableContainer table={table} /> </div>}

          </Box>
        </Box>


      </div>}


    </>
  );
}
