System.register(['angular2/core', 'angular2/http', 'angular2/router', 'rxjs/add/operator/map', "../common/RestUrlUtil"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, RestUrlUtil_1;
    var IssuesService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {},
            function (RestUrlUtil_1_1) {
                RestUrlUtil_1 = RestUrlUtil_1_1;
            }],
        execute: function() {
            IssuesService = (function () {
                //private ws : WebSocket;
                function IssuesService(http, router) {
                    this.http = http;
                }
                IssuesService.prototype.getIssuesData = function (board) {
                    var path = RestUrlUtil_1.RestUrlUtil.caclulateRestUrl('rest/issues/' + board);
                    return this.http.get(path).map(function (res) { return res.json(); });
                };
                IssuesService.prototype.pollBoard = function (board, view) {
                    var path = RestUrlUtil_1.RestUrlUtil.caclulateRestUrl('rest/issues/' + board + "/updates/" + view);
                    return this.http.get(path).map(function (res) { return res.json(); });
                };
                IssuesService.prototype.moveIssue = function (boardName, issueKey, toState, insertBeforeIssueKey, insertAfterIssueKey) {
                    var payload = {
                        boardName: boardName,
                        issueKey: issueKey,
                        toState: toState,
                        afterIssue: insertAfterIssueKey,
                        beforeIssue: insertBeforeIssueKey
                    };
                    console.log("IssuesService - Initiating move " + new Date());
                    return this.http.post('rest/move-issue', JSON.stringify(payload))
                        .map(function (res) { return res.json(); });
                };
                IssuesService.prototype.getWebSocketUrl = function (board) {
                    var location = window.location;
                    var wsUrl = location.protocol === "https:" ? "wss://" : "ws://";
                    wsUrl += location.hostname;
                    if (location.port) {
                        wsUrl += ":" + location.port;
                    }
                    wsUrl += location.pathname;
                    wsUrl += "websocket/issuerefresh/";
                    wsUrl += board;
                    console.log("--> web socket url " + wsUrl);
                    return wsUrl;
                };
                IssuesService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], IssuesService);
                return IssuesService;
            })();
            exports_1("IssuesService", IssuesService);
        }
    }
});
//# sourceMappingURL=issuesService.js.map