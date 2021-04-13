import invoiceSchema from "../settings/schemas/invoices";
import paymentSchema from "../settings/schemas/payments";
import periodSchema from "../settings/schemas/periods";
import supplierSchema from "../settings/schemas/suppliers";
import supplierSummarySchema from "../settings/schemas/supplierSummary";
import createResource from "./createResource";

const resources = {
  companies: {
    ...createResource(process.env.COMPANIES_ENDPOINT),
  },
  periods: {
    ...createResource(process.env.PERIODS_ENDPOINT),
    schema: periodSchema,
  },
  suppliers: {
    ...createResource(process.env.SUPPLIERS_ENDPOINT),
    schema: supplierSchema,
  },
  invoices: {
    ...createResource(process.env.INVOICES_ENDPOINT),
    schema: invoiceSchema,
  },
  payments: {
    ...createResource(process.env.PAYMENTS_ENDPOINT),
    schema: paymentSchema,
  },
  supplierSummaries: {
    ...createResource(process.env.SUPPLIER_SUMMARIES_ENDPOINT),
    schema: supplierSummarySchema,
  },
};

export default resources;
