import { BasicTables } from '/src/components/BasicTable'
import { useState } from 'react'

//For Fetching ------------------------------
export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:8080/task');
  const data = await res.json();

  return {
    props: { data }
  }


}
//For Fetching ------------------------------

//For Delete---------------------------------

export const deleteData = async (id) => {

  fetch('http://localhost:8000/crud', {
    method: 'POST',
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

}

//For Delete---------------------------------

export default function Home({ data, deleter }) {

  let storeIt = Object.keys(data[0])


  const [name, setName] = useState('---');

  return (

    <div>
      <h1 className='text-center text-bermuda text-5xl font-bold'>React-Table</h1>
      <h1 className='text-center text-2xl mt-4 font-light'>Fetching Data and Displaying</h1>

      <div className='w-[80%] h-full bg-bermuda text-center mx-auto mt-4 rounded-xl shadow-xl'>

        <BasicTables sendData={data} />
      </div>




      {/*<div className='text-center pt-8 font-bold text-4xl text-gray'>
          Please Select Your Desired <br /> Operation✨
        </div>
         <input type="text" id="dels" onChange={(val) => {setName(val.target.value)}} />
              <div className='p-4 text-center mx-auto'>
                  <div className="bg-bermuda w-40 text-white p-4 m-4 rounded-2xl mx-auto shadow-xl hover:font-bold hover:p-8 hover:shadow-lg hover:text-2xl transition-all hover:transition-all">CREATE</div>
                  <div className="bg-bermuda w-40 text-white p-4 m-4 rounded-2xl mx-auto shadow-xl hover:font-bold hover:p-8 hover:shadow-lg hover:text-2xl transition-all hover:transition-all">READ</div>
                  <div className="bg-bermuda w-40 text-white p-4 m-4 rounded-2xl mx-auto shadow-xl hover:font-bold hover:p-8 hover:shadow-lg hover:text-2xl transition-all hover:transition-all">UPDATE</div>
                  <div className="bg-bermuda w-40 text-white p-4 m-4 rounded-2xl mx-auto shadow-xl hover:font-bold hover:p-8 hover:shadow-lg hover:text-2xl transition-all hover:transition-all" onClick={() => {
                    deleteData(name)
                    }}>DELETE
                  </div>
              </div> */}
    </div>

  )
}



