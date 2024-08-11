import { useEffect, useState } from "react"


export const UseStateFunction = () => {
    const [name, setName] = useState("enter your name")


    const Name = () => {
        setName("navya")
    }

    // useEffect(() => {
    //     setName(Name + 1)
    // }, [Name])

    return (
        <>
            <h2>My name is : {name}</h2>
            <button onClick={() => Name()}>Update count</button>

            

        </>
    )
}