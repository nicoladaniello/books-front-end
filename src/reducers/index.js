import { combineReducers } from "redux";
import resources from "../resources/resourceFactory";
import authSlice from "./authSlice";
import genericError from "./genericError";
import modal from "./modal";
import summary from "./summary";

const reducer = combineReducers({
  /* Initialize reducers here */
  auth: authSlice.reducer,
  modal: modal.reducer,
  error: genericError.reducer,
  summary: summary.reducer,
  companies: resources.companies.reducer,
  periods: resources.periods.reducer,
  suppliers: resources.suppliers.reducer,
  invoices: resources.invoices.reducer,
  payments: resources.payments.reducer,
  supplierSummaries: resources.supplierSummaries.reducer,
});

export default reducer;
