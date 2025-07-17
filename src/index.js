import path from "path";
import fs from "fs";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Metazoa from "metazoa-js";

import * as dotenv from 'dotenv';
dotenv.config();

import Home from "./views/Home";
import Search from "./views/Search";

let textEngines = [ "duckduckgo" ];
if (process.env.BRAVE_API_KEY) textEngines.push("brave");
const textSearcher = new Metazoa.TextSearch(textEngines);
const suggester = new Metazoa.Suggest();

const app = express();
const PORT = 3001;

app.use(express.static("public"));

function htmlTemplate(page, options) {
    const pageHTML = renderToString(page);
    return `
    <!DOCTYPE html>
    <html lang="en" data-webtui-theme="dark">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- I'd actually like to brand this more similar to KestronProgramming/Slueth maybe as a "Slueth TUI" or something. But that might get confusing since I plan on making a "Metazoa TUI" which is a literal TUI. And the name just doesn't sound that cool. -->
        <title>${options?.title || "Metazoa WebTUI"}</title>
        <link rel="stylesheet" href="/styles.css">
        <script src="/main.js"></script>
      </head>
      <body>
        <div id="app">${pageHTML}</div>
        <span id="control-char" style="visibility:hidden;width:1ch">0</span>
      </body>
    </html>
  `;
}

app.get("/", (req, res) => {
    res.send(htmlTemplate(<Home />));
});

app.get("/search", async (req, res) => {
    const q = req.query?.q;
    if (!q) {
        res.set('Content-Type', 'text/html').status(400).send(htmlTemplate(<><h1>400 Bad Request</h1><p>No query provided</p></>));
    }
    if (q.length > 120) {
        res.set('Content-Type', 'text/html').status(400).send(htmlTemplate(<><h1>400 Bad Request</h1><p>DoS yourself. Thank you!</p></>));
    }
    if (q.match(/\(on engines:.+$/)) return redirect("http://localhost:3001/search",q.replace(/\(on engines:.+$/,"").trim());
    
    // Offload bangs to Brave for now
    if (q.match(/\!\w/)) res.redirect(`https://search.brave.com/search?q=${q}`);

    const articles = await textSearcher.get(q);
    const suggestions = await suggester.get(q);

    res.send(htmlTemplate(<Search query={q} articles={articles} suggestions={suggestions} />));
});

app.get("/favicon/:domain", async (req, res) => {
    const domain = req.params.domain;

    if (!domain) {
        res.redirect("/favicon.ico");
    }

    const urls = [
        `https://${domain}/favicon.ico`,
        `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    ];

    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const buffer = Buffer.from(await response.arrayBuffer());
                const contentType = response.headers.get("content-type");
                if (contentType.includes("image") && buffer.length > 300) {
                    return res.set("Content-Type", contentType).send(buffer);
                }
            }
        } catch (e) {}
    }

    res.redirect("/favicon.ico");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is listening at https://0.0.0.0:${PORT}`);
});
