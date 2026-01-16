import { supabase } from "./supabase";

function App() {

  async function saveTestData() {
    const { data, error } = await supabase
      .from("patients")
      .insert([
        { name: "Test Patient", email: "test@gmail.com" }
      ]);

    console.log("DATA:", data);
    console.log("ERROR:", error);
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Supabase Connection Test</h1>

      <button onClick={saveTestData}>
        Save Test Patient
      </button>
    </div>
  );
}

export default App;

