"use strict";
exports.__esModule = true;
exports.validateOption = exports.validateData = exports.Data = void 0;
var Data = (function () {
    function Data(info) {
        this.contentOpen = false;
        this.contentPosition = 'below';
        this.isOnChangeEnabled = true;
        this.main = info.main;
        this.searchValue = '';
        this.data = [];
        this.filtered = null;
        this.parseSelectData();
        this.setSelectedFromSelect();
    }
    Data.prototype.newOption = function (info) {
        return {
            id: (info.id ? info.id : String(Math.floor(Math.random() * 100000000))),
            value: (info.value ? info.value : ''),
            text: (info.text ? info.text : ''),
            innerHTML: (info.innerHTML ? info.innerHTML : ''),
            selected: (info.selected ? info.selected : false),
            display: (info.display !== undefined ? info.display : true),
            disabled: (info.disabled ? info.disabled : false),
            placeholder: (info.placeholder ? info.placeholder : false),
            "class": (info["class"] ? info["class"] : undefined),
            data: (info.data ? info.data : {}),
            mandatory: (info.mandatory ? info.mandatory : false)
        };
    };
    Data.prototype.add = function (data) {
        this.data.push({
            id: String(Math.floor(Math.random() * 100000000)),
            value: data.value,
            text: data.text,
            innerHTML: '',
            selected: false,
            display: true,
            disabled: false,
            placeholder: false,
            "class": undefined,
            mandatory: data.mandatory,
            data: {}
        });
    };
    Data.prototype.parseSelectData = function () {
        this.data = [];
        var nodes = this.main.select.element.childNodes;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var n = nodes_1[_i];
            if (n.nodeName === 'OPTGROUP') {
                var node = n;
                var optgroup = {
                    label: node.label,
                    options: []
                };
                var options = n.childNodes;
                for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
                    var o = options_1[_a];
                    if (o.nodeName === 'OPTION') {
                        var option = this.pullOptionData(o);
                        optgroup.options.push(option);
                        if (option.placeholder && option.text.trim() !== '') {
                            this.main.config.placeholderText = option.text;
                        }
                    }
                }
                this.data.push(optgroup);
            }
            else if (n.nodeName === 'OPTION') {
                var option = this.pullOptionData(n);
                this.data.push(option);
                if (option.placeholder && option.text.trim() !== '') {
                    this.main.config.placeholderText = option.text;
                }
            }
        }
    };
    Data.prototype.pullOptionData = function (option) {
        return {
            id: (option.dataset ? option.dataset.id : false) || String(Math.floor(Math.random() * 100000000)),
            value: option.value,
            text: option.text,
            innerHTML: option.innerHTML,
            selected: option.selected,
            disabled: option.disabled,
            placeholder: option.dataset.placeholder === 'true',
            "class": option.className,
            style: option.style.cssText,
            data: option.dataset,
            mandatory: (option.dataset ? option.dataset.mandatory === 'true' : false)
        };
    };
    Data.prototype.setSelectedFromSelect = function () {
        if (this.main.config.isMultiple) {
            var options = this.main.select.element.options;
            var newSelected = [];
            for (var _i = 0, options_2 = options; _i < options_2.length; _i++) {
                var o = options_2[_i];
                if (o.selected) {
                    var newOption = this.getObjectFromData(o.value, 'value');
                    if (newOption && newOption.id) {
                        newSelected.push(newOption.id);
                    }
                }
            }
            this.setSelected(newSelected, 'id');
        }
        else {
            var element = this.main.select.element;
            if (element.selectedIndex !== -1) {
                var option = element.options[element.selectedIndex];
                var value = option.value;
                this.setSelected(value, 'value');
            }
        }
    };
    Data.prototype.setSelected = function (value, type) {
        if (type === void 0) { type = 'id'; }
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var d = _a[_i];
            if (d.hasOwnProperty('label')) {
                if (d.hasOwnProperty('options')) {
                    var options = d.options;
                    if (options) {
                        for (var _b = 0, options_3 = options; _b < options_3.length; _b++) {
                            var o = options_3[_b];
                            if (o.placeholder) {
                                continue;
                            }
                            o.selected = this.shouldBeSelected(o, value, type);
                        }
                    }
                }
            }
            else {
                d.selected = this.shouldBeSelected(d, value, type);
            }
        }
    };
    Data.prototype.shouldBeSelected = function (option, value, type) {
        if (type === void 0) { type = 'id'; }
        if (Array.isArray(value)) {
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var v = value_1[_i];
                if (type in option && String(option[type]) === String(v)) {
                    return true;
                }
            }
        }
        else {
            if (type in option && String(option[type]) === String(value)) {
                return true;
            }
        }
        return false;
    };
    Data.prototype.getSelected = function () {
        var value = { text: '', placeholder: this.main.config.placeholderText };
        var values = [];
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var d = _a[_i];
            if (d.hasOwnProperty('label')) {
                if (d.hasOwnProperty('options')) {
                    var options = d.options;
                    if (options) {
                        for (var _b = 0, options_4 = options; _b < options_4.length; _b++) {
                            var o = options_4[_b];
                            if (o.selected) {
                                if (!this.main.config.isMultiple) {
                                    value = o;
                                }
                                else {
                                    values.push(o);
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (d.selected) {
                    if (!this.main.config.isMultiple) {
                        value = d;
                    }
                    else {
                        values.push(d);
                    }
                }
            }
        }
        if (this.main.config.isMultiple) {
            return values;
        }
        return value;
    };
    Data.prototype.addToSelected = function (value, type) {
        if (type === void 0) { type = 'id'; }
        if (this.main.config.isMultiple) {
            var values = [];
            var selected = this.getSelected();
            if (Array.isArray(selected)) {
                for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
                    var s = selected_1[_i];
                    values.push(s[type]);
                }
            }
            values.push(value);
            this.setSelected(values, type);
        }
    };
    Data.prototype.removeFromSelected = function (value, type) {
        if (type === void 0) { type = 'id'; }
        if (this.main.config.isMultiple) {
            var values = [];
            var selected = this.getSelected();
            for (var _i = 0, selected_2 = selected; _i < selected_2.length; _i++) {
                var s = selected_2[_i];
                if (String(s[type]) !== String(value)) {
                    values.push(s[type]);
                }
            }
            this.setSelected(values, type);
        }
    };
    Data.prototype.onDataChange = function () {
        if (this.main.onChange && this.isOnChangeEnabled) {
            this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())));
        }
    };
    Data.prototype.getObjectFromData = function (value, type) {
        if (type === void 0) { type = 'id'; }
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var d = _a[_i];
            if (type in d && String(d[type]) === String(value)) {
                return d;
            }
            if (d.hasOwnProperty('options')) {
                var optgroupObject = d;
                if (optgroupObject.options) {
                    for (var _b = 0, _c = optgroupObject.options; _b < _c.length; _b++) {
                        var oo = _c[_b];
                        if (String(oo[type]) === String(value)) {
                            return oo;
                        }
                    }
                }
            }
        }
        return null;
    };
    Data.prototype.search = function (search) {
        this.searchValue = search;
        if (search.trim() === '') {
            this.filtered = null;
            return;
        }
        var searchFilter = this.main.config.searchFilter;
        var valuesArray = this.data.slice(0);
        search = search.trim();
        var filtered = valuesArray.map(function (obj) {
            if (obj.hasOwnProperty('options')) {
                var optgroupObj = obj;
                var options = [];
                if (optgroupObj.options) {
                    options = optgroupObj.options.filter(function (opt) {
                        return searchFilter(opt, search);
                    });
                }
                if (options.length !== 0) {
                    var optgroup = Object.assign({}, optgroupObj);
                    optgroup.options = options;
                    return optgroup;
                }
            }
            if (obj.hasOwnProperty('text')) {
                var optionObj = obj;
                if (searchFilter(optionObj, search)) {
                    return obj;
                }
            }
            return null;
        });
        this.filtered = filtered.filter(function (info) { return info; });
    };
    return Data;
}());
exports.Data = Data;
function validateData(data) {
    if (!data) {
        console.error('Data must be an array of objects');
        return false;
    }
    var isValid = false;
    var errorCount = 0;
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var d = data_1[_i];
        if (d.hasOwnProperty('label')) {
            if (d.hasOwnProperty('options')) {
                var optgroup = d;
                var options = optgroup.options;
                if (options) {
                    for (var _a = 0, options_5 = options; _a < options_5.length; _a++) {
                        var o = options_5[_a];
                        isValid = validateOption(o);
                        if (!isValid) {
                            errorCount++;
                        }
                    }
                }
            }
        }
        else {
            var option = d;
            isValid = validateOption(option);
            if (!isValid) {
                errorCount++;
            }
        }
    }
    return errorCount === 0;
}
exports.validateData = validateData;
function validateOption(option) {
    if (option.text === undefined) {
        console.error('Data object option must have at least have a text value. Check object: ' + JSON.stringify(option));
        return false;
    }
    return true;
}
exports.validateOption = validateOption;
