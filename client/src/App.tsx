import './App.css'

import {useQuery} from '@tanstack/react-query';

import {api} from "@/lib/api"

async function getUserOnDutyTime() {
    const result = await api.health["example"].$get()
    console.log(result)
    if(!result.ok)
    {
        throw new Error("Server Error")
    }
    return await result.json();
}

function App() {

    const {isPending, error, data} = useQuery({queryKey: ['get-on-times-times'], queryFn: getUserOnDutyTime})
    return (
      <>
          <p>Time: {isPending ? "..." : data.time}</p>
      </>
    )
}

export default App
