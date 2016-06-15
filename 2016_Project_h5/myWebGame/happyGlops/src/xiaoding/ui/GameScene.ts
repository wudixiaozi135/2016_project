/**
 * Created by xiaoding on 2016/4/29.
 */
class GameScene extends eui.Group
{
	private column:number = 10;
	private row:number = 10;
	private index:number = 10;

	private colorShapeVec:ColorShape[][];

	//已标记的为防止重复遍历
	private flagShapes:ColorShape[] = [];

	//得到所有与点击相同的类型
	private findShapes:ColorShape[] = [];

	//按存取的数组
	private columnShapes:ShapeData[][] = [];

	private particlePool:particle.GravityParticleSystem[] = [];

	constructor()
	{
		super();
		GameData.shapeW = Math.floor(egret.MainContext.instance.stage.stageWidth / 10);
	}

	protected createChildren():void
	{
		super.createChildren();
		this.startGame();
	}

	private startGame():void
	{
		if (this.particlePool.length > 0)
		{
			this.particlePool.forEach(function (element:particle.ParticleSystem, index:number, arr:particle.GravityParticleSystem[]):void
			{
				if (this.parent.contains(element))
				{
					this.parent.removeChild(element);
				}
				element.stop(true);
				element = null;
			}, this);
			this.particlePool.length = 0;
		}

		this.colorShapeVec = [[], [], [], [], [], [], [], [], [], []];
		this.index = 10;
		this.addRowShape(this.index);
	}

	private addRowShape(row:number):void
	{
		row -= 1;
		for (let i = 0; i < 10; i++)
		{
			let shape:ColorShape = new ColorShape(Math.floor(Math.random() * 4) + 1);
			shape.setData(row, i);
			shape.data = 1;
			this.colorShapeVec[row][i] = shape;
			this.addChild(shape);
			shape.x = i * shape.width;
			shape.alpha = 0;

			TweenMax.to(shape, .2, {
				y: row * shape.height,
				alpha: 1,
				onComplete: this.onTweenComplete.bind(this)
			});
		}

		if (this.index > 1)
		{
			TweenMax.delayedCall(row * 0.02 + .1, function ():void
			{
				this.index--;
				this.addRowShape(this.index);
			}.bind(this));
		}
	}

	private animateCount:number = 0;

