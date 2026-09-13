/*! pour filters | MIT | https://pour.dev */
var PourFilters=(()=>{var ye=Object.defineProperty;var kt=Object.getOwnPropertyDescriptor;var wt=Object.getOwnPropertyNames;var St=Object.prototype.hasOwnProperty;var At=(e,r)=>{for(var t in r)ye(e,t,{get:r[t],enumerable:!0})},Et=(e,r,t,c)=>{if(r&&typeof r=="object"||typeof r=="function")for(let f of wt(r))!St.call(e,f)&&f!==t&&ye(e,f,{get:()=>r[f],enumerable:!(c=kt(r,f))||c.enumerable});return e};var Tt=e=>Et(ye({},"__esModule",{value:!0}),e);var gr={};At(gr,{CSS_FILTERS:()=>ne,MODE_LABELS:()=>we,SENSORY_FILTERS:()=>se,accessibleName:()=>dt,createFilterApplier:()=>ct,createLensKit:()=>le,cssPath:()=>Ie});var ve={protanopia:"0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0 0 0 0 1 0",deuteranopia:"0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047414 0 0 -0.011820 0.042940 0.968881 0 0 0 0 0 1 0",tritanopia:"1.255528 -0.076749 -0.178779 0 0 -0.078411 0.930809 0.147602 0 0 0.004733 0.691367 0.303900 0 0 0 0 0 1 0",achromatopsia:"0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0 0 0 1 0",protanomaly:"0.458064 0.679578 -0.137642 0 0 0.092785 0.846313 0.060902 0 0 -0.007494 -0.016807 1.024301 0 0 0 0 0 1 0",deuteranomaly:"0.547494 0.607765 -0.155259 0 0 0.181692 0.781742 0.036566 0 0 -0.010410 0.027275 0.983136 0 0 0 0 0 1 0",tritanomaly:"1.057047 -0.029507 -0.027540 0 0 -0.039014 0.966028 0.072986 0 0 0.002584 0.220200 0.777216 0 0 0 0 0 1 0"},Mt={protanopia:"saturate(0.25) sepia(0.5) hue-rotate(-15deg)",deuteranopia:"saturate(0.3) sepia(0.4) hue-rotate(-10deg)",tritanopia:"saturate(0.35) sepia(0.3) hue-rotate(50deg)",achromatopsia:"grayscale(100%)",protanomaly:"saturate(0.6) sepia(0.25) hue-rotate(-8deg)",deuteranomaly:"saturate(0.65) sepia(0.2) hue-rotate(-5deg)",tritanomaly:"saturate(0.7) sepia(0.15) hue-rotate(25deg)"},xe=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge","diabeticRetinopathy","floaters","migraineAura","glossyScreen","nystagmus","hemianopiaLeft","hemianopiaRight","amblyopia"]),ke=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge"]),ne={none:"none",cataract:"sepia(0.3) contrast(0.9) saturate(0.9) brightness(0.95) blur(0.6px)",presbyopia:"blur(0.5px) contrast(0.92)",lowAcuityMild:"blur(0.7px)",lowAcuity:"blur(1.2px)",lowAcuityStrong:"blur(2.5px)",lowAcuityHeavy:"blur(5px)",lowLight:"brightness(0.65) contrast(0.9) saturate(0.85) hue-rotate(-8deg)",lowContrast:"contrast(0.7)",retinitisRing:"none",glaucoma:"none",glaucomaLarge:"none",macularDegeneration:"none",macularDegenerationLarge:"none",diabeticRetinopathy:"none",floaters:"none",migraineAura:"none",glossyScreen:"none",nystagmus:"none",hemianopiaLeft:"none",hemianopiaRight:"none",amblyopia:"none",scotopicRose:"sepia(0.15) hue-rotate(330deg) saturate(1.2) brightness(1.05)",scotopicYellow:"sepia(0.3) saturate(1.15) brightness(1.05)",scotopicAqua:"sepia(0.2) hue-rotate(160deg) saturate(1.15) brightness(1.02)"},Ct=typeof navigator<"u"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Lt=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),$t=Ct||Lt;Object.keys(ve).forEach(e=>{$t?ne[e]=Mt[e]:ne[e]=`url(#pour-vision-filter-${e})`});var Rt=[{label:"Color vision",options:[{value:"deuteranomaly",added:"2026-07-30",name:"Green Weak (Deuteranomaly)",stat:"~5% of men",description:"Green-sensitive cones respond off-target, so greens, reds and browns crowd together. The most common colour vision difference.",label:"Green Weak - Deuteranomaly - ~5% of men"},{value:"protanomaly",added:"2026-07-30",name:"Red Weak (Protanomaly)",stat:"~1% of men",description:"Red-sensitive cones respond weakly: reds dim and drift towards green.",label:"Red Weak - Protanomaly - ~1% of men"},{value:"protanopia",added:"2026-07-30",name:"Red Absent (Protanopia)",stat:"~1% of men",description:"Red light barely registers \u2014 reds darken and sink into the greens around them.",label:"Red Absent - Protanopia - ~1% of men"},{value:"deuteranopia",added:"2026-07-30",name:"Green Absent (Deuteranopia)",stat:"~1% of men",description:"No working green cones: red and green become the same family of murky ochre.",label:"Green Absent - Deuteranopia - ~1% of men"},{value:"tritanomaly",added:"2026-07-30",name:"Blue Weak (Tritanomaly)",stat:"<0.2%",description:"Blue-sensitive cones respond weakly: blues and greens blur together, yellows go pale.",label:"Blue Weak - Tritanomaly - <0.2%"},{value:"tritanopia",added:"2026-07-30",name:"Blue Absent (Tritanopia)",stat:"<0.01%",description:"No working blue cones \u2014 blues read as greens, yellows as pinks and greys.",label:"Blue Absent - Tritanopia - <0.01%"},{value:"achromatopsia",added:"2026-07-30",name:"Monochromacy (Achromatopsia)",stat:"~0.003%",description:"No colour at all: brightness is the only signal left, usually with strong glare sensitivity.",label:"Monochromacy - Achromatopsia - ~0.003%"}]},{label:"Eye conditions",options:[{value:"presbyopia",added:"2026-07-30",name:"Near-Vision Loss (Presbyopia)",stat:"nearly all over 50",description:"The lens stiffens with age and close text blurs \u2014 the one condition almost everyone gets.",label:"Near-Vision Loss - Presbyopia - nearly all over 50"},{value:"glaucoma",added:"2026-07-30",name:"Tunnel Vision (Glaucoma)",stat:"~2% over 40",description:"Peripheral vision closes in until only a central window stays sharp. The window follows your pointer.",label:"Tunnel Vision - Glaucoma - ~2% over 40"},{value:"glaucomaLarge",added:"2026-07-30",name:"Tunnel Vision (Advanced Glaucoma)",stat:"~0.5% over 40",description:"Advanced glaucoma: the sharp window narrows further; everything else is gone, not blurred.",label:"Tunnel Vision (Large) - Advanced Glaucoma - ~0.5% over 40"},{value:"macularDegeneration",added:"2026-07-30",name:"Central Vision Loss (Macular Degeneration)",stat:"~8% over 45",description:"The centre of gaze fades first \u2014 precisely where you point your eyes to read.",label:"Central Vision Loss - Macular Degeneration - ~8% over 45"},{value:"macularDegenerationLarge",added:"2026-07-30",name:"Central Vision Loss (Advanced Macular Degeneration)",stat:"~1% over 50",description:"Advanced macular degeneration: a larger central blank that reading must route around.",label:"Central Vision Loss (Large) - Advanced Macular Degeneration - ~1% over 50"},{value:"diabeticRetinopathy",added:"2026-07-30",name:"Patchy Vision (Diabetic Retinopathy)",stat:"~0.8% over 40",description:"Blood-vessel damage scatters dark blotches across the view; content falls into them.",label:"Patchy Vision - Diabetic Retinopathy - ~0.8% over 40"},{value:"floaters",name:"Drifting Shadows (Floaters)",added:"2026-09-12",stat:"~33%",description:"Strands and specks in the eye cast shadows that drift and lag behind every eye movement. They show most against bright, flat areas, so a page of white space is where they live.",label:"Drifting Shadows - Floaters - ~33%"},{value:"nystagmus",added:"2026-07-30",name:"Involuntary Eye Movement (Nystagmus)",stat:"~0.2%",description:"The eyes move on their own, so the page never quite holds still.",label:"Involuntary Eye Movement - Nystagmus - ~0.2%"}]},{label:"Field of vision",options:[{value:"hemianopiaLeft",added:"2026-07-30",name:"Left Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the left half of vision in both eyes.",label:"Left Field Loss - Hemianopia (Left) - ~0.1% over 49"},{value:"hemianopiaRight",added:"2026-07-30",name:"Right Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the right half of vision in both eyes.",label:"Right Field Loss - Hemianopia (Right) - ~0.1% over 49"},{value:"retinitisRing",name:"Ring Loss (Retinitis Pigmentosa)",added:"2026-08-22",stat:"~0.025%",description:"Early retinitis pigmentosa takes a ring out of the mid-periphery, leaving a clear centre and a seeing outer rim. It narrows to a tunnel only much later, so this donut, not the tunnel, is what most of that life looks like.",label:"Ring Loss - Retinitis Pigmentosa - ~0.025%"},{value:"amblyopia",added:"2026-07-30",name:"Reduced Acuity (Amblyopia)",stat:"~2-3%",description:"One eye never learned to see sharply; fine detail and depth suffer.",label:"Reduced Acuity (One Eye) - Amblyopia - ~2-3%"},{value:"migraineAura",added:"2026-09-12",name:"Shimmering Blind Spot (Migraine Aura)",stat:"~5%",description:"A ring of shimmering zigzag light grows out from the point of gaze over half a minute and settles, with a blind band inside it, and rides with the eye. Nothing under it can be read, so anything that times out or cannot be paused and returned to is the finding. Slowed to stay under three flashes a second.",label:"Shimmering Blind Spot - Migraine Aura - ~5%"}]},{label:"Focus & acuity",options:[{value:"lowAcuityMild",added:"2026-07-30",name:"Slight Defocus",description:"Mildly uncorrected eyesight \u2014 the glasses left in the other room.",label:"Slight Defocus - Mild Blur"},{value:"lowAcuity",added:"2026-07-30",name:"Uncorrected Focus",stat:"~5-6%",description:"Moderate uncorrected short-sight: small text needs effort, thin fonts give up first.",label:"Uncorrected Focus - Moderate Blur - ~5-6%"},{value:"lowAcuityStrong",added:"2026-07-30",name:"Significant Defocus",description:"Strong blur: layout and colour still communicate, letterforms mostly do not.",label:"Significant Defocus - Strong Blur"},{value:"lowAcuityHeavy",added:"2026-07-30",name:"Severe Defocus",description:"Only shape, contrast and position survive. What does your page still say?",label:"Severe Defocus - Very Strong Blur"}]},{label:"Contrast & light",options:[{value:"cataract",added:"2026-07-30",name:"Clouded Lens (Cataract)",stat:"~17% over 40",description:"The lens clouds and yellows: glare blooms, contrast drains, whites go dingy.",label:"Clouded Lens - Cataract - ~17% over 40"},{value:"lowContrast",added:"2026-07-30",name:"Reduced Contrast",description:"Contrast sensitivity loss: faint greys sink into their backgrounds long before they vanish for you.",label:"Reduced Contrast"},{value:"lowLight",added:"2026-07-30",name:"Dim Environment",description:"A dim room, a cheap panel, a phone at night \u2014 the low-vision hours everyone has.",label:"Dim Environment - Low Light"},{value:"glossyScreen",added:"2026-09-12",name:"Glossy Screen (Reflections)",description:"The room and your own face reflect off the glass and add light to every dark pixel. White areas barely change; dark themes, grey-on-black text and low-contrast controls wash out first. Uses your camera on this device only, never recorded or sent.",label:"Glossy Screen - Reflections"}]},{label:"Visual stress",options:[{value:"scotopicRose",added:"2026-07-30",name:"Rose Tint",description:"A coloured overlay some readers use to calm pattern glare. See how your design reads through one.",label:"Rose Tint - Coloured Overlay"},{value:"scotopicYellow",added:"2026-07-30",name:"Yellow Tint",description:"A yellow reading overlay \u2014 common for visual stress. Your palette should survive it.",label:"Yellow Tint - Coloured Overlay"},{value:"scotopicAqua",added:"2026-07-30",name:"Aqua Tint",description:"An aqua reading overlay. Tinted reading is more common than most designs assume.",label:"Aqua Tint - Coloured Overlay"}]}],se={none:{label:"None",css:"none"},fluorescentFlicker:{label:"Fluorescent Flicker",overlay:"fluorescentFlicker",css:"none"},lightSensitivity:{label:"Light Sensitivity",css:"brightness(1.4) contrast(1.2) saturate(1.1)"},colourHypersensitivity:{label:"Colour Hypersensitivity",css:"saturate(2.2) contrast(1.35) brightness(1.1)"},motionSensitivity:{label:"Motion Sensitivity",hostClass:"pour-sensory-filter-motionSensitivity",viewportOrigin:!0,css:"none"},hyperfocusTunnel:{label:"Hyperfocus Tunnel (Metaphor)",overlay:"hyperfocusTunnel",mouseTracked:!0,css:"none"},attentionFragmentation:{label:"Attention Fragmentation (Metaphor)",overlay:"attentionFragmentation",css:"none"},peripheralDistraction:{label:"Peripheral Distraction",overlay:"peripheralDistraction",css:"none"},detailFixation:{label:"Detail Fixation (Metaphor)",overlay:"detailFixation",mouseTracked:!0,loupe:{scale:2,radius:100,ring:50},css:"none"},processingDelay:{label:"Processing Lag",overlay:"processingDelay",css:"none"},sensoryInterference:{label:"Sensory Interference",hostClass:"pour-sensory-filter-backgroundNoise",css:"none"},sensorySpike:{label:"Sudden Sensory Spike",overlay:"sensorySpike",css:"none"},dyslexiaVisualStress:{label:"Visual Stress (Pattern Glare)",overlay:"dyslexiaVisualStress",injectCSS:`
        body { background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.06) 22px, rgba(0,0,0,0.06) 24px) !important; background-attachment: fixed !important; }
        p, li, td, th, dd, dt, h1, h2, h3, h4, h5, h6, label { text-shadow: 0 0 1px rgba(0,0,0,0.15) !important; animation: pour-sensory-line-merge 3s ease-in-out infinite alternate !important; }
        @keyframes pour-sensory-line-merge { 0% { transform: scaleX(1) translateY(0); } 25% { transform: scaleX(1.008) translateY(0.8px); } 50% { transform: scaleX(0.993) translateY(-0.5px); } 75% { transform: scaleX(1.005) translateY(0.6px); } 100% { transform: scaleX(0.996) translateY(-0.3px); } }
      `,css:"none"},dyslexiaCrowding:{label:"Crowding Effect",injectCSS:"* { letter-spacing: -1px !important; word-spacing: -3px !important; line-height: 1.05 !important; } p, li, td, th, dd, dt, label, span, a { font-size: 95% !important; }",css:"none"},dyslexiaTrackingLoss:{label:"Tracking Loss",overlay:"dyslexiaTrackingLoss",mouseTracked:!0,css:"none"},dyslexiaWashout:{label:"Letter Instability",injectScript:!0,css:"none"},dyslexiaContrastSensitivity:{label:"Contrast Sensitivity",css:"contrast(0.8) brightness(1.1) saturate(0.9)"},handTremor:{label:"Hand Tremor",cursorJitter:{freq:6,amp:9,intent:1.6,bitmap:96},css:"none"},handTremorStrong:{label:"Hand Tremor (Strong)",cursorJitter:{freq:5,amp:18,intent:1.9,bitmap:128},css:"none"},restingTremor:{label:"Resting Tremor",cursorJitter:{freq:4.5,amp:12,intent:-.9,bitmap:96},css:"none"},ataxicDrift:{label:"Ataxic Drift",cursorJitter:{freq:.7,amp:26,intent:.8,bitmap:128},css:"none"},pointerSpasm:{label:"Sudden Jerk",cursorJitter:{freq:5,amp:3,intent:.4,bitmap:128,spasm:{minGap:2200,maxGap:6500,size:44,dur:280}},css:"none"},pointerHidden:{label:"Hidden Pointer (Keyboard Only)",cursorJitter:{hide:!0,bitmap:32},css:"none"},fingertipTouch:{label:"Fingertip Touch",fingertip:{diameter:38},css:"none"},forcedColours:{label:"Forced Colours",forcedColours:!0,css:"none"},screenMagnifier:{label:"Screen Magnifier (400%)",magnifier:{scale:4},css:"none"},textSpacing:{label:"Text Spacing",injectCSS:`
        *:not([data-pour-audit]):not([data-pour-audit] *) { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
        p:not([data-pour-audit] *) { margin-bottom: 2em !important; }
      `,css:"none"},focusOrder:{label:"Focus Order",lens:"focusOrder",css:"none"},landmarkMap:{label:"Landmarks & Headings",lens:"landmarkMap",css:"none"}},Ft=[{label:"Sensory overload",options:[{value:"fluorescentFlicker",added:"2026-07-30",name:"Fluorescent Flicker",description:"The pulse of failing fluorescent light \u2014 flicker that many autistic and migraine-prone people cannot tune out.",label:"Fluorescent Flicker"},{value:"lightSensitivity",added:"2026-07-30",name:"Light Sensitivity",description:"Photophobia: ordinary brightness arrives as glare; bright themes read as pain.",label:"Light Sensitivity"},{value:"colourHypersensitivity",added:"2026-07-30",name:"Colour Hypersensitivity",description:"Saturated colour lands far louder than you sent it.",label:"Colour Hypersensitivity"},{value:"motionSensitivity",added:"2026-07-30",name:"Motion Sensitivity",stat:"~5% of adults",description:"Page motion is felt, not just seen \u2014 what autoplaying movement does to a vestibular-sensitive visitor.",label:"Motion Sensitivity"}]},{label:"Attention & focus",options:[{value:"hyperfocusTunnel",added:"2026-07-30",name:"Hyperfocus Tunnel",metaphor:!0,description:"The world outside the point of focus falls away; the page exists one region at a time.",label:"Hyperfocus Tunnel (Metaphor)"},{value:"attentionFragmentation",added:"2026-07-30",name:"Attention Fragmentation",metaphor:!0,description:"A scattered attention field \u2014 every element competes and none of them wins.",label:"Attention Fragmentation (Metaphor)"},{value:"peripheralDistraction",added:"2026-07-30",name:"Peripheral Distraction",description:"Movement at the edges keeps stealing the centre of your gaze.",label:"Peripheral Distraction"},{value:"detailFixation",added:"2026-09-12",name:"Detail Fixation",metaphor:!0,description:"Detail-first processing: the point of attention magnifies while the whole recedes.",label:"Detail Fixation (Metaphor)"}]},{label:"Processing differences",options:[{value:"processingDelay",added:"2026-07-30",name:"Processing Lag",description:"The page lands a beat late \u2014 interaction as it feels under cognitive load.",label:"Processing Lag"},{value:"sensoryInterference",added:"2026-07-30",name:"Sensory Interference",description:"Visual noise under everything, like reading in a room that will not go quiet.",label:"Sensory Interference"}]},{label:"Sensory spikes",options:[{value:"sensorySpike",added:"2026-07-30",name:"Sudden Sensory Spike",description:"Not a constant state: periodic waves of too-much, out of nowhere.",label:"Sudden Sensory Spike"}]},{label:"Dyslexia / reading",options:[{value:"dyslexiaVisualStress",added:"2026-07-30",name:"Visual Stress (Pattern Glare)",stat:"~10%",description:"Dense text shimmers and bands together; lines merge and repel.",label:"Visual Stress (Pattern Glare)"},{value:"dyslexiaCrowding",added:"2026-07-30",name:"Crowding Effect",stat:"~10%",description:"Letters and words pack too tightly to separate \u2014 spacing is doing more work than you think.",label:"Crowding Effect"},{value:"dyslexiaTrackingLoss",added:"2026-07-30",name:"Tracking Loss",stat:"~10%",description:"Losing the line mid-sentence: only the neighbourhood of your pointer holds steady.",label:"Tracking Loss"},{value:"dyslexiaWashout",added:"2026-07-30",name:"Letter Instability",stat:"~10%",description:"Some letters appear fainter than others, making words harder to read. Try reading a paragraph with the effect enabled.",label:"Letter Instability"},{value:"dyslexiaContrastSensitivity",added:"2026-07-30",name:"Contrast Sensitivity",stat:"~10%",description:"Full-contrast text tires, low-contrast text disappears; the readable band is narrow.",label:"Contrast Sensitivity"}]}],Nt=[{label:"Tremor",options:[{value:"handTremor",added:"2026-08-06",name:"Hand Tremor",stat:"~1%",description:"An essential tremor: the pointer shakes harder the more precisely you aim.",label:"Hand Tremor"},{value:"handTremorStrong",added:"2026-08-06",name:"Hand Tremor (Strong)",description:"The same tremor, stronger \u2014 small close-set targets become lotteries.",label:"Hand Tremor (Strong)"},{value:"restingTremor",added:"2026-08-06",name:"Resting Tremor",stat:"~0.3%",description:"A parkinsonian pattern: shakes at rest, steadies during deliberate movement.",label:"Resting Tremor"}]},{label:"Pointer control",options:[{value:"ataxicDrift",added:"2026-08-06",name:"Ataxic Drift",description:"The pointer drifts wide of intent; straight lines are not on offer.",label:"Ataxic Drift"},{value:"pointerSpasm",added:"2026-08-06",name:"Sudden Jerk",description:"Occasional involuntary jerks fling the pointer \u2014 sometimes mid-click.",label:"Sudden Jerk"},{value:"pointerHidden",added:"2026-08-06",name:"Hidden Pointer (Keyboard Only)",description:"No pointer at all. The keyboard is the only way through your page.",label:"Hidden Pointer (Keyboard Only)"}]},{label:"Touch",options:[{value:"fingertipTouch",added:"2026-09-13",name:"Fingertip Touch",description:"The pointer becomes a fingertip, about 10 mm across. Every target under it is outlined, and when more than one is, each shows its share of the fingertip. A click lands the way a tap does: on one of those targets, in proportion to its share. Close-set links and small buttons are the findings.",label:"Fingertip Touch"}]}],Ot=[{label:"Keyboard",options:[{value:"focusOrder",added:"2026-09-07",name:"Focus Order",description:"Numbered stops trace where Tab really goes, in order. Amber stops force their own position with a positive tabindex.",label:"Focus Order"}]},{label:"Page structure",options:[{value:"landmarkMap",added:"2026-09-07",name:"Landmarks & Headings",description:"Landmark regions tinted and named, every heading chipped with its level. Amber chips skip a level.",label:"Landmarks & Headings"}]}],Dt=[{label:"Colours",options:[{value:"forcedColours",added:"2026-09-12",name:"Forced Colours (Windows Contrast Theme)",stat:"~4% on Windows",description:"Every colour the page chose is replaced by a contrast theme\u2019s handful. Backgrounds, gradients and shadows go; borders keep their width; images and video stay, with a plate behind any text over them, as Windows draws it. Icon buttons that vanish, borderless fields and missing focus rings are the findings. An approximation: the page\u2019s own forced-colours rules are applied where its stylesheets can be read.",label:"Forced Colours (Windows Contrast Theme)"}]},{label:"Magnification",options:[{value:"screenMagnifier",added:"2026-09-13",name:"Screen Magnifier (400%)",description:"The page at 400%, as a full-screen magnifier shows it: a quarter of the width at a time, following the pointer and keyboard focus. When something changes outside the magnified view, a marker at the edge points to it. Messages, basket counts and menus that appear where the reader is not looking are the findings.",label:"Screen Magnifier (400%)"}]},{label:"Text",options:[{value:"textSpacing",added:"2026-09-12",name:"Text Spacing",description:"Line height 1.5, paragraph spacing 2, letter spacing 0.12 and word spacing 0.16 times the font size: the overrides low-vision and dyslexic readers apply, which WCAG 1.4.12 says a page must survive. Clipped labels, overflowing boxes and buttons that break are the findings.",label:"Text Spacing"}]}],we={};for(let e of[...Rt,...Ft,...Nt,...Ot,...Dt])for(let r of e.options)we[r.value]=r.label.split(" - ")[0];function Se(e){return e.assignedSlot??e.parentElement??e.getRootNode()?.host??null}var De=new WeakMap,Pt=new Set;function It(e){let r=De.get(e);if(!r){let t=typeof MutationObserver=="function"?new MutationObserver(()=>{r.ids=null,r.parents=new WeakMap}):null;r={ids:null,parents:new WeakMap,observer:t},t&&(t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["id"]}),Pt.add(t)),De.set(e,r)}if(r.observer?.takeRecords().length&&(r.ids=null,r.parents=new WeakMap),!r.ids){r.ids=new Map;for(let t of e.querySelectorAll("[id]"))r.ids.set(t.id,(r.ids.get(t.id)??0)+1)}return r}function zt(e,r){let t=e.parentElement,c=r.parents.get(t);if(!c){let f=new Map;c=new WeakMap;for(let o of t.children){let n=(f.get(o.tagName)??0)+1;f.set(o.tagName,n),c.set(o,{position:n,repeated:!1})}for(let o of t.children)c.get(o).repeated=f.get(o.tagName)>1;r.parents.set(t,c)}return c.get(e)}function Pe(e){let r=e.getRootNode(),t=It(r),c=n=>n.id&&t.ids.get(n.id)===1;if(c(e))return`#${CSS.escape(e.id)}`;let f=[],o=e;for(;o&&o.nodeType===Node.ELEMENT_NODE&&o!==document.documentElement;){let n=o.tagName.toLowerCase();if(o.parentElement){let{position:d,repeated:g}=zt(o,t);g&&(n+=`:nth-of-type(${d})`)}if(f.unshift(n),o.parentElement&&c(o.parentElement)){f.unshift(`#${CSS.escape(o.parentElement.id)}`);break}o=o.parentElement}return f.join(" > ")||e.tagName.toLowerCase()}function Ie(e){let r=Pe(e),t=e.getRootNode();for(;t&&t.host;)r=`${Pe(t.host)} >>> ${r}`,t=t.host.getRootNode();return r}var vr=typeof Element<"u"?Object.getOwnPropertyDescriptor(Element.prototype,"attributes")?.get:null;function ze(e){for(let r=e;r;r=Se(r))if(r.nodeType===1&&r.hasAttribute("inert"))return!0;return!1}var Bt=new Set(["atomic","busy","controls","current","describedby","description","details","dropeffect","flowto","grabbed","hidden","keyshortcuts","label","labelledby","live","owns","relevant","roledescription","braillelabel","brailleroledescription"]),qe=new Set(["banner","complementary","contentinfo","form","main","navigation","region","search"]),qt={link:["disabled","errormessage","expanded","haspopup","invalid"],button:["disabled","errormessage","expanded","haspopup","invalid","pressed"],checkbox:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],switch:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],radio:["checked","disabled","errormessage","haspopup","invalid","posinset","setsize"],option:["checked","disabled","errormessage","haspopup","invalid","posinset","selected","setsize"],tab:["disabled","errormessage","expanded","haspopup","invalid","posinset","selected","setsize"],menuitem:["disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemcheckbox:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemradio:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],textbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],searchbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],combobox:["activedescendant","autocomplete","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],listbox:["activedescendant","disabled","errormessage","expanded","haspopup","invalid","multiselectable","orientation","readonly","required"],slider:["disabled","errormessage","haspopup","invalid","orientation","readonly","valuemax","valuemin","valuenow","valuetext"],spinbutton:["activedescendant","disabled","errormessage","haspopup","invalid","readonly","required","valuemax","valuemin","valuenow","valuetext"],progressbar:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],meter:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],scrollbar:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],heading:["disabled","errormessage","haspopup","invalid","level"],list:["disabled","errormessage","haspopup","invalid"],listitem:["disabled","errormessage","haspopup","invalid","level","posinset","setsize"],row:["activedescendant","colindex","colindextext","disabled","errormessage","expanded","haspopup","invalid","level","posinset","rowindex","rowindextext","selected","setsize"],rowgroup:["disabled","errormessage","haspopup","invalid"],cell:["colindex","colindextext","colspan","disabled","errormessage","haspopup","invalid","rowindex","rowindextext","rowspan"],gridcell:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected"],columnheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],rowheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],table:["colcount","disabled","errormessage","haspopup","invalid","rowcount"],grid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","readonly","rowcount"],treegrid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","orientation","readonly","required","rowcount"],tablist:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation"],menu:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],menubar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],tree:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation","required"],treeitem:["checked","disabled","errormessage","expanded","haspopup","invalid","level","posinset","selected","setsize"],radiogroup:["activedescendant","disabled","errormessage","haspopup","invalid","orientation","readonly","required"],group:["activedescendant","disabled","errormessage","haspopup","invalid"],separator:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],toolbar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],dialog:["disabled","errormessage","haspopup","invalid","modal"],alertdialog:["disabled","errormessage","haspopup","invalid","modal"],application:["activedescendant","disabled","errormessage","expanded","haspopup","invalid"],article:["disabled","errormessage","haspopup","invalid","posinset","setsize"],img:["disabled","errormessage","haspopup","invalid"],figure:["disabled","errormessage","haspopup","invalid"],document:["disabled","errormessage","haspopup","invalid"],feed:["disabled","errormessage","haspopup","invalid"],math:["disabled","errormessage","haspopup","invalid"],note:["disabled","errormessage","haspopup","invalid"],presentation:["disabled","errormessage","haspopup","invalid"],none:["disabled","errormessage","haspopup","invalid"],banner:["disabled","errormessage","haspopup","invalid"],complementary:["disabled","errormessage","haspopup","invalid"],contentinfo:["disabled","errormessage","haspopup","invalid"],form:["disabled","errormessage","haspopup","invalid"],main:["disabled","errormessage","haspopup","invalid"],navigation:["disabled","errormessage","haspopup","invalid"],region:["disabled","errormessage","haspopup","invalid"],search:["disabled","errormessage","haspopup","invalid"],alert:["disabled","errormessage","haspopup","invalid"],log:["disabled","errormessage","haspopup","invalid"],marquee:["disabled","errormessage","haspopup","invalid"],status:["disabled","errormessage","haspopup","invalid"],timer:["disabled","errormessage","haspopup","invalid"],tabpanel:["disabled","errormessage","haspopup","invalid"],tooltip:["disabled","errormessage","haspopup","invalid"],definition:["disabled","errormessage","haspopup","invalid"],term:["disabled","errormessage","haspopup","invalid"],paragraph:["disabled","errormessage","haspopup","invalid"],generic:["disabled","errormessage","haspopup","invalid"],blockquote:["disabled","errormessage","haspopup","invalid"],caption:["disabled","errormessage","haspopup","invalid"],code:["disabled","errormessage","haspopup","invalid"],emphasis:["disabled","errormessage","haspopup","invalid"],strong:["disabled","errormessage","haspopup","invalid"],time:["disabled","errormessage","haspopup","invalid"],deletion:["disabled","errormessage","haspopup","invalid"],insertion:["disabled","errormessage","haspopup","invalid"],subscript:["disabled","errormessage","haspopup","invalid"],superscript:["disabled","errormessage","haspopup","invalid"]},Vt={checkbox:"checkbox",radio:"radio",range:"slider",number:"spinbutton",search:"searchbox",email:"textbox",tel:"textbox",text:"textbox",url:"textbox",button:"button",submit:"button",reset:"button",image:"button"},jt=new Set(["text","search","tel","url","email"]),Wt={button:"button",textarea:"textbox",img:"img",article:"article",aside:"complementary",nav:"navigation",main:"main",search:"search",h1:"heading",h2:"heading",h3:"heading",h4:"heading",h5:"heading",h6:"heading",ul:"list",ol:"list",menu:"list",li:"listitem",table:"table",thead:"rowgroup",tbody:"rowgroup",tfoot:"rowgroup",tr:"row",td:"cell",th:"columnheader",form:"form",fieldset:"group",details:"group",dialog:"dialog",hr:"separator",progress:"progressbar",meter:"meter",output:"status",option:"option",datalist:"listbox",dt:"term",dd:"definition",p:"paragraph",div:"generic",span:"generic",blockquote:"blockquote",figure:"figure",time:"time",code:"code",em:"emphasis",strong:"strong"};function Be(e){let r=e.tagName.toLowerCase();if(r==="a"||r==="area")return e.hasAttribute("href")?"link":"generic";if(r==="input")return jt.has(e.type)&&e.hasAttribute("list")?"combobox":Vt[e.type]??null;if(r==="td"||r==="th"){if(r==="th"&&e.getAttribute("scope")?.toLowerCase()==="row")return"rowheader";if(r==="th")return"columnheader";let t=e.closest("table"),c=t&&Ae(t);return c==="grid"||c==="treegrid"?"gridcell":"cell"}if(r==="select")return e.multiple||e.size>1?"listbox":"combobox";if(r==="img")return e.getAttribute("alt")===""?"presentation":"img";if(r==="header")return e.closest("article, aside, main, nav, section")?"generic":"banner";if(r==="footer")return e.closest("article, aside, main, nav, section")?"generic":"contentinfo";if(r==="aside"){let t=e.parentElement?.closest("article, aside, nav, section"),c=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby");return t&&!c?"generic":"complementary"}return r==="section"?e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")?"region":"generic":Wt[r]??null}function Ht(e){return[...Bt].some(r=>e.hasAttribute(`aria-${r}`))?!0:e.matches(":disabled")||ze(e)?!1:e.tabIndex>=0?!0:e.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]')}function Ae(e){let r=e.getAttribute("role")?.trim().split(/\s+/)??[];for(let t of r){let c=t.toLowerCase();if(c==="image")return"img";if(qt[c])return(c==="presentation"||c==="none")&&Ht(e)?Be(e):c}return Be(e)}var Ve=`/* Structure-lens overlay styles (focus order, landmark map): injected by
   lenses.js itself (id pour-lens-styles) so every host \u2014 extension,
   bookmarklet, and the pour.dev homepage demo \u2014 gets them without
   wiring. Literal colors: these paint over arbitrary pages, no tokens.
   Geometry-critical styles live INLINE in lenses.js (page CSS reaches
   injected author styles, never inline \u2014 the t3/moronicowls lessons). */

