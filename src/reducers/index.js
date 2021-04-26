import { combineReducers } from "redux";
import auth from "../components/auth/slice";
import companies from "../components/companies/slice";
import invoices from "../components/invoices/slice";
import payments from "../components/payments/slice";
import periods from "../components/periods/slice";
import summaries from "../components/summaries/slice";
import suppliers from "../components/suppliers/slice";

const reducer = combineReducers({
  /* Initialize reducers here */
  auth,
  companies,
  periods,
  suppliers,
  summaries,
  invoices,
  payments,
});

export default reducer;
