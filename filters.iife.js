/*! pour filters | MIT | https://pour.dev */
var PourFilters=(()=>{var ce=Object.defineProperty;var ht=Object.getOwnPropertyDescriptor;var gt=Object.getOwnPropertyNames;var bt=Object.prototype.hasOwnProperty;var yt=(e,t)=>{for(var r in t)ce(e,r,{get:t[r],enumerable:!0})},vt=(e,t,r,p)=>{if(t&&typeof t=="object"||typeof t=="function")for(let d of gt(t))!bt.call(e,d)&&d!==r&&ce(e,d,{get:()=>t[d],enumerable:!(p=ht(t,d))||p.enumerable});return e};var xt=e=>vt(ce({},"__esModule",{value:!0}),e);var nr={};yt(nr,{CSS_FILTERS:()=>X,MODE_LABELS:()=>fe,SENSORY_FILTERS:()=>Q,accessibleName:()=>at,createFilterApplier:()=>tt,createLensKit:()=>ee,cssPath:()=>Fe});var de={protanopia:"0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0 0 0 0 1 0",deuteranopia:"0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047414 0 0 -0.011820 0.042940 0.968881 0 0 0 0 0 1 0",tritanopia:"1.255528 -0.076749 -0.178779 0 0 -0.078411 0.930809 0.147602 0 0 0.004733 0.691367 0.303900 0 0 0 0 0 1 0",achromatopsia:"0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0 0 0 1 0",protanomaly:"0.458064 0.679578 -0.137642 0 0 0.092785 0.846313 0.060902 0 0 -0.007494 -0.016807 1.024301 0 0 0 0 0 1 0",deuteranomaly:"0.547494 0.607765 -0.155259 0 0 0.181692 0.781742 0.036566 0 0 -0.010410 0.027275 0.983136 0 0 0 0 0 1 0",tritanomaly:"1.057047 -0.029507 -0.027540 0 0 -0.039014 0.966028 0.072986 0 0 0.002584 0.220200 0.777216 0 0 0 0 0 1 0"},kt={protanopia:"saturate(0.25) sepia(0.5) hue-rotate(-15deg)",deuteranopia:"saturate(0.3) sepia(0.4) hue-rotate(-10deg)",tritanopia:"saturate(0.35) sepia(0.3) hue-rotate(50deg)",achromatopsia:"grayscale(100%)",protanomaly:"saturate(0.6) sepia(0.25) hue-rotate(-8deg)",deuteranomaly:"saturate(0.65) sepia(0.2) hue-rotate(-5deg)",tritanomaly:"saturate(0.7) sepia(0.15) hue-rotate(25deg)"},ue=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge","diabeticRetinopathy","floaters","migraineAura","glossyScreen","nystagmus","hemianopiaLeft","hemianopiaRight","amblyopia"]),me=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge"]),X={none:"none",cataract:"sepia(0.3) contrast(0.9) saturate(0.9) brightness(0.95) blur(0.6px)",presbyopia:"blur(0.5px) contrast(0.92)",lowAcuityMild:"blur(0.7px)",lowAcuity:"blur(1.2px)",lowAcuityStrong:"blur(2.5px)",lowAcuityHeavy:"blur(5px)",lowLight:"brightness(0.65) contrast(0.9) saturate(0.85) hue-rotate(-8deg)",lowContrast:"contrast(0.7)",retinitisRing:"none",glaucoma:"none",glaucomaLarge:"none",macularDegeneration:"none",macularDegenerationLarge:"none",diabeticRetinopathy:"none",floaters:"none",migraineAura:"none",glossyScreen:"none",nystagmus:"none",hemianopiaLeft:"none",hemianopiaRight:"none",amblyopia:"none",scotopicRose:"sepia(0.15) hue-rotate(330deg) saturate(1.2) brightness(1.05)",scotopicYellow:"sepia(0.3) saturate(1.15) brightness(1.05)",scotopicAqua:"sepia(0.2) hue-rotate(160deg) saturate(1.15) brightness(1.02)"},wt=typeof navigator<"u"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent),St=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),At=wt||St;Object.keys(de).forEach(e=>{At?X[e]=kt[e]:X[e]=`url(#pour-vision-filter-${e})`});var Tt=[{label:"Color vision",options:[{value:"deuteranomaly",added:"2026-07-30",name:"Green Weak (Deuteranomaly)",stat:"~5% of men",description:"Green-sensitive cones respond off-target, so greens, reds and browns crowd together. The most common colour vision difference.",label:"Green Weak - Deuteranomaly - ~5% of men"},{value:"protanomaly",added:"2026-07-30",name:"Red Weak (Protanomaly)",stat:"~1% of men",description:"Red-sensitive cones respond weakly: reds dim and drift towards green.",label:"Red Weak - Protanomaly - ~1% of men"},{value:"protanopia",added:"2026-07-30",name:"Red Absent (Protanopia)",stat:"~1% of men",description:"Red light barely registers \u2014 reds darken and sink into the greens around them.",label:"Red Absent - Protanopia - ~1% of men"},{value:"deuteranopia",added:"2026-07-30",name:"Green Absent (Deuteranopia)",stat:"~1% of men",description:"No working green cones: red and green become the same family of murky ochre.",label:"Green Absent - Deuteranopia - ~1% of men"},{value:"tritanomaly",added:"2026-07-30",name:"Blue Weak (Tritanomaly)",stat:"<0.2%",description:"Blue-sensitive cones respond weakly: blues and greens blur together, yellows go pale.",label:"Blue Weak - Tritanomaly - <0.2%"},{value:"tritanopia",added:"2026-07-30",name:"Blue Absent (Tritanopia)",stat:"<0.01%",description:"No working blue cones \u2014 blues read as greens, yellows as pinks and greys.",label:"Blue Absent - Tritanopia - <0.01%"},{value:"achromatopsia",added:"2026-07-30",name:"Monochromacy (Achromatopsia)",stat:"~0.003%",description:"No colour at all: brightness is the only signal left, usually with strong glare sensitivity.",label:"Monochromacy - Achromatopsia - ~0.003%"}]},{label:"Eye conditions",options:[{value:"presbyopia",added:"2026-07-30",name:"Near-Vision Loss (Presbyopia)",stat:"nearly all over 50",description:"The lens stiffens with age and close text blurs \u2014 the one condition almost everyone gets.",label:"Near-Vision Loss - Presbyopia - nearly all over 50"},{value:"glaucoma",added:"2026-07-30",name:"Tunnel Vision (Glaucoma)",stat:"~2% over 40",description:"Peripheral vision closes in until only a central window stays sharp. The window follows your pointer.",label:"Tunnel Vision - Glaucoma - ~2% over 40"},{value:"glaucomaLarge",added:"2026-07-30",name:"Tunnel Vision (Advanced Glaucoma)",stat:"~0.5% over 40",description:"Advanced glaucoma: the sharp window narrows further; everything else is gone, not blurred.",label:"Tunnel Vision (Large) - Advanced Glaucoma - ~0.5% over 40"},{value:"macularDegeneration",added:"2026-07-30",name:"Central Vision Loss (Macular Degeneration)",stat:"~8% over 45",description:"The centre of gaze fades first \u2014 precisely where you point your eyes to read.",label:"Central Vision Loss - Macular Degeneration - ~8% over 45"},{value:"macularDegenerationLarge",added:"2026-07-30",name:"Central Vision Loss (Advanced Macular Degeneration)",stat:"~1% over 50",description:"Advanced macular degeneration: a larger central blank that reading must route around.",label:"Central Vision Loss (Large) - Advanced Macular Degeneration - ~1% over 50"},{value:"diabeticRetinopathy",added:"2026-07-30",name:"Patchy Vision (Diabetic Retinopathy)",stat:"~0.8% over 40",description:"Blood-vessel damage scatters dark blotches across the view; content falls into them.",label:"Patchy Vision - Diabetic Retinopathy - ~0.8% over 40"},{value:"floaters",name:"Drifting Shadows (Floaters)",added:"2026-09-12",stat:"~33%",description:"Strands and specks in the eye cast shadows that drift and lag behind every eye movement. They show most against bright, flat areas, so a page of white space is where they live.",label:"Drifting Shadows - Floaters - ~33%"},{value:"nystagmus",added:"2026-07-30",name:"Involuntary Eye Movement (Nystagmus)",stat:"~0.2%",description:"The eyes move on their own, so the page never quite holds still.",label:"Involuntary Eye Movement - Nystagmus - ~0.2%"}]},{label:"Field of vision",options:[{value:"hemianopiaLeft",added:"2026-07-30",name:"Left Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the left half of vision in both eyes.",label:"Left Field Loss - Hemianopia (Left) - ~0.1% over 49"},{value:"hemianopiaRight",added:"2026-07-30",name:"Right Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the right half of vision in both eyes.",label:"Right Field Loss - Hemianopia (Right) - ~0.1% over 49"},{value:"retinitisRing",name:"Ring Loss (Retinitis Pigmentosa)",added:"2026-08-22",stat:"~0.025%",description:"Early retinitis pigmentosa takes a ring out of the mid-periphery, leaving a clear centre and a seeing outer rim. It narrows to a tunnel only much later, so this donut, not the tunnel, is what most of that life looks like.",label:"Ring Loss - Retinitis Pigmentosa - ~0.025%"},{value:"amblyopia",added:"2026-07-30",name:"Reduced Acuity (Amblyopia)",stat:"~2-3%",description:"One eye never learned to see sharply; fine detail and depth suffer.",label:"Reduced Acuity (One Eye) - Amblyopia - ~2-3%"},{value:"migraineAura",added:"2026-09-12",name:"Shimmering Blind Spot (Migraine Aura)",stat:"~5%",description:"A ring of shimmering zigzag light grows out from the point of gaze over half a minute and settles, with a blind band inside it, and rides with the eye. Nothing under it can be read, so anything that times out or cannot be paused and returned to is the finding. Slowed to stay under three flashes a second.",label:"Shimmering Blind Spot - Migraine Aura - ~5%"}]},{label:"Focus & acuity",options:[{value:"lowAcuityMild",added:"2026-07-30",name:"Slight Defocus",description:"Mildly uncorrected eyesight \u2014 the glasses left in the other room.",label:"Slight Defocus - Mild Blur"},{value:"lowAcuity",added:"2026-07-30",name:"Uncorrected Focus",stat:"~5-6%",description:"Moderate uncorrected short-sight: small text needs effort, thin fonts give up first.",label:"Uncorrected Focus - Moderate Blur - ~5-6%"},{value:"lowAcuityStrong",added:"2026-07-30",name:"Significant Defocus",description:"Strong blur: layout and colour still communicate, letterforms mostly do not.",label:"Significant Defocus - Strong Blur"},{value:"lowAcuityHeavy",added:"2026-07-30",name:"Severe Defocus",description:"Only shape, contrast and position survive. What does your page still say?",label:"Severe Defocus - Very Strong Blur"}]},{label:"Contrast & light",options:[{value:"cataract",added:"2026-07-30",name:"Clouded Lens (Cataract)",stat:"~17% over 40",description:"The lens clouds and yellows: glare blooms, contrast drains, whites go dingy.",label:"Clouded Lens - Cataract - ~17% over 40"},{value:"lowContrast",added:"2026-07-30",name:"Reduced Contrast",description:"Contrast sensitivity loss: faint greys sink into their backgrounds long before they vanish for you.",label:"Reduced Contrast"},{value:"lowLight",added:"2026-07-30",name:"Dim Environment",description:"A dim room, a cheap panel, a phone at night \u2014 the low-vision hours everyone has.",label:"Dim Environment - Low Light"},{value:"glossyScreen",added:"2026-09-12",name:"Glossy Screen (Reflections)",description:"The room and your own face reflect off the glass and add light to every dark pixel. White areas barely change; dark themes, grey-on-black text and low-contrast controls wash out first. Uses your camera on this device only, never recorded or sent.",label:"Glossy Screen - Reflections"}]},{label:"Visual stress",options:[{value:"scotopicRose",added:"2026-07-30",name:"Rose Tint",description:"A coloured overlay some readers use to calm pattern glare. See how your design reads through one.",label:"Rose Tint - Coloured Overlay"},{value:"scotopicYellow",added:"2026-07-30",name:"Yellow Tint",description:"A yellow reading overlay \u2014 common for visual stress. Your palette should survive it.",label:"Yellow Tint - Coloured Overlay"},{value:"scotopicAqua",added:"2026-07-30",name:"Aqua Tint",description:"An aqua reading overlay. Tinted reading is more common than most designs assume.",label:"Aqua Tint - Coloured Overlay"}]}],Q={none:{label:"None",css:"none"},fluorescentFlicker:{label:"Fluorescent Flicker",overlay:"fluorescentFlicker",css:"none"},lightSensitivity:{label:"Light Sensitivity",css:"brightness(1.4) contrast(1.2) saturate(1.1)"},colourHypersensitivity:{label:"Colour Hypersensitivity",css:"saturate(2.2) contrast(1.35) brightness(1.1)"},motionSensitivity:{label:"Motion Sensitivity",hostClass:"pour-sensory-filter-motionSensitivity",viewportOrigin:!0,css:"none"},hyperfocusTunnel:{label:"Hyperfocus Tunnel (Metaphor)",overlay:"hyperfocusTunnel",mouseTracked:!0,css:"none"},attentionFragmentation:{label:"Attention Fragmentation (Metaphor)",overlay:"attentionFragmentation",css:"none"},peripheralDistraction:{label:"Peripheral Distraction",overlay:"peripheralDistraction",css:"none"},detailFixation:{label:"Detail Fixation (Metaphor)",overlay:"detailFixation",mouseTracked:!0,loupe:{scale:2,radius:100,ring:50},css:"none"},processingDelay:{label:"Processing Lag",overlay:"processingDelay",css:"none"},sensoryInterference:{label:"Sensory Interference",hostClass:"pour-sensory-filter-backgroundNoise",css:"none"},sensorySpike:{label:"Sudden Sensory Spike",overlay:"sensorySpike",css:"none"},dyslexiaVisualStress:{label:"Visual Stress (Pattern Glare)",overlay:"dyslexiaVisualStress",injectCSS:`
        body { background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.06) 22px, rgba(0,0,0,0.06) 24px) !important; background-attachment: fixed !important; }
        p, li, td, th, dd, dt, h1, h2, h3, h4, h5, h6, label { text-shadow: 0 0 1px rgba(0,0,0,0.15) !important; animation: pour-sensory-line-merge 3s ease-in-out infinite alternate !important; }
        @keyframes pour-sensory-line-merge { 0% { transform: scaleX(1) translateY(0); } 25% { transform: scaleX(1.008) translateY(0.8px); } 50% { transform: scaleX(0.993) translateY(-0.5px); } 75% { transform: scaleX(1.005) translateY(0.6px); } 100% { transform: scaleX(0.996) translateY(-0.3px); } }
      `,css:"none"},dyslexiaCrowding:{label:"Crowding Effect",injectCSS:"* { letter-spacing: -1px !important; word-spacing: -3px !important; line-height: 1.05 !important; } p, li, td, th, dd, dt, label, span, a { font-size: 95% !important; }",css:"none"},dyslexiaTrackingLoss:{label:"Tracking Loss",overlay:"dyslexiaTrackingLoss",mouseTracked:!0,css:"none"},dyslexiaWashout:{label:"Letter Instability",injectScript:!0,css:"none"},dyslexiaContrastSensitivity:{label:"Contrast Sensitivity",css:"contrast(0.8) brightness(1.1) saturate(0.9)"},handTremor:{label:"Hand Tremor",cursorJitter:{freq:6,amp:9,intent:1.6,bitmap:96},css:"none"},handTremorStrong:{label:"Hand Tremor (Strong)",cursorJitter:{freq:5,amp:18,intent:1.9,bitmap:128},css:"none"},restingTremor:{label:"Resting Tremor",cursorJitter:{freq:4.5,amp:12,intent:-.9,bitmap:96},css:"none"},ataxicDrift:{label:"Ataxic Drift",cursorJitter:{freq:.7,amp:26,intent:.8,bitmap:128},css:"none"},pointerSpasm:{label:"Sudden Jerk",cursorJitter:{freq:5,amp:3,intent:.4,bitmap:128,spasm:{minGap:2200,maxGap:6500,size:44,dur:280}},css:"none"},pointerHidden:{label:"Hidden Pointer (Keyboard Only)",cursorJitter:{hide:!0,bitmap:32},css:"none"},forcedColours:{label:"Forced Colours",forcedColours:!0,css:"none"},textSpacing:{label:"Text Spacing",injectCSS:`
        *:not([data-pour-audit]):not([data-pour-audit] *) { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
        p:not([data-pour-audit] *) { margin-bottom: 2em !important; }
      `,css:"none"},focusOrder:{label:"Focus Order",lens:"focusOrder",css:"none"},landmarkMap:{label:"Landmarks & Headings",lens:"landmarkMap",css:"none"}},Et=[{label:"Sensory overload",options:[{value:"fluorescentFlicker",added:"2026-07-30",name:"Fluorescent Flicker",description:"The pulse of failing fluorescent light \u2014 flicker that many autistic and migraine-prone people cannot tune out.",label:"Fluorescent Flicker"},{value:"lightSensitivity",added:"2026-07-30",name:"Light Sensitivity",description:"Photophobia: ordinary brightness arrives as glare; bright themes read as pain.",label:"Light Sensitivity"},{value:"colourHypersensitivity",added:"2026-07-30",name:"Colour Hypersensitivity",description:"Saturated colour lands far louder than you sent it.",label:"Colour Hypersensitivity"},{value:"motionSensitivity",added:"2026-07-30",name:"Motion Sensitivity",stat:"~5% of adults",description:"Page motion is felt, not just seen \u2014 what autoplaying movement does to a vestibular-sensitive visitor.",label:"Motion Sensitivity"}]},{label:"Attention & focus",options:[{value:"hyperfocusTunnel",added:"2026-07-30",name:"Hyperfocus Tunnel",metaphor:!0,description:"The world outside the point of focus falls away; the page exists one region at a time.",label:"Hyperfocus Tunnel (Metaphor)"},{value:"attentionFragmentation",added:"2026-07-30",name:"Attention Fragmentation",metaphor:!0,description:"A scattered attention field \u2014 every element competes and none of them wins.",label:"Attention Fragmentation (Metaphor)"},{value:"peripheralDistraction",added:"2026-07-30",name:"Peripheral Distraction",description:"Movement at the edges keeps stealing the centre of your gaze.",label:"Peripheral Distraction"},{value:"detailFixation",added:"2026-09-12",name:"Detail Fixation",metaphor:!0,description:"Detail-first processing: the point of attention magnifies while the whole recedes.",label:"Detail Fixation (Metaphor)"}]},{label:"Processing differences",options:[{value:"processingDelay",added:"2026-07-30",name:"Processing Lag",description:"The page lands a beat late \u2014 interaction as it feels under cognitive load.",label:"Processing Lag"},{value:"sensoryInterference",added:"2026-07-30",name:"Sensory Interference",description:"Visual noise under everything, like reading in a room that will not go quiet.",label:"Sensory Interference"}]},{label:"Sensory spikes",options:[{value:"sensorySpike",added:"2026-07-30",name:"Sudden Sensory Spike",description:"Not a constant state: periodic waves of too-much, out of nowhere.",label:"Sudden Sensory Spike"}]},{label:"Dyslexia / reading",options:[{value:"dyslexiaVisualStress",added:"2026-07-30",name:"Visual Stress (Pattern Glare)",stat:"~10%",description:"Dense text shimmers and bands together; lines merge and repel.",label:"Visual Stress (Pattern Glare)"},{value:"dyslexiaCrowding",added:"2026-07-30",name:"Crowding Effect",stat:"~10%",description:"Letters and words pack too tightly to separate \u2014 spacing is doing more work than you think.",label:"Crowding Effect"},{value:"dyslexiaTrackingLoss",added:"2026-07-30",name:"Tracking Loss",stat:"~10%",description:"Losing the line mid-sentence: only the neighbourhood of your pointer holds steady.",label:"Tracking Loss"},{value:"dyslexiaWashout",added:"2026-07-30",name:"Letter Instability",stat:"~10%",description:"Some letters appear fainter than others, making words harder to read. Try reading a paragraph with the effect enabled.",label:"Letter Instability"},{value:"dyslexiaContrastSensitivity",added:"2026-07-30",name:"Contrast Sensitivity",stat:"~10%",description:"Full-contrast text tires, low-contrast text disappears; the readable band is narrow.",label:"Contrast Sensitivity"}]}],Ct=[{label:"Tremor",options:[{value:"handTremor",added:"2026-08-06",name:"Hand Tremor",stat:"~1%",description:"An essential tremor: the pointer shakes harder the more precisely you aim.",label:"Hand Tremor"},{value:"handTremorStrong",added:"2026-08-06",name:"Hand Tremor (Strong)",description:"The same tremor, stronger \u2014 small close-set targets become lotteries.",label:"Hand Tremor (Strong)"},{value:"restingTremor",added:"2026-08-06",name:"Resting Tremor",stat:"~0.3%",description:"A parkinsonian pattern: shakes at rest, steadies during deliberate movement.",label:"Resting Tremor"}]},{label:"Pointer control",options:[{value:"ataxicDrift",added:"2026-08-06",name:"Ataxic Drift",description:"The pointer drifts wide of intent; straight lines are not on offer.",label:"Ataxic Drift"},{value:"pointerSpasm",added:"2026-08-06",name:"Sudden Jerk",description:"Occasional involuntary jerks fling the pointer \u2014 sometimes mid-click.",label:"Sudden Jerk"},{value:"pointerHidden",added:"2026-08-06",name:"Hidden Pointer (Keyboard Only)",description:"No pointer at all. The keyboard is the only way through your page.",label:"Hidden Pointer (Keyboard Only)"}]}],Lt=[{label:"Keyboard",options:[{value:"focusOrder",added:"2026-09-07",name:"Focus Order",description:"Numbered stops trace where Tab really goes, in order. Amber stops force their own position with a positive tabindex.",label:"Focus Order"}]},{label:"Page structure",options:[{value:"landmarkMap",added:"2026-09-07",name:"Landmarks & Headings",description:"Landmark regions tinted and named, every heading chipped with its level. Amber chips skip a level.",label:"Landmarks & Headings"}]}],Rt=[{label:"Colours",options:[{value:"forcedColours",added:"2026-09-12",name:"Forced Colours (Windows Contrast Theme)",stat:"~4% on Windows",description:"Every colour the page chose is replaced by a contrast theme\u2019s handful. Backgrounds, gradients and shadows go; borders keep their width; images and video stay, with a plate behind any text over them, as Windows draws it. Icon buttons that vanish, borderless fields and missing focus rings are the findings. An approximation: the page\u2019s own forced-colours rules are applied where its stylesheets can be read.",label:"Forced Colours (Windows Contrast Theme)"}]},{label:"Text",options:[{value:"textSpacing",added:"2026-09-12",name:"Text Spacing",description:"Line height 1.5, paragraph spacing 2, letter spacing 0.12 and word spacing 0.16 times the font size: the overrides low-vision and dyslexic readers apply, which WCAG 1.4.12 says a page must survive. Clipped labels, overflowing boxes and buttons that break are the findings.",label:"Text Spacing"}]}],fe={};for(let e of[...Tt,...Et,...Ct,...Lt,...Rt])for(let t of e.options)fe[t.value]=t.label.split(" - ")[0];function he(e){return e.assignedSlot??e.parentElement??e.getRootNode()?.host??null}var Me=new WeakMap,Mt=new Set;function $t(e){let t=Me.get(e);if(!t){let r=typeof MutationObserver=="function"?new MutationObserver(()=>{t.ids=null,t.parents=new WeakMap}):null;t={ids:null,parents:new WeakMap,observer:r},r&&(r.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["id"]}),Mt.add(r)),Me.set(e,t)}if(t.observer?.takeRecords().length&&(t.ids=null,t.parents=new WeakMap),!t.ids){t.ids=new Map;for(let r of e.querySelectorAll("[id]"))t.ids.set(r.id,(t.ids.get(r.id)??0)+1)}return t}function Ft(e,t){let r=e.parentElement,p=t.parents.get(r);if(!p){let d=new Map;p=new WeakMap;for(let o of r.children){let i=(d.get(o.tagName)??0)+1;d.set(o.tagName,i),p.set(o,{position:i,repeated:!1})}for(let o of r.children)p.get(o).repeated=d.get(o.tagName)>1;t.parents.set(r,p)}return p.get(e)}function $e(e){let t=e.getRootNode(),r=$t(t),p=i=>i.id&&r.ids.get(i.id)===1;if(p(e))return`#${CSS.escape(e.id)}`;let d=[],o=e;for(;o&&o.nodeType===Node.ELEMENT_NODE&&o!==document.documentElement;){let i=o.tagName.toLowerCase();if(o.parentElement){let{position:c,repeated:h}=Ft(o,r);h&&(i+=`:nth-of-type(${c})`)}if(d.unshift(i),o.parentElement&&p(o.parentElement)){d.unshift(`#${CSS.escape(o.parentElement.id)}`);break}o=o.parentElement}return d.join(" > ")||e.tagName.toLowerCase()}function Fe(e){let t=$e(e),r=e.getRootNode();for(;r&&r.host;)t=`${$e(r.host)} >>> ${t}`,r=r.host.getRootNode();return t}var lr=typeof Element<"u"?Object.getOwnPropertyDescriptor(Element.prototype,"attributes")?.get:null;function Ne(e){for(let t=e;t;t=he(t))if(t.nodeType===1&&t.hasAttribute("inert"))return!0;return!1}var Nt=new Set(["atomic","busy","controls","current","describedby","description","details","dropeffect","flowto","grabbed","hidden","keyshortcuts","label","labelledby","live","owns","relevant","roledescription","braillelabel","brailleroledescription"]),De=new Set(["banner","complementary","contentinfo","form","main","navigation","region","search"]),Ot={link:["disabled","errormessage","expanded","haspopup","invalid"],button:["disabled","errormessage","expanded","haspopup","invalid","pressed"],checkbox:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],switch:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],radio:["checked","disabled","errormessage","haspopup","invalid","posinset","setsize"],option:["checked","disabled","errormessage","haspopup","invalid","posinset","selected","setsize"],tab:["disabled","errormessage","expanded","haspopup","invalid","posinset","selected","setsize"],menuitem:["disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemcheckbox:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemradio:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],textbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],searchbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],combobox:["activedescendant","autocomplete","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],listbox:["activedescendant","disabled","errormessage","expanded","haspopup","invalid","multiselectable","orientation","readonly","required"],slider:["disabled","errormessage","haspopup","invalid","orientation","readonly","valuemax","valuemin","valuenow","valuetext"],spinbutton:["activedescendant","disabled","errormessage","haspopup","invalid","readonly","required","valuemax","valuemin","valuenow","valuetext"],progressbar:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],meter:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],scrollbar:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],heading:["disabled","errormessage","haspopup","invalid","level"],list:["disabled","errormessage","haspopup","invalid"],listitem:["disabled","errormessage","haspopup","invalid","level","posinset","setsize"],row:["activedescendant","colindex","colindextext","disabled","errormessage","expanded","haspopup","invalid","level","posinset","rowindex","rowindextext","selected","setsize"],rowgroup:["disabled","errormessage","haspopup","invalid"],cell:["colindex","colindextext","colspan","disabled","errormessage","haspopup","invalid","rowindex","rowindextext","rowspan"],gridcell:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected"],columnheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],rowheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],table:["colcount","disabled","errormessage","haspopup","invalid","rowcount"],grid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","readonly","rowcount"],treegrid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","orientation","readonly","required","rowcount"],tablist:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation"],menu:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],menubar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],tree:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation","required"],treeitem:["checked","disabled","errormessage","expanded","haspopup","invalid","level","posinset","selected","setsize"],radiogroup:["activedescendant","disabled","errormessage","haspopup","invalid","orientation","readonly","required"],group:["activedescendant","disabled","errormessage","haspopup","invalid"],separator:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],toolbar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],dialog:["disabled","errormessage","haspopup","invalid","modal"],alertdialog:["disabled","errormessage","haspopup","invalid","modal"],application:["activedescendant","disabled","errormessage","expanded","haspopup","invalid"],article:["disabled","errormessage","haspopup","invalid","posinset","setsize"],img:["disabled","errormessage","haspopup","invalid"],figure:["disabled","errormessage","haspopup","invalid"],document:["disabled","errormessage","haspopup","invalid"],feed:["disabled","errormessage","haspopup","invalid"],math:["disabled","errormessage","haspopup","invalid"],note:["disabled","errormessage","haspopup","invalid"],presentation:["disabled","errormessage","haspopup","invalid"],none:["disabled","errormessage","haspopup","invalid"],banner:["disabled","errormessage","haspopup","invalid"],complementary:["disabled","errormessage","haspopup","invalid"],contentinfo:["disabled","errormessage","haspopup","invalid"],form:["disabled","errormessage","haspopup","invalid"],main:["disabled","errormessage","haspopup","invalid"],navigation:["disabled","errormessage","haspopup","invalid"],region:["disabled","errormessage","haspopup","invalid"],search:["disabled","errormessage","haspopup","invalid"],alert:["disabled","errormessage","haspopup","invalid"],log:["disabled","errormessage","haspopup","invalid"],marquee:["disabled","errormessage","haspopup","invalid"],status:["disabled","errormessage","haspopup","invalid"],timer:["disabled","errormessage","haspopup","invalid"],tabpanel:["disabled","errormessage","haspopup","invalid"],tooltip:["disabled","errormessage","haspopup","invalid"],definition:["disabled","errormessage","haspopup","invalid"],term:["disabled","errormessage","haspopup","invalid"],paragraph:["disabled","errormessage","haspopup","invalid"],generic:["disabled","errormessage","haspopup","invalid"],blockquote:["disabled","errormessage","haspopup","invalid"],caption:["disabled","errormessage","haspopup","invalid"],code:["disabled","errormessage","haspopup","invalid"],emphasis:["disabled","errormessage","haspopup","invalid"],strong:["disabled","errormessage","haspopup","invalid"],time:["disabled","errormessage","haspopup","invalid"],deletion:["disabled","errormessage","haspopup","invalid"],insertion:["disabled","errormessage","haspopup","invalid"],subscript:["disabled","errormessage","haspopup","invalid"],superscript:["disabled","errormessage","haspopup","invalid"]},Dt={checkbox:"checkbox",radio:"radio",range:"slider",number:"spinbutton",search:"searchbox",email:"textbox",tel:"textbox",text:"textbox",url:"textbox",button:"button",submit:"button",reset:"button",image:"button"},It=new Set(["text","search","tel","url","email"]),Pt={button:"button",textarea:"textbox",img:"img",article:"article",aside:"complementary",nav:"navigation",main:"main",search:"search",h1:"heading",h2:"heading",h3:"heading",h4:"heading",h5:"heading",h6:"heading",ul:"list",ol:"list",menu:"list",li:"listitem",table:"table",thead:"rowgroup",tbody:"rowgroup",tfoot:"rowgroup",tr:"row",td:"cell",th:"columnheader",form:"form",fieldset:"group",details:"group",dialog:"dialog",hr:"separator",progress:"progressbar",meter:"meter",output:"status",option:"option",datalist:"listbox",dt:"term",dd:"definition",p:"paragraph",div:"generic",span:"generic",blockquote:"blockquote",figure:"figure",time:"time",code:"code",em:"emphasis",strong:"strong"};function Oe(e){let t=e.tagName.toLowerCase();if(t==="a"||t==="area")return e.hasAttribute("href")?"link":"generic";if(t==="input")return It.has(e.type)&&e.hasAttribute("list")?"combobox":Dt[e.type]??null;if(t==="td"||t==="th"){if(t==="th"&&e.getAttribute("scope")?.toLowerCase()==="row")return"rowheader";if(t==="th")return"columnheader";let r=e.closest("table"),p=r&&ge(r);return p==="grid"||p==="treegrid"?"gridcell":"cell"}if(t==="select")return e.multiple||e.size>1?"listbox":"combobox";if(t==="img")return e.getAttribute("alt")===""?"presentation":"img";if(t==="header")return e.closest("article, aside, main, nav, section")?"generic":"banner";if(t==="footer")return e.closest("article, aside, main, nav, section")?"generic":"contentinfo";if(t==="aside"){let r=e.parentElement?.closest("article, aside, nav, section"),p=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby");return r&&!p?"generic":"complementary"}return t==="section"?e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")?"region":"generic":Pt[t]??null}function zt(e){return[...Nt].some(t=>e.hasAttribute(`aria-${t}`))?!0:e.matches(":disabled")||Ne(e)?!1:e.tabIndex>=0?!0:e.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]')}function ge(e){let t=e.getAttribute("role")?.trim().split(/\s+/)??[];for(let r of t){let p=r.toLowerCase();if(p==="image")return"img";if(Ot[p])return(p==="presentation"||p==="none")&&zt(e)?Oe(e):p}return Oe(e)}var Ie=`/* Structure-lens overlay styles (focus order, landmark map): injected by
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
`;function be(e){if(e.getElementById("pour-lens-styles"))return;let t=e.createElement("style");t.id="pour-lens-styles",t.dataset.pourAudit="overlay",t.textContent=Ie,e.head.appendChild(t)}function ee(e=document){let t=e.defaultView,r={contentVisibilityAuto:!0,visibilityProperty:!0,checkVisibilityCSS:!0};function p(c){for(let h=c;h&&h!==e.documentElement;h=h.parentElement??h.getRootNode()?.host??null){let y=h.ownerDocument.defaultView.getComputedStyle(h).position;if(y==="fixed")return"fixed";if(y==="sticky")return"sticky"}return"flow"}function d(c,{withLine:h=!1}={}){let y="background:none;border:0;margin:0;padding:0;box-shadow:none;filter:none;opacity:1;mix-blend-mode:normal;",f=e.createElement("div");f.className=c,f.dataset.pourAudit="overlay",f.style.cssText=`position:absolute;top:0;left:0;width:0;height:0;overflow:clip;overflow-clip-margin:24px;pointer-events:none;z-index:2147483646;${y}`;let u=e.createElement("div");u.className=c,u.dataset.pourAudit="overlay",u.style.cssText=`position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:2147483646;${y}`;let k=0,w=0,E=null,C=null,M=null;if(h){C=e.createElementNS("http://www.w3.org/2000/svg","svg"),C.setAttribute("class",`${c.replace(/-layer$/,"")}-path`);for(let[s,x]of[["position","absolute"],["top","0"],["left","0"],["width","100%"],["height","100%"],["max-width","none"],["max-height","none"],["display","block"],["overflow","visible"],["pointer-events","none"],["background","none"],["border","0"],["margin","0"],["padding","0"],["box-shadow","none"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])C.style.setProperty(s,x,"important");M=e.createElementNS("http://www.w3.org/2000/svg","polyline"),E=e.createElementNS("http://www.w3.org/2000/svg","polyline");for(let[s,x,l]of[[M,"rgba(29,78,216,0.85)","3"],[E,"#93C5FD","1.5"]])for(let[S,D]of[["fill","none"],["stroke",x],["stroke-width",l],["stroke-linejoin","round"],["stroke-linecap","round"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])s.style.setProperty(S,D,"important");C.append(M,E),f.append(C)}let R=[],T=null,L=0,v=(s,x)=>{let l=s.el.getBoundingClientRect(),S=l.width<=0&&l.height<=0||!s.el.isConnected||s.el.checkVisibility&&!s.el.checkVisibility(r);if(s.node.style.display=S?"none":"",S){s.docPt=null,s.viewRect=null;return}let D=s.anchor==="flow"?l.left-x.left:l.left,q=s.anchor==="flow"?l.top-x.top:l.top;if(s.node.style.transform=`translate(${D}px, ${q}px)`,s.sized)s.node.style.width=`${l.width}px`,s.node.style.height=`${l.height}px`;else{let N=s.node.getBoundingClientRect(),z=s.anchor==="flow"?{left:x.left,top:x.top,right:x.left+k,bottom:x.top+w}:{left:0,top:0,right:t.innerWidth,bottom:t.innerHeight},O=N.left<z.left?z.left-N.left:N.right>z.right?z.right-N.right:0,_=N.top<z.top?z.top-N.top:N.bottom>z.bottom?z.bottom-N.bottom:0;(O||_)&&(s.node.style.transform=`translate(${D+O}px, ${q+_}px)`)}s.anchor==="flow"?s.docPt=`${D},${q}`:s.viewRect=l},g=s=>{if(!E)return;let x=[];for(let S of R)S.offLine||S.node.style.display==="none"||(S.anchor==="flow"?S.docPt&&x.push(S.docPt):S.viewRect&&x.push(`${S.viewRect.left-s.left},${S.viewRect.top-s.top}`));let l=x.join(" ");M.setAttribute("points",l),E.setAttribute("points",l)},n=()=>{let s=e.documentElement.scrollWidth,x=e.documentElement.scrollHeight;s!==k&&(k=s,f.style.width=`${s}px`),x!==w&&(w=x,f.style.height=`${x}px`);let l=f.getBoundingClientRect();for(let S of R)v(S,l);g(l)};e.body.append(f,u);let a=()=>{L=t.requestAnimationFrame(a),n()};return a(),{setItems(s,x){for(let l of R)l.node.remove();R=s.map(l=>{let S=p(l.el);return(S==="flow"?f:u).append(l.node),{...l,anchor:S,docPt:null,viewRect:null}}),x&&!R.length?(T||(T=e.createElement("div"),T.className="pour-lens-notice",u.append(T)),T.textContent=x,T.style.display=""):T&&(T.style.display="none"),n()},destroy(){t.cancelAnimationFrame(L),f.remove(),u.remove(),R=[]}}}function o(c,h){for(let y=c.parentElement??c.getRootNode()?.host;y&&y!==e.documentElement;y=y.parentElement??y.getRootNode()?.host){let f=y.ownerDocument.defaultView.getComputedStyle(y);if(f.overflow==="visible"&&f.overflowX==="visible"&&f.overflowY==="visible")continue;let u=y.getBoundingClientRect();if(h.right<=u.left||h.left>=u.right||h.bottom<=u.top||h.top>=u.bottom)return!0}return!1}function i(){let c=[],h=[],y=f=>{for(let u of f.querySelectorAll("*")){if(u.dataset&&u.dataset.pourAudit||(u.shadowRoot&&y(u.shadowRoot),!u.matches('a[href], area[href], button, input, select, textarea, summary, iframe, object, embed, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]'))||u.disabled||u.closest("[inert]")||u.checkVisibility&&!u.checkVisibility(r))continue;let k=u.getBoundingClientRect();if(k.width<=0&&k.height<=0)continue;let w=u.getAttribute("tabindex"),E=w==null?0:parseInt(w,10)||0;if(E<0){u.matches("a[href], area[href], button, input, select, textarea, summary")&&!o(u,k)&&h.push({el:u});continue}c.push({el:u,idx:E,order:c.length})}};return y(e),{stops:[...c.filter(f=>f.idx>0).sort((f,u)=>f.idx-u.idx||f.order-u.order),...c.filter(f=>f.idx===0)],unreachable:h}}return{createLensTracker:d,collectFocusStops:i,clippedOutOfSight:o,VISIBLE_OPTS:r,anchorKind:p}}function Pe(e=document,t=ee(e)){let r=e.defaultView,{createLensTracker:p,collectFocusStops:d,VISIBLE_OPTS:o}=t,i=null,c=0,h=null;function y(){if(i)return;be(e),i=p("pour-focus-order-layer",{withLine:!0});let T=()=>{let{stops:L,unreachable:v}=d(),g=L.map((n,a)=>{let s=e.createElement("span");return s.className="pour-focus-badge"+(n.idx>0?" pour-focus-badge-forced":""),s.textContent=String(a+1),n.idx>0&&(s.title=`tabindex="${n.idx}" forces this position`),{el:n.el,node:s,sized:!1}});for(let{el:n}of v){let a=e.createElement("span");a.className="pour-focus-badge pour-focus-badge-unreachable",a.textContent="\u2715",a.title='tabindex="-1" \u2014 a keyboard cannot Tab to this control',g.push({el:n,node:a,sized:!1,offLine:!0})}i.setItems(g,"Focus order: this page has no keyboard-reachable controls")};T(),h=new r.MutationObserver(()=>{c||(c=r.setTimeout(()=>{c=0,T()},400))}),h.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function f(){r.clearTimeout(c),c=0,h?.disconnect(),h=null,i?.destroy(),i=null}let u=null,k=0,w=null;function E(T){let L=T.getAttribute("aria-label");if(L?.trim())return L.trim();let v=T.getAttribute("aria-labelledby");return v?v.split(/\s+/).map(g=>T.getRootNode().getElementById?.(g)?.textContent.trim()??"").filter(Boolean).join(" "):""}function C(){let T=[],L=[],v=n=>{for(let a of n.querySelectorAll("*")){if(a.dataset&&a.dataset.pourAudit||(a.shadowRoot&&v(a.shadowRoot),a.checkVisibility&&!a.checkVisibility(o)))continue;let s=a.getBoundingClientRect();if(s.width<=0&&s.height<=0)continue;let x=ge(a);if(De.has(x)){if(x==="form"&&!E(a))continue;T.push({el:a,role:x,name:E(a)})}else if(x==="heading"){let l=parseInt(a.getAttribute("aria-level"),10)||parseInt(a.tagName.charAt(1),10)||2;L.push({el:a,level:l})}}};v(e);let g=null;for(let n of L)n.skipped=g!=null&&n.level>g+1,n.from=g,g=n.level;return{landmarks:T,headings:L}}function M(){if(u)return;be(e),u=p("pour-map-layer");let T=()=>{let{landmarks:L,headings:v}=C(),g=[];for(let n of L){let a=e.createElement("div");a.className=`pour-map-region pour-map-role-${n.role}`;let s=e.createElement("span");s.className="pour-map-tag",s.textContent=n.name?`${n.role} \xB7 ${n.name}`:n.role,a.append(s),g.push({el:n.el,node:a,sized:!0})}for(let n of v){let a=e.createElement("span");a.className="pour-map-heading"+(n.skipped?" pour-map-heading-skipped":""),a.textContent=`H${n.level}`,n.skipped&&(a.title=`Skips a level \u2014 the heading before this one is an H${n.from}`),g.push({el:n.el,node:a,sized:!1})}u.setItems(g,"No landmarks or headings are exposed on this page")};T(),w=new r.MutationObserver(()=>{k||(k=r.setTimeout(()=>{k=0,T()},400))}),w.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function R(){r.clearTimeout(k),k=0,w?.disconnect(),w=null,u?.destroy(),u=null}return{focusOrder:{apply:y,remove:f},landmarkMap:{apply:M,remove:R}}}var K="#262626";function Bt(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let r=t;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}var V=(e,t,r)=>t+(r-t)*e(),P=e=>Number(e.toFixed(1));function je(e,{start:t,steps:r,stride:p,wiggle:d,heading:o}){let i=[t],c=o;for(let h=0;h<r;h++){c+=V(e,-d,d);let y=i[i.length-1];i.push([y[0]+Math.cos(c)*p,y[1]+Math.sin(c)*p])}return i}function Be(e){let t=[];for(let r=0;r<e.length-1;r++){let p=e[Math.max(0,r-1)],d=e[r],o=e[r+1],i=e[Math.min(e.length-1,r+2)],c=[d[0]+(o[0]-p[0])/6,d[1]+(o[1]-p[1])/6],h=[o[0]-(i[0]-d[0])/6,o[1]-(i[1]-d[1])/6];t.push(`M${P(d[0])} ${P(d[1])}C${P(c[0])} ${P(c[1])} ${P(h[0])} ${P(h[1])} ${P(o[0])} ${P(o[1])}`)}return t}function ye(e,t){let{width:r=2.6,dark:p=.6}=t,d=r,o=p;return Be(je(e,t)).map(i=>(d=Math.max(r*.45,Math.min(r*1.9,d+V(e,-.7,.7))),o=Math.max(p*.55,Math.min(p*1.35,o+V(e,-.12,.12))),`<path d="${i}" stroke-width="${P(d)}" stroke-opacity="${o.toFixed(2)}"/>`)).join("")}function Vt(e,t){let r=je(e,t),p=Be(r).map(o=>`<path d="${o}" stroke-width="1.1" stroke-opacity=".45"/>`).join(""),d=r.filter((o,i)=>i%2===0).map(([o,i])=>`<circle cx="${P(o)}" cy="${P(i)}" r="${V(e,1.6,3.4).toFixed(1)}" fill="${K}" stroke="none" opacity="${V(e,.45,.75).toFixed(2)}"/>`).join("");return p+d}function qt(e,t){let r="";for(let p=0;p<4;p++){let d=V(e,0,Math.PI*2);r+=ye(e,{start:[t[0]+V(e,-18,18),t[1]+V(e,-18,18)],steps:9,stride:13,wiggle:.9,heading:d,width:2.2,dark:.55})}return r}function _t(e,t,r){let p=V(e,40,110),d=2*Math.PI*r;return`<circle cx="${t[0]}" cy="${t[1]}" r="${r}" stroke-width="${V(e,5,7).toFixed(1)}" stroke-opacity=".55" stroke-dasharray="${P(d-p)} ${P(p)}" transform="rotate(${P(V(e,0,360))} ${t[0]} ${t[1]})"/><circle cx="${t[0]}" cy="${t[1]}" r="${r}" stroke-width="2" stroke-opacity=".3"/><circle cx="${P(t[0]+r*1.4)}" cy="${P(t[1]-r*.6)}" r="3" fill="${K}" stroke="none" opacity=".5"/>`}function Wt(e,t,r){return`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${t}" ry="${r}" fill="url(#cloud)" stroke="none" transform="rotate(-20 ${e[0]} ${e[1]})"/>`}function Ht(e,t){let r="";for(let p=0;p<8;p++)r+=`<circle cx="${P(t[0]+V(e,-40,40))}" cy="${P(t[1]+V(e,-30,30))}" r="${V(e,1.2,3.2).toFixed(1)}" fill="${K}" stroke="none" opacity="${V(e,.4,.7).toFixed(2)}"/>`;return r}var Gt=(e,t)=>`url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><filter id="b" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="${t}"/></filter><radialGradient id="cloud"><stop offset="0" stop-color="${K}" stop-opacity=".38"/><stop offset=".55" stop-color="${K}" stop-opacity=".14"/><stop offset="1" stop-color="${K}" stop-opacity="0"/></radialGradient></defs><g filter="url(#b)" fill="none" stroke="${K}" stroke-linecap="round" stroke-linejoin="round">${e}</g></svg>`)}")`;function Yt(){let e=Bt(20260912);return[{depth:.95,size:.5,start:[.24,.3],art:qt(e,[100,100])},{depth:.8,size:.44,start:[.66,.24],art:ye(e,{start:[20,150],steps:12,stride:15,wiggle:.7,heading:-.9,width:3,dark:.62})},{depth:.65,size:.3,start:[.5,.62],art:_t(e,[100,100],17)},{depth:.55,size:.36,start:[.8,.6],art:Vt(e,{start:[30,70],steps:10,stride:14,wiggle:.8,heading:.4})},{depth:.4,size:.42,start:[.36,.8],art:Wt([100,100],62,34)},{depth:.3,size:.26,start:[.14,.58],art:Ht(e,[100,100])},{depth:.15,size:.3,start:[.58,.85],art:ye(e,{start:[40,40],steps:11,stride:12,wiggle:.85,heading:.6,width:2,dark:.5})}]}var Xt=.55,Kt=.4,ze=1,ie=520,Ut=2.2;function Ve(e,t){let r=e.defaultView,p=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,d={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="multiply",t.style.overflow="hidden";let o=()=>Math.max(180,Math.min(460,.32*Math.min(r.innerWidth,r.innerHeight))),i=Yt().map((v,g)=>{let n=e.createElement("div");n.className="pour-floater",n.setAttribute("aria-hidden","true"),n.dataset.pourAudit="filter";let a=(.8+v.depth*1.6).toFixed(2);return Object.assign(n.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",backgroundImage:Gt(v.art,a),backgroundSize:"contain",backgroundRepeat:"no-repeat",opacity:(.95-v.depth*.2).toFixed(2),willChange:"transform"}),t.appendChild(n),{el:n,shape:v,phase:g*1.7,size:0,x:v.start[0]*r.innerWidth,y:v.start[1]*r.innerHeight,vx:0,vy:0,angle:g*47%360,spin:0}}),c=()=>{let v=o();for(let g of i)g.size=v*g.shape.size,g.el.style.width=`${g.size}px`,g.el.style.height=`${g.size}px`},h=(v=0)=>{for(let g of i){let n=1+.03*Math.sin(v*.8+g.phase),a=2.5*Math.sin(v*.5+g.phase*.7);g.el.style.transform=`translate3d(${(g.x-g.size/2).toFixed(1)}px, ${(g.y-g.size/2).toFixed(1)}px, 0) rotate(${g.angle.toFixed(1)}deg) skewX(${a.toFixed(2)}deg) scale(${n.toFixed(3)})`}};c(),h();let y=0,f=0,u=r.scrollY,k=null,w=(v,g)=>{for(let n of i){let a=.45+.9*n.shape.depth;n.vx=Math.max(-ie,Math.min(ie,n.vx+v*a)),n.vy=Math.max(-ie,Math.min(ie,n.vy+g*a)),n.spin+=(v-g)*.02*a}},E=()=>{let v=r.scrollY-u;u=r.scrollY,v&&w(0,v*Kt)},C=(v,g)=>{k&&w((v-k.x)*ze,(g-k.y)*ze),k={x:v,y:g}},M=v=>{v.pointerType!=="touch"&&C(v.clientX,v.clientY)},R=v=>{let g=v.touches[0];g&&C(g.clientX,g.clientY)},T=()=>{c(),h()},L=v=>{y=r.requestAnimationFrame(L);let g=f?Math.min(.05,(v-f)/1e3):0;if(f=v,!g)return;let n=v/1e3,a=Math.exp(-g/Xt),s=r.innerWidth,x=r.innerHeight;for(let l of i){l.vx+=Math.sin(n*.61+l.phase)*16*g,l.vy+=(Math.cos(n*.47+l.phase*1.3)*12+Ut*(.5+l.shape.depth))*g,l.vx*=a,l.vy*=a,l.spin*=a,l.x+=l.vx*g,l.y+=l.vy*g,l.angle+=(l.spin+Math.sin(n*.3+l.phase)*2)*g;let S=l.size*.25;l.x<S&&(l.vx=Math.abs(l.vx)+8),l.x>s-S&&(l.vx=-Math.abs(l.vx)-8),l.y<S&&(l.vy=Math.abs(l.vy)+8),l.y>x-S*1.6&&(l.vy=-Math.abs(l.vy)*.6-4)}h(n)};return r.addEventListener("resize",T),p||(r.addEventListener("scroll",E,{passive:!0}),e.addEventListener("pointermove",M,{passive:!0}),e.addEventListener("touchmove",R,{passive:!0}),y=r.requestAnimationFrame(L)),{stop(){y&&r.cancelAnimationFrame(y),y=0,r.removeEventListener("resize",T),r.removeEventListener("scroll",E),e.removeEventListener("pointermove",M),e.removeEventListener("touchmove",R);for(let v of i)v.el.remove();t.style.mixBlendMode=d.mixBlendMode,t.style.overflow=d.overflow}}}var qe=["#ffffff","#1c1c1c","#fff1a3","#ffffff","#c6ecff","#1c1c1c","#ffd9d9","#ffffff","#e9ffd9","#1c1c1c"],_e=Math.PI*2,H=e=>e.toFixed(1);function We(e,t){let r=e.defaultView,p=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,d=e.createElement("div");d.setAttribute("aria-hidden","true"),d.dataset.pourAudit="filter",d.dataset.pourAura="scotoma",Object.assign(d.style,{position:"absolute",inset:"0",pointerEvents:"none",backdropFilter:"blur(9px) contrast(0.8) brightness(1.08)",webkitBackdropFilter:"blur(9px) contrast(0.8) brightness(1.08)",background:"rgba(236,236,236,0.28)"}),t.appendChild(d);let o=e.createElement("canvas");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourAura="canvas",Object.assign(o.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none"}),t.appendChild(o);let i=o.getContext("2d"),c=0,h=0,y={x:r.innerWidth/2,y:r.innerHeight/2},f={x:y.x,y:y.y},u=0,k=0,w=0,E=()=>{c=r.innerWidth,h=r.innerHeight;let a=Math.min(2,r.devicePixelRatio||1);o.width=Math.round(c*a),o.height=Math.round(h*a),i.setTransform(a,0,0,a,0,0)},C=(a,s)=>{let x=l=>`M ${H(f.x+l)} ${H(f.y)} A ${H(l)} ${H(l)} 0 1 0 ${H(f.x-l)} ${H(f.y)} A ${H(l)} ${H(l)} 0 1 0 ${H(f.x+l)} ${H(f.y)} Z`;return`path(evenodd, '${x(s)} ${x(a)}')`},M=(a,s,x,l,S,D)=>{if(a<=s)return;let q=Math.max(12,Math.round(a*_e/(s*1.05)));q%2&&(q+=1);let N=[];for(let O=0;O<q;O++){let _=_e*O/q,te=.72+.28*Math.sin(3*_+D*.35)*Math.cos(5*_-D*.2),U=a+(O%2?s:-s)*te;N.push([f.x+Math.cos(_)*U,f.y+Math.sin(_)*U])}N.push(N[0]);let z=1.1+s*.07;i.save(),i.lineJoin="miter",i.lineCap="round",i.globalAlpha=x*S*.5,i.strokeStyle="rgba(255,255,255,0.7)",i.lineWidth=z*2.6,i.beginPath(),i.moveTo(N[0][0],N[0][1]);for(let O=1;O<N.length;O++)i.lineTo(N[O][0],N[O][1]);i.stroke(),i.globalAlpha=x*S,i.lineWidth=z;for(let O=0;O<q;O++)i.strokeStyle=qe[(O+l)%qe.length],i.beginPath(),i.moveTo(N[O][0],N[O][1]),i.lineTo(N[O+1][0],N[O+1][1]),i.stroke();i.restore()},R=(a,s)=>{i.clearRect(0,0,c,h);let l=10+(.34*Math.min(c,h)-10)*(1-Math.exp(-a/9))*(1+.02*Math.sin(a*.7)),S=3+l*.06,D=Math.min(1,a/2);d.style.opacity=D.toFixed(2),d.style.clipPath=C(l*.5,l+S*.4),M(l,S,1,s,D,a),M(l-S*1.9,S*.7,.6,s+4,D,a),M(l-S*3.6,S*.45,.3,s+7,D,a)},T=a=>{w=r.requestAnimationFrame(T);let s=k?Math.min(.05,(a-k)/1e3):0;k=a,u||(u=a),f.x+=(y.x-f.x)*Math.min(1,s*14),f.y+=(y.y-f.y)*Math.min(1,s*14);let x=(a-u)/1e3;R(x,Math.floor(x*2.5))},L=()=>{f.x=y.x,f.y=y.y,R(45,0)},v=a=>{a.pointerType!=="touch"&&(y.x=a.clientX,y.y=a.clientY,p&&L())},g=a=>{let s=a.touches[0];s&&(y.x=s.clientX,y.y=s.clientY,p&&L())},n=()=>{E(),p&&L()};return E(),r.addEventListener("resize",n),e.addEventListener("pointermove",v,{passive:!0}),e.addEventListener("touchmove",g,{passive:!0}),p?L():w=r.requestAnimationFrame(T),{stop(){w&&r.cancelAnimationFrame(w),w=0,r.removeEventListener("resize",n),e.removeEventListener("pointermove",v),e.removeEventListener("touchmove",g),o.remove(),d.remove()}}}function He(e,t){let r=e.defaultView,p=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,d={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="screen",t.style.overflow="hidden";let o=e.createElement("div");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourReflection="room",Object.assign(o.style,{position:"absolute",inset:"-20%",pointerEvents:"none",background:"radial-gradient(ellipse 30% 38% at 74% 16%, rgba(255,249,236,0.4), rgba(255,249,236,0.13) 42%, rgba(255,249,236,0) 72%), radial-gradient(ellipse 55% 26% at 18% 92%, rgba(255,255,255,0.1), rgba(255,255,255,0) 70%)",willChange:"transform"}),t.appendChild(o);let i=e.createElement("video");i.setAttribute("aria-hidden","true"),i.dataset.pourAudit="filter",i.dataset.pourReflection="camera",i.muted=!0,i.playsInline=!0,i.autoplay=!0,Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"cover",transform:"scaleX(-1)",opacity:String(.2),filter:"blur(0.9px) contrast(1.05)",pointerEvents:"none"}),t.appendChild(i);let c=null,h=0,y=C=>{c=e.createElement("div"),c.dataset.pourAudit="filter",c.dataset.pourReflection="note",c.setAttribute("role","status"),c.textContent=C,Object.assign(c.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(420px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(c),h=r.setTimeout(()=>{c?.remove(),c=null},7e3)},f=null,u=!1,k=r.navigator?.mediaDevices;k?.getUserMedia?k.getUserMedia({video:{facingMode:"user",width:{ideal:1280},height:{ideal:720}},audio:!1}).then(C=>{if(u){for(let M of C.getTracks())M.stop();return}f=C,i.srcObject=C,i.play().catch(()=>{})}).catch(()=>{u||y("Camera not available here, so the room light is shown without your reflection.")}):y("This page cannot use the camera (it needs a secure page), so the room light is shown without your reflection.");let w=0,E=C=>{w=r.requestAnimationFrame(E);let M=C/1e3;o.style.transform=`translate3d(${(Math.sin(M*.11)*14).toFixed(1)}px, ${(Math.cos(M*.083)*9).toFixed(1)}px, 0)`};return p||(w=r.requestAnimationFrame(E)),{stop(){if(u=!0,w&&r.cancelAnimationFrame(w),w=0,h&&r.clearTimeout(h),c?.remove(),c=null,f)for(let C of f.getTracks())C.stop();f=null,i.srcObject=null,i.remove(),o.remove(),t.style.mixBlendMode=d.mixBlendMode,t.style.overflow=d.overflow}}}var Ge={aquatic:{scheme:"dark",canvas:"#202020",canvasText:"#FFFFFF",linkText:"#75E9FC",grayText:"#A6A6A6",highlight:"#8EE3F0",highlightText:"#263B50",buttonFace:"#202020",buttonText:"#FFFFFF"}},F=":not([data-pour-audit]):not([data-pour-audit] *):not([data-pour-fc-keep])",Ye=["data-pour-fc-bg","data-pour-fc-bgimg","data-pour-fc-before","data-pour-fc-after","data-pour-fc-keep"],Jt='script, style, noscript, template, textarea, option, select, title, svg, math, [data-pour-audit], [contenteditable]:not([contenteditable="false"])',Ke='button, input[type="button"], input[type="submit"], input[type="reset"]',Ue="input, textarea, select";function Zt(e){return`
html${F} { background-color: ${e.canvas} !important; color: ${e.canvasText} !important; color-scheme: ${e.scheme} !important; }
*${F}, *${F}::before, *${F}::after {
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
a${F}[href] { color: ${e.linkText} !important; }
${Ke.split(", ").map(t=>`${t}${F}`).join(", ")} { color: ${e.buttonText} !important; }
${Ue.split(", ").map(t=>`${t}${F}`).join(", ")} { color: ${e.canvasText} !important; }
[data-pour-fc-bg="canvas"]${F} { background-color: ${e.canvas} !important; }
[data-pour-fc-bg="button"]${F} { background-color: ${e.buttonFace} !important; }
[data-pour-fc-bg="field"]${F} { background-color: ${e.canvas} !important; }
[data-pour-fc-bg="highlight"]${F} { background-color: ${e.highlight} !important; color: ${e.highlightText} !important; }
[data-pour-fc-plate]${F} { background-color: ${e.canvas} !important; box-shadow: 0 0 0 2px ${e.canvas} !important; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
[data-pour-fc-bg="highlight"] [data-pour-fc-plate]${F} { background-color: ${e.highlight} !important; box-shadow: 0 0 0 2px ${e.highlight} !important; }
[data-pour-fc-bg="button"] [data-pour-fc-plate]${F} { background-color: ${e.buttonFace} !important; box-shadow: 0 0 0 2px ${e.buttonFace} !important; }
[data-pour-fc-bgimg]${F} { background-image: none !important; }
[data-pour-fc-before]${F}::before { background-color: ${e.canvas} !important; background-image: none !important; }
[data-pour-fc-after]${F}::after { background-color: ${e.canvas} !important; background-image: none !important; }
*${F}:disabled, *${F}[aria-disabled="true"], *${F}:disabled *, *${F}[aria-disabled="true"] * { color: ${e.grayText} !important; border-color: ${e.grayText} !important; }
*${F}::placeholder { color: ${e.grayText} !important; }
*${F}::selection, *${F}::-moz-selection { background-color: ${e.highlight} !important; color: ${e.highlightText} !important; }
`}function Xe(e){if(!e||e==="transparent")return 0;let t=/^rgba?\(\s*[\d.]+\s*,?\s*[\d.]+\s*,?\s*[\d.]+\s*(?:[,/]\s*([\d.]+%?))?\s*\)$/i.exec(e);return!t||t[1]===void 0?1:t[1].endsWith("%")?parseFloat(t[1])/100:parseFloat(t[1])}function Je(e,{theme:t="aquatic"}={}){let r=e.defaultView,p=Ge[t]||Ge.aquatic,d=!1,o=e.createElement("style");o.id="pour-forced-colours-page",o.dataset.pourAudit="filter";let i=e.createElement("style");i.id="pour-forced-colours",i.dataset.pourAudit="filter",i.textContent=Zt(p),e.head.appendChild(o),e.head.appendChild(i);let c=n=>n.closest("[data-pour-audit]"),h=n=>{if(n.namespaceURI!=="http://www.w3.org/1999/xhtml"||c(n)||n.hasAttribute("data-pour-fc-plate"))return;let a=r.getComputedStyle(n);if(a.forcedColorAdjust==="none"){n.setAttribute("data-pour-fc-keep","");return}n.matches("mark")?n.setAttribute("data-pour-fc-bg","highlight"):Xe(a.backgroundColor)>0?n.setAttribute("data-pour-fc-bg",n.matches(Ke)?"button":n.matches(Ue)?"field":"canvas"):n.removeAttribute("data-pour-fc-bg"),a.backgroundImage.includes("gradient(")?n.setAttribute("data-pour-fc-bgimg",""):n.removeAttribute("data-pour-fc-bgimg");for(let[s,x]of[["::before","data-pour-fc-before"],["::after","data-pour-fc-after"]]){let l=r.getComputedStyle(n,s);l.content!=="none"&&l.content!=="normal"&&(Xe(l.backgroundColor)>0||l.backgroundImage.includes("gradient("))?n.setAttribute(x,""):n.removeAttribute(x)}},y=n=>{if(n.nodeType!==1||n.namespaceURI!=="http://www.w3.org/1999/xhtml")return;let a=e.createTreeWalker(n,r.NodeFilter.SHOW_TEXT),s=[];for(;a.nextNode();)s.push(a.currentNode);for(let x of s){if(!x.textContent.trim())continue;let l=x.parentElement;if(!l||l.namespaceURI!=="http://www.w3.org/1999/xhtml"||l.hasAttribute("data-pour-fc-plate")||l.closest(Jt))continue;let S=e.createElement("span");S.setAttribute("data-pour-fc-plate",""),l.replaceChild(S,x),S.appendChild(x)}},f=()=>{let n=e.querySelectorAll("[data-pour-fc-plate]");for(let a of n)a.replaceWith(...a.childNodes);n.length&&e.body.normalize()},u=n=>{if(n.nodeType===1){h(n);for(let a of n.querySelectorAll("*"))h(a);y(n)}},k=new Set,w=0,E=()=>{w=0;let n=[...k];k.clear();for(let a of n)a.isConnected&&u(a)},C=new r.MutationObserver(n=>{for(let a of n)if(a.type==="childList")for(let s of a.addedNodes)s.nodeType===1&&!s.hasAttribute("data-pour-fc-plate")&&k.add(s);else a.target.nodeType===1&&k.add(a.target);k.size&&!w&&(w=r.requestAnimationFrame(E))});u(e.body),C.observe(e.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class","style","disabled","aria-disabled","open","hidden"]});let M=/forced-colors\s*:\s*active|-ms-high-contrast\s*:\s*active/i,R=[],T=[],L=(n,a)=>{for(let s of n){let x=s.conditionText??s.media?.mediaText??"";if(s.media!==void 0&&s.cssRules!==void 0&&!a&&M.test(x)){L(s.cssRules,!0);continue}if(s.styleSheet){try{L(s.styleSheet.cssRules,a)}catch{}continue}if(a){R.push(s.cssText),s.style&&s.selectorText&&s.style.getPropertyValue("forced-color-adjust").trim()==="none"&&T.push(s.selectorText);continue}s.cssRules&&L(s.cssRules,!1)}},v=()=>{if(!d){o.textContent=R.join(`
`);for(let n of T){let a=[];try{a=e.querySelectorAll(n)}catch{continue}for(let s of a)c(s)||s.setAttribute("data-pour-fc-keep","")}}},g=[];for(let n of e.styleSheets)if(!n.ownerNode?.dataset?.pourAudit)try{L(n.cssRules,!1)}catch{if(!n.href||typeof r.CSSStyleSheet!="function")continue;g.push(r.fetch(n.href,{mode:"cors"}).then(a=>a.ok?a.text():"").then(a=>{if(!a||d)return;let s=new r.CSSStyleSheet;s.replaceSync(a),L(s.cssRules,!1)}).catch(()=>{}))}return v(),g.length&&Promise.all(g).then(v),{stop(){d=!0,C.disconnect(),w&&r.cancelAnimationFrame(w),w=0,k.clear(),f(),i.remove(),o.remove();for(let n of e.querySelectorAll(Ye.map(a=>`[${a}]`).join(",")))for(let a of Ye)n.removeAttribute(a)}}}var ve="http://www.w3.org/2000/svg",Ze="pour-lens-filter";function Qt(e,{radius:t,ring:r,scale:p,magnify:d}){let o=t+r,i=(o+2)*2,c=i/2,h=e.createElement("canvas");h.width=i,h.height=i;let y=h.getContext("2d"),f=y.createImageData(i,i),u=f.data,k=t/d;for(let w=0;w<i;w++)for(let E=0;E<i;E++){let C=E+.5-c,M=w+.5-c,R=Math.hypot(C,M),T=R;if(R<t)T=R/d;else if(R<o){let a=(R-t)/r,s=a*a*(3-2*a);T=k+(o-k)*s}let L=R>0?T/R-1:0,v=L*C,g=L*M,n=(w*i+E)*4;u[n]=Math.max(0,Math.min(255,Math.round(127.5+v/p*255))),u[n+1]=Math.max(0,Math.min(255,Math.round(127.5+g/p*255))),u[n+2]=0,u[n+3]=Math.round(255*Math.max(0,Math.min(1,(o+2-R)/2)))}return y.putImageData(f,0,0),{href:h.toDataURL("image/png"),size:i}}function Qe(e,{scale:t=2,radius:r=110,ring:p=60,point:d,target:o}){let i=e.defaultView,c=o||e.documentElement,h=Math.ceil(2*r*(1-1/t)*1.05),y=Qt(e,{radius:r,ring:p,scale:h,magnify:t}),f=e.createElementNS(ve,"svg");f.setAttribute("width","0"),f.setAttribute("height","0"),f.setAttribute("aria-hidden","true"),f.setAttribute("focusable","false"),f.dataset.pourAudit="filter",f.dataset.pourLens="defs",Object.assign(f.style,{position:"absolute",pointerEvents:"none"});let u=e.createElementNS(ve,"filter");u.setAttribute("id",Ze),u.setAttribute("filterUnits","userSpaceOnUse"),u.setAttribute("primitiveUnits","userSpaceOnUse"),u.setAttribute("x","0"),u.setAttribute("y","0"),u.setAttribute("width","100%"),u.setAttribute("height","100%"),u.setAttribute("color-interpolation-filters","sRGB");let k=(s,x)=>{let l=e.createElementNS(ve,s);for(let[S,D]of Object.entries(x))l.setAttribute(S,String(D));return l},w={width:y.size,height:y.size},E=k("feImage",{href:y.href,preserveAspectRatio:"none",result:"map",...w}),C=k("feDisplacementMap",{in:"SourceGraphic",in2:"map",scale:h,xChannelSelector:"R",yChannelSelector:"G",result:"lens",...w}),M=k("feComposite",{in:"lens",in2:"map",operator:"in",result:"cut",...w}),R=k("feComposite",{in:"SourceGraphic",in2:"map",operator:"out",result:"rest"}),T=k("feComposite",{in:"cut",in2:"rest",operator:"over"}),L=[E,C,M];for(let s of[E,C,M,R,T])u.appendChild(s);f.appendChild(u),e.body.appendChild(f);let v=c.style.filter;c.style.filter=`url(#${Ze})`;let g="",n=0,a=()=>{n=i.requestAnimationFrame(a);let s=d(),x=c.getBoundingClientRect(),l=Math.round(s.x-x.left-y.size/2),S=Math.round(s.y-x.top-y.size/2),D=`${l},${S}`;if(D!==g){g=D;for(let q of L)q.setAttribute("x",String(l)),q.setAttribute("y",String(S))}};return n=i.requestAnimationFrame(a),{stop(){n&&i.cancelAnimationFrame(n),n=0,c.style.filter=v,f.remove()}}}var et=`/* Overlay styles for the vision & sensory filters \u2014 ported from
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
`;function tt(e=document){let t=e.defaultView,r=e.documentElement,p=ee(e),d=Pe(e,p),o=null,i=null,c=null,h=null,y=null,f=null,u="none",k="none",w=0,E=0,C=0,M=0,R=null;function T(){if(e.getElementById("pour-filter-styles"))return;let b=e.createElement("style");b.id="pour-filter-styles",b.dataset.pourAudit="filter",b.textContent=et,e.head.appendChild(b)}function L(){if(e.getElementById("pour-vision-filter-defs"))return;let b="http://www.w3.org/2000/svg",m=e.createElementNS(b,"svg");m.setAttribute("id","pour-vision-filter-defs"),m.setAttribute("width","0"),m.setAttribute("height","0"),m.setAttribute("focusable","false"),m.setAttribute("aria-hidden","true"),m.dataset.pourAudit="filter",m.style.position="absolute",m.style.pointerEvents="none";let A=e.createElementNS(b,"defs");for(let[j,B]of Object.entries(de)){let I=e.createElementNS(b,"filter");I.setAttribute("id",`pour-vision-filter-${j}`),I.setAttribute("color-interpolation-filters","linearRGB");let $=e.createElementNS(b,"feColorMatrix");$.setAttribute("type","matrix"),$.setAttribute("values",B),I.appendChild($),A.appendChild(I)}m.appendChild(A),e.body.appendChild(m)}let v=b=>{let m=e.createElement("div");return m.className=b,m.dataset.pourAudit="filter",e.body.appendChild(m),m};function g(){C=0,r.style.setProperty("--pour-vision-x",`${w}px`),r.style.setProperty("--pour-vision-y",`${E}px`),r.style.setProperty("--pour-vision-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function n(b){w=b.clientX,E=b.clientY,C||(C=t.requestAnimationFrame(g))}function a(b){let m=b.touches[0];m&&n(m)}function s(b){for(let A of ue)r.classList.remove(`pour-vision-filter-${A}`);if(me.has(u)&&(e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",a)),i?.stop(),i=null,c?.stop(),c=null,h?.stop(),h=null,o?.remove(),o=null,u=X[b]!==void 0?b:"none",u==="none"){k==="none"&&(r.style.filter="");return}k!=="none"&&le("none"),T(),L();let m=X[u]||"none";r.style.filter=m==="none"?"":m,ue.has(u)&&(r.classList.add(`pour-vision-filter-${u}`),o=v("pour-vision-filter-overlay"),o.dataset.filter=u,u==="floaters"&&(i=Ve(e,o)),u==="migraineAura"&&(c=We(e,o)),u==="glossyScreen"&&(h=He(e,o))),me.has(u)&&(w=t.innerWidth/2,E=t.innerHeight/2,g(),e.addEventListener("mousemove",n),e.addEventListener("touchmove",a,{passive:!0}))}function x(){M=0,r.style.setProperty("--pour-sensory-x",`${w}px`),r.style.setProperty("--pour-sensory-y",`${E}px`),r.style.setProperty("--pour-sensory-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function l(b){w=b.clientX,E=b.clientY,M||(M=t.requestAnimationFrame(x))}function S(b){let m=b.touches[0];m&&l(m)}function D(b){if(e.getElementById("pour-sensory-injected-style")?.remove(),!b)return;let m=e.createElement("style");m.id="pour-sensory-injected-style",m.dataset.pourAudit="filter",m.textContent=b,e.head.appendChild(m)}function q(){if(e.querySelector(".pour-sensory-washout-char"))return;let b=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null),m=[];for(;b.nextNode();)m.push(b.currentNode);for(let A of m){let j=A.textContent;if(!j.trim())continue;let B=A.parentElement;if(!B||B.closest("script,style,noscript,[data-pour-audit]"))continue;let I=e.createDocumentFragment();for(let $ of j)if($===" "||$===`
`||$==="	")I.appendChild(e.createTextNode($));else{let W=e.createElement("span");W.textContent=$,W.style.opacity=(.3+Math.random()*.7).toFixed(2),W.className="pour-sensory-washout-char",I.appendChild(W)}B.replaceChild(I,A)}}function N(){for(let b of e.querySelectorAll(".pour-sensory-washout-char"))b.replaceWith(b.textContent);e.body.normalize()}let z=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],O=new Map,_=0,te=0,U=null,xe=0,ke=0,re=0,ae=0,J=0,oe=0;function it(b,m,A){let j=`${b}:${m}:${A}`,B=O.get(j);if(B)return B;let I=e.createElement("canvas");I.width=b,I.height=b;let $=I.getContext("2d");if(!$)return"auto";let W=Math.round(b/2);$.save(),$.translate(W+m,W+A),$.scale(1.15,1.15),$.beginPath(),$.moveTo(z[0][0],z[0][1]);for(let Y=1;Y<z.length;Y++)$.lineTo(z[Y][0],z[Y][1]);$.closePath(),$.restore(),$.lineWidth=3,$.lineJoin="round",$.strokeStyle="#fff",$.stroke(),$.fillStyle="#000",$.fill();let G=`url("${I.toDataURL("image/png")}") ${W} ${W}, auto`;return O.set(j,G),G}function we(b){let m=b.timeStamp||Date.now(),A=m-re;if(re&&A>0){let j=Math.hypot(b.clientX-xe,b.clientY-ke);ae=ae*.8+j/A*1e3*.2}xe=b.clientX,ke=b.clientY,re=m}function st(b,m){if(!J)return J=b+m.minGap+Math.random()*(m.maxGap-m.minGap),[0,0];let A=b-J;if(A<0)return[0,0];if(A>m.dur)return J=b+m.minGap+Math.random()*(m.maxGap-m.minGap),oe=Math.random()*Math.PI*2,[0,0];let j=1-A/m.dur,B=m.size*j*j;return[Math.cos(oe)*B,Math.sin(oe)*B]}function Se(b){_=t.requestAnimationFrame(Se);let m=U;if(!m)return;let A=(b-te)/1e3,j=0,B=0;if(m.freq&&m.amp){let G=2*Math.PI*m.freq,Y=Math.max(0,1+(m.intent||0)*Math.min(1,ae/700)),Re=m.amp*Y;j+=(Math.sin(G*A)*.7+Math.sin(G*1.63*A+1.1)*.3)*Re,B+=(Math.cos(G*.97*A+.6)*.7+Math.sin(G*2.11*A+2.3)*.3)*Re}if(m.spasm){let[G,Y]=st(b,m.spasm);j+=G,B+=Y}let I=m.bitmap/2-14,$=Math.max(-I,Math.min(I,Math.round(j))),W=Math.max(-I,Math.min(I,Math.round(B)));r.style.cursor=it(m.bitmap,$,W)}function lt(b){Ae(),U=b,te=t.performance?t.performance.now():Date.now(),ae=0,re=0,J=0,oe=Math.random()*Math.PI*2,Te(b.hide?`
      html, :not(html) { cursor: none !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `:`
      :not(html) { cursor: inherit !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `),!b.hide&&(e.addEventListener("mousemove",we,{passive:!0}),_=t.requestAnimationFrame(Se))}function Ae(){_&&t.cancelAnimationFrame(_),_=0,U=null,J=0,e.removeEventListener("mousemove",we),Te(null),r.style.cursor=""}function Te(b){if(e.getElementById("pour-sensory-cursor-style")?.remove(),!b)return;let m=e.createElement("style");m.id="pour-sensory-cursor-style",m.dataset.pourAudit="filter",m.textContent=b,e.head.appendChild(m)}function pt(){Ee();let b=()=>{R=t.setTimeout(()=>{f&&(f.classList.add("pour-sensory-spike-flash"),t.setTimeout(()=>{f?.classList.remove("pour-sensory-spike-flash"),b()},150))},3e3+Math.random()*8e3)};b()}function Ee(){R&&(t.clearTimeout(R),R=null)}function le(b){let m=Q[k];if(m?.overlay&&r.classList.remove(`pour-sensory-filter-${k}`),m?.hostClass&&r.classList.remove(m.hostClass),m?.mouseTracked&&(e.removeEventListener("mousemove",l),e.removeEventListener("touchmove",S)),m?.injectScript&&N(),m?.cursorJitter&&Ae(),m?.viewportOrigin&&dt(),m?.loupe&&Le(),m?.lens&&d[m.lens]?.remove(),y?.stop(),y=null,Ee(),f?.remove(),f=null,D(null),k=Q[b]?b:"none",k==="none"){u==="none"&&(r.style.filter="");return}u!=="none"&&s("none"),T();let A=Q[k];r.style.filter=A.css&&A.css!=="none"?A.css:"",A.hostClass&&r.classList.add(A.hostClass),(A.overlay||A.mouseTracked||k==="sensorySpike")&&(f=v("pour-sensory-filter-overlay"),f.dataset.filter=k,A.overlay&&r.classList.add(`pour-sensory-filter-${k}`)),A.mouseTracked&&(w=t.innerWidth/2,E=t.innerHeight/2,x(),e.addEventListener("mousemove",l),e.addEventListener("touchmove",S,{passive:!0})),A.injectCSS&&D(A.injectCSS),k==="sensorySpike"&&pt(),A.injectScript&&q(),A.cursorJitter&&lt(A.cursorJitter),A.viewportOrigin&&ct(),A.loupe&&ut(A.loupe),A.lens&&d[A.lens]?.apply(),A.forcedColours&&(y=Je(e))}let Z=0;function Ce(){Z=0,r.style.setProperty("--pour-motion-origin",`${t.scrollX+t.innerWidth/2}px ${t.scrollY+t.innerHeight/2}px`)}function ne(){Z||(Z=t.requestAnimationFrame(Ce))}function ct(){Ce(),t.addEventListener("scroll",ne,{passive:!0}),t.addEventListener("resize",ne)}function dt(){t.removeEventListener("scroll",ne),t.removeEventListener("resize",ne),Z&&(t.cancelAnimationFrame(Z),Z=0),r.style.removeProperty("--pour-motion-origin")}let pe=null;function ut(b){Le(),pe=Qe(e,{...b,point:()=>({x:w,y:E})})}function Le(){pe?.stop(),pe=null}let mt=()=>({vision:u,sensory:k});function ft(){s("none"),le("none")}return{applyVision:s,applySensory:le,clear:ft,state:mt}}var tr=new Set(["text","search","url","tel","email","password","number","date","datetime-local","month","time","week",""]),rr=new Set(["input","select","textarea","button","meter","output","progress"]);function at(e){return se(e,!1,!1,new Set)}function ot(e){for(let r=e;r;r=he(r))if(r.getAttribute?.("aria-hidden")==="true"||getComputedStyle(r).display==="none")return!0;let t=getComputedStyle(e).visibility;return t==="hidden"||t==="collapse"}function ar(e,t){let r=e.getAttribute?.("aria-labelledby");if(!r)return null;let p=e.getRootNode(),d=r.split(/\s+/).filter(Boolean).map(o=>p.getElementById?.(o)).filter(Boolean);return d.length?d.map(o=>{let i=new Set(t);return o===e&&i.delete(e),se(o,!0,ot(o),i)}).join(" ").replace(/\s+/g," ").trim():null}function se(e,t,r,p){if(p.has(e))return"";if(p.add(e),!t){let c=ar(e,p);if(c)return c}let d=e.getAttribute("aria-label")?.trim();if(d)return d;let o=e.tagName.toLowerCase();if(o==="img"||o==="area"){let c=e.getAttribute("alt")?.trim();if(c)return c}if(rr.has(o)&&e.labels?.length){let c=[...e.labels].map(h=>se(h,t,ot(h),p)).join(" ").trim();if(c)return c}if(o==="input"||o==="select"||o==="textarea"){if(e.type==="submit"||e.type==="reset"||e.type==="button"){let c=(e.value??e.getAttribute("value")??"").trim();if(c)return c}if(e.type==="image"){let c=e.getAttribute("alt")?.trim();if(c)return c}if(t&&(o==="textarea"||tr.has(e.type))){let c=(e.value??"").trim();if(c)return c}if(e.type==="submit")return"Submit";if(e.type==="reset")return"Reset"}let i=or(e,r,t,p).replace(/\s+/g," ").trim();return i||(e.getAttribute("title")??e.getAttribute("placeholder")??"").trim()}function or(e,t,r,p){let d=e.shadowRoot?e.shadowRoot.childNodes:e.childNodes;return rt(e,"::before",t)+nt(d,t,r,p)+rt(e,"::after",t)}function rt(e,t,r){let p=getComputedStyle(e,t);if(!r&&(p.display==="none"||p.visibility==="hidden"||p.visibility==="collapse"))return"";let d=p.content;if(!d||d==="none"||d==="normal")return"";let o=d.match(/\/\s*"((?:[^"\\]|\\.)*)"\s*$/);if(o)return o[1].replace(/\\(.)/g,"$1");let i=d.match(/^"((?:[^"\\]|\\.)*)"$/);return i?i[1].replace(/\\(.)/g,"$1"):""}function nt(e,t,r,p){let d="";for(let o of e){if(o.nodeType===3){d+=o.textContent;continue}if(o.nodeType!==1)continue;let i=o.tagName.toLowerCase();if(i==="script"||i==="style"||i==="noscript"||i==="template")continue;if(!t){if(o.getAttribute("aria-hidden")==="true")continue;let h=getComputedStyle(o);if(h.display==="none"||h.visibility==="hidden"||h.visibility==="collapse")continue}if(i==="slot"){let h=o.assignedNodes?.()??[];d+=nt(h.length?h:o.childNodes,t,r,p);continue}if((i==="img"||i==="area")&&o.getAttribute("alt")===""&&!o.getAttribute("aria-label")?.trim()&&!o.getAttribute("aria-labelledby"))continue;let c=se(o,r,t,p);d+=i==="img"||i==="area"||o.hasAttribute("aria-label")||o.hasAttribute("aria-labelledby")?` ${c} `:c}return d}return xt(nr);})();
