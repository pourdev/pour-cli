/*! pour filters | MIT | https://pour.dev */
var PourFilters=(()=>{var U=Object.defineProperty;var Me=Object.getOwnPropertyDescriptor;var Pe=Object.getOwnPropertyNames;var Ie=Object.prototype.hasOwnProperty;var Ve=(e,t)=>{for(var r in t)U(e,r,{get:t[r],enumerable:!0})},$e=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Pe(t))!Ie.call(e,s)&&s!==r&&U(e,s,{get:()=>t[s],enumerable:!(i=Me(t,s))||i.enumerable});return e};var qe=e=>$e(U({},"__esModule",{value:!0}),e);var ot={};Ve(ot,{CSS_FILTERS:()=>B,MODE_LABELS:()=>te,SENSORY_FILTERS:()=>_,accessibleName:()=>Le,createFilterApplier:()=>xe,createLensKit:()=>z,cssPath:()=>we});var Q={protanopia:"0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0 0 0 0 1 0",deuteranopia:"0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047414 0 0 -0.011820 0.042940 0.968881 0 0 0 0 0 1 0",tritanopia:"1.255528 -0.076749 -0.178779 0 0 -0.078411 0.930809 0.147602 0 0 0.004733 0.691367 0.303900 0 0 0 0 0 1 0",achromatopsia:"0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0 0 0 1 0",protanomaly:"0.458064 0.679578 -0.137642 0 0 0.092785 0.846313 0.060902 0 0 -0.007494 -0.016807 1.024301 0 0 0 0 0 1 0",deuteranomaly:"0.547494 0.607765 -0.155259 0 0 0.181692 0.781742 0.036566 0 0 -0.010410 0.027275 0.983136 0 0 0 0 0 1 0",tritanomaly:"1.057047 -0.029507 -0.027540 0 0 -0.039014 0.966028 0.072986 0 0 0.002584 0.220200 0.777216 0 0 0 0 0 1 0"},Be={protanopia:"saturate(0.25) sepia(0.5) hue-rotate(-15deg)",deuteranopia:"saturate(0.3) sepia(0.4) hue-rotate(-10deg)",tritanopia:"saturate(0.35) sepia(0.3) hue-rotate(50deg)",achromatopsia:"grayscale(100%)",protanomaly:"saturate(0.6) sepia(0.25) hue-rotate(-8deg)",deuteranomaly:"saturate(0.65) sepia(0.2) hue-rotate(-5deg)",tritanomaly:"saturate(0.7) sepia(0.15) hue-rotate(25deg)"},Z=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge","diabeticRetinopathy","nystagmus","hemianopiaLeft","hemianopiaRight","amblyopia"]),ee=new Set(["retinitisRing","glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge"]),B={none:"none",cataract:"sepia(0.3) contrast(0.9) saturate(0.9) brightness(0.95) blur(0.6px)",presbyopia:"blur(0.5px) contrast(0.92)",lowAcuityMild:"blur(0.7px)",lowAcuity:"blur(1.2px)",lowAcuityStrong:"blur(2.5px)",lowAcuityHeavy:"blur(5px)",lowLight:"brightness(0.65) contrast(0.9) saturate(0.85) hue-rotate(-8deg)",lowContrast:"contrast(0.7)",retinitisRing:"none",glaucoma:"none",glaucomaLarge:"none",macularDegeneration:"none",macularDegenerationLarge:"none",diabeticRetinopathy:"none",nystagmus:"none",hemianopiaLeft:"none",hemianopiaRight:"none",amblyopia:"none",scotopicRose:"sepia(0.15) hue-rotate(330deg) saturate(1.2) brightness(1.05)",scotopicYellow:"sepia(0.3) saturate(1.15) brightness(1.05)",scotopicAqua:"sepia(0.2) hue-rotate(160deg) saturate(1.15) brightness(1.02)"},je=typeof navigator<"u"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent),He=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),_e=je||He;Object.keys(Q).forEach(e=>{_e?B[e]=Be[e]:B[e]=`url(#pour-vision-filter-${e})`});var ze=[{label:"Color vision",options:[{value:"deuteranomaly",name:"Green Weak (Deuteranomaly)",stat:"~5% of men",description:"Green-sensitive cones respond off-target, so greens, reds and browns crowd together. The most common colour vision difference.",label:"Green Weak - Deuteranomaly - ~5% of men"},{value:"protanomaly",name:"Red Weak (Protanomaly)",stat:"~1% of men",description:"Red-sensitive cones respond weakly: reds dim and drift towards green.",label:"Red Weak - Protanomaly - ~1% of men"},{value:"protanopia",name:"Red Absent (Protanopia)",stat:"~1% of men",description:"Red light barely registers \u2014 reds darken and sink into the greens around them.",label:"Red Absent - Protanopia - ~1% of men"},{value:"deuteranopia",name:"Green Absent (Deuteranopia)",stat:"~1% of men",description:"No working green cones: red and green become the same family of murky ochre.",label:"Green Absent - Deuteranopia - ~1% of men"},{value:"tritanomaly",name:"Blue Weak (Tritanomaly)",stat:"<0.2%",description:"Blue-sensitive cones respond weakly: blues and greens blur together, yellows go pale.",label:"Blue Weak - Tritanomaly - <0.2%"},{value:"tritanopia",name:"Blue Absent (Tritanopia)",stat:"<0.01%",description:"No working blue cones \u2014 blues read as greens, yellows as pinks and greys.",label:"Blue Absent - Tritanopia - <0.01%"},{value:"achromatopsia",name:"Monochromacy (Achromatopsia)",stat:"~0.003%",description:"No colour at all: brightness is the only signal left, usually with strong glare sensitivity.",label:"Monochromacy - Achromatopsia - ~0.003%"}]},{label:"Eye conditions",options:[{value:"presbyopia",name:"Near-Vision Loss (Presbyopia)",stat:"nearly all over 50",description:"The lens stiffens with age and close text blurs \u2014 the one condition almost everyone gets.",label:"Near-Vision Loss - Presbyopia - nearly all over 50"},{value:"glaucoma",name:"Tunnel Vision (Glaucoma)",stat:"~2% over 40",description:"Peripheral vision closes in until only a central window stays sharp. The window follows your pointer.",label:"Tunnel Vision - Glaucoma - ~2% over 40"},{value:"glaucomaLarge",name:"Tunnel Vision (Advanced Glaucoma)",stat:"~0.5% over 40",description:"Advanced glaucoma: the sharp window narrows further; everything else is gone, not blurred.",label:"Tunnel Vision (Large) - Advanced Glaucoma - ~0.5% over 40"},{value:"macularDegeneration",name:"Central Vision Loss (Macular Degeneration)",stat:"~8% over 45",description:"The centre of gaze fades first \u2014 precisely where you point your eyes to read.",label:"Central Vision Loss - Macular Degeneration - ~8% over 45"},{value:"macularDegenerationLarge",name:"Central Vision Loss (Advanced Macular Degeneration)",stat:"~1% over 50",description:"Advanced macular degeneration: a larger central blank that reading must route around.",label:"Central Vision Loss (Large) - Advanced Macular Degeneration - ~1% over 50"},{value:"diabeticRetinopathy",name:"Patchy Vision (Diabetic Retinopathy)",stat:"~0.8% over 40",description:"Blood-vessel damage scatters dark blotches across the view; content falls into them.",label:"Patchy Vision - Diabetic Retinopathy - ~0.8% over 40"},{value:"nystagmus",name:"Involuntary Eye Movement (Nystagmus)",stat:"~0.2%",description:"The eyes move on their own, so the page never quite holds still.",label:"Involuntary Eye Movement - Nystagmus - ~0.2%"}]},{label:"Field of vision",options:[{value:"hemianopiaLeft",name:"Left Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the left half of vision in both eyes.",label:"Left Field Loss - Hemianopia (Left) - ~0.1% over 49"},{value:"hemianopiaRight",name:"Right Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the right half of vision in both eyes.",label:"Right Field Loss - Hemianopia (Right) - ~0.1% over 49"},{value:"retinitisRing",name:"Ring Loss (Retinitis Pigmentosa)",added:"2026-08-22",stat:"~0.025%",description:"Early retinitis pigmentosa takes a ring out of the mid-periphery, leaving a clear centre and a seeing outer rim. It narrows to a tunnel only much later, so this donut, not the tunnel, is what most of that life looks like.",label:"Ring Loss - Retinitis Pigmentosa - ~0.025%"},{value:"amblyopia",name:"Reduced Acuity (Amblyopia)",stat:"~2-3%",description:"One eye never learned to see sharply; fine detail and depth suffer.",label:"Reduced Acuity (One Eye) - Amblyopia - ~2-3%"}]},{label:"Focus & acuity",options:[{value:"lowAcuityMild",name:"Slight Defocus",description:"Mildly uncorrected eyesight \u2014 the glasses left in the other room.",label:"Slight Defocus - Mild Blur"},{value:"lowAcuity",name:"Uncorrected Focus",stat:"~5-6%",description:"Moderate uncorrected short-sight: small text needs effort, thin fonts give up first.",label:"Uncorrected Focus - Moderate Blur - ~5-6%"},{value:"lowAcuityStrong",name:"Significant Defocus",description:"Strong blur: layout and colour still communicate, letterforms mostly do not.",label:"Significant Defocus - Strong Blur"},{value:"lowAcuityHeavy",name:"Severe Defocus",description:"Only shape, contrast and position survive. What does your page still say?",label:"Severe Defocus - Very Strong Blur"}]},{label:"Contrast & light",options:[{value:"cataract",name:"Clouded Lens (Cataract)",stat:"~17% over 40",description:"The lens clouds and yellows: glare blooms, contrast drains, whites go dingy.",label:"Clouded Lens - Cataract - ~17% over 40"},{value:"lowContrast",name:"Reduced Contrast",description:"Contrast sensitivity loss: faint greys sink into their backgrounds long before they vanish for you.",label:"Reduced Contrast"},{value:"lowLight",name:"Dim Environment",description:"A dim room, a cheap panel, a phone at night \u2014 the low-vision hours everyone has.",label:"Dim Environment - Low Light"}]},{label:"Visual stress",options:[{value:"scotopicRose",name:"Rose Tint",description:"A coloured overlay some readers use to calm pattern glare. See how your design reads through one.",label:"Rose Tint - Coloured Overlay"},{value:"scotopicYellow",name:"Yellow Tint",description:"A yellow reading overlay \u2014 common for visual stress. Your palette should survive it.",label:"Yellow Tint - Coloured Overlay"},{value:"scotopicAqua",name:"Aqua Tint",description:"An aqua reading overlay. Tinted reading is more common than most designs assume.",label:"Aqua Tint - Coloured Overlay"}]}],_={none:{label:"None",css:"none"},fluorescentFlicker:{label:"Fluorescent Flicker",overlay:"fluorescentFlicker",css:"none"},lightSensitivity:{label:"Light Sensitivity",css:"brightness(1.4) contrast(1.2) saturate(1.1)"},colourHypersensitivity:{label:"Colour Hypersensitivity",css:"saturate(2.2) contrast(1.35) brightness(1.1)"},motionSensitivity:{label:"Motion Sensitivity",hostClass:"pour-sensory-filter-motionSensitivity",viewportOrigin:!0,css:"none"},hyperfocusTunnel:{label:"Hyperfocus Tunnel (Metaphor)",overlay:"hyperfocusTunnel",mouseTracked:!0,css:"none"},attentionFragmentation:{label:"Attention Fragmentation (Metaphor)",overlay:"attentionFragmentation",css:"none"},peripheralDistraction:{label:"Peripheral Distraction",overlay:"peripheralDistraction",css:"none"},detailFixation:{label:"Detail Fixation (Metaphor)",overlay:"detailFixation",mouseTracked:!0,css:"none"},processingDelay:{label:"Processing Lag",overlay:"processingDelay",css:"none"},sensoryInterference:{label:"Sensory Interference",hostClass:"pour-sensory-filter-backgroundNoise",css:"none"},sensorySpike:{label:"Sudden Sensory Spike",overlay:"sensorySpike",css:"none"},dyslexiaVisualStress:{label:"Visual Stress (Pattern Glare)",overlay:"dyslexiaVisualStress",injectCSS:`
        body { background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.06) 22px, rgba(0,0,0,0.06) 24px) !important; background-attachment: fixed !important; }
        p, li, td, th, dd, dt, h1, h2, h3, h4, h5, h6, label { text-shadow: 0 0 1px rgba(0,0,0,0.15) !important; animation: pour-sensory-line-merge 3s ease-in-out infinite alternate !important; }
        @keyframes pour-sensory-line-merge { 0% { transform: scaleX(1) translateY(0); } 25% { transform: scaleX(1.008) translateY(0.8px); } 50% { transform: scaleX(0.993) translateY(-0.5px); } 75% { transform: scaleX(1.005) translateY(0.6px); } 100% { transform: scaleX(0.996) translateY(-0.3px); } }
      `,css:"none"},dyslexiaCrowding:{label:"Crowding Effect",injectCSS:"* { letter-spacing: -1px !important; word-spacing: -3px !important; line-height: 1.05 !important; } p, li, td, th, dd, dt, label, span, a { font-size: 95% !important; }",css:"none"},dyslexiaTrackingLoss:{label:"Tracking Loss",overlay:"dyslexiaTrackingLoss",mouseTracked:!0,css:"none"},dyslexiaWashout:{label:"Letter Instability",injectScript:!0,css:"none"},dyslexiaContrastSensitivity:{label:"Contrast Sensitivity",css:"contrast(0.8) brightness(1.1) saturate(0.9)"},handTremor:{label:"Hand Tremor",cursorJitter:{freq:6,amp:9,intent:1.6,bitmap:96},css:"none"},handTremorStrong:{label:"Hand Tremor (Strong)",cursorJitter:{freq:5,amp:18,intent:1.9,bitmap:128},css:"none"},restingTremor:{label:"Resting Tremor",cursorJitter:{freq:4.5,amp:12,intent:-.9,bitmap:96},css:"none"},ataxicDrift:{label:"Ataxic Drift",cursorJitter:{freq:.7,amp:26,intent:.8,bitmap:128},css:"none"},pointerSpasm:{label:"Sudden Jerk",cursorJitter:{freq:5,amp:3,intent:.4,bitmap:128,spasm:{minGap:2200,maxGap:6500,size:44,dur:280}},css:"none"},pointerHidden:{label:"Hidden Pointer (Keyboard Only)",cursorJitter:{hide:!0,bitmap:32},css:"none"},focusOrder:{label:"Focus Order",lens:"focusOrder",css:"none"},landmarkMap:{label:"Landmarks & Headings",lens:"landmarkMap",css:"none"}},Ye=[{label:"Sensory overload",options:[{value:"fluorescentFlicker",name:"Fluorescent Flicker",description:"The pulse of failing fluorescent light \u2014 flicker that many autistic and migraine-prone people cannot tune out.",label:"Fluorescent Flicker"},{value:"lightSensitivity",name:"Light Sensitivity",description:"Photophobia: ordinary brightness arrives as glare; bright themes read as pain.",label:"Light Sensitivity"},{value:"colourHypersensitivity",name:"Colour Hypersensitivity",description:"Saturated colour lands far louder than you sent it.",label:"Colour Hypersensitivity"},{value:"motionSensitivity",name:"Motion Sensitivity",stat:"~5% of adults",description:"Page motion is felt, not just seen \u2014 what autoplaying movement does to a vestibular-sensitive visitor.",label:"Motion Sensitivity"}]},{label:"Attention & focus",options:[{value:"hyperfocusTunnel",name:"Hyperfocus Tunnel",metaphor:!0,description:"The world outside the point of focus falls away; the page exists one region at a time.",label:"Hyperfocus Tunnel (Metaphor)"},{value:"attentionFragmentation",name:"Attention Fragmentation",metaphor:!0,description:"A scattered attention field \u2014 every element competes and none of them wins.",label:"Attention Fragmentation (Metaphor)"},{value:"peripheralDistraction",name:"Peripheral Distraction",description:"Movement at the edges keeps stealing the centre of your gaze.",label:"Peripheral Distraction"},{value:"detailFixation",name:"Detail Fixation",metaphor:!0,description:"Detail-first processing: the point of attention magnifies while the whole recedes.",label:"Detail Fixation (Metaphor)"}]},{label:"Processing differences",options:[{value:"processingDelay",name:"Processing Lag",description:"The page lands a beat late \u2014 interaction as it feels under cognitive load.",label:"Processing Lag"},{value:"sensoryInterference",name:"Sensory Interference",description:"Visual noise under everything, like reading in a room that will not go quiet.",label:"Sensory Interference"}]},{label:"Sensory spikes",options:[{value:"sensorySpike",name:"Sudden Sensory Spike",description:"Not a constant state: periodic waves of too-much, out of nowhere.",label:"Sudden Sensory Spike"}]},{label:"Dyslexia / reading",options:[{value:"dyslexiaVisualStress",name:"Visual Stress (Pattern Glare)",stat:"~10%",description:"Dense text shimmers and bands together; lines merge and repel.",label:"Visual Stress (Pattern Glare)"},{value:"dyslexiaCrowding",name:"Crowding Effect",stat:"~10%",description:"Letters and words pack too tightly to separate \u2014 spacing is doing more work than you think.",label:"Crowding Effect"},{value:"dyslexiaTrackingLoss",name:"Tracking Loss",stat:"~10%",description:"Losing the line mid-sentence: only the neighbourhood of your pointer holds steady.",label:"Tracking Loss"},{value:"dyslexiaWashout",name:"Letter Instability",stat:"~10%",description:"Letters drift and trade places as you read. Decoding costs effort sighted readers never spend.",label:"Letter Instability"},{value:"dyslexiaContrastSensitivity",name:"Contrast Sensitivity",stat:"~10%",description:"Full-contrast text tires, low-contrast text disappears; the readable band is narrow.",label:"Contrast Sensitivity"}]}],Ge=[{label:"Tremor",options:[{value:"handTremor",name:"Hand Tremor",stat:"~1%",description:"An essential tremor: the pointer shakes harder the more precisely you aim.",label:"Hand Tremor"},{value:"handTremorStrong",name:"Hand Tremor (Strong)",description:"The same tremor, stronger \u2014 small close-set targets become lotteries.",label:"Hand Tremor (Strong)"},{value:"restingTremor",name:"Resting Tremor",stat:"~0.3%",description:"A parkinsonian pattern: shakes at rest, steadies during deliberate movement.",label:"Resting Tremor"}]},{label:"Pointer control",options:[{value:"ataxicDrift",name:"Ataxic Drift",description:"The pointer drifts wide of intent; straight lines are not on offer.",label:"Ataxic Drift"},{value:"pointerSpasm",name:"Sudden Jerk",description:"Occasional involuntary jerks fling the pointer \u2014 sometimes mid-click.",label:"Sudden Jerk"},{value:"pointerHidden",name:"Hidden Pointer (Keyboard Only)",description:"No pointer at all. The keyboard is the only way through your page.",label:"Hidden Pointer (Keyboard Only)"}]}],We=[{label:"Keyboard",options:[{value:"focusOrder",name:"Focus Order",description:"Numbered stops trace where Tab really goes, in order. Amber stops force their own position with a positive tabindex.",label:"Focus Order"}]},{label:"Page structure",options:[{value:"landmarkMap",name:"Landmarks & Headings",description:"Landmark regions tinted and named, every heading chipped with its level. Amber chips skip a level.",label:"Landmarks & Headings"}]}],te={};for(let e of[...ze,...Ye,...Ge,...We])for(let t of e.options)te[t.value]=t.label.split(" - ")[0];var Xe=new Set(["atomic","busy","controls","current","describedby","description","details","dropeffect","flowto","grabbed","hidden","keyshortcuts","label","labelledby","live","owns","relevant","roledescription","braillelabel","brailleroledescription"]),fe=new Set(["banner","complementary","contentinfo","form","main","navigation","region","search"]),Ke={link:["disabled","errormessage","expanded","haspopup","invalid"],button:["disabled","errormessage","expanded","haspopup","invalid","pressed"],checkbox:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],switch:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],radio:["checked","disabled","errormessage","haspopup","invalid","posinset","setsize"],option:["checked","disabled","errormessage","haspopup","invalid","posinset","selected","setsize"],tab:["disabled","errormessage","expanded","haspopup","invalid","posinset","selected","setsize"],menuitem:["disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemcheckbox:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemradio:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],textbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],searchbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],combobox:["activedescendant","autocomplete","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],listbox:["activedescendant","disabled","errormessage","expanded","haspopup","invalid","multiselectable","orientation","readonly","required"],slider:["disabled","errormessage","haspopup","invalid","orientation","readonly","valuemax","valuemin","valuenow","valuetext"],spinbutton:["activedescendant","disabled","errormessage","haspopup","invalid","readonly","required","valuemax","valuemin","valuenow","valuetext"],progressbar:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],meter:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],scrollbar:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],heading:["disabled","errormessage","haspopup","invalid","level"],list:["disabled","errormessage","haspopup","invalid"],listitem:["disabled","errormessage","haspopup","invalid","level","posinset","setsize"],row:["activedescendant","colindex","colindextext","disabled","errormessage","expanded","haspopup","invalid","level","posinset","rowindex","rowindextext","selected","setsize"],rowgroup:["disabled","errormessage","haspopup","invalid"],cell:["colindex","colindextext","colspan","disabled","errormessage","haspopup","invalid","rowindex","rowindextext","rowspan"],gridcell:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected"],columnheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],rowheader:["colindex","colindextext","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowindextext","rowspan","selected","sort"],table:["colcount","disabled","errormessage","haspopup","invalid","rowcount"],grid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","readonly","rowcount"],treegrid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","orientation","readonly","required","rowcount"],tablist:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation"],menu:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],menubar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],tree:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation","required"],treeitem:["checked","disabled","errormessage","expanded","haspopup","invalid","level","posinset","selected","setsize"],radiogroup:["activedescendant","disabled","errormessage","haspopup","invalid","orientation","readonly","required"],group:["activedescendant","disabled","errormessage","haspopup","invalid"],separator:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],toolbar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],dialog:["disabled","errormessage","haspopup","invalid","modal"],alertdialog:["disabled","errormessage","haspopup","invalid","modal"],application:["activedescendant","disabled","errormessage","expanded","haspopup","invalid"],article:["disabled","errormessage","haspopup","invalid","posinset","setsize"],img:["disabled","errormessage","haspopup","invalid"],figure:["disabled","errormessage","haspopup","invalid"],document:["disabled","errormessage","haspopup","invalid"],feed:["disabled","errormessage","haspopup","invalid"],math:["disabled","errormessage","haspopup","invalid"],note:["disabled","errormessage","haspopup","invalid"],presentation:["disabled","errormessage","haspopup","invalid"],none:["disabled","errormessage","haspopup","invalid"],banner:["disabled","errormessage","haspopup","invalid"],complementary:["disabled","errormessage","haspopup","invalid"],contentinfo:["disabled","errormessage","haspopup","invalid"],form:["disabled","errormessage","haspopup","invalid"],main:["disabled","errormessage","haspopup","invalid"],navigation:["disabled","errormessage","haspopup","invalid"],region:["disabled","errormessage","haspopup","invalid"],search:["disabled","errormessage","haspopup","invalid"],alert:["disabled","errormessage","haspopup","invalid"],log:["disabled","errormessage","haspopup","invalid"],marquee:["disabled","errormessage","haspopup","invalid"],status:["disabled","errormessage","haspopup","invalid"],timer:["disabled","errormessage","haspopup","invalid"],tabpanel:["disabled","errormessage","haspopup","invalid"],tooltip:["disabled","errormessage","haspopup","invalid"],definition:["disabled","errormessage","haspopup","invalid"],term:["disabled","errormessage","haspopup","invalid"],paragraph:["disabled","errormessage","haspopup","invalid"],generic:["disabled","errormessage","haspopup","invalid"],blockquote:["disabled","errormessage","haspopup","invalid"],caption:["disabled","errormessage","haspopup","invalid"],code:["disabled","errormessage","haspopup","invalid"],emphasis:["disabled","errormessage","haspopup","invalid"],strong:["disabled","errormessage","haspopup","invalid"],time:["disabled","errormessage","haspopup","invalid"],deletion:["disabled","errormessage","haspopup","invalid"],insertion:["disabled","errormessage","haspopup","invalid"],subscript:["disabled","errormessage","haspopup","invalid"],superscript:["disabled","errormessage","haspopup","invalid"]},Je={checkbox:"checkbox",radio:"radio",range:"slider",number:"spinbutton",search:"searchbox",email:"textbox",tel:"textbox",text:"textbox",url:"textbox",button:"button",submit:"button",reset:"button",image:"button"},Ue=new Set(["text","search","tel","url","email"]),Qe={button:"button",textarea:"textbox",img:"img",article:"article",aside:"complementary",nav:"navigation",main:"main",search:"search",h1:"heading",h2:"heading",h3:"heading",h4:"heading",h5:"heading",h6:"heading",ul:"list",ol:"list",menu:"list",li:"listitem",table:"table",thead:"rowgroup",tbody:"rowgroup",tfoot:"rowgroup",tr:"row",td:"cell",th:"columnheader",form:"form",fieldset:"group",details:"group",dialog:"dialog",hr:"separator",progress:"progressbar",meter:"meter",output:"status",option:"option",datalist:"listbox",dt:"term",dd:"definition",p:"paragraph",div:"generic",span:"generic",blockquote:"blockquote",figure:"figure",time:"time",code:"code",em:"emphasis",strong:"strong"};function be(e){let t=e.tagName.toLowerCase();if(t==="a"||t==="area")return e.hasAttribute("href")?"link":"generic";if(t==="input")return Ue.has(e.type)&&e.hasAttribute("list")?"combobox":Je[e.type]??null;if(t==="td"||t==="th"){if(t==="th"&&e.getAttribute("scope")?.toLowerCase()==="row")return"rowheader";if(t==="th")return"columnheader";let r=e.closest("table"),i=r&&re(r);return i==="grid"||i==="treegrid"?"gridcell":"cell"}if(t==="select")return e.multiple||e.size>1?"listbox":"combobox";if(t==="img")return e.getAttribute("alt")===""?"presentation":"img";if(t==="header")return e.closest("article, aside, main, nav, section")?"generic":"banner";if(t==="footer")return e.closest("article, aside, main, nav, section")?"generic":"contentinfo";if(t==="aside"){let r=e.parentElement?.closest("article, aside, nav, section"),i=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby");return r&&!i?"generic":"complementary"}return t==="section"?e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")?"region":"generic":Qe[t]??null}function Ze(e){return[...Xe].some(t=>e.hasAttribute(`aria-${t}`))?!0:e.matches(":disabled")||e.closest("[inert]")?!1:e.tabIndex>=0?!0:e.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]')}function re(e){let t=e.getAttribute("role")?.trim().split(/\s+/)??[];for(let r of t){let i=r.toLowerCase();if(Ke[i])return(i==="presentation"||i==="none")&&Ze(e)?be(e):i}return t.length?null:be(e)}var he=`/* Structure-lens overlay styles (focus order, landmark map): injected by
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
  font: 600 10px/1 -apple-system, system-ui, sans-serif;
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
  font: 600 10px/1.4 -apple-system, system-ui, sans-serif;
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
  font: 700 10px/1.2 -apple-system, system-ui, sans-serif;
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
  font: 500 12.5px/1.4 -apple-system, system-ui, sans-serif;
  text-align: center;
  box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 0.55), 0 8px 24px rgba(0, 0, 0, 0.35);
}
`;function ae(e){if(e.getElementById("pour-lens-styles"))return;let t=e.createElement("style");t.id="pour-lens-styles",t.dataset.pourAudit="overlay",t.textContent=he,e.head.appendChild(t)}function z(e=document){let t=e.defaultView,r={contentVisibilityAuto:!0,visibilityProperty:!0,checkVisibilityCSS:!0};function i(d){for(let o=d;o&&o!==e.documentElement;o=o.parentElement??o.getRootNode()?.host??null){let f=o.ownerDocument.defaultView.getComputedStyle(o).position;if(f==="fixed")return"fixed";if(f==="sticky")return"sticky"}return"flow"}function s(d,{withLine:o=!1}={}){let f="background:none;border:0;margin:0;padding:0;box-shadow:none;filter:none;opacity:1;mix-blend-mode:normal;",g=e.createElement("div");g.className=d,g.dataset.pourAudit="overlay",g.style.cssText=`position:absolute;top:0;left:0;width:0;height:0;overflow:clip;overflow-clip-margin:24px;pointer-events:none;z-index:2147483646;${f}`;let p=e.createElement("div");p.className=d,p.dataset.pourAudit="overlay",p.style.cssText=`position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:2147483646;${f}`;let A=0,R=0,D=null,M=null,P=null;if(o){M=e.createElementNS("http://www.w3.org/2000/svg","svg"),M.setAttribute("class",`${d.replace(/-layer$/,"")}-path`);for(let[l,k]of[["position","absolute"],["top","0"],["left","0"],["width","100%"],["height","100%"],["max-width","none"],["max-height","none"],["display","block"],["overflow","visible"],["pointer-events","none"],["background","none"],["border","0"],["margin","0"],["padding","0"],["box-shadow","none"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])M.style.setProperty(l,k,"important");P=e.createElementNS("http://www.w3.org/2000/svg","polyline"),D=e.createElementNS("http://www.w3.org/2000/svg","polyline");for(let[l,k,h]of[[P,"rgba(29,78,216,0.85)","3"],[D,"#93C5FD","1.5"]])for(let[w,q]of[["fill","none"],["stroke",k],["stroke-width",h],["stroke-linejoin","round"],["stroke-linecap","round"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])l.style.setProperty(w,q,"important");M.append(P,D),g.append(M)}let O=[],y=null,E=0,C=(l,k)=>{let h=l.el.getBoundingClientRect(),w=h.width<=0&&h.height<=0||!l.el.isConnected||l.el.checkVisibility&&!l.el.checkVisibility(r);if(l.node.style.display=w?"none":"",w){l.docPt=null,l.viewRect=null;return}let q=l.anchor==="flow"?h.left-k.left:h.left,V=l.anchor==="flow"?h.top-k.top:h.top;l.node.style.transform=`translate(${q}px, ${V}px)`,l.sized&&(l.node.style.width=`${h.width}px`,l.node.style.height=`${h.height}px`),l.anchor==="flow"?l.docPt=`${q},${V}`:l.viewRect=h},S=l=>{if(!D)return;let k=[];for(let w of O)w.offLine||w.node.style.display==="none"||(w.anchor==="flow"?w.docPt&&k.push(w.docPt):w.viewRect&&k.push(`${w.viewRect.left-l.left},${w.viewRect.top-l.top}`));let h=k.join(" ");P.setAttribute("points",h),D.setAttribute("points",h)},b=()=>{let l=e.documentElement.scrollWidth,k=e.documentElement.scrollHeight;l!==A&&(A=l,g.style.width=`${l}px`),k!==R&&(R=k,g.style.height=`${k}px`);let h=g.getBoundingClientRect();for(let w of O)C(w,h);S(h)};e.body.append(g,p);let m=()=>{E=t.requestAnimationFrame(m),b()};return m(),{setItems(l,k){for(let h of O)h.node.remove();O=l.map(h=>{let w=i(h.el);return(w==="flow"?g:p).append(h.node),{...h,anchor:w,docPt:null,viewRect:null}}),k&&!O.length?(y||(y=e.createElement("div"),y.className="pour-lens-notice",p.append(y)),y.textContent=k,y.style.display=""):y&&(y.style.display="none"),b()},destroy(){t.cancelAnimationFrame(E),g.remove(),p.remove(),O=[]}}}function u(d,o){for(let f=d.parentElement??d.getRootNode()?.host;f&&f!==e.documentElement;f=f.parentElement??f.getRootNode()?.host){let g=f.ownerDocument.defaultView.getComputedStyle(f);if(g.overflow==="visible"&&g.overflowX==="visible"&&g.overflowY==="visible")continue;let p=f.getBoundingClientRect();if(o.right<=p.left||o.left>=p.right||o.bottom<=p.top||o.top>=p.bottom)return!0}return!1}function x(){let d=[],o=[],f=g=>{for(let p of g.querySelectorAll("*")){if(p.dataset&&p.dataset.pourAudit||(p.shadowRoot&&f(p.shadowRoot),!p.matches('a[href], area[href], button, input, select, textarea, summary, iframe, object, embed, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]'))||p.disabled||p.closest("[inert]")||p.checkVisibility&&!p.checkVisibility(r))continue;let A=p.getBoundingClientRect();if(A.width<=0&&A.height<=0)continue;let R=p.getAttribute("tabindex"),D=R==null?0:parseInt(R,10)||0;if(D<0){p.matches("a[href], area[href], button, input, select, textarea, summary")&&!u(p,A)&&o.push({el:p});continue}d.push({el:p,idx:D,order:d.length})}};return f(e),{stops:[...d.filter(g=>g.idx>0).sort((g,p)=>g.idx-p.idx||g.order-p.order),...d.filter(g=>g.idx===0)],unreachable:o}}return{createLensTracker:s,collectFocusStops:x,clippedOutOfSight:u,VISIBLE_OPTS:r,anchorKind:i}}function ve(e=document,t=z(e)){let r=e.defaultView,{createLensTracker:i,collectFocusStops:s,VISIBLE_OPTS:u}=t,x=null,d=0,o=null;function f(){if(x)return;ae(e),x=i("pour-focus-order-layer",{withLine:!0});let y=()=>{let{stops:E,unreachable:C}=s(),S=E.map((b,m)=>{let l=e.createElement("span");return l.className="pour-focus-badge"+(b.idx>0?" pour-focus-badge-forced":""),l.textContent=String(m+1),b.idx>0&&(l.title=`tabindex="${b.idx}" forces this position`),{el:b.el,node:l,sized:!1}});for(let{el:b}of C){let m=e.createElement("span");m.className="pour-focus-badge pour-focus-badge-unreachable",m.textContent="\u2715",m.title='tabindex="-1" \u2014 a keyboard cannot Tab to this control',S.push({el:b,node:m,sized:!1,offLine:!0})}x.setItems(S,"Focus order: this page has no keyboard-reachable controls")};y(),o=new r.MutationObserver(()=>{d||(d=r.setTimeout(()=>{d=0,y()},400))}),o.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function g(){r.clearTimeout(d),d=0,o?.disconnect(),o=null,x?.destroy(),x=null}let p=null,A=0,R=null;function D(y){let E=y.getAttribute("aria-label");if(E?.trim())return E.trim();let C=y.getAttribute("aria-labelledby");return C?C.split(/\s+/).map(S=>y.getRootNode().getElementById?.(S)?.textContent.trim()??"").filter(Boolean).join(" "):""}function M(){let y=[],E=[],C=b=>{for(let m of b.querySelectorAll("*")){if(m.dataset&&m.dataset.pourAudit||(m.shadowRoot&&C(m.shadowRoot),m.checkVisibility&&!m.checkVisibility(u)))continue;let l=m.getBoundingClientRect();if(l.width<=0&&l.height<=0)continue;let k=re(m);if(fe.has(k)){if(k==="form"&&!D(m))continue;y.push({el:m,role:k,name:D(m)})}else if(k==="heading"){let h=parseInt(m.getAttribute("aria-level"),10)||parseInt(m.tagName.charAt(1),10)||2;E.push({el:m,level:h})}}};C(e);let S=null;for(let b of E)b.skipped=S!=null&&b.level>S+1,b.from=S,S=b.level;return{landmarks:y,headings:E}}function P(){if(p)return;ae(e),p=i("pour-map-layer");let y=()=>{let{landmarks:E,headings:C}=M(),S=[];for(let b of E){let m=e.createElement("div");m.className=`pour-map-region pour-map-role-${b.role}`;let l=e.createElement("span");l.className="pour-map-tag",l.textContent=b.name?`${b.role} \xB7 ${b.name}`:b.role,m.append(l),S.push({el:b.el,node:m,sized:!0})}for(let b of C){let m=e.createElement("span");m.className="pour-map-heading"+(b.skipped?" pour-map-heading-skipped":""),m.textContent=`H${b.level}`,b.skipped&&(m.title=`Skips a level \u2014 the heading before this one is an H${b.from}`),S.push({el:b.el,node:m,sized:!1})}p.setItems(S,"No landmarks or headings are exposed on this page")};y(),R=new r.MutationObserver(()=>{A||(A=r.setTimeout(()=>{A=0,y()},400))}),R.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function O(){r.clearTimeout(A),A=0,R?.disconnect(),R=null,p?.destroy(),p=null}return{focusOrder:{apply:f,remove:g},landmarkMap:{apply:P,remove:O}}}var ye=`/* Overlay styles for the vision & sensory filters \u2014 ported from
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
`;function xe(e=document){let t=e.defaultView,r=e.documentElement,i=z(e),s=ve(e,i),u=null,x=null,d="none",o="none",f=0,g=0,p=0,A=0,R=null;function D(){if(e.getElementById("pour-filter-styles"))return;let n=e.createElement("style");n.id="pour-filter-styles",n.dataset.pourAudit="filter",n.textContent=ye,e.head.appendChild(n)}function M(){if(e.getElementById("pour-vision-filter-defs"))return;let n="http://www.w3.org/2000/svg",a=e.createElementNS(n,"svg");a.setAttribute("id","pour-vision-filter-defs"),a.setAttribute("width","0"),a.setAttribute("height","0"),a.setAttribute("focusable","false"),a.setAttribute("aria-hidden","true"),a.dataset.pourAudit="filter",a.style.position="absolute",a.style.pointerEvents="none";let c=e.createElementNS(n,"defs");for(let[T,N]of Object.entries(Q)){let L=e.createElementNS(n,"filter");L.setAttribute("id",`pour-vision-filter-${T}`),L.setAttribute("color-interpolation-filters","linearRGB");let v=e.createElementNS(n,"feColorMatrix");v.setAttribute("type","matrix"),v.setAttribute("values",N),L.appendChild(v),c.appendChild(L)}a.appendChild(c),e.body.appendChild(a)}let P=n=>{let a=e.createElement("div");return a.className=n,a.dataset.pourAudit="filter",e.body.appendChild(a),a};function O(){p=0,r.style.setProperty("--pour-vision-x",`${f}px`),r.style.setProperty("--pour-vision-y",`${g}px`),r.style.setProperty("--pour-vision-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function y(n){f=n.clientX,g=n.clientY,p||(p=t.requestAnimationFrame(O))}function E(n){let a=n.touches[0];a&&y(a)}function C(n){for(let c of Z)r.classList.remove(`pour-vision-filter-${c}`);if(ee.has(d)&&(e.removeEventListener("mousemove",y),e.removeEventListener("touchmove",E)),u?.remove(),u=null,d=B[n]!==void 0?n:"none",d==="none"){o==="none"&&(r.style.filter="");return}o!=="none"&&J("none"),D(),M();let a=B[d]||"none";r.style.filter=a==="none"?"":a,Z.has(d)&&(r.classList.add(`pour-vision-filter-${d}`),u=P("pour-vision-filter-overlay"),u.dataset.filter=d),ee.has(d)&&(f=t.innerWidth/2,g=t.innerHeight/2,O(),e.addEventListener("mousemove",y),e.addEventListener("touchmove",E,{passive:!0}))}function S(){A=0,r.style.setProperty("--pour-sensory-x",`${f}px`),r.style.setProperty("--pour-sensory-y",`${g}px`),r.style.setProperty("--pour-sensory-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function b(n){f=n.clientX,g=n.clientY,A||(A=t.requestAnimationFrame(S))}function m(n){let a=n.touches[0];a&&b(a)}function l(n){if(e.getElementById("pour-sensory-injected-style")?.remove(),!n)return;let a=e.createElement("style");a.id="pour-sensory-injected-style",a.dataset.pourAudit="filter",a.textContent=n,e.head.appendChild(a)}function k(){if(e.querySelector(".pour-sensory-washout-char"))return;let n=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null),a=[];for(;n.nextNode();)a.push(n.currentNode);for(let c of a){let T=c.textContent;if(!T.trim())continue;let N=c.parentElement;if(!N||N.closest("script,style,noscript,[data-pour-audit]"))continue;let L=e.createDocumentFragment();for(let v of T)if(v===" "||v===`
`||v==="	")L.appendChild(e.createTextNode(v));else{let F=e.createElement("span");F.textContent=v,F.style.opacity=(.3+Math.random()*.7).toFixed(2),F.className="pour-sensory-washout-char",L.appendChild(F)}N.replaceChild(L,c)}}function h(){for(let n of e.querySelectorAll(".pour-sensory-washout-char"))n.replaceWith(n.textContent);e.body.normalize()}let w=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],q=new Map,V=0,ie=0,K=null,oe=0,se=0,Y=0,G=0,j=0,W=0;function Ee(n,a,c){let T=`${n}:${a}:${c}`,N=q.get(T);if(N)return N;let L=e.createElement("canvas");L.width=n,L.height=n;let v=L.getContext("2d");if(!v)return"auto";let F=Math.round(n/2);v.save(),v.translate(F+a,F+c),v.scale(1.15,1.15),v.beginPath(),v.moveTo(w[0][0],w[0][1]);for(let $=1;$<w.length;$++)v.lineTo(w[$][0],w[$][1]);v.closePath(),v.restore(),v.lineWidth=3,v.lineJoin="round",v.strokeStyle="#fff",v.stroke(),v.fillStyle="#000",v.fill();let I=`url("${L.toDataURL("image/png")}") ${F} ${F}, auto`;return q.set(T,I),I}function le(n){let a=n.timeStamp||Date.now(),c=a-Y;if(Y&&c>0){let T=Math.hypot(n.clientX-oe,n.clientY-se);G=G*.8+T/c*1e3*.2}oe=n.clientX,se=n.clientY,Y=a}function Te(n,a){if(!j)return j=n+a.minGap+Math.random()*(a.maxGap-a.minGap),[0,0];let c=n-j;if(c<0)return[0,0];if(c>a.dur)return j=n+a.minGap+Math.random()*(a.maxGap-a.minGap),W=Math.random()*Math.PI*2,[0,0];let T=1-c/a.dur,N=a.size*T*T;return[Math.cos(W)*N,Math.sin(W)*N]}function pe(n){V=t.requestAnimationFrame(pe);let a=K;if(!a)return;let c=(n-ie)/1e3,T=0,N=0;if(a.freq&&a.amp){let I=2*Math.PI*a.freq,$=Math.max(0,1+(a.intent||0)*Math.min(1,G/700)),ge=a.amp*$;T+=(Math.sin(I*c)*.7+Math.sin(I*1.63*c+1.1)*.3)*ge,N+=(Math.cos(I*.97*c+.6)*.7+Math.sin(I*2.11*c+2.3)*.3)*ge}if(a.spasm){let[I,$]=Te(n,a.spasm);T+=I,N+=$}let L=a.bitmap/2-14,v=Math.max(-L,Math.min(L,Math.round(T))),F=Math.max(-L,Math.min(L,Math.round(N)));r.style.cursor=Ee(a.bitmap,v,F)}function Re(n){ce(),K=n,ie=t.performance?t.performance.now():Date.now(),G=0,Y=0,j=0,W=Math.random()*Math.PI*2,de(n.hide?`
      html, :not(html) { cursor: none !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `:`
      :not(html) { cursor: inherit !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `),!n.hide&&(e.addEventListener("mousemove",le,{passive:!0}),V=t.requestAnimationFrame(pe))}function ce(){V&&t.cancelAnimationFrame(V),V=0,K=null,j=0,e.removeEventListener("mousemove",le),de(null),r.style.cursor=""}function de(n){if(e.getElementById("pour-sensory-cursor-style")?.remove(),!n)return;let a=e.createElement("style");a.id="pour-sensory-cursor-style",a.dataset.pourAudit="filter",a.textContent=n,e.head.appendChild(a)}function Ce(){ue();let n=()=>{R=t.setTimeout(()=>{x&&(x.classList.add("pour-sensory-spike-flash"),t.setTimeout(()=>{x?.classList.remove("pour-sensory-spike-flash"),n()},150))},3e3+Math.random()*8e3)};n()}function ue(){R&&(t.clearTimeout(R),R=null)}function J(n){let a=_[o];if(a?.overlay&&r.classList.remove(`pour-sensory-filter-${o}`),a?.hostClass&&r.classList.remove(a.hostClass),a?.mouseTracked&&(e.removeEventListener("mousemove",b),e.removeEventListener("touchmove",m)),a?.injectScript&&h(),a?.cursorJitter&&ce(),a?.viewportOrigin&&De(),a?.lens&&s[a.lens]?.remove(),ue(),x?.remove(),x=null,l(null),o=_[n]?n:"none",o==="none"){d==="none"&&(r.style.filter="");return}d!=="none"&&C("none"),D();let c=_[o];r.style.filter=c.css&&c.css!=="none"?c.css:"",c.hostClass&&r.classList.add(c.hostClass),(c.overlay||c.mouseTracked||o==="sensorySpike")&&(x=P("pour-sensory-filter-overlay"),x.dataset.filter=o,c.overlay&&r.classList.add(`pour-sensory-filter-${o}`)),c.mouseTracked&&(f=t.innerWidth/2,g=t.innerHeight/2,S(),e.addEventListener("mousemove",b),e.addEventListener("touchmove",m,{passive:!0})),c.injectCSS&&l(c.injectCSS),o==="sensorySpike"&&Ce(),c.injectScript&&k(),c.cursorJitter&&Re(c.cursorJitter),c.viewportOrigin&&Ne(),c.lens&&s[c.lens]?.apply()}let H=0;function me(){H=0,r.style.setProperty("--pour-motion-origin",`${t.scrollX+t.innerWidth/2}px ${t.scrollY+t.innerHeight/2}px`)}function X(){H||(H=t.requestAnimationFrame(me))}function Ne(){me(),t.addEventListener("scroll",X,{passive:!0}),t.addEventListener("resize",X)}function De(){t.removeEventListener("scroll",X),t.removeEventListener("resize",X),H&&(t.cancelAnimationFrame(H),H=0),r.style.removeProperty("--pour-motion-origin")}let Oe=()=>({vision:d,sensory:o});function Fe(){C("none"),J("none")}return{applyVision:C,applySensory:J,clear:Fe,state:Oe}}function ke(e){let t=e.getRootNode(),r=u=>u.id&&t.querySelectorAll(`#${CSS.escape(u.id)}`).length===1;if(r(e))return`#${CSS.escape(e.id)}`;let i=[],s=e;for(;s&&s.nodeType===Node.ELEMENT_NODE&&s!==document.documentElement;){let u=s.tagName.toLowerCase();if(s.parentElement){let x=1;for(let o=s.previousElementSibling;o;o=o.previousElementSibling)o.tagName===s.tagName&&(x+=1);let d=x>1;for(let o=s.nextElementSibling;!d&&o;o=o.nextElementSibling)o.tagName===s.tagName&&(d=!0);d&&(u+=`:nth-of-type(${x})`)}if(i.unshift(u),s.parentElement&&r(s.parentElement)){i.unshift(`#${CSS.escape(s.parentElement.id)}`);break}s=s.parentElement}return i.join(" > ")||e.tagName.toLowerCase()}function we(e){let t=ke(e),r=e.getRootNode();for(;r&&r.host;)t=`${ke(r.host)} >>> ${t}`,r=r.host.getRootNode();return t}var wt=typeof Element<"u"?Object.getOwnPropertyDescriptor(Element.prototype,"attributes")?.get:null;var rt=new Set(["text","search","url","tel","email","password","number","date","datetime-local","month","time","week",""]),at=new Set(["input","select","textarea","button","meter","output","progress"]);function Le(e){return Ae(e,!1)}function nt(e){let t=e.getAttribute?.("aria-labelledby");if(!t)return"";let r=e.getRootNode();return t.split(/\s+/).filter(Boolean).map(i=>{let s=r.getElementById?.(i);return s?Ae(s,!0):""}).join(" ").replace(/\s+/g," ").trim()}function Ae(e,t){if(!t){let u=nt(e);if(u)return u}let r=e.getAttribute("aria-label")?.trim();if(r)return r;let i=e.tagName.toLowerCase();if(i==="img"||i==="area"){let u=e.getAttribute("alt")?.trim();if(u)return u}if(at.has(i)&&e.labels?.length){let u=[...e.labels].map(x=>x.textContent).join(" ").trim();if(u)return u}if(i==="input"||i==="select"||i==="textarea"){if(e.type==="submit"||e.type==="reset"||e.type==="button"){let u=(e.value??e.getAttribute("value")??"").trim();if(u)return u}if(e.type==="image"){let u=e.getAttribute("alt")?.trim();if(u)return u}if(t&&(i==="textarea"||rt.has(e.type))){let u=(e.value??"").trim();if(u)return u}if(e.type==="submit")return"Submit";if(e.type==="reset")return"Reset"}let s=it(e,t).replace(/\s+/g," ").trim();return s||(e.getAttribute("title")??e.getAttribute("placeholder")??"").trim()}function it(e,t){let r=e.shadowRoot?e.shadowRoot.childNodes:e.childNodes;return Se(e,"::before")+ne(r,t)+Se(e,"::after")}function Se(e,t){let r=getComputedStyle(e,t).content;if(!r||r==="none"||r==="normal")return"";let i=r.match(/\/\s*"((?:[^"\\]|\\.)*)"\s*$/);if(i)return i[1].replace(/\\(.)/g,"$1");let s=r.match(/^"((?:[^"\\]|\\.)*)"$/);return s?s[1].replace(/\\(.)/g,"$1"):""}function ne(e,t){let r="";for(let i of e){if(i.nodeType===3){r+=i.textContent;continue}if(i.nodeType!==1)continue;let s=i.tagName.toLowerCase();if(s==="script"||s==="style"||s==="noscript"||s==="template")continue;if(!t){if(i.getAttribute("aria-hidden")==="true"||i.hasAttribute("hidden"))continue;let o=getComputedStyle(i);if(o.display==="none"||o.visibility==="hidden")continue}if(s==="slot"){let o=i.assignedNodes?.()??[];r+=ne(o.length?o:i.childNodes,t);continue}if(s==="img"||s==="area"){let o=i.getAttribute("aria-label")?.trim();if(o){r+=` ${o} `;continue}let f=i.getAttribute("alt");if(f!==null){r+=` ${f} `;continue}let g=i.getAttribute("title")?.trim();g&&(r+=` ${g} `);continue}let u=i.getAttribute("aria-label")?.trim();if(u){r+=` ${u} `;continue}let x=ne(i.shadowRoot?i.shadowRoot.childNodes:i.childNodes,t);if(x.trim()){r+=x;continue}let d=i.getAttribute("title")?.trim();d&&(r+=` ${d} `)}return r}return qe(ot);})();
