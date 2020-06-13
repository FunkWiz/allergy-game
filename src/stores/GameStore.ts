import { observable, action } from "mobx";

export type Stage = "start" | "character-selection" | "in-game";

export type Allergy = "peanuts" | "glutten" | "lactose" | "neutral";

export type Character = {
  id: string;
  name: string;
  allergies: Allergy[];
  imagePrefix: string;
  customSelectImageWidth?: string;
};

export type FoodDetails = {
  allergy: Allergy;
  imageUrl: string;
};

class GameStore {
  @observable currentStage: Stage = "start";
  @observable currentCharacter?: Character;
  @observable healthPoints = 3;
  @action setStage = (stage: Stage) => (this.currentStage = stage);
  @action setCurrentCharacter = (characterId: string) => {
    this.currentCharacter = this.characters.find(x => x.id === characterId);
  };

  foods: FoodDetails[] = [
    {
      allergy: "neutral",
      imageUrl: "apple.png"
    },
    {
      allergy: "neutral",
      imageUrl: "carrot.png"
    },
    {
      allergy: "neutral",
      imageUrl: "banana.png"
    },
    {
      allergy: "neutral",
      imageUrl: "strawberry.png"
    },
    {
      allergy: "peanuts",
      imageUrl: "peanut.png"
    },
    {
      allergy: "peanuts",
      imageUrl: "peanut-jar.png"
    },
    {
      allergy: "lactose",
      imageUrl: "milk-bottle.png"
    },
    {
      allergy: "lactose",
      imageUrl: "cheese.png"
    },
    {
      allergy: "lactose",
      imageUrl: "milkshake.png"
    },
    {
      allergy: "glutten",
      imageUrl: "bread.png"
    },
    {
      allergy: "glutten",
      imageUrl: "cookie.png"
    },
    {
      allergy: "glutten",
      imageUrl: "spaghetti.png"
    }
  ];

  characters: Character[] = [
    {
      id: "1",
      name: "Lorin",
      allergies: ["peanuts", 'lactose'],
      imagePrefix: "player-1"
    },
    {
      id: "2",
      name: "Dorin",
      allergies: ["peanuts"],
      imagePrefix: "player-2"
    },
    {
      id: "3",
      name: "Sorin",
      allergies: ["peanuts"],
      imagePrefix: "player-3",
      customSelectImageWidth: "70px"
    }
  ];

  @action
  takeHit = () => {
    if (this.healthPoints === 0) return;
    this.healthPoints = this.healthPoints - 1;
  }
}

export default new GameStore();
