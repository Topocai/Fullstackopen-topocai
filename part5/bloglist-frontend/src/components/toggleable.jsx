import { useState, forwardRef, useImperativeHandle } from "react"

const ToggeableComponent = forwardRef( ({children, hideLabel, showLabel}, refs)  => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    if(visible) {
        return (
            <div>
                <button onClick={toggleVisibility}>{hideLabel}</button>
                {children}
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={toggleVisibility}>{showLabel}</button>
            </div>
        )
    }
})

export default ToggeableComponent