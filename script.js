(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const placeholder = 'assets/media-placeholder.svg';
  const localOrigin = location.protocol === 'file:' || ['localhost', '127.0.0.1', 'ecc.local'].includes(location.hostname);
  const privateMode = window.ECC_PAGE?.allowPrivatePreview === true && localOrigin && new URLSearchParams(location.search).get('media') === 'private';
  const publicVideoMode = window.ECC_PAGE?.approvedPublicVideo === true;
  const videoEnabled = privateMode || publicVideoMode;
  document.documentElement.dataset.mediaMode = privateMode ? 'private' : publicVideoMode ? 'public-video' : 'public';
  const features = {
    inspect: { title: 'Inspect the selected occurrence', description: 'Read the actual selected component, referenced document and cached custom properties alongside the native model.', boundary: 'Custom material properties do not establish SOLIDWORKS Physical Material.', alt: 'Enlarged actual Component2 properties beside the recorded native assembly.' },
    compare: { title: 'Compare saved design evidence', description: 'See the reported modified occurrence, its before/after evidence and the incompleteness warning. Technical reference drift is kept separate.', boundary: 'The historical suppression capture discrepancy remains open. This is a stored observation, not proof of the original native state.', alt: 'Actual recorded suppression evidence with its full incompleteness warning and open-issue annotation.' },
    validate: { title: 'Validate independent test rules', description: 'The recorded run returns four PASS findings and zero FAIL findings against the existing independently specified test-only BOM and rules.', boundary: 'User-chosen test assumptions are not authenticated engineering requirements or approval.', alt: 'Actual four PASS and zero FAIL findings with the original engineering-approval warning visible.' },
    explain: { title: 'Explain with real local tool calls', description: 'Qwen3-4B calls get_revision_changes and get_validation_findings, then returns an actual cited explanation through local Ollama.', boundary: 'The answer describes saved, bounded observations. It cannot certify live CAD state or engineering safety.', alt: 'The real Qwen response, evidence citations and both successful structured tools in the recorded application.' },
    locate: { title: 'Locate evidence in native CAD', description: 'An explicit UI evidence action verifies Component2, selects its native occurrence and focuses the real 3D viewport. Clear Highlight removes the owned selection.', boundary: 'Navigation is a user-authorized UI action, not a model-executable CAD editing tool.', alt: 'The actual focused Component2 viewport beside verified native navigation feedback.' }
  };
  let currentFeature = 'inspect';
  function imageFailure(event) {
    const image = event.currentTarget;
    if (image.getAttribute('src') !== placeholder) image.src = placeholder;
    image.dataset.failed = 'true';
    if (image.id === 'feature-image') { $('#enlarge-frame').disabled = true; $('#feature-caption').textContent = 'Actual frame unavailable. No substitute application imagery is shown.'; }
    if (privateMode) $('#mode-notice').textContent = 'Local media could not be loaded. Check the private-assets folder; no substitute application imagery is shown.';
  }
  document.querySelectorAll('img').forEach(image => {
    image.addEventListener('error', imageFailure);
    image.addEventListener('load', () => { if (image.id === 'feature-image' && privateMode && !image.dataset.failed && image.getAttribute('src').startsWith('private-assets/')) { $('#enlarge-frame').disabled = false; $('#feature-caption').textContent = 'Actual recording, enlarged and annotated for readability. Local-only.'; } });
  });
  function showFeature(name, focus = false) {
    const feature = features[name]; if (!feature) return;
    currentFeature = name;
    document.querySelectorAll('[data-feature]').forEach(tab => { const active = tab.dataset.feature === name; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; if (active && focus) tab.focus(); });
    $('#feature-panel').setAttribute('aria-labelledby', `tab-${name}`);
    $('#feature-title').textContent = feature.title; $('#feature-description').textContent = feature.description; $('#feature-boundary').textContent = feature.boundary;
    const image = $('#feature-image'); image.dataset.failed = ''; image.src = privateMode ? `private-assets/${name}.jpg` : placeholder; image.alt = privateMode ? feature.alt : 'Restricted feature media withheld in public-safe preview.';
    $('#enlarge-frame').disabled = true;
    $('#feature-caption').textContent = privateMode ? 'Loading the actual recorded frame…' : 'Restricted feature imagery is withheld in public-safe preview.';
  }
  const tabs = [...document.querySelectorAll('[data-feature]')];
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showFeature(tab.dataset.feature));
    tab.addEventListener('keydown', event => { let next = null; if (event.key === 'ArrowRight') next = (index + 1) % tabs.length; if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = tabs.length - 1; if (next !== null) { event.preventDefault(); showFeature(tabs[next].dataset.feature, true); } });
  });
  const menu = $('.menu-toggle');
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); $('#navigation').classList.toggle('is-open', open); });
  $('#navigation').querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); $('#navigation').classList.remove('is-open'); }));
  const dialog = $('#frame-dialog');
  $('#enlarge-frame').addEventListener('click', () => { if (!privateMode || $('#feature-image').dataset.failed) return; $('#dialog-image').src = $('#feature-image').src; $('#dialog-image').alt = features[currentFeature].alt; $('#dialog-title').textContent = features[currentFeature].title + ' — actual annotated footage'; dialog.showModal(); });
  $('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  const video = $('#demo-video'); const status = $('#video-status');
  const heroVideo = $('#hero-video'); const heroPlay = $('#hero-play'); const heroStatus = $('#hero-video-status');
  heroPlay.addEventListener('click', () => {
    if (!videoEnabled) return;
    heroPlay.hidden = true; $('#hero-image').hidden = true; heroVideo.hidden = false;
    heroStatus.hidden = false; heroStatus.textContent = 'Loading the feature highlight...';
    if (!heroVideo.getAttribute('src')) heroVideo.src = video.getAttribute('src');
    video.pause();
    heroVideo.play().catch(() => { heroStatus.textContent = 'Playback did not start. Use the video controls to play the highlight.'; });
    heroVideo.focus();
  });
  heroVideo.addEventListener('playing', () => { heroStatus.textContent = 'Playing the actual recording edit. Pause and fullscreen are available in the player controls.'; });
  heroVideo.addEventListener('error', () => {
    if (!videoEnabled) return;
    heroVideo.hidden = true; $('#hero-image').hidden = false; heroPlay.hidden = true;
    heroStatus.hidden = false; heroStatus.textContent = 'Video unavailable. Check the media file and H.264 playback support.';
  });
  heroVideo.addEventListener('play', () => video.pause());
  video.addEventListener('play', () => heroVideo.pause());
  if (privateMode) {
    $('#mode-notice').textContent = 'PRIVATE LOCAL MEDIA PREVIEW · Includes local-only source imagery and the full original recording.';
    document.querySelectorAll('.media-mode-label').forEach(label => label.textContent = 'Private local media');
    $('#hero-image').src = 'private-assets/hero.jpg'; $('#hero-image').alt = 'Actual SOLIDWORKS Component2 focus beside the Engineering Change Copilot native Task Pane.';
    $('#hero-caption').textContent = 'Actual window recording · local-only permission';
    video.poster = 'private-assets/poster.jpg'; video.src = 'private-assets/engineering-change-copilot-highlight.mp4';
    const original = $('#original-demo'); original.href = '../demo_artifacts/engineering_change_copilot_demo.mp4'; original.textContent = 'Full original · 79.9 seconds ↗'; original.removeAttribute('aria-disabled'); original.classList.remove('unavailable'); original.target = '_blank'; original.rel = 'noopener noreferrer';
  } else if (publicVideoMode) {
    $('#mode-notice').textContent = 'Approved 42-second edited feature highlight. The original recording and other private project assets are not distributed.';
    document.querySelectorAll('.media-mode-label').forEach(label => label.textContent = 'Edited feature highlight');
    $('#hero-image').src = 'media/highlight-poster.jpg'; $('#hero-image').alt = 'Actual recorded SOLIDWORKS viewport and Copilot Task Pane from the approved feature highlight.';
    $('#hero-caption').textContent = 'Actual recording · 42-second edited highlight';
    video.poster = 'media/highlight-poster.jpg'; video.src = 'media/engineering-change-copilot-highlight.mp4';
    $('#original-demo').textContent = 'Full original · not publicly distributed';
  }
  if (videoEnabled) {
    heroPlay.hidden = false;
    video.preload = 'metadata'; $('#video-placeholder').hidden = true;
    status.textContent = 'Loading H.264 highlight…';
    document.querySelectorAll('[data-seek]').forEach(button => { button.disabled = false; button.addEventListener('click', () => { const seek = () => { video.currentTime = Number(button.dataset.seek); video.focus(); }; if (video.readyState >= 1) seek(); else { video.addEventListener('loadedmetadata', seek, { once: true }); video.load(); } }); });
  }
  video.addEventListener('loadedmetadata', () => { status.classList.remove('error'); status.textContent = `Highlight ready · ${video.duration.toFixed(1)} seconds · H.264 · 10 fps · edited, not continuous.`; });
  video.addEventListener('waiting', () => { status.textContent = 'Buffering video…'; });
  video.addEventListener('playing', () => { status.textContent = 'Playing the actual recording edit. Enlarged crops and editorial callouts are presentation only.'; });
  video.addEventListener('error', () => { if (!videoEnabled) return; status.classList.add('error'); status.textContent = 'Video unavailable. Check the media file and H.264 playback support. No substitute footage is shown.'; $('#video-placeholder').hidden = false; $('#video-placeholder').querySelector('h3').textContent = 'Video unavailable.'; $('#video-placeholder').querySelector('p').textContent = 'The approved highlight could not be loaded. No substitute footage is shown.'; });
  const navigationLinks = [...$('#navigation').querySelectorAll('a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (!entry.isIntersecting) return; navigationLinks.forEach(link => { if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); }); }, { rootMargin: '-15% 0px -65% 0px' });
    navigationLinks.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
  }
  showFeature('inspect');
})();
