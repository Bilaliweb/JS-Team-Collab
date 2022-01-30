import { BasicTables } from '/src/components/BasicTable'

//For Fetching ------------------------------
export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:8080/api');
  const data = await res.json();

  return {
    props: { data }
  }

}
//For Fetching ------------------------------

export default function Home({ data }) {
  return (

    <div>
      <h1 className='text-center text-bermuda text-5xl font-bold'>React-Table</h1>
      <h1 className='text-center text-2xl mt-4 font-light'>Fetching Data and Displaying</h1>

      <div className='w-[80%] h-full bg-bermuda text-center mx-auto mt-4 rounded-xl shadow-xl'>
        <BasicTables sendData={data} />
      </div>
    </div>

  )
}



