/**
 * Created by xiaoding on 2016/3/14.
 */
interface ICourseware extends IDragable
{
	courseType:CourseTypes;
	setRes(vo:CoursewareVo):void;

	reCover():void;
	draw():void;
	eraser():void;
	rotate():void;
	zoomIn():void;
	zoomOut():void;
}