class Contact {

    // Constructor
    constructor(name, contactNumber, emailAddress) {
        this.Name = name
        this.ContactNumber = contactNumber
        this.EmailAddress = emailAddress
    }

    // Getters and Setters
    get Name() {
        return this.m_name
    }
    set Name(name) {
        this.m_name = name
    }

    get ContactNumber() {
        return this.m_contactNumber
    }
    set ContactNumber(contactNumber) {
        this.m_contactNumber = contactNumber
    }

    get EmailAddress() {
        return this.m_emailAddress
    }
    set EmailAddress(emailAddress) {
        this.m_emailAddress = emailAddress
    }

    // Public Utility Method

    // Serialize Method
    serialize() {
        if (this.Name !== "" && this.ContactNumber !== "" && this.EmailAddress !== "")
            return `${ this.Name }, ${ this.ContactNumber }, ${ this.EmailAddress }`
        console.error("One or more properties or fields of the Contact Object are missing or invalid!")
        return null
    }

    // Deserialize Method
    deserialize(data) {
        let propertyArray = data.split(",")
        this.Name = propertyArray[0]
        this.ContactNumber = propertyArray[1]
        this.EmailAddress = propertyArray[2]
    }

    // Public Override Method
    toString() {
        return `Full Name is ${ this.Name }\nContact Information is ${ this.ContactNumber }\nEmail Address is ${ this.EmailAddress }`
    }
}