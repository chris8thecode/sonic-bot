import { emoji as e } from "../../config/config.js";

export default {
  cmd: ["image"],
  desc: "Search and send an image from DuckDuckGo",
  run: async ({ text, react, image }, args) => {
    if (!args.length) {
      await text(
        `${e.cross} Please provide a search query.\nExample: !image sunset beach`,
      );
      return;
    }

    const query = args.join(" ");

    try {
      await react("🔍");

      const res = await fetch(
        `https://duckduckgo.com/i.js?q=${encodeURIComponent(query)}`,
        { headers: { "User-Agent": "Mozilla/5.0" } },
      );

      if (!res.ok) {
        await text(`${e.cross} Failed to reach image search.`);
        return;
      }

      const data = await res.json();

      if (!data?.results?.length) {
        await text(`${e.cross} No images found for *${query}*.`);
        return;
      }

      await image(data.results[0].image, `${e.check} Result for: *${query}*`);
    } catch (err) {
      await text(`${e.cross} Error fetching image: ${err.message}`);
    }
  },
};
