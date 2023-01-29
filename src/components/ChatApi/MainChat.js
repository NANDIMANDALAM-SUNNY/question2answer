import React, { useState } from 'react'
import { arrayItems } from './AiOptions'
import OptionSelection from './OptionSelection';
import { Configuration, OpenAIApi } from "openai";
import AskMeAnything from './AskMeAnything';

const MainChat = () => {

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_APIKEY,
});
const openai = new OpenAIApi(configuration);
const [option, setOption] = useState({});
const [result, setResult] = useState("");
const [input, setInput] = useState("");
const [example,setExample] = useState();
const [loading,setLoading] = useState(false)
const selectOption = (option) => {
  setOption(option);
  console.log(example)
};
const setExampleStuff = (examples)=>{
  setExample(examples)
}
const doStuff =async ()=>{
  setLoading(true)
  let object = { ...option, prompt: input };
  const response = await openai.createCompletion(object);
  setResult(response.data.choices[0].text);
  setLoading(false);
}
console.log(example)
  return (
    <>
        {
          Object.values(option).length === 0 ?<>
            <OptionSelection arrayItems={arrayItems} selectOption={selectOption} setExampleStuff={setExampleStuff}/> 
        </>:<AskMeAnything doStuff={doStuff} setInput={setInput} example={example} loading={loading} result={result} />
        }
    </>
  )
}

export default MainChat