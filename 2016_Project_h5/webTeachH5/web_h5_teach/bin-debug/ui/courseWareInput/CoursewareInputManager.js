/**
 * Created by Administrator on 2016/4/5.
 */
var CoursewareInputManager = (function () {
    function CoursewareInputManager() {
        this.coursewareInputDatas = [];
    }
    var d = __define,c=CoursewareInputManager,p=c.prototype;
    p.addItem = function (coursewareInput) {
        if (coursewareInput) {
            var pos = this.coursewareInputDatas.indexOf(coursewareInput);
            if (pos == -1) {
                this.coursewareInputDatas.push(coursewareInput);
            }
        }
    };
    p.removeItem = function (coursewareInput) {
        if (coursewareInput) {
            var pos = this.coursewareInputDatas.indexOf(coursewareInput);
            if (pos == -1) {
                this.coursewareInputDatas.splice(pos, 1);
            }
        }
    };
    d(CoursewareInputManager, "instance"
        ,function () {
            if (CoursewareInputManager._instance == null) {
                CoursewareInputManager._instance = new CoursewareInputManager();
            }
            return CoursewareInputManager._instance;
        }
    );
    return CoursewareInputManager;
}());
egret.registerClass(CoursewareInputManager,'CoursewareInputManager');
//# sourceMappingURL=CoursewareInputManager.js.map