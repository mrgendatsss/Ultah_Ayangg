"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type SiteSettings = {
  id: number;
  is_locked: boolean;
  unlock_time: string;
  treasure_hunt_unlocked: boolean;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    if (!error && data) {
      setSettings(data as SiteSettings);
    }
    setLoading(false);
  };

  const toggleLock = async () => {
    if (!settings) return;
    
    const newValue = !settings.is_locked;
    const { error } = await supabase
      .from("site_settings")
      .update({ is_locked: newValue })
      .eq("id", settings.id);

    if (!error) {
      setSettings({ ...settings, is_locked: newValue });
    } else {
      alert("Error updating settings. Make sure you ran the SQL update.");
    }
  };

  const toggleTreasureHunt = async () => {
    if (!settings) return;
    
    const newValue = !settings.treasure_hunt_unlocked;
    const { error } = await supabase
      .from("site_settings")
      .update({ treasure_hunt_unlocked: newValue })
      .eq("id", settings.id);

    if (!error) {
      setSettings({ ...settings, treasure_hunt_unlocked: newValue });
    } else {
      alert("Error updating Treasure Hunt lock. Make sure you ran the SQL update to add the column.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h1>

      {loading ? (
        <p className="text-gray-500">Loading settings...</p>
      ) : settings ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-2xl space-y-8">
          
          {/* Main Site Lock */}
          <div className="flex items-center justify-between pb-8 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Site Access (Live)</h3>
              <p className="text-gray-500 text-sm mt-1">
                If ON, visitors can access the site. If OFF, the site is locked.
              </p>
            </div>
            <button
              onClick={toggleLock}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                !settings.is_locked ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  !settings.is_locked ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Treasure Hunt Lock */}
          <div className="flex items-center justify-between pb-8 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Treasure Hunt Status</h3>
              <p className="text-gray-500 text-sm mt-1">
                Unlock this only when she arrives in Semarang.
              </p>
            </div>
            <button
              onClick={toggleTreasureHunt}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.treasure_hunt_unlocked ? "bg-indigo-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.treasure_hunt_unlocked ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Countdown Target</h3>
            <p className="text-gray-500 text-sm mb-4">
              Current target: {new Date(settings.unlock_time).toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Settings not found. Please initialize the database.</p>
      )}
    </div>
  );
}
