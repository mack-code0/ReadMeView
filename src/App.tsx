import { useState } from "react"
import Icon from "@ant-design/icons"
import { Dropdown } from "antd"
import { MenuProps } from "antd/es/menu"
import SVGs from "./components/SVGs"
import InputCard from "./components/InputCard"
import { useFormik } from "formik"
import ReactMarkdown from 'react-markdown';
import DoubleInputCard from "./components/DoubleInputCard"




export default function App() {
  const [viewCode, setViewCode] = useState(true)
  const initialTheme = localStorage.getItem("theme")
  const [activeTheme, setActiveTheme] = useState(initialTheme || "lightey")
  const setTheme = (str: string) => {
    if (str !== activeTheme) {
      localStorage.setItem("theme", str)
      setActiveTheme(str)
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      className: "theme-selector",
      label: (
        <a>
          Lightey
        </a>
      ),
      onClick: () => setTheme("lightey")
    },
    {
      key: '2',
      className: "theme-selector",
      label: (
        <a>
          Darkey
        </a>
      ),
      onClick: () => setTheme("darkey")
    },
    {
      key: '3',
      className: "theme-selector",
      label: (
        <a>
          Limey
        </a>
      ),
      onClick: () => setTheme("limey")
    },
  ];

  const formik = useFormik<any>({
    initialValues: {
      name: { code: "", value: "" },
      subtitle: { code: "", value: "" },
      description: { code: "", value: "" },
      location: { code: "", value: "" },
      portfolio: { code: "", value: "" },
      resume: { code: "", value: "" },
      learning: { code: "", value: "" },
      workingOn: { code: "", value: "", name: "" },
    },
    onSubmit: () => { }
  })

  return <div className={`app ${activeTheme}`}>
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-6 p-0 h-100">
          <div className="left-side p-0 h-100 m-0">
            <div className="d-flex align-items-center control-cent px-4">
              <button onClick={() => setViewCode(!viewCode)} className="shadowed ml-auto">{viewCode ? "Markdown" : "Code"}</button>
              <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                <button className="shadowed mx-3"><Icon className="btn-icon" component={SVGs.ThemesSVG} />Themes</button>
              </Dropdown>
              <button className="shadowed">Copy</button>
            </div>

            {viewCode ? <div className="code-center px-4 py-5">
              <small className="code-txt">
                {Object.keys(formik.values).map((val: any) => formik?.values[`${val}`]?.code)?.join("\n")}
              </small>
            </div> : <>
              <ReactMarkdown className="mkd px-4 py-5">
                {Object.keys(formik.values).map((val: any) => formik?.values[`${val}`]?.code)?.join("\n")}
              </ReactMarkdown>
            </>}
          </div>
        </div>


        <div className="col-6 p-0 h-100">
          <div className="right-side h-100 w-100">
            <div className="control-cent d-flex flex-column justify-content-center px-4 bg-transparent">
              <h1 className="header">Introduction</h1>
              <p className="subHeader">Introduce yourself. Tell visitors about you and who you are</p>
            </div>

            <div className="details-section px-4 pt-5 pb-4">
              <InputCard formik={formik} name="name" wrapper="h1" type="input" title="Hi 👋 ! My name is " />
              <InputCard formik={formik} name="subtitle" wrapper="h2" noPrefix={true} type="input" title="🦺 Subtitle " />

              <h6 className="subHeader-2 pt-3 pb-4">About me</h6>

              <InputCard formik={formik} name="description" wrapper="p" noPrefix={true} type="textarea" title="🧾 A little about myself " />
              <InputCard formik={formik} name="location" wrapper="li" type="input" title="🌍 I’m based in" />
              <InputCard formik={formik} name="portfolio" wrapper="a" type="input" title="🏅 Checkout my Portfolio" />

              <InputCard formik={formik} name="resume" wrapper="a" type="input" title="📃 Checkout my Resume" />
              <InputCard formik={formik} name="learning" wrapper="li" type="input" title="📖 I’m currently learning" />

              {/* <div className="container-fluid">
                <div className="row">
                  <div className="col-6 pl-0">
                    <DoubleInputCard  type="input" title="🚀 Currently working on" />
                  </div>
                  <div className="col-6 pr-0">
                    <DoubleInputCard type="input" title="https://" />
                  </div>
                  <div className="col-12 p-0 d-flex mt-n4 mb-5">
                    <Icon onClick={() => { }} className="ml-auto" component={SVGs.PlusSVG} />
                  </div>
                </div>
              </div> */}

              {/* <InputCard type="input" title="🤝 I'm open to collaborating on : " /> */}
              {/* <InputCard type="textarea" title="⚡ Anything else : " /> */}

              <button type="submit" className="btn w-100 mt-4">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}