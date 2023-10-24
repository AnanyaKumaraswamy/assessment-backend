const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const dataContainerHealth = document.querySelector('#data-container-health')
const dataContainerProsperity = document.querySelector('#data-container-prosperity')
const dataContainerInspiration = document.querySelector('#data-container-inspiration')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/affirmations`

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const fortuneCheck = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', fortuneCheck)


//NEW

const affirmationsCallback = ({ data: affirmations }) => displayAffirmations(affirmations)
const errCallback = err => console.log(err.response.data)

const getAllData = () => axios.get(baseURL).then(affirmationsCallback).catch(errCallback)
const createData = body => axios.post(baseURL, body).then(affirmationsCallback).catch(errCallback)
const deleteAffirmation = id => axios.delete(`${baseURL}/${id}`).then(affirmationsCallback).catch(errCallback)
const updatePriority = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(affirmationsCallback).catch(errCallback);

function submitHandler(e) {
    e.preventDefault()

    let category = document.querySelector("select")
    let priority = document.querySelector('input[name="priority"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        category: category.value,
        priority: priority.value, 
        imageURL: imageURL.value
    }

    createData(bodyObj)

    category.value = ''
    priority.checked = false
    imageURL.value = ''
}

form.addEventListener('submit', submitHandler)


function displayAffirmations(arr) {
    dataContainerHealth.innerHTML = ``;
    dataContainerProsperity.innerHTML = ``;
    dataContainerInspiration.innerHTML = ``;

    for (let i = 0; i < arr.length; i++) {
        createAffirmationCard(arr[i])
    }
}

function createAffirmationCard(affirmation) {
    const affirmationCard = document.createElement('div')
    affirmationCard.classList.add('affirmation-card')

    affirmationCard.innerHTML = `<img alt='affirmation cover' src=${affirmation.imageURL} class="affirmation-cover"/>
    <p class="affirmation-title">${affirmation.category}</p>
    <div class="btns-container">
        <button onclick="updatePriority(${affirmation.id}, 'minus')">-</button>
        <p class="affirmation-priority">Priority: ${affirmation.priority}</p>
        <button onclick="updatePriority(${affirmation.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteAffirmation(${affirmation.id})">delete</button>
    `

    if(affirmation.category === 'Health')
        dataContainerHealth.appendChild(affirmationCard);
    else if(affirmation.category === 'Prosperity')
        dataContainerProsperity.appendChild(affirmationCard);
    else if(affirmation.category === 'Inspiration')
        dataContainerInspiration.appendChild(affirmationCard);
}


getAllData();