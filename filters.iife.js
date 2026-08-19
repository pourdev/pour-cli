/*! pour filters | MIT | https://pour.dev */
var PourFilters=(()=>{var ae=Object.defineProperty;var xe=Object.getOwnPropertyDescriptor;var ke=Object.getOwnPropertyNames;var we=Object.prototype.hasOwnProperty;var Se=(e,t)=>{for(var l in t)ae(e,l,{get:t[l],enumerable:!0})},Le=(e,t,l,v)=>{if(t&&typeof t=="object"||typeof t=="function")for(let w of ke(t))!we.call(e,w)&&w!==l&&ae(e,w,{get:()=>t[w],enumerable:!(v=xe(t,w))||v.enumerable});return e};var Ae=e=>Le(ae({},"__esModule",{value:!0}),e);var $e={};Se($e,{CSS_FILTERS:()=>$,MODE_LABELS:()=>ie,SENSORY_FILTERS:()=>Y,createFilterApplier:()=>fe});var te={protanopia:"0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0 0 0 0 1 0",deuteranopia:"0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047414 0 0 -0.011820 0.042940 0.968881 0 0 0 0 0 1 0",tritanopia:"1.255528 -0.076749 -0.178779 0 0 -0.078411 0.930809 0.147602 0 0 0.004733 0.691367 0.303900 0 0 0 0 0 1 0",achromatopsia:"0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0 0 0 1 0",protanomaly:"0.458064 0.679578 -0.137642 0 0 0.092785 0.846313 0.060902 0 0 -0.007494 -0.016807 1.024301 0 0 0 0 0 1 0",deuteranomaly:"0.547494 0.607765 -0.155259 0 0 0.181692 0.781742 0.036566 0 0 -0.010410 0.027275 0.983136 0 0 0 0 0 1 0",tritanomaly:"1.057047 -0.029507 -0.027540 0 0 -0.039014 0.966028 0.072986 0 0 0.002584 0.220200 0.777216 0 0 0 0 0 1 0"},Te={protanopia:"saturate(0.25) sepia(0.5) hue-rotate(-15deg)",deuteranopia:"saturate(0.3) sepia(0.4) hue-rotate(-10deg)",tritanopia:"saturate(0.35) sepia(0.3) hue-rotate(50deg)",achromatopsia:"grayscale(100%)",protanomaly:"saturate(0.6) sepia(0.25) hue-rotate(-8deg)",deuteranomaly:"saturate(0.65) sepia(0.2) hue-rotate(-5deg)",tritanomaly:"saturate(0.7) sepia(0.15) hue-rotate(25deg)"},ne=new Set(["glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge","diabeticRetinopathy","nystagmus","hemianopiaLeft","hemianopiaRight","amblyopia"]),oe=new Set(["glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge"]),$={none:"none",cataract:"sepia(0.3) contrast(0.9) saturate(0.9) brightness(0.95) blur(0.6px)",presbyopia:"blur(0.5px) contrast(0.92)",lowAcuityMild:"blur(0.7px)",lowAcuity:"blur(1.2px)",lowAcuityStrong:"blur(2.5px)",lowAcuityHeavy:"blur(5px)",lowLight:"brightness(0.65) contrast(0.9) saturate(0.85) hue-rotate(-8deg)",lowContrast:"contrast(0.7)",glaucoma:"none",glaucomaLarge:"none",macularDegeneration:"none",macularDegenerationLarge:"none",diabeticRetinopathy:"none",nystagmus:"none",hemianopiaLeft:"none",hemianopiaRight:"none",amblyopia:"none",scotopicRose:"sepia(0.15) hue-rotate(330deg) saturate(1.2) brightness(1.05)",scotopicYellow:"sepia(0.3) saturate(1.15) brightness(1.05)",scotopicAqua:"sepia(0.2) hue-rotate(160deg) saturate(1.15) brightness(1.02)"},Ee=typeof navigator<"u"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Ce=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),Re=Ee||Ce;Object.keys(te).forEach(e=>{Re?$[e]=Te[e]:$[e]=`url(#pour-vision-filter-${e})`});var De=[{label:"Color vision",options:[{value:"deuteranomaly",name:"Green Weak (Deuteranomaly)",stat:"~5% of men",description:"Green-sensitive cones respond off-target, so greens, reds and browns crowd together. The most common colour vision difference.",label:"Green Weak - Deuteranomaly - ~5% of men"},{value:"protanomaly",name:"Red Weak (Protanomaly)",stat:"~1% of men",description:"Red-sensitive cones respond weakly: reds dim and drift towards green.",label:"Red Weak - Protanomaly - ~1% of men"},{value:"protanopia",name:"Red Absent (Protanopia)",stat:"~1% of men",description:"Red light barely registers \u2014 reds darken and sink into the greens around them.",label:"Red Absent - Protanopia - ~1% of men"},{value:"deuteranopia",name:"Green Absent (Deuteranopia)",stat:"~1% of men",description:"No working green cones: red and green become the same family of murky ochre.",label:"Green Absent - Deuteranopia - ~1% of men"},{value:"tritanomaly",name:"Blue Weak (Tritanomaly)",stat:"<0.2%",description:"Blue-sensitive cones respond weakly: blues and greens blur together, yellows go pale.",label:"Blue Weak - Tritanomaly - <0.2%"},{value:"tritanopia",name:"Blue Absent (Tritanopia)",stat:"<0.01%",description:"No working blue cones \u2014 blues read as greens, yellows as pinks and greys.",label:"Blue Absent - Tritanopia - <0.01%"},{value:"achromatopsia",name:"Monochromacy (Achromatopsia)",stat:"~0.003%",description:"No colour at all: brightness is the only signal left, usually with strong glare sensitivity.",label:"Monochromacy - Achromatopsia - ~0.003%"}]},{label:"Eye conditions",options:[{value:"presbyopia",name:"Near-Vision Loss (Presbyopia)",stat:"nearly all over 50",description:"The lens stiffens with age and close text blurs \u2014 the one condition almost everyone gets.",label:"Near-Vision Loss - Presbyopia - nearly all over 50"},{value:"glaucoma",name:"Tunnel Vision (Glaucoma)",stat:"~2% over 40",description:"Peripheral vision closes in until only a central window stays sharp. The window follows your pointer.",label:"Tunnel Vision - Glaucoma - ~2% over 40"},{value:"glaucomaLarge",name:"Tunnel Vision (Advanced Glaucoma)",stat:"~0.5% over 40",description:"Advanced glaucoma: the sharp window narrows further; everything else is gone, not blurred.",label:"Tunnel Vision (Large) - Advanced Glaucoma - ~0.5% over 40"},{value:"macularDegeneration",name:"Central Vision Loss (Macular Degeneration)",stat:"~8% over 45",description:"The centre of gaze fades first \u2014 precisely where you point your eyes to read.",label:"Central Vision Loss - Macular Degeneration - ~8% over 45"},{value:"macularDegenerationLarge",name:"Central Vision Loss (Advanced Macular Degeneration)",stat:"~1% over 50",description:"Advanced macular degeneration: a larger central blank that reading must route around.",label:"Central Vision Loss (Large) - Advanced Macular Degeneration - ~1% over 50"},{value:"diabeticRetinopathy",name:"Patchy Vision (Diabetic Retinopathy)",stat:"~0.8% over 40",description:"Blood-vessel damage scatters dark blotches across the view; content falls into them.",label:"Patchy Vision - Diabetic Retinopathy - ~0.8% over 40"},{value:"nystagmus",name:"Involuntary Eye Movement (Nystagmus)",stat:"~0.2%",description:"The eyes move on their own, so the page never quite holds still.",label:"Involuntary Eye Movement - Nystagmus - ~0.2%"}]},{label:"Field of vision",options:[{value:"hemianopiaLeft",name:"Left Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the left half of vision in both eyes.",label:"Left Field Loss - Hemianopia (Left) - ~0.1% over 49"},{value:"hemianopiaRight",name:"Right Field Loss (Hemianopia)",stat:"~0.1% over 49",description:"Stroke or brain injury removes the right half of vision in both eyes.",label:"Right Field Loss - Hemianopia (Right) - ~0.1% over 49"},{value:"amblyopia",name:"Reduced Acuity (Amblyopia)",stat:"~2-3%",description:"One eye never learned to see sharply; fine detail and depth suffer.",label:"Reduced Acuity (One Eye) - Amblyopia - ~2-3%"}]},{label:"Focus & acuity",options:[{value:"lowAcuityMild",name:"Slight Defocus",description:"Mildly uncorrected eyesight \u2014 the glasses left in the other room.",label:"Slight Defocus - Mild Blur"},{value:"lowAcuity",name:"Uncorrected Focus",stat:"~5-6%",description:"Moderate uncorrected short-sight: small text needs effort, thin fonts give up first.",label:"Uncorrected Focus - Moderate Blur - ~5-6%"},{value:"lowAcuityStrong",name:"Significant Defocus",description:"Strong blur: layout and colour still communicate, letterforms mostly do not.",label:"Significant Defocus - Strong Blur"},{value:"lowAcuityHeavy",name:"Severe Defocus",description:"Only shape, contrast and position survive. What does your page still say?",label:"Severe Defocus - Very Strong Blur"}]},{label:"Contrast & light",options:[{value:"cataract",name:"Clouded Lens (Cataract)",stat:"~17% over 40",description:"The lens clouds and yellows: glare blooms, contrast drains, whites go dingy.",label:"Clouded Lens - Cataract - ~17% over 40"},{value:"lowContrast",name:"Reduced Contrast",description:"Contrast sensitivity loss: faint greys sink into their backgrounds long before they vanish for you.",label:"Reduced Contrast"},{value:"lowLight",name:"Dim Environment",description:"A dim room, a cheap panel, a phone at night \u2014 the low-vision hours everyone has.",label:"Dim Environment - Low Light"}]},{label:"Visual stress",options:[{value:"scotopicRose",name:"Rose Tint",description:"A coloured overlay some readers use to calm pattern glare. See how your design reads through one.",label:"Rose Tint - Coloured Overlay"},{value:"scotopicYellow",name:"Yellow Tint",description:"A yellow reading overlay \u2014 common for visual stress. Your palette should survive it.",label:"Yellow Tint - Coloured Overlay"},{value:"scotopicAqua",name:"Aqua Tint",description:"An aqua reading overlay. Tinted reading is more common than most designs assume.",label:"Aqua Tint - Coloured Overlay"}]}],Y={none:{label:"None",css:"none"},fluorescentFlicker:{label:"Fluorescent Flicker",overlay:"fluorescentFlicker",css:"none"},lightSensitivity:{label:"Light Sensitivity",css:"brightness(1.4) contrast(1.2) saturate(1.1)"},colourHypersensitivity:{label:"Colour Hypersensitivity",css:"saturate(2.2) contrast(1.35) brightness(1.1)"},motionSensitivity:{label:"Motion Sensitivity",hostClass:"pour-sensory-filter-motionSensitivity",css:"none"},hyperfocusTunnel:{label:"Hyperfocus Tunnel (Metaphor)",overlay:"hyperfocusTunnel",mouseTracked:!0,css:"none"},attentionFragmentation:{label:"Attention Fragmentation (Metaphor)",overlay:"attentionFragmentation",css:"none"},peripheralDistraction:{label:"Peripheral Distraction",overlay:"peripheralDistraction",css:"none"},detailFixation:{label:"Detail Fixation (Metaphor)",overlay:"detailFixation",mouseTracked:!0,css:"none"},processingDelay:{label:"Processing Lag",overlay:"processingDelay",css:"none"},sensoryInterference:{label:"Sensory Interference",hostClass:"pour-sensory-filter-backgroundNoise",css:"none"},sensorySpike:{label:"Sudden Sensory Spike",overlay:"sensorySpike",css:"none"},dyslexiaVisualStress:{label:"Visual Stress (Pattern Glare)",overlay:"dyslexiaVisualStress",injectCSS:`
        body { background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.06) 22px, rgba(0,0,0,0.06) 24px) !important; background-attachment: fixed !important; }
        p, li, td, th, dd, dt, h1, h2, h3, h4, h5, h6, label { text-shadow: 0 0 1px rgba(0,0,0,0.15) !important; animation: pour-sensory-line-merge 3s ease-in-out infinite alternate !important; }
        @keyframes pour-sensory-line-merge { 0% { transform: scaleX(1) translateY(0); } 25% { transform: scaleX(1.008) translateY(0.8px); } 50% { transform: scaleX(0.993) translateY(-0.5px); } 75% { transform: scaleX(1.005) translateY(0.6px); } 100% { transform: scaleX(0.996) translateY(-0.3px); } }
      `,css:"none"},dyslexiaCrowding:{label:"Crowding Effect",injectCSS:"* { letter-spacing: -1px !important; word-spacing: -3px !important; line-height: 1.05 !important; } p, li, td, th, dd, dt, label, span, a { font-size: 95% !important; }",css:"none"},dyslexiaTrackingLoss:{label:"Tracking Loss",overlay:"dyslexiaTrackingLoss",mouseTracked:!0,css:"none"},dyslexiaWashout:{label:"Letter Instability",injectScript:!0,css:"none"},dyslexiaContrastSensitivity:{label:"Contrast Sensitivity",css:"contrast(0.8) brightness(1.1) saturate(0.9)"},handTremor:{label:"Hand Tremor",cursorJitter:{freq:6,amp:9,intent:1.6,bitmap:96},css:"none"},handTremorStrong:{label:"Hand Tremor (Strong)",cursorJitter:{freq:5,amp:18,intent:1.9,bitmap:128},css:"none"},restingTremor:{label:"Resting Tremor",cursorJitter:{freq:4.5,amp:12,intent:-.9,bitmap:96},css:"none"},ataxicDrift:{label:"Ataxic Drift",cursorJitter:{freq:.7,amp:26,intent:.8,bitmap:128},css:"none"},pointerSpasm:{label:"Sudden Jerk",cursorJitter:{freq:5,amp:3,intent:.4,bitmap:128,spasm:{minGap:2200,maxGap:6500,size:44,dur:280}},css:"none"},pointerHidden:{label:"Hidden Pointer (Keyboard Only)",cursorJitter:{hide:!0,bitmap:32},css:"none"},focusOrder:{label:"Focus Order",focusOrder:!0,css:"none"},landmarkMap:{label:"Landmarks & Headings",landmarkMap:!0,css:"none"}},Me=[{label:"Sensory overload",options:[{value:"fluorescentFlicker",name:"Fluorescent Flicker",description:"The pulse of failing fluorescent light \u2014 flicker that many autistic and migraine-prone people cannot tune out.",label:"Fluorescent Flicker"},{value:"lightSensitivity",name:"Light Sensitivity",description:"Photophobia: ordinary brightness arrives as glare; bright themes read as pain.",label:"Light Sensitivity"},{value:"colourHypersensitivity",name:"Colour Hypersensitivity",description:"Saturated colour lands far louder than you sent it.",label:"Colour Hypersensitivity"},{value:"motionSensitivity",name:"Motion Sensitivity",stat:"~5% of adults",description:"Page motion is felt, not just seen \u2014 what autoplaying movement does to a vestibular-sensitive visitor.",label:"Motion Sensitivity"}]},{label:"Attention & focus",options:[{value:"hyperfocusTunnel",name:"Hyperfocus Tunnel",metaphor:!0,description:"The world outside the point of focus falls away; the page exists one region at a time.",label:"Hyperfocus Tunnel (Metaphor)"},{value:"attentionFragmentation",name:"Attention Fragmentation",metaphor:!0,description:"A scattered attention field \u2014 every element competes and none of them wins.",label:"Attention Fragmentation (Metaphor)"},{value:"peripheralDistraction",name:"Peripheral Distraction",description:"Movement at the edges keeps stealing the centre of your gaze.",label:"Peripheral Distraction"},{value:"detailFixation",name:"Detail Fixation",metaphor:!0,description:"Detail-first processing: the point of attention magnifies while the whole recedes.",label:"Detail Fixation (Metaphor)"}]},{label:"Processing differences",options:[{value:"processingDelay",name:"Processing Lag",description:"The page lands a beat late \u2014 interaction as it feels under cognitive load.",label:"Processing Lag"},{value:"sensoryInterference",name:"Sensory Interference",description:"Visual noise under everything, like reading in a room that will not go quiet.",label:"Sensory Interference"}]},{label:"Sensory spikes",options:[{value:"sensorySpike",name:"Sudden Sensory Spike",description:"Not a constant state: periodic waves of too-much, out of nowhere.",label:"Sudden Sensory Spike"}]},{label:"Dyslexia / reading",options:[{value:"dyslexiaVisualStress",name:"Visual Stress (Pattern Glare)",stat:"~10%",description:"Dense text shimmers and bands together; lines merge and repel.",label:"Visual Stress (Pattern Glare)"},{value:"dyslexiaCrowding",name:"Crowding Effect",stat:"~10%",description:"Letters and words pack too tightly to separate \u2014 spacing is doing more work than you think.",label:"Crowding Effect"},{value:"dyslexiaTrackingLoss",name:"Tracking Loss",stat:"~10%",description:"Losing the line mid-sentence: only the neighbourhood of your pointer holds steady.",label:"Tracking Loss"},{value:"dyslexiaWashout",name:"Letter Instability",stat:"~10%",description:"Letters drift and trade places as you read. Decoding costs effort sighted readers never spend.",label:"Letter Instability"},{value:"dyslexiaContrastSensitivity",name:"Contrast Sensitivity",stat:"~10%",description:"Full-contrast text tires, low-contrast text disappears; the readable band is narrow.",label:"Contrast Sensitivity"}]}],Fe=[{label:"Tremor",options:[{value:"handTremor",name:"Hand Tremor",stat:"~1%",description:"An essential tremor: the pointer shakes harder the more precisely you aim.",label:"Hand Tremor"},{value:"handTremorStrong",name:"Hand Tremor (Strong)",description:"The same tremor, stronger \u2014 small close-set targets become lotteries.",label:"Hand Tremor (Strong)"},{value:"restingTremor",name:"Resting Tremor",stat:"~0.3%",description:"A parkinsonian pattern: shakes at rest, steadies during deliberate movement.",label:"Resting Tremor"}]},{label:"Pointer control",options:[{value:"ataxicDrift",name:"Ataxic Drift",description:"The pointer drifts wide of intent; straight lines are not on offer.",label:"Ataxic Drift"},{value:"pointerSpasm",name:"Sudden Jerk",description:"Occasional involuntary jerks fling the pointer \u2014 sometimes mid-click.",label:"Sudden Jerk"},{value:"pointerHidden",name:"Hidden Pointer (Keyboard Only)",description:"No pointer at all. The keyboard is the only way through your page.",label:"Hidden Pointer (Keyboard Only)"}]},{label:"Keyboard",options:[{value:"focusOrder",name:"Focus Order",description:"Numbered stops trace where Tab really goes, in order. Amber stops force their own position with a positive tabindex.",label:"Focus Order"}]}],Oe=[{label:"Page structure",options:[{value:"landmarkMap",name:"Landmarks & Headings",description:"Landmark regions tinted and named, every heading chipped with its level. Amber chips skip a level.",label:"Landmarks & Headings"}]}],ie={};for(let e of[...De,...Me,...Fe,...Oe])for(let t of e.options)ie[t.value]=t.label.split(" - ")[0];var Ie=new Set(["atomic","busy","controls","current","describedby","description","details","dropeffect","flowto","grabbed","hidden","keyshortcuts","label","labelledby","live","owns","relevant","roledescription","braillelabel","brailleroledescription"]),Ne={link:["disabled","errormessage","expanded","haspopup","invalid"],button:["disabled","errormessage","expanded","haspopup","invalid","pressed"],checkbox:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],switch:["checked","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],radio:["checked","disabled","errormessage","haspopup","invalid","posinset","setsize"],option:["checked","disabled","errormessage","haspopup","invalid","posinset","selected","setsize"],tab:["disabled","errormessage","expanded","haspopup","invalid","posinset","selected","setsize"],menuitem:["disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemcheckbox:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],menuitemradio:["checked","disabled","errormessage","expanded","haspopup","invalid","posinset","setsize"],textbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],searchbox:["activedescendant","autocomplete","disabled","errormessage","haspopup","invalid","multiline","placeholder","readonly","required"],combobox:["activedescendant","autocomplete","disabled","errormessage","expanded","haspopup","invalid","readonly","required"],listbox:["activedescendant","disabled","errormessage","expanded","haspopup","invalid","multiselectable","orientation","readonly","required"],slider:["disabled","errormessage","haspopup","invalid","orientation","readonly","valuemax","valuemin","valuenow","valuetext"],spinbutton:["activedescendant","disabled","errormessage","haspopup","invalid","readonly","required","valuemax","valuemin","valuenow","valuetext"],progressbar:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],meter:["disabled","errormessage","haspopup","invalid","valuemax","valuemin","valuenow","valuetext"],scrollbar:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],heading:["disabled","errormessage","haspopup","invalid","level"],list:["disabled","errormessage","haspopup","invalid"],listitem:["disabled","errormessage","haspopup","invalid","level","posinset","setsize"],row:["activedescendant","colindex","disabled","errormessage","expanded","haspopup","invalid","level","posinset","rowindex","selected","setsize"],rowgroup:["disabled","errormessage","haspopup","invalid"],cell:["colindex","colspan","disabled","errormessage","haspopup","invalid","rowindex","rowspan"],gridcell:["colindex","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowspan","selected"],columnheader:["colindex","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowspan","selected","sort"],rowheader:["colindex","colspan","disabled","errormessage","expanded","haspopup","invalid","readonly","required","rowindex","rowspan","selected","sort"],table:["colcount","disabled","errormessage","haspopup","invalid","rowcount"],grid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","readonly","rowcount"],treegrid:["activedescendant","colcount","disabled","errormessage","haspopup","invalid","multiselectable","orientation","readonly","required","rowcount"],tablist:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation"],menu:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],menubar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],tree:["activedescendant","disabled","errormessage","haspopup","invalid","multiselectable","orientation","required"],treeitem:["checked","disabled","errormessage","expanded","haspopup","invalid","level","posinset","selected","setsize"],radiogroup:["activedescendant","disabled","errormessage","haspopup","invalid","orientation","readonly","required"],group:["activedescendant","disabled","errormessage","haspopup","invalid"],separator:["disabled","errormessage","haspopup","invalid","orientation","valuemax","valuemin","valuenow","valuetext"],toolbar:["activedescendant","disabled","errormessage","haspopup","invalid","orientation"],dialog:["disabled","errormessage","haspopup","invalid","modal"],alertdialog:["disabled","errormessage","haspopup","invalid","modal"],application:["activedescendant","disabled","errormessage","expanded","haspopup","invalid"],article:["disabled","errormessage","haspopup","invalid","posinset","setsize"],img:["disabled","errormessage","haspopup","invalid"],figure:["disabled","errormessage","haspopup","invalid"],document:["disabled","errormessage","haspopup","invalid"],feed:["disabled","errormessage","haspopup","invalid"],math:["disabled","errormessage","haspopup","invalid"],note:["disabled","errormessage","haspopup","invalid"],presentation:["disabled","errormessage","haspopup","invalid"],none:["disabled","errormessage","haspopup","invalid"],banner:["disabled","errormessage","haspopup","invalid"],complementary:["disabled","errormessage","haspopup","invalid"],contentinfo:["disabled","errormessage","haspopup","invalid"],form:["disabled","errormessage","haspopup","invalid"],main:["disabled","errormessage","haspopup","invalid"],navigation:["disabled","errormessage","haspopup","invalid"],region:["disabled","errormessage","haspopup","invalid"],search:["disabled","errormessage","haspopup","invalid"],alert:["disabled","errormessage","haspopup","invalid"],log:["disabled","errormessage","haspopup","invalid"],marquee:["disabled","errormessage","haspopup","invalid"],status:["disabled","errormessage","haspopup","invalid"],timer:["disabled","errormessage","haspopup","invalid"],tabpanel:["disabled","errormessage","haspopup","invalid"],tooltip:["disabled","errormessage","haspopup","invalid"],definition:["disabled","errormessage","haspopup","invalid"],term:["disabled","errormessage","haspopup","invalid"],paragraph:["disabled","errormessage","haspopup","invalid"],generic:["disabled","errormessage","haspopup","invalid"],blockquote:["disabled","errormessage","haspopup","invalid"],caption:["disabled","errormessage","haspopup","invalid"],code:["disabled","errormessage","haspopup","invalid"],emphasis:["disabled","errormessage","haspopup","invalid"],strong:["disabled","errormessage","haspopup","invalid"],time:["disabled","errormessage","haspopup","invalid"],deletion:["disabled","errormessage","haspopup","invalid"],insertion:["disabled","errormessage","haspopup","invalid"],subscript:["disabled","errormessage","haspopup","invalid"],superscript:["disabled","errormessage","haspopup","invalid"]},Pe={checkbox:"checkbox",radio:"radio",range:"slider",number:"spinbutton",search:"searchbox",email:"textbox",tel:"textbox",text:"textbox",url:"textbox",button:"button",submit:"button",reset:"button",image:"button"},Ve={button:"button",textarea:"textbox",img:"img",article:"article",aside:"complementary",nav:"navigation",main:"main",h1:"heading",h2:"heading",h3:"heading",h4:"heading",h5:"heading",h6:"heading",ul:"list",ol:"list",menu:"list",li:"listitem",table:"table",thead:"rowgroup",tbody:"rowgroup",tfoot:"rowgroup",tr:"row",td:"cell",th:"columnheader",form:"form",fieldset:"group",details:"group",dialog:"dialog",hr:"separator",progress:"progressbar",meter:"meter",output:"status",option:"option",datalist:"listbox",dt:"term",dd:"definition",p:"paragraph",div:"generic",span:"generic",blockquote:"blockquote",figure:"figure",time:"time",code:"code",em:"emphasis",strong:"strong"};function de(e){let t=e.tagName.toLowerCase();if(t==="a"||t==="area")return e.hasAttribute("href")?"link":"generic";if(t==="input")return Pe[e.type]??null;if(t==="select")return e.multiple||e.size>1?"listbox":"combobox";if(t==="img")return e.getAttribute("alt")===""?"presentation":"img";if(t==="header")return e.closest("article, aside, main, nav, section")?"generic":"banner";if(t==="footer")return e.closest("article, aside, main, nav, section")?"generic":"contentinfo";if(t==="aside"){let l=e.parentElement?.closest("article, aside, nav, section"),v=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby");return l&&!v?"generic":"complementary"}return t==="section"?e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")?"region":"generic":Ve[t]??null}function qe(e){return e.tabIndex>=0||e.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]')?!0:[...Ie].some(t=>e.hasAttribute(`aria-${t}`))}function ce(e){let t=e.getAttribute("role")?.trim().split(/\s+/)??[];for(let l of t){let v=l.toLowerCase();if(Ne[v])return(v==="presentation"||v==="none")&&qe(e)?de(e):v}return t.length?null:de(e)}var ue=`/* Structure-lens overlay styles (focus order, landmark map): injected by
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
`;function me(e){if(e.getElementById("pour-lens-styles"))return;let t=e.createElement("style");t.id="pour-lens-styles",t.dataset.pourAudit="overlay",t.textContent=ue,e.head.appendChild(t)}function be(e=document){let t=e.defaultView,l=null,v=0,w=null,E={contentVisibilityAuto:!0,visibilityProperty:!0,checkVisibilityCSS:!0};function A(u){for(let p=u;p&&p!==e.documentElement;p=p.parentElement??p.getRootNode()?.host??null){let c=p.ownerDocument.defaultView.getComputedStyle(p).position;if(c==="fixed")return"fixed";if(c==="sticky")return"sticky"}return"flow"}function S(u,{withLine:p=!1}={}){let c="background:none;border:0;margin:0;padding:0;box-shadow:none;filter:none;opacity:1;mix-blend-mode:normal;",o=e.createElement("div");o.className=u,o.dataset.pourAudit="overlay",o.style.cssText=`position:absolute;top:0;left:0;width:0;height:0;overflow:clip;overflow-clip-margin:24px;pointer-events:none;z-index:2147483646;${c}`;let n=e.createElement("div");n.className=u,n.dataset.pourAudit="overlay",n.style.cssText=`position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:2147483646;${c}`;let s=0,g=0,x=null,T=null,H=null;if(p){T=e.createElementNS("http://www.w3.org/2000/svg","svg"),T.setAttribute("class",`${u.replace(/-layer$/,"")}-path`);for(let[d,y]of[["position","absolute"],["top","0"],["left","0"],["width","100%"],["height","100%"],["max-width","none"],["max-height","none"],["display","block"],["overflow","visible"],["pointer-events","none"],["background","none"],["border","0"],["margin","0"],["padding","0"],["box-shadow","none"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])T.style.setProperty(d,y,"important");H=e.createElementNS("http://www.w3.org/2000/svg","polyline"),x=e.createElementNS("http://www.w3.org/2000/svg","polyline");for(let[d,y,b]of[[H,"rgba(29,78,216,0.85)","3"],[x,"#93C5FD","1.5"]])for(let[f,G]of[["fill","none"],["stroke",y],["stroke-width",b],["stroke-linejoin","round"],["stroke-linecap","round"],["filter","none"],["opacity","1"],["mix-blend-mode","normal"]])d.style.setProperty(f,G,"important");T.append(H,x),o.append(T)}let D=[],C=null,Q=0,z=(d,y)=>{let b=d.el.getBoundingClientRect(),f=b.width<=0&&b.height<=0||!d.el.isConnected||d.el.checkVisibility&&!d.el.checkVisibility(E);if(d.node.style.display=f?"none":"",f){d.docPt=null,d.viewRect=null;return}let G=d.anchor==="flow"?b.left-y.left:b.left,Z=d.anchor==="flow"?b.top-y.top:b.top;d.node.style.transform=`translate(${G}px, ${Z}px)`,d.sized&&(d.node.style.width=`${b.width}px`,d.node.style.height=`${b.height}px`),d.anchor==="flow"?d.docPt=`${G},${Z}`:d.viewRect=b},_=d=>{if(!x)return;let y=[];for(let f of D)f.offLine||f.node.style.display==="none"||(f.anchor==="flow"?f.docPt&&y.push(f.docPt):f.viewRect&&y.push(`${f.viewRect.left-d.left},${f.viewRect.top-d.top}`));let b=y.join(" ");H.setAttribute("points",b),x.setAttribute("points",b)},M=()=>{let d=e.documentElement.scrollWidth,y=e.documentElement.scrollHeight;d!==s&&(s=d,o.style.width=`${d}px`),y!==g&&(g=y,o.style.height=`${y}px`);let b=o.getBoundingClientRect();for(let f of D)z(f,b);_(b)};e.body.append(o,n);let j=()=>{Q=t.requestAnimationFrame(j),M()};return j(),{setItems(d,y){for(let b of D)b.node.remove();D=d.map(b=>{let f=A(b.el);return(f==="flow"?o:n).append(b.node),{...b,anchor:f,docPt:null,viewRect:null}}),y&&!D.length?(C||(C=e.createElement("div"),C.className="pour-lens-notice",n.append(C)),C.textContent=y,C.style.display=""):C&&(C.style.display="none"),M()},destroy(){t.cancelAnimationFrame(Q),o.remove(),n.remove(),D=[]}}}function O(u,p){for(let c=u.parentElement??u.getRootNode()?.host;c&&c!==e.documentElement;c=c.parentElement??c.getRootNode()?.host){let o=c.ownerDocument.defaultView.getComputedStyle(c);if(o.overflow==="visible"&&o.overflowX==="visible"&&o.overflowY==="visible")continue;let n=c.getBoundingClientRect();if(p.right<=n.left||p.left>=n.right||p.bottom<=n.top||p.top>=n.bottom)return!0}return!1}function I(){let u=[],p=[],c=o=>{for(let n of o.querySelectorAll("*")){if(n.dataset&&n.dataset.pourAudit||(n.shadowRoot&&c(n.shadowRoot),!n.matches('a[href], area[href], button, input, select, textarea, summary, iframe, object, embed, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]'))||n.disabled||n.closest("[inert]")||n.checkVisibility&&!n.checkVisibility(E))continue;let s=n.getBoundingClientRect();if(s.width<=0&&s.height<=0)continue;let g=n.getAttribute("tabindex"),x=g==null?0:parseInt(g,10)||0;if(x<0){n.matches("a[href], area[href], button, input, select, textarea, summary")&&!O(n,s)&&p.push({el:n});continue}u.push({el:n,idx:x,order:u.length})}};return c(e),{stops:[...u.filter(o=>o.idx>0).sort((o,n)=>o.idx-n.idx||o.order-n.order),...u.filter(o=>o.idx===0)],unreachable:p}}function W(){if(l)return;me(e),l=S("pour-focus-order-layer",{withLine:!0});let u=()=>{let{stops:p,unreachable:c}=I(),o=p.map((n,s)=>{let g=e.createElement("span");return g.className="pour-focus-badge"+(n.idx>0?" pour-focus-badge-forced":""),g.textContent=String(s+1),n.idx>0&&(g.title=`tabindex="${n.idx}" forces this position`),{el:n.el,node:g,sized:!1}});for(let{el:n}of c){let s=e.createElement("span");s.className="pour-focus-badge pour-focus-badge-unreachable",s.textContent="\u2715",s.title='tabindex="-1" \u2014 a keyboard cannot Tab to this control',o.push({el:n,node:s,sized:!1,offLine:!0})}l.setItems(o,"Focus order: this page has no keyboard-reachable controls")};u(),w=new t.MutationObserver(()=>{v||(v=t.setTimeout(()=>{v=0,u()},400))}),w.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function J(){t.clearTimeout(v),v=0,w?.disconnect(),w=null,l?.destroy(),l=null}let B=new Set(["banner","navigation","main","complementary","contentinfo","region","search","form"]),N=null,V=0,q=null;function X(u){let p=u.getAttribute("aria-label");if(p?.trim())return p.trim();let c=u.getAttribute("aria-labelledby");return c?c.split(/\s+/).map(o=>u.getRootNode().getElementById?.(o)?.textContent.trim()??"").filter(Boolean).join(" "):""}function K(){let u=[],p=[],c=n=>{for(let s of n.querySelectorAll("*")){if(s.dataset&&s.dataset.pourAudit||(s.shadowRoot&&c(s.shadowRoot),s.checkVisibility&&!s.checkVisibility(E)))continue;let g=s.getBoundingClientRect();if(g.width<=0&&g.height<=0)continue;let x=ce(s);if(B.has(x)){if(x==="form"&&!X(s))continue;u.push({el:s,role:x,name:X(s)})}else if(x==="heading"){let T=parseInt(s.getAttribute("aria-level"),10)||parseInt(s.tagName.charAt(1),10)||2;p.push({el:s,level:T})}}};c(e);let o=null;for(let n of p)n.skipped=o!=null&&n.level>o+1,n.from=o,o=n.level;return{landmarks:u,headings:p}}function ee(){if(N)return;me(e),N=S("pour-map-layer");let u=()=>{let{landmarks:p,headings:c}=K(),o=[];for(let n of p){let s=e.createElement("div");s.className=`pour-map-region pour-map-role-${n.role}`;let g=e.createElement("span");g.className="pour-map-tag",g.textContent=n.name?`${n.role} \xB7 ${n.name}`:n.role,s.append(g),o.push({el:n.el,node:s,sized:!0})}for(let n of c){let s=e.createElement("span");s.className="pour-map-heading"+(n.skipped?" pour-map-heading-skipped":""),s.textContent=`H${n.level}`,n.skipped&&(s.title=`Skips a level \u2014 the heading before this one is an H${n.from}`),o.push({el:n.el,node:s,sized:!1})}N.setItems(o,"No landmarks or headings are exposed on this page")};u(),q=new t.MutationObserver(()=>{V||(V=t.setTimeout(()=>{V=0,u()},400))}),q.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}function U(){t.clearTimeout(V),V=0,q?.disconnect(),q=null,N?.destroy(),N=null}return{focusOrder:{apply:W,remove:J},landmarkMap:{apply:ee,remove:U}}}var ge=`/* Overlay styles for the vision & sensory filters \u2014 ported from
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
  will-change: background, mask-image, -webkit-mask-image;
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
`;function fe(e=document){let t=e.defaultView,l=e.documentElement,v=be(e),w=null,E=null,A="none",S="none",O=0,I=0,W=0,J=0,B=null;function N(){if(e.getElementById("pour-filter-styles"))return;let a=e.createElement("style");a.id="pour-filter-styles",a.dataset.pourAudit="filter",a.textContent=ge,e.head.appendChild(a)}function V(){if(e.getElementById("pour-vision-filter-defs"))return;let a="http://www.w3.org/2000/svg",r=e.createElementNS(a,"svg");r.setAttribute("id","pour-vision-filter-defs"),r.setAttribute("width","0"),r.setAttribute("height","0"),r.setAttribute("focusable","false"),r.setAttribute("aria-hidden","true"),r.dataset.pourAudit="filter",r.style.position="absolute",r.style.pointerEvents="none";let i=e.createElementNS(a,"defs");for(let[k,L]of Object.entries(te)){let h=e.createElementNS(a,"filter");h.setAttribute("id",`pour-vision-filter-${k}`),h.setAttribute("color-interpolation-filters","linearRGB");let m=e.createElementNS(a,"feColorMatrix");m.setAttribute("type","matrix"),m.setAttribute("values",L),h.appendChild(m),i.appendChild(h)}r.appendChild(i),e.body.appendChild(r)}let q=a=>{let r=e.createElement("div");return r.className=a,r.dataset.pourAudit="filter",e.body.appendChild(r),r};function X(){W=0,l.style.setProperty("--pour-vision-x",`${O}px`),l.style.setProperty("--pour-vision-y",`${I}px`),l.style.setProperty("--pour-vision-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function K(a){O=a.clientX,I=a.clientY,W||(W=t.requestAnimationFrame(X))}function ee(a){let r=a.touches[0];r&&K(r)}function U(a){for(let i of ne)l.classList.remove(`pour-vision-filter-${i}`);if(oe.has(A)&&(e.removeEventListener("mousemove",K),e.removeEventListener("touchmove",ee)),w?.remove(),w=null,A=$[a]!==void 0?a:"none",A==="none"){S==="none"&&(l.style.filter="");return}S!=="none"&&re("none"),N(),V();let r=$[A]||"none";l.style.filter=r==="none"?"":r,ne.has(A)&&(l.classList.add(`pour-vision-filter-${A}`),w=q("pour-vision-filter-overlay"),w.dataset.filter=A),oe.has(A)&&(O=t.innerWidth/2,I=t.innerHeight/2,X(),e.addEventListener("mousemove",K),e.addEventListener("touchmove",ee,{passive:!0}))}function u(){J=0,l.style.setProperty("--pour-sensory-x",`${O}px`),l.style.setProperty("--pour-sensory-y",`${I}px`),l.style.setProperty("--pour-sensory-r",`${Math.min(t.innerWidth,t.innerHeight)}px`)}function p(a){O=a.clientX,I=a.clientY,J||(J=t.requestAnimationFrame(u))}function c(a){let r=a.touches[0];r&&p(r)}function o(a){if(e.getElementById("pour-sensory-injected-style")?.remove(),!a)return;let r=e.createElement("style");r.id="pour-sensory-injected-style",r.dataset.pourAudit="filter",r.textContent=a,e.head.appendChild(r)}function n(){if(e.querySelector(".pour-sensory-washout-char"))return;let a=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT,null),r=[];for(;a.nextNode();)r.push(a.currentNode);for(let i of r){let k=i.textContent;if(!k.trim())continue;let L=i.parentElement;if(!L||L.closest("script,style,noscript,[data-pour-audit]"))continue;let h=e.createDocumentFragment();for(let m of k)if(m===" "||m===`
`||m==="	")h.appendChild(e.createTextNode(m));else{let R=e.createElement("span");R.textContent=m,R.style.opacity=(.3+Math.random()*.7).toFixed(2),R.className="pour-sensory-washout-char",h.appendChild(R)}L.replaceChild(h,i)}}function s(){for(let a of e.querySelectorAll(".pour-sensory-washout-char"))a.replaceWith(a.textContent);e.body.normalize()}let g=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],x=new Map,T=0,H=0,D=null,C=0,Q=0,z=0,_=0,M=0,j=0;function d(a,r,i){let k=`${a}:${r}:${i}`,L=x.get(k);if(L)return L;let h=e.createElement("canvas");h.width=a,h.height=a;let m=h.getContext("2d");if(!m)return"auto";let R=Math.round(a/2);m.save(),m.translate(R+r,R+i),m.scale(1.15,1.15),m.beginPath(),m.moveTo(g[0][0],g[0][1]);for(let P=1;P<g.length;P++)m.lineTo(g[P][0],g[P][1]);m.closePath(),m.restore(),m.lineWidth=3,m.lineJoin="round",m.strokeStyle="#fff",m.stroke(),m.fillStyle="#000",m.fill();let F=`url("${h.toDataURL("image/png")}") ${R} ${R}, auto`;return x.set(k,F),F}function y(a){let r=a.timeStamp||Date.now(),i=r-z;if(z&&i>0){let k=Math.hypot(a.clientX-C,a.clientY-Q);_=_*.8+k/i*1e3*.2}C=a.clientX,Q=a.clientY,z=r}function b(a,r){if(!M)return M=a+r.minGap+Math.random()*(r.maxGap-r.minGap),[0,0];let i=a-M;if(i<0)return[0,0];if(i>r.dur)return M=a+r.minGap+Math.random()*(r.maxGap-r.minGap),j=Math.random()*Math.PI*2,[0,0];let k=1-i/r.dur,L=r.size*k*k;return[Math.cos(j)*L,Math.sin(j)*L]}function f(a){T=t.requestAnimationFrame(f);let r=D;if(!r)return;let i=(a-H)/1e3,k=0,L=0;if(r.freq&&r.amp){let F=2*Math.PI*r.freq,P=Math.max(0,1+(r.intent||0)*Math.min(1,_/700)),pe=r.amp*P;k+=(Math.sin(F*i)*.7+Math.sin(F*1.63*i+1.1)*.3)*pe,L+=(Math.cos(F*.97*i+.6)*.7+Math.sin(F*2.11*i+2.3)*.3)*pe}if(r.spasm){let[F,P]=b(a,r.spasm);k+=F,L+=P}let h=r.bitmap/2-14,m=Math.max(-h,Math.min(h,Math.round(k))),R=Math.max(-h,Math.min(h,Math.round(L)));l.style.cursor=d(r.bitmap,m,R)}function G(a){Z(),D=a,H=t.performance?t.performance.now():Date.now(),_=0,z=0,M=0,j=Math.random()*Math.PI*2,se(a.hide?`
      html, :not(html) { cursor: none !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `:`
      :not(html) { cursor: inherit !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `),!a.hide&&(e.addEventListener("mousemove",y,{passive:!0}),T=t.requestAnimationFrame(f))}function Z(){T&&t.cancelAnimationFrame(T),T=0,D=null,M=0,e.removeEventListener("mousemove",y),se(null),l.style.cursor=""}function se(a){if(e.getElementById("pour-sensory-cursor-style")?.remove(),!a)return;let r=e.createElement("style");r.id="pour-sensory-cursor-style",r.dataset.pourAudit="filter",r.textContent=a,e.head.appendChild(r)}function ve(){le();let a=()=>{B=t.setTimeout(()=>{E&&(E.classList.add("pour-sensory-spike-flash"),t.setTimeout(()=>{E?.classList.remove("pour-sensory-spike-flash"),a()},150))},3e3+Math.random()*8e3)};a()}function le(){B&&(t.clearTimeout(B),B=null)}function re(a){let r=Y[S];if(r?.overlay&&l.classList.remove(`pour-sensory-filter-${S}`),r?.hostClass&&l.classList.remove(r.hostClass),r?.mouseTracked&&(e.removeEventListener("mousemove",p),e.removeEventListener("touchmove",c)),r?.injectScript&&s(),r?.cursorJitter&&Z(),r?.focusOrder&&v.focusOrder.remove(),r?.landmarkMap&&v.landmarkMap.remove(),le(),E?.remove(),E=null,o(null),S=Y[a]?a:"none",S==="none"){A==="none"&&(l.style.filter="");return}A!=="none"&&U("none"),N();let i=Y[S];l.style.filter=i.css&&i.css!=="none"?i.css:"",i.hostClass&&l.classList.add(i.hostClass),(i.overlay||i.mouseTracked||S==="sensorySpike")&&(E=q("pour-sensory-filter-overlay"),E.dataset.filter=S,i.overlay&&l.classList.add(`pour-sensory-filter-${S}`)),i.mouseTracked&&(O=t.innerWidth/2,I=t.innerHeight/2,u(),e.addEventListener("mousemove",p),e.addEventListener("touchmove",c,{passive:!0})),i.injectCSS&&o(i.injectCSS),S==="sensorySpike"&&ve(),i.injectScript&&n(),i.cursorJitter&&G(i.cursorJitter),i.focusOrder&&v.focusOrder.apply(),i.landmarkMap&&v.landmarkMap.apply()}let ye=()=>({vision:A,sensory:S});function he(){U("none"),re("none")}return{applyVision:U,applySensory:re,clear:he,state:ye}}return Ae($e);})();