/* Layer geometry (anchoring, size, z-index) is set inline by the lens
   tracker \u2014 one document-anchored layer rides the scroll, one viewport
   layer holds fixed/sticky targets. */
.pour-focus-order-layer { pointer-events: none; }

/* The connector path styles itself INLINE (with !important) in the lens
   tracker: page-level resets like \`svg { max-width: 100% }\` reach injected
   author styles and zero the document-sized svg, but not inline styles. */

.pour-focus-badge {
  position: absolute;
  top: -9px;
  left: -9px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #1D4ED8;
  color: #fff;
  font: 600 10px/1 system-ui;
  box-shadow: 0 0 0 1.5px #fff, 0 1px 4px rgba(0, 0, 0, 0.4);
}

.pour-focus-badge-forced { background: #B45309; }

/* ---- Landmark & heading map ----------------------------------------------
   Tinted regions with a role tag in the corner; heading chips carry their
   level, amber where the outline skips one. Literal colors: this sheet
   paints over arbitrary pages, no tokens. */
/* Geometry inline from the lens tracker, as with the focus-order layer. */
.pour-map-layer { pointer-events: none; }

.pour-map-region {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border: 1.5px solid;
}

.pour-map-tag {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px 7px;
  border-radius: 0 0 4px 0;
  color: #fff;
  font: 600 10px/1.4 system-ui;
}

.pour-map-role-banner        { border-color: #7C3AED; background: rgba(124, 58, 237, 0.07); }
.pour-map-role-banner        .pour-map-tag { background: #7C3AED; }
.pour-map-role-navigation    { border-color: #1D4ED8; background: rgba(29, 78, 216, 0.07); }
.pour-map-role-navigation    .pour-map-tag { background: #1D4ED8; }
.pour-map-role-main          { border-color: #15803D; background: rgba(21, 128, 61, 0.06); }
.pour-map-role-main          .pour-map-tag { background: #15803D; }
.pour-map-role-complementary { border-color: #0F766E; background: rgba(15, 118, 110, 0.08); }
.pour-map-role-complementary .pour-map-tag { background: #0F766E; }
.pour-map-role-contentinfo   { border-color: #475569; background: rgba(71, 85, 105, 0.08); }
.pour-map-role-contentinfo   .pour-map-tag { background: #475569; }
.pour-map-role-region        { border-color: #C2410C; background: rgba(194, 65, 12, 0.07); }
.pour-map-role-region        .pour-map-tag { background: #C2410C; }
.pour-map-role-search        { border-color: #0E7490; background: rgba(14, 116, 144, 0.08); }
.pour-map-role-search        .pour-map-tag { background: #0E7490; }
.pour-map-role-form          { border-color: #BE185D; background: rgba(190, 24, 93, 0.07); }
.pour-map-role-form          .pour-map-tag { background: #BE185D; }

.pour-map-heading {
  position: absolute;
  top: -8px;
  left: -8px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #1B1D22;
  color: #fff;
  font: 700 10px/1.2 system-ui;
  box-shadow: 0 0 0 1.5px #fff, 0 1px 4px rgba(0, 0, 0, 0.4);
}

.pour-map-heading-skipped { background: #B45309; }

/* A natively-interactive control removed from the tab order: hollow red,
   no number \u2014 it has no position because Tab can't reach it. */
.pour-focus-badge-unreachable {
  background: #fff;
  color: #B3261E;
  box-shadow: 0 0 0 1.5px #B3261E, 0 1px 4px rgba(0, 0, 0, 0.4);
}

/* Empty-state notice for the structure lenses: the lens is on, and there
   is genuinely nothing to draw. */
.pour-lens-notice {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  max-width: min(85vw, 480px);
  padding: 9px 16px;
  border-radius: 999px;
  background: #1B1D22;
  color: #fff;
  font: 500 12.5px/1.4 system-ui;
  text-align: center;
  box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 0.55), 0 8px 24px rgba(0, 0, 0, 0.35);
}
`;function Ee(e){if(e.getElementById("pour-lens-styles"))return;let r=e.createElement("style");r.id="pour-lens-styles",r.dataset.pourAudit="overlay",r.textContent=Ve,e.head.appendChild(r)}function le(e=document){let r=e.defaultView,t={contentVisibilityAuto:!0,visibilityProperty:!0,checkVisibilityCSS:!0};function c(d){for(let g=d;g&&g!==e.documentElement;g=g.parentElement??g.getRootNode()?.host??null){let h=g.ownerDocument.defaultView.getComputedStyle(g).position;if(h==="fixed")return"fixed";if(h==="sticky")return"sticky"}return"flow"}function f(d,{withLine:g=!1}={}){let h="background:none;border:0;margin:0;padding:0;box-shadow:none;filter:none;opacity:1;mix-blend-mode:normal;",m=e.createElement("div");m.className=d,m.dataset.pourAudit="overlay",m.style.cssText=`position:absolute;top:0;left:0;width:0;height:0;overflow:clip;overflow-clip-margin:24px;pointer-events:none;z-index:2147483646;${h}`;let b=e.createElement("div");b.className=d,b.dataset.pourAudit="overlay",b.style.cssText=`position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:2147483646;${h}`;let A=0,x=0,L=null,R=null,P=null;if(g){R=e.createElementNS("http://www.w3.org/2000/svg","svg"),R.setAttribute("class",`${d.replace(/-layer$/,"")}-path`);for(let[s,k]of[["position","absolute"],["top","0"],["left","0"],["width","100%"],["height","100%"],["max-width","none"],["max-height","none"],["display","block"],["overflow","visible"],["pointer-events","none"],["background","none"],["border","0"],["margin","0"],["padding","0"],["box-shadow","none"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])R.style.setProperty(s,k,"important");P=e.createElementNS("http://www.w3.org/2000/svg","polyline"),L=e.createElementNS("http://www.w3.org/2000/svg","polyline");for(let[s,k,p]of[[P,"rgba(29,78,216,0.85)","3"],[L,"#93C5FD","1.5"]])for(let[M,B]of[["fill","none"],["stroke",k],["stroke-width",p],["stroke-linejoin","round"],["stroke-linecap","round"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])s.style.setProperty(M,B,"important");R.append(P,L),m.append(R)}let N=[],E=null,D=0,S=(s,k)=>{let p=s.el.getBoundingClientRect(),M=p.width<=0&&p.height<=0||!s.el.isConnected||s.el.checkVisibility&&!s.el.checkVisibility(t);if(s.node.style.display=M?"none":"",M){s.docPt=null,s.viewRect=null;return}let B=s.anchor==="flow"?p.left-k.left:p.left,W=s.anchor==="flow"?p.top-k.top:p.top;if(s.node.style.transform=`translate(${B}px, ${W}px)`,s.sized)s.node.style.width=`${p.width}px`,s.node.style.height=`${p.height}px`;else{let z=s.node.getBoundingClientRect(),_=s.anchor==="flow"?{left:k.left,top:k.top,right:k.left+A,bottom:k.top+x}:{left:0,top:0,right:r.innerWidth,bottom:r.innerHeight},q=z.left<_.left?_.left-z.left:z.right>_.right?_.right-z.right:0,G=z.top<_.top?_.top-z.top:z.bottom>_.bottom?_.bottom-z.bottom:0;(q||G)&&(s.node.style.transform=`translate(${B+q}px, ${W+G}px)`)}s.anchor==="flow"?s.docPt=`${B},${W}`:s.viewRect=p},y=s=>{if(!L)return;let k=[];for(let M of N)M.offLine||M.node.style.display==="none"||(M.anchor==="flow"?M.docPt&&k.push(M.docPt):M.viewRect&&k.push(`${M.viewRect.left-s.left},${M.viewRect.top-s.top}`));let p=k.join(" ");P.setAttribute("points",p),L.setAttribute("points",p)},i=()=>{let s=e.documentElement.scrollWidth,k=e.documentElement.scrollHeight;s!==A&&(A=s,m.style.width=`${s}px`),k!==x&&(x=k,m.style.height=`${k}px`);let p=m.getBoundingClientRect();for(let M of N)S(M,p);y(p)};e.body.append(m,b);let a=()=>{D=r.requestAnimationFrame(a),i()};return a(),{setItems(s,k){for(let p of N)p.node.remove();N=s.map(p=>{let M=c(p.el);return(M==="flow"?m:b).append(p.node),{...p,anchor:M,docPt:null,viewRect:null}}),k&&!N.length?(E||(E=e.createElement("div"),E.className="pour-lens-notice",b.append(E)),E.textContent=k,E.style.display=""):E&&(E.style.display="none"),i()},destroy(){r.cancelAnimationFrame(D),m.remove(),b.remove(),N=[]}}}function o(d,g){for(let h=d.parentElement??d.getRootNode()?.host;h&&h!==e.documentElement;h=h.parentElement??h.getRootNode()?.host){let m=h.ownerDocument.defaultView.getComputedStyle(h);if(m.overflow==="visible"&&m.overflowX==="visible"&&m.overflowY==="visible")continue;let b=h.getBoundingClientRect();if(g.right<=b.left||g.left>=b.right||g.bottom<=b.top||g.top>=b.bottom)return!0}return!1}function n(){let d=[],g=[],h=m=>{for(let b of m.querySelectorAll("*")){if(b.dataset&&b.dataset.pourAudit||(b.shadowRoot&&h(b.shadowRoot),!b.matches('a[href], area[href], button, input, select, textarea, summary, iframe, object, embed, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]'))||b.disabled||b.closest("[inert]")||b.checkVisibility&&!b.checkVisibility(t))continue;let A=b.getBoundingClientRect();if(A.width<=0&&A.height<=0)continue;let x=b.getAttribute("tabindex"),L=x==null?0:parseInt(x,10)||0;if(L<0){b.matches("a[href], area[href], button, input, select, textarea, summary")&&!o(b,A)&&g.push({el:b});continue}d.push({el:b,idx:L,order:d.length})}};return h(e),{stops:[...d.filter(m=>m.idx>0).sort((m,b)=>m.idx-b.idx||m.order-b.order),...d.filter(m=>m.idx===0)],unreachable:g}}return{createLensTracker:f,collectFocusStops:n,clippedOutOfSight:o,VISIBLE_OPTS:t,anchorKind:c}}function je(e=document,r=le(e)){let t=e.defaultView,{createLensTracker:c,collectFocusStops:f,VISIBLE_OPTS:o}=r,n=null,d=0,g=null;function h(){if(n)return;Ee(e),n=c("pour-focus-order-layer",{withLine:!0});let E=()=>{let{stops:D,unreachable:S}=f(),y=D.map((i,a)=>{let s=e.createElement("span");return s.className="pour-focus-badge"+(i.idx>0?" pour-focus-badge-forced":""),s.textContent=String(a+1),i.idx>0&&(s.title=`tabindex="${i.idx}" forces this position`),{el:i.el,node:s,sized:!1}});for(let{el:i}of S){let a=e.createElement("span");a.className="pour-focus-badge pour-focus-badge-unreachable",a.textContent="\u2715",a.title='tabindex="-1" \u2014 a keyboard cannot Tab to this control',y.push({el:i,node:a,sized:!1,offLine:!0})}n.setItems(y,"Focus order: this page has no keyboard-reachable controls")};E(),g=new t.MutationObserver(()=>{d||(d=t.setTimeout(()=>{d=0,E()},400))}),g.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function m(){t.clearTimeout(d),d=0,g?.disconnect(),g=null,n?.destroy(),n=null}let b=null,A=0,x=null;function L(E){let D=E.getAttribute("aria-label");if(D?.trim())return D.trim();let S=E.getAttribute("aria-labelledby");return S?S.split(/\s+/).map(y=>E.getRootNode().getElementById?.(y)?.textContent.trim()??"").filter(Boolean).join(" "):""}function R(){let E=[],D=[],S=i=>{for(let a of i.querySelectorAll("*")){if(a.dataset&&a.dataset.pourAudit||(a.shadowRoot&&S(a.shadowRoot),a.checkVisibility&&!a.checkVisibility(o)))continue;let s=a.getBoundingClientRect();if(s.width<=0&&s.height<=0)continue;let k=Ae(a);if(qe.has(k)){if(k==="form"&&!L(a))continue;E.push({el:a,role:k,name:L(a)})}else if(k==="heading"){let p=parseInt(a.getAttribute("aria-level"),10)||parseInt(a.tagName.charAt(1),10)||2;D.push({el:a,level:p})}}};S(e);let y=null;for(let i of D)i.skipped=y!=null&&i.level>y+1,i.from=y,y=i.level;return{landmarks:E,headings:D}}function P(){if(b)return;Ee(e),b=c("pour-map-layer");let E=()=>{let{landmarks:D,headings:S}=R(),y=[];for(let i of D){let a=e.createElement("div");a.className=`pour-map-region pour-map-role-${i.role}`;let s=e.createElement("span");s.className="pour-map-tag",s.textContent=i.name?`${i.role} \xB7 ${i.name}`:i.role,a.append(s),y.push({el:i.el,node:a,sized:!0})}for(let i of S){let a=e.createElement("span");a.className="pour-map-heading"+(i.skipped?" pour-map-heading-skipped":""),a.textContent=`H${i.level}`,i.skipped&&(a.title=`Skips a level \u2014 the heading before this one is an H${i.from}`),y.push({el:i.el,node:a,sized:!1})}b.setItems(y,"No landmarks or headings are exposed on this page")};E(),x=new t.MutationObserver(()=>{A||(A=t.setTimeout(()=>{A=0,E()},400))}),x.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function N(){t.clearTimeout(A),A=0,x?.disconnect(),x=null,b?.destroy(),b=null}return{focusOrder:{apply:h,remove:m},landmarkMap:{apply:P,remove:N}}}var oe="#262626";function Gt(e){let r=e>>>0;return()=>{r=r+1831565813>>>0;let t=r;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}var J=(e,r,t)=>r+(t-r)*e(),X=e=>Number(e.toFixed(1));function He(e,{start:r,steps:t,stride:c,wiggle:f,heading:o}){let n=[r],d=o;for(let g=0;g<t;g++){d+=J(e,-f,f);let h=n[n.length-1];n.push([h[0]+Math.cos(d)*c,h[1]+Math.sin(d)*c])}return n}function _e(e){let r=[];for(let t=0;t<e.length-1;t++){let c=e[Math.max(0,t-1)],f=e[t],o=e[t+1],n=e[Math.min(e.length-1,t+2)],d=[f[0]+(o[0]-c[0])/6,f[1]+(o[1]-c[1])/6],g=[o[0]-(n[0]-f[0])/6,o[1]-(n[1]-f[1])/6];r.push(`M${X(f[0])} ${X(f[1])}C${X(d[0])} ${X(d[1])} ${X(g[0])} ${X(g[1])} ${X(o[0])} ${X(o[1])}`)}return r}function Te(e,r){let{width:t=2.6,dark:c=.6}=r,f=t,o=c;return _e(He(e,r)).map(n=>(f=Math.max(t*.45,Math.min(t*1.9,f+J(e,-.7,.7))),o=Math.max(c*.55,Math.min(c*1.35,o+J(e,-.12,.12))),`<path d="${n}" stroke-width="${X(f)}" stroke-opacity="${o.toFixed(2)}"/>`)).join("")}function Yt(e,r){let t=He(e,r),c=_e(t).map(o=>`<path d="${o}" stroke-width="1.1" stroke-opacity=".45"/>`).join(""),f=t.filter((o,n)=>n%2===0).map(([o,n])=>`<circle cx="${X(o)}" cy="${X(n)}" r="${J(e,1.6,3.4).toFixed(1)}" fill="${oe}" stroke="none" opacity="${J(e,.45,.75).toFixed(2)}"/>`).join("");return c+f}function Xt(e,r){let t="";for(let c=0;c<4;c++){let f=J(e,0,Math.PI*2);t+=Te(e,{start:[r[0]+J(e,-18,18),r[1]+J(e,-18,18)],steps:9,stride:13,wiggle:.9,heading:f,width:2.2,dark:.55})}return t}function Kt(e,r,t){let c=J(e,40,110),f=2*Math.PI*t;return`<circle cx="${r[0]}" cy="${r[1]}" r="${t}" stroke-width="${J(e,5,7).toFixed(1)}" stroke-opacity=".55" stroke-dasharray="${X(f-c)} ${X(c)}" transform="rotate(${X(J(e,0,360))} ${r[0]} ${r[1]})"/><circle cx="${r[0]}" cy="${r[1]}" r="${t}" stroke-width="2" stroke-opacity=".3"/><circle cx="${X(r[0]+t*1.4)}" cy="${X(r[1]-t*.6)}" r="3" fill="${oe}" stroke="none" opacity=".5"/>`}function Ut(e,r,t){return`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${r}" ry="${t}" fill="url(#cloud)" stroke="none" transform="rotate(-20 ${e[0]} ${e[1]})"/>`}function Jt(e,r){let t="";for(let c=0;c<8;c++)t+=`<circle cx="${X(r[0]+J(e,-40,40))}" cy="${X(r[1]+J(e,-30,30))}" r="${J(e,1.2,3.2).toFixed(1)}" fill="${oe}" stroke="none" opacity="${J(e,.4,.7).toFixed(2)}"/>`;return t}var Zt=(e,r)=>`url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><filter id="b" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="${r}"/></filter><radialGradient id="cloud"><stop offset="0" stop-color="${oe}" stop-opacity=".38"/><stop offset=".55" stop-color="${oe}" stop-opacity=".14"/><stop offset="1" stop-color="${oe}" stop-opacity="0"/></radialGradient></defs><g filter="url(#b)" fill="none" stroke="${oe}" stroke-linecap="round" stroke-linejoin="round">${e}</g></svg>`)}")`;function Qt(){let e=Gt(20260912);return[{depth:.95,size:.5,start:[.24,.3],art:Xt(e,[100,100])},{depth:.8,size:.44,start:[.66,.24],art:Te(e,{start:[20,150],steps:12,stride:15,wiggle:.7,heading:-.9,width:3,dark:.62})},{depth:.65,size:.3,start:[.5,.62],art:Kt(e,[100,100],17)},{depth:.55,size:.36,start:[.8,.6],art:Yt(e,{start:[30,70],steps:10,stride:14,wiggle:.8,heading:.4})},{depth:.4,size:.42,start:[.36,.8],art:Ut([100,100],62,34)},{depth:.3,size:.26,start:[.14,.58],art:Jt(e,[100,100])},{depth:.15,size:.3,start:[.58,.85],art:Te(e,{start:[40,40],steps:11,stride:12,wiggle:.85,heading:.6,width:2,dark:.5})}]}var er=.55,tr=.4,We=1,fe=520,rr=2.2;function Ge(e,r){let t=e.defaultView,c=t.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,f={mixBlendMode:r.style.mixBlendMode,overflow:r.style.overflow};r.style.mixBlendMode="multiply",r.style.overflow="hidden";let o=()=>Math.max(180,Math.min(460,.32*Math.min(t.innerWidth,t.innerHeight))),n=Qt().map((S,y)=>{let i=e.createElement("div");i.className="pour-floater",i.setAttribute("aria-hidden","true"),i.dataset.pourAudit="filter";let a=(.8+S.depth*1.6).toFixed(2);return Object.assign(i.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",backgroundImage:Zt(S.art,a),backgroundSize:"contain",backgroundRepeat:"no-repeat",opacity:(.95-S.depth*.2).toFixed(2),willChange:"transform"}),r.appendChild(i),{el:i,shape:S,phase:y*1.7,size:0,x:S.start[0]*t.innerWidth,y:S.start[1]*t.innerHeight,vx:0,vy:0,angle:y*47%360,spin:0}}),d=()=>{let S=o();for(let y of n)y.size=S*y.shape.size,y.el.style.width=`${y.size}px`,y.el.style.height=`${y.size}px`},g=(S=0)=>{for(let y of n){let i=1+.03*Math.sin(S*.8+y.phase),a=2.5*Math.sin(S*.5+y.phase*.7);y.el.style.transform=`translate3d(${(y.x-y.size/2).toFixed(1)}px, ${(y.y-y.size/2).toFixed(1)}px, 0) rotate(${y.angle.toFixed(1)}deg) skewX(${a.toFixed(2)}deg) scale(${i.toFixed(3)})`}};d(),g();let h=0,m=0,b=t.scrollY,A=null,x=(S,y)=>{for(let i of n){let a=.45+.9*i.shape.depth;i.vx=Math.max(-fe,Math.min(fe,i.vx+S*a)),i.vy=Math.max(-fe,Math.min(fe,i.vy+y*a)),i.spin+=(S-y)*.02*a}},L=()=>{let S=t.scrollY-b;b=t.scrollY,S&&x(0,S*tr)},R=(S,y)=>{A&&x((S-A.x)*We,(y-A.y)*We),A={x:S,y}},P=S=>{S.pointerType!=="touch"&&R(S.clientX,S.clientY)},N=S=>{let y=S.touches[0];y&&R(y.clientX,y.clientY)},E=()=>{d(),g()},D=S=>{h=t.requestAnimationFrame(D);let y=m?Math.min(.05,(S-m)/1e3):0;if(m=S,!y)return;let i=S/1e3,a=Math.exp(-y/er),s=t.innerWidth,k=t.innerHeight;for(let p of n){p.vx+=Math.sin(i*.61+p.phase)*16*y,p.vy+=(Math.cos(i*.47+p.phase*1.3)*12+rr*(.5+p.shape.depth))*y,p.vx*=a,p.vy*=a,p.spin*=a,p.x+=p.vx*y,p.y+=p.vy*y,p.angle+=(p.spin+Math.sin(i*.3+p.phase)*2)*y;let M=p.size*.25;p.x<M&&(p.vx=Math.abs(p.vx)+8),p.x>s-M&&(p.vx=-Math.abs(p.vx)-8),p.y<M&&(p.vy=Math.abs(p.vy)+8),p.y>k-M*1.6&&(p.vy=-Math.abs(p.vy)*.6-4)}g(i)};return t.addEventListener("resize",E),c||(t.addEventListener("scroll",L,{passive:!0}),e.addEventListener("pointermove",P,{passive:!0}),e.addEventListener("touchmove",N,{passive:!0}),h=t.requestAnimationFrame(D)),{stop(){h&&t.cancelAnimationFrame(h),h=0,t.removeEventListener("resize",E),t.removeEventListener("scroll",L),e.removeEventListener("pointermove",P),e.removeEventListener("touchmove",N);for(let S of n)S.el.remove();r.style.mixBlendMode=f.mixBlendMode,r.style.overflow=f.overflow}}}var Ye=["#ffffff","#1c1c1c","#fff1a3","#ffffff","#c6ecff","#1c1c1c","#ffd9d9","#ffffff","#e9ffd9","#1c1c1c"],Xe=Math.PI*2,te=e=>e.toFixed(1);function Ke(e,r){let t=e.defaultView,c=t.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,f=e.createElement("div");f.setAttribute("aria-hidden","true"),f.dataset.pourAudit="filter",f.dataset.pourAura="scotoma",Object.assign(f.style,{position:"absolute",inset:"0",pointerEvents:"none",backdropFilter:"blur(9px) contrast(0.8) brightness(1.08)",webkitBackdropFilter:"blur(9px) contrast(0.8) brightness(1.08)",background:"rgba(236,236,236,0.28)"}),r.appendChild(f);let o=e.createElement("canvas");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourAura="canvas",Object.assign(o.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none"}),r.appendChild(o);let n=o.getContext("2d"),d=0,g=0,h={x:t.innerWidth/2,y:t.innerHeight/2},m={x:h.x,y:h.y},b=0,A=0,x=0,L=()=>{d=t.innerWidth,g=t.innerHeight;let a=Math.min(2,t.devicePixelRatio||1);o.width=Math.round(d*a),o.height=Math.round(g*a),n.setTransform(a,0,0,a,0,0)},R=(a,s)=>{let k=p=>`M ${te(m.x+p)} ${te(m.y)} A ${te(p)} ${te(p)} 0 1 0 ${te(m.x-p)} ${te(m.y)} A ${te(p)} ${te(p)} 0 1 0 ${te(m.x+p)} ${te(m.y)} Z`;return`path(evenodd, '${k(s)} ${k(a)}')`},P=(a,s,k,p,M,B)=>{if(a<=s)return;let W=Math.max(12,Math.round(a*Xe/(s*1.05)));W%2&&(W+=1);let z=[];for(let q=0;q<W;q++){let G=Xe*q/W,ee=.72+.28*Math.sin(3*G+B*.35)*Math.cos(5*G-B*.2),l=a+(q%2?s:-s)*ee;z.push([m.x+Math.cos(G)*l,m.y+Math.sin(G)*l])}z.push(z[0]);let _=1.1+s*.07;n.save(),n.lineJoin="miter",n.lineCap="round",n.globalAlpha=k*M*.5,n.strokeStyle="rgba(255,255,255,0.7)",n.lineWidth=_*2.6,n.beginPath(),n.moveTo(z[0][0],z[0][1]);for(let q=1;q<z.length;q++)n.lineTo(z[q][0],z[q][1]);n.stroke(),n.globalAlpha=k*M,n.lineWidth=_;for(let q=0;q<W;q++)n.strokeStyle=Ye[(q+p)%Ye.length],n.beginPath(),n.moveTo(z[q][0],z[q][1]),n.lineTo(z[q+1][0],z[q+1][1]),n.stroke();n.restore()},N=(a,s)=>{n.clearRect(0,0,d,g);let p=10+(.34*Math.min(d,g)-10)*(1-Math.exp(-a/9))*(1+.02*Math.sin(a*.7)),M=3+p*.06,B=Math.min(1,a/2);f.style.opacity=B.toFixed(2),f.style.clipPath=R(p*.5,p+M*.4),P(p,M,1,s,B,a),P(p-M*1.9,M*.7,.6,s+4,B,a),P(p-M*3.6,M*.45,.3,s+7,B,a)},E=a=>{x=t.requestAnimationFrame(E);let s=A?Math.min(.05,(a-A)/1e3):0;A=a,b||(b=a),m.x+=(h.x-m.x)*Math.min(1,s*14),m.y+=(h.y-m.y)*Math.min(1,s*14);let k=(a-b)/1e3;N(k,Math.floor(k*2.5))},D=()=>{m.x=h.x,m.y=h.y,N(45,0)},S=a=>{a.pointerType!=="touch"&&(h.x=a.clientX,h.y=a.clientY,c&&D())},y=a=>{let s=a.touches[0];s&&(h.x=s.clientX,h.y=s.clientY,c&&D())},i=()=>{L(),c&&D()};return L(),t.addEventListener("resize",i),e.addEventListener("pointermove",S,{passive:!0}),e.addEventListener("touchmove",y,{passive:!0}),c?D():x=t.requestAnimationFrame(E),{stop(){x&&t.cancelAnimationFrame(x),x=0,t.removeEventListener("resize",i),e.removeEventListener("pointermove",S),e.removeEventListener("touchmove",y),o.remove(),f.remove()}}}function Ue(e,r){let t=e.defaultView,c=t.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,f={mixBlendMode:r.style.mixBlendMode,overflow:r.style.overflow};r.style.mixBlendMode="screen",r.style.overflow="hidden";let o=e.createElement("div");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourReflection="room",Object.assign(o.style,{position:"absolute",inset:"-20%",pointerEvents:"none",background:"radial-gradient(ellipse 30% 38% at 74% 16%, rgba(255,249,236,0.4), rgba(255,249,236,0.13) 42%, rgba(255,249,236,0) 72%), radial-gradient(ellipse 55% 26% at 18% 92%, rgba(255,255,255,0.1), rgba(255,255,255,0) 70%)",willChange:"transform"}),r.appendChild(o);let n=e.createElement("video");n.setAttribute("aria-hidden","true"),n.dataset.pourAudit="filter",n.dataset.pourReflection="camera",n.muted=!0,n.playsInline=!0,n.autoplay=!0,Object.assign(n.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"cover",transform:"scaleX(-1)",opacity:String(.2),filter:"blur(0.9px) contrast(1.05)",pointerEvents:"none"}),r.appendChild(n);let d=null,g=0,h=R=>{d=e.createElement("div"),d.dataset.pourAudit="filter",d.dataset.pourReflection="note",d.setAttribute("role","status"),d.textContent=R,Object.assign(d.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(420px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(d),g=t.setTimeout(()=>{d?.remove(),d=null},7e3)},m=null,b=!1,A=t.navigator?.mediaDevices;A?.getUserMedia?A.getUserMedia({video:{facingMode:"user",width:{ideal:1280},height:{ideal:720}},audio:!1}).then(R=>{if(b){for(let P of R.getTracks())P.stop();return}m=R,n.srcObject=R,n.play().catch(()=>{})}).catch(()=>{b||h("Camera not available here, so the room light is shown without your reflection.")}):h("This page cannot use the camera (it needs a secure page), so the room light is shown without your reflection.");let x=0,L=R=>{x=t.requestAnimationFrame(L);let P=R/1e3;o.style.transform=`translate3d(${(Math.sin(P*.11)*14).toFixed(1)}px, ${(Math.cos(P*.083)*9).toFixed(1)}px, 0)`};return c||(x=t.requestAnimationFrame(L)),{stop(){if(b=!0,x&&t.cancelAnimationFrame(x),x=0,g&&t.clearTimeout(g),d?.remove(),d=null,m)for(let R of m.getTracks())R.stop();m=null,n.srcObject=null,n.remove(),o.remove(),r.style.mixBlendMode=f.mixBlendMode,r.style.overflow=f.overflow}}}var Je={aquatic:{scheme:"dark",canvas:"#202020",canvasText:"#FFFFFF",linkText:"#75E9FC",grayText:"#A6A6A6",highlight:"#8EE3F0",highlightText:"#263B50",buttonFace:"#202020",buttonText:"#FFFFFF"}},H=":not([data-pour-audit]):not([data-pour-audit] *):not([data-pour-fc-keep])",Ze=["data-pour-fc-bg","data-pour-fc-bgimg","data-pour-fc-before","data-pour-fc-after","data-pour-fc-keep"],ar='script, style, noscript, template, textarea, option, select, title, svg, math, [data-pour-audit], [contenteditable]:not([contenteditable="false"])',et='button, input[type="button"], input[type="submit"], input[type="reset"]',tt="input, textarea, select";function nr(e){return`
html${H} { background-color: ${e.canvas} !important; color: ${e.canvasText} !important; color-scheme: ${e.scheme} !important; }
*${H}, *${H}::before, *${H}::after {
  color: inherit !important;
  -webkit-text-fill-color: currentcolor !important;
  border-color: ${e.canvasText} !important;
  outline-color: ${e.canvasText} !important;
  text-decoration-color: currentcolor !important;
  column-rule-color: ${e.canvasText} !important;
  caret-color: ${e.canvasText} !important;
  box-shadow: none !important;
  text-shadow: none !important;
  -webkit-tap-highlight-color: transparent !important;
}
a${H}[href] { color: ${e.linkText} !important; }
${et.split(", ").map(r=>`${r}${H}`).join(", ")} { color: ${e.buttonText} !important; }
${tt.split(", ").map(r=>`${r}${H}`).join(", ")} { color: ${e.canvasText} !important; }
[data-pour-fc-bg="canvas"]${H} { background-color: ${e.canvas} !important; }
[data-pour-fc-bg="button"]${H} { background-color: ${e.buttonFace} !important; }
[data-pour-fc-bg="field"]${H} { background-color: ${e.canvas} !important; }
[data-pour-fc-bg="highlight"]${H} { background-color: ${e.highlight} !important; color: ${e.highlightText} !important; }
[data-pour-fc-plate]${H} { background-color: ${e.canvas} !important; box-shadow: 0 0 0 2px ${e.canvas} !important; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
[data-pour-fc-bg="highlight"] [data-pour-fc-plate]${H} { background-color: ${e.highlight} !important; box-shadow: 0 0 0 2px ${e.highlight} !important; }
[data-pour-fc-bg="button"] [data-pour-fc-plate]${H} { background-color: ${e.buttonFace} !important; box-shadow: 0 0 0 2px ${e.buttonFace} !important; }
[data-pour-fc-bgimg]${H} { background-image: none !important; }
[data-pour-fc-before]${H}::before { background-color: ${e.canvas} !important; background-image: none !important; }
[data-pour-fc-after]${H}::after { background-color: ${e.canvas} !important; background-image: none !important; }
*${H}:disabled, *${H}[aria-disabled="true"], *${H}:disabled *, *${H}[aria-disabled="true"] * { color: ${e.grayText} !important; border-color: ${e.grayText} !important; }
*${H}::placeholder { color: ${e.grayText} !important; }
*${H}::selection, *${H}::-moz-selection { background-color: ${e.highlight} !important; color: ${e.highlightText} !important; }
`}function Qe(e){if(!e||e==="transparent")return 0;let r=/^rgba?\(\s*[\d.]+\s*,?\s*[\d.]+\s*,?\s*[\d.]+\s*(?:[,/]\s*([\d.]+%?))?\s*\)$/i.exec(e);return!r||r[1]===void 0?1:r[1].endsWith("%")?parseFloat(r[1])/100:parseFloat(r[1])}function rt(e,{theme:r="aquatic"}={}){let t=e.defaultView,c=Je[r]||Je.aquatic,f=!1,o=e.createElement("style");o.id="pour-forced-colours-page",o.dataset.pourAudit="filter";let n=e.createElement("style");n.id="pour-forced-colours",n.dataset.pourAudit="filter",n.textContent=nr(c),e.head.appendChild(o),e.head.appendChild(n);let d=i=>i.closest("[data-pour-audit]"),g=i=>{if(i.namespaceURI!=="http://www.w3.org/1999/xhtml"||d(i)||i.hasAttribute("data-pour-fc-plate"))return;let a=t.getComputedStyle(i);if(a.forcedColorAdjust==="none"){i.setAttribute("data-pour-fc-keep","");return}i.matches("mark")?i.setAttribute("data-pour-fc-bg","highlight"):Qe(a.backgroundColor)>0?i.setAttribute("data-pour-fc-bg",i.matches(et)?"button":i.matches(tt)?"field":"canvas"):i.removeAttribute("data-pour-fc-bg"),a.backgroundImage.includes("gradient(")?i.setAttribute("data-pour-fc-bgimg",""):i.removeAttribute("data-pour-fc-bgimg");for(let[s,k]of[["::before","data-pour-fc-before"],["::after","data-pour-fc-after"]]){let p=t.getComputedStyle(i,s);p.content!=="none"&&p.content!=="normal"&&(Qe(p.backgroundColor)>0||p.backgroundImage.includes("gradient("))?i.setAttribute(k,""):i.removeAttribute(k)}},h=i=>{if(i.nodeType!==1||i.namespaceURI!=="http://www.w3.org/1999/xhtml")return;let a=e.createTreeWalker(i,t.NodeFilter.SHOW_TEXT),s=[];for(;a.nextNode();)s.push(a.currentNode);for(let k of s){if(!k.textContent.trim())continue;let p=k.parentElement;if(!p||p.namespaceURI!=="http://www.w3.org/1999/xhtml"||p.hasAttribute("data-pour-fc-plate")||p.closest(ar))continue;let M=e.createElement("span");M.setAttribute("data-pour-fc-plate",""),p.replaceChild(M,k),M.appendChild(k)}},m=()=>{let i=e.querySelectorAll("[data-pour-fc-plate]");for(let a of i)a.replaceWith(...a.childNodes);i.length&&e.body.normalize()},b=i=>{if(i.nodeType===1){g(i);for(let a of i.querySelectorAll("*"))g(a);h(i)}},A=new Set,x=0,L=()=>{x=0;let i=[...A];A.clear();for(let a of i)a.isConnected&&b(a)},R=new t.MutationObserver(i=>{for(let a of i)if(a.type==="childList")for(let s of a.addedNodes)s.nodeType===1&&!s.hasAttribute("data-pour-fc-plate")&&A.add(s);else a.target.nodeType===1&&A.add(a.target);A.size&&!x&&(x=t.requestAnimationFrame(L))});b(e.body),R.observe(e.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class","style","disabled","aria-disabled","open","hidden"]});let P=/forced-colors\s*:\s*active|-ms-high-contrast\s*:\s*active/i,N=[],E=[],D=(i,a)=>{for(let s of i){let k=s.conditionText??s.media?.mediaText??"";if(s.media!==void 0&&s.cssRules!==void 0&&!a&&P.test(k)){D(s.cssRules,!0);continue}if(s.styleSheet){try{D(s.styleSheet.cssRules,a)}catch{}continue}if(a){N.push(s.cssText),s.style&&s.selectorText&&s.style.getPropertyValue("forced-color-adjust").trim()==="none"&&E.push(s.selectorText);continue}s.cssRules&&D(s.cssRules,!1)}},S=()=>{if(!f){o.textContent=N.join(`
`);for(let i of E){let a=[];try{a=e.querySelectorAll(i)}catch{continue}for(let s of a)d(s)||s.setAttribute("data-pour-fc-keep","")}}},y=[];for(let i of e.styleSheets)if(!i.ownerNode?.dataset?.pourAudit)try{D(i.cssRules,!1)}catch{if(!i.href||typeof t.CSSStyleSheet!="function")continue;y.push(t.fetch(i.href,{mode:"cors"}).then(a=>a.ok?a.text():"").then(a=>{if(!a||f)return;let s=new t.CSSStyleSheet;s.replaceSync(a),D(s.cssRules,!1)}).catch(()=>{}))}return S(),y.length&&Promise.all(y).then(S),{stop(){f=!0,R.disconnect(),x&&t.cancelAnimationFrame(x),x=0,A.clear(),m(),n.remove(),o.remove();for(let i of e.querySelectorAll(Ze.map(a=>`[${a}]`).join(",")))for(let a of Ze)i.removeAttribute(a)}}}var Me="http://www.w3.org/2000/svg",at="pour-lens-filter";function or(e,{radius:r,ring:t,scale:c,magnify:f}){let o=r+t,n=(o+2)*2,d=n/2,g=e.createElement("canvas");g.width=n,g.height=n;let h=g.getContext("2d"),m=h.createImageData(n,n),b=m.data,A=r/f;for(let x=0;x<n;x++)for(let L=0;L<n;L++){let R=L+.5-d,P=x+.5-d,N=Math.hypot(R,P),E=N;if(N<r)E=N/f;else if(N<o){let a=(N-r)/t,s=a*a*(3-2*a);E=A+(o-A)*s}let D=N>0?E/N-1:0,S=D*R,y=D*P,i=(x*n+L)*4;b[i]=Math.max(0,Math.min(255,Math.round(127.5+S/c*255))),b[i+1]=Math.max(0,Math.min(255,Math.round(127.5+y/c*255))),b[i+2]=0,b[i+3]=Math.round(255*Math.max(0,Math.min(1,(o+2-N)/2)))}return h.putImageData(m,0,0),{href:g.toDataURL("image/png"),size:n}}function nt(e,{scale:r=2,radius:t=110,ring:c=60,point:f,target:o}){let n=e.defaultView,d=o||e.documentElement,g=Math.ceil(2*t*(1-1/r)*1.05),h=or(e,{radius:t,ring:c,scale:g,magnify:r}),m=e.createElementNS(Me,"svg");m.setAttribute("width","0"),m.setAttribute("height","0"),m.setAttribute("aria-hidden","true"),m.setAttribute("focusable","false"),m.dataset.pourAudit="filter",m.dataset.pourLens="defs",Object.assign(m.style,{position:"absolute",pointerEvents:"none"});let b=e.createElementNS(Me,"filter");b.setAttribute("id",at),b.setAttribute("filterUnits","userSpaceOnUse"),b.setAttribute("primitiveUnits","userSpaceOnUse"),b.setAttribute("x","0"),b.setAttribute("y","0"),b.setAttribute("width","100%"),b.setAttribute("height","100%"),b.setAttribute("color-interpolation-filters","sRGB");let A=(s,k)=>{let p=e.createElementNS(Me,s);for(let[M,B]of Object.entries(k))p.setAttribute(M,String(B));return p},x={width:h.size,height:h.size},L=A("feImage",{href:h.href,preserveAspectRatio:"none",result:"map",...x}),R=A("feDisplacementMap",{in:"SourceGraphic",in2:"map",scale:g,xChannelSelector:"R",yChannelSelector:"G",result:"lens",...x}),P=A("feComposite",{in:"lens",in2:"map",operator:"in",result:"cut",...x}),N=A("feComposite",{in:"SourceGraphic",in2:"map",operator:"out",result:"rest"}),E=A("feComposite",{in:"cut",in2:"rest",operator:"over"}),D=[L,R,P];for(let s of[L,R,P,N,E])b.appendChild(s);m.appendChild(b),e.body.appendChild(m);let S=d.style.filter;d.style.filter=`url(#${at})`;let y="",i=0,a=()=>{i=n.requestAnimationFrame(a);let s=f(),k=d.getBoundingClientRect(),p=Math.round(s.x-k.left-h.size/2),M=Math.round(s.y-k.top-h.size/2),B=`${p},${M}`;if(B!==y){y=B;for(let W of D)W.setAttribute("x",String(p)),W.setAttribute("y",String(M))}};return i=n.requestAnimationFrame(a),{stop(){i&&n.cancelAnimationFrame(i),i=0,d.style.filter=S,m.remove()}}}var ir=["a[href]","button",'input:not([type="hidden"])',"select","textarea","summary",'[role="button"]','[role="link"]','[role="checkbox"]','[role="radio"]','[role="switch"]','[role="tab"]','[role="menuitem"]','[role="option"]'].join(", "),sr=61,lr=1400;function cr(e,r){let t=Math.PI*(3-Math.sqrt(5));return Array.from({length:e},(c,f)=>{let o=r*Math.sqrt((f+.5)/e);return[Math.cos(f*t)*o,Math.sin(f*t)*o]})}function ot(e,{diameter:r=38}={}){let t=e.defaultView,c=e.documentElement,f=r/2,o=cr(sr,f),d=Math.ceil(r+3*2),g=e.createElement("canvas");g.width=d,g.height=d;let h=g.getContext("2d"),m=d/2;h&&(h.beginPath(),h.arc(m,m,f,0,Math.PI*2),h.fillStyle="rgba(17, 17, 17, 0.16)",h.fill(),h.lineWidth=2.5,h.strokeStyle="rgba(255, 255, 255, 0.9)",h.stroke(),h.lineWidth=1.25,h.strokeStyle="rgba(17, 17, 17, 0.85)",h.stroke(),h.beginPath(),h.arc(m,m,1.5,0,Math.PI*2),h.fillStyle="rgba(17, 17, 17, 0.85)",h.fill());let b=h?`url("${g.toDataURL("image/png")}") ${Math.round(m)} ${Math.round(m)}, auto`:"auto",A=e.createElement("style");A.dataset.pourAudit="filter",A.textContent=`
    html { cursor: ${b} !important; }
    :not(html) { cursor: inherit !important; }
    [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
  `,e.head.appendChild(A);let x=e.createElement("div");x.dataset.pourAudit="filter",x.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:2147483647;contain:strict;",e.body.appendChild(x);let L=()=>{let l=e.createElement("div");l.style.cssText="position:absolute;left:0;top:0;box-sizing:border-box;border-radius:3px;display:none;";let u=e.createElement("span");return u.style.cssText="position:absolute;left:-2px;bottom:100%;margin-bottom:3px;padding:1px 5px;border-radius:4px;font:600 11px/15px system-ui,-apple-system,sans-serif;font-variant-numeric:tabular-nums;white-space:nowrap;letter-spacing:0;",l.appendChild(u),x.appendChild(l),{el:l,chip:u}},R=[],P=L(),N=(l,u)=>{let C=e.elementFromPoint(l,u);for(;C?.shadowRoot;){let T=C.shadowRoot.elementFromPoint(l,u);if(!T||T===C)break;C=T}return C},E=l=>{for(let u=l;u;u=u.parentElement??u.getRootNode().host??null)if(u.nodeType===1){if(u.hasAttribute("data-pour-audit"))return null;if(u.matches(ir))return u.matches(":disabled")?null:u}return null};function D(l,u){let C=new Map,T=0;for(let[F,O]of o){let I=E(N(l+F,u+O));I&&(C.set(I,(C.get(I)??0)+1),T++)}return[...C].map(([F,O])=>({el:F,share:O/T})).sort((F,O)=>O.share-F.share)}let S=(l,u,C)=>{let T=null,F=1/0;for(let O of l.getClientRects()){let I=Math.max(O.left-u,0,u-O.right),V=Math.max(O.top-C,0,C-O.bottom),Z=I*I+V*V;Z<F&&(F=Z,T=O)}return T??l.getBoundingClientRect()},y=(l,u,{border:C,halo:T,chipText:F,chipBg:O,chipFg:I})=>{Object.assign(l.el.style,{display:"block",transform:`translate(${Math.round(u.left-3)}px, ${Math.round(u.top-3)}px)`,width:`${Math.round(u.width+6)}px`,height:`${Math.round(u.height+6)}px`,border:`2px solid ${C}`,boxShadow:`0 0 0 1px ${T}`}),l.chip.style.display=F?"block":"none",l.chip.textContent=F??"",l.chip.style.background=O??"",l.chip.style.color=I??"";let V=u.top>22;l.chip.style.bottom=V?"100%":"auto",l.chip.style.top=V?"auto":"100%",l.chip.style.marginBottom=V?"3px":"0",l.chip.style.marginTop=V?"0":"3px"},i=-1,a=-1,s=!1,k=0;function p(){k=0;let l=s?D(i,a):[],u=l.length>1;for(;R.length<l.length;)R.push(L());let C=[];if(R.forEach((T,F)=>{let O=l[F];if(!O){T.el.style.display="none";return}let I=S(O.el,i,a);y(T,I,u?{border:"#F59E0B",halo:"rgba(17,17,17,0.55)",chipText:`${Math.round(O.share*100)}%`,chipBg:"#F59E0B",chipFg:"#111"}:{border:"rgba(17,17,17,0.8)",halo:"rgba(255,255,255,0.9)"}),T.chip.style.left="-2px",C.push({b:T,r:I})}),u){let T=-1/0;for(let{b:F,r:O}of C.sort((I,V)=>I.r.left-V.r.left)){let I=Math.round(O.left-3),V=Math.max(I-2,T);F.chip.style.left=`${V-I}px`,T=V+F.chip.offsetWidth+3}}}let M=()=>{k||(k=t.requestAnimationFrame(p))},B="mouse",W=null,z=0,_=l=>{B=l.pointerType||"mouse",B!=="touch"&&(i=l.clientX,a=l.clientY,s=!0,M())},q=l=>{l.relatedTarget||(s=!1,M())},G=l=>{if(B=l.pointerType||"mouse",B==="touch"||l.button!==0){W=null;return}W={shares:D(l.clientX,l.clientY),natural:E(N(l.clientX,l.clientY))}},ee=l=>{let u=W;if(W=null,!u||!l.isTrusted||l.detail===0||B==="touch"||!u.shares.length)return;let C=Math.random(),T=u.shares[u.shares.length-1].el;for(let F of u.shares)if(C-=F.share,C<=0){T=F.el;break}T!==u.natural&&(l.preventDefault(),l.stopImmediatePropagation(),y(P,S(T,l.clientX,l.clientY),{border:"#111",halo:"rgba(255,255,255,0.9)",chipText:"The tap landed here",chipBg:"#111",chipFg:"#fff"}),t.clearTimeout(z),z=t.setTimeout(()=>{P.el.style.display="none"},lr),typeof T.focus=="function"&&T.focus({preventScroll:!0}),T.click())};return e.addEventListener("pointermove",_,{passive:!0}),e.addEventListener("pointerdown",G,!0),e.addEventListener("mouseout",q,{passive:!0}),t.addEventListener("click",ee,!0),t.addEventListener("scroll",M,{passive:!0,capture:!0}),{stop(){e.removeEventListener("pointermove",_),e.removeEventListener("pointerdown",G,!0),e.removeEventListener("mouseout",q),t.removeEventListener("click",ee,!0),t.removeEventListener("scroll",M,{capture:!0}),k&&t.cancelAnimationFrame(k),t.clearTimeout(z),x.remove(),A.remove()}}}var it=(e,r)=>[e.style.getPropertyValue(r),e.style.getPropertyPriority(r)],Ce=(e,r,[t,c])=>{t?e.style.setProperty(r,t,c):e.style.removeProperty(r)},pr=e=>e.transform!=="none"||e.translate!=="none"||e.rotate!=="none"||e.scale!=="none"||e.perspective!=="none"||e.filter!=="none"||(e.backdropFilter??"none")!=="none"||/paint|layout|strict|content/.test(e.contain)||/transform|perspective|filter/.test(e.willChange)||e.containerType&&e.containerType!=="normal";function st(e,{scale:r=4}={}){let t=e.defaultView,c=e.documentElement,f=e.scrollingElement||c,o=["transform","transform-origin","height"].map(l=>[l,it(c,l)]),n=t.innerWidth/2,d=t.innerHeight/2,g=0,h=0,m=new Map;c.style.setProperty("height","100%","important");function b(){c.style.removeProperty("transform"),g=Math.max(0,f.scrollWidth-t.innerWidth),h=Math.max(0,f.scrollHeight-t.innerHeight),c.style.setProperty("transform",`scale(${r})`,"important")}function A(){let l=t.scrollX,u=t.scrollY;c.style.setProperty("transform-origin",`${l+n}px ${u+d}px`,"important");for(let[C,{base:T}]of m)C.style.setProperty("translate",`calc(${T[0]} + ${l}px) calc(${T[1]} + ${u}px)`,"important")}function x(){let l=new Set;for(let u of e.body.getElementsByTagName("*")){if(u.hasAttribute("data-pour-audit"))continue;let C=t.getComputedStyle(u);if(C.position!=="fixed")continue;let T=!0;for(let F=u.parentElement;F&&F!==c;F=F.parentElement){if(l.has(F)){T=!1;break}if(!m.has(F)&&pr(t.getComputedStyle(F))){T=!1;break}}if(T&&(l.add(u),!m.has(u))){let[F="0px",O="0px"]=C.translate==="none"?[]:C.translate.split(" ");m.set(u,{saved:it(u,"translate"),base:[F,O]})}}for(let[u,C]of m)l.has(u)||(Ce(u,"translate",C.saved),m.delete(u));A()}let L=()=>{let l=n*(1-1/r),u=d*(1-1/r);return{left:l,top:u,right:l+t.innerWidth/r,bottom:u+t.innerHeight/r}},R=l=>({left:n+(l.left-n)/r,top:d+(l.top-d)/r,right:n+(l.right-n)/r,bottom:d+(l.bottom-d)/r}),P=(l,u)=>l.left<u.right&&l.right>u.left&&l.top<u.bottom&&l.bottom>u.top,N=e.createElement("div");N.dataset.pourAudit="filter",N.setAttribute("popover","manual"),N.style.cssText="position:fixed;inset:0;width:auto;height:auto;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:none;z-index:2147483647;",e.body.appendChild(N);try{N.showPopover()}catch{}let E=new Map,D=l=>{let u=(l.getAttribute("aria-label")||l.textContent||l.getAttribute("alt")||"").replace(/\s+/g," ").trim();return u?u.length>38?`${u.slice(0,37)}\u2026`:u:l.tagName==="IMG"?"An image":"Something"};function S(l){E.has(l)&&E.get(l).remove();let u=e.createElement("div");if(u.style.cssText="position:absolute;left:0;top:0;display:flex;align-items:center;gap:6px;max-width:280px;padding:4px 9px 4px 6px;border-radius:6px;background:#111;color:#fff;box-shadow:0 0 0 1px rgba(255,255,255,0.9);font:600 12px/16px system-ui,-apple-system,sans-serif;white-space:nowrap;letter-spacing:0;",u.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg><span style="overflow:hidden;text-overflow:ellipsis"></span>',u.lastChild.textContent=`Changed out of view: ${D(l)}`,N.appendChild(u),E.set(l,u),E.size>6){let[C]=E.keys();E.get(C).remove(),E.delete(C)}i()}let y=0,i=()=>{!y&&E.size&&(y=t.requestAnimationFrame(a))};function a(){y=0;let l=t.innerWidth,u=t.innerHeight,C=L();for(let[T,F]of E){let O=T.isConnected&&T.checkVisibility?.({checkOpacity:!0,checkVisibilityCSS:!0})!==!1?T.getBoundingClientRect():null;if(!O||!O.width||!O.height||P(R(O),C)){F.remove(),E.delete(T);continue}let I=(O.left+O.right)/2-l/2,V=(O.top+O.bottom)/2-u/2,Z=F.offsetWidth/2,pe=F.offsetHeight/2,ce=Math.min(I?(l/2-14-Z)/Math.abs(I):1/0,V?(u/2-14-pe)/Math.abs(V):1/0),he=l/2+I*Math.min(ce,1e6),de=u/2+V*Math.min(ce,1e6);F.style.transform=`translate(${Math.round(he-Z)}px, ${Math.round(de-pe)}px)`,F.firstChild.style.transform=`rotate(${Math.atan2(V,I)}rad)`}E.size&&(y=t.requestAnimationFrame(a))}let s=new Set,k=0,p=0;function M(){k=0;let l=s;s=new Set;let u=t.innerWidth,C=t.innerHeight,T={left:0,top:0,right:u,bottom:C},F=L();for(let O of l){if(!O.isConnected||O===e.body||O===c||O.closest("[data-pour-audit]")||O.checkVisibility?.({checkOpacity:!0,checkVisibilityCSS:!0})===!1)continue;let I=R(O.getBoundingClientRect()),V=I.right-I.left,Z=I.bottom-I.top;!V||!Z||V*Z>u*C*.5||P(I,T)&&!P(I,F)&&S(O)}}let B=new t.MutationObserver(l=>{let u=!1;for(let C of l){let T=C.target.nodeType===1?C.target:C.target.parentElement;if(!(!T||T===c)&&!(C.type==="attributes"&&C.attributeName==="style"&&m.has(T))&&!T.closest("[data-pour-audit]"))if(u=!0,C.type==="childList")for(let F of C.addedNodes)F.nodeType===1?s.add(F):F.nodeType===3&&F.textContent.trim()&&s.add(T);else s.add(T)}s.size&&!k&&(k=t.requestAnimationFrame(M)),u&&!p&&(p=t.setTimeout(()=>{p=0,b(),x()},300))}),W=0,z=(l,u)=>{n=Math.max(0,Math.min(t.innerWidth,l)),d=Math.max(0,Math.min(t.innerHeight,u)),W||(W=t.requestAnimationFrame(()=>{W=0,A(),i()}))},_=l=>z(l.clientX,l.clientY),q=l=>{let u=l.target;if(u?.nodeType!==1||u.closest("[data-pour-audit]"))return;let C=!1;try{C=u.matches(":focus-visible")}catch{C=!0}C&&t.requestAnimationFrame(()=>{let T=R(u.getBoundingClientRect());z((T.left+T.right)/2,(T.top+T.bottom)/2)})},G=()=>{(t.scrollY>h||t.scrollX>g)&&t.scrollTo({left:Math.min(t.scrollX,g),top:Math.min(t.scrollY,h),behavior:"instant"}),A(),i()},ee=()=>{b(),z(n,d),x()};return b(),x(),B.observe(e.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeFilter:["class","style","hidden","open","aria-hidden"]}),e.addEventListener("pointermove",_,{passive:!0}),e.addEventListener("focusin",q,!0),t.addEventListener("scroll",G,{passive:!0}),t.addEventListener("resize",ee),{stop(){B.disconnect(),e.removeEventListener("pointermove",_),e.removeEventListener("focusin",q,!0),t.removeEventListener("scroll",G),t.removeEventListener("resize",ee);for(let l of[y,k,W])l&&t.cancelAnimationFrame(l);t.clearTimeout(p);for(let[l,u]of m)Ce(l,"translate",u.saved);m.clear();for(let[l,u]of o)Ce(c,l,u);N.remove()}}}var lt=`/* Overlay styles for the vision & sensory filters \u2014 ported from
   blnq.studio's extension (our own project), pour-namespaced. Injected as a
   <style data-pour-audit> tag by src/filters/apply.js in both surfaces. */

/* Accessibility filter overlay styles \u2014 injected into every page */

/* ==================================================================
   Vision filters
   ================================================================== */

.pour-vision-filter-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483647;
  /* Hinting \`mask-image\` here promotes this element to a BACKDROP ROOT in
     Chromium, and a backdrop root has an empty backdrop \u2014 so every
     \`backdrop-filter\` on a descendant silently does nothing. That is why the
     ring scotoma dimmed but never blurred in Chrome while Safari and Firefox,
     which do not apply that rule, were correct. Measured 2026-08-21: with the
     mask-image hint, edge energy behind the blur layer was 425; without it, 7.
     Only \`background\` is hinted now, which is the property that actually
     changes every frame as the gaze proxy moves. */
  will-change: background;
}

/* Glaucoma \u2014 tunnel vision with progressive blur */
.pour-vision-filter-overlay[data-filter="glaucoma"] {
  background: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.45) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 28%,
    rgba(0, 0, 0, 0.02) 38%,
    rgba(0, 0, 0, 0.05) 48%,
    rgba(0, 0, 0, 0.1) 58%,
    rgba(0, 0, 0, 0.16) 70%,
    rgba(0, 0, 0, 0.22) 82%,
    rgba(0, 0, 0, 0.28) 100%
  );
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.45) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 30%,
    black 85%
  );
  -webkit-mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.45) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 30%,
    black 85%
  );
}
.pour-vision-filter-overlay[data-filter="glaucoma"]::before,
.pour-vision-filter-overlay[data-filter="glaucoma"]::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.pour-vision-filter-overlay[data-filter="glaucoma"]::before {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.45) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 40%,
    black 75%
  );
  -webkit-mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.45) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 40%,
    black 75%
  );
}
.pour-vision-filter-overlay[data-filter="glaucoma"]::after {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.45) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 55%,
    black 80%
  );
  -webkit-mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.45) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 55%,
    black 80%
  );
}

/* Glaucoma (advanced) \u2014 central island ~5-10\xB0 (MD worse than -12dB) */
.pour-vision-filter-overlay[data-filter="glaucomaLarge"] {
  background: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.38) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 18%,
    rgba(0, 0, 0, 0.03) 28%,
    rgba(0, 0, 0, 0.08) 38%,
    rgba(0, 0, 0, 0.15) 50%,
    rgba(0, 0, 0, 0.24) 65%,
    rgba(0, 0, 0, 0.32) 80%,
    rgba(0, 0, 0, 0.4) 100%
  );
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.38) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 20%,
    black 70%
  );
  -webkit-mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.38) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 20%,
    black 70%
  );
}
.pour-vision-filter-overlay[data-filter="glaucomaLarge"]::before,
.pour-vision-filter-overlay[data-filter="glaucomaLarge"]::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.pour-vision-filter-overlay[data-filter="glaucomaLarge"]::before {
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.38) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 30%,
    black 60%
  );
  -webkit-mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.38) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 30%,
    black 60%
  );
}
.pour-vision-filter-overlay[data-filter="glaucomaLarge"]::after {
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.38) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 45%,
    black 70%
  );
  -webkit-mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.38) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 45%,
    black 70%
  );
}

