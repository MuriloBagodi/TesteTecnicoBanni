import express from "express"
import axios from "axios"

const app = express()

app.get("/", (req, res) => {
    axios.get("https://petstore.swagger.io/v2/pet/findByStatus?status=available").then((results) => {
        const data = results.data
        let hash = {}
        let mostFrequentName = ""
        let maxCount = 0
        for (let pet of data) {
            if (hash[pet.name] !== undefined) {
                hash[pet.name] += 1
            } else {
                hash[pet.name] = 1
            }

            if(hash[pet.name] >  maxCount){
                maxCount = hash[pet.name]
                mostFrequentName = pet.name
            }
        }
        console.log(hash)
        res.status(200).send(`O nome do pet mais repetido é: ${mostFrequentName} com ${maxCount} ocorrência(s).`);
    })
    
})

app.listen(3333, () => {
    console.log("Server is running on port 3333")
})
