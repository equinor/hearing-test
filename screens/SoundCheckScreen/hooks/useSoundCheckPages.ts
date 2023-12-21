import { ButtonProps } from "@equinor/mad-components";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

import { Ear } from "../../../types";
import { fadeIn } from "../../../utils/animation/fadeIn";
import { fadeOut } from "../../../utils/animation/fadeOut";
import { getEarName } from "../../../utils/getEarName";
import { getOtherEar } from "../../../utils/getOtherEar";
import { getRandomEar } from "../../../utils/getRandomEar";

export type SoundCheckPage = {
  title: string;
  description: string;
  earToCheck?: Ear;
  bottomButton?: ButtonProps;
};

export type SoundCheckButtonConfigurations = {
  noSound: ButtonProps;
  replay: ButtonProps;
};

export const useSoundCheckPages = (
  buttons: SoundCheckButtonConfigurations,
  wrongEarChosen: Ear | undefined
) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [firstEar, setFirstEar] = useState<Ear>(getRandomEar());
  const secondEar = getOtherEar(firstEar);
  const navigation = useNavigation();
  const animatedViewOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn(animatedViewOpacity);

    if (currentPage === 0) {
      setFirstEar(getRandomEar());
    }
  }, [currentPage]);

  const pages: SoundCheckPage[] = [
    {
      title: "Lydsjekk",
      description:
        "Før vi starter testen tar vi en prøverunde. Lydsjekken tar for seg et øre om gangen.",
    },
    {
      title: "Lydsjekk",
      description: "Hvilket øre hører du lyden fra?",
      earToCheck: firstEar,
      bottomButton: buttons.noSound,
    },
    {
      title: "Lydsjekk",
      description: "Hvilket øre hører du lyden fra?",
      earToCheck: secondEar,
      bottomButton: buttons.noSound,
    },
  ];

  const wrongEarChosenPage: SoundCheckPage = {
    title: "Ups!",
    description: `Denne lyden er ment å høres fra ${
      wrongEarChosen ? getEarName(getOtherEar(wrongEarChosen)) : "det andre"
    } øre. Sjekk at headsettet er satt på riktig vei.`,
    bottomButton: buttons.replay,
  };

  const nextPage = () => {
    const isLastPage = currentPage === pages.length - 1;
    if (isLastPage) {
      navigation.navigate("SoundCheckFinishedRoute");
      setCurrentPage(0);
    } else {
      fadeOut(animatedViewOpacity, () => setCurrentPage(currentPage + 1));
    }
  };

  const page = wrongEarChosen ? wrongEarChosenPage : pages[currentPage];

  return {
    animatedViewOpacity,
    currentPage,
    setCurrentPage,
    page,
    nextPage,
  };
};