/* Macular degeneration \u2014 central scotoma ~5-10\xB0 diameter */
.pour-vision-filter-overlay[data-filter="macularDegeneration"] {
  background: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.12) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.2) 40%,
    rgba(0, 0, 0, 0.06) 70%,
    transparent 100%
  );
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.15) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    black 0%,
    black 40%,
    transparent 100%
  );
  -webkit-mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.15) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    black 0%,
    black 40%,
    transparent 100%
  );
}

/* Macular degeneration (advanced) \u2014 scotoma up to 15-30\xB0 diameter */
.pour-vision-filter-overlay[data-filter="macularDegenerationLarge"] {
  background: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.3) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.3) 30%,
    rgba(0, 0, 0, 0.12) 60%,
    rgba(0, 0, 0, 0.03) 80%,
    transparent 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.35) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    black 0%,
    black 35%,
    transparent 100%
  );
  -webkit-mask-image: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.35) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    black 0%,
    black 35%,
    transparent 100%
  );
}

/* Diabetic retinopathy \u2014 patchy dark spots */
.pour-vision-filter-diabeticRetinopathy::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483647;
  background:
    radial-gradient(
      ellipse 8% 6% at 25% 30%,
      rgba(0, 0, 0, 0.6) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 5% 7% at 60% 20%,
      rgba(0, 0, 0, 0.5) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 7% 5% at 75% 55%,
      rgba(0, 0, 0, 0.55) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 6% 8% at 35% 70%,
      rgba(0, 0, 0, 0.5) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 9% 6% at 50% 45%,
      rgba(0, 0, 0, 0.45) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 5% 5% at 15% 60%,
      rgba(0, 0, 0, 0.4) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 6% 4% at 80% 80%,
      rgba(0, 0, 0, 0.5) 0%,
      transparent 100%
    );
}

