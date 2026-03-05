import { useState } from "react";

const questions = [
  {
    id: "feeling",
    question: "How do you want to feel while reading?",
    multi: true,
    options: [
      { label: "Completely absorbed", emoji: "🌊", value: "completely absorbed, unable to put it down" },
      { label: "Intellectually stretched", emoji: "🧠", value: "intellectually challenged and expanded" },
      { label: "Emotionally moved", emoji: "💔", value: "emotionally moved, even wrecked" },
      { label: "Quietly reflective", emoji: "🕯️", value: "quietly reflective and contemplative" },
      { label: "Inspired to act", emoji: "⚡", value: "inspired and motivated to do something" },
      { label: "Entertained & delighted", emoji: "✨", value: "entertained and delighted throughout" },
      { label: "Unsettled & provoked", emoji: "🌀", value: "unsettled, challenged, or provoked" },
      { label: "Transported in time", emoji: "⏳", value: "transported to another era or place" },
      { label: "Understood & seen", emoji: "🪞", value: "deeply understood, like the book was written for me" },
      { label: "Curious & wondering", emoji: "🔭", value: "curious and filled with wonder about the world" },
      { label: "Tense & gripped", emoji: "🎯", value: "tense, gripped, on the edge of my seat" },
      { label: "Warm & connected", emoji: "🌿", value: "warm, connected, and full of human feeling" },
    ],
  },
  {
    id: "world",
    question: "What kind of world do you want to enter?",
    multi: true,
    options: [
      { label: "Literary fiction", emoji: "🖋️", value: "literary fiction with rich prose and complex characters" },
      { label: "Ideas & nonfiction", emoji: "💡", value: "nonfiction driven by big ideas and original thinking" },
      { label: "True stories", emoji: "📰", value: "narrative nonfiction and true stories" },
      { label: "Business & strategy", emoji: "♟️", value: "business, strategy, or leadership" },
      { label: "History & biography", emoji: "🏛️", value: "history, biography, or memoir" },
      { label: "Science & nature", emoji: "🔬", value: "science, nature, or popular science writing" },
      { label: "Philosophy & spirituality", emoji: "☯️", value: "philosophy, ethics, or spirituality" },
      { label: "Crime & thriller", emoji: "🔍", value: "crime, thriller, or psychological suspense" },
      { label: "Science fiction", emoji: "🚀", value: "science fiction or speculative fiction" },
      { label: "Short stories & essays", emoji: "📄", value: "short stories, essays, or collected pieces" },
      { label: "Poetry", emoji: "🌸", value: "poetry or lyric prose" },
      { label: "Surprise me", emoji: "🎲", value: "anything — surprise me with something unexpected" },
    ],
  },
  {
    id: "prose",
    question: "What kind of prose draws you in?",
    multi: true,
    options: [
      { label: "Spare & declarative", emoji: "🪨", value: "spare, declarative, and precise — every word earns its place" },
      { label: "Lyrical & lush", emoji: "🌺", value: "lyrical, lush, and richly atmospheric" },
      { label: "Witty & humorous", emoji: "😏", value: "witty, humorous, or playfully ironic" },
      { label: "Propulsive & urgent", emoji: "🚂", value: "propulsive, urgent, and fast-moving" },
      { label: "Essayistic & digressive", emoji: "🌿", value: "essayistic, digressive, and full of ideas" },
      { label: "Dark & unsettling", emoji: "🖤", value: "dark, unsettling, or gothic in tone" },
      { label: "Warm & conversational", emoji: "☕", value: "warm, conversational, and intimate" },
      { label: "Experimental & strange", emoji: "🔮", value: "experimental, formally inventive, or structurally strange" },
      { label: "No strong preference", emoji: "🌀", value: "no particular prose style preference" },
    ],
  },
  {
    id: "era",
    question: "Any preference on time period?",
    multi: true,
    options: [
      { label: "Contemporary", emoji: "📱", value: "contemporary (2000s onward)" },
      { label: "20th century", emoji: "🎞️", value: "20th century (1900s–1999)" },
      { label: "Classic", emoji: "🕰️", value: "classic literature (pre-1900)" },
      { label: "No preference", emoji: "🌀", value: "any era" },
    ],
  },
  {
    id: "prizes",
    question: "Should it be critically acclaimed?",
    multi: true,
    options: [
      { label: "Booker Prize", emoji: "🇬🇧", value: "Booker Prize winner or shortlist" },
      { label: "Pulitzer Prize", emoji: "🇺🇸", value: "Pulitzer Prize winner" },
      { label: "NYT Best Books", emoji: "📋", value: "New York Times notable or best books list" },
      { label: "Nobel laureate", emoji: "🏅", value: "written by a Nobel Prize in Literature laureate" },
      { label: "Kirkus Star", emoji: "⭐", value: "recipient of a Kirkus starred review" },
      { label: "Cult classic", emoji: "🌀", value: "cult classic or word-of-mouth beloved" },
      { label: "No filter", emoji: "✌️", value: "no particular award requirement" },
    ],
  },
];

