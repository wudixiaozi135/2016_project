/**
 * Created by Administrator on 2015/10/27.
 */
package com.xiaoding.org.mathFormula.ui
{
	import com.xiaoding.org.mathFormula.constants.FunctionTypeConstants;
	import com.xiaoding.org.mathFormula.constants.GameEventConstants;
	import com.xiaoding.org.mathFormula.constants.GlobalData;
	import com.xiaoding.org.mathFormula.ui.component.CoordinateAxis;
	import com.xuele.xiaoding.org.event.GameDispatcher;
	import com.xuele.xiaoding.org.event.GameEvent;

	import flash.display.Graphics;
	import flash.events.MouseEvent;
	import flash.geom.Point;

	import org.flexlite.domUI.components.Group;
	import org.flexlite.domUI.core.DomGlobals;
	import org.flexlite.domUI.core.UIComponent;

	public class CoordinateSystemUI extends Group
	{
		private var _coordinateX:CoordinateAxis;
		private var _coordinateY:CoordinateAxis;
		//函数画布1
		private var _functionCanvas1:UIComponent;

		//函数画布2
		private var _functionCanvas2:UIComponent;


		private var _lastP:Point = new Point();

		private var _offValueX:Number = 0;
		private var _offValueY:Number = 0;

		private var _commands:Vector.<int>;
		private var _datas:Vector.<Number>;

		//函数输入的系数对象
		private var _functionInputObj:Object;

		public function CoordinateSystemUI()
		{
			super();
			_commands = new <int>[];
			_datas = new <Number>[];
		}

		private function removeEvent():void
		{
			GameDispatcher.removeEventListener(GameEventConstants.COMMIT_FUNCTION_PARAM, onCommitFunctionParam);
			GameDispatcher.removeEventListener(GameEventConstants.STAGE_RESIZE, onStageResize);
			if (DomGlobals.stage)
			{
				DomGlobals.stage.removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
			}
		}

		private function addEvent():void
		{
			removeEvent();
			GameDispatcher.addEventListener(GameEventConstants.STAGE_RESIZE, onStageResize, false, 0, true);
			GameDispatcher.addEventListener(GameEventConstants.COMMIT_FUNCTION_PARAM, onCommitFunctionParam, false, 0, true);
			GameDispatcher.addEventListener(GameEventConstants.CHANGE_SCALE_UINT, onChangeScaleUint, false, 0, true);
			if (DomGlobals.stage)
			{
				DomGlobals.stage.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown, false, 0, true);
			}
		}

		private function onChangeScaleUint(event:GameEvent):void
		{
			if (_coordinateX)
			{
				_coordinateX.uintScale = event.param.uint;
				GlobalData.uintScale = _coordinateX.uintScale;
			}
			if (_coordinateY)
			{
				_coordinateY.uintScale = event.param.uint;
			}
			update();
		}

		private function onCommitFunctionParam(event:GameEvent):void
		{
			_functionInputObj = event.param;
			update();
		}


		private function update():void
		{
			if (_functionCanvas1)
			{
				_functionCanvas1.graphics.clear();
			}
			if (_functionCanvas2)
			{
				_functionCanvas2.graphics.clear();
			}
			if (!_functionInputObj) return;

			var param:Object = _functionInputObj;
			var k:Number, b:Number, c:Number;
			var i:int, len:int;
			var independtentVariable:Number;//自变量
			var dependtentVariable:Number;//因变量
			var radio:Number = GlobalData.REDUCE_RADIO;//一个缩小的比例
			var pos:int = 0;
			var uint:int = 0;
			if (param.type == FunctionTypeConstants.INVERSE_PROPORTIONAL_FUNCTION)
			{
				//y=k/x;
				k = param.k;
				if (!isNaN(k))
				{
					uint = _coordinateX.uintScale;
					for (i = 0, len = _coordinateX.positiveHalfXAxis / radio; i < len; i++)
					{
						i != 0 ? _commands[i] = 2 : _commands[i] = 1;

						independtentVariable = (i + 1) * radio;
						dependtentVariable = k / independtentVariable;

						_datas[pos] = _coordinateX.originP.x + independtentVariable * _coordinateX.scale;
						_datas[pos + 1] = _coordinateX.originP.y - dependtentVariable * _coordinateX.scale;
						pos += 2;
					}

					_commands.splice(len, _commands.length);
					_datas.splice(len * 2, _datas.length);

					drawPathData(_functionCanvas1.graphics, _commands, _datas);

					pos = 0;
					for (i = 0, len = _coordinateX.negativeHalfXAxis / radio; i < len; i++)
					{
						i != 0 ? _commands[i] = 2 : _commands[i] = 1;

						independtentVariable = -(i + 1) * radio;
						dependtentVariable = k / independtentVariable;

						_datas[pos] = _coordinateX.originP.x + independtentVariable * _coordinateX.scale;
						_datas[pos + 1] = _coordinateX.originP.y - dependtentVariable * _coordinateX.scale;
						pos += 2;
					}
					_commands.splice(len, _commands.length);
					_datas.splice(len * 2, _datas.length);

					drawPathData(_functionCanvas2.graphics, _commands, _datas);
				}
			} else if (param.type == FunctionTypeConstants.POSITIVE_PROPORTIONAL_FUNCTION)
			{
				//y=kx+b;
				k = param.k;
				b = param.b;
				if (!isNaN(k))
				{
					uint = _coordinateX.uintScale;
					for (i = 0, len = _coordinateX.positiveHalfXAxis / radio; i < len; i++)
					{
						i != 0 ? _commands[i] = 2 : _commands[i] = 1;

						independtentVariable = (i + 1) * radio;
						dependtentVariable = k * independtentVariable + b;

						_datas[pos] = _coordinateX.originP.x + independtentVariable * _coordinateX.scale;
						_datas[pos + 1] = _coordinateX.originP.y - dependtentVariable * _coordinateX.scale;
						pos += 2;
					}

					_commands.splice(len, _commands.length);
					_datas.splice(len * 2, _datas.length);

					drawPathData(_functionCanvas1.graphics, _commands, _datas);

					pos = 0;
					for (i = 0, len = _coordinateX.negativeHalfXAxis / radio; i < len; i++)
					{
						i != 0 ? _commands[i] = 2 : _commands[i] = 1;

						independtentVariable = -(i + 1) * radio;
						dependtentVariable = k * independtentVariable + b;

						_datas[pos] = _coordinateX.originP.x + independtentVariable * _coordinateX.scale;
						_datas[pos + 1] = _coordinateX.originP.y - dependtentVariable * _coordinateX.scale;
						pos += 2;
					}
					_commands.splice(len, _commands.length);
					_datas.splice(len * 2, _datas.length);

					drawPathData(_functionCanvas2.graphics, _commands, _datas);
				}
			} else if (param.type == FunctionTypeConstants.QUADRATIC_FUNCTION)
			{
				//y=kx^2+bx+c;
				k = param.k;
				b = param.b;
				c = param.c;
				if (!isNaN(k))
				{
					uint = _coordinateX.uintScale;
					for (i = 0, len = _coordinateX.positiveHalfXAxis / radio; i < len; i++)
					{
						i != 0 ? _commands[i] = 2 : _commands[i] = 1;

						independtentVariable = (i + 1) * radio;
						dependtentVariable = k * independtentVariable * independtentVariable + b * independtentVariable + c;

						_datas[pos] = _coordinateX.originP.x + independtentVariable * _coordinateX.scale;
						_datas[pos + 1] = _coordinateX.originP.y - dependtentVariable * _coordinateX.scale;
						pos += 2;
					}

					_commands.splice(len, _commands.length);
					_datas.splice(len * 2, _datas.length);

					drawPathData(_functionCanvas1.graphics, _commands, _datas);

					pos = 0;
					for (i = 0, len = _coordinateX.negativeHalfXAxis / radio; i < len; i++)
					{
						i != 0 ? _commands[i] = 2 : _commands[i] = 1;

						independtentVariable = -(i + 1) * radio;
						dependtentVariable = k * independtentVariable * independtentVariable + b * independtentVariable + c;

						_datas[pos] = _coordinateX.originP.x + independtentVariable * _coordinateX.scale;
						_datas[pos + 1] = _coordinateX.originP.y - dependtentVariable * _coordinateX.scale;
						pos += 2;
					}
					_commands.splice(len, _commands.length);
					_datas.splice(len * 2, _datas.length);

					drawPathData(_functionCanvas2.graphics, _commands, _datas);
				}
			} else if (param.type == FunctionTypeConstants.CONSTANT_FUNCTION)
			{
				//y=c
				c = param.c;
				uint = _coordinateX.uintScale;
				for (i = 0, len = _coordinateX.positiveHalfXAxis / radio; i < len; i++)
				{
					i != 0 ? _commands[i] = 2 : _commands[i] = 1;

					independtentVariable = (i + 1) * radio;
					dependtentVariable = c;

					_datas[pos] = _coordinateX.originP.x + independtentVariable * _coordinateX.scale;
					_datas[pos + 1] = _coordinateX.originP.y - dependtentVariable * _coordinateX.scale;
					pos += 2;
				}

				_commands.splice(len, _commands.length);
				_datas.splice(len * 2, _datas.length);

				drawPathData(_functionCanvas1.graphics, _commands, _datas);

				pos = 0;
				for (i = 0, len = _coordinateX.negativeHalfXAxis / radio; i < len; i++)
				{
					i != 0 ? _commands[i] = 2 : _commands[i] = 1;

					independtentVariable = -(i + 1) * radio;
					dependtentVariable = c;

					_datas[pos] = _coordinateX.originP.x + independtentVariable * _coordinateX.scale;
					_datas[pos + 1] = _coordinateX.originP.y - dependtentVariable * _coordinateX.scale;
					pos += 2;
				}
				_commands.splice(len, _commands.length);
				_datas.splice(len * 2, _datas.length);

				drawPathData(_functionCanvas2.graphics, _commands, _datas);
			}
		}

		private function drawPathData(graphics:Graphics, commands:Vector.<int>, datas:Vector.<Number>, thickness:Number = 1, color:uint = 0x0):void
		{
			graphics.clear();
			graphics.lineStyle(thickness, color);
			graphics.drawPath(commands, datas);
			graphics.endFill();
		}

		private function onMouseDown(event:MouseEvent):void
		{
			DomGlobals.stage.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove, false, 0, true);
			_lastP.x = event.stageX;
			_lastP.y = event.stageY;
			DomGlobals.stage.addEventListener(MouseEvent.MOUSE_UP, onStageUp, false, 0, true);
		}

		private function onStageUp(event:MouseEvent):void
		{
			DomGlobals.stage.removeEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
			DomGlobals.stage.removeEventListener(MouseEvent.MOUSE_UP, onStageUp);
		}

		private var _coordinateOriginP:Point;

		private function onMouseMove(event:MouseEvent):void
		{
			_offValueX = event.stageX - _lastP.x;
			_offValueY = event.stageY - _lastP.y;

			if (_coordinateX)
			{
				_coordinateOriginP = _coordinateX.originP;
				_coordinateX.originP = new Point(_coordinateOriginP.x + _offValueX, _coordinateOriginP.y + _offValueY);
				GlobalData.originX = _coordinateX.originP.x;
				GlobalData.originY = _coordinateX.originP.y;
				update();
			}
			if (_coordinateY)
			{
				_coordinateOriginP = _coordinateY.originP;
				_coordinateY.originP = new Point(_coordinateOriginP.x + _offValueX, _coordinateOriginP.y + _offValueY);
			}

			_lastP.x = event.stageX;
			_lastP.y = event.stageY;
		}

		private function onStageResize(event:GameEvent):void
		{
			if (_coordinateX)
			{
				_coordinateX.originP = new Point(GlobalData.stageWidth * .5, GlobalData.stageHeight * .5);
				_coordinateX.total = GlobalData.stageWidth - 5;
				GlobalData.originX = _coordinateX.originP.x;
				GlobalData.originY = _coordinateX.originP.y;
				update();
			}
			if (_coordinateY)
			{
				_coordinateY.originP = new Point(GlobalData.stageWidth * .5, GlobalData.stageHeight * .5);
				_coordinateY.total = GlobalData.stageHeight - 10;
			}
		}

		override protected function createChildren():void
		{
			super.createChildren();

			_coordinateX = new CoordinateAxis(CoordinateAxis.X_axis, GlobalData.SCALE, new Point(stage.stageWidth * .5, stage.stageHeight * .5), stage.stageWidth - 5, 1);
			addElement(_coordinateX);

			_coordinateY = new CoordinateAxis(CoordinateAxis.Y_axis, GlobalData.SCALE, new Point(stage.stageWidth * .5, stage.stageHeight * .5), stage.stageHeight - 10, 1);
			addElement(_coordinateY);

			_functionCanvas1 = new UIComponent();
			_functionCanvas1.mouseEnabled = false;
			_functionCanvas1.mouseChildren = false;
			addElement(_functionCanvas1);

			_functionCanvas2 = new UIComponent();
			_functionCanvas2.mouseChildren = false;
			_functionCanvas2.mouseEnabled = false;
			addElement(_functionCanvas2);
			addEvent();
		}

		private static var _instance:CoordinateSystemUI = null;

		public static function get getInstance():CoordinateSystemUI
		{
			if (_instance == null)
			{
				_instance = new CoordinateSystemUI();
			}
			return _instance;
		}


	}
}