/* Nystagmus \u2014 involuntary eye movement */
.pour-vision-filter-nystagmus {
  animation: pour-vision-filter-nystagmus 0.15s ease-in-out infinite alternate;
}

@keyframes pour-vision-filter-nystagmus {
  0% {
    transform: translate(-1.5px, 0.5px);
  }
  25% {
    transform: translate(1px, -0.5px);
  }
  50% {
    transform: translate(-0.5px, 1px);
  }
  75% {
    transform: translate(1.5px, 0px);
  }
  100% {
    transform: translate(-1px, -0.5px);
  }
}

/* Hemianopia (left) \u2014 loss of left visual field, sharp vertical midline boundary */
.pour-vision-filter-hemianopiaLeft::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483647;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.9) 40%,
    rgba(0, 0, 0, 0.35) 46%,
    rgba(0, 0, 0, 0.04) 49%,
    transparent 51%
  );
}

/* Hemianopia (right) \u2014 loss of right visual field, sharp vertical midline boundary */
.pour-vision-filter-hemianopiaRight::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483647;
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.9) 40%,
    rgba(0, 0, 0, 0.35) 46%,
    rgba(0, 0, 0, 0.04) 49%,
    transparent 51%
  );
}

/* Amblyopia \u2014 reduced acuity in one eye (not a half-field effect).
   Mild global blur + contrast reduction represents the amblyopic eye's contribution
   in binocular viewing, where the dominant eye largely compensates. */
