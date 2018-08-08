
const appRoot = document.getElementById('root')

const Exercise = function (id, workout, duration, bpm) {
    this.id = id
    this.workout = workout
    this.duration = duration
    this.bpm = bpm
    this.calories = 0
}

let person = {
    name: 'Anonymous',
    age: 25,
    gender: 'male',
    weight: 140
}

let nameElement = null
let ageElement = null
let genderElement = null
let weightElement = null
let addWorkoutElement = null
let calorieElement = 0
let displayListElement = []
let workouts = []


//
//
// Grab info from local storage if there
//
//


let grabPersonFromStorage = function () {
    if (localStorage.getItem('person') == null) {
        localStorage.setItem('person', JSON.stringify(person))
    } else {
        person = JSON.parse(localStorage.getItem('person'))
    }
}

let grabWorkoutsFromStorage = function () {
    if (localStorage.getItem('workouts') == null) {
        localStorage.setItem('workouts', JSON.stringify(workouts))
    } else {
        workouts = JSON.parse(localStorage.getItem('workouts'))
    }
}

grabWorkoutsFromStorage()
grabPersonFromStorage()



//
//
// Displays the default name or after input
//
//






let displayNameElement = ()=> {
    nameElement = (
        <span class = "person" onClick={()=> {inputNameElement()}}>{person.name}</span>
    )
    addList()
    renderApp()
} 




let inputNameElement = ()=> {
    let input = person.name
    displayAgeElement()
    displayGenderElement()
    displayWeightElement()
    nameElement = (
        <span>
            <form>    
                <input type="input" placeholder={input} onChange={(e)=> {
                    input = e.target.value.trim()
                }} onBlur = {()=> {
                    displayAgeElement()
                    displayGenderElement()
                    displayWeightElement()
                }}/><button onClick={(e)=>{
                    e.preventDefault()
                    if (input.length > 0 && input.length < 30) {
                        person.name = input
                        localStorage.setItem('person', JSON.stringify(person))
                        displayNameElement()
                    } else {
                        person.name = 'Anonymous'
                        localStorage.setItem('person', JSON.stringify(person))
                        displayNameElement()
                    }
                    
                }}>Change</button>
            </form>
        </span>
    )
    addList()
    renderApp()
}





//
//
// Displays the age from default or after input
//
//






let displayAgeElement = ()=> {
    ageElement = (
        <span class ="person" onClick={()=> {inputAgeElement()}}>{person.age}</span>
    )
    addList()
    renderApp()  
}





let inputAgeElement = ()=> {
    let age = person.age
    displayNameElement()
    displayGenderElement()
    displayWeightElement()
    ageElement = (
        <span>
            <form>
                <input type="input" placeholder={age} onChange={(e)=> {
                    age = e.target.value.trim()
                }}onBlur = {()=> {
                    displayNameElement()
                    displayGenderElement()
                    displayWeightElement()
                }}/><button onClick={(e)=> {
                    e.preventDefault()
                    if (age.length > 0 && !isNaN(age) && age > 12 && age < 110) {
                        person.age = Math.round(age)
                        localStorage.setItem('person', JSON.stringify(person))
                        displayAgeElement()
                    } else {
                        person.age = 25
                        localStorage.setItem('person', JSON.stringify(person))
                        displayAgeElement()
                    }
                }}>Change</button>
            </form>
        </span>
    )
    addList()
    renderApp()
}



//
//
// Displays gender from default and after selection
//
//




let displayGenderElement = ()=> {
    genderElement = (
        <span class="person" onClick={()=>{inputGenderElement()}}>{person.gender}</span>
    )
    addList()
    renderApp()
}


let inputGenderElement = ()=> {
    displayNameElement()
    displayAgeElement()
    displayWeightElement()
    genderElement = (
        <span>
            <select onChange={(e)=> {
                if (e.target.value == 'male') {
                    person.gender = 'male'
                    localStorage.setItem('person', JSON.stringify(person))
                    displayGenderElement()
                } else if (e.target.value == 'female') {
                    person.gender = 'female'
                    localStorage.setItem('person', JSON.stringify(person))
                    displayGenderElement()
                }
            }}onBlur = {()=> {
                displayNameElement()
                displayAgeElement()
                displayWeightElement()
            }}>
                <option selected>Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </span>
    )
    addList()
    renderApp()
}


//
//
// Displays weight from default and after input
//
//


let displayWeightElement = ()=> {
    weightElement = (
        <span class="person" onClick={()=>{inputWeightElement()}}>{person.weight}</span>  
    )
    addList()
    renderApp()
}

let inputWeightElement = ()=> {
    let weight = person.weight
    displayNameElement()
    displayAgeElement()
    displayGenderElement()
    weightElement = (
        <span>
            <form>
                <input placeholder={weight} onChange={(e)=> {
                    weight = e.target.value.trim()
                }}onBlur = {()=> {
                    displayNameElement()
                    displayAgeElement()
                    displayGenderElement()
                }}/><button onClick={(e)=> {
                    e.preventDefault()
                    if (weight.length > 0 && !isNaN(weight) && weight > 70 && weight < 400) {
                        person.weight = Math.round(weight)
                        localStorage.setItem('person', JSON.stringify(person))
                        displayWeightElement()
                    } else {
                        person.weight = 140
                        localStorage.setItem('person', JSON.stringify(person))
                        displayWeightElement()
                    }
                }}>Change</button>
                </form>
        </span>
    )
    addList()
    renderApp()
}





