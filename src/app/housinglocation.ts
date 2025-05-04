export interface HousingLocation {
    id: number;
    name: string;
    city: string;
    state: string;
    photo: string;
    availableUnits: number;
    wifi: boolean;
    laundry: boolean;
}


//Exemple d'interface imbriquée

export interface Figurine {
  nom:string, 
  taille: Taille;
  licence: Licence;
}

export interface Taille {
  hauteur: number;
}

export interface Licence {
  nom: string;
}

const mafigurine: Figurine = {
    nom: "",
    taille: {
      hauteur: 12
    },
    licence: {
      nom: "marvel"
    }
}