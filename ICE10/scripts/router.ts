namespace core{
    export class Router {
        // private instance variables
        private m_activeLink: string
        private m_linkData: string
        private m_routingTable: string[]

        // public properties: get and set
        /**
         * @returns {string}
         */
        public get ActiveLink(): string {
            return this.m_activeLink
        }

        /**
         * @params {string} link
         */
        public set ActiveLink(link: string) {
            this.m_activeLink = link
        }

        /**
         * @returns {string}
         */
        public get LinkData(): string {
            return this.m_linkData
        }

        /**
         * @params {string} link
         */
        public set LinkData(data: string) {
            this.m_linkData = data
        }

        /**
         * Creates an instance of Router.
         * 
         * @constructor
         */
        constructor() {
            this.m_activeLink = ""
            this.m_linkData = ""
            this.m_routingTable = [] // new Array<string>()
        }

        // public methods - paths for methods
        /**
         * This method adds a new route to the Routing Table
         *
         * @param {string[]} route
         * @returns {void}
         */
        Add(route: string): void {
            this.m_routingTable.push(route)
        }

        /**
         * This method replaces the reference for the Routing Table with
         * a new one
         * Note: Routes should begin with a '/' character
         *
         * @param {string} routingTable
         * @returns {void}
         */
        AddRoutingTable(routingTable: string[]): void {
            this.m_routingTable = routingTable
        }

        /**
         * This method finds and returns the index of the route in 
         * the Routing Table
         *
         * @param {string} route
         * @returns {number} 
         */
        Find(route: string): number {
            return this.m_routingTable.indexOf(route)
        }

        /**
         * This method removes a route from the Routing Table
         * It returns true if the route is removed, otherwise
         * it returns -1
         * 
         * @param {string} route 
         * @returns {boolean}
         */
        Remove(route: string): boolean {
            // if route is found
            if (this.Find(route) > -1) {
                // remove the route
                this.m_routingTable.splice(this.Find(route), 1)
                return true
            }
            return false
        }

        // public override methods
        /**
         * This method overrides the built-in toString method and
         * returns the Routing Table in a comma-separated string
         * @returns {string}
         */
        toString(): string {
            return this.m_routingTable.toString()
        }
    }
}

let router: core.Router = new core.Router()

router.AddRoutingTable([
    "/",                // default route
    "/home",            // home page route
    "/about",           // about page route
    "/services",        // services page route
    "/contact",         // contact page route
    "/contact-list",    // contact-list page route
    "/projects",        // projects page route
    "/register",        // register page route
    "/login",           // login page route
    "/edit"             // edit page route
])

// window.history.pushState('', '', '/')
let route: string = location.pathname // alias for location.pathname

// if route is found in the Routing Table
// variable = (if condition) ? (if condition is true) : (else false)
router.ActiveLink = (router.Find(route) > -1) ? (route == "/") ? "home" : route.substring(1) : "404"