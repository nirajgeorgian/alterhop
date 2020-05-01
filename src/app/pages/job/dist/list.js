"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var job_1 = require("../../../components/job");
var antd_2 = require("antd");
var react_infinite_scroller_1 = require("react-infinite-scroller");
// Dummy Data
var job = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": "Software Engineer",
    "description": "<p>Google aspires to be an organization that reflects the globally diverse audience that our products and technology serve. We believe that in addition to hiring the best talent, a diversity of perspectives, ideas and cultures leads to the creation of better products and services.</p>",
    "identifier": {
        "@type": "PropertyValue",
        "name": "Google",
        "value": "1234567"
    },
    "datePosted": "2017-01-18",
    "validThrough": "2017-03-18T00:00",
    "employmentType": "CONTRACTOR",
    "hiringOrganization": {
        "@type": "Organization",
        "name": "Google",
        "sameAs": "http://www.google.com",
        "logo": "https://naseem.js.org/static/projects/oyebooks.webp"
    },
    "jobLocation": {
        "@type": "Place",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "1600 Amphitheatre Pkwy",
            "addressLocality": ", Mountain View",
            "addressRegion": "CA",
            "postalCode": "94043",
            "addressCountry": "US"
        }
    },
    "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
            "@type": "QuantitativeValue",
            "value": 40.00,
            "unitText": "HOUR"
        }
    }
};
var listData = [job];
for (var i = 1; i < 25; i++) {
    listData.push(job);
}
var JobList = /** @class */ (function (_super) {
    __extends(JobList, _super);
    function JobList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            listData: listData,
            loading: false,
            hasMore: true,
            active: 0
        };
        _this.handleInfiniteOnLoad = function () {
            var listData = _this.state.listData;
            _this.setState({
                loading: true
            });
            // To check if all items are loaded
            // if (listData.length >= 23) {
            //     message.warning('Infinite List loaded all');
            //     this.setState({
            //         hasMore: false,
            //         loading: false,
            //     });
            //     return;
            // }
            // Do Data Fetching then setLoading false
            _this.setState({
                loading: false,
                hasMore: false
            });
        };
        _this.handleListItemClick = function (key) {
            _this.setState({
                active: key
            });
        };
        return _this;
    }
    JobList.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement("div", { style: {
                overflow: "auto",
                paddingRight: "24px",
                height: "600px"
            } },
            react_1["default"].createElement(react_infinite_scroller_1["default"], { initialLoad: false, pageStart: 0, loadMore: this.handleInfiniteOnLoad, hasMore: !this.state.loading && this.state.hasMore, useWindow: false },
                react_1["default"].createElement(antd_2.List, { itemLayout: "vertical", size: "default", dataSource: this.state.listData, renderItem: function (item, key) { return (react_1["default"].createElement(antd_2.List.Item, { onClick: function () { _this.handleListItemClick(key); }, defaultChecked: true, style: { padding: "4px 0" }, key: key },
                        react_1["default"].createElement(job_1["default"], { item: item, active: _this.state.active === key }))); } }, this.state.loading && this.state.hasMore && (react_1["default"].createElement("div", { className: "loading-container", style: {
                        position: "absolute",
                        bottom: "40px",
                        width: "100%",
                        textAlign: "center"
                    } },
                    react_1["default"].createElement(antd_1.Spin, null)))))));
    };
    return JobList;
}(react_1["default"].Component));
exports["default"] = JobList;
