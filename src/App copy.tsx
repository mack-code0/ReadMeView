import { useEffect, useRef, useState } from 'react'
import TurndownService from 'turndown';
import ReactMarkdown from 'react-markdown';
import Showdown from 'showdown';
import { Remarkable } from 'remarkable';
import { Application, SplineEvent } from '@splinetool/runtime';
import Spline, { SplineProps } from "@splinetool/react-spline";





function App() {
  const turndownService = new TurndownService();
  const converter = new Showdown.Converter()

  const [view, setView] = useState("code")
  const [state, setState] = useState<any>({
    name: "",
    subTitle: "",
    desc: "",
    link: "",
    contact: "",
    skill1: `<p align="left">
    <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" width="36" height="36" alt="TypeScript" /></a>
    </p>`,
    skill: `<p align="left"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg" width="36" height="36" alt="Javascript" /></a></p>`
  })

  const handler = (property: string, wrapper: string, str: string, preText?: string,) => {
    const val = str ? turndownService.turndown(`<${wrapper}>${preText ? preText : ""} ${str}</${wrapper}>`) : ""
    setState((prev: any) => {
      const holder = { ...prev }
      holder[`${property}`] = val + "\n"
      return { ...holder }
    })
  }

  const listHandler = (body: string, property: string, type?: string) => {
    let temp = body ? (type == "link" ? `* See my portfolio at [Portfolio](${body})` : `* ${body}`) : ""
    setState((prev: any) => {
      const holder = { ...prev }
      holder[`${property}`] = temp + "\n"
      return { ...holder }
    })
  }

  const spRef = useRef<any>(null)
  
  function onLoad(spline:any) {
    const obj = spline.findObjectByName('Cube');
    console.log(obj, "oop")
    // or
    // const obj = spline.findObjectById('8E8C2DDD-18B6-4C54-861D-7ED2519DE20E');
    console.log(spline)

    // save it in a ref for later use
    spRef.current = spline;
  }

  function moveObj() {
    // console.log(spRef.current); // Spline Object => { name: 'Cube', id: '8E8C2DDD-18B6-4C54-861D-7ED2519DE20E', position: {}, ... }

    // move the object in 3D space
    spRef.current.emitEvent("mouseDown")
  }

  return (
    <div className="bg-dark vw-100 text-light w-100 vh-100">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="row">
              <button onClick={moveObj}>click</button>
              <Spline
                ref={spRef}
                onLoad={onLoad}
                scene="https://prod.spline.design/XeOkfDUpKKkUgZUP/scene.splinecode"
              />
              <div className="col-6"><input type="text" onChange={({ target: { value } }) => handler("name", "h1", value, "Hi 👋 My name is")} placeholder='name' /></div>
              <div className="col-6"><input type="text" onChange={({ target: { value } }) => handler("subTitle", "h2", value)} placeholder='subtitle' /></div>
              <div className="col-6"><input type="text" onChange={({ target: { value } }) => handler("desc", "p", value)} placeholder='description' /></div>
              <div className="col-6"><input type="text" onChange={({ target: { value } }) => listHandler(value, "link", "link")} placeholder='Link' /></div>
              <div className="col-6"><input type="text" onChange={({ target: { value } }) => listHandler(value, "contact", "link")} placeholder='Link 2' /></div>
            </div>
          </div>
          <div className="col-6">
            {view === "code" && <div className="d-flex flex-column">
              <button onClick={() => setView("markdown")} className="btn btn-light mb-4">Markdown</button>
              {Object.keys(state).map((key, idx) => <pre className='mt-3' key={idx}>{state[key]}</pre>)}
            </div>}

            {view === "markdown" && <div className="d-flex flex-column">
              <button onClick={() => setView("code")} className="btn btn-light mb-4">Code</button>
              <ReactMarkdown>
                {Object.keys(state).map((key, idx) => state[key]).join("")}
              </ReactMarkdown>
              <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(Object.keys(state).map((key, idx) => state[key]).join("")) }}></div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
