import { BasicTables } from '/src/components/BasicTable'
import { useState } from 'react'
let pointer = 0;

let tables = ['task', 'members', 'labels', 'invoices', 'attachments']

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


      <h1 className='text-center text-bermuda text-5xl font-bold mt-8'>React-Table
        <h1 className='text-center text-gray-900 text-2xl mt-4 font-light m-8'>Fetching Data and Displaying</h1></h1>

      <h2 className='text-center  text-bermuda text-4xl font-bold'>Table of {title}</h2>



      <div className='w-[80%] h-full bg-bermuda text-center mx-auto mt-4 rounded-xl shadow-xl'>
        <BasicTables sendData={[fetched, pointer]} />
      </div>

      <div className='flex flex-row-reverse w-96 mx-auto'>
        <div className="
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

        <div className="
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