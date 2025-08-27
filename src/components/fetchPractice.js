import { useEffect } from "react"

export default function FetchPractice() {

    const getData = () => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
        .then(res => {
            if(res.ok) {
                const contentType = res.headers.get("content-type");
                if(contentType === "application/json") {
                    return res.json();
                }
                if(contentType === "text/xml") {
                    return res.text();
                }
                if(contentType === "blob") {
                    return res.blob();
                }
            }
        })
        .then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
        <h1>Fetch Practice</h1>
        </>
    )
}