import { HARMONIZED_SHORT_CODES } from "./harmonizedCodes";
import { OPERATOR_LIST } from "./operators";
import { ShortCodeEntry, NetworkId, DndCommand, QuickActionItem } from "./telecomTypes";

export * from "./telecomTypes";
export * from "./harmonizedCodes";
export * from "./operators";

export const DND_COMMANDS: DndCommand[] = [
  {
    command: "STOP",
    shortCode: "2442",
    purpose: "Full DND Activation",
    description: "Blocks all unsolicited promotional and marketing SMS messages across all categories.",
    example: "Text STOP to 2442"
  },
  {
    command: "STATUS",
    shortCode: "2442",
    purpose: "Check DND Status",
    description: "Returns an SMS detailing your line's current Do-Not-Disturb configuration.",
    example: "Text STATUS to 2442"
  },
  {
    command: "HELP",
    shortCode: "2442",
    purpose: "View Partial DND Options",
    description: "Returns options to allow specific SMS categories (e.g. Banking, Education, Health, Tourism).",
    example: "Text HELP to 2442"
  },
  {
    command: "ALLOW",
    shortCode: "2442",
    purpose: "Deactivate DND / Opt-in",
    description: "Unblocks promotional SMS if you wish to receive network offers and promotional messages.",
    example: "Text ALLOW to 2442"
  }
];

export const QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: "qa-balance",
    title: "CHECK BALANCE",
    code: "310",
    displayCode: "*310#",
    category: "balance",
    protocol: "USSD",
    description: "View main credit and talk time balance.",
    accentColor: "sky"
  },
  {
    id: "qa-data-buy",
    title: "BUY DATA",
    code: "312",
    displayCode: "*312#",
    category: "data",
    protocol: "USSD",
    description: "Open official data plan purchase portal.",
    accentColor: "cyan"
  },
  {
    id: "qa-data-bal",
    title: "CHECK DATA",
    code: "323",
    displayCode: "*323#",
    category: "data",
    protocol: "USSD",
    description: "Query remaining internet data volume.",
    accentColor: "emerald"
  },
  {
    id: "qa-recharge",
    title: "RECHARGE",
    code: "311",
    displayCode: "*311*",
    category: "recharge",
    protocol: "USSD",
    description: "Top up credit using voucher PIN (*311*PIN#).",
    accentColor: "amber"
  },
  {
    id: "qa-borrow",
    title: "BORROW SERVICE",
    code: "303",
    displayCode: "*303#",
    category: "borrow",
    protocol: "USSD",
    description: "Advance loan for airtime or mobile data.",
    accentColor: "indigo"
  },
  {
    id: "qa-care",
    title: "CUSTOMER CARE",
    code: "300",
    displayCode: "300",
    category: "support",
    protocol: "VOICE",
    description: "Unified customer support call centre.",
    accentColor: "rose"
  },
  {
    id: "qa-nin",
    title: "NIN / SIM LINK",
    code: "996",
    displayCode: "*996#",
    category: "nin",
    protocol: "USSD",
    description: "Check status or link National Identity Number.",
    accentColor: "violet"
  },
  {
    id: "qa-port",
    title: "PORT NUMBER",
    code: "3232",
    displayCode: "3232",
    category: "porting",
    protocol: "SMS",
    description: "Mobile Number Portability service (SMS 'PORT' to 3232).",
    accentColor: "fuchsia"
  },
  {
    id: "qa-dnd",
    title: "DND MANAGEMENT",
    code: "2442",
    displayCode: "2442",
    category: "dnd",
    protocol: "SMS",
    description: "Manage unsolicited SMS (SMS 'STOP' to 2442).",
    accentColor: "teal"
  }
];

export function filterShortCodes(
  query: string = "",
  network: NetworkId = "all"
): ShortCodeEntry[] {
  const normalizedQuery = query.trim().toLowerCase();

  return HARMONIZED_SHORT_CODES.filter((entry) => {
    // Filter by network applicability
    if (network !== "all") {
      const netName = network.toUpperCase();
      const matchNetwork = entry.applicableNetworks.some(
        (n) => n.toUpperCase() === netName
      );
      if (!matchNetwork) return false;
    }

    if (!normalizedQuery) return true;

    const inCode = entry.code.toLowerCase().includes(normalizedQuery);
    const inDisplayCode = entry.displayCode.toLowerCase().includes(normalizedQuery);
    const inService = entry.service.toLowerCase().includes(normalizedQuery);
    const inCategory = entry.category.toLowerCase().includes(normalizedQuery);
    const inDesc = entry.description.toLowerCase().includes(normalizedQuery);
    const inHowTo = entry.howToUse.toLowerCase().includes(normalizedQuery);

    return inCode || inDisplayCode || inService || inCategory || inDesc || inHowTo;
  });
}
