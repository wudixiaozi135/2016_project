/**
 * Created by xiaoding on 2016/5/12.
 */
class MapUtils
{
	public static createMapData(mapData:MapData[]):void
	{
		let data:MapData = new MapData();
		data.fruitType = FruitItemType.typeOrange;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 0;
		data.column = 0;
		mapData[0] = data;

		data = new MapData();
		data.fruitType = FruitItemType.typeRing;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 0;
		data.column = 1;
		mapData[1] = data;

		data = new MapData();
		data.fruitType = FruitItemType.typeBar;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 0;
		data.column = 2;
		mapData[2] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeBar;
		data.count = 2;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 0;
		data.column = 3;
		mapData[3] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeApple;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 0;
		data.column = 4;
		mapData[4] = data;

		data = new MapData();
		data.fruitType = FruitItemType.typeApple;
		data.count = 2;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 0;
		data.column = 5;
		mapData[5] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typePear;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 0;
		data.column = 6;
		mapData[6] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeWatermelon;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 1;
		data.column = 6;
		mapData[7] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeWatermelon;
		data.count = 2;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 2;
		data.column = 6;
		mapData[8] = data;

		data = new MapData();
		data.fruitType = FruitItemType.typeGoodLuck;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 3;
		data.column = 6;
		mapData[9] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeApple;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 4;
		data.column = 6;
		mapData[10] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeOrange;
		data.count = 2;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 5;
		data.column = 6;
		mapData[11] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeOrange;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 6;
		data.column = 6;
		mapData[12] = data;

		data = new MapData();
		data.fruitType = FruitItemType.typeRing;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 6;
		data.column = 5;
		mapData[13] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeSeven;
		data.count = 2;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 6;
		data.column = 4;
		mapData[14] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeSeven;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 6;
		data.column = 3;
		mapData[15] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeApple;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 6;
		data.column = 2;
		mapData[16] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typePear;
		data.count = 2;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 6;
		data.column = 1;
		mapData[17] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typePear;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 6;
		data.column = 0;
		mapData[18] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeStar;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 5;
		data.column = 0;
		mapData[19] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeStar;
		data.count = 2;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 4;
		data.column = 0;
		mapData[20] = data;

		data = new MapData();
		data.fruitType = FruitItemType.typeGoodLuck;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 3;
		data.column = 0;
		mapData[21] = data;


		data = new MapData();
		data.fruitType = FruitItemType.typeApple;
		data.count = 1;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 2;
		data.column = 0;
		mapData[22] = data;

		
		data = new MapData();
		data.fruitType = FruitItemType.typeRing;
		data.count = 2;
		data.price = MapUtils.getPrice(data.fruitType) * data.count;
		data.row = 1;
		data.column = 0;
		mapData[23] = data;
	}

	public static getPrice(type:FruitItemType):number
	{
		let price:number = 0;
		switch (type)
		{
			case FruitItemType.typeApple:
				price = 5;
				break;
			case FruitItemType.typeBar:
				price = 25;
				break;
			case FruitItemType.typeOrange:
				price = 5;
				break;
			case FruitItemType.typePear:
				price = 5;
				break;
			case FruitItemType.typeRing:
				price = 10;
				break;
			case FruitItemType.typeSeven:
				price = 77;
				break;
			case FruitItemType.typeStar:
				price = 15;
				break;
			case FruitItemType.typeWatermelon:
				price = 20;
				break;
			case FruitItemType.typeGoodLuck:
				price = 0;
				break;
		}
		return price;
	}
}