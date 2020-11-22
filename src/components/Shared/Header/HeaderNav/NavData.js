import React from "react";
import {
  GiHamburger,
  GiSteak,
  GiFruitBowl,
  GiCookingPot,
} from "react-icons/gi";
import { CgBowl } from "react-icons/cg";

const links = [
  {
    id: 1,
    url: "/",
    text: "Home",
  },
  {
    id: 2,
    url: "/recipes",
    text: "Recipes",
    sublinks: [
      { label: "breakfast", icon: <CgBowl />, subUrl: "/breakfast" },
      { label: "lunch", icon: <GiHamburger />, subUrl: "/lunch" },
      { label: "dinner", icon: <GiSteak />, subUrl: "/dinner" },
      { label: "snacks", icon: <GiFruitBowl />, subUrl: "/snacks" },
      { label: "soups", icon: <GiCookingPot />, subUrl: "/soups" },
    ],
  },
  {
    id: 3,
    url: "/about",
    text: "About",
  },
  {
    id: 4,
    url: "/administration",
    text: "Admin",
  },
];

export default links;
