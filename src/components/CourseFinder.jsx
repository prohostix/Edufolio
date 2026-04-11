'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── Enquiry Gate ────────────────────────────────────────────────────────────
function EnquiryGate({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', countryCode: '+91' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const fullPhone = `${form.countryCode}${form.phone.replace(/\D/g, '')}`;
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, phone: fullPhone, source: 'Course Finder' }),
      });
      const d = await res.json();
      if (!res.ok) {
        throw new Error(d.message || 'Submission failed');
      }
      onSuccess(form.name, d.enquiry?.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cf-gate">
      <div className="cf-gate-icon"><i className="fa-solid fa-compass"></i></div>
      <h2 className="cf-gate-title">Find Your Perfect Course</h2>
      <p className="cf-gate-sub">Enter your details to get personalised course recommendations</p>

      {error && <div className="cf-error"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}

      <form onSubmit={handleSubmit} className="cf-gate-form">
        <div className="cf-field">
          <i className="fa-solid fa-user cf-field-icon"></i>
          <input className="cf-input" type="text" placeholder="Your Full Name" required
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="cf-field">
          <i className="fa-solid fa-envelope cf-field-icon"></i>
          <input className="cf-input" type="email" placeholder="Email Address" required
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="cf-field cf-phone-container">
          <i className="fa-solid fa-phone cf-field-icon"></i>
          <div className="cf-phone-input-wrap">
            <select className="cf-cc-select" value={form.countryCode} 
              onChange={e => setForm({ ...form, countryCode: e.target.value })}>
              <option value="+91">+91 (IN)</option>
              <option value="+1">+1 (US/CA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (AU)</option>
              <option value="+971">+971 (UAE)</option>
              <option value="+65">+65 (SG)</option>
              <option value="+49">+49 (DE)</option>
              <option value="+33">+33 (FR)</option>
              <option value="+81">+81 (JP)</option>
              <option value="+966">+966 (SA)</option>
              <option value="+974">+974 (QA)</option>
              <option value="+965">+965 (KW)</option>
              <option value="+234">+234 (NG)</option>
              <option value="+254">+254 (KE)</option>
            </select>
            <input className="cf-input cf-input-phone" type="tel" placeholder="Phone Number" required
              value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>
        <button type="submit" className="cf-submit-btn" disabled={loading}>
          {loading
            ? <><i className="fa-solid fa-spinner fa-spin"></i> Submitting...</>
            : <><i className="fa-solid fa-arrow-right"></i> Next Step</>}
        </button>
      </form>
      <p className="cf-privacy"><i className="fa-solid fa-lock"></i> Your info is secure with us</p>
    </div>
  );
}

