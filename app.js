//selectors

const input = document.querySelector(".input")
const submit = document.querySelector(".submit")
const reset = document.querySelector(".reset")
const errMsg = document.querySelector(".errMsg")
const wordContainer = document.querySelector(".wordContainer")

//adding eventlistener to submit button
submit.addEventListener("click",(e) => {
    e.preventDefault()
    wordRender(input.value)
    console.log("works")
    input.value=""
})
//adding eventlistener to reset button
reset.addEventListener("click",(e)=> {
    e.preventDefault()
    console.log("works")
    wordContainer.innerHTML=""
})

//word rendering function

const wordRender = async (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try{
        
        const response = await axios.get(url)
        const data = response.data
        console.log(data)
        const wordContainer = document.querySelector(".wordContainer")
        console.log(data[0].word)
        const {word,meanings}=data[0]
        data.map(()=> {
            return (
                wordContainer.innerHTML=
                `
                <ul>
                    <li class="word">
                    <div class="details">
                        <p> ${word.toUpperCase()} </p>
                        <span>${meanings[0].partOfSpeech} </span>
                    </div>
                    <i class="fas fa-volume-up"></i>
                    </li>
                    
                    <li class="meaning">
                        <div class="details">
                            <p>Meaning</p>
                            <span>${meanings[0].definitions[0].definition || "There is no meaning" }  </span>
                        </div>
                    </li>
                    <li class="example">
                        <div class="details">
                            <p>Example</p>
                            <span> ${meanings[0].definitions[0].example || "There is no example"} </span>
                        </div>
                    </li>
                    <li class="synonyms">
                        <div class="details">
                            <p>Synonym</p>
                            <div class="list">${ meanings[0].synonyms || "There is no synonyms" }</div>
                        </div>
                    </li>
                </ul>
                `
            )

        }) 
    }
    catch(err) {
        console.log(err)
        errMsg.innerHTML="No such word found, Please try again"
        setTimeout(()=> {
            errMsg.innerHTML=""
        },3000)
    }
}
