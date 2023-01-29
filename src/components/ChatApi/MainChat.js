import React, { useState } from 'react'
import { arrayItems } from './AiOptions'
import OptionSelection from './OptionSelection';
import { Configuration, OpenAIApi } from "openai";
import AskMeAnything from './AskMeAnything';

const MainChat = () => {

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const [option, setOption] = useState({});
const [result, setResult] = useState("");
const [input, setInput] = useState("");
const selectOption = (option) => {
  setOption(option);
};
const doStuff =async ()=>{
  let object = { ...option, prompt: input };
  const response = await openai.createCompletion(object);
  setResult(response.data.choices[0].text);
}

  return (
    <>
        {Object.values(option).length === 0 ?<>

        <OptionSelection arrayItems={arrayItems} selectOption={selectOption}/> 
        </>:<AskMeAnything doStuff={doStuff} setInput={setInput} result={result} />
        }
    </>
  )
}

export default MainChat