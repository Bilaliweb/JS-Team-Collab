import { BasicTables } from '/src/components/BasicTable'
import { useEffect, useState } from 'react'
let pointer = 0;
let tables = ['task', 'members', 'labels', 'invoices', 'attachments']
let finder = '';
let finderArr = [];
let index = 0;

//For initial Fetching 
export const getServerSideProps = async () => {

  let res = await fetch('http://localhost:8080/task');
  const data = await res.json();

  return {
    props: { data }
  }

}

//For Fetching 
export const getData = async (pointer) => {

  let res = await fetch(`http://localhost:8080/${tables[pointer]}`);
  const Btndata = await res.json();

  Btndata = Sorter(Btndata)

  return {
    props: { Btndata }
  }

}


export default function Home({ data }) {

  data = Sorter(data);

  const [fetched, setFetched] = useState(data);
  const [title, setTitle] = useState('task');

  return (

    <div>

      <h1 className='text-center text-bermuda text-5xl font-bold font-body my-8'>React Table
        <h1 className='text-center text-gray-900 text-2xl my-4 font-light font-body'>Fetching Data and Displaying</h1></h1>

      <h2 className='text-center text-bermuda text-6xl font-bold font-body'>{title.toUpperCase()}</h2>

      <div className='w-72 mx-auto flex flex-col'>
        <h1 className='text-3xl font-bold text-gray-400 text-center p-4'>Search by ID</h1>
        <input id="input" type="text" className='px-1 shadow-xl border border-gray-900' onChange={(change) => {
          console.log(change.nativeEvent.data)
          if (change.nativeEvent.data !== null) {
            finderArr = []
            finder += change.nativeEvent.data
            console.log(finder)
            getData(pointer).then(v => {
              v.props.Btndata.forEach((e) => {

                if (index == 0)
                  if (finder[index] === String(e.id)[index]) {
                    finderArr.push(e)
                  }

                if (index == 1) {
                  if (finder[index] === String(e.id)[index]) {
                    if (finder[index - 1] === String(e.id)[index - 1])
                      finderArr.push(e)

                  }
                }

              })
            }).then(() => {
              console.log(finderArr)
              setFetched(finderArr)
              index++
            })
          }
          else {
            let inputField = document.querySelector('#input')
            inputField.value = ''
            finder = ''
            finderArr = []
            getData(pointer).then((v) => { setFetched(v.props.Btndata) })
            index = 0
          }

        }} />
      </div>

      <div className='w-[80%] h-full bg-bermuda text-center mx-auto mt-4 rounded-xl shadow-xl'>
        <BasicTables sendData={[fetched, pointer]} />
      </div>

      <div className='flex flex-row-reverse w-96 mx-auto'>
        <div className="font-body
      m-8 p-4 text-bermuda w-40 text-bold border-2 border-bermuda bg-white mx-auto text-center shadow-lg hover:shadow-xl hover-p-8 rounded-xl text-xl hover:transition-all transition-all cursor-pointer" onClick={() => {
            if (pointer !== tables.length - 1)
              pointer++;
            else
              pointer = 0;
            getData(pointer).then(v => { setFetched(v.props.Btndata) })
            setTitle(tables[pointer])
          }}>
          NEXT PAGE..
        </div>

        <div className="font-body
      m-8 p-4 text-white w-40 text-bold bg-bermuda mx-auto text-center shadow-lg hover:shadow-xl hover-p-8 rounded-xl text-xl hover:transition-all transition-all cursor-pointer" onClick={() => {
            if (pointer !== 0)
              pointer--;
            else
              pointer = tables.length - 1;
            getData(pointer).then(v => setFetched(v.props.Btndata))
            setTitle(tables[pointer])
          }}>
          PREV PAGE..
        </div>
      </div>

    </div>

  )
}

function Sorter(data) {

  let sorter = [];
  let dataArr = [];
  let indx = 0;

  data.forEach((e) => {
    for (let key in e) {
      if (key === 'id')
        sorter.push(e[key]);
    }
  })
  sorter.sort((a, b) => {
    return a - b
  });
  data.forEach(() => {
    data.forEach(e => {
      for (let key in e) {
        if (key === 'id') {
          if (sorter[indx] === e[key]) {
            indx++;
            dataArr.push(e);
          }
        }
      }
    })
  })
  return dataArr;
}