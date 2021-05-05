import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      common: {
        insert: "Insert",
        edit: "Edit",
        delete: "Delete",
        select: "Select",
        empty: "No results",
        print: "Print",
        confirm: "Confirm",
        dismiss: "Dismiss",
        login: "Login",
        logout: "Logout",
        options: "Options",
        loading: "Loading",
        id: "ID",
        name: "Name",
        password: "Password",
        vatNumber: "VAT number",
        taxCode: "Tax code",
        phone: "Phone",
        email: "Email",
        address: "Address",
        date: "Date",
        startDate: "Start date",
        endDate: "End date",
        description: "Description",
        amount: "Amount",
        paid: "Paid",
        residual: "Residual",
        company: "Company",
        companies: "Companies",
        period: "Period",
        periods: "Periods",
        summary: "Summary",
        summaries: "Summaries",
        supplier: "Supplier",
        suppliers: "Suppliers",
        invoice: "Invoice",
        invoices: "Invoices",
        payment: "Payment",
        payments: "Payments",
        shutdown: "Shutdown",
        otherwise: "otherwise",
      },
      modules: {
        company: {
          insert: "$t(common.insert) $t(common.company)",
          edit: "$t(common.edit) $t(common.company)",
          delete: "$t(common.delete) $t(common.company)",
          select: "$t(common.select) $t(common.company)",
        },
        period: {
          insert: "$t(common.insert) $t(common.period)",
          edit: "$t(common.edit) $t(common.period)",
          delete: "$t(common.delete) $t(common.period)",
          select: "$t(common.select) $t(common.period)",
        },
        supplier: {
          insert: "$t(common.insert) $t(common.supplier)",
          edit: "$t(common.edit) $t(common.supplier)",
          delete: "$t(common.delete) $t(common.supplier)",
          select: "$t(common.select) $t(common.supplier)",
        },
        invoice: {
          insert: "$t(common.insert) $t(common.invoice)",
          edit: "$t(common.edit) $t(common.invoice)",
          delete: "$t(common.delete) $t(common.invoice)",
          select: "$t(common.select) $t(common.invoice)",
        },
        payment: {
          insert: "$t(common.insert) $t(common.payment)",
          edit: "$t(common.edit) $t(common.payment)",
          delete: "$t(common.delete) $t(common.payment)",
          select: "$t(common.select) $t(common.payment)",
        },
      },
      messages: {
        unexpectedError:
          "Unexpected error, please try again or restart the application.",
        shutdown: {
          confirm: "Shutdown the application?",
          success: "App shutted down, you can close this page now.",
        },
      },
    },
  },
  it: {
    translation: {
      common: {
        insert: "Aggiungi",
        edit: "Modifica",
        delete: "Elimina",
        select: "Seleziona",
        empty: "Nessun risultato",
        print: "Stampa",
        confirm: "Conferma",
        dismiss: "Annulla",
        login: "Accedi",
        logout: "Disconnetti",
        options: "Opzioni",
        loading: "Caricando...",
        id: "ID",
        name: "Nome",
        password: "Password",
        vatNumber: "P.Iva",
        taxCode: "Codice fiscale",
        phone: "Telefono",
        email: "Email",
        address: "Indirizzo",
        date: "Data",
        startDate: "Inizio data",
        endDate: "Fine data",
        description: "Descrizione",
        amount: "Ammontare",
        paid: "Pagato",
        residual: "Residuo",
        company: "Azienda",
        companies: "Aziende",
        period: "Periodo",
        periods: "Periodi",
        summary: "Situazione",
        summaries: "Situazioni",
        supplier: "Fornitore",
        suppliers: "Fornitori",
        invoice: "Fattura",
        invoices: "Fatture",
        payment: "Pagamento",
        payments: "Pagamenti",
        shutdown: "Termina",
        otherwise: "oppure",
      },
      modules: {
        company: {
          insert: "$t(common.insert) $t(common.company)",
          edit: "$t(common.edit) $t(common.company)",
          delete: "$t(common.delete) $t(common.company)",
          select: "$t(common.select) $t(common.company)",
        },
        period: {
          insert: "$t(common.insert) $t(common.period)",
          edit: "$t(common.edit) $t(common.period)",
          delete: "$t(common.delete) $t(common.period)",
          select: "$t(common.select) $t(common.period)",
        },
        supplier: {
          insert: "$t(common.insert) $t(common.supplier)",
          edit: "$t(common.edit) $t(common.supplier)",
          delete: "$t(common.delete) $t(common.supplier)",
          select: "$t(common.select) $t(common.supplier)",
        },
        invoice: {
          insert: "$t(common.insert) $t(common.invoice)",
          edit: "$t(common.edit) $t(common.invoice)",
          delete: "$t(common.delete) $t(common.invoice)",
          select: "$t(common.select) $t(common.invoice)",
        },
        payment: {
          insert: "$t(common.insert) $t(common.payment)",
          edit: "$t(common.edit) $t(common.payment)",
          delete: "$t(common.delete) $t(common.payment)",
          select: "$t(common.select) $t(common.payment)",
        },
      },
      messages: {
        unexpectedError:
          "Errore imprevisto, riprova. Se persiste riavvia l'applicazione.",
        shutdown: {
          confirm: "Vuoi terminare l'applicazione?",
          success:
            "Il programma è terminato, è ora possible chiudere questa pagina.",
        },
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "it",
    fallbackLng: "en",

    // allow keys to be phrases having `:`, `.`
    // nsSeparator: false,
    // keySeparator: false,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
