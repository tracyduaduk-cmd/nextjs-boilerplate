"use client";

import React, { useState } from "react";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolActions } from "@/components/tools/ToolActions";
import { ToolVisualStage } from "@/components/tools/ToolVisualStage";
import { ToolRecommendation } from "@/components/tools/ToolRecommendation";
import { Container } from "@/components/ui/Container";
import { Globe, Copy, Check, RefreshCw, AlertCircle, Sparkles } from "lucide-react";

type DnsRecordType = "ALL" | "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS";

interface DnsRecord {
  name: string;
  type: string;
  typeId: number;
  ttl: number;
  data: string;
}

const TYPE_MAP: Record<number, string> = {
  1: "A",
  2: "NS",
  5: "CNAME",
  6: "SOA",
  12: "PTR",
  15: "MX",
  16: "TXT",
  28: "AAAA",
};

export default function DnsLookupPage() {
  const [domain, setDomain] = useState("cloudflare.com");
  const [selectedType, setSelectedType] = useState<DnsRecordType>("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState<DnsRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, setDnsStatus] = useState<string>("NOERROR");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const cleanDomainInput = (input: string) => {
    let cleaned = input.trim();
    cleaned = cleaned.replace(/^https?:\/\//i, "");
    cleaned = cleaned.replace(/\/.*$/, "");
    return cleaned.toLowerCase();
  };

  const fetchDnsRecord = async (targetDomain: string, recordType: string): Promise<DnsRecord[]> => {
    const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(targetDomain)}&type=${recordType}`;

    let res: Response;
    try {
      res = await fetch(url, {
        headers: { Accept: "application/dns-json" },
      });
    } catch {
      // Fallback to Google DoH
      const googleUrl = `https://dns.google/resolve?name=${encodeURIComponent(targetDomain)}&type=${recordType}`;
      res = await fetch(googleUrl, {
        headers: { Accept: "application/json" },
      });
    }

    if (!res.ok) {
      throw new Error(`DNS resolver returned HTTP ${res.status}`);
    }

    const data = await res.json();

    if (data.Status === 3) {
      throw new Error(`Domain '${targetDomain}' does not exist (NXDOMAIN).`);
    } else if (data.Status !== 0) {
      throw new Error(`DNS resolution returned status code ${data.Status}`);
    }

    if (!data.Answer || !Array.isArray(data.Answer)) {
      return [];
    }

    return data.Answer.map((item: { name: string; type: number; TTL: number; data: string }) => ({
      name: item.name,
      type: TYPE_MAP[item.type] || `TYPE_${item.type}`,
      typeId: item.type,
      ttl: item.TTL,
      data: item.data,
    }));
  };

  const handleQueryDns = async () => {
    const targetDomain = cleanDomainInput(domain);
    if (!targetDomain) {
      setError("Please enter a valid domain or hostname.");
      setRecords(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecords(null);
    setDnsStatus("QUERYING");

    try {
      let results: DnsRecord[] = [];
      if (selectedType === "ALL") {
        const typesToFetch = ["A", "AAAA", "MX", "TXT", "NS", "CNAME"];
        const fetchPromises = typesToFetch.map((t) =>
          fetchDnsRecord(targetDomain, t).catch(() => [])
        );
        const allFetched = await Promise.all(fetchPromises);
        results = allFetched.flat();

        // Deduplicate records by name, type, and data
        const seen = new Set<string>();
        results = results.filter((rec) => {
          const key = `${rec.name}-${rec.type}-${rec.data}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      } else {
        results = await fetchDnsRecord(targetDomain, selectedType);
      }

      setRecords(results);
      setDnsStatus(results.length > 0 ? "NOERROR" : "NO_RECORDS");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to resolve DNS records";
      setError(msg);
      setDnsStatus("ERROR");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySingle = (record: DnsRecord, index: number) => {
    const text = `${record.name}\t${record.type}\t${record.ttl}\t${record.data}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAllJson = () => {
    if (!records) return "";
    return JSON.stringify(records, null, 2);
  };

  const handleClear = () => {
    setDomain("");
    setRecords(null);
    setError(null);
    setDnsStatus("NOERROR");
  };

  const setExampleDomain = (ex: string) => {
    setDomain(ex);
    setError(null);
  };

  return (
    <ToolShell>
      <ToolHeader
        title="DNS Lookup"
        description="Query domain DNS records (A, AAAA, MX, TXT, CNAME, NS) directly via standard Cloudflare DNS-over-HTTPS. Safe, client-side, zero tracking."
        category="NETWORK LAYER"
        badge="Cloudflare DoH"
        status={error ? "scanning" : isLoading ? "scanning" : "engine-ready"}
        statusMessage={
          isLoading
            ? "Resolving Records via Cloudflare DoH..."
            : error
            ? "DNS Resolution Error"
            : records
            ? `${records.length} Records Resolved`
            : "DNS Resolver Ready"
        }
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Input/Output Column */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="DNS Query Panel"
              badge="Standard DoH JSON"
              actions={
                <div className="flex flex-wrap items-center justify-between w-full gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-mono text-slate-400 mr-1">Type:</span>
                    {(["ALL", "A", "AAAA", "CNAME", "MX", "TXT", "NS"] as DnsRecordType[]).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedType(t)}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                          selectedType === t
                            ? "bg-sky-400 text-slate-950 shadow-sm"
                            : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <ToolActions
                    onClear={handleClear}
                  />
                </div>
              }
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleQueryDns()}
                      placeholder="Enter domain name (e.g. cloudflare.com, google.com)"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sky-200 font-mono text-xs sm:text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleQueryDns}
                    disabled={isLoading || !domain.trim()}
                    className="px-6 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-mono text-xs font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-sky-950/50"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    ) : (
                      <Globe className="w-4 h-4 text-slate-950" />
                    )}
                    <span>{isLoading ? "Resolving..." : "Lookup DNS"}</span>
                  </button>
                </div>

                {/* Example Domains Quick Pills */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Sparkles className="w-3 h-3 text-sky-400" /> Examples:
                  </span>
                  {["cloudflare.com", "google.com", "github.com"].map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setExampleDomain(ex)}
                      className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-sky-300 border border-slate-800 transition-all text-[11px]"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </ToolInputPanel>

            <ToolOutputPanel
              title="Resolved DNS Records"
              badge={
                records
                  ? `${records.length} Records Found`
                  : error
                  ? "Error"
                  : "Awaiting Query"
              }
              error={error}
              actions={
                <ToolActions
                  copyContent={handleCopyAllJson()}
                />
              }
            >
              {isLoading ? (
                <div className="p-12 text-center font-mono text-xs text-sky-400 space-y-3">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-sky-400" />
                  <p className="font-semibold uppercase tracking-wider">Querying Cloudflare DNS-over-HTTPS Resolver...</p>
                  <p className="text-slate-500 text-[11px]">Fetching {selectedType} records for {domain}</p>
                </div>
              ) : error ? (
                <div className="p-8 rounded-xl bg-rose-950/30 border border-rose-900/60 text-rose-300 space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" /> DNS Resolution Failed
                  </div>
                  <p className="text-slate-300">{error}</p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleQueryDns}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-rose-100 border border-rose-700 text-xs font-semibold transition-all"
                    >
                      Retry Query
                    </button>
                  </div>
                </div>
              ) : records && records.length === 0 ? (
                <div className="p-8 text-center font-mono text-xs text-slate-400 space-y-2">
                  <p className="text-slate-300 font-semibold">No {selectedType} records found for &apos;{domain}&apos;</p>
                  <p className="text-slate-500">The domain exists, but no active DNS records match the selected record type.</p>
                </div>
              ) : records && records.length > 0 ? (
                <div className="space-y-3">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                          <th className="py-2.5 px-3">Type</th>
                          <th className="py-2.5 px-3">Name</th>
                          <th className="py-2.5 px-3">TTL</th>
                          <th className="py-2.5 px-3">Value / Target</th>
                          <th className="py-2.5 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {records.map((rec, idx) => (
                          <tr key={`${rec.name}-${rec.type}-${idx}`} className="hover:bg-slate-900/50 transition-colors">
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-sky-950 text-sky-300 border border-sky-800/60">
                                {rec.type}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-slate-300 max-w-[140px] truncate">{rec.name}</td>
                            <td className="py-3 px-3 text-slate-400">{rec.ttl}s</td>
                            <td className="py-3 px-3 text-emerald-300 break-all max-w-[280px] sm:max-w-none">{rec.data}</td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleCopySingle(rec, idx)}
                                title="Copy Record"
                                className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
                              >
                                {copiedIndex === idx ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-10 text-center font-mono text-xs text-slate-500 space-y-2">
                  <p>Enter a domain name above and click &quot;Lookup DNS&quot; to fetch authoritative DNS records.</p>
                </div>
              )}
            </ToolOutputPanel>

            {/* Explanation & Privacy Card */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs text-slate-300">
              <h4 className="font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" /> Resolver Scope & Caching Notice
              </h4>
              <p className="leading-relaxed text-slate-400 font-sans">
                DNS queries are resolved using Cloudflare&apos;s global DNS-over-HTTPS (DoH) recursive resolver endpoint. Results reflect current records cached or fetched by Cloudflare&apos;s infrastructure.
              </p>
              <p className="leading-relaxed text-slate-400 font-sans">
                <em>Note:</em> Results do not represent every private or localized DNS server worldwide. Cache TTL (Time To Live) dictates how long records persist across public recursive resolvers.
              </p>
            </div>
          </div>

          {/* Right Visual Stage Column */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage
              visualType="dns"
              pageKey="network_dns"
              slotKey="visual_stage"
              mode="services"
              isError={!!error}
              statusLabel={error ? "DNS QUERY FAILED" : isLoading ? "RESOLVING RECORDS" : "RESOLVER STABLE"}
              metricLabel="RECORDS LOADED"
              metricValue={records ? String(records.length) : "0"}
              accentColor={error ? "#f43f5e" : "#38bdf8"}
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">DNS-over-HTTPS Security</p>
                <p className="text-slate-400 leading-relaxed">
                  Queries are sent over encrypted TLS connections directly from your browser to public DoH resolvers, protecting domain lookups from local network eavesdropping.
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Supported DNS Record Types
              </h4>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-sky-300 font-bold">A</span>
                  <span className="text-slate-400">IPv4 Address Mapping</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-sky-300 font-bold">AAAA</span>
                  <span className="text-slate-400">IPv6 Address Mapping</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-sky-300 font-bold">CNAME</span>
                  <span className="text-slate-400">Canonical Name Alias</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-sky-300 font-bold">MX</span>
                  <span className="text-slate-400">Mail Exchange Servers</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-sky-300 font-bold">TXT</span>
                  <span className="text-slate-400">SPF, DKIM & Verification</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sky-300 font-bold">NS</span>
                  <span className="text-slate-400">Authoritative Name Servers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <ToolRecommendation
          serviceName="DNS & Domain Infrastructure Care"
          serviceSlug="app-care"
          serviceDescription="Configuring custom domain records, setting up DKIM/SPF email security, or migrating DNS providers? Snow provides full-stack technical assistance."
          careCategorySlug="app-care"
        />
      </Container>
    </ToolShell>
  );
}
