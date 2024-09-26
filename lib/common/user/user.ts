export interface UserHeaderInterface {
  name: string;
  surname: string;
  photo: Blob[];
}

export enum Cinsiyet {
  ERKEK = "ERKEK",
  KADIN = "KADIN",
}

export enum KanGrubu {
    A_POZITIF = "A+",
    A_NEGATIF = "A-",
    B_POZITIF = "B+",
    B_NEGATIF = "B-",
    AB_POZITIF = "AB+",
    AB_NEGATIF = "AB-",
    O_POZITIF = "O+",
    O_NEGATIF = "O-",
}

export interface UserKisiselInterface {
  id: number;
  isim: string;
  soyisim: string;
  tcKimlikNo: number;

  cinsiyet: Cinsiyet;

  akademikUnvan: string;
  email: string;

  dogumTarihi: Date;

  kanGrubu: KanGrubu;

  telefon: string;

  aracPlakasi: string;

  acilDurumKisi: string;
  acilDurumTelefon: string;

  adres: string;

  photo: Blob[];
}
