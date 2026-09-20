/*! pour filters | MIT | https://pour.dev */
var PourFilters=(()=>{var Le=Object.defineProperty;var Ht=Object.getOwnPropertyDescriptor;var Wt=Object.getOwnPropertyNames;var Yt=Object.prototype.hasOwnProperty;var Xt=(e,t)=>{for(var r in t)Le(e,r,{get:t[r],enumerable:!0})},Ut=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of Wt(t))!Yt.call(e,l)&&l!==r&&Le(e,l,{get:()=>t[l],enumerable:!(a=Ht(t,l))||a.enumerable});return e};var Kt=e=>Ut(Le({},"__esModule",{value:!0}),e);var Qr={};Xt(Qr,{CSS_FILTERS:()=>ce,MODE_LABELS:()=>Se,SENSORY_FILTERS:()=>ge,accessibleName:()=>Bt,createFilterApplier:()=>It,createLensKit:()=>be,cssPath:()=>Ze});var Re={protanopia:"0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0 0 0 0 1 0",deuteranopia:"0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047414 0 0 -0.011820 0.042940 0.968881 0 0 0 0 0 1 0",tritanopia:"1.255528 -0.076749 -0.178779 0 0 -0.078411 0.930809 0.147602 0 0 0.004733 0.691367 0.303900 0 0 0 0 0 1 0",achromatopsia:"0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0 0 0 1 0",protanomaly:"0.458064 0.679578 -0.137642 0 0 0.092785 0.846313 0.060902 0 0 -0.007494 -0.016807 1.024301 0 0 0 0 0 1 0",deuteranomaly:"0.547494 0.607765 -0.155259 0 0 0.181692 0.781742 0.036566 0 0 -0.010410 0.027275 0.983136 0 0 0 0 0 1 0",tritanomaly:"1.017277 0.027029 -0.044306 0 0 -0.006113 0.958479 0.047634 0 0 0.006379 0.248708 0.744913 0 0 0 0 0 1 0"},Ye={protanomaly:{mild:"0.630323 0.465641 -0.095964 0 0 0.069181 0.890046 0.040773 0 0 -0.006308 -0.007724 1.014032 0 0 0 0 0 1 0",severe:"0.203876 0.990338 -0.194214 0 0 0.112975 0.794542 0.092483 0 0 -0.005222 -0.041043 1.046265 0 0 0 0 0 1 0"},deuteranomaly:{mild:"0.675425 0.433850 -0.109275 0 0 0.125303 0.847755 0.026942 0 0 -0.007950 0.018572 0.989378 0 0 0 0 0 1 0",severe:"0.392952 0.823610 -0.216562 0 0 0.263559 0.690210 0.046232 0 0 -0.011910 0.040281 0.971630 0 0 0 0 0 1 0"},tritanomaly:{mild:"0.905871 0.127791 -0.033662 0 0 0.026856 0.941251 0.031893 0 0 0.013410 0.148296 0.838294 0 0 0 0 0 1 0",severe:"1.278864 -0.125333 -0.153531 0 0 -0.084748 0.957674 0.127074 0 0 -0.000989 0.601151 0.399838 0 0 0 0 0 1 0"}},Jt={protanopia:"saturate(0.25) sepia(0.5) hue-rotate(-15deg)",deuteranopia:"saturate(0.3) sepia(0.4) hue-rotate(-10deg)",tritanopia:"saturate(0.35) sepia(0.3) hue-rotate(50deg)",achromatopsia:"grayscale(100%)",protanomaly:"saturate(0.6) sepia(0.25) hue-rotate(-8deg)",deuteranomaly:"saturate(0.65) sepia(0.2) hue-rotate(-5deg)",tritanomaly:"saturate(0.7) sepia(0.15) hue-rotate(25deg)"},Fe=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge","diabeticRetinopathy","glossyScreen","nystagmus","hemianopiaLeft","hemianopiaRight","amblyopia","afterimages","ageSlider"]),De=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge"]),Xe={cataract:'<feGaussianBlur in="SourceGraphic" stdDeviation="5" result="near"/><feGaussianBlur in="SourceGraphic" stdDeviation="26" result="far"/><feComposite in="near" in2="far" operator="arithmetic" k1="0" k2="0.05" k3="0.07" k4="0" result="veil"/><feComposite in="SourceGraphic" in2="veil" operator="arithmetic" k1="0" k2="0.88" k3="1" k4="0"/>'},ce={none:"none",cataract:"sepia(0.3) contrast(0.9) saturate(0.9) brightness(0.95) blur(0.6px)",presbyopia:"blur(0.5px)",lowAcuityMild:"blur(0.7px)",lowAcuity:"blur(1.2px)",lowAcuityStrong:"blur(2.5px)",lowAcuityHeavy:"blur(5px)",lowLight:"brightness(0.65) contrast(0.9) saturate(0.85) hue-rotate(-8deg)",lowContrast:"contrast(0.7)",retinitisRing:"none",glaucoma:"none",glaucomaLarge:"none",macularDegeneration:"none",macularDegenerationLarge:"none",diabeticRetinopathy:"none",glossyScreen:"none",nystagmus:"none",hemianopiaLeft:"none",hemianopiaRight:"none",amblyopia:"none",afterimages:"none",ageSlider:"none",scotopicRose:"sepia(0.15) hue-rotate(330deg) saturate(1.2) brightness(1.05)",scotopicYellow:"sepia(0.3) saturate(1.15) brightness(1.05)",scotopicAqua:"sepia(0.2) hue-rotate(160deg) saturate(1.15) brightness(1.02)"},Qt=typeof navigator<"u"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Ue=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),Zt=Ue,er=Qt||Ue;Object.keys(Re).forEach(e=>{Zt?ce[e]=Jt[e]:ce[e]=`url(#pour-vision-filter-${e})`});er||(ce.cataract="url(#pour-vision-filter-cataract) sepia(0.3) saturate(0.9) brightness(0.95) blur(0.6px)");var tr=[{label:"Color vision",options:[{value:"deuteranomaly",added:"2026-09-17",name:"Green Deficiency (Deutan)",stat:"~6% of men",description:"Green-sensitive cones respond off-target, so greens, reds and browns crowd together. The most common colour vision difference. At its worst, red and green become one family of murky ochre. A setting at the bottom of the page picks mild, moderate or severe; moderate is drawn first.",label:"Green Deficiency - Deutan - ~6% of men"},{value:"protanomaly",added:"2026-09-17",name:"Red Deficiency (Protan)",stat:"~2% of men",description:"Red-sensitive cones respond weakly: reds dim and drift towards green. At its worst, red light barely registers and reds sink into the greens around them. A setting at the bottom of the page picks mild, moderate or severe; moderate is drawn first.",label:"Red Deficiency - Protan - ~2% of men"},{value:"tritanomaly",added:"2026-09-17",name:"Blue Deficiency (Tritan)",stat:"<0.2%",description:"Blue-sensitive cones respond weakly: blues and greens blur together, yellows go pale. At its worst, blues read as greens and yellows as pinks and greys. A setting at the bottom of the page picks mild, moderate or severe; moderate is drawn first.",label:"Blue Deficiency - Tritan - <0.2%"},{value:"achromatopsia",added:"2026-07-30",name:"Monochromacy (Achromatopsia)",stat:"~0.003%",description:"No colour at all: brightness is the only signal left, usually with strong glare sensitivity.",label:"Monochromacy - Achromatopsia - ~0.003%"}]},{label:"Eye conditions",options:[{value:"presbyopia",added:"2026-07-30",name:"Near-Vision Loss (Presbyopia)",stat:"nearly all over 50",description:"The lens stiffens with age and close text blurs \u2014 the one condition almost everyone gets.",label:"Near-Vision Loss - Presbyopia - nearly all over 50"},{value:"glaucoma",added:"2026-07-30",name:"Tunnel Vision (Glaucoma)",stat:"~3% over 40",description:"Peripheral vision closes in until only a central window stays sharp. The window follows your pointer. Drawn as a dimmed, blurred surround; people with glaucoma report blur or missing parts, never a dark tunnel, and most notice nothing until late.",label:"Tunnel Vision - Glaucoma - ~3% over 40"},{value:"glaucomaLarge",added:"2026-07-30",name:"Tunnel Vision (Advanced Glaucoma)",stat:"~0.5% over 40",description:"Advanced glaucoma: the sharp window narrows further; everything else is gone, not blurred.",label:"Tunnel Vision (Large) - Advanced Glaucoma - ~0.5% over 40"},{value:"macularDegeneration",added:"2026-07-30",name:"Central Vision Loss (Macular Degeneration)",stat:"~9% over 45",description:"The centre of gaze fades first, precisely where you point your eyes to read. Drawn as a dark disc; the real gap is filled in from its surround and straight lines bend, so nobody sees its edge.",label:"Central Vision Loss - Macular Degeneration - ~9% over 45"},{value:"macularDegenerationLarge",added:"2026-07-30",name:"Central Vision Loss (Advanced Macular Degeneration)",stat:"~1% over 50",description:"Advanced macular degeneration: a larger central blank that reading must route around.",label:"Central Vision Loss (Large) - Advanced Macular Degeneration - ~1% over 50"},{value:"diabeticRetinopathy",added:"2026-07-30",name:"Patchy Vision (Diabetic Retinopathy)",stat:"~0.8% over 40",description:"Blood-vessel damage leaves patches the eye cannot resolve; content falls into them. Drawn as fixed dark blotches, a stand-in: the real loss is filled in, and comes with blur and drifting floaters from bleeds.",label:"Patchy Vision - Diabetic Retinopathy - ~0.8% over 40"},{value:"nystagmus",added:"2026-07-30",name:"Involuntary Eye Movement (Nystagmus)",stat:"~0.07%",description:"The eyes move on their own, so the page never quite holds still. That is acquired nystagmus, after a stroke or multiple sclerosis; people born with it, three times as many, see a still page at lower acuity.",label:"Involuntary Eye Movement - Nystagmus - ~0.07%"}]},{label:"Field of vision",options:[{value:"hemianopiaLeft",added:"2026-07-30",name:"Left Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the left half of vision in both eyes. Drawn as a dark half; the person sees no edge and often no gap, the field is simply absent, and the left end of every line goes missing.",label:"Left Field Loss - Hemianopia (Left) - ~0.1% over 49"},{value:"hemianopiaRight",added:"2026-07-30",name:"Right Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the right half of vision in both eyes. Drawn as a dark half; the person sees no edge and often no gap, the field is simply absent, and the right end of every line goes missing.",label:"Right Field Loss - Hemianopia (Right) - ~0.1% over 49"},{value:"retinitisRing",name:"Ring Loss (Retinitis Pigmentosa)",added:"2026-08-22",stat:"~0.025%",description:"Early retinitis pigmentosa takes a ring out of the mid-periphery, leaving a clear centre and a seeing outer rim. It narrows to a tunnel only much later, so this donut, not the tunnel, is what most of that life looks like.",label:"Ring Loss - Retinitis Pigmentosa - ~0.025%"},{value:"amblyopia",added:"2026-07-30",name:"Reduced Acuity (Amblyopia)",stat:"~2-3%",description:"One eye never learned to see sharply. Drawn as that eye sees on its own; with both eyes open the stronger eye usually covers for it, and depth is what is lost.",label:"Reduced Acuity (One Eye) - Amblyopia - ~2-3%"},{value:"afterimages",added:"2026-09-14",name:"Afterimages (Palinopsia)",stat:"~10% with migraine",description:"Anything that moves leaves a fading copy of itself behind, the page under scroll included: a carousel becomes a smear and the page takes a couple of seconds to settle after every scroll. Content the page moves on its own is the finding. Needs the page's own pixels, so it asks to share this tab (Chromium) and says so where it cannot.",label:"Afterimages - Palinopsia - ~10% with migraine"}]},{label:"Focus & acuity",options:[{value:"lowAcuityMild",added:"2026-07-30",name:"Slight Defocus",description:"Mildly uncorrected eyesight \u2014 the glasses left in the other room.",label:"Slight Defocus - Mild Blur"},{value:"lowAcuity",added:"2026-07-30",name:"Uncorrected Focus",stat:"~5-6% uncorrected",description:"Moderate uncorrected short-sight: small text needs effort, thin fonts give up first.",label:"Uncorrected Focus - Moderate Blur - ~5-6% uncorrected"},{value:"lowAcuityStrong",added:"2026-07-30",name:"Significant Defocus",description:"Strong blur: layout and colour still communicate, letterforms mostly do not.",label:"Significant Defocus - Strong Blur"},{value:"lowAcuityHeavy",added:"2026-07-30",name:"Severe Defocus",description:"Only shape, contrast and position survive. What does your page still say?",label:"Severe Defocus - Very Strong Blur"}]},{label:"Contrast & light",options:[{value:"cataract",added:"2026-09-17",name:"Clouded Lens (Cataract)",stat:"~17% over 40",description:"The lens clouds and yellows, and light scattering inside it lays a veil over the page: bright areas bleed into whatever sits next to them, dark text greys, whites go dingy. The blur stands in for the aberrations that take sharpness. An early cataract.",label:"Clouded Lens - Cataract - ~17% over 40"},{value:"lowContrast",added:"2026-07-30",name:"Reduced Contrast",description:"Contrast sensitivity loss: faint greys sink into their backgrounds long before they vanish for you.",label:"Reduced Contrast"},{value:"lowLight",added:"2026-07-30",name:"Dim Environment",description:"A dim room, a cheap panel, a phone at night \u2014 the low-vision hours everyone has.",label:"Dim Environment - Low Light"},{value:"glossyScreen",added:"2026-09-12",name:"Glossy Screen (Reflections)",description:"The room and your own face reflect off the glass and add light to every dark pixel. White areas barely change; dark themes, grey-on-black text and low-contrast controls wash out first. Uses your camera on this device only, never recorded or sent.",label:"Glossy Screen - Reflections"}]},{label:"Ageing",options:[{value:"ageSlider",added:"2026-09-17",name:"Age Slider",description:"One slider from twenty to ninety: the lens yellows, the pupil shrinks, contrast and near focus fall, and from sixty-five the pointer shows the tremor one in twenty has, all on published population curves. An approximation: any one reader sits above or below them. Grey text and small buttons are the first to go.",label:"Age Slider"}]},{label:"Visual stress",options:[{value:"scotopicRose",added:"2026-07-30",name:"Rose Tint",description:"A coloured overlay some readers use to calm pattern glare. See how your design reads through one.",label:"Rose Tint - Coloured Overlay"},{value:"scotopicYellow",added:"2026-07-30",name:"Yellow Tint",description:"A yellow reading overlay \u2014 common for visual stress. Your palette should survive it.",label:"Yellow Tint - Coloured Overlay"},{value:"scotopicAqua",added:"2026-07-30",name:"Aqua Tint",description:"An aqua reading overlay. Tinted reading is more common than most designs assume.",label:"Aqua Tint - Coloured Overlay"}]}],ge={none:{label:"None",css:"none"},lightSensitivity:{label:"Light Sensitivity",css:"brightness(1.4) contrast(1.2) saturate(1.1)"},colourHypersensitivity:{label:"Colour Hypersensitivity",css:"saturate(2.2) contrast(1.35) brightness(1.1)"},motionSensitivity:{label:"Motion Sensitivity",hostClass:"pour-sensory-filter-motionSensitivity",viewportOrigin:!0,css:"none"},hyperfocusTunnel:{label:"Hyperfocus Tunnel (Metaphor)",overlay:"hyperfocusTunnel",mouseTracked:!0,css:"none"},attentionFragmentation:{label:"Attention Fragmentation (Metaphor)",overlay:"attentionFragmentation",css:"none"},peripheralDistraction:{label:"Peripheral Distraction",overlay:"peripheralDistraction",css:"none"},detailFixation:{label:"Detail Fixation (Metaphor)",overlay:"detailFixation",mouseTracked:!0,loupe:{scale:2,radius:150,ring:75},css:"none"},processingDelay:{label:"Processing Lag",overlay:"processingDelay",css:"none"},sensoryInterference:{label:"Sensory Interference",hostClass:"pour-sensory-filter-backgroundNoise",css:"none"},sensorySpike:{label:"Sudden Sensory Spike",overlay:"sensorySpike",css:"none"},dyslexiaVisualStress:{label:"Visual Stress (Pattern Glare)",overlay:"dyslexiaVisualStress",injectCSS:`
        body { background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.06) 22px, rgba(0,0,0,0.06) 24px) !important; background-attachment: fixed !important; }
        p, li, td, th, dd, dt, h1, h2, h3, h4, h5, h6, label { text-shadow: 0 0 1px rgba(0,0,0,0.15) !important; animation: pour-sensory-line-merge 3s ease-in-out infinite alternate !important; }
        @keyframes pour-sensory-line-merge { 0% { transform: scaleX(1) translateY(0); } 25% { transform: scaleX(1.008) translateY(0.8px); } 50% { transform: scaleX(0.993) translateY(-0.5px); } 75% { transform: scaleX(1.005) translateY(0.6px); } 100% { transform: scaleX(0.996) translateY(-0.3px); } }
      `,css:"none"},dyslexiaCrowding:{label:"Crowding Effect",injectCSS:"* { letter-spacing: -1px !important; word-spacing: -3px !important; line-height: 1.05 !important; } p, li, td, th, dd, dt, label, span, a { font-size: 95% !important; }",css:"none"},dyslexiaTrackingLoss:{label:"Tracking Loss",overlay:"dyslexiaTrackingLoss",mouseTracked:!0,css:"none"},dyslexiaWashout:{label:"Letter Instability",injectScript:!0,css:"none"},dyslexiaContrastSensitivity:{label:"Contrast Sensitivity",css:"contrast(0.8) brightness(1.1) saturate(0.9)"},handTremor:{label:"Hand Tremor",cursorJitter:{freq:6,amp:9,intent:1.6,bitmap:96},css:"none"},handTremorStrong:{label:"Hand Tremor (Strong)",cursorJitter:{freq:5,amp:18,intent:1.9,bitmap:128},css:"none"},restingTremor:{label:"Resting Tremor",cursorJitter:{freq:4.5,amp:12,intent:-.9,bitmap:96},css:"none"},ataxicDrift:{label:"Ataxic Drift",cursorJitter:{freq:.7,amp:26,intent:.8,bitmap:128},css:"none"},pointerSpasm:{label:"Sudden Jerk",cursorJitter:{freq:5,amp:3,intent:.4,bitmap:128,spasm:{minGap:2200,maxGap:6500,size:44,dur:280}},css:"none"},pointerHidden:{label:"Hidden Pointer (Keyboard Only)",cursorJitter:{hide:!0,bitmap:32},css:"none"},fingertipTouch:{label:"Fingertip Touch",fingertip:{diameter:38},css:"none"},forcedColours:{label:"Forced Colours",forcedColours:!0,css:"none"},screenMagnifier:{label:"Screen Magnifier (400%)",magnifier:{scale:4},css:"none"},textSpacing:{label:"Text Spacing",injectCSS:`
        *:not([data-pour-audit]):not([data-pour-audit] *) { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
        p:not([data-pour-audit] *) { margin-bottom: 2em !important; }
      `,css:"none"},focusOrder:{label:"Focus Order",lens:"focusOrder",css:"none"},landmarkMap:{label:"Landmarks & Headings",lens:"landmarkMap",css:"none"},hearingLoss:{label:"Hearing Loss on the Page's Media",driver:"hearingLoss",options:{audiogram:"moderate",picker:"loss"},frames:!0,sound:!0,css:"none"},cochlearImplant:{label:"Cochlear Implant",driver:"hearingLoss",options:{audiogram:"implant8",picker:"implant"},frames:!0,sound:!0,css:"none"},tinnitus:{label:"Tinnitus",driver:"tinnitus",options:{pitch:6e3,kind:"tone",level:"quiet"},sound:!0,css:"none"}},Ke={afterimages:{driver:"afterimages",options:{decay:.86}},ageSlider:{driver:"ageSlider",options:{start:45}},protanomaly:{driver:"colourSeverity",options:{kind:"protanomaly",severity:"moderate"}},deuteranomaly:{driver:"colourSeverity",options:{kind:"deuteranomaly",severity:"moderate"}},tritanomaly:{driver:"colourSeverity",options:{kind:"tritanomaly",severity:"moderate"}}},rr=[{label:"Sensory overload",options:[{value:"lightSensitivity",added:"2026-07-30",name:"Light Sensitivity",metaphor:!0,description:"Photophobia: ordinary brightness arrives as glare; bright themes read as pain. The page does not look brighter to the person, it hurts at normal brightness; the glare here stands in for that.",label:"Light Sensitivity (Metaphor)"},{value:"colourHypersensitivity",added:"2026-07-30",name:"Colour Hypersensitivity",metaphor:!0,description:"Saturated colour lands far louder than you sent it.",label:"Colour Hypersensitivity (Metaphor)"},{value:"motionSensitivity",added:"2026-07-30",name:"Motion Sensitivity",stat:"~5% of adults",metaphor:!0,description:"Page motion is felt, not just seen: what autoplaying movement does to a vestibular-sensitive visitor. A still page looks still to them; the sway here stands in for the dizziness that moving content brings on.",label:"Motion Sensitivity (Metaphor)"}]},{label:"Attention & focus",options:[{value:"hyperfocusTunnel",added:"2026-07-30",name:"Hyperfocus Tunnel",metaphor:!0,description:"The world outside the point of focus falls away; the page exists one region at a time.",label:"Hyperfocus Tunnel (Metaphor)"},{value:"attentionFragmentation",added:"2026-07-30",name:"Attention Fragmentation",metaphor:!0,description:"A scattered attention field \u2014 every element competes and none of them wins.",label:"Attention Fragmentation (Metaphor)"},{value:"peripheralDistraction",added:"2026-07-30",name:"Peripheral Distraction",metaphor:!0,description:"Movement at the edges keeps stealing the centre of your gaze.",label:"Peripheral Distraction (Metaphor)"},{value:"detailFixation",added:"2026-09-12",name:"Detail Fixation",metaphor:!0,description:"Detail-first processing: the point of attention magnifies while the whole recedes.",label:"Detail Fixation (Metaphor)"}]},{label:"Processing differences",options:[{value:"processingDelay",added:"2026-07-30",name:"Processing Lag",metaphor:!0,description:"The page lands a beat late: interaction as it feels under cognitive load.",label:"Processing Lag (Metaphor)"},{value:"sensoryInterference",added:"2026-07-30",name:"Sensory Interference",metaphor:!0,description:"Visual noise under everything, like reading in a room that will not go quiet.",label:"Sensory Interference (Metaphor)"}]},{label:"Sensory spikes",options:[{value:"sensorySpike",added:"2026-07-30",name:"Sudden Sensory Spike",metaphor:!0,description:"Not a constant state: periodic waves of too-much, out of nowhere.",label:"Sudden Sensory Spike (Metaphor)"}]},{label:"Dyslexia / reading",options:[{value:"dyslexiaVisualStress",added:"2026-07-30",name:"Visual Stress (Pattern Glare)",metaphor:!0,description:"Dense text shimmers and bands together; lines merge and repel. A separate condition from dyslexia that some readers have alongside it; how many is contested.",label:"Visual Stress (Pattern Glare) (Metaphor)"},{value:"dyslexiaCrowding",added:"2026-07-30",name:"Crowding Effect",stat:"~10% dyslexic",description:"Letters and words pack too tightly to separate \u2014 spacing is doing more work than you think.",label:"Crowding Effect"},{value:"dyslexiaTrackingLoss",added:"2026-07-30",name:"Tracking Loss",stat:"~10% dyslexic",metaphor:!0,description:"Losing the line mid-sentence: only the neighbourhood of your pointer holds steady. Dyslexic readers report losing their place and rereading; the blur outside the line stands in for that.",label:"Tracking Loss (Metaphor)"},{value:"dyslexiaWashout",added:"2026-07-30",name:"Letter Instability",metaphor:!0,description:"Some letters appear fainter than others, making words harder to read. No reader reports this; it stands in for the extra effort each word costs when decoding is slow.",label:"Letter Instability (Metaphor)"},{value:"dyslexiaContrastSensitivity",added:"2026-07-30",name:"Contrast Sensitivity",description:"Full-contrast text tires, low-contrast text disappears; the readable band is narrow.",label:"Contrast Sensitivity"}]}],nr=[{label:"Tremor",options:[{value:"handTremor",added:"2026-08-06",name:"Hand Tremor",stat:"~1%",description:"An essential tremor: the pointer shakes harder the more precisely you aim.",label:"Hand Tremor"},{value:"handTremorStrong",added:"2026-08-06",name:"Hand Tremor (Strong)",description:"The same tremor, stronger \u2014 small close-set targets become lotteries.",label:"Hand Tremor (Strong)"},{value:"restingTremor",added:"2026-08-06",name:"Resting Tremor",stat:"~0.2%",description:"A parkinsonian pattern: shakes at rest, steadies during deliberate movement.",label:"Resting Tremor"}]},{label:"Pointer control",options:[{value:"ataxicDrift",added:"2026-08-06",name:"Ataxic Drift",description:"The pointer drifts wide of intent; straight lines are not on offer.",label:"Ataxic Drift"},{value:"pointerSpasm",added:"2026-08-06",name:"Sudden Jerk",description:"Occasional involuntary jerks fling the pointer \u2014 sometimes mid-click.",label:"Sudden Jerk"},{value:"pointerHidden",added:"2026-08-06",name:"Hidden Pointer (Keyboard Only)",description:"No pointer at all. The keyboard is the only way through your page.",label:"Hidden Pointer (Keyboard Only)"}]},{label:"Touch",options:[{value:"fingertipTouch",added:"2026-09-13",name:"Fingertip Touch",description:"The pointer becomes a fingertip, about 10 mm across. Every target under it is outlined, and when more than one is, each shows its share of the fingertip. A click lands the way a tap does: on one of those targets, in proportion to its share. Close-set links and small buttons are the findings.",label:"Fingertip Touch"}]}],ar=[{label:"Keyboard",options:[{value:"focusOrder",added:"2026-09-07",name:"Focus Order",description:"Numbered stops trace where Tab really goes, in order. Amber stops force their own position with a positive tabindex.",label:"Focus Order"}]},{label:"Page structure",options:[{value:"landmarkMap",added:"2026-09-07",name:"Landmarks & Headings",description:"Landmark regions tinted and named, every heading chipped with its level. Amber chips skip a level.",label:"Landmarks & Headings"}]}],or=[{label:"Colours",options:[{value:"forcedColours",added:"2026-09-12",name:"Forced Colours (Windows Contrast Theme)",stat:"~4% on Windows",description:"Every colour the page chose is replaced by a contrast theme\u2019s handful. Backgrounds, gradients and shadows go; borders keep their width; images and video stay, with a plate behind any text over them, as Windows draws it. Icon buttons that vanish, borderless fields and missing focus rings are the findings. An approximation: the page\u2019s own forced-colours rules are applied where its stylesheets can be read.",label:"Forced Colours (Windows Contrast Theme)"}]},{label:"Magnification",options:[{value:"screenMagnifier",added:"2026-09-13",name:"Screen Magnifier (400%)",description:"The page at 400%, as a full-screen magnifier shows it: a quarter of the width at a time, following the pointer and keyboard focus. When something changes outside the magnified view, a marker at the edge points to it. Messages, basket counts and menus that appear where the reader is not looking are the findings.",label:"Screen Magnifier (400%)"}]},{label:"Text",options:[{value:"textSpacing",added:"2026-09-12",name:"Text Spacing",description:"Line height 1.5, paragraph spacing 2, letter spacing 0.12 and word spacing 0.16 times the font size: the overrides low-vision and dyslexic readers apply, which WCAG 1.4.12 says a page must survive. Clipped labels, overflowing boxes and buttons that break are the findings.",label:"Text Spacing"}]}],ir=[{label:"Hearing loss",options:[{value:"hearingLoss",added:"2026-09-14",name:"Hearing Loss on the Page's Media",stat:"~20%",description:"The page\u2019s own audio and video through an audiogram: mild to severe, the notch of noise damage, or a noisy room. Turning the volume up does not help; captions do. The audiogram\u2019s part only: the blurring of pitch and the loss of speech in noise that come with it are not shown.",label:"Hearing Loss on the Page's Media - ~20%"}]},{label:"Tinnitus",options:[{value:"tinnitus",added:"2026-09-15",name:"Tinnitus",stat:"~14%",description:"A steady tone or a narrow hiss, high, media or no media. Quiet sounds near its pitch are masked and a long spoken video tires. The real thing rises and falls and hides behind ordinary sound; this one is steady. Captions and a transcript are what help.",label:"Tinnitus - ~14%"}]},{label:"Cochlear implant",options:[{value:"cochlearImplant",added:"2026-09-15",name:"Cochlear Implant",description:"The page\u2019s own audio and video as an implant delivers it: a few bands of noise, each carrying only the loudness of its band. Speech is followable from four channels up and sounds like a whisper through a pipe; melody and pitch are gone at any count. This is the sound before the months of learning: implant users follow it far better than a first listener does. Over a million people hear this way.",label:"Cochlear Implant"}]}],Se={};for(let e of[...tr,...rr,...nr,...ar,...or,...ir]){for(let t of e.options)Se[t.value]=t.label.split(" - ")[0];Object.assign(Se,{protanopia:"Red Absent (Protanopia)",deuteranopia:"Green Absent (Deuteranopia)",tritanopia:"Blue Absent (Tritanopia)"})}function $e(e){return e.assignedSlot??e.parentElement??e.getRootNode()?.host??null}var Je=new WeakMap,sr=new Set;function lr(e){let t=Je.get(e);if(!t){let r=typeof MutationObserver=="function"?new MutationObserver(()=>{t.ids=null,t.parents=new WeakMap}):null;t={ids:null,parents:new WeakMap,observer:r},r&&(r.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["id"]}),sr.add(r)),Je.set(e,t)}if(t.observer?.takeRecords().length&&(t.ids=null,t.parents=new WeakMap),!t.ids){t.ids=new Map;for(let r of e.querySelectorAll("[id]"))t.ids.set(r.id,(t.ids.get(r.id)??0)+1)}return t}function cr(e,t){let r=e.parentElement,a=t.parents.get(r);if(!a){let l=new Map;a=new WeakMap;for(let n of r.children){let o=(l.get(n.tagName)??0)+1;l.set(n.tagName,o),a.set(n,{position:o,repeated:!1})}for(let n of r.children)a.get(n).repeated=l.get(n.tagName)>1;t.parents.set(r,a)}return a.get(e)}function Qe(e){let t=e.getRootNode(),r=lr(t),a=o=>o.id&&r.ids.get(o.id)===1;if(a(e))return`#${CSS.escape(e.id)}`;let l=[],n=e;for(;n&&n.nodeType===Node.ELEMENT_NODE&&n!==document.documentElement;){let o=n.tagName.toLowerCase();if(n.parentElement){let{position:s,repeated:m}=cr(n,r);m&&(o+=`:nth-of-type(${s})`)}if(l.unshift(o),n.parentElement&&a(n.parentElement)){l.unshift(`#${CSS.escape(n.parentElement.id)}`);break}n=n.parentElement}return l.join(" > ")||e.tagName.toLowerCase()}function Ze(e){let t=Qe(e),r=e.getRootNode();for(;r&&r.host;)t=`${Qe(r.host)} >>> ${t}`,r=r.host.getRootNode();return t}var tn=typeof Element<"u"?Object.getOwnPropertyDescriptor(Element.prototype,"attributes")?.get:null;function et(e){for(let t=e;t;t=$e(t))if(t.nodeType===1&&t.hasAttribute("inert"))return!0;return!1}var pr=new Set(["atomic","busy","controls","current","describedby","description","details","dropeffect","flowto","grabbed","hidden","keyshortcuts","label","labelledby","live","owns","relevant","roledescription","braillelabel","brailleroledescription"]),rt=new Set(["banner","complementary","contentinfo","form","main","navigation","region","search"]),dr={link:["disabled","errormessage","expanded","haspopup","invalid"],button:["disabled","errormessage","expanded","haspopup","invalid","pressed"],checkbox:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],switch:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],radio:["checked","disabled","errormessage","haspopup","invalid","posinset","setsize"],option:["checked","disabled","errormessage","haspopup","invalid","posinset","selected","setsize"],tab:["disabled","errormessage","expanded","haspopup","invalid","posinset","selected","setsize"],menuitem:["disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemcheckbox:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemradio:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],textbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],searchbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],combobox:["activedescendant","autocomplete","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],listbox:["activedescendant","disabled","errormessage","expanded","haspopup","invalid","multiselectable","orientation","readonly","required"],slider:["disabled","errormessage","haspopup","invalid","orientation","readonly","valuemax","valuemin","valuenow","valuetext"],spinbutton:["activedescendant","disabled","errormessage","haspopup","invalid","readonly","required","valuemax","valuemin","valuenow","valuetext"],progressbar:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],meter:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],scrollbar:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],heading:["disabled","errormessage","haspopup","invalid","level"],list:["disabled","errormessage","haspopup","invalid"],listitem:["disabled","errormessage","haspopup","invalid","level","posinset","setsize"],row:["activedescendant","colindex","colindextext","disabled","errormessage","expanded","haspopup","invalid","level","posinset","rowindex","rowindextext","selected","setsize"],rowgroup:["disabled","errormessage","haspopup","invalid"],cell:["colindex","colindextext","colspan","disabled","errormessage","haspopup","invalid","rowindex","rowindextext","rowspan"],gridcell:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected"],columnheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],rowheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],table:["colcount","disabled","errormessage","haspopup","invalid","rowcount"],grid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","readonly","rowcount"],treegrid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","orientation","readonly","required","rowcount"],tablist:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation"],menu:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],menubar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],tree:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation","required"],treeitem:["checked","disabled","errormessage","expanded","haspopup","invalid","level","posinset","selected","setsize"],radiogroup:["activedescendant","disabled","errormessage","haspopup","invalid","orientation","readonly","required"],group:["activedescendant","disabled","errormessage","haspopup","invalid"],separator:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],toolbar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],dialog:["disabled","errormessage","haspopup","invalid","modal"],alertdialog:["disabled","errormessage","haspopup","invalid","modal"],application:["activedescendant","disabled","errormessage","expanded","haspopup","invalid"],article:["disabled","errormessage","haspopup","invalid","posinset","setsize"],img:["disabled","errormessage","haspopup","invalid"],figure:["disabled","errormessage","haspopup","invalid"],document:["disabled","errormessage","haspopup","invalid"],feed:["disabled","errormessage","haspopup","invalid"],math:["disabled","errormessage","haspopup","invalid"],note:["disabled","errormessage","haspopup","invalid"],presentation:["disabled","errormessage","haspopup","invalid"],none:["disabled","errormessage","haspopup","invalid"],banner:["disabled","errormessage","haspopup","invalid"],complementary:["disabled","errormessage","haspopup","invalid"],contentinfo:["disabled","errormessage","haspopup","invalid"],form:["disabled","errormessage","haspopup","invalid"],main:["disabled","errormessage","haspopup","invalid"],navigation:["disabled","errormessage","haspopup","invalid"],region:["disabled","errormessage","haspopup","invalid"],search:["disabled","errormessage","haspopup","invalid"],alert:["disabled","errormessage","haspopup","invalid"],log:["disabled","errormessage","haspopup","invalid"],marquee:["disabled","errormessage","haspopup","invalid"],status:["disabled","errormessage","haspopup","invalid"],timer:["disabled","errormessage","haspopup","invalid"],tabpanel:["disabled","errormessage","haspopup","invalid"],tooltip:["disabled","errormessage","haspopup","invalid"],definition:["disabled","errormessage","haspopup","invalid"],term:["disabled","errormessage","haspopup","invalid"],paragraph:["disabled","errormessage","haspopup","invalid"],generic:["disabled","errormessage","haspopup","invalid"],blockquote:["disabled","errormessage","haspopup","invalid"],caption:["disabled","errormessage","haspopup","invalid"],code:["disabled","errormessage","haspopup","invalid"],emphasis:["disabled","errormessage","haspopup","invalid"],strong:["disabled","errormessage","haspopup","invalid"],time:["disabled","errormessage","haspopup","invalid"],deletion:["disabled","errormessage","haspopup","invalid"],insertion:["disabled","errormessage","haspopup","invalid"],subscript:["disabled","errormessage","haspopup","invalid"],superscript:["disabled","errormessage","haspopup","invalid"]},ur={checkbox:"checkbox",radio:"radio",range:"slider",number:"spinbutton",search:"searchbox",email:"textbox",tel:"textbox",text:"textbox",url:"textbox",button:"button",submit:"button",reset:"button",image:"button"},fr=new Set(["text","search","tel","url","email"]),hr={button:"button",textarea:"textbox",img:"img",article:"article",aside:"complementary",nav:"navigation",main:"main",search:"search",h1:"heading",h2:"heading",h3:"heading",h4:"heading",h5:"heading",h6:"heading",ul:"list",ol:"list",menu:"list",li:"listitem",table:"table",thead:"rowgroup",tbody:"rowgroup",tfoot:"rowgroup",tr:"row",td:"cell",th:"columnheader",form:"form",fieldset:"group",details:"group",dialog:"dialog",hr:"separator",progress:"progressbar",meter:"meter",output:"status",option:"option",datalist:"listbox",dt:"term",dd:"definition",p:"paragraph",div:"generic",span:"generic",blockquote:"blockquote",figure:"figure",time:"time",code:"code",em:"emphasis",strong:"strong"};function tt(e){let t=e.tagName.toLowerCase();if(t==="a"||t==="area")return e.hasAttribute("href")?"link":"generic";if(t==="input")return fr.has(e.type)&&e.hasAttribute("list")?"combobox":ur[e.type]??null;if(t==="td"||t==="th"){if(t==="th"&&e.getAttribute("scope")?.toLowerCase()==="row")return"rowheader";if(t==="th")return"columnheader";let r=e.closest("table"),a=r&&Oe(r);return a==="grid"||a==="treegrid"?"gridcell":"cell"}if(t==="select")return e.multiple||e.size>1?"listbox":"combobox";if(t==="img")return e.getAttribute("alt")===""?"presentation":"img";if(t==="header")return e.closest("article, aside, main, nav, section")?"generic":"banner";if(t==="footer")return e.closest("article, aside, main, nav, section")?"generic":"contentinfo";if(t==="aside"){let r=e.parentElement?.closest("article, aside, nav, section"),a=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby");return r&&!a?"generic":"complementary"}return t==="section"?e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")?"region":"generic":hr[t]??null}function mr(e){return[...pr].some(t=>e.hasAttribute(`aria-${t}`))?!0:e.matches(":disabled")||et(e)?!1:e.tabIndex>=0?!0:e.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]')}function Oe(e){let t=e.getAttribute("role")?.trim().split(/\s+/)??[];for(let r of t){let a=r.toLowerCase();if(a==="image")return"img";if(dr[a])return(a==="presentation"||a==="none")&&mr(e)?tt(e):a}return tt(e)}var nt=`/* Structure-lens overlay styles (focus order, landmark map): injected by
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
`;function Ne(e){if(e.getElementById("pour-lens-styles"))return;let t=e.createElement("style");t.id="pour-lens-styles",t.dataset.pourAudit="overlay",t.textContent=nt,e.head.appendChild(t)}function be(e=document){let t=e.defaultView,r={contentVisibilityAuto:!0,visibilityProperty:!0,checkVisibilityCSS:!0};function a(s){for(let m=s;m&&m!==e.documentElement;m=m.parentElement??m.getRootNode()?.host??null){let b=m.ownerDocument.defaultView.getComputedStyle(m).position;if(b==="fixed")return"fixed";if(b==="sticky")return"sticky"}return"flow"}function l(s,{withLine:m=!1}={}){let b="background:none;border:0;margin:0;padding:0;box-shadow:none;filter:none;opacity:1;mix-blend-mode:normal;",u=e.createElement("div");u.className=s,u.dataset.pourAudit="overlay",u.style.cssText=`position:absolute;top:0;left:0;width:0;height:0;overflow:clip;overflow-clip-margin:24px;pointer-events:none;z-index:2147483646;${b}`;let c=e.createElement("div");c.className=s,c.dataset.pourAudit="overlay",c.style.cssText=`position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:2147483646;${b}`;let v=0,g=0,x=null,y=null,k=null;if(m){y=e.createElementNS("http://www.w3.org/2000/svg","svg"),y.setAttribute("class",`${s.replace(/-layer$/,"")}-path`);for(let[d,S]of[["position","absolute"],["top","0"],["left","0"],["width","100%"],["height","100%"],["max-width","none"],["max-height","none"],["display","block"],["overflow","visible"],["pointer-events","none"],["background","none"],["border","0"],["margin","0"],["padding","0"],["box-shadow","none"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])y.style.setProperty(d,S,"important");k=e.createElementNS("http://www.w3.org/2000/svg","polyline"),x=e.createElementNS("http://www.w3.org/2000/svg","polyline");for(let[d,S,L]of[[k,"rgba(29,78,216,0.85)","3"],[x,"#93C5FD","1.5"]])for(let[z,W]of[["fill","none"],["stroke",S],["stroke-width",L],["stroke-linejoin","round"],["stroke-linecap","round"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])d.style.setProperty(z,W,"important");y.append(k,x),u.append(y)}let E=[],A=null,N=0,G=(d,S)=>{let L=d.el.getBoundingClientRect(),z=L.width<=0&&L.height<=0||!d.el.isConnected||d.el.checkVisibility&&!d.el.checkVisibility(r);if(d.node.style.display=z?"none":"",z){d.docPt=null,d.viewRect=null;return}let W=d.anchor==="flow"?L.left-S.left:L.left,K=d.anchor==="flow"?L.top-S.top:L.top;if(d.node.style.transform=`translate(${W}px, ${K}px)`,d.sized)d.node.style.width=`${L.width}px`,d.node.style.height=`${L.height}px`;else{let $=d.node.getBoundingClientRect(),R=d.anchor==="flow"?{left:S.left,top:S.top,right:S.left+v,bottom:S.top+g}:{left:0,top:0,right:t.innerWidth,bottom:t.innerHeight},_=$.left<R.left?R.left-$.left:$.right>R.right?R.right-$.right:0,P=$.top<R.top?R.top-$.top:$.bottom>R.bottom?R.bottom-$.bottom:0;(_||P)&&(d.node.style.transform=`translate(${W+_}px, ${K+P}px)`)}d.anchor==="flow"?d.docPt=`${W},${K}`:d.viewRect=L},I=d=>{if(!x)return;let S=[];for(let z of E)z.offLine||z.node.style.display==="none"||(z.anchor==="flow"?z.docPt&&S.push(z.docPt):z.viewRect&&S.push(`${z.viewRect.left-d.left},${z.viewRect.top-d.top}`));let L=S.join(" ");k.setAttribute("points",L),x.setAttribute("points",L)},p=()=>{let d=e.documentElement.scrollWidth,S=e.documentElement.scrollHeight;d!==v&&(v=d,u.style.width=`${d}px`),S!==g&&(g=S,u.style.height=`${S}px`);let L=u.getBoundingClientRect();for(let z of E)G(z,L);I(L)};e.body.append(u,c);let h=()=>{N=t.requestAnimationFrame(h),p()};return h(),{setItems(d,S){for(let L of E)L.node.remove();E=d.map(L=>{let z=a(L.el);return(z==="flow"?u:c).append(L.node),{...L,anchor:z,docPt:null,viewRect:null}}),S&&!E.length?(A||(A=e.createElement("div"),A.className="pour-lens-notice",c.append(A)),A.textContent=S,A.style.display=""):A&&(A.style.display="none"),p()},destroy(){t.cancelAnimationFrame(N),u.remove(),c.remove(),E=[]}}}function n(s,m){for(let b=s.parentElement??s.getRootNode()?.host;b&&b!==e.documentElement;b=b.parentElement??b.getRootNode()?.host){let u=b.ownerDocument.defaultView.getComputedStyle(b);if(u.overflow==="visible"&&u.overflowX==="visible"&&u.overflowY==="visible")continue;let c=b.getBoundingClientRect();if(m.right<=c.left||m.left>=c.right||m.bottom<=c.top||m.top>=c.bottom)return!0}return!1}function o(){let s=[],m=[],b=u=>{for(let c of u.querySelectorAll("*")){if(c.dataset&&c.dataset.pourAudit||(c.shadowRoot&&b(c.shadowRoot),!c.matches('a[href], area[href], button, input, select, textarea, summary, iframe, object, embed, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]'))||c.disabled||c.closest("[inert]")||c.checkVisibility&&!c.checkVisibility(r))continue;let v=c.getBoundingClientRect();if(v.width<=0&&v.height<=0)continue;let g=c.getAttribute("tabindex"),x=g==null?0:parseInt(g,10)||0;if(x<0){c.matches("a[href], area[href], button, input, select, textarea, summary")&&!n(c,v)&&m.push({el:c});continue}s.push({el:c,idx:x,order:s.length})}};return b(e),{stops:[...s.filter(u=>u.idx>0).sort((u,c)=>u.idx-c.idx||u.order-c.order),...s.filter(u=>u.idx===0)],unreachable:m}}return{createLensTracker:l,collectFocusStops:o,clippedOutOfSight:n,VISIBLE_OPTS:r,anchorKind:a}}function at(e=document,t=be(e)){let r=e.defaultView,{createLensTracker:a,collectFocusStops:l,VISIBLE_OPTS:n}=t,o=null,s=0,m=null;function b(){if(o)return;Ne(e),o=a("pour-focus-order-layer",{withLine:!0});let A=()=>{let{stops:N,unreachable:G}=l(),I=N.map((p,h)=>{let d=e.createElement("span");return d.className="pour-focus-badge"+(p.idx>0?" pour-focus-badge-forced":""),d.textContent=String(h+1),p.idx>0&&(d.title=`tabindex="${p.idx}" forces this position`),{el:p.el,node:d,sized:!1}});for(let{el:p}of G){let h=e.createElement("span");h.className="pour-focus-badge pour-focus-badge-unreachable",h.textContent="\u2715",h.title='tabindex="-1" \u2014 a keyboard cannot Tab to this control',I.push({el:p,node:h,sized:!1,offLine:!0})}o.setItems(I,"Focus order: this page has no keyboard-reachable controls")};A(),m=new r.MutationObserver(()=>{s||(s=r.setTimeout(()=>{s=0,A()},400))}),m.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function u(){r.clearTimeout(s),s=0,m?.disconnect(),m=null,o?.destroy(),o=null}let c=null,v=0,g=null;function x(A){let N=A.getAttribute("aria-label");if(N?.trim())return N.trim();let G=A.getAttribute("aria-labelledby");return G?G.split(/\s+/).map(I=>A.getRootNode().getElementById?.(I)?.textContent.trim()??"").filter(Boolean).join(" "):""}function y(){let A=[],N=[],G=p=>{for(let h of p.querySelectorAll("*")){if(h.dataset&&h.dataset.pourAudit||(h.shadowRoot&&G(h.shadowRoot),h.checkVisibility&&!h.checkVisibility(n)))continue;let d=h.getBoundingClientRect();if(d.width<=0&&d.height<=0)continue;let S=Oe(h);if(rt.has(S)){if(S==="form"&&!x(h))continue;A.push({el:h,role:S,name:x(h)})}else if(S==="heading"){let L=parseInt(h.getAttribute("aria-level"),10)||parseInt(h.tagName.charAt(1),10)||2;N.push({el:h,level:L})}}};G(e);let I=null;for(let p of N)p.skipped=I!=null&&p.level>I+1,p.from=I,I=p.level;return{landmarks:A,headings:N}}function k(){if(c)return;Ne(e),c=a("pour-map-layer");let A=()=>{let{landmarks:N,headings:G}=y(),I=[];for(let p of N){let h=e.createElement("div");h.className=`pour-map-region pour-map-role-${p.role}`;let d=e.createElement("span");d.className="pour-map-tag",d.textContent=p.name?`${p.role} \xB7 ${p.name}`:p.role,h.append(d),I.push({el:p.el,node:h,sized:!0})}for(let p of G){let h=e.createElement("span");h.className="pour-map-heading"+(p.skipped?" pour-map-heading-skipped":""),h.textContent=`H${p.level}`,p.skipped&&(h.title=`Skips a level \u2014 the heading before this one is an H${p.from}`),I.push({el:p.el,node:h,sized:!1})}c.setItems(I,"No landmarks or headings are exposed on this page")};A(),g=new r.MutationObserver(()=>{v||(v=r.setTimeout(()=>{v=0,A()},400))}),g.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function E(){r.clearTimeout(v),v=0,g?.disconnect(),g=null,c?.destroy(),c=null}return{focusOrder:{apply:b,remove:u},landmarkMap:{apply:k,remove:E}}}function ot(e,t){let r=e.defaultView,a=r.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,l={mixBlendMode:t.style.mixBlendMode,overflow:t.style.overflow};t.style.mixBlendMode="screen",t.style.overflow="hidden";let n=e.createElement("div");n.setAttribute("aria-hidden","true"),n.dataset.pourAudit="filter",n.dataset.pourReflection="room",Object.assign(n.style,{position:"absolute",inset:"-20%",pointerEvents:"none",background:"radial-gradient(ellipse 30% 38% at 74% 16%, rgba(255,249,236,0.4), rgba(255,249,236,0.13) 42%, rgba(255,249,236,0) 72%), radial-gradient(ellipse 55% 26% at 18% 92%, rgba(255,255,255,0.1), rgba(255,255,255,0) 70%)",willChange:"transform"}),t.appendChild(n);let o=e.createElement("video");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourReflection="camera",o.muted=!0,o.playsInline=!0,o.autoplay=!0,Object.assign(o.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"cover",transform:"scaleX(-1)",opacity:String(.2),filter:"blur(0.9px) contrast(1.05)",pointerEvents:"none"}),t.appendChild(o);let s=null,m=0,b=y=>{s=e.createElement("div"),s.dataset.pourAudit="filter",s.dataset.pourReflection="note",s.setAttribute("role","status"),s.textContent=y,Object.assign(s.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(420px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(s),m=r.setTimeout(()=>{s?.remove(),s=null},7e3)},u=null,c=!1,v=r.navigator?.mediaDevices;v?.getUserMedia?v.getUserMedia({video:{facingMode:"user",width:{ideal:1280},height:{ideal:720}},audio:!1}).then(y=>{if(c){for(let k of y.getTracks())k.stop();return}u=y,o.srcObject=y,o.play().catch(()=>{})}).catch(()=>{c||b("Camera not available here, so the room light is shown without your reflection.")}):b("This page cannot use the camera (it needs a secure page), so the room light is shown without your reflection.");let g=0,x=y=>{g=r.requestAnimationFrame(x);let k=y/1e3;n.style.transform=`translate3d(${(Math.sin(k*.11)*14).toFixed(1)}px, ${(Math.cos(k*.083)*9).toFixed(1)}px, 0)`};return a||(g=r.requestAnimationFrame(x)),{stop(){if(c=!0,g&&r.cancelAnimationFrame(g),g=0,m&&r.clearTimeout(m),s?.remove(),s=null,u)for(let y of u.getTracks())y.stop();u=null,o.srcObject=null,o.remove(),n.remove(),t.style.mixBlendMode=l.mixBlendMode,t.style.overflow=l.overflow}}}var it={aquatic:{scheme:"dark",canvas:"#202020",canvasText:"#FFFFFF",linkText:"#75E9FC",grayText:"#A6A6A6",highlight:"#8EE3F0",highlightText:"#263B50",buttonFace:"#202020",buttonText:"#FFFFFF"}},Q=":not([data-pour-audit]):not([data-pour-audit] *):not([data-pour-fc-keep])",st=["data-pour-fc-bg","data-pour-fc-bgimg","data-pour-fc-before","data-pour-fc-after","data-pour-fc-keep"],br='script, style, noscript, template, textarea, option, select, title, svg, math, [data-pour-audit], [contenteditable]:not([contenteditable="false"])',ct='button, input[type="button"], input[type="submit"], input[type="reset"]',pt="input, textarea, select";function yr(e){return`
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
${ct.split(", ").map(t=>`${t}${Q}`).join(", ")} { color: ${e.buttonText} !important; }
${pt.split(", ").map(t=>`${t}${Q}`).join(", ")} { color: ${e.canvasText} !important; }
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
`}function lt(e){if(!e||e==="transparent")return 0;let t=/^rgba?\(\s*[\d.]+\s*,?\s*[\d.]+\s*,?\s*[\d.]+\s*(?:[,/]\s*([\d.]+%?))?\s*\)$/i.exec(e);return!t||t[1]===void 0?1:t[1].endsWith("%")?parseFloat(t[1])/100:parseFloat(t[1])}function dt(e,{theme:t="aquatic"}={}){let r=e.defaultView,a=it[t]||it.aquatic,l=!1,n=e.createElement("style");n.id="pour-forced-colours-page",n.dataset.pourAudit="filter";let o=e.createElement("style");o.id="pour-forced-colours",o.dataset.pourAudit="filter",o.textContent=yr(a),e.head.appendChild(n),e.head.appendChild(o);let s=p=>p.closest("[data-pour-audit]"),m=p=>{if(p.namespaceURI!=="http://www.w3.org/1999/xhtml"||s(p)||p.hasAttribute("data-pour-fc-plate"))return;let h=r.getComputedStyle(p);if(h.forcedColorAdjust==="none"){p.setAttribute("data-pour-fc-keep","");return}p.matches("mark")?p.setAttribute("data-pour-fc-bg","highlight"):lt(h.backgroundColor)>0?p.setAttribute("data-pour-fc-bg",p.matches(ct)?"button":p.matches(pt)?"field":"canvas"):p.removeAttribute("data-pour-fc-bg"),h.backgroundImage.includes("gradient(")?p.setAttribute("data-pour-fc-bgimg",""):p.removeAttribute("data-pour-fc-bgimg");for(let[d,S]of[["::before","data-pour-fc-before"],["::after","data-pour-fc-after"]]){let L=r.getComputedStyle(p,d);L.content!=="none"&&L.content!=="normal"&&(lt(L.backgroundColor)>0||L.backgroundImage.includes("gradient("))?p.setAttribute(S,""):p.removeAttribute(S)}},b=p=>{if(p.nodeType!==1||p.namespaceURI!=="http://www.w3.org/1999/xhtml")return;let h=e.createTreeWalker(p,r.NodeFilter.SHOW_TEXT),d=[];for(;h.nextNode();)d.push(h.currentNode);for(let S of d){if(!S.textContent.trim())continue;let L=S.parentElement;if(!L||L.namespaceURI!=="http://www.w3.org/1999/xhtml"||L.hasAttribute("data-pour-fc-plate")||L.closest(br))continue;let z=e.createElement("span");z.setAttribute("data-pour-fc-plate",""),L.replaceChild(z,S),z.appendChild(S)}},u=()=>{let p=e.querySelectorAll("[data-pour-fc-plate]");for(let h of p)h.replaceWith(...h.childNodes);p.length&&e.body.normalize()},c=p=>{if(p.nodeType===1){m(p);for(let h of p.querySelectorAll("*"))m(h);b(p)}},v=new Set,g=0,x=()=>{g=0;let p=[...v];v.clear();for(let h of p)h.isConnected&&c(h)},y=new r.MutationObserver(p=>{for(let h of p)if(h.type==="childList")for(let d of h.addedNodes)d.nodeType===1&&!d.hasAttribute("data-pour-fc-plate")&&v.add(d);else h.target.nodeType===1&&v.add(h.target);v.size&&!g&&(g=r.requestAnimationFrame(x))});c(e.body),y.observe(e.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class","style","disabled","aria-disabled","open","hidden"]});let k=/forced-colors\s*:\s*active|-ms-high-contrast\s*:\s*active/i,E=[],A=[],N=(p,h)=>{for(let d of p){let S=d.conditionText??d.media?.mediaText??"";if(d.media!==void 0&&d.cssRules!==void 0&&!h&&k.test(S)){N(d.cssRules,!0);continue}if(d.styleSheet){try{N(d.styleSheet.cssRules,h)}catch{}continue}if(h){E.push(d.cssText),d.style&&d.selectorText&&d.style.getPropertyValue("forced-color-adjust").trim()==="none"&&A.push(d.selectorText);continue}d.cssRules&&N(d.cssRules,!1)}},G=()=>{if(!l){n.textContent=E.join(`
`);for(let p of A){let h=[];try{h=e.querySelectorAll(p)}catch{continue}for(let d of h)s(d)||d.setAttribute("data-pour-fc-keep","")}}},I=[];for(let p of e.styleSheets)if(!p.ownerNode?.dataset?.pourAudit)try{N(p.cssRules,!1)}catch{if(!p.href||typeof r.CSSStyleSheet!="function")continue;I.push(r.fetch(p.href,{mode:"cors"}).then(h=>h.ok?h.text():"").then(h=>{if(!h||l)return;let d=new r.CSSStyleSheet;d.replaceSync(h),N(d.cssRules,!1)}).catch(()=>{}))}return G(),I.length&&Promise.all(I).then(G),{stop(){l=!0,y.disconnect(),g&&r.cancelAnimationFrame(g),g=0,v.clear(),u(),o.remove(),n.remove();for(let p of e.querySelectorAll(st.map(h=>`[${h}]`).join(",")))for(let h of st)p.removeAttribute(h)}}}var Ie="http://www.w3.org/2000/svg",ut="pour-lens-filter";function vr(e,{radius:t,ring:r,scale:a,magnify:l}){let n=t+r,o=(n+2)*2,s=o/2,m=e.createElement("canvas");m.width=o,m.height=o;let b=m.getContext("2d"),u=b.createImageData(o,o),c=u.data,v=t/l;for(let g=0;g<o;g++)for(let x=0;x<o;x++){let y=x+.5-s,k=g+.5-s,E=Math.hypot(y,k),A=E;if(E<t)A=E/l;else if(E<n){let h=(E-t)/r,d=h*h*(3-2*h);A=v+(n-v)*d}let N=E>0?A/E-1:0,G=N*y,I=N*k,p=(g*o+x)*4;c[p]=Math.max(0,Math.min(255,Math.round(127.5+G/a*255))),c[p+1]=Math.max(0,Math.min(255,Math.round(127.5+I/a*255))),c[p+2]=0,c[p+3]=Math.round(255*Math.max(0,Math.min(1,(n+2-E)/2)))}return b.putImageData(u,0,0),{href:m.toDataURL("image/png"),size:o}}function ft(e,{scale:t=2,radius:r=110,ring:a=60,point:l,target:n}){let o=e.defaultView,s=n||e.documentElement,m=Math.ceil(2*r*(1-1/t)*1.05),b=vr(e,{radius:r,ring:a,scale:m,magnify:t}),u=e.createElementNS(Ie,"svg");u.setAttribute("width","0"),u.setAttribute("height","0"),u.setAttribute("aria-hidden","true"),u.setAttribute("focusable","false"),u.dataset.pourAudit="filter",u.dataset.pourLens="defs",Object.assign(u.style,{position:"absolute",pointerEvents:"none"});let c=e.createElementNS(Ie,"filter");c.setAttribute("id",ut),c.setAttribute("filterUnits","userSpaceOnUse"),c.setAttribute("primitiveUnits","userSpaceOnUse"),c.setAttribute("x","0"),c.setAttribute("y","0"),c.setAttribute("width","100%"),c.setAttribute("height","100%"),c.setAttribute("color-interpolation-filters","sRGB");let v=(d,S)=>{let L=e.createElementNS(Ie,d);for(let[z,W]of Object.entries(S))L.setAttribute(z,String(W));return L},g={width:b.size,height:b.size},x=v("feImage",{href:b.href,preserveAspectRatio:"none",result:"map",...g}),y=v("feDisplacementMap",{in:"SourceGraphic",in2:"map",scale:m,xChannelSelector:"R",yChannelSelector:"G",result:"lens",...g}),k=v("feComposite",{in:"lens",in2:"map",operator:"in",result:"cut",...g}),E=v("feComposite",{in:"SourceGraphic",in2:"map",operator:"out",result:"rest"}),A=v("feComposite",{in:"cut",in2:"rest",operator:"over"}),N=[x,y,k];for(let d of[x,y,k,E,A])c.appendChild(d);u.appendChild(c),e.body.appendChild(u);let G=s.style.filter;s.style.filter=`url(#${ut})`;let I="",p=0,h=()=>{p=o.requestAnimationFrame(h);let d=l(),S=s.getBoundingClientRect(),L=Math.round(d.x-S.left-b.size/2),z=Math.round(d.y-S.top-b.size/2),W=`${L},${z}`;if(W!==I){I=W;for(let K of N)K.setAttribute("x",String(L)),K.setAttribute("y",String(z))}};return p=o.requestAnimationFrame(h),{stop(){p&&o.cancelAnimationFrame(p),p=0,s.style.filter=G,u.remove()}}}var xr=["a[href]","button",'input:not([type="hidden"])',"select","textarea","summary",'[role="button"]','[role="link"]','[role="checkbox"]','[role="radio"]','[role="switch"]','[role="tab"]','[role="menuitem"]','[role="option"]'].join(", "),wr=61,kr=1400;function Sr(e,t){let r=Math.PI*(3-Math.sqrt(5));return Array.from({length:e},(a,l)=>{let n=t*Math.sqrt((l+.5)/e);return[Math.cos(l*r)*n,Math.sin(l*r)*n]})}function ht(e,{diameter:t=38}={}){let r=e.defaultView,a=e.documentElement,l=t/2,n=Sr(wr,l),s=Math.ceil(t+3*2),m=e.createElement("canvas");m.width=s,m.height=s;let b=m.getContext("2d"),u=s/2;b&&(b.beginPath(),b.arc(u,u,l,0,Math.PI*2),b.fillStyle="rgba(17, 17, 17, 0.16)",b.fill(),b.lineWidth=2.5,b.strokeStyle="rgba(255, 255, 255, 0.9)",b.stroke(),b.lineWidth=1.25,b.strokeStyle="rgba(17, 17, 17, 0.85)",b.stroke(),b.beginPath(),b.arc(u,u,1.5,0,Math.PI*2),b.fillStyle="rgba(17, 17, 17, 0.85)",b.fill());let c=b?`url("${m.toDataURL("image/png")}") ${Math.round(u)} ${Math.round(u)}, auto`:"auto",v=e.createElement("style");v.dataset.pourAudit="filter",v.textContent=`
    html { cursor: ${c} !important; }
    :not(html) { cursor: inherit !important; }
    [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
  `,e.head.appendChild(v);let g=e.createElement("div");g.dataset.pourAudit="filter",g.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:2147483647;contain:strict;",e.body.appendChild(g);let x=()=>{let i=e.createElement("div");i.style.cssText="position:absolute;left:0;top:0;box-sizing:border-box;border-radius:3px;display:none;";let f=e.createElement("span");return f.style.cssText="position:absolute;left:-2px;bottom:100%;margin-bottom:3px;padding:1px 5px;border-radius:4px;font:600 11px/15px system-ui,-apple-system,sans-serif;font-variant-numeric:tabular-nums;white-space:nowrap;letter-spacing:0;",i.appendChild(f),g.appendChild(i),{el:i,chip:f}},y=[],k=x(),E=(i,f)=>{let T=e.elementFromPoint(i,f);for(;T?.shadowRoot;){let C=T.shadowRoot.elementFromPoint(i,f);if(!C||C===T)break;T=C}return T},A=i=>{for(let f=i;f;f=f.parentElement??f.getRootNode().host??null)if(f.nodeType===1){if(f.hasAttribute("data-pour-audit"))return null;if(f.matches(xr))return f.matches(":disabled")?null:f}return null};function N(i,f){let T=new Map,C=0;for(let[B,q]of n){let j=A(E(i+B,f+q));j&&(T.set(j,(T.get(j)??0)+1),C++)}return[...T].map(([B,q])=>({el:B,share:q/C})).sort((B,q)=>q.share-B.share)}let G=(i,f,T)=>{let C=null,B=1/0;for(let q of i.getClientRects()){let j=Math.max(q.left-f,0,f-q.right),Y=Math.max(q.top-T,0,T-q.bottom),ee=j*j+Y*Y;ee<B&&(B=ee,C=q)}return C??i.getBoundingClientRect()},I=(i,f,{border:T,halo:C,chipText:B,chipBg:q,chipFg:j})=>{Object.assign(i.el.style,{display:"block",transform:`translate(${Math.round(f.left-3)}px, ${Math.round(f.top-3)}px)`,width:`${Math.round(f.width+6)}px`,height:`${Math.round(f.height+6)}px`,border:`2px solid ${T}`,boxShadow:`0 0 0 1px ${C}`}),i.chip.style.display=B?"block":"none",i.chip.textContent=B??"",i.chip.style.background=q??"",i.chip.style.color=j??"";let Y=f.top>22;i.chip.style.bottom=Y?"100%":"auto",i.chip.style.top=Y?"auto":"100%",i.chip.style.marginBottom=Y?"3px":"0",i.chip.style.marginTop=Y?"0":"3px"},p=-1,h=-1,d=!1,S=0;function L(){S=0;let i=d?N(p,h):[],f=i.length>1;for(;y.length<i.length;)y.push(x());let T=[];if(y.forEach((C,B)=>{let q=i[B];if(!q){C.el.style.display="none";return}let j=G(q.el,p,h);I(C,j,f?{border:"#F59E0B",halo:"rgba(17,17,17,0.55)",chipText:`${Math.round(q.share*100)}%`,chipBg:"#F59E0B",chipFg:"#111"}:{border:"rgba(17,17,17,0.8)",halo:"rgba(255,255,255,0.9)"}),C.chip.style.left="-2px",T.push({b:C,r:j})}),f){let C=-1/0;for(let{b:B,r:q}of T.sort((j,Y)=>j.r.left-Y.r.left)){let j=Math.round(q.left-3),Y=Math.max(j-2,C);B.chip.style.left=`${Y-j}px`,C=Y+B.chip.offsetWidth+3}}}let z=()=>{S||(S=r.requestAnimationFrame(L))},W="mouse",K=null,$=0,R=i=>{W=i.pointerType||"mouse",W!=="touch"&&(p=i.clientX,h=i.clientY,d=!0,z())},_=i=>{i.relatedTarget||(d=!1,z())},P=i=>{if(W=i.pointerType||"mouse",W==="touch"||i.button!==0){K=null;return}K={shares:N(i.clientX,i.clientY),natural:A(E(i.clientX,i.clientY))}},V=i=>{let f=K;if(K=null,!f||!i.isTrusted||i.detail===0||W==="touch"||!f.shares.length)return;let T=Math.random(),C=f.shares[f.shares.length-1].el;for(let B of f.shares)if(T-=B.share,T<=0){C=B.el;break}C!==f.natural&&(i.preventDefault(),i.stopImmediatePropagation(),I(k,G(C,i.clientX,i.clientY),{border:"#111",halo:"rgba(255,255,255,0.9)",chipText:"The tap landed here",chipBg:"#111",chipFg:"#fff"}),r.clearTimeout($),$=r.setTimeout(()=>{k.el.style.display="none"},kr),typeof C.focus=="function"&&C.focus({preventScroll:!0}),C.click())};return e.addEventListener("pointermove",R,{passive:!0}),e.addEventListener("pointerdown",P,!0),e.addEventListener("mouseout",_,{passive:!0}),r.addEventListener("click",V,!0),r.addEventListener("scroll",z,{passive:!0,capture:!0}),{stop(){e.removeEventListener("pointermove",R),e.removeEventListener("pointerdown",P,!0),e.removeEventListener("mouseout",_),r.removeEventListener("click",V,!0),r.removeEventListener("scroll",z,{capture:!0}),S&&r.cancelAnimationFrame(S),r.clearTimeout($),g.remove(),v.remove()}}}var mt=(e,t)=>[e.style.getPropertyValue(t),e.style.getPropertyPriority(t)],Pe=(e,t,[r,a])=>{r?e.style.setProperty(t,r,a):e.style.removeProperty(t)},Ar=e=>e.transform!=="none"||e.translate!=="none"||e.rotate!=="none"||e.scale!=="none"||e.perspective!=="none"||e.filter!=="none"||(e.backdropFilter??"none")!=="none"||/paint|layout|strict|content/.test(e.contain)||/transform|perspective|filter/.test(e.willChange)||e.containerType&&e.containerType!=="normal";function gt(e,{scale:t=4}={}){let r=e.defaultView,a=e.documentElement,l=e.scrollingElement||a,n=["transform","transform-origin","height"].map(i=>[i,mt(a,i)]),o=r.innerWidth/2,s=r.innerHeight/2,m=0,b=0,u=new Map;a.style.setProperty("height","100%","important");function c(){a.style.removeProperty("transform"),m=Math.max(0,l.scrollWidth-r.innerWidth),b=Math.max(0,l.scrollHeight-r.innerHeight),a.style.setProperty("transform",`scale(${t})`,"important")}function v(){let i=r.scrollX,f=r.scrollY;a.style.setProperty("transform-origin",`${i+o}px ${f+s}px`,"important");for(let[T,{base:C}]of u)T.style.setProperty("translate",`calc(${C[0]} + ${i}px) calc(${C[1]} + ${f}px)`,"important")}function g(){let i=new Set;for(let f of e.body.getElementsByTagName("*")){if(f.hasAttribute("data-pour-audit"))continue;let T=r.getComputedStyle(f);if(T.position!=="fixed")continue;let C=!0;for(let B=f.parentElement;B&&B!==a;B=B.parentElement){if(i.has(B)){C=!1;break}if(!u.has(B)&&Ar(r.getComputedStyle(B))){C=!1;break}}if(C&&(i.add(f),!u.has(f))){let[B="0px",q="0px"]=T.translate==="none"?[]:T.translate.split(" ");u.set(f,{saved:mt(f,"translate"),base:[B,q]})}}for(let[f,T]of u)i.has(f)||(Pe(f,"translate",T.saved),u.delete(f));v()}let x=()=>{let i=o*(1-1/t),f=s*(1-1/t);return{left:i,top:f,right:i+r.innerWidth/t,bottom:f+r.innerHeight/t}},y=i=>({left:o+(i.left-o)/t,top:s+(i.top-s)/t,right:o+(i.right-o)/t,bottom:s+(i.bottom-s)/t}),k=(i,f)=>i.left<f.right&&i.right>f.left&&i.top<f.bottom&&i.bottom>f.top,E=e.createElement("div");E.dataset.pourAudit="filter",E.setAttribute("popover","manual"),E.style.cssText="position:fixed;inset:0;width:auto;height:auto;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:none;z-index:2147483647;",e.body.appendChild(E);try{E.showPopover()}catch{}let A=new Map,N=i=>{let f=(i.getAttribute("aria-label")||i.textContent||i.getAttribute("alt")||"").replace(/\s+/g," ").trim();return f?f.length>38?`${f.slice(0,37)}\u2026`:f:i.tagName==="IMG"?"An image":"Something"};function G(i){A.has(i)&&A.get(i).remove();let f=e.createElement("div");if(f.style.cssText="position:absolute;left:0;top:0;display:flex;align-items:center;gap:6px;max-width:280px;padding:4px 9px 4px 6px;border-radius:6px;background:#111;color:#fff;box-shadow:0 0 0 1px rgba(255,255,255,0.9);font:600 12px/16px system-ui,-apple-system,sans-serif;white-space:nowrap;letter-spacing:0;",f.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg><span style="overflow:hidden;text-overflow:ellipsis"></span>',f.lastChild.textContent=`Changed out of view: ${N(i)}`,E.appendChild(f),A.set(i,f),A.size>6){let[T]=A.keys();A.get(T).remove(),A.delete(T)}p()}let I=0,p=()=>{!I&&A.size&&(I=r.requestAnimationFrame(h))};function h(){I=0;let i=r.innerWidth,f=r.innerHeight,T=x();for(let[C,B]of A){let q=C.isConnected&&C.checkVisibility?.({checkOpacity:!0,checkVisibilityCSS:!0})!==!1?C.getBoundingClientRect():null;if(!q||!q.width||!q.height||k(y(q),T)){B.remove(),A.delete(C);continue}let j=(q.left+q.right)/2-i/2,Y=(q.top+q.bottom)/2-f/2,ee=B.offsetWidth/2,ae=B.offsetHeight/2,ie=Math.min(j?(i/2-14-ee)/Math.abs(j):1/0,Y?(f/2-14-ae)/Math.abs(Y):1/0),he=i/2+j*Math.min(ie,1e6),pe=f/2+Y*Math.min(ie,1e6);B.style.transform=`translate(${Math.round(he-ee)}px, ${Math.round(pe-ae)}px)`,B.firstChild.style.transform=`rotate(${Math.atan2(Y,j)}rad)`}A.size&&(I=r.requestAnimationFrame(h))}let d=new Set,S=0,L=0;function z(){S=0;let i=d;d=new Set;let f=r.innerWidth,T=r.innerHeight,C={left:0,top:0,right:f,bottom:T},B=x();for(let q of i){if(!q.isConnected||q===e.body||q===a||q.closest("[data-pour-audit]")||q.checkVisibility?.({checkOpacity:!0,checkVisibilityCSS:!0})===!1)continue;let j=y(q.getBoundingClientRect()),Y=j.right-j.left,ee=j.bottom-j.top;!Y||!ee||Y*ee>f*T*.5||k(j,C)&&!k(j,B)&&G(q)}}let W=new r.MutationObserver(i=>{let f=!1;for(let T of i){let C=T.target.nodeType===1?T.target:T.target.parentElement;if(!(!C||C===a)&&!(T.type==="attributes"&&T.attributeName==="style"&&u.has(C))&&!C.closest("[data-pour-audit]"))if(f=!0,T.type==="childList")for(let B of T.addedNodes)B.nodeType===1?d.add(B):B.nodeType===3&&B.textContent.trim()&&d.add(C);else d.add(C)}d.size&&!S&&(S=r.requestAnimationFrame(z)),f&&!L&&(L=r.setTimeout(()=>{L=0,c(),g()},300))}),K=0,$=(i,f)=>{o=Math.max(0,Math.min(r.innerWidth,i)),s=Math.max(0,Math.min(r.innerHeight,f)),K||(K=r.requestAnimationFrame(()=>{K=0,v(),p()}))},R=i=>$(i.clientX,i.clientY),_=i=>{let f=i.target;if(f?.nodeType!==1||f.closest("[data-pour-audit]"))return;let T=!1;try{T=f.matches(":focus-visible")}catch{T=!0}T&&r.requestAnimationFrame(()=>{let C=y(f.getBoundingClientRect());$((C.left+C.right)/2,(C.top+C.bottom)/2)})},P=()=>{(r.scrollY>b||r.scrollX>m)&&r.scrollTo({left:Math.min(r.scrollX,m),top:Math.min(r.scrollY,b),behavior:"instant"}),v(),p()},V=()=>{c(),$(o,s),g()};return c(),g(),W.observe(e.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeFilter:["class","style","hidden","open","aria-hidden"]}),e.addEventListener("pointermove",R,{passive:!0}),e.addEventListener("focusin",_,!0),r.addEventListener("scroll",P,{passive:!0}),r.addEventListener("resize",V),{stop(){W.disconnect(),e.removeEventListener("pointermove",R),e.removeEventListener("focusin",_,!0),r.removeEventListener("scroll",P),r.removeEventListener("resize",V);for(let i of[I,S,K])i&&r.cancelAnimationFrame(i);r.clearTimeout(L);for(let[i,f]of u)Pe(i,"translate",f.saved);u.clear();for(let[i,f]of n)Pe(a,i,f);E.remove()}}}var bt=`/* Overlay styles for the vision & sensory filters \u2014 ported from
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
`;function ye(e){for(let t=e;t;t=t.parentElement??t.getRootNode?.().host??null)if(t.nodeType===1&&t.hasAttribute("data-pour-audit"))return!0;return!1}function yt(e,t,{ms:r=7e3,role:a="status"}={}){let l=e.defaultView,n=e.createElement("div");n.dataset.pourAudit="filter",n.setAttribute("role",a),n.textContent=t,Object.assign(n.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483647",maxWidth:"min(460px, calc(100vw - 32px))",padding:"8px 12px",borderRadius:"8px",background:"#1B1D22",color:"#FCFCFC",font:"500 13px/1.4 system-ui, sans-serif",textAlign:"left",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}),e.body.appendChild(n);let o=r?l.setTimeout(()=>n.remove(),r):0;return()=>{o&&l.clearTimeout(o),n.remove()}}function fe(e,{interactive:t=!1,zIndex:r="2147483647"}={}){let a=e.createElement("div");a.dataset.pourAudit="filter",a.setAttribute("aria-hidden",t?"false":"true"),a.style.cssText=`position:fixed;inset:0;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:${t?"auto":"none"};z-index:${r};width:auto;height:auto;max-width:none;max-height:none;color:inherit;`,a.setAttribute("popover","manual"),e.body.appendChild(a);try{a.showPopover()}catch{}return a}function*ve(e){let t=[e];for(;t.length;){let r=t.pop();if(r.nodeType===1){if(r.hasAttribute("data-pour-audit"))continue;yield r,r.shadowRoot&&t.push(r.shadowRoot)}let a=r.children??[];for(let l=a.length-1;l>=0;l--)t.push(a[l])}}function vt(e,t){let r=e.createElement("style");return r.dataset.pourAudit="filter",r.textContent=t,e.head.appendChild(r),()=>r.remove()}function Be(e){return!!(e.isSecureContext&&e.navigator?.mediaDevices?.getDisplayMedia)}async function xt(e){let t=e.defaultView;if(!Be(t))throw new Error("self capture unavailable");let r=await t.navigator.mediaDevices.getDisplayMedia({video:{displaySurface:"browser",frameRate:{ideal:30}},audio:!1,preferCurrentTab:!0,selfBrowserSurface:"include",surfaceSwitching:"exclude",systemAudio:"exclude"}),a=e.createElement("video");a.dataset.pourAudit="filter",a.muted=!0,a.playsInline=!0,a.autoplay=!0,a.style.cssText="position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none;",a.srcObject=r,e.body.appendChild(a),await a.play().catch(()=>{});let l=()=>{for(let n of r.getTracks())n.stop();a.srcObject=null,a.remove()};return r.getVideoTracks()[0]?.addEventListener("ended",l),{video:a,stream:r,stop:l}}function wt(e,{label:t,choices:r,labels:a={},value:l,onChange:n}){let o=fe(e,{interactive:!0});o.style.pointerEvents="none";let s=e.createElement("div");s.setAttribute("role","group"),s.setAttribute("aria-label",t),s.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:6px;border-radius:10px;max-width:min(520px, calc(100vw - 32px));box-sizing:border-box;background:#1B1D22;box-shadow:0 4px 16px rgba(0,0,0,0.3);pointer-events:auto;font:500 13px/1 system-ui,sans-serif;z-index:2147483647;";let m=new Map,b=l,u=()=>{for(let[c,v]of m){let g=c===b;v.setAttribute("aria-pressed",g?"true":"false"),v.style.background=g?"#FFD60A":"transparent",v.style.color=g?"#1B1D22":"#FCFCFC"}};for(let c of r){let v=e.createElement("button");v.type="button",v.textContent=a[c]??c,v.style.cssText="appearance:none;border:0;border-radius:6px;padding:7px 9px;font:inherit;cursor:pointer;background:transparent;color:#FCFCFC;white-space:nowrap;",v.addEventListener("click",()=>{c!==b&&(b=c,u(),n?.(c))}),s.appendChild(v),m.set(c,v)}return o.appendChild(s),u(),{remove(){try{o.hidePopover()}catch{}o.remove()},set(c){b=c,u()}}}var qe=.55,Er=250,Cr=2e3,kt=500,Mr=4e3,Lr=1.5,Rr=.45,Fr=80,Dr='img, video, canvas, svg, picture, marquee, [class*="carousel" i], [class*="slide" i], [class*="marquee" i], [class*="ticker" i], [class*="parallax" i], [class*="swiper" i], [class*="slick" i]';function St(e,{decay:t=.86}={},r){let a=e.defaultView,l=r.container,n=a.performance;t=Math.min(.995,Math.max(.05,Number(t)||.86));let o=e.createElement("canvas");o.setAttribute("aria-hidden","true"),o.dataset.pourAudit="filter",o.dataset.pourAfterimages="trail",Object.assign(o.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none",opacity:String(qe),mixBlendMode:"normal"}),l.appendChild(o);let s=o.getContext("2d"),m=[],b=$=>m.push(yt(e,$)),u=0,c=0,v=!1,g=null,x=!1,y=0,k=0,E=[],A=()=>{u=a.innerWidth,c=a.innerHeight,o.width=Math.max(1,u),o.height=Math.max(1,c),x=!1},N=$=>{y=0;let R=k?Math.min(100,$-k):16;k=$;let _=Math.pow(t,R/100);if(g){let{video:P}=g;if(P.readyState>=2&&P.videoWidth){let V=Math.max(0,(_-qe)/(1-qe));s.globalAlpha=x?1-V:1,s.drawImage(P,0,0,u,c),s.globalAlpha=1,x=!0}y=a.requestAnimationFrame(N);return}s.clearRect(0,0,u,c);for(let P=E.length-1;P>=0;P--){let V=E[P],i=Rr*Math.pow(t,($-V.born)/100);if(i<.01){E.splice(P,1);continue}s.globalAlpha=i,s.fillStyle="#6b6b6b",s.fillRect(V.x,V.y,V.w,V.h),s.globalAlpha=Math.min(1,i*1.6),s.strokeStyle="#2a2a2a",s.lineWidth=1,s.strokeRect(V.x+.5,V.y+.5,Math.max(0,V.w-1),Math.max(0,V.h-1))}s.globalAlpha=1,E.length?y=a.requestAnimationFrame(N):k=0},G=()=>{!y&&!v&&(y=a.requestAnimationFrame(N))},I=()=>{A()};a.addEventListener("resize",I);let p=$=>$.bottom>0&&$.right>0&&$.top<c&&$.left<u&&($.width>0||$.height>0),h=()=>{let $=[];try{$=e.getAnimations?.()??[]}catch{$=[]}return $.filter(R=>R.playState==="running"&&!(a.CSSTransition&&R instanceof a.CSSTransition))},d=new Map,S=[],L=()=>{let $=[],R=new Set,_=i=>{!i||i.nodeType!==1||R.has(i)||ye(i)||(R.add(i),$.push(i))};for(let i of h())_(i.effect?.target);let P=[],V=0;for(let i of ve(e.body)){if(++V>Mr)break;i.matches(Dr)?_(i):P.push(i)}for(let i of P){if($.length>=kt)break;let f=i.getBoundingClientRect();f.width*f.height>=600&&p(f)&&_(i)}S=$.slice(0,kt);for(let i of d.keys())R.has(i)||d.delete(i)},z=()=>{let $=n.now(),R=0;for(let _ of S){if(!_.isConnected){d.delete(_);continue}let P=_.getBoundingClientRect(),V=d.get(_);d.set(_,P),!(!V||Math.max(Math.abs(P.left-V.left),Math.abs(P.top-V.top),Math.abs(P.width-V.width),Math.abs(P.height-V.height))<Lr||!(p(V)||p(P)))&&!g&&R<Fr&&V.width>0&&V.height>0&&(E.push({x:V.left,y:V.top,w:V.width,h:V.height,born:$}),R++)}R&&G()};A(),L();let W=a.setInterval(z,Er),K=a.setInterval(L,Cr);return Be(a)?xt(e).then($=>{if(v){$.stop();return}g=$,x=!1,E.length=0,G(),$.stream.getVideoTracks()[0]?.addEventListener("ended",()=>{v||g!==$||(g=null,x=!1,s.clearRect(0,0,u,c),b("Tab sharing ended, so only the elements that move are ghosted now."))})}).catch(()=>{v||b("Tab sharing was refused, so only the elements that move are ghosted.")}):b("This page cannot share its own pixels (Chromium on a secure page can), so only the elements that move are ghosted."),{stop(){if(!v){v=!0,y&&a.cancelAnimationFrame(y),y=0,a.clearInterval(W),a.clearInterval(K),a.removeEventListener("resize",I);try{g?.stop()}catch{}g=null,o.remove();for(let $ of m)$();m.length=0,d.clear(),S=[]}}}}var ze=20,Ae=90,$r=14,Or=24,Ve=65,At=[[20,"Nothing has changed yet."],[32,"The lens has begun to yellow, too slowly to notice."],[40,"Near focus starts to shorten; the phone moves further away."],[45,"Small text at reading distance is blurring (presbyopia)."],[50,"Contrast sensitivity for fine detail has begun to fall."],[55,"The pupil lets in about four fifths of the light it did at twenty."],[60,"Near focus is gone without glasses; the lens clouds faster from here."],[65,"One in twenty over sixty-five has an essential tremor; the pointer shows it."],[70,"A little over half the light reaches the retina compared with twenty."],[75,"Grey text on white is fading into its background."],[80,"Scatter in the lens veils the page; drawn here as a blur."],[85,"Only strong contrast and large targets are still easy."],[90,"The page as the oldest readers receive it."]],we=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],Ge=e=>e<=60?1+.02*(e-32):1.56+.0667*(e-60),Tt=Ge(20),Nr=Ge(90);function Et(e){let t=Math.max(ze,Math.min(Ae,e)),r=Ge(t)-Tt,a=.45*r/(Nr-Tt),l=1+(t/70)**4-(1+(20/70)**4),n=1+(90/70)**4-(1+(20/70)**4),o=.9*l/n,m=((3.36-.0102*(t-20))/3.36)**2,b=10**(-.1*r),u=Math.sqrt(m*b),c=10**(-.08*Math.max(0,t-50)/10),v=Math.max(0,15-.25*t),x=Math.min(2.5,Math.max(0,2.5-.5*v))/2,y=t<Ve?0:4+8*(t-Ve)/(Ae-Ve);return{age:t,sepia:a,scatterBlur:o,brightness:u,contrast:c,nearBlur:x,tremor:y}}function Ct(e,{start:t=45}={},r={}){let a=e.defaultView,l=e.documentElement,n=r.container,o=[],s=!1,m=Math.max(ze,Math.min(Ae,Number(t)||45)),b=fe(e);o.push(()=>{try{b.hidePopover()}catch{}b.remove()});let u=e.createElement("div");u.setAttribute("role","group"),u.setAttribute("aria-label","Age"),u.style.cssText="position:absolute;left:50%;bottom:16px;transform:translateX(-50%);pointer-events:auto;width:min(360px, calc(100vw - 32px));padding:10px 14px 12px;border-radius:10px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,0.3);";let c=e.createElement("div");c.style.cssText="display:flex;justify-content:space-between;align-items:baseline;gap:8px;";let v=e.createElement("span");v.textContent="Age";let g=e.createElement("span");g.textContent="approximation",g.title="Population averages from the cited studies; any one reader sits above or below them.",g.style.cssText="margin-left:8px;padding:0 6px;border:1px solid rgba(247,248,248,0.25);border-radius:999px;font-size:9px;font-weight:640;letter-spacing:0.07em;text-transform:uppercase;color:#B6BAC2;vertical-align:1px;",v.appendChild(g);let x=e.createElement("output");x.style.cssText="font-weight:650;font-size:18px;color:#FFD60A;font-variant-numeric:tabular-nums;",c.append(v,x);let y=e.createElement("input");y.type="range",y.min=String(ze),y.max=String(Ae),y.step="1",y.value=String(m),y.setAttribute("aria-label","Age"),y.style.cssText="display:block;width:100%;margin:6px 0 4px;accent-color:#FFD60A;cursor:pointer;";let k=e.createElement("div");k.setAttribute("aria-live","polite"),k.style.cssText="color:#D7D9DE;line-height:1.45;height:2.9em;overflow:hidden;",u.append(c,y,k),b.appendChild(u);let E=n?{filter:n.style.filter,backdrop:n.style.backdropFilter,webkit:n.style.webkitBackdropFilter}:null,A=e.createElement("style");A.dataset.pourAudit="filter",e.head.appendChild(A),o.push(()=>A.remove());let N=[];(()=>{let R=0;for(let _ of ve(e.body??l)){if(R>4e3)break;R++;let P=!1;for(let i of _.childNodes)if(i.nodeType===3&&i.nodeValue.trim()){P=!0;break}if(!P)continue;let V=parseFloat(a.getComputedStyle(_).fontSize);V<Or&&(_.setAttribute("data-pour-age-fine",""),V<$r&&_.setAttribute("data-pour-age-small",""),N.push(_))}})(),o.push(()=>{for(let R of N)R.removeAttribute("data-pour-age-fine"),R.removeAttribute("data-pour-age-small");N.length=0});let I=l.style.cursor,p=new Map,h=(R,_)=>{let P=`${R}:${_}`,V=p.get(P);if(V)return V;let i=64,f=e.createElement("canvas");f.width=i,f.height=i;let T=f.getContext("2d");if(!T)return"auto";let C=i/2;T.save(),T.translate(C+R,C+_),T.scale(1.15,1.15),T.beginPath(),T.moveTo(we[0][0],we[0][1]);for(let q=1;q<we.length;q++)T.lineTo(we[q][0],we[q][1]);T.closePath(),T.restore(),T.lineWidth=3,T.lineJoin="round",T.strokeStyle="#fff",T.stroke(),T.fillStyle="#000",T.fill();let B=`url("${f.toDataURL("image/png")}") ${C} ${C}, auto`;return p.set(P,B),B},d=null,S=0,L=R=>{S=a.requestAnimationFrame(L);let _=Et(m).tremor,P=2*Math.PI*6*(R/1e3),V=Math.round((Math.sin(P)*.7+Math.sin(P*1.63+1.1)*.3)*_),i=Math.round((Math.cos(P*.97+.6)*.7+Math.sin(P*2.11+2.3)*.3)*_);l.style.cursor=h(V,i)},z=R=>{R&&!S?(d=vt(e,":not(html) { cursor: inherit !important; } [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }"),S=a.requestAnimationFrame(L)):!R&&S&&(a.cancelAnimationFrame(S),S=0,d?.(),d=null,l.style.cursor=I)};o.push(()=>z(!1));let W=R=>{let _=At[0][1];for(let[P,V]of At)R>=P&&(_=V);return _},K=()=>{let R=Et(m);x.textContent=String(R.age),k.textContent=W(R.age);let _=`sepia(${R.sepia.toFixed(3)}) brightness(${R.brightness.toFixed(3)})${R.scatterBlur>.02?` blur(${R.scatterBlur.toFixed(2)}px)`:""}`;n&&(n.style.filter=_,n.style.backdropFilter=_,n.style.webkitBackdropFilter=_);let P=R.contrast<.995?`contrast(${R.contrast.toFixed(3)})`:"",V=R.nearBlur>.02?`blur(${R.nearBlur.toFixed(2)}px)`:"";A.textContent=(P?`[data-pour-age-fine] { filter: ${P} !important; }
`:"")+(V?`[data-pour-age-small] { filter: ${V} ${P} !important; }`:""),z(R.tremor>0)},$=()=>{m=Number(y.value)||m,K()};return y.addEventListener("input",$),o.push(()=>y.removeEventListener("input",$)),K(),o.push(()=>{n&&E&&(n.style.filter=E.filter,n.style.backdropFilter=E.backdrop,n.style.webkitBackdropFilter=E.webkit)}),{stop(){if(!s){s=!0;for(let R of o.reverse())try{R()}catch{}o.length=0}}}}var Mt="__pourHearingRouting";function Lt(e){let t=e.AudioContext||e.webkitAudioContext;if(!t)return null;let r=e[Mt]??={ctx:null,sources:new WeakMap};try{r.ctx??=new t}catch{return null}return r.ctx}var Te={loss:["none","mild","moderate","severe","noise","noisy"],implant:["none","implant4","implant8","implant16"]},Ir=[...Te.loss,...Te.implant],Pr={none:"None",mild:"Mild",moderate:"Moderate",severe:"Severe",profound:"Profound",noise:"Noise damage",noisy:"Noisy room",implant4:"4 channels",implant8:"8 channels",implant16:"16 channels"},Rt=4,Br=.1,qr=.5;function Vr(e){let t=Math.floor(e.sampleRate*Rt),r=e.createBuffer(1,t,e.sampleRate),a=r.getChannelData(0),l=0,n=0,o=0,s=0,m=0,b=0,u=0,c=0;for(let g=0;g<t;g++){let x=Math.random()*2-1;l=.99886*l+x*.0555179,n=.99332*n+x*.0750759,o=.969*o+x*.153852,s=.8665*s+x*.3104856,m=.55*m+x*.5329522,b=-.7616*b-x*.016898;let y=(l+n+o+s+m+b+u+x*.5362)*.11;u=x*.115926,a[g]=y,c+=y*y}let v=Br/Math.sqrt(c/t||1);for(let g=0;g<t;g++)a[g]*=v;return r}function ne(e,t,r,a=0,l=.707){let n=e.createBiquadFilter();return n.type=t,n.frequency.value=r,n.gain.value=a,n.Q.value=l,n}function zr(e){let r=new Float32Array(2048);for(let l=0;l<2048;l++){let n=l/2047*2-1;r[l]=Math.sign(n)*Math.abs(n)**1.6}let a=e.createWaveShaper();return a.curve=r,a.oversample="2x",a}function Gr(e){let t=Math.floor(e.sampleRate*Rt),r=e.createBuffer(1,t,e.sampleRate),a=r.getChannelData(0);for(let n=0;n<t;n++)a[n]=Math.random()*2-1;let l=e.createBufferSource();l.buffer=r,l.loop=!0;try{l.start()}catch{}return l}function _r(e,t){let r=e.createGain(),a=e.createGain();a.gain.value=4.5;let l=Gr(e),n=[r,a,l],o=200,s=7e3,m=new Float32Array(1024);for(let b=0;b<1024;b++)m[b]=Math.abs(b/1023*2-1);for(let b=0;b<t;b++){let u=o*(s/o)**(b/t),c=o*(s/o)**((b+1)/t),v=Math.sqrt(u*c),g=v/(c-u),x=ne(e,"bandpass",v,0,g),y=e.createWaveShaper();y.curve=m;let k=ne(e,"lowpass",160),E=ne(e,"bandpass",v,0,g),A=e.createGain();A.gain.value=0,r.connect(x),x.connect(y),y.connect(k),k.connect(A.gain),l.connect(E),E.connect(A),A.connect(a),n.push(x,y,k,E,A)}return{input:r,output:a,nodes:n,stop(){try{l.stop()}catch{}}}}function jr(e,t){if(/^implant\d+$/.test(t))return[_r(e,Number(t.slice(7)))];switch(t){case"none":return[];case"profound":{let r=e.createGain();return r.gain.value=0,[r]}case"noise":return[ne(e,"peaking",4e3,-30,2.5),ne(e,"highshelf",6500,-12),zr(e)];case"mild":return[ne(e,"highshelf",3e3,-15)];case"severe":{let r=e.createGain();return r.gain.value=.5,[ne(e,"lowpass",800),ne(e,"lowpass",800),ne(e,"highshelf",800,-45),r]}case"moderate":case"noisy":default:return[ne(e,"highshelf",1500,-25),ne(e,"lowpass",4e3)]}}var _e=e=>e.nodeType===1&&(e.tagName==="AUDIO"||e.tagName==="VIDEO");function Ft(e,{audiogram:t="moderate",frame:r=!1,picker:a="loss"}={}){let l=Te[a]??Te.loss,n=e.defaultView,o=r,s="pour-hearing-v1",m=()=>{for(let w=0;w<n.frames.length;w++)try{n.frames[w].postMessage({[s]:{setting:c}},"*")}catch{}},b=w=>{let F=w.data?.[s];if(F){if(F.hello&&w.source){try{w.source.postMessage({[s]:{setting:c}},"*")}catch{}return}r&&(!Ir.includes(F.setting)||F.setting===c||(c=F.setting,h(),m()))}};n.addEventListener("message",b);let u=n.AudioContext||n.webkitAudioContext,c=l.includes(t)?t:l[1],v=new Set,g=[],x=null,y=u?n[Mt]??={ctx:null,sources:new WeakMap}:null,k=null;if(y)try{y.ctx??=new u,k=y.ctx}catch{k=null}let E=null,A=null,N=[],G=null,I=null;k&&(E=k.createGain(),A=k.createGain(),A.connect(k.destination),y.input=E,y.output=A);function p(w){for(let F of w)try{if(F.nodes){F.stop?.();for(let X of F.nodes)X.disconnect()}else F.disconnect()}catch{}}function h(){if(!k)return;p(N),E.disconnect(),N=jr(k,c);let w=E;for(let F of N)w.connect(F.input??F),w=F.output??F;if(w.connect(A),c==="noisy"&&!G){I=k.createGain(),I.gain.value=0,I.connect(E),G=k.createBufferSource(),G.buffer=Vr(k),G.loop=!0,G.connect(I);try{G.start()}catch{}}S()}let d=new Set;function S(){if(!I)return;let w=c==="noisy"&&d.size?qr:0;I.gain.setTargetAtTime(w,k.currentTime,.02)}let L=!!(k&&k.state!=="running"),z=()=>{if(!k||k.state==="running"){K();return}k.resume().then(()=>{K(),ae()}).catch(()=>{})},W=["click","keydown","pointerdown","touchend"];function K(){if(L){L=!1;for(let w of W)e.removeEventListener(w,z,!0);x?.(),x=null}}if(L){for(let w of W)e.addEventListener(w,z,!0);o||(x=q("The sound routes through the audiogram after the next click or key press: the browser starts audio only on a gesture.")),z()}let $=new Map,R=new Set,_=n.location.origin;function P(w){let F=w.currentSrc||w.getAttribute("src")||"";if(!F)return!1;let X;try{X=new URL(F,e.baseURI)}catch{return!1}return X.protocol==="blob:"||X.protocol==="data:"||X.origin===_?!1:w.crossOrigin===null||w.crossOrigin===void 0}function V(w){let F=$.get(w);if(!F||R.has(w)||!k)return;if(!w.currentSrc&&!w.srcObject&&!w.getAttribute("src")){if(F.status="no source yet",!F.listening){F.listening=!0;let ke=()=>{F.listening=!1,V(w),ae()};w.addEventListener("loadedmetadata",ke,{once:!0}),g.push(()=>w.removeEventListener("loadedmetadata",ke))}return}if(P(w)){F.status="cannot be routed here",F.why="cross-origin media without CORS headers";return}let X=y.sources.get(w);if(X)try{X.disconnect()}catch{}else try{X=k.createMediaElementSource(w),y.sources.set(w,X)}catch{F.status="cannot be routed here",F.why="already in the page's own audio graph";return}X.connect(E),R.add(w),F.status=L?"routed, waiting for a click":"routed"}function i(w){let F=y?.sources.get(w);if(F){try{F.disconnect()}catch{}try{F.connect(k.destination)}catch{}}}let f=fe(e,{interactive:!0});f.style.pointerEvents="none";let T=e.createElement("div");T.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:max-content;max-width:min(520px, calc(100vw - 32px));pointer-events:none;z-index:2147483647;";let C=e.createElement("div");C.setAttribute("role","status"),C.hidden=!0,C.style.cssText="padding:8px 12px;border-radius:8px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;text-align:left;box-shadow:0 4px 16px rgba(0,0,0,0.3);max-width:100%;box-sizing:border-box;";let B=0,q=(w,F=9e3)=>(n.clearTimeout(B),C.textContent=w,C.hidden=!1,B=n.setTimeout(()=>{C.hidden=!0},F),()=>{n.clearTimeout(B),C.hidden=!0}),j=e.createElement("div");j.setAttribute("role","group"),j.setAttribute("aria-label","Hearing loss setting"),j.style.cssText="display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:6px;border-radius:10px;max-width:100%;box-sizing:border-box;background:#1B1D22;box-shadow:0 4px 16px rgba(0,0,0,0.3);pointer-events:auto;font:500 13px/1 system-ui,sans-serif;";let Y=new Map;for(let w of l){let F=e.createElement("button");F.type="button",F.textContent=Pr[w],F.style.cssText="appearance:none;border:0;border-radius:6px;padding:7px 9px;font:inherit;cursor:pointer;background:transparent;color:#FCFCFC;white-space:nowrap;",F.addEventListener("click",()=>{c=w,h(),ee(),m()}),j.appendChild(F),Y.set(w,F)}let ee=()=>{for(let[w,F]of Y){let X=w===c;F.setAttribute("aria-pressed",X?"true":"false"),F.style.background=X?"#FFD60A":"transparent",F.style.color=X?"#1B1D22":"#FCFCFC"}};if(T.append(C,j),o||f.appendChild(T),ee(),!k&&!o&&(x=q("This browser has no Web Audio, so the media plays as it is.")),r)try{n.parent.postMessage({[s]:{hello:!0}},"*")}catch{}function ae(){for(let[w,F]of $)R.has(w)&&(F.status=L?"routed, waiting for a click":"routed")}function ie(w){$.has(w)||ye(w)||($.set(w,{status:k?"not routed":"no Web Audio"}),w.paused||d.add(w),V(w))}let he=w=>{for(let F of ve(w))_e(F)&&ie(F)};he(e.body);let pe=w=>{let F=w.target;if(!_e(F)||ye(F))return;$.has(F)||ie(F);let X=$.get(F);d.add(F),S(),xe()},se=w=>{_e(w.target)&&(d.delete(w.target),S())};e.addEventListener("play",pe,!0),e.addEventListener("pause",se,!0),e.addEventListener("ended",se,!0),e.addEventListener("emptied",se,!0);let de=new Set,oe=0,ue=0,xe=()=>{ue||(ue=n.setTimeout(()=>{ue=0,ae()},100))},me=new n.MutationObserver(w=>{for(let F of w)for(let X of F.addedNodes)X.nodeType===1&&!ye(X)&&de.add(X);de.size&&!oe&&(oe=n.requestAnimationFrame(()=>{oe=0;let F=de;de=new Set;for(let X of F)X.isConnected&&he(X);xe()}))});return me.observe(e.body,{childList:!0,subtree:!0}),h(),ae(),!o&&!$.size&&e.querySelector("iframe")&&(x?.(),x=q("The only video here is inside an embedded frame. The extension routes it from within that frame; the bookmarklet and the command line cannot reach it.")),{stop(){me.disconnect(),K(),oe&&n.cancelAnimationFrame(oe),oe=0,n.clearTimeout(ue),ue=0;for(let w of v)n.clearInterval(w);v.clear();for(let w of g)try{w()}catch{}g.length=0,e.removeEventListener("play",pe,!0),e.removeEventListener("pause",se,!0),e.removeEventListener("ended",se,!0),e.removeEventListener("emptied",se,!0);for(let w of R)i(w);if(R.clear(),k){try{G?.stop()}catch{}G?.disconnect(),I?.disconnect(),G=null,I=null,p(N),N=[];try{E?.disconnect()}catch{}try{A?.disconnect()}catch{}y.input===E&&(y.input=null,y.output=null)}n.removeEventListener("message",b),x?.(),x=null;try{f.hidePopover()}catch{}f.remove(),$.clear()}}}var Dt=[4e3,6e3,8e3],je={quiet:.012,loud:.045};function Hr(e,{kind:t="tone",pitch:r=6e3,level:a="quiet"}={}){let l=e.createGain();l.gain.value=0;let n=e.createOscillator();n.type="sine",n.frequency.value=r;let o=e.createGain();n.connect(o),o.connect(l);let s=Math.floor(e.sampleRate*2),m=e.createBuffer(1,s,e.sampleRate),b=m.getChannelData(0);for(let x=0;x<s;x++)b[x]=Math.random()*2-1;let u=e.createBufferSource();u.buffer=m,u.loop=!0;let c=e.createBiquadFilter();c.type="bandpass",c.frequency.value=r,c.Q.value=12;let v=e.createGain();u.connect(c),c.connect(v),v.connect(l);try{n.start(),u.start()}catch{}let g=(x,y,k)=>{let E=e.currentTime;n.frequency.setTargetAtTime(y,E,.02),c.frequency.setTargetAtTime(y,E,.02);let A=je[k]??je.quiet;o.gain.setTargetAtTime(x==="tone"?A:0,E,.02),v.gain.setTargetAtTime(x==="hiss"?A*6:0,E,.02),l.gain.setTargetAtTime(1,E,.05)};return g(t,r,a),{output:l,set:g,stop(){l.gain.setTargetAtTime(0,e.currentTime,.02);try{n.stop(e.currentTime+.2),u.stop(e.currentTime+.2)}catch{}setTimeout(()=>{l.disconnect()},400)}}}function $t(e,{pitch:t=6e3,kind:r="tone",level:a="quiet"}={}){let l=e.defaultView,n=Lt(l),o={kind:r,pitch:Dt.includes(t)?t:6e3,level:je[a]?a:"quiet"},s=null;n&&(s=Hr(n,o),s.output.connect(n.destination));let m=fe(e,{interactive:!0});m.style.pointerEvents="none";let b=e.createElement("div");b.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:max-content;max-width:min(520px, calc(100vw - 32px));pointer-events:none;z-index:2147483647;";let u=e.createElement("div");u.setAttribute("role","status"),u.hidden=!0,u.style.cssText="padding:8px 12px;border-radius:8px;background:#1B1D22;color:#FCFCFC;font:500 13px/1.4 system-ui,sans-serif;text-align:left;box-shadow:0 4px 16px rgba(0,0,0,0.3);max-width:100%;box-sizing:border-box;";let c=e.createElement("div");c.setAttribute("role","group"),c.setAttribute("aria-label","Tinnitus setting"),c.style.cssText="display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:6px;border-radius:10px;max-width:100%;box-sizing:border-box;background:#1B1D22;box-shadow:0 4px 16px rgba(0,0,0,0.3);pointer-events:auto;font:500 13px/1 system-ui,sans-serif;";let v=[],g=(p,h,d)=>{let S=e.createElement("button");S.type="button",S.textContent=p,S.style.cssText="appearance:none;border:0;border-radius:6px;padding:7px 9px;font:inherit;cursor:pointer;background:transparent;color:#FCFCFC;white-space:nowrap;",S.addEventListener("click",()=>{d(),x()}),v.push({b:S,isOn:h}),c.appendChild(S)};g("Tone",()=>o.kind==="tone",()=>{o.kind="tone"}),g("Hiss",()=>o.kind==="hiss",()=>{o.kind="hiss"});for(let p of Dt)g(`${p/1e3} kHz`,()=>o.pitch===p,()=>{o.pitch=p});g("Quiet",()=>o.level==="quiet",()=>{o.level="quiet"}),g("Loud",()=>o.level==="loud",()=>{o.level="loud"});let x=()=>{for(let{b:p,isOn:h}of v){let d=h();p.setAttribute("aria-pressed",d?"true":"false"),p.style.background=d?"#FFD60A":"transparent",p.style.color=d?"#1B1D22":"#FCFCFC"}s?.set(o.kind,o.pitch,o.level)};b.append(u,c),m.appendChild(b),x();let y=0,k=(p,h=9e3)=>{l.clearTimeout(y),u.textContent=p,u.hidden=!1,y=l.setTimeout(()=>{u.hidden=!0},h)};n||k("This browser has no Web Audio, so there is no sound to add.");let E=["click","keydown","pointerdown","touchend"],A=!!(n&&n.state!=="running"),N=()=>{if(A){A=!1;for(let p of E)e.removeEventListener(p,G,!0);u.hidden=!0}},G=()=>{if(!n||n.state==="running"){N();return}n.resume().then(N).catch(()=>{})};if(A){for(let p of E)e.addEventListener(p,G,!0);k("The sound starts after the next click or key press: the browser starts audio only on a gesture."),G()}let I=!1;return{stop(){if(!I){I=!0,N(),l.clearTimeout(y),s?.stop(),s=null;try{m.hidePopover()}catch{}m.remove()}}}}var Ot=["mild","moderate","severe"],Wr={mild:"Mild",moderate:"Moderate",severe:"Severe"};function Nt(e,{kind:t,severity:r="moderate"}={},a={}){let l=e.documentElement;if(!t||!/^url\(/.test(l.style.filter))return{stop(){}};let n=m=>m==="moderate"?`url(#pour-vision-filter-${t})`:`url(#pour-vision-filter-${t}-${m})`,o=Ot.includes(r)?r:"moderate",s=wt(e,{label:"Severity",choices:Ot,labels:Wr,value:o,onChange:m=>{o=m,l.style.filter=n(o)}});return l.style.filter=n(o),{stop(){s.remove()}}}var Ee={afterimages:St,ageSlider:Ct,hearingLoss:Ft,tinnitus:$t,colourSeverity:Nt};function It(e=document){let t=e.defaultView,r=e.documentElement,a=be(e),l=at(e,a),n=null,o=null,s=null,m=null,b=null,u=null,c=null,v=null,g="none",x="none",y=0,k=0,E=0,A=0,N=null;function G(){if(e.getElementById("pour-filter-styles"))return;let M=e.createElement("style");M.id="pour-filter-styles",M.dataset.pourAudit="filter",M.textContent=bt,e.head.appendChild(M)}function I(){if(e.getElementById("pour-vision-filter-defs"))return;let M="http://www.w3.org/2000/svg",D=e.createElementNS(M,"svg");D.setAttribute("id","pour-vision-filter-defs"),D.setAttribute("width","0"),D.setAttribute("height","0"),D.setAttribute("focusable","false"),D.setAttribute("aria-hidden","true"),D.dataset.pourAudit="filter",D.style.position="absolute",D.style.pointerEvents="none";let H=e.createElementNS(M,"defs");for(let[O,Z]of Object.entries(Re)){let J=e.createElementNS(M,"filter");J.setAttribute("id",`pour-vision-filter-${O}`),J.setAttribute("color-interpolation-filters","linearRGB");let U=e.createElementNS(M,"feColorMatrix");U.setAttribute("type","matrix"),U.setAttribute("values",Z),J.appendChild(U),H.appendChild(J)}for(let[O,Z]of Object.entries(Ye))for(let[J,U]of Object.entries(Z)){let te=e.createElementNS(M,"filter");te.setAttribute("id",`pour-vision-filter-${O}-${J}`),te.setAttribute("color-interpolation-filters","linearRGB");let re=e.createElementNS(M,"feColorMatrix");re.setAttribute("type","matrix"),re.setAttribute("values",U),te.appendChild(re),H.appendChild(te)}for(let[O,Z]of Object.entries(Xe)){let J=e.createElementNS(M,"filter");J.setAttribute("id",`pour-vision-filter-${O}`),J.setAttribute("color-interpolation-filters","linearRGB"),J.innerHTML=Z,H.appendChild(J)}D.appendChild(H),e.body.appendChild(D)}let p=M=>{let D=e.createElement("div");return D.className=M,D.dataset.pourAudit="filter",e.body.appendChild(D),D};function h(){E=0,r.style.setProperty("--pour-vision-x",`${y}px`),r.style.setProperty("--pour-vision-y",`${k}px`),r.style.setProperty("--pour-vision-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function d(M){y=M.clientX,k=M.clientY,E||(E=t.requestAnimationFrame(h))}function S(M){let D=M.touches[0];D&&d(D)}function L(M,D=null){for(let Z of Fe)r.classList.remove(`pour-vision-filter-${Z}`);De.has(g)&&(e.removeEventListener("mousemove",d),e.removeEventListener("touchmove",S)),o?.stop(),o=null;try{u?.stop()}catch{}if(u=null,n?.remove(),n=null,g=ce[M]!==void 0?M:"none",g==="none"){x==="none"&&(r.style.filter="");return}x!=="none"&&me("none"),G(),I();let H=ce[g]||"none";r.style.filter=H==="none"?"":H,Fe.has(g)&&(r.classList.add(`pour-vision-filter-${g}`),n=p("pour-vision-filter-overlay"),n.dataset.filter=g,g==="glossyScreen"&&(o=ot(e,n)));let O=Ke[g];O&&Ee[O.driver]&&(u=Ee[O.driver](e,{...O.options??{},...D??{}},{kit:a,container:n,lenses:l})),De.has(g)&&(y=t.innerWidth/2,k=t.innerHeight/2,h(),e.addEventListener("mousemove",d),e.addEventListener("touchmove",S,{passive:!0}))}function z(){A=0,r.style.setProperty("--pour-sensory-x",`${y}px`),r.style.setProperty("--pour-sensory-y",`${k}px`),r.style.setProperty("--pour-sensory-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function W(M){y=M.clientX,k=M.clientY,A||(A=t.requestAnimationFrame(z))}function K(M){let D=M.touches[0];D&&W(D)}function $(M){if(e.getElementById("pour-sensory-injected-style")?.remove(),!M)return;let D=e.createElement("style");D.id="pour-sensory-injected-style",D.dataset.pourAudit="filter",D.textContent=M,e.head.appendChild(D)}function R(){if(e.querySelector(".pour-sensory-washout-char"))return;let M=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null),D=[];for(;M.nextNode();)D.push(M.currentNode);for(let H of D){let O=H.textContent;if(!O.trim())continue;let Z=H.parentElement;if(!Z||Z.closest("script,style,noscript,[data-pour-audit]"))continue;let J=e.createDocumentFragment();for(let U of O)if(U===" "||U===`
`||U==="	")J.appendChild(e.createTextNode(U));else{let te=e.createElement("span");te.textContent=U,te.style.opacity=(.3+Math.random()*.7).toFixed(2),te.className="pour-sensory-washout-char",J.appendChild(te)}Z.replaceChild(J,H)}}function _(){for(let M of e.querySelectorAll(".pour-sensory-washout-char"))M.replaceWith(M.textContent);e.body.normalize()}let P=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],V=new Map,i=0,f=0,T=null,C=0,B=0,q=0,j=0,Y=0,ee=0;function ae(M,D,H){let O=`${M}:${D}:${H}`,Z=V.get(O);if(Z)return Z;let J=e.createElement("canvas");J.width=M,J.height=M;let U=J.getContext("2d");if(!U)return"auto";let te=Math.round(M/2);U.save(),U.translate(te+D,te+H),U.scale(1.15,1.15),U.beginPath(),U.moveTo(P[0][0],P[0][1]);for(let le=1;le<P.length;le++)U.lineTo(P[le][0],P[le][1]);U.closePath(),U.restore(),U.lineWidth=3,U.lineJoin="round",U.strokeStyle="#fff",U.stroke(),U.fillStyle="#000",U.fill();let re=`url("${J.toDataURL("image/png")}") ${te} ${te}, auto`;return V.set(O,re),re}function ie(M){let D=M.timeStamp||Date.now(),H=D-q;if(q&&H>0){let O=Math.hypot(M.clientX-C,M.clientY-B);j=j*.8+O/H*1e3*.2}C=M.clientX,B=M.clientY,q=D}function he(M,D){if(!Y)return Y=M+D.minGap+Math.random()*(D.maxGap-D.minGap),[0,0];let H=M-Y;if(H<0)return[0,0];if(H>D.dur)return Y=M+D.minGap+Math.random()*(D.maxGap-D.minGap),ee=Math.random()*Math.PI*2,[0,0];let O=1-H/D.dur,Z=D.size*O*O;return[Math.cos(ee)*Z,Math.sin(ee)*Z]}function pe(M){i=t.requestAnimationFrame(pe);let D=T;if(!D)return;let H=(M-f)/1e3,O=0,Z=0;if(D.freq&&D.amp){let re=2*Math.PI*D.freq,le=Math.max(0,1+(D.intent||0)*Math.min(1,j/700)),We=D.amp*le;O+=(Math.sin(re*H)*.7+Math.sin(re*1.63*H+1.1)*.3)*We,Z+=(Math.cos(re*.97*H+.6)*.7+Math.sin(re*2.11*H+2.3)*.3)*We}if(D.spasm){let[re,le]=he(M,D.spasm);O+=re,Z+=le}let J=D.bitmap/2-14,U=Math.max(-J,Math.min(J,Math.round(O))),te=Math.max(-J,Math.min(J,Math.round(Z)));r.style.cursor=ae(D.bitmap,U,te)}function se(M){de(),T=M,f=t.performance?t.performance.now():Date.now(),j=0,q=0,Y=0,ee=Math.random()*Math.PI*2,oe(M.hide?`
      html, :not(html) { cursor: none !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `:`
      :not(html) { cursor: inherit !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `),!M.hide&&(e.addEventListener("mousemove",ie,{passive:!0}),i=t.requestAnimationFrame(pe))}function de(){i&&t.cancelAnimationFrame(i),i=0,T=null,Y=0,e.removeEventListener("mousemove",ie),oe(null),r.style.cursor=""}function oe(M){if(e.getElementById("pour-sensory-cursor-style")?.remove(),!M)return;let D=e.createElement("style");D.id="pour-sensory-cursor-style",D.dataset.pourAudit="filter",D.textContent=M,e.head.appendChild(D)}function ue(){xe();let M=()=>{N=t.setTimeout(()=>{v&&(v.classList.add("pour-sensory-spike-flash"),t.setTimeout(()=>{v?.classList.remove("pour-sensory-spike-flash"),M()},150))},3e3+Math.random()*8e3)};M()}function xe(){N&&(t.clearTimeout(N),N=null)}function me(M,D=null){let H=ge[x];H?.overlay&&r.classList.remove(`pour-sensory-filter-${x}`),H?.hostClass&&r.classList.remove(H.hostClass),H?.mouseTracked&&(e.removeEventListener("mousemove",W),e.removeEventListener("touchmove",K)),H?.injectScript&&_(),H?.cursorJitter&&de(),H?.viewportOrigin&&zt(),H?.loupe&&He(),H?.lens&&l[H.lens]?.remove(),s?.stop(),s=null,m?.stop(),m=null,b?.stop(),b=null;try{c?.stop()}catch{}if(c=null,xe(),v?.remove(),v=null,$(null),x=ge[M]?M:"none",x==="none"){g==="none"&&(r.style.filter="");return}g!=="none"&&L("none"),G();let O=ge[x];r.style.filter=O.css&&O.css!=="none"?O.css:"",O.hostClass&&r.classList.add(O.hostClass),(O.overlay||O.mouseTracked||x==="sensorySpike")&&(v=p("pour-sensory-filter-overlay"),v.dataset.filter=x,O.overlay&&r.classList.add(`pour-sensory-filter-${x}`)),O.mouseTracked&&(y=t.innerWidth/2,k=t.innerHeight/2,z(),e.addEventListener("mousemove",W),e.addEventListener("touchmove",K,{passive:!0})),O.injectCSS&&$(O.injectCSS),x==="sensorySpike"&&ue(),O.injectScript&&R(),O.cursorJitter&&se(O.cursorJitter),O.viewportOrigin&&ke(),O.loupe&&Gt(O.loupe),O.lens&&l[O.lens]?.apply(),O.forcedColours&&(s=dt(e)),O.fingertip&&(m=ht(e,O.fingertip)),O.magnifier&&(b=gt(e,O.magnifier)),O.driver&&Ee[O.driver]&&(c=Ee[O.driver](e,{...O.options??{},...D??{}},{kit:a,container:v,lenses:l}))}let w=0;function F(){w=0,r.style.setProperty("--pour-motion-origin",`${t.scrollX+t.innerWidth/2}px ${t.scrollY+t.innerHeight/2}px`)}function X(){w||(w=t.requestAnimationFrame(F))}function ke(){F(),t.addEventListener("scroll",X,{passive:!0}),t.addEventListener("resize",X)}function zt(){t.removeEventListener("scroll",X),t.removeEventListener("resize",X),w&&(t.cancelAnimationFrame(w),w=0),r.style.removeProperty("--pour-motion-origin")}let Me=null;function Gt(M){He(),Me=ft(e,{...M,point:()=>({x:y,y:k})})}function He(){Me?.stop(),Me=null}let _t=()=>({vision:g,sensory:x});function jt(){L("none"),me("none")}return{applyVision:L,applySensory:me,clear:jt,state:_t}}var Yr=new Set(["text","search","url","tel","email","password","number","date","datetime-local","month","time","week",""]),Xr=new Set(["input","select","textarea","button","meter","output","progress"]);function Ur(e){return e.replace(/[\uE000-\uF8FF\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}\u200B-\u200D\u2060\uFEFF]/gu,"").trim()?e:""}function Bt(e){return Ur(Ce(e,!1,!1,new Set))}function qt(e){for(let r=e;r;r=$e(r))if(r.getAttribute?.("aria-hidden")==="true"||getComputedStyle(r).display==="none")return!0;let t=getComputedStyle(e).visibility;return t==="hidden"||t==="collapse"}function Kr(e,t){let r=e.getAttribute?.("aria-labelledby");if(!r)return null;let a=e.getRootNode(),l=r.split(/\s+/).filter(Boolean).map(n=>a.getElementById?.(n)).filter(Boolean);return l.length?l.map(n=>{let o=new Set(t);return n===e&&o.delete(e),Ce(n,!0,qt(n),o)}).join(" ").replace(/\s+/g," ").trim():null}function Ce(e,t,r,a){if(a.has(e))return"";if(a.add(e),!t){let s=Kr(e,a);if(s)return s}let l=e.getAttribute("aria-label")?.trim();if(l)return l;let n=e.tagName.toLowerCase();if(n==="img"||n==="area"){let s=e.getAttribute("alt")?.trim();if(s)return s}if(Xr.has(n)&&e.labels?.length){let s=[...e.labels].map(m=>Ce(m,t,qt(m),a)).join(" ").trim();if(s)return s}if(n==="input"||n==="select"||n==="textarea"){if(e.type==="submit"||e.type==="reset"||e.type==="button"){let s=(e.value??e.getAttribute("value")??"").trim();if(s)return s}if(e.type==="image"){let s=e.getAttribute("alt")?.trim();if(s)return s}if(t&&(n==="textarea"||Yr.has(e.type))){let s=(e.value??"").trim();if(s)return s}if(e.type==="submit")return"Submit";if(e.type==="reset")return"Reset"}let o=Jr(e,r,t,a).replace(/\s+/g," ").trim();return o||(e.getAttribute("title")??e.getAttribute("placeholder")??"").trim()}function Jr(e,t,r,a){let l=e.shadowRoot?e.shadowRoot.childNodes:e.childNodes;return Pt(e,"::before",t)+Vt(l,t,r,a)+Pt(e,"::after",t)}function Pt(e,t,r){if(e.namespaceURI==="http://www.w3.org/2000/svg")return"";let a=getComputedStyle(e,t);if(!r&&(a.display==="none"||a.visibility==="hidden"||a.visibility==="collapse"))return"";let l=a.content;if(!l||l==="none"||l==="normal")return"";let n=l.match(/\/\s*"((?:[^"\\]|\\.)*)"\s*$/);if(n)return n[1].replace(/\\(.)/g,"$1");let o=l.match(/^"((?:[^"\\]|\\.)*)"$/);return o?o[1].replace(/\\(.)/g,"$1"):""}function Vt(e,t,r,a){let l="";for(let n of e){if(n.nodeType===3){l+=n.textContent;continue}if(n.nodeType!==1)continue;let o=n.tagName.toLowerCase();if(o==="script"||o==="style"||o==="noscript"||o==="template")continue;if(!t){if(n.getAttribute("aria-hidden")==="true")continue;let m=getComputedStyle(n);if(m.display==="none"||m.visibility==="hidden"||m.visibility==="collapse")continue}if(o==="slot"){let m=n.assignedNodes?.()??[];l+=Vt(m.length?m:n.childNodes,t,r,a);continue}if((o==="img"||o==="area")&&n.getAttribute("alt")===""&&!n.getAttribute("aria-label")?.trim()&&!n.getAttribute("aria-labelledby"))continue;let s=Ce(n,r,t,a);l+=o==="img"||o==="area"||n.hasAttribute("aria-label")||n.hasAttribute("aria-labelledby")?` ${s} `:s}return l}return Kt(Qr);})();
