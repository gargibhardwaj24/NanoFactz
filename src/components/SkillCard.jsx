import React from "react";
import useRandomSkill from "../hooks/useRandomSkill";

export default function SkillCard() {
  const { skill, loading, error, fetchNewSkill } = useRandomSkill();

  return (
    <div className="max-w-xl mx-auto mt-24 p-6 rounded-2xl shadow-lg bg-white">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Fact of the Day</h1>
          {loading && (
            <p className="mt-4 text-sm text-gray-500">Loading a new fact... ✨</p>
          )}

          {error && (
            <div className="mt-4 text-sm text-red-500">Error: {error}</div>
          )}

          {skill && !loading && (
            <>
              <h2 className="mt-4 text-xl font-medium">{skill.title}</h2>
              <p className="mt-2 text-gray-700">{skill.extract}</p>

              <div className="mt-4 flex gap-3">
                <a
                  href={skill.sourceUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs underline"
                >
                  Read more
                </a>
              </div>
            </>
          )}
        </div>

        <div className="w-36 h-24 rounded-lg overflow-hidden bg-gray-100">
          {skill?.image ? (
            <img
              src={skill.image}
              alt={skill?.title || "skill image"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20'%3ENo image%3C/text%3E%3C/svg%3E";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              ✨
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={fetchNewSkill}
          className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm hover:scale-105 transition"
        >
          New Fact
        </button>

        <small className="text-xs text-gray-500">NanoFactz • Tiny wins</small>
      </div>
    </div>
  );

}
