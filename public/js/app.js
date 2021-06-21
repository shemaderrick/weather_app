
const form = document.querySelector('form')
const input = document.querySelector('input')
const info1 = document.getElementById('messageone')
const info2 = document.getElementById('messagetwo')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  info1.textContent = "Loading"
  info2.textContent = ""
  fetch(`http://localhost:3000/forecast?address=${input.value}`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          info1.textContent = data.error

        }
        else
          info1.textContent = ` ${data.forecast} in ${data.place} and the temperature is ${data.temperature} degrees`

        console.log(data)


      })

    })

})