.pour-vision-filter-amblyopia::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483647;
  backdrop-filter: blur(1.2px) contrast(0.9);
  -webkit-backdrop-filter: blur(1.2px) contrast(0.9);
}

/* ==================================================================
   Sensory filters
   ================================================================== */

/* ---- Shared overlay base ---- */
.pour-sensory-filter-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483647;
}

/* ---- Fluorescent Flicker ---- */
.pour-sensory-filter-fluorescentFlicker .pour-sensory-filter-overlay {
  background: transparent;
  animation: pour-sensory-flicker 0.08s steps(2) infinite;
}
@keyframes pour-sensory-flicker {
  0% {
    background: rgba(255, 255, 240, 0.04);
  }
  50% {
    background: rgba(255, 255, 220, 0.08);
  }
  100% {
    background: rgba(255, 255, 240, 0.02);
  }
}

/* ---- Motion Sensitivity ---- */
.pour-sensory-filter-motionSensitivity {
  animation: pour-sensory-motion 2.5s ease-in-out infinite;
  /* Scaled about the viewport's centre, kept there by the applier as the
     page scrolls; the default origin is the document's centre, which on a
     long page is nowhere near the reader. */
  transform-origin: var(--pour-motion-origin, 50% 50%);
}
@keyframes pour-sensory-motion {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  20% {
    transform: translate(1.5px, -1px) scale(1.003);
  }
  40% {
    transform: translate(-1px, 1.5px) scale(0.997);
  }
  60% {
    transform: translate(1px, 0.5px) scale(1.002);
  }
  80% {
    transform: translate(-0.5px, -1px) scale(0.998);
  }
}

