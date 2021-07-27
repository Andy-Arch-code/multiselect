"use strict";
exports.__esModule = true;
exports.Config = void 0;
var Config = (function () {
    function Config(info) {
        this.id = '';
        this.isMultiple = false;
        this.isAjax = false;
        this.isSearching = false;
        this.showSearch = true;
        this.searchFocus = true;
        this.searchHighlight = false;
        this.closeOnSelect = true;
        this.showContent = 'auto';
        this.searchPlaceholder = 'Search';
        this.searchText = 'No Results';
        this.searchingText = 'Searching...';
        this.placeholderText = 'Select Value';
        this.allowDeselect = false;
        this.allowDeselectOption = false;
        this.hideSelectedOption = false;
        this.deselectLabel = 'x';
        this.isEnabled = true;
        this.valuesUseText = false;
        this.showOptionTooltips = false;
        this.selectByGroup = false;
        this.limit = 0;
        this.timeoutDelay = 200;
        this.addToBody = false;
        this.main = 'ss-main';
        this.singleSelected = 'ss-single-selected';
        this.arrow = 'ss-arrow';
        this.multiSelected = 'ss-multi-selected';
        this.add = 'ss-add';
        this.plus = 'ss-plus';
        this.values = 'ss-values';
        this.value = 'ss-value';
        this.valueText = 'ss-value-text';
        this.valueDelete = 'ss-value-delete';
        this.content = 'ss-content';
        this.open = 'ss-open';
        this.openAbove = 'ss-open-above';
        this.openBelow = 'ss-open-below';
        this.search = 'ss-search';
        this.searchHighlighter = 'ss-search-highlight';
        this.addable = 'ss-addable';
        this.list = 'ss-list';
        this.optgroup = 'ss-optgroup';
        this.optgroupLabel = 'ss-optgroup-label';
        this.optgroupLabelSelectable = 'ss-optgroup-label-selectable';
        this.option = 'ss-option';
        this.optionSelected = 'ss-option-selected';
        this.highlighted = 'ss-highlighted';
        this.disabled = 'ss-disabled';
        this.hide = 'ss-hide';
        this.id = 'ss-' + Math.floor(Math.random() * 100000);
        this.style = info.select.style.cssText;
        this["class"] = info.select.className.split(' ');
        this.isMultiple = info.select.multiple;
        this.isAjax = info.isAjax;
        this.showSearch = (info.showSearch === false ? false : true);
        this.searchFocus = (info.searchFocus === false ? false : true);
        this.searchHighlight = (info.searchHighlight === true ? true : false);
        this.closeOnSelect = (info.closeOnSelect === false ? false : true);
        if (info.showContent) {
            this.showContent = info.showContent;
        }
        this.isEnabled = (info.isEnabled === false ? false : true);
        if (info.searchPlaceholder) {
            this.searchPlaceholder = info.searchPlaceholder;
        }
        if (info.searchText) {
            this.searchText = info.searchText;
        }
        if (info.searchingText) {
            this.searchingText = info.searchingText;
        }
        if (info.placeholderText) {
            this.placeholderText = info.placeholderText;
        }
        this.allowDeselect = (info.allowDeselect === true ? true : false);
        this.allowDeselectOption = (info.allowDeselectOption === true ? true : false);
        this.hideSelectedOption = (info.hideSelectedOption === true ? true : false);
        if (info.deselectLabel) {
            this.deselectLabel = info.deselectLabel;
        }
        if (info.valuesUseText) {
            this.valuesUseText = info.valuesUseText;
        }
        if (info.showOptionTooltips) {
            this.showOptionTooltips = info.showOptionTooltips;
        }
        if (info.selectByGroup) {
            this.selectByGroup = info.selectByGroup;
        }
        if (info.limit) {
            this.limit = info.limit;
        }
        if (info.searchFilter) {
            this.searchFilter = info.searchFilter;
        }
        if (info.timeoutDelay != null) {
            this.timeoutDelay = info.timeoutDelay;
        }
        this.addToBody = (info.addToBody === true ? true : false);
    }
    Config.prototype.searchFilter = function (opt, search) {
        return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    };
    return Config;
}());
exports.Config = Config;
