window.addEventListener('load',()=>{
    input_text = document.querySelector('#busca')
    button = document.querySelector('#search')

    div_show_users = document.querySelector('#users-encotrados')
    
    span_gender_m = document.querySelector('#gender_m')
    span_gender_f = document.querySelector('#gender_f')
    span_age_sum = document.querySelector('#age_sum')
    span_media_age = document.querySelector('#media_age')
    fetchpeoples()
})
let all = []
let all_temp = []

let input_text = document.querySelector('#busca')
let button = document.querySelector('#search')

let div_show_usersS = null

let span_gender_m = null
let span_gender_f = null
let span_age_sum = null
let span_media_age = null

let contF = 0
let contM = 0


async function fetchpeoples(){
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
    const json = await res.json()
    all = json.results.map(people =>{
        const {gender} = people
        return{
            name: people.name.first+" "+people.name.last,
            picture: people.picture.large,
            gender,
            age: people.dob.age
        }
    })
    
    
}
const search_user = (nome) =>{
    let name = nome
    all_temp =all.filter(people => people.name.toLowerCase().indexOf(name.toLowerCase()) > -1)
    renderDivPesquisa()
    renderDibStatic()
}
button.addEventListener('click',()=>{
    if(input_text.value !== ""){
        search_user(input_text.value) 
        contF = 0
        contM = 0
    }
})
input_text.addEventListener('keyup',(event)=>{
    if(event.key === "Enter" && input_text.value !== ""){
        search_user(input_text.value)
    }
    contF = 0
    contM = 0
    })

const renderDivPesquisa = ()=>{
    all_temp.sort((a,b)=>{
        return a.name.localeCompare(b.name)
    })   

    let pesquisaHTML = "<div>"
    all_temp.forEach(people =>{
        const {picture,name,age} = people
        const pesquisa = `
        <div class="infos">
            <div><img src="${picture}"></div>
            <div><p>${name},${age}</p></div>
        </div>
    `
    pesquisaHTML += pesquisa
    }) 
    pesquisaHTML += "</div>"
    div_show_users.innerHTML = pesquisaHTML
   
     let h3 = document.querySelector("#users")
     h3.innerHTML = `${all_temp.length} Usuário(s)<br>encontrado(s)</p>`

}

const renderDibStatic = () =>{
    const contAge = all_temp.reduce((acc, cur)=>{
        return acc + cur.age
    },0)
    span_age_sum.textContent = contAge
    span_age_sum.value = contAge
    genderCount()
    mediaAge()
}

const genderCount = () =>{
    all_temp.forEach(people =>{
        if(people.gender === "male"){
            contM++
            span_gender_m.textContent = contM
        }else if(people.gender === "female"){
            contF++
            span_gender_f.textContent = contF
        }
    })
}

const mediaAge = ()=>{      
    span_media_age.textContent = (span_age_sum.value/all_temp.length).toFixed(2)
}
