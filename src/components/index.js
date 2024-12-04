import FormGroupInput from "./Inputs/formGroupInput.vue";

import DropDown from "./Dropdown.vue";
import ziggTable from "./ziggTable.vue";
import Button from "./Button";

import Card from "./Cards/Card.vue";
import ChartCard from "./Cards/ChartCard.vue";
import StatsCard from "./Cards/StatsCard.vue";
import TableCard from "./Cards/TableCard.vue";

import SidebarPlugin from "./SidebarPlugin/index";

let components = {
  FormGroupInput,
  Card,
  ChartCard,
  StatsCard,
  ziggTable,
  DropDown,
  SidebarPlugin,
  TableCard,
};

export default components;

export {
  FormGroupInput,
  Card,
  ChartCard,
  StatsCard,
  ziggTable,
  DropDown,
  Button,
  SidebarPlugin,
  TableCard,
};
