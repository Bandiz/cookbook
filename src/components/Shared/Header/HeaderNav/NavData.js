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
      { label: "breakfast", icon: <CgBowl />, subUrl: "/category/breakfast" },
      { label: "lunch", icon: <GiHamburger />, subUrl: "/category/lunch" },
      { label: "dinner", icon: <GiSteak />, subUrl: "/category/dinner" },
      { label: "snacks", icon: <GiFruitBowl />, subUrl: "/category/snacks" },
      { label: "soups", icon: <GiCookingPot />, subUrl: "/category/soups" },
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
