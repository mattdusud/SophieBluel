import { initFiltres } from "./categories.js";
import {recupWorks, filtres} from "./works.js";

initFiltres();
recupWorks("0"); //recupertion filtre "Tous"
filtres();