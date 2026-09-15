/*! pour filters | MIT | https://pour.dev */
var PourFilters=(()=>{var $e=Object.defineProperty;var Kt=Object.getOwnPropertyDescriptor;var Ut=Object.getOwnPropertyNames;var Jt=Object.prototype.hasOwnProperty;var Qt=(e,t)=>{for(var r in t)$e(e,r,{get:t[r],enumerable:!0})},Zt=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ut(t))!Jt.call(e,s)&&s!==r&&$e(e,s,{get:()=>t[s],enumerable:!(a=Kt(t,s))||a.enumerable});return e};var er=e=>Zt($e({},"__esModule",{value:!0}),e);var un={};Qt(un,{CSS_FILTERS:()=>he,MODE_LABELS:()=>Ie,SENSORY_FILTERS:()=>ye,accessibleName:()=>Vt,createFilterApplier:()=>qt,createLensKit:()=>ve,cssPath:()=>tt});var De={protanopia:"0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0 0 0 0 1 0",deuteranopia:"0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047414 0 0 -0.011820 0.042940 0.968881 0 0 0 0 0 1 0",tritanopia:"1.255528 -0.076749 -0.178779 0 0 -0.078411 0.930809 0.147602 0 0 0.004733 0.691367 0.303900 0 0 0 0 0 1 0",achromatopsia:"0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0 0 0 1 0",protanomaly:"0.458064 0.679578 -0.137642 0 0 0.092785 0.846313 0.060902 0 0 -0.007494 -0.016807 1.024301 0 0 0 0 0 1 0",deuteranomaly:"0.547494 0.607765 -0.155259 0 0 0.181692 0.781742 0.036566 0 0 -0.010410 0.027275 0.983136 0 0 0 0 0 1 0",tritanomaly:"1.057047 -0.029507 -0.027540 0 0 -0.039014 0.966028 0.072986 0 0 0.002584 0.220200 0.777216 0 0 0 0 0 1 0"},tr={protanopia:"saturate(0.25) sepia(0.5) hue-rotate(-15deg)",deuteranopia:"saturate(0.3) sepia(0.4) hue-rotate(-10deg)",tritanopia:"saturate(0.35) sepia(0.3) hue-rotate(50deg)",achromatopsia:"grayscale(100%)",protanomaly:"saturate(0.6) sepia(0.25) hue-rotate(-8deg)",deuteranomaly:"saturate(0.65) sepia(0.2) hue-rotate(-5deg)",tritanomaly:"saturate(0.7) sepia(0.15) hue-rotate(25deg)"},Ne=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge","diabeticRetinopathy","floaters","glossyScreen","nystagmus","hemianopiaLeft","hemianopiaRight","amblyopia","afterimages","ageSlider"]),Oe=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge"]),he={none:"none",cataract:"sepia(0.3) contrast(0.9) saturate(0.9) brightness(0.95) blur(0.6px)",presbyopia:"blur(0.5px) contrast(0.92)",lowAcuityMild:"blur(0.7px)",lowAcuity:"blur(1.2px)",lowAcuityStrong:"blur(2.5px)",lowAcuityHeavy:"blur(5px)",lowLight:"brightness(0.65) contrast(0.9) saturate(0.85) hue-rotate(-8deg)",lowContrast:"contrast(0.7)",retinitisRing:"none",glaucoma:"none",glaucomaLarge:"none",macularDegeneration:"none",macularDegenerationLarge:"none",diabeticRetinopathy:"none",floaters:"none",glossyScreen:"none",nystagmus:"none",hemianopiaLeft:"none",hemianopiaRight:"none",amblyopia:"none",afterimages:"none",ageSlider:"none",scotopicRose:"sepia(0.15) hue-rotate(330deg) saturate(1.2) brightness(1.05)",scotopicYellow:"sepia(0.3) saturate(1.15) brightness(1.05)",scotopicAqua:"sepia(0.2) hue-rotate(160deg) saturate(1.15) brightness(1.02)"},rr=typeof navigator<"u"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent),nr=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),ar=rr||nr;Object.keys(De).forEach(e=>{ar?he[e]=tr[e]:he[e]=`url(#pour-vision-filter-${e})`});var or=[{label:"Color vision",options:[{value:"deuteranomaly",added:"2026-07-30",name:"Green Weak (Deuteranomaly)",stat:"~5% of men",description:"Green-sensitive cones respond off-target, so greens, reds and browns crowd together. The most common colour vision difference.",label:"Green Weak - Deuteranomaly - ~5% of men"},{value:"protanomaly",added:"2026-07-30",name:"Red Weak (Protanomaly)",stat:"~1% of men",description:"Red-sensitive cones respond weakly: reds dim and drift towards green.",label:"Red Weak - Protanomaly - ~1% of men"},{value:"protanopia",added:"2026-07-30",name:"Red Absent (Protanopia)",stat:"~1% of men",description:"Red light barely registers \u2014 reds darken and sink into the greens around them.",label:"Red Absent - Protanopia - ~1% of men"},{value:"deuteranopia",added:"2026-07-30",name:"Green Absent (Deuteranopia)",stat:"~1% of men",description:"No working green cones: red and green become the same family of murky ochre.",label:"Green Absent - Deuteranopia - ~1% of men"},{value:"tritanomaly",added:"2026-07-30",name:"Blue Weak (Tritanomaly)",stat:"<0.2%",description:"Blue-sensitive cones respond weakly: blues and greens blur together, yellows go pale.",label:"Blue Weak - Tritanomaly - <0.2%"},{value:"tritanopia",added:"2026-07-30",name:"Blue Absent (Tritanopia)",stat:"<0.01%",description:"No working blue cones \u2014 blues read as greens, yellows as pinks and greys.",label:"Blue Absent - Tritanopia - <0.01%"},{value:"achromatopsia",added:"2026-07-30",name:"Monochromacy (Achromatopsia)",stat:"~0.003%",description:"No colour at all: brightness is the only signal left, usually with strong glare sensitivity.",label:"Monochromacy - Achromatopsia - ~0.003%"}]},{label:"Eye conditions",options:[{value:"presbyopia",added:"2026-07-30",name:"Near-Vision Loss (Presbyopia)",stat:"nearly all over 50",description:"The lens stiffens with age and close text blurs \u2014 the one condition almost everyone gets.",label:"Near-Vision Loss - Presbyopia - nearly all over 50"},{value:"glaucoma",added:"2026-07-30",name:"Tunnel Vision (Glaucoma)",stat:"~2% over 40",description:"Peripheral vision closes in until only a central window stays sharp. The window follows your pointer.",label:"Tunnel Vision - Glaucoma - ~2% over 40"},{value:"glaucomaLarge",added:"2026-07-30",name:"Tunnel Vision (Advanced Glaucoma)",stat:"~0.5% over 40",description:"Advanced glaucoma: the sharp window narrows further; everything else is gone, not blurred.",label:"Tunnel Vision (Large) - Advanced Glaucoma - ~0.5% over 40"},{value:"macularDegeneration",added:"2026-07-30",name:"Central Vision Loss (Macular Degeneration)",stat:"~8% over 45",description:"The centre of gaze fades first \u2014 precisely where you point your eyes to read.",label:"Central Vision Loss - Macular Degeneration - ~8% over 45"},{value:"macularDegenerationLarge",added:"2026-07-30",name:"Central Vision Loss (Advanced Macular Degeneration)",stat:"~1% over 50",description:"Advanced macular degeneration: a larger central blank that reading must route around.",label:"Central Vision Loss (Large) - Advanced Macular Degeneration - ~1% over 50"},{value:"diabeticRetinopathy",added:"2026-07-30",name:"Patchy Vision (Diabetic Retinopathy)",stat:"~0.8% over 40",description:"Blood-vessel damage scatters dark blotches across the view; content falls into them.",label:"Patchy Vision - Diabetic Retinopathy - ~0.8% over 40"},{value:"floaters",name:"Drifting Shadows (Floaters)",added:"2026-09-12",stat:"~33%",description:"Strands and specks in the eye cast shadows that drift and lag behind every eye movement. They show most against bright, flat areas, so a page of white space is where they live.",label:"Drifting Shadows - Floaters - ~33%"},{value:"nystagmus",added:"2026-07-30",name:"Involuntary Eye Movement (Nystagmus)",stat:"~0.2%",description:"The eyes move on their own, so the page never quite holds still.",label:"Involuntary Eye Movement - Nystagmus - ~0.2%"}]},{label:"Field of vision",options:[{value:"hemianopiaLeft",added:"2026-07-30",name:"Left Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the left half of vision in both eyes.",label:"Left Field Loss - Hemianopia (Left) - ~0.1% over 49"},{value:"hemianopiaRight",added:"2026-07-30",name:"Right Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the right half of vision in both eyes.",label:"Right Field Loss - Hemianopia (Right) - ~0.1% over 49"},{value:"retinitisRing",name:"Ring Loss (Retinitis Pigmentosa)",added:"2026-08-22",stat:"~0.025%",description:"Early retinitis pigmentosa takes a ring out of the mid-periphery, leaving a clear centre and a seeing outer rim. It narrows to a tunnel only much later, so this donut, not the tunnel, is what most of that life looks like.",label:"Ring Loss - Retinitis Pigmentosa - ~0.025%"},{value:"amblyopia",added:"2026-07-30",name:"Reduced Acuity (Amblyopia)",stat:"~2-3%",description:"One eye never learned to see sharply; fine detail and depth suffer.",label:"Reduced Acuity (One Eye) - Amblyopia - ~2-3%"},{value:"afterimages",added:"2026-09-14",name:"Afterimages (Palinopsia)",stat:"~10% with migraine",description:"Anything that moves leaves a fading copy of itself behind, the page under scroll included: a carousel becomes a smear and the page takes a couple of seconds to settle after every scroll. Content the page moves on its own is the finding. Needs the page's own pixels, so it asks to share this tab (Chromium) and says so where it cannot.",label:"Afterimages - Palinopsia - ~10% with migraine"}]},{label:"Focus & acuity",options:[{value:"lowAcuityMild",added:"2026-07-30",name:"Slight Defocus",description:"Mildly uncorrected eyesight \u2014 the glasses left in the other room.",label:"Slight Defocus - Mild Blur"},{value:"lowAcuity",added:"2026-07-30",name:"Uncorrected Focus",stat:"~5-6%",description:"Moderate uncorrected short-sight: small text needs effort, thin fonts give up first.",label:"Uncorrected Focus - Moderate Blur - ~5-6%"},{value:"lowAcuityStrong",added:"2026-07-30",name:"Significant Defocus",description:"Strong blur: layout and colour still communicate, letterforms mostly do not.",label:"Significant Defocus - Strong Blur"},{value:"lowAcuityHeavy",added:"2026-07-30",name:"Severe Defocus",description:"Only shape, contrast and position survive. What does your page still say?",label:"Severe Defocus - Very Strong Blur"}]},{label:"Contrast & light",options:[{value:"cataract",added:"2026-07-30",name:"Clouded Lens (Cataract)",stat:"~17% over 40",description:"The lens clouds and yellows: glare blooms, contrast drains, whites go dingy.",label:"Clouded Lens - Cataract - ~17% over 40"},{value:"lowContrast",added:"2026-07-30",name:"Reduced Contrast",description:"Contrast sensitivity loss: faint greys sink into their backgrounds long before they vanish for you.",label:"Reduced Contrast"},{value:"lowLight",added:"2026-07-30",name:"Dim Environment",description:"A dim room, a cheap panel, a phone at night \u2014 the low-vision hours everyone has.",label:"Dim Environment - Low Light"},{value:"glossyScreen",added:"2026-09-12",name:"Glossy Screen (Reflections)",description:"The room and your own face reflect off the glass and add light to every dark pixel. White areas barely change; dark themes, grey-on-black text and low-contrast controls wash out first. Uses your camera on this device only, never recorded or sent.",label:"Glossy Screen - Reflections"}]},{label:"Ageing",options:[{value:"ageSlider",added:"2026-09-14",name:"Age Slider",description:"One slider from twenty to ninety: the lens yellows, the pupil shrinks, contrast and near focus fall, and from sixty-five the pointer shows the tremor one in twenty has, all on published population curves. An approximation: any one reader sits above or below them. Grey text and small buttons are the first to go.",label:"Age Slider"}]},{label:"Visual stress",options:[{value:"scotopicRose",added:"2026-07-30",name:"Rose Tint",description:"A coloured overlay some readers use to calm pattern glare. See how your design reads through one.",label:"Rose Tint - Coloured Overlay"},{value:"scotopicYellow",added:"2026-07-30",name:"Yellow Tint",description:"A yellow reading overlay \u2014 common for visual stress. Your palette should survive it.",label:"Yellow Tint - Coloured Overlay"},{value:"scotopicAqua",added:"2026-07-30",name:"Aqua Tint",description:"An aqua reading overlay. Tinted reading is more common than most designs assume.",label:"Aqua Tint - Coloured Overlay"}]}],ye={none:{label:"None",css:"none"},fluorescentFlicker:{label:"Fluorescent Flicker",overlay:"fluorescentFlicker",css:"none"},lightSensitivity:{label:"Light Sensitivity",css:"brightness(1.4) contrast(1.2) saturate(1.1)"},colourHypersensitivity:{label:"Colour Hypersensitivity",css:"saturate(2.2) contrast(1.35) brightness(1.1)"},motionSensitivity:{label:"Motion Sensitivity",hostClass:"pour-sensory-filter-motionSensitivity",viewportOrigin:!0,css:"none"},hyperfocusTunnel:{label:"Hyperfocus Tunnel (Metaphor)",overlay:"hyperfocusTunnel",mouseTracked:!0,css:"none"},attentionFragmentation:{label:"Attention Fragmentation (Metaphor)",overlay:"attentionFragmentation",css:"none"},peripheralDistraction:{label:"Peripheral Distraction",overlay:"peripheralDistraction",css:"none"},detailFixation:{label:"Detail Fixation (Metaphor)",overlay:"detailFixation",mouseTracked:!0,loupe:{scale:2,radius:150,ring:75},css:"none"},processingDelay:{label:"Processing Lag",overlay:"processingDelay",css:"none"},sensoryInterference:{label:"Sensory Interference",hostClass:"pour-sensory-filter-backgroundNoise",css:"none"},sensorySpike:{label:"Sudden Sensory Spike",overlay:"sensorySpike",css:"none"},dyslexiaVisualStress:{label:"Visual Stress (Pattern Glare)",overlay:"dyslexiaVisualStress",injectCSS:`
        body { background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.06) 22px, rgba(0,0,0,0.06) 24px) !important; background-attachment: fixed !important; }
        p, li, td, th, dd, dt, h1, h2, h3, h4, h5, h6, label { text-shadow: 0 0 1px rgba(0,0,0,0.15) !important; animation: pour-sensory-line-merge 3s ease-in-out infinite alternate !important; }
        @keyframes pour-sensory-line-merge { 0% { transform: scaleX(1) translateY(0); } 25% { transform: scaleX(1.008) translateY(0.8px); } 50% { transform: scaleX(0.993) translateY(-0.5px); } 75% { transform: scaleX(1.005) translateY(0.6px); } 100% { transform: scaleX(0.996) translateY(-0.3px); } }
      `,css:"none"},dyslexiaCrowding:{label:"Crowding Effect",injectCSS:"* { letter-spacing: -1px !important; word-spacing: -3px !important; line-height: 1.05 !important; } p, li, td, th, dd, dt, label, span, a { font-size: 95% !important; }",css:"none"},dyslexiaTrackingLoss:{label:"Tracking Loss",overlay:"dyslexiaTrackingLoss",mouseTracked:!0,css:"none"},dyslexiaWashout:{label:"Letter Instability",injectScript:!0,css:"none"},dyslexiaContrastSensitivity:{label:"Contrast Sensitivity",css:"contrast(0.8) brightness(1.1) saturate(0.9)"},handTremor:{label:"Hand Tremor",cursorJitter:{freq:6,amp:9,intent:1.6,bitmap:96},css:"none"},handTremorStrong:{label:"Hand Tremor (Strong)",cursorJitter:{freq:5,amp:18,intent:1.9,bitmap:128},css:"none"},restingTremor:{label:"Resting Tremor",cursorJitter:{freq:4.5,amp:12,intent:-.9,bitmap:96},css:"none"},ataxicDrift:{label:"Ataxic Drift",cursorJitter:{freq:.7,amp:26,intent:.8,bitmap:128},css:"none"},pointerSpasm:{label:"Sudden Jerk",cursorJitter:{freq:5,amp:3,intent:.4,bitmap:128,spasm:{minGap:2200,maxGap:6500,size:44,dur:280}},css:"none"},pointerHidden:{label:"Hidden Pointer (Keyboard Only)",cursorJitter:{hide:!0,bitmap:32},css:"none"},fingertipTouch:{label:"Fingertip Touch",fingertip:{diameter:38},css:"none"},forcedColours:{label:"Forced Colours",forcedColours:!0,css:"none"},screenMagnifier:{label:"Screen Magnifier (400%)",magnifier:{scale:4},css:"none"},textSpacing:{label:"Text Spacing",injectCSS:`
        *:not([data-pour-audit]):not([data-pour-audit] *) { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
        p:not([data-pour-audit] *) { margin-bottom: 2em !important; }
      `,css:"none"},focusOrder:{label:"Focus Order",lens:"focusOrder",css:"none"},landmarkMap:{label:"Landmarks & Headings",lens:"landmarkMap",css:"none"},hearingLoss:{label:"Hearing Loss on the Page's Media",driver:"hearingLoss",options:{audiogram:"moderate",picker:"loss"},frames:!0,sound:!0,css:"none"},cochlearImplant:{label:"Cochlear Implant",driver:"hearingLoss",options:{audiogram:"implant8",picker:"implant"},frames:!0,sound:!0,css:"none"},tinnitus:{label:"Tinnitus",driver:"tinnitus",options:{pitch:6e3,kind:"tone",level:"quiet"},sound:!0,css:"none"}},Qe={afterimages:{driver:"afterimages",options:{decay:.86}},ageSlider:{driver:"ageSlider",options:{start:45}}},ir=[{label:"Sensory overload",options:[{value:"fluorescentFlicker",added:"2026-07-30",name:"Fluorescent Flicker",description:"The pulse of failing fluorescent light \u2014 flicker that many autistic and migraine-prone people cannot tune out.",label:"Fluorescent Flicker"},{value:"lightSensitivity",added:"2026-07-30",name:"Light Sensitivity",description:"Photophobia: ordinary brightness arrives as glare; bright themes read as pain.",label:"Light Sensitivity"},{value:"colourHypersensitivity",added:"2026-07-30",name:"Colour Hypersensitivity",description:"Saturated colour lands far louder than you sent it.",label:"Colour Hypersensitivity"},{value:"motionSensitivity",added:"2026-07-30",name:"Motion Sensitivity",stat:"~5% of adults",description:"Page motion is felt, not just seen \u2014 what autoplaying movement does to a vestibular-sensitive visitor.",label:"Motion Sensitivity"}]},{label:"Attention & focus",options:[{value:"hyperfocusTunnel",added:"2026-07-30",name:"Hyperfocus Tunnel",metaphor:!0,description:"The world outside the point of focus falls away; the page exists one region at a time.",label:"Hyperfocus Tunnel (Metaphor)"},{value:"attentionFragmentation",added:"2026-07-30",name:"Attention Fragmentation",metaphor:!0,description:"A scattered attention field \u2014 every element competes and none of them wins.",label:"Attention Fragmentation (Metaphor)"},{value:"peripheralDistraction",added:"2026-07-30",name:"Peripheral Distraction",description:"Movement at the edges keeps stealing the centre of your gaze.",label:"Peripheral Distraction"},{value:"detailFixation",added:"2026-09-12",name:"Detail Fixation",metaphor:!0,description:"Detail-first processing: the point of attention magnifies while the whole recedes.",label:"Detail Fixation (Metaphor)"}]},{label:"Processing differences",options:[{value:"processingDelay",added:"2026-07-30",name:"Processing Lag",description:"The page lands a beat late \u2014 interaction as it feels under cognitive load.",label:"Processing Lag"},{value:"sensoryInterference",added:"2026-07-30",name:"Sensory Interference",description:"Visual noise under everything, like reading in a room that will not go quiet.",label:"Sensory Interference"}]},{label:"Sensory spikes",options:[{value:"sensorySpike",added:"2026-07-30",name:"Sudden Sensory Spike",description:"Not a constant state: periodic waves of too-much, out of nowhere.",label:"Sudden Sensory Spike"}]},{label:"Dyslexia / reading",options:[{value:"dyslexiaVisualStress",added:"2026-07-30",name:"Visual Stress (Pattern Glare)",stat:"~10%",description:"Dense text shimmers and bands together; lines merge and repel.",label:"Visual Stress (Pattern Glare)"},{value:"dyslexiaCrowding",added:"2026-07-30",name:"Crowding Effect",stat:"~10%",description:"Letters and words pack too tightly to separate \u2014 spacing is doing more work than you think.",label:"Crowding Effect"},{value:"dyslexiaTrackingLoss",added:"2026-07-30",name:"Tracking Loss",stat:"~10%",description:"Losing the line mid-sentence: only the neighbourhood of your pointer holds steady.",label:"Tracking Loss"},{value:"dyslexiaWashout",added:"2026-07-30",name:"Letter Instability",stat:"~10%",description:"Some letters appear fainter than others, making words harder to read. Try reading a paragraph with the effect enabled.",label:"Letter Instability"},{value:"dyslexiaContrastSensitivity",added:"2026-07-30",name:"Contrast Sensitivity",stat:"~10%",description:"Full-contrast text tires, low-contrast text disappears; the readable band is narrow.",label:"Contrast Sensitivity"}]}],sr=[{label:"Tremor",options:[{value:"handTremor",added:"2026-08-06",name:"Hand Tremor",stat:"~1%",description:"An essential tremor: the pointer shakes harder the more precisely you aim.",label:"Hand Tremor"},{value:"handTremorStrong",added:"2026-08-06",name:"Hand Tremor (Strong)",description:"The same tremor, stronger \u2014 small close-set targets become lotteries.",label:"Hand Tremor (Strong)"},{value:"restingTremor",added:"2026-08-06",name:"Resting Tremor",stat:"~0.3%",description:"A parkinsonian pattern: shakes at rest, steadies during deliberate movement.",label:"Resting Tremor"}]},{label:"Pointer control",options:[{value:"ataxicDrift",added:"2026-08-06",name:"Ataxic Drift",description:"The pointer drifts wide of intent; straight lines are not on offer.",label:"Ataxic Drift"},{value:"pointerSpasm",added:"2026-08-06",name:"Sudden Jerk",description:"Occasional involuntary jerks fling the pointer \u2014 sometimes mid-click.",label:"Sudden Jerk"},{value:"pointerHidden",added:"2026-08-06",name:"Hidden Pointer (Keyboard Only)",description:"No pointer at all. The keyboard is the only way through your page.",label:"Hidden Pointer (Keyboard Only)"}]},{label:"Touch",options:[{value:"fingertipTouch",added:"2026-09-13",name:"Fingertip Touch",description:"The pointer becomes a fingertip, about 10 mm across. Every target under it is outlined, and when more than one is, each shows its share of the fingertip. A click lands the way a tap does: on one of those targets, in proportion to its share. Close-set links and small buttons are the findings.",label:"Fingertip Touch"}]}],lr=[{label:"Keyboard",options:[{value:"focusOrder",added:"2026-09-07",name:"Focus Order",description:"Numbered stops trace where Tab really goes, in order. Amber stops force their own position with a positive tabindex.",label:"Focus Order"}]},{label:"Page structure",options:[{value:"landmarkMap",added:"2026-09-07",name:"Landmarks & Headings",description:"Landmark regions tinted and named, every heading chipped with its level. Amber chips skip a level.",label:"Landmarks & Headings"}]}],cr=[{label:"Colours",options:[{value:"forcedColours",added:"2026-09-12",name:"Forced Colours (Windows Contrast Theme)",stat:"~4% on Windows",description:"Every colour the page chose is replaced by a contrast theme\u2019s handful. Backgrounds, gradients and shadows go; borders keep their width; images and video stay, with a plate behind any text over them, as Windows draws it. Icon buttons that vanish, borderless fields and missing focus rings are the findings. An approximation: the page\u2019s own forced-colours rules are applied where its stylesheets can be read.",label:"Forced Colours (Windows Contrast Theme)"}]},{label:"Magnification",options:[{value:"screenMagnifier",added:"2026-09-13",name:"Screen Magnifier (400%)",description:"The page at 400%, as a full-screen magnifier shows it: a quarter of the width at a time, following the pointer and keyboard focus. When something changes outside the magnified view, a marker at the edge points to it. Messages, basket counts and menus that appear where the reader is not looking are the findings.",label:"Screen Magnifier (400%)"}]},{label:"Text",options:[{value:"textSpacing",added:"2026-09-12",name:"Text Spacing",description:"Line height 1.5, paragraph spacing 2, letter spacing 0.12 and word spacing 0.16 times the font size: the overrides low-vision and dyslexic readers apply, which WCAG 1.4.12 says a page must survive. Clipped labels, overflowing boxes and buttons that break are the findings.",label:"Text Spacing"}]}],pr=[{label:"Hearing loss",options:[{value:"hearingLoss",added:"2026-09-14",name:"Hearing Loss on the Page's Media",stat:"~20%",description:"The page\u2019s own audio and video through an audiogram: mild to severe, the notch of noise damage, or a noisy room. Turning the volume up does not help; captions do.",label:"Hearing Loss on the Page's Media - ~20%"}]},{label:"Tinnitus",options:[{value:"tinnitus",added:"2026-09-15",name:"Tinnitus",stat:"~14%",description:"A steady tone or a narrow hiss, high, that starts now and never stops, media or no media. Quiet sounds near its pitch are masked and a long spoken video tires. Captions and a transcript are what help.",label:"Tinnitus - ~14%"}]},{label:"Cochlear implant",options:[{value:"cochlearImplant",added:"2026-09-15",name:"Cochlear Implant",description:"The page\u2019s own audio and video as an implant delivers it: a few bands of noise, each carrying only the loudness of its band. Speech is followable from four channels up and sounds like a whisper through a pipe; melody and pitch are gone at any count. Over a million people hear this way.",label:"Cochlear Implant"}]}],Ie={};for(let e of[...or,...ir,...sr,...lr,...cr,...pr])for(let t of e.options)Ie[t.value]=t.label.split(" - ")[0];function Pe(e){return e.assignedSlot??e.parentElement??e.getRootNode()?.host??null}var Ze=new WeakMap,dr=new Set;function ur(e){let t=Ze.get(e);if(!t){let r=typeof MutationObserver=="function"?new MutationObserver(()=>{t.ids=null,t.parents=new WeakMap}):null;t={ids:null,parents:new WeakMap,observer:r},r&&(r.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["id"]}),dr.add(r)),Ze.set(e,t)}if(t.observer?.takeRecords().length&&(t.ids=null,t.parents=new WeakMap),!t.ids){t.ids=new Map;for(let r of e.querySelectorAll("[id]"))t.ids.set(r.id,(t.ids.get(r.id)??0)+1)}return t}function fr(e,t){let r=e.parentElement,a=t.parents.get(r);if(!a){let s=new Map;a=new WeakMap;for(let n of r.children){let o=(s.get(n.tagName)??0)+1;s.set(n.tagName,o),a.set(n,{position:o,repeated:!1})}for(let n of r.children)a.get(n).repeated=s.get(n.tagName)>1;t.parents.set(r,a)}return a.get(e)}function et(e){let t=e.getRootNode(),r=ur(t),a=o=>o.id&&r.ids.get(o.id)===1;if(a(e))return`#${CSS.escape(e.id)}`;let s=[],n=e;for(;n&&n.nodeType===Node.ELEMENT_NODE&&n!==document.documentElement;){let o=n.tagName.toLowerCase();if(n.parentElement){let{position:c,repeated:m}=fr(n,r);m&&(o+=`:nth-of-type(${c})`)}if(s.unshift(o),n.parentElement&&a(n.parentElement)){s.unshift(`#${CSS.escape(n.parentElement.id)}`);break}n=n.parentElement}return s.join(" > ")||e.tagName.toLowerCase()}function tt(e){let t=et(e),r=e.getRootNode();for(;r&&r.host;)t=`${et(r.host)} >>> ${t}`,r=r.host.getRootNode();return t}var mn=typeof Element<"u"?Object.getOwnPropertyDescriptor(Element.prototype,"attributes")?.get:null;function rt(e){for(let t=e;t;t=Pe(t))if(t.nodeType===1&&t.hasAttribute("inert"))return!0;return!1}var hr=new Set(["atomic","busy","controls","current","describedby","description","details","dropeffect","flowto","grabbed","hidden","keyshortcuts","label","labelledby","live","owns","relevant","roledescription","braillelabel","brailleroledescription"]),at=new Set(["banner","complementary","contentinfo","form","main","navigation","region","search"]),mr={link:["disabled","errormessage","expanded","haspopup","invalid"],button:["disabled","errormessage","expanded","haspopup","invalid","pressed"],checkbox:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],switch:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],radio:["checked","disabled","errormessage","haspopup","invalid","posinset","setsize"],option:["checked","disabled","errormessage","haspopup","invalid","posinset","selected","setsize"],tab:["disabled","errormessage","expanded","haspopup","invalid","posinset","selected","setsize"],menuitem:["disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemcheckbox:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemradio:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],textbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],searchbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],combobox:["activedescendant","autocomplete","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],listbox:["activedescendant","disabled","errormessage","expanded","haspopup","invalid","multiselectable","orientation","readonly","required"],slider:["disabled","errormessage","haspopup","invalid","orientation","readonly","valuemax","valuemin","valuenow","valuetext"],spinbutton:["activedescendant","disabled","errormessage","haspopup","invalid","readonly","required","valuemax","valuemin","valuenow","valuetext"],progressbar:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],meter:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],scrollbar:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],heading:["disabled","errormessage","haspopup","invalid","level"],list:["disabled","errormessage","haspopup","invalid"],listitem:["disabled","errormessage","haspopup","invalid","level","posinset","setsize"],row:["activedescendant","colindex","colindextext","disabled","errormessage","expanded","haspopup","invalid","level","posinset","rowindex","rowindextext","selected","setsize"],rowgroup:["disabled","errormessage","haspopup","invalid"],cell:["colindex","colindextext","colspan","disabled","errormessage","haspopup","invalid","rowindex","rowindextext","rowspan"],gridcell:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected"],columnheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],rowheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],table:["colcount","disabled","errormessage","haspopup","invalid","rowcount"],grid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","readonly","rowcount"],treegrid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","orientation","readonly","required","rowcount"],tablist:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation"],menu:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],menubar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],tree:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation","required"],treeitem:["checked","disabled","errormessage","expanded","haspopup","invalid","level","posinset","selected","setsize"],radiogroup:["activedescendant","disabled","errormessage","haspopup","invalid","orientation","readonly","required"],group:["activedescendant","disabled","errormessage","haspopup","invalid"],separator:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],toolbar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],dialog:["disabled","errormessage","haspopup","invalid","modal"],alertdialog:["disabled","errormessage","haspopup","invalid","modal"],application:["activedescendant","disabled","errormessage","expanded","haspopup","invalid"],article:["disabled","errormessage","haspopup","invalid","posinset","setsize"],img:["disabled","errormessage","haspopup","invalid"],figure:["disabled","errormessage","haspopup","invalid"],document:["disabled","errormessage","haspopup","invalid"],feed:["disabled","errormessage","haspopup","invalid"],math:["disabled","errormessage","haspopup","invalid"],note:["disabled","errormessage","haspopup","invalid"],presentation:["disabled","errormessage","haspopup","invalid"],none:["disabled","errormessage","haspopup","invalid"],banner:["disabled","errormessage","haspopup","invalid"],complementary:["disabled","errormessage","haspopup","invalid"],contentinfo:["disabled","errormessage","haspopup","invalid"],form:["disabled","errormessage","haspopup","invalid"],main:["disabled","errormessage","haspopup","invalid"],navigation:["disabled","errormessage","haspopup","invalid"],region:["disabled","errormessage","haspopup","invalid"],search:["disabled","errormessage","haspopup","invalid"],alert:["disabled","errormessage","haspopup","invalid"],log:["disabled","errormessage","haspopup","invalid"],marquee:["disabled","errormessage","haspopup","invalid"],status:["disabled","errormessage","haspopup","invalid"],timer:["disabled","errormessage","haspopup","invalid"],tabpanel:["disabled","errormessage","haspopup","invalid"],tooltip:["disabled","errormessage","haspopup","invalid"],definition:["disabled","errormessage","haspopup","invalid"],term:["disabled","errormessage","haspopup","invalid"],paragraph:["disabled","errormessage","haspopup","invalid"],generic:["disabled","errormessage","haspopup","invalid"],blockquote:["disabled","errormessage","haspopup","invalid"],caption:["disabled","errormessage","haspopup","invalid"],code:["disabled","errormessage","haspopup","invalid"],emphasis:["disabled","errormessage","haspopup","invalid"],strong:["disabled","errormessage","haspopup","invalid"],time:["disabled","errormessage","haspopup","invalid"],deletion:["disabled","errormessage","haspopup","invalid"],insertion:["disabled","errormessage","haspopup","invalid"],subscript:["disabled","errormessage","haspopup","invalid"],superscript:["disabled","errormessage","haspopup","invalid"]},gr={checkbox:"checkbox",radio:"radio",range:"slider",number:"spinbutton",search:"searchbox",email:"textbox",tel:"textbox",text:"textbox",url:"textbox",button:"button",submit:"button",reset:"button",image:"button"},br=new Set(["text","search","tel","url","email"]),yr={button:"button",textarea:"textbox",img:"img",article:"article",aside:"complementary",nav:"navigation",main:"main",search:"search",h1:"heading",h2:"heading",h3:"heading",h4:"heading",h5:"heading",h6:"heading",ul:"list",ol:"list",menu:"list",li:"listitem",table:"table",thead:"rowgroup",tbody:"rowgroup",tfoot:"rowgroup",tr:"row",td:"cell",th:"columnheader",form:"form",fieldset:"group",details:"group",dialog:"dialog",hr:"separator",progress:"progressbar",meter:"meter",output:"status",option:"option",datalist:"listbox",dt:"term",dd:"definition",p:"paragraph",div:"generic",span:"generic",blockquote:"blockquote",figure:"figure",time:"time",code:"code",em:"emphasis",strong:"strong"};function nt(e){let t=e.tagName.toLowerCase();if(t==="a"||t==="area")return e.hasAttribute("href")?"link":"generic";if(t==="input")return br.has(e.type)&&e.hasAttribute("list")?"combobox":gr[e.type]??null;if(t==="td"||t==="th"){if(t==="th"&&e.getAttribute("scope")?.toLowerCase()==="row")return"rowheader";if(t==="th")return"columnheader";let r=e.closest("table"),a=r&&Be(r);return a==="grid"||a==="treegrid"?"gridcell":"cell"}if(t==="select")return e.multiple||e.size>1?"listbox":"combobox";if(t==="img")return e.getAttribute("alt")===""?"presentation":"img";if(t==="header")return e.closest("article, aside, main, nav, section")?"generic":"banner";if(t==="footer")return e.closest("article, aside, main, nav, section")?"generic":"contentinfo";if(t==="aside"){let r=e.parentElement?.closest("article, aside, nav, section"),a=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby");return r&&!a?"generic":"complementary"}return t==="section"?e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")?"region":"generic":yr[t]??null}function vr(e){return[...hr].some(t=>e.hasAttribute(`aria-${t}`))?!0:e.matches(":disabled")||rt(e)?!1:e.tabIndex>=0?!0:e.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]')}function Be(e){let t=e.getAttribute("role")?.trim().split(/\s+/)??[];for(let r of t){let a=r.toLowerCase();if(a==="image")return"img";if(mr[a])return(a==="presentation"||a==="none")&&vr(e)?nt(e):a}return nt(e)}var ot=`/* Structure-lens overlay styles (focus order, landmark map): injected by
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
`;function qe(e){if(e.getElementById("pour-lens-styles"))return;let t=e.createElement("style");t.id="pour-lens-styles",t.dataset.pourAudit="overlay",t.textContent=ot,e.head.appendChild(t)}function ve(e=document){let t=e.defaultView,r={contentVisibilityAuto:!0,visibilityProperty:!0,checkVisibilityCSS:!0};function a(c){for(let m=c;m&&m!==e.documentElement;m=m.parentElement??m.getRootNode()?.host??null){let b=m.ownerDocument.defaultView.getComputedStyle(m).position;if(b==="fixed")return"fixed";if(b==="sticky")return"sticky"}return"flow"}function s(c,{withLine:m=!1}={}){let b="background:none;border:0;margin:0;padding:0;box-shadow:none;filter:none;opacity:1;mix-blend-mode:normal;",h=e.createElement("div");h.className=c,h.dataset.pourAudit="overlay",h.style.cssText=`position:absolute;top:0;left:0;width:0;height:0;overflow:clip;overflow-clip-margin:24px;pointer-events:none;z-index:2147483646;${b}`;let d=e.createElement("div");d.className=c,d.dataset.pourAudit="overlay",d.style.cssText=`position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:2147483646;${b}`;let T=0,y=0,x=null,g=null,k=null;if(m){g=e.createElementNS("http://www.w3.org/2000/svg","svg"),g.setAttribute("class",`${c.replace(/-layer$/,"")}-path`);for(let[p,S]of[["position","absolute"],["top","0"],["left","0"],["width","100%"],["height","100%"],["max-width","none"],["max-height","none"],["display","block"],["overflow","visible"],["pointer-events","none"],["background","none"],["border","0"],["margin","0"],["padding","0"],["box-shadow","none"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])g.style.setProperty(p,S,"important");k=e.createElementNS("http://www.w3.org/2000/svg","polyline"),x=e.createElementNS("http://www.w3.org/2000/svg","polyline");for(let[p,S,v]of[[k,"rgba(29,78,216,0.85)","3"],[x,"#93C5FD","1.5"]])for(let[P,W]of[["fill","none"],["stroke",S],["stroke-width",v],["stroke-linejoin","round"],["stroke-linecap","round"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])p.style.setProperty(P,W,"important");g.append(k,x),h.append(g)}let C=[],A=null,I=0,E=(p,S)=>{let v=p.el.getBoundingClientRect(),P=v.width<=0&&v.height<=0||!p.el.isConnected||p.el.checkVisibility&&!p.el.checkVisibility(r);if(p.node.style.display=P?"none":"",P){p.docPt=null,p.viewRect=null;return}let W=p.anchor==="flow"?v.left-S.left:v.left,Y=p.anchor==="flow"?v.top-S.top:v.top;if(p.node.style.transform=`translate(${W}px, ${Y}px)`,p.sized)p.node.style.width=`${v.width}px`,p.node.style.height=`${v.height}px`;else{let O=p.node.getBoundingClientRect(),N=p.anchor==="flow"?{left:S.left,top:S.top,right:S.left+T,bottom:S.top+y}:{left:0,top:0,right:t.innerWidth,bottom:t.innerHeight},G=O.left<N.left?N.left-O.left:O.right>N.right?N.right-O.right:0,_=O.top<N.top?N.top-O.top:O.bottom>N.bottom?N.bottom-O.bottom:0;(G||_)&&(p.node.style.transform=`translate(${W+G}px, ${Y+_}px)`)}p.anchor==="flow"?p.docPt=`${W},${Y}`:p.viewRect=v},w=p=>{if(!x)return;let S=[];for(let P of C)P.offLine||P.node.style.display==="none"||(P.anchor==="flow"?P.docPt&&S.push(P.docPt):P.viewRect&&S.push(`${P.viewRect.left-p.left},${P.viewRect.top-p.top}`));let v=S.join(" ");k.setAttribute("points",v),x.setAttribute("points",v)},i=()=>{let p=e.documentElement.scrollWidth,S=e.documentElement.scrollHeight;p!==T&&(T=p,h.style.width=`${p}px`),S!==y&&(y=S,h.style.height=`${S}px`);let v=h.getBoundingClientRect();for(let P of C)E(P,v);w(v)};e.body.append(h,d);let u=()=>{I=t.requestAnimationFrame(u),i()};return u(),{setItems(p,S){for(let v of C)v.node.remove();C=p.map(v=>{let P=a(v.el);return(P==="flow"?h:d).append(v.node),{...v,anchor:P,docPt:null,viewRect:null}}),S&&!C.length?(A||(A=e.createElement("div"),A.className="pour-lens-notice",d.append(A)),A.textContent=S,A.style.display=""):A&&(A.style.display="none"),i()},destroy(){t.cancelAnimationFrame(I),h.remove(),d.remove(),C=[]}}}function n(c,m){for(let b=c.parentElement??c.getRootNode()?.host;b&&b!==e.documentElement;b=b.parentElement??b.getRootNode()?.host){let h=b.ownerDocument.defaultView.getComputedStyle(b);if(h.overflow==="visible"&&h.overflowX==="visible"&&h.overflowY==="visible")continue;let d=b.getBoundingClientRect();if(m.right<=d.left||m.left>=d.right||m.bottom<=d.top||m.top>=d.bottom)return!0}return!1}function o(){let c=[],m=[],b=h=>{for(let d of h.querySelectorAll("*")){if(d.dataset&&d.dataset.pourAudit||(d.shadowRoot&&b(d.shadowRoot),!d.matches('a[href], area[href], button, input, select, textarea, summary, iframe, object, embed, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]'))||d.disabled||d.closest("[inert]")||d.checkVisibility&&!d.checkVisibility(r))continue;let T=d.getBoundingClientRect();if(T.width<=0&&T.height<=0)continue;let y=d.getAttribute("tabindex"),x=y==null?0:parseInt(y,10)||0;if(x<0){d.matches("a[href], area[href], button, input, select, textarea, summary")&&!n(d,T)&&m.push({el:d});continue}c.push({el:d,idx:x,order:c.length})}};return b(e),{stops:[...c.filter(h=>h.idx>0).sort((h,d)=>h.idx-d.idx||h.order-d.order),...c.filter(h=>h.idx===0)],unreachable:m}}return{createLensTracker:s,collectFocusStops:o,clippedOutOfSight:n,VISIBLE_OPTS:r,anchorKind:a}}function it(e=document,t=ve(e)){let r=e.defaultView,{createLensTracker:a,collectFocusStops:s,VISIBLE_OPTS:n}=t,o=null,c=0,m=null;function b(){if(o)return;qe(e),o=a("pour-focus-order-layer",{withLine:!0});let A=()=>{let{stops:I,unreachable:E}=s(),w=I.map((i,u)=>{let p=e.createElement("span");return p.className="pour-focus-badge"+(i.idx>0?" pour-focus-badge-forced":""),p.textContent=String(u+1),i.idx>0&&(p.title=`tabindex="${i.idx}" forces this position`),{el:i.el,node:p,sized:!1}});for(let{el:i}of E){let u=e.createElement("span");u.className="pour-focus-badge pour-focus-badge-unreachable",u.textContent="\u2715",u.title='tabindex="-1" \u2014 a keyboard cannot Tab to this control',w.push({el:i,node:u,sized:!1,offLine:!0})}o.setItems(w,"Focus order: this page has no keyboard-reachable controls")};A(),m=new r.MutationObserver(()=>{c||(c=r.setTimeout(()=>{c=0,A()},400))}),m.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function h(){r.clearTimeout(c),c=0,m?.disconnect(),m=null,o?.destroy(),o=null}let d=null,T=0,y=null;function x(A){let I=A.getAttribute("aria-label");if(I?.trim())return I.trim();let E=A.getAttribute("aria-labelledby");return E?E.split(/\s+/).map(w=>A.getRootNode().getElementById?.(w)?.textContent.trim()??"").filter(Boolean).join(" "):""}function g(){let A=[],I=[],E=i=>{for(let u of i.querySelectorAll("*")){if(u.dataset&&u.dataset.pourAudit||(u.shadowRoot&&E(u.shadowRoot),u.checkVisibility&&!u.checkVisibility(n)))continue;let p=u.getBoundingClientRect();if(p.width<=0&&p.height<=0)continue;let S=Be(u);if(at.has(S)){if(S==="form"&&!x(u))continue;A.push({el:u,role:S,name:x(u)})}else if(S==="heading"){let v=parseInt(u.getAttribute("aria-level"),10)||parseInt(u.tagName.charAt(1),10)||2;I.push({el:u,level:v})}}};E(e);let w=null;for(let i of I)i.skipped=w!=null&&i.level>w+1,i.from=w,w=i.level;return{landmarks:A,headings:I}}function k(){if(d)return;qe(e),d=a("pour-map-layer");let A=()=>{let{landmarks:I,headings:E}=g(),w=[];for(let i of I){let u=e.createElement("div");u.className=`pour-map-region pour-map-role-${i.role}`;let p=e.createElement("span");p.className="pour-map-tag",p.textContent=i.name?`${i.role} \xB7 ${i.name}`:i.role,u.append(p),w.push({el:i.el,node:u,sized:!0})}for(let i of E){let u=e.createElement("span");u.className="pour-map-heading"+(i.skipped?" pour-map-heading-skipped":""),u.textContent=`H${i.level}`,i.skipped&&(u.title=`Skips a level \u2014 the heading before this one is an H${i.from}`),w.push({el:i.el,node:u,sized:!1})}d.setItems(w,"No landmarks or headings are exposed on this page")};A(),y=new r.MutationObserver(()=>{T||(T=r.setTimeout(()=>{T=0,A()},400))}),y.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function C(){r.clearTimeout(T),T=0,y?.disconnect(),y=null,d?.destroy(),d=null}return{focusOrder:{apply:b,remove:h},landmarkMap:{apply:k,remove:C}}}var me="#262626";function wr(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let r=t;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}var re=(e,t,r)=>t+(r-t)*e(),ee=e=>Number(e.toFixed(1));function lt(e,{start:t,steps:r,stride:a,wiggle:s,heading:n}){let o=[t],c=n;for(let m=0;m<r;m++){c+=re(e,-s,s);let b=o[o.length-1];o.push([b[0]+Math.cos(c)*a,b[1]+Math.sin(c)*a])}return o}function ct(e){let t=[];for(let r=0;r<e.length-1;r++){let a=e[Math.max(0,r-1)],s=e[r],n=e[r+1],o=e[Math.min(e.length-1,r+2)],c=[s[0]+(n[0]-a[0])/6,s[1]+(n[1]-a[1])/6],m=[n[0]-(o[0]-s[0])/6,n[1]-(o[1]-s[1])/6];t.push(`M${ee(s[0])} ${ee(s[1])}C${ee(c[0])} ${ee(c[1])} ${ee(m[0])} ${ee(m[1])} ${ee(n[0])} ${ee(n[1])}`)}return t}function ze(e,t){let{width:r=2.6,dark:a=.6}=t,s=r,n=a;return ct(lt(e,t)).map(o=>(s=Math.max(r*.45,Math.min(r*1.9,s+re(e,-.7,.7))),n=Math.max(a*.55,Math.min(a*1.35,n+re(e,-.12,.12))),`<path d="${o}" stroke-width="${ee(s)}" stroke-opacity="${n.toFixed(2)}"/>`)).join("")}function kr(e,t){let r=lt(e,t),a=ct(r).map(n=>`<path d="${n}" stroke-width="1.1" stroke-opacity=".45"/>`).join(""),s=r.filter((n,o)=>o%2===0).map(([n,o])=>`<circle cx="${ee(n)}" cy="${ee(o)}" r="${re(e,1.6,3.4).toFixed(1)}" fill="${me}" stroke="none" opacity="${re(e,.45,.75).toFixed(2)}"/>`).join("");return a+s}function Sr(e,t){let r="";for(let a=0;a<4;a++){let s=re(e,0,Math.PI*2);r+=ze(e,{start:[t[0]+re(e,-18,18),t[1]+re(e,-18,18)],steps:9,stride:13,wiggle:.9,heading:s,width:2.2,dark:.55})}return r}function Tr(e,t,r){let a=re(e,40,110),s=2*Math.PI*r;return`<circle cx="${t[0]}" cy="${t[1]}" r="${r}" stroke-width="${re(e,5,7).toFixed(1)}" stroke-opacity=".55" stroke-dasharray="${ee(s-a)} ${ee(a)}" transform="rotate(${ee(re(e,0,360))} ${t[0]} ${t[1]})"/><circle cx="${t[0]}" cy="${t[1]}" r="${r}" stroke-width="2" stroke-opacity=".3"/><circle cx="${ee(t[0]+r*1.4)}" cy="${ee(t[1]-r*.6)}" r="3" fill="${me}" stroke="none" opacity=".5"/>`}function Ar(e,t,r){return`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${t}" ry="${r}" fill="url(#cloud)" stroke="none" transform="rotate(-20 ${e[0]} ${e[1]})"/>`}function Er(e,t){let r="";for(let a=0;a<8;a++)r+=`<circle cx="${ee(t[0]+re(e,-40,40))}" cy="${ee(t[1]+re(e,-30,30))}" r="${re(e,1.2,3.2).toFixed(1)}" fill="${me}" stroke="none" opacity="${re(e,.4,.7).toFixed(2)}"/>`;return r}var Cr=(e,t)=>`url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><filter id="b" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="${t}"/></filter><radialGradient id="cloud"><stop offset="0" stop-color="${me}" stop-opacity=".38"/><stop offset=".55" stop-color="${me}" stop-opacity=".14"/><stop offset="1" stop-color="${me}" stop-opacity="0"/></radialGradient></defs><g filter="url(#b)" fill="none" stroke="${me}" stroke-linecap="round" stroke-linejoin="round">${e}</g></svg>`)}")`;function Mr(){let e=wr(20260912);return[{depth:.95,size:.5,start:[.24,.3],art:Sr(e,[100,100])},{depth:.8,size:.44,start:[.66,.24],art:ze(e,{start:[20,150],steps:12,stride:15,wiggle:.7,heading:-.9,width:3,dark:.62})},{depth:.65,size:.3,start:[.5,.62],art:Tr(e,[100,100],17)},{depth:.55,size:.36,start:[.8,.6],art:kr(e,{start:[30,70],steps:10,stride:14,wiggle:.8,heading:.4})},{depth:.4,size:.42,start:[.36,.8],art:Ar([100,100],62,34)},{depth:.3,size:.26,start:[.14,.58],art:Er(e,[100,100])},{depth:.15,size:.3,start:[.58,.85],art:ze(e,{start:[40,40],steps:11,stride:12,wiggle:.85,heading:.6,width:2,dark:.5})}]}var Lr=.55,Fr=.4,st=1,Ee=520,Rr=2.2;function pt(e,t){let r=e.defaultView,a=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,s={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="multiply",t.style.overflow="hidden";let n=()=>Math.max(180,Math.min(460,.32*Math.min(r.innerWidth,r.innerHeight))),o=Mr().map((E,w)=>{let i=e.createElement("div");i.className="pour-floater",i.setAttribute("aria-hidden","true"),i.dataset.pourAudit="filter";let u=(.8+E.depth*1.6).toFixed(2);return Object.assign(i.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",backgroundImage:Cr(E.art,u),backgroundSize:"contain",backgroundRepeat:"no-repeat",opacity:(.95-E.depth*.2).toFixed(2),willChange:"transform"}),t.appendChild(i),{el:i,shape:E,phase:w*1.7,size:0,x:E.start[0]*r.innerWidth,y:E.start[1]*r.innerHeight,vx:0,vy:0,angle:w*47%360,spin:0}}),c=()=>{let E=n();for(let w of o)w.size=E*w.shape.size,w.el.style.width=`${w.size}px`,w.el.style.height=`${w.size}px`},m=(E=0)=>{for(let w of o){let i=1+.03*Math.sin(E*.8+w.phase),u=2.5*Math.sin(E*.5+w.phase*.7);w.el.style.transform=`translate3d(${(w.x-w.size/2).toFixed(1)}px, ${(w.y-w.size/2).toFixed(1)}px, 0) rotate(${w.angle.toFixed(1)}deg) skewX(${u.toFixed(2)}deg) scale(${i.toFixed(3)})`}};c(),m();let b=0,h=0,d=r.scrollY,T=null,y=(E,w)=>{for(let i of o){let u=.45+.9*i.shape.depth;i.vx=Math.max(-Ee,Math.min(Ee,i.vx+E*u)),i.vy=Math.max(-Ee,Math.min(Ee,i.vy+w*u)),i.spin+=(E-w)*.02*u}},x=()=>{let E=r.scrollY-d;d=r.scrollY,E&&y(0,E*Fr)},g=(E,w)=>{T&&y((E-T.x)*st,(w-T.y)*st),T={x:E,y:w}},k=E=>{E.pointerType!=="touch"&&g(E.clientX,E.clientY)},C=E=>{let w=E.touches[0];w&&g(w.clientX,w.clientY)},A=()=>{c(),m()},I=E=>{b=r.requestAnimationFrame(I);let w=h?Math.min(.05,(E-h)/1e3):0;if(h=E,!w)return;let i=E/1e3,u=Math.exp(-w/Lr),p=r.innerWidth,S=r.innerHeight;for(let v of o){v.vx+=Math.sin(i*.61+v.phase)*16*w,v.vy+=(Math.cos(i*.47+v.phase*1.3)*12+Rr*(.5+v.shape.depth))*w,v.vx*=u,v.vy*=u,v.spin*=u,v.x+=v.vx*w,v.y+=v.vy*w,v.angle+=(v.spin+Math.sin(i*.3+v.phase)*2)*w;let P=v.size*.25;v.x<P&&(v.vx=Math.abs(v.vx)+8),v.x>p-P&&(v.vx=-Math.abs(v.vx)-8),v.y<P&&(v.vy=Math.abs(v.vy)+8),v.y>S-P*1.6&&(v.vy=-Math.abs(v.vy)*.6-4)}m(i)};return r.addEventListener("resize",A),a||(r.addEventListener("scroll",x,{passive:!0}),e.addEventListener("pointermove",k,{passive:!0}),e.addEventListener("touchmove",C,{passive:!0}),b=r.requestAnimationFrame(I)),{stop(){b&&r.cancelAnimationFrame(b),b=0,r.removeEventListener("resize",A),r.removeEventListener("scroll",x),e.removeEventListener("pointermove",k),e.removeEventListener("touchmove",C);for(let E of o)E.el.remove();t.style.mixBlendMode=s.mixBlendMode,t.style.overflow=s.overflow}}}function dt(e,t){let r=e.defaultView,a=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,s={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="screen",t.style.overflow="hidden";let n=e.createElement("div");n.setAttribute("aria-hidden","true"),n.dataset.pourAudit="filter",n.dataset.pourReflection="room",Object.assign(n.style,{position:"absolute",inset:"-20%",pointerEvents:"none",background:"radial-gradient(ellipse 30% 38% at 74% 16%, rgba(255,249,236,0.4), rgba(255,249,236,0.13) 42%, rgba(255,249,236,0) 72%), radial-gradient(ellipse 55% 26% at 18% 92%, rgba(255,255,255,0.1), rgba(255,255,255,0) 70%)",willChange:"transform"}),t.appendChild(n);let o=e.createElement("video");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourReflection="camera",o.muted=!0,o.playsInline=!0,o.autoplay=!0,Object.assign(o.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"cover",transform:"scaleX(-1)",opacity:String(.2),filter:"blur(0.9px) contrast(1.05)",pointerEvents:"none"}),t.appendChild(o);let c=null,m=0,b=g=>{c=e.createElement("div"),c.dataset.pourAudit="filter",c.dataset.pourReflection="note",c.setAttribute("role","status"),c.textContent=g,Object.assign(c.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(420px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(c),m=r.setTimeout(()=>{c?.remove(),c=null},7e3)},h=null,d=!1,T=r.navigator?.mediaDevices;T?.getUserMedia?T.getUserMedia({video:{facingMode:"user",width:{ideal:1280},height:{ideal:720}},audio:!1}).then(g=>{if(d){for(let k of g.getTracks())k.stop();return}h=g,o.srcObject=g,o.play().catch(()=>{})}).catch(()=>{d||b("Camera not available here, so the room light is shown without your reflection.")}):b("This page cannot use the camera (it needs a secure page), so the room light is shown without your reflection.");let y=0,x=g=>{y=r.requestAnimationFrame(x);let k=g/1e3;n.style.transform=`translate3d(${(Math.sin(k*.11)*14).toFixed(1)}px, ${(Math.cos(k*.083)*9).toFixed(1)}px, 0)`};return a||(y=r.requestAnimationFrame(x)),{stop(){if(d=!0,y&&r.cancelAnimationFrame(y),y=0,m&&r.clearTimeout(m),c?.remove(),c=null,h)for(let g of h.getTracks())g.stop();h=null,o.srcObject=null,o.remove(),n.remove(),t.style.mixBlendMode=s.mixBlendMode,t.style.overflow=s.overflow}}}var ut={aquatic:{scheme:"dark",canvas:"#202020",canvasText:"#FFFFFF",linkText:"#75E9FC",grayText:"#A6A6A6",highlight:"#8EE3F0",highlightText:"#263B50",buttonFace:"#202020",buttonText:"#FFFFFF"}},J=":not([data-pour-audit]):not([data-pour-audit] *):not([data-pour-fc-keep])",ft=["data-pour-fc-bg","data-pour-fc-bgimg","data-pour-fc-before","data-pour-fc-after","data-pour-fc-keep"],$r='script, style, noscript, template, textarea, option, select, title, svg, math, [data-pour-audit], [contenteditable]:not([contenteditable="false"])',mt='button, input[type="button"], input[type="submit"], input[type="reset"]',gt="input, textarea, select";function Dr(e){return`
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
`}function ht(e){if(!e||e==="transparent")return 0;let t=/^rgba?\(\s*[\d.]+\s*,?\s*[\d.]+\s*,?\s*[\d.]+\s*(?:[,/]\s*([\d.]+%?))?\s*\)$/i.exec(e);return!t||t[1]===void 0?1:t[1].endsWith("%")?parseFloat(t[1])/100:parseFloat(t[1])}function bt(e,{theme:t="aquatic"}={}){let r=e.defaultView,a=ut[t]||ut.aquatic,s=!1,n=e.createElement("style");n.id="pour-forced-colours-page",n.dataset.pourAudit="filter";let o=e.createElement("style");o.id="pour-forced-colours",o.dataset.pourAudit="filter",o.textContent=Dr(a),e.head.appendChild(n),e.head.appendChild(o);let c=i=>i.closest("[data-pour-audit]"),m=i=>{if(i.namespaceURI!=="http://www.w3.org/1999/xhtml"||c(i)||i.hasAttribute("data-pour-fc-plate"))return;let u=r.getComputedStyle(i);if(u.forcedColorAdjust==="none"){i.setAttribute("data-pour-fc-keep","");return}i.matches("mark")?i.setAttribute("data-pour-fc-bg","highlight"):ht(u.backgroundColor)>0?i.setAttribute("data-pour-fc-bg",i.matches(mt)?"button":i.matches(gt)?"field":"canvas"):i.removeAttribute("data-pour-fc-bg"),u.backgroundImage.includes("gradient(")?i.setAttribute("data-pour-fc-bgimg",""):i.removeAttribute("data-pour-fc-bgimg");for(let[p,S]of[["::before","data-pour-fc-before"],["::after","data-pour-fc-after"]]){let v=r.getComputedStyle(i,p);v.content!=="none"&&v.content!=="normal"&&(ht(v.backgroundColor)>0||v.backgroundImage.includes("gradient("))?i.setAttribute(S,""):i.removeAttribute(S)}},b=i=>{if(i.nodeType!==1||i.namespaceURI!=="http://www.w3.org/1999/xhtml")return;let u=e.createTreeWalker(i,r.NodeFilter.SHOW_TEXT),p=[];for(;u.nextNode();)p.push(u.currentNode);for(let S of p){if(!S.textContent.trim())continue;let v=S.parentElement;if(!v||v.namespaceURI!=="http://www.w3.org/1999/xhtml"||v.hasAttribute("data-pour-fc-plate")||v.closest($r))continue;let P=e.createElement("span");P.setAttribute("data-pour-fc-plate",""),v.replaceChild(P,S),P.appendChild(S)}},h=()=>{let i=e.querySelectorAll("[data-pour-fc-plate]");for(let u of i)u.replaceWith(...u.childNodes);i.length&&e.body.normalize()},d=i=>{if(i.nodeType===1){m(i);for(let u of i.querySelectorAll("*"))m(u);b(i)}},T=new Set,y=0,x=()=>{y=0;let i=[...T];T.clear();for(let u of i)u.isConnected&&d(u)},g=new r.MutationObserver(i=>{for(let u of i)if(u.type==="childList")for(let p of u.addedNodes)p.nodeType===1&&!p.hasAttribute("data-pour-fc-plate")&&T.add(p);else u.target.nodeType===1&&T.add(u.target);T.size&&!y&&(y=r.requestAnimationFrame(x))});d(e.body),g.observe(e.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class","style","disabled","aria-disabled","open","hidden"]});let k=/forced-colors\s*:\s*active|-ms-high-contrast\s*:\s*active/i,C=[],A=[],I=(i,u)=>{for(let p of i){let S=p.conditionText??p.media?.mediaText??"";if(p.media!==void 0&&p.cssRules!==void 0&&!u&&k.test(S)){I(p.cssRules,!0);continue}if(p.styleSheet){try{I(p.styleSheet.cssRules,u)}catch{}continue}if(u){C.push(p.cssText),p.style&&p.selectorText&&p.style.getPropertyValue("forced-color-adjust").trim()==="none"&&A.push(p.selectorText);continue}p.cssRules&&I(p.cssRules,!1)}},E=()=>{if(!s){n.textContent=C.join(`
`);for(let i of A){let u=[];try{u=e.querySelectorAll(i)}catch{continue}for(let p of u)c(p)||p.setAttribute("data-pour-fc-keep","")}}},w=[];for(let i of e.styleSheets)if(!i.ownerNode?.dataset?.pourAudit)try{I(i.cssRules,!1)}catch{if(!i.href||typeof r.CSSStyleSheet!="function")continue;w.push(r.fetch(i.href,{mode:"cors"}).then(u=>u.ok?u.text():"").then(u=>{if(!u||s)return;let p=new r.CSSStyleSheet;p.replaceSync(u),I(p.cssRules,!1)}).catch(()=>{}))}return E(),w.length&&Promise.all(w).then(E),{stop(){s=!0,g.disconnect(),y&&r.cancelAnimationFrame(y),y=0,T.clear(),h(),o.remove(),n.remove();for(let i of e.querySelectorAll(ft.map(u=>`[${u}]`).join(",")))for(let u of ft)i.removeAttribute(u)}}}var Ve="http://www.w3.org/2000/svg",yt="pour-lens-filter";function Nr(e,{radius:t,ring:r,scale:a,magnify:s}){let n=t+r,o=(n+2)*2,c=o/2,m=e.createElement("canvas");m.width=o,m.height=o;let b=m.getContext("2d"),h=b.createImageData(o,o),d=h.data,T=t/s;for(let y=0;y<o;y++)for(let x=0;x<o;x++){let g=x+.5-c,k=y+.5-c,C=Math.hypot(g,k),A=C;if(C<t)A=C/s;else if(C<n){let u=(C-t)/r,p=u*u*(3-2*u);A=T+(n-T)*p}let I=C>0?A/C-1:0,E=I*g,w=I*k,i=(y*o+x)*4;d[i]=Math.max(0,Math.min(255,Math.round(127.5+E/a*255))),d[i+1]=Math.max(0,Math.min(255,Math.round(127.5+w/a*255))),d[i+2]=0,d[i+3]=Math.round(255*Math.max(0,Math.min(1,(n+2-C)/2)))}return b.putImageData(h,0,0),{href:m.toDataURL("image/png"),size:o}}function vt(e,{scale:t=2,radius:r=110,ring:a=60,point:s,target:n}){let o=e.defaultView,c=n||e.documentElement,m=Math.ceil(2*r*(1-1/t)*1.05),b=Nr(e,{radius:r,ring:a,scale:m,magnify:t}),h=e.createElementNS(Ve,"svg");h.setAttribute("width","0"),h.setAttribute("height","0"),h.setAttribute("aria-hidden","true"),h.setAttribute("focusable","false"),h.dataset.pourAudit="filter",h.dataset.pourLens="defs",Object.assign(h.style,{position:"absolute",pointerEvents:"none"});let d=e.createElementNS(Ve,"filter");d.setAttribute("id",yt),d.setAttribute("filterUnits","userSpaceOnUse"),d.setAttribute("primitiveUnits","userSpaceOnUse"),d.setAttribute("x","0"),d.setAttribute("y","0"),d.setAttribute("width","100%"),d.setAttribute("height","100%"),d.setAttribute("color-interpolation-filters","sRGB");let T=(p,S)=>{let v=e.createElementNS(Ve,p);for(let[P,W]of Object.entries(S))v.setAttribute(P,String(W));return v},y={width:b.size,height:b.size},x=T("feImage",{href:b.href,preserveAspectRatio:"none",result:"map",...y}),g=T("feDisplacementMap",{in:"SourceGraphic",in2:"map",scale:m,xChannelSelector:"R",yChannelSelector:"G",result:"lens",...y}),k=T("feComposite",{in:"lens",in2:"map",operator:"in",result:"cut",...y}),C=T("feComposite",{in:"SourceGraphic",in2:"map",operator:"out",result:"rest"}),A=T("feComposite",{in:"cut",in2:"rest",operator:"over"}),I=[x,g,k];for(let p of[x,g,k,C,A])d.appendChild(p);h.appendChild(d),e.body.appendChild(h);let E=c.style.filter;c.style.filter=`url(#${yt})`;let w="",i=0,u=()=>{i=o.requestAnimationFrame(u);let p=s(),S=c.getBoundingClientRect(),v=Math.round(p.x-S.left-b.size/2),P=Math.round(p.y-S.top-b.size/2),W=`${v},${P}`;if(W!==w){w=W;for(let Y of I)Y.setAttribute("x",String(v)),Y.setAttribute("y",String(P))}};return i=o.requestAnimationFrame(u),{stop(){i&&o.cancelAnimationFrame(i),i=0,c.style.filter=E,h.remove()}}}var Or=["a[href]","button",'input:not([type="hidden"])',"select","textarea","summary",'[role="button"]','[role="link"]','[role="checkbox"]','[role="radio"]','[role="switch"]','[role="tab"]','[role="menuitem"]','[role="option"]'].join(", "),Ir=61,Pr=1400;function Br(e,t){let r=Math.PI*(3-Math.sqrt(5));return Array.from({length:e},(a,s)=>{let n=t*Math.sqrt((s+.5)/e);return[Math.cos(s*r)*n,Math.sin(s*r)*n]})}function xt(e,{diameter:t=38}={}){let r=e.defaultView,a=e.documentElement,s=t/2,n=Br(Ir,s),c=Math.ceil(t+3*2),m=e.createElement("canvas");m.width=c,m.height=c;let b=m.getContext("2d"),h=c/2;b&&(b.beginPath(),b.arc(h,h,s,0,Math.PI*2),b.fillStyle="rgba(17, 17, 17, 0.16)",b.fill(),b.lineWidth=2.5,b.strokeStyle="rgba(255, 255, 255, 0.9)",b.stroke(),b.lineWidth=1.25,b.strokeStyle="rgba(17, 17, 17, 0.85)",b.stroke(),b.beginPath(),b.arc(h,h,1.5,0,Math.PI*2),b.fillStyle="rgba(17, 17, 17, 0.85)",b.fill());let d=b?`url("${m.toDataURL("image/png")}") ${Math.round(h)} ${Math.round(h)}, auto`:"auto",T=e.createElement("style");T.dataset.pourAudit="filter",T.textContent=`
    html { cursor: ${d} !important; }
    :not(html) { cursor: inherit !important; }
    [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
  `,e.head.appendChild(T);let y=e.createElement("div");y.dataset.pourAudit="filter",y.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:2147483647;contain:strict;",e.body.appendChild(y);let x=()=>{let l=e.createElement("div");l.style.cssText="position:absolute;left:0;top:0;box-sizing:border-box;border-radius:3px;display:none;";let f=e.createElement("span");return f.style.cssText="position:absolute;left:-2px;bottom:100%;margin-bottom:3px;padding:1px 5px;border-radius:4px;font:600 11px/15px system-ui,-apple-system,sans-serif;font-variant-numeric:tabular-nums;white-space:nowrap;letter-spacing:0;",l.appendChild(f),y.appendChild(l),{el:l,chip:f}},g=[],k=x(),C=(l,f)=>{let L=e.elementFromPoint(l,f);for(;L?.shadowRoot;){let F=L.shadowRoot.elementFromPoint(l,f);if(!F||F===L)break;L=F}return L},A=l=>{for(let f=l;f;f=f.parentElement??f.getRootNode().host??null)if(f.nodeType===1){if(f.hasAttribute("data-pour-audit"))return null;if(f.matches(Or))return f.matches(":disabled")?null:f}return null};function I(l,f){let L=new Map,F=0;for(let[B,z]of n){let j=A(C(l+B,f+z));j&&(L.set(j,(L.get(j)??0)+1),F++)}return[...L].map(([B,z])=>({el:B,share:z/F})).sort((B,z)=>z.share-B.share)}let E=(l,f,L)=>{let F=null,B=1/0;for(let z of l.getClientRects()){let j=Math.max(z.left-f,0,f-z.right),X=Math.max(z.top-L,0,L-z.bottom),Q=j*j+X*X;Q<B&&(B=Q,F=z)}return F??l.getBoundingClientRect()},w=(l,f,{border:L,halo:F,chipText:B,chipBg:z,chipFg:j})=>{Object.assign(l.el.style,{display:"block",transform:`translate(${Math.round(f.left-3)}px, ${Math.round(f.top-3)}px)`,width:`${Math.round(f.width+6)}px`,height:`${Math.round(f.height+6)}px`,border:`2px solid ${L}`,boxShadow:`0 0 0 1px ${F}`}),l.chip.style.display=B?"block":"none",l.chip.textContent=B??"",l.chip.style.background=z??"",l.chip.style.color=j??"";let X=f.top>22;l.chip.style.bottom=X?"100%":"auto",l.chip.style.top=X?"auto":"100%",l.chip.style.marginBottom=X?"3px":"0",l.chip.style.marginTop=X?"0":"3px"},i=-1,u=-1,p=!1,S=0;function v(){S=0;let l=p?I(i,u):[],f=l.length>1;for(;g.length<l.length;)g.push(x());let L=[];if(g.forEach((F,B)=>{let z=l[B];if(!z){F.el.style.display="none";return}let j=E(z.el,i,u);w(F,j,f?{border:"#F59E0B",halo:"rgba(17,17,17,0.55)",chipText:`${Math.round(z.share*100)}%`,chipBg:"#F59E0B",chipFg:"#111"}:{border:"rgba(17,17,17,0.8)",halo:"rgba(255,255,255,0.9)"}),F.chip.style.left="-2px",L.push({b:F,r:j})}),f){let F=-1/0;for(let{b:B,r:z}of L.sort((j,X)=>j.r.left-X.r.left)){let j=Math.round(z.left-3),X=Math.max(j-2,F);B.chip.style.left=`${X-j}px`,F=X+B.chip.offsetWidth+3}}}let P=()=>{S||(S=r.requestAnimationFrame(v))},W="mouse",Y=null,O=0,N=l=>{W=l.pointerType||"mouse",W!=="touch"&&(i=l.clientX,u=l.clientY,p=!0,P())},G=l=>{l.relatedTarget||(p=!1,P())},_=l=>{if(W=l.pointerType||"mouse",W==="touch"||l.button!==0){Y=null;return}Y={shares:I(l.clientX,l.clientY),natural:A(C(l.clientX,l.clientY))}},V=l=>{let f=Y;if(Y=null,!f||!l.isTrusted||l.detail===0||W==="touch"||!f.shares.length)return;let L=Math.random(),F=f.shares[f.shares.length-1].el;for(let B of f.shares)if(L-=B.share,L<=0){F=B.el;break}F!==f.natural&&(l.preventDefault(),l.stopImmediatePropagation(),w(k,E(F,l.clientX,l.clientY),{border:"#111",halo:"rgba(255,255,255,0.9)",chipText:"The tap landed here",chipBg:"#111",chipFg:"#fff"}),r.clearTimeout(O),O=r.setTimeout(()=>{k.el.style.display="none"},Pr),typeof F.focus=="function"&&F.focus({preventScroll:!0}),F.click())};return e.addEventListener("pointermove",N,{passive:!0}),e.addEventListener("pointerdown",_,!0),e.addEventListener("mouseout",G,{passive:!0}),r.addEventListener("click",V,!0),r.addEventListener("scroll",P,{passive:!0,capture:!0}),{stop(){e.removeEventListener("pointermove",N),e.removeEventListener("pointerdown",_,!0),e.removeEventListener("mouseout",G),r.removeEventListener("click",V,!0),r.removeEventListener("scroll",P,{capture:!0}),S&&r.cancelAnimationFrame(S),r.clearTimeout(O),y.remove(),T.remove()}}}var wt=(e,t)=>[e.style.getPropertyValue(t),e.style.getPropertyPriority(t)],_e=(e,t,[r,a])=>{r?e.style.setProperty(t,r,a):e.style.removeProperty(t)},qr=e=>e.transform!=="none"||e.translate!=="none"||e.rotate!=="none"||e.scale!=="none"||e.perspective!=="none"||e.filter!=="none"||(e.backdropFilter??"none")!=="none"||/paint|layout|strict|content/.test(e.contain)||/transform|perspective|filter/.test(e.willChange)||e.containerType&&e.containerType!=="normal";function kt(e,{scale:t=4}={}){let r=e.defaultView,a=e.documentElement,s=e.scrollingElement||a,n=["transform","transform-origin","height"].map(l=>[l,wt(a,l)]),o=r.innerWidth/2,c=r.innerHeight/2,m=0,b=0,h=new Map;a.style.setProperty("height","100%","important");function d(){a.style.removeProperty("transform"),m=Math.max(0,s.scrollWidth-r.innerWidth),b=Math.max(0,s.scrollHeight-r.innerHeight),a.style.setProperty("transform",`scale(${t})`,"important")}function T(){let l=r.scrollX,f=r.scrollY;a.style.setProperty("transform-origin",`${l+o}px ${f+c}px`,"important");for(let[L,{base:F}]of h)L.style.setProperty("translate",`calc(${F[0]} + ${l}px) calc(${F[1]} + ${f}px)`,"important")}function y(){let l=new Set;for(let f of e.body.getElementsByTagName("*")){if(f.hasAttribute("data-pour-audit"))continue;let L=r.getComputedStyle(f);if(L.position!=="fixed")continue;let F=!0;for(let B=f.parentElement;B&&B!==a;B=B.parentElement){if(l.has(B)){F=!1;break}if(!h.has(B)&&qr(r.getComputedStyle(B))){F=!1;break}}if(F&&(l.add(f),!h.has(f))){let[B="0px",z="0px"]=L.translate==="none"?[]:L.translate.split(" ");h.set(f,{saved:wt(f,"translate"),base:[B,z]})}}for(let[f,L]of h)l.has(f)||(_e(f,"translate",L.saved),h.delete(f));T()}let x=()=>{let l=o*(1-1/t),f=c*(1-1/t);return{left:l,top:f,right:l+r.innerWidth/t,bottom:f+r.innerHeight/t}},g=l=>({left:o+(l.left-o)/t,top:c+(l.top-c)/t,right:o+(l.right-o)/t,bottom:c+(l.bottom-c)/t}),k=(l,f)=>l.left<f.right&&l.right>f.left&&l.top<f.bottom&&l.bottom>f.top,C=e.createElement("div");C.dataset.pourAudit="filter",C.setAttribute("popover","manual"),C.style.cssText="position:fixed;inset:0;width:auto;height:auto;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:none;z-index:2147483647;",e.body.appendChild(C);try{C.showPopover()}catch{}let A=new Map,I=l=>{let f=(l.getAttribute("aria-label")||l.textContent||l.getAttribute("alt")||"").replace(/\s+/g," ").trim();return f?f.length>38?`${f.slice(0,37)}\u2026`:f:l.tagName==="IMG"?"An image":"Something"};function E(l){A.has(l)&&A.get(l).remove();let f=e.createElement("div");if(f.style.cssText="position:absolute;left:0;top:0;display:flex;align-items:center;gap:6px;max-width:280px;padding:4px 9px 4px 6px;border-radius:6px;background:#111;color:#fff;box-shadow:0 0 0 1px rgba(255,255,255,0.9);font:600 12px/16px system-ui,-apple-system,sans-serif;white-space:nowrap;letter-spacing:0;",f.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg><span style="overflow:hidden;text-overflow:ellipsis"></span>',f.lastChild.textContent=`Changed out of view: ${I(l)}`,C.appendChild(f),A.set(l,f),A.size>6){let[L]=A.keys();A.get(L).remove(),A.delete(L)}i()}let w=0,i=()=>{!w&&A.size&&(w=r.requestAnimationFrame(u))};function u(){w=0;let l=r.innerWidth,f=r.innerHeight,L=x();for(let[F,B]of A){let z=F.isConnected&&F.checkVisibility?.({checkOpacity:!0,checkVisibilityCSS:!0})!==!1?F.getBoundingClientRect():null;if(!z||!z.width||!z.height||k(g(z),L)){B.remove(),A.delete(F);continue}let j=(z.left+z.right)/2-l/2,X=(z.top+z.bottom)/2-f/2,Q=B.offsetWidth/2,ne=B.offsetHeight/2,de=Math.min(j?(l/2-14-Q)/Math.abs(j):1/0,X?(f/2-14-ne)/Math.abs(X):1/0),ue=l/2+j*Math.min(de,1e6),ge=f/2+X*Math.min(de,1e6);B.style.transform=`translate(${Math.round(ue-Q)}px, ${Math.round(ge-ne)}px)`,B.firstChild.style.transform=`rotate(${Math.atan2(X,j)}rad)`}A.size&&(w=r.requestAnimationFrame(u))}let p=new Set,S=0,v=0;function P(){S=0;let l=p;p=new Set;let f=r.innerWidth,L=r.innerHeight,F={left:0,top:0,right:f,bottom:L},B=x();for(let z of l){if(!z.isConnected||z===e.body||z===a||z.closest("[data-pour-audit]")||z.checkVisibility?.({checkOpacity:!0,checkVisibilityCSS:!0})===!1)continue;let j=g(z.getBoundingClientRect()),X=j.right-j.left,Q=j.bottom-j.top;!X||!Q||X*Q>f*L*.5||k(j,F)&&!k(j,B)&&E(z)}}let W=new r.MutationObserver(l=>{let f=!1;for(let L of l){let F=L.target.nodeType===1?L.target:L.target.parentElement;if(!(!F||F===a)&&!(L.type==="attributes"&&L.attributeName==="style"&&h.has(F))&&!F.closest("[data-pour-audit]"))if(f=!0,L.type==="childList")for(let B of L.addedNodes)B.nodeType===1?p.add(B):B.nodeType===3&&B.textContent.trim()&&p.add(F);else p.add(F)}p.size&&!S&&(S=r.requestAnimationFrame(P)),f&&!v&&(v=r.setTimeout(()=>{v=0,d(),y()},300))}),Y=0,O=(l,f)=>{o=Math.max(0,Math.min(r.innerWidth,l)),c=Math.max(0,Math.min(r.innerHeight,f)),Y||(Y=r.requestAnimationFrame(()=>{Y=0,T(),i()}))},N=l=>O(l.clientX,l.clientY),G=l=>{let f=l.target;if(f?.nodeType!==1||f.closest("[data-pour-audit]"))return;let L=!1;try{L=f.matches(":focus-visible")}catch{L=!0}L&&r.requestAnimationFrame(()=>{let F=g(f.getBoundingClientRect());O((F.left+F.right)/2,(F.top+F.bottom)/2)})},_=()=>{(r.scrollY>b||r.scrollX>m)&&r.scrollTo({left:Math.min(r.scrollX,m),top:Math.min(r.scrollY,b),behavior:"instant"}),T(),i()},V=()=>{d(),O(o,c),y()};return d(),y(),W.observe(e.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeFilter:["class","style","hidden","open","aria-hidden"]}),e.addEventListener("pointermove",N,{passive:!0}),e.addEventListener("focusin",G,!0),r.addEventListener("scroll",_,{passive:!0}),r.addEventListener("resize",V),{stop(){W.disconnect(),e.removeEventListener("pointermove",N),e.removeEventListener("focusin",G,!0),r.removeEventListener("scroll",_),r.removeEventListener("resize",V);for(let l of[w,S,Y])l&&r.cancelAnimationFrame(l);r.clearTimeout(v);for(let[l,f]of h)_e(l,"translate",f.saved);h.clear();for(let[l,f]of n)_e(a,l,f);C.remove()}}}var St=`/* Overlay styles for the vision & sensory filters \u2014 ported from
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
`;function xe(e){for(let t=e;t;t=t.parentElement??t.getRootNode?.().host??null)if(t.nodeType===1&&t.hasAttribute("data-pour-audit"))return!0;return!1}function Tt(e,t,{ms:r=7e3,role:a="status"}={}){let s=e.defaultView,n=e.createElement("div");n.dataset.pourAudit="filter",n.setAttribute("role",a),n.textContent=t,Object.assign(n.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(460px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",textAlign:"left",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(n);let o=r?s.setTimeout(()=>n.remove(),r):0;return()=>{o&&s.clearTimeout(o),n.remove()}}function we(e,{interactive:t=!1,zIndex:r="2147483647"}={}){let a=e.createElement("div");a.dataset.pourAudit="filter",a.setAttribute("aria-hidden",t?"false":"true"),a.style.cssText=`position:fixed;inset:0;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:${t?"auto":"none"};z-index:${r};width:auto;height:auto;max-width:none;max-height:none;color:inherit;`,a.setAttribute("popover","manual"),e.body.appendChild(a);try{a.showPopover()}catch{}return a}function*ke(e){let t=[e];for(;t.length;){let r=t.pop();if(r.nodeType===1){if(r.hasAttribute("data-pour-audit"))continue;yield r,r.shadowRoot&&t.push(r.shadowRoot)}let a=r.children??[];for(let s=a.length-1;s>=0;s--)t.push(a[s])}}function At(e,t){let r=e.createElement("style");return r.dataset.pourAudit="filter",r.textContent=t,e.head.appendChild(r),()=>r.remove()}function Ge(e){return!!(e.isSecureContext&&e.navigator?.mediaDevices?.getDisplayMedia)}async function Et(e){let t=e.defaultView;if(!Ge(t))throw new Error("self capture unavailable");let r=await t.navigator.mediaDevices.getDisplayMedia({video:{displaySurface:"browser",frameRate:{ideal:30}},audio:!1,preferCurrentTab:!0,selfBrowserSurface:"include",surfaceSwitching:"exclude",systemAudio:"exclude"}),a=e.createElement("video");a.dataset.pourAudit="filter",a.muted=!0,a.playsInline=!0,a.autoplay=!0,a.style.cssText="position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none;",a.srcObject=r,e.body.appendChild(a),await a.play().catch(()=>{});let s=()=>{for(let n of r.getTracks())n.stop();a.srcObject=null,a.remove()};return r.getVideoTracks()[0]?.addEventListener("ended",s),{video:a,stream:r,stop:s}}var je=.55,Vr=250,_r=2e3,Ct=500,Gr=4e3,jr=1.5,Hr=.45,Wr=80,Yr='img, video, canvas, svg, picture, marquee, [class*="carousel" i], [class*="slide" i], [class*="marquee" i], [class*="ticker" i], [class*="parallax" i], [class*="swiper" i], [class*="slick" i]';function Mt(e,{decay:t=.86}={},r){let a=e.defaultView,s=r.container,n=a.performance;t=Math.min(.995,Math.max(.05,Number(t)||.86));let o=e.createElement("canvas");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourAfterimages="trail",Object.assign(o.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none",opacity:String(je),mixBlendMode:"normal"}),s.appendChild(o);let c=o.getContext("2d"),m=[],b=O=>m.push(Tt(e,O)),h=0,d=0,T=!1,y=null,x=!1,g=0,k=0,C=[],A=()=>{h=a.innerWidth,d=a.innerHeight,o.width=Math.max(1,h),o.height=Math.max(1,d),x=!1},I=O=>{g=0;let N=k?Math.min(100,O-k):16;k=O;let G=Math.pow(t,N/100);if(y){let{video:_}=y;if(_.readyState>=2&&_.videoWidth){let V=Math.max(0,(G-je)/(1-je));c.globalAlpha=x?1-V:1,c.drawImage(_,0,0,h,d),c.globalAlpha=1,x=!0}g=a.requestAnimationFrame(I);return}c.clearRect(0,0,h,d);for(let _=C.length-1;_>=0;_--){let V=C[_],l=Hr*Math.pow(t,(O-V.born)/100);if(l<.01){C.splice(_,1);continue}c.globalAlpha=l,c.fillStyle="#6b6b6b",c.fillRect(V.x,V.y,V.w,V.h),c.globalAlpha=Math.min(1,l*1.6),c.strokeStyle="#2a2a2a",c.lineWidth=1,c.strokeRect(V.x+.5,V.y+.5,Math.max(0,V.w-1),Math.max(0,V.h-1))}c.globalAlpha=1,C.length?g=a.requestAnimationFrame(I):k=0},E=()=>{!g&&!T&&(g=a.requestAnimationFrame(I))},w=()=>{A()};a.addEventListener("resize",w);let i=O=>O.bottom>0&&O.right>0&&O.top<d&&O.left<h&&(O.width>0||O.height>0),u=()=>{let O=[];try{O=e.getAnimations?.()??[]}catch{O=[]}return O.filter(N=>N.playState==="running"&&!(a.CSSTransition&&N instanceof a.CSSTransition))},p=new Map,S=[],v=()=>{let O=[],N=new Set,G=l=>{!l||l.nodeType!==1||N.has(l)||xe(l)||(N.add(l),O.push(l))};for(let l of u())G(l.effect?.target);let _=[],V=0;for(let l of ke(e.body)){if(++V>Gr)break;l.matches(Yr)?G(l):_.push(l)}for(let l of _){if(O.length>=Ct)break;let f=l.getBoundingClientRect();f.width*f.height>=600&&i(f)&&G(l)}S=O.slice(0,Ct);for(let l of p.keys())N.has(l)||p.delete(l)},P=()=>{let O=n.now(),N=0;for(let G of S){if(!G.isConnected){p.delete(G);continue}let _=G.getBoundingClientRect(),V=p.get(G);p.set(G,_),!(!V||Math.max(Math.abs(_.left-V.left),Math.abs(_.top-V.top),Math.abs(_.width-V.width),Math.abs(_.height-V.height))<jr||!(i(V)||i(_)))&&!y&&N<Wr&&V.width>0&&V.height>0&&(C.push({x:V.left,y:V.top,w:V.width,h:V.height,born:O}),N++)}N&&E()};A(),v();let W=a.setInterval(P,Vr),Y=a.setInterval(v,_r);return Ge(a)?Et(e).then(O=>{if(T){O.stop();return}y=O,x=!1,C.length=0,E(),O.stream.getVideoTracks()[0]?.addEventListener("ended",()=>{T||y!==O||(y=null,x=!1,c.clearRect(0,0,h,d),b("Tab sharing ended, so only the elements that move are ghosted now."))})}).catch(()=>{T||b("Tab sharing was refused, so only the elements that move are ghosted.")}):b("This page cannot share its own pixels (Chromium on a secure page can), so only the elements that move are ghosted."),{stop(){if(!T){T=!0,g&&a.cancelAnimationFrame(g),g=0,a.clearInterval(W),a.clearInterval(Y),a.removeEventListener("resize",w);try{y?.stop()}catch{}y=null,o.remove();for(let O of m)O();m.length=0,p.clear(),S=[]}}}}var We=20,Ce=90,Xr=14,He=65,Lt=[[20,"Nothing has changed yet."],[32,"The lens has begun to yellow, too slowly to notice."],[40,"Near focus starts to shorten; the phone moves further away."],[45,"Small text at reading distance is blurring (presbyopia)."],[50,"Contrast sensitivity for fine detail has begun to fall."],[55,"The pupil lets in about four fifths of the light it did at twenty."],[60,"Near focus is gone without glasses; the lens clouds faster from here."],[65,"One in twenty over sixty-five has an essential tremor; the pointer shows it."],[70,"A little over half the light reaches the retina compared with twenty."],[75,"Grey text on white is fading into its background."],[80,"Scatter in the lens veils the page; drawn here as a blur."],[85,"Only strong contrast and large targets are still easy."],[90,"The page as the oldest readers receive it."]],Te=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],Ye=e=>e<=60?1+.02*(e-32):1.56+.0667*(e-60),Ft=Ye(20),Kr=Ye(90);function Rt(e){let t=Math.max(We,Math.min(Ce,e)),r=Ye(t)-Ft,a=.45*r/(Kr-Ft),s=1+(t/70)**4-(1+(20/70)**4),n=1+(90/70)**4-(1+(20/70)**4),o=.9*s/n,m=((3.36-.0102*(t-20))/3.36)**2,b=10**(-.1*r),h=Math.sqrt(m*b),d=10**(-.08*Math.max(0,t-50)/10),T=Math.max(0,15-.25*t),x=Math.min(2.5,Math.max(0,2.5-.5*T))/2,g=t<He?0:4+8*(t-He)/(Ce-He);return{age:t,sepia:a,scatterBlur:o,brightness:h,contrast:d,nearBlur:x,tremor:g}}function $t(e,{start:t=45}={},r={}){let a=e.defaultView,s=e.documentElement,n=r.container,o=[],c=!1,m=Math.max(We,Math.min(Ce,Number(t)||45)),b=we(e);o.push(()=>{try{b.hidePopover()}catch{}b.remove()});let h=e.createElement("div");h.setAttribute("role","group"),h.setAttribute("aria-label","Age"),h.style.cssText="position:absolute;left:50%;bottom:16px;transform:translateX(-50%);pointer-events:auto;width:min(360px, calc(100vw - 32px));padding:10px 14px 12px;border-radius:10px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,0.3);";let d=e.createElement("div");d.style.cssText="display:flex;justify-content:space-between;align-items:baseline;gap:8px;";let T=e.createElement("span");T.textContent="Age";let y=e.createElement("span");y.textContent="approximation",y.title="Population averages from the cited studies; any one reader sits above or below them.",y.style.cssText="margin-left:8px;padding:0 6px;border:1px solid rgba(247,248,248,0.25);border-radius:999px;font-size:9px;font-weight:640;letter-spacing:0.07em;text-transform:uppercase;color:#B6BAC2;vertical-align:1px;",T.appendChild(y);let x=e.createElement("output");x.style.cssText="font-weight:650;font-size:18px;color:#FFD60A;font-variant-numeric:tabular-nums;",d.append(T,x);let g=e.createElement("input");g.type="range",g.min=String(We),g.max=String(Ce),g.step="1",g.value=String(m),g.setAttribute("aria-label","Age"),g.style.cssText="display:block;width:100%;margin:6px 0 4px;accent-color:#FFD60A;cursor:pointer;";let k=e.createElement("div");k.setAttribute("aria-live","polite"),k.style.cssText="color:#D7D9DE;line-height:1.45;height:2.9em;overflow:hidden;",h.append(d,g,k),b.appendChild(h);let C=n?{filter:n.style.filter,backdrop:n.style.backdropFilter,webkit:n.style.webkitBackdropFilter}:null,A=e.createElement("style");A.dataset.pourAudit="filter",e.head.appendChild(A),o.push(()=>A.remove());let I=[];(()=>{let N=0;for(let G of ke(e.body??s)){if(N>4e3)break;N++;let _=!1;for(let l of G.childNodes)if(l.nodeType===3&&l.nodeValue.trim()){_=!0;break}!_||!(parseFloat(a.getComputedStyle(G).fontSize)<Xr)||(G.setAttribute("data-pour-age-small",""),I.push(G))}})(),o.push(()=>{for(let N of I)N.removeAttribute("data-pour-age-small");I.length=0});let w=s.style.cursor,i=new Map,u=(N,G)=>{let _=`${N}:${G}`,V=i.get(_);if(V)return V;let l=64,f=e.createElement("canvas");f.width=l,f.height=l;let L=f.getContext("2d");if(!L)return"auto";let F=l/2;L.save(),L.translate(F+N,F+G),L.scale(1.15,1.15),L.beginPath(),L.moveTo(Te[0][0],Te[0][1]);for(let z=1;z<Te.length;z++)L.lineTo(Te[z][0],Te[z][1]);L.closePath(),L.restore(),L.lineWidth=3,L.lineJoin="round",L.strokeStyle="#fff",L.stroke(),L.fillStyle="#000",L.fill();let B=`url("${f.toDataURL("image/png")}") ${F} ${F}, auto`;return i.set(_,B),B},p=null,S=0,v=N=>{S=a.requestAnimationFrame(v);let G=Rt(m).tremor,_=2*Math.PI*6*(N/1e3),V=Math.round((Math.sin(_)*.7+Math.sin(_*1.63+1.1)*.3)*G),l=Math.round((Math.cos(_*.97+.6)*.7+Math.sin(_*2.11+2.3)*.3)*G);s.style.cursor=u(V,l)},P=N=>{N&&!S?(p=At(e,":not(html) { cursor: inherit !important; } [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }"),S=a.requestAnimationFrame(v)):!N&&S&&(a.cancelAnimationFrame(S),S=0,p?.(),p=null,s.style.cursor=w)};o.push(()=>P(!1));let W=N=>{let G=Lt[0][1];for(let[_,V]of Lt)N>=_&&(G=V);return G},Y=()=>{let N=Rt(m);x.textContent=String(N.age),k.textContent=W(N.age);let G=`sepia(${N.sepia.toFixed(3)}) brightness(${N.brightness.toFixed(3)}) contrast(${N.contrast.toFixed(3)})${N.scatterBlur>.02?` blur(${N.scatterBlur.toFixed(2)}px)`:""}`;n&&(n.style.filter=G,n.style.backdropFilter=G,n.style.webkitBackdropFilter=G),A.textContent=N.nearBlur>.02?`[data-pour-age-small] { filter: blur(${N.nearBlur.toFixed(2)}px) !important; }`:"",P(N.tremor>0)},O=()=>{m=Number(g.value)||m,Y()};return g.addEventListener("input",O),o.push(()=>g.removeEventListener("input",O)),Y(),o.push(()=>{n&&C&&(n.style.filter=C.filter,n.style.backdropFilter=C.backdrop,n.style.webkitBackdropFilter=C.webkit)}),{stop(){if(!c){c=!0;for(let N of o.reverse())try{N()}catch{}o.length=0}}}}var Dt="__pourHearingRouting";function Nt(e){let t=e.AudioContext||e.webkitAudioContext;if(!t)return null;let r=e[Dt]??={ctx:null,sources:new WeakMap};try{r.ctx??=new t}catch{return null}return r.ctx}var Me={loss:["none","mild","moderate","severe","noise","noisy"],implant:["none","implant4","implant8","implant16"]},Ur=[...Me.loss,...Me.implant],Jr={none:"None",mild:"Mild",moderate:"Moderate",severe:"Severe",profound:"Profound",noise:"Noise damage",noisy:"Noisy room",implant4:"4 channels",implant8:"8 channels",implant16:"16 channels"},Ot=4,Qr=.1,Zr=.5;function en(e){let t=Math.floor(e.sampleRate*Ot),r=e.createBuffer(1,t,e.sampleRate),a=r.getChannelData(0),s=0,n=0,o=0,c=0,m=0,b=0,h=0,d=0;for(let y=0;y<t;y++){let x=Math.random()*2-1;s=.99886*s+x*.0555179,n=.99332*n+x*.0750759,o=.969*o+x*.153852,c=.8665*c+x*.3104856,m=.55*m+x*.5329522,b=-.7616*b-x*.016898;let g=(s+n+o+c+m+b+h+x*.5362)*.11;h=x*.115926,a[y]=g,d+=g*g}let T=Qr/Math.sqrt(d/t||1);for(let y=0;y<t;y++)a[y]*=T;return r}function oe(e,t,r,a=0,s=.707){let n=e.createBiquadFilter();return n.type=t,n.frequency.value=r,n.gain.value=a,n.Q.value=s,n}function tn(e){let r=new Float32Array(2048);for(let s=0;s<2048;s++){let n=s/2047*2-1;r[s]=Math.sign(n)*Math.abs(n)**1.6}let a=e.createWaveShaper();return a.curve=r,a.oversample="2x",a}function rn(e){let t=Math.floor(e.sampleRate*Ot),r=e.createBuffer(1,t,e.sampleRate),a=r.getChannelData(0);for(let n=0;n<t;n++)a[n]=Math.random()*2-1;let s=e.createBufferSource();s.buffer=r,s.loop=!0;try{s.start()}catch{}return s}function nn(e,t){let r=e.createGain(),a=e.createGain();a.gain.value=4.5;let s=rn(e),n=[r,a,s],o=200,c=7e3,m=new Float32Array(1024);for(let b=0;b<1024;b++)m[b]=Math.abs(b/1023*2-1);for(let b=0;b<t;b++){let h=o*(c/o)**(b/t),d=o*(c/o)**((b+1)/t),T=Math.sqrt(h*d),y=T/(d-h),x=oe(e,"bandpass",T,0,y),g=e.createWaveShaper();g.curve=m;let k=oe(e,"lowpass",160),C=oe(e,"bandpass",T,0,y),A=e.createGain();A.gain.value=0,r.connect(x),x.connect(g),g.connect(k),k.connect(A.gain),s.connect(C),C.connect(A),A.connect(a),n.push(x,g,k,C,A)}return{input:r,output:a,nodes:n,stop(){try{s.stop()}catch{}}}}function an(e,t){if(/^implant\d+$/.test(t))return[nn(e,Number(t.slice(7)))];switch(t){case"none":return[];case"profound":{let r=e.createGain();return r.gain.value=0,[r]}case"noise":return[oe(e,"peaking",4e3,-30,2.5),oe(e,"highshelf",6500,-12),tn(e)];case"mild":return[oe(e,"highshelf",3e3,-15)];case"severe":{let r=e.createGain();return r.gain.value=.5,[oe(e,"lowpass",800),oe(e,"lowpass",800),oe(e,"highshelf",800,-45),r]}case"moderate":case"noisy":default:return[oe(e,"highshelf",1500,-25),oe(e,"lowpass",4e3)]}}var Xe=e=>e.nodeType===1&&(e.tagName==="AUDIO"||e.tagName==="VIDEO");function It(e,{audiogram:t="moderate",frame:r=!1,picker:a="loss"}={}){let s=Me[a]??Me.loss,n=e.defaultView,o=r,c="pour-hearing-v1",m=()=>{for(let M=0;M<n.frames.length;M++)try{n.frames[M].postMessage({[c]:{setting:d}},"*")}catch{}},b=M=>{let R=M.data?.[c];if(R){if(R.hello&&M.source){try{M.source.postMessage({[c]:{setting:d}},"*")}catch{}return}r&&(!Ur.includes(R.setting)||R.setting===d||(d=R.setting,u(),m()))}};n.addEventListener("message",b);let h=n.AudioContext||n.webkitAudioContext,d=s.includes(t)?t:s[1],T=new Set,y=[],x=null,g=h?n[Dt]??={ctx:null,sources:new WeakMap}:null,k=null;if(g)try{g.ctx??=new h,k=g.ctx}catch{k=null}let C=null,A=null,I=[],E=null,w=null;k&&(C=k.createGain(),A=k.createGain(),A.connect(k.destination),g.input=C,g.output=A);function i(M){for(let R of M)try{if(R.nodes){R.stop?.();for(let K of R.nodes)K.disconnect()}else R.disconnect()}catch{}}function u(){if(!k)return;i(I),C.disconnect(),I=an(k,d);let M=C;for(let R of I)M.connect(R.input??R),M=R.output??R;if(M.connect(A),d==="noisy"&&!E){w=k.createGain(),w.gain.value=0,w.connect(C),E=k.createBufferSource(),E.buffer=en(k),E.loop=!0,E.connect(w);try{E.start()}catch{}}S()}let p=new Set;function S(){if(!w)return;let M=d==="noisy"&&p.size?Zr:0;w.gain.setTargetAtTime(M,k.currentTime,.02)}let v=!!(k&&k.state!=="running"),P=()=>{if(!k||k.state==="running"){Y();return}k.resume().then(()=>{Y(),ne()}).catch(()=>{})},W=["click","keydown","pointerdown","touchend"];function Y(){if(v){v=!1;for(let M of W)e.removeEventListener(M,P,!0);x?.(),x=null}}if(v){for(let M of W)e.addEventListener(M,P,!0);o||(x=z("The sound routes through the audiogram after the next click or key press: the browser starts audio only on a gesture.")),P()}let O=new Map,N=new Set,G=n.location.origin;function _(M){let R=M.currentSrc||M.getAttribute("src")||"";if(!R)return!1;let K;try{K=new URL(R,e.baseURI)}catch{return!1}return K.protocol==="blob:"||K.protocol==="data:"||K.origin===G?!1:M.crossOrigin===null||M.crossOrigin===void 0}function V(M){let R=O.get(M);if(!R||N.has(M)||!k)return;if(!M.currentSrc&&!M.srcObject&&!M.getAttribute("src")){if(R.status="no source yet",!R.listening){R.listening=!0;let fe=()=>{R.listening=!1,V(M),ne()};M.addEventListener("loadedmetadata",fe,{once:!0}),y.push(()=>M.removeEventListener("loadedmetadata",fe))}return}if(_(M)){R.status="cannot be routed here",R.why="cross-origin media without CORS headers";return}let K=g.sources.get(M);if(K)try{K.disconnect()}catch{}else try{K=k.createMediaElementSource(M),g.sources.set(M,K)}catch{R.status="cannot be routed here",R.why="already in the page's own audio graph";return}K.connect(C),N.add(M),R.status=v?"routed, waiting for a click":"routed"}function l(M){let R=g?.sources.get(M);if(R){try{R.disconnect()}catch{}try{R.connect(k.destination)}catch{}}}let f=we(e,{interactive:!0});f.style.pointerEvents="none";let L=e.createElement("div");L.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:max-content;max-width:min(520px, calc(100vw - 32px));pointer-events:none;z-index:2147483647;";let F=e.createElement("div");F.setAttribute("role","status"),F.hidden=!0,F.style.cssText="padding:8px 12px;border-radius:8px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;text-align:left;box-shadow:0 4px 16px rgba(0,0,0,0.3);max-width:100%;box-sizing:border-box;";let B=0,z=(M,R=9e3)=>(n.clearTimeout(B),F.textContent=M,F.hidden=!1,B=n.setTimeout(()=>{F.hidden=!0},R),()=>{n.clearTimeout(B),F.hidden=!0}),j=e.createElement("div");j.setAttribute("role","group"),j.setAttribute("aria-label","Hearing loss setting"),j.style.cssText="display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:6px;border-radius:10px;max-width:100%;box-sizing:border-box;background:#1B1D22;box-shadow:0 4px 16px rgba(0,0,0,0.3);pointer-events:auto;font:500 13px/1 system-ui,sans-serif;";let X=new Map;for(let M of s){let R=e.createElement("button");R.type="button",R.textContent=Jr[M],R.style.cssText="appearance:none;border:0;border-radius:6px;padding:7px 9px;font:inherit;cursor:pointer;background:transparent;color:#FCFCFC;white-space:nowrap;",R.addEventListener("click",()=>{d=M,u(),Q(),m()}),j.appendChild(R),X.set(M,R)}let Q=()=>{for(let[M,R]of X){let K=M===d;R.setAttribute("aria-pressed",K?"true":"false"),R.style.background=K?"#FFD60A":"transparent",R.style.color=K?"#1B1D22":"#FCFCFC"}};if(L.append(F,j),o||f.appendChild(L),Q(),!k&&!o&&(x=z("This browser has no Web Audio, so the media plays as it is.")),r)try{n.parent.postMessage({[c]:{hello:!0}},"*")}catch{}function ne(){for(let[M,R]of O)N.has(M)&&(R.status=v?"routed, waiting for a click":"routed")}function de(M){O.has(M)||xe(M)||(O.set(M,{status:k?"not routed":"no Web Audio"}),M.paused||p.add(M),V(M))}let ue=M=>{for(let R of ke(M))Xe(R)&&de(R)};ue(e.body);let ge=M=>{let R=M.target;if(!Xe(R)||xe(R))return;O.has(R)||de(R);let K=O.get(R);p.add(R),S(),Ae()},ie=M=>{Xe(M.target)&&(p.delete(M.target),S())};e.addEventListener("play",ge,!0),e.addEventListener("pause",ie,!0),e.addEventListener("ended",ie,!0),e.addEventListener("emptied",ie,!0);let be=new Set,se=0,ce=0,Ae=()=>{ce||(ce=n.setTimeout(()=>{ce=0,ne()},100))},Se=new n.MutationObserver(M=>{for(let R of M)for(let K of R.addedNodes)K.nodeType===1&&!xe(K)&&be.add(K);be.size&&!se&&(se=n.requestAnimationFrame(()=>{se=0;let R=be;be=new Set;for(let K of R)K.isConnected&&ue(K);Ae()}))});return Se.observe(e.body,{childList:!0,subtree:!0}),u(),ne(),!o&&!O.size&&e.querySelector("iframe")&&(x?.(),x=z("The only video here is inside an embedded frame. The extension routes it from within that frame; the bookmarklet and the command line cannot reach it.")),{stop(){Se.disconnect(),Y(),se&&n.cancelAnimationFrame(se),se=0,n.clearTimeout(ce),ce=0;for(let M of T)n.clearInterval(M);T.clear();for(let M of y)try{M()}catch{}y.length=0,e.removeEventListener("play",ge,!0),e.removeEventListener("pause",ie,!0),e.removeEventListener("ended",ie,!0),e.removeEventListener("emptied",ie,!0);for(let M of N)l(M);if(N.clear(),k){try{E?.stop()}catch{}E?.disconnect(),w?.disconnect(),E=null,w=null,i(I),I=[];try{C?.disconnect()}catch{}try{A?.disconnect()}catch{}g.input===C&&(g.input=null,g.output=null)}n.removeEventListener("message",b),x?.(),x=null;try{f.hidePopover()}catch{}f.remove(),O.clear()}}}var Pt=[4e3,6e3,8e3],Ke={quiet:.012,loud:.045};function on(e,{kind:t="tone",pitch:r=6e3,level:a="quiet"}={}){let s=e.createGain();s.gain.value=0;let n=e.createOscillator();n.type="sine",n.frequency.value=r;let o=e.createGain();n.connect(o),o.connect(s);let c=Math.floor(e.sampleRate*2),m=e.createBuffer(1,c,e.sampleRate),b=m.getChannelData(0);for(let x=0;x<c;x++)b[x]=Math.random()*2-1;let h=e.createBufferSource();h.buffer=m,h.loop=!0;let d=e.createBiquadFilter();d.type="bandpass",d.frequency.value=r,d.Q.value=12;let T=e.createGain();h.connect(d),d.connect(T),T.connect(s);try{n.start(),h.start()}catch{}let y=(x,g,k)=>{let C=e.currentTime;n.frequency.setTargetAtTime(g,C,.02),d.frequency.setTargetAtTime(g,C,.02);let A=Ke[k]??Ke.quiet;o.gain.setTargetAtTime(x==="tone"?A:0,C,.02),T.gain.setTargetAtTime(x==="hiss"?A*6:0,C,.02),s.gain.setTargetAtTime(1,C,.05)};return y(t,r,a),{output:s,set:y,stop(){s.gain.setTargetAtTime(0,e.currentTime,.02);try{n.stop(e.currentTime+.2),h.stop(e.currentTime+.2)}catch{}setTimeout(()=>{s.disconnect()},400)}}}function Bt(e,{pitch:t=6e3,kind:r="tone",level:a="quiet"}={}){let s=e.defaultView,n=Nt(s),o={kind:r,pitch:Pt.includes(t)?t:6e3,level:Ke[a]?a:"quiet"},c=null;n&&(c=on(n,o),c.output.connect(n.destination));let m=we(e,{interactive:!0});m.style.pointerEvents="none";let b=e.createElement("div");b.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:max-content;max-width:min(520px, calc(100vw - 32px));pointer-events:none;z-index:2147483647;";let h=e.createElement("div");h.setAttribute("role","status"),h.hidden=!0,h.style.cssText="padding:8px 12px;border-radius:8px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;text-align:left;box-shadow:0 4px 16px rgba(0,0,0,0.3);max-width:100%;box-sizing:border-box;";let d=e.createElement("div");d.setAttribute("role","group"),d.setAttribute("aria-label","Tinnitus setting"),d.style.cssText="display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:6px;border-radius:10px;max-width:100%;box-sizing:border-box;background:#1B1D22;box-shadow:0 4px 16px rgba(0,0,0,0.3);pointer-events:auto;font:500 13px/1 system-ui,sans-serif;";let T=[],y=(i,u,p)=>{let S=e.createElement("button");S.type="button",S.textContent=i,S.style.cssText="appearance:none;border:0;border-radius:6px;padding:7px 9px;font:inherit;cursor:pointer;background:transparent;color:#FCFCFC;white-space:nowrap;",S.addEventListener("click",()=>{p(),x()}),T.push({b:S,isOn:u}),d.appendChild(S)};y("Tone",()=>o.kind==="tone",()=>{o.kind="tone"}),y("Hiss",()=>o.kind==="hiss",()=>{o.kind="hiss"});for(let i of Pt)y(`${i/1e3} kHz`,()=>o.pitch===i,()=>{o.pitch=i});y("Quiet",()=>o.level==="quiet",()=>{o.level="quiet"}),y("Loud",()=>o.level==="loud",()=>{o.level="loud"});let x=()=>{for(let{b:i,isOn:u}of T){let p=u();i.setAttribute("aria-pressed",p?"true":"false"),i.style.background=p?"#FFD60A":"transparent",i.style.color=p?"#1B1D22":"#FCFCFC"}c?.set(o.kind,o.pitch,o.level)};b.append(h,d),m.appendChild(b),x();let g=0,k=(i,u=9e3)=>{s.clearTimeout(g),h.textContent=i,h.hidden=!1,g=s.setTimeout(()=>{h.hidden=!0},u)};n||k("This browser has no Web Audio, so there is no sound to add.");let C=["click","keydown","pointerdown","touchend"],A=!!(n&&n.state!=="running"),I=()=>{if(A){A=!1;for(let i of C)e.removeEventListener(i,E,!0);h.hidden=!0}},E=()=>{if(!n||n.state==="running"){I();return}n.resume().then(I).catch(()=>{})};if(A){for(let i of C)e.addEventListener(i,E,!0);k("The sound starts after the next click or key press: the browser starts audio only on a gesture."),E()}let w=!1;return{stop(){if(!w){w=!0,I(),s.clearTimeout(g),c?.stop(),c=null;try{m.hidePopover()}catch{}m.remove()}}}}var Le={afterimages:Mt,ageSlider:$t,hearingLoss:It,tinnitus:Bt};function qt(e=document){let t=e.defaultView,r=e.documentElement,a=ve(e),s=it(e,a),n=null,o=null,c=null,m=null,b=null,h=null,d=null,T=null,y=null,x="none",g="none",k=0,C=0,A=0,I=0,E=null;function w(){if(e.getElementById("pour-filter-styles"))return;let $=e.createElement("style");$.id="pour-filter-styles",$.dataset.pourAudit="filter",$.textContent=St,e.head.appendChild($)}function i(){if(e.getElementById("pour-vision-filter-defs"))return;let $="http://www.w3.org/2000/svg",D=e.createElementNS($,"svg");D.setAttribute("id","pour-vision-filter-defs"),D.setAttribute("width","0"),D.setAttribute("height","0"),D.setAttribute("focusable","false"),D.setAttribute("aria-hidden","true"),D.dataset.pourAudit="filter",D.style.position="absolute",D.style.pointerEvents="none";let H=e.createElementNS($,"defs");for(let[q,te]of Object.entries(De)){let Z=e.createElementNS($,"filter");Z.setAttribute("id",`pour-vision-filter-${q}`),Z.setAttribute("color-interpolation-filters","linearRGB");let U=e.createElementNS($,"feColorMatrix");U.setAttribute("type","matrix"),U.setAttribute("values",te),Z.appendChild(U),H.appendChild(Z)}D.appendChild(H),e.body.appendChild(D)}let u=$=>{let D=e.createElement("div");return D.className=$,D.dataset.pourAudit="filter",e.body.appendChild(D),D};function p(){A=0,r.style.setProperty("--pour-vision-x",`${k}px`),r.style.setProperty("--pour-vision-y",`${C}px`),r.style.setProperty("--pour-vision-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function S($){k=$.clientX,C=$.clientY,A||(A=t.requestAnimationFrame(p))}function v($){let D=$.touches[0];D&&S(D)}function P($,D=null){for(let q of Ne)r.classList.remove(`pour-vision-filter-${q}`);Oe.has(x)&&(e.removeEventListener("mousemove",S),e.removeEventListener("touchmove",v)),o?.stop(),o=null,c?.stop(),c=null;try{d?.stop()}catch{}if(d=null,n?.remove(),n=null,x=he[$]!==void 0?$:"none",x==="none"){g==="none"&&(r.style.filter="");return}g!=="none"&&M("none"),w(),i();let H=he[x]||"none";if(r.style.filter=H==="none"?"":H,Ne.has(x)){r.classList.add(`pour-vision-filter-${x}`),n=u("pour-vision-filter-overlay"),n.dataset.filter=x,x==="floaters"&&(o=pt(e,n)),x==="glossyScreen"&&(c=dt(e,n));let q=Qe[x];q&&Le[q.driver]&&(d=Le[q.driver](e,{...q.options??{},...D??{}},{kit:a,container:n,lenses:s}))}Oe.has(x)&&(k=t.innerWidth/2,C=t.innerHeight/2,p(),e.addEventListener("mousemove",S),e.addEventListener("touchmove",v,{passive:!0}))}function W(){I=0,r.style.setProperty("--pour-sensory-x",`${k}px`),r.style.setProperty("--pour-sensory-y",`${C}px`),r.style.setProperty("--pour-sensory-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function Y($){k=$.clientX,C=$.clientY,I||(I=t.requestAnimationFrame(W))}function O($){let D=$.touches[0];D&&Y(D)}function N($){if(e.getElementById("pour-sensory-injected-style")?.remove(),!$)return;let D=e.createElement("style");D.id="pour-sensory-injected-style",D.dataset.pourAudit="filter",D.textContent=$,e.head.appendChild(D)}function G(){if(e.querySelector(".pour-sensory-washout-char"))return;let $=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null),D=[];for(;$.nextNode();)D.push($.currentNode);for(let H of D){let q=H.textContent;if(!q.trim())continue;let te=H.parentElement;if(!te||te.closest("script,style,noscript,[data-pour-audit]"))continue;let Z=e.createDocumentFragment();for(let U of q)if(U===" "||U===`
`||U==="	")Z.appendChild(e.createTextNode(U));else{let ae=e.createElement("span");ae.textContent=U,ae.style.opacity=(.3+Math.random()*.7).toFixed(2),ae.className="pour-sensory-washout-char",Z.appendChild(ae)}te.replaceChild(Z,H)}}function _(){for(let $ of e.querySelectorAll(".pour-sensory-washout-char"))$.replaceWith($.textContent);e.body.normalize()}let V=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],l=new Map,f=0,L=0,F=null,B=0,z=0,j=0,X=0,Q=0,ne=0;function de($,D,H){let q=`${$}:${D}:${H}`,te=l.get(q);if(te)return te;let Z=e.createElement("canvas");Z.width=$,Z.height=$;let U=Z.getContext("2d");if(!U)return"auto";let ae=Math.round($/2);U.save(),U.translate(ae+D,ae+H),U.scale(1.15,1.15),U.beginPath(),U.moveTo(V[0][0],V[0][1]);for(let pe=1;pe<V.length;pe++)U.lineTo(V[pe][0],V[pe][1]);U.closePath(),U.restore(),U.lineWidth=3,U.lineJoin="round",U.strokeStyle="#fff",U.stroke(),U.fillStyle="#000",U.fill();let le=`url("${Z.toDataURL("image/png")}") ${ae} ${ae}, auto`;return l.set(q,le),le}function ue($){let D=$.timeStamp||Date.now(),H=D-j;if(j&&H>0){let q=Math.hypot($.clientX-B,$.clientY-z);X=X*.8+q/H*1e3*.2}B=$.clientX,z=$.clientY,j=D}function ge($,D){if(!Q)return Q=$+D.minGap+Math.random()*(D.maxGap-D.minGap),[0,0];let H=$-Q;if(H<0)return[0,0];if(H>D.dur)return Q=$+D.minGap+Math.random()*(D.maxGap-D.minGap),ne=Math.random()*Math.PI*2,[0,0];let q=1-H/D.dur,te=D.size*q*q;return[Math.cos(ne)*te,Math.sin(ne)*te]}function ie($){f=t.requestAnimationFrame(ie);let D=F;if(!D)return;let H=($-L)/1e3,q=0,te=0;if(D.freq&&D.amp){let le=2*Math.PI*D.freq,pe=Math.max(0,1+(D.intent||0)*Math.min(1,X/700)),Je=D.amp*pe;q+=(Math.sin(le*H)*.7+Math.sin(le*1.63*H+1.1)*.3)*Je,te+=(Math.cos(le*.97*H+.6)*.7+Math.sin(le*2.11*H+2.3)*.3)*Je}if(D.spasm){let[le,pe]=ge($,D.spasm);q+=le,te+=pe}let Z=D.bitmap/2-14,U=Math.max(-Z,Math.min(Z,Math.round(q))),ae=Math.max(-Z,Math.min(Z,Math.round(te)));r.style.cursor=de(D.bitmap,U,ae)}function be($){se(),F=$,L=t.performance?t.performance.now():Date.now(),X=0,j=0,Q=0,ne=Math.random()*Math.PI*2,ce($.hide?`
      html, :not(html) { cursor: none !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `:`
      :not(html) { cursor: inherit !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `),!$.hide&&(e.addEventListener("mousemove",ue,{passive:!0}),f=t.requestAnimationFrame(ie))}function se(){f&&t.cancelAnimationFrame(f),f=0,F=null,Q=0,e.removeEventListener("mousemove",ue),ce(null),r.style.cursor=""}function ce($){if(e.getElementById("pour-sensory-cursor-style")?.remove(),!$)return;let D=e.createElement("style");D.id="pour-sensory-cursor-style",D.dataset.pourAudit="filter",D.textContent=$,e.head.appendChild(D)}function Ae(){Se();let $=()=>{E=t.setTimeout(()=>{y&&(y.classList.add("pour-sensory-spike-flash"),t.setTimeout(()=>{y?.classList.remove("pour-sensory-spike-flash"),$()},150))},3e3+Math.random()*8e3)};$()}function Se(){E&&(t.clearTimeout(E),E=null)}function M($,D=null){let H=ye[g];H?.overlay&&r.classList.remove(`pour-sensory-filter-${g}`),H?.hostClass&&r.classList.remove(H.hostClass),H?.mouseTracked&&(e.removeEventListener("mousemove",Y),e.removeEventListener("touchmove",O)),H?.injectScript&&_(),H?.cursorJitter&&se(),H?.viewportOrigin&&Ht(),H?.loupe&&Ue(),H?.lens&&s[H.lens]?.remove(),m?.stop(),m=null,b?.stop(),b=null,h?.stop(),h=null;try{T?.stop()}catch{}if(T=null,Se(),y?.remove(),y=null,N(null),g=ye[$]?$:"none",g==="none"){x==="none"&&(r.style.filter="");return}x!=="none"&&P("none"),w();let q=ye[g];r.style.filter=q.css&&q.css!=="none"?q.css:"",q.hostClass&&r.classList.add(q.hostClass),(q.overlay||q.mouseTracked||g==="sensorySpike")&&(y=u("pour-sensory-filter-overlay"),y.dataset.filter=g,q.overlay&&r.classList.add(`pour-sensory-filter-${g}`)),q.mouseTracked&&(k=t.innerWidth/2,C=t.innerHeight/2,W(),e.addEventListener("mousemove",Y),e.addEventListener("touchmove",O,{passive:!0})),q.injectCSS&&N(q.injectCSS),g==="sensorySpike"&&Ae(),q.injectScript&&G(),q.cursorJitter&&be(q.cursorJitter),q.viewportOrigin&&jt(),q.loupe&&Wt(q.loupe),q.lens&&s[q.lens]?.apply(),q.forcedColours&&(m=bt(e)),q.fingertip&&(b=xt(e,q.fingertip)),q.magnifier&&(h=kt(e,q.magnifier)),q.driver&&Le[q.driver]&&(T=Le[q.driver](e,{...q.options??{},...D??{}},{kit:a,container:y,lenses:s}))}let R=0;function K(){R=0,r.style.setProperty("--pour-motion-origin",`${t.scrollX+t.innerWidth/2}px ${t.scrollY+t.innerHeight/2}px`)}function fe(){R||(R=t.requestAnimationFrame(K))}function jt(){K(),t.addEventListener("scroll",fe,{passive:!0}),t.addEventListener("resize",fe)}function Ht(){t.removeEventListener("scroll",fe),t.removeEventListener("resize",fe),R&&(t.cancelAnimationFrame(R),R=0),r.style.removeProperty("--pour-motion-origin")}let Re=null;function Wt($){Ue(),Re=vt(e,{...$,point:()=>({x:k,y:C})})}function Ue(){Re?.stop(),Re=null}let Yt=()=>({vision:x,sensory:g});function Xt(){P("none"),M("none")}return{applyVision:P,applySensory:M,clear:Xt,state:Yt}}var sn=new Set(["text","search","url","tel","email","password","number","date","datetime-local","month","time","week",""]),ln=new Set(["input","select","textarea","button","meter","output","progress"]);function cn(e){return e.replace(/[\uE000-\uF8FF\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}\u200B-\u200D\u2060\uFEFF]/gu,"").trim()?e:""}function Vt(e){return cn(Fe(e,!1,!1,new Set))}function _t(e){for(let r=e;r;r=Pe(r))if(r.getAttribute?.("aria-hidden")==="true"||getComputedStyle(r).display==="none")return!0;let t=getComputedStyle(e).visibility;return t==="hidden"||t==="collapse"}function pn(e,t){let r=e.getAttribute?.("aria-labelledby");if(!r)return null;let a=e.getRootNode(),s=r.split(/\s+/).filter(Boolean).map(n=>a.getElementById?.(n)).filter(Boolean);return s.length?s.map(n=>{let o=new Set(t);return n===e&&o.delete(e),Fe(n,!0,_t(n),o)}).join(" ").replace(/\s+/g," ").trim():null}function Fe(e,t,r,a){if(a.has(e))return"";if(a.add(e),!t){let c=pn(e,a);if(c)return c}let s=e.getAttribute("aria-label")?.trim();if(s)return s;let n=e.tagName.toLowerCase();if(n==="img"||n==="area"){let c=e.getAttribute("alt")?.trim();if(c)return c}if(ln.has(n)&&e.labels?.length){let c=[...e.labels].map(m=>Fe(m,t,_t(m),a)).join(" ").trim();if(c)return c}if(n==="input"||n==="select"||n==="textarea"){if(e.type==="submit"||e.type==="reset"||e.type==="button"){let c=(e.value??e.getAttribute("value")??"").trim();if(c)return c}if(e.type==="image"){let c=e.getAttribute("alt")?.trim();if(c)return c}if(t&&(n==="textarea"||sn.has(e.type))){let c=(e.value??"").trim();if(c)return c}if(e.type==="submit")return"Submit";if(e.type==="reset")return"Reset"}let o=dn(e,r,t,a).replace(/\s+/g," ").trim();return o||(e.getAttribute("title")??e.getAttribute("placeholder")??"").trim()}function dn(e,t,r,a){let s=e.shadowRoot?e.shadowRoot.childNodes:e.childNodes;return zt(e,"::before",t)+Gt(s,t,r,a)+zt(e,"::after",t)}function zt(e,t,r){if(e.namespaceURI==="http://www.w3.org/2000/svg")return"";let a=getComputedStyle(e,t);if(!r&&(a.display==="none"||a.visibility==="hidden"||a.visibility==="collapse"))return"";let s=a.content;if(!s||s==="none"||s==="normal")return"";let n=s.match(/\/\s*"((?:[^"\\]|\\.)*)"\s*$/);if(n)return n[1].replace(/\\(.)/g,"$1");let o=s.match(/^"((?:[^"\\]|\\.)*)"$/);return o?o[1].replace(/\\(.)/g,"$1"):""}function Gt(e,t,r,a){let s="";for(let n of e){if(n.nodeType===3){s+=n.textContent;continue}if(n.nodeType!==1)continue;let o=n.tagName.toLowerCase();if(o==="script"||o==="style"||o==="noscript"||o==="template")continue;if(!t){if(n.getAttribute("aria-hidden")==="true")continue;let m=getComputedStyle(n);if(m.display==="none"||m.visibility==="hidden"||m.visibility==="collapse")continue}if(o==="slot"){let m=n.assignedNodes?.()??[];s+=Gt(m.length?m:n.childNodes,t,r,a);continue}if((o==="img"||o==="area")&&n.getAttribute("alt")===""&&!n.getAttribute("aria-label")?.trim()&&!n.getAttribute("aria-labelledby"))continue;let c=Fe(n,r,t,a);s+=o==="img"||o==="area"||n.hasAttribute("aria-label")||n.hasAttribute("aria-labelledby")?` ${c} `:c}return s}return er(un);})();
