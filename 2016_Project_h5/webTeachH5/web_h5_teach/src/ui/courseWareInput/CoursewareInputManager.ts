/**
 * Created by Administrator on 2016/4/5.
 */
class CoursewareInputManager
{
	public coursewareInputDatas:CoursewareInput[];

	constructor()
	{
		this.coursewareInputDatas = [];
	}

	public addItem(coursewareInput:CoursewareInput):void
	{
		if (coursewareInput)
		{
			let pos = this.coursewareInputDatas.indexOf(coursewareInput);
			if (pos == -1)
			{
				this.coursewareInputDatas.push(coursewareInput);
			}
		}
	}

	public removeItem(coursewareInput:CoursewareInput):void
	{
		if (coursewareInput)
		{
			let pos = this.coursewareInputDatas.indexOf(coursewareInput);
			if (pos == -1)
			{
				this.coursewareInputDatas.splice(pos, 1);
			}
		}
	}


	private static _instance:CoursewareInputManager;
	public static get instance():CoursewareInputManager
	{
		if (CoursewareInputManager._instance == null)
		{
			CoursewareInputManager._instance = new CoursewareInputManager();
		}
		return CoursewareInputManager._instance;
	}
}