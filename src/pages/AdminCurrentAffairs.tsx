import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash, Edit, Save, ArrowLeft, AlertCircle } from "lucide-react";
import SEO from "../components/SEO";

interface TopicInput {
  title: string;
  subtitle: string;
  content: string;
  whyItMatters: string;
  revise: string;
  pyqConnect: string;
}

interface MCQInput {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface MainsInput {
  question: string;
  context: string;
}

interface DigestFormState {
  id: string; // date_id: YYYY-MM-DD
  date: string; // e.g., "28th May 2026"
  day: string; // e.g., "Thursday"
  tagline: string;
  announcement: string;
  reviseSummary: string[];
  topics: TopicInput[];
  practiceQuestions: {
    mcqs: MCQInput[];
    mains: MainsInput[];
  };
}

const emptyFormState = (dateStr: string = ""): DigestFormState => ({
  id: dateStr,
  date: "",
  day: "",
  tagline: "नेति नेति — Less noise. More clarity.",
  announcement: "",
  reviseSummary: [""],
  topics: [{ title: "", subtitle: "", content: "", whyItMatters: "", revise: "", pyqConnect: "" }],
  practiceQuestions: {
    mcqs: [{ question: "", options: ["", "", "", ""], answer: "A", explanation: "" }],
    mains: [{ question: "", context: "" }]
  }
});

const AdminCurrentAffairs = () => {
  const [digests, setDigests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<DigestFormState>(emptyFormState());
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchDigests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get("http://localhost:8000/api/current-affairs/", {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setDigests(res.data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load daily digests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDigests();
  }, []);

  const handleEdit = (digest: any) => {
    setEditingId(digest.id);
    const mcqs = digest.practiceQuestions?.mcqs || [];
    const mains = digest.practiceQuestions?.mains || [];
    
    setForm({
      id: digest.id,
      date: digest.date,
      day: digest.day,
      tagline: digest.tagline || "",
      announcement: digest.announcement || "",
      reviseSummary: digest.reviseSummary && digest.reviseSummary.length > 0 ? digest.reviseSummary : [""],
      topics: digest.topics && digest.topics.length > 0 ? digest.topics.map((t: any) => ({
        title: t.title || "",
        subtitle: t.subtitle || "",
        content: t.content || "",
        whyItMatters: t.whyItMatters || "",
        revise: t.revise || "",
        pyqConnect: t.pyqConnect || ""
      })) : [{ title: "", subtitle: "", content: "", whyItMatters: "", revise: "", pyqConnect: "" }],
      practiceQuestions: {
        mcqs: mcqs.length > 0 ? mcqs.map((m: any) => ({
          question: m.question || "",
          options: m.options || ["", "", "", ""],
          answer: m.answer || "A",
          explanation: m.explanation || ""
        })) : [{ question: "", options: ["", "", "", ""], answer: "A", explanation: "" }],
        mains: mains.length > 0 ? mains.map((m: any) => ({
          question: m.question || "",
          context: m.context || ""
        })) : [{ question: "", context: "" }]
      }
    });
    setView("form");
  };

  const handleDelete = async (dateId: string) => {
    if (!window.confirm("Are you sure you want to delete this Daily Digest? This action is permanent!")) return;
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:8000/api/current-affairs/${dateId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMsg("Digest deleted successfully.");
      fetchDigests();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to delete digest.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const token = localStorage.getItem("access_token");
    const headers = { Authorization: `Bearer ${token}` };

    const payload = {
      ...form,
      reviseSummary: form.reviseSummary.filter(s => s.trim() !== ""),
      topics: form.topics.filter(t => t.title.trim() !== ""),
      practiceQuestions: {
        mcqs: form.practiceQuestions.mcqs.filter(q => q.question.trim() !== ""),
        mains: form.practiceQuestions.mains.filter(q => q.question.trim() !== "")
      }
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/current-affairs/${editingId}/`, payload, { headers });
        setSuccessMsg("Digest updated successfully.");
      } else {
        await axios.post("http://localhost:8000/api/current-affairs/", payload, { headers });
        setSuccessMsg("New Daily Digest published successfully.");
      }
      setView("list");
      setEditingId(null);
      setForm(emptyFormState());
      fetchDigests();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.detail || "An error occurred while saving.");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <SEO title="Admin - Current Affairs" description="Manage learning content daily digests." />
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-slate-900">Current Affairs Admin</h1>
            <p className="text-sm text-slate-500">Publish, modify, and delete daily Prelims & Mains resources.</p>
          </div>
          {view === "list" ? (
            <button
              onClick={() => {
                setForm(emptyFormState());
                setEditingId(null);
                setView("form");
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-all font-semibold text-sm"
            >
              <Plus className="w-4 h-4" /> Add Daily Digest
            </button>
          ) : (
            <button
              onClick={() => setView("list")}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-200 text-slate-800 rounded-xl hover:bg-slate-300 transition-all font-semibold text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to List
            </button>
          )}
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{errorMsg}</p>
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
            {successMsg}
          </div>
        )}

        {view === "list" ? (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 md:p-6">Date ID</th>
                  <th className="p-4 md:p-6">Display Date</th>
                  <th className="p-4 md:p-6">Tagline</th>
                  <th className="p-4 md:p-6">Topics</th>
                  <th className="p-4 md:p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-slate-400">Loading digests...</td>
                  </tr>
                ) : digests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-slate-400">No digests found. Add one to get started!</td>
                  </tr>
                ) : (
                  digests.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 md:p-6 font-mono font-semibold text-slate-700">{d.id}</td>
                      <td className="p-4 md:p-6 font-medium text-slate-900">{d.date}</td>
                      <td className="p-4 md:p-6 text-slate-500 max-w-xs truncate">{d.tagline}</td>
                      <td className="p-4 md:p-6 text-slate-500">{d.topics?.length || 0} topics</td>
                      <td className="p-4 md:p-6 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(d)}
                          className="p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors inline-flex"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8 bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Date ID (YYYY-MM-DD)</label>
                <input
                  type="date"
                  required
                  disabled={!!editingId}
                  value={form.id}
                  onChange={(e) => setForm({ ...form, id: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-all text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Display Date (e.g. 1st April 2026)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 28th May 2026"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-all text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Day</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thursday"
                  value={form.day}
                  onChange={(e) => setForm({ ...form, day: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-all text-sm font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Announcement</label>
                <input
                  type="text"
                  placeholder="Optional top notification..."
                  value={form.announcement}
                  onChange={(e) => setForm({ ...form, announcement: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-all text-sm"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-slate-900">Summary Highlights</h3>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, reviseSummary: [...form.reviseSummary, ""] })}
                  className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Bullet Point
                </button>
              </div>
              <div className="space-y-3">
                {form.reviseSummary.map((sum, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Highlight #${index + 1}`}
                      value={sum}
                      onChange={(e) => {
                        const newSummary = [...form.reviseSummary];
                        newSummary[index] = e.target.value;
                        setForm({ ...form, reviseSummary: newSummary });
                      }}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newSummary = form.reviseSummary.filter((_, idx) => idx !== index);
                        setForm({ ...form, reviseSummary: newSummary.length > 0 ? newSummary : [""] });
                      }}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-playfair font-bold text-slate-900">Topics & In-depth Analysis</h3>
                <button
                  type="button"
                  onClick={() => setForm({
                    ...form,
                    topics: [...form.topics, { title: "", subtitle: "", content: "", whyItMatters: "", revise: "", pyqConnect: "" }]
                  })}
                  className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Topic
                </button>
              </div>

              <div className="space-y-8">
                {form.topics.map((topic, index) => (
                  <div key={index} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-4 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const newTopics = form.topics.filter((_, idx) => idx !== index);
                        setForm({ ...form, topics: newTopics.length > 0 ? newTopics : [{ title: "", subtitle: "", content: "", whyItMatters: "", revise: "", pyqConnect: "" }] });
                      }}
                      className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash className="w-4 h-4" />
                    </button>

                    <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wider">Topic #{index + 1}</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Topic Title</label>
                        <input
                          type="text"
                          required
                          value={topic.title}
                          onChange={(e) => {
                            const newTopics = [...form.topics];
                            newTopics[index].title = e.target.value;
                            setForm({ ...form, topics: newTopics });
                          }}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Subtitle (e.g. Polity | GS-II)</label>
                        <input
                          type="text"
                          required
                          value={topic.subtitle}
                          onChange={(e) => {
                            const newTopics = [...form.topics];
                            newTopics[index].subtitle = e.target.value;
                            setForm({ ...form, topics: newTopics });
                          }}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Content (Markdown supported)</label>
                      <textarea
                        required
                        rows={5}
                        value={topic.content}
                        onChange={(e) => {
                          const newTopics = [...form.topics];
                          newTopics[index].content = e.target.value;
                          setForm({ ...form, topics: newTopics });
                        }}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Why It Matters</label>
                        <textarea
                          rows={3}
                          value={topic.whyItMatters}
                          onChange={(e) => {
                            const newTopics = [...form.topics];
                            newTopics[index].whyItMatters = e.target.value;
                            setForm({ ...form, topics: newTopics });
                          }}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Revise Points</label>
                        <textarea
                          rows={3}
                          value={topic.revise}
                          onChange={(e) => {
                            const newTopics = [...form.topics];
                            newTopics[index].revise = e.target.value;
                            setForm({ ...form, topics: newTopics });
                          }}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">PYQ Connection (Optional)</label>
                      <input
                        type="text"
                        value={topic.pyqConnect}
                        onChange={(e) => {
                          const newTopics = [...form.topics];
                          newTopics[index].pyqConnect = e.target.value;
                          setForm({ ...form, topics: newTopics });
                        }}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-lg font-playfair font-bold text-slate-900 mb-6">Assessment & Practice Questions</h3>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Prelims MCQs</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedMCQs = [...form.practiceQuestions.mcqs, { question: "", options: ["", "", "", ""], answer: "A", explanation: "" }];
                      setForm({ ...form, practiceQuestions: { ...form.practiceQuestions, mcqs: updatedMCQs } });
                    }}
                    className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add MCQ
                  </button>
                </div>

                {form.practiceQuestions.mcqs.map((mcq, mcqIdx) => (
                  <div key={mcqIdx} className="p-5 border border-slate-200 rounded-2xl bg-white space-y-4 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const updatedMCQs = form.practiceQuestions.mcqs.filter((_, idx) => idx !== mcqIdx);
                        setForm({ ...form, practiceQuestions: { ...form.practiceQuestions, mcqs: updatedMCQs } });
                      }}
                      className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash className="w-4 h-4" />
                    </button>

                    <div className="w-full">
                      <label className="block text-xs font-bold text-slate-600 mb-1">MCQ #{mcqIdx + 1} Question</label>
                      <textarea
                        required
                        value={mcq.question}
                        onChange={(e) => {
                          const updated = [...form.practiceQuestions.mcqs];
                          updated[mcqIdx].question = e.target.value;
                          setForm({ ...form, practiceQuestions: { ...form.practiceQuestions, mcqs: updated } });
                        }}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mcq.options.map((opt, optIdx) => (
                        <div key={optIdx}>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Option {["A", "B", "C", "D"][optIdx]}</label>
                          <input
                            type="text"
                            required
                            value={opt}
                            onChange={(e) => {
                              const updated = [...form.practiceQuestions.mcqs];
                              updated[mcqIdx].options[optIdx] = e.target.value;
                              setForm({ ...form, practiceQuestions: { ...form.practiceQuestions, mcqs: updated } });
                            }}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Correct Answer</label>
                        <select
                          value={mcq.answer}
                          onChange={(e) => {
                            const updated = [...form.practiceQuestions.mcqs];
                            updated[mcqIdx].answer = e.target.value;
                            setForm({ ...form, practiceQuestions: { ...form.practiceQuestions, mcqs: updated } });
                          }}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        >
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-600 mb-1">Explanation</label>
                        <textarea
                          required
                          value={mcq.explanation}
                          onChange={(e) => {
                            const updated = [...form.practiceQuestions.mcqs];
                            updated[mcqIdx].explanation = e.target.value;
                            setForm({ ...form, practiceQuestions: { ...form.practiceQuestions, mcqs: updated } });
                          }}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Mains Practice Prompt</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedMains = [...form.practiceQuestions.mains, { question: "", context: "" }];
                      setForm({ ...form, practiceQuestions: { ...form.practiceQuestions, mains: updatedMains } });
                    }}
                    className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Prompt
                  </button>
                </div>

                {form.practiceQuestions.mains.map((mains, mainsIdx) => (
                  <div key={mainsIdx} className="p-5 border border-slate-200 rounded-2xl bg-white space-y-4 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const updatedMains = form.practiceQuestions.mains.filter((_, idx) => idx !== mainsIdx);
                        setForm({ ...form, practiceQuestions: { ...form.practiceQuestions, mains: updatedMains } });
                      }}
                      className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-600 mb-1">Mains Prompt Question</label>
                        <textarea
                          required
                          value={mains.question}
                          onChange={(e) => {
                            const updated = [...form.practiceQuestions.mains];
                            updated[mainsIdx].question = e.target.value;
                            setForm({ ...form, practiceQuestions: { ...form.practiceQuestions, mains: updated } });
                          }}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Context Tag (e.g. GS-III)</label>
                        <input
                          type="text"
                          required
                          value={mains.context}
                          onChange={(e) => {
                            const updated = [...form.practiceQuestions.mains];
                            updated[mainsIdx].context = e.target.value;
                            setForm({ ...form, practiceQuestions: { ...form.practiceQuestions, mains: updated } });
                          }}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setView("list")}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-bold text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-all font-bold text-sm flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Digest
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminCurrentAffairs;
