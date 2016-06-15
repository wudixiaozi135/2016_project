import ExternalInterface = egret.ExternalInterface;
/**
 * Created by Administrator on 2016/4/5.
 */
class GameScene extends eui.Group
{
	public sceneStage:egret.Stage;
	//间隙
	private _gap:number = 5;

	private _bg:egret.Shape;

	private _mapData:NumGrid[][];

	private _lastP:egret.Point;
	private _moveP:egret.Point;
	private _randomArr:any[];


	private _score:number = 0;
	private _gameHead:GameHead;
	private _gameOver:GameOver;

	private _tweenTime:number = .3;

	constructor()
	{
		super();
		this._randomArr = [];
		this._mapData = [[], [], [], []];
		this._lastP = new egret.Point();
		this._moveP = new egret.Point();
	}

	protected createChildren():void
	{
		super.createChildren();
		this.width = this.sceneStage.stageWidth;
		this.height = this.sceneStage.stageHeight;

		this._bg = new egret.Shape();
		this.addChild(this._bg);
		this._bg.y = GameData.gameHeadHeight;

		this._gameHead = new GameHead();
		this.addChild(this._gameHead);
		this._gameHead.top = 0;
		this._gameHead.left = 0;

		GameData.gridW = (this.sceneStage.stageWidth / GameData.gridColumn) << 0;
		GameData.gridH = (this.sceneStage.stageHeight - GameData.gameHeadHeight ) / GameData.gridRow << 0;

		this.drawBG();

		this.initGame();

		xd.GameDispatcher.addEventListener(GameEventConstant.RESTART_GAME, this.onRestartGame, this);
		xd.GameDispatcher.addEventListener(GameEventConstant.EXIT, this.onExitGame, this);
		this.addEvent();
	}

	private addEvent():void
	{
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		xd.GameDispatcher.addEventListener(GameEventConstant.GAME_OVER, this.onGameOver, this);
	}

