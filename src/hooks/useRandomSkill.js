import { useState, useEffect, useCallback, useRef } from "react";

export function useRandomSkill() {
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const abortRef = useRef(null);


    const unsplashFor = (keyword) => {
        const safe = encodeURIComponent(keyword || "aesthetic");
        return `https://source.unsplash.com/featured/?${safe}`;
    };
    const fetchSkill = useCallback(async (opts = { force: false }) => {
        setLoading(true);
        setError(null);

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const cached = sessionStorage.getItem("nano:lastSkill");
            if (!opts.force && cached) {
                const parsed = JSON.parse(cached);
                setSkill(parsed);
                setLoading(false);
                return parsed;
            }

            const res = await fetch(
                "https://en.wikipedia.org/api/rest_v1/page/random/summary",
                { signal: controller.signal }
            );
            if (!res.ok) {
                throw new Error(`Wikipedia API responded ${res.status}`);
            }
            const data = await res.json();
            const title = data.title || "Untitled";
            const extract = data.extract || "No summary available.";
            const sourceUrl = data.content_urls?.desktop?.page || data.content_urls?.mobile?.page || null;
            const image =
                (data.thumbnail && data.thumbnail.source) ||
                unsplashFor(title.split(",")[0]);


            const skillObj = { title, extract, image, sourceUrl };
            try {
                sessionStorage.setItem("nano:lastSkill", JSON.stringify(skillObj));
            } catch (e) {
            }
            setSkill(skillObj);
            setLoading(false);
            return skillObj;
        }
        catch (err) {
            if (err.name === "AbortError") {
                // request aborted - silent
                return;
            }
            setError(err.message || "An unknown error occurred.");
            setLoading(false);
            console.error("fetchSkill error:", err);
        } finally {
            abortRef.current = null;
        }
    },
        []);
    useEffect(() => {
        fetchSkill();
        return () => {
            if (abortRef.current) abortRef.current.abort();
        };
    }, [fetchSkill]);
    const fetchNewSkill = useCallback(() => fetchSkill({ force: true }), [fetchSkill]);

    return { skill, loading, error, fetchNewSkill };
}
const saveSkill = (skillObj) => {
  const saved = JSON.parse(localStorage.getItem("nano:skills") || "[]");
  // avoid duplicates
  if (!saved.find(s => s.title === skillObj.title)) {
    saved.unshift(skillObj);
    localStorage.setItem("nano:skills", JSON.stringify(saved.slice(0, 50))); // keep max 50
  }
};
export default useRandomSkill;