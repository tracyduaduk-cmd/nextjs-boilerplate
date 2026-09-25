"use client";

import React from "react";
import { ContactInformation, PreferredContact } from "@/lib/requests/types";
import { User, Mail, Phone, Building2, MessageSquare, ShieldAlert } from "lucide-react";

interface ContactStepProps {
  contact: ContactInformation;
  onChange: (contact: ContactInformation) => void;
  isSecurityRequest?: boolean;
}

export const ContactStep: React.FC<ContactStepProps> = ({
  contact,
  onChange,
  isSecurityRequest = false,
}) => {
  const updateField = (field: keyof ContactInformation, value: any) => {
    onChange({
      ...contact,
      [field]: value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400">
          <User className="w-3.5 h-3.5" />
          <span>CONTACT INFORMATION</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans tracking-tight">
          Where should we send your estimate?
        </h2>

        <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-xl">
          Provide your primary contact details so Snow engineers can review and deliver your technical estimate.
        </p>
      </div>

      {/* Security Warning Notice if Security Request */}
      {isSecurityRequest && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs sm:text-sm font-sans flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-medium">
            Security Notice: Never send passwords, recovery codes, authentication tokens, or private keys through this form.
          </div>
        </div>
      )}

      {/* Contact Fields Form Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
            YOUR NAME / PRIMARY CONTACT <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={contact.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
            EMAIL ADDRESS <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={contact.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="jane@organization.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Phone / WhatsApp */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
            PHONE / WHATSAPP (OPTIONAL)
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="tel"
              value={contact.phone || ""}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+234 800 000 0000"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Company / Organization */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
            COMPANY / BUSINESS NAME (OPTIONAL)
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={contact.company || ""}
              onChange={(e) => updateField("company", e.target.value)}
              placeholder="Acme Technologies Ltd"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Preferred Contact Channel */}
      <div className="space-y-3 pt-4 border-t border-slate-800/80">
        <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
          PREFERRED CONTACT METHOD
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "email", label: "Email", icon: Mail },
            { id: "phone", label: "Phone Call", icon: Phone },
            { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
          ].map((item) => {
            const isSelected = contact.preferredContact === item.id;
            const ItemIcon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateField("preferredContact", item.id as PreferredContact)}
                className={`p-3 rounded-xl border text-center font-sans text-xs flex flex-col sm:flex-row items-center justify-center gap-2 transition-all ${
                  isSelected
                    ? "bg-sky-500/20 border-sky-500 text-sky-300 font-bold"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <ItemIcon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
