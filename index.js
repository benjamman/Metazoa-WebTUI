import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Metazoa from "metazoa-js";

import Home from "./views/Home";
import Search from "./views/Search";

const textSearcher = new Metazoa.TextSearch();
const suggester = new Metazoa.Suggest();

const app = express();
const PORT = 3001;

app.use(express.static("public"));

function redirect(site, q) {
    const targetUrl = site.startsWith("http")
        ? `${site}?q=${encodeURIComponent(q)}`
        : `https://${site.replace(/\/+$/, "")}?q=${encodeURIComponent(q)}`;

    return new Response(null, {
        status: 302,
        headers: {
            "Location": targetUrl,
        },
    });
}

function htmlTemplate(page, include = {}) {
    const pageHTML = renderToString(page);
    include.htmx ??= true;
    include.styles ??= "/styles.css";
    include.js ??= false;

    return `
    <!DOCTYPE html>
    <html lang="en" data-webtui-theme="dark">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- I'd actually like to brand this more similar to KestronProgramming/Slueth maybe as a "Slueth TUI" or something. But that might get confusing since I plan on making a "Metazoa TUI" which is a literal TUI. And the name just doesn't sound that cool. -->
        <title>Metasearch</title>
        <link rel="stylesheet" href="${include.styles}">
        ${include?.htmx ? '<script src="https://unpkg.com/htmx.org"></script>' : ''}
        <script src="/main.js"></script>
      </head>
      <body>
        <div id="app">${pageHTML}</div>
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
    if (q.match(/\(on engines:.+$/)) return redirect("http://localhost:3001/search",q.replace(/\(on engines:.+$/,"").trim());
    

    if (q.match(/\!\w/)) return redirect("unduck.link", q);

    const articles = await textSearcher.get(q);

    res.send(htmlTemplate(<Search query={q} articles={articles} />));
});

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
