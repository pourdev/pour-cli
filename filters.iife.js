/*! pour filters | MIT | https://pour.dev */
var PourFilters=(()=>{var $e=Object.defineProperty;var jt=Object.getOwnPropertyDescriptor;var Ht=Object.getOwnPropertyNames;var Wt=Object.prototype.hasOwnProperty;var Gt=(e,t)=>{for(var r in t)$e(e,r,{get:t[r],enumerable:!0})},Yt=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ht(t))!Wt.call(e,s)&&s!==r&&$e(e,s,{get:()=>t[s],enumerable:!(a=jt(t,s))||a.enumerable});return e};var Xt=e=>Yt($e({},"__esModule",{value:!0}),e);var na={};Gt(na,{CSS_FILTERS:()=>me,MODE_LABELS:()=>Ie,SENSORY_FILTERS:()=>be,accessibleName:()=>Ot,createFilterApplier:()=>Nt,createLensKit:()=>ye,cssPath:()=>tt});var Ne={protanopia:"0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0 0 0 0 1 0",deuteranopia:"0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047414 0 0 -0.011820 0.042940 0.968881 0 0 0 0 0 1 0",tritanopia:"1.255528 -0.076749 -0.178779 0 0 -0.078411 0.930809 0.147602 0 0 0.004733 0.691367 0.303900 0 0 0 0 0 1 0",achromatopsia:"0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0 0 0 1 0",protanomaly:"0.458064 0.679578 -0.137642 0 0 0.092785 0.846313 0.060902 0 0 -0.007494 -0.016807 1.024301 0 0 0 0 0 1 0",deuteranomaly:"0.547494 0.607765 -0.155259 0 0 0.181692 0.781742 0.036566 0 0 -0.010410 0.027275 0.983136 0 0 0 0 0 1 0",tritanomaly:"1.057047 -0.029507 -0.027540 0 0 -0.039014 0.966028 0.072986 0 0 0.002584 0.220200 0.777216 0 0 0 0 0 1 0"},Kt={protanopia:"saturate(0.25) sepia(0.5) hue-rotate(-15deg)",deuteranopia:"saturate(0.3) sepia(0.4) hue-rotate(-10deg)",tritanopia:"saturate(0.35) sepia(0.3) hue-rotate(50deg)",achromatopsia:"grayscale(100%)",protanomaly:"saturate(0.6) sepia(0.25) hue-rotate(-8deg)",deuteranomaly:"saturate(0.65) sepia(0.2) hue-rotate(-5deg)",tritanomaly:"saturate(0.7) sepia(0.15) hue-rotate(25deg)"},De=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge","diabeticRetinopathy","floaters","glossyScreen","nystagmus","hemianopiaLeft","hemianopiaRight","amblyopia","afterimages","ageSlider"]),Oe=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge"]),me={none:"none",cataract:"sepia(0.3) contrast(0.9) saturate(0.9) brightness(0.95) blur(0.6px)",presbyopia:"blur(0.5px) contrast(0.92)",lowAcuityMild:"blur(0.7px)",lowAcuity:"blur(1.2px)",lowAcuityStrong:"blur(2.5px)",lowAcuityHeavy:"blur(5px)",lowLight:"brightness(0.65) contrast(0.9) saturate(0.85) hue-rotate(-8deg)",lowContrast:"contrast(0.7)",retinitisRing:"none",glaucoma:"none",glaucomaLarge:"none",macularDegeneration:"none",macularDegenerationLarge:"none",diabeticRetinopathy:"none",floaters:"none",glossyScreen:"none",nystagmus:"none",hemianopiaLeft:"none",hemianopiaRight:"none",amblyopia:"none",afterimages:"none",ageSlider:"none",scotopicRose:"sepia(0.15) hue-rotate(330deg) saturate(1.2) brightness(1.05)",scotopicYellow:"sepia(0.3) saturate(1.15) brightness(1.05)",scotopicAqua:"sepia(0.2) hue-rotate(160deg) saturate(1.15) brightness(1.02)"},Ut=typeof navigator<"u"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Jt=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),Qt=Ut||Jt;Object.keys(Ne).forEach(e=>{Qt?me[e]=Kt[e]:me[e]=`url(#pour-vision-filter-${e})`});var Zt=[{label:"Color vision",options:[{value:"deuteranomaly",added:"2026-07-30",name:"Green Weak (Deuteranomaly)",stat:"~5% of men",description:"Green-sensitive cones respond off-target, so greens, reds and browns crowd together. The most common colour vision difference.",label:"Green Weak - Deuteranomaly - ~5% of men"},{value:"protanomaly",added:"2026-07-30",name:"Red Weak (Protanomaly)",stat:"~1% of men",description:"Red-sensitive cones respond weakly: reds dim and drift towards green.",label:"Red Weak - Protanomaly - ~1% of men"},{value:"protanopia",added:"2026-07-30",name:"Red Absent (Protanopia)",stat:"~1% of men",description:"Red light barely registers \u2014 reds darken and sink into the greens around them.",label:"Red Absent - Protanopia - ~1% of men"},{value:"deuteranopia",added:"2026-07-30",name:"Green Absent (Deuteranopia)",stat:"~1% of men",description:"No working green cones: red and green become the same family of murky ochre.",label:"Green Absent - Deuteranopia - ~1% of men"},{value:"tritanomaly",added:"2026-07-30",name:"Blue Weak (Tritanomaly)",stat:"<0.2%",description:"Blue-sensitive cones respond weakly: blues and greens blur together, yellows go pale.",label:"Blue Weak - Tritanomaly - <0.2%"},{value:"tritanopia",added:"2026-07-30",name:"Blue Absent (Tritanopia)",stat:"<0.01%",description:"No working blue cones \u2014 blues read as greens, yellows as pinks and greys.",label:"Blue Absent - Tritanopia - <0.01%"},{value:"achromatopsia",added:"2026-07-30",name:"Monochromacy (Achromatopsia)",stat:"~0.003%",description:"No colour at all: brightness is the only signal left, usually with strong glare sensitivity.",label:"Monochromacy - Achromatopsia - ~0.003%"}]},{label:"Eye conditions",options:[{value:"presbyopia",added:"2026-07-30",name:"Near-Vision Loss (Presbyopia)",stat:"nearly all over 50",description:"The lens stiffens with age and close text blurs \u2014 the one condition almost everyone gets.",label:"Near-Vision Loss - Presbyopia - nearly all over 50"},{value:"glaucoma",added:"2026-07-30",name:"Tunnel Vision (Glaucoma)",stat:"~2% over 40",description:"Peripheral vision closes in until only a central window stays sharp. The window follows your pointer.",label:"Tunnel Vision - Glaucoma - ~2% over 40"},{value:"glaucomaLarge",added:"2026-07-30",name:"Tunnel Vision (Advanced Glaucoma)",stat:"~0.5% over 40",description:"Advanced glaucoma: the sharp window narrows further; everything else is gone, not blurred.",label:"Tunnel Vision (Large) - Advanced Glaucoma - ~0.5% over 40"},{value:"macularDegeneration",added:"2026-07-30",name:"Central Vision Loss (Macular Degeneration)",stat:"~8% over 45",description:"The centre of gaze fades first \u2014 precisely where you point your eyes to read.",label:"Central Vision Loss - Macular Degeneration - ~8% over 45"},{value:"macularDegenerationLarge",added:"2026-07-30",name:"Central Vision Loss (Advanced Macular Degeneration)",stat:"~1% over 50",description:"Advanced macular degeneration: a larger central blank that reading must route around.",label:"Central Vision Loss (Large) - Advanced Macular Degeneration - ~1% over 50"},{value:"diabeticRetinopathy",added:"2026-07-30",name:"Patchy Vision (Diabetic Retinopathy)",stat:"~0.8% over 40",description:"Blood-vessel damage scatters dark blotches across the view; content falls into them.",label:"Patchy Vision - Diabetic Retinopathy - ~0.8% over 40"},{value:"floaters",name:"Drifting Shadows (Floaters)",added:"2026-09-12",stat:"~33%",description:"Strands and specks in the eye cast shadows that drift and lag behind every eye movement. They show most against bright, flat areas, so a page of white space is where they live.",label:"Drifting Shadows - Floaters - ~33%"},{value:"nystagmus",added:"2026-07-30",name:"Involuntary Eye Movement (Nystagmus)",stat:"~0.2%",description:"The eyes move on their own, so the page never quite holds still.",label:"Involuntary Eye Movement - Nystagmus - ~0.2%"}]},{label:"Field of vision",options:[{value:"hemianopiaLeft",added:"2026-07-30",name:"Left Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the left half of vision in both eyes.",label:"Left Field Loss - Hemianopia (Left) - ~0.1% over 49"},{value:"hemianopiaRight",added:"2026-07-30",name:"Right Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the right half of vision in both eyes.",label:"Right Field Loss - Hemianopia (Right) - ~0.1% over 49"},{value:"retinitisRing",name:"Ring Loss (Retinitis Pigmentosa)",added:"2026-08-22",stat:"~0.025%",description:"Early retinitis pigmentosa takes a ring out of the mid-periphery, leaving a clear centre and a seeing outer rim. It narrows to a tunnel only much later, so this donut, not the tunnel, is what most of that life looks like.",label:"Ring Loss - Retinitis Pigmentosa - ~0.025%"},{value:"amblyopia",added:"2026-07-30",name:"Reduced Acuity (Amblyopia)",stat:"~2-3%",description:"One eye never learned to see sharply; fine detail and depth suffer.",label:"Reduced Acuity (One Eye) - Amblyopia - ~2-3%"},{value:"afterimages",added:"2026-09-14",name:"Afterimages (Palinopsia)",stat:"~10% with migraine",description:"Anything that moves leaves a fading copy of itself behind, the page under scroll included: a carousel becomes a smear and the page takes a couple of seconds to settle after every scroll. Content the page moves on its own is the finding. Needs the page's own pixels, so it asks to share this tab (Chromium) and says so where it cannot.",label:"Afterimages - Palinopsia - ~10% with migraine"}]},{label:"Focus & acuity",options:[{value:"lowAcuityMild",added:"2026-07-30",name:"Slight Defocus",description:"Mildly uncorrected eyesight \u2014 the glasses left in the other room.",label:"Slight Defocus - Mild Blur"},{value:"lowAcuity",added:"2026-07-30",name:"Uncorrected Focus",stat:"~5-6%",description:"Moderate uncorrected short-sight: small text needs effort, thin fonts give up first.",label:"Uncorrected Focus - Moderate Blur - ~5-6%"},{value:"lowAcuityStrong",added:"2026-07-30",name:"Significant Defocus",description:"Strong blur: layout and colour still communicate, letterforms mostly do not.",label:"Significant Defocus - Strong Blur"},{value:"lowAcuityHeavy",added:"2026-07-30",name:"Severe Defocus",description:"Only shape, contrast and position survive. What does your page still say?",label:"Severe Defocus - Very Strong Blur"}]},{label:"Contrast & light",options:[{value:"cataract",added:"2026-07-30",name:"Clouded Lens (Cataract)",stat:"~17% over 40",description:"The lens clouds and yellows: glare blooms, contrast drains, whites go dingy.",label:"Clouded Lens - Cataract - ~17% over 40"},{value:"lowContrast",added:"2026-07-30",name:"Reduced Contrast",description:"Contrast sensitivity loss: faint greys sink into their backgrounds long before they vanish for you.",label:"Reduced Contrast"},{value:"lowLight",added:"2026-07-30",name:"Dim Environment",description:"A dim room, a cheap panel, a phone at night \u2014 the low-vision hours everyone has.",label:"Dim Environment - Low Light"},{value:"glossyScreen",added:"2026-09-12",name:"Glossy Screen (Reflections)",description:"The room and your own face reflect off the glass and add light to every dark pixel. White areas barely change; dark themes, grey-on-black text and low-contrast controls wash out first. Uses your camera on this device only, never recorded or sent.",label:"Glossy Screen - Reflections"}]},{label:"Ageing",options:[{value:"ageSlider",added:"2026-09-14",name:"Age Slider",description:"One slider from twenty to ninety: the lens yellows, the pupil shrinks, contrast and near focus fall, the page\u2019s own audio and video pass through the median ear of that age (ISO 7029), and from sixty-five the pointer shows the tremor one in twenty has, all on published population curves. An approximation: any one reader sits above or below them. Grey text and small buttons are the first to go.",label:"Age Slider"}]},{label:"Visual stress",options:[{value:"scotopicRose",added:"2026-07-30",name:"Rose Tint",description:"A coloured overlay some readers use to calm pattern glare. See how your design reads through one.",label:"Rose Tint - Coloured Overlay"},{value:"scotopicYellow",added:"2026-07-30",name:"Yellow Tint",description:"A yellow reading overlay \u2014 common for visual stress. Your palette should survive it.",label:"Yellow Tint - Coloured Overlay"},{value:"scotopicAqua",added:"2026-07-30",name:"Aqua Tint",description:"An aqua reading overlay. Tinted reading is more common than most designs assume.",label:"Aqua Tint - Coloured Overlay"}]}],be={none:{label:"None",css:"none"},fluorescentFlicker:{label:"Fluorescent Flicker",overlay:"fluorescentFlicker",css:"none"},lightSensitivity:{label:"Light Sensitivity",css:"brightness(1.4) contrast(1.2) saturate(1.1)"},colourHypersensitivity:{label:"Colour Hypersensitivity",css:"saturate(2.2) contrast(1.35) brightness(1.1)"},motionSensitivity:{label:"Motion Sensitivity",hostClass:"pour-sensory-filter-motionSensitivity",viewportOrigin:!0,css:"none"},hyperfocusTunnel:{label:"Hyperfocus Tunnel (Metaphor)",overlay:"hyperfocusTunnel",mouseTracked:!0,css:"none"},attentionFragmentation:{label:"Attention Fragmentation (Metaphor)",overlay:"attentionFragmentation",css:"none"},peripheralDistraction:{label:"Peripheral Distraction",overlay:"peripheralDistraction",css:"none"},detailFixation:{label:"Detail Fixation (Metaphor)",overlay:"detailFixation",mouseTracked:!0,loupe:{scale:2,radius:150,ring:75},css:"none"},processingDelay:{label:"Processing Lag",overlay:"processingDelay",css:"none"},sensoryInterference:{label:"Sensory Interference",hostClass:"pour-sensory-filter-backgroundNoise",css:"none"},sensorySpike:{label:"Sudden Sensory Spike",overlay:"sensorySpike",css:"none"},dyslexiaVisualStress:{label:"Visual Stress (Pattern Glare)",overlay:"dyslexiaVisualStress",injectCSS:`
        body { background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.06) 22px, rgba(0,0,0,0.06) 24px) !important; background-attachment: fixed !important; }
        p, li, td, th, dd, dt, h1, h2, h3, h4, h5, h6, label { text-shadow: 0 0 1px rgba(0,0,0,0.15) !important; animation: pour-sensory-line-merge 3s ease-in-out infinite alternate !important; }
        @keyframes pour-sensory-line-merge { 0% { transform: scaleX(1) translateY(0); } 25% { transform: scaleX(1.008) translateY(0.8px); } 50% { transform: scaleX(0.993) translateY(-0.5px); } 75% { transform: scaleX(1.005) translateY(0.6px); } 100% { transform: scaleX(0.996) translateY(-0.3px); } }
      `,css:"none"},dyslexiaCrowding:{label:"Crowding Effect",injectCSS:"* { letter-spacing: -1px !important; word-spacing: -3px !important; line-height: 1.05 !important; } p, li, td, th, dd, dt, label, span, a { font-size: 95% !important; }",css:"none"},dyslexiaTrackingLoss:{label:"Tracking Loss",overlay:"dyslexiaTrackingLoss",mouseTracked:!0,css:"none"},dyslexiaWashout:{label:"Letter Instability",injectScript:!0,css:"none"},dyslexiaContrastSensitivity:{label:"Contrast Sensitivity",css:"contrast(0.8) brightness(1.1) saturate(0.9)"},handTremor:{label:"Hand Tremor",cursorJitter:{freq:6,amp:9,intent:1.6,bitmap:96},css:"none"},handTremorStrong:{label:"Hand Tremor (Strong)",cursorJitter:{freq:5,amp:18,intent:1.9,bitmap:128},css:"none"},restingTremor:{label:"Resting Tremor",cursorJitter:{freq:4.5,amp:12,intent:-.9,bitmap:96},css:"none"},ataxicDrift:{label:"Ataxic Drift",cursorJitter:{freq:.7,amp:26,intent:.8,bitmap:128},css:"none"},pointerSpasm:{label:"Sudden Jerk",cursorJitter:{freq:5,amp:3,intent:.4,bitmap:128,spasm:{minGap:2200,maxGap:6500,size:44,dur:280}},css:"none"},pointerHidden:{label:"Hidden Pointer (Keyboard Only)",cursorJitter:{hide:!0,bitmap:32},css:"none"},fingertipTouch:{label:"Fingertip Touch",fingertip:{diameter:38},css:"none"},forcedColours:{label:"Forced Colours",forcedColours:!0,css:"none"},screenMagnifier:{label:"Screen Magnifier (400%)",magnifier:{scale:4},css:"none"},textSpacing:{label:"Text Spacing",injectCSS:`
        *:not([data-pour-audit]):not([data-pour-audit] *) { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
        p:not([data-pour-audit] *) { margin-bottom: 2em !important; }
      `,css:"none"},focusOrder:{label:"Focus Order",lens:"focusOrder",css:"none"},landmarkMap:{label:"Landmarks & Headings",lens:"landmarkMap",css:"none"},hearingLoss:{label:"Hearing Loss on the Page's Media",driver:"hearingLoss",options:{audiogram:"moderate"},frames:!0,css:"none"}},Qe={afterimages:{driver:"afterimages",options:{decay:.86}},ageSlider:{driver:"ageSlider",options:{start:45},frames:!0}},er=[{label:"Sensory overload",options:[{value:"fluorescentFlicker",added:"2026-07-30",name:"Fluorescent Flicker",description:"The pulse of failing fluorescent light \u2014 flicker that many autistic and migraine-prone people cannot tune out.",label:"Fluorescent Flicker"},{value:"lightSensitivity",added:"2026-07-30",name:"Light Sensitivity",description:"Photophobia: ordinary brightness arrives as glare; bright themes read as pain.",label:"Light Sensitivity"},{value:"colourHypersensitivity",added:"2026-07-30",name:"Colour Hypersensitivity",description:"Saturated colour lands far louder than you sent it.",label:"Colour Hypersensitivity"},{value:"motionSensitivity",added:"2026-07-30",name:"Motion Sensitivity",stat:"~5% of adults",description:"Page motion is felt, not just seen \u2014 what autoplaying movement does to a vestibular-sensitive visitor.",label:"Motion Sensitivity"}]},{label:"Attention & focus",options:[{value:"hyperfocusTunnel",added:"2026-07-30",name:"Hyperfocus Tunnel",metaphor:!0,description:"The world outside the point of focus falls away; the page exists one region at a time.",label:"Hyperfocus Tunnel (Metaphor)"},{value:"attentionFragmentation",added:"2026-07-30",name:"Attention Fragmentation",metaphor:!0,description:"A scattered attention field \u2014 every element competes and none of them wins.",label:"Attention Fragmentation (Metaphor)"},{value:"peripheralDistraction",added:"2026-07-30",name:"Peripheral Distraction",description:"Movement at the edges keeps stealing the centre of your gaze.",label:"Peripheral Distraction"},{value:"detailFixation",added:"2026-09-12",name:"Detail Fixation",metaphor:!0,description:"Detail-first processing: the point of attention magnifies while the whole recedes.",label:"Detail Fixation (Metaphor)"}]},{label:"Processing differences",options:[{value:"processingDelay",added:"2026-07-30",name:"Processing Lag",description:"The page lands a beat late \u2014 interaction as it feels under cognitive load.",label:"Processing Lag"},{value:"sensoryInterference",added:"2026-07-30",name:"Sensory Interference",description:"Visual noise under everything, like reading in a room that will not go quiet.",label:"Sensory Interference"}]},{label:"Sensory spikes",options:[{value:"sensorySpike",added:"2026-07-30",name:"Sudden Sensory Spike",description:"Not a constant state: periodic waves of too-much, out of nowhere.",label:"Sudden Sensory Spike"}]},{label:"Dyslexia / reading",options:[{value:"dyslexiaVisualStress",added:"2026-07-30",name:"Visual Stress (Pattern Glare)",stat:"~10%",description:"Dense text shimmers and bands together; lines merge and repel.",label:"Visual Stress (Pattern Glare)"},{value:"dyslexiaCrowding",added:"2026-07-30",name:"Crowding Effect",stat:"~10%",description:"Letters and words pack too tightly to separate \u2014 spacing is doing more work than you think.",label:"Crowding Effect"},{value:"dyslexiaTrackingLoss",added:"2026-07-30",name:"Tracking Loss",stat:"~10%",description:"Losing the line mid-sentence: only the neighbourhood of your pointer holds steady.",label:"Tracking Loss"},{value:"dyslexiaWashout",added:"2026-07-30",name:"Letter Instability",stat:"~10%",description:"Some letters appear fainter than others, making words harder to read. Try reading a paragraph with the effect enabled.",label:"Letter Instability"},{value:"dyslexiaContrastSensitivity",added:"2026-07-30",name:"Contrast Sensitivity",stat:"~10%",description:"Full-contrast text tires, low-contrast text disappears; the readable band is narrow.",label:"Contrast Sensitivity"}]}],tr=[{label:"Tremor",options:[{value:"handTremor",added:"2026-08-06",name:"Hand Tremor",stat:"~1%",description:"An essential tremor: the pointer shakes harder the more precisely you aim.",label:"Hand Tremor"},{value:"handTremorStrong",added:"2026-08-06",name:"Hand Tremor (Strong)",description:"The same tremor, stronger \u2014 small close-set targets become lotteries.",label:"Hand Tremor (Strong)"},{value:"restingTremor",added:"2026-08-06",name:"Resting Tremor",stat:"~0.3%",description:"A parkinsonian pattern: shakes at rest, steadies during deliberate movement.",label:"Resting Tremor"}]},{label:"Pointer control",options:[{value:"ataxicDrift",added:"2026-08-06",name:"Ataxic Drift",description:"The pointer drifts wide of intent; straight lines are not on offer.",label:"Ataxic Drift"},{value:"pointerSpasm",added:"2026-08-06",name:"Sudden Jerk",description:"Occasional involuntary jerks fling the pointer \u2014 sometimes mid-click.",label:"Sudden Jerk"},{value:"pointerHidden",added:"2026-08-06",name:"Hidden Pointer (Keyboard Only)",description:"No pointer at all. The keyboard is the only way through your page.",label:"Hidden Pointer (Keyboard Only)"}]},{label:"Touch",options:[{value:"fingertipTouch",added:"2026-09-13",name:"Fingertip Touch",description:"The pointer becomes a fingertip, about 10 mm across. Every target under it is outlined, and when more than one is, each shows its share of the fingertip. A click lands the way a tap does: on one of those targets, in proportion to its share. Close-set links and small buttons are the findings.",label:"Fingertip Touch"}]}],rr=[{label:"Keyboard",options:[{value:"focusOrder",added:"2026-09-07",name:"Focus Order",description:"Numbered stops trace where Tab really goes, in order. Amber stops force their own position with a positive tabindex.",label:"Focus Order"}]},{label:"Page structure",options:[{value:"landmarkMap",added:"2026-09-07",name:"Landmarks & Headings",description:"Landmark regions tinted and named, every heading chipped with its level. Amber chips skip a level.",label:"Landmarks & Headings"}]}],ar=[{label:"Colours",options:[{value:"forcedColours",added:"2026-09-12",name:"Forced Colours (Windows Contrast Theme)",stat:"~4% on Windows",description:"Every colour the page chose is replaced by a contrast theme\u2019s handful. Backgrounds, gradients and shadows go; borders keep their width; images and video stay, with a plate behind any text over them, as Windows draws it. Icon buttons that vanish, borderless fields and missing focus rings are the findings. An approximation: the page\u2019s own forced-colours rules are applied where its stylesheets can be read.",label:"Forced Colours (Windows Contrast Theme)"}]},{label:"Magnification",options:[{value:"screenMagnifier",added:"2026-09-13",name:"Screen Magnifier (400%)",description:"The page at 400%, as a full-screen magnifier shows it: a quarter of the width at a time, following the pointer and keyboard focus. When something changes outside the magnified view, a marker at the edge points to it. Messages, basket counts and menus that appear where the reader is not looking are the findings.",label:"Screen Magnifier (400%)"}]},{label:"Text",options:[{value:"textSpacing",added:"2026-09-12",name:"Text Spacing",description:"Line height 1.5, paragraph spacing 2, letter spacing 0.12 and word spacing 0.16 times the font size: the overrides low-vision and dyslexic readers apply, which WCAG 1.4.12 says a page must survive. Clipped labels, overflowing boxes and buttons that break are the findings.",label:"Text Spacing"}]}],nr=[{label:"Hearing loss",options:[{value:"hearingLoss",added:"2026-09-14",name:"Hearing Loss on the Page's Media",stat:"~20%",description:"The page\u2019s own audio and video through an audiogram, mild to severe, or a noisy room. Turning the volume up does not help; captions do.",label:"Hearing Loss on the Page's Media - ~20%"}]}],Ie={};for(let e of[...Zt,...er,...tr,...rr,...ar,...nr])for(let t of e.options)Ie[t.value]=t.label.split(" - ")[0];function Pe(e){return e.assignedSlot??e.parentElement??e.getRootNode()?.host??null}var Ze=new WeakMap,or=new Set;function ir(e){let t=Ze.get(e);if(!t){let r=typeof MutationObserver=="function"?new MutationObserver(()=>{t.ids=null,t.parents=new WeakMap}):null;t={ids:null,parents:new WeakMap,observer:r},r&&(r.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["id"]}),or.add(r)),Ze.set(e,t)}if(t.observer?.takeRecords().length&&(t.ids=null,t.parents=new WeakMap),!t.ids){t.ids=new Map;for(let r of e.querySelectorAll("[id]"))t.ids.set(r.id,(t.ids.get(r.id)??0)+1)}return t}function sr(e,t){let r=e.parentElement,a=t.parents.get(r);if(!a){let s=new Map;a=new WeakMap;for(let n of r.children){let i=(s.get(n.tagName)??0)+1;s.set(n.tagName,i),a.set(n,{position:i,repeated:!1})}for(let n of r.children)a.get(n).repeated=s.get(n.tagName)>1;t.parents.set(r,a)}return a.get(e)}function et(e){let t=e.getRootNode(),r=ir(t),a=i=>i.id&&r.ids.get(i.id)===1;if(a(e))return`#${CSS.escape(e.id)}`;let s=[],n=e;for(;n&&n.nodeType===Node.ELEMENT_NODE&&n!==document.documentElement;){let i=n.tagName.toLowerCase();if(n.parentElement){let{position:l,repeated:m}=sr(n,r);m&&(i+=`:nth-of-type(${l})`)}if(s.unshift(i),n.parentElement&&a(n.parentElement)){s.unshift(`#${CSS.escape(n.parentElement.id)}`);break}n=n.parentElement}return s.join(" > ")||e.tagName.toLowerCase()}function tt(e){let t=et(e),r=e.getRootNode();for(;r&&r.host;)t=`${et(r.host)} >>> ${t}`,r=r.host.getRootNode();return t}var sa=typeof Element<"u"?Object.getOwnPropertyDescriptor(Element.prototype,"attributes")?.get:null;function rt(e){for(let t=e;t;t=Pe(t))if(t.nodeType===1&&t.hasAttribute("inert"))return!0;return!1}var lr=new Set(["atomic","busy","controls","current","describedby","description","details","dropeffect","flowto","grabbed","hidden","keyshortcuts","label","labelledby","live","owns","relevant","roledescription","braillelabel","brailleroledescription"]),nt=new Set(["banner","complementary","contentinfo","form","main","navigation","region","search"]),cr={link:["disabled","errormessage","expanded","haspopup","invalid"],button:["disabled","errormessage","expanded","haspopup","invalid","pressed"],checkbox:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],switch:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],radio:["checked","disabled","errormessage","haspopup","invalid","posinset","setsize"],option:["checked","disabled","errormessage","haspopup","invalid","posinset","selected","setsize"],tab:["disabled","errormessage","expanded","haspopup","invalid","posinset","selected","setsize"],menuitem:["disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemcheckbox:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemradio:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],textbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],searchbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],combobox:["activedescendant","autocomplete","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],listbox:["activedescendant","disabled","errormessage","expanded","haspopup","invalid","multiselectable","orientation","readonly","required"],slider:["disabled","errormessage","haspopup","invalid","orientation","readonly","valuemax","valuemin","valuenow","valuetext"],spinbutton:["activedescendant","disabled","errormessage","haspopup","invalid","readonly","required","valuemax","valuemin","valuenow","valuetext"],progressbar:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],meter:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],scrollbar:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],heading:["disabled","errormessage","haspopup","invalid","level"],list:["disabled","errormessage","haspopup","invalid"],listitem:["disabled","errormessage","haspopup","invalid","level","posinset","setsize"],row:["activedescendant","colindex","colindextext","disabled","errormessage","expanded","haspopup","invalid","level","posinset","rowindex","rowindextext","selected","setsize"],rowgroup:["disabled","errormessage","haspopup","invalid"],cell:["colindex","colindextext","colspan","disabled","errormessage","haspopup","invalid","rowindex","rowindextext","rowspan"],gridcell:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected"],columnheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],rowheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],table:["colcount","disabled","errormessage","haspopup","invalid","rowcount"],grid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","readonly","rowcount"],treegrid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","orientation","readonly","required","rowcount"],tablist:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation"],menu:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],menubar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],tree:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation","required"],treeitem:["checked","disabled","errormessage","expanded","haspopup","invalid","level","posinset","selected","setsize"],radiogroup:["activedescendant","disabled","errormessage","haspopup","invalid","orientation","readonly","required"],group:["activedescendant","disabled","errormessage","haspopup","invalid"],separator:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],toolbar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],dialog:["disabled","errormessage","haspopup","invalid","modal"],alertdialog:["disabled","errormessage","haspopup","invalid","modal"],application:["activedescendant","disabled","errormessage","expanded","haspopup","invalid"],article:["disabled","errormessage","haspopup","invalid","posinset","setsize"],img:["disabled","errormessage","haspopup","invalid"],figure:["disabled","errormessage","haspopup","invalid"],document:["disabled","errormessage","haspopup","invalid"],feed:["disabled","errormessage","haspopup","invalid"],math:["disabled","errormessage","haspopup","invalid"],note:["disabled","errormessage","haspopup","invalid"],presentation:["disabled","errormessage","haspopup","invalid"],none:["disabled","errormessage","haspopup","invalid"],banner:["disabled","errormessage","haspopup","invalid"],complementary:["disabled","errormessage","haspopup","invalid"],contentinfo:["disabled","errormessage","haspopup","invalid"],form:["disabled","errormessage","haspopup","invalid"],main:["disabled","errormessage","haspopup","invalid"],navigation:["disabled","errormessage","haspopup","invalid"],region:["disabled","errormessage","haspopup","invalid"],search:["disabled","errormessage","haspopup","invalid"],alert:["disabled","errormessage","haspopup","invalid"],log:["disabled","errormessage","haspopup","invalid"],marquee:["disabled","errormessage","haspopup","invalid"],status:["disabled","errormessage","haspopup","invalid"],timer:["disabled","errormessage","haspopup","invalid"],tabpanel:["disabled","errormessage","haspopup","invalid"],tooltip:["disabled","errormessage","haspopup","invalid"],definition:["disabled","errormessage","haspopup","invalid"],term:["disabled","errormessage","haspopup","invalid"],paragraph:["disabled","errormessage","haspopup","invalid"],generic:["disabled","errormessage","haspopup","invalid"],blockquote:["disabled","errormessage","haspopup","invalid"],caption:["disabled","errormessage","haspopup","invalid"],code:["disabled","errormessage","haspopup","invalid"],emphasis:["disabled","errormessage","haspopup","invalid"],strong:["disabled","errormessage","haspopup","invalid"],time:["disabled","errormessage","haspopup","invalid"],deletion:["disabled","errormessage","haspopup","invalid"],insertion:["disabled","errormessage","haspopup","invalid"],subscript:["disabled","errormessage","haspopup","invalid"],superscript:["disabled","errormessage","haspopup","invalid"]},pr={checkbox:"checkbox",radio:"radio",range:"slider",number:"spinbutton",search:"searchbox",email:"textbox",tel:"textbox",text:"textbox",url:"textbox",button:"button",submit:"button",reset:"button",image:"button"},dr=new Set(["text","search","tel","url","email"]),ur={button:"button",textarea:"textbox",img:"img",article:"article",aside:"complementary",nav:"navigation",main:"main",search:"search",h1:"heading",h2:"heading",h3:"heading",h4:"heading",h5:"heading",h6:"heading",ul:"list",ol:"list",menu:"list",li:"listitem",table:"table",thead:"rowgroup",tbody:"rowgroup",tfoot:"rowgroup",tr:"row",td:"cell",th:"columnheader",form:"form",fieldset:"group",details:"group",dialog:"dialog",hr:"separator",progress:"progressbar",meter:"meter",output:"status",option:"option",datalist:"listbox",dt:"term",dd:"definition",p:"paragraph",div:"generic",span:"generic",blockquote:"blockquote",figure:"figure",time:"time",code:"code",em:"emphasis",strong:"strong"};function at(e){let t=e.tagName.toLowerCase();if(t==="a"||t==="area")return e.hasAttribute("href")?"link":"generic";if(t==="input")return dr.has(e.type)&&e.hasAttribute("list")?"combobox":pr[e.type]??null;if(t==="td"||t==="th"){if(t==="th"&&e.getAttribute("scope")?.toLowerCase()==="row")return"rowheader";if(t==="th")return"columnheader";let r=e.closest("table"),a=r&&Be(r);return a==="grid"||a==="treegrid"?"gridcell":"cell"}if(t==="select")return e.multiple||e.size>1?"listbox":"combobox";if(t==="img")return e.getAttribute("alt")===""?"presentation":"img";if(t==="header")return e.closest("article, aside, main, nav, section")?"generic":"banner";if(t==="footer")return e.closest("article, aside, main, nav, section")?"generic":"contentinfo";if(t==="aside"){let r=e.parentElement?.closest("article, aside, nav, section"),a=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby");return r&&!a?"generic":"complementary"}return t==="section"?e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")?"region":"generic":ur[t]??null}function fr(e){return[...lr].some(t=>e.hasAttribute(`aria-${t}`))?!0:e.matches(":disabled")||rt(e)?!1:e.tabIndex>=0?!0:e.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]')}function Be(e){let t=e.getAttribute("role")?.trim().split(/\s+/)??[];for(let r of t){let a=r.toLowerCase();if(a==="image")return"img";if(cr[a])return(a==="presentation"||a==="none")&&fr(e)?at(e):a}return at(e)}var ot=`/* Structure-lens overlay styles (focus order, landmark map): injected by
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
`;function ze(e){if(e.getElementById("pour-lens-styles"))return;let t=e.createElement("style");t.id="pour-lens-styles",t.dataset.pourAudit="overlay",t.textContent=ot,e.head.appendChild(t)}function ye(e=document){let t=e.defaultView,r={contentVisibilityAuto:!0,visibilityProperty:!0,checkVisibilityCSS:!0};function a(l){for(let m=l;m&&m!==e.documentElement;m=m.parentElement??m.getRootNode()?.host??null){let y=m.ownerDocument.defaultView.getComputedStyle(m).position;if(y==="fixed")return"fixed";if(y==="sticky")return"sticky"}return"flow"}function s(l,{withLine:m=!1}={}){let y="background:none;border:0;margin:0;padding:0;box-shadow:none;filter:none;opacity:1;mix-blend-mode:normal;",g=e.createElement("div");g.className=l,g.dataset.pourAudit="overlay",g.style.cssText=`position:absolute;top:0;left:0;width:0;height:0;overflow:clip;overflow-clip-margin:24px;pointer-events:none;z-index:2147483646;${y}`;let f=e.createElement("div");f.className=l,f.dataset.pourAudit="overlay",f.style.cssText=`position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:2147483646;${y}`;let E=0,x=0,w=null,v=null,T=null;if(m){v=e.createElementNS("http://www.w3.org/2000/svg","svg"),v.setAttribute("class",`${l.replace(/-layer$/,"")}-path`);for(let[d,M]of[["position","absolute"],["top","0"],["left","0"],["width","100%"],["height","100%"],["max-width","none"],["max-height","none"],["display","block"],["overflow","visible"],["pointer-events","none"],["background","none"],["border","0"],["margin","0"],["padding","0"],["box-shadow","none"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])v.style.setProperty(d,M,"important");T=e.createElementNS("http://www.w3.org/2000/svg","polyline"),w=e.createElementNS("http://www.w3.org/2000/svg","polyline");for(let[d,M,h]of[[T,"rgba(29,78,216,0.85)","3"],[w,"#93C5FD","1.5"]])for(let[B,X]of[["fill","none"],["stroke",M],["stroke-width",h],["stroke-linejoin","round"],["stroke-linecap","round"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])d.style.setProperty(B,X,"important");v.append(T,w),g.append(v)}let A=[],L=null,V=0,k=(d,M)=>{let h=d.el.getBoundingClientRect(),B=h.width<=0&&h.height<=0||!d.el.isConnected||d.el.checkVisibility&&!d.el.checkVisibility(r);if(d.node.style.display=B?"none":"",B){d.docPt=null,d.viewRect=null;return}let X=d.anchor==="flow"?h.left-M.left:h.left,W=d.anchor==="flow"?h.top-M.top:h.top;if(d.node.style.transform=`translate(${X}px, ${W}px)`,d.sized)d.node.style.width=`${h.width}px`,d.node.style.height=`${h.height}px`;else{let P=d.node.getBoundingClientRect(),j=d.anchor==="flow"?{left:M.left,top:M.top,right:M.left+E,bottom:M.top+x}:{left:0,top:0,right:t.innerWidth,bottom:t.innerHeight},K=P.left<j.left?j.left-P.left:P.right>j.right?j.right-P.right:0,D=P.top<j.top?j.top-P.top:P.bottom>j.bottom?j.bottom-P.bottom:0;(K||D)&&(d.node.style.transform=`translate(${X+K}px, ${W+D}px)`)}d.anchor==="flow"?d.docPt=`${X},${W}`:d.viewRect=h},b=d=>{if(!w)return;let M=[];for(let B of A)B.offLine||B.node.style.display==="none"||(B.anchor==="flow"?B.docPt&&M.push(B.docPt):B.viewRect&&M.push(`${B.viewRect.left-d.left},${B.viewRect.top-d.top}`));let h=M.join(" ");T.setAttribute("points",h),w.setAttribute("points",h)},c=()=>{let d=e.documentElement.scrollWidth,M=e.documentElement.scrollHeight;d!==E&&(E=d,g.style.width=`${d}px`),M!==x&&(x=M,g.style.height=`${M}px`);let h=g.getBoundingClientRect();for(let B of A)k(B,h);b(h)};e.body.append(g,f);let u=()=>{V=t.requestAnimationFrame(u),c()};return u(),{setItems(d,M){for(let h of A)h.node.remove();A=d.map(h=>{let B=a(h.el);return(B==="flow"?g:f).append(h.node),{...h,anchor:B,docPt:null,viewRect:null}}),M&&!A.length?(L||(L=e.createElement("div"),L.className="pour-lens-notice",f.append(L)),L.textContent=M,L.style.display=""):L&&(L.style.display="none"),c()},destroy(){t.cancelAnimationFrame(V),g.remove(),f.remove(),A=[]}}}function n(l,m){for(let y=l.parentElement??l.getRootNode()?.host;y&&y!==e.documentElement;y=y.parentElement??y.getRootNode()?.host){let g=y.ownerDocument.defaultView.getComputedStyle(y);if(g.overflow==="visible"&&g.overflowX==="visible"&&g.overflowY==="visible")continue;let f=y.getBoundingClientRect();if(m.right<=f.left||m.left>=f.right||m.bottom<=f.top||m.top>=f.bottom)return!0}return!1}function i(){let l=[],m=[],y=g=>{for(let f of g.querySelectorAll("*")){if(f.dataset&&f.dataset.pourAudit||(f.shadowRoot&&y(f.shadowRoot),!f.matches('a[href], area[href], button, input, select, textarea, summary, iframe, object, embed, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]'))||f.disabled||f.closest("[inert]")||f.checkVisibility&&!f.checkVisibility(r))continue;let E=f.getBoundingClientRect();if(E.width<=0&&E.height<=0)continue;let x=f.getAttribute("tabindex"),w=x==null?0:parseInt(x,10)||0;if(w<0){f.matches("a[href], area[href], button, input, select, textarea, summary")&&!n(f,E)&&m.push({el:f});continue}l.push({el:f,idx:w,order:l.length})}};return y(e),{stops:[...l.filter(g=>g.idx>0).sort((g,f)=>g.idx-f.idx||g.order-f.order),...l.filter(g=>g.idx===0)],unreachable:m}}return{createLensTracker:s,collectFocusStops:i,clippedOutOfSight:n,VISIBLE_OPTS:r,anchorKind:a}}function it(e=document,t=ye(e)){let r=e.defaultView,{createLensTracker:a,collectFocusStops:s,VISIBLE_OPTS:n}=t,i=null,l=0,m=null;function y(){if(i)return;ze(e),i=a("pour-focus-order-layer",{withLine:!0});let L=()=>{let{stops:V,unreachable:k}=s(),b=V.map((c,u)=>{let d=e.createElement("span");return d.className="pour-focus-badge"+(c.idx>0?" pour-focus-badge-forced":""),d.textContent=String(u+1),c.idx>0&&(d.title=`tabindex="${c.idx}" forces this position`),{el:c.el,node:d,sized:!1}});for(let{el:c}of k){let u=e.createElement("span");u.className="pour-focus-badge pour-focus-badge-unreachable",u.textContent="\u2715",u.title='tabindex="-1" \u2014 a keyboard cannot Tab to this control',b.push({el:c,node:u,sized:!1,offLine:!0})}i.setItems(b,"Focus order: this page has no keyboard-reachable controls")};L(),m=new r.MutationObserver(()=>{l||(l=r.setTimeout(()=>{l=0,L()},400))}),m.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function g(){r.clearTimeout(l),l=0,m?.disconnect(),m=null,i?.destroy(),i=null}let f=null,E=0,x=null;function w(L){let V=L.getAttribute("aria-label");if(V?.trim())return V.trim();let k=L.getAttribute("aria-labelledby");return k?k.split(/\s+/).map(b=>L.getRootNode().getElementById?.(b)?.textContent.trim()??"").filter(Boolean).join(" "):""}function v(){let L=[],V=[],k=c=>{for(let u of c.querySelectorAll("*")){if(u.dataset&&u.dataset.pourAudit||(u.shadowRoot&&k(u.shadowRoot),u.checkVisibility&&!u.checkVisibility(n)))continue;let d=u.getBoundingClientRect();if(d.width<=0&&d.height<=0)continue;let M=Be(u);if(nt.has(M)){if(M==="form"&&!w(u))continue;L.push({el:u,role:M,name:w(u)})}else if(M==="heading"){let h=parseInt(u.getAttribute("aria-level"),10)||parseInt(u.tagName.charAt(1),10)||2;V.push({el:u,level:h})}}};k(e);let b=null;for(let c of V)c.skipped=b!=null&&c.level>b+1,c.from=b,b=c.level;return{landmarks:L,headings:V}}function T(){if(f)return;ze(e),f=a("pour-map-layer");let L=()=>{let{landmarks:V,headings:k}=v(),b=[];for(let c of V){let u=e.createElement("div");u.className=`pour-map-region pour-map-role-${c.role}`;let d=e.createElement("span");d.className="pour-map-tag",d.textContent=c.name?`${c.role} \xB7 ${c.name}`:c.role,u.append(d),b.push({el:c.el,node:u,sized:!0})}for(let c of k){let u=e.createElement("span");u.className="pour-map-heading"+(c.skipped?" pour-map-heading-skipped":""),u.textContent=`H${c.level}`,c.skipped&&(u.title=`Skips a level \u2014 the heading before this one is an H${c.from}`),b.push({el:c.el,node:u,sized:!1})}f.setItems(b,"No landmarks or headings are exposed on this page")};L(),x=new r.MutationObserver(()=>{E||(E=r.setTimeout(()=>{E=0,L()},400))}),x.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function A(){r.clearTimeout(E),E=0,x?.disconnect(),x=null,f?.destroy(),f=null}return{focusOrder:{apply:y,remove:g},landmarkMap:{apply:T,remove:A}}}var ge="#262626";function mr(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let r=t;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}var re=(e,t,r)=>t+(r-t)*e(),ee=e=>Number(e.toFixed(1));function lt(e,{start:t,steps:r,stride:a,wiggle:s,heading:n}){let i=[t],l=n;for(let m=0;m<r;m++){l+=re(e,-s,s);let y=i[i.length-1];i.push([y[0]+Math.cos(l)*a,y[1]+Math.sin(l)*a])}return i}function ct(e){let t=[];for(let r=0;r<e.length-1;r++){let a=e[Math.max(0,r-1)],s=e[r],n=e[r+1],i=e[Math.min(e.length-1,r+2)],l=[s[0]+(n[0]-a[0])/6,s[1]+(n[1]-a[1])/6],m=[n[0]-(i[0]-s[0])/6,n[1]-(i[1]-s[1])/6];t.push(`M${ee(s[0])} ${ee(s[1])}C${ee(l[0])} ${ee(l[1])} ${ee(m[0])} ${ee(m[1])} ${ee(n[0])} ${ee(n[1])}`)}return t}function qe(e,t){let{width:r=2.6,dark:a=.6}=t,s=r,n=a;return ct(lt(e,t)).map(i=>(s=Math.max(r*.45,Math.min(r*1.9,s+re(e,-.7,.7))),n=Math.max(a*.55,Math.min(a*1.35,n+re(e,-.12,.12))),`<path d="${i}" stroke-width="${ee(s)}" stroke-opacity="${n.toFixed(2)}"/>`)).join("")}function gr(e,t){let r=lt(e,t),a=ct(r).map(n=>`<path d="${n}" stroke-width="1.1" stroke-opacity=".45"/>`).join(""),s=r.filter((n,i)=>i%2===0).map(([n,i])=>`<circle cx="${ee(n)}" cy="${ee(i)}" r="${re(e,1.6,3.4).toFixed(1)}" fill="${ge}" stroke="none" opacity="${re(e,.45,.75).toFixed(2)}"/>`).join("");return a+s}function br(e,t){let r="";for(let a=0;a<4;a++){let s=re(e,0,Math.PI*2);r+=qe(e,{start:[t[0]+re(e,-18,18),t[1]+re(e,-18,18)],steps:9,stride:13,wiggle:.9,heading:s,width:2.2,dark:.55})}return r}function yr(e,t,r){let a=re(e,40,110),s=2*Math.PI*r;return`<circle cx="${t[0]}" cy="${t[1]}" r="${r}" stroke-width="${re(e,5,7).toFixed(1)}" stroke-opacity=".55" stroke-dasharray="${ee(s-a)} ${ee(a)}" transform="rotate(${ee(re(e,0,360))} ${t[0]} ${t[1]})"/><circle cx="${t[0]}" cy="${t[1]}" r="${r}" stroke-width="2" stroke-opacity=".3"/><circle cx="${ee(t[0]+r*1.4)}" cy="${ee(t[1]-r*.6)}" r="3" fill="${ge}" stroke="none" opacity=".5"/>`}function vr(e,t,r){return`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${t}" ry="${r}" fill="url(#cloud)" stroke="none" transform="rotate(-20 ${e[0]} ${e[1]})"/>`}function xr(e,t){let r="";for(let a=0;a<8;a++)r+=`<circle cx="${ee(t[0]+re(e,-40,40))}" cy="${ee(t[1]+re(e,-30,30))}" r="${re(e,1.2,3.2).toFixed(1)}" fill="${ge}" stroke="none" opacity="${re(e,.4,.7).toFixed(2)}"/>`;return r}var kr=(e,t)=>`url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><filter id="b" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="${t}"/></filter><radialGradient id="cloud"><stop offset="0" stop-color="${ge}" stop-opacity=".38"/><stop offset=".55" stop-color="${ge}" stop-opacity=".14"/><stop offset="1" stop-color="${ge}" stop-opacity="0"/></radialGradient></defs><g filter="url(#b)" fill="none" stroke="${ge}" stroke-linecap="round" stroke-linejoin="round">${e}</g></svg>`)}")`;function wr(){let e=mr(20260912);return[{depth:.95,size:.5,start:[.24,.3],art:br(e,[100,100])},{depth:.8,size:.44,start:[.66,.24],art:qe(e,{start:[20,150],steps:12,stride:15,wiggle:.7,heading:-.9,width:3,dark:.62})},{depth:.65,size:.3,start:[.5,.62],art:yr(e,[100,100],17)},{depth:.55,size:.36,start:[.8,.6],art:gr(e,{start:[30,70],steps:10,stride:14,wiggle:.8,heading:.4})},{depth:.4,size:.42,start:[.36,.8],art:vr([100,100],62,34)},{depth:.3,size:.26,start:[.14,.58],art:xr(e,[100,100])},{depth:.15,size:.3,start:[.58,.85],art:qe(e,{start:[40,40],steps:11,stride:12,wiggle:.85,heading:.6,width:2,dark:.5})}]}var Sr=.55,Ar=.4,st=1,Ee=520,Er=2.2;function pt(e,t){let r=e.defaultView,a=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,s={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="multiply",t.style.overflow="hidden";let n=()=>Math.max(180,Math.min(460,.32*Math.min(r.innerWidth,r.innerHeight))),i=wr().map((k,b)=>{let c=e.createElement("div");c.className="pour-floater",c.setAttribute("aria-hidden","true"),c.dataset.pourAudit="filter";let u=(.8+k.depth*1.6).toFixed(2);return Object.assign(c.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",backgroundImage:kr(k.art,u),backgroundSize:"contain",backgroundRepeat:"no-repeat",opacity:(.95-k.depth*.2).toFixed(2),willChange:"transform"}),t.appendChild(c),{el:c,shape:k,phase:b*1.7,size:0,x:k.start[0]*r.innerWidth,y:k.start[1]*r.innerHeight,vx:0,vy:0,angle:b*47%360,spin:0}}),l=()=>{let k=n();for(let b of i)b.size=k*b.shape.size,b.el.style.width=`${b.size}px`,b.el.style.height=`${b.size}px`},m=(k=0)=>{for(let b of i){let c=1+.03*Math.sin(k*.8+b.phase),u=2.5*Math.sin(k*.5+b.phase*.7);b.el.style.transform=`translate3d(${(b.x-b.size/2).toFixed(1)}px, ${(b.y-b.size/2).toFixed(1)}px, 0) rotate(${b.angle.toFixed(1)}deg) skewX(${u.toFixed(2)}deg) scale(${c.toFixed(3)})`}};l(),m();let y=0,g=0,f=r.scrollY,E=null,x=(k,b)=>{for(let c of i){let u=.45+.9*c.shape.depth;c.vx=Math.max(-Ee,Math.min(Ee,c.vx+k*u)),c.vy=Math.max(-Ee,Math.min(Ee,c.vy+b*u)),c.spin+=(k-b)*.02*u}},w=()=>{let k=r.scrollY-f;f=r.scrollY,k&&x(0,k*Ar)},v=(k,b)=>{E&&x((k-E.x)*st,(b-E.y)*st),E={x:k,y:b}},T=k=>{k.pointerType!=="touch"&&v(k.clientX,k.clientY)},A=k=>{let b=k.touches[0];b&&v(b.clientX,b.clientY)},L=()=>{l(),m()},V=k=>{y=r.requestAnimationFrame(V);let b=g?Math.min(.05,(k-g)/1e3):0;if(g=k,!b)return;let c=k/1e3,u=Math.exp(-b/Sr),d=r.innerWidth,M=r.innerHeight;for(let h of i){h.vx+=Math.sin(c*.61+h.phase)*16*b,h.vy+=(Math.cos(c*.47+h.phase*1.3)*12+Er*(.5+h.shape.depth))*b,h.vx*=u,h.vy*=u,h.spin*=u,h.x+=h.vx*b,h.y+=h.vy*b,h.angle+=(h.spin+Math.sin(c*.3+h.phase)*2)*b;let B=h.size*.25;h.x<B&&(h.vx=Math.abs(h.vx)+8),h.x>d-B&&(h.vx=-Math.abs(h.vx)-8),h.y<B&&(h.vy=Math.abs(h.vy)+8),h.y>M-B*1.6&&(h.vy=-Math.abs(h.vy)*.6-4)}m(c)};return r.addEventListener("resize",L),a||(r.addEventListener("scroll",w,{passive:!0}),e.addEventListener("pointermove",T,{passive:!0}),e.addEventListener("touchmove",A,{passive:!0}),y=r.requestAnimationFrame(V)),{stop(){y&&r.cancelAnimationFrame(y),y=0,r.removeEventListener("resize",L),r.removeEventListener("scroll",w),e.removeEventListener("pointermove",T),e.removeEventListener("touchmove",A);for(let k of i)k.el.remove();t.style.mixBlendMode=s.mixBlendMode,t.style.overflow=s.overflow}}}function dt(e,t){let r=e.defaultView,a=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,s={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="screen",t.style.overflow="hidden";let n=e.createElement("div");n.setAttribute("aria-hidden","true"),n.dataset.pourAudit="filter",n.dataset.pourReflection="room",Object.assign(n.style,{position:"absolute",inset:"-20%",pointerEvents:"none",background:"radial-gradient(ellipse 30% 38% at 74% 16%, rgba(255,249,236,0.4), rgba(255,249,236,0.13) 42%, rgba(255,249,236,0) 72%), radial-gradient(ellipse 55% 26% at 18% 92%, rgba(255,255,255,0.1), rgba(255,255,255,0) 70%)",willChange:"transform"}),t.appendChild(n);let i=e.createElement("video");i.setAttribute("aria-hidden","true"),i.dataset.pourAudit="filter",i.dataset.pourReflection="camera",i.muted=!0,i.playsInline=!0,i.autoplay=!0,Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"cover",transform:"scaleX(-1)",opacity:String(.2),filter:"blur(0.9px) contrast(1.05)",pointerEvents:"none"}),t.appendChild(i);let l=null,m=0,y=v=>{l=e.createElement("div"),l.dataset.pourAudit="filter",l.dataset.pourReflection="note",l.setAttribute("role","status"),l.textContent=v,Object.assign(l.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(420px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(l),m=r.setTimeout(()=>{l?.remove(),l=null},7e3)},g=null,f=!1,E=r.navigator?.mediaDevices;E?.getUserMedia?E.getUserMedia({video:{facingMode:"user",width:{ideal:1280},height:{ideal:720}},audio:!1}).then(v=>{if(f){for(let T of v.getTracks())T.stop();return}g=v,i.srcObject=v,i.play().catch(()=>{})}).catch(()=>{f||y("Camera not available here, so the room light is shown without your reflection.")}):y("This page cannot use the camera (it needs a secure page), so the room light is shown without your reflection.");let x=0,w=v=>{x=r.requestAnimationFrame(w);let T=v/1e3;n.style.transform=`translate3d(${(Math.sin(T*.11)*14).toFixed(1)}px, ${(Math.cos(T*.083)*9).toFixed(1)}px, 0)`};return a||(x=r.requestAnimationFrame(w)),{stop(){if(f=!0,x&&r.cancelAnimationFrame(x),x=0,m&&r.clearTimeout(m),l?.remove(),l=null,g)for(let v of g.getTracks())v.stop();g=null,i.srcObject=null,i.remove(),n.remove(),t.style.mixBlendMode=s.mixBlendMode,t.style.overflow=s.overflow}}}var ut={aquatic:{scheme:"dark",canvas:"#202020",canvasText:"#FFFFFF",linkText:"#75E9FC",grayText:"#A6A6A6",highlight:"#8EE3F0",highlightText:"#263B50",buttonFace:"#202020",buttonText:"#FFFFFF"}},J=":not([data-pour-audit]):not([data-pour-audit] *):not([data-pour-fc-keep])",ft=["data-pour-fc-bg","data-pour-fc-bgimg","data-pour-fc-before","data-pour-fc-after","data-pour-fc-keep"],Tr='script, style, noscript, template, textarea, option, select, title, svg, math, [data-pour-audit], [contenteditable]:not([contenteditable="false"])',mt='button, input[type="button"], input[type="submit"], input[type="reset"]',gt="input, textarea, select";function Mr(e){return`
html${J} { background-color: ${e.canvas} !important; color: ${e.canvasText} !important; color-scheme: ${e.scheme} !important; }
*${J}, *${J}::before, *${J}::after {
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
a${J}[href] { color: ${e.linkText} !important; }
${mt.split(", ").map(t=>`${t}${J}`).join(", ")} { color: ${e.buttonText} !important; }
${gt.split(", ").map(t=>`${t}${J}`).join(", ")} { color: ${e.canvasText} !important; }
[data-pour-fc-bg="canvas"]${J} { background-color: ${e.canvas} !important; }
[data-pour-fc-bg="button"]${J} { background-color: ${e.buttonFace} !important; }
[data-pour-fc-bg="field"]${J} { background-color: ${e.canvas} !important; }
[data-pour-fc-bg="highlight"]${J} { background-color: ${e.highlight} !important; color: ${e.highlightText} !important; }
[data-pour-fc-plate]${J} { background-color: ${e.canvas} !important; box-shadow: 0 0 0 2px ${e.canvas} !important; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
[data-pour-fc-bg="highlight"] [data-pour-fc-plate]${J} { background-color: ${e.highlight} !important; box-shadow: 0 0 0 2px ${e.highlight} !important; }
[data-pour-fc-bg="button"] [data-pour-fc-plate]${J} { background-color: ${e.buttonFace} !important; box-shadow: 0 0 0 2px ${e.buttonFace} !important; }
[data-pour-fc-bgimg]${J} { background-image: none !important; }
[data-pour-fc-before]${J}::before { background-color: ${e.canvas} !important; background-image: none !important; }
[data-pour-fc-after]${J}::after { background-color: ${e.canvas} !important; background-image: none !important; }
*${J}:disabled, *${J}[aria-disabled="true"], *${J}:disabled *, *${J}[aria-disabled="true"] * { color: ${e.grayText} !important; border-color: ${e.grayText} !important; }
*${J}::placeholder { color: ${e.grayText} !important; }
*${J}::selection, *${J}::-moz-selection { background-color: ${e.highlight} !important; color: ${e.highlightText} !important; }
`}function ht(e){if(!e||e==="transparent")return 0;let t=/^rgba?\(\s*[\d.]+\s*,?\s*[\d.]+\s*,?\s*[\d.]+\s*(?:[,/]\s*([\d.]+%?))?\s*\)$/i.exec(e);return!t||t[1]===void 0?1:t[1].endsWith("%")?parseFloat(t[1])/100:parseFloat(t[1])}function bt(e,{theme:t="aquatic"}={}){let r=e.defaultView,a=ut[t]||ut.aquatic,s=!1,n=e.createElement("style");n.id="pour-forced-colours-page",n.dataset.pourAudit="filter";let i=e.createElement("style");i.id="pour-forced-colours",i.dataset.pourAudit="filter",i.textContent=Mr(a),e.head.appendChild(n),e.head.appendChild(i);let l=c=>c.closest("[data-pour-audit]"),m=c=>{if(c.namespaceURI!=="http://www.w3.org/1999/xhtml"||l(c)||c.hasAttribute("data-pour-fc-plate"))return;let u=r.getComputedStyle(c);if(u.forcedColorAdjust==="none"){c.setAttribute("data-pour-fc-keep","");return}c.matches("mark")?c.setAttribute("data-pour-fc-bg","highlight"):ht(u.backgroundColor)>0?c.setAttribute("data-pour-fc-bg",c.matches(mt)?"button":c.matches(gt)?"field":"canvas"):c.removeAttribute("data-pour-fc-bg"),u.backgroundImage.includes("gradient(")?c.setAttribute("data-pour-fc-bgimg",""):c.removeAttribute("data-pour-fc-bgimg");for(let[d,M]of[["::before","data-pour-fc-before"],["::after","data-pour-fc-after"]]){let h=r.getComputedStyle(c,d);h.content!=="none"&&h.content!=="normal"&&(ht(h.backgroundColor)>0||h.backgroundImage.includes("gradient("))?c.setAttribute(M,""):c.removeAttribute(M)}},y=c=>{if(c.nodeType!==1||c.namespaceURI!=="http://www.w3.org/1999/xhtml")return;let u=e.createTreeWalker(c,r.NodeFilter.SHOW_TEXT),d=[];for(;u.nextNode();)d.push(u.currentNode);for(let M of d){if(!M.textContent.trim())continue;let h=M.parentElement;if(!h||h.namespaceURI!=="http://www.w3.org/1999/xhtml"||h.hasAttribute("data-pour-fc-plate")||h.closest(Tr))continue;let B=e.createElement("span");B.setAttribute("data-pour-fc-plate",""),h.replaceChild(B,M),B.appendChild(M)}},g=()=>{let c=e.querySelectorAll("[data-pour-fc-plate]");for(let u of c)u.replaceWith(...u.childNodes);c.length&&e.body.normalize()},f=c=>{if(c.nodeType===1){m(c);for(let u of c.querySelectorAll("*"))m(u);y(c)}},E=new Set,x=0,w=()=>{x=0;let c=[...E];E.clear();for(let u of c)u.isConnected&&f(u)},v=new r.MutationObserver(c=>{for(let u of c)if(u.type==="childList")for(let d of u.addedNodes)d.nodeType===1&&!d.hasAttribute("data-pour-fc-plate")&&E.add(d);else u.target.nodeType===1&&E.add(u.target);E.size&&!x&&(x=r.requestAnimationFrame(w))});f(e.body),v.observe(e.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class","style","disabled","aria-disabled","open","hidden"]});let T=/forced-colors\s*:\s*active|-ms-high-contrast\s*:\s*active/i,A=[],L=[],V=(c,u)=>{for(let d of c){let M=d.conditionText??d.media?.mediaText??"";if(d.media!==void 0&&d.cssRules!==void 0&&!u&&T.test(M)){V(d.cssRules,!0);continue}if(d.styleSheet){try{V(d.styleSheet.cssRules,u)}catch{}continue}if(u){A.push(d.cssText),d.style&&d.selectorText&&d.style.getPropertyValue("forced-color-adjust").trim()==="none"&&L.push(d.selectorText);continue}d.cssRules&&V(d.cssRules,!1)}},k=()=>{if(!s){n.textContent=A.join(`
`);for(let c of L){let u=[];try{u=e.querySelectorAll(c)}catch{continue}for(let d of u)l(d)||d.setAttribute("data-pour-fc-keep","")}}},b=[];for(let c of e.styleSheets)if(!c.ownerNode?.dataset?.pourAudit)try{V(c.cssRules,!1)}catch{if(!c.href||typeof r.CSSStyleSheet!="function")continue;b.push(r.fetch(c.href,{mode:"cors"}).then(u=>u.ok?u.text():"").then(u=>{if(!u||s)return;let d=new r.CSSStyleSheet;d.replaceSync(u),V(d.cssRules,!1)}).catch(()=>{}))}return k(),b.length&&Promise.all(b).then(k),{stop(){s=!0,v.disconnect(),x&&r.cancelAnimationFrame(x),x=0,E.clear(),g(),i.remove(),n.remove();for(let c of e.querySelectorAll(ft.map(u=>`[${u}]`).join(",")))for(let u of ft)c.removeAttribute(u)}}}var Ve="http://www.w3.org/2000/svg",yt="pour-lens-filter";function Cr(e,{radius:t,ring:r,scale:a,magnify:s}){let n=t+r,i=(n+2)*2,l=i/2,m=e.createElement("canvas");m.width=i,m.height=i;let y=m.getContext("2d"),g=y.createImageData(i,i),f=g.data,E=t/s;for(let x=0;x<i;x++)for(let w=0;w<i;w++){let v=w+.5-l,T=x+.5-l,A=Math.hypot(v,T),L=A;if(A<t)L=A/s;else if(A<n){let u=(A-t)/r,d=u*u*(3-2*u);L=E+(n-E)*d}let V=A>0?L/A-1:0,k=V*v,b=V*T,c=(x*i+w)*4;f[c]=Math.max(0,Math.min(255,Math.round(127.5+k/a*255))),f[c+1]=Math.max(0,Math.min(255,Math.round(127.5+b/a*255))),f[c+2]=0,f[c+3]=Math.round(255*Math.max(0,Math.min(1,(n+2-A)/2)))}return y.putImageData(g,0,0),{href:m.toDataURL("image/png"),size:i}}function vt(e,{scale:t=2,radius:r=110,ring:a=60,point:s,target:n}){let i=e.defaultView,l=n||e.documentElement,m=Math.ceil(2*r*(1-1/t)*1.05),y=Cr(e,{radius:r,ring:a,scale:m,magnify:t}),g=e.createElementNS(Ve,"svg");g.setAttribute("width","0"),g.setAttribute("height","0"),g.setAttribute("aria-hidden","true"),g.setAttribute("focusable","false"),g.dataset.pourAudit="filter",g.dataset.pourLens="defs",Object.assign(g.style,{position:"absolute",pointerEvents:"none"});let f=e.createElementNS(Ve,"filter");f.setAttribute("id",yt),f.setAttribute("filterUnits","userSpaceOnUse"),f.setAttribute("primitiveUnits","userSpaceOnUse"),f.setAttribute("x","0"),f.setAttribute("y","0"),f.setAttribute("width","100%"),f.setAttribute("height","100%"),f.setAttribute("color-interpolation-filters","sRGB");let E=(d,M)=>{let h=e.createElementNS(Ve,d);for(let[B,X]of Object.entries(M))h.setAttribute(B,String(X));return h},x={width:y.size,height:y.size},w=E("feImage",{href:y.href,preserveAspectRatio:"none",result:"map",...x}),v=E("feDisplacementMap",{in:"SourceGraphic",in2:"map",scale:m,xChannelSelector:"R",yChannelSelector:"G",result:"lens",...x}),T=E("feComposite",{in:"lens",in2:"map",operator:"in",result:"cut",...x}),A=E("feComposite",{in:"SourceGraphic",in2:"map",operator:"out",result:"rest"}),L=E("feComposite",{in:"cut",in2:"rest",operator:"over"}),V=[w,v,T];for(let d of[w,v,T,A,L])f.appendChild(d);g.appendChild(f),e.body.appendChild(g);let k=l.style.filter;l.style.filter=`url(#${yt})`;let b="",c=0,u=()=>{c=i.requestAnimationFrame(u);let d=s(),M=l.getBoundingClientRect(),h=Math.round(d.x-M.left-y.size/2),B=Math.round(d.y-M.top-y.size/2),X=`${h},${B}`;if(X!==b){b=X;for(let W of V)W.setAttribute("x",String(h)),W.setAttribute("y",String(B))}};return c=i.requestAnimationFrame(u),{stop(){c&&i.cancelAnimationFrame(c),c=0,l.style.filter=k,g.remove()}}}var Lr=["a[href]","button",'input:not([type="hidden"])',"select","textarea","summary",'[role="button"]','[role="link"]','[role="checkbox"]','[role="radio"]','[role="switch"]','[role="tab"]','[role="menuitem"]','[role="option"]'].join(", "),Rr=61,Fr=1400;function $r(e,t){let r=Math.PI*(3-Math.sqrt(5));return Array.from({length:e},(a,s)=>{let n=t*Math.sqrt((s+.5)/e);return[Math.cos(s*r)*n,Math.sin(s*r)*n]})}function xt(e,{diameter:t=38}={}){let r=e.defaultView,a=e.documentElement,s=t/2,n=$r(Rr,s),l=Math.ceil(t+3*2),m=e.createElement("canvas");m.width=l,m.height=l;let y=m.getContext("2d"),g=l/2;y&&(y.beginPath(),y.arc(g,g,s,0,Math.PI*2),y.fillStyle="rgba(17, 17, 17, 0.16)",y.fill(),y.lineWidth=2.5,y.strokeStyle="rgba(255, 255, 255, 0.9)",y.stroke(),y.lineWidth=1.25,y.strokeStyle="rgba(17, 17, 17, 0.85)",y.stroke(),y.beginPath(),y.arc(g,g,1.5,0,Math.PI*2),y.fillStyle="rgba(17, 17, 17, 0.85)",y.fill());let f=y?`url("${m.toDataURL("image/png")}") ${Math.round(g)} ${Math.round(g)}, auto`:"auto",E=e.createElement("style");E.dataset.pourAudit="filter",E.textContent=`
    html { cursor: ${f} !important; }
    :not(html) { cursor: inherit !important; }
    [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
  `,e.head.appendChild(E);let x=e.createElement("div");x.dataset.pourAudit="filter",x.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:2147483647;contain:strict;",e.body.appendChild(x);let w=()=>{let o=e.createElement("div");o.style.cssText="position:absolute;left:0;top:0;box-sizing:border-box;border-radius:3px;display:none;";let p=e.createElement("span");return p.style.cssText="position:absolute;left:-2px;bottom:100%;margin-bottom:3px;padding:1px 5px;border-radius:4px;font:600 11px/15px system-ui,-apple-system,sans-serif;font-variant-numeric:tabular-nums;white-space:nowrap;letter-spacing:0;",o.appendChild(p),x.appendChild(o),{el:o,chip:p}},v=[],T=w(),A=(o,p)=>{let C=e.elementFromPoint(o,p);for(;C?.shadowRoot;){let F=C.shadowRoot.elementFromPoint(o,p);if(!F||F===C)break;C=F}return C},L=o=>{for(let p=o;p;p=p.parentElement??p.getRootNode().host??null)if(p.nodeType===1){if(p.hasAttribute("data-pour-audit"))return null;if(p.matches(Lr))return p.matches(":disabled")?null:p}return null};function V(o,p){let C=new Map,F=0;for(let[$,z]of n){let _=L(A(o+$,p+z));_&&(C.set(_,(C.get(_)??0)+1),F++)}return[...C].map(([$,z])=>({el:$,share:z/F})).sort(($,z)=>z.share-$.share)}let k=(o,p,C)=>{let F=null,$=1/0;for(let z of o.getClientRects()){let _=Math.max(z.left-p,0,p-z.right),Y=Math.max(z.top-C,0,C-z.bottom),Q=_*_+Y*Y;Q<$&&($=Q,F=z)}return F??o.getBoundingClientRect()},b=(o,p,{border:C,halo:F,chipText:$,chipBg:z,chipFg:_})=>{Object.assign(o.el.style,{display:"block",transform:`translate(${Math.round(p.left-3)}px, ${Math.round(p.top-3)}px)`,width:`${Math.round(p.width+6)}px`,height:`${Math.round(p.height+6)}px`,border:`2px solid ${C}`,boxShadow:`0 0 0 1px ${F}`}),o.chip.style.display=$?"block":"none",o.chip.textContent=$??"",o.chip.style.background=z??"",o.chip.style.color=_??"";let Y=p.top>22;o.chip.style.bottom=Y?"100%":"auto",o.chip.style.top=Y?"auto":"100%",o.chip.style.marginBottom=Y?"3px":"0",o.chip.style.marginTop=Y?"0":"3px"},c=-1,u=-1,d=!1,M=0;function h(){M=0;let o=d?V(c,u):[],p=o.length>1;for(;v.length<o.length;)v.push(w());let C=[];if(v.forEach((F,$)=>{let z=o[$];if(!z){F.el.style.display="none";return}let _=k(z.el,c,u);b(F,_,p?{border:"#F59E0B",halo:"rgba(17,17,17,0.55)",chipText:`${Math.round(z.share*100)}%`,chipBg:"#F59E0B",chipFg:"#111"}:{border:"rgba(17,17,17,0.8)",halo:"rgba(255,255,255,0.9)"}),F.chip.style.left="-2px",C.push({b:F,r:_})}),p){let F=-1/0;for(let{b:$,r:z}of C.sort((_,Y)=>_.r.left-Y.r.left)){let _=Math.round(z.left-3),Y=Math.max(_-2,F);$.chip.style.left=`${Y-_}px`,F=Y+$.chip.offsetWidth+3}}}let B=()=>{M||(M=r.requestAnimationFrame(h))},X="mouse",W=null,P=0,j=o=>{X=o.pointerType||"mouse",X!=="touch"&&(c=o.clientX,u=o.clientY,d=!0,B())},K=o=>{o.relatedTarget||(d=!1,B())},D=o=>{if(X=o.pointerType||"mouse",X==="touch"||o.button!==0){W=null;return}W={shares:V(o.clientX,o.clientY),natural:L(A(o.clientX,o.clientY))}},I=o=>{let p=W;if(W=null,!p||!o.isTrusted||o.detail===0||X==="touch"||!p.shares.length)return;let C=Math.random(),F=p.shares[p.shares.length-1].el;for(let $ of p.shares)if(C-=$.share,C<=0){F=$.el;break}F!==p.natural&&(o.preventDefault(),o.stopImmediatePropagation(),b(T,k(F,o.clientX,o.clientY),{border:"#111",halo:"rgba(255,255,255,0.9)",chipText:"The tap landed here",chipBg:"#111",chipFg:"#fff"}),r.clearTimeout(P),P=r.setTimeout(()=>{T.el.style.display="none"},Fr),typeof F.focus=="function"&&F.focus({preventScroll:!0}),F.click())};return e.addEventListener("pointermove",j,{passive:!0}),e.addEventListener("pointerdown",D,!0),e.addEventListener("mouseout",K,{passive:!0}),r.addEventListener("click",I,!0),r.addEventListener("scroll",B,{passive:!0,capture:!0}),{stop(){e.removeEventListener("pointermove",j),e.removeEventListener("pointerdown",D,!0),e.removeEventListener("mouseout",K),r.removeEventListener("click",I,!0),r.removeEventListener("scroll",B,{capture:!0}),M&&r.cancelAnimationFrame(M),r.clearTimeout(P),x.remove(),E.remove()}}}var kt=(e,t)=>[e.style.getPropertyValue(t),e.style.getPropertyPriority(t)],_e=(e,t,[r,a])=>{r?e.style.setProperty(t,r,a):e.style.removeProperty(t)},Nr=e=>e.transform!=="none"||e.translate!=="none"||e.rotate!=="none"||e.scale!=="none"||e.perspective!=="none"||e.filter!=="none"||(e.backdropFilter??"none")!=="none"||/paint|layout|strict|content/.test(e.contain)||/transform|perspective|filter/.test(e.willChange)||e.containerType&&e.containerType!=="normal";function wt(e,{scale:t=4}={}){let r=e.defaultView,a=e.documentElement,s=e.scrollingElement||a,n=["transform","transform-origin","height"].map(o=>[o,kt(a,o)]),i=r.innerWidth/2,l=r.innerHeight/2,m=0,y=0,g=new Map;a.style.setProperty("height","100%","important");function f(){a.style.removeProperty("transform"),m=Math.max(0,s.scrollWidth-r.innerWidth),y=Math.max(0,s.scrollHeight-r.innerHeight),a.style.setProperty("transform",`scale(${t})`,"important")}function E(){let o=r.scrollX,p=r.scrollY;a.style.setProperty("transform-origin",`${o+i}px ${p+l}px`,"important");for(let[C,{base:F}]of g)C.style.setProperty("translate",`calc(${F[0]} + ${o}px) calc(${F[1]} + ${p}px)`,"important")}function x(){let o=new Set;for(let p of e.body.getElementsByTagName("*")){if(p.hasAttribute("data-pour-audit"))continue;let C=r.getComputedStyle(p);if(C.position!=="fixed")continue;let F=!0;for(let $=p.parentElement;$&&$!==a;$=$.parentElement){if(o.has($)){F=!1;break}if(!g.has($)&&Nr(r.getComputedStyle($))){F=!1;break}}if(F&&(o.add(p),!g.has(p))){let[$="0px",z="0px"]=C.translate==="none"?[]:C.translate.split(" ");g.set(p,{saved:kt(p,"translate"),base:[$,z]})}}for(let[p,C]of g)o.has(p)||(_e(p,"translate",C.saved),g.delete(p));E()}let w=()=>{let o=i*(1-1/t),p=l*(1-1/t);return{left:o,top:p,right:o+r.innerWidth/t,bottom:p+r.innerHeight/t}},v=o=>({left:i+(o.left-i)/t,top:l+(o.top-l)/t,right:i+(o.right-i)/t,bottom:l+(o.bottom-l)/t}),T=(o,p)=>o.left<p.right&&o.right>p.left&&o.top<p.bottom&&o.bottom>p.top,A=e.createElement("div");A.dataset.pourAudit="filter",A.setAttribute("popover","manual"),A.style.cssText="position:fixed;inset:0;width:auto;height:auto;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:none;z-index:2147483647;",e.body.appendChild(A);try{A.showPopover()}catch{}let L=new Map,V=o=>{let p=(o.getAttribute("aria-label")||o.textContent||o.getAttribute("alt")||"").replace(/\s+/g," ").trim();return p?p.length>38?`${p.slice(0,37)}\u2026`:p:o.tagName==="IMG"?"An image":"Something"};function k(o){L.has(o)&&L.get(o).remove();let p=e.createElement("div");if(p.style.cssText="position:absolute;left:0;top:0;display:flex;align-items:center;gap:6px;max-width:280px;padding:4px 9px 4px 6px;border-radius:6px;background:#111;color:#fff;box-shadow:0 0 0 1px rgba(255,255,255,0.9);font:600 12px/16px system-ui,-apple-system,sans-serif;white-space:nowrap;letter-spacing:0;",p.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg><span style="overflow:hidden;text-overflow:ellipsis"></span>',p.lastChild.textContent=`Changed out of view: ${V(o)}`,A.appendChild(p),L.set(o,p),L.size>6){let[C]=L.keys();L.get(C).remove(),L.delete(C)}c()}let b=0,c=()=>{!b&&L.size&&(b=r.requestAnimationFrame(u))};function u(){b=0;let o=r.innerWidth,p=r.innerHeight,C=w();for(let[F,$]of L){let z=F.isConnected&&F.checkVisibility?.({checkOpacity:!0,checkVisibilityCSS:!0})!==!1?F.getBoundingClientRect():null;if(!z||!z.width||!z.height||T(v(z),C)){$.remove(),L.delete(F);continue}let _=(z.left+z.right)/2-o/2,Y=(z.top+z.bottom)/2-p/2,Q=$.offsetWidth/2,ne=$.offsetHeight/2,ue=Math.min(_?(o/2-14-Q)/Math.abs(_):1/0,Y?(p/2-14-ne)/Math.abs(Y):1/0),fe=o/2+_*Math.min(ue,1e6),oe=p/2+Y*Math.min(ue,1e6);$.style.transform=`translate(${Math.round(fe-Q)}px, ${Math.round(oe-ne)}px)`,$.firstChild.style.transform=`rotate(${Math.atan2(Y,_)}rad)`}L.size&&(b=r.requestAnimationFrame(u))}let d=new Set,M=0,h=0;function B(){M=0;let o=d;d=new Set;let p=r.innerWidth,C=r.innerHeight,F={left:0,top:0,right:p,bottom:C},$=w();for(let z of o){if(!z.isConnected||z===e.body||z===a||z.closest("[data-pour-audit]")||z.checkVisibility?.({checkOpacity:!0,checkVisibilityCSS:!0})===!1)continue;let _=v(z.getBoundingClientRect()),Y=_.right-_.left,Q=_.bottom-_.top;!Y||!Q||Y*Q>p*C*.5||T(_,F)&&!T(_,$)&&k(z)}}let X=new r.MutationObserver(o=>{let p=!1;for(let C of o){let F=C.target.nodeType===1?C.target:C.target.parentElement;if(!(!F||F===a)&&!(C.type==="attributes"&&C.attributeName==="style"&&g.has(F))&&!F.closest("[data-pour-audit]"))if(p=!0,C.type==="childList")for(let $ of C.addedNodes)$.nodeType===1?d.add($):$.nodeType===3&&$.textContent.trim()&&d.add(F);else d.add(F)}d.size&&!M&&(M=r.requestAnimationFrame(B)),p&&!h&&(h=r.setTimeout(()=>{h=0,f(),x()},300))}),W=0,P=(o,p)=>{i=Math.max(0,Math.min(r.innerWidth,o)),l=Math.max(0,Math.min(r.innerHeight,p)),W||(W=r.requestAnimationFrame(()=>{W=0,E(),c()}))},j=o=>P(o.clientX,o.clientY),K=o=>{let p=o.target;if(p?.nodeType!==1||p.closest("[data-pour-audit]"))return;let C=!1;try{C=p.matches(":focus-visible")}catch{C=!0}C&&r.requestAnimationFrame(()=>{let F=v(p.getBoundingClientRect());P((F.left+F.right)/2,(F.top+F.bottom)/2)})},D=()=>{(r.scrollY>y||r.scrollX>m)&&r.scrollTo({left:Math.min(r.scrollX,m),top:Math.min(r.scrollY,y),behavior:"instant"}),E(),c()},I=()=>{f(),P(i,l),x()};return f(),x(),X.observe(e.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeFilter:["class","style","hidden","open","aria-hidden"]}),e.addEventListener("pointermove",j,{passive:!0}),e.addEventListener("focusin",K,!0),r.addEventListener("scroll",D,{passive:!0}),r.addEventListener("resize",I),{stop(){X.disconnect(),e.removeEventListener("pointermove",j),e.removeEventListener("focusin",K,!0),r.removeEventListener("scroll",D),r.removeEventListener("resize",I);for(let o of[b,M,W])o&&r.cancelAnimationFrame(o);r.clearTimeout(h);for(let[o,p]of g)_e(o,"translate",p.saved);g.clear();for(let[o,p]of n)_e(a,o,p);A.remove()}}}var St=`/* Overlay styles for the vision & sensory filters \u2014 ported from
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
    circle 225px at var(--pour-sensory-x, 50%) var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 66%,
    rgba(0, 0, 0, 0.08) 80%,
    rgba(0, 0, 0, 0.2) 100%
  );
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
  mask-image: radial-gradient(
    circle 225px at var(--pour-sensory-x, 50%) var(--pour-sensory-y, 50%),
    transparent 0%,
    transparent 66%,
    black 90%
  );
  -webkit-mask-image: radial-gradient(
    circle 225px at var(--pour-sensory-x, 50%) var(--pour-sensory-y, 50%),
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
`;function ve(e){for(let t=e;t;t=t.parentElement??t.getRootNode?.().host??null)if(t.nodeType===1&&t.hasAttribute("data-pour-audit"))return!0;return!1}function At(e,t,{ms:r=7e3,role:a="status"}={}){let s=e.defaultView,n=e.createElement("div");n.dataset.pourAudit="filter",n.setAttribute("role",a),n.textContent=t,Object.assign(n.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(460px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",textAlign:"left",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(n);let i=r?s.setTimeout(()=>n.remove(),r):0;return()=>{i&&s.clearTimeout(i),n.remove()}}function Te(e,{interactive:t=!1,zIndex:r="2147483647"}={}){let a=e.createElement("div");a.dataset.pourAudit="filter",a.setAttribute("aria-hidden",t?"false":"true"),a.style.cssText=`position:fixed;inset:0;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:${t?"auto":"none"};z-index:${r};width:auto;height:auto;max-width:none;max-height:none;color:inherit;`,a.setAttribute("popover","manual"),e.body.appendChild(a);try{a.showPopover()}catch{}return a}function*xe(e){let t=[e];for(;t.length;){let r=t.pop();if(r.nodeType===1){if(r.hasAttribute("data-pour-audit"))continue;yield r,r.shadowRoot&&t.push(r.shadowRoot)}let a=r.children??[];for(let s=a.length-1;s>=0;s--)t.push(a[s])}}function Et(e,t){let r=e.createElement("style");return r.dataset.pourAudit="filter",r.textContent=t,e.head.appendChild(r),()=>r.remove()}function je(e){return!!(e.isSecureContext&&e.navigator?.mediaDevices?.getDisplayMedia)}async function Tt(e){let t=e.defaultView;if(!je(t))throw new Error("self capture unavailable");let r=await t.navigator.mediaDevices.getDisplayMedia({video:{displaySurface:"browser",frameRate:{ideal:30}},audio:!1,preferCurrentTab:!0,selfBrowserSurface:"include",surfaceSwitching:"exclude",systemAudio:"exclude"}),a=e.createElement("video");a.dataset.pourAudit="filter",a.muted=!0,a.playsInline=!0,a.autoplay=!0,a.style.cssText="position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none;",a.srcObject=r,e.body.appendChild(a),await a.play().catch(()=>{});let s=()=>{for(let n of r.getTracks())n.stop();a.srcObject=null,a.remove()};return r.getVideoTracks()[0]?.addEventListener("ended",s),{video:a,stream:r,stop:s}}var He=.55,Or=250,Ir=2e3,Mt=500,Pr=4e3,Br=1.5,zr=.45,qr=80,Vr='img, video, canvas, svg, picture, marquee, [class*="carousel" i], [class*="slide" i], [class*="marquee" i], [class*="ticker" i], [class*="parallax" i], [class*="swiper" i], [class*="slick" i]';function Ct(e,{decay:t=.86}={},r){let a=e.defaultView,s=r.container,n=a.performance;t=Math.min(.995,Math.max(.05,Number(t)||.86));let i=e.createElement("canvas");i.setAttribute("aria-hidden","true"),i.dataset.pourAudit="filter",i.dataset.pourAfterimages="trail",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none",opacity:String(He),mixBlendMode:"normal"}),s.appendChild(i);let l=i.getContext("2d"),m=[],y=P=>m.push(At(e,P)),g=0,f=0,E=!1,x=null,w=!1,v=0,T=0,A=[],L=()=>{g=a.innerWidth,f=a.innerHeight,i.width=Math.max(1,g),i.height=Math.max(1,f),w=!1},V=P=>{v=0;let j=T?Math.min(100,P-T):16;T=P;let K=Math.pow(t,j/100);if(x){let{video:D}=x;if(D.readyState>=2&&D.videoWidth){let I=Math.max(0,(K-He)/(1-He));l.globalAlpha=w?1-I:1,l.drawImage(D,0,0,g,f),l.globalAlpha=1,w=!0}v=a.requestAnimationFrame(V);return}l.clearRect(0,0,g,f);for(let D=A.length-1;D>=0;D--){let I=A[D],o=zr*Math.pow(t,(P-I.born)/100);if(o<.01){A.splice(D,1);continue}l.globalAlpha=o,l.fillStyle="#6b6b6b",l.fillRect(I.x,I.y,I.w,I.h),l.globalAlpha=Math.min(1,o*1.6),l.strokeStyle="#2a2a2a",l.lineWidth=1,l.strokeRect(I.x+.5,I.y+.5,Math.max(0,I.w-1),Math.max(0,I.h-1))}l.globalAlpha=1,A.length?v=a.requestAnimationFrame(V):T=0},k=()=>{!v&&!E&&(v=a.requestAnimationFrame(V))},b=()=>{L()};a.addEventListener("resize",b);let c=P=>P.bottom>0&&P.right>0&&P.top<f&&P.left<g&&(P.width>0||P.height>0),u=()=>{let P=[];try{P=e.getAnimations?.()??[]}catch{P=[]}return P.filter(j=>j.playState==="running"&&!(a.CSSTransition&&j instanceof a.CSSTransition))},d=new Map,M=[],h=()=>{let P=[],j=new Set,K=o=>{!o||o.nodeType!==1||j.has(o)||ve(o)||(j.add(o),P.push(o))};for(let o of u())K(o.effect?.target);let D=[],I=0;for(let o of xe(e.body)){if(++I>Pr)break;o.matches(Vr)?K(o):D.push(o)}for(let o of D){if(P.length>=Mt)break;let p=o.getBoundingClientRect();p.width*p.height>=600&&c(p)&&K(o)}M=P.slice(0,Mt);for(let o of d.keys())j.has(o)||d.delete(o)},B=()=>{let P=n.now(),j=0;for(let K of M){if(!K.isConnected){d.delete(K);continue}let D=K.getBoundingClientRect(),I=d.get(K);d.set(K,D),!(!I||Math.max(Math.abs(D.left-I.left),Math.abs(D.top-I.top),Math.abs(D.width-I.width),Math.abs(D.height-I.height))<Br||!(c(I)||c(D)))&&!x&&j<qr&&I.width>0&&I.height>0&&(A.push({x:I.left,y:I.top,w:I.width,h:I.height,born:P}),j++)}j&&k()};L(),h();let X=a.setInterval(B,Or),W=a.setInterval(h,Ir);return je(a)?Tt(e).then(P=>{if(E){P.stop();return}x=P,w=!1,A.length=0,k(),P.stream.getVideoTracks()[0]?.addEventListener("ended",()=>{E||x!==P||(x=null,w=!1,l.clearRect(0,0,g,f),y("Tab sharing ended, so only the elements that move are ghosted now."))})}).catch(()=>{E||y("Tab sharing was refused, so only the elements that move are ghosted.")}):y("This page cannot share its own pixels (Chromium on a secure page can), so only the elements that move are ghosted."),{stop(){if(!E){E=!0,v&&a.cancelAnimationFrame(v),v=0,a.clearInterval(X),a.clearInterval(W),a.removeEventListener("resize",b);try{x?.stop()}catch{}x=null,i.remove();for(let P of m)P();m.length=0,d.clear(),M=[]}}}}var _r="__pourHearingRouting",We=["none","mild","moderate","severe","noisy"],jr={none:"None",mild:"Mild",moderate:"Moderate",severe:"Severe",noisy:"Noisy room"},Hr=4,Wr=.1,Gr=.5;function Yr(e){let t=Math.floor(e.sampleRate*Hr),r=e.createBuffer(1,t,e.sampleRate),a=r.getChannelData(0),s=0,n=0,i=0,l=0,m=0,y=0,g=0,f=0;for(let x=0;x<t;x++){let w=Math.random()*2-1;s=.99886*s+w*.0555179,n=.99332*n+w*.0750759,i=.969*i+w*.153852,l=.8665*l+w*.3104856,m=.55*m+w*.5329522,y=-.7616*y-w*.016898;let v=(s+n+i+l+m+y+g+w*.5362)*.11;g=w*.115926,a[x]=v,f+=v*v}let E=Wr/Math.sqrt(f/t||1);for(let x=0;x<t;x++)a[x]*=E;return r}function ie(e,t,r,a=0,s=.707){let n=e.createBiquadFilter();return n.type=t,n.frequency.value=r,n.gain.value=a,n.Q.value=s,n}var Xr={1e3:{m:[702e-6,2.494],f:[221e-6,2.805]},2e3:{m:[.00156,2.404],f:[312e-6,2.792]},4e3:{m:[.0034,2.325],f:[737e-6,2.66]}};function Kr(e){let t=Math.max(0,e-18),r=a=>{let{m:s,f:n}=Xr[a];return(s[0]*t**s[1]+n[0]*t**n[1])/2};return{h1k:r(1e3),h2k:r(2e3),h4k:r(4e3)}}function Ur(e,t,r=45){switch(t){case"none":return[];case"age":{let{h1k:a,h2k:s,h4k:n}=Kr(r);return[ie(e,"highshelf",1e3,-a),ie(e,"highshelf",1500,-(s-a)),ie(e,"highshelf",3e3,-(n-s)),ie(e,"lowpass",5e3)]}case"mild":return[ie(e,"highshelf",3e3,-15)];case"severe":{let a=e.createGain();return a.gain.value=.5,[ie(e,"lowpass",800),ie(e,"lowpass",800),ie(e,"highshelf",800,-45),a]}case"moderate":case"noisy":default:return[ie(e,"highshelf",1500,-25),ie(e,"lowpass",4e3)]}}var Ge=e=>e.nodeType===1&&(e.tagName==="AUDIO"||e.tagName==="VIDEO");function Me(e,{audiogram:t="moderate",frame:r=!1,hearingAge:a=45}={}){let s=e.defaultView,n=t==="age",i=r||n,l="pour-hearing-v1",m=()=>{for(let S=0;S<s.frames.length;S++)try{s.frames[S].postMessage({[l]:{setting:f,age:a}},"*")}catch{}},y=S=>{let O=S.data?.[l];if(!O)return;if(O.hello&&S.source){try{S.source.postMessage({[l]:{setting:f,age:a}},"*")}catch{}return}if(!r)return;let G=O.setting==="age"?"age":We.includes(O.setting)?O.setting:null;if(!G)return;let se=Number(O.age);G===f&&(G!=="age"||se===a)||(f=G,Number.isFinite(se)&&(a=se),c(),m())};s.addEventListener("message",y);let g=s.AudioContext||s.webkitAudioContext,f=n?"age":We.includes(t)?t:"moderate",E=new Set,x=[],w=null,v=g?s[_r]??={ctx:null,sources:new WeakMap}:null,T=null;if(v)try{v.ctx??=new g,T=v.ctx}catch{T=null}let A=null,L=null,V=[],k=null,b=null;T&&(A=T.createGain(),L=T.createGain(),L.connect(T.destination),v.input=A,v.output=L);function c(){if(!T)return;for(let O of V)O.disconnect();A.disconnect(),V=Ur(T,f,a);let S=A;for(let O of V)S.connect(O),S=O;if(S.connect(L),f==="noisy"&&!k){b=T.createGain(),b.gain.value=0,b.connect(A),k=T.createBufferSource(),k.buffer=Yr(T),k.loop=!0,k.connect(b);try{k.start()}catch{}}d()}let u=new Set;function d(){if(!b)return;let S=f==="noisy"&&u.size?Gr:0;b.gain.setTargetAtTime(S,T.currentTime,.02)}let M=!!(T&&T.state!=="running"),h=()=>{if(!T||T.state==="running"){X();return}T.resume().then(()=>{X(),Q()}).catch(()=>{})},B=["click","keydown","pointerdown","touchend"];function X(){if(M){M=!1;for(let S of B)e.removeEventListener(S,h,!0);w?.(),w=null}}if(M){for(let S of B)e.addEventListener(S,h,!0);i||(w=$("The sound routes through the audiogram after the next click or key press: the browser starts audio only on a gesture.")),h()}let W=new Map,P=new Set,j=s.location.origin;function K(S){let O=S.currentSrc||S.getAttribute("src")||"";if(!O)return!1;let G;try{G=new URL(O,e.baseURI)}catch{return!1}return G.protocol==="blob:"||G.protocol==="data:"||G.origin===j?!1:S.crossOrigin===null||S.crossOrigin===void 0}function D(S){let O=W.get(S);if(!O||P.has(S)||!T)return;if(!S.currentSrc&&!S.srcObject&&!S.getAttribute("src")){if(O.status="no source yet",!O.listening){O.listening=!0;let se=()=>{O.listening=!1,D(S),Q()};S.addEventListener("loadedmetadata",se,{once:!0}),x.push(()=>S.removeEventListener("loadedmetadata",se))}return}if(K(S)){O.status="cannot be routed here",O.why="cross-origin media without CORS headers";return}let G=v.sources.get(S);if(G)try{G.disconnect()}catch{}else try{G=T.createMediaElementSource(S),v.sources.set(S,G)}catch{O.status="cannot be routed here",O.why="already in the page's own audio graph";return}G.connect(A),P.add(S),O.status=M?"routed, waiting for a click":"routed"}function I(S){let O=v?.sources.get(S);if(O){try{O.disconnect()}catch{}try{O.connect(T.destination)}catch{}}}let o=Te(e,{interactive:!0});o.style.pointerEvents="none";let p=e.createElement("div");p.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:max-content;max-width:min(520px, calc(100vw - 32px));pointer-events:none;z-index:2147483647;";let C=e.createElement("div");C.setAttribute("role","status"),C.hidden=!0,C.style.cssText="padding:8px 12px;border-radius:8px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;text-align:left;box-shadow:0 4px 16px rgba(0,0,0,0.3);max-width:100%;box-sizing:border-box;";let F=0,$=(S,O=9e3)=>(s.clearTimeout(F),C.textContent=S,C.hidden=!1,F=s.setTimeout(()=>{C.hidden=!0},O),()=>{s.clearTimeout(F),C.hidden=!0}),z=e.createElement("div");z.setAttribute("role","group"),z.setAttribute("aria-label","Hearing loss setting"),z.style.cssText="display:flex;gap:4px;padding:6px;border-radius:10px;background:#1B1D22;box-shadow:0 4px 16px rgba(0,0,0,0.3);pointer-events:auto;font:500 13px/1 system-ui,sans-serif;";let _=new Map;for(let S of We){let O=e.createElement("button");O.type="button",O.textContent=jr[S],O.style.cssText="appearance:none;border:0;border-radius:6px;padding:7px 10px;font:inherit;cursor:pointer;background:transparent;color:#FCFCFC;",O.addEventListener("click",()=>{f=S,c(),Y(),m()}),z.appendChild(O),_.set(S,O)}let Y=()=>{for(let[S,O]of _){let G=S===f;O.setAttribute("aria-pressed",G?"true":"false"),O.style.background=G?"#FFD60A":"transparent",O.style.color=G?"#1B1D22":"#FCFCFC"}};if(p.append(C,z),i||o.appendChild(p),Y(),!T&&!i&&(w=$("This browser has no Web Audio, so the media plays as it is.")),r)try{s.parent.postMessage({[l]:{hello:!0}},"*")}catch{}function Q(){for(let[S,O]of W)P.has(S)&&(O.status=M?"routed, waiting for a click":"routed")}function ne(S){W.has(S)||ve(S)||(W.set(S,{status:T?"not routed":"no Web Audio"}),S.paused||u.add(S),D(S))}let ue=S=>{for(let O of xe(S))Ge(O)&&ne(O)};ue(e.body);let fe=S=>{let O=S.target;if(!Ge(O)||ve(O))return;W.has(O)||ne(O);let G=W.get(O);u.add(O),d(),ke()},oe=S=>{Ge(S.target)&&(u.delete(S.target),d())};e.addEventListener("play",fe,!0),e.addEventListener("pause",oe,!0),e.addEventListener("ended",oe,!0),e.addEventListener("emptied",oe,!0);let he=new Set,ce=0,pe=0,ke=()=>{pe||(pe=s.setTimeout(()=>{pe=0,Q()},100))},Se=new s.MutationObserver(S=>{for(let O of S)for(let G of O.addedNodes)G.nodeType===1&&!ve(G)&&he.add(G);he.size&&!ce&&(ce=s.requestAnimationFrame(()=>{ce=0;let O=he;he=new Set;for(let G of O)G.isConnected&&ue(G);ke()}))});return Se.observe(e.body,{childList:!0,subtree:!0}),c(),Q(),!i&&!W.size&&e.querySelector("iframe")&&(w?.(),w=$("The only video here is inside an embedded frame. The extension routes it from within that frame; the bookmarklet and the command line cannot reach it.")),{setAge(S){n&&(a=Math.max(0,Number(S)||0),c(),m())},stop(){Se.disconnect(),X(),ce&&s.cancelAnimationFrame(ce),ce=0,s.clearTimeout(pe),pe=0;for(let S of E)s.clearInterval(S);E.clear();for(let S of x)try{S()}catch{}x.length=0,e.removeEventListener("play",fe,!0),e.removeEventListener("pause",oe,!0),e.removeEventListener("ended",oe,!0),e.removeEventListener("emptied",oe,!0);for(let S of P)I(S);if(P.clear(),T){try{k?.stop()}catch{}k?.disconnect(),b?.disconnect(),k=null,b=null;for(let S of V)S.disconnect();V=[],A?.disconnect(),L?.disconnect(),v.input===A&&(v.input=null,v.output=null)}s.removeEventListener("message",y),w?.(),w=null;try{o.hidePopover()}catch{}o.remove(),W.clear()}}}var Xe=20,Ce=90,Jr=14,Ye=65,Lt=[[20,"Nothing has changed yet."],[32,"The lens has begun to yellow, too slowly to notice."],[40,"Near focus starts to shorten; the phone moves further away."],[45,"Small text at reading distance is blurring (presbyopia)."],[50,"Contrast sensitivity for fine detail has begun to fall."],[55,"The pupil lets in about four fifths of the light it did at twenty."],[60,"Near focus is gone without glasses, and the highs of speech are softening."],[65,"One in twenty over sixty-five has an essential tremor; the pointer shows it."],[70,"A little over half the light reaches the retina compared with twenty."],[75,"Grey text on white is fading into its background; consonants are half gone."],[80,"Scatter in the lens veils the page; drawn here as a blur."],[85,"Only strong contrast and large targets are still easy."],[90,"The page as the oldest readers receive it."]],we=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],Ke=e=>e<=60?1+.02*(e-32):1.56+.0667*(e-60),Rt=Ke(20),Qr=Ke(90);function Ft(e){let t=Math.max(Xe,Math.min(Ce,e)),r=Ke(t)-Rt,a=.45*r/(Qr-Rt),s=1+(t/70)**4-(1+(20/70)**4),n=1+(90/70)**4-(1+(20/70)**4),i=.9*s/n,m=((3.36-.0102*(t-20))/3.36)**2,y=10**(-.1*r),g=Math.sqrt(m*y),f=10**(-.08*Math.max(0,t-50)/10),E=Math.max(0,15-.25*t),w=Math.min(2.5,Math.max(0,2.5-.5*E))/2,v=t<Ye?0:4+8*(t-Ye)/(Ce-Ye);return{age:t,sepia:a,scatterBlur:i,brightness:g,contrast:f,nearBlur:w,tremor:v}}function $t(e,{start:t=45,frame:r=!1}={},a={}){let s=e.defaultView,n=e.documentElement,i=a.container,l=[],m=!1,y=Math.max(Xe,Math.min(Ce,Number(t)||45)),g=Me(e,{audiogram:"age",hearingAge:y,frame:r});if(l.push(()=>g.stop()),r)return{stop(){if(!m){m=!0;for(let D of l.reverse())try{D()}catch{}}}};let f=Te(e);l.push(()=>{try{f.hidePopover()}catch{}f.remove()});let E=e.createElement("div");E.setAttribute("role","group"),E.setAttribute("aria-label","Age"),E.style.cssText="position:absolute;left:50%;bottom:16px;transform:translateX(-50%);pointer-events:auto;width:min(360px, calc(100vw - 32px));padding:10px 14px 12px;border-radius:10px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,0.3);";let x=e.createElement("div");x.style.cssText="display:flex;justify-content:space-between;align-items:baseline;gap:8px;";let w=e.createElement("span");w.textContent="Age";let v=e.createElement("span");v.textContent="approximation",v.title="Population averages from the cited studies; any one reader sits above or below them.",v.style.cssText="margin-left:8px;padding:0 6px;border:1px solid rgba(247,248,248,0.25);border-radius:999px;font-size:9px;font-weight:640;letter-spacing:0.07em;text-transform:uppercase;color:#B6BAC2;vertical-align:1px;",w.appendChild(v);let T=e.createElement("output");T.style.cssText="font-weight:650;font-size:18px;color:#FFD60A;font-variant-numeric:tabular-nums;",x.append(w,T);let A=e.createElement("input");A.type="range",A.min=String(Xe),A.max=String(Ce),A.step="1",A.value=String(y),A.setAttribute("aria-label","Age"),A.style.cssText="display:block;width:100%;margin:6px 0 4px;accent-color:#FFD60A;cursor:pointer;";let L=e.createElement("div");L.setAttribute("aria-live","polite"),L.style.cssText="color:#D7D9DE;line-height:1.45;height:2.9em;overflow:hidden;",E.append(x,A,L),f.appendChild(E);let V=i?{filter:i.style.filter,backdrop:i.style.backdropFilter,webkit:i.style.webkitBackdropFilter}:null,k=e.createElement("style");k.dataset.pourAudit="filter",e.head.appendChild(k),l.push(()=>k.remove());let b=[];(()=>{let D=0;for(let I of xe(e.body??n)){if(D>4e3)break;D++;let o=!1;for(let C of I.childNodes)if(C.nodeType===3&&C.nodeValue.trim()){o=!0;break}!o||!(parseFloat(s.getComputedStyle(I).fontSize)<Jr)||(I.setAttribute("data-pour-age-small",""),b.push(I))}})(),l.push(()=>{for(let D of b)D.removeAttribute("data-pour-age-small");b.length=0});let u=n.style.cursor,d=new Map,M=(D,I)=>{let o=`${D}:${I}`,p=d.get(o);if(p)return p;let C=64,F=e.createElement("canvas");F.width=C,F.height=C;let $=F.getContext("2d");if(!$)return"auto";let z=C/2;$.save(),$.translate(z+D,z+I),$.scale(1.15,1.15),$.beginPath(),$.moveTo(we[0][0],we[0][1]);for(let Y=1;Y<we.length;Y++)$.lineTo(we[Y][0],we[Y][1]);$.closePath(),$.restore(),$.lineWidth=3,$.lineJoin="round",$.strokeStyle="#fff",$.stroke(),$.fillStyle="#000",$.fill();let _=`url("${F.toDataURL("image/png")}") ${z} ${z}, auto`;return d.set(o,_),_},h=null,B=0,X=D=>{B=s.requestAnimationFrame(X);let I=Ft(y).tremor,o=2*Math.PI*6*(D/1e3),p=Math.round((Math.sin(o)*.7+Math.sin(o*1.63+1.1)*.3)*I),C=Math.round((Math.cos(o*.97+.6)*.7+Math.sin(o*2.11+2.3)*.3)*I);n.style.cursor=M(p,C)},W=D=>{D&&!B?(h=Et(e,":not(html) { cursor: inherit !important; } [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }"),B=s.requestAnimationFrame(X)):!D&&B&&(s.cancelAnimationFrame(B),B=0,h?.(),h=null,n.style.cursor=u)};l.push(()=>W(!1));let P=D=>{let I=Lt[0][1];for(let[o,p]of Lt)D>=o&&(I=p);return I},j=()=>{let D=Ft(y);T.textContent=String(D.age),L.textContent=P(D.age);let I=`sepia(${D.sepia.toFixed(3)}) brightness(${D.brightness.toFixed(3)}) contrast(${D.contrast.toFixed(3)})${D.scatterBlur>.02?` blur(${D.scatterBlur.toFixed(2)}px)`:""}`;i&&(i.style.filter=I,i.style.backdropFilter=I,i.style.webkitBackdropFilter=I),k.textContent=D.nearBlur>.02?`[data-pour-age-small] { filter: blur(${D.nearBlur.toFixed(2)}px) !important; }`:"",W(D.tremor>0),g.setAge(D.age)},K=()=>{y=Number(A.value)||y,j()};return A.addEventListener("input",K),l.push(()=>A.removeEventListener("input",K)),j(),l.push(()=>{i&&V&&(i.style.filter=V.filter,i.style.backdropFilter=V.backdrop,i.style.webkitBackdropFilter=V.webkit)}),{stop(){if(!m){m=!0;for(let D of l.reverse())try{D()}catch{}l.length=0}}}}var Le={afterimages:Ct,ageSlider:$t,hearingLoss:Me};function Nt(e=document){let t=e.defaultView,r=e.documentElement,a=ye(e),s=it(e,a),n=null,i=null,l=null,m=null,y=null,g=null,f=null,E=null,x=null,w="none",v="none",T=0,A=0,L=0,V=0,k=null;function b(){if(e.getElementById("pour-filter-styles"))return;let R=e.createElement("style");R.id="pour-filter-styles",R.dataset.pourAudit="filter",R.textContent=St,e.head.appendChild(R)}function c(){if(e.getElementById("pour-vision-filter-defs"))return;let R="http://www.w3.org/2000/svg",N=e.createElementNS(R,"svg");N.setAttribute("id","pour-vision-filter-defs"),N.setAttribute("width","0"),N.setAttribute("height","0"),N.setAttribute("focusable","false"),N.setAttribute("aria-hidden","true"),N.dataset.pourAudit="filter",N.style.position="absolute",N.style.pointerEvents="none";let H=e.createElementNS(R,"defs");for(let[q,te]of Object.entries(Ne)){let Z=e.createElementNS(R,"filter");Z.setAttribute("id",`pour-vision-filter-${q}`),Z.setAttribute("color-interpolation-filters","linearRGB");let U=e.createElementNS(R,"feColorMatrix");U.setAttribute("type","matrix"),U.setAttribute("values",te),Z.appendChild(U),H.appendChild(Z)}N.appendChild(H),e.body.appendChild(N)}let u=R=>{let N=e.createElement("div");return N.className=R,N.dataset.pourAudit="filter",e.body.appendChild(N),N};function d(){L=0,r.style.setProperty("--pour-vision-x",`${T}px`),r.style.setProperty("--pour-vision-y",`${A}px`),r.style.setProperty("--pour-vision-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function M(R){T=R.clientX,A=R.clientY,L||(L=t.requestAnimationFrame(d))}function h(R){let N=R.touches[0];N&&M(N)}function B(R,N=null){for(let q of De)r.classList.remove(`pour-vision-filter-${q}`);Oe.has(w)&&(e.removeEventListener("mousemove",M),e.removeEventListener("touchmove",h)),i?.stop(),i=null,l?.stop(),l=null;try{f?.stop()}catch{}if(f=null,n?.remove(),n=null,w=me[R]!==void 0?R:"none",w==="none"){v==="none"&&(r.style.filter="");return}v!=="none"&&O("none"),b(),c();let H=me[w]||"none";if(r.style.filter=H==="none"?"":H,De.has(w)){r.classList.add(`pour-vision-filter-${w}`),n=u("pour-vision-filter-overlay"),n.dataset.filter=w,w==="floaters"&&(i=pt(e,n)),w==="glossyScreen"&&(l=dt(e,n));let q=Qe[w];q&&Le[q.driver]&&(f=Le[q.driver](e,{...q.options??{},...N??{}},{kit:a,container:n,lenses:s}))}Oe.has(w)&&(T=t.innerWidth/2,A=t.innerHeight/2,d(),e.addEventListener("mousemove",M),e.addEventListener("touchmove",h,{passive:!0}))}function X(){V=0,r.style.setProperty("--pour-sensory-x",`${T}px`),r.style.setProperty("--pour-sensory-y",`${A}px`),r.style.setProperty("--pour-sensory-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function W(R){T=R.clientX,A=R.clientY,V||(V=t.requestAnimationFrame(X))}function P(R){let N=R.touches[0];N&&W(N)}function j(R){if(e.getElementById("pour-sensory-injected-style")?.remove(),!R)return;let N=e.createElement("style");N.id="pour-sensory-injected-style",N.dataset.pourAudit="filter",N.textContent=R,e.head.appendChild(N)}function K(){if(e.querySelector(".pour-sensory-washout-char"))return;let R=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null),N=[];for(;R.nextNode();)N.push(R.currentNode);for(let H of N){let q=H.textContent;if(!q.trim())continue;let te=H.parentElement;if(!te||te.closest("script,style,noscript,[data-pour-audit]"))continue;let Z=e.createDocumentFragment();for(let U of q)if(U===" "||U===`
`||U==="	")Z.appendChild(e.createTextNode(U));else{let ae=e.createElement("span");ae.textContent=U,ae.style.opacity=(.3+Math.random()*.7).toFixed(2),ae.className="pour-sensory-washout-char",Z.appendChild(ae)}te.replaceChild(Z,H)}}function D(){for(let R of e.querySelectorAll(".pour-sensory-washout-char"))R.replaceWith(R.textContent);e.body.normalize()}let I=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],o=new Map,p=0,C=0,F=null,$=0,z=0,_=0,Y=0,Q=0,ne=0;function ue(R,N,H){let q=`${R}:${N}:${H}`,te=o.get(q);if(te)return te;let Z=e.createElement("canvas");Z.width=R,Z.height=R;let U=Z.getContext("2d");if(!U)return"auto";let ae=Math.round(R/2);U.save(),U.translate(ae+N,ae+H),U.scale(1.15,1.15),U.beginPath(),U.moveTo(I[0][0],I[0][1]);for(let de=1;de<I.length;de++)U.lineTo(I[de][0],I[de][1]);U.closePath(),U.restore(),U.lineWidth=3,U.lineJoin="round",U.strokeStyle="#fff",U.stroke(),U.fillStyle="#000",U.fill();let le=`url("${Z.toDataURL("image/png")}") ${ae} ${ae}, auto`;return o.set(q,le),le}function fe(R){let N=R.timeStamp||Date.now(),H=N-_;if(_&&H>0){let q=Math.hypot(R.clientX-$,R.clientY-z);Y=Y*.8+q/H*1e3*.2}$=R.clientX,z=R.clientY,_=N}function oe(R,N){if(!Q)return Q=R+N.minGap+Math.random()*(N.maxGap-N.minGap),[0,0];let H=R-Q;if(H<0)return[0,0];if(H>N.dur)return Q=R+N.minGap+Math.random()*(N.maxGap-N.minGap),ne=Math.random()*Math.PI*2,[0,0];let q=1-H/N.dur,te=N.size*q*q;return[Math.cos(ne)*te,Math.sin(ne)*te]}function he(R){p=t.requestAnimationFrame(he);let N=F;if(!N)return;let H=(R-C)/1e3,q=0,te=0;if(N.freq&&N.amp){let le=2*Math.PI*N.freq,de=Math.max(0,1+(N.intent||0)*Math.min(1,Y/700)),Je=N.amp*de;q+=(Math.sin(le*H)*.7+Math.sin(le*1.63*H+1.1)*.3)*Je,te+=(Math.cos(le*.97*H+.6)*.7+Math.sin(le*2.11*H+2.3)*.3)*Je}if(N.spasm){let[le,de]=oe(R,N.spasm);q+=le,te+=de}let Z=N.bitmap/2-14,U=Math.max(-Z,Math.min(Z,Math.round(q))),ae=Math.max(-Z,Math.min(Z,Math.round(te)));r.style.cursor=ue(N.bitmap,U,ae)}function ce(R){pe(),F=R,C=t.performance?t.performance.now():Date.now(),Y=0,_=0,Q=0,ne=Math.random()*Math.PI*2,ke(R.hide?`
      html, :not(html) { cursor: none !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `:`
      :not(html) { cursor: inherit !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `),!R.hide&&(e.addEventListener("mousemove",fe,{passive:!0}),p=t.requestAnimationFrame(he))}function pe(){p&&t.cancelAnimationFrame(p),p=0,F=null,Q=0,e.removeEventListener("mousemove",fe),ke(null),r.style.cursor=""}function ke(R){if(e.getElementById("pour-sensory-cursor-style")?.remove(),!R)return;let N=e.createElement("style");N.id="pour-sensory-cursor-style",N.dataset.pourAudit="filter",N.textContent=R,e.head.appendChild(N)}function Se(){S();let R=()=>{k=t.setTimeout(()=>{x&&(x.classList.add("pour-sensory-spike-flash"),t.setTimeout(()=>{x?.classList.remove("pour-sensory-spike-flash"),R()},150))},3e3+Math.random()*8e3)};R()}function S(){k&&(t.clearTimeout(k),k=null)}function O(R,N=null){let H=be[v];H?.overlay&&r.classList.remove(`pour-sensory-filter-${v}`),H?.hostClass&&r.classList.remove(H.hostClass),H?.mouseTracked&&(e.removeEventListener("mousemove",W),e.removeEventListener("touchmove",P)),H?.injectScript&&D(),H?.cursorJitter&&pe(),H?.viewportOrigin&&zt(),H?.loupe&&Ue(),H?.lens&&s[H.lens]?.remove(),m?.stop(),m=null,y?.stop(),y=null,g?.stop(),g=null;try{E?.stop()}catch{}if(E=null,S(),x?.remove(),x=null,j(null),v=be[R]?R:"none",v==="none"){w==="none"&&(r.style.filter="");return}w!=="none"&&B("none"),b();let q=be[v];r.style.filter=q.css&&q.css!=="none"?q.css:"",q.hostClass&&r.classList.add(q.hostClass),(q.overlay||q.mouseTracked||v==="sensorySpike")&&(x=u("pour-sensory-filter-overlay"),x.dataset.filter=v,q.overlay&&r.classList.add(`pour-sensory-filter-${v}`)),q.mouseTracked&&(T=t.innerWidth/2,A=t.innerHeight/2,X(),e.addEventListener("mousemove",W),e.addEventListener("touchmove",P,{passive:!0})),q.injectCSS&&j(q.injectCSS),v==="sensorySpike"&&Se(),q.injectScript&&K(),q.cursorJitter&&ce(q.cursorJitter),q.viewportOrigin&&Bt(),q.loupe&&qt(q.loupe),q.lens&&s[q.lens]?.apply(),q.forcedColours&&(m=bt(e)),q.fingertip&&(y=xt(e,q.fingertip)),q.magnifier&&(g=wt(e,q.magnifier)),q.driver&&Le[q.driver]&&(E=Le[q.driver](e,{...q.options??{},...N??{}},{kit:a,container:x,lenses:s}))}let G=0;function se(){G=0,r.style.setProperty("--pour-motion-origin",`${t.scrollX+t.innerWidth/2}px ${t.scrollY+t.innerHeight/2}px`)}function Ae(){G||(G=t.requestAnimationFrame(se))}function Bt(){se(),t.addEventListener("scroll",Ae,{passive:!0}),t.addEventListener("resize",Ae)}function zt(){t.removeEventListener("scroll",Ae),t.removeEventListener("resize",Ae),G&&(t.cancelAnimationFrame(G),G=0),r.style.removeProperty("--pour-motion-origin")}let Fe=null;function qt(R){Ue(),Fe=vt(e,{...R,point:()=>({x:T,y:A})})}function Ue(){Fe?.stop(),Fe=null}let Vt=()=>({vision:w,sensory:v});function _t(){B("none"),O("none")}return{applyVision:B,applySensory:O,clear:_t,state:Vt}}var Zr=new Set(["text","search","url","tel","email","password","number","date","datetime-local","month","time","week",""]),ea=new Set(["input","select","textarea","button","meter","output","progress"]);function ta(e){return e.replace(/[\uE000-\uF8FF\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}\u200B-\u200D\u2060\uFEFF]/gu,"").trim()?e:""}function Ot(e){return ta(Re(e,!1,!1,new Set))}function It(e){for(let r=e;r;r=Pe(r))if(r.getAttribute?.("aria-hidden")==="true"||getComputedStyle(r).display==="none")return!0;let t=getComputedStyle(e).visibility;return t==="hidden"||t==="collapse"}function ra(e,t){let r=e.getAttribute?.("aria-labelledby");if(!r)return null;let a=e.getRootNode(),s=r.split(/\s+/).filter(Boolean).map(n=>a.getElementById?.(n)).filter(Boolean);return s.length?s.map(n=>{let i=new Set(t);return n===e&&i.delete(e),Re(n,!0,It(n),i)}).join(" ").replace(/\s+/g," ").trim():null}function Re(e,t,r,a){if(a.has(e))return"";if(a.add(e),!t){let l=ra(e,a);if(l)return l}let s=e.getAttribute("aria-label")?.trim();if(s)return s;let n=e.tagName.toLowerCase();if(n==="img"||n==="area"){let l=e.getAttribute("alt")?.trim();if(l)return l}if(ea.has(n)&&e.labels?.length){let l=[...e.labels].map(m=>Re(m,t,It(m),a)).join(" ").trim();if(l)return l}if(n==="input"||n==="select"||n==="textarea"){if(e.type==="submit"||e.type==="reset"||e.type==="button"){let l=(e.value??e.getAttribute("value")??"").trim();if(l)return l}if(e.type==="image"){let l=e.getAttribute("alt")?.trim();if(l)return l}if(t&&(n==="textarea"||Zr.has(e.type))){let l=(e.value??"").trim();if(l)return l}if(e.type==="submit")return"Submit";if(e.type==="reset")return"Reset"}let i=aa(e,r,t,a).replace(/\s+/g," ").trim();return i||(e.getAttribute("title")??e.getAttribute("placeholder")??"").trim()}function aa(e,t,r,a){let s=e.shadowRoot?e.shadowRoot.childNodes:e.childNodes;return Dt(e,"::before",t)+Pt(s,t,r,a)+Dt(e,"::after",t)}function Dt(e,t,r){if(e.namespaceURI==="http://www.w3.org/2000/svg")return"";let a=getComputedStyle(e,t);if(!r&&(a.display==="none"||a.visibility==="hidden"||a.visibility==="collapse"))return"";let s=a.content;if(!s||s==="none"||s==="normal")return"";let n=s.match(/\/\s*"((?:[^"\\]|\\.)*)"\s*$/);if(n)return n[1].replace(/\\(.)/g,"$1");let i=s.match(/^"((?:[^"\\]|\\.)*)"$/);return i?i[1].replace(/\\(.)/g,"$1"):""}function Pt(e,t,r,a){let s="";for(let n of e){if(n.nodeType===3){s+=n.textContent;continue}if(n.nodeType!==1)continue;let i=n.tagName.toLowerCase();if(i==="script"||i==="style"||i==="noscript"||i==="template")continue;if(!t){if(n.getAttribute("aria-hidden")==="true")continue;let m=getComputedStyle(n);if(m.display==="none"||m.visibility==="hidden"||m.visibility==="collapse")continue}if(i==="slot"){let m=n.assignedNodes?.()??[];s+=Pt(m.length?m:n.childNodes,t,r,a);continue}if((i==="img"||i==="area")&&n.getAttribute("alt")===""&&!n.getAttribute("aria-label")?.trim()&&!n.getAttribute("aria-labelledby"))continue;let l=Re(n,r,t,a);s+=i==="img"||i==="area"||n.hasAttribute("aria-label")||n.hasAttribute("aria-labelledby")?` ${l} `:l}return s}return Xt(na);})();
