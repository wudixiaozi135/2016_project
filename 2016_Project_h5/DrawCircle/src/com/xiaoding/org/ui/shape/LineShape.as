/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.ui.shape
{
	import com.xiaoding.org.constants.GlobalDatasDrawCircle;
	import com.xiaoding.org.ui.shape.interf.IShapeBase;
	import com.xuele.xiaoding.org.utils.MathTool;

	import flash.events.MouseEvent;
	import flash.geom.Point;

	public class LineShape extends ShapeBase
	{
		private var _selectObj:Object;

		//角度
		private var _angle:Number;
		//倾斜角
		private var _slopeAngle:Number;

		//倾斜后的角
		private var _slopeP:Point;

		//记录倾斜角的变化
		private var _recordSlope:Number = NaN;

		public function LineShape()
		{
			super();
			addEvent();
		}

		override public function addEvent():void
		{
			removeEvent();
		}

		override public function checkCollision(point:Point):Boolean
		{
			if (!startCheck) return false;

			collisionPoint = point.subtract(new Point(x, y));
			if (collisionPoint)
			{
				if (containPoint(collisionPoint))
				{
					magicDraw();
					pointInShape = true;
				} else
				{
					magicPen.graphics.clear();
					pointInShape = false;
					crossPoint = null;
				}
			}
			return pointInShape;
		}

		//发生碰撞时绘制图形
		override public function magicDraw():void
		{
			magicPen.graphics.clear();
			magicPen.graphics.lineStyle(GlobalDatasDrawCircle.MAGIC_LINE_SIZE, GlobalDatasDrawCircle.MAGIC_LINE_COLOR);
			magicPen.graphics.moveTo(startP.x, startP.y);
			magicPen.graphics.lineTo(endP.x, endP.y);
			if (collisionPoint)
			{
				var ox:Number = collisionPoint.x;
				var oy:Number = collisionPoint.y;
				crossPoint = getEquationPoint(startP, endP, collisionPoint);
				if (crossPoint)
				{
					ox = crossPoint.x;
					oy = crossPoint.y;
				}
				magicPen.graphics.lineStyle(GlobalDatasDrawCircle.NORMAL_SIZE, GlobalDatasDrawCircle.NORMAL_COLOR);
				magicPen.graphics.drawCircle(ox, oy, GlobalDatasDrawCircle.NORMAL_RADIUS);
				magicPen.graphics.endFill();
			}
		}

		override public function getEquationPoint(startP:Point, endP:Point, checkP:Point):Point
		{
			if (checkP)
			{
				var obj:Object = MathTool.getEquationOfLine(startP, endP);
				var ox:Number = checkP.x;
				var oy:Number = checkP.y;
				var a:Number = obj.a;
				if (a == -Infinity || a == Infinity)
				{
					ox = startP.x;
				}
				else if (a == 0)
				{
					oy = -obj.c / obj.b;
				} else
				{
					var diffP:Point = endP.subtract(startP);
					var xw:Number = diffP.x < 0 ? -diffP.x : diffP.x;
					var xh:Number = diffP.y < 0 ? -diffP.y : diffP.y;
					if (xw > xh)
					{
						oy = (-obj.a * ox - obj.c) / obj.b;
					} else
					{
						ox = (-obj.c - obj.b * oy) / obj.a;
					}
				}
				return new Point(ox, oy);
			}
			return null;
		}

		override public function removeEvent():void
		{
		}

		override protected function createChildren():void
		{
			super.createChildren();

			startSpot = new Spot();
			addElement(startSpot);
			endSpot = new Spot();
			addElement(endSpot);

			addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown, false, 0, true);
		}

		private function onMouseDown(event:MouseEvent):void
		{
			var target:Object = event.target;
			if (target is Spot)
			{
				_selectObj = target;
				stage.addEventListener(MouseEvent.MOUSE_MOVE, onStageMove, false, 0, true);
				stage.addEventListener(MouseEvent.MOUSE_UP, onStageUp, false, 0, true);
			}
		}

		private function onStageUp(event:MouseEvent):void
		{
			if (stage)
			{
				stage.removeEventListener(MouseEvent.MOUSE_MOVE, onStageMove);
				stage.removeEventListener(MouseEvent.MOUSE_UP, onStageUp);
			}
		}

		private function onStageMove(event:MouseEvent):void
		{
			var point:Point = new Point(event.stageX, event.stageY).subtract(new Point(x, y));
			if (_selectObj == startSpot)
			{
				startTo(point);
				draw();
				updateParentScale(1);
			} else if (_selectObj == endSpot)
			{
				moveTo(point);
				updateParentScale(2);
			}
		}

		public function updateParentScale(type:int):void
		{
			var parent:IShapeBase;
			if (type == 1)
			{
				parent = parentEndNode;
			} else if (type == 2)
			{
				parent = parentStartNode;
			}
			if (!parent) return;

			var scale:Number;
			var diffP:Point = parent.endP.subtract(parent.startP);
			var sP:Point, eP:Point;
			if (Math.abs(diffP.x) >= Math.abs(diffP.y))//偏水平
			{
				if (diffP.x >= 0)
				{
					sP = parent.startP;
					eP = parent.endP;
				} else
				{
					sP = parent.endP;
					eP = parent.startP;
				}

				if (type == 1)
				{
					scale = (startP.x - sP.x) / (eP.x - sP.x);
				} else
				{
					scale = (endP.x - sP.x) / (eP.x - sP.x);
				}
			} else//偏垂直
			{
				diffP.y >= 0 ? eP = parent.startP : eP = parent.endP;
				if (diffP.y >= 0)
				{
					sP = parent.startP;
					eP = parent.endP;
				} else
				{
					sP = parent.endP;
					eP = parent.startP;
				}

				if (type == 1)
				{
					scale = (startP.y - sP.y) / (eP.y - sP.y);
				} else
				{
					scale = (endP.y - sP.y) / (eP.y - sP.y);
				}
			}

			if (type == 1)
			{
				parentStartScale = scale;
			} else if (type == 2)
			{
				parentEndScale = scale;
			}
		}


		override public function startTo(point:Point):void
		{
			startP = point;

			if (endP)
			{
				startMoveTo(startP);
			}
			if (startSpot)
			{
				startSpot.draw(startP);
			}
			simpleMoveTo(startP, 1);
		}

		/*
		 * 拖拽开始点时移动
		 * */
		private function startMoveTo(point:Point):void
		{
			if (parentStartNode)
			{
				var parentStartP:Point = parentStartNode.startP;
				var parentEndP:Point = parentStartNode.endP;

				var obj:Point = parentStartNode.limitRange(parentStartP, parentEndP, point);
				point = obj.clone();
				point = parentStartNode.getEquationPoint(parentStartNode.startP, parentStartNode.endP, point);
				obj = null;
			}

			startP = point;
			_angle = MathTool.getAngle(endP, point);
			_slopeAngle = (int(_angle / 15) + ((_angle % 15) > 7.5 ? 1 : 0)) * 15;

			if (_recordSlope != _slopeAngle)//当角度发生改变时重新计算下倾斜角
			{
				_recordSlope = _slopeAngle;
				_slopeP = point.clone();
			}

			if (GlobalDatasDrawCircle.isKeyShift)
			{
				if (_slopeAngle == 0 || _slopeAngle == 180 || _slopeAngle == -180)
				{
					startP.x = point.x;
					startP.y = endP.y;
				} else if (_slopeAngle == 90 || _slopeAngle == -90)
				{
					startP.x = endP.x;
					startP.y = point.y;
				} else
				{
					startP = getEquationPoint(endP, _slopeP, point);
				}
			}
		}

		override public function moveTo(point:Point):void
		{
			if (parentEndNode)
			{
				var parentStartP:Point = parentEndNode.startP;
				var parentEndP:Point = parentEndNode.endP;

				//取值范围
				var obj:Point = parentEndNode.limitRange(parentStartP, parentEndP, point);
				point.setTo(obj.x, obj.y);
				point = parentEndNode.getEquationPoint(parentEndNode.startP, parentEndNode.endP, point);
				obj = null;
			}

			endP = point;
			_angle = MathTool.getAngle(startP, point);
			_slopeAngle = (int(_angle / 15) + ((_angle % 15) > 7.5 ? 1 : 0)) * 15;

			if (_recordSlope != _slopeAngle)//当角度发生改变时重新计算下倾斜角
			{
				_recordSlope = _slopeAngle;
				_slopeP = point.clone();
			}

			if (GlobalDatasDrawCircle.isKeyShift)
			{
				if (_slopeAngle == 0 || _slopeAngle == 180 || _slopeAngle == -180)
				{
					endP.x = point.x;
					endP.y = startP.y;
				} else if (_slopeAngle == 90 || _slopeAngle == -90)
				{
					endP.x = startP.x;
					endP.y = point.y;
				} else
				{
					endP = getEquationPoint(startP, _slopeP, point);
				}
			}

			simpleMoveTo(endP, 2);
		}

		override public function limitRange(parentStartP:Point, parentEndP:Point, point:Point):Point
		{
			//取值范围
			var minValue:Number, maxValue:Number;
			var diffP:Point = parentEndP.subtract(parentStartP);
			if (Math.abs(diffP.x) >= Math.abs(diffP.y))//偏水平
			{
				minValue = Math.min(parentStartP.x, parentEndP.x);
				maxValue = Math.max(parentStartP.x, parentEndP.x);
			} else//偏垂直
			{
				minValue = Math.min(parentStartP.y, parentEndP.y);
				maxValue = Math.max(parentStartP.y, parentEndP.y);
			}

			point.x = point.x <= minValue ? minValue : point.x;
			point.x = point.x >= maxValue ? maxValue : point.x;

			point.y = point.y <= minValue ? minValue : point.y;
			point.y = point.y >= maxValue ? maxValue : point.y;
			return point;
		}


		/*
		 * @param point 目标点
		 * @type 1 简单start移动，2简单move移动
		 * */
		override public function simpleMoveTo(point:Point, type:int = 1):void
		{
			if (type == 1)
			{
				startP = point;
				startSpot && startSpot.draw(startP);
			} else if (type == 2)
			{
				endP = point;
				if (endSpot)
				{
					endSpot.draw(endP);
				}
			}
			draw();
			updateSonNodes();
		}

		private function updateSonNodes():void
		{
			//更新其关联的子节点
			if (sonNodes && sonNodes.length)
			{
				var element:IShapeBase;
				var scaleP:Point;
				var type:int = 0;
				for (var i:int = 0, len:int = sonNodes.length; i < len; i++)
				{
					element = sonNodes[i];
					if (element.parentEndNode)
					{
						type = getReleativeType(element.parentEndNode.startP, element.parentEndNode.endP);
						if (type == 1)
						{
							if (element.parentEndNode.startP.x < element.parentEndNode.endP.x)
							{
								scaleP = Point.interpolate(element.parentEndNode.startP, element.parentEndNode.endP, 1 - element.parentEndScale);
							} else
							{
								scaleP = Point.interpolate(element.parentEndNode.endP, element.parentEndNode.startP, 1 - element.parentEndScale);
							}
						} else if (type == 2)
						{
							if (element.parentEndNode.startP.y < element.parentEndNode.endP.y)
							{
								scaleP = Point.interpolate(element.parentEndNode.startP, element.parentEndNode.endP, 1 - element.parentEndScale);
							} else
							{
								scaleP = Point.interpolate(element.parentEndNode.endP, element.parentEndNode.startP, 1 - element.parentEndScale);
							}
						}
						element.simpleMoveTo(scaleP, 2);
					}
					if (element.parentStartNode)
					{
						type = getReleativeType(element.parentStartNode.startP, element.parentStartNode.endP);
						if (type == 1)
						{
							if (element.parentStartNode.startP.x < element.parentStartNode.endP.x)
							{
								scaleP = Point.interpolate(element.parentStartNode.startP, element.parentStartNode.endP, 1 - element.parentStartScale);
							} else
							{
								scaleP = Point.interpolate(element.parentStartNode.endP, element.parentStartNode.startP, 1 - element.parentStartScale);
							}
						} else if (type == 2)
						{
							if (element.parentStartNode.startP.y < element.parentStartNode.endP.y)
							{
								scaleP = Point.interpolate(element.parentStartNode.startP, element.parentStartNode.endP, 1 - element.parentStartScale);
							} else
							{
								scaleP = Point.interpolate(element.parentStartNode.endP, element.parentStartNode.startP, 1 - element.parentStartScale);
							}
						}
						element.simpleMoveTo(scaleP, 1);
					}
				}
			}
		}

		/*
		 * 获取两点水平与垂直的差距
		 * */
		private function getReleativeType(parentStartP:Point, parentEndP:Point):int
		{
			var diffP:Point = parentEndP.subtract(parentStartP);
			if (Math.abs(diffP.x) >= Math.abs(diffP.y))//偏水平
			{
				return 1;
			} else//偏垂直
			{
				return 2;
			}
			return 0;
		}

		private function draw():void
		{
			if (!startP || !endP) return;
			this.graphics.clear();
			this.graphics.lineStyle(GlobalDatasDrawCircle.LINE_SIZE, GlobalDatasDrawCircle.LINE_COLOR);
			this.graphics.moveTo(startP.x, startP.y);
			this.graphics.lineTo(endP.x, endP.y);
			this.graphics.endFill();
		}

		/*
		 * 指点在线上
		 * */
		override public function containPoint(point:Point):Boolean
		{
			if (startSpot && endSpot)
			{
				var p1:Point = this.localToGlobal(this.startSpot.point);
				var p2:Point = this.localToGlobal(this.endSpot.point);
				return MathTool.IsPointInLine(p1, p2, point, GlobalDatasDrawCircle.PRECISE);
			}
			return false;
		}

		/*
		 * 点在线上除两端点外
		 * */
		override public function pointInShapeInner(point:Point):Boolean
		{
			if (startSpot && endSpot)
			{
				var p1:Point = this.localToGlobal(this.startSpot.point);
				var p2:Point = this.localToGlobal(this.endSpot.point);

				if (Point.distance(p1, point) <= GlobalDatasDrawCircle.PRECISE)
				{
					return false;
				}

				if (Point.distance(p2, point) <= GlobalDatasDrawCircle.PRECISE)
				{
					return false;
				}
			}
			var bool:Boolean = containPoint(point);
			return bool;
		}
	}
}
