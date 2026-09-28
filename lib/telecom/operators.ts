import { OperatorInfo, ShortCodeEntry } from "./telecomTypes";
import { HARMONIZED_SHORT_CODES } from "./harmonizedCodes";

export const OPERATOR_LIST: OperatorInfo[] = [
  {
    id: "mtn",
    name: "MTN",
    fullName: "MTN Nigeria Communications Plc",
    accentColor: "#EAB308", // Yellow
    borderColor: "rgba(234, 179, 8, 0.3)",
    bgColor: "rgba(234, 179, 8, 0.1)",
    textColor: "text-amber-400",
    officialWebsite: "https://www.mtn.ng",
    supportPhone: "300",
    supportEmail: "customercare2@mtn.com",
    verifiedCodes: [
      ...HARMONIZED_SHORT_CODES,
      {
        id: "mtn-my-number",
        code: "123",
        displayCode: "*123*",
        protocol: "USSD",
        service: "MTN Self-Service & Number Check",
        category: "support",
        description: "MTN self-service portal for checking phone number details (*123*1*1#) and account management.",
        howToUse: "Dial *123# or *123*1*1# to display your phone number.",
        applicableNetworks: ["MTN"],
        sourceName: "MTN Nigeria Official Care",
        sourceUrl: "https://www.mtn.ng/personal/help/",
        lastVerified: "2025-03-01",
        isHarmonized: false
      }
    ],
    unverifiedNotes: "Older codes like *556# and *131# are legacy and superseded by NCC harmonized codes (*310# and *312#).",
    lastVerified: "2025-03-01"
  },
  {
    id: "airtel",
    name: "Airtel",
    fullName: "Airtel Networks Limited (Airtel Nigeria)",
    accentColor: "#EF4444", // Red
    borderColor: "rgba(239, 68, 68, 0.3)",
    bgColor: "rgba(239, 68, 68, 0.1)",
    textColor: "text-red-400",
    officialWebsite: "https://www.airtel.com.ng",
    supportPhone: "300",
    supportEmail: "customercare@ng.airtel.com",
    verifiedCodes: [
      ...HARMONIZED_SHORT_CODES,
      {
        id: "airtel-my-number",
        code: "282",
        displayCode: "*282#",
        protocol: "USSD",
        service: "Airtel Check Phone Number",
        category: "support",
        description: "Official Airtel short code to retrieve and display your phone number on screen.",
        howToUse: "Dial *282# to display your Airtel line number.",
        applicableNetworks: ["Airtel"],
        sourceName: "Airtel Nigeria Official",
        sourceUrl: "https://www.airtel.com.ng",
        lastVerified: "2025-03-01",
        isHarmonized: false
      }
    ],
    unverifiedNotes: "Legacy codes like *123# and *141# have been replaced by harmonized codes (*310# and *312#).",
    lastVerified: "2025-03-01"
  },
  {
    id: "glo",
    name: "Glo",
    fullName: "Globacom Limited",
    accentColor: "#22C55E", // Green
    borderColor: "rgba(34, 197, 94, 0.3)",
    bgColor: "rgba(34, 197, 94, 0.1)",
    textColor: "text-emerald-400",
    officialWebsite: "https://www.gloworld.com/ng",
    supportPhone: "300",
    supportEmail: "customercare@gloworld.com",
    verifiedCodes: [
      ...HARMONIZED_SHORT_CODES,
      {
        id: "glo-my-number",
        code: "135",
        displayCode: "*135*8#",
        protocol: "USSD",
        service: "Glo Check My Number",
        category: "support",
        description: "Official Globacom code to view your own Glo telephone number.",
        howToUse: "Dial *135*8# or *777# menu self-service to display your phone number.",
        applicableNetworks: ["Glo"],
        sourceName: "Globacom Nigeria Official",
        sourceUrl: "https://www.gloworld.com/ng",
        lastVerified: "2025-03-01",
        isHarmonized: false
      }
    ],
    unverifiedNotes: "Legacy codes like *124# are superseded by harmonized *310#.",
    lastVerified: "2025-03-01"
  },
  {
    id: "9mobile",
    name: "9mobile",
    fullName: "EMTS Limited (9mobile Nigeria)",
    accentColor: "#10B981", // Emerald/Teal
    borderColor: "rgba(16, 185, 129, 0.3)",
    bgColor: "rgba(16, 185, 129, 0.1)",
    textColor: "text-teal-400",
    officialWebsite: "https://9mobile.com.ng",
    supportPhone: "300",
    supportEmail: "care@9mobile.com.ng",
    verifiedCodes: [
      ...HARMONIZED_SHORT_CODES,
      {
        id: "9mobile-my-number",
        code: "248",
        displayCode: "*248#",
        protocol: "USSD",
        service: "9mobile Check Phone Number",
        category: "support",
        description: "Official 9mobile short code to verify your phone number.",
        howToUse: "Dial *248# to view your 9mobile SIM phone number.",
        applicableNetworks: ["9mobile"],
        sourceName: "9mobile Nigeria Official Support",
        sourceUrl: "https://9mobile.com.ng",
        lastVerified: "2025-03-01",
        isHarmonized: false
      }
    ],
    unverifiedNotes: "Legacy codes like *232# are superseded by harmonized *310#.",
    lastVerified: "2025-03-01"
  }
];