// ─── Main CourseFinder ───────────────────────────────────────────────────────
export default function CourseFinder({ standalone = false }) {
  const [isOpen, setIsOpen] = useState(standalone);
  const [gateCleared, setGateCleared] = useState(false);
  const [userName, setUserName] = useState('');
  const [enquiryId, setEnquiryId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSuggestion, setIsSuggestion] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape' && isOpen) closeModal(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [isOpen]);

  // Load questions when opened
  useEffect(() => {
    if (!isOpen || questions.length) return;
    setQuestionsLoading(true);
    fetch('/api/public/course-finder-questions')
      .then(r => r.json())
      .then(data => setQuestions(Array.isArray(data) ? data : []))
      .catch(() => setQuestions([]))
      .finally(() => setQuestionsLoading(false));
  }, [isOpen, gateCleared]);

  const closeModal = () => { setIsOpen(false); reset(); };

  const reset = () => {
    setGateCleared(false);
    setUserName('');
    setEnquiryId('');
    setStep(1);
    setAnswers({});
    setResults([]);
    setShowResults(false);
    setIsSuggestion(false);
    setAnimate(true);
  };

  const handleGateSuccess = (name, id) => {
    setUserName(name);
    setEnquiryId(id);
    setGateCleared(true);
  };

  const handleOption = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    if (step < questions.length) {
      setAnimate(false);
      setTimeout(() => { setStep(s => s + 1); setAnimate(true); }, 250);
    }
  };

  const handleBack = () => {
    setAnimate(false);
    setTimeout(() => { setStep(s => s - 1); setAnimate(true); }, 150);
  };

  const findCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/programs');
      const allPrograms = await res.json();

      // Apply filters progressively — relax one at a time until we get results
      const applyFilters = (skipFields = []) => {
        let filtered = [...allPrograms];

        questions.forEach(q => {
          if (skipFields.includes(q.field)) return;
          const val = answers[q.field];
          if (!val) return;
          const opt = q.options.find(o => o.value === val);
          if (!opt) return;

          if (q.field === 'education') {
            if (val === '12th') {
              filtered = filtered.filter(p => ['Undergraduate', 'UG', 'Diploma', 'Certificate'].includes(p.level));
            } else if (val === 'graduate' || val === 'working') {
              filtered = filtered.filter(p => ['Postgraduate', 'PG'].includes(p.level));
            } else if (val === 'postgraduate') {
              filtered = filtered.filter(p => ['Postgraduate', 'PG', 'Doctorate'].includes(p.level));
            }
          }
          if (opt.categories?.length) {
            filtered = filtered.filter(p =>
              opt.categories.some(cat =>
                p.category?.toLowerCase().includes(cat.toLowerCase()) ||
                p.name?.toLowerCase().includes(cat.toLowerCase())
              )
            );
          }
          if (q.field === 'budget') {
            filtered = filtered.filter(p => {
              if (opt.max && !opt.min) return p.fee <= opt.max;
              if (opt.min && opt.max) return p.fee >= opt.min && p.fee <= opt.max;
              if (opt.min && !opt.max) return p.fee >= opt.min;
              return true;
            });
          }
          if (q.field === 'mode' && val !== 'any') {
            filtered = filtered.filter(p => p.mode === val);
          }
        });

        return filtered;
      };

      // Try full match first
      let matched = applyFilters();

      // If no results, relax filters one by one (budget → mode → education)
      const relaxOrder = ['budget', 'mode', 'education', 'interest'];
      const skipped = [];
      let isSuggestion = false;

      while (matched.length === 0 && skipped.length < relaxOrder.length) {
        skipped.push(relaxOrder[skipped.length]);
        matched = applyFilters(skipped);
        isSuggestion = true;
      }

      // Last resort: just return featured/top programs
      if (matched.length === 0) {
        matched = [...allPrograms];
        isSuggestion = true;
      }

      matched.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      setResults(matched.slice(0, 6));
      setIsSuggestion(isSuggestion);
      setShowResults(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateEnquiryWithCourse = async (programId, universityId) => {
    if (!enquiryId) return;
    try {
      await fetch(`/api/enquiry/${enquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programId, universityId }),
      });
    } catch (err) {
      console.error('Failed to update enquiry with course:', err);
    }
  };

  const currentQ = questions[step - 1];
  const allAnswered = currentQ && answers[currentQ.field];

  return (
    <>
      <style>{CF_STYLES}</style>

      {/* Floating button - only show if NOT standalone */}
      {!standalone && (
        <button className="cf-floating-btn" onClick={() => setIsOpen(true)} aria-label="Find my course">
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <span>Find My Course</span>
        </button>
      )}

      {/* Modal / Standalone Logic */}
      {isOpen && (
        <div className={standalone ? "cf-standalone-container" : "cf-overlay"} onClick={!standalone ? closeModal : undefined} role="dialog" aria-modal={!standalone}>
          <div className={standalone ? "cf-standalone-content" : "cf-modal"} onClick={e => e.stopPropagation()}>
            {!standalone && (
              <button className="cf-close-btn" onClick={closeModal} aria-label="Close">
                <i className="fa-solid fa-times"></i>
              </button>
            )}

            {/* Registration after 2 questions */}
            {!gateCleared && step > 2 && <EnquiryGate onSuccess={handleGateSuccess} />}

            {/* Questions Loading */}
            {((!gateCleared && step <= 2) || gateCleared) && (questionsLoading || (questions.length === 0 && !showResults)) && (
              <div className="cf-loading-screen">
                {questionsLoading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <p>Loading questions...</p>
                  </>
                ) : questions.length === 0 && !showResults ? (
                  <>
                    <i className="fa-solid fa-circle-exclamation" style={{ color: '#FF6B35', fontSize: '2.5rem' }}></i>
                    <p>No questions configured yet. Please ask an admin to set up the course finder questions.</p>
                  </>
                ) : null}
              </div>
            )}

            {/* Questions Flow */}
            {((!gateCleared && step <= 2) || gateCleared) && !questionsLoading && !showResults && questions.length > 0 && (
              <>
                <div className="cf-header">
                  <div className="cf-header-icon"><i className="fa-solid fa-compass"></i></div>
                  <h2 className="cf-title">{userName ? `Hi ${userName}!` : 'Hello!'} Let's find your course</h2>
                  <p className="cf-subtitle">Answer a few questions for personalised recommendations</p>
                </div>

                <div className="cf-progress-container">
                  <div className="cf-progress-bar">
                    <div className="cf-progress-fill" style={{ width: `${(step / questions.length) * 100}%` }}></div>
                  </div>
                  <span className="cf-progress-text">Step {step} of {questions.length}</span>
                </div>

                <div className={`cf-question-container ${animate ? 'animate' : ''}`}>
                  <h3 className="cf-question">{currentQ.question}</h3>
                  <div className="cf-options-grid">
                    {currentQ.options.map(opt => (
                      <button key={opt.value}
                        className={`cf-option-btn ${answers[currentQ.field] === opt.value ? 'selected' : ''}`}
                        onClick={() => handleOption(currentQ.field, opt.value)}>
                        <i className={`fa-solid ${opt.icon || 'fa-circle'} cf-option-icon`}></i>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cf-navigation">
                  {step > 1 && (
                    <button className="cf-back-btn" onClick={handleBack}>
                      <i className="fa-solid fa-arrow-left"></i> Back
                    </button>
                  )}
                  {step === questions.length && allAnswered && (
                    <button className="cf-find-btn" onClick={findCourses} disabled={loading}>
                      {loading
                        ? <><i className="fa-solid fa-spinner fa-spin"></i> Finding...</>
                        : <><i className="fa-solid fa-search"></i> Find Courses</>}
                    </button>
                  )}
                </div>
              </>
            )}


            {/* Results */}
            {gateCleared && showResults && (
              <>
                <div className="cf-results-header">
                  <div className={`cf-results-icon ${isSuggestion ? 'suggestion' : ''}`}>
                  <i className={`fa-solid ${isSuggestion ? 'fa-lightbulb' : 'fa-sparkles'}`}></i>
                </div>
                  <h2 className="cf-results-title">
                    {isSuggestion ? 'You Might Also Like These!' : 'Recommended Courses For You!'}
                  </h2>
                  <p className="cf-results-subtitle">
                    {isSuggestion
                      ? `No exact match found — here are ${results.length} similar programs you may like`
                      : `We found ${results.length} courses matching your preferences`
                    }
                  </p>
                </div>

                <div className="cf-results-list">
                  {results.map(program => (
                    <Link key={program._id} href={`/programs/${program.slug}`}
                      className="cf-result-card" onClick={() => {
                        updateEnquiryWithCourse(program._id, program.universityId?._id);
                        setIsOpen(false);
                      }}>
                      <div className="cf-result-info">
                        <h4 className="cf-result-name">{program.name}</h4>
                        <p className="cf-result-university">
                          <i className="fa-solid fa-building-columns"></i>
                          {program.universityId?.name || 'University'}
                        </p>
                        <div className="cf-result-meta">
                          <span className="cf-result-badge"><i className="fa-solid fa-clock"></i> {program.duration}</span>
                          <span className="cf-result-badge"><i className="fa-solid fa-laptop"></i> {program.mode}</span>
                        </div>
                      </div>
                      <div className="cf-result-price">
                        <span className="cf-price-label">Fee</span>
                        <span className="cf-price-value">₹{Number(program.fee).toLocaleString('en-IN')}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="cf-results-actions">
                  <button className="cf-restart-btn" onClick={reset}>
                    <i className="fa-solid fa-redo"></i> Start Over
                  </button>
                  <Link href="/programs" className="cf-view-all-btn" onClick={() => setIsOpen(false)}>
                    View All Programs <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const CF_STYLES = `
  .cf-floating-btn {
    position: fixed; bottom: 30px; right: 30px;
    background: linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%);
    color: #fff; border: none; border-radius: 50px;
    padding: 18px 28px; font-size: 1rem; font-weight: 600;
    font-family: inherit; cursor: pointer;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 30px rgba(255,107,53,0.4); z-index: 1000;
    animation: cf-float-pulse 3s ease-in-out infinite;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .cf-floating-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 40px rgba(255,107,53,0.5); animation: none; }
  @keyframes cf-float-pulse { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  
  .cf-standalone-container { width: 100%; max-width: 800px; margin: 0 auto; padding: 0 20px; animation: cf-fade-in 0.3s ease; }
  .cf-standalone-content { background: #fff; border-radius: 24px; width: 100%; box-shadow: 0 20px 50px rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.1); overflow: hidden; }

  .cf-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    display: flex; align-items: center; justify-content: center;
    z-index: 10000; padding: 20px; backdrop-filter: blur(5px);
    animation: cf-fade-in 0.2s ease;
  }
  @keyframes cf-fade-in { from{opacity:0} to{opacity:1} }

  .cf-modal {
    background: #fff; border-radius: 24px;
    max-width: 600px; width: 100%; max-height: 90vh; overflow: auto;
    min-height: 300px;
    position: relative; box-shadow: 0 25px 50px rgba(0,0,0,0.25);
    animation: cf-slide-up 0.3s ease;
  }
  @keyframes cf-slide-up { from{opacity:0;transform:translateY(30px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

  .cf-close-btn {
    position: absolute; top: 15px; right: 15px;
    background: rgba(255,255,255,0.2); border: none;
    width: 40px; height: 40px; border-radius: 50%;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; color: #fff; z-index: 1; transition: all 0.2s;
  }
  .cf-close-btn:hover { background: rgba(255,255,255,0.35); transform: rotate(90deg); }

  /* Gate */
  .cf-gate {
    padding: 40px 35px 35px;
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    border-radius: 24px; text-align: center;
  }
  .cf-gate-icon {
    width: 80px; height: 80px; border-radius: 50%;
    background: linear-gradient(135deg, #FF6B35, #FF8B5C);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px; font-size: 2rem; color: #fff;
    box-shadow: 0 10px 30px rgba(255,107,53,0.4);
  }
  .cf-gate-title { color: #fff; font-size: 1.8rem; font-weight: 700; margin: 0 0 10px; }
  .cf-gate-sub { color: #94A3B8; font-size: 1rem; margin: 0 0 30px; }
  .cf-gate-form { display: flex; flex-direction: column; gap: 14px; text-align: left; }
  .cf-field { position: relative; }
  .cf-field-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #94A3B8; font-size: 1rem; pointer-events: none; z-index: 2; }
  .cf-phone-input-wrap { display: flex; gap: 0; position: relative; }
  .cf-cc-select {
    width: 100px; padding: 14px 10px 14px 40px; border-radius: 10px 0 0 10px; border: 2px solid #334155; 
    background: #1E293B; color: #fff; font-size: 0.95rem; font-family: inherit; cursor: pointer;
    border-right: none; transition: border-color 0.2s; -webkit-appearance: none; appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394A3B8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 8px center; background-size: 16px;
  }
  .cf-input-phone { border-radius: 0 10px 10px 0 !important; padding-left: 15px !important; }
  .cf-cc-select:focus, .cf-input-phone:focus { border-color: #FF6B35; outline: none; z-index: 3; }
  .cf-input {
    width: 100%; padding: 14px 16px 14px 44px;
    border-radius: 10px; border: 2px solid #334155;
    background: #1E293B; color: #fff; font-size: 1rem; font-family: inherit;
    box-sizing: border-box; transition: border-color 0.2s;
  }
  .cf-input::placeholder { color: #64748B; }
  .cf-input:focus { outline: none; border-color: #FF6B35; box-shadow: 0 0 0 3px rgba(255,107,53,0.2); }
  .cf-submit-btn {
    width: 100%; padding: 15px; margin-top: 6px;
    background: linear-gradient(135deg, #FF6B35, #FF8B5C);
    color: #fff; border: none; border-radius: 10px;
    font-size: 1rem; font-weight: 600; font-family: inherit;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
    box-shadow: 0 4px 15px rgba(255,107,53,0.3); transition: all 0.2s;
  }
  .cf-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,107,53,0.4); }
  .cf-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
  .cf-error {
    background: #FEF2F2; color: #DC2626; padding: 12px 15px;
    border-radius: 10px; font-size: 0.9rem; margin-bottom: 15px;
    display: flex; align-items: center; gap: 8px; border-left: 4px solid #DC2626;
  }
  .cf-privacy { color: #64748B; font-size: 0.8rem; margin: 15px 0 0; display: flex; align-items: center; justify-content: center; gap: 6px; }

  /* Loading */
  .cf-loading-screen {
    padding: 60px 30px; text-align: center; color: #64748B;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px;
    min-height: 300px;
  }
  .cf-loading-screen i { font-size: 2.5rem; color: #FF6B35; }

  /* Header */
  .cf-header {
    text-align: center; padding: 40px 30px 30px;
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    border-radius: 24px 24px 0 0; position: relative; overflow: hidden;
  }
  .cf-header-icon {
    width: 80px; height: 80px; border-radius: 50%;
    background: linear-gradient(135deg, #FF6B35, #FF8B5C);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px; font-size: 2rem; color: #fff;
    box-shadow: 0 10px 30px rgba(255,107,53,0.4);
  }
  .cf-title { color: #fff; font-size: 1.6rem; font-weight: 700; margin: 0 0 10px; }
  .cf-subtitle { color: #94A3B8; font-size: 0.95rem; margin: 0; }

  /* Progress */
  .cf-progress-container { padding: 20px 30px; border-bottom: 1px solid #E2E8F0; }
  .cf-progress-bar { height: 8px; background: #E2E8F0; border-radius: 4px; overflow: hidden; margin-bottom: 10px; }
  .cf-progress-fill { height: 100%; background: linear-gradient(135deg, #FF6B35, #FF8B5C); border-radius: 4px; transition: width 0.4s ease; }
  .cf-progress-text { color: #64748B; font-size: 0.85rem; font-weight: 500; }

  /* Question */
  .cf-question-container { padding: 30px; }
  .cf-question-container.animate { animation: cf-q-in 0.3s ease; }
  @keyframes cf-q-in { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
  .cf-question { color: #0F172A; font-size: 1.25rem; font-weight: 600; margin-bottom: 25px; text-align: center; line-height: 1.4; }
  .cf-options-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
  .cf-option-btn {
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    padding: 20px 15px; background: #F8FAFC; border: 2px solid #E2E8F0;
    border-radius: 12px; cursor: pointer; text-align: center;
    font-size: 0.9rem; color: #334155; font-weight: 500; font-family: inherit;
    transition: all 0.2s;
  }
  .cf-option-btn:hover { border-color: #FF6B35; background: #FFF7ED; transform: translateY(-2px); box-shadow: 0 4px 15px rgba(255,107,53,0.15); }
  .cf-option-btn.selected { background: #FFF7ED; border-color: #FF6B35; color: #FF6B35; }
  .cf-option-icon { font-size: 1.5rem; transition: all 0.2s; }
  .cf-option-btn.selected .cf-option-icon { transform: scale(1.1); }

  /* Navigation */
  .cf-navigation { display: flex; justify-content: space-between; padding: 0 30px 30px; gap: 15px; }
  .cf-back-btn {
    padding: 12px 24px; background: #F1F5F9; color: #64748B;
    border: none; border-radius: 10px; cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    font-weight: 600; font-size: 0.95rem; font-family: inherit; transition: all 0.2s;
  }
  .cf-back-btn:hover { background: #E2E8F0; color: #334155; }
  .cf-find-btn {
    padding: 14px 30px; background: linear-gradient(135deg, #FF6B35, #FF8B5C);
    color: #fff; border: none; border-radius: 10px; cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    font-weight: 600; font-size: 1rem; font-family: inherit; margin-left: auto;
    box-shadow: 0 4px 15px rgba(255,107,53,0.3); transition: all 0.2s;
  }
  .cf-find-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,107,53,0.4); }
  .cf-find-btn:disabled { opacity: 0.7; cursor: not-allowed; }

  /* Results */
  .cf-results-header {
    text-align: center; padding: 40px 30px 20px;
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    border-radius: 24px 24px 0 0; position: relative; overflow: hidden;
  }
  .cf-results-icon {
    width: 70px; height: 70px; border-radius: 50%;
    background: linear-gradient(135deg, #10B981, #34D399);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px; font-size: 1.8rem; color: #fff;
  }
  .cf-results-icon.suggestion {
    background: linear-gradient(135deg, #6366F1, #818CF8);
  }
  .cf-results-title { color: #fff; font-size: 1.5rem; font-weight: 700; margin: 0 0 10px; }
  .cf-results-subtitle { color: #94A3B8; font-size: 0.95rem; margin: 0; }
  .cf-results-list { padding: 20px; max-height: 350px; overflow: auto; }
  .cf-result-card {
    display: flex; justify-content: space-between; align-items: center;
    padding: 18px; background: #F8FAFC; border-radius: 12px;
    margin-bottom: 12px; text-decoration: none; transition: all 0.2s;
    border: 2px solid transparent;
  }
  .cf-result-card:hover { border-color: #FF6B35; background: #fff; transform: translateX(5px); box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
  .cf-result-info { flex: 1; min-width: 0; }
  .cf-result-name { color: #0F172A; font-size: 1.05rem; font-weight: 600; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cf-result-university { color: #64748B; font-size: 0.85rem; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  .cf-result-meta { display: flex; gap: 10px; flex-wrap: wrap; }
  .cf-result-badge { background: #E2E8F0; color: #64748B; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; display: flex; align-items: center; gap: 5px; }
  .cf-result-price { text-align: right; flex-shrink: 0; margin-left: 15px; }
  .cf-price-label { display: block; color: #64748B; font-size: 0.8rem; margin-bottom: 4px; }
  .cf-price-value { color: #059669; font-size: 1.1rem; font-weight: 700; }
  .cf-no-results { text-align: center; padding: 40px 20px; color: #64748B; }
  .cf-no-results-icon { font-size: 3rem; margin-bottom: 15px; color: #CBD5E1; display: block; }
  .cf-browse-all-btn { display: inline-block; margin-top: 15px; padding: 12px 24px; background: #FF6B35; color: #fff; border-radius: 10px; text-decoration: none; font-weight: 600; transition: all 0.2s; }
  .cf-browse-all-btn:hover { background: #FF8B5C; transform: translateY(-2px); }
  .cf-results-actions { display: flex; justify-content: space-between; padding: 20px 30px 30px; border-top: 1px solid #E2E8F0; gap: 15px; }
  .cf-restart-btn { padding: 12px 20px; background: #F1F5F9; color: #64748B; border: none; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 600; font-family: inherit; transition: all 0.2s; }
  .cf-restart-btn:hover { background: #E2E8F0; color: #334155; }
  .cf-view-all-btn { padding: 12px 24px; background: linear-gradient(135deg, #0F172A, #1E293B); color: #fff; border-radius: 10px; text-decoration: none; display: flex; align-items: center; gap: 8px; font-weight: 600; transition: all 0.2s; }
  .cf-view-all-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(15,23,42,0.3); }

  @media (max-width: 768px) {
    .cf-floating-btn span { display: none; }
    .cf-floating-btn { padding: 16px; border-radius: 50%; width: 56px; height: 56px; justify-content: center; }
    .cf-overlay { align-items: flex-end; padding: 0; }
    .cf-modal { border-radius: 24px 24px 0 0; max-height: 90vh; }
    .cf-options-grid { grid-template-columns: 1fr; }
    .cf-gate { padding: 30px 20px; }
    .cf-results-actions { flex-direction: column; }
    .cf-restart-btn, .cf-view-all-btn { justify-content: center; width: 100%; }
  }
`;
