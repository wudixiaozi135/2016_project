/**
 * 面板的管理类
 */
var PanelManager;
(function (PanelManager) {
    function initPanel() {
        var _width = document.documentElement.clientWidth;
        var _height = document.documentElement.clientHeight;
        if (_width < _height) {
            global.initIsVertical = true;
        }
    }
    PanelManager.initPanel = initPanel;
})(PanelManager || (PanelManager = {}));
//# sourceMappingURL=PanelManager.js.map