"use strict";
(function () {
    function AuthGuard() {
        let protectedRoutes = [
            'contact-list'
        ];
        if (protectedRoutes.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = 'login';
            }
        }
    }
    function LoadLink(link, data = "") {
        router.ActiveLink = link;
        AuthGuard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        document.title = router.ActiveLink.substring(0, 1).toUpperCase() + router.ActiveLink.substring(1);
        $('ul>li>a').each(function () {
            $(this).removeClass('active');
        });
        $(`li>a:contains(${document.title})`).addClass('active');
        LoadContent();
    }
    function AddNavigationEvents() {
        let navLinks = $('ul>li>a');
        navLinks.off('click');
        navLinks.off('mouseover');
        navLinks.on('click', function () {
            LoadLink($(this).attr('data'));
        });
        navLinks.on('mouseover', function () {
            $(this).css('cursor', 'pointer');
        });
    }
    function AddLinkEvents(link) {
        let linkQuery = $(`a.link[data=${link}]`);
        linkQuery.off('click');
        linkQuery.off('mouseover');
        linkQuery.off('mouseout');
        linkQuery.css('text-decoration', 'underline');
        linkQuery.css('color', 'blue');
        linkQuery.on('click', function () {
            LoadLink(`${link}`);
        });
        linkQuery.on('mouseover', function () {
            $(this).css('cursor', 'pointer');
            $(this).css('font-weight', 'bold');
        });
        linkQuery.on('mouseout', function () {
            $(this).css('font-weight', 'normal');
        });
    }
    function LoadHeader() {
        $.get('./Views/components/header.html', function (html_data) {
            $('#navigationBar').html(html_data);
            AddNavigationEvents();
            CheckLogin();
        });
        return new Function();
    }
    function LoadContent() {
        let pageName = router.ActiveLink;
        console.log(pageName);
        $.get(`./Views/content/${pageName}.html`, function (html_data) {
            $('main').html(html_data);
            CheckLogin();
            ActiveLinkCallBack();
        });
        return new Function();
    }
    function LoadFooter() {
        $.get('./Views/components/footer.html', function (html_data) {
            $('footer').html(html_data);
        });
        return new Function();
    }
    function DisplayHome() {
        $("#RandomButton").on("click", function () {
            location.href = '/contact';
        });
        let firstString = "This is a ";
        let secondString = `${firstString} main paragraph that we added through javascript and this is also on GitHub Pages`;
        $("main").addClass("container").append(`<p id="MainParagraph" class="mt-3 container">${secondString}</p>`);
        return new Function();
    }
    function DisplayProjects() {
        console.log("Projects Page");
        return new Function();
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.Name.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function ValidateInput(inputFieldID, regularExpression, exception) {
        let messageArea = $('#messageArea').hide();
        $('#' + inputFieldID).on("blur", function () {
            let inputText = $(this).val();
            if (!regularExpression.test(inputText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(exception).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidate() {
        let emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-][\D]{2,10}$/g;
        let fullNamePattern = /^([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,25}))*(\s|-|,)*([A-Z][a-z]{1,25})*$/g;
        ValidateInput("fullName", fullNamePattern, "Please enter a valid Full name which means a capitalized first name and capitalized last name");
        ValidateInput("emailAddress", emailAddressPattern, "Please enter a valid Email Address");
    }
    function DisplayContacts() {
        console.log("Contact Us Page");
        $('a[data="contact-list"]').off('click');
        $('a[data="contact-list"]').on('click', function () {
            LoadLink('contact-list');
        });
        ContactFormValidate();
        let submitButton = document.getElementById("submitButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        submitButton.addEventListener("click", function () {
            if (subscribeCheckbox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                let contact = new core.Contact(fullName, contactNumber, emailAddress);
                if (contact.serialize()) {
                    let key = contact.Name.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
        return new Function();
    }
    function DisplayContactList() {
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact("", "", "");
                contact.deserialize(contactData);
                data += `<tr>
                    <th scope="row" class="text-center">${index}</th>
                    <td class="text-center">${contact.Name}</td>
                    <td class="text-center">${contact.ContactNumber}</td>
                    <td class="text-center">${contact.EmailAddress}</td>
                    <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
                    <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
                </tr>
                `;
                index++;
            }
            contactList.innerHTML = data;
            $("button.delete").on("click", function () {
                if (confirm("Are you sure you want to delete this?"))
                    localStorage.removeItem($(this).val());
                LoadLink('contact-list');
            });
            $("button.edit").on("click", function () {
                LoadLink('edit', $(this).val());
            });
        }
        $("#addButton").on("click", () => {
            LoadLink('edit', 'Add');
        });
        return new Function();
    }
    function DisplayEditPage() {
        ContactFormValidate();
        let page = router.LinkData;
        switch (page) {
            case "Add":
                {
                    $("#welcome").text("WEBD6201 Demo Add Contact");
                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        let fullName = document.forms[0].fullName.value;
                        let contactNumber = document.forms[0].contactNumber.value;
                        let emailAddress = document.forms[0].emailAddress.value;
                        AddContact(fullName, contactNumber, emailAddress);
                        LoadLink('contact-list');
                    });
                }
                break;
            default:
                {
                    let contact = new core.Contact("", "", "");
                    contact.deserialize(localStorage.getItem(page));
                    $("#fullName").val(contact.Name);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        contact.Name = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();
                        localStorage.setItem(page, contact.serialize());
                        LoadLink('contact-list');
                    });
                    $("#resetButton").on("click", () => {
                        LoadLink('contact-list');
                    });
                }
                break;
        }
        return new Function();
    }
    function DisplayReferences() {
        console.log("References Page");
        return new Function();
    }
    function DisplayLoginPage() {
        console.log("Login Page");
        let messageArea = $('#messageArea');
        messageArea.hide();
        AddLinkEvents('register');
        $('#loginButton').on('click', function () {
            let success = false;
            let newUser = new core.User();
            $.get('./Data/users.json', function (data) {
                for (const user of data.users) {
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;
                    if (username == user.Username && password == user.Password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem('user', newUser.serialize());
                    messageArea.removeAttr('class').hide();
                    LoadLink('contact-list');
                }
                else {
                    $('#username').trigger('focus').trigger('select');
                    messageArea.addClass('alert alert-danger').text('Error: Invalid Login Credentials.. Username/Password Mismatch').show();
                }
            });
        });
        $('#cancelButton').on('click', function () {
            document.forms[0].reset();
            LoadLink('home');
        });
        return new Function();
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $('#login').html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);
            $('#logout').on('click', function () {
                sessionStorage.clear();
                $('#login').html(`<a class="nav-link" data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`);
                AddNavigationEvents();
                LoadLink('login');
            });
        }
    }
    function DisplayRegisterPage() {
        console.log("Registration Page");
        AddLinkEvents('login');
        return new Function();
    }
    function Display404Page() {
        console.log("404 Page");
        return new Function();
    }
    function ActiveLinkCallBack() {
        console.log(`ActiveLinkCallBack - ${router.ActiveLink}`);
        switch (router.ActiveLink) {
            case "home": return DisplayHome();
            case "projects": return DisplayProjects();
            case "contact": return DisplayContacts();
            case "contact-list": return DisplayContactList();
            case "references": return DisplayReferences();
            case "edit": return DisplayEditPage();
            case "login": return DisplayLoginPage();
            case "register": return DisplayRegisterPage();
            case "404": return Display404Page();
            default:
                console.error(`Error: Callback does not Exist... ${router.ActiveLink}`);
                return new Function();
        }
    }
    function Start() {
        console.log("App Started Successfully!");
        LoadHeader();
        LoadLink("home");
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=main.js.map