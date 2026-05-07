import{c as h,s as g}from"./main-CYiYopzT.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=h("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);function s(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function u(e){return`
    const tryFocus = function () {
      try {
        window.focus();
      } catch (_error) {}
    };

    const focusLoop = function () {
      [0, 120, 320, 640].forEach(function (delay) {
        window.setTimeout(tryFocus, delay);
      });
    };

    const triggerPrint = function () {
      if (!${JSON.stringify(e)}) return;
      window.setTimeout(function () {
        tryFocus();
        try {
          window.print();
        } catch (_error) {}
      }, 360);
    };
  `}function w(e,t,a=!1){const n=`
<style>
  @media screen {
    html.preview-report-open body {
      padding: 18px;
      background: #eef1f5;
      box-sizing: border-box;
    }

    html.preview-report-open body > * {
      max-width: 980px;
      margin-left: auto !important;
      margin-right: auto !important;
    }

    html.preview-report-open .report-page {
      max-width: 980px;
      margin: 0 auto;
    }

    html.preview-report-open .preview-photo-grid {
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(220px, 280px)) !important;
      justify-content: start !important;
      gap: 12px !important;
      margin-top: 10px;
    }

    html.preview-report-open .preview-photo-card {
      margin: 0;
      width: 100% !important;
      min-width: 0;
      border: 1px solid #e5e0d7;
      border-radius: 8px;
      overflow: hidden;
      background: #fbfaf8;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    html.preview-report-open .preview-photo-frame {
      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 4 / 3;
      min-height: 180px;
      max-height: 220px;
      padding: 10px;
      box-sizing: border-box;
      background: #f0ebe4;
    }

    html.preview-report-open .preview-photo-card img {
      display: block;
      width: auto !important;
      height: auto !important;
      max-width: 100% !important;
      max-height: 100% !important;
      object-fit: contain !important;
      object-position: center !important;
      margin: 0 auto !important;
    }

    html.preview-report-open .preview-photo-card figcaption {
      font-size: 10.5px;
      color: #666;
      padding: 8px 10px;
      line-height: 1.4;
    }
  }
</style>
<script>
  (function () {
    const title = ${JSON.stringify(t)};
    const photoCaptionPattern = /photo\\s+(avant|apres|après)/i;
    ${u(a)}

    const isPhotoCard = function (node) {
      return !!node && !!node.classList && (
        node.classList.contains('photo-card') ||
        node.classList.contains('preview-photo-card')
      );
    };

    const ensurePhotoFrame = function (card) {
      if (!card || !card.querySelectorAll) return;
      if (card.querySelector('.photo-frame, .preview-photo-frame')) return;

      const candidate = Array.from(card.children).find(function (child) {
        return child.tagName === 'IMG';
      });

      if (!candidate) return;

      const frame = document.createElement('div');
      frame.className = 'photo-frame preview-photo-frame';
      card.insertBefore(frame, candidate);
      frame.appendChild(candidate);
    };

    const wrapLooseLegacyPhotos = function () {
      const images = Array.from(document.images || []);

      images.forEach(function (img) {
        if (
          img.closest('.photo-card, .preview-photo-card, figure, svg') ||
          img.closest('.photo-frame, .preview-photo-frame')
        ) {
          return;
        }

        const altText = (img.getAttribute('alt') || '').trim();
        const nextText = ((img.nextElementSibling && img.nextElementSibling.textContent) || '').trim();
        const captionCandidate = img.nextElementSibling && photoCaptionPattern.test(nextText)
          ? img.nextElementSibling
          : null;

        if (!photoCaptionPattern.test(altText) && !captionCandidate) {
          return;
        }

        const parent = img.parentElement;
        if (!parent) return;

        const card = document.createElement('figure');
        card.className = 'photo-card preview-photo-card';
        parent.insertBefore(card, img);
        card.appendChild(img);
        ensurePhotoFrame(card);

        const captionText = ((captionCandidate && captionCandidate.textContent) || altText).trim();
        if (captionText) {
          const caption = document.createElement('figcaption');
          caption.textContent = captionText;
          card.appendChild(caption);
        }

        if (captionCandidate) {
          captionCandidate.remove();
        }
      });
    };

    const regroupPhotoCards = function () {
      const parents = Array.from(new Set(
        Array.from(document.querySelectorAll('.photo-card, .preview-photo-card'))
          .map(function (card) { return card.parentElement; })
          .filter(Boolean),
      ));

      parents.forEach(function (parent) {
        if (!parent) return;
        if (parent.classList.contains('photo-grid') || parent.classList.contains('preview-photo-grid')) {
          return;
        }

        let index = 0;
        while (index < parent.children.length) {
          const child = parent.children[index];
          if (!isPhotoCard(child)) {
            index += 1;
            continue;
          }

          const grid = document.createElement('div');
          grid.className = 'photo-grid preview-photo-grid';
          parent.insertBefore(grid, child);

          while (parent.children[index] && isPhotoCard(parent.children[index])) {
            grid.appendChild(parent.children[index]);
          }
        }
      });
    };

    const normalizeReportLayout = function () {
      document.documentElement.classList.add('preview-report-open');

      Array.from(document.querySelectorAll('.photo-card, .preview-photo-card')).forEach(function (card) {
        ensurePhotoFrame(card);
      });

      wrapLooseLegacyPhotos();

      Array.from(document.querySelectorAll('.photo-card, .preview-photo-card')).forEach(function (card) {
        ensurePhotoFrame(card);
      });

      regroupPhotoCards();
    };

    const waitForImages = function () {
      const images = Array.from(document.images || []);
      return Promise.all(images.map(function (img) {
        if (img.complete) return Promise.resolve();
        return new Promise(function (resolve) {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        });
      }));
    };

    window.addEventListener('load', function () {
      if (title) document.title = title;
      normalizeReportLayout();
      waitForImages().then(function () {
        focusLoop();
        triggerPrint();
      });
    });
  })();
<\/script>`;return e.includes("</body>")?e.replace("</body>",`${n}</body>`):`${e}${n}`}function b(e,t,a=!1,n){const r=s(e),o=n?s(n):r,i=s(t);return`<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>${i}</title>
    <style>
      html, body {
        margin: 0;
        height: 100%;
        background: #eef1f5;
        font-family: "Helvetica Neue", Arial, sans-serif;
      }

      .toolbar {
        position: sticky;
        top: 0;
        z-index: 2;
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 10px 14px;
        background: rgba(255, 255, 255, 0.92);
        border-bottom: 1px solid #d8dfe6;
        backdrop-filter: blur(10px);
      }

      .toolbar strong {
        font-size: 14px;
        color: #1f2937;
      }

      .toolbar button,
      .toolbar a {
        appearance: none;
        border: 1px solid #d5dde6;
        border-radius: 999px;
        padding: 8px 12px;
        background: white;
        color: #1f2937;
        font-size: 13px;
        text-decoration: none;
        cursor: pointer;
      }

      .viewer {
        height: calc(100% - 53px);
      }

      .viewer iframe {
        width: 100%;
        height: 100%;
        border: 0;
        background: white;
      }

      @media print {
        html, body {
          background: white;
        }

        .toolbar {
          display: none !important;
        }

        .viewer {
          height: 100%;
        }
      }
    </style>
    <script>
      (function () {
        const title = ${JSON.stringify(t)};
        const autoPrint = ${JSON.stringify(a)};
        ${u(a)}

        const triggerEmbeddedPrint = function () {
          const frame = document.getElementById('report-frame');
          focusLoop();

          try {
            if (frame && frame.contentWindow && typeof frame.contentWindow.print === 'function') {
              frame.contentWindow.focus();
              frame.contentWindow.print();
              return;
            }
          } catch (_error) {}

          triggerPrint();
        };

        window.addEventListener('load', function () {
          if (title) document.title = title;
          focusLoop();

          const frame = document.getElementById('report-frame');
          if (frame) {
            frame.addEventListener('load', function () {
              focusLoop();
              if (autoPrint) {
                window.setTimeout(triggerEmbeddedPrint, 420);
              }
            }, { once: true });
          }

          if (autoPrint) {
            window.setTimeout(triggerEmbeddedPrint, 1800);
          }
        });
      })();
    <\/script>
  </head>
  <body>
    <div class="toolbar">
      <strong>${i}</strong>
      <button type="button" onclick="window.print()">Imprimer / enregistrer</button>
      <a href="${o}" target="_blank" rel="noopener noreferrer">Ouvrir le PDF brut</a>
    </div>
    <div class="viewer">
      <iframe id="report-frame" src="${r}#toolbar=0&navpanes=0&view=FitH" title="${i}"></iframe>
    </div>
  </body>
</html>`}function y(e,t,a,n={}){const{autoPrint:r=!1}=n,o=a??window.open("about:blank","_blank");if(!o)return!1;try{o.focus()}catch{}o.document.open(),o.document.write(w(e,t,r)),o.document.close();try{o.focus()}catch{}return!0}function v(e,t,a,n={}){const{autoPrint:r=!1,sourceUrl:o}=n,i=a??window.open("about:blank","_blank");if(!i)return!1;try{i.focus()}catch{}i.document.open(),i.document.write(b(e,t,r,o)),i.document.close();try{i.focus()}catch{}return!0}function p(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function x(e,t){return`<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>${p(e)}</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        font-family: "Helvetica Neue", Arial, sans-serif;
        background: #f6f4ef;
        color: #1f2937;
      }

      .card {
        max-width: 360px;
        padding: 20px 22px;
        border: 1px solid #e5ddd2;
        border-radius: 16px;
        background: #ffffff;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      }

      h1 {
        margin: 0 0 8px;
        font-size: 16px;
      }

      p {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
        color: #4b5563;
      }
    </style>
    <script>
      window.addEventListener("load", function () {
        var tryFocus = function () {
          try {
            window.focus();
          } catch (_error) {}
        };

        tryFocus();
        window.setTimeout(tryFocus, 120);
        window.setTimeout(tryFocus, 320);
        window.setTimeout(tryFocus, 640);
      });
    <\/script>
  </head>
  <body>
    <div class="card">
      <h1>${p(e)}</h1>
      <p>${p(t)}</p>
    </div>
  </body>
</html>`}function m(e,t=!0){if(!t||!e)return;const a=()=>{try{e.focus()}catch{}};[0,120,320,640].forEach(n=>{window.setTimeout(a,n)})}function E(){const e=()=>{try{window.focus()}catch{}};[0,80,180].forEach(t=>{window.setTimeout(e,t)})}function f(e="Ouverture du document",t="Préparation du fichier…",a={}){const{activate:n=!0}=a,r=window.open("about:blank","_blank");if(!r)throw new Error("Le navigateur a bloque l'ouverture du fichier");try{r.document.open(),r.document.write(x(e,t)),r.document.close()}catch(o){console.error("Unable to prepare pending document window",o)}return n?m(r,!0):E(),r}async function l(e,t,a=3600){if(!e||!t)throw new Error("Fichier indisponible");const{data:n,error:r}=await g.storage.from(e).createSignedUrl(t,a);if(r||!(n!=null&&n.signedUrl))throw r??new Error("Impossible d'ouvrir le fichier");return n.signedUrl}async function T(e,t,a=3600,n){if(!e||!t)throw new Error("Fichier indisponible");const r=f();try{const o=await l(e,t,a);return r.location.replace(o),m(r),o}catch(o){try{r.close()}catch(i){console.error("Unable to close pending document window",i)}throw o}}function P(e){return e.replace(/\.[a-z0-9]+$/i,"")}function k(e){return/^rapport-(client|intervention)-[a-z0-9-]+-\d{8}-\d{6}\.(html|pdf)$/i.test(e.trim())}function L(e){var a,n,r;const t=(a=e.file_name)==null?void 0:a.trim();return t&&!k(t)?P(t).replace(/\bBON\b/g,"Bon").replace(/^Rapport client\b/i,"Rapport d'intervention"):(n=e.bon_number)!=null&&n.trim()?`Rapport d'intervention commande ${e.bon_number.trim()}`:(r=e.task_title)!=null&&r.trim()?`Rapport d'intervention - ${e.task_title.trim()}`:"Rapport d'intervention"}function C(e){var r,o,i;const t=((r=e.file_name)==null?void 0:r.toLowerCase())??"",a=((o=e.storage_path)==null?void 0:o.toLowerCase())??"";return(((i=e.mime_type)==null?void 0:i.toLowerCase())??"").includes("text/html")||t.endsWith(".html")||a.endsWith(".html")}async function $(e,t=3600,a){if(!e.storage_bucket||!e.storage_path)throw new Error("Impossible d'ouvrir le rapport d'intervention");const n=L(e),r=a??f(n,"Préparation du rapport d'intervention…");if(C(e))try{const o=await l(e.storage_bucket,e.storage_path,t),i=await fetch(o);if(!i.ok)throw new Error("Impossible d'ouvrir le rapport d'intervention");const c=await i.text();if(!y(c,n,r,{autoPrint:!0}))throw new Error("Le navigateur a bloque l'ouverture du rapport d'intervention");return o}catch(o){try{r.close()}catch(i){console.error("Unable to close pending client report window",i)}throw o}try{const o=await l(e.storage_bucket,e.storage_path,t),i=await fetch(o);if(!i.ok)throw new Error("Impossible d'ouvrir le rapport d'intervention");const c=await i.blob(),d=URL.createObjectURL(c);if(!v(d,n,r,{autoPrint:!0,sourceUrl:d}))throw new Error("Le navigateur a bloque l'ouverture du rapport d'intervention");return d}catch(o){try{r.close()}catch(i){console.error("Unable to close pending client report window",i)}throw o}}export{S as E,y as a,$ as b,T as c,L as g,f as o};
