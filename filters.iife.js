/*! pour filters | MIT | https://pour.dev */
var PourFilters=(()=>{var fe=Object.defineProperty;var bt=Object.getOwnPropertyDescriptor;var yt=Object.getOwnPropertyNames;var vt=Object.prototype.hasOwnProperty;var xt=(e,t)=>{for(var r in t)fe(e,r,{get:t[r],enumerable:!0})},kt=(e,t,r,p)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of yt(t))!vt.call(e,c)&&c!==r&&fe(e,c,{get:()=>t[c],enumerable:!(p=bt(t,c))||p.enumerable});return e};var wt=e=>kt(fe({},"__esModule",{value:!0}),e);var ir={};xt(ir,{CSS_FILTERS:()=>K,MODE_LABELS:()=>ye,SENSORY_FILTERS:()=>te,accessibleName:()=>nt,createFilterApplier:()=>at,createLensKit:()=>re,cssPath:()=>Ie});var he={protanopia:"0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0 0 0 0 1 0",deuteranopia:"0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047414 0 0 -0.011820 0.042940 0.968881 0 0 0 0 0 1 0",tritanopia:"1.255528 -0.076749 -0.178779 0 0 -0.078411 0.930809 0.147602 0 0 0.004733 0.691367 0.303900 0 0 0 0 0 1 0",achromatopsia:"0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0 0 0 1 0",protanomaly:"0.458064 0.679578 -0.137642 0 0 0.092785 0.846313 0.060902 0 0 -0.007494 -0.016807 1.024301 0 0 0 0 0 1 0",deuteranomaly:"0.547494 0.607765 -0.155259 0 0 0.181692 0.781742 0.036566 0 0 -0.010410 0.027275 0.983136 0 0 0 0 0 1 0",tritanomaly:"1.057047 -0.029507 -0.027540 0 0 -0.039014 0.966028 0.072986 0 0 0.002584 0.220200 0.777216 0 0 0 0 0 1 0"},St={protanopia:"saturate(0.25) sepia(0.5) hue-rotate(-15deg)",deuteranopia:"saturate(0.3) sepia(0.4) hue-rotate(-10deg)",tritanopia:"saturate(0.35) sepia(0.3) hue-rotate(50deg)",achromatopsia:"grayscale(100%)",protanomaly:"saturate(0.6) sepia(0.25) hue-rotate(-8deg)",deuteranomaly:"saturate(0.65) sepia(0.2) hue-rotate(-5deg)",tritanomaly:"saturate(0.7) sepia(0.15) hue-rotate(25deg)"},ge=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge","diabeticRetinopathy","floaters","migraineAura","glossyScreen","nystagmus","hemianopiaLeft","hemianopiaRight","amblyopia"]),be=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge"]),K={none:"none",cataract:"sepia(0.3) contrast(0.9) saturate(0.9) brightness(0.95) blur(0.6px)",presbyopia:"blur(0.5px) contrast(0.92)",lowAcuityMild:"blur(0.7px)",lowAcuity:"blur(1.2px)",lowAcuityStrong:"blur(2.5px)",lowAcuityHeavy:"blur(5px)",lowLight:"brightness(0.65) contrast(0.9) saturate(0.85) hue-rotate(-8deg)",lowContrast:"contrast(0.7)",retinitisRing:"none",glaucoma:"none",glaucomaLarge:"none",macularDegeneration:"none",macularDegenerationLarge:"none",diabeticRetinopathy:"none",floaters:"none",migraineAura:"none",glossyScreen:"none",nystagmus:"none",hemianopiaLeft:"none",hemianopiaRight:"none",amblyopia:"none",scotopicRose:"sepia(0.15) hue-rotate(330deg) saturate(1.2) brightness(1.05)",scotopicYellow:"sepia(0.3) saturate(1.15) brightness(1.05)",scotopicAqua:"sepia(0.2) hue-rotate(160deg) saturate(1.15) brightness(1.02)"},At=typeof navigator<"u"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Tt=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),Et=At||Tt;Object.keys(he).forEach(e=>{Et?K[e]=St[e]:K[e]=`url(#pour-vision-filter-${e})`});var Lt=[{label:"Color vision",options:[{value:"deuteranomaly",added:"2026-07-30",name:"Green Weak (Deuteranomaly)",stat:"~5% of men",description:"Green-sensitive cones respond off-target, so greens, reds and browns crowd together. The most common colour vision difference.",label:"Green Weak - Deuteranomaly - ~5% of men"},{value:"protanomaly",added:"2026-07-30",name:"Red Weak (Protanomaly)",stat:"~1% of men",description:"Red-sensitive cones respond weakly: reds dim and drift towards green.",label:"Red Weak - Protanomaly - ~1% of men"},{value:"protanopia",added:"2026-07-30",name:"Red Absent (Protanopia)",stat:"~1% of men",description:"Red light barely registers \u2014 reds darken and sink into the greens around them.",label:"Red Absent - Protanopia - ~1% of men"},{value:"deuteranopia",added:"2026-07-30",name:"Green Absent (Deuteranopia)",stat:"~1% of men",description:"No working green cones: red and green become the same family of murky ochre.",label:"Green Absent - Deuteranopia - ~1% of men"},{value:"tritanomaly",added:"2026-07-30",name:"Blue Weak (Tritanomaly)",stat:"<0.2%",description:"Blue-sensitive cones respond weakly: blues and greens blur together, yellows go pale.",label:"Blue Weak - Tritanomaly - <0.2%"},{value:"tritanopia",added:"2026-07-30",name:"Blue Absent (Tritanopia)",stat:"<0.01%",description:"No working blue cones \u2014 blues read as greens, yellows as pinks and greys.",label:"Blue Absent - Tritanopia - <0.01%"},{value:"achromatopsia",added:"2026-07-30",name:"Monochromacy (Achromatopsia)",stat:"~0.003%",description:"No colour at all: brightness is the only signal left, usually with strong glare sensitivity.",label:"Monochromacy - Achromatopsia - ~0.003%"}]},{label:"Eye conditions",options:[{value:"presbyopia",added:"2026-07-30",name:"Near-Vision Loss (Presbyopia)",stat:"nearly all over 50",description:"The lens stiffens with age and close text blurs \u2014 the one condition almost everyone gets.",label:"Near-Vision Loss - Presbyopia - nearly all over 50"},{value:"glaucoma",added:"2026-07-30",name:"Tunnel Vision (Glaucoma)",stat:"~2% over 40",description:"Peripheral vision closes in until only a central window stays sharp. The window follows your pointer.",label:"Tunnel Vision - Glaucoma - ~2% over 40"},{value:"glaucomaLarge",added:"2026-07-30",name:"Tunnel Vision (Advanced Glaucoma)",stat:"~0.5% over 40",description:"Advanced glaucoma: the sharp window narrows further; everything else is gone, not blurred.",label:"Tunnel Vision (Large) - Advanced Glaucoma - ~0.5% over 40"},{value:"macularDegeneration",added:"2026-07-30",name:"Central Vision Loss (Macular Degeneration)",stat:"~8% over 45",description:"The centre of gaze fades first \u2014 precisely where you point your eyes to read.",label:"Central Vision Loss - Macular Degeneration - ~8% over 45"},{value:"macularDegenerationLarge",added:"2026-07-30",name:"Central Vision Loss (Advanced Macular Degeneration)",stat:"~1% over 50",description:"Advanced macular degeneration: a larger central blank that reading must route around.",label:"Central Vision Loss (Large) - Advanced Macular Degeneration - ~1% over 50"},{value:"diabeticRetinopathy",added:"2026-07-30",name:"Patchy Vision (Diabetic Retinopathy)",stat:"~0.8% over 40",description:"Blood-vessel damage scatters dark blotches across the view; content falls into them.",label:"Patchy Vision - Diabetic Retinopathy - ~0.8% over 40"},{value:"floaters",name:"Drifting Shadows (Floaters)",added:"2026-09-12",stat:"~33%",description:"Strands and specks in the eye cast shadows that drift and lag behind every eye movement. They show most against bright, flat areas, so a page of white space is where they live.",label:"Drifting Shadows - Floaters - ~33%"},{value:"nystagmus",added:"2026-07-30",name:"Involuntary Eye Movement (Nystagmus)",stat:"~0.2%",description:"The eyes move on their own, so the page never quite holds still.",label:"Involuntary Eye Movement - Nystagmus - ~0.2%"}]},{label:"Field of vision",options:[{value:"hemianopiaLeft",added:"2026-07-30",name:"Left Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the left half of vision in both eyes.",label:"Left Field Loss - Hemianopia (Left) - ~0.1% over 49"},{value:"hemianopiaRight",added:"2026-07-30",name:"Right Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the right half of vision in both eyes.",label:"Right Field Loss - Hemianopia (Right) - ~0.1% over 49"},{value:"retinitisRing",name:"Ring Loss (Retinitis Pigmentosa)",added:"2026-08-22",stat:"~0.025%",description:"Early retinitis pigmentosa takes a ring out of the mid-periphery, leaving a clear centre and a seeing outer rim. It narrows to a tunnel only much later, so this donut, not the tunnel, is what most of that life looks like.",label:"Ring Loss - Retinitis Pigmentosa - ~0.025%"},{value:"amblyopia",added:"2026-07-30",name:"Reduced Acuity (Amblyopia)",stat:"~2-3%",description:"One eye never learned to see sharply; fine detail and depth suffer.",label:"Reduced Acuity (One Eye) - Amblyopia - ~2-3%"},{value:"migraineAura",added:"2026-09-12",name:"Shimmering Blind Spot (Migraine Aura)",stat:"~5%",description:"A ring of shimmering zigzag light grows out from the point of gaze over half a minute and settles, with a blind band inside it, and rides with the eye. Nothing under it can be read, so anything that times out or cannot be paused and returned to is the finding. Slowed to stay under three flashes a second.",label:"Shimmering Blind Spot - Migraine Aura - ~5%"}]},{label:"Focus & acuity",options:[{value:"lowAcuityMild",added:"2026-07-30",name:"Slight Defocus",description:"Mildly uncorrected eyesight \u2014 the glasses left in the other room.",label:"Slight Defocus - Mild Blur"},{value:"lowAcuity",added:"2026-07-30",name:"Uncorrected Focus",stat:"~5-6%",description:"Moderate uncorrected short-sight: small text needs effort, thin fonts give up first.",label:"Uncorrected Focus - Moderate Blur - ~5-6%"},{value:"lowAcuityStrong",added:"2026-07-30",name:"Significant Defocus",description:"Strong blur: layout and colour still communicate, letterforms mostly do not.",label:"Significant Defocus - Strong Blur"},{value:"lowAcuityHeavy",added:"2026-07-30",name:"Severe Defocus",description:"Only shape, contrast and position survive. What does your page still say?",label:"Severe Defocus - Very Strong Blur"}]},{label:"Contrast & light",options:[{value:"cataract",added:"2026-07-30",name:"Clouded Lens (Cataract)",stat:"~17% over 40",description:"The lens clouds and yellows: glare blooms, contrast drains, whites go dingy.",label:"Clouded Lens - Cataract - ~17% over 40"},{value:"lowContrast",added:"2026-07-30",name:"Reduced Contrast",description:"Contrast sensitivity loss: faint greys sink into their backgrounds long before they vanish for you.",label:"Reduced Contrast"},{value:"lowLight",added:"2026-07-30",name:"Dim Environment",description:"A dim room, a cheap panel, a phone at night \u2014 the low-vision hours everyone has.",label:"Dim Environment - Low Light"},{value:"glossyScreen",added:"2026-09-12",name:"Glossy Screen (Reflections)",description:"The room and your own face reflect off the glass and add light to every dark pixel. White areas barely change; dark themes, grey-on-black text and low-contrast controls wash out first. Uses your camera on this device only, never recorded or sent.",label:"Glossy Screen - Reflections"}]},{label:"Visual stress",options:[{value:"scotopicRose",added:"2026-07-30",name:"Rose Tint",description:"A coloured overlay some readers use to calm pattern glare. See how your design reads through one.",label:"Rose Tint - Coloured Overlay"},{value:"scotopicYellow",added:"2026-07-30",name:"Yellow Tint",description:"A yellow reading overlay \u2014 common for visual stress. Your palette should survive it.",label:"Yellow Tint - Coloured Overlay"},{value:"scotopicAqua",added:"2026-07-30",name:"Aqua Tint",description:"An aqua reading overlay. Tinted reading is more common than most designs assume.",label:"Aqua Tint - Coloured Overlay"}]}],te={none:{label:"None",css:"none"},fluorescentFlicker:{label:"Fluorescent Flicker",overlay:"fluorescentFlicker",css:"none"},lightSensitivity:{label:"Light Sensitivity",css:"brightness(1.4) contrast(1.2) saturate(1.1)"},colourHypersensitivity:{label:"Colour Hypersensitivity",css:"saturate(2.2) contrast(1.35) brightness(1.1)"},motionSensitivity:{label:"Motion Sensitivity",hostClass:"pour-sensory-filter-motionSensitivity",viewportOrigin:!0,css:"none"},hyperfocusTunnel:{label:"Hyperfocus Tunnel (Metaphor)",overlay:"hyperfocusTunnel",mouseTracked:!0,css:"none"},attentionFragmentation:{label:"Attention Fragmentation (Metaphor)",overlay:"attentionFragmentation",css:"none"},peripheralDistraction:{label:"Peripheral Distraction",overlay:"peripheralDistraction",css:"none"},detailFixation:{label:"Detail Fixation (Metaphor)",overlay:"detailFixation",mouseTracked:!0,zoom:1.45,css:"none"},processingDelay:{label:"Processing Lag",overlay:"processingDelay",css:"none"},sensoryInterference:{label:"Sensory Interference",hostClass:"pour-sensory-filter-backgroundNoise",css:"none"},sensorySpike:{label:"Sudden Sensory Spike",overlay:"sensorySpike",css:"none"},dyslexiaVisualStress:{label:"Visual Stress (Pattern Glare)",overlay:"dyslexiaVisualStress",injectCSS:`
        body { background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.06) 22px, rgba(0,0,0,0.06) 24px) !important; background-attachment: fixed !important; }
        p, li, td, th, dd, dt, h1, h2, h3, h4, h5, h6, label { text-shadow: 0 0 1px rgba(0,0,0,0.15) !important; animation: pour-sensory-line-merge 3s ease-in-out infinite alternate !important; }
        @keyframes pour-sensory-line-merge { 0% { transform: scaleX(1) translateY(0); } 25% { transform: scaleX(1.008) translateY(0.8px); } 50% { transform: scaleX(0.993) translateY(-0.5px); } 75% { transform: scaleX(1.005) translateY(0.6px); } 100% { transform: scaleX(0.996) translateY(-0.3px); } }
      `,css:"none"},dyslexiaCrowding:{label:"Crowding Effect",injectCSS:"* { letter-spacing: -1px !important; word-spacing: -3px !important; line-height: 1.05 !important; } p, li, td, th, dd, dt, label, span, a { font-size: 95% !important; }",css:"none"},dyslexiaTrackingLoss:{label:"Tracking Loss",overlay:"dyslexiaTrackingLoss",mouseTracked:!0,css:"none"},dyslexiaWashout:{label:"Letter Instability",injectScript:!0,css:"none"},dyslexiaContrastSensitivity:{label:"Contrast Sensitivity",css:"contrast(0.8) brightness(1.1) saturate(0.9)"},handTremor:{label:"Hand Tremor",cursorJitter:{freq:6,amp:9,intent:1.6,bitmap:96},css:"none"},handTremorStrong:{label:"Hand Tremor (Strong)",cursorJitter:{freq:5,amp:18,intent:1.9,bitmap:128},css:"none"},restingTremor:{label:"Resting Tremor",cursorJitter:{freq:4.5,amp:12,intent:-.9,bitmap:96},css:"none"},ataxicDrift:{label:"Ataxic Drift",cursorJitter:{freq:.7,amp:26,intent:.8,bitmap:128},css:"none"},pointerSpasm:{label:"Sudden Jerk",cursorJitter:{freq:5,amp:3,intent:.4,bitmap:128,spasm:{minGap:2200,maxGap:6500,size:44,dur:280}},css:"none"},pointerHidden:{label:"Hidden Pointer (Keyboard Only)",cursorJitter:{hide:!0,bitmap:32},css:"none"},forcedColours:{label:"Forced Colours",forcedColours:!0,css:"none"},textSpacing:{label:"Text Spacing",injectCSS:`
        *:not([data-pour-audit]):not([data-pour-audit] *) { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
        p:not([data-pour-audit] *) { margin-bottom: 2em !important; }
      `,css:"none"},focusOrder:{label:"Focus Order",lens:"focusOrder",css:"none"},landmarkMap:{label:"Landmarks & Headings",lens:"landmarkMap",css:"none"}},Ct=[{label:"Sensory overload",options:[{value:"fluorescentFlicker",added:"2026-07-30",name:"Fluorescent Flicker",description:"The pulse of failing fluorescent light \u2014 flicker that many autistic and migraine-prone people cannot tune out.",label:"Fluorescent Flicker"},{value:"lightSensitivity",added:"2026-07-30",name:"Light Sensitivity",description:"Photophobia: ordinary brightness arrives as glare; bright themes read as pain.",label:"Light Sensitivity"},{value:"colourHypersensitivity",added:"2026-07-30",name:"Colour Hypersensitivity",description:"Saturated colour lands far louder than you sent it.",label:"Colour Hypersensitivity"},{value:"motionSensitivity",added:"2026-07-30",name:"Motion Sensitivity",stat:"~5% of adults",description:"Page motion is felt, not just seen \u2014 what autoplaying movement does to a vestibular-sensitive visitor.",label:"Motion Sensitivity"}]},{label:"Attention & focus",options:[{value:"hyperfocusTunnel",added:"2026-07-30",name:"Hyperfocus Tunnel",metaphor:!0,description:"The world outside the point of focus falls away; the page exists one region at a time.",label:"Hyperfocus Tunnel (Metaphor)"},{value:"attentionFragmentation",added:"2026-07-30",name:"Attention Fragmentation",metaphor:!0,description:"A scattered attention field \u2014 every element competes and none of them wins.",label:"Attention Fragmentation (Metaphor)"},{value:"peripheralDistraction",added:"2026-07-30",name:"Peripheral Distraction",description:"Movement at the edges keeps stealing the centre of your gaze.",label:"Peripheral Distraction"},{value:"detailFixation",added:"2026-07-30",name:"Detail Fixation",metaphor:!0,description:"Detail-first processing: the point of attention magnifies while the whole recedes.",label:"Detail Fixation (Metaphor)"}]},{label:"Processing differences",options:[{value:"processingDelay",added:"2026-07-30",name:"Processing Lag",description:"The page lands a beat late \u2014 interaction as it feels under cognitive load.",label:"Processing Lag"},{value:"sensoryInterference",added:"2026-07-30",name:"Sensory Interference",description:"Visual noise under everything, like reading in a room that will not go quiet.",label:"Sensory Interference"}]},{label:"Sensory spikes",options:[{value:"sensorySpike",added:"2026-07-30",name:"Sudden Sensory Spike",description:"Not a constant state: periodic waves of too-much, out of nowhere.",label:"Sudden Sensory Spike"}]},{label:"Dyslexia / reading",options:[{value:"dyslexiaVisualStress",added:"2026-07-30",name:"Visual Stress (Pattern Glare)",stat:"~10%",description:"Dense text shimmers and bands together; lines merge and repel.",label:"Visual Stress (Pattern Glare)"},{value:"dyslexiaCrowding",added:"2026-07-30",name:"Crowding Effect",stat:"~10%",description:"Letters and words pack too tightly to separate \u2014 spacing is doing more work than you think.",label:"Crowding Effect"},{value:"dyslexiaTrackingLoss",added:"2026-07-30",name:"Tracking Loss",stat:"~10%",description:"Losing the line mid-sentence: only the neighbourhood of your pointer holds steady.",label:"Tracking Loss"},{value:"dyslexiaWashout",added:"2026-07-30",name:"Letter Instability",stat:"~10%",description:"Some letters appear fainter than others, making words harder to read. Try reading a paragraph with the effect enabled.",label:"Letter Instability"},{value:"dyslexiaContrastSensitivity",added:"2026-07-30",name:"Contrast Sensitivity",stat:"~10%",description:"Full-contrast text tires, low-contrast text disappears; the readable band is narrow.",label:"Contrast Sensitivity"}]}],Rt=[{label:"Tremor",options:[{value:"handTremor",added:"2026-08-06",name:"Hand Tremor",stat:"~1%",description:"An essential tremor: the pointer shakes harder the more precisely you aim.",label:"Hand Tremor"},{value:"handTremorStrong",added:"2026-08-06",name:"Hand Tremor (Strong)",description:"The same tremor, stronger \u2014 small close-set targets become lotteries.",label:"Hand Tremor (Strong)"},{value:"restingTremor",added:"2026-08-06",name:"Resting Tremor",stat:"~0.3%",description:"A parkinsonian pattern: shakes at rest, steadies during deliberate movement.",label:"Resting Tremor"}]},{label:"Pointer control",options:[{value:"ataxicDrift",added:"2026-08-06",name:"Ataxic Drift",description:"The pointer drifts wide of intent; straight lines are not on offer.",label:"Ataxic Drift"},{value:"pointerSpasm",added:"2026-08-06",name:"Sudden Jerk",description:"Occasional involuntary jerks fling the pointer \u2014 sometimes mid-click.",label:"Sudden Jerk"},{value:"pointerHidden",added:"2026-08-06",name:"Hidden Pointer (Keyboard Only)",description:"No pointer at all. The keyboard is the only way through your page.",label:"Hidden Pointer (Keyboard Only)"}]}],$t=[{label:"Keyboard",options:[{value:"focusOrder",added:"2026-09-07",name:"Focus Order",description:"Numbered stops trace where Tab really goes, in order. Amber stops force their own position with a positive tabindex.",label:"Focus Order"}]},{label:"Page structure",options:[{value:"landmarkMap",added:"2026-09-07",name:"Landmarks & Headings",description:"Landmark regions tinted and named, every heading chipped with its level. Amber chips skip a level.",label:"Landmarks & Headings"}]}],Mt=[{label:"Colours",options:[{value:"forcedColours",added:"2026-09-12",name:"Forced Colours (Windows Contrast Theme)",stat:"~4% on Windows",description:"Every colour the page chose is replaced by a contrast theme\u2019s handful. Backgrounds, gradients and shadows go; borders keep their width; images and video stay, with a plate behind any text over them, as Windows draws it. Icon buttons that vanish, borderless fields and missing focus rings are the findings. An approximation: the page\u2019s own forced-colours rules are applied where its stylesheets can be read.",label:"Forced Colours (Windows Contrast Theme)"}]},{label:"Text",options:[{value:"textSpacing",added:"2026-09-12",name:"Text Spacing",description:"Line height 1.5, paragraph spacing 2, letter spacing 0.12 and word spacing 0.16 times the font size: the overrides low-vision and dyslexic readers apply, which WCAG 1.4.12 says a page must survive. Clipped labels, overflowing boxes and buttons that break are the findings.",label:"Text Spacing"}]}],ye={};for(let e of[...Lt,...Ct,...Rt,...$t,...Mt])for(let t of e.options)ye[t.value]=t.label.split(" - ")[0];function ve(e){return e.assignedSlot??e.parentElement??e.getRootNode()?.host??null}var Ne=new WeakMap,Ft=new Set;function Ot(e){let t=Ne.get(e);if(!t){let r=typeof MutationObserver=="function"?new MutationObserver(()=>{t.ids=null,t.parents=new WeakMap}):null;t={ids:null,parents:new WeakMap,observer:r},r&&(r.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["id"]}),Ft.add(r)),Ne.set(e,t)}if(t.observer?.takeRecords().length&&(t.ids=null,t.parents=new WeakMap),!t.ids){t.ids=new Map;for(let r of e.querySelectorAll("[id]"))t.ids.set(r.id,(t.ids.get(r.id)??0)+1)}return t}function Nt(e,t){let r=e.parentElement,p=t.parents.get(r);if(!p){let c=new Map;p=new WeakMap;for(let o of r.children){let i=(c.get(o.tagName)??0)+1;c.set(o.tagName,i),p.set(o,{position:i,repeated:!1})}for(let o of r.children)p.get(o).repeated=c.get(o.tagName)>1;t.parents.set(r,p)}return p.get(e)}function De(e){let t=e.getRootNode(),r=Ot(t),p=i=>i.id&&r.ids.get(i.id)===1;if(p(e))return`#${CSS.escape(e.id)}`;let c=[],o=e;for(;o&&o.nodeType===Node.ELEMENT_NODE&&o!==document.documentElement;){let i=o.tagName.toLowerCase();if(o.parentElement){let{position:u,repeated:g}=Nt(o,r);g&&(i+=`:nth-of-type(${u})`)}if(c.unshift(i),o.parentElement&&p(o.parentElement)){c.unshift(`#${CSS.escape(o.parentElement.id)}`);break}o=o.parentElement}return c.join(" > ")||e.tagName.toLowerCase()}function Ie(e){let t=De(e),r=e.getRootNode();for(;r&&r.host;)t=`${De(r.host)} >>> ${t}`,r=r.host.getRootNode();return t}var pr=typeof Element<"u"?Object.getOwnPropertyDescriptor(Element.prototype,"attributes")?.get:null;function Pe(e){for(let t=e;t;t=ve(t))if(t.nodeType===1&&t.hasAttribute("inert"))return!0;return!1}var Dt=new Set(["atomic","busy","controls","current","describedby","description","details","dropeffect","flowto","grabbed","hidden","keyshortcuts","label","labelledby","live","owns","relevant","roledescription","braillelabel","brailleroledescription"]),Be=new Set(["banner","complementary","contentinfo","form","main","navigation","region","search"]),It={link:["disabled","errormessage","expanded","haspopup","invalid"],button:["disabled","errormessage","expanded","haspopup","invalid","pressed"],checkbox:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],switch:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],radio:["checked","disabled","errormessage","haspopup","invalid","posinset","setsize"],option:["checked","disabled","errormessage","haspopup","invalid","posinset","selected","setsize"],tab:["disabled","errormessage","expanded","haspopup","invalid","posinset","selected","setsize"],menuitem:["disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemcheckbox:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemradio:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],textbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],searchbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],combobox:["activedescendant","autocomplete","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],listbox:["activedescendant","disabled","errormessage","expanded","haspopup","invalid","multiselectable","orientation","readonly","required"],slider:["disabled","errormessage","haspopup","invalid","orientation","readonly","valuemax","valuemin","valuenow","valuetext"],spinbutton:["activedescendant","disabled","errormessage","haspopup","invalid","readonly","required","valuemax","valuemin","valuenow","valuetext"],progressbar:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],meter:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],scrollbar:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],heading:["disabled","errormessage","haspopup","invalid","level"],list:["disabled","errormessage","haspopup","invalid"],listitem:["disabled","errormessage","haspopup","invalid","level","posinset","setsize"],row:["activedescendant","colindex","colindextext","disabled","errormessage","expanded","haspopup","invalid","level","posinset","rowindex","rowindextext","selected","setsize"],rowgroup:["disabled","errormessage","haspopup","invalid"],cell:["colindex","colindextext","colspan","disabled","errormessage","haspopup","invalid","rowindex","rowindextext","rowspan"],gridcell:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected"],columnheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],rowheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],table:["colcount","disabled","errormessage","haspopup","invalid","rowcount"],grid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","readonly","rowcount"],treegrid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","orientation","readonly","required","rowcount"],tablist:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation"],menu:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],menubar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],tree:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation","required"],treeitem:["checked","disabled","errormessage","expanded","haspopup","invalid","level","posinset","selected","setsize"],radiogroup:["activedescendant","disabled","errormessage","haspopup","invalid","orientation","readonly","required"],group:["activedescendant","disabled","errormessage","haspopup","invalid"],separator:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],toolbar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],dialog:["disabled","errormessage","haspopup","invalid","modal"],alertdialog:["disabled","errormessage","haspopup","invalid","modal"],application:["activedescendant","disabled","errormessage","expanded","haspopup","invalid"],article:["disabled","errormessage","haspopup","invalid","posinset","setsize"],img:["disabled","errormessage","haspopup","invalid"],figure:["disabled","errormessage","haspopup","invalid"],document:["disabled","errormessage","haspopup","invalid"],feed:["disabled","errormessage","haspopup","invalid"],math:["disabled","errormessage","haspopup","invalid"],note:["disabled","errormessage","haspopup","invalid"],presentation:["disabled","errormessage","haspopup","invalid"],none:["disabled","errormessage","haspopup","invalid"],banner:["disabled","errormessage","haspopup","invalid"],complementary:["disabled","errormessage","haspopup","invalid"],contentinfo:["disabled","errormessage","haspopup","invalid"],form:["disabled","errormessage","haspopup","invalid"],main:["disabled","errormessage","haspopup","invalid"],navigation:["disabled","errormessage","haspopup","invalid"],region:["disabled","errormessage","haspopup","invalid"],search:["disabled","errormessage","haspopup","invalid"],alert:["disabled","errormessage","haspopup","invalid"],log:["disabled","errormessage","haspopup","invalid"],marquee:["disabled","errormessage","haspopup","invalid"],status:["disabled","errormessage","haspopup","invalid"],timer:["disabled","errormessage","haspopup","invalid"],tabpanel:["disabled","errormessage","haspopup","invalid"],tooltip:["disabled","errormessage","haspopup","invalid"],definition:["disabled","errormessage","haspopup","invalid"],term:["disabled","errormessage","haspopup","invalid"],paragraph:["disabled","errormessage","haspopup","invalid"],generic:["disabled","errormessage","haspopup","invalid"],blockquote:["disabled","errormessage","haspopup","invalid"],caption:["disabled","errormessage","haspopup","invalid"],code:["disabled","errormessage","haspopup","invalid"],emphasis:["disabled","errormessage","haspopup","invalid"],strong:["disabled","errormessage","haspopup","invalid"],time:["disabled","errormessage","haspopup","invalid"],deletion:["disabled","errormessage","haspopup","invalid"],insertion:["disabled","errormessage","haspopup","invalid"],subscript:["disabled","errormessage","haspopup","invalid"],superscript:["disabled","errormessage","haspopup","invalid"]},Pt={checkbox:"checkbox",radio:"radio",range:"slider",number:"spinbutton",search:"searchbox",email:"textbox",tel:"textbox",text:"textbox",url:"textbox",button:"button",submit:"button",reset:"button",image:"button"},zt=new Set(["text","search","tel","url","email"]),Bt={button:"button",textarea:"textbox",img:"img",article:"article",aside:"complementary",nav:"navigation",main:"main",search:"search",h1:"heading",h2:"heading",h3:"heading",h4:"heading",h5:"heading",h6:"heading",ul:"list",ol:"list",menu:"list",li:"listitem",table:"table",thead:"rowgroup",tbody:"rowgroup",tfoot:"rowgroup",tr:"row",td:"cell",th:"columnheader",form:"form",fieldset:"group",details:"group",dialog:"dialog",hr:"separator",progress:"progressbar",meter:"meter",output:"status",option:"option",datalist:"listbox",dt:"term",dd:"definition",p:"paragraph",div:"generic",span:"generic",blockquote:"blockquote",figure:"figure",time:"time",code:"code",em:"emphasis",strong:"strong"};function ze(e){let t=e.tagName.toLowerCase();if(t==="a"||t==="area")return e.hasAttribute("href")?"link":"generic";if(t==="input")return zt.has(e.type)&&e.hasAttribute("list")?"combobox":Pt[e.type]??null;if(t==="td"||t==="th"){if(t==="th"&&e.getAttribute("scope")?.toLowerCase()==="row")return"rowheader";if(t==="th")return"columnheader";let r=e.closest("table"),p=r&&xe(r);return p==="grid"||p==="treegrid"?"gridcell":"cell"}if(t==="select")return e.multiple||e.size>1?"listbox":"combobox";if(t==="img")return e.getAttribute("alt")===""?"presentation":"img";if(t==="header")return e.closest("article, aside, main, nav, section")?"generic":"banner";if(t==="footer")return e.closest("article, aside, main, nav, section")?"generic":"contentinfo";if(t==="aside"){let r=e.parentElement?.closest("article, aside, nav, section"),p=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby");return r&&!p?"generic":"complementary"}return t==="section"?e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")?"region":"generic":Bt[t]??null}function jt(e){return[...Dt].some(t=>e.hasAttribute(`aria-${t}`))?!0:e.matches(":disabled")||Pe(e)?!1:e.tabIndex>=0?!0:e.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]')}function xe(e){let t=e.getAttribute("role")?.trim().split(/\s+/)??[];for(let r of t){let p=r.toLowerCase();if(p==="image")return"img";if(It[p])return(p==="presentation"||p==="none")&&jt(e)?ze(e):p}return ze(e)}var je=`/* Structure-lens overlay styles (focus order, landmark map): injected by
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
`;function ke(e){if(e.getElementById("pour-lens-styles"))return;let t=e.createElement("style");t.id="pour-lens-styles",t.dataset.pourAudit="overlay",t.textContent=je,e.head.appendChild(t)}function re(e=document){let t=e.defaultView,r={contentVisibilityAuto:!0,visibilityProperty:!0,checkVisibilityCSS:!0};function p(u){for(let g=u;g&&g!==e.documentElement;g=g.parentElement??g.getRootNode()?.host??null){let k=g.ownerDocument.defaultView.getComputedStyle(g).position;if(k==="fixed")return"fixed";if(k==="sticky")return"sticky"}return"flow"}function c(u,{withLine:g=!1}={}){let k="background:none;border:0;margin:0;padding:0;box-shadow:none;filter:none;opacity:1;mix-blend-mode:normal;",b=e.createElement("div");b.className=u,b.dataset.pourAudit="overlay",b.style.cssText=`position:absolute;top:0;left:0;width:0;height:0;overflow:clip;overflow-clip-margin:24px;pointer-events:none;z-index:2147483646;${k}`;let f=e.createElement("div");f.className=u,f.dataset.pourAudit="overlay",f.style.cssText=`position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:2147483646;${k}`;let w=0,S=0,E=null,L=null,$=null;if(g){L=e.createElementNS("http://www.w3.org/2000/svg","svg"),L.setAttribute("class",`${u.replace(/-layer$/,"")}-path`);for(let[s,x]of[["position","absolute"],["top","0"],["left","0"],["width","100%"],["height","100%"],["max-width","none"],["max-height","none"],["display","block"],["overflow","visible"],["pointer-events","none"],["background","none"],["border","0"],["margin","0"],["padding","0"],["box-shadow","none"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])L.style.setProperty(s,x,"important");$=e.createElementNS("http://www.w3.org/2000/svg","polyline"),E=e.createElementNS("http://www.w3.org/2000/svg","polyline");for(let[s,x,l]of[[$,"rgba(29,78,216,0.85)","3"],[E,"#93C5FD","1.5"]])for(let[A,z]of[["fill","none"],["stroke",x],["stroke-width",l],["stroke-linejoin","round"],["stroke-linecap","round"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])s.style.setProperty(A,z,"important");L.append($,E),b.append(L)}let N=[],T=null,C=0,y=(s,x)=>{let l=s.el.getBoundingClientRect(),A=l.width<=0&&l.height<=0||!s.el.isConnected||s.el.checkVisibility&&!s.el.checkVisibility(r);if(s.node.style.display=A?"none":"",A){s.docPt=null,s.viewRect=null;return}let z=s.anchor==="flow"?l.left-x.left:l.left,_=s.anchor==="flow"?l.top-x.top:l.top;if(s.node.style.transform=`translate(${z}px, ${_}px)`,s.sized)s.node.style.width=`${l.width}px`,s.node.style.height=`${l.height}px`;else{let F=s.node.getBoundingClientRect(),P=s.anchor==="flow"?{left:x.left,top:x.top,right:x.left+w,bottom:x.top+S}:{left:0,top:0,right:t.innerWidth,bottom:t.innerHeight},O=F.left<P.left?P.left-F.left:F.right>P.right?P.right-F.right:0,q=F.top<P.top?P.top-F.top:F.bottom>P.bottom?P.bottom-F.bottom:0;(O||q)&&(s.node.style.transform=`translate(${z+O}px, ${_+q}px)`)}s.anchor==="flow"?s.docPt=`${z},${_}`:s.viewRect=l},h=s=>{if(!E)return;let x=[];for(let A of N)A.offLine||A.node.style.display==="none"||(A.anchor==="flow"?A.docPt&&x.push(A.docPt):A.viewRect&&x.push(`${A.viewRect.left-s.left},${A.viewRect.top-s.top}`));let l=x.join(" ");$.setAttribute("points",l),E.setAttribute("points",l)},n=()=>{let s=e.documentElement.scrollWidth,x=e.documentElement.scrollHeight;s!==w&&(w=s,b.style.width=`${s}px`),x!==S&&(S=x,b.style.height=`${x}px`);let l=b.getBoundingClientRect();for(let A of N)y(A,l);h(l)};e.body.append(b,f);let a=()=>{C=t.requestAnimationFrame(a),n()};return a(),{setItems(s,x){for(let l of N)l.node.remove();N=s.map(l=>{let A=p(l.el);return(A==="flow"?b:f).append(l.node),{...l,anchor:A,docPt:null,viewRect:null}}),x&&!N.length?(T||(T=e.createElement("div"),T.className="pour-lens-notice",f.append(T)),T.textContent=x,T.style.display=""):T&&(T.style.display="none"),n()},destroy(){t.cancelAnimationFrame(C),b.remove(),f.remove(),N=[]}}}function o(u,g){for(let k=u.parentElement??u.getRootNode()?.host;k&&k!==e.documentElement;k=k.parentElement??k.getRootNode()?.host){let b=k.ownerDocument.defaultView.getComputedStyle(k);if(b.overflow==="visible"&&b.overflowX==="visible"&&b.overflowY==="visible")continue;let f=k.getBoundingClientRect();if(g.right<=f.left||g.left>=f.right||g.bottom<=f.top||g.top>=f.bottom)return!0}return!1}function i(){let u=[],g=[],k=b=>{for(let f of b.querySelectorAll("*")){if(f.dataset&&f.dataset.pourAudit||(f.shadowRoot&&k(f.shadowRoot),!f.matches('a[href], area[href], button, input, select, textarea, summary, iframe, object, embed, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]'))||f.disabled||f.closest("[inert]")||f.checkVisibility&&!f.checkVisibility(r))continue;let w=f.getBoundingClientRect();if(w.width<=0&&w.height<=0)continue;let S=f.getAttribute("tabindex"),E=S==null?0:parseInt(S,10)||0;if(E<0){f.matches("a[href], area[href], button, input, select, textarea, summary")&&!o(f,w)&&g.push({el:f});continue}u.push({el:f,idx:E,order:u.length})}};return k(e),{stops:[...u.filter(b=>b.idx>0).sort((b,f)=>b.idx-f.idx||b.order-f.order),...u.filter(b=>b.idx===0)],unreachable:g}}return{createLensTracker:c,collectFocusStops:i,clippedOutOfSight:o,VISIBLE_OPTS:r,anchorKind:p}}function Ve(e=document,t=re(e)){let r=e.defaultView,{createLensTracker:p,collectFocusStops:c,VISIBLE_OPTS:o}=t,i=null,u=0,g=null;function k(){if(i)return;ke(e),i=p("pour-focus-order-layer",{withLine:!0});let T=()=>{let{stops:C,unreachable:y}=c(),h=C.map((n,a)=>{let s=e.createElement("span");return s.className="pour-focus-badge"+(n.idx>0?" pour-focus-badge-forced":""),s.textContent=String(a+1),n.idx>0&&(s.title=`tabindex="${n.idx}" forces this position`),{el:n.el,node:s,sized:!1}});for(let{el:n}of y){let a=e.createElement("span");a.className="pour-focus-badge pour-focus-badge-unreachable",a.textContent="\u2715",a.title='tabindex="-1" \u2014 a keyboard cannot Tab to this control',h.push({el:n,node:a,sized:!1,offLine:!0})}i.setItems(h,"Focus order: this page has no keyboard-reachable controls")};T(),g=new r.MutationObserver(()=>{u||(u=r.setTimeout(()=>{u=0,T()},400))}),g.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function b(){r.clearTimeout(u),u=0,g?.disconnect(),g=null,i?.destroy(),i=null}let f=null,w=0,S=null;function E(T){let C=T.getAttribute("aria-label");if(C?.trim())return C.trim();let y=T.getAttribute("aria-labelledby");return y?y.split(/\s+/).map(h=>T.getRootNode().getElementById?.(h)?.textContent.trim()??"").filter(Boolean).join(" "):""}function L(){let T=[],C=[],y=n=>{for(let a of n.querySelectorAll("*")){if(a.dataset&&a.dataset.pourAudit||(a.shadowRoot&&y(a.shadowRoot),a.checkVisibility&&!a.checkVisibility(o)))continue;let s=a.getBoundingClientRect();if(s.width<=0&&s.height<=0)continue;let x=xe(a);if(Be.has(x)){if(x==="form"&&!E(a))continue;T.push({el:a,role:x,name:E(a)})}else if(x==="heading"){let l=parseInt(a.getAttribute("aria-level"),10)||parseInt(a.tagName.charAt(1),10)||2;C.push({el:a,level:l})}}};y(e);let h=null;for(let n of C)n.skipped=h!=null&&n.level>h+1,n.from=h,h=n.level;return{landmarks:T,headings:C}}function $(){if(f)return;ke(e),f=p("pour-map-layer");let T=()=>{let{landmarks:C,headings:y}=L(),h=[];for(let n of C){let a=e.createElement("div");a.className=`pour-map-region pour-map-role-${n.role}`;let s=e.createElement("span");s.className="pour-map-tag",s.textContent=n.name?`${n.role} \xB7 ${n.name}`:n.role,a.append(s),h.push({el:n.el,node:a,sized:!0})}for(let n of y){let a=e.createElement("span");a.className="pour-map-heading"+(n.skipped?" pour-map-heading-skipped":""),a.textContent=`H${n.level}`,n.skipped&&(a.title=`Skips a level \u2014 the heading before this one is an H${n.from}`),h.push({el:n.el,node:a,sized:!1})}f.setItems(h,"No landmarks or headings are exposed on this page")};T(),S=new r.MutationObserver(()=>{w||(w=r.setTimeout(()=>{w=0,T()},400))}),S.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function N(){r.clearTimeout(w),w=0,S?.disconnect(),S=null,f?.destroy(),f=null}return{focusOrder:{apply:k,remove:b},landmarkMap:{apply:$,remove:N}}}var U="#262626";function qt(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let r=t;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}var V=(e,t,r)=>t+(r-t)*e(),I=e=>Number(e.toFixed(1));function _e(e,{start:t,steps:r,stride:p,wiggle:c,heading:o}){let i=[t],u=o;for(let g=0;g<r;g++){u+=V(e,-c,c);let k=i[i.length-1];i.push([k[0]+Math.cos(u)*p,k[1]+Math.sin(u)*p])}return i}function We(e){let t=[];for(let r=0;r<e.length-1;r++){let p=e[Math.max(0,r-1)],c=e[r],o=e[r+1],i=e[Math.min(e.length-1,r+2)],u=[c[0]+(o[0]-p[0])/6,c[1]+(o[1]-p[1])/6],g=[o[0]-(i[0]-c[0])/6,o[1]-(i[1]-c[1])/6];t.push(`M${I(c[0])} ${I(c[1])}C${I(u[0])} ${I(u[1])} ${I(g[0])} ${I(g[1])} ${I(o[0])} ${I(o[1])}`)}return t}function we(e,t){let{width:r=2.6,dark:p=.6}=t,c=r,o=p;return We(_e(e,t)).map(i=>(c=Math.max(r*.45,Math.min(r*1.9,c+V(e,-.7,.7))),o=Math.max(p*.55,Math.min(p*1.35,o+V(e,-.12,.12))),`<path d="${i}" stroke-width="${I(c)}" stroke-opacity="${o.toFixed(2)}"/>`)).join("")}function _t(e,t){let r=_e(e,t),p=We(r).map(o=>`<path d="${o}" stroke-width="1.1" stroke-opacity=".45"/>`).join(""),c=r.filter((o,i)=>i%2===0).map(([o,i])=>`<circle cx="${I(o)}" cy="${I(i)}" r="${V(e,1.6,3.4).toFixed(1)}" fill="${U}" stroke="none" opacity="${V(e,.45,.75).toFixed(2)}"/>`).join("");return p+c}function Wt(e,t){let r="";for(let p=0;p<4;p++){let c=V(e,0,Math.PI*2);r+=we(e,{start:[t[0]+V(e,-18,18),t[1]+V(e,-18,18)],steps:9,stride:13,wiggle:.9,heading:c,width:2.2,dark:.55})}return r}function Ht(e,t,r){let p=V(e,40,110),c=2*Math.PI*r;return`<circle cx="${t[0]}" cy="${t[1]}" r="${r}" stroke-width="${V(e,5,7).toFixed(1)}" stroke-opacity=".55" stroke-dasharray="${I(c-p)} ${I(p)}" transform="rotate(${I(V(e,0,360))} ${t[0]} ${t[1]})"/><circle cx="${t[0]}" cy="${t[1]}" r="${r}" stroke-width="2" stroke-opacity=".3"/><circle cx="${I(t[0]+r*1.4)}" cy="${I(t[1]-r*.6)}" r="3" fill="${U}" stroke="none" opacity=".5"/>`}function Gt(e,t,r){return`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${t}" ry="${r}" fill="url(#cloud)" stroke="none" transform="rotate(-20 ${e[0]} ${e[1]})"/>`}function Yt(e,t){let r="";for(let p=0;p<8;p++)r+=`<circle cx="${I(t[0]+V(e,-40,40))}" cy="${I(t[1]+V(e,-30,30))}" r="${V(e,1.2,3.2).toFixed(1)}" fill="${U}" stroke="none" opacity="${V(e,.4,.7).toFixed(2)}"/>`;return r}var Xt=(e,t)=>`url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><filter id="b" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="${t}"/></filter><radialGradient id="cloud"><stop offset="0" stop-color="${U}" stop-opacity=".38"/><stop offset=".55" stop-color="${U}" stop-opacity=".14"/><stop offset="1" stop-color="${U}" stop-opacity="0"/></radialGradient></defs><g filter="url(#b)" fill="none" stroke="${U}" stroke-linecap="round" stroke-linejoin="round">${e}</g></svg>`)}")`;function Kt(){let e=qt(20260912);return[{depth:.95,size:.5,start:[.24,.3],art:Wt(e,[100,100])},{depth:.8,size:.44,start:[.66,.24],art:we(e,{start:[20,150],steps:12,stride:15,wiggle:.7,heading:-.9,width:3,dark:.62})},{depth:.65,size:.3,start:[.5,.62],art:Ht(e,[100,100],17)},{depth:.55,size:.36,start:[.8,.6],art:_t(e,{start:[30,70],steps:10,stride:14,wiggle:.8,heading:.4})},{depth:.4,size:.42,start:[.36,.8],art:Gt([100,100],62,34)},{depth:.3,size:.26,start:[.14,.58],art:Yt(e,[100,100])},{depth:.15,size:.3,start:[.58,.85],art:we(e,{start:[40,40],steps:11,stride:12,wiggle:.85,heading:.6,width:2,dark:.5})}]}var Ut=.55,Jt=.4,qe=1,pe=520,Zt=2.2;function He(e,t){let r=e.defaultView,p=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,c={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="multiply",t.style.overflow="hidden";let o=()=>Math.max(180,Math.min(460,.32*Math.min(r.innerWidth,r.innerHeight))),i=Kt().map((y,h)=>{let n=e.createElement("div");n.className="pour-floater",n.setAttribute("aria-hidden","true"),n.dataset.pourAudit="filter";let a=(.8+y.depth*1.6).toFixed(2);return Object.assign(n.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",backgroundImage:Xt(y.art,a),backgroundSize:"contain",backgroundRepeat:"no-repeat",opacity:(.95-y.depth*.2).toFixed(2),willChange:"transform"}),t.appendChild(n),{el:n,shape:y,phase:h*1.7,size:0,x:y.start[0]*r.innerWidth,y:y.start[1]*r.innerHeight,vx:0,vy:0,angle:h*47%360,spin:0}}),u=()=>{let y=o();for(let h of i)h.size=y*h.shape.size,h.el.style.width=`${h.size}px`,h.el.style.height=`${h.size}px`},g=(y=0)=>{for(let h of i){let n=1+.03*Math.sin(y*.8+h.phase),a=2.5*Math.sin(y*.5+h.phase*.7);h.el.style.transform=`translate3d(${(h.x-h.size/2).toFixed(1)}px, ${(h.y-h.size/2).toFixed(1)}px, 0) rotate(${h.angle.toFixed(1)}deg) skewX(${a.toFixed(2)}deg) scale(${n.toFixed(3)})`}};u(),g();let k=0,b=0,f=r.scrollY,w=null,S=(y,h)=>{for(let n of i){let a=.45+.9*n.shape.depth;n.vx=Math.max(-pe,Math.min(pe,n.vx+y*a)),n.vy=Math.max(-pe,Math.min(pe,n.vy+h*a)),n.spin+=(y-h)*.02*a}},E=()=>{let y=r.scrollY-f;f=r.scrollY,y&&S(0,y*Jt)},L=(y,h)=>{w&&S((y-w.x)*qe,(h-w.y)*qe),w={x:y,y:h}},$=y=>{y.pointerType!=="touch"&&L(y.clientX,y.clientY)},N=y=>{let h=y.touches[0];h&&L(h.clientX,h.clientY)},T=()=>{u(),g()},C=y=>{k=r.requestAnimationFrame(C);let h=b?Math.min(.05,(y-b)/1e3):0;if(b=y,!h)return;let n=y/1e3,a=Math.exp(-h/Ut),s=r.innerWidth,x=r.innerHeight;for(let l of i){l.vx+=Math.sin(n*.61+l.phase)*16*h,l.vy+=(Math.cos(n*.47+l.phase*1.3)*12+Zt*(.5+l.shape.depth))*h,l.vx*=a,l.vy*=a,l.spin*=a,l.x+=l.vx*h,l.y+=l.vy*h,l.angle+=(l.spin+Math.sin(n*.3+l.phase)*2)*h;let A=l.size*.25;l.x<A&&(l.vx=Math.abs(l.vx)+8),l.x>s-A&&(l.vx=-Math.abs(l.vx)-8),l.y<A&&(l.vy=Math.abs(l.vy)+8),l.y>x-A*1.6&&(l.vy=-Math.abs(l.vy)*.6-4)}g(n)};return r.addEventListener("resize",T),p||(r.addEventListener("scroll",E,{passive:!0}),e.addEventListener("pointermove",$,{passive:!0}),e.addEventListener("touchmove",N,{passive:!0}),k=r.requestAnimationFrame(C)),{stop(){k&&r.cancelAnimationFrame(k),k=0,r.removeEventListener("resize",T),r.removeEventListener("scroll",E),e.removeEventListener("pointermove",$),e.removeEventListener("touchmove",N);for(let y of i)y.el.remove();t.style.mixBlendMode=c.mixBlendMode,t.style.overflow=c.overflow}}}var Ge=["#ffffff","#1c1c1c","#fff1a3","#ffffff","#c6ecff","#1c1c1c","#ffd9d9","#ffffff","#e9ffd9","#1c1c1c"],Ye=Math.PI*2,G=e=>e.toFixed(1);function Xe(e,t){let r=e.defaultView,p=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,c=e.createElement("div");c.setAttribute("aria-hidden","true"),c.dataset.pourAudit="filter",c.dataset.pourAura="scotoma",Object.assign(c.style,{position:"absolute",inset:"0",pointerEvents:"none",backdropFilter:"blur(9px) contrast(0.8) brightness(1.08)",webkitBackdropFilter:"blur(9px) contrast(0.8) brightness(1.08)",background:"rgba(236,236,236,0.28)"}),t.appendChild(c);let o=e.createElement("canvas");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourAura="canvas",Object.assign(o.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none"}),t.appendChild(o);let i=o.getContext("2d"),u=0,g=0,k={x:r.innerWidth/2,y:r.innerHeight/2},b={x:k.x,y:k.y},f=0,w=0,S=0,E=()=>{u=r.innerWidth,g=r.innerHeight;let a=Math.min(2,r.devicePixelRatio||1);o.width=Math.round(u*a),o.height=Math.round(g*a),i.setTransform(a,0,0,a,0,0)},L=(a,s)=>{let x=l=>`M ${G(b.x+l)} ${G(b.y)} A ${G(l)} ${G(l)} 0 1 0 ${G(b.x-l)} ${G(b.y)} A ${G(l)} ${G(l)} 0 1 0 ${G(b.x+l)} ${G(b.y)} Z`;return`path(evenodd, '${x(s)} ${x(a)}')`},$=(a,s,x,l,A,z)=>{if(a<=s)return;let _=Math.max(12,Math.round(a*Ye/(s*1.05)));_%2&&(_+=1);let F=[];for(let O=0;O<_;O++){let q=Ye*O/_,oe=.72+.28*Math.sin(3*q+z*.35)*Math.cos(5*q-z*.2),J=a+(O%2?s:-s)*oe;F.push([b.x+Math.cos(q)*J,b.y+Math.sin(q)*J])}F.push(F[0]);let P=1.1+s*.07;i.save(),i.lineJoin="miter",i.lineCap="round",i.globalAlpha=x*A*.5,i.strokeStyle="rgba(255,255,255,0.7)",i.lineWidth=P*2.6,i.beginPath(),i.moveTo(F[0][0],F[0][1]);for(let O=1;O<F.length;O++)i.lineTo(F[O][0],F[O][1]);i.stroke(),i.globalAlpha=x*A,i.lineWidth=P;for(let O=0;O<_;O++)i.strokeStyle=Ge[(O+l)%Ge.length],i.beginPath(),i.moveTo(F[O][0],F[O][1]),i.lineTo(F[O+1][0],F[O+1][1]),i.stroke();i.restore()},N=(a,s)=>{i.clearRect(0,0,u,g);let l=10+(.34*Math.min(u,g)-10)*(1-Math.exp(-a/9))*(1+.02*Math.sin(a*.7)),A=3+l*.06,z=Math.min(1,a/2);c.style.opacity=z.toFixed(2),c.style.clipPath=L(l*.5,l+A*.4),$(l,A,1,s,z,a),$(l-A*1.9,A*.7,.6,s+4,z,a),$(l-A*3.6,A*.45,.3,s+7,z,a)},T=a=>{S=r.requestAnimationFrame(T);let s=w?Math.min(.05,(a-w)/1e3):0;w=a,f||(f=a),b.x+=(k.x-b.x)*Math.min(1,s*14),b.y+=(k.y-b.y)*Math.min(1,s*14);let x=(a-f)/1e3;N(x,Math.floor(x*2.5))},C=()=>{b.x=k.x,b.y=k.y,N(45,0)},y=a=>{a.pointerType!=="touch"&&(k.x=a.clientX,k.y=a.clientY,p&&C())},h=a=>{let s=a.touches[0];s&&(k.x=s.clientX,k.y=s.clientY,p&&C())},n=()=>{E(),p&&C()};return E(),r.addEventListener("resize",n),e.addEventListener("pointermove",y,{passive:!0}),e.addEventListener("touchmove",h,{passive:!0}),p?C():S=r.requestAnimationFrame(T),{stop(){S&&r.cancelAnimationFrame(S),S=0,r.removeEventListener("resize",n),e.removeEventListener("pointermove",y),e.removeEventListener("touchmove",h),o.remove(),c.remove()}}}function Ke(e,t){let r=e.defaultView,p=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,c={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="screen",t.style.overflow="hidden";let o=e.createElement("div");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourReflection="room",Object.assign(o.style,{position:"absolute",inset:"-20%",pointerEvents:"none",background:"radial-gradient(ellipse 30% 38% at 74% 16%, rgba(255,249,236,0.62), rgba(255,249,236,0.2) 42%, rgba(255,249,236,0) 72%), radial-gradient(ellipse 55% 26% at 18% 92%, rgba(255,255,255,0.16), rgba(255,255,255,0) 70%)",willChange:"transform"}),t.appendChild(o);let i=e.createElement("video");i.setAttribute("aria-hidden","true"),i.dataset.pourAudit="filter",i.dataset.pourReflection="camera",i.muted=!0,i.playsInline=!0,i.autoplay=!0,Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"cover",transform:"scaleX(-1)",opacity:String(.32),filter:"blur(0.7px) contrast(1.05)",pointerEvents:"none"}),t.appendChild(i);let u=null,g=0,k=L=>{u=e.createElement("div"),u.dataset.pourAudit="filter",u.dataset.pourReflection="note",u.setAttribute("role","status"),u.textContent=L,Object.assign(u.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(420px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(u),g=r.setTimeout(()=>{u?.remove(),u=null},7e3)},b=null,f=!1,w=r.navigator?.mediaDevices;w?.getUserMedia?w.getUserMedia({video:{facingMode:"user",width:{ideal:1280},height:{ideal:720}},audio:!1}).then(L=>{if(f){for(let $ of L.getTracks())$.stop();return}b=L,i.srcObject=L,i.play().catch(()=>{})}).catch(()=>{f||k("Camera not available here, so the room light is shown without your reflection.")}):k("This page cannot use the camera (it needs a secure page), so the room light is shown without your reflection.");let S=0,E=L=>{S=r.requestAnimationFrame(E);let $=L/1e3;o.style.transform=`translate3d(${(Math.sin($*.11)*14).toFixed(1)}px, ${(Math.cos($*.083)*9).toFixed(1)}px, 0)`};return p||(S=r.requestAnimationFrame(E)),{stop(){if(f=!0,S&&r.cancelAnimationFrame(S),S=0,g&&r.clearTimeout(g),u?.remove(),u=null,b)for(let L of b.getTracks())L.stop();b=null,i.srcObject=null,i.remove(),o.remove(),t.style.mixBlendMode=c.mixBlendMode,t.style.overflow=c.overflow}}}var Ue={aquatic:{scheme:"dark",canvas:"#202020",canvasText:"#FFFFFF",linkText:"#75E9FC",grayText:"#A6A6A6",highlight:"#8EE3F0",highlightText:"#263B50",buttonFace:"#202020",buttonText:"#FFFFFF"}},M=":not([data-pour-audit]):not([data-pour-audit] *):not([data-pour-fc-keep])",Je=["data-pour-fc-bg","data-pour-fc-bgimg","data-pour-fc-before","data-pour-fc-after","data-pour-fc-keep"],Qt='script, style, noscript, template, textarea, option, select, title, svg, math, [data-pour-audit], [contenteditable]:not([contenteditable="false"])',Qe='button, input[type="button"], input[type="submit"], input[type="reset"]',et="input, textarea, select";function er(e){return`
html${M} { background-color: ${e.canvas} !important; color: ${e.canvasText} !important; color-scheme: ${e.scheme} !important; }
*${M}, *${M}::before, *${M}::after {
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
a${M}[href] { color: ${e.linkText} !important; }
${Qe.split(", ").map(t=>`${t}${M}`).join(", ")} { color: ${e.buttonText} !important; }
${et.split(", ").map(t=>`${t}${M}`).join(", ")} { color: ${e.canvasText} !important; }
[data-pour-fc-bg="canvas"]${M} { background-color: ${e.canvas} !important; }
[data-pour-fc-bg="button"]${M} { background-color: ${e.buttonFace} !important; }
[data-pour-fc-bg="field"]${M} { background-color: ${e.canvas} !important; }
[data-pour-fc-bg="highlight"]${M} { background-color: ${e.highlight} !important; color: ${e.highlightText} !important; }
[data-pour-fc-plate]${M} { background-color: ${e.canvas} !important; box-shadow: 0 0 0 2px ${e.canvas} !important; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
[data-pour-fc-bg="highlight"] [data-pour-fc-plate]${M} { background-color: ${e.highlight} !important; box-shadow: 0 0 0 2px ${e.highlight} !important; }
[data-pour-fc-bg="button"] [data-pour-fc-plate]${M} { background-color: ${e.buttonFace} !important; box-shadow: 0 0 0 2px ${e.buttonFace} !important; }
[data-pour-fc-bgimg]${M} { background-image: none !important; }
[data-pour-fc-before]${M}::before { background-color: ${e.canvas} !important; background-image: none !important; }
[data-pour-fc-after]${M}::after { background-color: ${e.canvas} !important; background-image: none !important; }
*${M}:disabled, *${M}[aria-disabled="true"], *${M}:disabled *, *${M}[aria-disabled="true"] * { color: ${e.grayText} !important; border-color: ${e.grayText} !important; }
*${M}::placeholder { color: ${e.grayText} !important; }
*${M}::selection, *${M}::-moz-selection { background-color: ${e.highlight} !important; color: ${e.highlightText} !important; }
`}function Ze(e){if(!e||e==="transparent")return 0;let t=/^rgba?\(\s*[\d.]+\s*,?\s*[\d.]+\s*,?\s*[\d.]+\s*(?:[,/]\s*([\d.]+%?))?\s*\)$/i.exec(e);return!t||t[1]===void 0?1:t[1].endsWith("%")?parseFloat(t[1])/100:parseFloat(t[1])}function tt(e,{theme:t="aquatic"}={}){let r=e.defaultView,p=Ue[t]||Ue.aquatic,c=!1,o=e.createElement("style");o.id="pour-forced-colours-page",o.dataset.pourAudit="filter";let i=e.createElement("style");i.id="pour-forced-colours",i.dataset.pourAudit="filter",i.textContent=er(p),e.head.appendChild(o),e.head.appendChild(i);let u=n=>n.closest("[data-pour-audit]"),g=n=>{if(n.namespaceURI!=="http://www.w3.org/1999/xhtml"||u(n)||n.hasAttribute("data-pour-fc-plate"))return;let a=r.getComputedStyle(n);if(a.forcedColorAdjust==="none"){n.setAttribute("data-pour-fc-keep","");return}n.matches("mark")?n.setAttribute("data-pour-fc-bg","highlight"):Ze(a.backgroundColor)>0?n.setAttribute("data-pour-fc-bg",n.matches(Qe)?"button":n.matches(et)?"field":"canvas"):n.removeAttribute("data-pour-fc-bg"),a.backgroundImage.includes("gradient(")?n.setAttribute("data-pour-fc-bgimg",""):n.removeAttribute("data-pour-fc-bgimg");for(let[s,x]of[["::before","data-pour-fc-before"],["::after","data-pour-fc-after"]]){let l=r.getComputedStyle(n,s);l.content!=="none"&&l.content!=="normal"&&(Ze(l.backgroundColor)>0||l.backgroundImage.includes("gradient("))?n.setAttribute(x,""):n.removeAttribute(x)}},k=n=>{if(n.nodeType!==1||n.namespaceURI!=="http://www.w3.org/1999/xhtml")return;let a=e.createTreeWalker(n,r.NodeFilter.SHOW_TEXT),s=[];for(;a.nextNode();)s.push(a.currentNode);for(let x of s){if(!x.textContent.trim())continue;let l=x.parentElement;if(!l||l.namespaceURI!=="http://www.w3.org/1999/xhtml"||l.hasAttribute("data-pour-fc-plate")||l.closest(Qt))continue;let A=e.createElement("span");A.setAttribute("data-pour-fc-plate",""),l.replaceChild(A,x),A.appendChild(x)}},b=()=>{let n=e.querySelectorAll("[data-pour-fc-plate]");for(let a of n)a.replaceWith(...a.childNodes);n.length&&e.body.normalize()},f=n=>{if(n.nodeType===1){g(n);for(let a of n.querySelectorAll("*"))g(a);k(n)}},w=new Set,S=0,E=()=>{S=0;let n=[...w];w.clear();for(let a of n)a.isConnected&&f(a)},L=new r.MutationObserver(n=>{for(let a of n)if(a.type==="childList")for(let s of a.addedNodes)s.nodeType===1&&!s.hasAttribute("data-pour-fc-plate")&&w.add(s);else a.target.nodeType===1&&w.add(a.target);w.size&&!S&&(S=r.requestAnimationFrame(E))});f(e.body),L.observe(e.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class","style","disabled","aria-disabled","open","hidden"]});let $=/forced-colors\s*:\s*active|-ms-high-contrast\s*:\s*active/i,N=[],T=[],C=(n,a)=>{for(let s of n){let x=s.conditionText??s.media?.mediaText??"";if(s.media!==void 0&&s.cssRules!==void 0&&!a&&$.test(x)){C(s.cssRules,!0);continue}if(s.styleSheet){try{C(s.styleSheet.cssRules,a)}catch{}continue}if(a){N.push(s.cssText),s.style&&s.selectorText&&s.style.getPropertyValue("forced-color-adjust").trim()==="none"&&T.push(s.selectorText);continue}s.cssRules&&C(s.cssRules,!1)}},y=()=>{if(!c){o.textContent=N.join(`
`);for(let n of T){let a=[];try{a=e.querySelectorAll(n)}catch{continue}for(let s of a)u(s)||s.setAttribute("data-pour-fc-keep","")}}},h=[];for(let n of e.styleSheets)if(!n.ownerNode?.dataset?.pourAudit)try{C(n.cssRules,!1)}catch{if(!n.href||typeof r.CSSStyleSheet!="function")continue;h.push(r.fetch(n.href,{mode:"cors"}).then(a=>a.ok?a.text():"").then(a=>{if(!a||c)return;let s=new r.CSSStyleSheet;s.replaceSync(a),C(s.cssRules,!1)}).catch(()=>{}))}return y(),h.length&&Promise.all(h).then(y),{stop(){c=!0,L.disconnect(),S&&r.cancelAnimationFrame(S),S=0,w.clear(),b(),i.remove(),o.remove();for(let n of e.querySelectorAll(Je.map(a=>`[${a}]`).join(",")))for(let a of Je)n.removeAttribute(a)}}}var rt=`/* Overlay styles for the vision & sensory filters \u2014 ported from
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
/* The body is scaled about the point of attention (apply.js sets the
   transform); the overlay sits beside the body on the root, so the fixed
   box stays fixed to the viewport. */
.pour-sensory-filter-detailFixation .pour-sensory-filter-overlay {
  background: radial-gradient(
    circle 100px at var(--pour-sensory-x, 50%) var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 40%,
    rgba(0, 0, 0, 0.08) 60%,
    rgba(0, 0, 0, 0.2) 100%
  );
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
  mask-image: radial-gradient(
    circle 100px at var(--pour-sensory-x, 50%) var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 35%,
    black 70%
  );
  -webkit-mask-image: radial-gradient(
    circle 100px at var(--pour-sensory-x, 50%) var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 35%,
    black 70%
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
`;function at(e=document){let t=e.defaultView,r=e.documentElement,p=re(e),c=Ve(e,p),o=null,i=null,u=null,g=null,k=null,b=null,f="none",w="none",S=0,E=0,L=0,$=0,N=null;function T(){if(e.getElementById("pour-filter-styles"))return;let m=e.createElement("style");m.id="pour-filter-styles",m.dataset.pourAudit="filter",m.textContent=rt,e.head.appendChild(m)}function C(){if(e.getElementById("pour-vision-filter-defs"))return;let m="http://www.w3.org/2000/svg",d=e.createElementNS(m,"svg");d.setAttribute("id","pour-vision-filter-defs"),d.setAttribute("width","0"),d.setAttribute("height","0"),d.setAttribute("focusable","false"),d.setAttribute("aria-hidden","true"),d.dataset.pourAudit="filter",d.style.position="absolute",d.style.pointerEvents="none";let v=e.createElementNS(m,"defs");for(let[B,j]of Object.entries(he)){let D=e.createElementNS(m,"filter");D.setAttribute("id",`pour-vision-filter-${B}`),D.setAttribute("color-interpolation-filters","linearRGB");let R=e.createElementNS(m,"feColorMatrix");R.setAttribute("type","matrix"),R.setAttribute("values",j),D.appendChild(R),v.appendChild(D)}d.appendChild(v),e.body.appendChild(d)}let y=(m,d=e.body)=>{let v=e.createElement("div");return v.className=m,v.dataset.pourAudit="filter",d.appendChild(v),v};function h(){L=0,r.style.setProperty("--pour-vision-x",`${S}px`),r.style.setProperty("--pour-vision-y",`${E}px`),r.style.setProperty("--pour-vision-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function n(m){S=m.clientX,E=m.clientY,L||(L=t.requestAnimationFrame(h))}function a(m){let d=m.touches[0];d&&n(d)}function s(m){for(let v of ge)r.classList.remove(`pour-vision-filter-${v}`);if(be.has(f)&&(e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",a)),i?.stop(),i=null,u?.stop(),u=null,g?.stop(),g=null,o?.remove(),o=null,f=K[m]!==void 0?m:"none",f==="none"){w==="none"&&(r.style.filter="");return}w!=="none"&&ce("none"),T(),C();let d=K[f]||"none";r.style.filter=d==="none"?"":d,ge.has(f)&&(r.classList.add(`pour-vision-filter-${f}`),o=y("pour-vision-filter-overlay"),o.dataset.filter=f,f==="floaters"&&(i=He(e,o)),f==="migraineAura"&&(u=Xe(e,o)),f==="glossyScreen"&&(g=Ke(e,o))),be.has(f)&&(S=t.innerWidth/2,E=t.innerHeight/2,h(),e.addEventListener("mousemove",n),e.addEventListener("touchmove",a,{passive:!0}))}function x(){$=0,r.style.setProperty("--pour-sensory-x",`${S}px`),r.style.setProperty("--pour-sensory-y",`${E}px`),r.style.setProperty("--pour-sensory-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function l(m){S=m.clientX,E=m.clientY,$||($=t.requestAnimationFrame(x))}function A(m){let d=m.touches[0];d&&l(d)}function z(m){if(e.getElementById("pour-sensory-injected-style")?.remove(),!m)return;let d=e.createElement("style");d.id="pour-sensory-injected-style",d.dataset.pourAudit="filter",d.textContent=m,e.head.appendChild(d)}function _(){if(e.querySelector(".pour-sensory-washout-char"))return;let m=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null),d=[];for(;m.nextNode();)d.push(m.currentNode);for(let v of d){let B=v.textContent;if(!B.trim())continue;let j=v.parentElement;if(!j||j.closest("script,style,noscript,[data-pour-audit]"))continue;let D=e.createDocumentFragment();for(let R of B)if(R===" "||R===`
`||R==="	")D.appendChild(e.createTextNode(R));else{let W=e.createElement("span");W.textContent=R,W.style.opacity=(.3+Math.random()*.7).toFixed(2),W.className="pour-sensory-washout-char",D.appendChild(W)}j.replaceChild(D,v)}}function F(){for(let m of e.querySelectorAll(".pour-sensory-washout-char"))m.replaceWith(m.textContent);e.body.normalize()}let P=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],O=new Map,q=0,oe=0,J=null,Se=0,Ae=0,ne=0,ie=0,Z=0,se=0;function lt(m,d,v){let B=`${m}:${d}:${v}`,j=O.get(B);if(j)return j;let D=e.createElement("canvas");D.width=m,D.height=m;let R=D.getContext("2d");if(!R)return"auto";let W=Math.round(m/2);R.save(),R.translate(W+d,W+v),R.scale(1.15,1.15),R.beginPath(),R.moveTo(P[0][0],P[0][1]);for(let X=1;X<P.length;X++)R.lineTo(P[X][0],P[X][1]);R.closePath(),R.restore(),R.lineWidth=3,R.lineJoin="round",R.strokeStyle="#fff",R.stroke(),R.fillStyle="#000",R.fill();let Y=`url("${D.toDataURL("image/png")}") ${W} ${W}, auto`;return O.set(B,Y),Y}function Te(m){let d=m.timeStamp||Date.now(),v=d-ne;if(ne&&v>0){let B=Math.hypot(m.clientX-Se,m.clientY-Ae);ie=ie*.8+B/v*1e3*.2}Se=m.clientX,Ae=m.clientY,ne=d}function pt(m,d){if(!Z)return Z=m+d.minGap+Math.random()*(d.maxGap-d.minGap),[0,0];let v=m-Z;if(v<0)return[0,0];if(v>d.dur)return Z=m+d.minGap+Math.random()*(d.maxGap-d.minGap),se=Math.random()*Math.PI*2,[0,0];let B=1-v/d.dur,j=d.size*B*B;return[Math.cos(se)*j,Math.sin(se)*j]}function Ee(m){q=t.requestAnimationFrame(Ee);let d=J;if(!d)return;let v=(m-oe)/1e3,B=0,j=0;if(d.freq&&d.amp){let Y=2*Math.PI*d.freq,X=Math.max(0,1+(d.intent||0)*Math.min(1,ie/700)),Oe=d.amp*X;B+=(Math.sin(Y*v)*.7+Math.sin(Y*1.63*v+1.1)*.3)*Oe,j+=(Math.cos(Y*.97*v+.6)*.7+Math.sin(Y*2.11*v+2.3)*.3)*Oe}if(d.spasm){let[Y,X]=pt(m,d.spasm);B+=Y,j+=X}let D=d.bitmap/2-14,R=Math.max(-D,Math.min(D,Math.round(B))),W=Math.max(-D,Math.min(D,Math.round(j)));r.style.cursor=lt(d.bitmap,R,W)}function dt(m){Le(),J=m,oe=t.performance?t.performance.now():Date.now(),ie=0,ne=0,Z=0,se=Math.random()*Math.PI*2,Ce(m.hide?`
      html, :not(html) { cursor: none !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `:`
      :not(html) { cursor: inherit !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `),!m.hide&&(e.addEventListener("mousemove",Te,{passive:!0}),q=t.requestAnimationFrame(Ee))}function Le(){q&&t.cancelAnimationFrame(q),q=0,J=null,Z=0,e.removeEventListener("mousemove",Te),Ce(null),r.style.cursor=""}function Ce(m){if(e.getElementById("pour-sensory-cursor-style")?.remove(),!m)return;let d=e.createElement("style");d.id="pour-sensory-cursor-style",d.dataset.pourAudit="filter",d.textContent=m,e.head.appendChild(d)}function ct(){Re();let m=()=>{N=t.setTimeout(()=>{b&&(b.classList.add("pour-sensory-spike-flash"),t.setTimeout(()=>{b?.classList.remove("pour-sensory-spike-flash"),m()},150))},3e3+Math.random()*8e3)};m()}function Re(){N&&(t.clearTimeout(N),N=null)}function ce(m){let d=te[w];if(d?.overlay&&r.classList.remove(`pour-sensory-filter-${w}`),d?.hostClass&&r.classList.remove(d.hostClass),d?.mouseTracked&&(e.removeEventListener("mousemove",l),e.removeEventListener("touchmove",A)),d?.injectScript&&F(),d?.cursorJitter&&Le(),d?.viewportOrigin&&mt(),d?.zoom&&Fe(),d?.lens&&c[d.lens]?.remove(),k?.stop(),k=null,Re(),b?.remove(),b=null,z(null),w=te[m]?m:"none",w==="none"){f==="none"&&(r.style.filter="");return}f!=="none"&&s("none"),T();let v=te[w];r.style.filter=v.css&&v.css!=="none"?v.css:"",v.hostClass&&r.classList.add(v.hostClass),(v.overlay||v.mouseTracked||w==="sensorySpike")&&(b=y("pour-sensory-filter-overlay",v.zoom?r:e.body),b.dataset.filter=w,v.overlay&&r.classList.add(`pour-sensory-filter-${w}`)),v.mouseTracked&&(S=t.innerWidth/2,E=t.innerHeight/2,x(),e.addEventListener("mousemove",l),e.addEventListener("touchmove",A,{passive:!0})),v.injectCSS&&z(v.injectCSS),w==="sensorySpike"&&ct(),v.injectScript&&_(),v.cursorJitter&&dt(v.cursorJitter),v.viewportOrigin&&ut(),v.zoom&&ft(v.zoom),v.lens&&c[v.lens]?.apply(),v.forcedColours&&(k=tt(e))}let Q=0;function $e(){Q=0,r.style.setProperty("--pour-motion-origin",`${t.scrollX+t.innerWidth/2}px ${t.scrollY+t.innerHeight/2}px`)}function le(){Q||(Q=t.requestAnimationFrame($e))}function ut(){$e(),t.addEventListener("scroll",le,{passive:!0}),t.addEventListener("resize",le)}function mt(){t.removeEventListener("scroll",le),t.removeEventListener("resize",le),Q&&(t.cancelAnimationFrame(Q),Q=0),r.style.removeProperty("--pour-motion-origin")}let ae=0,ee=null,H=null,ue={x:0,y:0};function me(){let m=e.body,d=m.style.transform;m.style.transform="none";let v=m.getBoundingClientRect();ue={x:v.left+t.scrollX,y:v.top+t.scrollY},m.style.transform=d}function Me(){ae=t.requestAnimationFrame(Me);let m=t.scrollX+S-ue.x,d=t.scrollY+E-ue.y;H||(H={x:m,y:d}),H.x+=(m-H.x)*.16,H.y+=(d-H.y)*.16,e.body.style.transformOrigin=H.x.toFixed(1)+"px "+H.y.toFixed(1)+"px"}function ft(m){Fe();let d=e.body;ee={transform:d.style.transform,transformOrigin:d.style.transformOrigin,overflowX:r.style.overflowX},me(),H=null,d.style.transform="scale("+m+")",r.style.overflowX="hidden",t.addEventListener("resize",me),ae=t.requestAnimationFrame(Me)}function Fe(){ae&&t.cancelAnimationFrame(ae),ae=0,t.removeEventListener("resize",me),ee&&(e.body.style.transform=ee.transform,e.body.style.transformOrigin=ee.transformOrigin,r.style.overflowX=ee.overflowX,ee=null,H=null)}let ht=()=>({vision:f,sensory:w});function gt(){s("none"),ce("none")}return{applyVision:s,applySensory:ce,clear:gt,state:ht}}var rr=new Set(["text","search","url","tel","email","password","number","date","datetime-local","month","time","week",""]),ar=new Set(["input","select","textarea","button","meter","output","progress"]);function nt(e){return de(e,!1,!1,new Set)}function it(e){for(let r=e;r;r=ve(r))if(r.getAttribute?.("aria-hidden")==="true"||getComputedStyle(r).display==="none")return!0;let t=getComputedStyle(e).visibility;return t==="hidden"||t==="collapse"}function or(e,t){let r=e.getAttribute?.("aria-labelledby");if(!r)return null;let p=e.getRootNode(),c=r.split(/\s+/).filter(Boolean).map(o=>p.getElementById?.(o)).filter(Boolean);return c.length?c.map(o=>{let i=new Set(t);return o===e&&i.delete(e),de(o,!0,it(o),i)}).join(" ").replace(/\s+/g," ").trim():null}function de(e,t,r,p){if(p.has(e))return"";if(p.add(e),!t){let u=or(e,p);if(u)return u}let c=e.getAttribute("aria-label")?.trim();if(c)return c;let o=e.tagName.toLowerCase();if(o==="img"||o==="area"){let u=e.getAttribute("alt")?.trim();if(u)return u}if(ar.has(o)&&e.labels?.length){let u=[...e.labels].map(g=>de(g,t,it(g),p)).join(" ").trim();if(u)return u}if(o==="input"||o==="select"||o==="textarea"){if(e.type==="submit"||e.type==="reset"||e.type==="button"){let u=(e.value??e.getAttribute("value")??"").trim();if(u)return u}if(e.type==="image"){let u=e.getAttribute("alt")?.trim();if(u)return u}if(t&&(o==="textarea"||rr.has(e.type))){let u=(e.value??"").trim();if(u)return u}if(e.type==="submit")return"Submit";if(e.type==="reset")return"Reset"}let i=nr(e,r,t,p).replace(/\s+/g," ").trim();return i||(e.getAttribute("title")??e.getAttribute("placeholder")??"").trim()}function nr(e,t,r,p){let c=e.shadowRoot?e.shadowRoot.childNodes:e.childNodes;return ot(e,"::before",t)+st(c,t,r,p)+ot(e,"::after",t)}function ot(e,t,r){let p=getComputedStyle(e,t);if(!r&&(p.display==="none"||p.visibility==="hidden"||p.visibility==="collapse"))return"";let c=p.content;if(!c||c==="none"||c==="normal")return"";let o=c.match(/\/\s*"((?:[^"\\]|\\.)*)"\s*$/);if(o)return o[1].replace(/\\(.)/g,"$1");let i=c.match(/^"((?:[^"\\]|\\.)*)"$/);return i?i[1].replace(/\\(.)/g,"$1"):""}function st(e,t,r,p){let c="";for(let o of e){if(o.nodeType===3){c+=o.textContent;continue}if(o.nodeType!==1)continue;let i=o.tagName.toLowerCase();if(i==="script"||i==="style"||i==="noscript"||i==="template")continue;if(!t){if(o.getAttribute("aria-hidden")==="true")continue;let g=getComputedStyle(o);if(g.display==="none"||g.visibility==="hidden"||g.visibility==="collapse")continue}if(i==="slot"){let g=o.assignedNodes?.()??[];c+=st(g.length?g:o.childNodes,t,r,p);continue}if((i==="img"||i==="area")&&o.getAttribute("alt")===""&&!o.getAttribute("aria-label")?.trim()&&!o.getAttribute("aria-labelledby"))continue;let u=de(o,r,t,p);c+=i==="img"||i==="area"||o.hasAttribute("aria-label")||o.hasAttribute("aria-labelledby")?` ${u} `:u}return c}return wt(ir);})();
