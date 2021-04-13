import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faCalendarCheck,
  faCreditCard,
  faShoppingCart,
  faPeopleArrows,
  faCogs,
  faSignOutAlt,
  faCaretRight,
  faCaretDown,
  faCaretUp,
  faEllipsisH,
  faTimes,
  faChevronRight,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

library.add([
  faFolder,
  faCalendarCheck,
  faCreditCard,
  faShoppingCart,
  faPeopleArrows,
  faCogs,
  faSignOutAlt,
  faCaretRight,
  faCaretDown,
  faCaretUp,
  faEllipsisH,
  faTimes,
  faChevronRight,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
]);

const Icon = ({ icon, size, ...props }) => {
  return <FontAwesomeIcon {...props} size={size} icon={icon} />;
};

export default Icon;
