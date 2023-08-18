import { useState } from "react";
import AutoComplete from "@/components/AutoComplete";

const initOptions = [
  {
    text: "hi",
    value: "hi",
    key: "hi",
  },
  {
    text: "hi2",
    value: "hi2",
    key: "hi2",
  },
  {
    text: "hi3",
    value: "hi3",
    key: "hi3",
  },
  {
    text: "hi4",
    value: "hi4",
    key: "hi4",
  },
  {
    text: "hi5",
    value: "hi5",
    key: "hi5",
  },
];

function App() {
  const [options] = useState(initOptions);
  return (
    <>
      <AutoComplete options={options} />
    </>
  );
}

export default App;
