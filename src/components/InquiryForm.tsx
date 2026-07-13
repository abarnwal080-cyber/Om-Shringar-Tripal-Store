import React, { useState, useEffect } from "react";
import { Sparkles, Loader2, HeartHandshake } from "lucide-react";

interface InquiryFormProps {
  prefilledProduct?: string;
  onClearPrefill?: () => void;
  currentLanguage?: "en" | "hi";
  onClose?: () => void;
}

const FORM_TRANSLATIONS = {
  en: {
    quickEnquiry: "Quick Enquiry",
    tellUsNeed: "Tell us what you need",
    subtitle: "A simple step-by-step enquiry form for faster responses and better lead capture.",
    step1Label: "1. What is your name? *",
    step1Placeholder: "Type your name here...",
    step2Label: "2. Who are you? *",
    step3Label: "3. Mobile Number *",
    step4Label: "4. Email Address *",
    step4Placeholder: "name@example.com",
    step5Label: "5. Where are you located? *",
    step5State: "State Name",
    step5District: "District Name",
    step5City: "City / Village Name",
    step5Pincode: "Pin Code (6 Digits)",
    step6Label: "6. Which product do you want to get? *",
    step6Placeholder: "Type product name or details...",
    step6Button: "Review Summary ✓",
    step7Label: "Review your details before submitting",
    step7Button: "Submit Enquiry",
    step7Submitting: "Submitting...",
    step8Title: "Thank You!",
    step8Text: "Your enquiry has been submitted successfully. We will get back to you shortly with the best support and follow-up.",
    step8Chip: "We’ve received your details successfully",
    close: "Close",
    ok: "OK ✓",
    roles: {
      Wholesaler: "Wholesaler",
      Retailer: "Retailer",
      Customer: "Customer",
      Dealer: "Dealer",
      Contractor: "Contractor",
      Others: "Others"
    },
    summary: {
      name: "Name",
      role: "Role",
      mobile: "Mobile",
      email: "Email",
      address: "Address",
      product: "Product Requested"
    }
  },
  hi: {
    quickEnquiry: "त्वरित पूछताछ",
    tellUsNeed: "हमें बताएं कि आपको क्या चाहिए",
    subtitle: "तेज़ प्रतिक्रिया और बेहतर लीड कैप्चर के लिए एक सरल चरण-दर-चरण पूछताछ प्रपत्र।",
    step1Label: "1. आपका नाम क्या है? *",
    step1Placeholder: "अपना नाम यहाँ टाइप करें...",
    step2Label: "2. आप कौन हैं? *",
    step3Label: "3. मोबाइल नंबर *",
    step4Label: "4. ईमेल पता *",
    step4Placeholder: "name@example.com",
    step5Label: "5. आप कहाँ स्थित हैं? *",
    step5State: "राज्य का नाम",
    step5District: "जिले का नाम",
    step5City: "शहर / गाँव का नाम",
    step5Pincode: "पिन कोड (6 अंक)",
    step6Label: "6. आप कौन सा उत्पाद प्राप्त करना चाहते हैं? *",
    step6Placeholder: "उत्पाद का नाम या विवरण टाइप करें...",
    step6Button: "विवरण की समीक्षा करें ✓",
    step7Label: "सबमिट करने से पहले अपने विवरण की समीक्षा करें",
    step7Button: "पूछताछ सबमिट करें",
    step7Submitting: "सबमिट हो रहा है...",
    step8Title: "धन्यवाद!",
    step8Text: "आपकी पूछताछ सफलतापूर्वक सबमिट कर दी गई है। हम सर्वोत्तम सहायता और अनुवर्ती कार्रवाई के साथ जल्द ही आपसे संपर्क करेंगे।",
    step8Chip: "हमें आपके विवरण सफलतापूर्वक प्राप्त हो गए हैं",
    close: "बंद करें",
    ok: "ठीक है ✓",
    roles: {
      Wholesaler: "थोक व्यापारी (Wholesaler)",
      Retailer: "खुदरा विक्रेता (Retailer)",
      Customer: "ग्राहक (Customer)",
      Dealer: "डीलर (Dealer)",
      Contractor: "ठेकेदार (Contractor)",
      Others: "अन्य (Others)"
    },
    summary: {
      name: "नाम",
      role: "भूमिका",
      mobile: "मोबाइल",
      email: "ईमेल",
      address: "पता",
      product: "अनुरोधित उत्पाद"
    }
  }
};

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbySV20bdJBF5dHjNQuvWMzrcTADewI4uJzFGbTE12ktxLCFsEdWbsTG9J1HN9qgDJo/exec";