/* ---- Hyperfocus Tunnel ---- */
.pour-sensory-filter-hyperfocusTunnel .pour-sensory-filter-overlay {
  background: radial-gradient(
    circle calc(var(--pour-sensory-r, 300px) * 0.25) at var(--pour-sensory-x, 50%)
      var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.15) 80%,
    rgba(0, 0, 0, 0.4) 100%
  );
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  mask-image: radial-gradient(
    circle calc(var(--pour-sensory-r, 300px) * 0.25) at var(--pour-sensory-x, 50%)
      var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 50%,
    black 90%
  );
  -webkit-mask-image: radial-gradient(
    circle calc(var(--pour-sensory-r, 300px) * 0.25) at var(--pour-sensory-x, 50%)
      var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 50%,
    black 90%
  );
  will-change: background, mask-image, -webkit-mask-image;
}
.pour-sensory-filter-hyperfocusTunnel .pour-sensory-filter-overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  mask-image: radial-gradient(
    circle calc(var(--pour-sensory-r, 300px) * 0.25) at var(--pour-sensory-x, 50%)
      var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 65%,
    black 95%
  );
  -webkit-mask-image: radial-gradient(
    circle calc(var(--pour-sensory-r, 300px) * 0.25) at var(--pour-sensory-x, 50%)
      var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 65%,
    black 95%
  );
}

