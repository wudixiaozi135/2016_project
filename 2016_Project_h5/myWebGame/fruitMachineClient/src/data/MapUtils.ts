/**
 * Created by xiaoding on 2016/5/12.
 */
class MapUtils
{
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