	private onTweenComplete():void
	{
		this.animateCount++;

		if (this.animateCount >= 100)
		{
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClick, this);
			this.animateCount = 0;
		}
	}

	private selectTarget:ColorShape;

	private onTouchClick(ev:egret.TouchEvent):void
	{
		let column = Math.floor((ev.stageX - this.x) / GameData.shapeW);
		let row = Math.floor((ev.stageY - this.y) / GameData.shapeH);
		let target:ColorShape = ev.target;

		if (this.selectTarget)
		{
			this.selectTarget.state = 0;
			this.selectTarget = null;
		}
		this.selectTarget = target;
		if (target.state != 1)
		{
			target.state = 1;
		}

		let priorityBol:boolean = this.priorityCheck(row, column);
		if (!priorityBol)
		{
			//消除状态
			this.resetState();
			return;
		}
		this.handlerClick(row, column, target);
	}

	/*
	 * 重置状态
	 * */
	private resetState():void
	{
		if (this.findShapes.length > 0)
		{
			this.findShapes.forEach(function (element:ColorShape, index:number, vector:ColorShape[]):void
			{
				element.state = 0;
				this.colorShapeVec[element.row][element.column] = element;
			}, this);

			if (this.findShapes.length > 0)
			{
				this.findShapes.length = 0;
			}
			if (this.flagShapes.length > 0)
			{
				this.flagShapes.length = 0;
			}
			this.columnShapes.length = 0;
			this.doubleClick = 0;
		}
	}


	private doubleClick:number = 0;

	private handlerClick(row:number, column:number, target:ColorShape):void
	{
		if (this.findShapes.length > 0)
		{
			let findIndex:number = this.findShapes.lastIndexOf(target);
			if (findIndex == -1)
			{
				this.resetState();
				this.traverseShape(row, column);
				return;
			}
		} else
		{
			this.traverseShape(row, column);
			if (this.findShapes.length <= 0)
			{
				this.flagShapes.length = 0;
				this.columnShapes.length = 0;
				this.doubleClick = 0;
				return;
			}
		}

		this.doubleClick++;
		if (this.doubleClick >= 2)
		{
			this.doubleClick = 0;

			if (this.findShapes.length > 0)
			{
				this.findShapes.forEach(function (element:ColorShape, index:number, vector:ColorShape[]):void
				{
					this.removeChild(element);
					this.colorShapeVec[element.row][element.column] = null;
					element = null;
				}, this);
				this.freeFallDown();
				this.resetGame();
			}
		}

	}

	/*
	 * 重新检测是否游戏结束
	 * */
	private resetGame():void
	{
		let shape:ColorShape;
		let i:number = 0;
		let j:number = 0;
		if (this.colorShapeVec.length > 0)
		{
			let gameOver:boolean = true;
			for (i = 0; i < this.row; i++)
			{
				for (j = 0; j < this.column; j++)
				{
					shape = this.colorShapeVec[i][j];
					if (shape)
					{
						this.traverseShape(shape.row, shape.column);
						if (this.findShapes.length > 0)
						{
							this.findShapes.forEach(function (element:ColorShape, index:number, vector:ColorShape[]):void
							{
								element.state = 0;
								this.colorShapeVec[element.row][element.column] = element;
							}, this);

							if (this.findShapes.length > 0)
							{
								this.findShapes.length = 0;
							}
							if (this.flagShapes.length > 0)
							{
								this.flagShapes.length = 0;
							}
							this.columnShapes.length = 0;

							gameOver = false;
							break;
						}
					}
				}
				if (gameOver == false)
				{
					break;
				}
			}

			if (gameOver)
			{
				//重新开始


				let allChildren:ColorShape[] = [];
				for (i = 0; i < this.row; i++)
				{
					for (j = 0; j < this.column; j++)
					{
						shape = this.colorShapeVec[i][j];
						if (shape)
						{
							allChildren.push(shape);
						}
					}
				}


				if (allChildren.length > 0)
				{
					var texture = RES.getRes("effectStar");
					var config = RES.getRes("effectStar_json");
					allChildren.forEach(function (element:ColorShape, index:number, arr:ColorShape[]):void
					{
						if (this.contains(element))
						{
							this.removeChild(element);
						}

					}, this);
				}

				let system:particle.GravityParticleSystem = new particle.GravityParticleSystem(texture, config);
				this.parent.addChild(system);
				system.maxParticles = 100;
				system.start();
				system.emitterX = this.parent.width * .5;
				system.emitterY = this.parent.height * .5;
				this.particlePool.push(system);

				if (this.findShapes.length > 0)
				{
					this.findShapes.length = 0;
				}
				if (this.flagShapes.length > 0)
				{
					this.flagShapes.length = 0;
				}
				this.columnShapes.length = 0;

				TweenMax.delayedCall(3, this.startGame.bind(this));
			}
		}
	}

	/*
	 * 自由下落
	 * */
	private freeFallDown():void
	{
		if (this.columnShapes && this.columnShapes.length > 0)
		{
			let columnArr:number[] = [];
			this.columnShapes.forEach(function (arr:ShapeData[], index:number, vec:ShapeData[][]):void
			{
				columnArr.push(arr[0].column);
			});
			if (columnArr.length > 0)
			{
				let tempColumn:number = 0;
				let shape:ColorShape;
				let findShape:ColorShape;
				let checkColumnNull:boolean;
				let copyArr:number[] = columnArr.concat();
				let i:number = 0;
				while (columnArr.length > 0)
				{
					tempColumn = columnArr.pop();
					for (i = this.row - 1; i >= 0; i--)
					{
						shape = this.colorShapeVec[i][tempColumn];
						if (!shape)
						{
							findShape = this.findShape(i, tempColumn);
							if (findShape)
							{
								i = this.row;
							}
						}
					}
				}

				let recordColumn:number = 0;
				let totalNullColumn:number = 0;
				while (copyArr.length > 0)
				{
					tempColumn = copyArr.pop();
					checkColumnNull = this.columnArrIsNull(tempColumn);
					if (checkColumnNull)
					{
						totalNullColumn++;
						recordColumn = tempColumn;
					}
				}
				if (totalNullColumn > 0)
				{
					let leftSize:number = this.countSize(tempColumn, 1);
					let rightSize:number = this.countSize(tempColumn, 2);
					if (leftSize <= rightSize)
					{
						this.leftToRight(recordColumn, totalNullColumn);
					} else
					{
						this.rightToLeft(recordColumn, totalNullColumn);
					}
				}
			}
			this.columnShapes.length = 0;
		}

		if (this.findShapes.length > 0)
		{
			this.findShapes.length = 0;
		}
		if (this.flagShapes.length > 0)
		{
			this.flagShapes.length = 0;
		}
	}

	/*
	 * 计算数组大小
	 * type 1 计算左边数组
	 * type 2 计算右边数组
	 * */
	private countSize(column:number, type:number = 1):number
	{
		let size:number = 0;
		let i:number = 0;
		let j:number = 0;

		if (type == 1)
		{
			for (i = column; i >= 0; i--)
			{
				for (j = this.row - 1; j >= 0; j--)
				{
					if (this.colorShapeVec[j][i])
					{
						size++;
					}
				}
			}
		} else
		{
			for (i = this.column - 1; i >= column; i--)
			{
				for (j = this.row - 1; j >= 0; j--)
				{
					if (this.colorShapeVec[j][i])
					{
						size++;
					}
				}
			}
		}
		return size;
	}

	/*
	 * column 划分左右的中界线
	 * step 左移的步长
	 * */
	private leftToRight(column:number, step:number):void
	{
		let colorShape:ColorShape;
		for (let i = column; i >= 0; i--)
		{
			for (let j = this.row - 1; j >= 0; j--)
			{
				colorShape = this.colorShapeVec[j][i];
				if (colorShape)
				{
					this.colorShapeVec[colorShape.row][colorShape.column] = null;
					colorShape.column += step;
					TweenMax.to(colorShape, .3, {x: GameData.shapeW * colorShape.column});
					this.colorShapeVec[colorShape.row][colorShape.column] = colorShape;
				}
			}
		}
	}

	private rightToLeft(column:number, step:number):void
	{
		let colorShape:ColorShape;
		for (let i = column; i <= this.column - 1; i++)
		{
			for (let j = this.row - 1; j >= 0; j--)
			{
				colorShape = this.colorShapeVec[j][i];
				if (colorShape)
				{
					this.colorShapeVec[colorShape.row][colorShape.column] = null;
					colorShape.column -= step;
					TweenMax.to(colorShape, .3, {x: GameData.shapeW * colorShape.column});
					this.colorShapeVec[colorShape.row][colorShape.column] = colorShape;
				}
			}
		}
	}


	/*
	 * 判断某一列数据全部为空
	 * */
	private columnArrIsNull(column:number):boolean
	{
		let bol:boolean = true;
		for (let i = this.row - 1; i >= 0; i--)
		{
			if (this.colorShapeVec[i][column])
			{
				bol = false;
				break;
			}
		}
		return bol;
	}

	private findShape(row:number, column:number):ColorShape
	{
		let shape:ColorShape = null;
		for (let i = row; i >= 0; i--)
		{
			shape = this.colorShapeVec[i][column];
			if (shape && shape.data == 1)
			{
				this.colorShapeVec[shape.row][column] = null;
				shape.row++;
				TweenMax.to(shape, .3, {y: shape.row * GameData.shapeH});
				this.colorShapeVec[shape.row][column] = shape;
				break;
			}
		}
		return shape;
	}

	/*
	 * 优先检查是否有相同的类型
	 * true 至少存在一个
	 * false 没有
	 * */
	private priorityCheck(row:number, column:number):boolean
	{
		let target:ColorShape = this.colorShapeVec[row][column];
		if (!target || target.data == 0)
		{
			return false;
		}
		let temp:ColorShape;
		//左
		if (target.column - 1 >= 0)
		{
			temp = this.colorShapeVec[row][target.column - 1];
			if (temp && temp.type == target.type)
			{
				return true;
			}
		}

		//右
		if (target.column + 1 <= 9)
		{
			temp = this.colorShapeVec[row][target.column + 1];
			if (temp && temp.type == target.type)
			{
				return true;
			}
		}

		//上
		if (target.row - 1 >= 0)
		{
			temp = this.colorShapeVec[target.row - 1][column];
			if (temp && temp.type == target.type)
			{
				return true;
			}
		}

		//下
		if (target.row + 1 <= 9)
		{
			temp = this.colorShapeVec[target.row + 1][column];
			if (temp && temp.type == target.type)
			{
				return true;
			}
		}
		return false;
	}


	private traverseShape(row:number, column:number):void
	{
		let target:ColorShape = this.colorShapeVec[row][column];
		if (!target || target.data == 0)
		{
			return;
		}
		this.addShape(this.flagShapes, target);
		let temp:ColorShape;
		//左
		if (target.column - 1 >= 0)
		{
			temp = this.colorShapeVec[row][target.column - 1];
			if (temp && temp.type == target.type)
			{
				temp.state = target.state;
				this.addShape(this.findShapes, temp);
			}
		}

		//右
		if (target.column + 1 <= 9)
		{
			temp = this.colorShapeVec[row][target.column + 1];
			if (temp && temp.type == target.type)
			{
				temp.state = target.state;
				this.addShape(this.findShapes, temp);
			}
		}

		//上
		if (target.row - 1 >= 0)
		{
			temp = this.colorShapeVec[target.row - 1][column];
			if (temp && temp.type == target.type)
			{
				temp.state = target.state;
				this.addShape(this.findShapes, temp);
			}
		}

		//下
		if (target.row + 1 <= 9)
		{
			temp = this.colorShapeVec[target.row + 1][column];
			if (temp && temp.type == target.type)
			{
				temp.state = target.state;
				this.addShape(this.findShapes, temp);
			}
		}

		if (this.flagShapes.length > 0 && this.findShapes.length > 0)
		{
			if (this.flagShapes.length == this.findShapes.length && this.equalArr(this.flagShapes, this.findShapes))
			{
				//下次遍历只在这些格子范围
				let shape:ColorShape;
				for (let t = 0; t < this.flagShapes.length; t++)
				{
					shape = this.flagShapes[t];

					if (!this.columnShapes[shape.column])
					{
						this.columnShapes[shape.column] = [];
					}
					this.columnShapes[shape.column].push(shape.shapeData);
				}
				return;
			}
		}

		if (this.findShapes.length > 0)
		{
			let that = this;
			this.findShapes.forEach(function (element:ColorShape, index:number, vector:ColorShape[]):void
			{
				if (that.flagShapes.indexOf(element) == -1)
				{
					that.traverseShape(element.row, element.column);
				}
			});
		}
	}

	private equalArr(arr1:ColorShape[], arr2:ColorShape[]):boolean
	{
		let bol:boolean = true;
		for (let i = 0; i < arr1.length; i++)
		{
			if (arr2.lastIndexOf(arr1[i]) == -1)
			{
				bol = false;
				break;
			}
		}
		return bol;
	}

	private addShape(arr:ColorShape[], shape:ColorShape):void
	{
		let index:number = arr.lastIndexOf(shape);
		if (index == -1)
		{
			arr.push(shape);
		}
	}

	private containShape(arr:ColorShape[], shape:ColorShape):boolean
	{
		return arr.lastIndexOf(shape) != -1;
	}
}