/* ---- Attention Fragmentation ---- */
.pour-sensory-filter-attentionFragmentation .pour-sensory-filter-overlay {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  animation: pour-sensory-fragment-mask 6s ease-in-out infinite alternate;
  mask-image:
    radial-gradient(
      circle 80px at 20% 30%,
      transparent 0%,
      transparent 50%,
      black 100%
    ),
    radial-gradient(
      circle 60px at 70% 60%,
      transparent 0%,
      transparent 50%,
      black 100%
    ),
    radial-gradient(
      circle 70px at 45% 80%,
      transparent 0%,
      transparent 50%,
      black 100%
    );
  -webkit-mask-image:
    radial-gradient(
      circle 80px at 20% 30%,
      transparent 0%,
      transparent 50%,
      black 100%
    ),
    radial-gradient(
      circle 60px at 70% 60%,
      transparent 0%,
      transparent 50%,
      black 100%
    ),
    radial-gradient(
      circle 70px at 45% 80%,
      transparent 0%,
      transparent 50%,
      black 100%
    );
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
}
@keyframes pour-sensory-fragment-mask {
  0% {
    mask-image:
      radial-gradient(
        circle 80px at 20% 30%,
        transparent 0%,
        transparent 50%,
        black 100%
      ),
      radial-gradient(
        circle 60px at 70% 60%,
        transparent 0%,
        transparent 50%,
        black 100%
      ),
      radial-gradient(
        circle 70px at 45% 80%,
        transparent 0%,
        transparent 50%,
        black 100%
      );
    -webkit-mask-image:
      radial-gradient(
        circle 80px at 20% 30%,
        transparent 0%,
        transparent 50%,
        black 100%
      ),
      radial-gradient(
        circle 60px at 70% 60%,
        transparent 0%,
        transparent 50%,
        black 100%
      ),
      radial-gradient(
        circle 70px at 45% 80%,
        transparent 0%,
        transparent 50%,
        black 100%
      );
  }
  50% {
    mask-image:
      radial-gradient(
        circle 70px at 60% 20%,
        transparent 0%,
        transparent 50%,
        black 100%
      ),
      radial-gradient(
        circle 90px at 30% 70%,
        transparent 0%,
        transparent 50%,
        black 100%
      ),
      radial-gradient(
        circle 50px at 80% 40%,
        transparent 0%,
        transparent 50%,
        black 100%
      );
    -webkit-mask-image:
      radial-gradient(
        circle 70px at 60% 20%,
        transparent 0%,
        transparent 50%,
        black 100%
      ),
      radial-gradient(
        circle 90px at 30% 70%,
        transparent 0%,
        transparent 50%,
        black 100%
      ),
      radial-gradient(
        circle 50px at 80% 40%,
        transparent 0%,
        transparent 50%,
        black 100%
      );
  }
  100% {
    mask-image:
      radial-gradient(
        circle 85px at 75% 45%,
        transparent 0%,
        transparent 50%,
        black 100%
      ),
      radial-gradient(
        circle 55px at 25% 55%,
        transparent 0%,
        transparent 50%,
        black 100%
      ),
      radial-gradient(
        circle 70px at 55% 15%,
        transparent 0%,
        transparent 50%,
        black 100%
      );
    -webkit-mask-image:
      radial-gradient(
        circle 85px at 75% 45%,
        transparent 0%,
        transparent 50%,
        black 100%
      ),
      radial-gradient(
        circle 55px at 25% 55%,
        transparent 0%,
        transparent 50%,
        black 100%
      ),
      radial-gradient(
        circle 70px at 55% 15%,
        transparent 0%,
        transparent 50%,
        black 100%
      );
  }
}

/* ---- Peripheral Distraction ---- */
.pour-sensory-filter-peripheralDistraction .pour-sensory-filter-overlay {
  animation: pour-sensory-peripheral 2s ease-in-out infinite;
}
.pour-sensory-filter-peripheralDistraction .pour-sensory-filter-overlay::before,
.pour-sensory-filter-peripheralDistraction .pour-sensory-filter-overlay::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.pour-sensory-filter-peripheralDistraction .pour-sensory-filter-overlay::before {
  background:
    radial-gradient(
      ellipse 20% 50% at 0% 30%,
      rgba(255, 180, 60, 0.4) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 20% 45% at 100% 65%,
      rgba(60, 180, 255, 0.35) 0%,
      transparent 100%
    );
  animation: pour-sensory-peripheral-pulse-a 1.8s ease-in-out infinite alternate;
}
.pour-sensory-filter-peripheralDistraction .pour-sensory-filter-overlay::after {
  background:
    radial-gradient(
      ellipse 45% 18% at 35% 0%,
      rgba(255, 100, 100, 0.35) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 40% 20% at 70% 100%,
      rgba(100, 255, 100, 0.3) 0%,
      transparent 100%
    );
  animation: pour-sensory-peripheral-pulse-b 2.2s ease-in-out infinite
    alternate-reverse;
}
@keyframes pour-sensory-peripheral {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
@keyframes pour-sensory-peripheral-pulse-a {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
@keyframes pour-sensory-peripheral-pulse-b {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}

/* ---- Detail Fixation ---- */
/* The lens (lens.js) magnifies the 100px circle and squeezes the 50px
   ring around it; the dim and blur start where that ring ends. */
.pour-sensory-filter-detailFixation .pour-sensory-filter-overlay {
  background: radial-gradient(
    circle 150px at var(--pour-sensory-x, 50%) var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 66%,
    rgba(0, 0, 0, 0.08) 80%,
    rgba(0, 0, 0, 0.2) 100%
  );
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
  mask-image: radial-gradient(
    circle 150px at var(--pour-sensory-x, 50%) var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 66%,
    black 90%
  );
  -webkit-mask-image: radial-gradient(
    circle 150px at var(--pour-sensory-x, 50%) var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 66%,
    black 90%
  );
  will-change: background, mask-image, -webkit-mask-image;
}

/* ---- Sensory Interference (Shake) ---- */
.pour-sensory-filter-backgroundNoise {
  animation: pour-sensory-shake 0.1s linear infinite;
}
@keyframes pour-sensory-shake {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-1px, 0.5px);
  }
  20% {
    transform: translate(1.5px, -1px);
  }
  30% {
    transform: translate(-0.5px, 1.5px);
  }
  40% {
    transform: translate(1px, -1px);
  }
  50% {
    transform: translate(-1.5px, -0.5px);
  }
  60% {
    transform: translate(1px, 1px);
  }
  70% {
    transform: translate(0.5px, -1.5px);
  }
  80% {
    transform: translate(-1px, 0.5px);
  }
  90% {
    transform: translate(1.5px, -0.5px);
  }
  100% {
    transform: translate(0, 0);
  }
}

