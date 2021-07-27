"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var select_1 = require("./select");
var slim_1 = require("./slim");
var data_1 = require("./data");
var helper_1 = require("./helper");
var SlimSelect = (function () {
    function SlimSelect(info) {
        var _this = this;
        this.ajax = null;
        this.addable = null;
        this.beforeOnChange = null;
        this.onChange = null;
        this.beforeOpen = null;
        this.afterOpen = null;
        this.beforeClose = null;
        this.afterClose = null;
        this.windowScroll = helper_1.debounce(function (e) {
            if (_this.data.contentOpen) {
                if (helper_1.putContent(_this.slim.content, _this.data.contentPosition, _this.data.contentOpen) === 'above') {
                    _this.moveContentAbove();
                }
                else {
                    _this.moveContentBelow();
                }
            }
        });
        this.documentClick = function (e) {
            if (e.target && !helper_1.hasClassInTree(e.target, _this.config.id)) {
                _this.close();
            }
        };
        var selectElement = this.validate(info);
        if (selectElement.dataset.ssid) {
            this.destroy(selectElement.dataset.ssid);
        }
        if (info.ajax) {
            this.ajax = info.ajax;
        }
        if (info.addable) {
            this.addable = info.addable;
        }
        this.config = new config_1.Config({
            select: selectElement,
            isAjax: (info.ajax ? true : false),
            showSearch: info.showSearch,
            searchPlaceholder: info.searchPlaceholder,
            searchText: info.searchText,
            searchingText: info.searchingText,
            searchFocus: info.searchFocus,
            searchHighlight: info.searchHighlight,
            searchFilter: info.searchFilter,
            closeOnSelect: info.closeOnSelect,
            showContent: info.showContent,
            placeholderText: info.placeholder,
            allowDeselect: info.allowDeselect,
            allowDeselectOption: info.allowDeselectOption,
            hideSelectedOption: info.hideSelectedOption,
            deselectLabel: info.deselectLabel,
            isEnabled: info.isEnabled,
            valuesUseText: info.valuesUseText,
            showOptionTooltips: info.showOptionTooltips,
            selectByGroup: info.selectByGroup,
            limit: info.limit,
            timeoutDelay: info.timeoutDelay,
            addToBody: info.addToBody
        });
        this.select = new select_1.Select({
            select: selectElement,
            main: this
        });
        this.data = new data_1.Data({ main: this });
        this.slim = new slim_1.Slim({ main: this });
        if (this.select.element.parentNode) {
            this.select.element.parentNode.insertBefore(this.slim.container, this.select.element.nextSibling);
        }
        if (info.data) {
            this.setData(info.data);
        }
        else {
            this.render();
        }
        document.addEventListener('click', this.documentClick);
        if (this.config.showContent === 'auto') {
            window.addEventListener('scroll', this.windowScroll, false);
        }
        if (info.beforeOnChange) {
            this.beforeOnChange = info.beforeOnChange;
        }
        if (info.onChange) {
            this.onChange = info.onChange;
        }
        if (info.beforeOpen) {
            this.beforeOpen = info.beforeOpen;
        }
        if (info.afterOpen) {
            this.afterOpen = info.afterOpen;
        }
        if (info.beforeClose) {
            this.beforeClose = info.beforeClose;
        }
        if (info.afterClose) {
            this.afterClose = info.afterClose;
        }
        if (!this.config.isEnabled) {
            this.disable();
        }
    }
    SlimSelect.prototype.validate = function (info) {
        var select = (typeof info.select === 'string' ? document.querySelector(info.select) : info.select);
        if (!select) {
            throw new Error('Could not find select element');
        }
        if (select.tagName !== 'SELECT') {
            throw new Error('Element isnt of type select');
        }
        return select;
    };
    SlimSelect.prototype.selected = function () {
        if (this.config.isMultiple) {
            var selected = this.data.getSelected();
            var outputSelected = [];
            for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
                var s = selected_1[_i];
                outputSelected.push(s.value);
            }
            return outputSelected;
        }
        else {
            var selected = this.data.getSelected();
            return (selected ? selected.value : '');
        }
    };
    SlimSelect.prototype.set = function (value, type, close, render) {
        if (type === void 0) { type = 'value'; }
        if (close === void 0) { close = true; }
        if (render === void 0) { render = true; }
        if (this.config.isMultiple && !Array.isArray(value)) {
            this.data.addToSelected(value, type);
        }
        else {
            this.data.setSelected(value, type);
        }
        this.select.setValue();
        this.data.onDataChange();
        this.render();
        if (close) {
            this.close();
        }
    };
    SlimSelect.prototype.setSelected = function (value, type, close, render) {
        if (type === void 0) { type = 'value'; }
        if (close === void 0) { close = true; }
        if (render === void 0) { render = true; }
        this.set(value, type, close, render);
    };
    SlimSelect.prototype.setData = function (data) {
        var isValid = data_1.validateData(data);
        if (!isValid) {
            console.error('Validation problem on: #' + this.select.element.id);
            return;
        }
        var newData = JSON.parse(JSON.stringify(data));
        var selected = this.data.getSelected();
        for (var i = 0; i < newData.length; i++) {
            if (!newData[i].value && !newData[i].placeholder) {
                newData[i].value = newData[i].text;
            }
        }
        if (this.config.isAjax && selected) {
            if (this.config.isMultiple) {
                var reverseSelected = selected.reverse();
                for (var _i = 0, reverseSelected_1 = reverseSelected; _i < reverseSelected_1.length; _i++) {
                    var r = reverseSelected_1[_i];
                    newData.unshift(r);
                }
            }
            else {
                newData.unshift(selected);
                for (var i = 0; i < newData.length; i++) {
                    if (!newData[i].placeholder && newData[i].value === selected.value && newData[i].text === selected.text) {
                        delete newData[i];
                    }
                }
                var hasPlaceholder = false;
                for (var i = 0; i < newData.length; i++) {
                    if (newData[i].placeholder) {
                        hasPlaceholder = true;
                    }
                }
                if (!hasPlaceholder) {
                    newData.unshift({ text: '', placeholder: true });
                }
            }
        }
        this.select.create(newData);
        this.data.parseSelectData();
        this.data.setSelectedFromSelect();
    };
    SlimSelect.prototype.addData = function (data) {
        var isValid = data_1.validateData([data]);
        if (!isValid) {
            console.error('Validation problem on: #' + this.select.element.id);
            return;
        }
        this.data.add(this.data.newOption(data));
        this.select.create(this.data.data);
        this.data.parseSelectData();
        this.data.setSelectedFromSelect();
        this.render();
    };
    SlimSelect.prototype.open = function () {
        var _this = this;
        if (!this.config.isEnabled) {
            return;
        }
        if (this.data.contentOpen) {
            return;
        }
        if (this.beforeOpen) {
            this.beforeOpen();
        }
        if (this.config.isMultiple && this.slim.multiSelected) {
            this.slim.multiSelected.plus.classList.add('ss-cross');
        }
        else if (this.slim.singleSelected) {
            this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-down');
            this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-up');
        }
        this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.add((this.data.contentPosition === 'above' ? this.config.openAbove : this.config.openBelow));
        if (this.config.addToBody) {
            var containerRect = this.slim.container.getBoundingClientRect();
            this.slim.content.style.top = (containerRect.top + containerRect.height + window.scrollY) + 'px';
            this.slim.content.style.left = (containerRect.left + window.scrollX) + 'px';
            this.slim.content.style.width = containerRect.width + 'px';
        }
        this.slim.content.classList.add(this.config.open);
        if (this.config.showContent.toLowerCase() === 'up') {
            this.moveContentAbove();
        }
        else if (this.config.showContent.toLowerCase() === 'down') {
            this.moveContentBelow();
        }
        else {
            if (helper_1.putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) === 'above') {
                this.moveContentAbove();
            }
            else {
                this.moveContentBelow();
            }
        }
        if (!this.config.isMultiple) {
            var selected = this.data.getSelected();
            if (selected) {
                var selectedId = selected.id;
                var selectedOption = this.slim.list.querySelector('[data-id="' + selectedId + '"]');
                if (selectedOption) {
                    helper_1.ensureElementInView(this.slim.list, selectedOption);
                }
            }
        }
        setTimeout(function () {
            _this.data.contentOpen = true;
            if (_this.config.searchFocus) {
                _this.slim.search.input.focus();
            }
            if (_this.afterOpen) {
                _this.afterOpen();
            }
        }, this.config.timeoutDelay);
    };
    SlimSelect.prototype.close = function () {
        var _this = this;
        if (!this.data.contentOpen) {
            return;
        }
        if (this.beforeClose) {
            this.beforeClose();
        }
        if (this.config.isMultiple && this.slim.multiSelected) {
            this.slim.multiSelected.container.classList.remove(this.config.openAbove);
            this.slim.multiSelected.container.classList.remove(this.config.openBelow);
            this.slim.multiSelected.plus.classList.remove('ss-cross');
        }
        else if (this.slim.singleSelected) {
            this.slim.singleSelected.container.classList.remove(this.config.openAbove);
            this.slim.singleSelected.container.classList.remove(this.config.openBelow);
            this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-down');
            this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-up');
        }
        this.slim.content.classList.remove(this.config.open);
        this.data.contentOpen = false;
        this.search('');
        setTimeout(function () {
            _this.slim.content.removeAttribute('style');
            _this.data.contentPosition = 'below';
            if (_this.config.isMultiple && _this.slim.multiSelected) {
                _this.slim.multiSelected.container.classList.remove(_this.config.openAbove);
                _this.slim.multiSelected.container.classList.remove(_this.config.openBelow);
            }
            else if (_this.slim.singleSelected) {
                _this.slim.singleSelected.container.classList.remove(_this.config.openAbove);
                _this.slim.singleSelected.container.classList.remove(_this.config.openBelow);
            }
            _this.slim.search.input.blur();
            if (_this.afterClose) {
                _this.afterClose();
            }
        }, this.config.timeoutDelay);
    };
    SlimSelect.prototype.moveContentAbove = function () {
        var selectHeight = 0;
        if (this.config.isMultiple && this.slim.multiSelected) {
            selectHeight = this.slim.multiSelected.container.offsetHeight;
        }
        else if (this.slim.singleSelected) {
            selectHeight = this.slim.singleSelected.container.offsetHeight;
        }
        var contentHeight = this.slim.content.offsetHeight;
        var height = selectHeight + contentHeight - 1;
        this.slim.content.style.margin = '-' + height + 'px 0 0 0';
        this.slim.content.style.height = (height - selectHeight + 1) + 'px';
        this.slim.content.style.transformOrigin = 'center bottom';
        this.data.contentPosition = 'above';
        if (this.config.isMultiple && this.slim.multiSelected) {
            this.slim.multiSelected.container.classList.remove(this.config.openBelow);
            this.slim.multiSelected.container.classList.add(this.config.openAbove);
        }
        else if (this.slim.singleSelected) {
            this.slim.singleSelected.container.classList.remove(this.config.openBelow);
            this.slim.singleSelected.container.classList.add(this.config.openAbove);
        }
    };
    SlimSelect.prototype.moveContentBelow = function () {
        this.data.contentPosition = 'below';
        if (this.config.isMultiple && this.slim.multiSelected) {
            this.slim.multiSelected.container.classList.remove(this.config.openAbove);
            this.slim.multiSelected.container.classList.add(this.config.openBelow);
        }
        else if (this.slim.singleSelected) {
            this.slim.singleSelected.container.classList.remove(this.config.openAbove);
            this.slim.singleSelected.container.classList.add(this.config.openBelow);
        }
    };
    SlimSelect.prototype.enable = function () {
        this.config.isEnabled = true;
        if (this.config.isMultiple && this.slim.multiSelected) {
            this.slim.multiSelected.container.classList.remove(this.config.disabled);
        }
        else if (this.slim.singleSelected) {
            this.slim.singleSelected.container.classList.remove(this.config.disabled);
        }
        this.select.triggerMutationObserver = false;
        this.select.element.disabled = false;
        this.slim.search.input.disabled = false;
        this.select.triggerMutationObserver = true;
    };
    SlimSelect.prototype.disable = function () {
        this.config.isEnabled = false;
        if (this.config.isMultiple && this.slim.multiSelected) {
            this.slim.multiSelected.container.classList.add(this.config.disabled);
        }
        else if (this.slim.singleSelected) {
            this.slim.singleSelected.container.classList.add(this.config.disabled);
        }
        this.select.triggerMutationObserver = false;
        this.select.element.disabled = true;
        this.slim.search.input.disabled = true;
        this.select.triggerMutationObserver = true;
    };
    SlimSelect.prototype.search = function (value) {
        if (this.data.searchValue === value) {
            return;
        }
        this.slim.search.input.value = value;
        if (this.config.isAjax) {
            var master_1 = this;
            this.config.isSearching = true;
            this.render();
            if (this.ajax) {
                this.ajax(value, function (info) {
                    master_1.config.isSearching = false;
                    if (Array.isArray(info)) {
                        info.unshift({ text: '', placeholder: true });
                        master_1.setData(info);
                        master_1.data.search(value);
                        master_1.render();
                    }
                    else if (typeof info === 'string') {
                        master_1.slim.options(info);
                    }
                    else {
                        master_1.render();
                    }
                });
            }
        }
        else {
            this.data.search(value);
            this.render();
        }
    };
    SlimSelect.prototype.setSearchText = function (text) {
        this.config.searchText = text;
    };
    SlimSelect.prototype.render = function () {
        if (this.config.isMultiple) {
            this.slim.values();
        }
        else {
            this.slim.placeholder();
            this.slim.deselect();
        }
        this.slim.options();
    };
    SlimSelect.prototype.destroy = function (id) {
        if (id === void 0) { id = null; }
        var slim = (id ? document.querySelector('.' + id + '.ss-main') : this.slim.container);
        var select = (id ? document.querySelector("[data-ssid=" + id + "]") : this.select.element);
        if (!slim || !select) {
            return;
        }
        document.removeEventListener('click', this.documentClick);
        if (this.config.showContent === 'auto') {
            window.removeEventListener('scroll', this.windowScroll, false);
        }
        select.style.display = '';
        delete select.dataset.ssid;
        var el = select;
        el.slim = null;
        if (slim.parentElement) {
            slim.parentElement.removeChild(slim);
        }
        if (this.config.addToBody) {
            var slimContent = (id ? document.querySelector('.' + id + '.ss-content') : this.slim.content);
            if (!slimContent) {
                return;
            }
            document.body.removeChild(slimContent);
        }
    };
    return SlimSelect;
}());
exports["default"] = SlimSelect;
