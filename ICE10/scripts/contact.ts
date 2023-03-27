namespace core {
    export class Contact {
        //private instance members
        private m_name: string
        private m_contactNumber: string
        private m_emailAddress: string

        // Constructor
        constructor(name: string, contactNumber: string, emailAddress: string) {
            this.m_name = name
            this.m_contactNumber = contactNumber
            this.m_emailAddress = emailAddress
        }
    
        // Getters and Setters
        public get Name(): string {
            return this.m_name
        }
        public set Name(name: string) {
            this.m_name = name
        }
    
        public get ContactNumber(): string {
            return this.m_contactNumber
        }
        public set ContactNumber(contactNumber: string) {
            this.m_contactNumber = contactNumber
        }
    
        public get EmailAddress(): string {
            return this.m_emailAddress
        }
        public set EmailAddress(emailAddress: string) {
            this.m_emailAddress = emailAddress
        }
    
        // Public Utility Method
    
        // Serialize Method
        serialize(): string | null {
            if (this.Name !== "" && this.ContactNumber !== "" && this.EmailAddress !== "")
                return `${ this.Name }, ${ this.ContactNumber }, ${ this.EmailAddress }`
            console.error("One or more properties or fields of the Contact Object are missing or invalid!")
            return null
        }
    
        // Deserialize Method
        deserialize(data: string) {
            let propertyArray = data.split(",")
            this.Name = propertyArray[0]
            this.ContactNumber = propertyArray[1]
            this.EmailAddress = propertyArray[2]
        }
    
        // Public Override Method
        toString(): string {
            return `Full Name is ${ this.Name }\nContact Information is ${ this.ContactNumber }\nEmail Address is ${ this.EmailAddress }`
        }
    }

}