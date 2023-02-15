(function () {

    function DisplayHome() {
        $("#RandomButton").on("click", function() {
            location.href = 'contact.html'
        })

        // concatenation - '1' + '2' + '3'
        // interpolation - `${var_1}`
        let firstString = "This is a "
        let secondString = `${ firstString } main paragraph that we added through javascript and this is also on GitHub Pages`

        $("main").addClass("container").append(`<p id="MainParagraph" class="mt-3 container">${ secondString }</p>`)
    }

    function DisplayProjects() {
        console.log("Projects Page")
    }

    function DisplayContacts() {
        console.log("Contact Us Page")

        let submitButton = document.getElementById("submitButton")
        let subscribeCheckbox = document.getElementById("subscribeCheckbox")

        // localStorage Example
        // localStorage.setItem("Random Variable", "random variable for testing and demonstration")
        // console.log(localStorage.getItem("Random Variable"))
        // localStorage.removeItem("Random Variable")

        submitButton.addEventListener("click", function() {
            // event.preventDefault()
            if (subscribeCheckbox.checked) {
                // If user subscribes, store the contact in localStorage
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value)
                if (contact.serialize()) {
                    let key = contact.Name.substring(0, 1) + Date.now()
                    localStorage.setItem(key, contact.serialize())
                }
            }
        })
    }

    function DisplayContactList() {
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList") // Our contact list in the table of the contact-list page

            let data = "" // Add data to this variable. Append deserialized data from localStorage to data
            let keys = Object.keys(localStorage) // Return a String Array of keys

            let index = 1 // Count number of keys

            // for every key in the keys collection
            for (const key of keys) {
                let contactData = localStorage.getItem(key) // Get localStorage data value related to the key
                let contact = new Contact()
                
                contact.deserialize(contactData)

                // Inject repeatable row into the contactList
                data += `<tr>
                    <th scope="row" class="text-center">${ index }</th>
                    <td class="text-center">${ contact.Name }</td>
                    <td class="text-center">${ contact.ContactNumber }</td>
                    <td class="text-center">${ contact.EmailAddress }</td>
                    <td class="text-center"><button value="" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
                    <td class="text-center"><button value="" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
                </tr>
                `
                
                index++
            }

            contactList.innerHTML = data
        }
    }

    function DisplayReferences() {
        console.log("References Page")
    }
    
    function Start() {
        console.log("App Started Successfully!")

        switch (document.title) {
            case "Home - WEBD6201 Demo":
                DisplayHome()
                break
            case "Projects - WEBD6201 Demo":
                DisplayProjects()
                break
            case "Contact Us - WEBD6201 Demo":
                DisplayContacts()
                break
            case "Contact List - WEBD6201 Demo":
                DisplayContactList()
                break
            case "References - WEBD6201 Demo":
                DisplayReferences()
                break
        }
    }

    window.addEventListener("load", Start)
})()