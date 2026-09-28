"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolActions } from "@/components/tools/ToolActions";
import { ToolVisualStage } from "@/components/tools/ToolVisualStage";
import { ToolRecommendation } from "@/components/tools/ToolRecommendation";
import { Container } from "@/components/ui/Container";
import {
  Wifi,
  Globe,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  MapPin,
  Building,
  Radio,
  Lock,
} from "lucide-react";

interface IpDiagnosticData {
  ipv4: string | null;
  ipv6: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
  org: string | null;
  isp: string | null;
  asn: string | null;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

export default function PublicIpPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [ipData, setIpData] = useState<IpDiagnosticData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIp, setCopiedIp] = useState<string | null>(null);

  const fetchIpInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    let ipv4Val: string | null = null;
    let ipv6Val: string | null = null;
    let geoCity: string | null = null;
    let geoRegion: string | null = null;
    let geoCountry: string | null = null;
    let geoCountryCode: string | null = null;
    let geoOrg: string | null = null;
    let geoIsp: string | null = null;
    let geoAsn: string | null = null;

    try {
      // 1. Check IPv4 explicitly
      try {
        const v4Res = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
        if (v4Res.ok) {
          const v4Data = await v4Res.json();
          ipv4Val = v4Data.ip || null;
        }
      } catch {
        // IPv4 fetch fallback or failure
      }

      // 2. Check IPv6 / Dual-stack endpoint
      try {
        const v6Res = await fetch("https://api64.ipify.org?format=json", { cache: "no-store" });
        if (v6Res.ok) {
          const v6Data = await v6Res.json();
          if (v6Data.ip && v6Data.ip.includes(":")) {
            ipv6Val = v6Data.ip;
          } else if (!ipv4Val && v6Data.ip) {
            ipv4Val = v6Data.ip;
          }
        }
      } catch {
        // IPv6 fetch fallback
      }

      // 3. Enrichment lookup (ipwho.is or ipapi.co)
      let enrichmentSuccess = false;
      try {
        const enrichRes = await fetch("https://ipwho.is/", { cache: "no-store" });
        if (enrichRes.ok) {
          const eData = await enrichRes.json();
          if (eData.success !== false) {
            enrichmentSuccess = true;
            geoCity = eData.city || null;
            geoRegion = eData.region || null;
            geoCountry = eData.country || null;
            geoCountryCode = eData.country_code || null;
            geoIsp = eData.connection?.isp || eData.isp || null;
            geoOrg = eData.connection?.org || eData.org || null;
            geoAsn = eData.connection?.asn ? `AS${eData.connection.asn}` : null;

            if (!ipv4Val && !ipv6Val && eData.ip) {
              if (eData.ip.includes(":")) ipv6Val = eData.ip;
              else ipv4Val = eData.ip;
            }
          }
        }
      } catch {
        // ipwho.is failed, attempt fallback to ipapi.co
      }

      if (!enrichmentSuccess) {
        try {
          const fallbackRes = await fetch("https://ipapi.co/json/", { cache: "no-store" });
          if (fallbackRes.ok) {
            const fData = await fallbackRes.json();
            geoCity = fData.city || null;
            geoRegion = fData.region || null;
            geoCountry = fData.country_name || null;
            geoCountryCode = fData.country_code || null;
            geoIsp = fData.org || fData.asn || null;
            geoOrg = fData.org || null;
            geoAsn = fData.asn || null;

            if (!ipv4Val && !ipv6Val && fData.ip) {
              if (fData.ip.includes(":")) ipv6Val = fData.ip;
              else ipv4Val = fData.ip;
            }
          }
        } catch {
          // Both enrichment services blocked/failed
        }
      }

      // Check Network Information API if exposed
      let effectiveType: string | undefined;
      let downlink: number | undefined;
      let rtt: number | undefined;

      if ("connection" in navigator) {
        const conn = (navigator as unknown as { connection?: { effectiveType?: string; downlink?: number; rtt?: number } }).connection;
        if (conn) {
          effectiveType = conn.effectiveType;
          downlink = conn.downlink;
          rtt = conn.rtt;
        }
      }

      if (!ipv4Val && !ipv6Val) {
        throw new Error("Unable to resolve public IP address. Check your network connection or adblocker settings.");
      }

      setIpData({
        ipv4: ipv4Val,
        ipv6: ipv6Val,
        city: geoCity,
        region: geoRegion,
        country: geoCountry,
        countryCode: geoCountryCode,
        org: geoOrg,
        isp: geoIsp,
        asn: geoAsn,
        effectiveType,
        downlink,
        rtt,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to retrieve public IP address";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchIpInfo();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchIpInfo]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIp(label);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  const getCopyAllText = () => {
    if (!ipData) return "";
    return JSON.stringify(ipData, null, 2);
  };

  return (
    <ToolShell>
      <ToolHeader
        title="Public IP & Network Info"
        description="Inspect public IPv4 and IPv6 addresses, network operator (ISP), ASN, and approximate location. Safely resolved in your browser with zero server data retention."
        category="NETWORK LAYER"
        badge="Zero Retention"
        status={error ? "scanning" : isLoading ? "scanning" : "engine-ready"}
        statusMessage={
          isLoading
            ? "Discovering Public IP & Network Route..."
            : error
            ? "IP Discovery Error"
            : ipData?.ipv4 || ipData?.ipv6
            ? "Network Address Identified"
            : "IP Service Ready"
        }
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main IP Info Workspace */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="Detected Public Network Identity"
              badge="Standard Client Query"
              actions={
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Public Endpoint</span>
                  </div>

                  <button
                    type="button"
                    onClick={fetchIpInfo}
                    disabled={isLoading}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono text-xs border border-slate-700 transition-all flex items-center gap-1.5 disabled:opacity-40"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-sky-400" : ""}`} />
                    <span>Re-Scan IP</span>
                  </button>
                </div>
              }
            >
              {isLoading ? (
                <div className="p-12 text-center font-mono text-xs text-sky-400 space-y-3">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-sky-400" />
                  <p className="font-semibold uppercase tracking-wider">Resolving Public Network Details...</p>
                  <p className="text-slate-500 text-[11px]">Querying client-side public IP endpoints</p>
                </div>
              ) : error ? (
                <div className="p-8 rounded-xl bg-rose-950/30 border border-rose-900/60 text-rose-300 space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" /> Network Identity Query Failed
                  </div>
                  <p className="text-slate-300">{error}</p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={fetchIpInfo}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-rose-100 border border-rose-700 text-xs font-semibold transition-all"
                    >
                      Retry Discovery
                    </button>
                  </div>
                </div>
              ) : ipData ? (
                <div className="space-y-6">
                  {/* Primary IP Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* IPv4 Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-1.5 font-bold text-sky-400">
                          <Globe className="w-3.5 h-3.5" /> PUBLIC IPv4
                        </span>
                        <span>32-BIT ADDRESS</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-base sm:text-lg font-bold text-slate-100 truncate">
                          {ipData.ipv4 || "Not Exposed / IPv6 Only"}
                        </span>
                        {ipData.ipv4 && (
                          <button
                            type="button"
                            onClick={() => handleCopy(ipData.ipv4!, "ipv4")}
                            className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all shrink-0"
                          >
                            {copiedIp === "ipv4" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* IPv6 Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-1.5 font-bold text-teal-400">
                          <Globe className="w-3.5 h-3.5" /> PUBLIC IPv6
                        </span>
                        <span>128-BIT ADDRESS</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs sm:text-sm font-bold text-slate-100 truncate">
                          {ipData.ipv6 || "Not Detected / IPv4 Only"}
                        </span>
                        {ipData.ipv6 && (
                          <button
                            type="button"
                            onClick={() => handleCopy(ipData.ipv6!, "ipv6")}
                            className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all shrink-0"
                          >
                            {copiedIp === "ipv6" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Network Details Breakdown Table */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                    <h4 className="text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
                      Network Routing & Enrichment
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-500 text-[10px] uppercase block">Approximate Region</span>
                            <span className="text-slate-200 font-semibold">
                              {[ipData.city, ipData.region, ipData.country].filter(Boolean).join(", ") || "Unavailable"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Building className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-500 text-[10px] uppercase block">ISP / Organization</span>
                            <span className="text-slate-200 font-semibold">
                              {ipData.isp || ipData.org || "Unavailable"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Radio className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-500 text-[10px] uppercase block">ASN (Autonomous System Number)</span>
                            <span className="text-slate-200 font-semibold">
                              {ipData.asn || "Unavailable"}
                            </span>
                          </div>
                        </div>

                        {ipData.effectiveType && (
                          <div className="flex items-start gap-2">
                            <Wifi className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-slate-500 text-[10px] uppercase block">Browser Network Profile</span>
                              <span className="text-slate-200 font-semibold uppercase">
                                {ipData.effectiveType} {ipData.downlink ? `(~${ipData.downlink} Mbps)` : ""}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </ToolInputPanel>

            <ToolOutputPanel
              title="JSON Diagnostic Payload"
              badge="Local Memory"
              actions={
                <ToolActions
                  copyContent={getCopyAllText()}
                />
              }
            >
              <pre className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto max-h-[220px] leading-relaxed">
                {ipData ? JSON.stringify(ipData, null, 2) : "// Network diagnostic payload will appear here..."}
              </pre>
            </ToolOutputPanel>

            {/* Crucial Privacy & Geolocation Disclaimer */}
            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-800/60 space-y-2 text-xs text-amber-200 font-sans">
              <h4 className="font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" /> Geolocation & Privacy Guarantee
              </h4>
              <p className="leading-relaxed">
                <strong>Approximate Geolocation:</strong> IP-based location is estimated at the city or regional level based on your Internet Service Provider&apos;s network routing hub. It does <em>NOT</em> represent an exact physical or street address.
              </p>
              <p className="leading-relaxed">
                <strong>Zero Backend Retention:</strong> Snow does not store, retain, or log your IP address in any database. All enrichment is queried on-demand directly from your client browser.
              </p>
            </div>
          </div>

          {/* Right Visual Stage Column */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage
              visualType="ip"
              mode="services"
              isError={!!error}
              statusLabel={error ? "NETWORK DISCOVERY FAILED" : isLoading ? "RESOLVING ROUTE" : "PUBLIC IP IDENTIFIED"}
              metricLabel="NETWORK TYPE"
              metricValue={ipData?.ipv6 ? "DUAL-STACK IPv4/v6" : "IPv4 ACTIVE"}
              accentColor={error ? "#f43f5e" : "#38bdf8"}
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">Autonomous System Routing</p>
                <p className="text-slate-400 leading-relaxed">
                  Your requests travel through BGP (Border Gateway Protocol) routes advertised by your ISP&apos;s Autonomous System Number (ASN).
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Why Monitor Network Identity?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Knowing your public IP, dual-stack IPv6 readiness, and network operator is vital for configuring firewalls, whitelisting API endpoints, and diagnosing regional CDN routing delays.
              </p>
            </div>
          </div>
        </div>

        <ToolRecommendation
          serviceName="Defensive Security & Cloud Architecture"
          serviceSlug="app-care"
          serviceDescription="Building secure API gateways, configuring IP access restrictions, or establishing DDoS mitigation? Snow delivers dedicated security architecture."
          careCategorySlug="security-care"
        />
      </Container>
    </ToolShell>
  );
}
