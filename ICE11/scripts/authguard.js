"use strict";
(function () {
    let protectedRoutes = [
        'contact-list'
    ];
    if (protectedRoutes.indexOf(router.ActiveLink) > -1) {
        if (!sessionStorage.getItem("user")) {
            location.href = '/login';
        }
    }
})();
//# sourceMappingURL=authguard.js.map