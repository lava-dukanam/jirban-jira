System.register(['angular2/core', 'angular2/router', '../services/authenticationHelper'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, router_1, authenticationHelper_1;
    var LoggedInRouterOutlet;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authenticationHelper_1_1) {
                authenticationHelper_1 = authenticationHelper_1_1;
            }],
        execute: function() {
            LoggedInRouterOutlet = (function (_super) {
                __extends(LoggedInRouterOutlet, _super);
                function LoggedInRouterOutlet(_elementRef, _loader, _parentRouter, nameAttr) {
                    _super.call(this, _elementRef, _loader, _parentRouter, nameAttr);
                    this.parentRouter = _parentRouter;
                    this.publicRoutes = {
                        'login': true,
                        '': true,
                        'logout': true
                    };
                }
                LoggedInRouterOutlet.prototype.activate = function (instruction) {
                    //let url = this.parentRouter.lastNavigationAttempt;
                    var url = instruction.urlPath;
                    if (!this.publicRoutes[url] && !authenticationHelper_1.hasToken()) {
                        // todo: redirect to Login, may be there a better way?
                        console.log('RouterOutlet: Redirecting to login (' + url + ')');
                        this.parentRouter.navigateByUrl('/login');
                    }
                    console.log('RouterOutlet: Going to requested url: ' + url);
                    return _super.prototype.activate.call(this, instruction);
                };
                LoggedInRouterOutlet = __decorate([
                    core_1.Directive({
                        selector: 'router-outlet'
                    }),
                    __param(3, core_1.Attribute('name')), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader, router_1.Router, String])
                ], LoggedInRouterOutlet);
                return LoggedInRouterOutlet;
            })(router_1.RouterOutlet);
            exports_1("LoggedInRouterOutlet", LoggedInRouterOutlet);
        }
    }
});
//# sourceMappingURL=loggedInRouterOutlet.js.map