export default function BookRecommender() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState([]);
  const [likedBook, setLikedBook] = useState("");
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [previousBooks, setPreviousBooks] = useState([]);

  const currentQuestion = questions[step - 1];
  const isLastQuestion = step === questions.length;
  const isFinalStep = step === questions.length + 1;

  const toggleOption = (value) => {
    if (currentQuestion?.multi) {
      setSelected(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else {
      setSelected([value]);
    }
  };

  const handleNext = () => {
    if (selected.length === 0) return;
    const newAnswers = { ...answers, [currentQuestion.id]: selected };
    setAnswers(newAnswers);
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setSelected([]);
      setStep(step + 1);
    }, 300);
  };

  const handleStart = () => {
    setAnimating(true);
    setTimeout(() => { setAnimating(false); setStep(1); }, 300);
  };

  const handleReset = () => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setStep(0);
      setAnswers({});
      setSelected([]);
      setLikedBook("");
      setRecommendation(null);
      setError(null);
      setPreviousBooks([]);
    }, 300);
  };

  const buildPrompt = (answers, likedBook, exclude = []) => {
    const parts = [
      `You are a brilliant, well-read literary advisor. Recommend exactly ONE book based on this reader's preferences.`,
      ``,
      `Reader preferences:`,
      `- How they want to feel: ${answers.feeling?.join(", ")}`,
      `- Kind of world they want: ${answers.world?.join(", ")}`,
      `- Prose style they're drawn to: ${answers.prose?.join(", ")}`,
      `- Era preference: ${answers.era?.join(", ")}`,
      `- Critical acclaim filter: ${answers.prizes?.join(", ")}`,
    ];
    if (likedBook.trim()) {
      parts.push(`- A book or author they loved: "${likedBook.trim()}" — use this as a signal for their taste and sensibility only. Do NOT recommend this book or anything else by this author. Find something in a similar spirit by a completely different writer.`);
    }
    if (exclude.length > 0) {
      parts.push(`- Do NOT recommend any of these already suggested books: ${exclude.join(", ")}`);
    }
    parts.push(``);
    parts.push(`Respond ONLY with a JSON object, no markdown, no backticks, exactly this shape:`);
    parts.push(`{`);
    parts.push(`  "title": "Book Title",`);
    parts.push(`  "author": "Author Name",`);
    parts.push(`  "year": "Publication year",`);
    parts.push(`  "hook": "One sentence that makes them desperate to read this — no spoilers",`);
    parts.push(`  "description": "2-3 sentences describing the book's world, style, and feel",`);
    parts.push(`  "why": "1-2 sentences explaining exactly why this matches their specific preferences",`);
    parts.push(`  "accolades": "Any prizes or notable recognition (or empty string if none)",`);
    parts.push(`  "pairWith": "One other book worth reading next"`);
    parts.push(`}`);
    return parts.join("\n");
  };

  const handleGetRecommendation = async () => {
    setLoading(true);
    setError(null);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    try {
      const prompt = buildPrompt(answers, likedBook, previousBooks);
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Request failed");
      setPreviousBooks(prev => [...prev, data.title]);
      setRecommendation(data);
    } catch (err) {
      setError("Something went wrong getting your recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#1A0E2E",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Grain overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.4
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(120,80,180,0.12) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      {/* Header */}
      <div style={{
        position: "fixed", top: "1.75rem", left: "50%", transform: "translateX(-50%)",
        fontSize: "0.65rem", letterSpacing: "0.4em", color: "#5A4A35",
        textTransform: "uppercase", zIndex: 20
      }}>
        The Reading Room
      </div>

      {/* Main card */}
      <div style={{
        width: "100%", maxWidth: "560px", zIndex: 5,
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(10px)" : "translateY(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>

        {/* INTRO */}
        {step === 0 && (
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "56px", height: "2px",
              background: "linear-gradient(90deg, transparent, #B48C5A, transparent)",
              margin: "0 auto 2rem"
            }} />
            <h1 style={{
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              color: "#F0E8D8",
              fontWeight: "normal",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              letterSpacing: "-0.02em"
            }}>
              What should you<br /><em style={{ color: "#B48C5A" }}>read next?</em>
            </h1>
            <p style={{
              color: "#6B5A45",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "3rem",
              maxWidth: "360px",
              margin: "0 auto 3rem"
            }}>
              Answer a few questions. Get one recommendation — chosen by an AI that's read everything.
            </p>
            <button onClick={handleStart} style={{
              background: "transparent",
              color: "#B48C5A",
              border: "1px solid #3A2E20",
              padding: "0.9rem 2.75rem",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Georgia', serif",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#B48C5A"; e.target.style.background = "rgba(180,140,90,0.06)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#3A2E20"; e.target.style.background = "transparent"; }}
            >
              Begin →
            </button>
          </div>
        )}

        {/* QUESTIONS */}
        {step >= 1 && step <= questions.length && currentQuestion && (
          <div>
            {/* Progress bar */}
            <div style={{ display: "flex", gap: "4px", marginBottom: "2.5rem" }}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  height: "1px", flex: 1,
                  background: i < step ? "#B48C5A" : "#2A2218",
                  transition: "background 0.4s"
                }} />
              ))}
            </div>

            <p style={{
              fontSize: "0.65rem", letterSpacing: "0.35em", color: "#5A4A35",
              textTransform: "uppercase", marginBottom: "0.6rem"
            }}>
              {step} of {questions.length} {currentQuestion.multi && "· select all that apply"}
            </p>

            <h2 style={{
              fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
              color: "#F0E8D8",
              fontWeight: "normal",
              marginBottom: "1.75rem",
              lineHeight: 1.3,
              letterSpacing: "-0.01em"
            }}>
              {currentQuestion.question}
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: currentQuestion.options.length > 6 ? "1fr 1fr 1fr" : currentQuestion.options.length > 4 ? "1fr 1fr 1fr" : "1fr 1fr",
              gap: "0.6rem",
              marginBottom: "2rem"
            }}>
              {currentQuestion.options.map((opt) => {
                const isSelected = selected.includes(opt.value);
                return (
                  <button key={opt.value} onClick={() => toggleOption(opt.value)} style={{
                    background: isSelected ? "rgba(180,140,90,0.12)" : "rgba(255,255,255,0.02)",
                    color: isSelected ? "#D4A85A" : "#7A6A55",
                    border: isSelected ? "1px solid #B48C5A" : "1px solid #2A2218",
                    padding: "1rem 0.9rem",
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    fontFamily: "'Georgia', serif",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    lineHeight: 1.4,
                  }}>
                    <span style={{ fontSize: "1.1rem", display: "block", marginBottom: "0.3rem", opacity: isSelected ? 1 : 0.5 }}>{opt.emoji}</span>
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {step > 1 ? (
                <button onClick={() => { setAnimating(true); setTimeout(() => { setAnimating(false); setStep(step - 1); setSelected([]); }, 300); }} style={{
                  background: "transparent", color: "#3A2E20", border: "none",
                  fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase",
                  cursor: "pointer", fontFamily: "'Georgia', serif", padding: 0
                }}>← Back</button>
              ) : <div />}
              <button onClick={handleNext} disabled={selected.length === 0} style={{
                background: selected.length > 0 ? "transparent" : "transparent",
                color: selected.length > 0 ? "#B48C5A" : "#3A2E20",
                border: selected.length > 0 ? "1px solid #3A2E20" : "1px solid #1E1A14",
                padding: "0.8rem 2rem",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: selected.length > 0 ? "pointer" : "default",
                fontFamily: "'Georgia', serif",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { if (selected.length > 0) { e.target.style.borderColor = "#B48C5A"; e.target.style.background = "rgba(180,140,90,0.06)"; }}}
                onMouseLeave={e => { e.target.style.borderColor = "#3A2E20"; e.target.style.background = "transparent"; }}
              >
                {isLastQuestion ? "Almost there →" : "Next →"}
              </button>
            </div>
          </div>
        )}

        {/* LIKED BOOK + FINAL SUBMIT */}
        {step === questions.length + 1 && !loading && !recommendation && (
          <div style={{ opacity: animating ? 0 : 1, transition: "opacity 0.3s" }}>
            <div style={{ display: "flex", gap: "4px", marginBottom: "2.5rem" }}>
              {questions.map((_, i) => (
                <div key={i} style={{ height: "1px", flex: 1, background: "#B48C5A" }} />
              ))}
            </div>

            <p style={{
              fontSize: "0.65rem", letterSpacing: "0.35em", color: "#5A4A35",
              textTransform: "uppercase", marginBottom: "0.6rem"
            }}>
              One last thing · optional
            </p>

            <h2 style={{
              fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
              color: "#F0E8D8", fontWeight: "normal",
              marginBottom: "0.75rem", lineHeight: 1.3
            }}>
              Is there a book or author whose taste you share?
            </h2>
            <p style={{ color: "#5A4A35", fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              We'll use this as a style reference — not to recommend them directly, but to find something in the same spirit by a different writer.
            </p>

            <input
              type="text"
              value={likedBook}
              onChange={e => setLikedBook(e.target.value)}
              placeholder="e.g. Donna Tartt, or The Remains of the Day..."
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid #2A2218",
                color: "#F0E8D8",
                padding: "0.9rem 1rem",
                fontSize: "0.9rem",
                fontFamily: "'Georgia', serif",
                outline: "none",
                boxSizing: "border-box",
                marginBottom: "1.75rem",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "#B48C5A"}
              onBlur={e => e.target.style.borderColor = "#2A2218"}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={() => { setAnimating(true); setTimeout(() => { setAnimating(false); setStep(questions.length); setSelected([]); }, 300); }} style={{
                background: "transparent", color: "#3A2E20", border: "none",
                fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase",
                cursor: "pointer", fontFamily: "'Georgia', serif", padding: 0
              }}>← Back</button>
              <button onClick={handleGetRecommendation} style={{
                background: "rgba(180,140,90,0.1)",
                color: "#B48C5A",
                border: "1px solid #B48C5A",
                padding: "0.9rem 2.25rem",
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "'Georgia', serif",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => e.target.style.background = "rgba(180,140,90,0.18)"}
                onMouseLeave={e => e.target.style.background = "rgba(180,140,90,0.1)"}
              >
                Find my book →
              </button>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <div style={{
              width: "40px", height: "40px",
              border: "1px solid #2A2218",
              borderTop: "1px solid #B48C5A",
              borderRadius: "50%",
              margin: "0 auto 2rem",
              animation: "spin 1.2s linear infinite"
            }} />
            <p style={{ color: "#5A4A35", fontSize: "0.8rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Searching the library...
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#8B4A3A", marginBottom: "1.5rem" }}>{error}</p>
            <button onClick={handleGetRecommendation} style={{
              background: "transparent", color: "#B48C5A", border: "1px solid #3A2E20",
              padding: "0.8rem 2rem", fontSize: "0.75rem", letterSpacing: "0.2em",
              textTransform: "uppercase", cursor: "pointer", fontFamily: "'Georgia', serif"
            }}>Try again</button>
          </div>
        )}

        {/* RESULT */}
        {recommendation && !loading && (
          <div style={{ opacity: animating ? 0 : 1, transition: "opacity 0.4s" }}>
            <p style={{
              fontSize: "0.65rem", letterSpacing: "0.4em", color: "#5A4A35",
              textTransform: "uppercase", marginBottom: "1.75rem", textAlign: "center"
            }}>
              Your recommendation
            </p>

            {/* Divider */}
            <div style={{
              width: "100%", height: "1px",
              background: "linear-gradient(90deg, transparent, #3A2E20, transparent)",
              marginBottom: "2rem"
            }} />

            {/* Book info */}
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{
                fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)",
                color: "#F0E8D8",
                fontWeight: "normal",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em"
              }}>
                {recommendation.title}
              </h2>
              <p style={{
                fontSize: "0.8rem", letterSpacing: "0.2em",
                color: "#B48C5A", textTransform: "uppercase", marginBottom: "0.35rem"
              }}>
                {recommendation.author}
              </p>
              {recommendation.year && (
                <p style={{ fontSize: "0.75rem", color: "#3A2E20", letterSpacing: "0.1em" }}>
                  {recommendation.year}
                </p>
              )}
            </div>

            {/* Hook */}
            <p style={{
              fontSize: "1.15rem",
              color: "#D4A85A",
              lineHeight: 1.6,
              fontStyle: "italic",
              marginBottom: "1.5rem",
              borderLeft: "2px solid #3A2E20",
              paddingLeft: "1.25rem"
            }}>
              "{recommendation.hook}"
            </p>

            {/* Description */}
            <p style={{
              fontSize: "0.95rem",
              color: "#6B5A45",
              lineHeight: 1.8,
              marginBottom: "1.5rem"
            }}>
              {recommendation.description}
            </p>

            {/* Why this one */}
            <div style={{
              background: "rgba(180,140,90,0.05)",
              border: "1px solid #2A2218",
              padding: "1.25rem",
              marginBottom: "1.5rem"
            }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "#5A4A35", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                Why this one
              </p>
              <p style={{ fontSize: "0.88rem", color: "#8A7560", lineHeight: 1.7, margin: 0 }}>
                {recommendation.why}
              </p>
            </div>

            {/* Accolades + pair with */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2.5rem" }}>
              {recommendation.accolades && (
                <div style={{ border: "1px solid #1E1A14", padding: "1rem" }}>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#3A2E20", textTransform: "uppercase", marginBottom: "0.4rem" }}>Accolades</p>
                  <p style={{ fontSize: "0.8rem", color: "#5A4A35", margin: 0, lineHeight: 1.5 }}>{recommendation.accolades}</p>
                </div>
              )}
              {recommendation.pairWith && (
                <div style={{ border: "1px solid #1E1A14", padding: "1rem" }}>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#3A2E20", textTransform: "uppercase", marginBottom: "0.4rem" }}>Read next</p>
                  <p style={{ fontSize: "0.8rem", color: "#5A4A35", margin: 0, lineHeight: 1.5 }}>{recommendation.pairWith}</p>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button onClick={handleGetRecommendation} style={{
                background: "transparent", color: "#5A4A35", border: "1px solid #2A2218",
                padding: "0.75rem 1.5rem", fontSize: "0.7rem", letterSpacing: "0.2em",
                textTransform: "uppercase", cursor: "pointer", fontFamily: "'Georgia', serif",
                transition: "all 0.2s"
              }}
                onMouseEnter={e => e.target.style.color = "#B48C5A"}
                onMouseLeave={e => e.target.style.color = "#5A4A35"}
              >
                Different recommendation
              </button>
              <button onClick={handleReset} style={{
                background: "transparent", color: "#5A4A35", border: "1px solid #2A2218",
                padding: "0.75rem 1.5rem", fontSize: "0.7rem", letterSpacing: "0.2em",
                textTransform: "uppercase", cursor: "pointer", fontFamily: "'Georgia', serif",
                transition: "all 0.2s"
              }}
                onMouseEnter={e => e.target.style.color = "#B48C5A"}
                onMouseLeave={e => e.target.style.color = "#5A4A35"}
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        position: "fixed", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)",
        fontSize: "0.6rem", letterSpacing: "0.25em", color: "#2A2018",
        textTransform: "uppercase", zIndex: 20, whiteSpace: "nowrap"
      }}>
        Powered by Claude · The Reading Room
      </div>
    </div>
  );
}