	private removeEvent():void
	{
		xd.GameDispatcher.removeEventListener(GameEventConstant.GAME_OVER, this.onGameOver, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
	}

	private onExitGame(e:xd.GameEvent):void
	{
		ExternalInterface.call("GameExit", "true");
	}

	private onGameOver(e:xd.GameEvent):void
	{
		this.removeEvent();
	}

	private onRestartGame(e:xd.GameEvent):void
	{
		if (this._gameHead)
		{
			let maxScore = parseFloat(egret.localStorage.getItem(GameData.maxScoreKey));
			if (isNaN(maxScore))
			{
				maxScore = 0;
			}
			this._gameHead.setData({score: 0, maxScore: maxScore});
		}

		if (this._gameOver)
		{
			if (this.contains(this._gameOver))
			{
				this.removeChild(this._gameOver);
			}
		}

		let grid:NumGrid;
		let i, j;
		for (i = 0; i < GameData.gridRow; i++)
		{
			for (j = 0; j < GameData.gridColumn; j++)
			{
				grid = this._mapData[i][j];
				if (grid)
				{
					if (this.contains(grid))
					{
						this.removeChild(grid);
						grid = null;
					}
				}
			}
		}
		this._mapData = [[], [], [], []];
		this.initGame();

		this.addEvent();
	}

	private onTouchBegin(e:egret.TouchEvent):void
	{
		this.sceneStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.sceneStage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this._lastP.setTo(e.stageX, e.stageY);
	}

	private onTouchMove(e:egret.TouchEvent):void
	{
		this._moveP.setTo(e.stageX, e.stageY);
		let diffP:egret.Point = this._moveP.subtract(this._lastP);
		let i:number = 0;
		let j:number = 0;
		let k:number = 0;

		let currentGrid:NumGrid;
		let nextGrid:NumGrid;
		let pos:number = 0;

		if (Math.abs(diffP.x) >= Math.abs(diffP.y))//左右方向
		{
			if (diffP.x > 0)
			{
				trace("左右");
				if (!this.fillLeftToRight())
				{
					this.removeMoveEvent();
					return;
				}
			} else
			{
				trace("右左");
				if (!this.fillRightToLeft())
				{
					this.removeMoveEvent();
					return;
				}
			}
		} else//上下
		{
			if (diffP.y > 0)
			{
				trace("上下");
				if (!this.fillUpToDown())
				{
					this.removeMoveEvent();
					return;
				}
			} else
			{
				trace("下上");
				if (!this.fillDownToUp())
				{
					this.removeMoveEvent();
					return;
				}
			}
		}
		this.onTouchEnd(null);
	}

	private fillLeftToRight():boolean
	{
		let isChange:boolean = false;
		let i:number = 0;
		let j:number = 0;
		let k:number = 0;
		let pos:number = 0;

		let currentGrid:NumGrid;
		let nextGrid:NumGrid;

		for (i = 0; i < GameData.gridRow; i++)
		{
			for (j = GameData.gridColumn - 1; j >= 0; j--)
			{
				currentGrid = this._mapData[i][j];
				if (currentGrid)
				{
					for (k = j - 1; k >= 0; k--)
					{
						nextGrid = this._mapData[i][k];
						if (nextGrid)//不为空有两种情况，相同或不同
						{
							if (nextGrid.data != currentGrid.data)
							{
								break;
							} else
							{
								currentGrid.data += nextGrid.data;
								this.updateScore(currentGrid.data);
								this._mapData[i][k] = null;
								this.setChildIndex(nextGrid, this.numChildren - 1);
								TweenMax.to(nextGrid, this._tweenTime, {
									x: currentGrid.column * GameData.gridW + this._gap,
									onComplete: this.onTweenCompleteHandler,
									onCompleteParams: [this, nextGrid]
								});
								if (!isChange)
								{
									isChange = true;
								}
								break;
							}
						} else
						{
							continue;
						}
					}
				} else//当右边空时左边缩进
				{
					pos = j;
					for (k = j - 1; k >= 0; k--)
					{
						nextGrid = this._mapData[i][k];
						if (nextGrid)
						{
							if (!isChange)
							{
								isChange = true;
							}
							nextGrid.column = pos;
							this._mapData[i][pos] = nextGrid;
							this._mapData[i][k] = null;
							TweenMax.to(nextGrid, this._tweenTime, {x: GameData.gridW * pos + this._gap});
							j++;
							break;
						}
					}
				}
			}
		}
		return isChange;
	}

	private fillRightToLeft():boolean
	{
		let isChange:boolean = false;
		let i:number = 0;
		let j:number = 0;
		let k:number = 0;
		let pos:number = 0;

		let currentGrid:NumGrid;
		let nextGrid:NumGrid;

		for (i = 0; i < GameData.gridRow; i++)
		{
			for (j = 0; j < GameData.gridColumn; j++)
			{
				currentGrid = this._mapData[i][j];
				if (currentGrid)
				{
					for (k = j + 1; k < GameData.gridColumn; k++)
					{
						nextGrid = this._mapData[i][k];
						if (nextGrid)//不为空有两种情况，相同或不同
						{
							if (nextGrid.data != currentGrid.data)
							{
								break;
							} else
							{
								currentGrid.data += nextGrid.data;
								this.updateScore(currentGrid.data);
								this._mapData[i][k] = null;

								this.setChildIndex(nextGrid, this.numChildren - 1);
								TweenMax.to(nextGrid, this._tweenTime, {
									x: currentGrid.column * GameData.gridW + this._gap,
									onComplete: this.onTweenCompleteHandler,
									onCompleteParams: [this, nextGrid]
								});

								if (!isChange)
								{
									isChange = true;
								}
								break;
							}
						} else
						{
							continue;
						}
					}
				} else//当右边空时左边缩进
				{
					pos = j;
					for (k = j + 1; k < GameData.gridColumn; k++)
					{
						nextGrid = this._mapData[i][k];
						if (nextGrid)
						{
							nextGrid.column = pos;
							this._mapData[i][pos] = nextGrid;
							this._mapData[i][k] = null;
							TweenMax.to(nextGrid, this._tweenTime, {x: GameData.gridW * pos + this._gap});
							j--;
							if (!isChange)
							{
								isChange = true;
							}
							break;
						}
					}
				}
			}
		}
		return isChange;
	}

	private fillUpToDown():boolean
	{
		let isChange:boolean = false;
		let i:number = 0;
		let j:number = 0;
		let k:number = 0;
		let pos:number = 0;

		let currentGrid:NumGrid;
		let nextGrid:NumGrid;

		for (i = 0; i < GameData.gridColumn; i++)
		{
			for (j = GameData.gridRow - 1; j >= 0; j--)
			{
				currentGrid = this._mapData[j][i];
				if (currentGrid)
				{
					for (k = j - 1; k >= 0; k--)
					{
						nextGrid = this._mapData[k][i];
						if (nextGrid)//不为空有两种情况，相同或不同
						{
							if (nextGrid.data != currentGrid.data)
							{
								break;
							} else
							{
								currentGrid.data += nextGrid.data;
								this.updateScore(currentGrid.data);
								this._mapData[k][i] = null;

								this.setChildIndex(nextGrid, this.numChildren - 1);
								TweenMax.to(nextGrid, this._tweenTime, {
									y: currentGrid.row * GameData.gridH + this._gap + GameData.gameHeadHeight,
									onComplete: this.onTweenCompleteHandler,
									onCompleteParams: [this, nextGrid]
								});

								if (!isChange)
								{
									isChange = true;
								}
								break;
							}
						} else
						{
							continue;
						}
					}
				} else//当右边空时左边缩进
				{
					pos = j;
					for (k = j - 1; k >= 0; k--)
					{
						nextGrid = this._mapData[k][i];
						if (nextGrid)
						{
							nextGrid.row = pos;
							this._mapData[pos][i] = nextGrid;
							this._mapData[k][i] = null;
							TweenMax.to(nextGrid, this._tweenTime, {y: GameData.gridH * pos + this._gap + GameData.gameHeadHeight});
							j++;
							if (!isChange)
							{
								isChange = true;
							}
							break;
						}
					}
				}
			}
		}
		return isChange;
	}


	private fillDownToUp():boolean
	{
		let isChange:boolean = false;
		let i:number = 0;
		let j:number = 0;
		let k:number = 0;
		let pos:number = 0;

		let currentGrid:NumGrid;
		let nextGrid:NumGrid;

		for (i = 0; i < GameData.gridColumn; i++)
		{
			for (j = 0; j < GameData.gridRow; j++)
			{
				currentGrid = this._mapData[j][i];
				if (currentGrid)
				{
					for (k = j + 1; k < GameData.gridRow; k++)
					{
						nextGrid = this._mapData[k][i];
						if (nextGrid)//不为空有两种情况，相同或不同
						{
							if (nextGrid.data != currentGrid.data)
							{
								break;
							} else
							{
								currentGrid.data += nextGrid.data;
								this.updateScore(currentGrid.data);
								this._mapData[k][i] = null;

								this.setChildIndex(nextGrid, this.numChildren - 1);
								TweenMax.to(nextGrid, this._tweenTime, {
									y: currentGrid.row * GameData.gridH + this._gap + GameData.gameHeadHeight,
									onComplete: this.onTweenCompleteHandler,
									onCompleteParams: [this, nextGrid]
								});

								if (!isChange)
								{
									isChange = true;
								}
								break;
							}
						} else
						{
							continue;
						}
					}
				} else//当右边空时左边缩进
				{
					pos = j;
					for (k = j + 1; k < GameData.gridRow; k++)
					{
						nextGrid = this._mapData[k][i];
						if (nextGrid)
						{
							nextGrid.row = pos;
							this._mapData[pos][i] = nextGrid;
							this._mapData[k][i] = null;
							TweenMax.to(nextGrid, this._tweenTime, {y: GameData.gridH * pos + this._gap + GameData.gameHeadHeight});
							j--;
							if (!isChange)
							{
								isChange = true;
							}
							break;
						}
					}
				}
			}
		}
		return isChange;
	}

	private onTweenCompleteHandler(...args):void
	{
		args[0].removeChild(args[1]);
	}

	private removeMoveEvent():void
	{
		this.sceneStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.sceneStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

		if (this.isGameOver())
		{
			this.handlerGameOver();
		}
	}

	private isGameOver():boolean
	{
		if (this._randomArr)
		{
			this._randomArr.length = 0;
		}
		let grid:NumGrid;
		let i, j;
		for (i = 0; i < GameData.gridRow; i++)
		{
			for (j = 0; j < GameData.gridColumn; j++)
			{
				grid = this._mapData[i][j];
				if (!grid)
				{
					this._randomArr.push({row: i, column: j});
				}
			}
		}
		return this._randomArr.length == 0;
	}

	private onTouchEnd(e:egret.TouchEvent):void
	{
		this.sceneStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.sceneStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

		let gameOver:boolean = this.isGameOver();
		if (!gameOver)
		{
			let randomIndex = (Math.random() * this._randomArr.length) << 0;
			if (randomIndex > -1)
			{
				let data = this._randomArr[randomIndex];
				let grid:NumGrid = this.getRandomGrid();
				let addFunc:Function = function (...res):void
				{
					this.addChild(res[0]);
					res[0].alpha = 0;
					TweenMax.to(res[0], this._tweenTime, {alpha: 1});
				};
				TweenMax.delayedCall(.2, addFunc, [grid], this);

				grid.row = data.row;
				grid.column = data.column;
				grid.x = data.column * GameData.gridW + this._gap;
				grid.y = data.row * GameData.gridH + this._gap + GameData.gameHeadHeight;
				this._mapData[data.row][data.column] = grid;
			}
		} else
		{
			this.handlerGameOver();
		}
	}

	/*
	 * 游戏结束
	 * */
	private handlerGameOver():void
	{
		if (!this._gameOver)
		{
			this._gameOver = new GameOver();
		}
		if (!this.contains(this._gameOver))
		{
			this.addChild(this._gameOver);
		}
		var maxScore:number = parseFloat(egret.localStorage.getItem(GameData.maxScoreKey));
		if (isNaN(maxScore))
		{
			maxScore = 0;
		}
		if (this._score > maxScore)
		{
			egret.localStorage.setItem(GameData.maxScoreKey, this._score.toString());
			maxScore = this._score;
		}
		this._gameOver.setData({score: this._score, maxScore: maxScore});
		xd.GameDispatcher.dispatchEvent(GameEventConstant.GAME_OVER);
	}

	private drawBG():void
	{
		if (this._bg)
		{
			this._bg.graphics.clear();
			this._bg.graphics.beginFill(0xf3f3fa);
			this._bg.graphics.lineStyle(1, 0x0);

			for (let i = 0; i < GameData.gridRow; i++)
			{
				for (let j = 0; j < GameData.gridColumn; j++)
				{
					this._bg.graphics.drawRect(j * GameData.gridW, i * GameData.gridH, GameData.gridW, GameData.gridH);
				}
			}
			this._bg.graphics.endFill();
		}
	}

	private initGame():void
	{
		let row = this.getRandom(GameData.gridRow);
		let column = this.getRandom(GameData.gridColumn);

		let grid:NumGrid = this.getRandomGrid();
		this.addChild(grid);
		grid.row = row;
		grid.column = column;
		grid.x = column * GameData.gridW + this._gap;
		grid.y = row * GameData.gridH + this._gap + GameData.gameHeadHeight;

		this._mapData[row][column] = grid;

		let temp = this.getRandom(GameData.gridRow);
		if (temp != row)
		{
			row = temp;
		} else
		{
			while (true)
			{
				if ((temp = this.getRandom(GameData.gridRow)) != row)
				{
					break;
				}
			}
			row = temp;
		}
		column = this.getRandom(GameData.gridColumn);

		grid = this.getRandomGrid();
		this.addChild(grid);
		grid.row = row;
		grid.column = column;
		grid.x = column * GameData.gridW + this._gap;
		grid.y = row * GameData.gridH + this._gap + GameData.gameHeadHeight;
		this._mapData[row][column] = grid;
	}

	private getRandom(value:number):number
	{
		return (Math.random() * value) << 0;
	}

	/*
	 * 随机一个格子
	 * */
	private getRandomGrid():NumGrid
	{
		var grid:NumGrid = new NumGrid();
		grid.data = Math.random() > .5 ? 2 : 4;
		return grid;
	}

	private updateScore(data:number):void
	{
		this._score += data;

		if (this._gameHead)
		{
			let maxScore = parseFloat(egret.localStorage.getItem(GameData.maxScoreKey));
			if (isNaN(maxScore))
			{
				maxScore = 0;
			}
			this._gameHead.setData({score: this._score, maxScore: maxScore});
		}
	}
}