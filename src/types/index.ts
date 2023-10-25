export type RootStackParams = {
  Home: undefined;
  AddFood: undefined;
};

export type AddFoodModalProps = {
  onClose: (shouldUpdate?: boolean) => void;
  isOpen: boolean;
};

export type Meal = {
  calories: string;
  name: string;
  portion: string;
  date?: string;
};

export type TodayCaloriesProps = {
  total: number | string;
  consumed: number | string;
  remaining: number | string;
  percentage: number;
};

export type TodayMealsProps = {
  foods: Meal[];
  onCompleteAddRemove?: () => void;
};

export type MealItemsProps = Meal & {
  isAbleToAdd?: boolean;
  onCompleteAddRemove?: () => void;
  itemPosition?: number;
};
