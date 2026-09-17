/*! pour filters | MIT | https://pour.dev */
var PourFilters=(()=>{var De=Object.defineProperty;var tr=Object.getOwnPropertyDescriptor;var rr=Object.getOwnPropertyNames;var nr=Object.prototype.hasOwnProperty;var ar=(e,t)=>{for(var r in t)De(e,r,{get:t[r],enumerable:!0})},or=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of rr(t))!nr.call(e,i)&&i!==r&&De(e,i,{get:()=>t[i],enumerable:!(a=tr(t,i))||a.enumerable});return e};var ir=e=>or(De({},"__esModule",{value:!0}),e);var xn={};ar(xn,{CSS_FILTERS:()=>de,MODE_LABELS:()=>Ee,SENSORY_FILTERS:()=>ve,accessibleName:()=>Yt,createFilterApplier:()=>Ht,createLensKit:()=>xe,cssPath:()=>at});var Ne={protanopia:"0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0 0 0 0 1 0",deuteranopia:"0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047414 0 0 -0.011820 0.042940 0.968881 0 0 0 0 0 1 0",tritanopia:"1.255528 -0.076749 -0.178779 0 0 -0.078411 0.930809 0.147602 0 0 0.004733 0.691367 0.303900 0 0 0 0 0 1 0",achromatopsia:"0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0 0 0 1 0",protanomaly:"0.458064 0.679578 -0.137642 0 0 0.092785 0.846313 0.060902 0 0 -0.007494 -0.016807 1.024301 0 0 0 0 0 1 0",deuteranomaly:"0.547494 0.607765 -0.155259 0 0 0.181692 0.781742 0.036566 0 0 -0.010410 0.027275 0.983136 0 0 0 0 0 1 0",tritanomaly:"1.017277 0.027029 -0.044306 0 0 -0.006113 0.958479 0.047634 0 0 0.006379 0.248708 0.744913 0 0 0 0 0 1 0"},Qe={protanomaly:{mild:"0.630323 0.465641 -0.095964 0 0 0.069181 0.890046 0.040773 0 0 -0.006308 -0.007724 1.014032 0 0 0 0 0 1 0",severe:"0.203876 0.990338 -0.194214 0 0 0.112975 0.794542 0.092483 0 0 -0.005222 -0.041043 1.046265 0 0 0 0 0 1 0"},deuteranomaly:{mild:"0.675425 0.433850 -0.109275 0 0 0.125303 0.847755 0.026942 0 0 -0.007950 0.018572 0.989378 0 0 0 0 0 1 0",severe:"0.392952 0.823610 -0.216562 0 0 0.263559 0.690210 0.046232 0 0 -0.011910 0.040281 0.971630 0 0 0 0 0 1 0"},tritanomaly:{mild:"0.905871 0.127791 -0.033662 0 0 0.026856 0.941251 0.031893 0 0 0.013410 0.148296 0.838294 0 0 0 0 0 1 0",severe:"1.278864 -0.125333 -0.153531 0 0 -0.084748 0.957674 0.127074 0 0 -0.000989 0.601151 0.399838 0 0 0 0 0 1 0"}},sr={protanopia:"saturate(0.25) sepia(0.5) hue-rotate(-15deg)",deuteranopia:"saturate(0.3) sepia(0.4) hue-rotate(-10deg)",tritanopia:"saturate(0.35) sepia(0.3) hue-rotate(50deg)",achromatopsia:"grayscale(100%)",protanomaly:"saturate(0.6) sepia(0.25) hue-rotate(-8deg)",deuteranomaly:"saturate(0.65) sepia(0.2) hue-rotate(-5deg)",tritanomaly:"saturate(0.7) sepia(0.15) hue-rotate(25deg)"},Oe=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge","diabeticRetinopathy","floaters","glossyScreen","nystagmus","hemianopiaLeft","hemianopiaRight","amblyopia","afterimages","ageSlider"]),Ie=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge"]),Ze={cataract:'<feGaussianBlur in="SourceGraphic" stdDeviation="5" result="near"/><feGaussianBlur in="SourceGraphic" stdDeviation="26" result="far"/><feComposite in="near" in2="far" operator="arithmetic" k1="0" k2="0.05" k3="0.07" k4="0" result="veil"/><feComposite in="SourceGraphic" in2="veil" operator="arithmetic" k1="0" k2="0.88" k3="1" k4="0"/>'},de={none:"none",cataract:"sepia(0.3) contrast(0.9) saturate(0.9) brightness(0.95) blur(0.6px)",presbyopia:"blur(0.5px)",lowAcuityMild:"blur(0.7px)",lowAcuity:"blur(1.2px)",lowAcuityStrong:"blur(2.5px)",lowAcuityHeavy:"blur(5px)",lowLight:"brightness(0.65) contrast(0.9) saturate(0.85) hue-rotate(-8deg)",lowContrast:"contrast(0.7)",retinitisRing:"none",glaucoma:"none",glaucomaLarge:"none",macularDegeneration:"none",macularDegenerationLarge:"none",diabeticRetinopathy:"none",floaters:"none",glossyScreen:"none",nystagmus:"none",hemianopiaLeft:"none",hemianopiaRight:"none",amblyopia:"none",afterimages:"none",ageSlider:"none",scotopicRose:"sepia(0.15) hue-rotate(330deg) saturate(1.2) brightness(1.05)",scotopicYellow:"sepia(0.3) saturate(1.15) brightness(1.05)",scotopicAqua:"sepia(0.2) hue-rotate(160deg) saturate(1.15) brightness(1.02)"},lr=typeof navigator<"u"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent),et=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),cr=et,pr=lr||et;Object.keys(Ne).forEach(e=>{cr?de[e]=sr[e]:de[e]=`url(#pour-vision-filter-${e})`});pr||(de.cataract="url(#pour-vision-filter-cataract) sepia(0.3) saturate(0.9) brightness(0.95) blur(0.6px)");var dr=[{label:"Color vision",options:[{value:"deuteranomaly",added:"2026-09-17",name:"Green Deficiency (Deutan)",stat:"~6% of men",description:"Green-sensitive cones respond off-target, so greens, reds and browns crowd together. The most common colour vision difference. At its worst, red and green become one family of murky ochre. A setting at the bottom of the page picks mild, moderate or severe; moderate is drawn first.",label:"Green Deficiency - Deutan - ~6% of men"},{value:"protanomaly",added:"2026-09-17",name:"Red Deficiency (Protan)",stat:"~2% of men",description:"Red-sensitive cones respond weakly: reds dim and drift towards green. At its worst, red light barely registers and reds sink into the greens around them. A setting at the bottom of the page picks mild, moderate or severe; moderate is drawn first.",label:"Red Deficiency - Protan - ~2% of men"},{value:"tritanomaly",added:"2026-09-17",name:"Blue Deficiency (Tritan)",stat:"<0.2%",description:"Blue-sensitive cones respond weakly: blues and greens blur together, yellows go pale. At its worst, blues read as greens and yellows as pinks and greys. A setting at the bottom of the page picks mild, moderate or severe; moderate is drawn first.",label:"Blue Deficiency - Tritan - <0.2%"},{value:"achromatopsia",added:"2026-07-30",name:"Monochromacy (Achromatopsia)",stat:"~0.003%",description:"No colour at all: brightness is the only signal left, usually with strong glare sensitivity.",label:"Monochromacy - Achromatopsia - ~0.003%"}]},{label:"Eye conditions",options:[{value:"presbyopia",added:"2026-07-30",name:"Near-Vision Loss (Presbyopia)",stat:"nearly all over 50",description:"The lens stiffens with age and close text blurs \u2014 the one condition almost everyone gets.",label:"Near-Vision Loss - Presbyopia - nearly all over 50"},{value:"glaucoma",added:"2026-07-30",name:"Tunnel Vision (Glaucoma)",stat:"~2% over 40",description:"Peripheral vision closes in until only a central window stays sharp. The window follows your pointer. Drawn as a dimmed, blurred surround; people with glaucoma report blur or missing parts, never a dark tunnel, and most notice nothing until late.",label:"Tunnel Vision - Glaucoma - ~2% over 40"},{value:"glaucomaLarge",added:"2026-07-30",name:"Tunnel Vision (Advanced Glaucoma)",stat:"~0.5% over 40",description:"Advanced glaucoma: the sharp window narrows further; everything else is gone, not blurred.",label:"Tunnel Vision (Large) - Advanced Glaucoma - ~0.5% over 40"},{value:"macularDegeneration",added:"2026-07-30",name:"Central Vision Loss (Macular Degeneration)",stat:"~8% over 45",description:"The centre of gaze fades first, precisely where you point your eyes to read. Drawn as a dark disc; the real gap is filled in from its surround and straight lines bend, so nobody sees its edge.",label:"Central Vision Loss - Macular Degeneration - ~8% over 45"},{value:"macularDegenerationLarge",added:"2026-07-30",name:"Central Vision Loss (Advanced Macular Degeneration)",stat:"~1% over 50",description:"Advanced macular degeneration: a larger central blank that reading must route around.",label:"Central Vision Loss (Large) - Advanced Macular Degeneration - ~1% over 50"},{value:"diabeticRetinopathy",added:"2026-07-30",name:"Patchy Vision (Diabetic Retinopathy)",stat:"~0.8% over 40",description:"Blood-vessel damage leaves patches the eye cannot resolve; content falls into them. Drawn as fixed dark blotches, a stand-in: the real loss is filled in, and comes with blur and drifting floaters from bleeds.",label:"Patchy Vision - Diabetic Retinopathy - ~0.8% over 40"},{value:"floaters",name:"Drifting Shadows (Floaters)",added:"2026-09-12",stat:"~33%",description:"Strands and specks in the eye cast shadows that drift and lag behind every eye movement. They show most against bright, flat areas, so a page of white space is where they live.",label:"Drifting Shadows - Floaters - ~33%"},{value:"nystagmus",added:"2026-07-30",name:"Involuntary Eye Movement (Nystagmus)",stat:"~0.07%",description:"The eyes move on their own, so the page never quite holds still. That is acquired nystagmus, after a stroke or multiple sclerosis; people born with it, three times as many, see a still page at lower acuity.",label:"Involuntary Eye Movement - Nystagmus - ~0.07%"}]},{label:"Field of vision",options:[{value:"hemianopiaLeft",added:"2026-07-30",name:"Left Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the left half of vision in both eyes. Drawn as a dark half; the person sees no edge and often no gap, the field is simply absent, and the left end of every line goes missing.",label:"Left Field Loss - Hemianopia (Left) - ~0.1% over 49"},{value:"hemianopiaRight",added:"2026-07-30",name:"Right Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the right half of vision in both eyes. Drawn as a dark half; the person sees no edge and often no gap, the field is simply absent, and the right end of every line goes missing.",label:"Right Field Loss - Hemianopia (Right) - ~0.1% over 49"},{value:"retinitisRing",name:"Ring Loss (Retinitis Pigmentosa)",added:"2026-08-22",stat:"~0.025%",description:"Early retinitis pigmentosa takes a ring out of the mid-periphery, leaving a clear centre and a seeing outer rim. It narrows to a tunnel only much later, so this donut, not the tunnel, is what most of that life looks like.",label:"Ring Loss - Retinitis Pigmentosa - ~0.025%"},{value:"amblyopia",added:"2026-07-30",name:"Reduced Acuity (Amblyopia)",stat:"~2-3%",description:"One eye never learned to see sharply. Drawn as that eye sees on its own; with both eyes open the stronger eye usually covers for it, and depth is what is lost.",label:"Reduced Acuity (One Eye) - Amblyopia - ~2-3%"},{value:"afterimages",added:"2026-09-14",name:"Afterimages (Palinopsia)",stat:"~10% with migraine",description:"Anything that moves leaves a fading copy of itself behind, the page under scroll included: a carousel becomes a smear and the page takes a couple of seconds to settle after every scroll. Content the page moves on its own is the finding. Needs the page's own pixels, so it asks to share this tab (Chromium) and says so where it cannot.",label:"Afterimages - Palinopsia - ~10% with migraine"}]},{label:"Focus & acuity",options:[{value:"lowAcuityMild",added:"2026-07-30",name:"Slight Defocus",description:"Mildly uncorrected eyesight \u2014 the glasses left in the other room.",label:"Slight Defocus - Mild Blur"},{value:"lowAcuity",added:"2026-07-30",name:"Uncorrected Focus",stat:"~5-6%",description:"Moderate uncorrected short-sight: small text needs effort, thin fonts give up first.",label:"Uncorrected Focus - Moderate Blur - ~5-6%"},{value:"lowAcuityStrong",added:"2026-07-30",name:"Significant Defocus",description:"Strong blur: layout and colour still communicate, letterforms mostly do not.",label:"Significant Defocus - Strong Blur"},{value:"lowAcuityHeavy",added:"2026-07-30",name:"Severe Defocus",description:"Only shape, contrast and position survive. What does your page still say?",label:"Severe Defocus - Very Strong Blur"}]},{label:"Contrast & light",options:[{value:"cataract",added:"2026-09-17",name:"Clouded Lens (Cataract)",stat:"~17% over 40",description:"The lens clouds and yellows, and light scattering inside it lays a veil over the page: bright areas bleed into whatever sits next to them, dark text greys, whites go dingy. The blur stands in for the aberrations that take sharpness. An early cataract.",label:"Clouded Lens - Cataract - ~17% over 40"},{value:"lowContrast",added:"2026-07-30",name:"Reduced Contrast",description:"Contrast sensitivity loss: faint greys sink into their backgrounds long before they vanish for you.",label:"Reduced Contrast"},{value:"lowLight",added:"2026-07-30",name:"Dim Environment",description:"A dim room, a cheap panel, a phone at night \u2014 the low-vision hours everyone has.",label:"Dim Environment - Low Light"},{value:"glossyScreen",added:"2026-09-12",name:"Glossy Screen (Reflections)",description:"The room and your own face reflect off the glass and add light to every dark pixel. White areas barely change; dark themes, grey-on-black text and low-contrast controls wash out first. Uses your camera on this device only, never recorded or sent.",label:"Glossy Screen - Reflections"}]},{label:"Ageing",options:[{value:"ageSlider",added:"2026-09-17",name:"Age Slider",description:"One slider from twenty to ninety: the lens yellows, the pupil shrinks, contrast and near focus fall, and from sixty-five the pointer shows the tremor one in twenty has, all on published population curves. An approximation: any one reader sits above or below them. Grey text and small buttons are the first to go.",label:"Age Slider"}]},{label:"Visual stress",options:[{value:"scotopicRose",added:"2026-07-30",name:"Rose Tint",description:"A coloured overlay some readers use to calm pattern glare. See how your design reads through one.",label:"Rose Tint - Coloured Overlay"},{value:"scotopicYellow",added:"2026-07-30",name:"Yellow Tint",description:"A yellow reading overlay \u2014 common for visual stress. Your palette should survive it.",label:"Yellow Tint - Coloured Overlay"},{value:"scotopicAqua",added:"2026-07-30",name:"Aqua Tint",description:"An aqua reading overlay. Tinted reading is more common than most designs assume.",label:"Aqua Tint - Coloured Overlay"}]}],ve={none:{label:"None",css:"none"},lightSensitivity:{label:"Light Sensitivity",css:"brightness(1.4) contrast(1.2) saturate(1.1)"},colourHypersensitivity:{label:"Colour Hypersensitivity",css:"saturate(2.2) contrast(1.35) brightness(1.1)"},motionSensitivity:{label:"Motion Sensitivity",hostClass:"pour-sensory-filter-motionSensitivity",viewportOrigin:!0,css:"none"},hyperfocusTunnel:{label:"Hyperfocus Tunnel (Metaphor)",overlay:"hyperfocusTunnel",mouseTracked:!0,css:"none"},attentionFragmentation:{label:"Attention Fragmentation (Metaphor)",overlay:"attentionFragmentation",css:"none"},peripheralDistraction:{label:"Peripheral Distraction",overlay:"peripheralDistraction",css:"none"},detailFixation:{label:"Detail Fixation (Metaphor)",overlay:"detailFixation",mouseTracked:!0,loupe:{scale:2,radius:150,ring:75},css:"none"},processingDelay:{label:"Processing Lag",overlay:"processingDelay",css:"none"},sensoryInterference:{label:"Sensory Interference",hostClass:"pour-sensory-filter-backgroundNoise",css:"none"},sensorySpike:{label:"Sudden Sensory Spike",overlay:"sensorySpike",css:"none"},dyslexiaVisualStress:{label:"Visual Stress (Pattern Glare)",overlay:"dyslexiaVisualStress",injectCSS:`
        body { background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.06) 22px, rgba(0,0,0,0.06) 24px) !important; background-attachment: fixed !important; }
        p, li, td, th, dd, dt, h1, h2, h3, h4, h5, h6, label { text-shadow: 0 0 1px rgba(0,0,0,0.15) !important; animation: pour-sensory-line-merge 3s ease-in-out infinite alternate !important; }
        @keyframes pour-sensory-line-merge { 0% { transform: scaleX(1) translateY(0); } 25% { transform: scaleX(1.008) translateY(0.8px); } 50% { transform: scaleX(0.993) translateY(-0.5px); } 75% { transform: scaleX(1.005) translateY(0.6px); } 100% { transform: scaleX(0.996) translateY(-0.3px); } }
      `,css:"none"},dyslexiaCrowding:{label:"Crowding Effect",injectCSS:"* { letter-spacing: -1px !important; word-spacing: -3px !important; line-height: 1.05 !important; } p, li, td, th, dd, dt, label, span, a { font-size: 95% !important; }",css:"none"},dyslexiaTrackingLoss:{label:"Tracking Loss",overlay:"dyslexiaTrackingLoss",mouseTracked:!0,css:"none"},dyslexiaWashout:{label:"Letter Instability",injectScript:!0,css:"none"},dyslexiaContrastSensitivity:{label:"Contrast Sensitivity",css:"contrast(0.8) brightness(1.1) saturate(0.9)"},handTremor:{label:"Hand Tremor",cursorJitter:{freq:6,amp:9,intent:1.6,bitmap:96},css:"none"},handTremorStrong:{label:"Hand Tremor (Strong)",cursorJitter:{freq:5,amp:18,intent:1.9,bitmap:128},css:"none"},restingTremor:{label:"Resting Tremor",cursorJitter:{freq:4.5,amp:12,intent:-.9,bitmap:96},css:"none"},ataxicDrift:{label:"Ataxic Drift",cursorJitter:{freq:.7,amp:26,intent:.8,bitmap:128},css:"none"},pointerSpasm:{label:"Sudden Jerk",cursorJitter:{freq:5,amp:3,intent:.4,bitmap:128,spasm:{minGap:2200,maxGap:6500,size:44,dur:280}},css:"none"},pointerHidden:{label:"Hidden Pointer (Keyboard Only)",cursorJitter:{hide:!0,bitmap:32},css:"none"},fingertipTouch:{label:"Fingertip Touch",fingertip:{diameter:38},css:"none"},forcedColours:{label:"Forced Colours",forcedColours:!0,css:"none"},screenMagnifier:{label:"Screen Magnifier (400%)",magnifier:{scale:4},css:"none"},textSpacing:{label:"Text Spacing",injectCSS:`
        *:not([data-pour-audit]):not([data-pour-audit] *) { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
        p:not([data-pour-audit] *) { margin-bottom: 2em !important; }
      `,css:"none"},focusOrder:{label:"Focus Order",lens:"focusOrder",css:"none"},landmarkMap:{label:"Landmarks & Headings",lens:"landmarkMap",css:"none"},hearingLoss:{label:"Hearing Loss on the Page's Media",driver:"hearingLoss",options:{audiogram:"moderate",picker:"loss"},frames:!0,sound:!0,css:"none"},cochlearImplant:{label:"Cochlear Implant",driver:"hearingLoss",options:{audiogram:"implant8",picker:"implant"},frames:!0,sound:!0,css:"none"},tinnitus:{label:"Tinnitus",driver:"tinnitus",options:{pitch:6e3,kind:"tone",level:"quiet"},sound:!0,css:"none"}},tt={afterimages:{driver:"afterimages",options:{decay:.86}},ageSlider:{driver:"ageSlider",options:{start:45}},protanomaly:{driver:"colourSeverity",options:{kind:"protanomaly",severity:"moderate"}},deuteranomaly:{driver:"colourSeverity",options:{kind:"deuteranomaly",severity:"moderate"}},tritanomaly:{driver:"colourSeverity",options:{kind:"tritanomaly",severity:"moderate"}}},ur=[{label:"Sensory overload",options:[{value:"lightSensitivity",added:"2026-07-30",name:"Light Sensitivity",metaphor:!0,description:"Photophobia: ordinary brightness arrives as glare; bright themes read as pain. The page does not look brighter to the person, it hurts at normal brightness; the glare here stands in for that.",label:"Light Sensitivity (Metaphor)"},{value:"colourHypersensitivity",added:"2026-07-30",name:"Colour Hypersensitivity",metaphor:!0,description:"Saturated colour lands far louder than you sent it.",label:"Colour Hypersensitivity (Metaphor)"},{value:"motionSensitivity",added:"2026-07-30",name:"Motion Sensitivity",stat:"~5% of adults",metaphor:!0,description:"Page motion is felt, not just seen: what autoplaying movement does to a vestibular-sensitive visitor. A still page looks still to them; the sway here stands in for the dizziness that moving content brings on.",label:"Motion Sensitivity (Metaphor)"}]},{label:"Attention & focus",options:[{value:"hyperfocusTunnel",added:"2026-07-30",name:"Hyperfocus Tunnel",metaphor:!0,description:"The world outside the point of focus falls away; the page exists one region at a time.",label:"Hyperfocus Tunnel (Metaphor)"},{value:"attentionFragmentation",added:"2026-07-30",name:"Attention Fragmentation",metaphor:!0,description:"A scattered attention field \u2014 every element competes and none of them wins.",label:"Attention Fragmentation (Metaphor)"},{value:"peripheralDistraction",added:"2026-07-30",name:"Peripheral Distraction",metaphor:!0,description:"Movement at the edges keeps stealing the centre of your gaze.",label:"Peripheral Distraction (Metaphor)"},{value:"detailFixation",added:"2026-09-12",name:"Detail Fixation",metaphor:!0,description:"Detail-first processing: the point of attention magnifies while the whole recedes.",label:"Detail Fixation (Metaphor)"}]},{label:"Processing differences",options:[{value:"processingDelay",added:"2026-07-30",name:"Processing Lag",metaphor:!0,description:"The page lands a beat late: interaction as it feels under cognitive load.",label:"Processing Lag (Metaphor)"},{value:"sensoryInterference",added:"2026-07-30",name:"Sensory Interference",metaphor:!0,description:"Visual noise under everything, like reading in a room that will not go quiet.",label:"Sensory Interference (Metaphor)"}]},{label:"Sensory spikes",options:[{value:"sensorySpike",added:"2026-07-30",name:"Sudden Sensory Spike",metaphor:!0,description:"Not a constant state: periodic waves of too-much, out of nowhere.",label:"Sudden Sensory Spike (Metaphor)"}]},{label:"Dyslexia / reading",options:[{value:"dyslexiaVisualStress",added:"2026-07-30",name:"Visual Stress (Pattern Glare)",metaphor:!0,description:"Dense text shimmers and bands together; lines merge and repel. A separate condition from dyslexia that some readers have alongside it; how many is contested.",label:"Visual Stress (Pattern Glare) (Metaphor)"},{value:"dyslexiaCrowding",added:"2026-07-30",name:"Crowding Effect",stat:"~10%",description:"Letters and words pack too tightly to separate \u2014 spacing is doing more work than you think.",label:"Crowding Effect"},{value:"dyslexiaTrackingLoss",added:"2026-07-30",name:"Tracking Loss",stat:"~10%",metaphor:!0,description:"Losing the line mid-sentence: only the neighbourhood of your pointer holds steady. Dyslexic readers report losing their place and rereading; the blur outside the line stands in for that.",label:"Tracking Loss (Metaphor)"},{value:"dyslexiaWashout",added:"2026-07-30",name:"Letter Instability",metaphor:!0,description:"Some letters appear fainter than others, making words harder to read. No reader reports this; it stands in for the extra effort each word costs when decoding is slow.",label:"Letter Instability (Metaphor)"},{value:"dyslexiaContrastSensitivity",added:"2026-07-30",name:"Contrast Sensitivity",stat:"~10%",description:"Full-contrast text tires, low-contrast text disappears; the readable band is narrow.",label:"Contrast Sensitivity"}]}],fr=[{label:"Tremor",options:[{value:"handTremor",added:"2026-08-06",name:"Hand Tremor",stat:"~1%",description:"An essential tremor: the pointer shakes harder the more precisely you aim.",label:"Hand Tremor"},{value:"handTremorStrong",added:"2026-08-06",name:"Hand Tremor (Strong)",description:"The same tremor, stronger \u2014 small close-set targets become lotteries.",label:"Hand Tremor (Strong)"},{value:"restingTremor",added:"2026-08-06",name:"Resting Tremor",stat:"~0.3%",description:"A parkinsonian pattern: shakes at rest, steadies during deliberate movement.",label:"Resting Tremor"}]},{label:"Pointer control",options:[{value:"ataxicDrift",added:"2026-08-06",name:"Ataxic Drift",description:"The pointer drifts wide of intent; straight lines are not on offer.",label:"Ataxic Drift"},{value:"pointerSpasm",added:"2026-08-06",name:"Sudden Jerk",description:"Occasional involuntary jerks fling the pointer \u2014 sometimes mid-click.",label:"Sudden Jerk"},{value:"pointerHidden",added:"2026-08-06",name:"Hidden Pointer (Keyboard Only)",description:"No pointer at all. The keyboard is the only way through your page.",label:"Hidden Pointer (Keyboard Only)"}]},{label:"Touch",options:[{value:"fingertipTouch",added:"2026-09-13",name:"Fingertip Touch",description:"The pointer becomes a fingertip, about 10 mm across. Every target under it is outlined, and when more than one is, each shows its share of the fingertip. A click lands the way a tap does: on one of those targets, in proportion to its share. Close-set links and small buttons are the findings.",label:"Fingertip Touch"}]}],hr=[{label:"Keyboard",options:[{value:"focusOrder",added:"2026-09-07",name:"Focus Order",description:"Numbered stops trace where Tab really goes, in order. Amber stops force their own position with a positive tabindex.",label:"Focus Order"}]},{label:"Page structure",options:[{value:"landmarkMap",added:"2026-09-07",name:"Landmarks & Headings",description:"Landmark regions tinted and named, every heading chipped with its level. Amber chips skip a level.",label:"Landmarks & Headings"}]}],mr=[{label:"Colours",options:[{value:"forcedColours",added:"2026-09-12",name:"Forced Colours (Windows Contrast Theme)",stat:"~4% on Windows",description:"Every colour the page chose is replaced by a contrast theme\u2019s handful. Backgrounds, gradients and shadows go; borders keep their width; images and video stay, with a plate behind any text over them, as Windows draws it. Icon buttons that vanish, borderless fields and missing focus rings are the findings. An approximation: the page\u2019s own forced-colours rules are applied where its stylesheets can be read.",label:"Forced Colours (Windows Contrast Theme)"}]},{label:"Magnification",options:[{value:"screenMagnifier",added:"2026-09-13",name:"Screen Magnifier (400%)",description:"The page at 400%, as a full-screen magnifier shows it: a quarter of the width at a time, following the pointer and keyboard focus. When something changes outside the magnified view, a marker at the edge points to it. Messages, basket counts and menus that appear where the reader is not looking are the findings.",label:"Screen Magnifier (400%)"}]},{label:"Text",options:[{value:"textSpacing",added:"2026-09-12",name:"Text Spacing",description:"Line height 1.5, paragraph spacing 2, letter spacing 0.12 and word spacing 0.16 times the font size: the overrides low-vision and dyslexic readers apply, which WCAG 1.4.12 says a page must survive. Clipped labels, overflowing boxes and buttons that break are the findings.",label:"Text Spacing"}]}],gr=[{label:"Hearing loss",options:[{value:"hearingLoss",added:"2026-09-14",name:"Hearing Loss on the Page's Media",stat:"~20%",description:"The page\u2019s own audio and video through an audiogram: mild to severe, the notch of noise damage, or a noisy room. Turning the volume up does not help; captions do. The audiogram\u2019s part only: the blurring of pitch and the loss of speech in noise that come with it are not shown.",label:"Hearing Loss on the Page's Media - ~20%"}]},{label:"Tinnitus",options:[{value:"tinnitus",added:"2026-09-15",name:"Tinnitus",stat:"~14%",description:"A steady tone or a narrow hiss, high, media or no media. Quiet sounds near its pitch are masked and a long spoken video tires. The real thing rises and falls and hides behind ordinary sound; this one is steady. Captions and a transcript are what help.",label:"Tinnitus - ~14%"}]},{label:"Cochlear implant",options:[{value:"cochlearImplant",added:"2026-09-15",name:"Cochlear Implant",description:"The page\u2019s own audio and video as an implant delivers it: a few bands of noise, each carrying only the loudness of its band. Speech is followable from four channels up and sounds like a whisper through a pipe; melody and pitch are gone at any count. This is the sound before the months of learning: implant users follow it far better than a first listener does. Over a million people hear this way.",label:"Cochlear Implant"}]}],Ee={};for(let e of[...dr,...ur,...fr,...hr,...mr,...gr]){for(let t of e.options)Ee[t.value]=t.label.split(" - ")[0];Object.assign(Ee,{protanopia:"Red Absent (Protanopia)",deuteranopia:"Green Absent (Deuteranopia)",tritanopia:"Blue Absent (Tritanopia)"})}function Pe(e){return e.assignedSlot??e.parentElement??e.getRootNode()?.host??null}var rt=new WeakMap,br=new Set;function yr(e){let t=rt.get(e);if(!t){let r=typeof MutationObserver=="function"?new MutationObserver(()=>{t.ids=null,t.parents=new WeakMap}):null;t={ids:null,parents:new WeakMap,observer:r},r&&(r.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["id"]}),br.add(r)),rt.set(e,t)}if(t.observer?.takeRecords().length&&(t.ids=null,t.parents=new WeakMap),!t.ids){t.ids=new Map;for(let r of e.querySelectorAll("[id]"))t.ids.set(r.id,(t.ids.get(r.id)??0)+1)}return t}function vr(e,t){let r=e.parentElement,a=t.parents.get(r);if(!a){let i=new Map;a=new WeakMap;for(let n of r.children){let o=(i.get(n.tagName)??0)+1;i.set(n.tagName,o),a.set(n,{position:o,repeated:!1})}for(let n of r.children)a.get(n).repeated=i.get(n.tagName)>1;t.parents.set(r,a)}return a.get(e)}function nt(e){let t=e.getRootNode(),r=yr(t),a=o=>o.id&&r.ids.get(o.id)===1;if(a(e))return`#${CSS.escape(e.id)}`;let i=[],n=e;for(;n&&n.nodeType===Node.ELEMENT_NODE&&n!==document.documentElement;){let o=n.tagName.toLowerCase();if(n.parentElement){let{position:c,repeated:m}=vr(n,r);m&&(o+=`:nth-of-type(${c})`)}if(i.unshift(o),n.parentElement&&a(n.parentElement)){i.unshift(`#${CSS.escape(n.parentElement.id)}`);break}n=n.parentElement}return i.join(" > ")||e.tagName.toLowerCase()}function at(e){let t=nt(e),r=e.getRootNode();for(;r&&r.host;)t=`${nt(r.host)} >>> ${t}`,r=r.host.getRootNode();return t}var Sn=typeof Element<"u"?Object.getOwnPropertyDescriptor(Element.prototype,"attributes")?.get:null;function ot(e){for(let t=e;t;t=Pe(t))if(t.nodeType===1&&t.hasAttribute("inert"))return!0;return!1}var xr=new Set(["atomic","busy","controls","current","describedby","description","details","dropeffect","flowto","grabbed","hidden","keyshortcuts","label","labelledby","live","owns","relevant","roledescription","braillelabel","brailleroledescription"]),st=new Set(["banner","complementary","contentinfo","form","main","navigation","region","search"]),wr={link:["disabled","errormessage","expanded","haspopup","invalid"],button:["disabled","errormessage","expanded","haspopup","invalid","pressed"],checkbox:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],switch:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],radio:["checked","disabled","errormessage","haspopup","invalid","posinset","setsize"],option:["checked","disabled","errormessage","haspopup","invalid","posinset","selected","setsize"],tab:["disabled","errormessage","expanded","haspopup","invalid","posinset","selected","setsize"],menuitem:["disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemcheckbox:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemradio:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],textbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],searchbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],combobox:["activedescendant","autocomplete","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],listbox:["activedescendant","disabled","errormessage","expanded","haspopup","invalid","multiselectable","orientation","readonly","required"],slider:["disabled","errormessage","haspopup","invalid","orientation","readonly","valuemax","valuemin","valuenow","valuetext"],spinbutton:["activedescendant","disabled","errormessage","haspopup","invalid","readonly","required","valuemax","valuemin","valuenow","valuetext"],progressbar:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],meter:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],scrollbar:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],heading:["disabled","errormessage","haspopup","invalid","level"],list:["disabled","errormessage","haspopup","invalid"],listitem:["disabled","errormessage","haspopup","invalid","level","posinset","setsize"],row:["activedescendant","colindex","colindextext","disabled","errormessage","expanded","haspopup","invalid","level","posinset","rowindex","rowindextext","selected","setsize"],rowgroup:["disabled","errormessage","haspopup","invalid"],cell:["colindex","colindextext","colspan","disabled","errormessage","haspopup","invalid","rowindex","rowindextext","rowspan"],gridcell:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected"],columnheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],rowheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],table:["colcount","disabled","errormessage","haspopup","invalid","rowcount"],grid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","readonly","rowcount"],treegrid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","orientation","readonly","required","rowcount"],tablist:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation"],menu:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],menubar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],tree:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation","required"],treeitem:["checked","disabled","errormessage","expanded","haspopup","invalid","level","posinset","selected","setsize"],radiogroup:["activedescendant","disabled","errormessage","haspopup","invalid","orientation","readonly","required"],group:["activedescendant","disabled","errormessage","haspopup","invalid"],separator:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],toolbar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],dialog:["disabled","errormessage","haspopup","invalid","modal"],alertdialog:["disabled","errormessage","haspopup","invalid","modal"],application:["activedescendant","disabled","errormessage","expanded","haspopup","invalid"],article:["disabled","errormessage","haspopup","invalid","posinset","setsize"],img:["disabled","errormessage","haspopup","invalid"],figure:["disabled","errormessage","haspopup","invalid"],document:["disabled","errormessage","haspopup","invalid"],feed:["disabled","errormessage","haspopup","invalid"],math:["disabled","errormessage","haspopup","invalid"],note:["disabled","errormessage","haspopup","invalid"],presentation:["disabled","errormessage","haspopup","invalid"],none:["disabled","errormessage","haspopup","invalid"],banner:["disabled","errormessage","haspopup","invalid"],complementary:["disabled","errormessage","haspopup","invalid"],contentinfo:["disabled","errormessage","haspopup","invalid"],form:["disabled","errormessage","haspopup","invalid"],main:["disabled","errormessage","haspopup","invalid"],navigation:["disabled","errormessage","haspopup","invalid"],region:["disabled","errormessage","haspopup","invalid"],search:["disabled","errormessage","haspopup","invalid"],alert:["disabled","errormessage","haspopup","invalid"],log:["disabled","errormessage","haspopup","invalid"],marquee:["disabled","errormessage","haspopup","invalid"],status:["disabled","errormessage","haspopup","invalid"],timer:["disabled","errormessage","haspopup","invalid"],tabpanel:["disabled","errormessage","haspopup","invalid"],tooltip:["disabled","errormessage","haspopup","invalid"],definition:["disabled","errormessage","haspopup","invalid"],term:["disabled","errormessage","haspopup","invalid"],paragraph:["disabled","errormessage","haspopup","invalid"],generic:["disabled","errormessage","haspopup","invalid"],blockquote:["disabled","errormessage","haspopup","invalid"],caption:["disabled","errormessage","haspopup","invalid"],code:["disabled","errormessage","haspopup","invalid"],emphasis:["disabled","errormessage","haspopup","invalid"],strong:["disabled","errormessage","haspopup","invalid"],time:["disabled","errormessage","haspopup","invalid"],deletion:["disabled","errormessage","haspopup","invalid"],insertion:["disabled","errormessage","haspopup","invalid"],subscript:["disabled","errormessage","haspopup","invalid"],superscript:["disabled","errormessage","haspopup","invalid"]},kr={checkbox:"checkbox",radio:"radio",range:"slider",number:"spinbutton",search:"searchbox",email:"textbox",tel:"textbox",text:"textbox",url:"textbox",button:"button",submit:"button",reset:"button",image:"button"},Sr=new Set(["text","search","tel","url","email"]),Ar={button:"button",textarea:"textbox",img:"img",article:"article",aside:"complementary",nav:"navigation",main:"main",search:"search",h1:"heading",h2:"heading",h3:"heading",h4:"heading",h5:"heading",h6:"heading",ul:"list",ol:"list",menu:"list",li:"listitem",table:"table",thead:"rowgroup",tbody:"rowgroup",tfoot:"rowgroup",tr:"row",td:"cell",th:"columnheader",form:"form",fieldset:"group",details:"group",dialog:"dialog",hr:"separator",progress:"progressbar",meter:"meter",output:"status",option:"option",datalist:"listbox",dt:"term",dd:"definition",p:"paragraph",div:"generic",span:"generic",blockquote:"blockquote",figure:"figure",time:"time",code:"code",em:"emphasis",strong:"strong"};function it(e){let t=e.tagName.toLowerCase();if(t==="a"||t==="area")return e.hasAttribute("href")?"link":"generic";if(t==="input")return Sr.has(e.type)&&e.hasAttribute("list")?"combobox":kr[e.type]??null;if(t==="td"||t==="th"){if(t==="th"&&e.getAttribute("scope")?.toLowerCase()==="row")return"rowheader";if(t==="th")return"columnheader";let r=e.closest("table"),a=r&&Be(r);return a==="grid"||a==="treegrid"?"gridcell":"cell"}if(t==="select")return e.multiple||e.size>1?"listbox":"combobox";if(t==="img")return e.getAttribute("alt")===""?"presentation":"img";if(t==="header")return e.closest("article, aside, main, nav, section")?"generic":"banner";if(t==="footer")return e.closest("article, aside, main, nav, section")?"generic":"contentinfo";if(t==="aside"){let r=e.parentElement?.closest("article, aside, nav, section"),a=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby");return r&&!a?"generic":"complementary"}return t==="section"?e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")?"region":"generic":Ar[t]??null}function Tr(e){return[...xr].some(t=>e.hasAttribute(`aria-${t}`))?!0:e.matches(":disabled")||ot(e)?!1:e.tabIndex>=0?!0:e.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]')}function Be(e){let t=e.getAttribute("role")?.trim().split(/\s+/)??[];for(let r of t){let a=r.toLowerCase();if(a==="image")return"img";if(wr[a])return(a==="presentation"||a==="none")&&Tr(e)?it(e):a}return it(e)}var lt=`/* Structure-lens overlay styles (focus order, landmark map): injected by
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
`;function qe(e){if(e.getElementById("pour-lens-styles"))return;let t=e.createElement("style");t.id="pour-lens-styles",t.dataset.pourAudit="overlay",t.textContent=lt,e.head.appendChild(t)}function xe(e=document){let t=e.defaultView,r={contentVisibilityAuto:!0,visibilityProperty:!0,checkVisibilityCSS:!0};function a(c){for(let m=c;m&&m!==e.documentElement;m=m.parentElement??m.getRootNode()?.host??null){let g=m.ownerDocument.defaultView.getComputedStyle(m).position;if(g==="fixed")return"fixed";if(g==="sticky")return"sticky"}return"flow"}function i(c,{withLine:m=!1}={}){let g="background:none;border:0;margin:0;padding:0;box-shadow:none;filter:none;opacity:1;mix-blend-mode:normal;",u=e.createElement("div");u.className=c,u.dataset.pourAudit="overlay",u.style.cssText=`position:absolute;top:0;left:0;width:0;height:0;overflow:clip;overflow-clip-margin:24px;pointer-events:none;z-index:2147483646;${g}`;let p=e.createElement("div");p.className=c,p.dataset.pourAudit="overlay",p.style.cssText=`position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:2147483646;${g}`;let w=0,y=0,x=null,b=null,S=null;if(m){b=e.createElementNS("http://www.w3.org/2000/svg","svg"),b.setAttribute("class",`${c.replace(/-layer$/,"")}-path`);for(let[d,A]of[["position","absolute"],["top","0"],["left","0"],["width","100%"],["height","100%"],["max-width","none"],["max-height","none"],["display","block"],["overflow","visible"],["pointer-events","none"],["background","none"],["border","0"],["margin","0"],["padding","0"],["box-shadow","none"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])b.style.setProperty(d,A,"important");S=e.createElementNS("http://www.w3.org/2000/svg","polyline"),x=e.createElementNS("http://www.w3.org/2000/svg","polyline");for(let[d,A,v]of[[S,"rgba(29,78,216,0.85)","3"],[x,"#93C5FD","1.5"]])for(let[q,W]of[["fill","none"],["stroke",A],["stroke-width",v],["stroke-linejoin","round"],["stroke-linecap","round"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])d.style.setProperty(q,W,"important");b.append(S,x),u.append(b)}let C=[],T=null,I=0,E=(d,A)=>{let v=d.el.getBoundingClientRect(),q=v.width<=0&&v.height<=0||!d.el.isConnected||d.el.checkVisibility&&!d.el.checkVisibility(r);if(d.node.style.display=q?"none":"",q){d.docPt=null,d.viewRect=null;return}let W=d.anchor==="flow"?v.left-A.left:v.left,Y=d.anchor==="flow"?v.top-A.top:v.top;if(d.node.style.transform=`translate(${W}px, ${Y}px)`,d.sized)d.node.style.width=`${v.width}px`,d.node.style.height=`${v.height}px`;else{let O=d.node.getBoundingClientRect(),D=d.anchor==="flow"?{left:A.left,top:A.top,right:A.left+w,bottom:A.top+y}:{left:0,top:0,right:t.innerWidth,bottom:t.innerHeight},_=O.left<D.left?D.left-O.left:O.right>D.right?D.right-O.right:0,G=O.top<D.top?D.top-O.top:O.bottom>D.bottom?D.bottom-O.bottom:0;(_||G)&&(d.node.style.transform=`translate(${W+_}px, ${Y+G}px)`)}d.anchor==="flow"?d.docPt=`${W},${Y}`:d.viewRect=v},k=d=>{if(!x)return;let A=[];for(let q of C)q.offLine||q.node.style.display==="none"||(q.anchor==="flow"?q.docPt&&A.push(q.docPt):q.viewRect&&A.push(`${q.viewRect.left-d.left},${q.viewRect.top-d.top}`));let v=A.join(" ");S.setAttribute("points",v),x.setAttribute("points",v)},s=()=>{let d=e.documentElement.scrollWidth,A=e.documentElement.scrollHeight;d!==w&&(w=d,u.style.width=`${d}px`),A!==y&&(y=A,u.style.height=`${A}px`);let v=u.getBoundingClientRect();for(let q of C)E(q,v);k(v)};e.body.append(u,p);let f=()=>{I=t.requestAnimationFrame(f),s()};return f(),{setItems(d,A){for(let v of C)v.node.remove();C=d.map(v=>{let q=a(v.el);return(q==="flow"?u:p).append(v.node),{...v,anchor:q,docPt:null,viewRect:null}}),A&&!C.length?(T||(T=e.createElement("div"),T.className="pour-lens-notice",p.append(T)),T.textContent=A,T.style.display=""):T&&(T.style.display="none"),s()},destroy(){t.cancelAnimationFrame(I),u.remove(),p.remove(),C=[]}}}function n(c,m){for(let g=c.parentElement??c.getRootNode()?.host;g&&g!==e.documentElement;g=g.parentElement??g.getRootNode()?.host){let u=g.ownerDocument.defaultView.getComputedStyle(g);if(u.overflow==="visible"&&u.overflowX==="visible"&&u.overflowY==="visible")continue;let p=g.getBoundingClientRect();if(m.right<=p.left||m.left>=p.right||m.bottom<=p.top||m.top>=p.bottom)return!0}return!1}function o(){let c=[],m=[],g=u=>{for(let p of u.querySelectorAll("*")){if(p.dataset&&p.dataset.pourAudit||(p.shadowRoot&&g(p.shadowRoot),!p.matches('a[href], area[href], button, input, select, textarea, summary, iframe, object, embed, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]'))||p.disabled||p.closest("[inert]")||p.checkVisibility&&!p.checkVisibility(r))continue;let w=p.getBoundingClientRect();if(w.width<=0&&w.height<=0)continue;let y=p.getAttribute("tabindex"),x=y==null?0:parseInt(y,10)||0;if(x<0){p.matches("a[href], area[href], button, input, select, textarea, summary")&&!n(p,w)&&m.push({el:p});continue}c.push({el:p,idx:x,order:c.length})}};return g(e),{stops:[...c.filter(u=>u.idx>0).sort((u,p)=>u.idx-p.idx||u.order-p.order),...c.filter(u=>u.idx===0)],unreachable:m}}return{createLensTracker:i,collectFocusStops:o,clippedOutOfSight:n,VISIBLE_OPTS:r,anchorKind:a}}function ct(e=document,t=xe(e)){let r=e.defaultView,{createLensTracker:a,collectFocusStops:i,VISIBLE_OPTS:n}=t,o=null,c=0,m=null;function g(){if(o)return;qe(e),o=a("pour-focus-order-layer",{withLine:!0});let T=()=>{let{stops:I,unreachable:E}=i(),k=I.map((s,f)=>{let d=e.createElement("span");return d.className="pour-focus-badge"+(s.idx>0?" pour-focus-badge-forced":""),d.textContent=String(f+1),s.idx>0&&(d.title=`tabindex="${s.idx}" forces this position`),{el:s.el,node:d,sized:!1}});for(let{el:s}of E){let f=e.createElement("span");f.className="pour-focus-badge pour-focus-badge-unreachable",f.textContent="\u2715",f.title='tabindex="-1" \u2014 a keyboard cannot Tab to this control',k.push({el:s,node:f,sized:!1,offLine:!0})}o.setItems(k,"Focus order: this page has no keyboard-reachable controls")};T(),m=new r.MutationObserver(()=>{c||(c=r.setTimeout(()=>{c=0,T()},400))}),m.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function u(){r.clearTimeout(c),c=0,m?.disconnect(),m=null,o?.destroy(),o=null}let p=null,w=0,y=null;function x(T){let I=T.getAttribute("aria-label");if(I?.trim())return I.trim();let E=T.getAttribute("aria-labelledby");return E?E.split(/\s+/).map(k=>T.getRootNode().getElementById?.(k)?.textContent.trim()??"").filter(Boolean).join(" "):""}function b(){let T=[],I=[],E=s=>{for(let f of s.querySelectorAll("*")){if(f.dataset&&f.dataset.pourAudit||(f.shadowRoot&&E(f.shadowRoot),f.checkVisibility&&!f.checkVisibility(n)))continue;let d=f.getBoundingClientRect();if(d.width<=0&&d.height<=0)continue;let A=Be(f);if(st.has(A)){if(A==="form"&&!x(f))continue;T.push({el:f,role:A,name:x(f)})}else if(A==="heading"){let v=parseInt(f.getAttribute("aria-level"),10)||parseInt(f.tagName.charAt(1),10)||2;I.push({el:f,level:v})}}};E(e);let k=null;for(let s of I)s.skipped=k!=null&&s.level>k+1,s.from=k,k=s.level;return{landmarks:T,headings:I}}function S(){if(p)return;qe(e),p=a("pour-map-layer");let T=()=>{let{landmarks:I,headings:E}=b(),k=[];for(let s of I){let f=e.createElement("div");f.className=`pour-map-region pour-map-role-${s.role}`;let d=e.createElement("span");d.className="pour-map-tag",d.textContent=s.name?`${s.role} \xB7 ${s.name}`:s.role,f.append(d),k.push({el:s.el,node:f,sized:!0})}for(let s of E){let f=e.createElement("span");f.className="pour-map-heading"+(s.skipped?" pour-map-heading-skipped":""),f.textContent=`H${s.level}`,s.skipped&&(f.title=`Skips a level \u2014 the heading before this one is an H${s.from}`),k.push({el:s.el,node:f,sized:!1})}p.setItems(k,"No landmarks or headings are exposed on this page")};T(),y=new r.MutationObserver(()=>{w||(w=r.setTimeout(()=>{w=0,T()},400))}),y.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function C(){r.clearTimeout(w),w=0,y?.disconnect(),y=null,p?.destroy(),p=null}return{focusOrder:{apply:g,remove:u},landmarkMap:{apply:S,remove:C}}}var me="#262626";function Cr(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let r=t;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}var ne=(e,t,r)=>t+(r-t)*e(),te=e=>Number(e.toFixed(1));function dt(e,{start:t,steps:r,stride:a,wiggle:i,heading:n}){let o=[t],c=n;for(let m=0;m<r;m++){c+=ne(e,-i,i);let g=o[o.length-1];o.push([g[0]+Math.cos(c)*a,g[1]+Math.sin(c)*a])}return o}function ut(e){let t=[];for(let r=0;r<e.length-1;r++){let a=e[Math.max(0,r-1)],i=e[r],n=e[r+1],o=e[Math.min(e.length-1,r+2)],c=[i[0]+(n[0]-a[0])/6,i[1]+(n[1]-a[1])/6],m=[n[0]-(o[0]-i[0])/6,n[1]-(o[1]-i[1])/6];t.push(`M${te(i[0])} ${te(i[1])}C${te(c[0])} ${te(c[1])} ${te(m[0])} ${te(m[1])} ${te(n[0])} ${te(n[1])}`)}return t}function ze(e,t){let{width:r=2.6,dark:a=.6}=t,i=r,n=a;return ut(dt(e,t)).map(o=>(i=Math.max(r*.45,Math.min(r*1.9,i+ne(e,-.7,.7))),n=Math.max(a*.55,Math.min(a*1.35,n+ne(e,-.12,.12))),`<path d="${o}" stroke-width="${te(i)}" stroke-opacity="${n.toFixed(2)}"/>`)).join("")}function Mr(e,t){let r=dt(e,t),a=ut(r).map(n=>`<path d="${n}" stroke-width="1.1" stroke-opacity=".45"/>`).join(""),i=r.filter((n,o)=>o%2===0).map(([n,o])=>`<circle cx="${te(n)}" cy="${te(o)}" r="${ne(e,1.6,3.4).toFixed(1)}" fill="${me}" stroke="none" opacity="${ne(e,.45,.75).toFixed(2)}"/>`).join("");return a+i}function Lr(e,t){let r="";for(let a=0;a<4;a++){let i=ne(e,0,Math.PI*2);r+=ze(e,{start:[t[0]+ne(e,-18,18),t[1]+ne(e,-18,18)],steps:9,stride:13,wiggle:.9,heading:i,width:2.2,dark:.55})}return r}function Rr(e,t,r){let a=ne(e,40,110),i=2*Math.PI*r;return`<circle cx="${t[0]}" cy="${t[1]}" r="${r}" stroke-width="${ne(e,5,7).toFixed(1)}" stroke-opacity=".55" stroke-dasharray="${te(i-a)} ${te(a)}" transform="rotate(${te(ne(e,0,360))} ${t[0]} ${t[1]})"/><circle cx="${t[0]}" cy="${t[1]}" r="${r}" stroke-width="2" stroke-opacity=".3"/><circle cx="${te(t[0]+r*1.4)}" cy="${te(t[1]-r*.6)}" r="3" fill="${me}" stroke="none" opacity=".5"/>`}function Fr(e,t,r){return`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${t}" ry="${r}" fill="url(#cloud)" stroke="none" transform="rotate(-20 ${e[0]} ${e[1]})"/>`}function $r(e,t){let r="";for(let a=0;a<8;a++)r+=`<circle cx="${te(t[0]+ne(e,-40,40))}" cy="${te(t[1]+ne(e,-30,30))}" r="${ne(e,1.2,3.2).toFixed(1)}" fill="${me}" stroke="none" opacity="${ne(e,.4,.7).toFixed(2)}"/>`;return r}var Dr=(e,t)=>`url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><filter id="b" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="${t}"/></filter><radialGradient id="cloud"><stop offset="0" stop-color="${me}" stop-opacity=".38"/><stop offset=".55" stop-color="${me}" stop-opacity=".14"/><stop offset="1" stop-color="${me}" stop-opacity="0"/></radialGradient></defs><g filter="url(#b)" fill="none" stroke="${me}" stroke-linecap="round" stroke-linejoin="round">${e}</g></svg>`)}")`;function Nr(){let e=Cr(20260912);return[{depth:.95,size:.5,start:[.24,.3],art:Lr(e,[100,100])},{depth:.8,size:.44,start:[.66,.24],art:ze(e,{start:[20,150],steps:12,stride:15,wiggle:.7,heading:-.9,width:3,dark:.62})},{depth:.65,size:.3,start:[.5,.62],art:Rr(e,[100,100],17)},{depth:.55,size:.36,start:[.8,.6],art:Mr(e,{start:[30,70],steps:10,stride:14,wiggle:.8,heading:.4})},{depth:.4,size:.42,start:[.36,.8],art:Fr([100,100],62,34)},{depth:.3,size:.26,start:[.14,.58],art:$r(e,[100,100])},{depth:.15,size:.3,start:[.58,.85],art:ze(e,{start:[40,40],steps:11,stride:12,wiggle:.85,heading:.6,width:2,dark:.5})}]}var Or=.55,Ir=.4,pt=1,Ce=520,Pr=2.2;function ft(e,t){let r=e.defaultView,a=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,i={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="multiply",t.style.overflow="hidden";let n=()=>Math.max(180,Math.min(460,.32*Math.min(r.innerWidth,r.innerHeight))),o=Nr().map((E,k)=>{let s=e.createElement("div");s.className="pour-floater",s.setAttribute("aria-hidden","true"),s.dataset.pourAudit="filter";let f=(.8+E.depth*1.6).toFixed(2);return Object.assign(s.style,{position:"absolute",left:"0",top:"0",pointerEvents:"none",backgroundImage:Dr(E.art,f),backgroundSize:"contain",backgroundRepeat:"no-repeat",opacity:(.95-E.depth*.2).toFixed(2),willChange:"transform"}),t.appendChild(s),{el:s,shape:E,phase:k*1.7,size:0,x:E.start[0]*r.innerWidth,y:E.start[1]*r.innerHeight,vx:0,vy:0,angle:k*47%360,spin:0}}),c=()=>{let E=n();for(let k of o)k.size=E*k.shape.size,k.el.style.width=`${k.size}px`,k.el.style.height=`${k.size}px`},m=(E=0)=>{for(let k of o){let s=1+.03*Math.sin(E*.8+k.phase),f=2.5*Math.sin(E*.5+k.phase*.7);k.el.style.transform=`translate3d(${(k.x-k.size/2).toFixed(1)}px, ${(k.y-k.size/2).toFixed(1)}px, 0) rotate(${k.angle.toFixed(1)}deg) skewX(${f.toFixed(2)}deg) scale(${s.toFixed(3)})`}};c(),m();let g=0,u=0,p=r.scrollY,w=null,y=(E,k)=>{for(let s of o){let f=.45+.9*s.shape.depth;s.vx=Math.max(-Ce,Math.min(Ce,s.vx+E*f)),s.vy=Math.max(-Ce,Math.min(Ce,s.vy+k*f)),s.spin+=(E-k)*.02*f}},x=()=>{let E=r.scrollY-p;p=r.scrollY,E&&y(0,E*Ir)},b=(E,k)=>{w&&y((E-w.x)*pt,(k-w.y)*pt),w={x:E,y:k}},S=E=>{E.pointerType!=="touch"&&b(E.clientX,E.clientY)},C=E=>{let k=E.touches[0];k&&b(k.clientX,k.clientY)},T=()=>{c(),m()},I=E=>{g=r.requestAnimationFrame(I);let k=u?Math.min(.05,(E-u)/1e3):0;if(u=E,!k)return;let s=E/1e3,f=Math.exp(-k/Or),d=r.innerWidth,A=r.innerHeight;for(let v of o){v.vx+=Math.sin(s*.61+v.phase)*16*k,v.vy+=(Math.cos(s*.47+v.phase*1.3)*12+Pr*(.5+v.shape.depth))*k,v.vx*=f,v.vy*=f,v.spin*=f,v.x+=v.vx*k,v.y+=v.vy*k,v.angle+=(v.spin+Math.sin(s*.3+v.phase)*2)*k;let q=v.size*.25;v.x<q&&(v.vx=Math.abs(v.vx)+8),v.x>d-q&&(v.vx=-Math.abs(v.vx)-8),v.y<q&&(v.vy=Math.abs(v.vy)+8),v.y>A-q*1.6&&(v.vy=-Math.abs(v.vy)*.6-4)}m(s)};return r.addEventListener("resize",T),a||(r.addEventListener("scroll",x,{passive:!0}),e.addEventListener("pointermove",S,{passive:!0}),e.addEventListener("touchmove",C,{passive:!0}),g=r.requestAnimationFrame(I)),{stop(){g&&r.cancelAnimationFrame(g),g=0,r.removeEventListener("resize",T),r.removeEventListener("scroll",x),e.removeEventListener("pointermove",S),e.removeEventListener("touchmove",C);for(let E of o)E.el.remove();t.style.mixBlendMode=i.mixBlendMode,t.style.overflow=i.overflow}}}function ht(e,t){let r=e.defaultView,a=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,i={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="screen",t.style.overflow="hidden";let n=e.createElement("div");n.setAttribute("aria-hidden","true"),n.dataset.pourAudit="filter",n.dataset.pourReflection="room",Object.assign(n.style,{position:"absolute",inset:"-20%",pointerEvents:"none",background:"radial-gradient(ellipse 30% 38% at 74% 16%, rgba(255,249,236,0.4), rgba(255,249,236,0.13) 42%, rgba(255,249,236,0) 72%), radial-gradient(ellipse 55% 26% at 18% 92%, rgba(255,255,255,0.1), rgba(255,255,255,0) 70%)",willChange:"transform"}),t.appendChild(n);let o=e.createElement("video");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourReflection="camera",o.muted=!0,o.playsInline=!0,o.autoplay=!0,Object.assign(o.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"cover",transform:"scaleX(-1)",opacity:String(.2),filter:"blur(0.9px) contrast(1.05)",pointerEvents:"none"}),t.appendChild(o);let c=null,m=0,g=b=>{c=e.createElement("div"),c.dataset.pourAudit="filter",c.dataset.pourReflection="note",c.setAttribute("role","status"),c.textContent=b,Object.assign(c.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(420px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(c),m=r.setTimeout(()=>{c?.remove(),c=null},7e3)},u=null,p=!1,w=r.navigator?.mediaDevices;w?.getUserMedia?w.getUserMedia({video:{facingMode:"user",width:{ideal:1280},height:{ideal:720}},audio:!1}).then(b=>{if(p){for(let S of b.getTracks())S.stop();return}u=b,o.srcObject=b,o.play().catch(()=>{})}).catch(()=>{p||g("Camera not available here, so the room light is shown without your reflection.")}):g("This page cannot use the camera (it needs a secure page), so the room light is shown without your reflection.");let y=0,x=b=>{y=r.requestAnimationFrame(x);let S=b/1e3;n.style.transform=`translate3d(${(Math.sin(S*.11)*14).toFixed(1)}px, ${(Math.cos(S*.083)*9).toFixed(1)}px, 0)`};return a||(y=r.requestAnimationFrame(x)),{stop(){if(p=!0,y&&r.cancelAnimationFrame(y),y=0,m&&r.clearTimeout(m),c?.remove(),c=null,u)for(let b of u.getTracks())b.stop();u=null,o.srcObject=null,o.remove(),n.remove(),t.style.mixBlendMode=i.mixBlendMode,t.style.overflow=i.overflow}}}var mt={aquatic:{scheme:"dark",canvas:"#202020",canvasText:"#FFFFFF",linkText:"#75E9FC",grayText:"#A6A6A6",highlight:"#8EE3F0",highlightText:"#263B50",buttonFace:"#202020",buttonText:"#FFFFFF"}},Q=":not([data-pour-audit]):not([data-pour-audit] *):not([data-pour-fc-keep])",gt=["data-pour-fc-bg","data-pour-fc-bgimg","data-pour-fc-before","data-pour-fc-after","data-pour-fc-keep"],Br='script, style, noscript, template, textarea, option, select, title, svg, math, [data-pour-audit], [contenteditable]:not([contenteditable="false"])',yt='button, input[type="button"], input[type="submit"], input[type="reset"]',vt="input, textarea, select";function qr(e){return`
html${Q} { background-color: ${e.canvas} !important; color: ${e.canvasText} !important; color-scheme: ${e.scheme} !important; }
*${Q}, *${Q}::before, *${Q}::after {
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
a${Q}[href] { color: ${e.linkText} !important; }
${yt.split(", ").map(t=>`${t}${Q}`).join(", ")} { color: ${e.buttonText} !important; }
${vt.split(", ").map(t=>`${t}${Q}`).join(", ")} { color: ${e.canvasText} !important; }
[data-pour-fc-bg="canvas"]${Q} { background-color: ${e.canvas} !important; }
[data-pour-fc-bg="button"]${Q} { background-color: ${e.buttonFace} !important; }
[data-pour-fc-bg="field"]${Q} { background-color: ${e.canvas} !important; }
[data-pour-fc-bg="highlight"]${Q} { background-color: ${e.highlight} !important; color: ${e.highlightText} !important; }
[data-pour-fc-plate]${Q} { background-color: ${e.canvas} !important; box-shadow: 0 0 0 2px ${e.canvas} !important; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
[data-pour-fc-bg="highlight"] [data-pour-fc-plate]${Q} { background-color: ${e.highlight} !important; box-shadow: 0 0 0 2px ${e.highlight} !important; }
[data-pour-fc-bg="button"] [data-pour-fc-plate]${Q} { background-color: ${e.buttonFace} !important; box-shadow: 0 0 0 2px ${e.buttonFace} !important; }
[data-pour-fc-bgimg]${Q} { background-image: none !important; }
[data-pour-fc-before]${Q}::before { background-color: ${e.canvas} !important; background-image: none !important; }
[data-pour-fc-after]${Q}::after { background-color: ${e.canvas} !important; background-image: none !important; }
*${Q}:disabled, *${Q}[aria-disabled="true"], *${Q}:disabled *, *${Q}[aria-disabled="true"] * { color: ${e.grayText} !important; border-color: ${e.grayText} !important; }
*${Q}::placeholder { color: ${e.grayText} !important; }
*${Q}::selection, *${Q}::-moz-selection { background-color: ${e.highlight} !important; color: ${e.highlightText} !important; }
`}function bt(e){if(!e||e==="transparent")return 0;let t=/^rgba?\(\s*[\d.]+\s*,?\s*[\d.]+\s*,?\s*[\d.]+\s*(?:[,/]\s*([\d.]+%?))?\s*\)$/i.exec(e);return!t||t[1]===void 0?1:t[1].endsWith("%")?parseFloat(t[1])/100:parseFloat(t[1])}function xt(e,{theme:t="aquatic"}={}){let r=e.defaultView,a=mt[t]||mt.aquatic,i=!1,n=e.createElement("style");n.id="pour-forced-colours-page",n.dataset.pourAudit="filter";let o=e.createElement("style");o.id="pour-forced-colours",o.dataset.pourAudit="filter",o.textContent=qr(a),e.head.appendChild(n),e.head.appendChild(o);let c=s=>s.closest("[data-pour-audit]"),m=s=>{if(s.namespaceURI!=="http://www.w3.org/1999/xhtml"||c(s)||s.hasAttribute("data-pour-fc-plate"))return;let f=r.getComputedStyle(s);if(f.forcedColorAdjust==="none"){s.setAttribute("data-pour-fc-keep","");return}s.matches("mark")?s.setAttribute("data-pour-fc-bg","highlight"):bt(f.backgroundColor)>0?s.setAttribute("data-pour-fc-bg",s.matches(yt)?"button":s.matches(vt)?"field":"canvas"):s.removeAttribute("data-pour-fc-bg"),f.backgroundImage.includes("gradient(")?s.setAttribute("data-pour-fc-bgimg",""):s.removeAttribute("data-pour-fc-bgimg");for(let[d,A]of[["::before","data-pour-fc-before"],["::after","data-pour-fc-after"]]){let v=r.getComputedStyle(s,d);v.content!=="none"&&v.content!=="normal"&&(bt(v.backgroundColor)>0||v.backgroundImage.includes("gradient("))?s.setAttribute(A,""):s.removeAttribute(A)}},g=s=>{if(s.nodeType!==1||s.namespaceURI!=="http://www.w3.org/1999/xhtml")return;let f=e.createTreeWalker(s,r.NodeFilter.SHOW_TEXT),d=[];for(;f.nextNode();)d.push(f.currentNode);for(let A of d){if(!A.textContent.trim())continue;let v=A.parentElement;if(!v||v.namespaceURI!=="http://www.w3.org/1999/xhtml"||v.hasAttribute("data-pour-fc-plate")||v.closest(Br))continue;let q=e.createElement("span");q.setAttribute("data-pour-fc-plate",""),v.replaceChild(q,A),q.appendChild(A)}},u=()=>{let s=e.querySelectorAll("[data-pour-fc-plate]");for(let f of s)f.replaceWith(...f.childNodes);s.length&&e.body.normalize()},p=s=>{if(s.nodeType===1){m(s);for(let f of s.querySelectorAll("*"))m(f);g(s)}},w=new Set,y=0,x=()=>{y=0;let s=[...w];w.clear();for(let f of s)f.isConnected&&p(f)},b=new r.MutationObserver(s=>{for(let f of s)if(f.type==="childList")for(let d of f.addedNodes)d.nodeType===1&&!d.hasAttribute("data-pour-fc-plate")&&w.add(d);else f.target.nodeType===1&&w.add(f.target);w.size&&!y&&(y=r.requestAnimationFrame(x))});p(e.body),b.observe(e.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class","style","disabled","aria-disabled","open","hidden"]});let S=/forced-colors\s*:\s*active|-ms-high-contrast\s*:\s*active/i,C=[],T=[],I=(s,f)=>{for(let d of s){let A=d.conditionText??d.media?.mediaText??"";if(d.media!==void 0&&d.cssRules!==void 0&&!f&&S.test(A)){I(d.cssRules,!0);continue}if(d.styleSheet){try{I(d.styleSheet.cssRules,f)}catch{}continue}if(f){C.push(d.cssText),d.style&&d.selectorText&&d.style.getPropertyValue("forced-color-adjust").trim()==="none"&&T.push(d.selectorText);continue}d.cssRules&&I(d.cssRules,!1)}},E=()=>{if(!i){n.textContent=C.join(`
`);for(let s of T){let f=[];try{f=e.querySelectorAll(s)}catch{continue}for(let d of f)c(d)||d.setAttribute("data-pour-fc-keep","")}}},k=[];for(let s of e.styleSheets)if(!s.ownerNode?.dataset?.pourAudit)try{I(s.cssRules,!1)}catch{if(!s.href||typeof r.CSSStyleSheet!="function")continue;k.push(r.fetch(s.href,{mode:"cors"}).then(f=>f.ok?f.text():"").then(f=>{if(!f||i)return;let d=new r.CSSStyleSheet;d.replaceSync(f),I(d.cssRules,!1)}).catch(()=>{}))}return E(),k.length&&Promise.all(k).then(E),{stop(){i=!0,b.disconnect(),y&&r.cancelAnimationFrame(y),y=0,w.clear(),u(),o.remove(),n.remove();for(let s of e.querySelectorAll(gt.map(f=>`[${f}]`).join(",")))for(let f of gt)s.removeAttribute(f)}}}var Ve="http://www.w3.org/2000/svg",wt="pour-lens-filter";function zr(e,{radius:t,ring:r,scale:a,magnify:i}){let n=t+r,o=(n+2)*2,c=o/2,m=e.createElement("canvas");m.width=o,m.height=o;let g=m.getContext("2d"),u=g.createImageData(o,o),p=u.data,w=t/i;for(let y=0;y<o;y++)for(let x=0;x<o;x++){let b=x+.5-c,S=y+.5-c,C=Math.hypot(b,S),T=C;if(C<t)T=C/i;else if(C<n){let f=(C-t)/r,d=f*f*(3-2*f);T=w+(n-w)*d}let I=C>0?T/C-1:0,E=I*b,k=I*S,s=(y*o+x)*4;p[s]=Math.max(0,Math.min(255,Math.round(127.5+E/a*255))),p[s+1]=Math.max(0,Math.min(255,Math.round(127.5+k/a*255))),p[s+2]=0,p[s+3]=Math.round(255*Math.max(0,Math.min(1,(n+2-C)/2)))}return g.putImageData(u,0,0),{href:m.toDataURL("image/png"),size:o}}function kt(e,{scale:t=2,radius:r=110,ring:a=60,point:i,target:n}){let o=e.defaultView,c=n||e.documentElement,m=Math.ceil(2*r*(1-1/t)*1.05),g=zr(e,{radius:r,ring:a,scale:m,magnify:t}),u=e.createElementNS(Ve,"svg");u.setAttribute("width","0"),u.setAttribute("height","0"),u.setAttribute("aria-hidden","true"),u.setAttribute("focusable","false"),u.dataset.pourAudit="filter",u.dataset.pourLens="defs",Object.assign(u.style,{position:"absolute",pointerEvents:"none"});let p=e.createElementNS(Ve,"filter");p.setAttribute("id",wt),p.setAttribute("filterUnits","userSpaceOnUse"),p.setAttribute("primitiveUnits","userSpaceOnUse"),p.setAttribute("x","0"),p.setAttribute("y","0"),p.setAttribute("width","100%"),p.setAttribute("height","100%"),p.setAttribute("color-interpolation-filters","sRGB");let w=(d,A)=>{let v=e.createElementNS(Ve,d);for(let[q,W]of Object.entries(A))v.setAttribute(q,String(W));return v},y={width:g.size,height:g.size},x=w("feImage",{href:g.href,preserveAspectRatio:"none",result:"map",...y}),b=w("feDisplacementMap",{in:"SourceGraphic",in2:"map",scale:m,xChannelSelector:"R",yChannelSelector:"G",result:"lens",...y}),S=w("feComposite",{in:"lens",in2:"map",operator:"in",result:"cut",...y}),C=w("feComposite",{in:"SourceGraphic",in2:"map",operator:"out",result:"rest"}),T=w("feComposite",{in:"cut",in2:"rest",operator:"over"}),I=[x,b,S];for(let d of[x,b,S,C,T])p.appendChild(d);u.appendChild(p),e.body.appendChild(u);let E=c.style.filter;c.style.filter=`url(#${wt})`;let k="",s=0,f=()=>{s=o.requestAnimationFrame(f);let d=i(),A=c.getBoundingClientRect(),v=Math.round(d.x-A.left-g.size/2),q=Math.round(d.y-A.top-g.size/2),W=`${v},${q}`;if(W!==k){k=W;for(let Y of I)Y.setAttribute("x",String(v)),Y.setAttribute("y",String(q))}};return s=o.requestAnimationFrame(f),{stop(){s&&o.cancelAnimationFrame(s),s=0,c.style.filter=E,u.remove()}}}var Vr=["a[href]","button",'input:not([type="hidden"])',"select","textarea","summary",'[role="button"]','[role="link"]','[role="checkbox"]','[role="radio"]','[role="switch"]','[role="tab"]','[role="menuitem"]','[role="option"]'].join(", "),Gr=61,_r=1400;function jr(e,t){let r=Math.PI*(3-Math.sqrt(5));return Array.from({length:e},(a,i)=>{let n=t*Math.sqrt((i+.5)/e);return[Math.cos(i*r)*n,Math.sin(i*r)*n]})}function St(e,{diameter:t=38}={}){let r=e.defaultView,a=e.documentElement,i=t/2,n=jr(Gr,i),c=Math.ceil(t+3*2),m=e.createElement("canvas");m.width=c,m.height=c;let g=m.getContext("2d"),u=c/2;g&&(g.beginPath(),g.arc(u,u,i,0,Math.PI*2),g.fillStyle="rgba(17, 17, 17, 0.16)",g.fill(),g.lineWidth=2.5,g.strokeStyle="rgba(255, 255, 255, 0.9)",g.stroke(),g.lineWidth=1.25,g.strokeStyle="rgba(17, 17, 17, 0.85)",g.stroke(),g.beginPath(),g.arc(u,u,1.5,0,Math.PI*2),g.fillStyle="rgba(17, 17, 17, 0.85)",g.fill());let p=g?`url("${m.toDataURL("image/png")}") ${Math.round(u)} ${Math.round(u)}, auto`:"auto",w=e.createElement("style");w.dataset.pourAudit="filter",w.textContent=`
    html { cursor: ${p} !important; }
    :not(html) { cursor: inherit !important; }
    [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
  `,e.head.appendChild(w);let y=e.createElement("div");y.dataset.pourAudit="filter",y.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:2147483647;contain:strict;",e.body.appendChild(y);let x=()=>{let l=e.createElement("div");l.style.cssText="position:absolute;left:0;top:0;box-sizing:border-box;border-radius:3px;display:none;";let h=e.createElement("span");return h.style.cssText="position:absolute;left:-2px;bottom:100%;margin-bottom:3px;padding:1px 5px;border-radius:4px;font:600 11px/15px system-ui,-apple-system,sans-serif;font-variant-numeric:tabular-nums;white-space:nowrap;letter-spacing:0;",l.appendChild(h),y.appendChild(l),{el:l,chip:h}},b=[],S=x(),C=(l,h)=>{let L=e.elementFromPoint(l,h);for(;L?.shadowRoot;){let R=L.shadowRoot.elementFromPoint(l,h);if(!R||R===L)break;L=R}return L},T=l=>{for(let h=l;h;h=h.parentElement??h.getRootNode().host??null)if(h.nodeType===1){if(h.hasAttribute("data-pour-audit"))return null;if(h.matches(Vr))return h.matches(":disabled")?null:h}return null};function I(l,h){let L=new Map,R=0;for(let[z,V]of n){let j=T(C(l+z,h+V));j&&(L.set(j,(L.get(j)??0)+1),R++)}return[...L].map(([z,V])=>({el:z,share:V/R})).sort((z,V)=>V.share-z.share)}let E=(l,h,L)=>{let R=null,z=1/0;for(let V of l.getClientRects()){let j=Math.max(V.left-h,0,h-V.right),K=Math.max(V.top-L,0,L-V.bottom),ee=j*j+K*K;ee<z&&(z=ee,R=V)}return R??l.getBoundingClientRect()},k=(l,h,{border:L,halo:R,chipText:z,chipBg:V,chipFg:j})=>{Object.assign(l.el.style,{display:"block",transform:`translate(${Math.round(h.left-3)}px, ${Math.round(h.top-3)}px)`,width:`${Math.round(h.width+6)}px`,height:`${Math.round(h.height+6)}px`,border:`2px solid ${L}`,boxShadow:`0 0 0 1px ${R}`}),l.chip.style.display=z?"block":"none",l.chip.textContent=z??"",l.chip.style.background=V??"",l.chip.style.color=j??"";let K=h.top>22;l.chip.style.bottom=K?"100%":"auto",l.chip.style.top=K?"auto":"100%",l.chip.style.marginBottom=K?"3px":"0",l.chip.style.marginTop=K?"0":"3px"},s=-1,f=-1,d=!1,A=0;function v(){A=0;let l=d?I(s,f):[],h=l.length>1;for(;b.length<l.length;)b.push(x());let L=[];if(b.forEach((R,z)=>{let V=l[z];if(!V){R.el.style.display="none";return}let j=E(V.el,s,f);k(R,j,h?{border:"#F59E0B",halo:"rgba(17,17,17,0.55)",chipText:`${Math.round(V.share*100)}%`,chipBg:"#F59E0B",chipFg:"#111"}:{border:"rgba(17,17,17,0.8)",halo:"rgba(255,255,255,0.9)"}),R.chip.style.left="-2px",L.push({b:R,r:j})}),h){let R=-1/0;for(let{b:z,r:V}of L.sort((j,K)=>j.r.left-K.r.left)){let j=Math.round(V.left-3),K=Math.max(j-2,R);z.chip.style.left=`${K-j}px`,R=K+z.chip.offsetWidth+3}}}let q=()=>{A||(A=r.requestAnimationFrame(v))},W="mouse",Y=null,O=0,D=l=>{W=l.pointerType||"mouse",W!=="touch"&&(s=l.clientX,f=l.clientY,d=!0,q())},_=l=>{l.relatedTarget||(d=!1,q())},G=l=>{if(W=l.pointerType||"mouse",W==="touch"||l.button!==0){Y=null;return}Y={shares:I(l.clientX,l.clientY),natural:T(C(l.clientX,l.clientY))}},P=l=>{let h=Y;if(Y=null,!h||!l.isTrusted||l.detail===0||W==="touch"||!h.shares.length)return;let L=Math.random(),R=h.shares[h.shares.length-1].el;for(let z of h.shares)if(L-=z.share,L<=0){R=z.el;break}R!==h.natural&&(l.preventDefault(),l.stopImmediatePropagation(),k(S,E(R,l.clientX,l.clientY),{border:"#111",halo:"rgba(255,255,255,0.9)",chipText:"The tap landed here",chipBg:"#111",chipFg:"#fff"}),r.clearTimeout(O),O=r.setTimeout(()=>{S.el.style.display="none"},_r),typeof R.focus=="function"&&R.focus({preventScroll:!0}),R.click())};return e.addEventListener("pointermove",D,{passive:!0}),e.addEventListener("pointerdown",G,!0),e.addEventListener("mouseout",_,{passive:!0}),r.addEventListener("click",P,!0),r.addEventListener("scroll",q,{passive:!0,capture:!0}),{stop(){e.removeEventListener("pointermove",D),e.removeEventListener("pointerdown",G,!0),e.removeEventListener("mouseout",_),r.removeEventListener("click",P,!0),r.removeEventListener("scroll",q,{capture:!0}),A&&r.cancelAnimationFrame(A),r.clearTimeout(O),y.remove(),w.remove()}}}var At=(e,t)=>[e.style.getPropertyValue(t),e.style.getPropertyPriority(t)],Ge=(e,t,[r,a])=>{r?e.style.setProperty(t,r,a):e.style.removeProperty(t)},Hr=e=>e.transform!=="none"||e.translate!=="none"||e.rotate!=="none"||e.scale!=="none"||e.perspective!=="none"||e.filter!=="none"||(e.backdropFilter??"none")!=="none"||/paint|layout|strict|content/.test(e.contain)||/transform|perspective|filter/.test(e.willChange)||e.containerType&&e.containerType!=="normal";function Tt(e,{scale:t=4}={}){let r=e.defaultView,a=e.documentElement,i=e.scrollingElement||a,n=["transform","transform-origin","height"].map(l=>[l,At(a,l)]),o=r.innerWidth/2,c=r.innerHeight/2,m=0,g=0,u=new Map;a.style.setProperty("height","100%","important");function p(){a.style.removeProperty("transform"),m=Math.max(0,i.scrollWidth-r.innerWidth),g=Math.max(0,i.scrollHeight-r.innerHeight),a.style.setProperty("transform",`scale(${t})`,"important")}function w(){let l=r.scrollX,h=r.scrollY;a.style.setProperty("transform-origin",`${l+o}px ${h+c}px`,"important");for(let[L,{base:R}]of u)L.style.setProperty("translate",`calc(${R[0]} + ${l}px) calc(${R[1]} + ${h}px)`,"important")}function y(){let l=new Set;for(let h of e.body.getElementsByTagName("*")){if(h.hasAttribute("data-pour-audit"))continue;let L=r.getComputedStyle(h);if(L.position!=="fixed")continue;let R=!0;for(let z=h.parentElement;z&&z!==a;z=z.parentElement){if(l.has(z)){R=!1;break}if(!u.has(z)&&Hr(r.getComputedStyle(z))){R=!1;break}}if(R&&(l.add(h),!u.has(h))){let[z="0px",V="0px"]=L.translate==="none"?[]:L.translate.split(" ");u.set(h,{saved:At(h,"translate"),base:[z,V]})}}for(let[h,L]of u)l.has(h)||(Ge(h,"translate",L.saved),u.delete(h));w()}let x=()=>{let l=o*(1-1/t),h=c*(1-1/t);return{left:l,top:h,right:l+r.innerWidth/t,bottom:h+r.innerHeight/t}},b=l=>({left:o+(l.left-o)/t,top:c+(l.top-c)/t,right:o+(l.right-o)/t,bottom:c+(l.bottom-c)/t}),S=(l,h)=>l.left<h.right&&l.right>h.left&&l.top<h.bottom&&l.bottom>h.top,C=e.createElement("div");C.dataset.pourAudit="filter",C.setAttribute("popover","manual"),C.style.cssText="position:fixed;inset:0;width:auto;height:auto;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:none;z-index:2147483647;",e.body.appendChild(C);try{C.showPopover()}catch{}let T=new Map,I=l=>{let h=(l.getAttribute("aria-label")||l.textContent||l.getAttribute("alt")||"").replace(/\s+/g," ").trim();return h?h.length>38?`${h.slice(0,37)}\u2026`:h:l.tagName==="IMG"?"An image":"Something"};function E(l){T.has(l)&&T.get(l).remove();let h=e.createElement("div");if(h.style.cssText="position:absolute;left:0;top:0;display:flex;align-items:center;gap:6px;max-width:280px;padding:4px 9px 4px 6px;border-radius:6px;background:#111;color:#fff;box-shadow:0 0 0 1px rgba(255,255,255,0.9);font:600 12px/16px system-ui,-apple-system,sans-serif;white-space:nowrap;letter-spacing:0;",h.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg><span style="overflow:hidden;text-overflow:ellipsis"></span>',h.lastChild.textContent=`Changed out of view: ${I(l)}`,C.appendChild(h),T.set(l,h),T.size>6){let[L]=T.keys();T.get(L).remove(),T.delete(L)}s()}let k=0,s=()=>{!k&&T.size&&(k=r.requestAnimationFrame(f))};function f(){k=0;let l=r.innerWidth,h=r.innerHeight,L=x();for(let[R,z]of T){let V=R.isConnected&&R.checkVisibility?.({checkOpacity:!0,checkVisibilityCSS:!0})!==!1?R.getBoundingClientRect():null;if(!V||!V.width||!V.height||S(b(V),L)){z.remove(),T.delete(R);continue}let j=(V.left+V.right)/2-l/2,K=(V.top+V.bottom)/2-h/2,ee=z.offsetWidth/2,oe=z.offsetHeight/2,ue=Math.min(j?(l/2-14-ee)/Math.abs(j):1/0,K?(h/2-14-oe)/Math.abs(K):1/0),fe=l/2+j*Math.min(ue,1e6),be=h/2+K*Math.min(ue,1e6);z.style.transform=`translate(${Math.round(fe-ee)}px, ${Math.round(be-oe)}px)`,z.firstChild.style.transform=`rotate(${Math.atan2(K,j)}rad)`}T.size&&(k=r.requestAnimationFrame(f))}let d=new Set,A=0,v=0;function q(){A=0;let l=d;d=new Set;let h=r.innerWidth,L=r.innerHeight,R={left:0,top:0,right:h,bottom:L},z=x();for(let V of l){if(!V.isConnected||V===e.body||V===a||V.closest("[data-pour-audit]")||V.checkVisibility?.({checkOpacity:!0,checkVisibilityCSS:!0})===!1)continue;let j=b(V.getBoundingClientRect()),K=j.right-j.left,ee=j.bottom-j.top;!K||!ee||K*ee>h*L*.5||S(j,R)&&!S(j,z)&&E(V)}}let W=new r.MutationObserver(l=>{let h=!1;for(let L of l){let R=L.target.nodeType===1?L.target:L.target.parentElement;if(!(!R||R===a)&&!(L.type==="attributes"&&L.attributeName==="style"&&u.has(R))&&!R.closest("[data-pour-audit]"))if(h=!0,L.type==="childList")for(let z of L.addedNodes)z.nodeType===1?d.add(z):z.nodeType===3&&z.textContent.trim()&&d.add(R);else d.add(R)}d.size&&!A&&(A=r.requestAnimationFrame(q)),h&&!v&&(v=r.setTimeout(()=>{v=0,p(),y()},300))}),Y=0,O=(l,h)=>{o=Math.max(0,Math.min(r.innerWidth,l)),c=Math.max(0,Math.min(r.innerHeight,h)),Y||(Y=r.requestAnimationFrame(()=>{Y=0,w(),s()}))},D=l=>O(l.clientX,l.clientY),_=l=>{let h=l.target;if(h?.nodeType!==1||h.closest("[data-pour-audit]"))return;let L=!1;try{L=h.matches(":focus-visible")}catch{L=!0}L&&r.requestAnimationFrame(()=>{let R=b(h.getBoundingClientRect());O((R.left+R.right)/2,(R.top+R.bottom)/2)})},G=()=>{(r.scrollY>g||r.scrollX>m)&&r.scrollTo({left:Math.min(r.scrollX,m),top:Math.min(r.scrollY,g),behavior:"instant"}),w(),s()},P=()=>{p(),O(o,c),y()};return p(),y(),W.observe(e.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeFilter:["class","style","hidden","open","aria-hidden"]}),e.addEventListener("pointermove",D,{passive:!0}),e.addEventListener("focusin",_,!0),r.addEventListener("scroll",G,{passive:!0}),r.addEventListener("resize",P),{stop(){W.disconnect(),e.removeEventListener("pointermove",D),e.removeEventListener("focusin",_,!0),r.removeEventListener("scroll",G),r.removeEventListener("resize",P);for(let l of[k,A,Y])l&&r.cancelAnimationFrame(l);r.clearTimeout(v);for(let[l,h]of u)Ge(l,"translate",h.saved);u.clear();for(let[l,h]of n)Ge(a,l,h);C.remove()}}}var Et=`/* Overlay styles for the vision & sensory filters \u2014 ported from
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
`;function we(e){for(let t=e;t;t=t.parentElement??t.getRootNode?.().host??null)if(t.nodeType===1&&t.hasAttribute("data-pour-audit"))return!0;return!1}function Ct(e,t,{ms:r=7e3,role:a="status"}={}){let i=e.defaultView,n=e.createElement("div");n.dataset.pourAudit="filter",n.setAttribute("role",a),n.textContent=t,Object.assign(n.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(460px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",textAlign:"left",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(n);let o=r?i.setTimeout(()=>n.remove(),r):0;return()=>{o&&i.clearTimeout(o),n.remove()}}function ge(e,{interactive:t=!1,zIndex:r="2147483647"}={}){let a=e.createElement("div");a.dataset.pourAudit="filter",a.setAttribute("aria-hidden",t?"false":"true"),a.style.cssText=`position:fixed;inset:0;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:${t?"auto":"none"};z-index:${r};width:auto;height:auto;max-width:none;max-height:none;color:inherit;`,a.setAttribute("popover","manual"),e.body.appendChild(a);try{a.showPopover()}catch{}return a}function*ke(e){let t=[e];for(;t.length;){let r=t.pop();if(r.nodeType===1){if(r.hasAttribute("data-pour-audit"))continue;yield r,r.shadowRoot&&t.push(r.shadowRoot)}let a=r.children??[];for(let i=a.length-1;i>=0;i--)t.push(a[i])}}function Mt(e,t){let r=e.createElement("style");return r.dataset.pourAudit="filter",r.textContent=t,e.head.appendChild(r),()=>r.remove()}function _e(e){return!!(e.isSecureContext&&e.navigator?.mediaDevices?.getDisplayMedia)}async function Lt(e){let t=e.defaultView;if(!_e(t))throw new Error("self capture unavailable");let r=await t.navigator.mediaDevices.getDisplayMedia({video:{displaySurface:"browser",frameRate:{ideal:30}},audio:!1,preferCurrentTab:!0,selfBrowserSurface:"include",surfaceSwitching:"exclude",systemAudio:"exclude"}),a=e.createElement("video");a.dataset.pourAudit="filter",a.muted=!0,a.playsInline=!0,a.autoplay=!0,a.style.cssText="position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none;",a.srcObject=r,e.body.appendChild(a),await a.play().catch(()=>{});let i=()=>{for(let n of r.getTracks())n.stop();a.srcObject=null,a.remove()};return r.getVideoTracks()[0]?.addEventListener("ended",i),{video:a,stream:r,stop:i}}function Rt(e,{label:t,choices:r,labels:a={},value:i,onChange:n}){let o=ge(e,{interactive:!0});o.style.pointerEvents="none";let c=e.createElement("div");c.setAttribute("role","group"),c.setAttribute("aria-label",t),c.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:6px;border-radius:10px;max-width:min(520px, calc(100vw - 32px));box-sizing:border-box;background:#1B1D22;box-shadow:0 4px 16px rgba(0,0,0,0.3);pointer-events:auto;font:500 13px/1 system-ui,sans-serif;z-index:2147483647;";let m=new Map,g=i,u=()=>{for(let[p,w]of m){let y=p===g;w.setAttribute("aria-pressed",y?"true":"false"),w.style.background=y?"#FFD60A":"transparent",w.style.color=y?"#1B1D22":"#FCFCFC"}};for(let p of r){let w=e.createElement("button");w.type="button",w.textContent=a[p]??p,w.style.cssText="appearance:none;border:0;border-radius:6px;padding:7px 9px;font:inherit;cursor:pointer;background:transparent;color:#FCFCFC;white-space:nowrap;",w.addEventListener("click",()=>{p!==g&&(g=p,u(),n?.(p))}),c.appendChild(w),m.set(p,w)}return o.appendChild(c),u(),{remove(){try{o.hidePopover()}catch{}o.remove()},set(p){g=p,u()}}}var je=.55,Yr=250,Xr=2e3,Ft=500,Kr=4e3,Ur=1.5,Jr=.45,Qr=80,Zr='img, video, canvas, svg, picture, marquee, [class*="carousel" i], [class*="slide" i], [class*="marquee" i], [class*="ticker" i], [class*="parallax" i], [class*="swiper" i], [class*="slick" i]';function $t(e,{decay:t=.86}={},r){let a=e.defaultView,i=r.container,n=a.performance;t=Math.min(.995,Math.max(.05,Number(t)||.86));let o=e.createElement("canvas");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourAfterimages="trail",Object.assign(o.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none",opacity:String(je),mixBlendMode:"normal"}),i.appendChild(o);let c=o.getContext("2d"),m=[],g=O=>m.push(Ct(e,O)),u=0,p=0,w=!1,y=null,x=!1,b=0,S=0,C=[],T=()=>{u=a.innerWidth,p=a.innerHeight,o.width=Math.max(1,u),o.height=Math.max(1,p),x=!1},I=O=>{b=0;let D=S?Math.min(100,O-S):16;S=O;let _=Math.pow(t,D/100);if(y){let{video:G}=y;if(G.readyState>=2&&G.videoWidth){let P=Math.max(0,(_-je)/(1-je));c.globalAlpha=x?1-P:1,c.drawImage(G,0,0,u,p),c.globalAlpha=1,x=!0}b=a.requestAnimationFrame(I);return}c.clearRect(0,0,u,p);for(let G=C.length-1;G>=0;G--){let P=C[G],l=Jr*Math.pow(t,(O-P.born)/100);if(l<.01){C.splice(G,1);continue}c.globalAlpha=l,c.fillStyle="#6b6b6b",c.fillRect(P.x,P.y,P.w,P.h),c.globalAlpha=Math.min(1,l*1.6),c.strokeStyle="#2a2a2a",c.lineWidth=1,c.strokeRect(P.x+.5,P.y+.5,Math.max(0,P.w-1),Math.max(0,P.h-1))}c.globalAlpha=1,C.length?b=a.requestAnimationFrame(I):S=0},E=()=>{!b&&!w&&(b=a.requestAnimationFrame(I))},k=()=>{T()};a.addEventListener("resize",k);let s=O=>O.bottom>0&&O.right>0&&O.top<p&&O.left<u&&(O.width>0||O.height>0),f=()=>{let O=[];try{O=e.getAnimations?.()??[]}catch{O=[]}return O.filter(D=>D.playState==="running"&&!(a.CSSTransition&&D instanceof a.CSSTransition))},d=new Map,A=[],v=()=>{let O=[],D=new Set,_=l=>{!l||l.nodeType!==1||D.has(l)||we(l)||(D.add(l),O.push(l))};for(let l of f())_(l.effect?.target);let G=[],P=0;for(let l of ke(e.body)){if(++P>Kr)break;l.matches(Zr)?_(l):G.push(l)}for(let l of G){if(O.length>=Ft)break;let h=l.getBoundingClientRect();h.width*h.height>=600&&s(h)&&_(l)}A=O.slice(0,Ft);for(let l of d.keys())D.has(l)||d.delete(l)},q=()=>{let O=n.now(),D=0;for(let _ of A){if(!_.isConnected){d.delete(_);continue}let G=_.getBoundingClientRect(),P=d.get(_);d.set(_,G),!(!P||Math.max(Math.abs(G.left-P.left),Math.abs(G.top-P.top),Math.abs(G.width-P.width),Math.abs(G.height-P.height))<Ur||!(s(P)||s(G)))&&!y&&D<Qr&&P.width>0&&P.height>0&&(C.push({x:P.left,y:P.top,w:P.width,h:P.height,born:O}),D++)}D&&E()};T(),v();let W=a.setInterval(q,Yr),Y=a.setInterval(v,Xr);return _e(a)?Lt(e).then(O=>{if(w){O.stop();return}y=O,x=!1,C.length=0,E(),O.stream.getVideoTracks()[0]?.addEventListener("ended",()=>{w||y!==O||(y=null,x=!1,c.clearRect(0,0,u,p),g("Tab sharing ended, so only the elements that move are ghosted now."))})}).catch(()=>{w||g("Tab sharing was refused, so only the elements that move are ghosted.")}):g("This page cannot share its own pixels (Chromium on a secure page can), so only the elements that move are ghosted."),{stop(){if(!w){w=!0,b&&a.cancelAnimationFrame(b),b=0,a.clearInterval(W),a.clearInterval(Y),a.removeEventListener("resize",k);try{y?.stop()}catch{}y=null,o.remove();for(let O of m)O();m.length=0,d.clear(),A=[]}}}}var We=20,Me=90,en=14,tn=24,He=65,Dt=[[20,"Nothing has changed yet."],[32,"The lens has begun to yellow, too slowly to notice."],[40,"Near focus starts to shorten; the phone moves further away."],[45,"Small text at reading distance is blurring (presbyopia)."],[50,"Contrast sensitivity for fine detail has begun to fall."],[55,"The pupil lets in about four fifths of the light it did at twenty."],[60,"Near focus is gone without glasses; the lens clouds faster from here."],[65,"One in twenty over sixty-five has an essential tremor; the pointer shows it."],[70,"A little over half the light reaches the retina compared with twenty."],[75,"Grey text on white is fading into its background."],[80,"Scatter in the lens veils the page; drawn here as a blur."],[85,"Only strong contrast and large targets are still easy."],[90,"The page as the oldest readers receive it."]],Ae=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],Ye=e=>e<=60?1+.02*(e-32):1.56+.0667*(e-60),Nt=Ye(20),rn=Ye(90);function Ot(e){let t=Math.max(We,Math.min(Me,e)),r=Ye(t)-Nt,a=.45*r/(rn-Nt),i=1+(t/70)**4-(1+(20/70)**4),n=1+(90/70)**4-(1+(20/70)**4),o=.9*i/n,m=((3.36-.0102*(t-20))/3.36)**2,g=10**(-.1*r),u=Math.sqrt(m*g),p=10**(-.08*Math.max(0,t-50)/10),w=Math.max(0,15-.25*t),x=Math.min(2.5,Math.max(0,2.5-.5*w))/2,b=t<He?0:4+8*(t-He)/(Me-He);return{age:t,sepia:a,scatterBlur:o,brightness:u,contrast:p,nearBlur:x,tremor:b}}function It(e,{start:t=45}={},r={}){let a=e.defaultView,i=e.documentElement,n=r.container,o=[],c=!1,m=Math.max(We,Math.min(Me,Number(t)||45)),g=ge(e);o.push(()=>{try{g.hidePopover()}catch{}g.remove()});let u=e.createElement("div");u.setAttribute("role","group"),u.setAttribute("aria-label","Age"),u.style.cssText="position:absolute;left:50%;bottom:16px;transform:translateX(-50%);pointer-events:auto;width:min(360px, calc(100vw - 32px));padding:10px 14px 12px;border-radius:10px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,0.3);";let p=e.createElement("div");p.style.cssText="display:flex;justify-content:space-between;align-items:baseline;gap:8px;";let w=e.createElement("span");w.textContent="Age";let y=e.createElement("span");y.textContent="approximation",y.title="Population averages from the cited studies; any one reader sits above or below them.",y.style.cssText="margin-left:8px;padding:0 6px;border:1px solid rgba(247,248,248,0.25);border-radius:999px;font-size:9px;font-weight:640;letter-spacing:0.07em;text-transform:uppercase;color:#B6BAC2;vertical-align:1px;",w.appendChild(y);let x=e.createElement("output");x.style.cssText="font-weight:650;font-size:18px;color:#FFD60A;font-variant-numeric:tabular-nums;",p.append(w,x);let b=e.createElement("input");b.type="range",b.min=String(We),b.max=String(Me),b.step="1",b.value=String(m),b.setAttribute("aria-label","Age"),b.style.cssText="display:block;width:100%;margin:6px 0 4px;accent-color:#FFD60A;cursor:pointer;";let S=e.createElement("div");S.setAttribute("aria-live","polite"),S.style.cssText="color:#D7D9DE;line-height:1.45;height:2.9em;overflow:hidden;",u.append(p,b,S),g.appendChild(u);let C=n?{filter:n.style.filter,backdrop:n.style.backdropFilter,webkit:n.style.webkitBackdropFilter}:null,T=e.createElement("style");T.dataset.pourAudit="filter",e.head.appendChild(T),o.push(()=>T.remove());let I=[];(()=>{let D=0;for(let _ of ke(e.body??i)){if(D>4e3)break;D++;let G=!1;for(let l of _.childNodes)if(l.nodeType===3&&l.nodeValue.trim()){G=!0;break}if(!G)continue;let P=parseFloat(a.getComputedStyle(_).fontSize);P<tn&&(_.setAttribute("data-pour-age-fine",""),P<en&&_.setAttribute("data-pour-age-small",""),I.push(_))}})(),o.push(()=>{for(let D of I)D.removeAttribute("data-pour-age-fine"),D.removeAttribute("data-pour-age-small");I.length=0});let k=i.style.cursor,s=new Map,f=(D,_)=>{let G=`${D}:${_}`,P=s.get(G);if(P)return P;let l=64,h=e.createElement("canvas");h.width=l,h.height=l;let L=h.getContext("2d");if(!L)return"auto";let R=l/2;L.save(),L.translate(R+D,R+_),L.scale(1.15,1.15),L.beginPath(),L.moveTo(Ae[0][0],Ae[0][1]);for(let V=1;V<Ae.length;V++)L.lineTo(Ae[V][0],Ae[V][1]);L.closePath(),L.restore(),L.lineWidth=3,L.lineJoin="round",L.strokeStyle="#fff",L.stroke(),L.fillStyle="#000",L.fill();let z=`url("${h.toDataURL("image/png")}") ${R} ${R}, auto`;return s.set(G,z),z},d=null,A=0,v=D=>{A=a.requestAnimationFrame(v);let _=Ot(m).tremor,G=2*Math.PI*6*(D/1e3),P=Math.round((Math.sin(G)*.7+Math.sin(G*1.63+1.1)*.3)*_),l=Math.round((Math.cos(G*.97+.6)*.7+Math.sin(G*2.11+2.3)*.3)*_);i.style.cursor=f(P,l)},q=D=>{D&&!A?(d=Mt(e,":not(html) { cursor: inherit !important; } [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }"),A=a.requestAnimationFrame(v)):!D&&A&&(a.cancelAnimationFrame(A),A=0,d?.(),d=null,i.style.cursor=k)};o.push(()=>q(!1));let W=D=>{let _=Dt[0][1];for(let[G,P]of Dt)D>=G&&(_=P);return _},Y=()=>{let D=Ot(m);x.textContent=String(D.age),S.textContent=W(D.age);let _=`sepia(${D.sepia.toFixed(3)}) brightness(${D.brightness.toFixed(3)})${D.scatterBlur>.02?` blur(${D.scatterBlur.toFixed(2)}px)`:""}`;n&&(n.style.filter=_,n.style.backdropFilter=_,n.style.webkitBackdropFilter=_);let G=D.contrast<.995?`contrast(${D.contrast.toFixed(3)})`:"",P=D.nearBlur>.02?`blur(${D.nearBlur.toFixed(2)}px)`:"";T.textContent=(G?`[data-pour-age-fine] { filter: ${G} !important; }
`:"")+(P?`[data-pour-age-small] { filter: ${P} ${G} !important; }`:""),q(D.tremor>0)},O=()=>{m=Number(b.value)||m,Y()};return b.addEventListener("input",O),o.push(()=>b.removeEventListener("input",O)),Y(),o.push(()=>{n&&C&&(n.style.filter=C.filter,n.style.backdropFilter=C.backdrop,n.style.webkitBackdropFilter=C.webkit)}),{stop(){if(!c){c=!0;for(let D of o.reverse())try{D()}catch{}o.length=0}}}}var Pt="__pourHearingRouting";function Bt(e){let t=e.AudioContext||e.webkitAudioContext;if(!t)return null;let r=e[Pt]??={ctx:null,sources:new WeakMap};try{r.ctx??=new t}catch{return null}return r.ctx}var Le={loss:["none","mild","moderate","severe","noise","noisy"],implant:["none","implant4","implant8","implant16"]},nn=[...Le.loss,...Le.implant],an={none:"None",mild:"Mild",moderate:"Moderate",severe:"Severe",profound:"Profound",noise:"Noise damage",noisy:"Noisy room",implant4:"4 channels",implant8:"8 channels",implant16:"16 channels"},qt=4,on=.1,sn=.5;function ln(e){let t=Math.floor(e.sampleRate*qt),r=e.createBuffer(1,t,e.sampleRate),a=r.getChannelData(0),i=0,n=0,o=0,c=0,m=0,g=0,u=0,p=0;for(let y=0;y<t;y++){let x=Math.random()*2-1;i=.99886*i+x*.0555179,n=.99332*n+x*.0750759,o=.969*o+x*.153852,c=.8665*c+x*.3104856,m=.55*m+x*.5329522,g=-.7616*g-x*.016898;let b=(i+n+o+c+m+g+u+x*.5362)*.11;u=x*.115926,a[y]=b,p+=b*b}let w=on/Math.sqrt(p/t||1);for(let y=0;y<t;y++)a[y]*=w;return r}function ie(e,t,r,a=0,i=.707){let n=e.createBiquadFilter();return n.type=t,n.frequency.value=r,n.gain.value=a,n.Q.value=i,n}function cn(e){let r=new Float32Array(2048);for(let i=0;i<2048;i++){let n=i/2047*2-1;r[i]=Math.sign(n)*Math.abs(n)**1.6}let a=e.createWaveShaper();return a.curve=r,a.oversample="2x",a}function pn(e){let t=Math.floor(e.sampleRate*qt),r=e.createBuffer(1,t,e.sampleRate),a=r.getChannelData(0);for(let n=0;n<t;n++)a[n]=Math.random()*2-1;let i=e.createBufferSource();i.buffer=r,i.loop=!0;try{i.start()}catch{}return i}function dn(e,t){let r=e.createGain(),a=e.createGain();a.gain.value=4.5;let i=pn(e),n=[r,a,i],o=200,c=7e3,m=new Float32Array(1024);for(let g=0;g<1024;g++)m[g]=Math.abs(g/1023*2-1);for(let g=0;g<t;g++){let u=o*(c/o)**(g/t),p=o*(c/o)**((g+1)/t),w=Math.sqrt(u*p),y=w/(p-u),x=ie(e,"bandpass",w,0,y),b=e.createWaveShaper();b.curve=m;let S=ie(e,"lowpass",160),C=ie(e,"bandpass",w,0,y),T=e.createGain();T.gain.value=0,r.connect(x),x.connect(b),b.connect(S),S.connect(T.gain),i.connect(C),C.connect(T),T.connect(a),n.push(x,b,S,C,T)}return{input:r,output:a,nodes:n,stop(){try{i.stop()}catch{}}}}function un(e,t){if(/^implant\d+$/.test(t))return[dn(e,Number(t.slice(7)))];switch(t){case"none":return[];case"profound":{let r=e.createGain();return r.gain.value=0,[r]}case"noise":return[ie(e,"peaking",4e3,-30,2.5),ie(e,"highshelf",6500,-12),cn(e)];case"mild":return[ie(e,"highshelf",3e3,-15)];case"severe":{let r=e.createGain();return r.gain.value=.5,[ie(e,"lowpass",800),ie(e,"lowpass",800),ie(e,"highshelf",800,-45),r]}case"moderate":case"noisy":default:return[ie(e,"highshelf",1500,-25),ie(e,"lowpass",4e3)]}}var Xe=e=>e.nodeType===1&&(e.tagName==="AUDIO"||e.tagName==="VIDEO");function zt(e,{audiogram:t="moderate",frame:r=!1,picker:a="loss"}={}){let i=Le[a]??Le.loss,n=e.defaultView,o=r,c="pour-hearing-v1",m=()=>{for(let M=0;M<n.frames.length;M++)try{n.frames[M].postMessage({[c]:{setting:p}},"*")}catch{}},g=M=>{let F=M.data?.[c];if(F){if(F.hello&&M.source){try{M.source.postMessage({[c]:{setting:p}},"*")}catch{}return}r&&(!nn.includes(F.setting)||F.setting===p||(p=F.setting,f(),m()))}};n.addEventListener("message",g);let u=n.AudioContext||n.webkitAudioContext,p=i.includes(t)?t:i[1],w=new Set,y=[],x=null,b=u?n[Pt]??={ctx:null,sources:new WeakMap}:null,S=null;if(b)try{b.ctx??=new u,S=b.ctx}catch{S=null}let C=null,T=null,I=[],E=null,k=null;S&&(C=S.createGain(),T=S.createGain(),T.connect(S.destination),b.input=C,b.output=T);function s(M){for(let F of M)try{if(F.nodes){F.stop?.();for(let U of F.nodes)U.disconnect()}else F.disconnect()}catch{}}function f(){if(!S)return;s(I),C.disconnect(),I=un(S,p);let M=C;for(let F of I)M.connect(F.input??F),M=F.output??F;if(M.connect(T),p==="noisy"&&!E){k=S.createGain(),k.gain.value=0,k.connect(C),E=S.createBufferSource(),E.buffer=ln(S),E.loop=!0,E.connect(k);try{E.start()}catch{}}A()}let d=new Set;function A(){if(!k)return;let M=p==="noisy"&&d.size?sn:0;k.gain.setTargetAtTime(M,S.currentTime,.02)}let v=!!(S&&S.state!=="running"),q=()=>{if(!S||S.state==="running"){Y();return}S.resume().then(()=>{Y(),oe()}).catch(()=>{})},W=["click","keydown","pointerdown","touchend"];function Y(){if(v){v=!1;for(let M of W)e.removeEventListener(M,q,!0);x?.(),x=null}}if(v){for(let M of W)e.addEventListener(M,q,!0);o||(x=V("The sound routes through the audiogram after the next click or key press: the browser starts audio only on a gesture.")),q()}let O=new Map,D=new Set,_=n.location.origin;function G(M){let F=M.currentSrc||M.getAttribute("src")||"";if(!F)return!1;let U;try{U=new URL(F,e.baseURI)}catch{return!1}return U.protocol==="blob:"||U.protocol==="data:"||U.origin===_?!1:M.crossOrigin===null||M.crossOrigin===void 0}function P(M){let F=O.get(M);if(!F||D.has(M)||!S)return;if(!M.currentSrc&&!M.srcObject&&!M.getAttribute("src")){if(F.status="no source yet",!F.listening){F.listening=!0;let he=()=>{F.listening=!1,P(M),oe()};M.addEventListener("loadedmetadata",he,{once:!0}),y.push(()=>M.removeEventListener("loadedmetadata",he))}return}if(G(M)){F.status="cannot be routed here",F.why="cross-origin media without CORS headers";return}let U=b.sources.get(M);if(U)try{U.disconnect()}catch{}else try{U=S.createMediaElementSource(M),b.sources.set(M,U)}catch{F.status="cannot be routed here",F.why="already in the page's own audio graph";return}U.connect(C),D.add(M),F.status=v?"routed, waiting for a click":"routed"}function l(M){let F=b?.sources.get(M);if(F){try{F.disconnect()}catch{}try{F.connect(S.destination)}catch{}}}let h=ge(e,{interactive:!0});h.style.pointerEvents="none";let L=e.createElement("div");L.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:max-content;max-width:min(520px, calc(100vw - 32px));pointer-events:none;z-index:2147483647;";let R=e.createElement("div");R.setAttribute("role","status"),R.hidden=!0,R.style.cssText="padding:8px 12px;border-radius:8px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;text-align:left;box-shadow:0 4px 16px rgba(0,0,0,0.3);max-width:100%;box-sizing:border-box;";let z=0,V=(M,F=9e3)=>(n.clearTimeout(z),R.textContent=M,R.hidden=!1,z=n.setTimeout(()=>{R.hidden=!0},F),()=>{n.clearTimeout(z),R.hidden=!0}),j=e.createElement("div");j.setAttribute("role","group"),j.setAttribute("aria-label","Hearing loss setting"),j.style.cssText="display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:6px;border-radius:10px;max-width:100%;box-sizing:border-box;background:#1B1D22;box-shadow:0 4px 16px rgba(0,0,0,0.3);pointer-events:auto;font:500 13px/1 system-ui,sans-serif;";let K=new Map;for(let M of i){let F=e.createElement("button");F.type="button",F.textContent=an[M],F.style.cssText="appearance:none;border:0;border-radius:6px;padding:7px 9px;font:inherit;cursor:pointer;background:transparent;color:#FCFCFC;white-space:nowrap;",F.addEventListener("click",()=>{p=M,f(),ee(),m()}),j.appendChild(F),K.set(M,F)}let ee=()=>{for(let[M,F]of K){let U=M===p;F.setAttribute("aria-pressed",U?"true":"false"),F.style.background=U?"#FFD60A":"transparent",F.style.color=U?"#1B1D22":"#FCFCFC"}};if(L.append(R,j),o||h.appendChild(L),ee(),!S&&!o&&(x=V("This browser has no Web Audio, so the media plays as it is.")),r)try{n.parent.postMessage({[c]:{hello:!0}},"*")}catch{}function oe(){for(let[M,F]of O)D.has(M)&&(F.status=v?"routed, waiting for a click":"routed")}function ue(M){O.has(M)||we(M)||(O.set(M,{status:S?"not routed":"no Web Audio"}),M.paused||d.add(M),P(M))}let fe=M=>{for(let F of ke(M))Xe(F)&&ue(F)};fe(e.body);let be=M=>{let F=M.target;if(!Xe(F)||we(F))return;O.has(F)||ue(F);let U=O.get(F);d.add(F),A(),Te()},se=M=>{Xe(M.target)&&(d.delete(M.target),A())};e.addEventListener("play",be,!0),e.addEventListener("pause",se,!0),e.addEventListener("ended",se,!0),e.addEventListener("emptied",se,!0);let ye=new Set,le=0,ce=0,Te=()=>{ce||(ce=n.setTimeout(()=>{ce=0,oe()},100))},Se=new n.MutationObserver(M=>{for(let F of M)for(let U of F.addedNodes)U.nodeType===1&&!we(U)&&ye.add(U);ye.size&&!le&&(le=n.requestAnimationFrame(()=>{le=0;let F=ye;ye=new Set;for(let U of F)U.isConnected&&fe(U);Te()}))});return Se.observe(e.body,{childList:!0,subtree:!0}),f(),oe(),!o&&!O.size&&e.querySelector("iframe")&&(x?.(),x=V("The only video here is inside an embedded frame. The extension routes it from within that frame; the bookmarklet and the command line cannot reach it.")),{stop(){Se.disconnect(),Y(),le&&n.cancelAnimationFrame(le),le=0,n.clearTimeout(ce),ce=0;for(let M of w)n.clearInterval(M);w.clear();for(let M of y)try{M()}catch{}y.length=0,e.removeEventListener("play",be,!0),e.removeEventListener("pause",se,!0),e.removeEventListener("ended",se,!0),e.removeEventListener("emptied",se,!0);for(let M of D)l(M);if(D.clear(),S){try{E?.stop()}catch{}E?.disconnect(),k?.disconnect(),E=null,k=null,s(I),I=[];try{C?.disconnect()}catch{}try{T?.disconnect()}catch{}b.input===C&&(b.input=null,b.output=null)}n.removeEventListener("message",g),x?.(),x=null;try{h.hidePopover()}catch{}h.remove(),O.clear()}}}var Vt=[4e3,6e3,8e3],Ke={quiet:.012,loud:.045};function fn(e,{kind:t="tone",pitch:r=6e3,level:a="quiet"}={}){let i=e.createGain();i.gain.value=0;let n=e.createOscillator();n.type="sine",n.frequency.value=r;let o=e.createGain();n.connect(o),o.connect(i);let c=Math.floor(e.sampleRate*2),m=e.createBuffer(1,c,e.sampleRate),g=m.getChannelData(0);for(let x=0;x<c;x++)g[x]=Math.random()*2-1;let u=e.createBufferSource();u.buffer=m,u.loop=!0;let p=e.createBiquadFilter();p.type="bandpass",p.frequency.value=r,p.Q.value=12;let w=e.createGain();u.connect(p),p.connect(w),w.connect(i);try{n.start(),u.start()}catch{}let y=(x,b,S)=>{let C=e.currentTime;n.frequency.setTargetAtTime(b,C,.02),p.frequency.setTargetAtTime(b,C,.02);let T=Ke[S]??Ke.quiet;o.gain.setTargetAtTime(x==="tone"?T:0,C,.02),w.gain.setTargetAtTime(x==="hiss"?T*6:0,C,.02),i.gain.setTargetAtTime(1,C,.05)};return y(t,r,a),{output:i,set:y,stop(){i.gain.setTargetAtTime(0,e.currentTime,.02);try{n.stop(e.currentTime+.2),u.stop(e.currentTime+.2)}catch{}setTimeout(()=>{i.disconnect()},400)}}}function Gt(e,{pitch:t=6e3,kind:r="tone",level:a="quiet"}={}){let i=e.defaultView,n=Bt(i),o={kind:r,pitch:Vt.includes(t)?t:6e3,level:Ke[a]?a:"quiet"},c=null;n&&(c=fn(n,o),c.output.connect(n.destination));let m=ge(e,{interactive:!0});m.style.pointerEvents="none";let g=e.createElement("div");g.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:max-content;max-width:min(520px, calc(100vw - 32px));pointer-events:none;z-index:2147483647;";let u=e.createElement("div");u.setAttribute("role","status"),u.hidden=!0,u.style.cssText="padding:8px 12px;border-radius:8px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;text-align:left;box-shadow:0 4px 16px rgba(0,0,0,0.3);max-width:100%;box-sizing:border-box;";let p=e.createElement("div");p.setAttribute("role","group"),p.setAttribute("aria-label","Tinnitus setting"),p.style.cssText="display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:6px;border-radius:10px;max-width:100%;box-sizing:border-box;background:#1B1D22;box-shadow:0 4px 16px rgba(0,0,0,0.3);pointer-events:auto;font:500 13px/1 system-ui,sans-serif;";let w=[],y=(s,f,d)=>{let A=e.createElement("button");A.type="button",A.textContent=s,A.style.cssText="appearance:none;border:0;border-radius:6px;padding:7px 9px;font:inherit;cursor:pointer;background:transparent;color:#FCFCFC;white-space:nowrap;",A.addEventListener("click",()=>{d(),x()}),w.push({b:A,isOn:f}),p.appendChild(A)};y("Tone",()=>o.kind==="tone",()=>{o.kind="tone"}),y("Hiss",()=>o.kind==="hiss",()=>{o.kind="hiss"});for(let s of Vt)y(`${s/1e3} kHz`,()=>o.pitch===s,()=>{o.pitch=s});y("Quiet",()=>o.level==="quiet",()=>{o.level="quiet"}),y("Loud",()=>o.level==="loud",()=>{o.level="loud"});let x=()=>{for(let{b:s,isOn:f}of w){let d=f();s.setAttribute("aria-pressed",d?"true":"false"),s.style.background=d?"#FFD60A":"transparent",s.style.color=d?"#1B1D22":"#FCFCFC"}c?.set(o.kind,o.pitch,o.level)};g.append(u,p),m.appendChild(g),x();let b=0,S=(s,f=9e3)=>{i.clearTimeout(b),u.textContent=s,u.hidden=!1,b=i.setTimeout(()=>{u.hidden=!0},f)};n||S("This browser has no Web Audio, so there is no sound to add.");let C=["click","keydown","pointerdown","touchend"],T=!!(n&&n.state!=="running"),I=()=>{if(T){T=!1;for(let s of C)e.removeEventListener(s,E,!0);u.hidden=!0}},E=()=>{if(!n||n.state==="running"){I();return}n.resume().then(I).catch(()=>{})};if(T){for(let s of C)e.addEventListener(s,E,!0);S("The sound starts after the next click or key press: the browser starts audio only on a gesture."),E()}let k=!1;return{stop(){if(!k){k=!0,I(),i.clearTimeout(b),c?.stop(),c=null;try{m.hidePopover()}catch{}m.remove()}}}}var _t=["mild","moderate","severe"],hn={mild:"Mild",moderate:"Moderate",severe:"Severe"};function jt(e,{kind:t,severity:r="moderate"}={},a={}){let i=e.documentElement;if(!t||!/^url\(/.test(i.style.filter))return{stop(){}};let n=m=>m==="moderate"?`url(#pour-vision-filter-${t})`:`url(#pour-vision-filter-${t}-${m})`,o=_t.includes(r)?r:"moderate",c=Rt(e,{label:"Severity",choices:_t,labels:hn,value:o,onChange:m=>{o=m,i.style.filter=n(o)}});return i.style.filter=n(o),{stop(){c.remove()}}}var Re={afterimages:$t,ageSlider:It,hearingLoss:zt,tinnitus:Gt,colourSeverity:jt};function Ht(e=document){let t=e.defaultView,r=e.documentElement,a=xe(e),i=ct(e,a),n=null,o=null,c=null,m=null,g=null,u=null,p=null,w=null,y=null,x="none",b="none",S=0,C=0,T=0,I=0,E=null;function k(){if(e.getElementById("pour-filter-styles"))return;let $=e.createElement("style");$.id="pour-filter-styles",$.dataset.pourAudit="filter",$.textContent=Et,e.head.appendChild($)}function s(){if(e.getElementById("pour-vision-filter-defs"))return;let $="http://www.w3.org/2000/svg",N=e.createElementNS($,"svg");N.setAttribute("id","pour-vision-filter-defs"),N.setAttribute("width","0"),N.setAttribute("height","0"),N.setAttribute("focusable","false"),N.setAttribute("aria-hidden","true"),N.dataset.pourAudit="filter",N.style.position="absolute",N.style.pointerEvents="none";let H=e.createElementNS($,"defs");for(let[B,Z]of Object.entries(Ne)){let J=e.createElementNS($,"filter");J.setAttribute("id",`pour-vision-filter-${B}`),J.setAttribute("color-interpolation-filters","linearRGB");let X=e.createElementNS($,"feColorMatrix");X.setAttribute("type","matrix"),X.setAttribute("values",Z),J.appendChild(X),H.appendChild(J)}for(let[B,Z]of Object.entries(Qe))for(let[J,X]of Object.entries(Z)){let re=e.createElementNS($,"filter");re.setAttribute("id",`pour-vision-filter-${B}-${J}`),re.setAttribute("color-interpolation-filters","linearRGB");let ae=e.createElementNS($,"feColorMatrix");ae.setAttribute("type","matrix"),ae.setAttribute("values",X),re.appendChild(ae),H.appendChild(re)}for(let[B,Z]of Object.entries(Ze)){let J=e.createElementNS($,"filter");J.setAttribute("id",`pour-vision-filter-${B}`),J.setAttribute("color-interpolation-filters","linearRGB"),J.innerHTML=Z,H.appendChild(J)}N.appendChild(H),e.body.appendChild(N)}let f=$=>{let N=e.createElement("div");return N.className=$,N.dataset.pourAudit="filter",e.body.appendChild(N),N};function d(){T=0,r.style.setProperty("--pour-vision-x",`${S}px`),r.style.setProperty("--pour-vision-y",`${C}px`),r.style.setProperty("--pour-vision-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function A($){S=$.clientX,C=$.clientY,T||(T=t.requestAnimationFrame(d))}function v($){let N=$.touches[0];N&&A(N)}function q($,N=null){for(let Z of Oe)r.classList.remove(`pour-vision-filter-${Z}`);Ie.has(x)&&(e.removeEventListener("mousemove",A),e.removeEventListener("touchmove",v)),o?.stop(),o=null,c?.stop(),c=null;try{p?.stop()}catch{}if(p=null,n?.remove(),n=null,x=de[$]!==void 0?$:"none",x==="none"){b==="none"&&(r.style.filter="");return}b!=="none"&&M("none"),k(),s();let H=de[x]||"none";r.style.filter=H==="none"?"":H,Oe.has(x)&&(r.classList.add(`pour-vision-filter-${x}`),n=f("pour-vision-filter-overlay"),n.dataset.filter=x,x==="floaters"&&(o=ft(e,n)),x==="glossyScreen"&&(c=ht(e,n)));let B=tt[x];B&&Re[B.driver]&&(p=Re[B.driver](e,{...B.options??{},...N??{}},{kit:a,container:n,lenses:i})),Ie.has(x)&&(S=t.innerWidth/2,C=t.innerHeight/2,d(),e.addEventListener("mousemove",A),e.addEventListener("touchmove",v,{passive:!0}))}function W(){I=0,r.style.setProperty("--pour-sensory-x",`${S}px`),r.style.setProperty("--pour-sensory-y",`${C}px`),r.style.setProperty("--pour-sensory-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function Y($){S=$.clientX,C=$.clientY,I||(I=t.requestAnimationFrame(W))}function O($){let N=$.touches[0];N&&Y(N)}function D($){if(e.getElementById("pour-sensory-injected-style")?.remove(),!$)return;let N=e.createElement("style");N.id="pour-sensory-injected-style",N.dataset.pourAudit="filter",N.textContent=$,e.head.appendChild(N)}function _(){if(e.querySelector(".pour-sensory-washout-char"))return;let $=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null),N=[];for(;$.nextNode();)N.push($.currentNode);for(let H of N){let B=H.textContent;if(!B.trim())continue;let Z=H.parentElement;if(!Z||Z.closest("script,style,noscript,[data-pour-audit]"))continue;let J=e.createDocumentFragment();for(let X of B)if(X===" "||X===`
`||X==="	")J.appendChild(e.createTextNode(X));else{let re=e.createElement("span");re.textContent=X,re.style.opacity=(.3+Math.random()*.7).toFixed(2),re.className="pour-sensory-washout-char",J.appendChild(re)}Z.replaceChild(J,H)}}function G(){for(let $ of e.querySelectorAll(".pour-sensory-washout-char"))$.replaceWith($.textContent);e.body.normalize()}let P=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],l=new Map,h=0,L=0,R=null,z=0,V=0,j=0,K=0,ee=0,oe=0;function ue($,N,H){let B=`${$}:${N}:${H}`,Z=l.get(B);if(Z)return Z;let J=e.createElement("canvas");J.width=$,J.height=$;let X=J.getContext("2d");if(!X)return"auto";let re=Math.round($/2);X.save(),X.translate(re+N,re+H),X.scale(1.15,1.15),X.beginPath(),X.moveTo(P[0][0],P[0][1]);for(let pe=1;pe<P.length;pe++)X.lineTo(P[pe][0],P[pe][1]);X.closePath(),X.restore(),X.lineWidth=3,X.lineJoin="round",X.strokeStyle="#fff",X.stroke(),X.fillStyle="#000",X.fill();let ae=`url("${J.toDataURL("image/png")}") ${re} ${re}, auto`;return l.set(B,ae),ae}function fe($){let N=$.timeStamp||Date.now(),H=N-j;if(j&&H>0){let B=Math.hypot($.clientX-z,$.clientY-V);K=K*.8+B/H*1e3*.2}z=$.clientX,V=$.clientY,j=N}function be($,N){if(!ee)return ee=$+N.minGap+Math.random()*(N.maxGap-N.minGap),[0,0];let H=$-ee;if(H<0)return[0,0];if(H>N.dur)return ee=$+N.minGap+Math.random()*(N.maxGap-N.minGap),oe=Math.random()*Math.PI*2,[0,0];let B=1-H/N.dur,Z=N.size*B*B;return[Math.cos(oe)*Z,Math.sin(oe)*Z]}function se($){h=t.requestAnimationFrame(se);let N=R;if(!N)return;let H=($-L)/1e3,B=0,Z=0;if(N.freq&&N.amp){let ae=2*Math.PI*N.freq,pe=Math.max(0,1+(N.intent||0)*Math.min(1,K/700)),Je=N.amp*pe;B+=(Math.sin(ae*H)*.7+Math.sin(ae*1.63*H+1.1)*.3)*Je,Z+=(Math.cos(ae*.97*H+.6)*.7+Math.sin(ae*2.11*H+2.3)*.3)*Je}if(N.spasm){let[ae,pe]=be($,N.spasm);B+=ae,Z+=pe}let J=N.bitmap/2-14,X=Math.max(-J,Math.min(J,Math.round(B))),re=Math.max(-J,Math.min(J,Math.round(Z)));r.style.cursor=ue(N.bitmap,X,re)}function ye($){le(),R=$,L=t.performance?t.performance.now():Date.now(),K=0,j=0,ee=0,oe=Math.random()*Math.PI*2,ce($.hide?`
      html, :not(html) { cursor: none !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `:`
      :not(html) { cursor: inherit !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `),!$.hide&&(e.addEventListener("mousemove",fe,{passive:!0}),h=t.requestAnimationFrame(se))}function le(){h&&t.cancelAnimationFrame(h),h=0,R=null,ee=0,e.removeEventListener("mousemove",fe),ce(null),r.style.cursor=""}function ce($){if(e.getElementById("pour-sensory-cursor-style")?.remove(),!$)return;let N=e.createElement("style");N.id="pour-sensory-cursor-style",N.dataset.pourAudit="filter",N.textContent=$,e.head.appendChild(N)}function Te(){Se();let $=()=>{E=t.setTimeout(()=>{y&&(y.classList.add("pour-sensory-spike-flash"),t.setTimeout(()=>{y?.classList.remove("pour-sensory-spike-flash"),$()},150))},3e3+Math.random()*8e3)};$()}function Se(){E&&(t.clearTimeout(E),E=null)}function M($,N=null){let H=ve[b];H?.overlay&&r.classList.remove(`pour-sensory-filter-${b}`),H?.hostClass&&r.classList.remove(H.hostClass),H?.mouseTracked&&(e.removeEventListener("mousemove",Y),e.removeEventListener("touchmove",O)),H?.injectScript&&G(),H?.cursorJitter&&le(),H?.viewportOrigin&&Jt(),H?.loupe&&Ue(),H?.lens&&i[H.lens]?.remove(),m?.stop(),m=null,g?.stop(),g=null,u?.stop(),u=null;try{w?.stop()}catch{}if(w=null,Se(),y?.remove(),y=null,D(null),b=ve[$]?$:"none",b==="none"){x==="none"&&(r.style.filter="");return}x!=="none"&&q("none"),k();let B=ve[b];r.style.filter=B.css&&B.css!=="none"?B.css:"",B.hostClass&&r.classList.add(B.hostClass),(B.overlay||B.mouseTracked||b==="sensorySpike")&&(y=f("pour-sensory-filter-overlay"),y.dataset.filter=b,B.overlay&&r.classList.add(`pour-sensory-filter-${b}`)),B.mouseTracked&&(S=t.innerWidth/2,C=t.innerHeight/2,W(),e.addEventListener("mousemove",Y),e.addEventListener("touchmove",O,{passive:!0})),B.injectCSS&&D(B.injectCSS),b==="sensorySpike"&&Te(),B.injectScript&&_(),B.cursorJitter&&ye(B.cursorJitter),B.viewportOrigin&&Ut(),B.loupe&&Qt(B.loupe),B.lens&&i[B.lens]?.apply(),B.forcedColours&&(m=xt(e)),B.fingertip&&(g=St(e,B.fingertip)),B.magnifier&&(u=Tt(e,B.magnifier)),B.driver&&Re[B.driver]&&(w=Re[B.driver](e,{...B.options??{},...N??{}},{kit:a,container:y,lenses:i}))}let F=0;function U(){F=0,r.style.setProperty("--pour-motion-origin",`${t.scrollX+t.innerWidth/2}px ${t.scrollY+t.innerHeight/2}px`)}function he(){F||(F=t.requestAnimationFrame(U))}function Ut(){U(),t.addEventListener("scroll",he,{passive:!0}),t.addEventListener("resize",he)}function Jt(){t.removeEventListener("scroll",he),t.removeEventListener("resize",he),F&&(t.cancelAnimationFrame(F),F=0),r.style.removeProperty("--pour-motion-origin")}let $e=null;function Qt($){Ue(),$e=kt(e,{...$,point:()=>({x:S,y:C})})}function Ue(){$e?.stop(),$e=null}let Zt=()=>({vision:x,sensory:b});function er(){q("none"),M("none")}return{applyVision:q,applySensory:M,clear:er,state:Zt}}var mn=new Set(["text","search","url","tel","email","password","number","date","datetime-local","month","time","week",""]),gn=new Set(["input","select","textarea","button","meter","output","progress"]);function bn(e){return e.replace(/[\uE000-\uF8FF\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}\u200B-\u200D\u2060\uFEFF]/gu,"").trim()?e:""}function Yt(e){return bn(Fe(e,!1,!1,new Set))}function Xt(e){for(let r=e;r;r=Pe(r))if(r.getAttribute?.("aria-hidden")==="true"||getComputedStyle(r).display==="none")return!0;let t=getComputedStyle(e).visibility;return t==="hidden"||t==="collapse"}function yn(e,t){let r=e.getAttribute?.("aria-labelledby");if(!r)return null;let a=e.getRootNode(),i=r.split(/\s+/).filter(Boolean).map(n=>a.getElementById?.(n)).filter(Boolean);return i.length?i.map(n=>{let o=new Set(t);return n===e&&o.delete(e),Fe(n,!0,Xt(n),o)}).join(" ").replace(/\s+/g," ").trim():null}function Fe(e,t,r,a){if(a.has(e))return"";if(a.add(e),!t){let c=yn(e,a);if(c)return c}let i=e.getAttribute("aria-label")?.trim();if(i)return i;let n=e.tagName.toLowerCase();if(n==="img"||n==="area"){let c=e.getAttribute("alt")?.trim();if(c)return c}if(gn.has(n)&&e.labels?.length){let c=[...e.labels].map(m=>Fe(m,t,Xt(m),a)).join(" ").trim();if(c)return c}if(n==="input"||n==="select"||n==="textarea"){if(e.type==="submit"||e.type==="reset"||e.type==="button"){let c=(e.value??e.getAttribute("value")??"").trim();if(c)return c}if(e.type==="image"){let c=e.getAttribute("alt")?.trim();if(c)return c}if(t&&(n==="textarea"||mn.has(e.type))){let c=(e.value??"").trim();if(c)return c}if(e.type==="submit")return"Submit";if(e.type==="reset")return"Reset"}let o=vn(e,r,t,a).replace(/\s+/g," ").trim();return o||(e.getAttribute("title")??e.getAttribute("placeholder")??"").trim()}function vn(e,t,r,a){let i=e.shadowRoot?e.shadowRoot.childNodes:e.childNodes;return Wt(e,"::before",t)+Kt(i,t,r,a)+Wt(e,"::after",t)}function Wt(e,t,r){if(e.namespaceURI==="http://www.w3.org/2000/svg")return"";let a=getComputedStyle(e,t);if(!r&&(a.display==="none"||a.visibility==="hidden"||a.visibility==="collapse"))return"";let i=a.content;if(!i||i==="none"||i==="normal")return"";let n=i.match(/\/\s*"((?:[^"\\]|\\.)*)"\s*$/);if(n)return n[1].replace(/\\(.)/g,"$1");let o=i.match(/^"((?:[^"\\]|\\.)*)"$/);return o?o[1].replace(/\\(.)/g,"$1"):""}function Kt(e,t,r,a){let i="";for(let n of e){if(n.nodeType===3){i+=n.textContent;continue}if(n.nodeType!==1)continue;let o=n.tagName.toLowerCase();if(o==="script"||o==="style"||o==="noscript"||o==="template")continue;if(!t){if(n.getAttribute("aria-hidden")==="true")continue;let m=getComputedStyle(n);if(m.display==="none"||m.visibility==="hidden"||m.visibility==="collapse")continue}if(o==="slot"){let m=n.assignedNodes?.()??[];i+=Kt(m.length?m:n.childNodes,t,r,a);continue}if((o==="img"||o==="area")&&n.getAttribute("alt")===""&&!n.getAttribute("aria-label")?.trim()&&!n.getAttribute("aria-labelledby"))continue;let c=Fe(n,r,t,a);i+=o==="img"||o==="area"||n.hasAttribute("aria-label")||n.hasAttribute("aria-labelledby")?` ${c} `:c}return i}return ir(xn);})();
