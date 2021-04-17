import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faCalendarAlt,
  faCaretDown,
  faCaretRight,
  faCaretUp,
  faChevronRight,
  faCogs,
  faCreditCard,
  faEdit,
  faEllipsisH,
  faFileInvoice,
  faPeopleArrows,
  faPlus,
  faPrint,
  faSignOutAlt,
  faTimes,
  faTrashAlt,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

library.add([
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faCalendarAlt,
  faCaretDown,
  faCaretRight,
  faCaretUp,
  faChevronRight,
  faCogs,
  faCreditCard,
  faEdit,
  faEllipsisH,
  faPeopleArrows,
  faPlus,
  faPrint,
  faFileInvoice,
  faSignOutAlt,
  faTimes,
  faTrashAlt,
  faTruck,
]);

const Icon = ({ icon, size, ...props }) => {
  return (
    <span {...props}>
      <FontAwesomeIcon size={size} icon={icon} />
    </span>
  );
};

export default Icon;
