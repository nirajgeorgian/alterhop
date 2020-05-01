"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var Text = antd_1.Typography.Text;
var icons_1 = require("@ant-design/icons");
var jobTags = {
    height: "24px",
    lineHeight: "24px",
    border: "none"
};
var Job = function (_a) {
    var item = _a.item, active = _a.active;
    return (react_1["default"].createElement(antd_1.Card, { style: {
            width: "100%",
            borderRadius: "16px",
            background: "#feffff",
            boxShadow: "10px 10px 30px #d8d9d9, -20px -20px 60px #ffffff"
        } },
        react_1["default"].createElement("div", { className: "left-active", hidden: !active, style: {
                display: "flex",
                position: "absolute",
                left: "0",
                top: "0",
                alignItems: "center",
                height: "100%"
            } },
            react_1["default"].createElement("span", { style: {
                    height: "60%",
                    width: "4px",
                    background: "blue",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px"
                } })),
        react_1["default"].createElement("div", { className: "right-active", hidden: !active, style: {
                display: "flex",
                position: "absolute",
                right: "0",
                top: "0",
                alignItems: "center",
                height: "100%"
            } },
            react_1["default"].createElement("span", { style: {
                    height: "60%",
                    width: "4px",
                    background: "blue",
                    borderTopLeftRadius: "20px",
                    borderBottomLeftRadius: "20px"
                } })),
        react_1["default"].createElement(antd_1.Row, null,
            react_1["default"].createElement(antd_1.Col, { span: 5 },
                react_1["default"].createElement("div", { style: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    } },
                    react_1["default"].createElement("img", { width: 64, alt: "logo", src: item.hiringOrganization.logo }),
                    react_1["default"].createElement(antd_1.Tag, { color: "green", style: __assign(__assign({}, jobTags), { marginTop: "16px", marginLeft: "0px" }) }, "94/100"))),
            react_1["default"].createElement(antd_1.Col, { span: 18, offset: 1 },
                react_1["default"].createElement(antd_1.Row, null,
                    react_1["default"].createElement("span", { style: { fontSize: "18px" } }, item.hiringOrganization.name),
                    react_1["default"].createElement(antd_1.Row, { style: { alignItems: "center" } },
                        react_1["default"].createElement(antd_1.Tag, { icon: react_1["default"].createElement(icons_1.HeartFilled, null), style: __assign(__assign({}, jobTags), { marginLeft: "8px" }), color: "processing" }, "New"))),
                react_1["default"].createElement(antd_1.Row, { style: { marginTop: "4px" } },
                    react_1["default"].createElement(Text, { strong: true, style: { fontSize: "18px" } }, item.title)),
                react_1["default"].createElement(antd_1.Row, null,
                    react_1["default"].createElement(antd_1.Col, { span: 14 },
                        react_1["default"].createElement(Text, { type: "secondary", style: { fontSize: "14px", marginTop: "8px" } },
                            " ",
                            item.jobLocation.address.addressRegion + item.jobLocation.address.addressLocality)),
                    react_1["default"].createElement(antd_1.Col, { span: 6, offset: 3 },
                        "90-100K ",
                        react_1["default"].createElement(Text, { type: "secondary" }, "USD"))),
                react_1["default"].createElement(antd_1.Row, null,
                    react_1["default"].createElement(antd_1.Col, { span: 14 },
                        react_1["default"].createElement(antd_1.Tag, { style: jobTags }, "C++"),
                        react_1["default"].createElement(antd_1.Tag, { style: jobTags }, "JavaScript"),
                        react_1["default"].createElement(antd_1.Tag, { style: jobTags }, "React"),
                        react_1["default"].createElement(antd_1.Tag, { style: jobTags }, "JS")),
                    react_1["default"].createElement(antd_1.Col, { span: 6, offset: 3 },
                        react_1["default"].createElement(Text, null, item.datePosted)))))));
};
exports["default"] = Job;