export default function InquiryForm({
  prefilledProduct = "",
  onClearPrefill,
  currentLanguage = "en",
  onClose,
}: InquiryFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = FORM_TRANSLATIONS[currentLanguage];

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    mobile: "",
    email: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    product: prefilledProduct,
  });

  // Sync prefilled product if it changes
  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, product: prefilledProduct }));
    }
  }, [prefilledProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleSelect = (role: string) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const validateCurrentStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      if (!formData.name.trim()) return false;
    } else if (currentStep === 2) {
      if (!formData.role) return false;
    } else if (currentStep === 3) {
      const mobilePattern = /^[6-9][0-9]{9}$/;
      if (!mobilePattern.test(formData.mobile)) return false;
    } else if (currentStep === 4) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) return false;
    } else if (currentStep === 5) {
      if (!formData.state.trim() || !formData.district.trim() || !formData.city.trim()) return false;
      const pincodePattern = /^[0-9]{6}$/;
      if (!pincodePattern.test(formData.pincode)) return false;
    } else if (currentStep === 6) {
      if (!formData.product.trim()) return false;
    }
    return true;
  };

  const handleNextStep = (currentStep: number) => {
    if (!validateCurrentStep(currentStep)) {
      // Trigger native validation popup if possible, or simple alert
      const activeEl = document.querySelector(`.form-step[data-step="${currentStep}"] input[required]`);
      if (activeEl) {
        (activeEl as HTMLInputElement).reportValidity();
      }
      return;
    }

    setStep(currentStep + 1);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      role: formData.role,
      mobile: "+91" + formData.mobile,
      email: formData.email,
      state: formData.state,
      district: formData.district,
      city: formData.city,
      pincode: formData.pincode,
      product: formData.product
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setStep(8); // Move to thank you page
    } catch (err) {
      alert("Submission failed. Check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      mobile: "",
      email: "",
      state: "",
      district: "",
      city: "",
      pincode: "",
      product: "",
    });
    setStep(1);
    if (onClearPrefill) onClearPrefill();
    if (onClose) onClose();
  };

  const progressPercent = (step / 8) * 100;

  return (
    <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto py-6 sm:py-10 px-4 md:px-8 bg-transparent">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --bg1: #fff7fb;
          --bg2: #f4fbff;
          --card: #ffffffcc;
          --card-strong: #ffffff;
          --text: #2b2f3a;
          --muted: #6b7280;
          --line: #e9e3f3;
          --accent: #ff7bb8;
          --accent2: #8b5cf6;
          --accent3: #34d399;
          --shadow: 0 18px 60px rgba(75, 85, 99, .18);
          --shadow-soft: 0 10px 24px rgba(75, 85, 99, .12);
          --radius: 28px;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 123, 184, 0.12);
          color: #b9387f;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .12em;
          margin-bottom: 12px;
        }

        .modal-title {
          margin: 0 0 6px;
          font-size: clamp(26px, 3.5vw, 38px);
          line-height: 1.05;
          letter-spacing: -.03em;
          font-weight: 800;
          color: #2b2f3a;
        }

        .modal-subtitle {
          margin: 0 0 18px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.55;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #efeaf8;
          border-radius: 999px;
          overflow: hidden;
          margin: 18px 0 26px;
        }

        #progress {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--accent), #ffb08a 40%, var(--accent2));
          box-shadow: 0 0 14px rgba(255, 123, 184, 0.28);
          transition: width 0.35s ease;
        }

        /* Form step animation */
        .form-step {
          display: none;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .form-step.active-step {
          display: block;
          opacity: 1;
          transform: translateY(0);
        }

        .form-step label {
          display: block;
          font-size: clamp(18px, 2vw, 22px);
          font-weight: 800;
          color: #243042;
          margin-bottom: 16px;
          line-height: 1.35;
        }

        .soft-input,
        .form-step input[type="text"],
        .form-step input[type="email"],
        .form-step input[type="tel"] {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 15px 16px;
          background: linear-gradient(180deg, #fff, #fbf8ff);
          color: var(--text);
          font-size: 17px;
          outline: none;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition: transform 0.15s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .soft-input::placeholder,
        .form-step input::placeholder { color: #9aa3b2; }

        .soft-input:focus,
        .form-step input:focus {
          border-color: rgba(255, 123, 184, 0.75);
          box-shadow: 0 0 0 4px rgba(255, 123, 184, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transform: translateY(-1px);
          background: #fff;
        }

        .row-inline { display: flex; gap: 10px; align-items: center; }

        .country-code {
          padding: 13px 14px;
          border-radius: 16px;
          background: #f8f2ff;
          color: #7c3aed;
          font-weight: 800;
          border: 1px solid #ede2ff;
          white-space: nowrap;
          flex: 0 0 auto;
        }

        .radio-group {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 8px;
        }

        .radio-tile {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 15px;
          border-radius: 18px;
          border: 1px solid #ece7f6;
          background: linear-gradient(180deg, #fff, #fbf8ff);
          cursor: pointer;
          transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease, background 0.16s ease;
          box-shadow: 0 8px 18px rgba(30, 41, 59, 0.05);
          min-height: 58px;
        }

        .radio-tile:hover {
          transform: translateY(-2px);
          border-color: #dfc9ff;
          box-shadow: 0 14px 24px rgba(139, 92, 246, 0.10);
          background: linear-gradient(180deg, #fff, #fff8fe);
        }

        .radio-tile input {
          accent-color: var(--accent2);
          transform: scale(1.08);
          margin: 0;
          flex: 0 0 auto;
          cursor: pointer;
        }

        .radio-tile span {
          font-size: 15px;
          font-weight: 700;
          color: #334155;
          line-height: 1.25;
        }

        .radio-tile input:checked + span {
          color: #7c3aed;
        }

        .next-btn,
        #submit-btn {
          border: none;
          border-radius: 16px;
          padding: 13px 18px;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.16s ease, box-shadow 0.16s ease, filter 0.16s ease;
          margin-top: 18px;
          width: auto;
        }

        .next-btn {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff;
          box-shadow: 0 12px 24px rgba(124, 58, 237, 0.22);
        }

        .next-btn:hover { transform: translateY(-1px); filter: saturate(1.04); }
        .next-btn:active { transform: translateY(0); }

        #submit-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--accent3), #22c55e);
          color: #fff;
          box-shadow: 0 14px 26px rgba(34, 197, 94, 0.22);
          font-size: 17px;
          padding: 14px 20px;
        }

        #submit-btn:hover { transform: translateY(-1px); }

        #summary-box {
          background: linear-gradient(180deg, #fff, #fbf8ff);
          border: 1px solid #efe7f8;
          border-radius: 20px;
          padding: 18px;
          box-shadow: var(--shadow-soft);
          max-height: 280px;
          overflow: auto;
          text-align: left;
        }

        #summary-box p {
          margin: 0;
          padding: 10px 0;
          display: flex;
          gap: 10px;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px dashed #ece5f7;
          font-size: 14px;
          line-height: 1.5;
          color: #4b5563;
        }

        #summary-box p:last-child { border-bottom: none; }
        #summary-box strong { color: #111827; min-width: 130px; }

        /* Thank you page */
        .thankyou-wrap {
          position: relative;
          min-height: 380px;
          border-radius: 26px;
          overflow: hidden;
          padding: 24px;
          background:
            radial-gradient(circle at top left, rgba(255, 255, 255, 0.24), transparent 24%),
            radial-gradient(circle at top right, rgba(255, 255, 255, 0.16), transparent 28%),
            linear-gradient(135deg, #ff7ab6 0%, #ffb08a 35%, #8b5cf6 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          isolation: isolate;
        }

        .thankyou-wrap::after {
          content: "";
          position: absolute; inset: 0;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.12), transparent 40%);
          opacity: .9;
          pointer-events: none;
          z-index: 0;
        }

        .thankyou-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 460px;
        }

        .thankyou-badge {
          width: 92px;
          height: 92px;
          margin: 0 auto 14px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-size: 42px;
          background: linear-gradient(180deg, #fff, #fff6d8);
          color: #7c3aed;
          box-shadow: 0 16px 40px rgba(255, 255, 255, 0.18), 0 18px 32px rgba(76, 29, 149, 0.24);
          animation: bounce 1.7s ease-in-out infinite;
        }

        .thankyou-title {
          margin: 8px 0 10px;
          font-size: clamp(30px, 4vw, 44px);
          line-height: 1.05;
          letter-spacing: -.03em;
          text-shadow: 0 10px 24px rgba(91, 33, 182, 0.25);
          animation: popIn 0.55s ease both;
          font-weight: 800;
        }

        .thankyou-text {
          margin: 0 auto;
          max-width: 390px;
          color: rgba(255, 255, 255, 0.96);
          font-size: 16px;
          line-height: 1.7;
        }

        .thankyou-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.20);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .thankyou-close {
          margin-top: 22px !important;
          background: linear-gradient(135deg, #fff, #fff7fb) !important;
          color: #7c3aed !important;
          box-shadow: 0 16px 30px rgba(255, 255, 255, 0.18) !important;
        }

        .thankyou-close:hover { filter: brightness(1.02); }

        .spark {
          position: absolute;
          width: 12px; height: 12px;
          border-radius: 999px;
          background: #fff;
          box-shadow: 0 0 18px rgba(255, 255, 255, 0.9);
          opacity: .9;
          z-index: 1;
        }

        .spark.s1 { top: 18%; left: 12%; animation: floatSpark 2.8s ease-in-out infinite; }
        .spark.s2 { top: 20%; right: 14%; animation: floatSpark 3.2s ease-in-out infinite .3s; }
        .spark.s3 { bottom: 20%; left: 18%; animation: floatSpark 3.6s ease-in-out infinite .5s; }
        .spark.s4 { bottom: 16%; right: 20%; animation: floatSpark 3s ease-in-out infinite .1s; }

        .confetti-dot {
          position: absolute;
          width: 10px; height: 16px;
          border-radius: 999px;
          opacity: .92;
          z-index: 1;
          animation: confettiFall 3.5s linear infinite;
        }

        .c1 { left: 8%; top: -12%; background: #fff; animation-delay: .1s }
        .c2 { left: 18%; top: -18%; background: #fde047; animation-delay: .6s }
        .c3 { left: 31%; top: -14%; background: #34d399; animation-delay: 1.1s }
        .c4 { left: 44%; top: -20%; background: #f472b6; animation-delay: .3s }
        .c5 { left: 58%; top: -16%; background: #c084fc; animation-delay: .8s }
        .c6 { left: 72%; top: -22%; background: #60a5fa; animation-delay: 1.4s }
        .c7 { left: 85%; top: -15%; background: #fb7185; animation-delay: .5s }
        .c8 { left: 92%; top: -19%; background: #fff; animation-delay: 1.2s }

        @keyframes popIn {
          from { transform: translateY(16px) scale(.96); opacity: 0 }
          to { transform: translateY(0) scale(1); opacity: 1 }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1) }
          50% { transform: translateY(-7px) scale(1.03) }
        }

        @keyframes floatSpark {
          0%, 100% { transform: translateY(0) scale(1); opacity: .72 }
          50% { transform: translateY(-12px) scale(1.25); opacity: 1 }
        }

        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0 }
          10% { opacity: 1 }
          100% { transform: translateY(480px) rotate(360deg); opacity: 0 }
        }

        @media (max-width: 640px) {
          .radio-group { grid-template-columns: 1fr; }
          .row-inline { gap: 8px; }
          .country-code { padding: 12px 12px; font-size: 14px; }
          .thankyou-wrap { min-height: 420px; }
          #summary-box p { flex-direction: column; }
          #summary-box strong { min-width: auto; }
        }
      ` }} />

      <div className="w-full max-w-4xl mx-auto space-y-6 flex flex-col items-center relative">
        {/* Header (Hidden on Thank You step) */}
        {step < 8 && (
          <div className="text-center space-y-2 mb-2">
            <div className="header-badge">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{t.quickEnquiry}</span>
            </div>
            <h1 className="modal-title">{t.tellUsNeed}</h1>
            <p className="modal-subtitle">{t.subtitle}</p>

            <div className="progress-bar">
              <div id="progress" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        )}

        {/* Step Cards */}
        <div className="w-full bg-white/95 rounded-[30px] border border-slate-200/80 p-6 sm:p-8 shadow-[0_18px_60px_rgba(75,85,99,0.12)] relative overflow-hidden flex flex-col justify-center min-h-[360px]">
          
          <form id="enquiryForm" onSubmit={handleFormSubmit} className="space-y-4">
            
            {/* Step 1: Name */}
            <div className={`form-step ${step === 1 ? "active-step" : ""}`} data-step="1">
              <label htmlFor="name">{t.step1Label}</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t.step1Placeholder}
                required
                autoComplete="off"
                className="focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="button"
                className="next-btn"
                onClick={() => handleNextStep(1)}
              >
                {t.ok}
              </button>
            </div>

            {/* Step 2: Role */}
            <div className={`form-step ${step === 2 ? "active-step" : ""}`} data-step="2">
              <label>{t.step2Label}</label>
              <div className="radio-group">
                {(Object.keys(t.roles) as Array<keyof typeof t.roles>).map((roleKey) => (
                  <label key={roleKey} className="radio-tile">
                    <input
                      type="radio"
                      name="role"
                      value={roleKey}
                      checked={formData.role === roleKey}
                      onChange={() => handleRoleSelect(roleKey)}
                      required
                    />
                    <span>{t.roles[roleKey]}</span>
                  </label>
                ))}
              </div>
              <button
                type="button"
                className="next-btn"
                onClick={() => handleNextStep(2)}
              >
                {t.ok}
              </button>
            </div>

            {/* Step 3: Mobile */}
            <div className={`form-step ${step === 3 ? "active-step" : ""}`} data-step="3">
              <label htmlFor="mobile">{t.step3Label}</label>
              <div className="row-inline">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  pattern="[6-9][0-9]{9}"
                  placeholder="9876543210"
                  required
                  maxLength={10}
                />
              </div>
              <button
                type="button"
                className="next-btn"
                onClick={() => handleNextStep(3)}
              >
                {t.ok}
              </button>
            </div>

            {/* Step 4: Email */}
            <div className={`form-step ${step === 4 ? "active-step" : ""}`} data-step="4">
              <label htmlFor="email">{t.step4Label}</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t.step4Placeholder}
                required
                autoComplete="off"
              />
              <button
                type="button"
                className="next-btn"
                onClick={() => handleNextStep(4)}
              >
                {t.ok}
              </button>
            </div>

            {/* Step 5: Address */}
            <div className={`form-step ${step === 5 ? "active-step" : ""}`} data-step="5">
              <label>{t.step5Label}</label>
              <div className="space-y-3">
                <input
                  type="text"
                  id="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder={t.step5State}
                  required
                />
                <input
                  type="text"
                  id="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder={t.step5District}
                  required
                />
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder={t.step5City}
                  required
                />
                <input
                  type="text"
                  id="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  pattern="[0-9]{6}"
                  placeholder={t.step5Pincode}
                  required
                  maxLength={6}
                />
              </div>
              <button
                type="button"
                className="next-btn"
                onClick={() => handleNextStep(5)}
              >
                {t.ok}
              </button>
            </div>

            {/* Step 6: Product Requirement */}
            <div className={`form-step ${step === 6 ? "active-step" : ""}`} data-step="6">
              <label htmlFor="product">{t.step6Label}</label>
              <input
                type="text"
                id="product"
                value={formData.product}
                onChange={handleInputChange}
                placeholder={t.step6Placeholder}
                required
                autoComplete="off"
              />
              <button
                type="button"
                className="next-btn"
                onClick={() => handleNextStep(6)}
              >
                {t.step6Button}
              </button>
            </div>

            {/* Step 7: Summary Page */}
            <div className={`form-step ${step === 7 ? "active-step" : ""}`} data-step="7">
              <label>{t.step7Label}</label>
              <div id="summary-box">
                <p><strong>{t.summary.name}:</strong> <span>{formData.name}</span></p>
                <p><strong>{t.summary.role}:</strong> <span>{formData.role}</span></p>
                <p><strong>{t.summary.mobile}:</strong> <span>+91 {formData.mobile}</span></p>
                <p><strong>{t.summary.email}:</strong> <span>{formData.email}</span></p>
                <p><strong>{t.summary.address}:</strong> <span>{formData.city}, {formData.district}, {formData.state} - {formData.pincode}</span></p>
                <p><strong>{t.summary.product}:</strong> <span>{formData.product}</span></p>
              </div>
              <button
                type="submit"
                id="submit-btn"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t.step7Submitting}</span>
                  </>
                ) : (
                  <span>{t.step7Button}</span>
                )}
              </button>
            </div>

            {/* Step 8: Thank You Page */}
            <div className={`form-step ${step === 8 ? "active-step" : ""}`} data-step="8" style={{ textAlign: "center" }}>
              <div className="thankyou-wrap">
                <div className="spark s1" />
                <div className="spark s2" />
                <div className="spark s3" />
                <div className="spark s4" />
                <div className="confetti-dot c1" />
                <div className="confetti-dot c2" />
                <div className="confetti-dot c3" />
                <div className="confetti-dot c4" />
                <div className="confetti-dot c5" />
                <div className="confetti-dot c6" />
                <div className="confetti-dot c7" />
                <div className="confetti-dot c8" />

                <div className="thankyou-inner">
                  <div className="thankyou-badge">🎉</div>
                  <h2 className="thankyou-title">{t.step8Title}</h2>
                  <p className="thankyou-text">{t.step8Text}</p>
                  <div className="thankyou-chip">
                    <HeartHandshake className="w-4 h-4 text-pink-200" />
                    <span>{t.step8Chip}</span>
                  </div>
                  <button
                    type="button"
                    className="next-btn thankyou-close font-black"
                    onClick={resetForm}
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
