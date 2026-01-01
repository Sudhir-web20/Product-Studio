
export enum AppMode {
  PRODUCT_ONLY = 'PRODUCT_ONLY',
  PRODUCT_AVATAR = 'PRODUCT_AVATAR'
}

export enum BackgroundStyle {
  WHITE_STUDIO = 'White Studio',
  MARBLE = 'Marble',
  DARK = 'Dark',
  LIFESTYLE = 'Lifestyle'
}

export enum SceneType {
  STUDIO = 'Studio',
  GYM = 'Gym',
  URBAN = 'Urban City',
  NATURE = 'Outdoor Nature',
  HOME = 'Home Lifestyle'
}

export enum AspectRatio {
  ONE_ONE = '1:1',
  SIXTEEN_NINE = '16:9',
  FOUR_THREE = '4:3'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export interface StudioSettings {
  mode: AppMode;
  backgroundStyle: BackgroundStyle;
  sceneType: SceneType;
  aspectRatio: AspectRatio;
  gender: Gender;
}