/* ---- Processing Lag ---- */
.pour-sensory-filter-processingDelay .pour-sensory-filter-overlay {
  background: rgba(255, 255, 255, 0.7);
  animation: pour-sensory-delay 3s ease-out forwards;
}
@keyframes pour-sensory-delay {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* ---- Sudden Sensory Spike ---- */
.pour-sensory-filter-sensorySpike .pour-sensory-filter-overlay {
  background: transparent;
  transition: background 0.05s;
}
.pour-sensory-filter-sensorySpike .pour-sensory-filter-overlay.pour-sensory-spike-flash {
  background: rgba(255, 255, 255, 0.7);
}

/* ---- Visual Stress (Pattern Glare) ---- */
.pour-sensory-filter-dyslexiaVisualStress .pour-sensory-filter-overlay {
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 3px,
    rgba(0, 0, 0, 0.13) 3px,
    rgba(0, 0, 0, 0.13) 6px
  );
  animation: pour-sensory-glare-drift 3s ease-in-out infinite;
}
.pour-sensory-filter-dyslexiaVisualStress .pour-sensory-filter-overlay::before,
.pour-sensory-filter-dyslexiaVisualStress .pour-sensory-filter-overlay::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.pour-sensory-filter-dyslexiaVisualStress .pour-sensory-filter-overlay::after {
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 4px,
    rgba(255, 255, 255, 0.18) 4px,
    rgba(255, 255, 255, 0.18) 8px
  );
  animation: pour-sensory-glare-drift-offset 2.5s ease-in-out infinite;
}
@keyframes pour-sensory-glare-drift {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}
@keyframes pour-sensory-glare-drift-offset {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* ---- Tracking Loss ---- */
.pour-sensory-filter-dyslexiaTrackingLoss .pour-sensory-filter-overlay {
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  background: rgba(0, 0, 0, 0.08);
  mask-image: linear-gradient(
    to bottom,
    black 0%,
    black calc(var(--pour-sensory-y, 50%) - 30px),
    transparent calc(var(--pour-sensory-y, 50%) - 14px),
    transparent calc(var(--pour-sensory-y, 50%) + 14px),
    black calc(var(--pour-sensory-y, 50%) + 30px),
    black 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    black 0%,
    black calc(var(--pour-sensory-y, 50%) - 30px),
    transparent calc(var(--pour-sensory-y, 50%) - 14px),
    transparent calc(var(--pour-sensory-y, 50%) + 14px),
    black calc(var(--pour-sensory-y, 50%) + 30px),
    black 100%
  );
  will-change: mask-image, -webkit-mask-image;
}

/* ---- Focus order (keyboard) ----------------------------------------------
   Numbered stops over every tabbable element, one line tracing the order
   sequential focus takes. The badge anchors on the element's top-left
   corner; amber marks a positive tabindex forcing its own position. Colors
   are literal (this sheet paints over arbitrary pages, no tokens). */

@keyframes pour-vision-snow {
  0%   { background-position: 0 0; }
  33%  { background-position: 37px 61px; }
  66%  { background-position: 83px 19px; }
  100% { background-position: 21px 97px; }
}

/* ---- Retinitis pigmentosa: the ring ---------------------------------------
   NOT the glaucoma tunnel. Early RP takes an annulus out of the mid-periphery
   and leaves BOTH a clear central island and a seeing outer rim; the tunnel
   comes much later, so the donut is what most of that life looks like.

   Rides the same gaze proxy as the tunnels and the central losses: the ring
   sits at a fixed eccentricity from FIXATION, not from the middle of a
   window, so a static ring would be the one thing it definitely is not.
   Past the gradient's radius the final stop continues, which is what leaves
   the outer rim seeing. */
.pour-vision-filter-overlay[data-filter="retinitisRing"] {
  /* Loss of FUNCTION, not a coat of black paint. People with field loss
     mostly do not perceive a dark region at all: the brain fills the gap in
     from its surroundings, which is exactly why field loss so often goes
     unnoticed until someone walks into something. So the annulus is rendered
     the way the tunnels and central losses already are \u2014 unresolvable and
     mildly dimmed \u2014 rather than blacked out. Peak alpha sits in the same
     0.28-0.45 band as every other field-loss row here.

     Proportions carry the meaning: early RP keeps a usable reading island,
     loses a BAND beyond it, and keeps a seeing rim outside that. Mapping
     20-25 degrees of eccentricity to pixels needs a viewing distance nobody
     can know, so this is tuned to read correctly rather than to claim an
     angle it cannot verify. Rides the gaze proxy like its neighbours. */
  background: radial-gradient(
    circle calc(var(--pour-vision-r, 400px) * 0.78) at var(--pour-vision-x, 50%)
      var(--pour-vision-y, 50%),
    transparent 0%,
    transparent 31%,
    rgba(0, 0, 0, 0.14) 40%,
    rgba(0, 0, 0, 0.3) 52%,
    rgba(0, 0, 0, 0.3) 66%,
    rgba(0, 0, 0, 0.12) 78%,
    transparent 88%,
    transparent 100%
  );
}

/* Two blur stages, masked to the annulus so the reading island and the outer
   rim both stay sharp. Same trick the tunnels use, shaped as a ring. */
.pour-vision-filter-overlay[data-filter="retinitisRing"]::before,
.pour-vision-filter-overlay[data-filter="retinitisRing"]::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.pour-vision-filter-overlay[data-filter="retinitisRing"]::before {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  mask-image: radial-gradient(
      circle calc(var(--pour-vision-r, 400px) * 0.78) at var(--pour-vision-x, 50%)
        var(--pour-vision-y, 50%),
      transparent 0%,
      transparent 33%,
      black 44%,
      black 70%,
      transparent 84%
    );
  -webkit-mask-image: radial-gradient(
      circle calc(var(--pour-vision-r, 400px) * 0.78) at var(--pour-vision-x, 50%)
        var(--pour-vision-y, 50%),
      transparent 0%,
      transparent 33%,
      black 44%,
      black 70%,
      transparent 84%
    );
}
.pour-vision-filter-overlay[data-filter="retinitisRing"]::after {
  backdrop-filter: blur(11px);
  -webkit-backdrop-filter: blur(11px);
  mask-image: radial-gradient(
      circle calc(var(--pour-vision-r, 400px) * 0.78) at var(--pour-vision-x, 50%)
        var(--pour-vision-y, 50%),
      transparent 0%,
      transparent 38%,
      black 50%,
      black 64%,
      transparent 78%
    );
  -webkit-mask-image: radial-gradient(
      circle calc(var(--pour-vision-r, 400px) * 0.78) at var(--pour-vision-x, 50%)
        var(--pour-vision-y, 50%),
      transparent 0%,
      transparent 38%,
      black 50%,
      black 64%,
      transparent 78%
    );
}
`;function ct(e=document){let r=e.defaultView,t=e.documentElement,c=le(e),f=je(e,c),o=null,n=null,d=null,g=null,h=null,m=null,b=null,A=null,x="none",L="none",R=0,P=0,N=0,E=0,D=null;function S(){if(e.getElementById("pour-filter-styles"))return;let w=e.createElement("style");w.id="pour-filter-styles",w.dataset.pourAudit="filter",w.textContent=lt,e.head.appendChild(w)}function y(){if(e.getElementById("pour-vision-filter-defs"))return;let w="http://www.w3.org/2000/svg",v=e.createElementNS(w,"svg");v.setAttribute("id","pour-vision-filter-defs"),v.setAttribute("width","0"),v.setAttribute("height","0"),v.setAttribute("focusable","false"),v.setAttribute("aria-hidden","true"),v.dataset.pourAudit="filter",v.style.position="absolute",v.style.pointerEvents="none";let $=e.createElementNS(w,"defs");for(let[K,U]of Object.entries(ve)){let Y=e.createElementNS(w,"filter");Y.setAttribute("id",`pour-vision-filter-${K}`),Y.setAttribute("color-interpolation-filters","linearRGB");let j=e.createElementNS(w,"feColorMatrix");j.setAttribute("type","matrix"),j.setAttribute("values",U),Y.appendChild(j),$.appendChild(Y)}v.appendChild($),e.body.appendChild(v)}let i=w=>{let v=e.createElement("div");return v.className=w,v.dataset.pourAudit="filter",e.body.appendChild(v),v};function a(){N=0,t.style.setProperty("--pour-vision-x",`${R}px`),t.style.setProperty("--pour-vision-y",`${P}px`),t.style.setProperty("--pour-vision-r",`${Math.min(r.innerWidth,r.innerHeight)}px`)}function s(w){R=w.clientX,P=w.clientY,N||(N=r.requestAnimationFrame(a))}function k(w){let v=w.touches[0];v&&s(v)}function p(w){for(let $ of xe)t.classList.remove(`pour-vision-filter-${$}`);if(ke.has(x)&&(e.removeEventListener("mousemove",s),e.removeEventListener("touchmove",k)),n?.stop(),n=null,d?.stop(),d=null,g?.stop(),g=null,o?.remove(),o=null,x=ne[w]!==void 0?w:"none",x==="none"){L==="none"&&(t.style.filter="");return}L!=="none"&&ge("none"),S(),y();let v=ne[x]||"none";t.style.filter=v==="none"?"":v,xe.has(x)&&(t.classList.add(`pour-vision-filter-${x}`),o=i("pour-vision-filter-overlay"),o.dataset.filter=x,x==="floaters"&&(n=Ge(e,o)),x==="migraineAura"&&(d=Ke(e,o)),x==="glossyScreen"&&(g=Ue(e,o))),ke.has(x)&&(R=r.innerWidth/2,P=r.innerHeight/2,a(),e.addEventListener("mousemove",s),e.addEventListener("touchmove",k,{passive:!0}))}function M(){E=0,t.style.setProperty("--pour-sensory-x",`${R}px`),t.style.setProperty("--pour-sensory-y",`${P}px`),t.style.setProperty("--pour-sensory-r",`${Math.min(r.innerWidth,r.innerHeight)}px`)}function B(w){R=w.clientX,P=w.clientY,E||(E=r.requestAnimationFrame(M))}function W(w){let v=w.touches[0];v&&B(v)}function z(w){if(e.getElementById("pour-sensory-injected-style")?.remove(),!w)return;let v=e.createElement("style");v.id="pour-sensory-injected-style",v.dataset.pourAudit="filter",v.textContent=w,e.head.appendChild(v)}function _(){if(e.querySelector(".pour-sensory-washout-char"))return;let w=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null),v=[];for(;w.nextNode();)v.push(w.currentNode);for(let $ of v){let K=$.textContent;if(!K.trim())continue;let U=$.parentElement;if(!U||U.closest("script,style,noscript,[data-pour-audit]"))continue;let Y=e.createDocumentFragment();for(let j of K)if(j===" "||j===`
`||j==="	")Y.appendChild(e.createTextNode(j));else{let Q=e.createElement("span");Q.textContent=j,Q.style.opacity=(.3+Math.random()*.7).toFixed(2),Q.className="pour-sensory-washout-char",Y.appendChild(Q)}U.replaceChild(Y,$)}}function q(){for(let w of e.querySelectorAll(".pour-sensory-washout-char"))w.replaceWith(w.textContent);e.body.normalize()}let G=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],ee=new Map,l=0,u=0,C=null,T=0,F=0,O=0,I=0,V=0,Z=0;function pe(w,v,$){let K=`${w}:${v}:${$}`,U=ee.get(K);if(U)return U;let Y=e.createElement("canvas");Y.width=w,Y.height=w;let j=Y.getContext("2d");if(!j)return"auto";let Q=Math.round(w/2);j.save(),j.translate(Q+v,Q+$),j.scale(1.15,1.15),j.beginPath(),j.moveTo(G[0][0],G[0][1]);for(let ae=1;ae<G.length;ae++)j.lineTo(G[ae][0],G[ae][1]);j.closePath(),j.restore(),j.lineWidth=3,j.lineJoin="round",j.strokeStyle="#fff",j.stroke(),j.fillStyle="#000",j.fill();let re=`url("${Y.toDataURL("image/png")}") ${Q} ${Q}, auto`;return ee.set(K,re),re}function ce(w){let v=w.timeStamp||Date.now(),$=v-O;if(O&&$>0){let K=Math.hypot(w.clientX-T,w.clientY-F);I=I*.8+K/$*1e3*.2}T=w.clientX,F=w.clientY,O=v}function he(w,v){if(!V)return V=w+v.minGap+Math.random()*(v.maxGap-v.minGap),[0,0];let $=w-V;if($<0)return[0,0];if($>v.dur)return V=w+v.minGap+Math.random()*(v.maxGap-v.minGap),Z=Math.random()*Math.PI*2,[0,0];let K=1-$/v.dur,U=v.size*K*K;return[Math.cos(Z)*U,Math.sin(Z)*U]}function de(w){l=r.requestAnimationFrame(de);let v=C;if(!v)return;let $=(w-u)/1e3,K=0,U=0;if(v.freq&&v.amp){let re=2*Math.PI*v.freq,ae=Math.max(0,1+(v.intent||0)*Math.min(1,I/700)),Oe=v.amp*ae;K+=(Math.sin(re*$)*.7+Math.sin(re*1.63*$+1.1)*.3)*Oe,U+=(Math.cos(re*.97*$+.6)*.7+Math.sin(re*2.11*$+2.3)*.3)*Oe}if(v.spasm){let[re,ae]=he(w,v.spasm);K+=re,U+=ae}let Y=v.bitmap/2-14,j=Math.max(-Y,Math.min(Y,Math.round(K))),Q=Math.max(-Y,Math.min(Y,Math.round(U)));t.style.cursor=pe(v.bitmap,j,Q)}function mt(w){Le(),C=w,u=r.performance?r.performance.now():Date.now(),I=0,O=0,V=0,Z=Math.random()*Math.PI*2,$e(w.hide?`
      html, :not(html) { cursor: none !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `:`
      :not(html) { cursor: inherit !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `),!w.hide&&(e.addEventListener("mousemove",ce,{passive:!0}),l=r.requestAnimationFrame(de))}function Le(){l&&r.cancelAnimationFrame(l),l=0,C=null,V=0,e.removeEventListener("mousemove",ce),$e(null),t.style.cursor=""}function $e(w){if(e.getElementById("pour-sensory-cursor-style")?.remove(),!w)return;let v=e.createElement("style");v.id="pour-sensory-cursor-style",v.dataset.pourAudit="filter",v.textContent=w,e.head.appendChild(v)}function ht(){Re();let w=()=>{D=r.setTimeout(()=>{A&&(A.classList.add("pour-sensory-spike-flash"),r.setTimeout(()=>{A?.classList.remove("pour-sensory-spike-flash"),w()},150))},3e3+Math.random()*8e3)};w()}function Re(){D&&(r.clearTimeout(D),D=null)}function ge(w){let v=se[L];if(v?.overlay&&t.classList.remove(`pour-sensory-filter-${L}`),v?.hostClass&&t.classList.remove(v.hostClass),v?.mouseTracked&&(e.removeEventListener("mousemove",B),e.removeEventListener("touchmove",W)),v?.injectScript&&q(),v?.cursorJitter&&Le(),v?.viewportOrigin&&bt(),v?.loupe&&Ne(),v?.lens&&f[v.lens]?.remove(),h?.stop(),h=null,m?.stop(),m=null,b?.stop(),b=null,Re(),A?.remove(),A=null,z(null),L=se[w]?w:"none",L==="none"){x==="none"&&(t.style.filter="");return}x!=="none"&&p("none"),S();let $=se[L];t.style.filter=$.css&&$.css!=="none"?$.css:"",$.hostClass&&t.classList.add($.hostClass),($.overlay||$.mouseTracked||L==="sensorySpike")&&(A=i("pour-sensory-filter-overlay"),A.dataset.filter=L,$.overlay&&t.classList.add(`pour-sensory-filter-${L}`)),$.mouseTracked&&(R=r.innerWidth/2,P=r.innerHeight/2,M(),e.addEventListener("mousemove",B),e.addEventListener("touchmove",W,{passive:!0})),$.injectCSS&&z($.injectCSS),L==="sensorySpike"&&ht(),$.injectScript&&_(),$.cursorJitter&&mt($.cursorJitter),$.viewportOrigin&&gt(),$.loupe&&yt($.loupe),$.lens&&f[$.lens]?.apply(),$.forcedColours&&(h=rt(e)),$.fingertip&&(m=ot(e,$.fingertip)),$.magnifier&&(b=st(e,$.magnifier))}let ie=0;function Fe(){ie=0,t.style.setProperty("--pour-motion-origin",`${r.scrollX+r.innerWidth/2}px ${r.scrollY+r.innerHeight/2}px`)}function ue(){ie||(ie=r.requestAnimationFrame(Fe))}function gt(){Fe(),r.addEventListener("scroll",ue,{passive:!0}),r.addEventListener("resize",ue)}function bt(){r.removeEventListener("scroll",ue),r.removeEventListener("resize",ue),ie&&(r.cancelAnimationFrame(ie),ie=0),t.style.removeProperty("--pour-motion-origin")}let be=null;function yt(w){Ne(),be=nt(e,{...w,point:()=>({x:R,y:P})})}function Ne(){be?.stop(),be=null}let vt=()=>({vision:x,sensory:L});function xt(){p("none"),ge("none")}return{applyVision:p,applySensory:ge,clear:xt,state:vt}}var ur=new Set(["text","search","url","tel","email","password","number","date","datetime-local","month","time","week",""]),fr=new Set(["input","select","textarea","button","meter","output","progress"]);function dt(e){return me(e,!1,!1,new Set)}function ut(e){for(let t=e;t;t=Se(t))if(t.getAttribute?.("aria-hidden")==="true"||getComputedStyle(t).display==="none")return!0;let r=getComputedStyle(e).visibility;return r==="hidden"||r==="collapse"}function mr(e,r){let t=e.getAttribute?.("aria-labelledby");if(!t)return null;let c=e.getRootNode(),f=t.split(/\s+/).filter(Boolean).map(o=>c.getElementById?.(o)).filter(Boolean);return f.length?f.map(o=>{let n=new Set(r);return o===e&&n.delete(e),me(o,!0,ut(o),n)}).join(" ").replace(/\s+/g," ").trim():null}function me(e,r,t,c){if(c.has(e))return"";if(c.add(e),!r){let d=mr(e,c);if(d)return d}let f=e.getAttribute("aria-label")?.trim();if(f)return f;let o=e.tagName.toLowerCase();if(o==="img"||o==="area"){let d=e.getAttribute("alt")?.trim();if(d)return d}if(fr.has(o)&&e.labels?.length){let d=[...e.labels].map(g=>me(g,r,ut(g),c)).join(" ").trim();if(d)return d}if(o==="input"||o==="select"||o==="textarea"){if(e.type==="submit"||e.type==="reset"||e.type==="button"){let d=(e.value??e.getAttribute("value")??"").trim();if(d)return d}if(e.type==="image"){let d=e.getAttribute("alt")?.trim();if(d)return d}if(r&&(o==="textarea"||ur.has(e.type))){let d=(e.value??"").trim();if(d)return d}if(e.type==="submit")return"Submit";if(e.type==="reset")return"Reset"}let n=hr(e,t,r,c).replace(/\s+/g," ").trim();return n||(e.getAttribute("title")??e.getAttribute("placeholder")??"").trim()}function hr(e,r,t,c){let f=e.shadowRoot?e.shadowRoot.childNodes:e.childNodes;return pt(e,"::before",r)+ft(f,r,t,c)+pt(e,"::after",r)}function pt(e,r,t){let c=getComputedStyle(e,r);if(!t&&(c.display==="none"||c.visibility==="hidden"||c.visibility==="collapse"))return"";let f=c.content;if(!f||f==="none"||f==="normal")return"";let o=f.match(/\/\s*"((?:[^"\\]|\\.)*)"\s*$/);if(o)return o[1].replace(/\\(.)/g,"$1");let n=f.match(/^"((?:[^"\\]|\\.)*)"$/);return n?n[1].replace(/\\(.)/g,"$1"):""}function ft(e,r,t,c){let f="";for(let o of e){if(o.nodeType===3){f+=o.textContent;continue}if(o.nodeType!==1)continue;let n=o.tagName.toLowerCase();if(n==="script"||n==="style"||n==="noscript"||n==="template")continue;if(!r){if(o.getAttribute("aria-hidden")==="true")continue;let g=getComputedStyle(o);if(g.display==="none"||g.visibility==="hidden"||g.visibility==="collapse")continue}if(n==="slot"){let g=o.assignedNodes?.()??[];f+=ft(g.length?g:o.childNodes,r,t,c);continue}if((n==="img"||n==="area")&&o.getAttribute("alt")===""&&!o.getAttribute("aria-label")?.trim()&&!o.getAttribute("aria-labelledby"))continue;let d=me(o,t,r,c);f+=n==="img"||n==="area"||o.hasAttribute("aria-label")||o.hasAttribute("aria-labelledby")?` ${d} `:d}return f}return Tt(gr);})();