//
//
// Adds a workout from input
//
//





let addWorkout = ()=> {
    let workout = ''
    let duration = '5'
    let bpm = 'medium'
    addWorkoutElement = (
        <div id="add-bar">
            <form>
                <span>
                    <input type="input" placeholder="Add a workout" onChange={(e)=> {
                        if (e.target.value.length < 20) {
                            workout = e.target.value.trim().toLowerCase()
                            workout = workout.charAt(0).toUpperCase() + workout.slice(1)
                        } else {
                            e.target.value = 'Too long   :(     '
                        }
                    }} onFocus={(e)=> {
                        workout = ''
                        e.target.value = ''
                        }}/>
                    <select onChange={(e)=> {
                        bpm = e.target.value
                    }}>
                        <option value = "medium">Medium Intensity</option>
                        <option value = "high">High Intensity</option>
                    </select>
                    <select onChange={(e)=> {
                        duration = e.target.value
                    }}>
                        <option value = "5">5 minutes</option>
                        <option value = "10">10 minutes</option>
                        <option value = "15">15 minutes</option>
                        <option value = "20">20 minutes</option>
                        <option value = "25">25 minutes</option>
                        <option value = "30">30 minutes</option>
                        <option value = "35">35 minutes</option>
                        <option value = "40">40 minutes</option>
                        <option value = "45">45 minutes</option>
                        <option value = "50">50 minutes</option>
                        <option value = "55">55 minutes</option>
                        <option value = "60">60 minutes</option>
                    </select>
                    <button onClick={(e)=> {
                        e.preventDefault()
                        if(workout.length > 0 && workout.length < 20) {
                            workouts.push(new Exercise(uuidv4(), workout, duration, bpm))
                            localStorage.setItem('workouts', JSON.stringify(workouts)) 
                            addList()
                            console.log(workouts)
                        }
                    }}>Add</button>
                </span>
            </form>
        </div>
    )
}


//
//
// Remove all button if list exists
//
//

let displayRemoveButton = () => {
    if (workouts.length > 0) {
        return (<div id="remove"><button onClick={()=> {
            localStorage.clear()
            workouts = []
            addList()
        }}>Remove All</button></div>)
    } else {
        return null
    }
}



//
//
// Remove a workout from array and list
//
//



let removeWorkout = (id)=> {
    let index = workouts.findIndex((item)=> item.id == id)
    workouts.splice(index, 1)
    localStorage.setItem('workouts', JSON.stringify(workouts))
    addList() 
}


//
//
// Figure out calorie count for each workout
// Formula taken from: "http://fitnowtraining.com/2012/01/formula-for-calories-burned/"
// and here: "http://www.calories-calculator.net/Calculator_Formulars.html"
//
// I think this formula is off somehow as it shows females burning more calories than males
// for the same workout, so i've take the male formula and added a .75 modifier for the females.
//
//



let calorieCount = (item)=> {
    let count = 0
    let a = .2017
    let b = .09036
    let c = .6309
    let d = 55.0969
    let e = 0
    let hr = 0
    if(person.gender == 'male') {
        e = 1
    } else if (person.gender == 'female') {
        e = .75
    }
    if (item.bpm == 'medium') {
        hr = Math.floor((220 - person.age) * .6)
    } else if (item.bpm == 'high') {
        hr = Math.floor((220 - person.age) * .775)   
    }
    count = (((person.age * a)-(person.weight * b) + (hr * c) - d) * item.duration/4.184) * e
    item.calories = Math.abs(Math.floor(count))
    return Math.abs(Math.floor(count))
}



//
//
// Populate DOM with workouts
//
//



let addList = () => {
    calorieElement = 0
    displayListElement = workouts.map((item)=> {
        calorieElement = calorieElement + calorieCount(item)
        return (
        <div class="workout">
            <span class="sentence">{item.workout} for {item.duration} minutes at {item.bpm} intensity.</span>
            <span class="calories">{calorieCount(item) + " "} 
                <button onClick={()=>{
                    removeWorkout(item.id)
                }}>X</button></span>
        </div>
        )}
        
    )
    displayRemoveButton()
    renderApp()
}



//
//
// Main React binding
//
//





let renderApp = ()=> {
    let app = (
        <div>





        <div id="header">Workout Tracker</div>

        <div id="person-info">
        <div>Hi! {nameElement}, you are a {ageElement} year old {genderElement} that weighs {weightElement} pounds.</div>
            <div>You should be aiming for <span class="info">{Math.ceil((220 - person.age)* .5)} - {Math.ceil((220 - person.age) * .85)}</span> BPM during your workouts.</div>
            <div>You've burned <span class="info">{calorieElement}</span> calories.</div>
        </div>
        <div id="workouts">
            {displayRemoveButton()}
            {displayListElement}
            {addWorkoutElement}
        </div>
        





        </div>
    )
    ReactDOM.render(app, appRoot)
}


addWorkout()
displayNameElement()
displayAgeElement()
displayGenderElement()
displayWeightElement()
displayRemoveButton()
renderApp()




