import { observable, action, computed } from "mobx";
import { resetGlobalState } from "mobx/lib/internal";

export type Stage = "start" | "character-selection" | "in-game";

export type Allergy = "peanuts" | "glutten" | "lactose" | "neutral";

export type Character = {
  id: string;
  name: string;
  allergies: Allergy[];
  imagePrefix: string;
  customSelectImageWidth?: string;
  customHoldStyle?: any;
};

export type FoodDetails = {
  allergy: Allergy;
  imageUrl: string;
};

class GameStore {
  @observable currentStage: Stage = "start";
  @observable healthPoints = 3;
  maxGamePoints = 30;
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
      allergies: ["peanuts", "lactose"],
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
      customSelectImageWidth: "70px",
      customHoldStyle: {
        top: '-186px'
      }
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
