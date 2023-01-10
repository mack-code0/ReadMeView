import { FormikHandlers, FormikProps } from 'formik/dist/types';
import TurndownService from 'turndown';

interface Props {
    title: string
    type: "input" | "textarea"
    formik: FormikProps<any>
    name: string
    wrapper: string
    prefix?: string
    noPrefix?: boolean
}

const InputCard = ({ title, type, formik, name, wrapper, prefix, noPrefix }: Props) => {
    const turndownService = new TurndownService();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (wrapper === "a" || wrapper === "li") {
            return linkListHandler(e.target.value)
        }
        wrapperHandler(e.target.value)
    }

    const wrapperHandler = (str: string) => {
        const val = str ? turndownService.turndown(`<${wrapper}>${!noPrefix ? (prefix ? prefix : title ? title : "") : ""} ${str}</${wrapper}>`) : ""
        formik?.setFieldValue(`${name}.code`, val + "\n")
    }

    const linkListHandler = (str: string) => {
        const prefixer = noPrefix ? "" : (prefix ? prefix : title ? title : "")
        const val = str ? (wrapper === "a" ? `* ${prefixer.trim().split(' ').slice(0, -1).join(' ')} [${prefixer.trim().split(' ').pop()}](https://${str})` : `* ${prefixer} ${str}`) : ""
        formik?.setFieldValue(`${name}.code`, val)
    }

    return <div className={`${type == "textarea" && "flex-column align-items-start"} input-card`}>
        <span className={`${type == "textarea" && "mb-2"}`}>{title} : {wrapper === "a" && "- https://"}</span>
        {type == "input" ?
            <input
                type="text"
                value={formik?.values[`${name}.value`]}
                onChange={changeHandler}
            /> :
            <textarea
                value={formik?.values[`${name}.value`]}
                rows={2}
                onChange={changeHandler}
            />}
    </div>
}


export default InputCard