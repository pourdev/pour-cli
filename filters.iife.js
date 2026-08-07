/*! pour filters | MIT | https://pour.dev */
var PourFilters=(()=>{var P=Object.defineProperty;var me=Object.getOwnPropertyDescriptor;var be=Object.getOwnPropertyNames;var fe=Object.prototype.hasOwnProperty;var ve=(a,n)=>{for(var o in n)P(a,o,{get:n[o],enumerable:!0})},ge=(a,n,o,f)=>{if(n&&typeof n=="object"||typeof n=="function")for(let c of be(n))!fe.call(a,c)&&c!==o&&P(a,c,{get:()=>n[c],enumerable:!(f=me(n,c))||f.enumerable});return a};var xe=a=>ge(P({},"__esModule",{value:!0}),a);var Ee={};ve(Ee,{CSS_FILTERS:()=>v,MODE_LABELS:()=>N,SENSORY_FILTERS:()=>h,createFilterApplier:()=>ne});var V={protanopia:"0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0 0 0 0 1 0",deuteranopia:"0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047414 0 0 -0.011820 0.042940 0.968881 0 0 0 0 0 1 0",tritanopia:"1.255528 -0.076749 -0.178779 0 0 -0.078411 0.930809 0.147602 0 0 0.004733 0.691367 0.303900 0 0 0 0 0 1 0",achromatopsia:"0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0.212656 0.715158 0.072186 0 0 0 0 0 1 0",protanomaly:"0.458064 0.679578 -0.137642 0 0 0.092785 0.846313 0.060902 0 0 -0.007494 -0.016807 1.024301 0 0 0 0 0 1 0",deuteranomaly:"0.547494 0.607765 -0.155259 0 0 0.181692 0.781742 0.036566 0 0 -0.010410 0.027275 0.983136 0 0 0 0 0 1 0",tritanomaly:"1.057047 -0.029507 -0.027540 0 0 -0.039014 0.966028 0.072986 0 0 0.002584 0.220200 0.777216 0 0 0 0 0 1 0"},ke={protanopia:"saturate(0.25) sepia(0.5) hue-rotate(-15deg)",deuteranopia:"saturate(0.3) sepia(0.4) hue-rotate(-10deg)",tritanopia:"saturate(0.35) sepia(0.3) hue-rotate(50deg)",achromatopsia:"grayscale(100%)",protanomaly:"saturate(0.6) sepia(0.25) hue-rotate(-8deg)",deuteranomaly:"saturate(0.65) sepia(0.2) hue-rotate(-5deg)",tritanomaly:"saturate(0.7) sepia(0.15) hue-rotate(25deg)"},H=new Set(["glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge","diabeticRetinopathy","nystagmus","hemianopiaLeft","hemianopiaRight","amblyopia"]),j=new Set(["glaucoma","glaucomaLarge","macularDegeneration","macularDegenerationLarge"]),v={none:"none",cataract:"sepia(0.3) contrast(0.9) saturate(0.9) brightness(0.95) blur(0.6px)",presbyopia:"blur(0.5px) contrast(0.92)",lowAcuityMild:"blur(0.7px)",lowAcuity:"blur(1.2px)",lowAcuityStrong:"blur(2.5px)",lowAcuityHeavy:"blur(5px)",lowLight:"brightness(0.65) contrast(0.9) saturate(0.85) hue-rotate(-8deg)",lowContrast:"contrast(0.7)",glaucoma:"none",glaucomaLarge:"none",macularDegeneration:"none",macularDegenerationLarge:"none",diabeticRetinopathy:"none",nystagmus:"none",hemianopiaLeft:"none",hemianopiaRight:"none",amblyopia:"none",scotopicRose:"sepia(0.15) hue-rotate(330deg) saturate(1.2) brightness(1.05)",scotopicYellow:"sepia(0.3) saturate(1.15) brightness(1.05)",scotopicAqua:"sepia(0.2) hue-rotate(160deg) saturate(1.15) brightness(1.02)"},he=typeof navigator<"u"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Se=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),Le=he||Se;Object.keys(V).forEach(a=>{Le?v[a]=ke[a]:v[a]=`url(#pour-vision-filter-${a})`});var we=[{label:"Color vision",options:[{value:"deuteranomaly",label:"Green Weak - Deuteranomaly - ~5%"},{value:"protanomaly",label:"Red Weak - Protanomaly - ~1%"},{value:"protanopia",label:"Red Absent - Protanopia - ~1%"},{value:"deuteranopia",label:"Green Absent - Deuteranopia - ~1%"},{value:"tritanomaly",label:"Blue Weak - Tritanomaly - <0.1%"},{value:"tritanopia",label:"Blue Absent - Tritanopia - <0.1%"},{value:"achromatopsia",label:"Monochromacy - Achromatopsia - ~0.003%"}]},{label:"Eye conditions",options:[{value:"presbyopia",label:"Near-Vision Loss - Presbyopia - ~100% over 40"},{value:"glaucoma",label:"Tunnel Vision - Glaucoma - ~2% over 40"},{value:"glaucomaLarge",label:"Tunnel Vision (Large) - Advanced Glaucoma - ~0.5% over 40"},{value:"macularDegeneration",label:"Central Vision Loss - Macular Degeneration - ~8% over 45"},{value:"macularDegenerationLarge",label:"Central Vision Loss (Large) - Advanced Macular Degeneration - ~1.5% over 45"},{value:"diabeticRetinopathy",label:"Patchy Vision - Diabetic Retinopathy - ~3%"},{value:"nystagmus",label:"Involuntary Eye Movement - Nystagmus - ~0.2%"}]},{label:"Field of vision",options:[{value:"hemianopiaLeft",label:"Left Field Loss - Hemianopia (Left) - ~0.8%"},{value:"hemianopiaRight",label:"Right Field Loss - Hemianopia (Right) - ~0.8%"},{value:"amblyopia",label:"Reduced Acuity (One Eye) - Amblyopia - ~2-3%"}]},{label:"Focus & acuity",options:[{value:"lowAcuityMild",label:"Slight Defocus - Mild Blur - ~25%"},{value:"lowAcuity",label:"Uncorrected Focus - Moderate Blur - ~12%"},{value:"lowAcuityStrong",label:"Significant Defocus - Strong Blur - ~5%"},{value:"lowAcuityHeavy",label:"Severe Defocus - Very Strong Blur - ~1%"}]},{label:"Contrast & light",options:[{value:"cataract",label:"Clouded Lens - Cataract - ~17% over 40"},{value:"lowContrast",label:"Reduced Contrast"},{value:"lowLight",label:"Dim Environment - Low Light"}]},{label:"Visual stress",options:[{value:"scotopicRose",label:"Rose Tint - Coloured Overlay"},{value:"scotopicYellow",label:"Yellow Tint - Coloured Overlay"},{value:"scotopicAqua",label:"Aqua Tint - Coloured Overlay"}]}],h={none:{label:"None",css:"none"},fluorescentFlicker:{label:"Fluorescent Flicker",overlay:"fluorescentFlicker",css:"none"},lightSensitivity:{label:"Light Sensitivity",css:"brightness(1.4) contrast(1.2) saturate(1.1)"},colourHypersensitivity:{label:"Colour Hypersensitivity",css:"saturate(2.2) contrast(1.35) brightness(1.1)"},motionSensitivity:{label:"Motion Sensitivity",hostClass:"pour-sensory-filter-motionSensitivity",css:"none"},hyperfocusTunnel:{label:"Hyperfocus Tunnel (Metaphor)",overlay:"hyperfocusTunnel",mouseTracked:!0,css:"none"},attentionFragmentation:{label:"Attention Fragmentation (Metaphor)",overlay:"attentionFragmentation",css:"none"},peripheralDistraction:{label:"Peripheral Distraction",overlay:"peripheralDistraction",css:"none"},detailFixation:{label:"Detail Fixation (Metaphor)",overlay:"detailFixation",mouseTracked:!0,css:"none"},processingDelay:{label:"Processing Lag",overlay:"processingDelay",css:"none"},sensoryInterference:{label:"Sensory Interference",hostClass:"pour-sensory-filter-backgroundNoise",css:"none"},sensorySpike:{label:"Sudden Sensory Spike",overlay:"sensorySpike",css:"none"},dyslexiaVisualStress:{label:"Visual Stress (Pattern Glare)",overlay:"dyslexiaVisualStress",injectCSS:`
        body { background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.06) 22px, rgba(0,0,0,0.06) 24px) !important; background-attachment: fixed !important; }
        p, li, td, th, dd, dt, h1, h2, h3, h4, h5, h6, label { text-shadow: 0 0 1px rgba(0,0,0,0.15) !important; animation: pour-sensory-line-merge 3s ease-in-out infinite alternate !important; }
        @keyframes pour-sensory-line-merge { 0% { transform: scaleX(1) translateY(0); } 25% { transform: scaleX(1.008) translateY(0.8px); } 50% { transform: scaleX(0.993) translateY(-0.5px); } 75% { transform: scaleX(1.005) translateY(0.6px); } 100% { transform: scaleX(0.996) translateY(-0.3px); } }
      `,css:"none"},dyslexiaCrowding:{label:"Crowding Effect",injectCSS:"* { letter-spacing: -1px !important; word-spacing: -3px !important; line-height: 1.05 !important; } p, li, td, th, dd, dt, label, span, a { font-size: 95% !important; }",css:"none"},dyslexiaTrackingLoss:{label:"Tracking Loss",overlay:"dyslexiaTrackingLoss",mouseTracked:!0,css:"none"},dyslexiaWashout:{label:"Letter Instability",injectScript:!0,css:"none"},dyslexiaContrastSensitivity:{label:"Contrast Sensitivity",css:"contrast(0.8) brightness(1.1) saturate(0.9)"},handTremor:{label:"Hand Tremor",cursorJitter:{freq:6,amp:9,intent:1.6,bitmap:96},css:"none"},handTremorStrong:{label:"Hand Tremor (Strong)",cursorJitter:{freq:5,amp:18,intent:1.9,bitmap:128},css:"none"},restingTremor:{label:"Resting Tremor",cursorJitter:{freq:4.5,amp:12,intent:-.9,bitmap:96},css:"none"},ataxicDrift:{label:"Ataxic Drift",cursorJitter:{freq:.7,amp:26,intent:.8,bitmap:128},css:"none"},pointerSpasm:{label:"Sudden Jerk",cursorJitter:{freq:5,amp:3,intent:.4,bitmap:128,spasm:{minGap:2200,maxGap:6500,size:44,dur:280}},css:"none"},pointerHidden:{label:"Hidden Pointer (Keyboard Only)",cursorJitter:{hide:!0,bitmap:32},css:"none"}},Te=[{label:"Sensory overload",options:[{value:"fluorescentFlicker",label:"Fluorescent Flicker"},{value:"lightSensitivity",label:"Light Sensitivity"},{value:"colourHypersensitivity",label:"Colour Hypersensitivity"},{value:"motionSensitivity",label:"Motion Sensitivity"}]},{label:"Attention & focus",options:[{value:"hyperfocusTunnel",label:"Hyperfocus Tunnel (Metaphor)"},{value:"attentionFragmentation",label:"Attention Fragmentation (Metaphor)"},{value:"peripheralDistraction",label:"Peripheral Distraction"},{value:"detailFixation",label:"Detail Fixation (Metaphor)"}]},{label:"Processing differences",options:[{value:"processingDelay",label:"Processing Lag"},{value:"sensoryInterference",label:"Sensory Interference"}]},{label:"Sensory spikes",options:[{value:"sensorySpike",label:"Sudden Sensory Spike"}]},{label:"Dyslexia / reading",options:[{value:"dyslexiaVisualStress",label:"Visual Stress (Pattern Glare)"},{value:"dyslexiaCrowding",label:"Crowding Effect"},{value:"dyslexiaTrackingLoss",label:"Tracking Loss"},{value:"dyslexiaWashout",label:"Letter Instability"},{value:"dyslexiaContrastSensitivity",label:"Contrast Sensitivity"}]}],Ce=[{label:"Tremor",options:[{value:"handTremor",label:"Hand Tremor"},{value:"handTremorStrong",label:"Hand Tremor (Strong)"},{value:"restingTremor",label:"Resting Tremor"}]},{label:"Pointer control",options:[{value:"ataxicDrift",label:"Ataxic Drift"},{value:"pointerSpasm",label:"Sudden Jerk"},{value:"pointerHidden",label:"Hidden Pointer (Keyboard Only)"}]}],N={};for(let a of[...we,...Te,...Ce])for(let n of a.options)N[n.value]=n.label.split(" - ")[0];var te=`/* Overlay styles for the vision & sensory filters \u2014 ported from
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
`;function ne(a=document){let n=a.defaultView,o=a.documentElement,f=null,c=null,d="none",u="none",g=0,x=0,E=0,M=0,w=null;function Y(){if(a.getElementById("pour-filter-styles"))return;let r=a.createElement("style");r.id="pour-filter-styles",r.dataset.pourAudit="filter",r.textContent=te,a.head.appendChild(r)}function ie(){if(a.getElementById("pour-vision-filter-defs"))return;let r="http://www.w3.org/2000/svg",e=a.createElementNS(r,"svg");e.setAttribute("id","pour-vision-filter-defs"),e.setAttribute("width","0"),e.setAttribute("height","0"),e.setAttribute("focusable","false"),e.setAttribute("aria-hidden","true"),e.dataset.pourAudit="filter",e.style.position="absolute",e.style.pointerEvents="none";let t=a.createElementNS(r,"defs");for(let[l,p]of Object.entries(V)){let s=a.createElementNS(r,"filter");s.setAttribute("id",`pour-vision-filter-${l}`),s.setAttribute("color-interpolation-filters","linearRGB");let i=a.createElementNS(r,"feColorMatrix");i.setAttribute("type","matrix"),i.setAttribute("values",p),s.appendChild(i),t.appendChild(s)}e.appendChild(t),a.body.appendChild(e)}let _=r=>{let e=a.createElement("div");return e.className=r,e.dataset.pourAudit="filter",a.body.appendChild(e),e};function G(){E=0,o.style.setProperty("--pour-vision-x",`${g}px`),o.style.setProperty("--pour-vision-y",`${x}px`),o.style.setProperty("--pour-vision-r",`${Math.min(n.innerWidth,n.innerHeight)}px`)}function F(r){g=r.clientX,x=r.clientY,E||(E=n.requestAnimationFrame(G))}function $(r){let e=r.touches[0];e&&F(e)}function R(r){for(let t of H)o.classList.remove(`pour-vision-filter-${t}`);if(j.has(d)&&(a.removeEventListener("mousemove",F),a.removeEventListener("touchmove",$)),f?.remove(),f=null,d=v[r]!==void 0?r:"none",d==="none"){u==="none"&&(o.style.filter="");return}u!=="none"&&I("none"),Y(),ie();let e=v[d]||"none";o.style.filter=e==="none"?"":e,H.has(d)&&(o.classList.add(`pour-vision-filter-${d}`),f=_("pour-vision-filter-overlay"),f.dataset.filter=d),j.has(d)&&(g=n.innerWidth/2,x=n.innerHeight/2,G(),a.addEventListener("mousemove",F),a.addEventListener("touchmove",$,{passive:!0}))}function q(){M=0,o.style.setProperty("--pour-sensory-x",`${g}px`),o.style.setProperty("--pour-sensory-y",`${x}px`),o.style.setProperty("--pour-sensory-r",`${Math.min(n.innerWidth,n.innerHeight)}px`)}function D(r){g=r.clientX,x=r.clientY,M||(M=n.requestAnimationFrame(q))}function B(r){let e=r.touches[0];e&&D(e)}function W(r){if(a.getElementById("pour-sensory-injected-style")?.remove(),!r)return;let e=a.createElement("style");e.id="pour-sensory-injected-style",e.dataset.pourAudit="filter",e.textContent=r,a.head.appendChild(e)}function oe(){if(a.querySelector(".pour-sensory-washout-char"))return;let r=a.createTreeWalker(a.body,NodeFilter.SHOW_TEXT,null),e=[];for(;r.nextNode();)e.push(r.currentNode);for(let t of e){let l=t.textContent;if(!l.trim())continue;let p=t.parentElement;if(!p||p.closest("script,style,noscript,[data-pour-audit]"))continue;let s=a.createDocumentFragment();for(let i of l)if(i===" "||i===`
`||i==="	")s.appendChild(a.createTextNode(i));else{let y=a.createElement("span");y.textContent=i,y.style.opacity=(.3+Math.random()*.7).toFixed(2),y.className="pour-sensory-washout-char",s.appendChild(y)}p.replaceChild(s,t)}}function se(){for(let r of a.querySelectorAll(".pour-sensory-washout-char"))r.replaceWith(r.textContent);a.body.normalize()}let S=[[0,0],[0,18],[4.5,13.8],[7.2,19.5],[9.9,18.4],[7.3,12.9],[13,12.9]],J=new Map,L=0,X=0,O=null,z=0,K=0,T=0,C=0,k=0,A=0;function le(r,e,t){let l=`${r}:${e}:${t}`,p=J.get(l);if(p)return p;let s=a.createElement("canvas");s.width=r,s.height=r;let i=s.getContext("2d");if(!i)return"auto";let y=Math.round(r/2);i.save(),i.translate(y+e,y+t),i.scale(1.15,1.15),i.beginPath(),i.moveTo(S[0][0],S[0][1]);for(let b=1;b<S.length;b++)i.lineTo(S[b][0],S[b][1]);i.closePath(),i.restore(),i.lineWidth=3,i.lineJoin="round",i.strokeStyle="#fff",i.stroke(),i.fillStyle="#000",i.fill();let m=`url("${s.toDataURL("image/png")}") ${y} ${y}, auto`;return J.set(l,m),m}function U(r){let e=r.timeStamp||Date.now(),t=e-T;if(T&&t>0){let l=Math.hypot(r.clientX-z,r.clientY-K);C=C*.8+l/t*1e3*.2}z=r.clientX,K=r.clientY,T=e}function pe(r,e){if(!k)return k=r+e.minGap+Math.random()*(e.maxGap-e.minGap),[0,0];let t=r-k;if(t<0)return[0,0];if(t>e.dur)return k=r+e.minGap+Math.random()*(e.maxGap-e.minGap),A=Math.random()*Math.PI*2,[0,0];let l=1-t/e.dur,p=e.size*l*l;return[Math.cos(A)*p,Math.sin(A)*p]}function Q(r){L=n.requestAnimationFrame(Q);let e=O;if(!e)return;let t=(r-X)/1e3,l=0,p=0;if(e.freq&&e.amp){let m=2*Math.PI*e.freq,b=Math.max(0,1+(e.intent||0)*Math.min(1,C/700)),ae=e.amp*b;l+=(Math.sin(m*t)*.7+Math.sin(m*1.63*t+1.1)*.3)*ae,p+=(Math.cos(m*.97*t+.6)*.7+Math.sin(m*2.11*t+2.3)*.3)*ae}if(e.spasm){let[m,b]=pe(r,e.spasm);l+=m,p+=b}let s=e.bitmap/2-14,i=Math.max(-s,Math.min(s,Math.round(l))),y=Math.max(-s,Math.min(s,Math.round(p)));o.style.cursor=le(e.bitmap,i,y)}function ce(r){Z(),O=r,X=n.performance?n.performance.now():Date.now(),C=0,T=0,k=0,A=Math.random()*Math.PI*2,ee(r.hide?`
      html, :not(html) { cursor: none !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `:`
      :not(html) { cursor: inherit !important; }
      [data-pour-audit], [data-pour-audit] * { cursor: auto !important; }
    `),!r.hide&&(a.addEventListener("mousemove",U,{passive:!0}),L=n.requestAnimationFrame(Q))}function Z(){L&&n.cancelAnimationFrame(L),L=0,O=null,k=0,a.removeEventListener("mousemove",U),ee(null),o.style.cursor=""}function ee(r){if(a.getElementById("pour-sensory-cursor-style")?.remove(),!r)return;let e=a.createElement("style");e.id="pour-sensory-cursor-style",e.dataset.pourAudit="filter",e.textContent=r,a.head.appendChild(e)}function ue(){re();let r=()=>{w=n.setTimeout(()=>{c&&(c.classList.add("pour-sensory-spike-flash"),n.setTimeout(()=>{c?.classList.remove("pour-sensory-spike-flash"),r()},150))},3e3+Math.random()*8e3)};r()}function re(){w&&(n.clearTimeout(w),w=null)}function I(r){let e=h[u];if(e?.overlay&&o.classList.remove(`pour-sensory-filter-${u}`),e?.hostClass&&o.classList.remove(e.hostClass),e?.mouseTracked&&(a.removeEventListener("mousemove",D),a.removeEventListener("touchmove",B)),e?.injectScript&&se(),e?.cursorJitter&&Z(),re(),c?.remove(),c=null,W(null),u=h[r]?r:"none",u==="none"){d==="none"&&(o.style.filter="");return}d!=="none"&&R("none"),Y();let t=h[u];o.style.filter=t.css&&t.css!=="none"?t.css:"",t.hostClass&&o.classList.add(t.hostClass),(t.overlay||t.mouseTracked||u==="sensorySpike")&&(c=_("pour-sensory-filter-overlay"),c.dataset.filter=u,t.overlay&&o.classList.add(`pour-sensory-filter-${u}`)),t.mouseTracked&&(g=n.innerWidth/2,x=n.innerHeight/2,q(),a.addEventListener("mousemove",D),a.addEventListener("touchmove",B,{passive:!0})),t.injectCSS&&W(t.injectCSS),u==="sensorySpike"&&ue(),t.injectScript&&oe(),t.cursorJitter&&ce(t.cursorJitter)}let de=()=>({vision:d,sensory:u});function ye(){R("none"),I("none")}return{applyVision:R,applySensory:I,clear:ye,state:de}}return xe(Ee);})();
