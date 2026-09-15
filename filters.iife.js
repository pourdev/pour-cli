/*! pour filters | MIT | https://pour.dev */
var PourFilters=(()=>{var Ne=Object.defineProperty;var Ut=Object.getOwnPropertyDescriptor;var Jt=Object.getOwnPropertyNames;var Qt=Object.prototype.hasOwnProperty;var Zt=(e,t)=>{for(var r in t)Ne(e,r,{get:t[r],enumerable:!0})},er=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Jt(t))!Qt.call(e,s)&&s!==r&&Ne(e,s,{get:()=>t[s],enumerable:!(n=Ut(t,s))||n.enumerable});return e};var tr=e=>er(Ne({},"__esModule",{value:!0}),e);var hn={};Zt(hn,{CSS_FILTERS:()=>me,MODE_LABELS:()=>Be,SENSORY_FILTERS:()=>ve,accessibleName:()=>Gt,createFilterApplier:()=>Vt,createLensKit:()=>xe,cssPath:()=>nt});var Oe={protanopia:"0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0 0 0 0 1 0",deuteranopia:"0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047414 0 0 -0.011820 0.042940 0.968881 0 0 0 0 0 1 0",tritanopia:"1.255528 -0.076749 -0.178779 0 0 -0.078411 0.930809 0.147602 0 0 0.004733 0.691367 0.303900 0 0 0 0 0 1 0",achromatopsia:"0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0 0 0 1 0",protanomaly:"0.458064 0.679578 -0.137642 0 0 0.092785 0.846313 0.060902 0 0 -0.007494 -0.016807 1.024301 0 0 0 0 0 1 0",deuteranomaly:"0.547494 0.607765 -0.155259 0 0 0.181692 0.781742 0.036566 0 0 -0.010410 0.027275 0.983136 0 0 0 0 0 1 0",tritanomaly:"1.057047 -0.029507 -0.027540 0 0 -0.039014 0.966028 0.072986 0 0 0.002584 0.220200 0.777216 0 0 0 0 0 1 0"},rr={protanopia:"saturate(0.25) sepia(0.5) hue-rotate(-15deg)",deuteranopia:"saturate(0.3) sepia(0.4) hue-rotate(-10deg)",tritanopia:"saturate(0.35) sepia(0.3) hue-rotate(50deg)",achromatopsia:"grayscale(100%)",protanomaly:"saturate(0.6) sepia(0.25) hue-rotate(-8deg)",deuteranomaly:"saturate(0.65) sepia(0.2) hue-rotate(-5deg)",tritanomaly:"saturate(0.7) sepia(0.15) hue-rotate(25deg)"},Ie=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge","diabeticRetinopathy","floaters","glossyScreen","nystagmus","hemianopiaLeft","hemianopiaRight","amblyopia","afterimages","ageSlider"]),Pe=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge"]),me={none:"none",cataract:"sepia(0.3) contrast(0.9) saturate(0.9) brightness(0.95) blur(0.6px)",presbyopia:"blur(0.5px) contrast(0.92)",lowAcuityMild:"blur(0.7px)",lowAcuity:"blur(1.2px)",lowAcuityStrong:"blur(2.5px)",lowAcuityHeavy:"blur(5px)",lowLight:"brightness(0.65) contrast(0.9) saturate(0.85) hue-rotate(-8deg)",lowContrast:"contrast(0.7)",retinitisRing:"none",glaucoma:"none",glaucomaLarge:"none",macularDegeneration:"none",macularDegenerationLarge:"none",diabeticRetinopathy:"none",floaters:"none",glossyScreen:"none",nystagmus:"none",hemianopiaLeft:"none",hemianopiaRight:"none",amblyopia:"none",afterimages:"none",ageSlider:"none",scotopicRose:"sepia(0.15) hue-rotate(330deg) saturate(1.2) brightness(1.05)",scotopicYellow:"sepia(0.3) saturate(1.15) brightness(1.05)",scotopicAqua:"sepia(0.2) hue-rotate(160deg) saturate(1.15) brightness(1.02)"},nr=typeof navigator<"u"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent),ar=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),or=nr||ar;Object.keys(Oe).forEach(e=>{or?me[e]=rr[e]:me[e]=`url(#pour-vision-filter-${e})`});var ir=[{label:"Color vision",options:[{value:"deuteranomaly",added:"2026-07-30",name:"Green Weak (Deuteranomaly)",stat:"~5% of men",description:"Green-sensitive cones respond off-target, so greens, reds and browns crowd together. The most common colour vision difference.",label:"Green Weak - Deuteranomaly - ~5% of men"},{value:"protanomaly",added:"2026-07-30",name:"Red Weak (Protanomaly)",stat:"~1% of men",description:"Red-sensitive cones respond weakly: reds dim and drift towards green.",label:"Red Weak - Protanomaly - ~1% of men"},{value:"protanopia",added:"2026-07-30",name:"Red Absent (Protanopia)",stat:"~1% of men",description:"Red light barely registers \u2014 reds darken and sink into the greens around them.",label:"Red Absent - Protanopia - ~1% of men"},{value:"deuteranopia",added:"2026-07-30",name:"Green Absent (Deuteranopia)",stat:"~1% of men",description:"No working green cones: red and green become the same family of murky ochre.",label:"Green Absent - Deuteranopia - ~1% of men"},{value:"tritanomaly",added:"2026-07-30",name:"Blue Weak (Tritanomaly)",stat:"<0.2%",description:"Blue-sensitive cones respond weakly: blues and greens blur together, yellows go pale.",label:"Blue Weak - Tritanomaly - <0.2%"},{value:"tritanopia",added:"2026-07-30",name:"Blue Absent (Tritanopia)",stat:"<0.01%",description:"No working blue cones \u2014 blues read as greens, yellows as pinks and greys.",label:"Blue Absent - Tritanopia - <0.01%"},{value:"achromatopsia",added:"2026-07-30",name:"Monochromacy (Achromatopsia)",stat:"~0.003%",description:"No colour at all: brightness is the only signal left, usually with strong glare sensitivity.",label:"Monochromacy - Achromatopsia - ~0.003%"}]},{label:"Eye conditions",options:[{value:"presbyopia",added:"2026-07-30",name:"Near-Vision Loss (Presbyopia)",stat:"nearly all over 50",description:"The lens stiffens with age and close text blurs \u2014 the one condition almost everyone gets.",label:"Near-Vision Loss - Presbyopia - nearly all over 50"},{value:"glaucoma",added:"2026-07-30",name:"Tunnel Vision (Glaucoma)",stat:"~2% over 40",description:"Peripheral vision closes in until only a central window stays sharp. The window follows your pointer.",label:"Tunnel Vision - Glaucoma - ~2% over 40"},{value:"glaucomaLarge",added:"2026-07-30",name:"Tunnel Vision (Advanced Glaucoma)",stat:"~0.5% over 40",description:"Advanced glaucoma: the sharp window narrows further; everything else is gone, not blurred.",label:"Tunnel Vision (Large) - Advanced Glaucoma - ~0.5% over 40"},{value:"macularDegeneration",added:"2026-07-30",name:"Central Vision Loss (Macular Degeneration)",stat:"~8% over 45",description:"The centre of gaze fades first \u2014 precisely where you point your eyes to read.",label:"Central Vision Loss - Macular Degeneration - ~8% over 45"},{value:"macularDegenerationLarge",added:"2026-07-30",name:"Central Vision Loss (Advanced Macular Degeneration)",stat:"~1% over 50",description:"Advanced macular degeneration: a larger central blank that reading must route around.",label:"Central Vision Loss (Large) - Advanced Macular Degeneration - ~1% over 50"},{value:"diabeticRetinopathy",added:"2026-07-30",name:"Patchy Vision (Diabetic Retinopathy)",stat:"~0.8% over 40",description:"Blood-vessel damage scatters dark blotches across the view; content falls into them.",label:"Patchy Vision - Diabetic Retinopathy - ~0.8% over 40"},{value:"floaters",name:"Drifting Shadows (Floaters)",added:"2026-09-12",stat:"~33%",description:"Strands and specks in the eye cast shadows that drift and lag behind every eye movement. They show most against bright, flat areas, so a page of white space is where they live.",label:"Drifting Shadows - Floaters - ~33%"},{value:"nystagmus",added:"2026-07-30",name:"Involuntary Eye Movement (Nystagmus)",stat:"~0.2%",description:"The eyes move on their own, so the page never quite holds still.",label:"Involuntary Eye Movement - Nystagmus - ~0.2%"}]},{label:"Field of vision",options:[{value:"hemianopiaLeft",added:"2026-07-30",name:"Left Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the left half of vision in both eyes.",label:"Left Field Loss - Hemianopia (Left) - ~0.1% over 49"},{value:"hemianopiaRight",added:"2026-07-30",name:"Right Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the right half of vision in both eyes.",label:"Right Field Loss - Hemianopia (Right) - ~0.1% over 49"},{value:"retinitisRing",name:"Ring Loss (Retinitis Pigmentosa)",added:"2026-08-22",stat:"~0.025%",description:"Early retinitis pigmentosa takes a ring out of the mid-periphery, leaving a clear centre and a seeing outer rim. It narrows to a tunnel only much later, so this donut, not the tunnel, is what most of that life looks like.",label:"Ring Loss - Retinitis Pigmentosa - ~0.025%"},{value:"amblyopia",added:"2026-07-30",name:"Reduced Acuity (Amblyopia)",stat:"~2-3%",description:"One eye never learned to see sharply; fine detail and depth suffer.",label:"Reduced Acuity (One Eye) - Amblyopia - ~2-3%"},{value:"afterimages",added:"2026-09-14",name:"Afterimages (Palinopsia)",stat:"~10% with migraine",description:"Anything that moves leaves a fading copy of itself behind, the page under scroll included: a carousel becomes a smear and the page takes a couple of seconds to settle after every scroll. Content the page moves on its own is the finding. Needs the page's own pixels, so it asks to share this tab (Chromium) and says so where it cannot.",label:"Afterimages - Palinopsia - ~10% with migraine"}]},{label:"Focus & acuity",options:[{value:"lowAcuityMild",added:"2026-07-30",name:"Slight Defocus",description:"Mildly uncorrected eyesight \u2014 the glasses left in the other room.",label:"Slight Defocus - Mild Blur"},{value:"lowAcuity",added:"2026-07-30",name:"Uncorrected Focus",stat:"~5-6%",description:"Moderate uncorrected short-sight: small text needs effort, thin fonts give up first.",label:"Uncorrected Focus - Moderate Blur - ~5-6%"},{value:"lowAcuityStrong",added:"2026-07-30",name:"Significant Defocus",description:"Strong blur: layout and colour still communicate, letterforms mostly do not.",label:"Significant Defocus - Strong Blur"},{value:"lowAcuityHeavy",added:"2026-07-30",name:"Severe Defocus",description:"Only shape, contrast and position survive. What does your page still say?",label:"Severe Defocus - Very Strong Blur"}]},{label:"Contrast & light",options:[{value:"cataract",added:"2026-07-30",name:"Clouded Lens (Cataract)",stat:"~17% over 40",description:"The lens clouds and yellows: glare blooms, contrast drains, whites go dingy.",label:"Clouded Lens - Cataract - ~17% over 40"},{value:"lowContrast",added:"2026-07-30",name:"Reduced Contrast",description:"Contrast sensitivity loss: faint greys sink into their backgrounds long before they vanish for you.",label:"Reduced Contrast"},{value:"lowLight",added:"2026-07-30",name:"Dim Environment",description:"A dim room, a cheap panel, a phone at night \u2014 the low-vision hours everyone has.",label:"Dim Environment - Low Light"},{value:"glossyScreen",added:"2026-09-12",name:"Glossy Screen (Reflections)",description:"The room and your own face reflect off the glass and add light to every dark pixel. White areas barely change; dark themes, grey-on-black text and low-contrast controls wash out first. Uses your camera on this device only, never recorded or sent.",label:"Glossy Screen - Reflections"}]},{label:"Ageing",options:[{value:"ageSlider",added:"2026-09-14",name:"Age Slider",description:"One slider from twenty to ninety: the lens yellows, the pupil shrinks, contrast and near focus fall, the page\u2019s own audio and video pass through the median ear of that age (ISO 7029), and from sixty-five the pointer shows the tremor one in twenty has, all on published population curves. An approximation: any one reader sits above or below them. Grey text and small buttons are the first to go.",label:"Age Slider"}]},{label:"Visual stress",options:[{value:"scotopicRose",added:"2026-07-30",name:"Rose Tint",description:"A coloured overlay some readers use to calm pattern glare. See how your design reads through one.",label:"Rose Tint - Coloured Overlay"},{value:"scotopicYellow",added:"2026-07-30",name:"Yellow Tint",description:"A yellow reading overlay \u2014 common for visual stress. Your palette should survive it.",label:"Yellow Tint - Coloured Overlay"},{value:"scotopicAqua",added:"2026-07-30",name:"Aqua Tint",description:"An aqua reading overlay. Tinted reading is more common than most designs assume.",label:"Aqua Tint - Coloured Overlay"}]}],ve={none:{label:"None",css:"none"},fluorescentFlicker:{label:"Fluorescent Flicker",overlay:"fluorescentFlicker",css:"none"},lightSensitivity:{label:"Light Sensitivity",css:"brightness(1.4) contrast(1.2) saturate(1.1)"},colourHypersensitivity:{label:"Colour Hypersensitivity",css:"saturate(2.2) contrast(1.35) brightness(1.1)"},motionSensitivity:{label:"Motion Sensitivity",hostClass:"pour-sensory-filter-motionSensitivity",viewportOrigin:!0,css:"none"},hyperfocusTunnel:{label:"Hyperfocus Tunnel (Metaphor)",overlay:"hyperfocusTunnel",mouseTracked:!0,css:"none"},attentionFragmentation:{label:"Attention Fragmentation (Metaphor)",overlay:"attentionFragmentation",css:"none"},peripheralDistraction:{label:"Peripheral Distraction",overlay:"peripheralDistraction",css:"none"},detailFixation:{label:"Detail Fixation (Metaphor)",overlay:"detailFixation",mouseTracked:!0,loupe:{scale:2,radius:150,ring:75},css:"none"},processingDelay:{label:"Processing Lag",overlay:"processingDelay",css:"none"},sensoryInterference:{label:"Sensory Interference",hostClass:"pour-sensory-filter-backgroundNoise",css:"none"},sensorySpike:{label:"Sudden Sensory Spike",overlay:"sensorySpike",css:"none"},dyslexiaVisualStress:{label:"Visual Stress (Pattern Glare)",overlay:"dyslexiaVisualStress",injectCSS:`
        body { background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.06) 22px, rgba(0,0,0,0.06) 24px) !important; background-attachment: fixed !important; }
        p, li, td, th, dd, dt, h1, h2, h3, h4, h5, h6, label { text-shadow: 0 0 1px rgba(0,0,0,0.15) !important; animation: pour-sensory-line-merge 3s ease-in-out infinite alternate !important; }
        @keyframes pour-sensory-line-merge { 0% { transform: scaleX(1) translateY(0); } 25% { transform: scaleX(1.008) translateY(0.8px); } 50% { transform: scaleX(0.993) translateY(-0.5px); } 75% { transform: scaleX(1.005) translateY(0.6px); } 100% { transform: scaleX(0.996) translateY(-0.3px); } }
      `,css:"none"},dyslexiaCrowding:{label:"Crowding Effect",injectCSS:"* { letter-spacing: -1px !important; word-spacing: -3px !important; line-height: 1.05 !important; } p, li, td, th, dd, dt, label, span, a { font-size: 95% !important; }",css:"none"},dyslexiaTrackingLoss:{label:"Tracking Loss",overlay:"dyslexiaTrackingLoss",mouseTracked:!0,css:"none"},dyslexiaWashout:{label:"Letter Instability",injectScript:!0,css:"none"},dyslexiaContrastSensitivity:{label:"Contrast Sensitivity",css:"contrast(0.8) brightness(1.1) saturate(0.9)"},handTremor:{label:"Hand Tremor",cursorJitter:{freq:6,amp:9,intent:1.6,bitmap:96},css:"none"},handTremorStrong:{label:"Hand Tremor (Strong)",cursorJitter:{freq:5,amp:18,intent:1.9,bitmap:128},css:"none"},restingTremor:{label:"Resting Tremor",cursorJitter:{freq:4.5,amp:12,intent:-.9,bitmap:96},css:"none"},ataxicDrift:{label:"Ataxic Drift",cursorJitter:{freq:.7,amp:26,intent:.8,bitmap:128},css:"none"},pointerSpasm:{label:"Sudden Jerk",cursorJitter:{freq:5,amp:3,intent:.4,bitmap:128,spasm:{minGap:2200,maxGap:6500,size:44,dur:280}},css:"none"},pointerHidden:{label:"Hidden Pointer (Keyboard Only)",cursorJitter:{hide:!0,bitmap:32},css:"none"},fingertipTouch:{label:"Fingertip Touch",fingertip:{diameter:38},css:"none"},forcedColours:{label:"Forced Colours",forcedColours:!0,css:"none"},screenMagnifier:{label:"Screen Magnifier (400%)",magnifier:{scale:4},css:"none"},textSpacing:{label:"Text Spacing",injectCSS:`
        *:not([data-pour-audit]):not([data-pour-audit] *) { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
        p:not([data-pour-audit] *) { margin-bottom: 2em !important; }
      `,css:"none"},focusOrder:{label:"Focus Order",lens:"focusOrder",css:"none"},landmarkMap:{label:"Landmarks & Headings",lens:"landmarkMap",css:"none"},hearingLoss:{label:"Hearing Loss on the Page's Media",driver:"hearingLoss",options:{audiogram:"moderate",picker:"loss"},frames:!0,css:"none"},cochlearImplant:{label:"Cochlear Implant",driver:"hearingLoss",options:{audiogram:"implant8",picker:"implant"},frames:!0,css:"none"},tinnitus:{label:"Tinnitus",driver:"tinnitus",options:{pitch:6e3,kind:"tone",level:"quiet"},css:"none"}},et={afterimages:{driver:"afterimages",options:{decay:.86}},ageSlider:{driver:"ageSlider",options:{start:45},frames:!0}},sr=[{label:"Sensory overload",options:[{value:"fluorescentFlicker",added:"2026-07-30",name:"Fluorescent Flicker",description:"The pulse of failing fluorescent light \u2014 flicker that many autistic and migraine-prone people cannot tune out.",label:"Fluorescent Flicker"},{value:"lightSensitivity",added:"2026-07-30",name:"Light Sensitivity",description:"Photophobia: ordinary brightness arrives as glare; bright themes read as pain.",label:"Light Sensitivity"},{value:"colourHypersensitivity",added:"2026-07-30",name:"Colour Hypersensitivity",description:"Saturated colour lands far louder than you sent it.",label:"Colour Hypersensitivity"},{value:"motionSensitivity",added:"2026-07-30",name:"Motion Sensitivity",stat:"~5% of adults",description:"Page motion is felt, not just seen \u2014 what autoplaying movement does to a vestibular-sensitive visitor.",label:"Motion Sensitivity"}]},{label:"Attention & focus",options:[{value:"hyperfocusTunnel",added:"2026-07-30",name:"Hyperfocus Tunnel",metaphor:!0,description:"The world outside the point of focus falls away; the page exists one region at a time.",label:"Hyperfocus Tunnel (Metaphor)"},{value:"attentionFragmentation",added:"2026-07-30",name:"Attention Fragmentation",metaphor:!0,description:"A scattered attention field \u2014 every element competes and none of them wins.",label:"Attention Fragmentation (Metaphor)"},{value:"peripheralDistraction",added:"2026-07-30",name:"Peripheral Distraction",description:"Movement at the edges keeps stealing the centre of your gaze.",label:"Peripheral Distraction"},{value:"detailFixation",added:"2026-09-12",name:"Detail Fixation",metaphor:!0,description:"Detail-first processing: the point of attention magnifies while the whole recedes.",label:"Detail Fixation (Metaphor)"}]},{label:"Processing differences",options:[{value:"processingDelay",added:"2026-07-30",name:"Processing Lag",description:"The page lands a beat late \u2014 interaction as it feels under cognitive load.",label:"Processing Lag"},{value:"sensoryInterference",added:"2026-07-30",name:"Sensory Interference",description:"Visual noise under everything, like reading in a room that will not go quiet.",label:"Sensory Interference"}]},{label:"Sensory spikes",options:[{value:"sensorySpike",added:"2026-07-30",name:"Sudden Sensory Spike",description:"Not a constant state: periodic waves of too-much, out of nowhere.",label:"Sudden Sensory Spike"}]},{label:"Dyslexia / reading",options:[{value:"dyslexiaVisualStress",added:"2026-07-30",name:"Visual Stress (Pattern Glare)",stat:"~10%",description:"Dense text shimmers and bands together; lines merge and repel.",label:"Visual Stress (Pattern Glare)"},{value:"dyslexiaCrowding",added:"2026-07-30",name:"Crowding Effect",stat:"~10%",description:"Letters and words pack too tightly to separate \u2014 spacing is doing more work than you think.",label:"Crowding Effect"},{value:"dyslexiaTrackingLoss",added:"2026-07-30",name:"Tracking Loss",stat:"~10%",description:"Losing the line mid-sentence: only the neighbourhood of your pointer holds steady.",label:"Tracking Loss"},{value:"dyslexiaWashout",added:"2026-07-30",name:"Letter Instability",stat:"~10%",description:"Some letters appear fainter than others, making words harder to read. Try reading a paragraph with the effect enabled.",label:"Letter Instability"},{value:"dyslexiaContrastSensitivity",added:"2026-07-30",name:"Contrast Sensitivity",stat:"~10%",description:"Full-contrast text tires, low-contrast text disappears; the readable band is narrow.",label:"Contrast Sensitivity"}]}],lr=[{label:"Tremor",options:[{value:"handTremor",added:"2026-08-06",name:"Hand Tremor",stat:"~1%",description:"An essential tremor: the pointer shakes harder the more precisely you aim.",label:"Hand Tremor"},{value:"handTremorStrong",added:"2026-08-06",name:"Hand Tremor (Strong)",description:"The same tremor, stronger \u2014 small close-set targets become lotteries.",label:"Hand Tremor (Strong)"},{value:"restingTremor",added:"2026-08-06",name:"Resting Tremor",stat:"~0.3%",description:"A parkinsonian pattern: shakes at rest, steadies during deliberate movement.",label:"Resting Tremor"}]},{label:"Pointer control",options:[{value:"ataxicDrift",added:"2026-08-06",name:"Ataxic Drift",description:"The pointer drifts wide of intent; straight lines are not on offer.",label:"Ataxic Drift"},{value:"pointerSpasm",added:"2026-08-06",name:"Sudden Jerk",description:"Occasional involuntary jerks fling the pointer \u2014 sometimes mid-click.",label:"Sudden Jerk"},{value:"pointerHidden",added:"2026-08-06",name:"Hidden Pointer (Keyboard Only)",description:"No pointer at all. The keyboard is the only way through your page.",label:"Hidden Pointer (Keyboard Only)"}]},{label:"Touch",options:[{value:"fingertipTouch",added:"2026-09-13",name:"Fingertip Touch",description:"The pointer becomes a fingertip, about 10 mm across. Every target under it is outlined, and when more than one is, each shows its share of the fingertip. A click lands the way a tap does: on one of those targets, in proportion to its share. Close-set links and small buttons are the findings.",label:"Fingertip Touch"}]}],cr=[{label:"Keyboard",options:[{value:"focusOrder",added:"2026-09-07",name:"Focus Order",description:"Numbered stops trace where Tab really goes, in order. Amber stops force their own position with a positive tabindex.",label:"Focus Order"}]},{label:"Page structure",options:[{value:"landmarkMap",added:"2026-09-07",name:"Landmarks & Headings",description:"Landmark regions tinted and named, every heading chipped with its level. Amber chips skip a level.",label:"Landmarks & Headings"}]}],pr=[{label:"Colours",options:[{value:"forcedColours",added:"2026-09-12",name:"Forced Colours (Windows Contrast Theme)",stat:"~4% on Windows",description:"Every colour the page chose is replaced by a contrast theme\u2019s handful. Backgrounds, gradients and shadows go; borders keep their width; images and video stay, with a plate behind any text over them, as Windows draws it. Icon buttons that vanish, borderless fields and missing focus rings are the findings. An approximation: the page\u2019s own forced-colours rules are applied where its stylesheets can be read.",label:"Forced Colours (Windows Contrast Theme)"}]},{label:"Magnification",options:[{value:"screenMagnifier",added:"2026-09-13",name:"Screen Magnifier (400%)",description:"The page at 400%, as a full-screen magnifier shows it: a quarter of the width at a time, following the pointer and keyboard focus. When something changes outside the magnified view, a marker at the edge points to it. Messages, basket counts and menus that appear where the reader is not looking are the findings.",label:"Screen Magnifier (400%)"}]},{label:"Text",options:[{value:"textSpacing",added:"2026-09-12",name:"Text Spacing",description:"Line height 1.5, paragraph spacing 2, letter spacing 0.12 and word spacing 0.16 times the font size: the overrides low-vision and dyslexic readers apply, which WCAG 1.4.12 says a page must survive. Clipped labels, overflowing boxes and buttons that break are the findings.",label:"Text Spacing"}]}],dr=[{label:"Hearing loss",options:[{value:"hearingLoss",added:"2026-09-14",name:"Hearing Loss on the Page's Media",stat:"~20%",description:"The page\u2019s own audio and video through an audiogram: mild to severe, the notch of noise damage, or a noisy room. Turning the volume up does not help; captions do.",label:"Hearing Loss on the Page's Media - ~20%"}]},{label:"Tinnitus",options:[{value:"tinnitus",added:"2026-09-15",name:"Tinnitus",stat:"~14%",description:"A steady tone or a narrow hiss, high, that starts now and never stops, media or no media. Quiet sounds near its pitch are masked and a long spoken video tires. Captions and a transcript are what help.",label:"Tinnitus - ~14%"}]},{label:"Cochlear implant",options:[{value:"cochlearImplant",added:"2026-09-15",name:"Cochlear Implant",description:"The page\u2019s own audio and video as an implant delivers it: a few bands of noise, each carrying only the loudness of its band. Speech is followable from four channels up and sounds like a whisper through a pipe; melody and pitch are gone at any count. Over a million people hear this way.",label:"Cochlear Implant"}]}],Be={};for(let e of[...ir,...sr,...lr,...cr,...pr,...dr])for(let t of e.options)Be[t.value]=t.label.split(" - ")[0];function qe(e){return e.assignedSlot??e.parentElement??e.getRootNode()?.host??null}var tt=new WeakMap,ur=new Set;function fr(e){let t=tt.get(e);if(!t){let r=typeof MutationObserver=="function"?new MutationObserver(()=>{t.ids=null,t.parents=new WeakMap}):null;t={ids:null,parents:new WeakMap,observer:r},r&&(r.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["id"]}),ur.add(r)),tt.set(e,t)}if(t.observer?.takeRecords().length&&(t.ids=null,t.parents=new WeakMap),!t.ids){t.ids=new Map;for(let r of e.querySelectorAll("[id]"))t.ids.set(r.id,(t.ids.get(r.id)??0)+1)}return t}function hr(e,t){let r=e.parentElement,n=t.parents.get(r);if(!n){let s=new Map;n=new WeakMap;for(let o of r.children){let a=(s.get(o.tagName)??0)+1;s.set(o.tagName,a),n.set(o,{position:a,repeated:!1})}for(let o of r.children)n.get(o).repeated=s.get(o.tagName)>1;t.parents.set(r,n)}return n.get(e)}function rt(e){let t=e.getRootNode(),r=fr(t),n=a=>a.id&&r.ids.get(a.id)===1;if(n(e))return`#${CSS.escape(e.id)}`;let s=[],o=e;for(;o&&o.nodeType===Node.ELEMENT_NODE&&o!==document.documentElement;){let a=o.tagName.toLowerCase();if(o.parentElement){let{position:c,repeated:g}=hr(o,r);g&&(a+=`:nth-of-type(${c})`)}if(s.unshift(a),o.parentElement&&n(o.parentElement)){s.unshift(`#${CSS.escape(o.parentElement.id)}`);break}o=o.parentElement}return s.join(" > ")||e.tagName.toLowerCase()}function nt(e){let t=rt(e),r=e.getRootNode();for(;r&&r.host;)t=`${rt(r.host)} >>> ${t}`,r=r.host.getRootNode();return t}var bn=typeof Element<"u"?Object.getOwnPropertyDescriptor(Element.prototype,"attributes")?.get:null;function at(e){for(let t=e;t;t=qe(t))if(t.nodeType===1&&t.hasAttribute("inert"))return!0;return!1}var mr=new Set(["atomic","busy","controls","current","describedby","description","details","dropeffect","flowto","grabbed","hidden","keyshortcuts","label","labelledby","live","owns","relevant","roledescription","braillelabel","brailleroledescription"]),it=new Set(["banner","complementary","contentinfo","form","main","navigation","region","search"]),gr={link:["disabled","errormessage","expanded","haspopup","invalid"],button:["disabled","errormessage","expanded","haspopup","invalid","pressed"],checkbox:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],switch:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],radio:["checked","disabled","errormessage","haspopup","invalid","posinset","setsize"],option:["checked","disabled","errormessage","haspopup","invalid","posinset","selected","setsize"],tab:["disabled","errormessage","expanded","haspopup","invalid","posinset","selected","setsize"],menuitem:["disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemcheckbox:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemradio:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],textbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],searchbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],combobox:["activedescendant","autocomplete","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],listbox:["activedescendant","disabled","errormessage","expanded","haspopup","invalid","multiselectable","orientation","readonly","required"],slider:["disabled","errormessage","haspopup","invalid","orientation","readonly","valuemax","valuemin","valuenow","valuetext"],spinbutton:["activedescendant","disabled","errormessage","haspopup","invalid","readonly","required","valuemax","valuemin","valuenow","valuetext"],progressbar:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],meter:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],scrollbar:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],heading:["disabled","errormessage","haspopup","invalid","level"],list:["disabled","errormessage","haspopup","invalid"],listitem:["disabled","errormessage","haspopup","invalid","level","posinset","setsize"],row:["activedescendant","colindex","colindextext","disabled","errormessage","expanded","haspopup","invalid","level","posinset","rowindex","rowindextext","selected","setsize"],rowgroup:["disabled","errormessage","haspopup","invalid"],cell:["colindex","colindextext","colspan","disabled","errormessage","haspopup","invalid","rowindex","rowindextext","rowspan"],gridcell:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected"],columnheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],rowheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],table:["colcount","disabled","errormessage","haspopup","invalid","rowcount"],grid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","readonly","rowcount"],treegrid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","orientation","readonly","required","rowcount"],tablist:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation"],menu:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],menubar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],tree:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation","required"],treeitem:["checked","disabled","errormessage","expanded","haspopup","invalid","level","posinset","selected","setsize"],radiogroup:["activedescendant","disabled","errormessage","haspopup","invalid","orientation","readonly","required"],group:["activedescendant","disabled","errormessage","haspopup","invalid"],separator:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],toolbar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],dialog:["disabled","errormessage","haspopup","invalid","modal"],alertdialog:["disabled","errormessage","haspopup","invalid","modal"],application:["activedescendant","disabled","errormessage","expanded","haspopup","invalid"],article:["disabled","errormessage","haspopup","invalid","posinset","setsize"],img:["disabled","errormessage","haspopup","invalid"],figure:["disabled","errormessage","haspopup","invalid"],document:["disabled","errormessage","haspopup","invalid"],feed:["disabled","errormessage","haspopup","invalid"],math:["disabled","errormessage","haspopup","invalid"],note:["disabled","errormessage","haspopup","invalid"],presentation:["disabled","errormessage","haspopup","invalid"],none:["disabled","errormessage","haspopup","invalid"],banner:["disabled","errormessage","haspopup","invalid"],complementary:["disabled","errormessage","haspopup","invalid"],contentinfo:["disabled","errormessage","haspopup","invalid"],form:["disabled","errormessage","haspopup","invalid"],main:["disabled","errormessage","haspopup","invalid"],navigation:["disabled","errormessage","haspopup","invalid"],region:["disabled","errormessage","haspopup","invalid"],search:["disabled","errormessage","haspopup","invalid"],alert:["disabled","errormessage","haspopup","invalid"],log:["disabled","errormessage","haspopup","invalid"],marquee:["disabled","errormessage","haspopup","invalid"],status:["disabled","errormessage","haspopup","invalid"],timer:["disabled","errormessage","haspopup","invalid"],tabpanel:["disabled","errormessage","haspopup","invalid"],tooltip:["disabled","errormessage","haspopup","invalid"],definition:["disabled","errormessage","haspopup","invalid"],term:["disabled","errormessage","haspopup","invalid"],paragraph:["disabled","errormessage","haspopup","invalid"],generic:["disabled","errormessage","haspopup","invalid"],blockquote:["disabled","errormessage","haspopup","invalid"],caption:["disabled","errormessage","haspopup","invalid"],code:["disabled","errormessage","haspopup","invalid"],emphasis:["disabled","errormessage","haspopup","invalid"],strong:["disabled","errormessage","haspopup","invalid"],time:["disabled","errormessage","haspopup","invalid"],deletion:["disabled","errormessage","haspopup","invalid"],insertion:["disabled","errormessage","haspopup","invalid"],subscript:["disabled","errormessage","haspopup","invalid"],superscript:["disabled","errormessage","haspopup","invalid"]},br={checkbox:"checkbox",radio:"radio",range:"slider",number:"spinbutton",search:"searchbox",email:"textbox",tel:"textbox",text:"textbox",url:"textbox",button:"button",submit:"button",reset:"button",image:"button"},yr=new Set(["text","search","tel","url","email"]),vr={button:"button",textarea:"textbox",img:"img",article:"article",aside:"complementary",nav:"navigation",main:"main",search:"search",h1:"heading",h2:"heading",h3:"heading",h4:"heading",h5:"heading",h6:"heading",ul:"list",ol:"list",menu:"list",li:"listitem",table:"table",thead:"rowgroup",tbody:"rowgroup",tfoot:"rowgroup",tr:"row",td:"cell",th:"columnheader",form:"form",fieldset:"group",details:"group",dialog:"dialog",hr:"separator",progress:"progressbar",meter:"meter",output:"status",option:"option",datalist:"listbox",dt:"term",dd:"definition",p:"paragraph",div:"generic",span:"generic",blockquote:"blockquote",figure:"figure",time:"time",code:"code",em:"emphasis",strong:"strong"};function ot(e){let t=e.tagName.toLowerCase();if(t==="a"||t==="area")return e.hasAttribute("href")?"link":"generic";if(t==="input")return yr.has(e.type)&&e.hasAttribute("list")?"combobox":br[e.type]??null;if(t==="td"||t==="th"){if(t==="th"&&e.getAttribute("scope")?.toLowerCase()==="row")return"rowheader";if(t==="th")return"columnheader";let r=e.closest("table"),n=r&&ze(r);return n==="grid"||n==="treegrid"?"gridcell":"cell"}if(t==="select")return e.multiple||e.size>1?"listbox":"combobox";if(t==="img")return e.getAttribute("alt")===""?"presentation":"img";if(t==="header")return e.closest("article, aside, main, nav, section")?"generic":"banner";if(t==="footer")return e.closest("article, aside, main, nav, section")?"generic":"contentinfo";if(t==="aside"){let r=e.parentElement?.closest("article, aside, nav, section"),n=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby");return r&&!n?"generic":"complementary"}return t==="section"?e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")?"region":"generic":vr[t]??null}function xr(e){return[...mr].some(t=>e.hasAttribute(`aria-${t}`))?!0:e.matches(":disabled")||at(e)?!1:e.tabIndex>=0?!0:e.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]')}function ze(e){let t=e.getAttribute("role")?.trim().split(/\s+/)??[];for(let r of t){let n=r.toLowerCase();if(n==="image")return"img";if(gr[n])return(n==="presentation"||n==="none")&&xr(e)?ot(e):n}return ot(e)}var st=`/* Structure-lens overlay styles (focus order, landmark map): injected by
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
`;function Ve(e){if(e.getElementById("pour-lens-styles"))return;let t=e.createElement("style");t.id="pour-lens-styles",t.dataset.pourAudit="overlay",t.textContent=st,e.head.appendChild(t)}function xe(e=document){let t=e.defaultView,r={contentVisibilityAuto:!0,visibilityProperty:!0,checkVisibilityCSS:!0};function n(c){for(let g=c;g&&g!==e.documentElement;g=g.parentElement??g.getRootNode()?.host??null){let m=g.ownerDocument.defaultView.getComputedStyle(g).position;if(m==="fixed")return"fixed";if(m==="sticky")return"sticky"}return"flow"}function s(c,{withLine:g=!1}={}){let m="background:none;border:0;margin:0;padding:0;box-shadow:none;filter:none;opacity:1;mix-blend-mode:normal;",f=e.createElement("div");f.className=c,f.dataset.pourAudit="overlay",f.style.cssText=`position:absolute;top:0;left:0;width:0;height:0;overflow:clip;overflow-clip-margin:24px;pointer-events:none;z-index:2147483646;${m}`;let h=e.createElement("div");h.className=c,h.dataset.pourAudit="overlay",h.style.cssText=`position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:2147483646;${m}`;let T=0,b=0,k=null,S=null,N=null;if(g){S=e.createElementNS("http://www.w3.org/2000/svg","svg"),S.setAttribute("class",`${c.replace(/-layer$/,"")}-path`);for(let[p,C]of[["position","absolute"],["top","0"],["left","0"],["width","100%"],["height","100%"],["max-width","none"],["max-height","none"],["display","block"],["overflow","visible"],["pointer-events","none"],["background","none"],["border","0"],["margin","0"],["padding","0"],["box-shadow","none"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])S.style.setProperty(p,C,"important");N=e.createElementNS("http://www.w3.org/2000/svg","polyline"),k=e.createElementNS("http://www.w3.org/2000/svg","polyline");for(let[p,C,v]of[[N,"rgba(29,78,216,0.85)","3"],[k,"#93C5FD","1.5"]])for(let[I,Y]of[["fill","none"],["stroke",C],["stroke-width",v],["stroke-linejoin","round"],["stroke-linecap","round"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])p.style.setProperty(I,Y,"important");S.append(N,k),f.append(S)}let w=[],y=null,P=0,E=(p,C)=>{let v=p.el.getBoundingClientRect(),I=v.width<=0&&v.height<=0||!p.el.isConnected||p.el.checkVisibility&&!p.el.checkVisibility(r);if(p.node.style.display=I?"none":"",I){p.docPt=null,p.viewRect=null;return}let Y=p.anchor==="flow"?v.left-C.left:v.left,K=p.anchor==="flow"?v.top-C.top:v.top;if(p.node.style.transform=`translate(${Y}px, ${K}px)`,p.sized)p.node.style.width=`${v.width}px`,p.node.style.height=`${v.height}px`;else{let q=p.node.getBoundingClientRect(),_=p.anchor==="flow"?{left:C.left,top:C.top,right:C.left+T,bottom:C.top+b}:{left:0,top:0,right:t.innerWidth,bottom:t.innerHeight},X=q.left<_.left?_.left-q.left:q.right>_.right?_.right-q.right:0,O=q.top<_.top?_.top-q.top:q.bottom>_.bottom?_.bottom-q.bottom:0;(X||O)&&(p.node.style.transform=`translate(${Y+X}px, ${K+O}px)`)}p.anchor==="flow"?p.docPt=`${Y},${K}`:p.viewRect=v},x=p=>{if(!k)return;let C=[];for(let I of w)I.offLine||I.node.style.display==="none"||(I.anchor==="flow"?I.docPt&&C.push(I.docPt):I.viewRect&&C.push(`${I.viewRect.left-p.left},${I.viewRect.top-p.top}`));let v=C.join(" ");N.setAttribute("points",v),k.setAttribute("points",v)},i=()=>{let p=e.documentElement.scrollWidth,C=e.documentElement.scrollHeight;p!==T&&(T=p,f.style.width=`${p}px`),C!==b&&(b=C,f.style.height=`${C}px`);let v=f.getBoundingClientRect();for(let I of w)E(I,v);x(v)};e.body.append(f,h);let d=()=>{P=t.requestAnimationFrame(d),i()};return d(),{setItems(p,C){for(let v of w)v.node.remove();w=p.map(v=>{let I=n(v.el);return(I==="flow"?f:h).append(v.node),{...v,anchor:I,docPt:null,viewRect:null}}),C&&!w.length?(y||(y=e.createElement("div"),y.className="pour-lens-notice",h.append(y)),y.textContent=C,y.style.display=""):y&&(y.style.display="none"),i()},destroy(){t.cancelAnimationFrame(P),f.remove(),h.remove(),w=[]}}}function o(c,g){for(let m=c.parentElement??c.getRootNode()?.host;m&&m!==e.documentElement;m=m.parentElement??m.getRootNode()?.host){let f=m.ownerDocument.defaultView.getComputedStyle(m);if(f.overflow==="visible"&&f.overflowX==="visible"&&f.overflowY==="visible")continue;let h=m.getBoundingClientRect();if(g.right<=h.left||g.left>=h.right||g.bottom<=h.top||g.top>=h.bottom)return!0}return!1}function a(){let c=[],g=[],m=f=>{for(let h of f.querySelectorAll("*")){if(h.dataset&&h.dataset.pourAudit||(h.shadowRoot&&m(h.shadowRoot),!h.matches('a[href], area[href], button, input, select, textarea, summary, iframe, object, embed, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]'))||h.disabled||h.closest("[inert]")||h.checkVisibility&&!h.checkVisibility(r))continue;let T=h.getBoundingClientRect();if(T.width<=0&&T.height<=0)continue;let b=h.getAttribute("tabindex"),k=b==null?0:parseInt(b,10)||0;if(k<0){h.matches("a[href], area[href], button, input, select, textarea, summary")&&!o(h,T)&&g.push({el:h});continue}c.push({el:h,idx:k,order:c.length})}};return m(e),{stops:[...c.filter(f=>f.idx>0).sort((f,h)=>f.idx-h.idx||f.order-h.order),...c.filter(f=>f.idx===0)],unreachable:g}}return{createLensTracker:s,collectFocusStops:a,clippedOutOfSight:o,VISIBLE_OPTS:r,anchorKind:n}}function lt(e=document,t=xe(e)){let r=e.defaultView,{createLensTracker:n,collectFocusStops:s,VISIBLE_OPTS:o}=t,a=null,c=0,g=null;function m(){if(a)return;Ve(e),a=n("pour-focus-order-layer",{withLine:!0});let y=()=>{let{stops:P,unreachable:E}=s(),x=P.map((i,d)=>{let p=e.createElement("span");return p.className="pour-focus-badge"+(i.idx>0?" pour-focus-badge-forced":""),p.textContent=String(d+1),i.idx>0&&(p.title=`tabindex="${i.idx}" forces this position`),{el:i.el,node:p,sized:!1}});for(let{el:i}of E){let d=e.createElement("span");d.className="pour-focus-badge pour-focus-badge-unreachable",d.textContent="\u2715",d.title='tabindex="-1" \u2014 a keyboard cannot Tab to this control',x.push({el:i,node:d,sized:!1,offLine:!0})}a.setItems(x,"Focus order: this page has no keyboard-reachable controls")};y(),g=new r.MutationObserver(()=>{c||(c=r.setTimeout(()=>{c=0,y()},400))}),g.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function f(){r.clearTimeout(c),c=0,g?.disconnect(),g=null,a?.destroy(),a=null}let h=null,T=0,b=null;function k(y){let P=y.getAttribute("aria-label");if(P?.trim())return P.trim();let E=y.getAttribute("aria-labelledby");return E?E.split(/\s+/).map(x=>y.getRootNode().getElementById?.(x)?.textContent.trim()??"").filter(Boolean).join(" "):""}function S(){let y=[],P=[],E=i=>{for(let d of i.querySelectorAll("*")){if(d.dataset&&d.dataset.pourAudit||(d.shadowRoot&&E(d.shadowRoot),d.checkVisibility&&!d.checkVisibility(o)))continue;let p=d.getBoundingClientRect();if(p.width<=0&&p.height<=0)continue;let C=ze(d);if(it.has(C)){if(C==="form"&&!k(d))continue;y.push({el:d,role:C,name:k(d)})}else if(C==="heading"){let v=parseInt(d.getAttribute("aria-level"),10)||parseInt(d.tagName.charAt(1),10)||2;P.push({el:d,level:v})}}};E(e);let x=null;for(let i of P)i.skipped=x!=null&&i.level>x+1,i.from=x,x=i.level;return{landmarks:y,headings:P}}function N(){if(h)return;Ve(e),h=n("pour-map-layer");let y=()=>{let{landmarks:P,headings:E}=S(),x=[];for(let i of P){let d=e.createElement("div");d.className=`pour-map-region pour-map-role-${i.role}`;let p=e.createElement("span");p.className="pour-map-tag",p.textContent=i.name?`${i.role} \xB7 ${i.name}`:i.role,d.append(p),x.push({el:i.el,node:d,sized:!0})}for(let i of E){let d=e.createElement("span");d.className="pour-map-heading"+(i.skipped?" pour-map-heading-skipped":""),d.textContent=`H${i.level}`,i.skipped&&(d.title=`Skips a level \u2014 the heading before this one is an H${i.from}`),x.push({el:i.el,node:d,sized:!1})}h.setItems(x,"No landmarks or headings are exposed on this page")};y(),b=new r.MutationObserver(()=>{T||(T=r.setTimeout(()=>{T=0,y()},400))}),b.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function w(){r.clearTimeout(T),T=0,b?.disconnect(),b=null,h?.destroy(),h=null}return{focusOrder:{apply:m,remove:f},landmarkMap:{apply:N,remove:w}}}var ge="#262626";function kr(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let r=t;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}var re=(e,t,r)=>t+(r-t)*e(),ee=e=>Number(e.toFixed(1));function pt(e,{start:t,steps:r,stride:n,wiggle:s,heading:o}){let a=[t],c=o;for(let g=0;g<r;g++){c+=re(e,-s,s);let m=a[a.length-1];a.push([m[0]+Math.cos(c)*n,m[1]+Math.sin(c)*n])}return a}function dt(e){let t=[];for(let r=0;r<e.length-1;r++){let n=e[Math.max(0,r-1)],s=e[r],o=e[r+1],a=e[Math.min(e.length-1,r+2)],c=[s[0]+(o[0]-n[0])/6,s[1]+(o[1]-n[1])/6],g=[o[0]-(a[0]-s[0])/6,o[1]-(a[1]-s[1])/6];t.push(`M${ee(s[0])} ${ee(s[1])}C${ee(c[0])} ${ee(c[1])} ${ee(g[0])} ${ee(g[1])} ${ee(o[0])} ${ee(o[1])}`)}return t}function _e(e,t){let{width:r=2.6,dark:n=.6}=t,s=r,o=n;return dt(pt(e,t)).map(a=>(s=Math.max(r*.45,Math.min(r*1.9,s+re(e,-.7,.7))),o=Math.max(n*.55,Math.min(n*1.35,o+re(e,-.12,.12))),`<path d="${a}" stroke-width="${ee(s)}" stroke-opacity="${o.toFixed(2)}"/>`)).join("")}function Sr(e,t){let r=pt(e,t),n=dt(r).map(o=>`<path d="${o}" stroke-width="1.1" stroke-opacity=".45"/>`).join(""),s=r.filter((o,a)=>a%2===0).map(([o,a])=>`<circle cx="${ee(o)}" cy="${ee(a)}" r="${re(e,1.6,3.4).toFixed(1)}" fill="${ge}" stroke="none" opacity="${re(e,.45,.75).toFixed(2)}"/>`).join("");return n+s}function Tr(e,t){let r="";for(let n=0;n<4;n++){let s=re(e,0,Math.PI*2);r+=_e(e,{start:[t[0]+re(e,-18,18),t[1]+re(e,-18,18)],steps:9,stride:13,wiggle:.9,heading:s,width:2.2,dark:.55})}return r}function Ar(e,t,r){let n=re(e,40,110),s=2*Math.PI*r;return`<circle cx="${t[0]}" cy="${t[1]}" r="${r}" stroke-width="${re(e,5,7).toFixed(1)}" stroke-opacity=".55" stroke-dasharray="${ee(s-n)} ${ee(n)}" transform="rotate(${ee(re(e,0,360))} ${t[0]} ${t[1]})"/><circle cx="${t[0]}" cy="${t[1]}" r="${r}" stroke-width="2" stroke-opacity=".3"/><circle cx="${ee(t[0]+r*1.4)}" cy="${ee(t[1]-r*.6)}" r="3" fill="${ge}" stroke="none" opacity=".5"/>`}function Er(e,t,r){return`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${t}" ry="${r}" fill="url(#cloud)" stroke="none" transform="rotate(-20 ${e[0]} ${e[1]})"/>`}function Cr(e,t){let r="";for(let n=0;n<8;n++)r+=`<circle cx="${ee(t[0]+re(e,-40,40))}" cy="${ee(t[1]+re(e,-30,30))}" r="${re(e,1.2,3.2).toFixed(1)}" fill="${ge}" stroke="none" opacity="${re(e,.4,.7).toFixed(2)}"/>`;return r}var Mr=(e,t)=>`url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><filter id="b" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="${t}"/></filter><radialGradient id="cloud"><stop offset="0" stop-color="${ge}" stop-opacity=".38"/><stop offset=".55" stop-color="${ge}" stop-opacity=".14"/><stop offset="1" stop-color="${ge}" stop-opacity="0"/></radialGradient></defs><g filter="url(#b)" fill="none" stroke="${ge}" stroke-linecap="round" stroke-linejoin="round">${e}</g></svg>`)}")`;function Lr(){let e=kr(20260912);return[{depth:.95,size:.5,start:[.24,.3],art:Tr(e,[100,100])},{depth:.8,size:.44,start:[.66,.24],art:_e(e,{start:[20,150],steps:12,stride:15,wiggle:.7,heading:-.9,width:3,dark:.62})},{depth:.65,size:.3,start:[.5,.62],art:Ar(e,[100,100],17)},{depth:.55,size:.36,start:[.8,.6],art:Sr(e,{start:[30,70],steps:10,stride:14,wiggle:.8,heading:.4})},{depth:.4,size:.42,start:[.36,.8],art:Er([100,100],62,34)},{depth:.3,size:.26,start:[.14,.58],art:Cr(e,[100,100])},{depth:.15,size:.3,start:[.58,.85],art:_e(e,{start:[40,40],steps:11,stride:12,wiggle:.85,heading:.6,width:2,dark:.5})}]}var Fr=.55,Rr=.4,ct=1,Ce=520,$r=2.2;function ut(e,t){let r=e.defaultView,n=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,s={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="multiply",t.style.overflow="hidden";let o=()=>Math.max(180,Math.min(460,.32*Math.min(r.innerWidth,r.innerHeight))),a=Lr().map((E,x)=>{let i=e.createElement("div");i.className="pour-floater",i.setAttribute("aria-hidden","true"),i.dataset.pourAudit="filter";let d=(.8+E.depth*1.6).toFixed(2);return Object.assign(i.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",backgroundImage:Mr(E.art,d),backgroundSize:"contain",backgroundRepeat:"no-repeat",opacity:(.95-E.depth*.2).toFixed(2),willChange:"transform"}),t.appendChild(i),{el:i,shape:E,phase:x*1.7,size:0,x:E.start[0]*r.innerWidth,y:E.start[1]*r.innerHeight,vx:0,vy:0,angle:x*47%360,spin:0}}),c=()=>{let E=o();for(let x of a)x.size=E*x.shape.size,x.el.style.width=`${x.size}px`,x.el.style.height=`${x.size}px`},g=(E=0)=>{for(let x of a){let i=1+.03*Math.sin(E*.8+x.phase),d=2.5*Math.sin(E*.5+x.phase*.7);x.el.style.transform=`translate3d(${(x.x-x.size/2).toFixed(1)}px, ${(x.y-x.size/2).toFixed(1)}px, 0) rotate(${x.angle.toFixed(1)}deg) skewX(${d.toFixed(2)}deg) scale(${i.toFixed(3)})`}};c(),g();let m=0,f=0,h=r.scrollY,T=null,b=(E,x)=>{for(let i of a){let d=.45+.9*i.shape.depth;i.vx=Math.max(-Ce,Math.min(Ce,i.vx+E*d)),i.vy=Math.max(-Ce,Math.min(Ce,i.vy+x*d)),i.spin+=(E-x)*.02*d}},k=()=>{let E=r.scrollY-h;h=r.scrollY,E&&b(0,E*Rr)},S=(E,x)=>{T&&b((E-T.x)*ct,(x-T.y)*ct),T={x:E,y:x}},N=E=>{E.pointerType!=="touch"&&S(E.clientX,E.clientY)},w=E=>{let x=E.touches[0];x&&S(x.clientX,x.clientY)},y=()=>{c(),g()},P=E=>{m=r.requestAnimationFrame(P);let x=f?Math.min(.05,(E-f)/1e3):0;if(f=E,!x)return;let i=E/1e3,d=Math.exp(-x/Fr),p=r.innerWidth,C=r.innerHeight;for(let v of a){v.vx+=Math.sin(i*.61+v.phase)*16*x,v.vy+=(Math.cos(i*.47+v.phase*1.3)*12+$r*(.5+v.shape.depth))*x,v.vx*=d,v.vy*=d,v.spin*=d,v.x+=v.vx*x,v.y+=v.vy*x,v.angle+=(v.spin+Math.sin(i*.3+v.phase)*2)*x;let I=v.size*.25;v.x<I&&(v.vx=Math.abs(v.vx)+8),v.x>p-I&&(v.vx=-Math.abs(v.vx)-8),v.y<I&&(v.vy=Math.abs(v.vy)+8),v.y>C-I*1.6&&(v.vy=-Math.abs(v.vy)*.6-4)}g(i)};return r.addEventListener("resize",y),n||(r.addEventListener("scroll",k,{passive:!0}),e.addEventListener("pointermove",N,{passive:!0}),e.addEventListener("touchmove",w,{passive:!0}),m=r.requestAnimationFrame(P)),{stop(){m&&r.cancelAnimationFrame(m),m=0,r.removeEventListener("resize",y),r.removeEventListener("scroll",k),e.removeEventListener("pointermove",N),e.removeEventListener("touchmove",w);for(let E of a)E.el.remove();t.style.mixBlendMode=s.mixBlendMode,t.style.overflow=s.overflow}}}function ft(e,t){let r=e.defaultView,n=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,s={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="screen",t.style.overflow="hidden";let o=e.createElement("div");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourReflection="room",Object.assign(o.style,{position:"absolute",inset:"-20%",pointerEvents:"none",background:"radial-gradient(ellipse 30% 38% at 74% 16%, rgba(255,249,236,0.4), rgba(255,249,236,0.13) 42%, rgba(255,249,236,0) 72%), radial-gradient(ellipse 55% 26% at 18% 92%, rgba(255,255,255,0.1), rgba(255,255,255,0) 70%)",willChange:"transform"}),t.appendChild(o);let a=e.createElement("video");a.setAttribute("aria-hidden","true"),a.dataset.pourAudit="filter",a.dataset.pourReflection="camera",a.muted=!0,a.playsInline=!0,a.autoplay=!0,Object.assign(a.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"cover",transform:"scaleX(-1)",opacity:String(.2),filter:"blur(0.9px) contrast(1.05)",pointerEvents:"none"}),t.appendChild(a);let c=null,g=0,m=S=>{c=e.createElement("div"),c.dataset.pourAudit="filter",c.dataset.pourReflection="note",c.setAttribute("role","status"),c.textContent=S,Object.assign(c.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(420px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(c),g=r.setTimeout(()=>{c?.remove(),c=null},7e3)},f=null,h=!1,T=r.navigator?.mediaDevices;T?.getUserMedia?T.getUserMedia({video:{facingMode:"user",width:{ideal:1280},height:{ideal:720}},audio:!1}).then(S=>{if(h){for(let N of S.getTracks())N.stop();return}f=S,a.srcObject=S,a.play().catch(()=>{})}).catch(()=>{h||m("Camera not available here, so the room light is shown without your reflection.")}):m("This page cannot use the camera (it needs a secure page), so the room light is shown without your reflection.");let b=0,k=S=>{b=r.requestAnimationFrame(k);let N=S/1e3;o.style.transform=`translate3d(${(Math.sin(N*.11)*14).toFixed(1)}px, ${(Math.cos(N*.083)*9).toFixed(1)}px, 0)`};return n||(b=r.requestAnimationFrame(k)),{stop(){if(h=!0,b&&r.cancelAnimationFrame(b),b=0,g&&r.clearTimeout(g),c?.remove(),c=null,f)for(let S of f.getTracks())S.stop();f=null,a.srcObject=null,a.remove(),o.remove(),t.style.mixBlendMode=s.mixBlendMode,t.style.overflow=s.overflow}}}var ht={aquatic:{scheme:"dark",canvas:"#202020",canvasText:"#FFFFFF",linkText:"#75E9FC",grayText:"#A6A6A6",highlight:"#8EE3F0",highlightText:"#263B50",buttonFace:"#202020",buttonText:"#FFFFFF"}},J=":not([data-pour-audit]):not([data-pour-audit] *):not([data-pour-fc-keep])",mt=["data-pour-fc-bg","data-pour-fc-bgimg","data-pour-fc-before","data-pour-fc-after","data-pour-fc-keep"],Dr='script, style, noscript, template, textarea, option, select, title, svg, math, [data-pour-audit], [contenteditable]:not([contenteditable="false"])',bt='button, input[type="button"], input[type="submit"], input[type="reset"]',yt="input, textarea, select";function Nr(e){return`
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
${bt.split(", ").map(t=>`${t}${J}`).join(", ")} { color: ${e.buttonText} !important; }
${yt.split(", ").map(t=>`${t}${J}`).join(", ")} { color: ${e.canvasText} !important; }
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
`}function gt(e){if(!e||e==="transparent")return 0;let t=/^rgba?\(\s*[\d.]+\s*,?\s*[\d.]+\s*,?\s*[\d.]+\s*(?:[,/]\s*([\d.]+%?))?\s*\)$/i.exec(e);return!t||t[1]===void 0?1:t[1].endsWith("%")?parseFloat(t[1])/100:parseFloat(t[1])}function vt(e,{theme:t="aquatic"}={}){let r=e.defaultView,n=ht[t]||ht.aquatic,s=!1,o=e.createElement("style");o.id="pour-forced-colours-page",o.dataset.pourAudit="filter";let a=e.createElement("style");a.id="pour-forced-colours",a.dataset.pourAudit="filter",a.textContent=Nr(n),e.head.appendChild(o),e.head.appendChild(a);let c=i=>i.closest("[data-pour-audit]"),g=i=>{if(i.namespaceURI!=="http://www.w3.org/1999/xhtml"||c(i)||i.hasAttribute("data-pour-fc-plate"))return;let d=r.getComputedStyle(i);if(d.forcedColorAdjust==="none"){i.setAttribute("data-pour-fc-keep","");return}i.matches("mark")?i.setAttribute("data-pour-fc-bg","highlight"):gt(d.backgroundColor)>0?i.setAttribute("data-pour-fc-bg",i.matches(bt)?"button":i.matches(yt)?"field":"canvas"):i.removeAttribute("data-pour-fc-bg"),d.backgroundImage.includes("gradient(")?i.setAttribute("data-pour-fc-bgimg",""):i.removeAttribute("data-pour-fc-bgimg");for(let[p,C]of[["::before","data-pour-fc-before"],["::after","data-pour-fc-after"]]){let v=r.getComputedStyle(i,p);v.content!=="none"&&v.content!=="normal"&&(gt(v.backgroundColor)>0||v.backgroundImage.includes("gradient("))?i.setAttribute(C,""):i.removeAttribute(C)}},m=i=>{if(i.nodeType!==1||i.namespaceURI!=="http://www.w3.org/1999/xhtml")return;let d=e.createTreeWalker(i,r.NodeFilter.SHOW_TEXT),p=[];for(;d.nextNode();)p.push(d.currentNode);for(let C of p){if(!C.textContent.trim())continue;let v=C.parentElement;if(!v||v.namespaceURI!=="http://www.w3.org/1999/xhtml"||v.hasAttribute("data-pour-fc-plate")||v.closest(Dr))continue;let I=e.createElement("span");I.setAttribute("data-pour-fc-plate",""),v.replaceChild(I,C),I.appendChild(C)}},f=()=>{let i=e.querySelectorAll("[data-pour-fc-plate]");for(let d of i)d.replaceWith(...d.childNodes);i.length&&e.body.normalize()},h=i=>{if(i.nodeType===1){g(i);for(let d of i.querySelectorAll("*"))g(d);m(i)}},T=new Set,b=0,k=()=>{b=0;let i=[...T];T.clear();for(let d of i)d.isConnected&&h(d)},S=new r.MutationObserver(i=>{for(let d of i)if(d.type==="childList")for(let p of d.addedNodes)p.nodeType===1&&!p.hasAttribute("data-pour-fc-plate")&&T.add(p);else d.target.nodeType===1&&T.add(d.target);T.size&&!b&&(b=r.requestAnimationFrame(k))});h(e.body),S.observe(e.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class","style","disabled","aria-disabled","open","hidden"]});let N=/forced-colors\s*:\s*active|-ms-high-contrast\s*:\s*active/i,w=[],y=[],P=(i,d)=>{for(let p of i){let C=p.conditionText??p.media?.mediaText??"";if(p.media!==void 0&&p.cssRules!==void 0&&!d&&N.test(C)){P(p.cssRules,!0);continue}if(p.styleSheet){try{P(p.styleSheet.cssRules,d)}catch{}continue}if(d){w.push(p.cssText),p.style&&p.selectorText&&p.style.getPropertyValue("forced-color-adjust").trim()==="none"&&y.push(p.selectorText);continue}p.cssRules&&P(p.cssRules,!1)}},E=()=>{if(!s){o.textContent=w.join(`
`);for(let i of y){let d=[];try{d=e.querySelectorAll(i)}catch{continue}for(let p of d)c(p)||p.setAttribute("data-pour-fc-keep","")}}},x=[];for(let i of e.styleSheets)if(!i.ownerNode?.dataset?.pourAudit)try{P(i.cssRules,!1)}catch{if(!i.href||typeof r.CSSStyleSheet!="function")continue;x.push(r.fetch(i.href,{mode:"cors"}).then(d=>d.ok?d.text():"").then(d=>{if(!d||s)return;let p=new r.CSSStyleSheet;p.replaceSync(d),P(p.cssRules,!1)}).catch(()=>{}))}return E(),x.length&&Promise.all(x).then(E),{stop(){s=!0,S.disconnect(),b&&r.cancelAnimationFrame(b),b=0,T.clear(),f(),a.remove(),o.remove();for(let i of e.querySelectorAll(mt.map(d=>`[${d}]`).join(",")))for(let d of mt)i.removeAttribute(d)}}}var Ge="http://www.w3.org/2000/svg",xt="pour-lens-filter";function Or(e,{radius:t,ring:r,scale:n,magnify:s}){let o=t+r,a=(o+2)*2,c=a/2,g=e.createElement("canvas");g.width=a,g.height=a;let m=g.getContext("2d"),f=m.createImageData(a,a),h=f.data,T=t/s;for(let b=0;b<a;b++)for(let k=0;k<a;k++){let S=k+.5-c,N=b+.5-c,w=Math.hypot(S,N),y=w;if(w<t)y=w/s;else if(w<o){let d=(w-t)/r,p=d*d*(3-2*d);y=T+(o-T)*p}let P=w>0?y/w-1:0,E=P*S,x=P*N,i=(b*a+k)*4;h[i]=Math.max(0,Math.min(255,Math.round(127.5+E/n*255))),h[i+1]=Math.max(0,Math.min(255,Math.round(127.5+x/n*255))),h[i+2]=0,h[i+3]=Math.round(255*Math.max(0,Math.min(1,(o+2-w)/2)))}return m.putImageData(f,0,0),{href:g.toDataURL("image/png"),size:a}}function wt(e,{scale:t=2,radius:r=110,ring:n=60,point:s,target:o}){let a=e.defaultView,c=o||e.documentElement,g=Math.ceil(2*r*(1-1/t)*1.05),m=Or(e,{radius:r,ring:n,scale:g,magnify:t}),f=e.createElementNS(Ge,"svg");f.setAttribute("width","0"),f.setAttribute("height","0"),f.setAttribute("aria-hidden","true"),f.setAttribute("focusable","false"),f.dataset.pourAudit="filter",f.dataset.pourLens="defs",Object.assign(f.style,{position:"absolute",pointerEvents:"none"});let h=e.createElementNS(Ge,"filter");h.setAttribute("id",xt),h.setAttribute("filterUnits","userSpaceOnUse"),h.setAttribute("primitiveUnits","userSpaceOnUse"),h.setAttribute("x","0"),h.setAttribute("y","0"),h.setAttribute("width","100%"),h.setAttribute("height","100%"),h.setAttribute("color-interpolation-filters","sRGB");let T=(p,C)=>{let v=e.createElementNS(Ge,p);for(let[I,Y]of Object.entries(C))v.setAttribute(I,String(Y));return v},b={width:m.size,height:m.size},k=T("feImage",{href:m.href,preserveAspectRatio:"none",result:"map",...b}),S=T("feDisplacementMap",{in:"SourceGraphic",in2:"map",scale:g,xChannelSelector:"R",yChannelSelector:"G",result:"lens",...b}),N=T("feComposite",{in:"lens",in2:"map",operator:"in",result:"cut",...b}),w=T("feComposite",{in:"SourceGraphic",in2:"map",operator:"out",result:"rest"}),y=T("feComposite",{in:"cut",in2:"rest",operator:"over"}),P=[k,S,N];for(let p of[k,S,N,w,y])h.appendChild(p);f.appendChild(h),e.body.appendChild(f);let E=c.style.filter;c.style.filter=`url(#${xt})`;let x="",i=0,d=()=>{i=a.requestAnimationFrame(d);let p=s(),C=c.getBoundingClientRect(),v=Math.round(p.x-C.left-m.size/2),I=Math.round(p.y-C.top-m.size/2),Y=`${v},${I}`;if(Y!==x){x=Y;for(let K of P)K.setAttribute("x",String(v)),K.setAttribute("y",String(I))}};return i=a.requestAnimationFrame(d),{stop(){i&&a.cancelAnimationFrame(i),i=0,c.style.filter=E,f.remove()}}}var Ir=["a[href]","button",'input:not([type="hidden"])',"select","textarea","summary",'[role="button"]','[role="link"]','[role="checkbox"]','[role="radio"]','[role="switch"]','[role="tab"]','[role="menuitem"]','[role="option"]'].join(", "),Pr=61,Br=1400;function qr(e,t){let r=Math.PI*(3-Math.sqrt(5));return Array.from({length:e},(n,s)=>{let o=t*Math.sqrt((s+.5)/e);return[Math.cos(s*r)*o,Math.sin(s*r)*o]})}function kt(e,{diameter:t=38}={}){let r=e.defaultView,n=e.documentElement,s=t/2,o=qr(Pr,s),c=Math.ceil(t+3*2),g=e.createElement("canvas");g.width=c,g.height=c;let m=g.getContext("2d"),f=c/2;m&&(m.beginPath(),m.arc(f,f,s,0,Math.PI*2),m.fillStyle="rgba(17, 17, 17, 0.16)",m.fill(),m.lineWidth=2.5,m.strokeStyle="rgba(255, 255, 255, 0.9)",m.stroke(),m.lineWidth=1.25,m.strokeStyle="rgba(17, 17, 17, 0.85)",m.stroke(),m.beginPath(),m.arc(f,f,1.5,0,Math.PI*2),m.fillStyle="rgba(17, 17, 17, 0.85)",m.fill());let h=m?`url("${g.toDataURL("image/png")}") ${Math.round(f)} ${Math.round(f)}, auto`:"auto",T=e.createElement("style");T.dataset.pourAudit="filter",T.textContent=`
    html { cursor: ${h} !important; }
    :not(html) { cursor: inherit !important; }
    [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
  `,e.head.appendChild(T);let b=e.createElement("div");b.dataset.pourAudit="filter",b.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:2147483647;contain:strict;",e.body.appendChild(b);let k=()=>{let l=e.createElement("div");l.style.cssText="position:absolute;left:0;top:0;box-sizing:border-box;border-radius:3px;display:none;";let u=e.createElement("span");return u.style.cssText="position:absolute;left:-2px;bottom:100%;margin-bottom:3px;padding:1px 5px;border-radius:4px;font:600 11px/15px system-ui,-apple-system,sans-serif;font-variant-numeric:tabular-nums;white-space:nowrap;letter-spacing:0;",l.appendChild(u),b.appendChild(l),{el:l,chip:u}},S=[],N=k(),w=(l,u)=>{let R=e.elementFromPoint(l,u);for(;R?.shadowRoot;){let $=R.shadowRoot.elementFromPoint(l,u);if(!$||$===R)break;R=$}return R},y=l=>{for(let u=l;u;u=u.parentElement??u.getRootNode().host??null)if(u.nodeType===1){if(u.hasAttribute("data-pour-audit"))return null;if(u.matches(Ir))return u.matches(":disabled")?null:u}return null};function P(l,u){let R=new Map,$=0;for(let[M,V]of o){let G=y(w(l+M,u+V));G&&(R.set(G,(R.get(G)??0)+1),$++)}return[...R].map(([M,V])=>({el:M,share:V/$})).sort((M,V)=>V.share-M.share)}let E=(l,u,R)=>{let $=null,M=1/0;for(let V of l.getClientRects()){let G=Math.max(V.left-u,0,u-V.right),j=Math.max(V.top-R,0,R-V.bottom),Q=G*G+j*j;Q<M&&(M=Q,$=V)}return $??l.getBoundingClientRect()},x=(l,u,{border:R,halo:$,chipText:M,chipBg:V,chipFg:G})=>{Object.assign(l.el.style,{display:"block",transform:`translate(${Math.round(u.left-3)}px, ${Math.round(u.top-3)}px)`,width:`${Math.round(u.width+6)}px`,height:`${Math.round(u.height+6)}px`,border:`2px solid ${R}`,boxShadow:`0 0 0 1px ${$}`}),l.chip.style.display=M?"block":"none",l.chip.textContent=M??"",l.chip.style.background=V??"",l.chip.style.color=G??"";let j=u.top>22;l.chip.style.bottom=j?"100%":"auto",l.chip.style.top=j?"auto":"100%",l.chip.style.marginBottom=j?"3px":"0",l.chip.style.marginTop=j?"0":"3px"},i=-1,d=-1,p=!1,C=0;function v(){C=0;let l=p?P(i,d):[],u=l.length>1;for(;S.length<l.length;)S.push(k());let R=[];if(S.forEach(($,M)=>{let V=l[M];if(!V){$.el.style.display="none";return}let G=E(V.el,i,d);x($,G,u?{border:"#F59E0B",halo:"rgba(17,17,17,0.55)",chipText:`${Math.round(V.share*100)}%`,chipBg:"#F59E0B",chipFg:"#111"}:{border:"rgba(17,17,17,0.8)",halo:"rgba(255,255,255,0.9)"}),$.chip.style.left="-2px",R.push({b:$,r:G})}),u){let $=-1/0;for(let{b:M,r:V}of R.sort((G,j)=>G.r.left-j.r.left)){let G=Math.round(V.left-3),j=Math.max(G-2,$);M.chip.style.left=`${j-G}px`,$=j+M.chip.offsetWidth+3}}}let I=()=>{C||(C=r.requestAnimationFrame(v))},Y="mouse",K=null,q=0,_=l=>{Y=l.pointerType||"mouse",Y!=="touch"&&(i=l.clientX,d=l.clientY,p=!0,I())},X=l=>{l.relatedTarget||(p=!1,I())},O=l=>{if(Y=l.pointerType||"mouse",Y==="touch"||l.button!==0){K=null;return}K={shares:P(l.clientX,l.clientY),natural:y(w(l.clientX,l.clientY))}},B=l=>{let u=K;if(K=null,!u||!l.isTrusted||l.detail===0||Y==="touch"||!u.shares.length)return;let R=Math.random(),$=u.shares[u.shares.length-1].el;for(let M of u.shares)if(R-=M.share,R<=0){$=M.el;break}$!==u.natural&&(l.preventDefault(),l.stopImmediatePropagation(),x(N,E($,l.clientX,l.clientY),{border:"#111",halo:"rgba(255,255,255,0.9)",chipText:"The tap landed here",chipBg:"#111",chipFg:"#fff"}),r.clearTimeout(q),q=r.setTimeout(()=>{N.el.style.display="none"},Br),typeof $.focus=="function"&&$.focus({preventScroll:!0}),$.click())};return e.addEventListener("pointermove",_,{passive:!0}),e.addEventListener("pointerdown",O,!0),e.addEventListener("mouseout",X,{passive:!0}),r.addEventListener("click",B,!0),r.addEventListener("scroll",I,{passive:!0,capture:!0}),{stop(){e.removeEventListener("pointermove",_),e.removeEventListener("pointerdown",O,!0),e.removeEventListener("mouseout",X),r.removeEventListener("click",B,!0),r.removeEventListener("scroll",I,{capture:!0}),C&&r.cancelAnimationFrame(C),r.clearTimeout(q),b.remove(),T.remove()}}}var St=(e,t)=>[e.style.getPropertyValue(t),e.style.getPropertyPriority(t)],je=(e,t,[r,n])=>{r?e.style.setProperty(t,r,n):e.style.removeProperty(t)},zr=e=>e.transform!=="none"||e.translate!=="none"||e.rotate!=="none"||e.scale!=="none"||e.perspective!=="none"||e.filter!=="none"||(e.backdropFilter??"none")!=="none"||/paint|layout|strict|content/.test(e.contain)||/transform|perspective|filter/.test(e.willChange)||e.containerType&&e.containerType!=="normal";function Tt(e,{scale:t=4}={}){let r=e.defaultView,n=e.documentElement,s=e.scrollingElement||n,o=["transform","transform-origin","height"].map(l=>[l,St(n,l)]),a=r.innerWidth/2,c=r.innerHeight/2,g=0,m=0,f=new Map;n.style.setProperty("height","100%","important");function h(){n.style.removeProperty("transform"),g=Math.max(0,s.scrollWidth-r.innerWidth),m=Math.max(0,s.scrollHeight-r.innerHeight),n.style.setProperty("transform",`scale(${t})`,"important")}function T(){let l=r.scrollX,u=r.scrollY;n.style.setProperty("transform-origin",`${l+a}px ${u+c}px`,"important");for(let[R,{base:$}]of f)R.style.setProperty("translate",`calc(${$[0]} + ${l}px) calc(${$[1]} + ${u}px)`,"important")}function b(){let l=new Set;for(let u of e.body.getElementsByTagName("*")){if(u.hasAttribute("data-pour-audit"))continue;let R=r.getComputedStyle(u);if(R.position!=="fixed")continue;let $=!0;for(let M=u.parentElement;M&&M!==n;M=M.parentElement){if(l.has(M)){$=!1;break}if(!f.has(M)&&zr(r.getComputedStyle(M))){$=!1;break}}if($&&(l.add(u),!f.has(u))){let[M="0px",V="0px"]=R.translate==="none"?[]:R.translate.split(" ");f.set(u,{saved:St(u,"translate"),base:[M,V]})}}for(let[u,R]of f)l.has(u)||(je(u,"translate",R.saved),f.delete(u));T()}let k=()=>{let l=a*(1-1/t),u=c*(1-1/t);return{left:l,top:u,right:l+r.innerWidth/t,bottom:u+r.innerHeight/t}},S=l=>({left:a+(l.left-a)/t,top:c+(l.top-c)/t,right:a+(l.right-a)/t,bottom:c+(l.bottom-c)/t}),N=(l,u)=>l.left<u.right&&l.right>u.left&&l.top<u.bottom&&l.bottom>u.top,w=e.createElement("div");w.dataset.pourAudit="filter",w.setAttribute("popover","manual"),w.style.cssText="position:fixed;inset:0;width:auto;height:auto;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:none;z-index:2147483647;",e.body.appendChild(w);try{w.showPopover()}catch{}let y=new Map,P=l=>{let u=(l.getAttribute("aria-label")||l.textContent||l.getAttribute("alt")||"").replace(/\s+/g," ").trim();return u?u.length>38?`${u.slice(0,37)}\u2026`:u:l.tagName==="IMG"?"An image":"Something"};function E(l){y.has(l)&&y.get(l).remove();let u=e.createElement("div");if(u.style.cssText="position:absolute;left:0;top:0;display:flex;align-items:center;gap:6px;max-width:280px;padding:4px 9px 4px 6px;border-radius:6px;background:#111;color:#fff;box-shadow:0 0 0 1px rgba(255,255,255,0.9);font:600 12px/16px system-ui,-apple-system,sans-serif;white-space:nowrap;letter-spacing:0;",u.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg><span style="overflow:hidden;text-overflow:ellipsis"></span>',u.lastChild.textContent=`Changed out of view: ${P(l)}`,w.appendChild(u),y.set(l,u),y.size>6){let[R]=y.keys();y.get(R).remove(),y.delete(R)}i()}let x=0,i=()=>{!x&&y.size&&(x=r.requestAnimationFrame(d))};function d(){x=0;let l=r.innerWidth,u=r.innerHeight,R=k();for(let[$,M]of y){let V=$.isConnected&&$.checkVisibility?.({checkOpacity:!0,checkVisibilityCSS:!0})!==!1?$.getBoundingClientRect():null;if(!V||!V.width||!V.height||N(S(V),R)){M.remove(),y.delete($);continue}let G=(V.left+V.right)/2-l/2,j=(V.top+V.bottom)/2-u/2,Q=M.offsetWidth/2,oe=M.offsetHeight/2,ie=Math.min(G?(l/2-14-Q)/Math.abs(G):1/0,j?(u/2-14-oe)/Math.abs(j):1/0),ue=l/2+G*Math.min(ie,1e6),be=u/2+j*Math.min(ie,1e6);M.style.transform=`translate(${Math.round(ue-Q)}px, ${Math.round(be-oe)}px)`,M.firstChild.style.transform=`rotate(${Math.atan2(j,G)}rad)`}y.size&&(x=r.requestAnimationFrame(d))}let p=new Set,C=0,v=0;function I(){C=0;let l=p;p=new Set;let u=r.innerWidth,R=r.innerHeight,$={left:0,top:0,right:u,bottom:R},M=k();for(let V of l){if(!V.isConnected||V===e.body||V===n||V.closest("[data-pour-audit]")||V.checkVisibility?.({checkOpacity:!0,checkVisibilityCSS:!0})===!1)continue;let G=S(V.getBoundingClientRect()),j=G.right-G.left,Q=G.bottom-G.top;!j||!Q||j*Q>u*R*.5||N(G,$)&&!N(G,M)&&E(V)}}let Y=new r.MutationObserver(l=>{let u=!1;for(let R of l){let $=R.target.nodeType===1?R.target:R.target.parentElement;if(!(!$||$===n)&&!(R.type==="attributes"&&R.attributeName==="style"&&f.has($))&&!$.closest("[data-pour-audit]"))if(u=!0,R.type==="childList")for(let M of R.addedNodes)M.nodeType===1?p.add(M):M.nodeType===3&&M.textContent.trim()&&p.add($);else p.add($)}p.size&&!C&&(C=r.requestAnimationFrame(I)),u&&!v&&(v=r.setTimeout(()=>{v=0,h(),b()},300))}),K=0,q=(l,u)=>{a=Math.max(0,Math.min(r.innerWidth,l)),c=Math.max(0,Math.min(r.innerHeight,u)),K||(K=r.requestAnimationFrame(()=>{K=0,T(),i()}))},_=l=>q(l.clientX,l.clientY),X=l=>{let u=l.target;if(u?.nodeType!==1||u.closest("[data-pour-audit]"))return;let R=!1;try{R=u.matches(":focus-visible")}catch{R=!0}R&&r.requestAnimationFrame(()=>{let $=S(u.getBoundingClientRect());q(($.left+$.right)/2,($.top+$.bottom)/2)})},O=()=>{(r.scrollY>m||r.scrollX>g)&&r.scrollTo({left:Math.min(r.scrollX,g),top:Math.min(r.scrollY,m),behavior:"instant"}),T(),i()},B=()=>{h(),q(a,c),b()};return h(),b(),Y.observe(e.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeFilter:["class","style","hidden","open","aria-hidden"]}),e.addEventListener("pointermove",_,{passive:!0}),e.addEventListener("focusin",X,!0),r.addEventListener("scroll",O,{passive:!0}),r.addEventListener("resize",B),{stop(){Y.disconnect(),e.removeEventListener("pointermove",_),e.removeEventListener("focusin",X,!0),r.removeEventListener("scroll",O),r.removeEventListener("resize",B);for(let l of[x,C,K])l&&r.cancelAnimationFrame(l);r.clearTimeout(v);for(let[l,u]of f)je(l,"translate",u.saved);f.clear();for(let[l,u]of o)je(n,l,u);w.remove()}}}var At=`/* Overlay styles for the vision & sensory filters \u2014 ported from
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
`;function we(e){for(let t=e;t;t=t.parentElement??t.getRootNode?.().host??null)if(t.nodeType===1&&t.hasAttribute("data-pour-audit"))return!0;return!1}function Et(e,t,{ms:r=7e3,role:n="status"}={}){let s=e.defaultView,o=e.createElement("div");o.dataset.pourAudit="filter",o.setAttribute("role",n),o.textContent=t,Object.assign(o.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(460px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",textAlign:"left",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(o);let a=r?s.setTimeout(()=>o.remove(),r):0;return()=>{a&&s.clearTimeout(a),o.remove()}}function ke(e,{interactive:t=!1,zIndex:r="2147483647"}={}){let n=e.createElement("div");n.dataset.pourAudit="filter",n.setAttribute("aria-hidden",t?"false":"true"),n.style.cssText=`position:fixed;inset:0;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:${t?"auto":"none"};z-index:${r};width:auto;height:auto;max-width:none;max-height:none;color:inherit;`,n.setAttribute("popover","manual"),e.body.appendChild(n);try{n.showPopover()}catch{}return n}function*Se(e){let t=[e];for(;t.length;){let r=t.pop();if(r.nodeType===1){if(r.hasAttribute("data-pour-audit"))continue;yield r,r.shadowRoot&&t.push(r.shadowRoot)}let n=r.children??[];for(let s=n.length-1;s>=0;s--)t.push(n[s])}}function Ct(e,t){let r=e.createElement("style");return r.dataset.pourAudit="filter",r.textContent=t,e.head.appendChild(r),()=>r.remove()}function He(e){return!!(e.isSecureContext&&e.navigator?.mediaDevices?.getDisplayMedia)}async function Mt(e){let t=e.defaultView;if(!He(t))throw new Error("self capture unavailable");let r=await t.navigator.mediaDevices.getDisplayMedia({video:{displaySurface:"browser",frameRate:{ideal:30}},audio:!1,preferCurrentTab:!0,selfBrowserSurface:"include",surfaceSwitching:"exclude",systemAudio:"exclude"}),n=e.createElement("video");n.dataset.pourAudit="filter",n.muted=!0,n.playsInline=!0,n.autoplay=!0,n.style.cssText="position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none;",n.srcObject=r,e.body.appendChild(n),await n.play().catch(()=>{});let s=()=>{for(let o of r.getTracks())o.stop();n.srcObject=null,n.remove()};return r.getVideoTracks()[0]?.addEventListener("ended",s),{video:n,stream:r,stop:s}}var We=.55,_r=250,Gr=2e3,Lt=500,jr=4e3,Hr=1.5,Wr=.45,Yr=80,Xr='img, video, canvas, svg, picture, marquee, [class*="carousel" i], [class*="slide" i], [class*="marquee" i], [class*="ticker" i], [class*="parallax" i], [class*="swiper" i], [class*="slick" i]';function Ft(e,{decay:t=.86}={},r){let n=e.defaultView,s=r.container,o=n.performance;t=Math.min(.995,Math.max(.05,Number(t)||.86));let a=e.createElement("canvas");a.setAttribute("aria-hidden","true"),a.dataset.pourAudit="filter",a.dataset.pourAfterimages="trail",Object.assign(a.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none",opacity:String(We),mixBlendMode:"normal"}),s.appendChild(a);let c=a.getContext("2d"),g=[],m=q=>g.push(Et(e,q)),f=0,h=0,T=!1,b=null,k=!1,S=0,N=0,w=[],y=()=>{f=n.innerWidth,h=n.innerHeight,a.width=Math.max(1,f),a.height=Math.max(1,h),k=!1},P=q=>{S=0;let _=N?Math.min(100,q-N):16;N=q;let X=Math.pow(t,_/100);if(b){let{video:O}=b;if(O.readyState>=2&&O.videoWidth){let B=Math.max(0,(X-We)/(1-We));c.globalAlpha=k?1-B:1,c.drawImage(O,0,0,f,h),c.globalAlpha=1,k=!0}S=n.requestAnimationFrame(P);return}c.clearRect(0,0,f,h);for(let O=w.length-1;O>=0;O--){let B=w[O],l=Wr*Math.pow(t,(q-B.born)/100);if(l<.01){w.splice(O,1);continue}c.globalAlpha=l,c.fillStyle="#6b6b6b",c.fillRect(B.x,B.y,B.w,B.h),c.globalAlpha=Math.min(1,l*1.6),c.strokeStyle="#2a2a2a",c.lineWidth=1,c.strokeRect(B.x+.5,B.y+.5,Math.max(0,B.w-1),Math.max(0,B.h-1))}c.globalAlpha=1,w.length?S=n.requestAnimationFrame(P):N=0},E=()=>{!S&&!T&&(S=n.requestAnimationFrame(P))},x=()=>{y()};n.addEventListener("resize",x);let i=q=>q.bottom>0&&q.right>0&&q.top<h&&q.left<f&&(q.width>0||q.height>0),d=()=>{let q=[];try{q=e.getAnimations?.()??[]}catch{q=[]}return q.filter(_=>_.playState==="running"&&!(n.CSSTransition&&_ instanceof n.CSSTransition))},p=new Map,C=[],v=()=>{let q=[],_=new Set,X=l=>{!l||l.nodeType!==1||_.has(l)||we(l)||(_.add(l),q.push(l))};for(let l of d())X(l.effect?.target);let O=[],B=0;for(let l of Se(e.body)){if(++B>jr)break;l.matches(Xr)?X(l):O.push(l)}for(let l of O){if(q.length>=Lt)break;let u=l.getBoundingClientRect();u.width*u.height>=600&&i(u)&&X(l)}C=q.slice(0,Lt);for(let l of p.keys())_.has(l)||p.delete(l)},I=()=>{let q=o.now(),_=0;for(let X of C){if(!X.isConnected){p.delete(X);continue}let O=X.getBoundingClientRect(),B=p.get(X);p.set(X,O),!(!B||Math.max(Math.abs(O.left-B.left),Math.abs(O.top-B.top),Math.abs(O.width-B.width),Math.abs(O.height-B.height))<Hr||!(i(B)||i(O)))&&!b&&_<Yr&&B.width>0&&B.height>0&&(w.push({x:B.left,y:B.top,w:B.width,h:B.height,born:q}),_++)}_&&E()};y(),v();let Y=n.setInterval(I,_r),K=n.setInterval(v,Gr);return He(n)?Mt(e).then(q=>{if(T){q.stop();return}b=q,k=!1,w.length=0,E(),q.stream.getVideoTracks()[0]?.addEventListener("ended",()=>{T||b!==q||(b=null,k=!1,c.clearRect(0,0,f,h),m("Tab sharing ended, so only the elements that move are ghosted now."))})}).catch(()=>{T||m("Tab sharing was refused, so only the elements that move are ghosted.")}):m("This page cannot share its own pixels (Chromium on a secure page can), so only the elements that move are ghosted."),{stop(){if(!T){T=!0,S&&n.cancelAnimationFrame(S),S=0,n.clearInterval(Y),n.clearInterval(K),n.removeEventListener("resize",x);try{b?.stop()}catch{}b=null,a.remove();for(let q of g)q();g.length=0,p.clear(),C=[]}}}}var $t="__pourHearingRouting";function Dt(e){let t=e.AudioContext||e.webkitAudioContext;if(!t)return null;let r=e[$t]??={ctx:null,sources:new WeakMap};try{r.ctx??=new t}catch{return null}return r.ctx}var Me={loss:["none","mild","moderate","severe","noise","noisy"],implant:["none","implant4","implant8","implant16"]},Kr=[...Me.loss,...Me.implant,"age"],Ur={none:"None",mild:"Mild",moderate:"Moderate",severe:"Severe",profound:"Profound",noise:"Noise damage",noisy:"Noisy room",implant4:"4 channels",implant8:"8 channels",implant16:"16 channels"},Nt=4,Jr=.1,Qr=.5;function Zr(e){let t=Math.floor(e.sampleRate*Nt),r=e.createBuffer(1,t,e.sampleRate),n=r.getChannelData(0),s=0,o=0,a=0,c=0,g=0,m=0,f=0,h=0;for(let b=0;b<t;b++){let k=Math.random()*2-1;s=.99886*s+k*.0555179,o=.99332*o+k*.0750759,a=.969*a+k*.153852,c=.8665*c+k*.3104856,g=.55*g+k*.5329522,m=-.7616*m-k*.016898;let S=(s+o+a+c+g+m+f+k*.5362)*.11;f=k*.115926,n[b]=S,h+=S*S}let T=Jr/Math.sqrt(h/t||1);for(let b=0;b<t;b++)n[b]*=T;return r}function ne(e,t,r,n=0,s=.707){let o=e.createBiquadFilter();return o.type=t,o.frequency.value=r,o.gain.value=n,o.Q.value=s,o}var en={1e3:{m:[702e-6,2.494],f:[221e-6,2.805]},2e3:{m:[.00156,2.404],f:[312e-6,2.792]},4e3:{m:[.0034,2.325],f:[737e-6,2.66]}};function tn(e){let t=Math.max(0,e-18),r=n=>{let{m:s,f:o}=en[n];return(s[0]*t**s[1]+o[0]*t**o[1])/2};return{h1k:r(1e3),h2k:r(2e3),h4k:r(4e3)}}function Rt(e){let r=new Float32Array(2048);for(let s=0;s<2048;s++){let o=s/2047*2-1;r[s]=Math.sign(o)*Math.abs(o)**1.6}let n=e.createWaveShaper();return n.curve=r,n.oversample="2x",n}function rn(e){let t=Math.floor(e.sampleRate*Nt),r=e.createBuffer(1,t,e.sampleRate),n=r.getChannelData(0);for(let o=0;o<t;o++)n[o]=Math.random()*2-1;let s=e.createBufferSource();s.buffer=r,s.loop=!0;try{s.start()}catch{}return s}function nn(e,t){let r=e.createGain(),n=e.createGain();n.gain.value=4.5;let s=rn(e),o=[r,n,s],a=200,c=7e3,g=new Float32Array(1024);for(let m=0;m<1024;m++)g[m]=Math.abs(m/1023*2-1);for(let m=0;m<t;m++){let f=a*(c/a)**(m/t),h=a*(c/a)**((m+1)/t),T=Math.sqrt(f*h),b=T/(h-f),k=ne(e,"bandpass",T,0,b),S=e.createWaveShaper();S.curve=g;let N=ne(e,"lowpass",160),w=ne(e,"bandpass",T,0,b),y=e.createGain();y.gain.value=0,r.connect(k),k.connect(S),S.connect(N),N.connect(y.gain),s.connect(w),w.connect(y),y.connect(n),o.push(k,S,N,w,y)}return{input:r,output:n,nodes:o,stop(){try{s.stop()}catch{}}}}function an(e,t,r=45){if(/^implant\d+$/.test(t))return[nn(e,Number(t.slice(7)))];switch(t){case"none":return[];case"profound":{let n=e.createGain();return n.gain.value=0,[n]}case"noise":return[ne(e,"peaking",4e3,-30,2.5),ne(e,"highshelf",6500,-12),Rt(e)];case"age":{let{h1k:n,h2k:s,h4k:o}=tn(r);return[ne(e,"highshelf",1e3,-n),ne(e,"highshelf",1500,-(s-n)),ne(e,"highshelf",3e3,-(o-s)),ne(e,"lowpass",5e3),Rt(e)]}case"mild":return[ne(e,"highshelf",3e3,-15)];case"severe":{let n=e.createGain();return n.gain.value=.5,[ne(e,"lowpass",800),ne(e,"lowpass",800),ne(e,"highshelf",800,-45),n]}case"moderate":case"noisy":default:return[ne(e,"highshelf",1500,-25),ne(e,"lowpass",4e3)]}}var Ye=e=>e.nodeType===1&&(e.tagName==="AUDIO"||e.tagName==="VIDEO");function Le(e,{audiogram:t="moderate",frame:r=!1,hearingAge:n=45,picker:s="loss"}={}){let o=Me[s]??Me.loss,a=e.defaultView,c=t==="age",g=r||c,m="pour-hearing-v1",f=()=>{for(let A=0;A<a.frames.length;A++)try{a.frames[A].postMessage({[m]:{setting:b,age:n}},"*")}catch{}},h=A=>{let L=A.data?.[m];if(!L)return;if(L.hello&&A.source){try{A.source.postMessage({[m]:{setting:b,age:n}},"*")}catch{}return}if(!r)return;let W=L.setting==="age"?"age":Kr.includes(L.setting)?L.setting:null;if(!W)return;let pe=Number(L.age);W===b&&(W!=="age"||pe===n)||(b=W,Number.isFinite(pe)&&(n=pe),p(),f())};a.addEventListener("message",h);let T=a.AudioContext||a.webkitAudioContext,b=c?"age":o.includes(t)?t:o[1],k=new Set,S=[],N=null,w=T?a[$t]??={ctx:null,sources:new WeakMap}:null,y=null;if(w)try{w.ctx??=new T,y=w.ctx}catch{y=null}let P=null,E=null,x=[],i=null,d=null;y&&(P=y.createGain(),E=y.createGain(),E.connect(y.destination),w.input=P,w.output=E);function p(){if(!y)return;for(let L of x)if(L.nodes){for(let W of L.nodes)W.disconnect();L.stop?.()}else L.disconnect();P.disconnect(),x=an(y,b,n);let A=P;for(let L of x)A.connect(L.input??L),A=L.output??L;if(A.connect(E),b==="noisy"&&!i){d=y.createGain(),d.gain.value=0,d.connect(P),i=y.createBufferSource(),i.buffer=Zr(y),i.loop=!0,i.connect(d);try{i.start()}catch{}}v()}let C=new Set;function v(){if(!d)return;let A=b==="noisy"&&C.size?Qr:0;d.gain.setTargetAtTime(A,y.currentTime,.02)}let I=!!(y&&y.state!=="running"),Y=()=>{if(!y||y.state==="running"){q();return}y.resume().then(()=>{q(),ie()}).catch(()=>{})},K=["click","keydown","pointerdown","touchend"];function q(){if(I){I=!1;for(let A of K)e.removeEventListener(A,Y,!0);N?.(),N=null}}if(I){for(let A of K)e.addEventListener(A,Y,!0);g||(N=G("The sound routes through the audiogram after the next click or key press: the browser starts audio only on a gesture.")),Y()}let _=new Map,X=new Set,O=a.location.origin;function B(A){let L=A.currentSrc||A.getAttribute("src")||"";if(!L)return!1;let W;try{W=new URL(L,e.baseURI)}catch{return!1}return W.protocol==="blob:"||W.protocol==="data:"||W.origin===O?!1:A.crossOrigin===null||A.crossOrigin===void 0}function l(A){let L=_.get(A);if(!L||X.has(A)||!y)return;if(!A.currentSrc&&!A.srcObject&&!A.getAttribute("src")){if(L.status="no source yet",!L.listening){L.listening=!0;let pe=()=>{L.listening=!1,l(A),ie()};A.addEventListener("loadedmetadata",pe,{once:!0}),S.push(()=>A.removeEventListener("loadedmetadata",pe))}return}if(B(A)){L.status="cannot be routed here",L.why="cross-origin media without CORS headers";return}let W=w.sources.get(A);if(W)try{W.disconnect()}catch{}else try{W=y.createMediaElementSource(A),w.sources.set(A,W)}catch{L.status="cannot be routed here",L.why="already in the page's own audio graph";return}W.connect(P),X.add(A),L.status=I?"routed, waiting for a click":"routed"}function u(A){let L=w?.sources.get(A);if(L){try{L.disconnect()}catch{}try{L.connect(y.destination)}catch{}}}let R=ke(e,{interactive:!0});R.style.pointerEvents="none";let $=e.createElement("div");$.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:max-content;max-width:min(520px, calc(100vw - 32px));pointer-events:none;z-index:2147483647;";let M=e.createElement("div");M.setAttribute("role","status"),M.hidden=!0,M.style.cssText="padding:8px 12px;border-radius:8px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;text-align:left;box-shadow:0 4px 16px rgba(0,0,0,0.3);max-width:100%;box-sizing:border-box;";let V=0,G=(A,L=9e3)=>(a.clearTimeout(V),M.textContent=A,M.hidden=!1,V=a.setTimeout(()=>{M.hidden=!0},L),()=>{a.clearTimeout(V),M.hidden=!0}),j=e.createElement("div");j.setAttribute("role","group"),j.setAttribute("aria-label","Hearing loss setting"),j.style.cssText="display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:6px;border-radius:10px;max-width:100%;box-sizing:border-box;background:#1B1D22;box-shadow:0 4px 16px rgba(0,0,0,0.3);pointer-events:auto;font:500 13px/1 system-ui,sans-serif;";let Q=new Map;for(let A of o){let L=e.createElement("button");L.type="button",L.textContent=Ur[A],L.style.cssText="appearance:none;border:0;border-radius:6px;padding:7px 9px;font:inherit;cursor:pointer;background:transparent;color:#FCFCFC;white-space:nowrap;",L.addEventListener("click",()=>{b=A,p(),oe(),f()}),j.appendChild(L),Q.set(A,L)}let oe=()=>{for(let[A,L]of Q){let W=A===b;L.setAttribute("aria-pressed",W?"true":"false"),L.style.background=W?"#FFD60A":"transparent",L.style.color=W?"#1B1D22":"#FCFCFC"}};if($.append(M,j),g||R.appendChild($),oe(),!y&&!g&&(N=G("This browser has no Web Audio, so the media plays as it is.")),r)try{a.parent.postMessage({[m]:{hello:!0}},"*")}catch{}function ie(){for(let[A,L]of _)X.has(A)&&(L.status=I?"routed, waiting for a click":"routed")}function ue(A){_.has(A)||we(A)||(_.set(A,{status:y?"not routed":"no Web Audio"}),A.paused||C.add(A),l(A))}let be=A=>{for(let L of Se(A))Ye(L)&&ue(L)};be(e.body);let Te=A=>{let L=A.target;if(!Ye(L)||we(L))return;_.has(L)||ue(L);let W=_.get(L);C.add(L),v(),Ae()},ce=A=>{Ye(A.target)&&(C.delete(A.target),v())};e.addEventListener("play",Te,!0),e.addEventListener("pause",ce,!0),e.addEventListener("ended",ce,!0),e.addEventListener("emptied",ce,!0);let fe=new Set,se=0,he=0,Ae=()=>{he||(he=a.setTimeout(()=>{he=0,ie()},100))},ye=new a.MutationObserver(A=>{for(let L of A)for(let W of L.addedNodes)W.nodeType===1&&!we(W)&&fe.add(W);fe.size&&!se&&(se=a.requestAnimationFrame(()=>{se=0;let L=fe;fe=new Set;for(let W of L)W.isConnected&&be(W);Ae()}))});return ye.observe(e.body,{childList:!0,subtree:!0}),p(),ie(),!g&&!_.size&&e.querySelector("iframe")&&(N?.(),N=G("The only video here is inside an embedded frame. The extension routes it from within that frame; the bookmarklet and the command line cannot reach it.")),{setAge(A){c&&(n=Math.max(0,Number(A)||0),p(),f())},stop(){ye.disconnect(),q(),se&&a.cancelAnimationFrame(se),se=0,a.clearTimeout(he),he=0;for(let A of k)a.clearInterval(A);k.clear();for(let A of S)try{A()}catch{}S.length=0,e.removeEventListener("play",Te,!0),e.removeEventListener("pause",ce,!0),e.removeEventListener("ended",ce,!0),e.removeEventListener("emptied",ce,!0);for(let A of X)u(A);if(X.clear(),y){try{i?.stop()}catch{}i?.disconnect(),d?.disconnect(),i=null,d=null;for(let A of x)A.disconnect();x=[],P?.disconnect(),E?.disconnect(),w.input===P&&(w.input=null,w.output=null)}a.removeEventListener("message",h),N?.(),N=null;try{R.hidePopover()}catch{}R.remove(),_.clear()}}}var Ke=20,Fe=90,on=14,Xe=65,Ot=[[20,"Nothing has changed yet."],[32,"The lens has begun to yellow, too slowly to notice."],[40,"Near focus starts to shorten; the phone moves further away."],[45,"Small text at reading distance is blurring (presbyopia)."],[50,"Contrast sensitivity for fine detail has begun to fall."],[55,"The pupil lets in about four fifths of the light it did at twenty."],[60,"Near focus is gone without glasses, and the highs of speech are softening."],[65,"One in twenty over sixty-five has an essential tremor; the pointer shows it."],[70,"A little over half the light reaches the retina compared with twenty."],[75,"Grey text on white is fading into its background; consonants are half gone."],[80,"Scatter in the lens veils the page; drawn here as a blur."],[85,"Only strong contrast and large targets are still easy."],[90,"The page as the oldest readers receive it."]],Ee=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],Ue=e=>e<=60?1+.02*(e-32):1.56+.0667*(e-60),It=Ue(20),sn=Ue(90);function Pt(e){let t=Math.max(Ke,Math.min(Fe,e)),r=Ue(t)-It,n=.45*r/(sn-It),s=1+(t/70)**4-(1+(20/70)**4),o=1+(90/70)**4-(1+(20/70)**4),a=.9*s/o,g=((3.36-.0102*(t-20))/3.36)**2,m=10**(-.1*r),f=Math.sqrt(g*m),h=10**(-.08*Math.max(0,t-50)/10),T=Math.max(0,15-.25*t),k=Math.min(2.5,Math.max(0,2.5-.5*T))/2,S=t<Xe?0:4+8*(t-Xe)/(Fe-Xe);return{age:t,sepia:n,scatterBlur:a,brightness:f,contrast:h,nearBlur:k,tremor:S}}function Bt(e,{start:t=45,frame:r=!1}={},n={}){let s=e.defaultView,o=e.documentElement,a=n.container,c=[],g=!1,m=Math.max(Ke,Math.min(Fe,Number(t)||45)),f=Le(e,{audiogram:"age",hearingAge:m,frame:r});if(c.push(()=>f.stop()),r)return{stop(){if(!g){g=!0;for(let O of c.reverse())try{O()}catch{}}}};let h=ke(e);c.push(()=>{try{h.hidePopover()}catch{}h.remove()});let T=e.createElement("div");T.setAttribute("role","group"),T.setAttribute("aria-label","Age"),T.style.cssText="position:absolute;left:50%;bottom:16px;transform:translateX(-50%);pointer-events:auto;width:min(360px, calc(100vw - 32px));padding:10px 14px 12px;border-radius:10px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,0.3);";let b=e.createElement("div");b.style.cssText="display:flex;justify-content:space-between;align-items:baseline;gap:8px;";let k=e.createElement("span");k.textContent="Age";let S=e.createElement("span");S.textContent="approximation",S.title="Population averages from the cited studies; any one reader sits above or below them.",S.style.cssText="margin-left:8px;padding:0 6px;border:1px solid rgba(247,248,248,0.25);border-radius:999px;font-size:9px;font-weight:640;letter-spacing:0.07em;text-transform:uppercase;color:#B6BAC2;vertical-align:1px;",k.appendChild(S);let N=e.createElement("output");N.style.cssText="font-weight:650;font-size:18px;color:#FFD60A;font-variant-numeric:tabular-nums;",b.append(k,N);let w=e.createElement("input");w.type="range",w.min=String(Ke),w.max=String(Fe),w.step="1",w.value=String(m),w.setAttribute("aria-label","Age"),w.style.cssText="display:block;width:100%;margin:6px 0 4px;accent-color:#FFD60A;cursor:pointer;";let y=e.createElement("div");y.setAttribute("aria-live","polite"),y.style.cssText="color:#D7D9DE;line-height:1.45;height:2.9em;overflow:hidden;",T.append(b,w,y),h.appendChild(T);let P=a?{filter:a.style.filter,backdrop:a.style.backdropFilter,webkit:a.style.webkitBackdropFilter}:null,E=e.createElement("style");E.dataset.pourAudit="filter",e.head.appendChild(E),c.push(()=>E.remove());let x=[];(()=>{let O=0;for(let B of Se(e.body??o)){if(O>4e3)break;O++;let l=!1;for(let R of B.childNodes)if(R.nodeType===3&&R.nodeValue.trim()){l=!0;break}!l||!(parseFloat(s.getComputedStyle(B).fontSize)<on)||(B.setAttribute("data-pour-age-small",""),x.push(B))}})(),c.push(()=>{for(let O of x)O.removeAttribute("data-pour-age-small");x.length=0});let d=o.style.cursor,p=new Map,C=(O,B)=>{let l=`${O}:${B}`,u=p.get(l);if(u)return u;let R=64,$=e.createElement("canvas");$.width=R,$.height=R;let M=$.getContext("2d");if(!M)return"auto";let V=R/2;M.save(),M.translate(V+O,V+B),M.scale(1.15,1.15),M.beginPath(),M.moveTo(Ee[0][0],Ee[0][1]);for(let j=1;j<Ee.length;j++)M.lineTo(Ee[j][0],Ee[j][1]);M.closePath(),M.restore(),M.lineWidth=3,M.lineJoin="round",M.strokeStyle="#fff",M.stroke(),M.fillStyle="#000",M.fill();let G=`url("${$.toDataURL("image/png")}") ${V} ${V}, auto`;return p.set(l,G),G},v=null,I=0,Y=O=>{I=s.requestAnimationFrame(Y);let B=Pt(m).tremor,l=2*Math.PI*6*(O/1e3),u=Math.round((Math.sin(l)*.7+Math.sin(l*1.63+1.1)*.3)*B),R=Math.round((Math.cos(l*.97+.6)*.7+Math.sin(l*2.11+2.3)*.3)*B);o.style.cursor=C(u,R)},K=O=>{O&&!I?(v=Ct(e,":not(html) { cursor: inherit !important; } [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }"),I=s.requestAnimationFrame(Y)):!O&&I&&(s.cancelAnimationFrame(I),I=0,v?.(),v=null,o.style.cursor=d)};c.push(()=>K(!1));let q=O=>{let B=Ot[0][1];for(let[l,u]of Ot)O>=l&&(B=u);return B},_=()=>{let O=Pt(m);N.textContent=String(O.age),y.textContent=q(O.age);let B=`sepia(${O.sepia.toFixed(3)}) brightness(${O.brightness.toFixed(3)}) contrast(${O.contrast.toFixed(3)})${O.scatterBlur>.02?` blur(${O.scatterBlur.toFixed(2)}px)`:""}`;a&&(a.style.filter=B,a.style.backdropFilter=B,a.style.webkitBackdropFilter=B),E.textContent=O.nearBlur>.02?`[data-pour-age-small] { filter: blur(${O.nearBlur.toFixed(2)}px) !important; }`:"",K(O.tremor>0),f.setAge(O.age)},X=()=>{m=Number(w.value)||m,_()};return w.addEventListener("input",X),c.push(()=>w.removeEventListener("input",X)),_(),c.push(()=>{a&&P&&(a.style.filter=P.filter,a.style.backdropFilter=P.backdrop,a.style.webkitBackdropFilter=P.webkit)}),{stop(){if(!g){g=!0;for(let O of c.reverse())try{O()}catch{}c.length=0}}}}var qt=[4e3,6e3,8e3],Je={quiet:.012,loud:.045};function ln(e,{kind:t="tone",pitch:r=6e3,level:n="quiet"}={}){let s=e.createGain();s.gain.value=0;let o=e.createOscillator();o.type="sine",o.frequency.value=r;let a=e.createGain();o.connect(a),a.connect(s);let c=Math.floor(e.sampleRate*2),g=e.createBuffer(1,c,e.sampleRate),m=g.getChannelData(0);for(let k=0;k<c;k++)m[k]=Math.random()*2-1;let f=e.createBufferSource();f.buffer=g,f.loop=!0;let h=e.createBiquadFilter();h.type="bandpass",h.frequency.value=r,h.Q.value=12;let T=e.createGain();f.connect(h),h.connect(T),T.connect(s);try{o.start(),f.start()}catch{}let b=(k,S,N)=>{let w=e.currentTime;o.frequency.setTargetAtTime(S,w,.02),h.frequency.setTargetAtTime(S,w,.02);let y=Je[N]??Je.quiet;a.gain.setTargetAtTime(k==="tone"?y:0,w,.02),T.gain.setTargetAtTime(k==="hiss"?y*6:0,w,.02),s.gain.setTargetAtTime(1,w,.05)};return b(t,r,n),{output:s,set:b,stop(){s.gain.setTargetAtTime(0,e.currentTime,.02);try{o.stop(e.currentTime+.2),f.stop(e.currentTime+.2)}catch{}setTimeout(()=>{s.disconnect()},400)}}}function zt(e,{pitch:t=6e3,kind:r="tone",level:n="quiet"}={}){let s=e.defaultView,o=Dt(s),a={kind:r,pitch:qt.includes(t)?t:6e3,level:Je[n]?n:"quiet"},c=null;o&&(c=ln(o,a),c.output.connect(o.destination));let g=ke(e,{interactive:!0});g.style.pointerEvents="none";let m=e.createElement("div");m.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:max-content;max-width:min(520px, calc(100vw - 32px));pointer-events:none;z-index:2147483647;";let f=e.createElement("div");f.setAttribute("role","status"),f.hidden=!0,f.style.cssText="padding:8px 12px;border-radius:8px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;text-align:left;box-shadow:0 4px 16px rgba(0,0,0,0.3);max-width:100%;box-sizing:border-box;";let h=e.createElement("div");h.setAttribute("role","group"),h.setAttribute("aria-label","Tinnitus setting"),h.style.cssText="display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:6px;border-radius:10px;max-width:100%;box-sizing:border-box;background:#1B1D22;box-shadow:0 4px 16px rgba(0,0,0,0.3);pointer-events:auto;font:500 13px/1 system-ui,sans-serif;";let T=[],b=(i,d,p)=>{let C=e.createElement("button");C.type="button",C.textContent=i,C.style.cssText="appearance:none;border:0;border-radius:6px;padding:7px 9px;font:inherit;cursor:pointer;background:transparent;color:#FCFCFC;white-space:nowrap;",C.addEventListener("click",()=>{p(),k()}),T.push({b:C,isOn:d}),h.appendChild(C)};b("Tone",()=>a.kind==="tone",()=>{a.kind="tone"}),b("Hiss",()=>a.kind==="hiss",()=>{a.kind="hiss"});for(let i of qt)b(`${i/1e3} kHz`,()=>a.pitch===i,()=>{a.pitch=i});b("Quiet",()=>a.level==="quiet",()=>{a.level="quiet"}),b("Loud",()=>a.level==="loud",()=>{a.level="loud"});let k=()=>{for(let{b:i,isOn:d}of T){let p=d();i.setAttribute("aria-pressed",p?"true":"false"),i.style.background=p?"#FFD60A":"transparent",i.style.color=p?"#1B1D22":"#FCFCFC"}c?.set(a.kind,a.pitch,a.level)};m.append(f,h),g.appendChild(m),k();let S=0,N=(i,d=9e3)=>{s.clearTimeout(S),f.textContent=i,f.hidden=!1,S=s.setTimeout(()=>{f.hidden=!0},d)};o||N("This browser has no Web Audio, so there is no sound to add.");let w=["click","keydown","pointerdown","touchend"],y=!!(o&&o.state!=="running"),P=()=>{if(y){y=!1;for(let i of w)e.removeEventListener(i,E,!0);f.hidden=!0}},E=()=>{if(!o||o.state==="running"){P();return}o.resume().then(P).catch(()=>{})};if(y){for(let i of w)e.addEventListener(i,E,!0);N("The sound starts after the next click or key press: the browser starts audio only on a gesture."),E()}let x=!1;return{stop(){if(!x){x=!0,P(),s.clearTimeout(S),c?.stop(),c=null;try{g.hidePopover()}catch{}g.remove()}}}}var Re={afterimages:Ft,ageSlider:Bt,hearingLoss:Le,tinnitus:zt};function Vt(e=document){let t=e.defaultView,r=e.documentElement,n=xe(e),s=lt(e,n),o=null,a=null,c=null,g=null,m=null,f=null,h=null,T=null,b=null,k="none",S="none",N=0,w=0,y=0,P=0,E=null;function x(){if(e.getElementById("pour-filter-styles"))return;let F=e.createElement("style");F.id="pour-filter-styles",F.dataset.pourAudit="filter",F.textContent=At,e.head.appendChild(F)}function i(){if(e.getElementById("pour-vision-filter-defs"))return;let F="http://www.w3.org/2000/svg",D=e.createElementNS(F,"svg");D.setAttribute("id","pour-vision-filter-defs"),D.setAttribute("width","0"),D.setAttribute("height","0"),D.setAttribute("focusable","false"),D.setAttribute("aria-hidden","true"),D.dataset.pourAudit="filter",D.style.position="absolute",D.style.pointerEvents="none";let H=e.createElementNS(F,"defs");for(let[z,te]of Object.entries(Oe)){let Z=e.createElementNS(F,"filter");Z.setAttribute("id",`pour-vision-filter-${z}`),Z.setAttribute("color-interpolation-filters","linearRGB");let U=e.createElementNS(F,"feColorMatrix");U.setAttribute("type","matrix"),U.setAttribute("values",te),Z.appendChild(U),H.appendChild(Z)}D.appendChild(H),e.body.appendChild(D)}let d=F=>{let D=e.createElement("div");return D.className=F,D.dataset.pourAudit="filter",e.body.appendChild(D),D};function p(){y=0,r.style.setProperty("--pour-vision-x",`${N}px`),r.style.setProperty("--pour-vision-y",`${w}px`),r.style.setProperty("--pour-vision-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function C(F){N=F.clientX,w=F.clientY,y||(y=t.requestAnimationFrame(p))}function v(F){let D=F.touches[0];D&&C(D)}function I(F,D=null){for(let z of Ie)r.classList.remove(`pour-vision-filter-${z}`);Pe.has(k)&&(e.removeEventListener("mousemove",C),e.removeEventListener("touchmove",v)),a?.stop(),a=null,c?.stop(),c=null;try{h?.stop()}catch{}if(h=null,o?.remove(),o=null,k=me[F]!==void 0?F:"none",k==="none"){S==="none"&&(r.style.filter="");return}S!=="none"&&ye("none"),x(),i();let H=me[k]||"none";if(r.style.filter=H==="none"?"":H,Ie.has(k)){r.classList.add(`pour-vision-filter-${k}`),o=d("pour-vision-filter-overlay"),o.dataset.filter=k,k==="floaters"&&(a=ut(e,o)),k==="glossyScreen"&&(c=ft(e,o));let z=et[k];z&&Re[z.driver]&&(h=Re[z.driver](e,{...z.options??{},...D??{}},{kit:n,container:o,lenses:s}))}Pe.has(k)&&(N=t.innerWidth/2,w=t.innerHeight/2,p(),e.addEventListener("mousemove",C),e.addEventListener("touchmove",v,{passive:!0}))}function Y(){P=0,r.style.setProperty("--pour-sensory-x",`${N}px`),r.style.setProperty("--pour-sensory-y",`${w}px`),r.style.setProperty("--pour-sensory-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function K(F){N=F.clientX,w=F.clientY,P||(P=t.requestAnimationFrame(Y))}function q(F){let D=F.touches[0];D&&K(D)}function _(F){if(e.getElementById("pour-sensory-injected-style")?.remove(),!F)return;let D=e.createElement("style");D.id="pour-sensory-injected-style",D.dataset.pourAudit="filter",D.textContent=F,e.head.appendChild(D)}function X(){if(e.querySelector(".pour-sensory-washout-char"))return;let F=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null),D=[];for(;F.nextNode();)D.push(F.currentNode);for(let H of D){let z=H.textContent;if(!z.trim())continue;let te=H.parentElement;if(!te||te.closest("script,style,noscript,[data-pour-audit]"))continue;let Z=e.createDocumentFragment();for(let U of z)if(U===" "||U===`
`||U==="	")Z.appendChild(e.createTextNode(U));else{let ae=e.createElement("span");ae.textContent=U,ae.style.opacity=(.3+Math.random()*.7).toFixed(2),ae.className="pour-sensory-washout-char",Z.appendChild(ae)}te.replaceChild(Z,H)}}function O(){for(let F of e.querySelectorAll(".pour-sensory-washout-char"))F.replaceWith(F.textContent);e.body.normalize()}let B=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],l=new Map,u=0,R=0,$=null,M=0,V=0,G=0,j=0,Q=0,oe=0;function ie(F,D,H){let z=`${F}:${D}:${H}`,te=l.get(z);if(te)return te;let Z=e.createElement("canvas");Z.width=F,Z.height=F;let U=Z.getContext("2d");if(!U)return"auto";let ae=Math.round(F/2);U.save(),U.translate(ae+D,ae+H),U.scale(1.15,1.15),U.beginPath(),U.moveTo(B[0][0],B[0][1]);for(let de=1;de<B.length;de++)U.lineTo(B[de][0],B[de][1]);U.closePath(),U.restore(),U.lineWidth=3,U.lineJoin="round",U.strokeStyle="#fff",U.stroke(),U.fillStyle="#000",U.fill();let le=`url("${Z.toDataURL("image/png")}") ${ae} ${ae}, auto`;return l.set(z,le),le}function ue(F){let D=F.timeStamp||Date.now(),H=D-G;if(G&&H>0){let z=Math.hypot(F.clientX-M,F.clientY-V);j=j*.8+z/H*1e3*.2}M=F.clientX,V=F.clientY,G=D}function be(F,D){if(!Q)return Q=F+D.minGap+Math.random()*(D.maxGap-D.minGap),[0,0];let H=F-Q;if(H<0)return[0,0];if(H>D.dur)return Q=F+D.minGap+Math.random()*(D.maxGap-D.minGap),oe=Math.random()*Math.PI*2,[0,0];let z=1-H/D.dur,te=D.size*z*z;return[Math.cos(oe)*te,Math.sin(oe)*te]}function Te(F){u=t.requestAnimationFrame(Te);let D=$;if(!D)return;let H=(F-R)/1e3,z=0,te=0;if(D.freq&&D.amp){let le=2*Math.PI*D.freq,de=Math.max(0,1+(D.intent||0)*Math.min(1,j/700)),Ze=D.amp*de;z+=(Math.sin(le*H)*.7+Math.sin(le*1.63*H+1.1)*.3)*Ze,te+=(Math.cos(le*.97*H+.6)*.7+Math.sin(le*2.11*H+2.3)*.3)*Ze}if(D.spasm){let[le,de]=be(F,D.spasm);z+=le,te+=de}let Z=D.bitmap/2-14,U=Math.max(-Z,Math.min(Z,Math.round(z))),ae=Math.max(-Z,Math.min(Z,Math.round(te)));r.style.cursor=ie(D.bitmap,U,ae)}function ce(F){fe(),$=F,R=t.performance?t.performance.now():Date.now(),j=0,G=0,Q=0,oe=Math.random()*Math.PI*2,se(F.hide?`
      html, :not(html) { cursor: none !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `:`
      :not(html) { cursor: inherit !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `),!F.hide&&(e.addEventListener("mousemove",ue,{passive:!0}),u=t.requestAnimationFrame(Te))}function fe(){u&&t.cancelAnimationFrame(u),u=0,$=null,Q=0,e.removeEventListener("mousemove",ue),se(null),r.style.cursor=""}function se(F){if(e.getElementById("pour-sensory-cursor-style")?.remove(),!F)return;let D=e.createElement("style");D.id="pour-sensory-cursor-style",D.dataset.pourAudit="filter",D.textContent=F,e.head.appendChild(D)}function he(){Ae();let F=()=>{E=t.setTimeout(()=>{b&&(b.classList.add("pour-sensory-spike-flash"),t.setTimeout(()=>{b?.classList.remove("pour-sensory-spike-flash"),F()},150))},3e3+Math.random()*8e3)};F()}function Ae(){E&&(t.clearTimeout(E),E=null)}function ye(F,D=null){let H=ve[S];H?.overlay&&r.classList.remove(`pour-sensory-filter-${S}`),H?.hostClass&&r.classList.remove(H.hostClass),H?.mouseTracked&&(e.removeEventListener("mousemove",K),e.removeEventListener("touchmove",q)),H?.injectScript&&O(),H?.cursorJitter&&fe(),H?.viewportOrigin&&Wt(),H?.loupe&&Qe(),H?.lens&&s[H.lens]?.remove(),g?.stop(),g=null,m?.stop(),m=null,f?.stop(),f=null;try{T?.stop()}catch{}if(T=null,Ae(),b?.remove(),b=null,_(null),S=ve[F]?F:"none",S==="none"){k==="none"&&(r.style.filter="");return}k!=="none"&&I("none"),x();let z=ve[S];r.style.filter=z.css&&z.css!=="none"?z.css:"",z.hostClass&&r.classList.add(z.hostClass),(z.overlay||z.mouseTracked||S==="sensorySpike")&&(b=d("pour-sensory-filter-overlay"),b.dataset.filter=S,z.overlay&&r.classList.add(`pour-sensory-filter-${S}`)),z.mouseTracked&&(N=t.innerWidth/2,w=t.innerHeight/2,Y(),e.addEventListener("mousemove",K),e.addEventListener("touchmove",q,{passive:!0})),z.injectCSS&&_(z.injectCSS),S==="sensorySpike"&&he(),z.injectScript&&X(),z.cursorJitter&&ce(z.cursorJitter),z.viewportOrigin&&pe(),z.loupe&&Yt(z.loupe),z.lens&&s[z.lens]?.apply(),z.forcedColours&&(g=vt(e)),z.fingertip&&(m=kt(e,z.fingertip)),z.magnifier&&(f=Tt(e,z.magnifier)),z.driver&&Re[z.driver]&&(T=Re[z.driver](e,{...z.options??{},...D??{}},{kit:n,container:b,lenses:s}))}let A=0;function L(){A=0,r.style.setProperty("--pour-motion-origin",`${t.scrollX+t.innerWidth/2}px ${t.scrollY+t.innerHeight/2}px`)}function W(){A||(A=t.requestAnimationFrame(L))}function pe(){L(),t.addEventListener("scroll",W,{passive:!0}),t.addEventListener("resize",W)}function Wt(){t.removeEventListener("scroll",W),t.removeEventListener("resize",W),A&&(t.cancelAnimationFrame(A),A=0),r.style.removeProperty("--pour-motion-origin")}let De=null;function Yt(F){Qe(),De=wt(e,{...F,point:()=>({x:N,y:w})})}function Qe(){De?.stop(),De=null}let Xt=()=>({vision:k,sensory:S});function Kt(){I("none"),ye("none")}return{applyVision:I,applySensory:ye,clear:Kt,state:Xt}}var cn=new Set(["text","search","url","tel","email","password","number","date","datetime-local","month","time","week",""]),pn=new Set(["input","select","textarea","button","meter","output","progress"]);function dn(e){return e.replace(/[\uE000-\uF8FF\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}\u200B-\u200D\u2060\uFEFF]/gu,"").trim()?e:""}function Gt(e){return dn($e(e,!1,!1,new Set))}function jt(e){for(let r=e;r;r=qe(r))if(r.getAttribute?.("aria-hidden")==="true"||getComputedStyle(r).display==="none")return!0;let t=getComputedStyle(e).visibility;return t==="hidden"||t==="collapse"}function un(e,t){let r=e.getAttribute?.("aria-labelledby");if(!r)return null;let n=e.getRootNode(),s=r.split(/\s+/).filter(Boolean).map(o=>n.getElementById?.(o)).filter(Boolean);return s.length?s.map(o=>{let a=new Set(t);return o===e&&a.delete(e),$e(o,!0,jt(o),a)}).join(" ").replace(/\s+/g," ").trim():null}function $e(e,t,r,n){if(n.has(e))return"";if(n.add(e),!t){let c=un(e,n);if(c)return c}let s=e.getAttribute("aria-label")?.trim();if(s)return s;let o=e.tagName.toLowerCase();if(o==="img"||o==="area"){let c=e.getAttribute("alt")?.trim();if(c)return c}if(pn.has(o)&&e.labels?.length){let c=[...e.labels].map(g=>$e(g,t,jt(g),n)).join(" ").trim();if(c)return c}if(o==="input"||o==="select"||o==="textarea"){if(e.type==="submit"||e.type==="reset"||e.type==="button"){let c=(e.value??e.getAttribute("value")??"").trim();if(c)return c}if(e.type==="image"){let c=e.getAttribute("alt")?.trim();if(c)return c}if(t&&(o==="textarea"||cn.has(e.type))){let c=(e.value??"").trim();if(c)return c}if(e.type==="submit")return"Submit";if(e.type==="reset")return"Reset"}let a=fn(e,r,t,n).replace(/\s+/g," ").trim();return a||(e.getAttribute("title")??e.getAttribute("placeholder")??"").trim()}function fn(e,t,r,n){let s=e.shadowRoot?e.shadowRoot.childNodes:e.childNodes;return _t(e,"::before",t)+Ht(s,t,r,n)+_t(e,"::after",t)}function _t(e,t,r){if(e.namespaceURI==="http://www.w3.org/2000/svg")return"";let n=getComputedStyle(e,t);if(!r&&(n.display==="none"||n.visibility==="hidden"||n.visibility==="collapse"))return"";let s=n.content;if(!s||s==="none"||s==="normal")return"";let o=s.match(/\/\s*"((?:[^"\\]|\\.)*)"\s*$/);if(o)return o[1].replace(/\\(.)/g,"$1");let a=s.match(/^"((?:[^"\\]|\\.)*)"$/);return a?a[1].replace(/\\(.)/g,"$1"):""}function Ht(e,t,r,n){let s="";for(let o of e){if(o.nodeType===3){s+=o.textContent;continue}if(o.nodeType!==1)continue;let a=o.tagName.toLowerCase();if(a==="script"||a==="style"||a==="noscript"||a==="template")continue;if(!t){if(o.getAttribute("aria-hidden")==="true")continue;let g=getComputedStyle(o);if(g.display==="none"||g.visibility==="hidden"||g.visibility==="collapse")continue}if(a==="slot"){let g=o.assignedNodes?.()??[];s+=Ht(g.length?g:o.childNodes,t,r,n);continue}if((a==="img"||a==="area")&&o.getAttribute("alt")===""&&!o.getAttribute("aria-label")?.trim()&&!o.getAttribute("aria-labelledby"))continue;let c=$e(o,r,t,n);s+=a==="img"||a==="area"||o.hasAttribute("aria-label")||o.hasAttribute("aria-labelledby")?` ${c} `:c}return s}return tr(hn);})();
