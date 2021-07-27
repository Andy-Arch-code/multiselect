"use strict";
exports.__esModule = true;
exports.Slim = void 0;
var helper_1 = require("./helper");
var data_1 = require("./data");
var Slim = (function () {
    function Slim(info) {
        this.main = info.main;
        this.container = this.containerDiv();
        this.content = this.contentDiv();
        this.search = this.searchDiv();
        this.list = this.listDiv();
        this.options();
        this.singleSelected = null;
        this.multiSelected = null;
        if (this.main.config.isMultiple) {
            this.multiSelected = this.multiSelectedDiv();
            if (this.multiSelected) {
                this.container.appendChild(this.multiSelected.container);
            }
        }
        else {
            this.singleSelected = this.singleSelectedDiv();
            this.container.appendChild(this.singleSelected.container);
        }
        if (this.main.config.addToBody) {
            this.content.classList.add(this.main.config.id);
            document.body.appendChild(this.content);
        }
        else {
            this.container.appendChild(this.content);
        }
        this.content.appendChild(this.search.container);
        this.content.appendChild(this.list);
    }
    Slim.prototype.containerDiv = function () {
        var container = document.createElement('div');
        container.style.cssText = this.main.config.style;
        this.updateContainerDivClass(container);
        return container;
    };
    Slim.prototype.updateContainerDivClass = function (container) {
        this.main.config["class"] = this.main.select.element.className.split(' ');
        container.className = '';
        container.classList.add(this.main.config.id);
        container.classList.add(this.main.config.main);
        for (var _i = 0, _a = this.main.config["class"]; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.trim() !== '') {
                container.classList.add(c);
            }
        }
    };
    Slim.prototype.singleSelectedDiv = function () {
        var _this = this;
        var container = document.createElement('div');
        container.classList.add(this.main.config.singleSelected);
        var placeholder = document.createElement('span');
        placeholder.classList.add('placeholder');
        container.appendChild(placeholder);
        var deselect = document.createElement('span');
        deselect.innerHTML = this.main.config.deselectLabel;
        deselect.classList.add('ss-deselect');
        deselect.onclick = function (e) {
            e.stopPropagation();
            if (!_this.main.config.isEnabled) {
                return;
            }
            _this.main.set('');
        };
        container.appendChild(deselect);
        var arrowContainer = document.createElement('span');
        arrowContainer.classList.add(this.main.config.arrow);
        var arrowIcon = document.createElement('span');
        arrowIcon.classList.add('arrow-down');
        arrowContainer.appendChild(arrowIcon);
        container.appendChild(arrowContainer);
        container.onclick = function () {
            if (!_this.main.config.isEnabled) {
                return;
            }
            _this.main.data.contentOpen ? _this.main.close() : _this.main.open();
        };
        return {
            container: container,
            placeholder: placeholder,
            deselect: deselect,
            arrowIcon: {
                container: arrowContainer,
                arrow: arrowIcon
            }
        };
    };
    Slim.prototype.placeholder = function () {
        var selected = this.main.data.getSelected();
        if (selected === null || (selected && selected.placeholder)) {
            var placeholder = document.createElement('span');
            placeholder.classList.add(this.main.config.disabled);
            placeholder.innerHTML = this.main.config.placeholderText;
            if (this.singleSelected) {
                this.singleSelected.placeholder.innerHTML = placeholder.outerHTML;
            }
        }
        else {
            var selectedValue = '';
            if (selected) {
                selectedValue = selected.innerHTML && this.main.config.valuesUseText !== true ? selected.innerHTML : selected.text;
            }
            if (this.singleSelected) {
                this.singleSelected.placeholder.innerHTML = (selected ? selectedValue : '');
            }
        }
    };
    Slim.prototype.deselect = function () {
        if (this.singleSelected) {
            if (!this.main.config.allowDeselect) {
                this.singleSelected.deselect.classList.add('ss-hide');
                return;
            }
            if (this.main.selected() === '') {
                this.singleSelected.deselect.classList.add('ss-hide');
            }
            else {
                this.singleSelected.deselect.classList.remove('ss-hide');
            }
        }
    };
    Slim.prototype.multiSelectedDiv = function () {
        var _this = this;
        var container = document.createElement('div');
        container.classList.add(this.main.config.multiSelected);
        var values = document.createElement('div');
        values.classList.add(this.main.config.values);
        container.appendChild(values);
        var add = document.createElement('div');
        add.classList.add(this.main.config.add);
        var plus = document.createElement('span');
        plus.classList.add(this.main.config.plus);
        plus.onclick = function (e) {
            if (_this.main.data.contentOpen) {
                _this.main.close();
                e.stopPropagation();
            }
        };
        add.appendChild(plus);
        container.appendChild(add);
        container.onclick = function (e) {
            if (!_this.main.config.isEnabled) {
                return;
            }
            var target = e.target;
            if (!target.classList.contains(_this.main.config.valueDelete)) {
                _this.main.data.contentOpen ? _this.main.close() : _this.main.open();
            }
        };
        return {
            container: container,
            values: values,
            add: add,
            plus: plus
        };
    };
    Slim.prototype.values = function () {
        if (!this.multiSelected) {
            return;
        }
        var currentNodes = this.multiSelected.values.childNodes;
        var selected = this.main.data.getSelected();
        var exists;
        var nodesToRemove = [];
        for (var _i = 0, currentNodes_1 = currentNodes; _i < currentNodes_1.length; _i++) {
            var c = currentNodes_1[_i];
            exists = true;
            for (var _a = 0, selected_1 = selected; _a < selected_1.length; _a++) {
                var s = selected_1[_a];
                if (String(s.id) === String(c.dataset.id)) {
                    exists = false;
                }
            }
            if (exists) {
                nodesToRemove.push(c);
            }
        }
        for (var _b = 0, nodesToRemove_1 = nodesToRemove; _b < nodesToRemove_1.length; _b++) {
            var n = nodesToRemove_1[_b];
            n.classList.add('ss-out');
            this.multiSelected.values.removeChild(n);
        }
        currentNodes = this.multiSelected.values.childNodes;
        for (var s = 0; s < selected.length; s++) {
            exists = false;
            for (var _c = 0, currentNodes_2 = currentNodes; _c < currentNodes_2.length; _c++) {
                var c = currentNodes_2[_c];
                if (String(selected[s].id) === String(c.dataset.id)) {
                    exists = true;
                }
            }
            if (!exists) {
                if (currentNodes.length === 0 || !HTMLElement.prototype.insertAdjacentElement) {
                    this.multiSelected.values.appendChild(this.valueDiv(selected[s]));
                }
                else if (s === 0) {
                    this.multiSelected.values.insertBefore(this.valueDiv(selected[s]), currentNodes[s]);
                }
                else {
                    currentNodes[s - 1].insertAdjacentElement('afterend', this.valueDiv(selected[s]));
                }
            }
        }
        if (selected.length === 0) {
            var placeholder = document.createElement('span');
            placeholder.classList.add(this.main.config.disabled);
            placeholder.innerHTML = this.main.config.placeholderText;
            this.multiSelected.values.innerHTML = placeholder.outerHTML;
        }
    };
    Slim.prototype.valueDiv = function (optionObj) {
        var _this = this;
        var value = document.createElement('div');
        value.classList.add(this.main.config.value);
        value.dataset.id = optionObj.id;
        var text = document.createElement('span');
        text.classList.add(this.main.config.valueText);
        text.innerHTML = (optionObj.innerHTML && this.main.config.valuesUseText !== true ? optionObj.innerHTML : optionObj.text);
        value.appendChild(text);
        if (!optionObj.mandatory) {
            var deleteSpan = document.createElement('span');
            deleteSpan.classList.add(this.main.config.valueDelete);
            deleteSpan.innerHTML = this.main.config.deselectLabel;
            deleteSpan.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                var shouldUpdate = false;
                if (!_this.main.beforeOnChange) {
                    shouldUpdate = true;
                }
                if (_this.main.beforeOnChange) {
                    var selected = _this.main.data.getSelected();
                    var currentValues = JSON.parse(JSON.stringify(selected));
                    for (var i = 0; i < currentValues.length; i++) {
                        if (currentValues[i].id === optionObj.id) {
                            currentValues.splice(i, 1);
                        }
                    }
                    var beforeOnchange = _this.main.beforeOnChange(currentValues);
                    if (beforeOnchange !== false) {
                        shouldUpdate = true;
                    }
                }
                if (shouldUpdate) {
                    _this.main.data.removeFromSelected(optionObj.id, 'id');
                    _this.main.render();
                    _this.main.select.setValue();
                    _this.main.data.onDataChange();
                }
            };
            value.appendChild(deleteSpan);
        }
        return value;
    };
    Slim.prototype.contentDiv = function () {
        var container = document.createElement('div');
        container.classList.add(this.main.config.content);
        return container;
    };
    Slim.prototype.searchDiv = function () {
        var _this = this;
        var container = document.createElement('div');
        var input = document.createElement('input');
        var addable = document.createElement('div');
        container.classList.add(this.main.config.search);
        var searchReturn = {
            container: container,
            input: input
        };
        if (!this.main.config.showSearch) {
            container.classList.add(this.main.config.hide);
            input.readOnly = true;
        }
        input.type = 'search';
        input.placeholder = this.main.config.searchPlaceholder;
        input.tabIndex = 0;
        input.setAttribute('aria-label', this.main.config.searchPlaceholder);
        input.setAttribute('autocapitalize', 'off');
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocorrect', 'off');
        input.onclick = function (e) {
            setTimeout(function () {
                var target = e.target;
                if (target.value === '') {
                    _this.main.search('');
                }
            }, 10);
        };
        input.onkeydown = function (e) {
            if (e.key === 'ArrowUp') {
                _this.main.open();
                _this.highlightUp();
                e.preventDefault();
            }
            else if (e.key === 'ArrowDown') {
                _this.main.open();
                _this.highlightDown();
                e.preventDefault();
            }
            else if (e.key === 'Tab') {
                if (!_this.main.data.contentOpen) {
                    setTimeout(function () { _this.main.close(); }, _this.main.config.timeoutDelay);
                }
                else {
                    _this.main.close();
                }
            }
            else if (e.key === 'Enter') {
                e.preventDefault();
            }
        };
        input.onkeyup = function (e) {
            var target = e.target;
            if (e.key === 'Enter') {
                if (_this.main.addable && e.ctrlKey) {
                    addable.click();
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                var highlighted = _this.list.querySelector('.' + _this.main.config.highlighted);
                if (highlighted) {
                    highlighted.click();
                }
            }
            else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            }
            else if (e.key === 'Escape') {
                _this.main.close();
            }
            else {
                if (_this.main.config.showSearch && _this.main.data.contentOpen) {
                    _this.main.search(target.value);
                }
                else {
                    input.value = '';
                }
            }
            e.preventDefault();
            e.stopPropagation();
        };
        input.onfocus = function () { _this.main.open(); };
        container.appendChild(input);
        if (this.main.addable) {
            addable.classList.add(this.main.config.addable);
            addable.innerHTML = '+';
            addable.onclick = function (e) {
                if (_this.main.addable) {
                    e.preventDefault();
                    e.stopPropagation();
                    var inputValue = _this.search.input.value;
                    if (inputValue.trim() === '') {
                        _this.search.input.focus();
                        return;
                    }
                    var addableValue = _this.main.addable(inputValue);
                    var addableValueStr_1 = '';
                    if (!addableValue) {
                        return;
                    }
                    if (typeof addableValue === 'object') {
                        var validValue = data_1.validateOption(addableValue);
                        if (validValue) {
                            _this.main.addData(addableValue);
                            addableValueStr_1 = (addableValue.value ? addableValue.value : addableValue.text);
                        }
                    }
                    else {
                        _this.main.addData(_this.main.data.newOption({
                            text: addableValue,
                            value: addableValue
                        }));
                        addableValueStr_1 = addableValue;
                    }
                    _this.main.search('');
                    setTimeout(function () {
                        _this.main.set(addableValueStr_1, 'value', false, false);
                    }, 100);
                    if (_this.main.config.closeOnSelect) {
                        setTimeout(function () {
                            _this.main.close();
                        }, 100);
                    }
                }
            };
            container.appendChild(addable);
            searchReturn.addable = addable;
        }
        return searchReturn;
    };
    Slim.prototype.highlightUp = function () {
        var highlighted = this.list.querySelector('.' + this.main.config.highlighted);
        var prev = null;
        if (highlighted) {
            prev = highlighted.previousSibling;
            while (prev !== null) {
                if (prev.classList.contains(this.main.config.disabled)) {
                    prev = prev.previousSibling;
                    continue;
                }
                else {
                    break;
                }
            }
        }
        else {
            var allOptions = this.list.querySelectorAll('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
            prev = allOptions[allOptions.length - 1];
        }
        if (prev && prev.classList.contains(this.main.config.optgroupLabel)) {
            prev = null;
        }
        if (prev === null) {
            var parent_1 = highlighted.parentNode;
            if (parent_1.classList.contains(this.main.config.optgroup)) {
                if (parent_1.previousSibling) {
                    var prevNodes = parent_1.previousSibling.querySelectorAll('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
                    if (prevNodes.length) {
                        prev = prevNodes[prevNodes.length - 1];
                    }
                }
            }
        }
        if (prev) {
            if (highlighted) {
                highlighted.classList.remove(this.main.config.highlighted);
            }
            prev.classList.add(this.main.config.highlighted);
            helper_1.ensureElementInView(this.list, prev);
        }
    };
    Slim.prototype.highlightDown = function () {
        var highlighted = this.list.querySelector('.' + this.main.config.highlighted);
        var next = null;
        if (highlighted) {
            next = highlighted.nextSibling;
            while (next !== null) {
                if (next.classList.contains(this.main.config.disabled)) {
                    next = next.nextSibling;
                    continue;
                }
                else {
                    break;
                }
            }
        }
        else {
            next = this.list.querySelector('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
        }
        if (next === null && highlighted !== null) {
            var parent_2 = highlighted.parentNode;
            if (parent_2.classList.contains(this.main.config.optgroup)) {
                if (parent_2.nextSibling) {
                    var sibling = parent_2.nextSibling;
                    next = sibling.querySelector('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
                }
            }
        }
        if (next) {
            if (highlighted) {
                highlighted.classList.remove(this.main.config.highlighted);
            }
            next.classList.add(this.main.config.highlighted);
            helper_1.ensureElementInView(this.list, next);
        }
    };
    Slim.prototype.listDiv = function () {
        var list = document.createElement('div');
        list.classList.add(this.main.config.list);
        return list;
    };
    Slim.prototype.options = function (content) {
        if (content === void 0) { content = ''; }
        var data = this.main.data.filtered || this.main.data.data;
        this.list.innerHTML = '';
        if (content !== '') {
            var searching = document.createElement('div');
            searching.classList.add(this.main.config.option);
            searching.classList.add(this.main.config.disabled);
            searching.innerHTML = content;
            this.list.appendChild(searching);
            return;
        }
        if (this.main.config.isAjax && this.main.config.isSearching) {
            var searching = document.createElement('div');
            searching.classList.add(this.main.config.option);
            searching.classList.add(this.main.config.disabled);
            searching.innerHTML = this.main.config.searchingText;
            this.list.appendChild(searching);
            return;
        }
        if (data.length === 0) {
            var noResults = document.createElement('div');
            noResults.classList.add(this.main.config.option);
            noResults.classList.add(this.main.config.disabled);
            noResults.innerHTML = this.main.config.searchText;
            this.list.appendChild(noResults);
            return;
        }
        var _loop_1 = function (d) {
            if (d.hasOwnProperty('label')) {
                var item = d;
                var optgroupEl_1 = document.createElement('div');
                optgroupEl_1.classList.add(this_1.main.config.optgroup);
                var optgroupLabel = document.createElement('div');
                optgroupLabel.classList.add(this_1.main.config.optgroupLabel);
                if (this_1.main.config.selectByGroup && this_1.main.config.isMultiple) {
                    optgroupLabel.classList.add(this_1.main.config.optgroupLabelSelectable);
                }
                optgroupLabel.innerHTML = item.label;
                optgroupEl_1.appendChild(optgroupLabel);
                var options = item.options;
                if (options) {
                    for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                        var o = options_1[_i];
                        optgroupEl_1.appendChild(this_1.option(o));
                    }
                    if (this_1.main.config.selectByGroup && this_1.main.config.isMultiple) {
                        var master_1 = this_1;
                        optgroupLabel.addEventListener('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            for (var _i = 0, _a = optgroupEl_1.children; _i < _a.length; _i++) {
                                var childEl = _a[_i];
                                if (childEl.className.indexOf(master_1.main.config.option) !== -1) {
                                    childEl.click();
                                }
                            }
                        });
                    }
                }
                this_1.list.appendChild(optgroupEl_1);
            }
            else {
                this_1.list.appendChild(this_1.option(d));
            }
        };
        var this_1 = this;
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var d = data_2[_i];
            _loop_1(d);
        }
    };
    Slim.prototype.option = function (data) {
        if (data.placeholder) {
            var placeholder = document.createElement('div');
            placeholder.classList.add(this.main.config.option);
            placeholder.classList.add(this.main.config.hide);
            return placeholder;
        }
        var optionEl = document.createElement('div');
        optionEl.classList.add(this.main.config.option);
        if (data["class"]) {
            data["class"].split(' ').forEach(function (dataClass) {
                optionEl.classList.add(dataClass);
            });
        }
        if (data.style) {
            optionEl.style.cssText = data.style;
        }
        var selected = this.main.data.getSelected();
        optionEl.dataset.id = data.id;
        if (this.main.config.searchHighlight && this.main.slim && data.innerHTML && this.main.slim.search.input.value.trim() !== '') {
            optionEl.innerHTML = helper_1.highlight(data.innerHTML, this.main.slim.search.input.value, this.main.config.searchHighlighter);
        }
        else if (data.innerHTML) {
            optionEl.innerHTML = data.innerHTML;
        }
        if (this.main.config.showOptionTooltips && optionEl.textContent) {
            optionEl.setAttribute('title', optionEl.textContent);
        }
        var master = this;
        optionEl.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var element = this;
            var elementID = element.dataset.id;
            if (data.selected === true && master.main.config.allowDeselectOption) {
                var shouldUpdate = false;
                if (!master.main.beforeOnChange || !master.main.config.isMultiple) {
                    shouldUpdate = true;
                }
                if (master.main.beforeOnChange && master.main.config.isMultiple) {
                    var selectedValues = master.main.data.getSelected();
                    var currentValues = JSON.parse(JSON.stringify(selectedValues));
                    for (var i = 0; i < currentValues.length; i++) {
                        if (currentValues[i].id === elementID) {
                            currentValues.splice(i, 1);
                        }
                    }
                    var beforeOnchange = master.main.beforeOnChange(currentValues);
                    if (beforeOnchange !== false) {
                        shouldUpdate = true;
                    }
                }
                if (shouldUpdate) {
                    if (master.main.config.isMultiple) {
                        master.main.data.removeFromSelected(elementID, 'id');
                        master.main.render();
                        master.main.select.setValue();
                        master.main.data.onDataChange();
                    }
                    else {
                        master.main.set('');
                    }
                }
            }
            else {
                if (data.disabled || data.selected) {
                    return;
                }
                if (master.main.config.limit && Array.isArray(selected) && master.main.config.limit <= selected.length) {
                    return;
                }
                if (master.main.beforeOnChange) {
                    var value = void 0;
                    var objectInfo = JSON.parse(JSON.stringify(master.main.data.getObjectFromData(elementID)));
                    objectInfo.selected = true;
                    if (master.main.config.isMultiple) {
                        value = JSON.parse(JSON.stringify(selected));
                        value.push(objectInfo);
                    }
                    else {
                        value = JSON.parse(JSON.stringify(objectInfo));
                    }
                    var beforeOnchange = master.main.beforeOnChange(value);
                    if (beforeOnchange !== false) {
                        master.main.set(elementID, 'id', master.main.config.closeOnSelect);
                    }
                }
                else {
                    master.main.set(elementID, 'id', master.main.config.closeOnSelect);
                }
            }
        });
        var isSelected = selected && helper_1.isValueInArrayOfObjects(selected, 'id', data.id);
        if (data.disabled || isSelected) {
            optionEl.onclick = null;
            if (!master.main.config.allowDeselectOption) {
                optionEl.classList.add(this.main.config.disabled);
            }
            if (master.main.config.hideSelectedOption) {
                optionEl.classList.add(this.main.config.hide);
            }
        }
        if (isSelected) {
            optionEl.classList.add(this.main.config.optionSelected);
        }
        else {
            optionEl.classList.remove(this.main.config.optionSelected);
        }
        return optionEl;
    };
    return Slim;
}());
exports.Slim = Slim;
