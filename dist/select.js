"use strict";
exports.__esModule = true;
exports.Select = void 0;
var helper_1 = require("./helper");
var Select = (function () {
    function Select(info) {
        this.triggerMutationObserver = true;
        this.element = info.select;
        this.main = info.main;
        if (this.element.disabled) {
            this.main.config.isEnabled = false;
        }
        this.addAttributes();
        this.addEventListeners();
        this.mutationObserver = null;
        this.addMutationObserver();
        var el = this.element;
        el.slim = info.main;
    }
    Select.prototype.setValue = function () {
        if (!this.main.data.getSelected()) {
            return;
        }
        if (this.main.config.isMultiple) {
            var selected = this.main.data.getSelected();
            var options = this.element.options;
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var o = options_1[_i];
                o.selected = false;
                for (var _a = 0, selected_1 = selected; _a < selected_1.length; _a++) {
                    var s = selected_1[_a];
                    if (s.value === o.value) {
                        o.selected = true;
                    }
                }
            }
        }
        else {
            var selected = this.main.data.getSelected();
            this.element.value = (selected ? selected.value : '');
        }
        this.main.data.isOnChangeEnabled = false;
        this.element.dispatchEvent(new CustomEvent('change', { bubbles: true }));
        this.main.data.isOnChangeEnabled = true;
    };
    Select.prototype.addAttributes = function () {
        this.element.tabIndex = -1;
        this.element.style.display = 'none';
        this.element.dataset.ssid = this.main.config.id;
    };
    Select.prototype.addEventListeners = function () {
        var _this = this;
        this.element.addEventListener('change', function (e) {
            _this.main.data.setSelectedFromSelect();
            _this.main.render();
        });
    };
    Select.prototype.addMutationObserver = function () {
        var _this = this;
        if (this.main.config.isAjax) {
            return;
        }
        this.mutationObserver = new MutationObserver(function (mutations) {
            if (!_this.triggerMutationObserver) {
                return;
            }
            _this.main.data.parseSelectData();
            _this.main.data.setSelectedFromSelect();
            _this.main.render();
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'class') {
                    _this.main.slim.updateContainerDivClass(_this.main.slim.container);
                }
            });
        });
        this.observeMutationObserver();
    };
    Select.prototype.observeMutationObserver = function () {
        if (!this.mutationObserver) {
            return;
        }
        this.mutationObserver.observe(this.element, {
            attributes: true,
            childList: true,
            characterData: true
        });
    };
    Select.prototype.disconnectMutationObserver = function () {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
    };
    Select.prototype.create = function (data) {
        this.element.innerHTML = '';
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var d = data_1[_i];
            if (d.hasOwnProperty('options')) {
                var optgroupObject = d;
                var optgroupEl = document.createElement('optgroup');
                optgroupEl.label = optgroupObject.label;
                if (optgroupObject.options) {
                    for (var _a = 0, _b = optgroupObject.options; _a < _b.length; _a++) {
                        var oo = _b[_a];
                        optgroupEl.appendChild(this.createOption(oo));
                    }
                }
                this.element.appendChild(optgroupEl);
            }
            else {
                this.element.appendChild(this.createOption(d));
            }
        }
    };
    Select.prototype.createOption = function (info) {
        var optionEl = document.createElement('option');
        optionEl.value = info.value !== '' ? info.value : info.text;
        optionEl.innerHTML = info.innerHTML || info.text;
        if (info.selected) {
            optionEl.selected = info.selected;
        }
        if (info.display === false) {
            optionEl.style.display = 'none';
        }
        if (info.disabled) {
            optionEl.disabled = true;
        }
        if (info.placeholder) {
            optionEl.setAttribute('data-placeholder', 'true');
        }
        if (info.mandatory) {
            optionEl.setAttribute('data-mandatory', 'true');
        }
        if (info["class"]) {
            info["class"].split(' ').forEach(function (optionClass) {
                optionEl.classList.add(optionClass);
            });
        }
        if (info.data && typeof info.data === 'object') {
            Object.keys(info.data).forEach(function (key) {
                optionEl.setAttribute('data-' + helper_1.kebabCase(key), info.data[key]);
            });
        }
        return optionEl;
    };
    return Select;
}());
exports.Select = Select;
