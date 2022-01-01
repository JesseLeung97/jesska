import { TTranslation } from "types/localizationTypes";
import englishJSON from "localization/translations/english.json";
import japaneseJSON from "localization/translations/japanese.json";

const english: TTranslation = englishJSON as TTranslation;
const japanese: TTranslation = japaneseJSON as TTranslation;

export const translations = {
    english,
    japanese
}