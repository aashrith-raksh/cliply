import { useEffect, useState } from "react";
import supabase from "./db/supabase";


function App() {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data } = await supabase.from("urls").select();
    console.log(data)
    setInstruments(data);
  }

  return (
    <ul>
      {instruments.map((instrument) => (
        <li key={instrument.id}>{
          <pre>
            {JSON.stringify(instrument, null, 2)}
          </pre>
        }</li>
      ))}
    </ul>
  );
}

export default App;