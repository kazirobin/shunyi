"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Save, Building2, Users, Shield, Bell, Palette, Globe, Database, Key } from "lucide-react";

const settingsSections = [
  { id: "general", title: "General Settings", icon: Building2, description: "Company information and basic configuration" },
  { id: "users", title: "User Management", icon: Users, description: "Manage admin users, roles, and permissions" },
  { id: "security", title: "Security", icon: Shield, description: "Authentication, password policies, and access control" },
  { id: "notifications", title: "Notifications", icon: Bell, description: "Email, SMS, and in-app notification settings" },
  { id: "appearance", title: "Appearance", icon: Palette, description: "Theme, branding, and UI customization" },
  { id: "localization", title: "Localization", icon: Globe, description: "Languages, currencies, and regional settings" },
  { id: "database", title: "Database", icon: Database, description: "Backup, migration, and maintenance settings" },
  { id: "api", title: "API & Integrations", icon: Key, description: "External API keys and third-party integrations" },
];

export default function SettingsPage() {
  const t = useTranslations("admin.settings");
  const [activeSection, setActiveSection] = useState("general");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">Configure system settings and preferences</p>
        </div>
        <button className="btn btn-primary">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </button>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-4">
        <motion.aside
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <nav className="card" aria-label="Settings navigation">
            <div className="card-header">
              <h3 className="card-title text-base">Settings</h3>
            </div>
            <div className="card-content p-0">
              <ul className="space-y-1" role="list">
                {settingsSections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                      aria-current={activeSection === section.id ? "page" : undefined}
                    >
                      <section.icon className="h-5 w-5 flex-shrink-0" />
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-3">
                {(() => {
                  const section = settingsSections.find((s) => s.id === activeSection);
                  if (section?.icon) {
                    const Icon = section.icon;
                    return <Icon className="h-5 w-5 text-primary" />;
                  }
                  return null;
                })()}
                <div>
                  <h3 className="card-title text-base">{settingsSections.find((s) => s.id === activeSection)?.title}</h3>
                  <p className="card-description text-sm">
                    {settingsSections.find((s) => s.id === activeSection)?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-content space-y-6">
              {activeSection === "general" && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="label">Company Name</label>
                      <input type="text" defaultValue="Shunyi Garments" className="input" />
                    </div>
                    <div>
                      <label className="label">Company Name (Chinese)</label>
                      <input type="text" defaultValue="顺意服装" className="input font-chinese" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Corporate Office Address</label>
                      <textarea className="input min-h-[80px] resize-y" placeholder="Corporate office address" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Factory Address</label>
                      <textarea className="input min-h-[80px] resize-y" placeholder="Factory address" />
                    </div>
                    <div>
                      <label className="label">Phone Number</label>
                      <input type="tel" defaultValue="+880-XX-XXXXXXX" className="input" />
                    </div>
                    <div>
                      <label className="label">Email Address</label>
                      <input type="email" defaultValue="info@shunyigarments.com" className="input" />
                    </div>
                    <div>
                      <label className="label">WhatsApp Number</label>
                      <input type="tel" defaultValue="+880-1XXX-XXXXXX" className="input" />
                    </div>
                    <div>
                      <label className="label">WeChat ID</label>
                      <input type="text" defaultValue="shunyigarments" className="input" />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "users" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Admin Users</h4>
                    <button className="btn btn-primary btn-sm">Add User</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full" role="table">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Login</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[
                          { name: "Admin User", email: "admin@shunyigarments.com", role: "SUPER_ADMIN", status: "Active", lastLogin: "2024-01-15 10:30" },
                          { name: "HR Manager", email: "hr@shunyigarments.com", role: "HR_MANAGER", status: "Active", lastLogin: "2024-01-15 09:15" },
                          { name: "Accounts Lead", email: "accounts@shunyigarments.com", role: "ACCOUNTS", status: "Active", lastLogin: "2024-01-14 16:45" },
                        ].map((user, index) => (
                          <tr key={index} className="hover:bg-muted/50 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium text-foreground">{user.name}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
                            <td className="px-4 py-3">
                              <span className="badge badge-outline">{user.role.replace("_", " ")}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="badge badge-success">{user.status}</span>
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{user.lastLogin}</td>
                            <td className="px-4 py-3 text-right">
                              <button className="btn btn-ghost btn-sm">Edit</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSection === "security" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Password Policy</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="label">Minimum Length</label>
                        <input type="number" defaultValue="8" className="input" min="6" max="32" />
                      </div>
                      <div>
                        <label className="label">Require Uppercase</label>
                        <select className="input"><option value="true">Yes</option><option value="false">No</option></select>
                      </div>
                      <div>
                        <label className="label">Require Numbers</label>
                        <select className="input"><option value="true">Yes</option><option value="false">No</option></select>
                      </div>
                      <div>
                        <label className="label">Require Special Characters</label>
                        <select className="input"><option value="true">Yes</option><option value="false">No</option></select>
                      </div>
                      <div>
                        <label className="label">Password Expiry (days)</label>
                        <input type="number" defaultValue="90" className="input" min="0" />
                      </div>
                      <div>
                        <label className="label">Max Login Attempts</label>
                        <input type="number" defaultValue="5" className="input" min="3" max="10" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                      <span>Enable 2FA for all admin users</span>
                    </label>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Session Management</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="label">Session Timeout (minutes)</label>
                        <input type="number" defaultValue="30" className="input" min="5" max="480" />
                      </div>
                      <div>
                        <label className="label">Remember Me Duration (days)</label>
                        <input type="number" defaultValue="30" className="input" min="1" max="365" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Email Settings</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="label">SMTP Host</label>
                        <input type="text" defaultValue="smtp.gmail.com" className="input" />
                      </div>
                      <div>
                        <label className="label">SMTP Port</label>
                        <input type="number" defaultValue="587" className="input" />
                      </div>
                      <div>
                        <label className="label">SMTP Username</label>
                        <input type="text" defaultValue="notifications@shunyigarments.com" className="input" />
                      </div>
                      <div>
                        <label className="label">SMTP Password</label>
                        <input type="password" defaultValue="••••••••" className="input" />
                      </div>
                      <div>
                        <label className="label">From Email</label>
                        <input type="email" defaultValue="noreply@shunyigarments.com" className="input" />
                      </div>
                      <div>
                        <label className="label">From Name</label>
                        <input type="text" defaultValue="Shunyi Garments" className="input" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Notification Triggers</h4>
                    <div className="space-y-3">
                      {[
                        "New worker registration",
                        "Worker termination",
                        "Attendance anomalies",
                        "Leave request submitted",
                        "Leave request approved/rejected",
                        "Payroll processed",
                        "Payroll paid",
                        "New buyer inquiry",
                        "Inquiry status changed",
                        "Production target missed",
                        "Certificate expiry warning",
                      ].map((trigger, index) => (
                        <label key={index} className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                          <span className="text-sm">{trigger}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "appearance" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Theme Settings</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <label className="relative">
                        <input type="radio" name="theme" defaultChecked className="sr-only" />
                        <div className="border-2 rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
                          <div className="h-24 w-full rounded bg-gradient-to-br from-blue-500 to-blue-700 mb-2" />
                          <p className="font-medium">Light Theme</p>
                        </div>
                      </label>
                      <label className="relative">
                        <input type="radio" name="theme" className="sr-only" />
                        <div className="border-2 rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
                          <div className="h-24 w-full rounded bg-gradient-to-br from-slate-800 to-slate-900 mb-2" />
                          <p className="font-medium">Dark Theme</p>
                        </div>
                      </label>
                      <label className="relative">
                        <input type="radio" name="theme" className="sr-only" />
                        <div className="border-2 rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
                          <div className="h-24 w-full rounded bg-gradient-to-br from-blue-500 to-slate-800 mb-2" />
                          <p className="font-medium">System Default</p>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Brand Colors</h4>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div>
                        <label className="label">Primary Color</label>
                        <input type="color" defaultValue="#2563eb" className="h-10 w-full rounded-lg border border-input cursor-pointer" />
                      </div>
                      <div>
                        <label className="label">Secondary Color</label>
                        <input type="color" defaultValue="#64748b" className="h-10 w-full rounded-lg border border-input cursor-pointer" />
                      </div>
                      <div>
                        <label className="label">Accent Color</label>
                        <input type="color" defaultValue="#d946ef" className="h-10 w-full rounded-lg border border-input cursor-pointer" />
                      </div>
                      <div>
                        <label className="label">Success Color</label>
                        <input type="color" defaultValue="#22c55e" className="h-10 w-full rounded-lg border border-input cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Logo & Favicon</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <p className="text-muted-foreground">Company Logo (Light)</p>
                        <p className="text-xs text-muted-foreground mt-1">Recommended: 200x60px, PNG/SVG</p>
                        <button className="btn btn-outline mt-3">Upload Logo</button>
                      </div>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <p className="text-muted-foreground">Company Logo (Dark)</p>
                        <p className="text-xs text-muted-foreground mt-1">Recommended: 200x60px, PNG/SVG</p>
                        <button className="btn btn-outline mt-3">Upload Logo</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "localization" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Languages</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="label">Default Language</label>
                        <select className="input">
                          <option value="en">English</option>
                          <option value="zh">Chinese (Simplified)</option>
                        </select>
                      </div>
                      <div>
                        <label className="label">Supported Languages</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" disabled />
                            <span>English (en)</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" disabled />
                            <span>Chinese - Simplified (zh)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Regional Settings</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className="label">Default Currency</label>
                        <select className="input">
                          <option value="USD">USD - US Dollar</option>
                          <option value="BDT" selected>BDT - Bangladeshi Taka</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                        </select>
                      </div>
                      <div>
                        <label className="label">Date Format</label>
                        <select className="input">
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      <div>
                        <label className="label">Time Zone</label>
                        <select className="input">
                          <option value="Asia/Dhaka" selected>Asia/Dhaka (UTC+6)</option>
                          <option value="UTC">UTC</option>
                          <option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Number Formatting</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className="label">Decimal Separator</label>
                        <select className="input"><option value=".">Dot (.)</option><option value=",">Comma (,)</option></select>
                      </div>
                      <div>
                        <label className="label">Thousands Separator</label>
                        <select className="input"><option value=",">Comma (,)</option><option value=".">Dot (.)</option><option value=" ">Space</option></select>
                      </div>
                      <div>
                        <label className="label">Decimal Places</label>
                        <input type="number" defaultValue="2" className="input" min="0" max="4" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "database" && (
                <div className="space-y-6">
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h4 className="font-medium mb-2">Database Status</h4>
                    <div className="grid gap-4 md:grid-cols-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Connection Status</p>
                        <p className="font-medium text-green-600 flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          Connected
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Database Size</p>
                        <p className="font-medium">245 MB</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Collections</p>
                        <p className="font-medium">16</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Backup Settings</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="label">Auto Backup</label>
                        <select className="input">
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      </div>
                      <div>
                        <label className="label">Backup Time</label>
                        <input type="time" defaultValue="02:00" className="input" />
                      </div>
                      <div>
                        <label className="label">Retention Period (days)</label>
                        <input type="number" defaultValue="30" className="input" min="7" max="365" />
                      </div>
                      <div>
                        <label className="label">Backup Location</label>
                        <input type="text" defaultValue="Cloud Storage" className="input" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Maintenance</h4>
                    <div className="flex flex-wrap gap-3">
                      <button className="btn btn-outline">Run Optimization</button>
                      <button className="btn btn-outline">Rebuild Indexes</button>
                      <button className="btn btn-outline">Analyze Tables</button>
                      <button className="btn btn-destructive">Clear Cache</button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "api" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Cloudinary Configuration</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="label">Cloud Name</label>
                        <input type="text" defaultValue="qsi82edc" className="input" />
                      </div>
                      <div>
                        <label className="label">API Key</label>
                        <input type="text" defaultValue="•••••••••••••••" className="input" />
                      </div>
                      <div>
                        <label className="label">API Secret</label>
                        <input type="password" defaultValue="••••••••••••••••••••" className="input" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">MongoDB Atlas</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="label">Connection URI</label>
                        <input type="text" defaultValue="mongodb+srv://...@cluster.mongodb.net/shunyigarments" className="input font-mono text-sm" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Webhook URLs</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Attendance Sync", url: "https://api.shunyigarments.com/webhooks/attendance" },
                        { name: "Payroll Notification", url: "https://api.shunyigarments.com/webhooks/payroll" },
                        { name: "Production Update", url: "https://api.shunyigarments.com/webhooks/production" },
                      ].map((webhook, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <span className="font-mono text-sm flex-1">{webhook.url}</span>
                          <span className="badge badge-success">Active</span>
                          <button className="btn btn-ghost btn-sm">Test</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
