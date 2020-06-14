import { observable, action, computed } from "mobx";

export type Stage = "start" | "character-selection" | "in-game" | "countdown" | "final";

export type Allergy = "peanuts" | "glutten" | "lactose" | "neutral";

export type Character = {
  id: string;
  name: string;
  allergies: Allergy[];
  imagePrefix: string;
  customSelectImageWidth?: string;
  customHoldStyle?: any;
  age: number;
};

export type FoodDetails = {
  allergy: Allergy;
  imageUrl: string;
};

class GameStore {
  @observable currentStage: Stage = "start";
  @observable healthPoints = 3;
  maxGamePoints = 15;
  @observable gamePoints = 0;
  @action setStage = (stage: Stage) => (this.currentStage = stage);
  @action setCurrentCharacter = (characterId: string) => {
    this.currentCharacter =
      this.characters.find(x => x.id === characterId) || this.characters[0];
  };

  foods: FoodDetails[] = [
    {
      allergy: "neutral",
      imageUrl: "apple.png"
    },
    {
      allergy: "neutral",
      imageUrl: "banana.png"
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
      allergies: ["peanuts"],
      imagePrefix: "player-1",
      age: 24,
    },
    {
      id: "2",
      name: "Dorin",
      allergies: ["glutten"],
      imagePrefix: "player-2",
      customHoldStyle: {
        bottom: '-237px'
      },
      age: 30
    },
    {
      id: "3",
      name: "Sorin",
      allergies: ["lactose"],
      imagePrefix: "player-3",
      customSelectImageWidth: "70px",
      customHoldStyle: {
        bottom: '-390px'
      },
      age: 21
    }
  ];

  @observable currentCharacter: Character = this.characters[0];

  @action
  takeHit = () => {
    if (this.healthPoints === 0) return;
    this.healthPoints = this.healthPoints - 1;
  };

  @action
  addGamePoint = () => {
    if (this.gamePoints >= this.maxGamePoints) return;
    this.gamePoints = this.gamePoints + 1;
  };

  @action
  reset = () => {
    this.currentCharacter = this.characters[0];
    this.healthPoints = 3;
    this.gamePoints = 0;
  }

  @computed
  get shouldEndGame() {
    return this.healthPoints === 0 || this.gamePoints >= this.maxGamePoints;
  }
}

export default new GameStore();
